import { NextRequest } from 'next/server';
import {
  refreshAndCommitClientFiles,
  buildResourcesPage,
  readAndFixDifyFiles,
  removeFromExcludedDirs,
  waitForVercelDeploy,
  DesignColors,
} from '../_lib/portal-helpers';

export const maxDuration = 300;

// ---------- URL parsing ----------

interface ParsedUrl { url: string; categories: string[] }

function parseSelectedUrls(raw: string): ParsedUrl[] {
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      // Format A: "https://example.com||カラー,フォント"
      const pipeIdx = line.indexOf('||');
      if (pipeIdx >= 0) {
        return {
          url: line.slice(0, pipeIdx).trim(),
          categories: line.slice(pipeIdx + 2).split(',').map(c => c.trim()).filter(Boolean),
        };
      }
      // Format B (legacy): "https://example.com [カラー,フォント]"
      const bracketMatch = line.match(/^(.+?)\s*\[([^\]]*)\]$/);
      if (bracketMatch) {
        return {
          url: bracketMatch[1].trim(),
          categories: bracketMatch[2].split(',').map(c => c.trim()).filter(Boolean),
        };
      }
      return { url: line, categories: [] };
    })
    .filter(item => item.url.startsWith('http'));
}

// ---------- Hex color parsing ----------

interface HexEntry { hex: string; count: number; usages: string[] }

