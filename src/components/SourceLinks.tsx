'use client';
import { hostnameOf } from '@/lib/designExtract';

/** ページ下部に置く「このリサーチの参照元ページ」リンク一覧 */
export function SourceLinks({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;
  return (
    <section style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e5e7eb' }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', marginBottom: 10 }}>
        参照元ページ
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {urls.map((u) => (
          <a
            key={u}
            href={u}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#3b82f6', wordBreak: 'break-all', textDecoration: 'none' }}
          >
            {hostnameOf(u)} <span style={{ color: '#9ca3af' }}>— {u}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** 抽出された要素1件に付ける小さな「参照元」リンクチップ */
export function SourceTag({ url }: { url?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 11,
        color: '#9ca3af',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      参照: {hostnameOf(url)}
    </a>
  );
}
