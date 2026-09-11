/**
 * resources.json（extract-css が保存した css_info / design_md）を
 * ガイドライン・コンポーネントページで表示できる形に変換するユーティリティ。
 */

export interface HexColorInfo {
  hex: string;
  usages: string[];
  count: number;
  sources: string[];
}

/** extract-css が保存する "hex | usages | 出現N回 | [sources]" 形式の文字列をパースする */
export function parseHexColors(str: string | undefined): HexColorInfo[] {
  if (!str) return [];
  const out: HexColorInfo[] = [];
  for (const line of str.split('\n')) {
    const m = line.match(/^(#[0-9a-fA-F]{6,8})\s*\|\s*([^|]*)\|\s*出現(\d+)回\s*\|\s*\[([^\]]*)\]/);
    if (!m) continue;
    out.push({
      hex: m[1].toUpperCase(),
      usages: m[2].split(',').map((s) => s.trim()).filter(Boolean),
      count: parseInt(m[3], 10) || 0,
      sources: m[4].split('+').map((s) => s.trim()).filter(Boolean),
    });
  }
  return out;
}

export interface StyleBlock {
  selector: string;
  properties: Record<string, string>;
  sourceUrl?: string;
}

export interface DesignMdSection {
  title: string;
  body: string;
}

/**
 * design_md は「# 見出し」で始まり、以降は「====\n# 見出し\n====」区切りで
 * 複数の大セクション（ガイドライン／コンポーネント／その他 等）に分かれている。
 * その区切りでセクションごとに分割する。
 */
export function splitDesignMd(md: string | undefined): DesignMdSection[] {
  if (!md) return [];
  const re = /\n=+\n#\s*([^\n]+)\n=+\n/g;
  const matches: { index: number; length: number; title: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    matches.push({ index: m.index, length: m[0].length, title: m[1].trim() });
  }

  const sections: DesignMdSection[] = [];
  const firstEnd = matches[0]?.index ?? md.length;
  const firstChunk = md.slice(0, firstEnd).trim();
  if (firstChunk) {
    const firstTitleMatch = firstChunk.match(/^#\s*([^\n]+)/);
    sections.push({
      title: firstTitleMatch ? firstTitleMatch[1].trim() : '概要',
      body: firstChunk.replace(/^#\s*[^\n]+\n?/, '').trim(),
    });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : md.length;
    const body = md.slice(start, end).trim();
    if (body) sections.push({ title: matches[i].title, body });
  }
  return sections;
}

/** セクションタイトルにキーワードを含むものを探す（LLM生成のため厳密一致はしない） */
export function findSection(sections: DesignMdSection[], keyword: string): DesignMdSection | undefined {
  return sections.find((s) => s.title.includes(keyword));
}

export interface ResourcesCssInfo {
  hex_colors?: string;
  fonts?: string[];
  button_styles?: StyleBlock[];
  card_styles?: StyleBlock[];
  form_styles?: StyleBlock[];
  border_radii?: string[];
}

export interface ResourcesJson {
  css_info?: ResourcesCssInfo;
  design_md?: string;
  selected_urls?: string;
}

/** クライアントの resources.json を取得する（存在しない/取得失敗時は null） */
export async function fetchResources(slug: string): Promise<ResourcesJson | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/resources.json?t=${Date.now()}`,
    );
    if (!res.ok) return null;
    return (await res.json()) as ResourcesJson;
  } catch {
    return null;
  }
}

/** selected_urls（"url||tag1,tag2" 形式が改行区切り）から URL のみの配列を取り出す */
export function parseSelectedUrls(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => {
      const s = line.trim();
      const pipeIdx = s.indexOf('||');
      return pipeIdx >= 0 ? s.slice(0, pipeIdx).trim() : s;
    })
    .filter(Boolean);
}

/** URLからホスト名だけを取り出す（リンクラベル用） */
export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
