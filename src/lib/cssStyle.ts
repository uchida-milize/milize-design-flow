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
