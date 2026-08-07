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

        // selected_urls を「URL||カテゴリ1,カテゴリ2」形式に変換して Dify に渡す
        // 例: https://ge.com||カラー,ロゴ・CI,フォント,フォーム
        // （Dify 側の URL配列代入ノードでパースし、カテゴリ別抽出に使用）
        const buildUrlWithCategories = (u: string): string => {
          const match = u.match(/^(.+?)\s*\[([^\]]*)\]$/);
          if (match) {
            const url = match[1].trim();
            const cats = match[2].split(',').map(c => c.trim()).filter(Boolean).join(',');
            return cats ? `${url}||${cats}` : url;
          }
          return u.trim();
        };
        const urlsStr = Array.isArray(selected_urls)
          ? selected_urls.map((u: string) => buildUrlWithCategories(u)).join('\n')
          : String(selected_urls ?? '').split('\n').map(buildUrlWithCategories).join('\n');

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

        if (resumeCT.includes('event-stream')) {
          // ── SSE ストリーム（form/human_input が SSE を返す場合・通常は空ボディ）──
          // SSE イベントを読み捨て、workflow_finished を待つ
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
                  log(`node_finished: "${(data.data?.title as string) ?? ''}"`);
                  send({ progress: progressVal });
                } else if (data.event === 'workflow_finished') {
                  workflowDone = true;
                  log(`workflow_finished (outputs は dify-callback 経由で受信済み)`);
                } else {
                  log(`EVT:${data.event}`);
                }
              } catch { /* JSON parse error */ }
            }

            if (workflowDone) break;
          }
        } else {
          // ── ポーリング（form/human_input は 200 OK + 空ボディ）───────────────
          // Dify 1.13.3 では /workflows/runs/{id} も /node-executions も 404 のため、
          // /workflows/logs でステータスのみ確認する。
          // ワークフロー出力 (design_md, code, iteration_output, URL) は
          // Dify の HTTP Request ノードが /api/dify-callback へ直接 POST する（プッシュ型）。
          const pollIds = [workflow_run_id, task_id].filter(Boolean);
          let progressVal = 62;
          let workflowDone = false;
          let pollCount = 0;
          const maxPolls = 20; // 10秒×20回=200秒

          log(`ポーリング開始 pollIds=${JSON.stringify(pollIds)}`);

          while (!workflowDone && pollCount < maxPolls) {
            await new Promise(r => setTimeout(r, 10000));
            pollCount++;
            progressVal = Math.min(62 + pollCount * 2, 78);
            send({ progress: progressVal, status: `Dify処理中... (${pollCount}/${maxPolls})` });

            try {
              const logsRes = await fetch(`${baseUrl}/workflows/logs?page=1&limit=10`, {
                headers: { Authorization: `Bearer ${apiKey}` },
              });
              if (!logsRes.ok) {
                log(`logs[${pollCount}]: ${logsRes.status}`);
                continue;
              }

              type LogEntry = {
                id?: string;
                workflow_run?: { id?: string; status?: string };
                status?: string;
              };
              const logsData = await logsRes.json() as { data?: LogEntry[] };
              const logs = logsData.data ?? [];

              let foundRun = false;
              for (const runId of pollIds) {
                if (!runId) continue;
                const match = logs.find(l => l.id === runId || l.workflow_run?.id === runId);
                if (match) {
                  foundRun = true;
                  const status = match.status ?? match.workflow_run?.status;
                  log(`logs[${pollCount}]: run=${runId.slice(0, 8)} status="${status}"`);
                  if (status === 'succeeded' || status === 'failed' || status === 'stopped') {
                    log(`ワークフロー完了: status="${status}" (outputs は dify-callback 経由で書き込み済み)`);
                    workflowDone = true;
                    break;
                  }
                } else {
                  log(`logs[${pollCount}]: ${logs.length}件, runId未発見`);
                }
              }

              // runId が見つからない場合、最新エントリが succeeded なら完了とみなす
              if (!foundRun && logs.length > 0) {
                const latest = logs[0];
                const latestStatus = latest.status ?? latest.workflow_run?.status;
                if (latestStatus === 'succeeded') {
                  log(`logs[${pollCount}]: 最新エントリ succeeded → 完了とみなす`);
                  workflowDone = true;
                }
              }
            } catch (e) {
              log(`logs error: ${e}`);
            }
          }

          if (!workflowDone) {
            log(`ポーリングタイムアウト (${pollCount}回)`);
            send({ progress: 78, status: 'Difyが処理中。コミットに進みます。' });
          }
        }

        log(`ポーリング完了`);
        send({ progress: 79, status: 'ポータルファイルをコミット中...' });

        // ─── GitHub コミット + Vercel デプロイ ───────────────────────────────
        // resources.json は dify-callback エンドポイントが書き込む（プッシュ型）。
        // ここでは Dify が直接コミットした CSS/ページ等を読み込み、残りのファイルをコミットする。
        const githubToken = process.env.GITHUB_TOKEN ?? '';
        const vercelToken = process.env.VERCEL_TOKEN ?? '';
        const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';

        send({ progress: 80, status: 'GitHubにコミット中...' });
        const commitStart = Date.now();

        // designColors は globals.css から抽出（nodeOutputs 不要）
        const designColors = parseDesignMdColors({});
        const difyFiles = await readAndFixDifyFiles(client_slug, company_name, githubToken, designColors);

        const filesToCommit: Array<{ path: string; content: string }> = [
          ...difyFiles,
          {
            path: `src/app/${client_slug}/layout.tsx`,
            content: `import './globals.css';\nimport type { ReactNode } from 'react';\nexport default function Layout({ children }: { children: ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`,
          },
          // resources.json は /api/dify-callback が書き込むためここでは除外
          {
            path: `src/app/${client_slug}/resources/page.tsx`,
            content: buildResourcesPage(client_slug, company_name),
          },
          {
            path: `src/app/${client_slug}/_debug.txt`,
            content: debugLog.join('\n') + '\n',
          },
        ];

        send({ progress: 82, status: `${filesToCommit.length}ファイルをリフレッシュコミット中（旧ファイル全削除→新規追加）...` });

        let committed = false;
        let lastError = '';
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
          const result = await refreshAndCommitClientFiles(
            client_slug,
            filesToCommit,
            `feat: refresh portal for ${client_slug} [resumed]`,
            githubToken,
          );
          if (result.ok) {
            committed = true;
            send({ progress: 83, status: `リフレッシュ完了（旧ファイル ${result.deletedCount ?? 0}件削除、新規${filesToCommit.length}件追加）` });
            break;
          }
          lastError = result.error ?? 'unknown';
          send({ progress: 82 + attempt, status: `コミット再試行 (${attempt + 1}/3)...` });
        }

        if (!committed) {
          send({ progress: 83, status: `リフレッシュコミット失敗: ${lastError.slice(0, 80)}` });
        } else {
          send({ progress: 84, status: 'リフレッシュコミット完了！' });
        }

        await removeFromExcludedDirs(client_slug, githubToken);
        send({ progress: 85, status: 'Vercelデプロイ起動待ち...' });

        if (vercelToken && vercelProjectId) {
          // maxDuration=300s の残り時間に合わせ 24回×5秒=120秒 に制限
          await waitForVercelDeploy(commitStart, vercelToken, vercelProjectId, send, 24);
        } else {
          send({ progress: 100, status: 'GitHubコミット完了。', deploy_done: true });
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
