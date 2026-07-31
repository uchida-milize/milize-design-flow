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

        // ── 新規ワークフロー開始（selected_urls を inputs に渡してバイパス）──
        // POST /form/human_input/ は 200 を返すが実際には再開しないため、
        // selected_urls を入力とした新規ランを起動する方式に変更。
        log(`新規ワークフロー開始: company="${company_name}" slug="${client_slug}" urls=${urlsStr.split('\n').length}件`);
        send({ progress: 59, status: '新規ワークフロー開始（selected_urls を入力として渡す）...' });

        const difyRes = await fetch(`${baseUrl}/workflows/run`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: { company_name, client_slug, selected_urls: urlsStr },
            response_mode: 'streaming',
            user: 'milize-admin',
          }),
        });

        if (!difyRes.ok) {
          const errText = await difyRes.text();
          log(`新規ワークフロー開始エラー: ${difyRes.status} ${errText.slice(0, 200)}`);
          send({ error: `Dify 新規ラン開始エラー ${difyRes.status}: ${errText.slice(0, 200)}` });
          controller.close();
          return;
        }

        log(`新規ワークフロー開始 OK: ${difyRes.status}`);
        send({ progress: 60, status: 'ワークフロー実行中（SSE受信）...' });

        const nodeOutputs: Record<string, string> = {};
        const sseReader = difyRes.body!.getReader();
        const decoder = new TextDecoder();
        let lineBuffer = '';
        let progressVal = 60;
        let workflowDone = false;
        let newWorkflowRunId = '';  // workflow_started で取得
        let formSubmitted = false;  // form 送信成功フラグ

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
                newWorkflowRunId = (data.data?.id as string) || '';
                log(`workflow_started run_id=${newWorkflowRunId}`);
                send({ progress: 61, status: 'ワークフロー開始...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 5, 75);
                const title = (data.data?.title as string) || '';
                log(`node_started: "${title}" data=${JSON.stringify(data.data ?? {}).slice(0, 300)}`);
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
              } else if (data.event === 'human_input_required') {
                // フレッシュな form_token を即座に取得して送信
                const rawDataDump = JSON.stringify(data.data ?? {}).slice(0, 600);
                log(`human_input_required: ${rawDataDump}`);
                send({ progress: 68, status: 'Human Input 検知 → フォーム即送信...' });

                const d = data.data ?? {};
                const freshToken: string =
                  (d as Record<string,unknown>).form_token as string ||
                  (d as Record<string,unknown>).token as string || '';

                log(`freshToken="${freshToken}"`);
                const tokenToUse = freshToken || form_token;
                if (tokenToUse) {
                  const flatBody = JSON.stringify({ selected_urls: urlsStr });
                  const baseWithoutV1 = baseUrl.replace(/\/v\d+\/?$/, '');
                  for (const [label, submitUrl, body] of [
                    ['flat/v1',   `${baseUrl}/form/human_input/${tokenToUse}`,       flatBody],
                    ['flat/noV1', `${baseWithoutV1}/form/human_input/${tokenToUse}`, flatBody],
                  ] as [string, string, string][]) {
                    const sr = await fetch(submitUrl, {
                      method: 'POST',
                      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                      body,
                    });
                    const srText = await sr.text();
                    log(`SUBMIT[${label}] → ${sr.status} body=${srText.slice(0, 100)}`);
                    if (sr.ok) { formSubmitted = true; break; }
                  }
                }
              } else if (data.event === 'workflow_paused') {
                log(`workflow_paused: run_id=${newWorkflowRunId}`);
                // SSE はここで閉じる。フォーム送信済みならポーリングへ移行する
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

        log(`SSE完了: nodeOutputs=${Object.keys(nodeOutputs).length}件 formSubmitted=${formSubmitted} runId=${newWorkflowRunId}`);
        send({ progress: 69, status: `SSE完了 (出力: ${Object.keys(nodeOutputs).length}件)` });

        // ── フォーム送信後ポーリング（SSE が閉じた後でワークフロー再開を待つ）──
        if (!workflowDone && formSubmitted && newWorkflowRunId) {
          log(`ポーリング開始: run_id=${newWorkflowRunId}`);
          send({ progress: 70, status: 'フォーム送信完了 → ワークフロー再開待ち（ポーリング）...' });

          type LogItem = Record<string, unknown> & { workflow_run?: Record<string, unknown> };
          type NodeDetail = Record<string, unknown>;
          const pollHeaders = { Authorization: `Bearer ${apiKey}` };
          const MAX_WAIT_MS = 240_000;
          const pollStart = Date.now();
          let pollCount = 0;

          while (Date.now() - pollStart < MAX_WAIT_MS) {
            await new Promise(r => setTimeout(r, 10_000));
            pollCount++;
            try {
              const r = await fetch(`${baseUrl}/workflows/logs?page=1&limit=20`, { headers: pollHeaders });
              if (!r.ok) { log(`POLL[${pollCount}] logs API ${r.status}`); continue; }
              const json = await r.json() as { data?: LogItem[] };
              const allItems = json.data ?? [];

              const item = allItems.find(x =>
                x.workflow_run_id === newWorkflowRunId ||
                (x.workflow_run as Record<string,unknown>|undefined)?.id === newWorkflowRunId,
              ) ?? allItems[0];

              if (!item) { log(`POLL[${pollCount}] no matching log`); continue; }

              const wfRun = (item.workflow_run ?? {}) as Record<string, unknown>;
              const status = String(wfRun.status ?? '');
              const finishedAt = wfRun.finished_at;

              log(`POLL[${pollCount}] status="${status}" finishedAt=${finishedAt}`);
              send({ progress: Math.min(70 + pollCount, 77), status: `[${pollCount}] status="${status}"` });

              if (status === 'succeeded' || (finishedAt && String(finishedAt) !== 'null' && String(finishedAt) !== '0')) {
                workflowDone = true;
                send({ progress: 78, status: 'ワークフロー完了！ノード出力取得中...' });

                // 個別ログ詳細で node outputs を取得
                const logId = String(item.id ?? '');
                if (logId) {
                  const detailRes = await fetch(`${baseUrl}/workflows/logs/${logId}`, { headers: pollHeaders });
                  const detailText = await detailRes.text();
                  log(`log detail ${detailRes.status}: ${detailText.slice(0, 400)}`);
                  if (detailRes.ok) {
                    try {
                      const detail = JSON.parse(detailText) as Record<string, unknown>;
                      const detailNodes = Array.isArray(detail.details) ? (detail.details as NodeDetail[]) : [];
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
                      if (Object.keys(nodeOutputs).length === 0) {
                        const wfRunD = (detail.workflow_run ?? {}) as Record<string, unknown>;
                        const wfOut = (wfRunD.outputs ?? (detail as Record<string,unknown>).outputs) as Record<string,unknown> | undefined;
                        if (wfOut) {
                          const text = Object.entries(wfOut)
                            .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                            .join('\n\n---\n\n');
                          if (text.trim()) nodeOutputs['workflow_outputs'] = text;
                        }
                      }
                    } catch (e) { log(`detail parse error: ${e}`); }
                  }
                }
                log(`ポーリング完了: nodeOutputs=${Object.keys(nodeOutputs).length}件`);
                break;
              }
              if (status === 'failed' || status === 'stopped') {
                log(`ワークフロー失敗: ${status}`);
                break;
              }
            } catch (e) { log(`POLL error: ${e}`); }
          }
        }

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
