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
        const authHeaders = {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        let submitOk = false;
        let lastSubmitErr = '';
        for (const url of [
          `${baseUrl}/form/human_input/${form_token}`,
          `${baseWithoutVersion}/form/human_input/${form_token}`,
        ]) {
          const r = await fetch(url, { method: 'POST', headers: authHeaders, body: formBody });
          if (r.ok) { submitOk = true; break; }
          const txt = await r.text();
          lastSubmitErr += `\n${url} → ${r.status}: ${txt.slice(0, 80)}`;
          if (r.status !== 404) break;
        }

        if (!submitOk) {
          send({ error: `フォーム送信失敗:${lastSubmitErr}` });
          controller.close();
          return;
        }

        send({ progress: 60, status: 'ワークフロー再開中。完了を待機中...' });

        // ─── Step 2: /workflows/logs でワークフロー完了をポーリング ────────
        // このDifyインスタンスでは /workflows/logs が利用可能
        const runId = (workflow_run_id && workflow_run_id !== 'undefined' && workflow_run_id !== '')
          ? workflow_run_id
          : task_id;
        const logsUrl = `${baseUrl}/workflows/logs?page=1&limit=5`;
        const pollHeaders = { Authorization: `Bearer ${apiKey}` };

        const POLL_INTERVAL_MS = 12_000; // 12秒ごと（軽量化）
        const MAX_WAIT_MS = 240_000;     // 最大4分
        const pollStart = Date.now();
        let runOutputs: Record<string, unknown> = {};
        let pollSucceeded = false;
        let pollCount = 0;

        while (Date.now() - pollStart < MAX_WAIT_MS) {
          await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
          pollCount++;

          // 進捗は3回に1回だけ更新
          if (pollCount % 3 === 0) {
            const elapsed = Math.round((Date.now() - pollStart) / 1000);
            send({ progress: Math.min(60 + pollCount, 75), status: `処理中... (${elapsed}s)` });
          }

          try {
            const r = await fetch(logsUrl, { headers: pollHeaders });
            if (!r.ok) continue;
            const json = await r.json();
            if (!Array.isArray(json.data) || json.data.length === 0) continue;

            type LogItem = Record<string, unknown> & { workflow_run?: Record<string, unknown> };
            const item: LogItem = (json.data as LogItem[]).find((x) =>
              x.workflow_run_id === runId ||
              x.id === runId ||
              x.workflow_run?.id === runId,
            ) ?? (json.data[0] as LogItem);

            const wfRun = (item.workflow_run ?? {}) as Record<string, unknown>;

            // ステータスは workflow_run.status にある（確認済み）
            const status = String(wfRun.status ?? '');
            const finishedAt = wfRun.finished_at;

            // outputs は logs に含まれないため details（ノード実行配列）から取得
            type NodeDetail = Record<string, unknown>;
            const details = Array.isArray(item.details)
              ? (item.details as NodeDetail[])
              : [];
            const detailOutputs: Record<string, unknown> = {};
            for (const node of details) {
              const title = String(node.title ?? node.node_id ?? `node_${Object.keys(detailOutputs).length + 1}`);
              const nodeOut = node.outputs as Record<string, unknown> | undefined;
              if (nodeOut && Object.keys(nodeOut).length > 0) {
                detailOutputs[title] = nodeOut;
              }
            }
            const hasOutputs = Object.keys(detailOutputs).length > 0;

            // デバッグ（1回のみ）
            if (pollCount === 1) {
              const d0keys = details.length > 0 ? Object.keys(details[0]).join(',') : 'empty';
              send({ progress: 63, status: `status="${status}" finished_at=${finishedAt} details=${details.length} d0keys=[${d0keys}] hasOut=${hasOutputs}` });
            }

            if (status === 'succeeded' || (finishedAt && String(finishedAt) !== 'null' && String(finishedAt) !== '0') || hasOutputs) {
              runOutputs = detailOutputs;
              pollSucceeded = true;
              break;
            }
            if (status === 'failed' || status === 'stopped') {
              send({ error: `ワークフロー失敗: ${status}` });
              controller.close();
              return;
            }
          } catch { /* ネットワークエラー → 次のポーリングへ */ }
        }

        if (!pollSucceeded) {
          send({ progress: 76, status: 'タイムアウト: 取得済みデータでコミットします。' });
        } else {
          send({ progress: 78, status: 'ワークフロー完了！GitHubにコミット中...' });
        }

        // ─── Step 3: GitHub コミット + Vercel デプロイ ────────────────────
        const githubToken = process.env.GITHUB_TOKEN ?? '';
        const vercelToken = process.env.VERCEL_TOKEN ?? '';
        const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';

        const nodeOutputs: Record<string, string> = {};
        for (const [nodeName, nodeVal] of Object.entries(runOutputs)) {
          // nodeVal はノードの outputs オブジェクト
          const text = typeof nodeVal === 'string'
            ? nodeVal
            : Object.entries(nodeVal as Record<string, unknown>)
                .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                .join('\n\n---\n\n');
          if (text.trim()) nodeOutputs[nodeName] = text;
        }

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
