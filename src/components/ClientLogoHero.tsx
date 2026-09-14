'use client';
import { useEffect, useState } from 'react';
import { useProcessedLogo } from '@/lib/useProcessedLogo';
import { isLightCssColor } from '@/lib/cssStyle';

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
 * ロゴ画像は余白トリミング・背景色判定（useProcessedLogo）を経て表示する。
 * ロゴ画像に単色の背景が焼き込まれている場合（OGP用バッジ画像等）や、白一色の
 * 反転ロゴの場合は、表示枠の背景をその色／ニュートラルなダークグレーに切り替える。
 */
export function ClientLogoHero({ slug, name, primaryColor = '#111827' }: ClientLogoHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const failed = extIndex >= LOGO_EXTENSIONS.length;
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const ext = LOGO_EXTENSIONS[extIndex];
  const rawSrc = `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/logo.${ext}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const showLogo = mounted && !failed;
  const { src, backdrop } = useProcessedLogo(rawSrc, ext, showLogo);
  const useLightText = backdrop !== null && !isLightCssColor(backdrop);
  // 背景色つきの箱（単色背景焼き込み/白一色ロゴのフォールバック）は、色面自体の存在感が強いため
  // ロゴを目一杯まで拡大すると圧迫感が出る。通常の透過ロゴより一回り小さく表示する。
  const maxSize = backdrop ? '47%' : '70%';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 24,
        background: backdrop ?? '#ffffff',
        border: backdrop ? 'none' : '1px solid #e5e7eb',
        marginBottom: 24,
        overflow: 'hidden',
        transition: 'background 0.15s ease',
      }}
    >
      {showLogo ? (
        <img
          src={src}
          alt={`${name} logo`}
          style={{ width: maxSize, height: maxSize, objectFit: 'contain' }}
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
            color: useLightText ? '#ffffff' : primaryColor,
            background: useLightText ? 'rgba(255,255,255,0.15)' : '#f3f4f6',
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
