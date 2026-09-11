'use client';
import { useEffect, useState } from 'react';

interface ClientLogoHeroProps {
  slug: string;
  name: string;
  primaryColor?: string;
}

// /api/extract-css が保存し得る拡張子を優先度順に列挙（ClientLogoと同じ順）。
const LOGO_EXTENSIONS = ['png', 'svg', 'jpg', 'jpeg', 'webp', 'ico', 'gif'];

/**
 * 各クライアントポータルのトップページ、カラーバーの上に置く大きなロゴ表示エリア。
 * ロゴが取得できていればダウンロードリンクを右下に表示する。
 */
export function ClientLogoHero({ slug, name, primaryColor = '#111827' }: ClientLogoHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const failed = extIndex >= LOGO_EXTENSIONS.length;
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const ext = LOGO_EXTENSIONS[extIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  const showLogo = mounted && !failed;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 24,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        marginBottom: 24,
        overflow: 'hidden',
      }}
    >
      {showLogo ? (
        <img
          src={`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/logo.${ext}`}
          alt={`${name} logo`}
          style={{ maxWidth: '55%', maxHeight: '65%', objectFit: 'contain' }}
          onError={() => setExtIndex((i) => i + 1)}
        />
      ) : (
        <span style={{ fontSize: 56, fontWeight: 700, color: '#d1d5db' }}>{initial}</span>
      )}

      {showLogo && (
        <a
          href={`/api/download-logo?slug=${slug}&ext=${ext}`}
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: primaryColor,
            background: '#f3f4f6',
            borderRadius: 999,
            padding: '6px 14px',
            textDecoration: 'none',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3v10m0 0l-4-4m4 4l4-4M4 16h12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ロゴをダウンロード
        </a>
      )}
    </div>
  );
}
