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

      // ── インメモリ デバッグログ（最後に GitHub へコミット）──────────────
      const debugLog: string[] = [];
      const log = (msg: string) => {
        const ts = new Date().toISOString();
        const line = `${ts}  ${msg}`;
        debugLog.push(line);
        console.log('[dify-resume]', msg);
        return line;
      };

      try {
        const apiKey = process.env.DIFY_API_KEY ?? '';
        const baseUrl = process.env.DIFY_BASE_URL ?? '';

        log(`START form_token="${form_token}" workflow_run_id="${workflow_run_id}" task_id="${task_id}" client="${client_slug}"`);
        send({ progress: 58, status: `受信: ft="${form_token?.slice(0, 20)}..." wf_run_id="${workflow_run_id?.slice(0, 20)}..."` });

        const urlsStr = Array.isArray(selected_urls)
          ? selected_urls.join('\n')
          : String(selected_urls ?? '');

        const formBody = JSON.stringify({
          inputs: { selected_urls: urlsStr },
          user: 'milize-admin',
        });
        const authHeaders = {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        // フォーム送信（v1付き → v1なし の順で試す）
        let resumeRes: Response | null = null;
        let lastErr = '';
        for (const url of [
          `${baseUrl}/form/human_input/${form_token}`,
          `${baseWithoutVersion}/form/human_input/${form_token}`,
        ]) {
          console.log('[dify-resume] POST', url);
          const r = await fetch(url, { method: 'POST', headers: authHeaders, body: formBody });
          const bodyText = await r.text();
          const ct = r.headers.get('content-type') ?? 'none';
          log(`POST ${url} → ${r.status} ct=${ct} body=${bodyText.slice(0, 200)}`);
          if (r.ok) {
            send({ progress: 59, status: `フォーム送信OK: ${r.status} ct=${ct} body=${bodyText.slice(0, 100)}` });
            resumeRes = new Response(bodyText, {
              headers: { 'content-type': ct },
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
          log(`ポーリング開始 runId="${workflow_run_id || task_id}" contentType="${contentType}"`);
          send({ progress: 60, status: `フォーム送信OK (${contentType || 'no content-type'})。ポーリング中...` });

          const runId = (workflow_run_id && workflow_run_id !== 'undefined') ? workflow_run_id : task_id;
          const logsUrl = `${baseUrl}/workflows/logs?page=1&limit=20`;
          const pollHeaders = { Authorization: `Bearer ${apiKey}` };
          const MAX_WAIT_MS = 240_000;
          const pollStart = Date.now();
          let pollCount = 0;

          while (Date.now() - pollStart < MAX_WAIT_MS) {
            await new Promise(r => setTimeout(r, 12_000));
            pollCount++;

            try {
              const r = await fetch(logsUrl, { headers: pollHeaders });
              if (!r.ok) { log(`logs API ${r.status}`); continue; }
              const json = await r.json();
              if (!Array.isArray(json.data) || json.data.length === 0) continue;

              type LogItem = Record<string, unknown> & { workflow_run?: Record<string, unknown> };
              const allItems = json.data as LogItem[];

              // runId で一致するものを優先、なければ最新（インデックス0）
              const item: LogItem = allItems.find((x) =>
                x.workflow_run_id === runId || x.id === runId || x.workflow_run?.id === runId,
              ) ?? allItems[0];

              const wfRun = (item.workflow_run ?? {}) as Record<string, unknown>;
              const status = String(wfRun.status ?? '');
              const finishedAt = wfRun.finished_at;
              const itemRunId = String(item.workflow_run_id ?? (wfRun.id ?? item.id ?? ''));

              log(`[${pollCount}] status="${status}" finishedAt=${finishedAt} runId=${itemRunId}`);
              send({ progress: Math.min(62 + pollCount, 75), status: `[${pollCount}] status="${status}" finished_at=${finishedAt}` });

              if (status === 'succeeded' || (finishedAt && String(finishedAt) !== 'null' && String(finishedAt) !== '0')) {
                log(`完了検知: wfRun keys=[${Object.keys(wfRun).join(',')}] item keys=[${Object.keys(item).join(',')}]`);
                send({ progress: 76, status: `完了! ノード出力を取得中...` });

                // ① list API の details（通常は空）
                type NodeDetail = Record<string, unknown>;
                const listDetails = Array.isArray(item.details) ? (item.details as NodeDetail[]) : [];
                for (const node of listDetails) {
                  const title = String(node.title ?? node.node_id ?? `node_${Object.keys(nodeOutputs).length + 1}`);
                  const nodeOut = node.outputs as Record<string, unknown> | undefined;
                  if (nodeOut && Object.keys(nodeOut).length > 0) {
                    const text = Object.entries(nodeOut)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (text.trim()) nodeOutputs[title] = text;
                  }
                }
                log(`list details: ${listDetails.length}件 → nodeOutputs=${Object.keys(nodeOutputs).length}件`);

                // ② 個別ログ詳細 API (GET /workflows/logs/{log_id})
                const logId = String(item.id ?? '');
                if (logId) {
                  const detailUrl = `${baseUrl}/workflows/logs/${logId}`;
                  log(`個別詳細取得: GET ${detailUrl}`);
                  send({ progress: 77, status: `ログ詳細取得中 (log_id=${logId.slice(0, 12)}...)` });
                  const detailRes = await fetch(detailUrl, { headers: pollHeaders });
                  const detailText = await detailRes.text();
                  log(`log detail ${detailRes.status}: ${detailText.slice(0, 500)}`);
                  send({ progress: 77, status: `log detail: ${detailRes.status} ${detailText.slice(0, 150)}` });

                  if (detailRes.ok) {
                    try {
                      const detail = JSON.parse(detailText) as Record<string, unknown>;
                      const detailNodes = Array.isArray(detail.details) ? (detail.details as NodeDetail[]) : [];
                      log(`detail.details: ${detailNodes.length}件`);
                      for (const node of detailNodes) {
                        const title = String(node.title ?? node.node_id ?? `node_${Object.keys(nodeOutputs).length + 1}`);
                        const nodeOut = node.outputs as Record<string, unknown> | undefined;
                        if (nodeOut && Object.keys(nodeOut).length > 0) {
                          const text = Object.entries(nodeOut)
                            .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                            .join('\n\n---\n\n');
                          if (text.trim()) nodeOutputs[title] = text;
                        }
                      }
                      // workflow_run.outputs も試す
                      if (Object.keys(nodeOutputs).length === 0) {
                        const wfRunD = (detail.workflow_run ?? {}) as Record<string, unknown>;
                        const wfOut = wfRunD.outputs ?? detail.outputs;
                        if (wfOut && typeof wfOut === 'object') {
                          const text = Object.entries(wfOut as Record<string, unknown>)
                            .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                            .join('\n\n---\n\n');
                          if (text.trim()) nodeOutputs['workflow_outputs'] = text;
                        }
                      }
                    } catch (e) { log(`detail parse error: ${e}`); }
                  }
                }

                // ③ item直下のoutputsも試す（fallback）
                if (Object.keys(nodeOutputs).length === 0 && item.outputs && typeof item.outputs === 'object') {
                  const rawOut = item.outputs as Record<string, unknown>;
                  const text = Object.entries(rawOut)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (text.trim()) nodeOutputs['workflow_outputs'] = text;
                }

                log(`ポーリング完了 nodeOutputs=${Object.keys(nodeOutputs).length}件`);
                send({ progress: 78, status: `ポーリング完了 (出力: ${Object.keys(nodeOutputs).length}件)` });
                break;
              }
              if (status === 'failed' || status === 'stopped') {
                log(`ワークフロー失敗: ${status}`);
                send({ error: `ワークフロー失敗: ${status}` });
                controller.close();
                return;
              }
            } catch (e) { log(`ポーリングエラー: ${e}`); }
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
          {
            path: `src/app/${client_slug}/_debug.txt`,
            content: debugLog.join('\n') + '\n',
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
