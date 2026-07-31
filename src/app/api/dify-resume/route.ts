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
      { error: 'form_token が指定されていません。DifyのHuman Inputノードを "WebApp" 配信に設定してください。' },
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

        // ─── Step 1: Human Input フォームを送信 ───────────────────────────
        send({ progress: 58, status: 'URLを送信してワークフローを再開中...' });

        const formBody = JSON.stringify({
          inputs: {
            selected_urls: Array.isArray(selected_urls)
              ? selected_urls.join('\n')
              : selected_urls,
          },
          action: 'action_1',
          user: 'milize-admin',
        });
        const formHeaders = {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        // /v1/form/... と /form/... の両方を試す
        const formCandidates = [
          `${baseUrl}/form/human_input/${form_token}`,
          `${baseWithoutVersion}/form/human_input/${form_token}`,
        ];

        let submitOk = false;
        let lastSubmitErr = '';
        for (const url of formCandidates) {
          const r = await fetch(url, { method: 'POST', headers: formHeaders, body: formBody });
          if (r.ok) { submitOk = true; break; }
          const txt = await r.text();
          lastSubmitErr += `\n[${url}] → ${r.status}: ${txt.slice(0, 80)}`;
          if (r.status !== 404) break;
        }

        if (!submitOk) {
          send({ error: `Human Input submit failed:${lastSubmitErr}` });
          controller.close();
          return;
        }

        // デバッグ: 受信したIDを表示
        send({
          progress: 60,
          status: `フォーム送信完了。task_id="${task_id?.slice(0,8)}" wf_run_id="${(workflow_run_id||'').slice(0,8)}" でポーリング開始`,
        });

        // ─── Step 2: ワークフロー完了をポーリングで待つ ──────────────────
        // GET /workflows/runs/{workflow_run_id} でステータスを確認
        const runId = workflow_run_id && workflow_run_id !== 'undefined' && workflow_run_id !== '' ? workflow_run_id : task_id;
        const pollEndpoints = [
          `${baseUrl}/workflows/runs/${runId}`,
          `${baseUrl}/workflow/run-detail?workflow_run_id=${runId}`,
        ].filter(Boolean);

        const pollHeaders = { Authorization: `Bearer ${apiKey}` };
        const POLL_INTERVAL_MS = 8000;
        const MAX_WAIT_MS = 240_000; // 4分
        const pollStart = Date.now();

        let runOutputs: Record<string, unknown> = {};
        let pollSucceeded = false;
        let progressVal = 60;

        while (Date.now() - pollStart < MAX_WAIT_MS) {
          await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
          progressVal = Math.min(progressVal + 2, 76);
          send({ progress: progressVal, status: `ワークフロー完了待機中... (${Math.round((Date.now() - pollStart) / 1000)}s)` });

          for (const ep of pollEndpoints) {
            try {
              const r = await fetch(ep, { headers: pollHeaders });
              if (!r.ok) {
                send({ progress: progressVal, status: `ポーリング ${r.status}: ${ep.slice(-50)}` });
                continue;
              }
              const json = await r.json();
              const status: string = json.status ?? json.data?.status ?? '';
              send({ progress: progressVal, status: `ポーリング応答: status="${status}" ep="${ep.slice(-40)}"` });
              if (status === 'succeeded') {
                runOutputs = json.outputs ?? json.data?.outputs ?? {};
                pollSucceeded = true;
                break;
              } else if (status === 'failed' || status === 'stopped') {
                send({ error: `ワークフロー失敗: status=${status}` });
                controller.close();
                return;
              }
              // running / waiting → continue polling
            } catch (e) {
              send({ progress: progressVal, status: `ポーリングエラー: ${String(e).slice(0,50)}` });
            }
          }
          if (pollSucceeded) break;
        }

        // ─── Step 3: ノード出力を組み立てる ──────────────────────────────
        const nodeOutputs: Record<string, string> = {};
        if (Object.keys(runOutputs).length > 0) {
          const wfText = Object.entries(runOutputs)
            .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
            .join('\n\n---\n\n');
          if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
        }

        if (!pollSucceeded) {
          send({ progress: 77, status: `タイムアウト: ワークフロー未完了。取得済み出力 ${Object.keys(nodeOutputs).length}件で続行します。` });
        } else {
          send({ progress: 78, status: `ワークフロー完了！出力 ${Object.keys(nodeOutputs).length}件を取得しました。` });
        }

        // ─── Step 4: GitHub コミット + Vercel デプロイ ────────────────────
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