function parseHexColorsString(raw: string): HexEntry[] {
  if (!raw) return [];
  const results: HexEntry[] = [];

  // Format A (current extract-css output):
  //   "#004A99 | color, background-color | 出現12回 | [external-css]"
  const rePipe = /(#[0-9A-Fa-f]{6,8})\s*\|([^|]*)\|\s*出現(\d+)回/g;
  let m: RegExpExecArray | null;
  while ((m = rePipe.exec(raw)) !== null) {
    const usages = m[2].split(',').map((u: string) => u.trim()).filter(Boolean);
    results.push({ hex: m[1].toUpperCase(), count: parseInt(m[3], 10), usages });
  }
  if (results.length > 0) return results;

  // Format B (legacy): "#AABB00(12,...)"
  const reParen = /(#[0-9A-Fa-f]{6,8})\((\d+)[,)]/g;
  while ((m = reParen.exec(raw)) !== null) {
    results.push({ hex: m[1].toUpperCase(), count: parseInt(m[2], 10), usages: [] });
  }
  return results;
}

/**
 * Compute visual weight for a hex entry based on which CSS properties use it.
 * Background fills dominate visual impression; text/link colors are minor.
 *
 * Multipliers:
 *   background / background-color  ×5  (large filled areas)
 *   fill                           ×4  (SVG logos/icons)
 *   CSS variable (--xxx)           ×3  (brand design tokens)
 *   border / outline               ×1  (thin lines)
 *   color (text only)              ×0.3 (small text)
 */
function visualWeight(entry: HexEntry): number {
  if (entry.usages.length === 0) return entry.count;
  let weightedTotal = 0;
  let rawTotal = 0;
  for (const usage of entry.usages) {
    const u = usage.toLowerCase();
    let mult = 1;
    if (/^background(?:-color)?$/.test(u)) mult = 5;
    else if (/^fill$/.test(u))             mult = 4;
    else if (u.startsWith('--'))           mult = 3;
    else if (/border|outline/.test(u))     mult = 1;
    else if (/^color$/.test(u))            mult = 0.3;
    weightedTotal += mult;
    rawTotal++;
  }
  const avgMult = weightedTotal / rawTotal;
  return entry.count * avgMult;
}

function buildDesignColorsFromEntries(entries: HexEntry[]): DesignColors {
  // Filter near-black (#000-ish) and near-white (#FFF-ish) using luminance
  const meaningful = entries.filter(e => {
    if (e.hex.length < 7) return false;
    const r = parseInt(e.hex.slice(1, 3), 16);
    const g = parseInt(e.hex.slice(3, 5), 16);
    const b = parseInt(e.hex.slice(5, 7), 16);
    const lum = (r * 299 + g * 587 + b * 114) / 1000;
    return lum > 25 && lum < 235;
  });

  if (meaningful.length === 0) {
    return {
      primary:   '#004A99',
      secondary: '#333333',
      accent:    '#F5A623',
      text:      '#111827',
      bg:        '#FFFFFF',
      brandColors: [{ hex: '#004A99', ratio: 100 }],
    };
  }

  const top5 = meaningful.slice(0, 5);
  const primary   = top5[0].hex;
  const secondary = top5[1]?.hex ?? '#333333';
  const accent    = top5[2]?.hex ?? primary;

  const total = top5.reduce((s, e) => s + e.count, 0);
  let brandColors = top5.map(e => ({
    hex: e.hex,
    ratio: total > 0 ? Math.round(e.count * 100 / total) : Math.floor(100 / top5.length),
  }));

  // Normalise to exactly 100 %
  const ratioSum = brandColors.reduce((s, c) => s + c.ratio, 0);
  if (ratioSum !== 100 && brandColors.length > 0) {
    brandColors[0].ratio += 100 - ratioSum;
  }

  return { primary, secondary, accent, text: '#111827', bg: '#FFFFFF', brandColors };
}

// ---------- Main handler ----------

export async function POST(req: NextRequest) {
  const { company_name, client_slug, selected_urls } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const debugLog: string[] = [];
      const log = (msg: string) => {
        const line = `${new Date().toISOString()}  ${msg}`;
        debugLog.push(line);
        console.log('[generate-portal]', msg);
      };

      try {
        const githubToken    = process.env.GITHUB_TOKEN ?? '';
        const vercelToken    = process.env.VERCEL_TOKEN ?? '';
        const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';
        // Set APP_BASE_URL=https://milize-design-flow.vercel.app in Vercel env vars
        const appBaseUrl = process.env.APP_BASE_URL
          ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

        log(`START company="${company_name}" slug="${client_slug}" appBase="${appBaseUrl}"`);
        send({ progress: 5, status: 'URLを解析中...' });

        // 1. Parse selected_urls
        const urlsStr = Array.isArray(selected_urls)
          ? (selected_urls as string[]).join('\n')
          : String(selected_urls ?? '');
        const parsedUrls = parseSelectedUrls(urlsStr);
        log(`Parsed ${parsedUrls.length} URLs`);

        // 2. Determine which URLs to use for color extraction
        //    Prefer URLs with "カラー" category; fall back to all non-Wikipedia URLs
        const colorUrls = parsedUrls.filter(u =>
          u.categories.some(c => /カラー|color/i.test(c))
        );
        const extractUrls = colorUrls.length > 0
          ? colorUrls
          : parsedUrls.filter(u => !u.url.includes('wikipedia.org')).slice(0, 5);

        log(`Color extraction URLs: ${extractUrls.length}`);

        // 3. Call extract-css for each URL and aggregate hex color entries
        const hexMap = new Map<string, HexEntry>();
        const allBorderRadii: string[] = [];
        const resourcesData: Record<string, unknown> = { selected_urls: urlsStr };

        send({ progress: 10, status: `${extractUrls.length}件のURLからデザイントークンを収集中...` });

        for (let i = 0; i < extractUrls.length; i++) {
          const { url, categories } = extractUrls[i];
          const pct = 10 + Math.round((i / extractUrls.length) * 30);
          let hostname = url;
          try { hostname = new URL(url).hostname; } catch { /* ignore */ }

          send({ progress: pct, status: `CSSを解析中: ${hostname}` });
          log(`extract-css: ${url} categories=${JSON.stringify(categories)}`);

          try {
            const cssRes = await fetch(`${appBaseUrl}/api/extract-css`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url, categories }),
              signal: AbortSignal.timeout(45_000),
            });

            if (!cssRes.ok) {
              log(`extract-css ${cssRes.status} for ${url}`);
              continue;
            }

            const cssData = await cssRes.json() as {
              hex_colors?: string;
              border_radii?: string[];
              [key: string]: unknown;
            };

            const preview = (cssData.hex_colors ?? '').slice(0, 120);
            log(`hex_colors[${hostname}]: "${preview}"`);

            // Aggregate hex frequencies
            const entries = parseHexColorsString(cssData.hex_colors ?? '');
            for (const e of entries) {
              const existing = hexMap.get(e.hex);
              if (!existing) {
                hexMap.set(e.hex, { hex: e.hex, count: e.count, usages: [...e.usages] });
              } else {
                existing.count += e.count;
                for (const u of e.usages) {
                  if (!existing.usages.includes(u) && existing.usages.length < 8) existing.usages.push(u);
                }
              }
            }

            // Collect border radii
            if (Array.isArray(cssData.border_radii)) {
              allBorderRadii.push(...(cssData.border_radii as string[]));
            }

            // Keep for resources.json
            resourcesData[`css_${hostname}`] = {
              hex_colors: cssData.hex_colors,
              border_radii: cssData.border_radii,
              css_files: cssData.css_files,
            };
          } catch (e) {
            log(`extract-css error for ${url}: ${e}`);
          }
        }

        // 4. Build DesignColors from aggregated data
        send({ progress: 42, status: 'デザイントークンを構築中...' });

        const aggregatedEntries: HexEntry[] = [...hexMap.entries()]
          .map(([, e]) => e)
          .sort((a, b) => visualWeight(b) - visualWeight(a));

        log(`Aggregated ${aggregatedEntries.length} unique hex colors`);

        const designColors = buildDesignColorsFromEntries(aggregatedEntries);
        log(`primary=${designColors.primary} brandColors=[${designColors.brandColors.map(c => c.hex).join(',')}]`);

        resourcesData['design_tokens'] = {
          primary:     designColors.primary,
          secondary:   designColors.secondary,
          accent:      designColors.accent,
          brandColors: designColors.brandColors,
          topColors:   aggregatedEntries.slice(0, 10).map(e => `${e.hex}(${e.count})`).join(' '),
          borderRadii: [...new Set(allBorderRadii)].slice(0, 5),
        };

        send({ progress: 45, status: 'ポータルファイルを生成中...' });

        // 5. Build portal files from template + real design tokens
        const difyFiles = await readAndFixDifyFiles(client_slug, company_name, githubToken, designColors);
        log(`readAndFixDifyFiles: ${difyFiles.length} files`);

        const filesToCommit: Array<{ path: string; content: string }> = [
          ...difyFiles,
          {
            path: `src/app/${client_slug}/layout.tsx`,
            content: [
              `import './globals.css';`,
              `import type { ReactNode } from 'react';`,
              `export default function Layout({ children }: { children: ReactNode }) {`,
              `  return <div className="${client_slug}-portal">{children}</div>;`,
              `}`,
              '',
            ].join('\n'),
          },
          {
            path: `src/app/${client_slug}/resources.json`,
            content: JSON.stringify(resourcesData, null, 2),
          },
          {
            path: `src/app/${client_slug}/resources/page.tsx`,
            content: buildResourcesPage(client_slug, company_name),
          },
          {
            path: `src/app/${client_slug}/_debug.txt`,
            content: debugLog.join('\n') + '\n',
          },
        ];

        send({ progress: 52, status: `${filesToCommit.length}ファイルをGitHubにコミット中...` });
        const commitStart = Date.now();

        // 6. Commit to GitHub (with retry)
        let committed = false;
        let lastError  = '';
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
          const result = await refreshAndCommitClientFiles(
            client_slug,
            filesToCommit,
            `feat: generate portal for ${client_slug} [primary=${designColors.primary}]`,
            githubToken,
          );
          if (result.ok) {
            committed = true;
            send({
              progress: 65,
              status: `コミット完了（旧${result.deletedCount ?? 0}件削除、新${filesToCommit.length}件追加）`,
            });
            break;
          }
          lastError = result.error ?? 'unknown';
          log(`commit attempt ${attempt + 1} failed: ${lastError}`);
          send({ progress: 60 + attempt, status: `コミット再試行 (${attempt + 1}/3)...` });
        }

        if (!committed) {
          send({ error: `コミット失敗: ${lastError}` });
          return;
        }

        await removeFromExcludedDirs(client_slug, githubToken);
        send({ progress: 68, status: 'GitHubコミット完了。Vercelデプロイ起動待ち...' });

        // 7. Wait for Vercel deploy
        if (vercelToken && vercelProjectId) {
          await waitForVercelDeploy(commitStart, vercelToken, vercelProjectId, send);
        } else {
          send({ progress: 65, status: 'GitHubコミット完了（Vercelトークン未設定）。', dify_done: true });
        }
      } catch (err) {
        log(`ERROR: ${err}`);
        send({ error: String(err) });
      } finally {
        // Always append final debug to the file being committed (best-effort)
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
