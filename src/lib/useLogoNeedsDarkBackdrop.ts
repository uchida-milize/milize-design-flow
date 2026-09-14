'use client';
import { useEffect, useState } from 'react';
import { isLightCssColor } from './cssStyle';

/**
 * ロゴ画像（SVG）のfillが全て明るい色（白系）だけかどうかを調べるフック。
 * 濃い背景（サイトのヘッダー等）の上で使う前提の反転ロゴは、白いポータル上に
 * そのまま置くと見えなくなるため、呼び出し側で背景を切り替える判定に使う。
 * SVG以外（png/jpg等）は判定できないため常に false を返す。
 */
export function useLogoNeedsDarkBackdrop(src: string, ext: string, enabled: boolean): boolean {
  const [needsDark, setNeedsDark] = useState(false);

  useEffect(() => {
    if (!enabled || ext !== 'svg') {
      setNeedsDark(false);
      return;
    }
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.text() : ''))
      .then((text) => {
        if (cancelled || !text) return;
        const fills = [...text.matchAll(/fill\s*[:=]\s*["']?(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)["']?/g)]
          .map((m) => m[1])
          .filter((v) => v.toLowerCase() !== 'none');
        if (fills.length === 0) return;
        setNeedsDark(fills.every((f) => isLightCssColor(f)));
      })
      .catch(() => { /* ignore */ });
    return () => { cancelled = true; };
  }, [src, ext, enabled]);

  return needsDark;
}
