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
    style[toCamel(k)] = v;
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
