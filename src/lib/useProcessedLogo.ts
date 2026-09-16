'use client';
import { useEffect, useState } from 'react';
import { isLightCssColor } from './cssStyle';

const DARK_NEUTRAL = '#1f2937';
const BG_TOLERANCE = 20;
const CONTENT_MARGIN_RATIO = 0.08; // クロップ後に残す余白（詰まりすぎ防止）

function rgbCss([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function isCloseColor(a: [number, number, number], b: [number, number, number], tolerance = 12): boolean {
  return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance && Math.abs(a[2] - b[2]) <= tolerance;
}

export type ProcessedLogo = { src: string; backdrop: string | null };

/**
 * ロゴ画像をcanvasに描画して解析し、
 *  1) 単色背景が焼き込まれている場合はその色をbackdropとして返す（無ければ null）
 *  2) 実際のロゴ内容だけを囲むバウンディングボックスを求め、余白を詰めた
 *     画像を src として返す（OGPシェア画像やviewBoxに大きな余白を持つSVG等、
 *     ロゴ本体の周囲に余白があるアセットが小さく見えてしまう問題への対処）
 * 何らかの理由で解析できない場合は、元の src をそのまま返す（安全側フォールバック）。
 *
 * SVGはcanvasで直接クロップ（ラスタライズ）しないこと: canvasはSVGの本来の描画サイズ
 * （viewBox由来の小さいピクセル数のことが多い）で描画するため、そのままdata URL化すると
 * ベクターの解像度非依存性が失われて拡大表示時にぼやける。SVGは内容のバウンディング
 * ボックスを求める解析にのみcanvasを使い、実際に返すsrcは元のSVGマークアップの
 * viewBoxを詰め替えたベクターのまま（retightenSvgViewBox）とする。
 */
function processImage(src: string, ext: string): Promise<ProcessedLogo> {
  const isSvg = ext === 'svg';
  return new Promise((resolve) => {
    const fallback: ProcessedLogo = { src, backdrop: null };
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { void (async () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) { resolve(fallback); return; }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(fallback); return; }
        ctx.drawImage(img, 0, 0);

        const full = ctx.getImageData(0, 0, w, h).data;
        const pixelAt = (x: number, y: number) => {
          const i = (y * w + x) * 4;
          return [full[i], full[i + 1], full[i + 2], full[i + 3]] as [number, number, number, number];
        };

        const corners: Array<[number, number]> = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
        const cornerPixels = corners.map(([x, y]) => pixelAt(x, y));
        const cornersOpaqueAndMatch =
          cornerPixels.every((p) => p[3] === 255) &&
          cornerPixels.every((p) => isCloseColor([cornerPixels[0][0], cornerPixels[0][1], cornerPixels[0][2]], [p[0], p[1], p[2]]));

        const bgColor: [number, number, number] | null = cornersOpaqueAndMatch
          ? [cornerPixels[0][0], cornerPixels[0][1], cornerPixels[0][2]]
          : null;
        const bgIsLight = bgColor !== null && isLightCssColor(rgbCss(bgColor));
        const backdrop = bgColor !== null && !bgIsLight ? rgbCss(bgColor) : null;

        // コンテンツ判定: 背景が単色ならその色との差分、透過なら alpha で判定
        const isContentPixel = (x: number, y: number): boolean => {
          const [r, g, b, a] = pixelAt(x, y);
          if (bgColor !== null) {
            return !isCloseColor(bgColor, [r, g, b], BG_TOLERANCE);
          }
          return a > 10;
        };

        let minX = w, minY = h, maxX = -1, maxY = -1;
        const stepX = Math.max(1, Math.floor(w / 400));
        const stepY = Math.max(1, Math.floor(h / 400));
        for (let y = 0; y < h; y += stepY) {
          for (let x = 0; x < w; x += stepX) {
            if (isContentPixel(x, y)) {
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (maxX < 0 || maxY < 0) { resolve({ src, backdrop }); return; }

        const contentW = maxX - minX;
        const contentH = maxY - minY;
        // 既にほぼ全体を占めている（=元々タイトな画像）ならクロップ不要
        const alreadyTight = contentW >= w * 0.94 && contentH >= h * 0.94;
        if (alreadyTight) { resolve({ src, backdrop }); return; }

        if (isSvg) {
          // SVGはラスタライズせず、内容のバウンディングボックスに合わせてviewBoxを
          // 詰め替えたベクターのまま返す（拡大表示してもぼやけない）
          const retightened = await retightenSvgViewBox(src, { minX, minY, maxX, maxY }, w, h);
          resolve({ src: retightened ?? src, backdrop });
          return;
        }

        const marginX = Math.round(contentW * CONTENT_MARGIN_RATIO);
        const marginY = Math.round(contentH * CONTENT_MARGIN_RATIO);
        const cropX = Math.max(0, minX - marginX);
        const cropY = Math.max(0, minY - marginY);
        const cropW = Math.min(w, maxX + marginX) - cropX;
        const cropH = Math.min(h, maxY + marginY) - cropY;
        if (cropW <= 0 || cropH <= 0) { resolve({ src, backdrop }); return; }

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext('2d');
        if (!cropCtx) { resolve({ src, backdrop }); return; }
        cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
        resolve({ src: cropCanvas.toDataURL(), backdrop });
      } catch {
        resolve(fallback);
      }
    })(); };
    img.onerror = () => resolve(fallback);
    img.src = src;
  });
}

/** SVGマークアップ文字列から viewBox 属性をパースする。無ければ null。 */
function parseSvgViewBox(svgText: string): { x: number; y: number; w: number; h: number } | null {
  const m = /viewBox\s*=\s*["']([^"']+)["']/i.exec(svgText);
  if (!m) return null;
  const parts = m[1].trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
  const [x, y, w, h] = parts;
  return { x, y, w, h };
}

/**
 * SVGファイルを取得し、canvas解析で求めた内容のバウンディングボックス（canvasのピクセル
 * 座標系）を、SVG自身のviewBox座標系に変換した上でviewBoxを詰め替える。
 * ラスタライズはせず、詰め替え後もベクターのまま返すため拡大表示してもぼやけない。
 * 取得・パースに失敗した場合や、詰め替え後のサイズが不正な場合は null を返す
 * （呼び出し側は元の src にフォールバックする）。
 */
async function retightenSvgViewBox(
  src: string,
  bbox: { minX: number; minY: number; maxX: number; maxY: number },
  canvasW: number,
  canvasH: number,
): Promise<string | null> {
  try {
    const svgText = await fetch(src).then((r) => (r.ok ? r.text() : ''));
    if (!svgText) return null;
    const viewBox = parseSvgViewBox(svgText);
    if (!viewBox || !/viewBox\s*=\s*["'][^"']+["']/i.test(svgText)) return null;

    // canvasはこのSVGの本来の描画サイズ（naturalWidth/Height）で描画されているため、
    // canvasピクセル座標 → viewBox座標への変換比率は viewBoxサイズ/canvasサイズ で求まる
    const scaleX = viewBox.w / canvasW;
    const scaleY = viewBox.h / canvasH;
    const minX = viewBox.x + bbox.minX * scaleX;
    const minY = viewBox.y + bbox.minY * scaleY;
    const maxX = viewBox.x + bbox.maxX * scaleX;
    const maxY = viewBox.y + bbox.maxY * scaleY;
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    if (contentW <= 0 || contentH <= 0) return null;

    const marginX = contentW * CONTENT_MARGIN_RATIO;
    const marginY = contentH * CONTENT_MARGIN_RATIO;
    const newW = contentW + marginX * 2;
    const newH = contentH + marginY * 2;
    const newViewBox = [minX - marginX, minY - marginY, newW, newH]
      .map((n) => Number(n.toFixed(3)))
      .join(' ');

    // ルートの<svg>タグを対象に、viewBoxを詰め替えた上でwidth/height属性も新しい
    // viewBoxの縦横比に更新する。width/height（例: 24px×24px）を古いまま残すと、
    // そのアスペクト比が画像の本来のサイズとしてobject-fit等の計算に使われ続け、
    // 正方形キャンバスの中に新しいviewBoxが再度レターボックスされて詰めた効果が
    // 打ち消されてしまう。width/height省略でviewBoxのアスペクト比に委ねる方法は
    // ブラウザによって挙動が異なる場合があるため、明示的に数値を設定して
    // ブラウザ間の差異を避ける（rootTagが見つからない場合はフォールバックする）。
    const rootMatch = /<svg\b[^>]*>/i.exec(svgText);
    if (!rootMatch) return null;
    let rootTag = rootMatch[0].replace(/viewBox\s*=\s*["'][^"']+["']/i, `viewBox="${newViewBox}"`);
    rootTag = rootTag.replace(/\s(?:width|height)\s*=\s*["'][^"']*["']/gi, '');
    rootTag = rootTag.replace(/^<svg\b/i, `<svg width="${newW.toFixed(3)}" height="${newH.toFixed(3)}"`);
    const retargeted = svgText.slice(0, rootMatch.index) + rootTag + svgText.slice(rootMatch.index + rootMatch[0].length);
    return `data:image/svg+xml;utf8,${encodeURIComponent(retargeted)}`;
  } catch {
    return null;
  }
}

/**
 * ロゴ画像の白一色判定（SVGのfillが全て明るい色だけ）。
 * 濃い背景前提の反転ロゴが白背景で見えなくなる問題向けのフォールバック。
 */
async function isMonochromeLightSvg(src: string): Promise<boolean> {
  try {
    const text = await fetch(src).then((r) => (r.ok ? r.text() : ''));
    if (!text) return false;
    const fills = [...text.matchAll(/fill\s*[:=]\s*["']?(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)["']?/g)]
      .map((m) => m[1])
      .filter((v) => v.toLowerCase() !== 'none');
    return fills.length > 0 && fills.every((f) => isLightCssColor(f));
  } catch {
    return false;
  }
}

/**
 * クライアントロゴを表示用に加工するフック。
 * - 単色背景が焼き込まれた画像はその色をbackdropとして、余白をトリミングしたsrcを返す
 * - 余白の大きいロゴ（OGPシェア画像等）は内容部分だけにクロップして大きく見せる
 * - 白一色のみのSVG（反転ロゴ）は、backdropにニュートラルなダークグレーを返す
 */
export function useProcessedLogo(src: string, ext: string, enabled: boolean): ProcessedLogo {
  const [result, setResult] = useState<ProcessedLogo>({ src, backdrop: null });

  useEffect(() => {
    if (!enabled) {
      setResult({ src, backdrop: null });
      return;
    }
    let cancelled = false;

    (async () => {
      const processed = await processImage(src, ext);
      if (cancelled) return;
      if (processed.backdrop === null && ext === 'svg') {
        const needsDark = await isMonochromeLightSvg(src);
        if (cancelled) return;
        if (needsDark) {
          setResult({ src: processed.src, backdrop: DARK_NEUTRAL });
          return;
        }
      }
      setResult(processed);
    })();

    return () => { cancelled = true; };
  }, [src, ext, enabled]);

  return result;
}
