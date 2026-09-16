import type { CSSProperties } from 'react';

/** "background-color" のようなケバブケースのCSSプロパティ名をReactのcamelCaseキーに変換する */
function toCamel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** extract-css が抽出した Record<string,string> をそのまま React の style props に変換する */
export function toReactStyle(properties: Record<string, string> | undefined): CSSProperties {
  if (!properties) return {};
  const style: Record<string, string> = {};
  for (const [k, v] of Object.entries(properties)) {
    // "--tw-bg-opacity" のようなカスタムプロパティ名は大文字小文字を含め一字一句そのまま
    // でなければ var() 参照先と一致しなくなる（toCamelでキャメルケース化すると壊れる）
    style[k.startsWith('--') ? k : toCamel(k)] = v;
  }
  return style as CSSProperties;
}

/**
 * ボタン/カード等の抽出CSSは `var(--xxx)` を参照していることが多いが、
 * その `--xxx` はサイト本体の :root にしか定義されていないため、このポータル上に
 * そのまま表示すると値が解決できず見た目が崩れる（背景が透明になる等）。
 * resources.json の css_info.css_variables を祖先要素にカスタムプロパティとして
 * 注入し、var() 参照を解決できるようにする。
 */
export function toCssVarStyle(vars: Record<string, string> | undefined): CSSProperties {
  if (!vars) return {};
  const style: Record<string, string> = {};
  for (const [k, v] of Object.entries(vars)) {
    if (k.startsWith('--')) style[k] = v;
  }
  return style as CSSProperties;
}

/**
 * 抽出したボタンCSSが「アイコン専用ボタン」（検索/お気に入りアイコン等、元サイトでは
 * テキストを表示しない前提の小さな正方形ボタン）かどうかを判定する。
 * width/height（またはmin-width/min-height）が両方とも小さい固定値の場合に該当し、
 * その場合はプレビューに長いラベル文字列を入れると縦に折り返して枠からはみ出す。
 */
export function isIconOnlyButtonStyle(properties: Record<string, string> | undefined): boolean {
  if (!properties) return false;
  const toPx = (v?: string): number | null => {
    if (!v) return null;
    const m = /^(\d+(?:\.\d+)?)px$/.exec(v.trim());
    return m ? parseFloat(m[1]) : null;
  };
  const THRESHOLD = 48;
  const w = toPx(properties.width) ?? toPx(properties['min-width']);
  const h = toPx(properties.height) ?? toPx(properties['min-height']);
  return w !== null && h !== null && w <= THRESHOLD && h <= THRESHOLD;
}

const NAMED_LIGHT_COLORS = new Set(['white', '#fff', '#ffffff', 'transparent']);

/**
 * 文字色や枠線色が白系かどうかを判定する。ヘッダー等の濃い背景の上で使う前提の
 * ボタン（白文字・白枠、背景色は指定なし）は、白いプレビュー面の上に置くと
 * 文字も枠線も見えなくなってしまうため、プレビュー側の背景を自動で暗くする判定に使う。
 * `rgb(r g b/var(...))` のような値でもRGB部分が数値であれば判定できる。
 */
export function isLightCssColor(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  if (NAMED_LIGHT_COLORS.has(v)) return true;

  const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(v);
  if (hexMatch) {
    const hex = hexMatch[1];
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 200;
  }

  const rgbMatch = /rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/.exec(v);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1, 4).map(Number);
    return 0.299 * r + 0.587 * g + 0.114 * b > 200;
  }

  return false;
}

/**
 * 色の「視覚的な重み」を、出現回数とCSS上の用途から算出する。
 * background/fill等、実際に画面上の面積を大きく占める用途を重視し、
 * 文字色（color）のような細い用途は軽く扱う。プライマリカラー判定・
 * カラー帯の比率算出の両方で共通して使う。
 */
export function visualColorWeight(entry: { count: number; usages: string[] }): number {
  if (entry.usages.length === 0) return entry.count;
  let weightedTotal = 0;
  let rawTotal = 0;
  for (const usage of entry.usages) {
    const u = usage.toLowerCase().trim();
    let mult = 1;
    if (/^background(?:-color)?$/.test(u)) mult = 5;
    else if (/^fill$/.test(u)) mult = 4;
    else if (u.startsWith('--')) mult = 3;
    else if (/border|outline/.test(u)) mult = 1;
    else if (/^color$/.test(u)) mult = 0.3;
    weightedTotal += mult;
    rawTotal++;
  }
  return entry.count * (weightedTotal / rawTotal);
}

/** カラー帯の中でどんなに重みが小さい色でも視認できるようにする最低比率（%） */
const MIN_COLOR_RATIO_PERCENT = 5;

/**
 * 色の重み配列から、実際の重みに比例した表示比率（%、合計100）を算出する。
 * 全クライアント共通の固定パターン（50/22/13/9/6等）に頼ると、実際の色使いの
 * 差がカラー帯の見た目にまったく反映されなくなるため、それを避けるための関数。
 * 重みが0以下（データが取れない）場合は均等割りにフォールバックする。
 */
export function computeColorRatios(weights: number[]): number[] {
  if (weights.length === 0) return [];
  if (weights.length === 1) return [100];

  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) {
    const even = Math.round((100 / weights.length) * 10) / 10;
    const ratios = weights.map(() => even);
    ratios[0] += 100 - ratios.reduce((a, b) => a + b, 0);
    return ratios;
  }

  // 重みに比例した比率を計算した上で、最低比率を下回る色を底上げし、
  // その分を最低比率を上回っている色から比例配分で差し引く
  let ratios = weights.map((w) => (w / total) * 100);
  for (let iter = 0; iter < weights.length; iter++) {
    const deficits = ratios.map((r) => Math.max(0, MIN_COLOR_RATIO_PERCENT - r));
    const totalDeficit = deficits.reduce((a, b) => a + b, 0);
    if (totalDeficit <= 0.01) break;
    const donorTotal = ratios.reduce((sum, r, i) => sum + (deficits[i] === 0 ? r : 0), 0);
    if (donorTotal <= 0) break;
    ratios = ratios.map((r, i) =>
      deficits[i] > 0 ? MIN_COLOR_RATIO_PERCENT : r - totalDeficit * (r / donorTotal),
    );
  }

  // 丸め誤差を最も重みの大きい色（先頭）に寄せて合計をちょうど100にする
  const rounded = ratios.map((r) => Math.round(r * 10) / 10);
  rounded[0] = Math.round((rounded[0] + (100 - rounded.reduce((a, b) => a + b, 0))) * 10) / 10;
  return rounded;
}
