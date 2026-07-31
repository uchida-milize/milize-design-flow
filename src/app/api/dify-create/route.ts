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
        let workflowRunId = '';
        let formToken = '';
        let capturedUrls: string[] = [];
        let workflowFinished = false;
        let humanInputDetected = false;
        let humanInputExtraReads = 0; // 検知後に追加で読むチャンク数

        while (true) {
          const { done, value } = await reader.read().catch(() => ({ done: true, value: undefined }));
          if (done) break;

          lineBuffer += decoder.decode(value as Uint8Array, { stream: true });
          const lines = lineBuffer.split(/\r?\n/);
          lineBuffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const data = JSON.parse(line.slice(6));

              // task_id / workflow_run_id を取得
              if (data.task_id && !taskId) taskId = data.task_id;
              if (data.workflow_run_id && !workflowRunId) workflowRunId = data.workflow_run_id;
              if (data.event === 'workflow_started' && data.data?.id && !workflowRunId) {
                workflowRunId = data.data.id;
              }

              // デバッグ: 全イベント名をログ
              if (data.event && data.event !== 'node_started' && data.event !== 'node_finished' && data.event !== 'workflow_started') {
                send({ progress: progressVal, status: `EVT:${data.event}` });
              }

              if (data.event === 'workflow_started') {
                progressVal = 20;
                send({ progress: progressVal, status: 'ワークフロー開始...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 8, 55);
                const title = data.data?.title || '';
                send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });

                // Human Input ノード（URL選択）を検知
                if (!humanInputDetected && (title === 'URL選択' || title.includes('選択') || title.includes('human') || title.includes('Human'))) {
                  humanInputDetected = true;
                  // node_started のデータからも form_token を探す
                  const ftFromStart = data.data?.form_token || data.data?.inputs?.form_token
                    || data.data?.extras?.form_token || data.data?.node_data?.form_token || '';
                  if (ftFromStart) formToken = ftFromStart;
                  send({ progress: progressVal, status: `Human Inputノード検知: "${title}" ft="${ftFromStart}" urls=${capturedUrls.length}件` });
                }
              } else if (data.event === 'node_finished') {
                progressVal = Math.min(progressVal + 2, 58);
                const nodeTitle = data.data?.title || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                const outputs = data.data?.outputs;
                if (outputs && typeof outputs === 'object') {
                  // URL一覧をキャプチャ（あらゆる配列・文字列キーを試す）
                  const outEntries = Object.entries(outputs as Record<string, unknown>);
                  let foundUrls: string[] = [];

                  // まず既知のキーを優先
                  const knownKey = (outputs as Record<string, unknown>).url_list
                    ?? (outputs as Record<string, unknown>).urls
                    ?? (outputs as Record<string, unknown>).result
                    ?? (outputs as Record<string, unknown>).output
                    ?? (outputs as Record<string, unknown>).url_array;
                  if (Array.isArray(knownKey) && knownKey.length > 0) {
                    foundUrls = knownKey.map((u: unknown) => typeof u === 'string' ? u : String(u)).filter(u => u.startsWith('http'));
                  } else if (typeof knownKey === 'string' && knownKey.includes('http')) {
                    foundUrls = knownKey.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
                  }

                  // 未発見なら全フィールドを検索
                  if (foundUrls.length === 0) {
                    for (const [, v] of outEntries) {
                      if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'string' && v[0].startsWith('http')) {
                        foundUrls = v.filter((u: unknown) => typeof u === 'string' && u.startsWith('http'));
                        break;
                      } else if (typeof v === 'string' && v.includes('http://') || typeof v === 'string' && v.includes('https://')) {
                        const lines = v.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
                        if (lines.length > 0) { foundUrls = lines; break; }
                      }
                    }
                  }

                  if (foundUrls.length > 0) {
                    capturedUrls = foundUrls;
                    send({ progress: progressVal, status: `URL ${capturedUrls.length}件を取得` });
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
                // form_token を取得（様々なパスを試す）
                const ft =
                  data.data?.form_token ||
                  data.form_token ||
                  data.data?.node_data?.form_token ||
                  data.data?.extras?.form?.token ||
                  data.data?.inputs?.form_token ||
                  '';

                // interruptイベント受信 → タイマーをキャンセル
                if (humanInputTimer) { clearTimeout(humanInputTimer); humanInputTimer = null; }
                // デバッグ: form_tokenの取得パスと値を確認
                const dataKeys = data.data ? Object.keys(data.data as object).join(',') : 'none';
                send({ progress: progressVal, status: `INT event=${data.event} ft="${ft}" data_keys=[${dataKeys}]` });
                if (ft) formToken = ft;

                // 人間の入力ノードで一時停止 → フロントへ返す
                workflowFinished = true;
                send({
                  interrupted: true,
                  task_id: taskId || data.task_id || '',
                  workflow_run_id: workflowRunId || data.workflow_run_id || '',
                  form_token: formToken,
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

          // Human Input 検知済みで workflow が終わっていない場合:
          // Promise.race で 5 秒タイムアウトしながらもう1チャンク読んで form_token を探す
          if (humanInputDetected && !workflowFinished) {
            if (humanInputExtraReads++ === 0) {
              const timedOut = new Promise<{ done: true; value: undefined }>(r =>
                setTimeout(() => r({ done: true, value: undefined }), 5000),
              );
              const { done: nd, value: nv } = await Promise.race([
                reader.read().catch(() => ({ done: true as const, value: undefined })),
                timedOut,
              ]);
              if (!nd && nv) {
                lineBuffer += decoder.decode(nv as Uint8Array, { stream: true });
                const extraLines = lineBuffer.split(/\r?\n/);
                lineBuffer = extraLines.pop() ?? '';
                for (const el of extraLines) {
                  if (!el.startsWith('data: ')) continue;
                  try {
                    const d = JSON.parse(el.slice(6));
                    const ft = d.data?.form_token || d.form_token || d.data?.node_data?.form_token
                      || d.data?.extras?.form?.token || d.data?.inputs?.form_token || '';
                    if (ft) { formToken = ft; send({ status: `INT-EXTRA ft="${ft}"` }); }
                    else send({ status: `EXTRA-EVT:${d.event ?? 'unknown'} (no ft)` });
                  } catch { /* skip */ }
                }
              }
            }
            break; // 最大1回の追加読み取りで終了
          }
        }

        // フォールバック: workflow_finished が来ずにストリームが終了
        // → 人間の入力ノードで停止したとみなす（URLがなくても送信）
        if (!workflowFinished && taskId) {
          send({ progress: progressVal, status: `FALLBACK: urls=${capturedUrls.length} ft="${formToken}"` });
          send({
            interrupted: true,
            task_id: taskId,
            workflow_run_id: workflowRunId,
            form_token: formToken,
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
