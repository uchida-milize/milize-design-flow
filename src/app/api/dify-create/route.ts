import { NextRequest } from 'next/server';
import {
  refreshAndCommitClientFiles,
  buildResourcesPage,
  parseDesignMdColors,
  readAndFixDifyFiles,
  removeFromExcludedDirs,
  waitForVercelDeploy,
} from '../_lib/portal-helpers';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const { company_name, client_slug, selected_urls, url1, url2, url3 } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // ── インメモリ デバッグログ ──────────────────────────────────────────
      const debugLog: string[] = [];
      const log = (msg: string) => {
        const line = `${new Date().toISOString()}  ${msg}`;
        debugLog.push(line);
        console.log('[dify-create]', msg);
      };

      try {
        log(`START company="${company_name}" slug="${client_slug}" selected_urls=${selected_urls ? 'yes' : 'no'} url1="${url1 ?? ''}" url2="${url2 ?? ''}" url3="${url3 ?? ''}"`);
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
              ...(url1 ? { URL1: url1 } : {}),
              ...(url2 ? { URL2: url2 } : {}),
              ...(url3 ? { URL3: url3 } : {}),
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
        let humanInputExtraReads = 0; // 検知後に追加で読むチャンク数（未使用変数として残す）
        let humanInputTimer: ReturnType<typeof setTimeout> | null = null; // interrupt イベント用タイマー（宣言）

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
                  // node_started のデータからも form_token を探す（全パスを試す）
                  const ftFromStart = data.data?.form_token || data.data?.inputs?.form_token
                    || data.data?.extras?.form?.token || data.data?.extras?.form_token
                    || data.data?.node_data?.form_token || data.data?.node_run_data?.form_token
                    || data.data?.metadata?.form_token || '';
                  if (ftFromStart) formToken = ftFromStart;
                  // デバッグ: node_started の全フィールドをダンプ
                  const rawDataDump = JSON.stringify(data.data ?? {}).slice(0, 600);
                  send({ progress: progressVal, status: `Human Inputノード検知: "${title}" ft="${ftFromStart}" urls=${capturedUrls.length}件 data=${rawDataDump}` });
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
                    content: `import './globals.css';\nimport type { ReactNode } from 'react';\nexport default function Layout({ children }: { children: ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`,
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

                send({ progress: 62, status: `${filesToCommit.length}ファイルをリフレッシュコミット中（旧ファイル全削除→新規追加）...` });

                let committed = false;
                let lastError = '';
                for (let attempt = 0; attempt < 3; attempt++) {
                  if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
                  const result = await refreshAndCommitClientFiles(
                    client_slug,
                    filesToCommit,
                    `feat: refresh portal for ${client_slug} [${nodeKeys.length} nodes]`,
                    githubToken,
                  );
                  if (result.ok) {
                    committed = true;
                    send({ progress: 63, status: `リフレッシュ完了（旧ファイル ${result.deletedCount ?? 0}件削除、新規${filesToCommit.length}件追加）` });
                    break;
                  }
                  lastError = result.error ?? 'unknown';
                  send({ progress: 62 + attempt, status: `コミット再試行 (${attempt + 1}/3): ${lastError.slice(0, 60)}` });
                }

                if (!committed) {
                  send({ progress: 63, status: `リフレッシュコミット失敗: ${lastError.slice(0, 80)}` });
                } else {
                  send({ progress: 64, status: 'リフレッシュコミット完了！' });
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
          // 最大10チャンク × 10秒タイムアウトで form_token を探す（shared pending read 方式）
          if (humanInputDetected && !workflowFinished) {
            humanInputExtraReads; // suppress unused warning
            // pendingRead を共有することで、タイムアウト時にチャンクをスキップしない
            let pendingRead: Promise<{ done: boolean; value: Uint8Array | undefined }> =
              reader.read().catch(() => ({ done: true as const, value: undefined }));

            for (let extraIdx = 0; extraIdx < 10 && !formToken; extraIdx++) {
              let resolved = false;
              let resolvedDone = false;
              let resolvedValue: Uint8Array | undefined;

              await Promise.race([
                pendingRead.then(r => {
                  resolved = true;
                  resolvedDone = r.done;
                  resolvedValue = r.value;
                }),
                new Promise<void>(res => setTimeout(res, 10_000)),
              ]);

              if (!resolved) {
                // タイムアウト: pendingRead はまだ pending → 次回も同じ promise を race
                send({ progress: progressVal, status: `EXTRA-TIMEOUT[${extraIdx + 1}/10]` });
                continue;
              }

              if (resolvedDone || !resolvedValue) {
                send({ progress: progressVal, status: `EXTRA-STREAM-DONE[${extraIdx + 1}]` });
                break; // ストリーム終了
              }

              // チャンクを処理して form_token を探す
              lineBuffer += decoder.decode(resolvedValue, { stream: true });
              const eLines = lineBuffer.split(/\r?\n/);
              lineBuffer = eLines.pop() ?? '';
              for (const el of eLines) {
                if (!el.startsWith('data: ')) continue;
                try {
                  const d = JSON.parse(el.slice(6));
                  const ft = d.data?.form_token || d.form_token || d.data?.node_data?.form_token
                    || d.data?.extras?.form?.token || d.data?.inputs?.form_token
                    || d.data?.node_run_data?.form_token || d.data?.metadata?.form_token || '';
                  if (ft) {
                    formToken = ft;
                    send({ progress: progressVal, status: `INT-EXTRA[${extraIdx + 1}] ft="${ft}"` });
                  } else {
                    send({ progress: progressVal, status: `EXTRA-EVT[${extraIdx + 1}]:${d.event ?? 'unknown'} (no ft)` });
                  }
                } catch { /* skip */ }
              }

              if (!formToken) {
                // 次のチャンクを読み始める（found → break はループ条件で対応）
                pendingRead = reader.read().catch(() => ({ done: true as const, value: undefined }));
              }
            }

            // SSE で form_token が取れない場合: Dify logs API からフォールバック取得
            if (!formToken && workflowRunId) {
              send({ progress: progressVal, status: 'SSEでft未取得。Dify logs APIを試行中...' });
              for (let attempt = 0; attempt < 3 && !formToken; attempt++) {
                await new Promise(r => setTimeout(r, 3000));
                try {
                  const logsRes = await fetch(`${process.env.DIFY_BASE_URL}/workflows/logs?page=1&limit=20`, {
                    headers: { Authorization: `Bearer ${process.env.DIFY_API_KEY}` },
                  });
                  if (!logsRes.ok) continue;
                  const logsJson = await logsRes.json() as { data?: Record<string, unknown>[] };
                  const logs = logsJson.data ?? [];
                  send({ progress: progressVal, status: `logs API[${attempt + 1}]: ${logs.length}件取得` });

                  const matchLog = logs.find((l) =>
                    l['workflow_run_id'] === workflowRunId ||
                    l['id'] === workflowRunId ||
                    (l['workflow_run'] as Record<string, unknown> | undefined)?.['id'] === workflowRunId,
                  ) ?? logs[0];

                  if (matchLog) {
                    const logKeys = Object.keys(matchLog).join(',');
                    const wfRun = (matchLog['workflow_run'] ?? {}) as Record<string, unknown>;
                    const ftFromLog = matchLog['form_token'] || wfRun['form_token'];
                    send({ progress: progressVal, status: `matchLog keys=[${logKeys}] wfRun.status=${wfRun['status']} ft="${ftFromLog ?? ''}"` });
                    if (ftFromLog) { formToken = String(ftFromLog); break; }

                    // 個別ログ詳細 API を試す
                    const logId = String(matchLog['id'] ?? '');
                    if (logId) {
                      const detailRes = await fetch(`${process.env.DIFY_BASE_URL}/workflows/logs/${logId}`, {
                        headers: { Authorization: `Bearer ${process.env.DIFY_API_KEY}` },
                      });
                      const detailText = await detailRes.text();
                      send({ progress: progressVal, status: `logs/${logId}: ${detailRes.status} ${detailText.slice(0, 300)}` });
                      if (detailRes.ok) {
                        try {
                          const detail = JSON.parse(detailText) as Record<string, unknown>;
                          const wfRunD = (detail['workflow_run'] ?? {}) as Record<string, unknown>;
                          const ftDetail = detail['form_token'] || wfRunD['form_token'] || '';
                          if (ftDetail) { formToken = String(ftDetail); }
                        } catch { /* ignore */ }
                      }
                    }
                  }
                } catch (e) {
                  send({ progress: progressVal, status: `logs API error: ${String(e).slice(0, 80)}` });
                }
              }
            }

            break; // メインループを終了（FALLBACK へ）
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
