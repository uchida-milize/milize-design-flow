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

  const { client_slug, design_md, code, iteration_output, URL: deployUrl } = body as {
    client_slug?: string;
    design_md?: string;
    code?: string;
    iteration_output?: unknown;
    URL?: string;
  };

  if (!client_slug || typeof client_slug !== 'string') {
    return Response.json({ error: 'client_slug is required' }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN ?? '';
  if (!githubToken) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  // 4 フィールドを resources.json に格納（空でも含める）
  const resources: Record<string, unknown> = {
    design_md:        design_md        ?? '',
    code:             code             ?? '',
    iteration_output: iteration_output ?? [],
    URL:              deployUrl        ?? '',
  };

  console.log(`[dify-callback] client="${client_slug}" fields=${Object.keys(resources).join(',')}`);

  const result = await batchGitCommit(
    [
      {
        path: `src/app/${client_slug}/resources.json`,
        content: JSON.stringify(resources, null, 2),
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
