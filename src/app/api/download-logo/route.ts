import { NextRequest } from 'next/server';

/**
 * GET /api/download-logo?slug=xxx&ext=png
 *
 * raw.githubusercontent.com 上のロゴファイルを取得し、Content-Disposition: attachment
 * を付けて返す。ブラウザの <a download> はクロスオリジンのURLには効かない
 * （CORS的に無視され新規タブで開かれるだけ）ため、同一オリジンのこのAPI経由で
 * ダウンロードさせる。
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  const ext = req.nextUrl.searchParams.get('ext') ?? 'png';
  if (!slug || !/^[a-z0-9-]+$/.test(slug) || !/^[a-z0-9]+$/i.test(ext)) {
    return new Response('Invalid parameters', { status: 400 });
  }

  const url = `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/logo.${ext}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    return new Response('Logo not found', { status: 404 });
  }

  const buf = await res.arrayBuffer();
  return new Response(buf, {
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${slug}-logo.${ext}"`,
      'Cache-Control': 'no-store',
    },
  });
}
