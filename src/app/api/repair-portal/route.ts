import { NextRequest } from 'next/server';
import {
  readAndFixDifyFiles,
  refreshAndCommitClientFiles,
  removeFromExcludedDirs,
  waitForVercelDeploy,
  DesignColors,
  BrandColor,
} from '../_lib/portal-helpers';

// ──────────────────────────────────────────
// カラー抽出・DesignColors 構築ユーティリティ
// ──────────────────────────────────────────

interface HexEntry {
  hex: string;
  count: number;
  usages: string[];
}

/** CSS プロパティに応じた視覚的重みを返す（ver2 generate-portal と同じロジック） */
function visualWeight(entry: HexEntry): number {
  if (entry.usages.length === 0) return entry.count;
  let weightedTotal = 0;
  let rawTotal = 0;
  for (const usage of entry.usages) {
    const u = usage.toLowerCase().trim();
    let mult = 1;
    if (/^background(?:-color)?$/.test(u)) mult = 5;
    else if (/^fill$/.test(u))             mult = 4;
    else if (u.startsWith('--'))           mult = 3;
    else if (/border|outline/.test(u))     mult = 1;
    else if (/^color$/.test(u))            mult = 0.3;
    weightedTotal += mult;
    rawTotal++;
  }
  return entry.count * (weightedTotal / rawTotal);
}

/** hex_colors 文字列（extract-css 出力）をパースして HexEntry 配列を返す */
function parseHexColorsString(str: string): HexEntry[] {
  const re = /(#[0-9A-Fa-f]{6,8})\s*\|([^|]*)\|\s*出現(\d+)回/g;
  const entries: HexEntry[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(str)) !== null) {
    entries.push({
      hex: m[1].toUpperCase(),
      usages: m[2].split(',').map(s => s.trim()).filter(Boolean),
      count: parseInt(m[3]),
    });
  }
  return entries;
}

/** 無彩色・白・黒系をスキップするフィルタ */
function isChromatic(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const s = max === 0 ? 0 : (max - min) / max; // HSV saturation
  const v = max / 255;
  // 彩度 < 8% (無彩色) OR 明度 > 97% (白) OR 明度 < 5% (黒) は除外
  return s >= 0.08 && v <= 0.97 && v >= 0.05;
}

