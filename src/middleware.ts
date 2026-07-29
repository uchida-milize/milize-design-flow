import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>準備中</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f7f9fc;font-family:sans-serif;}div{text-align:center;color:#9ca3af;}p{font-size:13px;margin-top:8px;}</style></head><body><div><h2>このページは現在準備中です</h2><p>MILIZE Inc.</p></div></body></html>`,
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
