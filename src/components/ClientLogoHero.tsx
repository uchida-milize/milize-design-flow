'use client';
import { useEffect, useState } from 'react';
import { useLogoNeedsDarkBackdrop } from '@/lib/useLogoNeedsDarkBackdrop';

interface ClientLogoHeroProps {
  slug: string;
  name: string;
  primaryColor?: string;
}

// /api/extract-css が保存し得る拡張子を優先度順に列挙（ClientLogoと同じ順）。
const LOGO_EXTENSIONS = ['png', 'svg', 'jpg', 'jpeg', 'webp', 'ico', 'gif'];
const DARK_BACKDROP = '#1f2937';

/**
 * 各クライアントポータルのトップページ、カラーバーの上に置く大きなロゴ表示エリア。
 * ロゴが取得できていればダウンロードリンクを右下に表示する。
 * ロゴが白一色（濃い背景前提の反転ロゴ）の場合は、白いままだと見えなくなるため
 * 表示枠の背景を自動的に暗くする。
 */
export function ClientLogoHero({ slug, name, primaryColor = '#111827' }: ClientLogoHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const failed = extIndex >= LOGO_EXTENSIONS.length;
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const ext = LOGO_EXTENSIONS[extIndex];
  const src = `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/logo.${ext}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const showLogo = mounted && !failed;
  const needsDarkBackdrop = useLogoNeedsDarkBackdrop(src, ext, showLogo);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 24,
        background: needsDarkBackdrop ? DARK_BACKDROP : '#ffffff',
        border: needsDarkBackdrop ? 'none' : '1px solid #e5e7eb',
        marginBottom: 24,
        overflow: 'hidden',
        transition: 'background 0.15s ease',
      }}
    >
      {showLogo ? (
        <img
          src={src}
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
            color: needsDarkBackdrop ? '#ffffff' : primaryColor,
            background: needsDarkBackdrop ? 'rgba(255,255,255,0.15)' : '#f3f4f6',
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
