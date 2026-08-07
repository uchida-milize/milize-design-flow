import { NextRequest } from 'next/server';
import { refreshAndCommitClientFiles, TPL_SLUG, API, OWNER, REPO, ghHeaders } from '../_lib/portal-helpers';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const token = process.env.GITHUB_TOKEN ?? '';

    if (!token) {
      return Response.json({ error: 'GITHUB_TOKEN が設定されていません' }, { status: 500 });
    }
    if (!slug || typeof slug !== 'string') {
      return Response.json({ error: 'slug が必要です' }, { status: 400 });
    }
    if (slug === TPL_SLUG || slug === 'api') {
      return Response.json({ error: 'このスラッグは削除できません' }, { status: 403 });
    }

    // src/app/{slug}/ 以下のファイルを全て削除（空のfilesを渡す = 削除のみ）
    const result = await refreshAndCommitClientFiles(
      slug,
      [],
      `feat: delete client portal ${slug}`,
      token,
    );

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    // EXCLUDED_DIRS にスラッグを追加して一覧に出ないよう保護
    await addToExcludedDirs(slug, token);

    return Response.json({ ok: true, deletedCount: result.deletedCount });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

/** page.tsx の EXCLUDED_DIRS にスラッグを追加（削除後の一時的な残留対策） */
async function addToExcludedDirs(slug: string, token: string) {
  const h = ghHeaders(token);
  const path = 'src/app/page.tsx';

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));

    const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
    if (!res.ok) return;
    const data: { content: string; sha: string } = await res.json();
    const raw = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');

    // すでに含まれていれば何もしない
    if (raw.includes(`'${slug}'`)) return;

    // EXCLUDED_DIRS の末尾エントリを探して後ろに追加
    const fixed = raw.replace(
      /(const EXCLUDED_DIRS = new Set\(\[[\s\S]*?)'([^']+)',\s*\]\);/,
      `$1'$2',\n  '${slug}',\n]);`,
    );
    if (fixed === raw) return;

    const putRes = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
      method: 'PUT',
      headers: h,
      body: JSON.stringify({
        message: `feat: exclude deleted client ${slug} from list`,
        content: Buffer.from(fixed, 'utf-8').toString('base64'),
        sha: data.sha,
        branch: 'main',
      }),
    });
    if (putRes.ok || putRes.status !== 409) return;
  }
}
