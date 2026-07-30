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
  const { company_name, client_slug, selected_urls } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        send({ progress: 10, status: 'Difyに接続中...' });

        const difyRes = await fetch(`${process.env.DIFY_BASE_URL}/workflows/run`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: {
              company_name,
              client_slug,
              ...(selected_urls ? { selected_urls } : {}),
            },
            response_mode: 'streaming',
            user: 'milize-admin',
          }),
        });

        if (!difyRes.ok) {
          const errText = await difyRes.text();
          send({ error: `Dify API error ${difyRes.status}: ${errText.slice(0, 200)}` });
          controller.close();
          return;
        }

        send({ progress: 20, status: 'ワークフロー実行中...' });

        const reader = difyRes.body!.getReader();
        const decoder = new TextDecoder();
        let progressVal = 20;
        const nodeOutputs: Record<string, string> = {};
        let lineBuffer = '';
        let taskId = '';
        let capturedUrls: string[] = [];
        let workflowFinished = false;

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

              // task_id を最初のイベントから取得
              if (data.task_id && !taskId) taskId = data.task_id;

              if (data.event === 'workflow_started') {
                progressVal = 20;
                send({ progress: progressVal, status: 'ワークフロー開始...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 8, 55);
                const title = data.data?.title || '';
                send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });
              } else if (data.event === 'node_finished') {
                progressVal = Math.min(progressVal + 2, 58);
                const nodeTitle = data.data?.title || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                const outputs = data.data?.outputs;
                if (outputs && typeof outputs === 'object') {
                  // URL一覧をキャプチャ（配列 or 改行区切り文字列どちらも対応）
                  const urlList = outputs.url_list ?? outputs.urls ?? outputs.result;
                  if (Array.isArray(urlList) && urlList.length > 0) {
                    capturedUrls = urlList.map((u: unknown) => typeof u === 'string' ? u : String(u));
                  } else if (typeof urlList === 'string' && urlList.includes('http')) {
                    capturedUrls = urlList.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
                  }
                  const nodeText = Object.entries(outputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (nodeText.trim()) nodeOutputs[nodeTitle] = nodeText;
                }
                send({ progress: progressVal });
              } else if (
                data.event === 'workflow_interrupted' ||
                data.event === 'human_input_required' ||
                data.event === 'node_interrupted'
              ) {
                // 人間の入力ノードで一時停止 → フロントへ返す
                workflowFinished = true; // これ以上処理不要
                send({
                  interrupted: true,
                  task_id: taskId || data.task_id || '',
                  urls: capturedUrls,
                  progress: progressVal,
                  status: 'URL確認待ち',
                });
                controller.close();
                return;
              } else if (data.event === 'workflow_finished') {
                workflowFinished = true;
                const githubToken = process.env.GITHUB_TOKEN ?? '';
                const vercelToken = process.env.VERCEL_TOKEN ?? '';
                const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';

                const wfOutputs = data.data?.outputs;
                if (wfOutputs && typeof wfOutputs === 'object') {
                  const wfText = Object.entries(wfOutputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                }

                const nodeKeys = Object.keys(nodeOutputs);
                send({ progress: 60, status: `GitHubにコミット中... (ノード出力: ${nodeKeys.length}件)` });
                const commitStart = Date.now();

                send({ progress: 61, status: 'Dify生成ファイルを読み込み中...' });
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

                send({ progress: 62, status: `${filesToCommit.length}ファイルをバッチコミット中...` });

                let committed = false;
                let lastError = '';
                for (let attempt = 0; attempt < 3; attempt++) {
                  if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
                  const result = await batchGitCommit(
                    filesToCommit,
                    `feat: generate portal for ${client_slug} [${nodeKeys.length} nodes]`,
                    githubToken,
                  );
                  if (result.ok) { committed = true; break; }
                  lastError = result.error ?? 'unknown';
                  send({ progress: 62 + attempt, status: `コミット再試行 (${attempt + 1}/3): ${lastError.slice(0, 60)}` });
                }

                if (!committed) {
                  send({ progress: 63, status: `バッチコミット失敗: ${lastError.slice(0, 80)}` });
                } else {
                  send({ progress: 64, status: 'バッチコミット完了！' });
                }

                await removeFromExcludedDirs(client_slug, githubToken);
                send({ progress: 65, status: 'GitHubコミット完了。Vercelデプロイ起動待ち...' });

                if (vercelToken && vercelProjectId) {
                  await waitForVercelDeploy(commitStart, vercelToken, vercelProjectId, send);
                } else {
                  send({ progress: 65, status: 'GitHubコミット完了。Vercelデプロイ待機中...', dify_done: true });
                }
              }
            } catch { /* JSON parse error — skip */ }
          }
        }

        // フォールバック: workflow_finished が来ずにストリームが終了
        // → 人間の入力ノードで停止したとみなす（URLがなくても送信）
        if (!workflowFinished && taskId) {
          send({
            interrupted: true,
            task_id: taskId,
            urls: capturedUrls,
            progress: progressVal,
            status: 'URL確認待ち',
          });
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
