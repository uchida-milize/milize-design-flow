import { NextRequest } from 'next/server';
import { batchGitCommit, deleteExistingLogoFiles } from '../_lib/portal-helpers';

/**
 * POST /api/extract-css
 *
 * Dify ワークフローの HTTP Request ノードから呼び出される。
 * 指定 URL の HTML から外部 CSS ファイルを発見し、
 * CSS 変数カラー・HEX カラー頻度・フォント・ボタン/カードスタイル・
 * インラインスタイル・ロゴ画像を抽出して返す。
 *
 * 改善点:
 *   A. CDN/ライブラリ CSS をスキップし自社 CSS を優先取得（最大 10 本）
 *      <style> タグ内 CSS も解析対象に含める
 *      全 CSS から HEX カラーを頻度付きで抽出（CSS 変数限定を廃止）
 *   B. style= 属性のインラインカラーも収集
 *      border-radius 値も抽出
 */

// ──────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────
interface CssInfo {
  css_variables: Record<string, string>;
  hex_color_freq: Map<string, HexColorEntry>;
  rgb_colors: string[];
  fonts: string[];
  button_styles: StyleBlock[];
  card_styles: StyleBlock[];
  border_radii: string[];
  logo_urls: string[];
  source_css_urls: string[];
}

interface HexColorEntry {
  count: number;
  usages: string[]; // CSS プロパティ名
  sources: string[]; // 'external-css' | 'style-tag' | 'inline-style'
}

interface StyleBlock {
  selector: string;
  properties: Record<string, string>;
}

// ──────────────────────────────────────────
// スキップすべき CDN / ライブラリドメイン
// ──────────────────────────────────────────
const SKIP_DOMAINS = [
  'unpkg.com',
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fontawesome.com',
  'use.fontawesome.com',
  'kit.fontawesome.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'ajax.googleapis.com',
  'maxcdn.bootstrapcdn.com',
  'stackpath.bootstrapcdn.com',
  'cdn.shopify.com',
  'static.cloudflareinsights.com',
];

// スキップすべきファイルパターン（アイコン・アニメーション系）
const SKIP_PATTERNS = [
  /font-awesome/i,
  /fontawesome/i,
  /animate\.css/i,
  /lenis/i,
  /swiper/i,
  /slick/i,
  /lightbox/i,
  /fancybox/i,
];

