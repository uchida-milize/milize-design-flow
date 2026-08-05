import { NextRequest } from 'next/server';
import { batchGitCommit } from '../_lib/portal-helpers';

/**
 * POST /api/dify-callback
 *
 * Dify ワークフローの末尾に追加した HTTP Request ノードから呼び出される。
 * ワークフローの 4 つの出力変数を受け取り、resources.json を GitHub にコミットする。
 *
 * Body (Dify HTTP Request ノードで設定):
 * {
 *   "client_slug":       "{{client_slug}}",
 *   "design_md":         "{{design_md}}",          // DESIGN.MD 生成ノード出力
 *   "code":              "{{code}}",               // 実装コード生成ノード出力
 *   "iteration_output":  "{{iteration_output}}",   // イテレーションノード出力
 *   "URL":               "{{URL}}"                 // 出力URL作成ノード出力
 * }
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    // Dify の HTTP Request ノードは JSON body を配列 [{...}] でラップして送信する場合がある
    if (Array.isArray(parsed)) {
      body = (parsed[0] as Record<string, unknown>) ?? {};
    } else if (parsed && typeof parsed === 'object') {
      body = parsed as Record<string, unknown>;
    } else {
      return Response.json({ error: 'unexpected body format' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const client_slug = body.client_slug as string | undefined;

  if (!client_slug || typeof client_slug !== 'string') {
    return Response.json({ error: 'client_slug is required' }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN ?? '';
  if (!githubToken) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  // ── Dify から受け取った全フィールドをそのまま保存 ─────────────────────────
  // client_slug は resources.json には含めない（ファイルパス自体で識別するため）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { client_slug: _cs, ...rest } = body;

  // URL は Dify から送られない場合に備え、client_slug から自動計算
  const vercelBase = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://milize-design-flow.vercel.app';
  const computedUrl = (rest.URL as string) || `${vercelBase}/${client_slug}`;

  // 既知フィールドにデフォルト値を付与しつつ、未知フィールドもすべて保持
  // iteration_output は Dify の配列展開バグにより送れないため空配列をデフォルトとする
  const resources: Record<string, unknown> = {
    design_md:        rest.design_md        ?? '',
    code:             rest.code             ?? '',
    iteration_output: rest.iteration_output ?? [],
    URL:              computedUrl,
    // Dify から届いた追加フィールドをすべてマージ
    ...rest,
  };

  // ── デバッグログ ──────────────────────────────────────────────────────────
  const rawBodyDebug: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    const vStr = typeof v === 'string' ? v : JSON.stringify(v);
    rawBodyDebug[k] = vStr.slice(0, 300) + (vStr.length > 300 ? '…' : '');
  }
  console.log(`[dify-callback] client="${client_slug}" raw_keys=${Object.keys(body).join(',')}`);
  console.log(`[dify-callback] body_preview=${JSON.stringify(rawBodyDebug)}`);

  const result = await batchGitCommit(
    [
      {
        path: `src/app/${client_slug}/resources.json`,
        content: JSON.stringify(resources, null, 2),
      },
      {
        path: `src/app/${client_slug}/_callback_debug.json`,
        content: JSON.stringify({
          received_keys: Object.keys(body),
          body_preview: rawBodyDebug,
          timestamp: new Date().toISOString(),
        }, null, 2),
      },
    ],
    `feat: update resources.json for ${client_slug} [dify-callback]`,
    githubToken,
  );

  if (!result.ok) {
    console.error(`[dify-callback] commit failed: ${result.error}`);
    return Response.json({ error: result.error }, { status: 500 });
  }

  console.log(`[dify-callback] resources.json committed for ${client_slug}`);
  return Response.json({ ok: true, client_slug, fields: Object.keys(resources) });
}
