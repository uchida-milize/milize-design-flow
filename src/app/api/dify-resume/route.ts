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

        // ── ワークフロー再開 ──────────────────────────────────────────────────
        // 正しいエンドポイント: app.dify.milize.com/api/form/human_input/{form_token}
        // ペイロード: { inputs: { selected_urls }, action: "action_1" }
        const resumeBody = JSON.stringify({
          inputs: { selected_urls: urlsStr },
          action: 'action_1',
        });

        // DIFY_FORM_BASE が設定されていればそれを使い、なければ api. → app. に変換
        const formBase = (process.env.DIFY_FORM_BASE ?? baseUrl.replace('api.', 'app.').replace(/\/v\d+\/?$/, ''));
        log(`formBase="${formBase}"`);

        // 試すエンドポイント一覧
        type ResumeCandidate = [string, string, string];
        const candidates: ResumeCandidate[] = [];

        // 1. app.dify.milize.com/api/form/human_input/{token}（正解）
        candidates.push(['app/api', `${formBase}/api/form/human_input/${form_token}`, `Bearer ${apiKey}`]);
        // 2. フォールバック: api ドメイン
        candidates.push(['api/form', `${baseUrl.replace(/\/v\d+\/?$/, '')}/form/human_input/${form_token}`, `Bearer ${apiKey}`]);
        // 3. task_id ベース（旧 Dify 互換）
        candidates.push(['task_id/resume', `${baseUrl}/workflows/tasks/${task_id}/resume`, `Bearer ${apiKey}`]);

        let resumeRes: Response | null = null;
        for (const [label, url, auth] of candidates) {
          log(`試行[${label}]: POST ${url}`);
          try {
            const r = await fetch(url, {
              method: 'POST',
              headers: { Authorization: auth, 'Content-Type': 'application/json' },
              body: resumeBody,
            });
            const ct = r.headers.get('content-type') ?? '';
            const bodyPreview = await r.clone().text().then(t => t.slice(0, 200));
            log(`結果[${label}]: ${r.status} ct=${ct} body=${bodyPreview}`);
            send({ progress: 59, status: `[${label}] ${r.status}` });
            if (r.ok) {
              resumeRes = r;
              log(`✓ 再開成功: ${label}`);
              break;
            }
          } catch (e) {
            log(`エラー[${label}]: ${e}`);
          }
        }

        if (!resumeRes) {
          send({ error: 'ワークフロー再開失敗: 全エンドポイントが失敗（_debug.txt を確認してください）' });
          controller.close();
          return;
        }

        const resumeCT = resumeRes.headers.get('content-type') ?? '';
        log(`resume 成功: ct=${resumeCT}`);

        send({ progress: 60, status: 'ワークフロー再開。残りのノードを実行中...' });

        const nodeOutputs: Record<string, string> = {};

        if (resumeCT.includes('event-stream')) {
          // ── SSE ストリーム読み取り（タスク再開が SSE を返す場合）──────────────
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
        } else {
          // ── ポーリング（form/human_input は 200 OK + 空ボディ）───────────────
          // 5秒×48回=240秒（maxDuration=300 以内）
          // workflow_run_id と task_id の両方で試す
          const pollIds = [workflow_run_id, task_id].filter(Boolean);
          let progressVal = 62;
          let workflowDone = false;
          let pollCount = 0;
          const maxPolls = 48; // 最大 4分 (5秒×48)

          log(`ポーリング開始 pollIds=${JSON.stringify(pollIds)}`);

          const fetchNodeExecutions = async (runId: string) => {
            const nodeRes = await fetch(`${baseUrl}/workflows/runs/${runId}/node-executions?limit=100`, {
              headers: { Authorization: `Bearer ${apiKey}` },
            });
            if (!nodeRes.ok) {
              log(`node-executions[${runId}]: ${nodeRes.status}`);
              return;
            }
            const nodeData = await nodeRes.json() as { data?: Array<{ title?: string; outputs?: Record<string, unknown> }> };
            let added = 0;
            for (const node of nodeData.data ?? []) {
              if (node.outputs && node.title && !nodeOutputs[node.title]) {
                const nodeText = Object.entries(node.outputs)
                  .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                  .join('\n\n---\n\n');
                if (nodeText.trim()) { nodeOutputs[node.title] = nodeText; added++; }
              }
            }
            log(`node-executions: +${added}件 (合計${Object.keys(nodeOutputs).length}件)`);
          };

          while (!workflowDone && pollCount < maxPolls) {
            await new Promise(r => setTimeout(r, 5000));
            pollCount++;
            progressVal = Math.min(62 + pollCount, 78);

            for (const runId of pollIds) {
              try {
                const pollRes = await fetch(`${baseUrl}/workflows/runs/${runId}`, {
                  headers: { Authorization: `Bearer ${apiKey}` },
                });
                if (!pollRes.ok) {
                  log(`poll[${pollCount}][${runId.slice(0, 8)}]: ${pollRes.status}`);
                  continue;
                }
                const pollData = await pollRes.json() as { status: string; error?: string; outputs?: Record<string, unknown> };
                const status = pollData.status;
                log(`poll[${pollCount}]: status="${status}"`);
                send({ progress: progressVal, status: `ワークフロー処理中... (${pollCount}回目)` });

                if (status === 'succeeded' || status === 'failed' || status === 'stopped') {
                  workflowDone = true;
                  if (pollData.outputs && typeof pollData.outputs === 'object') {
                    const wfText = Object.entries(pollData.outputs)
                      .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                      .join('\n\n---\n\n');
                    if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                  }
                  await fetchNodeExecutions(runId);
                  if (status === 'failed') log(`workflow failed: ${pollData.error ?? 'unknown'}`);
                  break;
                }
              } catch (e) {
                log(`poll error[${pollCount}]: ${e}`);
              }
            }
            if (workflowDone) break;
          }

          if (!workflowDone) {
            log(`ポーリングタイムアウト (${pollCount}回) → node-executions を最終取得`);
            // タイムアウトでも node-executions だけは取得を試みる
            for (const runId of pollIds) {
              await fetchNodeExecutions(runId);
            }
            send({ progress: 78, status: 'Difyが処理中です。数分後にポータルをご確認ください。' });
          }
        }

        log(`完了: nodeOutputs=${Object.keys(nodeOutputs).length}件`);
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
          // nodeOutputs が空の場合は resources.json を上書きしない
          ...(nodeKeys.length > 0 ? [{
            path: `src/app/${client_slug}/resources.json`,
            content: JSON.stringify(nodeOutputs, null, 2),
          }] : []),
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
