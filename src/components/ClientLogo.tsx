'use client';
import { useEffect, useState } from 'react';

interface ClientLogoProps {
  slug: string;
  name: string;
  size?: number;
}

// /api/extract-css が保存し得る拡張子を優先度順に列挙。
// 見つかった実ファイルの形式がpngとは限らないため、順に試す。
const LOGO_EXTENSIONS = ['png', 'svg', 'jpg', 'jpeg', 'webp', 'ico', 'gif'];

/**
 * クライアントのロゴ表示スペース。
 * src/app/{slug}/logo.{png,svg,jpg,...} のいずれかが存在すればそれを表示し、
 * まだ取得できていない（=会社を正しく認識できていない）場合はイニシャルにフォールバックする。
 *
 * <img> はマウント後（useEffect）にだけ描画する。SSR直後の初期HTMLに
 * 失敗確定のURLを含めると、ハイドレーション完了より先にブラウザが
 * エラーを発生させてしまい、onError が拾えず素の壊れ画像アイコンが
 * 残ってしまうため。
 */
export function ClientLogo({ slug, name, size = 40 }: ClientLogoProps) {
  const [mounted, setMounted] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const failed = extIndex >= LOGO_EXTENSIONS.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size >= 36 ? 10 : 8,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {!mounted || failed ? (
        <span style={{ fontSize: size * 0.4, fontWeight: 700, color: '#9ca3af' }}>{initial}</span>
      ) : (
        <img
          src={`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/logo.${LOGO_EXTENSIONS[extIndex]}`}
          alt={`${name} logo`}
          style={{ maxWidth: '78%', maxHeight: '78%', objectFit: 'contain' }}
          onError={() => setExtIndex(i => i + 1)}
        />
      )}
    </div>
  );
}