// ──────────────────────────────────────────
// HTML パーサー: stylesheet リンク・OGP・favicon・<style>タグ を取得
// ──────────────────────────────────────────
function parseHtmlMeta(html: string, baseUrl: string): {
  ownCssLinks: string[];
  libCssLinks: string[];
  styleTags: string[];
  ogImage: string | null;
  favicon: string | null;
  logoImgs: string[];
  infoboxImage: string | null;
} {
  const allCssLinks: string[] = [];
  const logoImgs: string[] = [];

  // <link rel="stylesheet" href="...">（属性順序の2パターン対応）
  const linkPatterns = [
    /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
    /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*>/gi,
  ];
  for (const re of linkPatterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      allCssLinks.push(toAbsolute(m[1], baseUrl));
    }
  }

  // OGP image
  const ogRe = /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i;
  const ogRe2 = /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i;
  const ogMatch = ogRe.exec(html) ?? ogRe2.exec(html);
  const ogImage = ogMatch ? toAbsolute(ogMatch[1], baseUrl) : null;

  // favicon
  const favRe = /<link[^>]+rel=["'](?:shortcut icon|icon)["'][^>]*href=["']([^"']+)["'][^>]*>/i;
  const favMatch = favRe.exec(html);
  const favicon = favMatch ? toAbsolute(favMatch[1], baseUrl) : null;

  // <img> で logo / hero / brand を含む src
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let imgMatch: RegExpExecArray | null;
  while ((imgMatch = imgRe.exec(html)) !== null) {
    const src = imgMatch[1];
    if (/logo|brand|hero|header/i.test(src) || /logo|brand/i.test(imgMatch[0])) {
      logoImgs.push(toAbsolute(src, baseUrl));
    }
  }

  // Wikipedia の記事ページ: 右カラムの「基礎情報（infobox）」上部にある画像＝会社ロゴを優先取得。
  // 一般的な logo/brand キーワード一致（下記）は infobox を持たないページ向けで、Wikipediaの
  // ロゴ画像ファイル名は必ずしも "logo" を含むとは限らないため、ここで別途拾う。
  let infoboxImage: string | null = null;
  try {
    if (/(^|\.)wikipedia\.org$/i.test(new URL(baseUrl).hostname)) {
      const infoboxMatch = /<table[^>]+class=["'][^"']*\binfobox\b[^"']*["'][^>]*>([\s\S]*?)<\/table>/i.exec(html);
      if (infoboxMatch) {
        const infoboxImgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(infoboxMatch[1]);
        // src 内の &amp; 等の HTML エンティティをデコードしてから絶対URL化する
        if (infoboxImgMatch) infoboxImage = toAbsolute(infoboxImgMatch[1].replace(/&amp;/g, '&'), baseUrl);
      }
    }
  } catch { /* baseUrl が不正な場合は無視 */ }

  // <style> タグ内の CSS テキストを収集
  const styleTags: string[] = [];
  const styleTagRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let stm: RegExpExecArray | null;
  while ((stm = styleTagRe.exec(html)) !== null) {
    const content = stm[1].trim();
    if (content.length > 50) styleTags.push(content);
  }

  // 自社 CSS と CDN CSS を分離
  const deduped = dedupe(allCssLinks);
  const ownCssLinks = deduped.filter(url => isOwnCss(url, baseUrl));
  const libCssLinks = deduped.filter(url => !isOwnCss(url, baseUrl));

  return {
    ownCssLinks,
    libCssLinks,
    styleTags,
    ogImage,
    favicon,
    logoImgs: dedupe(logoImgs),
    infoboxImage,
  };
}

/** 自社 CSS かどうか判定（CDN/ライブラリを除外） */
function isOwnCss(cssUrl: string, pageBaseUrl: string): boolean {
  try {
    const cssHost = new URL(cssUrl).hostname;
    const pageHost = new URL(pageBaseUrl).hostname;
    // 同一ホスト or サブドメイン
    if (cssHost === pageHost || cssHost.endsWith('.' + pageHost)) return true;
    // CDN ドメインに一致
    if (SKIP_DOMAINS.some(d => cssUrl.includes(d))) return false;
    // ファイルパターン一致
    if (SKIP_PATTERNS.some(p => p.test(cssUrl))) return false;
    return true;
  } catch {
    return false;
  }
}

// ──────────────────────────────────────────
// CSS パーサー（全 HEX 抽出 + 従来機能）
// ──────────────────────────────────────────
function parseCss(css: string, source: 'external-css' | 'style-tag'): Partial<CssInfo> & { hex_color_freq: Map<string, HexColorEntry> } {
  const css_variables: Record<string, string> = {};
  const fontsSet = new Set<string>();
  const button_styles: StyleBlock[] = [];
  const card_styles: StyleBlock[] = [];
  const border_radii_set = new Set<string>();
  const hex_color_freq = new Map<string, HexColorEntry>();

  // ① :root { --xxx } CSS 変数を収録
  const rootRe = /:root\s*\{([^}]+)\}/g;
  let rootMatch: RegExpExecArray | null;
  while ((rootMatch = rootRe.exec(css)) !== null) {
    const block = rootMatch[1];
    const varRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let vm: RegExpExecArray | null;
    while ((vm = varRe.exec(block)) !== null) {
      const name = vm[1].trim();
      const val = vm[2].trim();
      if (isColorValue(val) || /color|primary|secondary|accent|bg|background|text|brand/i.test(name)) {
        css_variables[name] = val;
      } else if (/font/i.test(name)) {
        css_variables[name] = val;
      }
    }
  }

  // ② 全 CSS から "プロパティ: #HEXカラー" を頻度付きで抽出
  //    context: "background-color: #0055A4" → usages に 'background-color' を記録
  const hexInPropRe = /([\w-]+)\s*:\s*([^;{}\n]*#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b[^;{}\n]*)/g;
  let hm: RegExpExecArray | null;
  while ((hm = hexInPropRe.exec(css)) !== null) {
    const prop = hm[1].trim().toLowerCase();
    // カラー関連プロパティに限定
    if (!/color|background|border|fill|stroke|outline|shadow|gradient/i.test(prop)) continue;
    // 値の中の #HEX を全部抽出
    const valueStr = hm[2];
    const hexRe2 = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
    let hm2: RegExpExecArray | null;
    while ((hm2 = hexRe2.exec(valueStr)) !== null) {
      const raw = hm2[1];
      // 3桁 → 6桁に正規化
      const normalized = raw.length === 3
        ? ('#' + raw[0]+raw[0]+raw[1]+raw[1]+raw[2]+raw[2]).toUpperCase()
        : ('#' + raw).toUpperCase();
      addHexEntry(hex_color_freq, normalized, prop, source);
    }
  }

  // ③ CSS 変数の値にある #HEX も収録
  Object.entries(css_variables).forEach(([name, val]) => {
    const hexRe3 = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
    let hm3: RegExpExecArray | null;
    while ((hm3 = hexRe3.exec(val)) !== null) {
      const raw = hm3[1];
      const normalized = raw.length === 3
        ? ('#' + raw[0]+raw[0]+raw[1]+raw[1]+raw[2]+raw[2]).toUpperCase()
        : ('#' + raw).toUpperCase();
      addHexEntry(hex_color_freq, normalized, name, source);
    }
  });

  // ④ font-family を全体から抽出
  const fontRe = /font-family\s*:\s*([^;}{]+);/g;
  let fm: RegExpExecArray | null;
  while ((fm = fontRe.exec(css)) !== null) {
    const val = fm[1].trim();
    const first = val.split(',')[0].replace(/['"]/g, '').trim();
    if (first.length > 0 && first.length < 80) fontsSet.add(first);
  }

  // ⑤ border-radius を抽出
  const brRe = /border-radius\s*:\s*([^;}{]+);/g;
  let brm: RegExpExecArray | null;
  while ((brm = brRe.exec(css)) !== null) {
    const val = brm[1].trim();
    if (val && val !== '0' && val !== '0px' && val.length < 40) {
      border_radii_set.add(val);
    }
  }

  // ⑥ セレクタブロック（ボタン・カード系）
  const blockRe = /([^{}\n][^{}]*?)\{([^{}]+)\}/g;
  let bm: RegExpExecArray | null;
  while ((bm = blockRe.exec(css)) !== null) {
    const selector = bm[1].trim();
    const body = bm[2].trim();
    if (selector.startsWith('@')) continue;

    if (/btn|button|\.cta|\.primary-btn/i.test(selector)) {
      const props = parseDeclarations(body);
      if (Object.keys(props).length > 0) button_styles.push({ selector, properties: props });
    }
    if (/card|\.box|\.panel|\.tile|\.widget/i.test(selector)) {
      const props = parseDeclarations(body);
      if (Object.keys(props).length > 0) card_styles.push({ selector, properties: props });
    }
  }

  return {
    css_variables,
    hex_color_freq,
    fonts: Array.from(fontsSet),
    button_styles: button_styles.slice(0, 20),
    card_styles: card_styles.slice(0, 20),
    border_radii: Array.from(border_radii_set).slice(0, 20),
  };
}

// ──────────────────────────────────────────
// B. HTML インラインスタイル解析
// ──────────────────────────────────────────
function extractInlineColors(html: string): Map<string, HexColorEntry> {
  const freq = new Map<string, HexColorEntry>();

  // style="..." 属性から "プロパティ: #HEX" を抽出
  const styleAttrRe = /style=["']([^"']{1,500})["']/gi;
  let m: RegExpExecArray | null;
  while ((m = styleAttrRe.exec(html)) !== null) {
    const styleVal = m[1];
    const propValRe = /([\w-]+)\s*:\s*([^;]*#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b[^;]*)/g;
    let pm: RegExpExecArray | null;
    while ((pm = propValRe.exec(styleVal)) !== null) {
      const prop = pm[1].trim().toLowerCase();
      if (!/color|background|border|fill|stroke/i.test(prop)) continue;
      const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
      let hm: RegExpExecArray | null;
      while ((hm = hexRe.exec(pm[2])) !== null) {
        const raw = hm[1];
        const normalized = raw.length === 3
          ? ('#' + raw[0]+raw[0]+raw[1]+raw[1]+raw[2]+raw[2]).toUpperCase()
          : ('#' + raw).toUpperCase();
        addHexEntry(freq, normalized, prop, 'inline-style');
      }
    }
  }

  return freq;
}

// ──────────────────────────────────────────
// ユーティリティ
// ──────────────────────────────────────────
function addHexEntry(
  freq: Map<string, HexColorEntry>,
  hex: string,
  usage: string,
  source: 'external-css' | 'style-tag' | 'inline-style',
): void {
  // 純白・純黒・透明は除外
  if (['#000000', '#FFFFFF', '#000', '#FFF'].includes(hex)) return;
  if (!freq.has(hex)) freq.set(hex, { count: 0, usages: [], sources: [] });
  const entry = freq.get(hex)!;
  entry.count++;
  if (!entry.usages.includes(usage) && entry.usages.length < 5) entry.usages.push(usage);
  if (!entry.sources.includes(source)) entry.sources.push(source);
}

function mergeHexFreq(a: Map<string, HexColorEntry>, b: Map<string, HexColorEntry>): Map<string, HexColorEntry> {
  const result = new Map(a);
  for (const [hex, entry] of b) {
    if (!result.has(hex)) {
      result.set(hex, { ...entry, usages: [...entry.usages], sources: [...entry.sources] });
    } else {
      const existing = result.get(hex)!;
      existing.count += entry.count;
      entry.usages.forEach(u => { if (!existing.usages.includes(u) && existing.usages.length < 5) existing.usages.push(u); });
      entry.sources.forEach(s => { if (!existing.sources.includes(s)) existing.sources.push(s); });
    }
  }
  return result;
}

function parseDeclarations(body: string): Record<string, string> {
  const result: Record<string, string> = {};
  const re = /([\w-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const prop = m[1].trim();
    const val = m[2].trim();
    if (/color|background|border|radius|shadow|font|padding|margin|display|flex/i.test(prop)) {
      result[prop] = val;
    }
  }
  return result;
}

function isColorValue(val: string): boolean {
  return /^#[0-9a-fA-F]{3,8}$/.test(val) ||
    /^rgba?\(/.test(val) ||
    /^hsla?\(/.test(val) ||
    /^(white|black|transparent|inherit|currentColor)$/i.test(val);
}

function toAbsolute(href: string, base: string): string {
  try { return new URL(href, base).href; } catch { return href; }
}

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/** HEX 頻度マップを "出現回数多い順" の文字列に変換（LLM 入力用） */
function hexFreqToString(freq: Map<string, HexColorEntry>): string {
  return Array.from(freq.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 30)
    .map(([hex, e]) => `${hex} | ${e.usages.join(', ')} | 出現${e.count}回 | [${e.sources.join('+')}]`)
    .join('\n');
}

/** hexFreqToString で永続化した文字列を Map に復元する（同一実行内の複数URL呼び出しをマージするため） */
function parseHexFreqString(str: string | undefined): Map<string, HexColorEntry> {
  const freq = new Map<string, HexColorEntry>();
  if (!str) return freq;
  for (const line of str.split('\n')) {
    const m = line.match(/^(#[0-9a-fA-F]{6})\s*\|\s*([^|]*)\|\s*出現(\d+)回\s*\|\s*\[([^\]]*)\]/);
    if (!m) continue;
    const [, hex, usagesStr, countStr, sourcesStr] = m;
    freq.set(hex, {
      count: parseInt(countStr, 10) || 0,
      usages: usagesStr.split(',').map(s => s.trim()).filter(Boolean),
      sources: sourcesStr.split('+').map(s => s.trim()).filter(Boolean),
    });
  }
  return freq;
}

function buildSummary(
  cssVars: Record<string, string>,
  hexFreq: Map<string, HexColorEntry>,
  fonts: string[],
  buttonStyles: StyleBlock[],
  cardStyles: StyleBlock[],
  borderRadii: string[],
  logoUrls: string[],
  sourceCssUrls: string[],
): string {
  const lines: string[] = [];

  const topHex = Array.from(hexFreq.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 15);

  if (topHex.length > 0) {
    lines.push('【抽出カラー（頻度順）】');
    topHex.forEach(([hex, e]) => {
      lines.push(`  ${hex}  ${e.usages[0] ?? ''}  出現${e.count}回  [${e.sources.join('+')}]`);
    });
    lines.push('');
  }

  const colorVars = Object.entries(cssVars).filter(([, v]) => isColorValue(v));
  if (colorVars.length > 0) {
    lines.push('【CSS カラー変数（:root）】');
    colorVars.forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    lines.push('');
  }

  if (fonts.length > 0) {
    lines.push('【使用フォント】');
    fonts.forEach(f => lines.push(`  ${f}`));
    lines.push('');
  }

  if (borderRadii.length > 0) {
    lines.push('【角丸パターン】');
    dedupe(borderRadii).slice(0, 8).forEach(r => lines.push(`  ${r}`));
    lines.push('');
  }

  if (buttonStyles.length > 0) {
    lines.push('【ボタンスタイル】');
    buttonStyles.slice(0, 5).forEach(b => {
      lines.push(`  ${b.selector}`);
      Object.entries(b.properties).slice(0, 6).forEach(([k, v]) => lines.push(`    ${k}: ${v}`));
    });
    lines.push('');
  }

  if (cardStyles.length > 0) {
    lines.push('【カードスタイル】');
    cardStyles.slice(0, 5).forEach(c => {
      lines.push(`  ${c.selector}`);
      Object.entries(c.properties).slice(0, 6).forEach(([k, v]) => lines.push(`    ${k}: ${v}`));
    });
    lines.push('');
  }

  if (logoUrls.length > 0) {
    lines.push('【ロゴ・ビジュアル素材】');
    logoUrls.slice(0, 10).forEach(u => lines.push(`  ${u}`));
    lines.push('');
  }

  if (sourceCssUrls.length > 0) {
    lines.push('【取得CSSファイル】');
    sourceCssUrls.forEach(u => lines.push(`  ${u}`));
  }

  return lines.join('\n') || '（データなし）';
}

// ──────────────────────────────────────────
// メインハンドラー
// ──────────────────────────────────────────
// ──────────────────────────────────────────
// ロゴ画像の実ファイル保存
// ──────────────────────────────────────────
const LOGO_EXT_BY_CONTENT_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
  'image/gif': 'gif',
};
const LOGO_EXTENSIONS = Object.freeze(['png', 'jpg', 'jpeg', 'svg', 'webp', 'ico', 'gif']);

/** src/app/{slug}/logo.{ext} がいずれかの拡張子で既に存在するか確認（並列チェックで待ち時間を短縮） */
async function logoAlreadyExists(clientSlug: string, token: string): Promise<boolean> {
  const checks = await Promise.all(
    LOGO_EXTENSIONS.map(async (ext) => {
      try {
        const r = await fetch(
          `https://api.github.com/repos/uchida-milize/milize-design-flow/contents/src/app/${clientSlug}/logo.${ext}`,
          { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'extract-css' } },
        );
        return r.ok;
      } catch {
        return false;
      }
    }),
  );
  return checks.some(Boolean);
}

/** 候補URLを順に試し、最初に取得できた実画像を src/app/{slug}/logo.{ext} としてコミットする */
async function tryCommitLogo(
  clientSlug: string,
  candidates: string[],
  token: string,
): Promise<{ saved: boolean; path?: string } | null> {
  for (const url of candidates.slice(0, 5)) {
    try {
      const imgRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MilizeBot/1.0)' },
        signal: AbortSignal.timeout(10000),
      });
      if (!imgRes.ok) continue;
      const contentType = (imgRes.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
      const ext = LOGO_EXT_BY_CONTENT_TYPE[contentType];
      if (!ext) continue;
      const buf = await imgRes.arrayBuffer();
      // トラッキングピクセル等の極小画像・巨大すぎるファイルは除外
      if (buf.byteLength < 200 || buf.byteLength > 3 * 1024 * 1024) continue;
      const base64 = Buffer.from(buf).toString('base64');
      const filePath = `src/app/${clientSlug}/logo.${ext}`;
      const putRes = await fetch(
        `https://api.github.com/repos/uchida-milize/milize-design-flow/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'extract-css',
          },
          body: JSON.stringify({
            message: `feat(${clientSlug}): save logo`,
            content: base64,
            branch: 'main',
          }),
        },
      );
      if (putRes.ok) return { saved: true, path: filePath };
    } catch { /* 次の候補を試す */ }
  }
  return null;
}

/**
 * logoUrls の候補を順に試し、最初に取得できた実画像を
 * src/app/{slug}/logo.{ext} としてコミットする。
 * 既にロゴファイルが存在する場合は通常は上書きしない（同一生成内の後続ページで
 * 質の低い画像に上書きされるのを防ぐため）。
 *
 * priorityUrls（Wikipediaのinfobox画像など、より権威あるロゴソース）が渡された場合は例外で、
 * 既存ロゴの有無に関わらずまずそちらの保存を試みる（同一実行内で他ページの一般的な
 * logo判定が先に処理され、後から見つかったinfobox画像が取りこぼされるのを防ぐため）。
 */
async function saveLogo(
  clientSlug: string,
  logoUrls: string[],
  token: string,
  priorityUrls: string[] = [],
): Promise<{ saved: boolean; path?: string; error?: string }> {
  if (!clientSlug) return { saved: false };

  if (priorityUrls.length > 0) {
    // 上書きのため、拡張子違いも含めて既存ロゴを先に削除してから保存を試みる
    await deleteExistingLogoFiles(clientSlug, token);
    const priorityCandidates = dedupe(priorityUrls.filter(u => /^https?:\/\//i.test(u)));
    const result = await tryCommitLogo(clientSlug, priorityCandidates, token);
    if (result) return result;
    // 優先候補が全滅した場合は下の通常フローにフォールバック（既に削除済みなので素通りする）
  }

  if (logoUrls.length === 0) return { saved: false };
  if (await logoAlreadyExists(clientSlug, token)) return { saved: false };

  // data: URI等（遅延読み込みのプレースホルダー画像等）は候補から除外
  // URLに"logo"を含む候補（favicon/OGP画像より明示的にロゴらしい）を優先して試す
  const prioritized = logoUrls.filter(u => /^https?:\/\//i.test(u)).sort((a, b) => {
    const aLogo = /logo/i.test(a) ? 0 : 1;
    const bLogo = /logo/i.test(b) ? 0 : 1;
    return aLogo - bLogo;
  });

  const result = await tryCommitLogo(clientSlug, prioritized, token);
  return result ?? { saved: false, error: 'no valid logo candidate found' };
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (Array.isArray(parsed)) {
      body = (parsed[0] as Record<string, unknown>) ?? {};
    } else if (parsed && typeof parsed === 'object') {
      body = parsed as Record<string, unknown>;
    } else {
      return Response.json({ error: 'unexpected body format' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  let urls: string[] = [];
  const rawUrls = body.urls ?? body.url;
  if (Array.isArray(rawUrls)) {
    urls = rawUrls.map(String).filter(Boolean);
  } else if (typeof rawUrls === 'string') {
    urls = rawUrls.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  }

  if (urls.length === 0) {
    return Response.json({ error: 'urls is required' }, { status: 400 });
  }

  const client_slug = body.client_slug as string | undefined;

  // 集計用
  let allCssVars: Record<string, string> = {};
  let allHexFreq = new Map<string, HexColorEntry>();
  const allFonts = new Set<string>();
  let allButtonStyles: StyleBlock[] = [];
  let allCardStyles: StyleBlock[] = [];
  const allBorderRadii = new Set<string>();
  const allLogoUrls: string[] = [];
  const allInfoboxImgs: string[] = [];
  const allSourceCssUrls: string[] = [];
  const errors: string[] = [];

  for (const pageUrl of urls.slice(0, 10)) {
    try {
      // HTML 取得
      const htmlRes = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MilizeBot/1.0)' },
        signal: AbortSignal.timeout(12000),
      });
      if (!htmlRes.ok) { errors.push(`${pageUrl}: HTTP ${htmlRes.status}`); continue; }
      const html = await htmlRes.text();

      const { ownCssLinks, libCssLinks, styleTags, ogImage, favicon, logoImgs, infoboxImage } = parseHtmlMeta(html, pageUrl);

      // ロゴ・OGP を収集（Wikipediaのinfobox画像は「会社ロゴ」として最優先候補に別枠で積む）
      if (infoboxImage) allInfoboxImgs.push(infoboxImage);
      [ogImage, favicon, ...logoImgs].filter(Boolean).forEach(u => allLogoUrls.push(u!));

      // ──────────────────────────
      // A-1. 自社 CSS を最大 10 本取得（CDN より優先）
      // ──────────────────────────
      const fetchTargets = [...ownCssLinks.slice(0, 10), ...libCssLinks.slice(0, 3)];

      for (const cssUrl of fetchTargets) {
        try {
          const cssRes = await fetch(cssUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MilizeBot/1.0)' },
            signal: AbortSignal.timeout(10000),
          });
          if (!cssRes.ok) continue;
          const buf = await cssRes.arrayBuffer();
          if (buf.byteLength > 800 * 1024) continue; // 800KB 制限
          const cssText = new TextDecoder().decode(buf);
          const parsed = parseCss(cssText, 'external-css');
          allCssVars = { ...allCssVars, ...(parsed.css_variables ?? {}) };
          allHexFreq = mergeHexFreq(allHexFreq, parsed.hex_color_freq);
          (parsed.fonts ?? []).forEach(f => allFonts.add(f));
          allButtonStyles.push(...(parsed.button_styles ?? []));
          allCardStyles.push(...(parsed.card_styles ?? []));
          (parsed.border_radii ?? []).forEach(r => allBorderRadii.add(r));
          allSourceCssUrls.push(cssUrl);
        } catch { /* 個別 CSS 取得失敗は無視 */ }
      }

      // ──────────────────────────
      // A-2. <style> タグを解析
      // ──────────────────────────
      for (const styleText of styleTags) {
        const parsed = parseCss(styleText, 'style-tag');
        allCssVars = { ...allCssVars, ...(parsed.css_variables ?? {}) };
        allHexFreq = mergeHexFreq(allHexFreq, parsed.hex_color_freq);
        (parsed.fonts ?? []).forEach(f => allFonts.add(f));
        allButtonStyles.push(...(parsed.button_styles ?? []));
        allCardStyles.push(...(parsed.card_styles ?? []));
        (parsed.border_radii ?? []).forEach(r => allBorderRadii.add(r));
      }

      // ──────────────────────────
      // B. インライン style= 属性のカラーを収集
      // ──────────────────────────
      const inlineFreq = extractInlineColors(html);
      allHexFreq = mergeHexFreq(allHexFreq, inlineFreq);

    } catch (e) {
      errors.push(`${pageUrl}: ${String(e).slice(0, 100)}`);
    }
  }

  // 重複除去（この呼び出し1回分のURLの中での重複のみ）
  allButtonStyles = Array.from(new Map(allButtonStyles.map(b => [b.selector, b])).values()).slice(0, 20);
  allCardStyles   = Array.from(new Map(allCardStyles.map(c => [c.selector, c])).values()).slice(0, 20);
  let logoUrls  = dedupe(allLogoUrls);
  let sourceCssUrls = dedupe(allSourceCssUrls);
  let fonts     = Array.from(allFonts);
  let borderRadii = Array.from(allBorderRadii).slice(0, 20);

  // client_slug が指定されていれば resources.json に保存
  // NOTE: Dify側は選択URLごとにこのAPIを1回ずつ呼ぶため、ここで既存の css_info と
  // マージしないと「最後に処理されたURLの結果」だけが残ってしまう
  // （ワークフロー開始時の dify-callback _reset で resources.json 自体は空に戻るので、
  //   この呼び出し間マージは同一実行内の複数URL分を正しく積み上げるためのもの）
  let saved = false;
  let saveError: string | undefined;
  let logoSaved = false;
  let logoPath: string | undefined;
  let logoSaveError: string | undefined;
  if (client_slug) {
    const githubToken = process.env.GITHUB_TOKEN ?? '';
    if (githubToken) {
      const filePath = `src/app/${client_slug}/resources.json`;
      let current: Record<string, unknown> = {};
      try {
        const readRes = await fetch(
          `https://api.github.com/repos/uchida-milize/milize-design-flow/contents/${filePath}`,
          { headers: { Authorization: `Bearer ${githubToken}`, Accept: 'application/vnd.github+json', 'User-Agent': 'extract-css' } },
        );
        if (readRes.ok) {
          const fd = await readRes.json() as { content?: string };
          if (fd.content) current = JSON.parse(Buffer.from(fd.content, 'base64').toString('utf8'));
        }
      } catch { /* 存在しない場合は空から開始 */ }

      const prevCssInfo = current['css_info'] as {
        css_variables?: Record<string, string>;
        hex_colors?: string;
        fonts?: string[];
        button_styles?: StyleBlock[];
        card_styles?: StyleBlock[];
        border_radii?: string[];
        logo_urls?: string[];
        source_css_urls?: string[];
      } | undefined;

      if (prevCssInfo) {
        // 同一ワークフロー実行内の既存分（他URL処理済み）とマージ。新しい値が同キーを上書き。
        allCssVars = { ...prevCssInfo.css_variables, ...allCssVars };
        allHexFreq = mergeHexFreq(parseHexFreqString(prevCssInfo.hex_colors), allHexFreq);
        allButtonStyles = Array.from(new Map([...(prevCssInfo.button_styles ?? []), ...allButtonStyles].map(b => [b.selector, b])).values()).slice(0, 20);
        allCardStyles   = Array.from(new Map([...(prevCssInfo.card_styles ?? []), ...allCardStyles].map(c => [c.selector, c])).values()).slice(0, 20);
        fonts = Array.from(new Set([...(prevCssInfo.fonts ?? []), ...fonts]));
        borderRadii = Array.from(new Set([...(prevCssInfo.border_radii ?? []), ...borderRadii])).slice(0, 20);
        logoUrls = dedupe([...(prevCssInfo.logo_urls ?? []), ...logoUrls]);
        sourceCssUrls = dedupe([...(prevCssInfo.source_css_urls ?? []), ...sourceCssUrls]);
      }

      // HEX をソートして文字列化（LLM 入力用、マージ後のデータから生成）
      const hexColorsStr = hexFreqToString(allHexFreq);
      const rgbColors = Object.values(allCssVars).filter(v => /rgba?\(/.test(v)).slice(0, 10);
      const summary = buildSummary(
        allCssVars, allHexFreq, fonts,
        allButtonStyles, allCardStyles,
        borderRadii, logoUrls, sourceCssUrls,
      );

      current['css_info'] = {
        css_variables: allCssVars,
        hex_colors: hexColorsStr,
        rgb_colors: rgbColors,
        fonts,
        button_styles: allButtonStyles,
        card_styles: allCardStyles,
        border_radii: borderRadii,
        logo_urls: logoUrls,
        source_css_urls: sourceCssUrls,
        extracted_at: new Date().toISOString(),
        source_urls: urls.slice(0, 10),
      };
      current['css_summary'] = summary;

      const result = await batchGitCommit(
        [{ path: filePath, content: JSON.stringify(current, null, 2) }],
        `feat(${client_slug}): update CSS extraction info`,
        githubToken,
      );
      saved = result.ok;
      if (!result.ok) saveError = result.error;

      try {
        const logoResult = await saveLogo(client_slug, logoUrls, githubToken, dedupe(allInfoboxImgs));
        logoSaved = logoResult.saved;
        logoPath = logoResult.path;
        logoSaveError = logoResult.error;
      } catch (e) {
        logoSaveError = String(e).slice(0, 200);
      }
    }
  }

  // レスポンス用（client_slug 指定時は既存分とマージ済みのデータ、未指定時はこの呼び出し単体のデータ）
  const hexColorsStr = hexFreqToString(allHexFreq);
  const rgbColors = Object.values(allCssVars).filter(v => /rgba?\(/.test(v)).slice(0, 10);
  const summary = buildSummary(
    allCssVars, allHexFreq, fonts,
    allButtonStyles, allCardStyles,
    borderRadii, logoUrls, sourceCssUrls,
  );

  return Response.json({
    ok: true,
    css_variables: allCssVars,
    hex_colors: hexColorsStr,         // 頻度付き HEX 一覧（LLM 入力用文字列）
    rgb_colors: rgbColors.join('\n'), // RGB 値一覧
    fonts,
    button_styles: allButtonStyles,
    card_styles: allCardStyles,
    border_radii: borderRadii,
    logo_urls: logoUrls,
    source_css_urls: sourceCssUrls,
    ...(allInfoboxImgs.length > 0 ? { infobox_images: dedupe(allInfoboxImgs) } : {}),
    summary,
    ...(errors.length > 0 ? { errors } : {}),
    ...(client_slug ? { saved, ...(saveError ? { save_error: saveError } : {}) } : {}),
    ...(client_slug ? {
      logo_saved: logoSaved,
      ...(logoPath ? { logo_path: logoPath } : {}),
      ...(logoSaveError ? { logo_save_error: logoSaveError } : {}),
    } : {}),
  });
}
