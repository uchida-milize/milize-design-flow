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

  if (!task_id) {
    return Response.json({ error: 'task_id が指定されていません' }, { status: 400 });
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

        log(`START task_id="${task_id}" workflow_run_id="${workflow_run_id}" form_token="${form_token}" client="${client_slug}"`);
        send({ progress: 58, status: 'URLを送信してワークフローを再開中...' });

        const urlsStr = Array.isArray(selected_urls)
          ? selected_urls.join('\n')
          : String(selected_urls ?? '');

        // ── ワークフロー再開（元の動作していたエンドポイント）────────────────
        // POST /v1/workflows/tasks/{task_id}/resume がレスポンスとして SSE を返す
        log(`再開: POST /workflows/tasks/${task_id}/resume`);

        const resumeRes = await fetch(`${baseUrl}/workflows/tasks/${task_id}/resume`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: { selected_urls: urlsStr },
            action: 'action_1',
            user: 'milize-admin',
          }),
        });

        const resumeStatus = resumeRes.status;
        const resumeCT = resumeRes.headers.get('content-type') ?? '';
        log(`resume → ${resumeStatus} ct=${resumeCT}`);

        if (!resumeRes.ok) {
          const errText = await resumeRes.text();
          log(`resume error: ${errText.slice(0, 300)}`);

          // fallback: workflow_run_id でも試す
          if (workflow_run_id) {
            log(`fallback: POST /workflows/tasks/${workflow_run_id}/resume`);
            send({ progress: 59, status: `task_id失敗(${resumeStatus}) → workflow_run_id で再試行...` });

            const fbRes = await fetch(`${baseUrl}/workflows/tasks/${workflow_run_id}/resume`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                inputs: { selected_urls: urlsStr },
                action: 'action_1',
                user: 'milize-admin',
              }),
            });
            const fbText = await fbRes.text();
            log(`fallback → ${fbRes.status} ct=${fbRes.headers.get('content-type')} body=${fbText.slice(0, 100)}`);

            if (!fbRes.ok) {
              send({ error: `ワークフロー再開失敗 (task_id:${resumeStatus}, wf_run_id:${fbRes.status})` });
              controller.close();
              return;
            }
          } else {
            send({ error: `ワークフロー再開失敗 ${resumeStatus}: ${errText.slice(0, 150)}` });
            controller.close();
            return;
          }
        }

        send({ progress: 60, status: 'ワークフロー再開。残りのノードを実行中...' });

        const nodeOutputs: Record<string, string> = {};
        const sseReader = resumeRes.body!.getReader();
        const decoder = new TextDecoder();
        let lineBuffer = '';
        let progressVal = 60;
        let workflowDone = false;

        while (true) {
          const { done, value } = await sseReader.read().catch(() => ({ done: true, value: undefined }));
          if (done) break;

          lineBuffer += decoder.decode(value as Uint8Array, { stream: true });
          const lines = lineBuffer.split(/\r?\n/);
          lineBuffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const data = JSON.parse(line.slice(6));

              if (data.event === 'workflow_started') {
                log(`workflow_started run_id=${data.data?.id}`);
                send({ progress: 61, status: 'ワークフロー再開確認...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 5, 75);
                const title = (data.data?.title as string) || '';
                log(`node_started: "${title}"`);
                send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });
              } else if (data.event === 'node_finished') {
                progressVal = Math.min(progressVal + 2, 78);
                const nodeTitle = (data.data?.title as string) || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                const outputs = data.data?.outputs as Record<string, unknown> | undefined;
                if (outputs && typeof outputs === 'object') {
                  const nodeText = Object.entries(outputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (nodeText.trim()) {
                    nodeOutputs[nodeTitle] = nodeText;
                    log(`node_finished: "${nodeTitle}" (${nodeText.length} chars)`);
                  }
                }
                send({ progress: progressVal });
              } else if (data.event === 'workflow_finished') {
                workflowDone = true;
                const wfOutputs = data.data?.outputs as Record<string, unknown> | undefined;
                if (wfOutputs && typeof wfOutputs === 'object') {
                  const wfText = Object.entries(wfOutputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                }
                log(`workflow_finished: nodeOutputs=${Object.keys(nodeOutputs).length}件`);
              } else {
                log(`EVT:${data.event}`);
              }
            } catch { /* JSON parse error */ }
          }

          if (workflowDone) break;
        }

        log(`SSE完了: nodeOutputs=${Object.keys(nodeOutputs).length}件`);
        send({ progress: 79, status: `完了 (出力: ${Object.keys(nodeOutputs).length}件)` });

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
