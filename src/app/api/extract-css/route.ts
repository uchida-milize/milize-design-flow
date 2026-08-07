import { NextRequest } from 'next/server';
import { batchGitCommit } from '../_lib/portal-helpers';

/**
 * POST /api/extract-css
 *
 * Dify ワークフローの HTTP Request ノードから呼び出される。
 * 指定 URL の HTML から外部 CSS ファイルを発見し、
 * CSS 変数カラー・フォント・ボタン/カードスタイル・ロゴ画像を抽出して返す。
 *
 * リクエスト:
 *   urls        — 解析対象 URL の配列（必須）
 *   client_slug — resources.json に保存する場合のクライアント識別子（任意）
 *
 * レスポンス:
 *   css_variables   — CSS カスタムプロパティ（カラー系）
 *   fonts           — font-family 値一覧
 *   button_styles   — ボタン系セレクタのスタイル抜粋
 *   card_styles     — カード系セレクタのスタイル抜粋
 *   logo_urls       — OGP・favicon・logo 関連 URL
 *   source_css_urls — 取得した CSS ファイル URL 一覧
 *   summary         — 収集概要テキスト（resources ページのタブ表示用）
 */

// ──────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────
interface CssInfo {
  css_variables: Record<string, string>;
  fonts: string[];
  button_styles: StyleBlock[];
  card_styles: StyleBlock[];
  logo_urls: string[];
  source_css_urls: string[];
}

interface StyleBlock {
  selector: string;
  properties: Record<string, string>;
}

// ──────────────────────────────────────────
// HTML パーサー: stylesheet リンク・OGP・favicon を取得
// ──────────────────────────────────────────
function parseHtmlMeta(html: string, baseUrl: string): {
  cssLinks: string[];
  ogImage: string | null;
  favicon: string | null;
  logoImgs: string[];
} {
  const cssLinks: string[] = [];
  const logoImgs: string[] = [];

  // <link rel="stylesheet" href="...">
  const linkRe = /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  // href が先に来るパターンも対応
  const linkRe2 = /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*>/gi;
  for (const re of [linkRe, linkRe2]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      cssLinks.push(toAbsolute(m[1], baseUrl));
    }
  }

  // OGP
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

  return { cssLinks: dedupe(cssLinks), ogImage, favicon, logoImgs: dedupe(logoImgs) };
}

