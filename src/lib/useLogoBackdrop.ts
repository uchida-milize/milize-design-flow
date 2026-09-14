'use client';
import { useEffect, useState } from 'react';
import { isLightCssColor } from './cssStyle';

const DARK_NEUTRAL = '#1f2937';

function rgbCss([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function isCloseColor(a: [number, number, number], b: [number, number, number], tolerance = 12): boolean {
  return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance && Math.abs(a[2] - b[2]) <= tolerance;
}

/**
 * 画像の四隅ピクセルを調べ、不透明かつ全て同じ色（＝背景が単色で焼き込まれている
 * バッジ/カード的な画像）なら、その色を返す。透明・角が白系・角の色が揃っていない
 * （＝ロゴ自体の線が角にかかっているだけ等）場合は null。
 */
function detectBakedBackground(src: string): Promise<[number, number, number] | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) { resolve(null); return; }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(null); return; }
        ctx.drawImage(img, 0, 0);
        const points: Array<[number, number]> = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
        const pixels = points.map(([x, y]) => ctx.getImageData(x, y, 1, 1).data);
        if (!pixels.every((p) => p[3] === 255)) { resolve(null); return; }
        const first: [number, number, number] = [pixels[0][0], pixels[0][1], pixels[0][2]];
        const allMatch = pixels.every((p) => isCloseColor(first, [p[0], p[1], p[2]]));
        if (!allMatch) { resolve(null); return; }
        // ほぼ白い背景は「普通のロゴ画像」であり特別扱い不要
        if (isLightCssColor(rgbCss(first))) { resolve(null); return; }
        resolve(first);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * ロゴ画像から、カード/ヒーロー枠全体に敷くべき背景色を判定するフック。
 * - 画像自体に単色の背景が焼き込まれている場合（例: OGP用のバッジ画像）は、その色。
 * - SVGで描画色が白系だけ（濃い背景前提の反転ロゴ）の場合は、ニュートラルなダークグレー。
 * - それ以外（普通の透過ロゴ）は null（背景は変更しない）。
 */
export function useLogoBackdrop(src: string, ext: string, enabled: boolean): string | null {
  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setBackdrop(null);
      return;
    }
    let cancelled = false;

    (async () => {
      const baked = await detectBakedBackground(src);
      if (cancelled) return;
      if (baked) {
        setBackdrop(rgbCss(baked));
        return;
      }

      if (ext === 'svg') {
        try {
          const text = await fetch(src).then((r) => (r.ok ? r.text() : ''));
          if (cancelled) return;
          if (text) {
            const fills = [...text.matchAll(/fill\s*[:=]\s*["']?(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)["']?/g)]
              .map((m) => m[1])
              .filter((v) => v.toLowerCase() !== 'none');
            if (fills.length > 0 && fills.every((f) => isLightCssColor(f))) {
              setBackdrop(DARK_NEUTRAL);
              return;
            }
          }
        } catch { /* ignore */ }
      }
      setBackdrop(null);
    })();

    return () => { cancelled = true; };
  }, [src, ext, enabled]);

  return backdrop;
}
