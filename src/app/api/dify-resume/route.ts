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
  const { task_id, form_token, selected_urls, company_name, client_slug } = await req.json();

  if (!form_token && !task_id) {
    return Response.json({ error: 'form_token が指定されていません' }, { status: 400 });
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

        send({ progress: 58, status: 'URLを送信してワークフローを再開中...' });

        if (!form_token) {
          send({ error: 'form_token が見つかりません。DifyのHuman Inputノードを "WebApp" 配信に設定してください。' });
          controller.close();
          return;
        }

        // 正しいエンドポイント: POST /form/human_input/{form_token}
        const submitRes = await fetch(
          `${baseUrl}/form/human_input/${form_token}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: {
                selected_urls: Array.isArray(selected_urls)
                  ? selected_urls.join('\n')
                  : selected_urls,
              },
              action: 'action_1',
              user: 'milize-admin',
            }),
          },
        );

        if (!submitRes.ok) {
          const errText = await submitRes.text();
          send({ error: `Human Input submit error ${submitRes.status}: ${errText.slice(0, 300)}` });
          controller.close();
          return;
        }

        send({ progress: 60, status: 'ワークフロー再開。残りのノードを実行中...' });

        // ワークフローの残りのSSEイベントを受信: GET /workflow/{task_id}/events
        const eventsRes = await fetch(
          `${baseUrl}/workflow/${task_id}/events?user=milize-admin`,
          {
            headers: { Authorization: `Bearer ${apiKey}` },
          },
        );

        if (!eventsRes.ok) {
          const errText = await eventsRes.text();
          // eventsエンドポイントが使えない場合はworkflow_finishedを待たず処理続行
          send({ progress: 62, status: `イベント取得エラー(${eventsRes.status})。GitHubコミットを試みます...` });
          // fall through to GitHub commit with empty nodeOutputs
        }

        const decoder = new TextDecoder();
        let progressVal = 60;
        const nodeOutputs: Record<string, string> = {};
        let workflowFinished = false;

        // eventsエンドポイントが使える場合はSSEを読み取る
        if (eventsRes.ok && eventsRes.body) {
          const reader = eventsRes.body.getReader();
          let lineBuffer = '';

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
                    const nodeText = Object.entries(outputs)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (nodeText.trim()) nodeOutputs[nodeTitle] = nodeText;
                  }
                  send({ progress: progressVal });
                } else if (data.event === 'workflow_finished') {
                  workflowFinished = true;
                  const wfOutputs = data.data?.outputs;
                  if (wfOutputs && typeof wfOutputs === 'object') {
                    const wfText = Object.entries(wfOutputs)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                  }
                  break;
                }
              } catch { /* JSON parse error — skip */ }
            }
            if (workflowFinished) break;
          }
        }

        // GitHub コミット + Vercel デプロイ
        {
          const githubToken = process.env.GITHUB_TOKEN ?? '';
          const vercelToken = process.env.VERCEL_TOKEN ?? '';
          const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';
          const nodeKeys = Object.keys(nodeOutputs);

          send({ progress: 80, status: `GitHubにコミット中... (ノード出力: ${nodeKeys.length}件)` });
          const commitStart = Date.now();

          send({ progress: 81, status: 'Dify生成ファイルを読み込み中...' });
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

          send({ progress: 82, status: `${filesToCommit.length}ファイルをバッチコミット中...` });

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
            send({ progress: 82 + attempt, status: `コミット再試行 (${attempt + 1}/3): ${lastError.slice(0, 60)}` });
          }

          if (!committed) {
            send({ progress: 83, status: `バッチコミット失敗: ${lastError.slice(0, 80)}` });
          } else {
            send({ progress: 84, status: 'バッチコミット完了！' });
          }

          await removeFromExcludedDirs(client_slug, githubToken);
          send({ progress: 85, status: 'GitHubコミット完了。Vercelデプロイ起動待ち...' });

          if (vercelToken && vercelProjectId) {
            await waitForVercelDeploy(commitStart, vercelToken, vercelProjectId, send);
          } else {
            send({ progress: 85, status: 'GitHubコミット完了。Vercelデプロイ待機中...', dify_done: true });
          }
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
