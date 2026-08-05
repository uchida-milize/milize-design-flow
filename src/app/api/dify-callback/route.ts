import { NextRequest } from 'next/server';
import { batchGitCommit } from '../_lib/portal-helpers';

/**
 * POST /api/dify-callback
 *
 * Dify ワークフローの各ポイントに置いた HTTP Request ノードから呼び出される。
 * 受け取ったフィールドを resources.json にマージして GitHub にコミットする。
 * （上書きではなく追記型：複数ノードから分割して送っても蓄積される）
 *
 * 必須フィールド:
 *   client_slug  — クライアント識別子
 *
 * 任意フィールド（各ノードが持つ出力を好きなキー名で送る）:
 *   selected_urls    — URL選択ノード出力
 *   iteration_output — イテレーション出力（JSON文字列化してから送ること）
 *   design_md        — DESIGN.MD生成ノード出力
 *   code             — 実装コード生成ノード出力
 *   vercel_output    — VERCELデプロイノード出力
 *   URL              — デプロイURL
 *   …その他任意キー
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

  // client_slug 以外のフィールドをマージ対象とする
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { client_slug: _cs, ...incoming } = body;

  const filePath = `src/app/${client_slug}/resources.json`;

  // ── 既存の resources.json を取得してマージ ──────────────────────────────────
  let currentResources: Record<string, unknown> = {};
  try {
    const readRes = await fetch(
      `https://api.github.com/repos/uchida-milize/milize-design-flow/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'dify-callback',
        },
      },
    );
    if (readRes.ok) {
      const fileData = await readRes.json() as { content?: string };
      if (fileData.content) {
        currentResources = JSON.parse(
          Buffer.from(fileData.content, 'base64').toString('utf8'),
        );
      }
    }
  } catch {
    // ファイルが存在しない場合は空オブジェクトから開始
  }

  // 新しいデータをマージ（既存キーは上書き）
  const updatedResources: Record<string, unknown> = {
    ...currentResources,
    ...incoming,
  };

  console.log(
    `[dify-callback] client="${client_slug}" keys_added=${Object.keys(incoming).join(',')}`,
  );

  const result = await batchGitCommit(
    [
      {
        path: filePath,
        content: JSON.stringify(updatedResources, null, 2),
      },
    ],
    `feat: update resources.json for ${client_slug} [dify-callback]`,
    githubToken,
  );

  if (!result.ok) {
    console.error(`[dify-callback] commit failed: ${result.error}`);
    return Response.json({ error: result.error }, { status: 500 });
  }

  console.log(`[dify-callback] resources.json updated for ${client_slug}`);
  return Response.json({
    ok: true,
    client_slug,
    keys_added: Object.keys(incoming),
    total_keys: Object.keys(updatedResources),
  });
}