// ──────────────────────────────────────────
// CSS パーサー
// ──────────────────────────────────────────
function parseCss(css: string): CssInfo {
  const css_variables: Record<string, string> = {};
  const fontsSet = new Set<string>();
  const button_styles: StyleBlock[] = [];
  const card_styles: StyleBlock[] = [];

  // :root { ... } ブロックを抽出
  const rootRe = /:root\s*\{([^}]+)\}/g;
  let rootMatch: RegExpExecArray | null;
  while ((rootMatch = rootRe.exec(css)) !== null) {
    const block = rootMatch[1];
    const varRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let vm: RegExpExecArray | null;
    while ((vm = varRe.exec(block)) !== null) {
      const name = vm[1].trim();
      const val = vm[2].trim();
      // カラー値・フォント変数を収録
      if (isColorValue(val) || /color|primary|secondary|accent|bg|background|text|brand/i.test(name)) {
        css_variables[name] = val;
      } else if (/font/i.test(name)) {
        css_variables[name] = val;
      }
    }
  }

  // font-family プロパティを全体から抽出
  const fontRe = /font-family\s*:\s*([^;}{]+);/g;
  let fm: RegExpExecArray | null;
  while ((fm = fontRe.exec(css)) !== null) {
    const val = fm[1].trim();
    // 短縮フォント名のみ取得（最初のファミリー）
    const first = val.split(',')[0].replace(/['"]/g, '').trim();
    if (first.length > 0 && first.length < 80) {
      fontsSet.add(first);
    }
  }

  // セレクタブロックのパーサー（ネストなし簡易版）
  const blockRe = /([^{}\n][^{}]*?)\{([^{}]+)\}/g;
  let bm: RegExpExecArray | null;
  while ((bm = blockRe.exec(css)) !== null) {
    const selector = bm[1].trim();
    const body = bm[2].trim();

    // ボタン系セレクタ
    if (/btn|button|\.cta|\.primary-btn/i.test(selector) && !selector.startsWith('@')) {
      const props = parseDeclarations(body);
      if (Object.keys(props).length > 0) {
        button_styles.push({ selector, properties: props });
      }
    }

    // カード系セレクタ
    if (/card|\.box|\.panel|\.tile|\.widget/i.test(selector) && !selector.startsWith('@')) {
      const props = parseDeclarations(body);
      if (Object.keys(props).length > 0) {
        card_styles.push({ selector, properties: props });
      }
    }
  }

  return {
    css_variables,
    fonts: Array.from(fontsSet),
    button_styles: button_styles.slice(0, 20),
    card_styles: card_styles.slice(0, 20),
    logo_urls: [],
    source_css_urls: [],
  };
}

// ──────────────────────────────────────────
// ユーティリティ
// ──────────────────────────────────────────
function parseDeclarations(body: string): Record<string, string> {
  const result: Record<string, string> = {};
  const re = /([\w-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const prop = m[1].trim();
    const val = m[2].trim();
    // カラー・フォント・角丸・シャドウ・余白系プロパティのみ
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
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function mergeInfo(a: CssInfo, b: CssInfo): CssInfo {
  return {
    css_variables: { ...a.css_variables, ...b.css_variables },
    fonts: dedupe([...a.fonts, ...b.fonts]),
    button_styles: [...a.button_styles, ...b.button_styles],
    card_styles: [...a.card_styles, ...b.card_styles],
    logo_urls: dedupe([...a.logo_urls, ...b.logo_urls]),
    source_css_urls: dedupe([...a.source_css_urls, ...b.source_css_urls]),
  };
}

function buildSummary(info: CssInfo): string {
  const lines: string[] = [];

  const colorVars = Object.entries(info.css_variables).filter(([, v]) => isColorValue(v));
  if (colorVars.length > 0) {
    lines.push('【CSS カラー変数】');
    colorVars.forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    lines.push('');
  }

  const fontVars = Object.entries(info.css_variables).filter(([k]) => /font/i.test(k));
  if (fontVars.length > 0) {
    lines.push('【フォント変数】');
    fontVars.forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    lines.push('');
  }

  if (info.fonts.length > 0) {
    lines.push('【使用フォント】');
    info.fonts.forEach(f => lines.push(`  ${f}`));
    lines.push('');
  }

  if (info.button_styles.length > 0) {
    lines.push('【ボタンスタイル】');
    info.button_styles.slice(0, 5).forEach(b => {
      lines.push(`  ${b.selector}`);
      Object.entries(b.properties).slice(0, 5).forEach(([k, v]) => lines.push(`    ${k}: ${v}`));
    });
    lines.push('');
  }

  if (info.card_styles.length > 0) {
    lines.push('【カードスタイル】');
    info.card_styles.slice(0, 5).forEach(c => {
      lines.push(`  ${c.selector}`);
      Object.entries(c.properties).slice(0, 5).forEach(([k, v]) => lines.push(`    ${k}: ${v}`));
    });
    lines.push('');
  }

  if (info.logo_urls.length > 0) {
    lines.push('【ロゴ・ビジュアル素材】');
    info.logo_urls.slice(0, 10).forEach(u => lines.push(`  ${u}`));
    lines.push('');
  }

  if (info.source_css_urls.length > 0) {
    lines.push('【取得CSSファイル】');
    info.source_css_urls.forEach(u => lines.push(`  ${u}`));
  }

  return lines.join('\n') || '（データなし）';
}

// ──────────────────────────────────────────
// メインハンドラー
// ──────────────────────────────────────────
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

  // urls: 配列 or 改行区切り文字列 or 単一文字列
  let urls: string[] = [];
  const rawUrls = body.urls ?? body.url;
  if (Array.isArray(rawUrls)) {
    urls = rawUrls.map(String).filter(Boolean);
  } else if (typeof rawUrls === 'string') {
    urls = rawUrls.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  }

  if (urls.length === 0) {
    return Response.json({ error: 'urls is required (array or newline-separated string)' }, { status: 400 });
  }

  const client_slug = body.client_slug as string | undefined;

  // 各 URL を処理
  let aggregated: CssInfo = {
    css_variables: {},
    fonts: [],
    button_styles: [],
    card_styles: [],
    logo_urls: [],
    source_css_urls: [],
  };

  const errors: string[] = [];

  for (const pageUrl of urls.slice(0, 10)) { // 最大 10 URL
    try {
      // HTML 取得
      const htmlRes = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MilizeBot/1.0)' },
        signal: AbortSignal.timeout(10000),
      });
      if (!htmlRes.ok) {
        errors.push(`${pageUrl}: HTTP ${htmlRes.status}`);
        continue;
      }
      const html = await htmlRes.text();
      const { cssLinks, ogImage, favicon, logoImgs } = parseHtmlMeta(html, pageUrl);

      // OGP・favicon・ロゴをまとめる
      const pageLogos: string[] = [ogImage, favicon, ...logoImgs].filter((u): u is string => !!u);

      // CSS ファイルを最大 3 本取得・パース
      const cssResults: CssInfo[] = [];
      for (const cssUrl of cssLinks.slice(0, 3)) {
        try {
          const cssRes = await fetch(cssUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MilizeBot/1.0)' },
            signal: AbortSignal.timeout(8000),
          });
          if (!cssRes.ok) continue;

          // CSS サイズ制限 512KB
          const buf = await cssRes.arrayBuffer();
          if (buf.byteLength > 512 * 1024) continue;
          const cssText = new TextDecoder().decode(buf);

          const info = parseCss(cssText);
          info.source_css_urls = [cssUrl];
          cssResults.push(info);
        } catch {
          // 個別 CSS 取得失敗は無視して継続
        }
      }

      // このページ分をまとめる
      let pageInfo: CssInfo = {
        css_variables: {},
        fonts: [],
        button_styles: [],
        card_styles: [],
        logo_urls: pageLogos,
        source_css_urls: cssLinks.slice(0, 3),
      };
      for (const r of cssResults) {
        pageInfo = mergeInfo(pageInfo, r);
      }

      aggregated = mergeInfo(aggregated, pageInfo);
    } catch (e) {
      errors.push(`${pageUrl}: ${String(e).slice(0, 100)}`);
    }
  }

  // ボタン・カードスタイルの重複除去（セレクタ単位）
  aggregated.button_styles = Array.from(
    new Map(aggregated.button_styles.map(b => [b.selector, b])).values()
  ).slice(0, 20);
  aggregated.card_styles = Array.from(
    new Map(aggregated.card_styles.map(c => [c.selector, c])).values()
  ).slice(0, 20);

  const summary = buildSummary(aggregated);

  // client_slug が指定されていれば resources.json に保存
  let saved = false;
  let saveError: string | undefined;
  if (client_slug) {
    const githubToken = process.env.GITHUB_TOKEN ?? '';
    if (githubToken) {
      const filePath = `src/app/${client_slug}/resources.json`;

      // 既存 resources.json を取得してマージ
      let current: Record<string, unknown> = {};
      try {
        const readRes = await fetch(
          `https://api.github.com/repos/uchida-milize/milize-design-flow/contents/${filePath}`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'extract-css',
            },
          },
        );
        if (readRes.ok) {
          const fd = await readRes.json() as { content?: string };
          if (fd.content) {
            current = JSON.parse(Buffer.from(fd.content, 'base64').toString('utf8'));
          }
        }
      } catch { /* 存在しない場合は空から開始 */ }

      current['css_info'] = {
        css_variables: aggregated.css_variables,
        fonts: aggregated.fonts,
        button_styles: aggregated.button_styles,
        card_styles: aggregated.card_styles,
        logo_urls: aggregated.logo_urls,
        source_css_urls: aggregated.source_css_urls,
        extracted_at: new Date().toISOString(),
        source_urls: urls.slice(0, 10),
      };
      current['css_summary'] = summary;

      const result = await batchGitCommit(
        [{ path: filePath, content: JSON.stringify(current, null, 2) }],
        `feat(${client_slug}): add CSS extraction info`,
        githubToken,
      );
      saved = result.ok;
      if (!result.ok) saveError = result.error;
    }
  }

  return Response.json({
    ok: true,
    css_variables: aggregated.css_variables,
    fonts: aggregated.fonts,
    button_styles: aggregated.button_styles,
    card_styles: aggregated.card_styles,
    logo_urls: aggregated.logo_urls,
    source_css_urls: aggregated.source_css_urls,
    summary,
    ...(errors.length > 0 ? { errors } : {}),
    ...(client_slug ? { saved, ...(saveError ? { save_error: saveError } : {}) } : {}),
  });
}