/** HexEntry 配列から DesignColors を構築する */
function buildDesignColors(
  hexEntries: HexEntry[],
  cssVars: Record<string, string>,
): DesignColors {
  // CSS 変数からも HexEntry を補完
  const varEntries: HexEntry[] = Object.entries(cssVars)
    .filter(([, v]) => /^#[0-9a-fA-F]{3,8}$/.test(v.trim()))
    .map(([k, v]) => ({
      hex: v.trim().toUpperCase(),
      usages: [k],  // CSS variable name as usage
      count: 3,
    }));

  // マージ（同 hex は usages を合算）
  const merged = new Map<string, HexEntry>();
  for (const e of [...hexEntries, ...varEntries]) {
    const key = e.hex.toUpperCase();
    const existing = merged.get(key);
    if (existing) {
      existing.count = Math.max(existing.count, e.count);
      existing.usages = [...new Set([...existing.usages, ...e.usages])];
    } else {
      merged.set(key, { ...e });
    }
  }

  // 視覚的重みでソート
  const sorted = Array.from(merged.values())
    .sort((a, b) => visualWeight(b) - visualWeight(a));

  // ブランドカラー：上位5色（白黒無彩色を優先除外）
  const chromatic = sorted.filter(e => isChromatic(e.hex));
  const topColors = (chromatic.length >= 2 ? chromatic : sorted).slice(0, 5);

  // 均等配分（比率が0の場合）
  const evenRatios: Record<number, number[]> = {
    1: [100], 2: [65, 35], 3: [60, 25, 15], 4: [55, 25, 12, 8], 5: [50, 22, 13, 9, 6],
  };
  const brandColors: BrandColor[] = topColors.map((c, i) => ({
    hex: c.hex,
    ratio: (evenRatios[topColors.length] ?? [50, 22, 13, 9, 6])[i] ?? 6,
  }));

  const primary   = brandColors[0]?.hex ?? '#004A99';
  const secondary = brandColors[1]?.hex ?? '#333333';
  const accent    = brandColors[2]?.hex ?? primary;

  // テキスト色：最も視覚重みが高い暗色
  const textCandidate = sorted.find(e => {
    const r = parseInt(e.hex.slice(1, 3), 16);
    const g = parseInt(e.hex.slice(3, 5), 16);
    const b = parseInt(e.hex.slice(5, 7), 16);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum < 100;
  });
  const text = textCandidate?.hex ?? '#111827';

  // 背景色：最も視覚重みが高い明色
  const bgCandidate = sorted.find(e => {
    const r = parseInt(e.hex.slice(1, 3), 16);
    const g = parseInt(e.hex.slice(3, 5), 16);
    const b = parseInt(e.hex.slice(5, 7), 16);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 200;
  });
  const bg = bgCandidate?.hex ?? '#FFFFFF';

  return { primary, secondary, accent, text, bg, brandColors };
}

// ──────────────────────────────────────────
// SSE ヘルパー
// ──────────────────────────────────────────
function makeStream() {
  const encoder = new TextEncoder();
  let controller: ReadableStreamDefaultController;
  const stream = new ReadableStream({
    start(c) { controller = c; },
  });
  const send = (data: object) => {
    try { controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`)); } catch { /* closed */ }
  };
  const close = () => {
    try { controller.close(); } catch { /* already closed */ }
  };
  return { stream, send, close };
}

// ──────────────────────────────────────────
// POST /api/repair-portal
// ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const company_name = (body.company_name as string | undefined)?.trim();
  const client_slug  = (body.client_slug  as string | undefined)?.trim();
  const primary_url  = (body.primary_url  as string | undefined)?.trim();

  if (!company_name || !client_slug || !primary_url) {
    return Response.json(
      { error: 'company_name, client_slug, primary_url are required' },
      { status: 400 },
    );
  }

  const githubToken  = process.env.GITHUB_TOKEN ?? '';
  const vercelToken  = process.env.VERCEL_TOKEN ?? '';
  const vercelProjId = process.env.VERCEL_PROJECT_ID ?? '';
  const appBaseUrl   = process.env.APP_BASE_URL ?? 'https://milize-design-flow.vercel.app';

  if (!githubToken) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const { stream, send, close } = makeStream();

  (async () => {
    try {
      // ── Step 1: CSS 抽出 ──────────────────────────
      send({ progress: 5, status: 'CSSを解析中...' });

      const extractRes = await fetch(`${appBaseUrl}/api/extract-css`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [primary_url], client_slug }),
        signal: AbortSignal.timeout(60000),
      });

      if (!extractRes.ok) {
        send({ error: `CSS抽出API失敗: ${extractRes.status}` });
        close();
        return;
      }

      const extractData = await extractRes.json() as {
        hex_colors?: string;
        css_variables?: Record<string, string>;
        fonts?: string[];
        border_radii?: string[];
        source_css_urls?: string[];
        css_summary?: string;
      };

      send({ progress: 25, status: 'カラーを解析中...' });

      // ── Step 2: DesignColors 構築 ─────────────────
      const hexEntries = parseHexColorsString(extractData.hex_colors ?? '');
      const cssVars    = extractData.css_variables ?? {};
      const designColors = buildDesignColors(hexEntries, cssVars);

      send({
        progress: 35,
        status: `プライマリカラー: ${designColors.primary}、${designColors.brandColors.length}色抽出`,
      });

      // ── Step 3: テンプレートからポータルページを生成 ──
      send({ progress: 40, status: 'ポータルページを生成中...' });

      const portalFiles = await readAndFixDifyFiles(
        client_slug,
        company_name,
        githubToken,
        designColors,
      );

      if (portalFiles.length === 0) {
        send({ error: 'テンプレートファイルの読み込みに失敗しました' });
        close();
        return;
      }

      // ── Step 4: resources.json を構築 ─────────────
      const resourcesJson = JSON.stringify(
        {
          selected_urls: primary_url,
          css_info: {
            hex_colors: extractData.hex_colors ?? '',
            css_variables: cssVars,
            fonts: extractData.fonts ?? [],
            border_radii: extractData.border_radii ?? [],
            source_css_urls: extractData.source_css_urls ?? [],
            extracted_at: new Date().toISOString(),
            source_urls: [primary_url],
          },
          css_summary: extractData.css_summary ?? '',
          repair_generated: true,
          generated_at: new Date().toISOString(),
        },
        null,
        2,
      );

      const allFiles = [
        ...portalFiles,
        { path: `src/app/${client_slug}/resources.json`, content: resourcesJson },
      ];

      send({ progress: 50, status: `${allFiles.length}ファイルをコミット中...` });

      // ── Step 5: GitHub にコミット ──────────────────
      const commitStart = Date.now();
      const commitResult = await refreshAndCommitClientFiles(
        client_slug,
        allFiles,
        `feat(${client_slug}): auto-repair portal — generate complete pages from template\n\nCompany: ${company_name}\nSource URL: ${primary_url}\nPrimary color: ${designColors.primary}\nBrand colors: ${designColors.brandColors.map(c => c.hex).join(', ')}`,
        githubToken,
      );

      if (!commitResult.ok) {
        send({ error: `コミット失敗: ${commitResult.error}` });
        close();
        return;
      }

      send({ progress: 55, status: 'コミット完了。一覧ページを更新中...' });

      // ── Step 6: EXCLUDED_DIRS から除外 ─────────────
      await removeFromExcludedDirs(client_slug, githubToken);

      send({ progress: 60, status: 'Vercelデプロイ待機中...' });

      // ── Step 7: Vercel デプロイ待機 ───────────────
      if (vercelToken && vercelProjId) {
        await waitForVercelDeploy(commitStart, vercelToken, vercelProjId, send, 36);
      } else {
        send({ progress: 100, status: 'コミット完了（Vercel設定なし）', deploy_done: true });
      }

    } catch (e) {
      send({ error: String(e) });
    } finally {
      close();
    }
  })();

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
