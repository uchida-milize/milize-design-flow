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
