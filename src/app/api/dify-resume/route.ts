import { NextRequest } from 'next/server';
import {
  batchGitCommit,
  buildResourcesPage,
  parseDesignMdColors,
  readAndFixDifyFiles,
  removeFromExcludedDirs,
  waitForVercelDeploy,
} from '../_lib/portal-helpers';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const { task_id, workflow_run_id, form_token, selected_urls, company_name, client_slug } =
    await req.json();

  if (!form_token) {
    return Response.json(
      { error: 'form_token が指定されていません。' },
      { status: 400 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const apiKey = process.env.DIFY_API_KEY ?? '';
        const baseUrl = process.env.DIFY_BASE_URL ?? '';
        const baseWithoutVersion = baseUrl.replace(/\/v\d+\/?$/, '');

        send({ progress: 58, status: 'URLを送信してワークフローを再開中...' });

        const urlsStr = Array.isArray(selected_urls)
          ? selected_urls.join('\n')
          : String(selected_urls ?? '');

        // action なし・シンプルな inputs のみで試す
        const formBody = JSON.stringify({
          inputs: { selected_urls: urlsStr },
          user: 'milize-admin',
        });
        const authHeaders = {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        // フォーム送信
        let resumeRes: Response | null = null;
        let lastErr = '';
        for (const url of [
          `${baseUrl}/form/human_input/${form_token}`,
          `${baseWithoutVersion}/form/human_input/${form_token}`,
        ]) {
          const r = await fetch(url, { method: 'POST', headers: authHeaders, body: formBody });
          const bodyText = await r.text();
          if (r.ok) {
            send({ progress: 59, status: `フォーム送信OK: ${bodyText.slice(0, 120)}` });
            // bodyTextをストリームとして再構成
            resumeRes = new Response(bodyText, {
              headers: { 'content-type': r.headers.get('content-type') ?? '' },
            });
            break;
          }
          lastErr += `\n${url} → ${r.status}: ${bodyText.slice(0, 80)}`;
          if (r.status !== 404) break;
        }

        if (!resumeRes) {
          send({ error: `フォーム送信失敗:${lastErr}` });
          controller.close();
          return;
        }

        const nodeOutputs: Record<string, string> = {};
        const contentType = resumeRes.headers.get('content-type') ?? '';

        if (contentType.includes('text/event-stream') || contentType.includes('application/x-ndjson')) {
          // ─── SSEストリームを読む（dify-createと同じロジック）─────────────
          send({ progress: 60, status: 'ワークフロー再開中（ストリーム受信）...' });

          const reader = resumeRes.body!.getReader();
          const decoder = new TextDecoder();
          let lineBuffer = '';
          let progressVal = 60;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            lineBuffer += decoder.decode(value, { stream: true });
            const lines = lineBuffer.split('\n');
            lineBuffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              try {
                const data = JSON.parse(line.slice(6));

                if (data.event === 'node_started') {
                  progressVal = Math.min(progressVal + 5, 75);
                  const title = data.data?.title || '';
                  send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });
                } else if (data.event === 'node_finished') {
                  progressVal = Math.min(progressVal + 2, 78);
                  const nodeTitle = data.data?.title || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                  const outputs = data.data?.outputs;
                  if (outputs && typeof outputs === 'object') {
                    const nodeText = Object.entries(outputs as Record<string, unknown>)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (nodeText.trim()) nodeOutputs[nodeTitle] = nodeText;
                  }
                  send({ progress: progressVal });
                } else if (data.event === 'workflow_finished') {
                  const wfOutputs = data.data?.outputs;
                  if (wfOutputs && typeof wfOutputs === 'object') {
                    const wfText = Object.entries(wfOutputs as Record<string, unknown>)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                  }
                  break;
                }
              } catch { /* JSON parse error */ }
            }
          }

          send({ progress: 79, status: `ストリーム完了 (出力: ${Object.keys(nodeOutputs).length}件)` });

        } else {
          // ─── SSEでない場合: ポーリングフォールバック ──────────────────────
          send({ progress: 60, status: `フォーム送信OK (${contentType || 'no content-type'})。ポーリング中...` });

          const runId = (workflow_run_id && workflow_run_id !== 'undefined') ? workflow_run_id : task_id;
          const logsUrl = `${baseUrl}/workflows/logs?page=1&limit=5`;
          const pollHeaders = { Authorization: `Bearer ${apiKey}` };
          const MAX_WAIT_MS = 240_000;
          const pollStart = Date.now();
          let pollCount = 0;

          while (Date.now() - pollStart < MAX_WAIT_MS) {
            await new Promise(r => setTimeout(r, 12_000));
            pollCount++;

            try {
              const r = await fetch(logsUrl, { headers: pollHeaders });
              if (!r.ok) continue;
              const json = await r.json();
              if (!Array.isArray(json.data) || json.data.length === 0) continue;

              type LogItem = Record<string, unknown> & { workflow_run?: Record<string, unknown> };
              const item: LogItem = (json.data as LogItem[]).find((x) =>
                x.workflow_run_id === runId || x.id === runId || x.workflow_run?.id === runId,
              ) ?? (json.data[0] as LogItem);

              const wfRun = (item.workflow_run ?? {}) as Record<string, unknown>;
              const status = String(wfRun.status ?? '');
              const finishedAt = wfRun.finished_at;

              // 毎回ステータスを表示（デバッグ中）
              send({ progress: Math.min(62 + pollCount, 75), status: `[${pollCount}] status="${status}" finished_at=${finishedAt}` });

              if (status === 'succeeded' || (finishedAt && String(finishedAt) !== 'null' && String(finishedAt) !== '0')) {
                // 完了時: wfRunの全キーをダンプして出力パスを確認
                const wfKeys2 = Object.keys(wfRun).join(',');
                const itemKeys2 = Object.keys(item).join(',');
                send({ progress: 76, status: `完了! wfRun keys=[${wfKeys2}] item keys=[${itemKeys2}]` });

                // details からノード出力を取得
                type NodeDetail = Record<string, unknown>;
                const details = Array.isArray(item.details) ? (item.details as NodeDetail[]) : [];
                for (const node of details) {
                  const title = String(node.title ?? node.node_id ?? `node_${Object.keys(nodeOutputs).length + 1}`);
                  const nodeOut = node.outputs as Record<string, unknown> | undefined;
                  if (nodeOut && Object.keys(nodeOut).length > 0) {
                    const text = Object.entries(nodeOut)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (text.trim()) nodeOutputs[title] = text;
                  }
                }
                // item直下のoutputsも試す
                if (Object.keys(nodeOutputs).length === 0 && item.outputs && typeof item.outputs === 'object') {
                  const rawOut = item.outputs as Record<string, unknown>;
                  const text = Object.entries(rawOut)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (text.trim()) nodeOutputs['workflow_outputs'] = text;
                }
                send({ progress: 78, status: `ポーリング完了 (出力: ${Object.keys(nodeOutputs).length}件)` });
                break;
              }
              if (status === 'failed' || status === 'stopped') {
                send({ error: `ワークフロー失敗: ${status}` });
                controller.close();
                return;
              }
            } catch { /* ネットワークエラー */ }
          }
        }

        // ─── GitHub コミット + Vercel デプロイ ───────────────────────────────
        const githubToken = process.env.GITHUB_TOKEN ?? '';
        const vercelToken = process.env.VERCEL_TOKEN ?? '';
        const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';

        const nodeKeys = Object.keys(nodeOutputs);
        send({ progress: 80, status: `GitHubにコミット中... (出力: ${nodeKeys.length}件)` });
        const commitStart = Date.now();

        const designColors = parseDesignMdColors(nodeOutputs);
        const difyFiles = await readAndFixDifyFiles(client_slug, company_name, githubToken, designColors);

        const filesToCommit: Array<{ path: string; content: string }> = [
          ...difyFiles,
          {
            path: `src/app/${client_slug}/layout.tsx`,
            content: `import './globals.css';\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`,
          },
          {
            path: `src/app/${client_slug}/resources.json`,
            content: JSON.stringify(nodeOutputs, null, 2),
          },
          {
            path: `src/app/${client_slug}/resources/page.tsx`,
            content: buildResourcesPage(client_slug, company_name),
          },
        ];

        send({ progress: 82, status: `${filesToCommit.length}ファイルをコミット中...` });

        let committed = false;
        let lastError = '';
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
          const result = await batchGitCommit(
            filesToCommit,
            `feat: generate portal for ${client_slug} [resumed, ${nodeKeys.length} nodes]`,
            githubToken,
          );
          if (result.ok) { committed = true; break; }
          lastError = result.error ?? 'unknown';
          send({ progress: 82 + attempt, status: `コミット再試行 (${attempt + 1}/3)...` });
        }

        if (!committed) {
          send({ progress: 83, status: `コミット失敗: ${lastError.slice(0, 80)}` });
        } else {
          send({ progress: 84, status: 'コミット完了！' });
        }

        await removeFromExcludedDirs(client_slug, githubToken);
        send({ progress: 85, status: 'Vercelデプロイ起動待ち...' });

        if (vercelToken && vercelProjectId) {
          await waitForVercelDeploy(commitStart, vercelToken, vercelProjectId, send);
        } else {
          send({ progress: 85, status: 'GitHubコミット完了。', dify_done: true });
        }
      } catch (err) {
        send({ error: String(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
