import { NextRequest } from 'next/server';

export const maxDuration = 300;

const OWNER = 'uchida-milize';
const REPO  = 'milize-design-flow';
const API   = 'https://api.github.com';
const TPL_SLUG = 'sharp-finance-corp';
const TPL_NAME = 'シャープファイナンス株式会社';

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

async function getFileContent(path: string, token: string): Promise<{ content: string; sha: string } | null> {
  const h = ghHeaders(token);
  const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
  if (!r.ok) return null;
  const data: { content: string; sha: string } = await r.json();
  return {
    content: Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8'),
    sha: data.sha,
  };
}

// GitHub Trees API で複数ファイルを1コミットにまとめる
async function batchGitCommit(
  files: Array<{ path: string; content: string }>,
  message: string,
  token: string,
): Promise<{ ok: boolean; error?: string }> {
  const h = ghHeaders(token);

  try {
    // 1. HEAD SHA 取得
    const refRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/refs/heads/main`, { headers: h });
    if (!refRes.ok) return { ok: false, error: `ref fetch failed: ${refRes.status}` };
    const refData = await refRes.json();
    const headSha: string = refData.object.sha;

    // 2. 現在のツリー SHA 取得
    const commitRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/commits/${headSha}`, { headers: h });
    if (!commitRes.ok) return { ok: false, error: `commit fetch failed: ${commitRes.status}` };
    const commitData = await commitRes.json();
    const treeSha: string = commitData.tree.sha;

    // 3. 各ファイルの blob を作成（重複パスを排除）
    const uniqueFiles = Array.from(
      new Map(files.map(f => [f.path, f])).values()
    );
    const treeItems = await Promise.all(
      uniqueFiles.map(async (f) => {
        const blobRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/blobs`, {
          method: 'POST',
          headers: h,
          body: JSON.stringify({
            content: Buffer.from(f.content, 'utf-8').toString('base64'),
            encoding: 'base64',
          }),
        });
        if (!blobRes.ok) throw new Error(`blob failed for ${f.path}: ${blobRes.status}`);
        const blobData = await blobRes.json();
        return { path: f.path, mode: '100644' as const, type: 'blob' as const, sha: blobData.sha };
      }),
    );

    // 4. 新しいツリーを作成
    const treeRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/trees`, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({ base_tree: treeSha, tree: treeItems }),
    });
    if (!treeRes.ok) {
      const errBody = await treeRes.text();
      return { ok: false, error: `tree failed: ${treeRes.status} ${errBody.slice(0, 100)}` };
    }
    const treeData = await treeRes.json();

    // 5. コミットを作成
    const newCommitRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/commits`, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({ message, tree: treeData.sha, parents: [headSha] }),
    });
    if (!newCommitRes.ok) return { ok: false, error: `commit create failed: ${newCommitRes.status}` };
    const newCommitData = await newCommitRes.json();

    // 6. refs/heads/main を更新
    const updateRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
      method: 'PATCH',
      headers: h,
      body: JSON.stringify({ sha: newCommitData.sha, force: false }),
    });
    if (!updateRes.ok) {
      const errBody = await updateRes.text();
      return { ok: false, error: `ref update failed: ${updateRes.status} ${errBody.slice(0, 80)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// page.tsx から slug を EXCLUDED_DIRS から除外する（別コミット）
async function removeFromExcludedDirs(slug: string, token: string) {
  const h = ghHeaders(token);
  const path = 'src/app/page.tsx';

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));

    const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
    if (!res.ok) return;
    const data: { content: string; sha: string } = await res.json();
    const raw = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');

    if (!raw.includes(`'${slug}'`)) return;
    if (!raw.includes('colors') || !raw.includes('description')) return;

    const fixed = raw.split('\n').filter(line => !line.includes(`'${slug}'`)).join('\n');
    const putRes = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
      method: 'PUT',
      headers: h,
      body: JSON.stringify({
        message: `feat: activate client ${slug}`,
        content: Buffer.from(fixed, 'utf-8').toString('base64'),
        sha: data.sha,
        branch: 'main',
      }),
    });
    if (putRes.ok) return;
    if (putRes.status !== 409) return;
  }
}

function buildResourcesPage(slug: string, companyName: string): string {
  return `'use client';
import { useState, useEffect } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '${companyName}';
const basePath = '/${slug}';

const TOKEN_RE = /(https?:\\/\\/[^\\s"',\\]\\}\\)]+)|(#[0-9a-fA-F]{6,8}|#[0-9a-fA-F]{3}(?![0-9a-fA-F])|rgba?\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+(?:\\s*,\\s*[\\d.]+)?\\s*\\))/g;

function renderRich(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [full, url, color] = m;
    if (url) {
      parts.push(
        <a key={m.index} href={url} target="_blank" rel="noopener noreferrer"
          style={{ color: '#3b82f6', textDecoration: 'underline', wordBreak: 'break-all' }}>
          {url}
        </a>
      );
    } else if (color) {
      parts.push(
        <span key={m.index}>
          <span style={{
            display: 'inline-block', color, fontSize: 14, lineHeight: 1,
            marginRight: 3, verticalAlign: 'middle',
          }}>■</span>
          {color}
        </span>
      );
    } else {
      parts.push(full);
    }
    last = m.index + full.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function ResourcesPage() {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState('');
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(\`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/globals.css?t=\${Date.now()}\`).then(r => r.text()),
      fetch(\`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/resources.json?t=\${Date.now()}\`).then(r => r.json()),
    ]).then(([css, json]) => {
      const m = css.match(/--primary-color:\\s*(#[0-9a-fA-F]{3,8})/);
      if (m) setPrimaryColor(m[1]);
      setData(json);
      const keys = Object.keys(json);
      setTabs(keys);
      if (keys.length > 0) setActive(keys[0]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="${slug}-portal">
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="resources" primaryColor={primaryColor} />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: '0.05em', marginBottom: 8 }}>RESOURCES</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>生成リソース</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>Difyワークフローの各ノード出力を確認できます</p>
        </div>
        {loading ? (
          <div style={{ color: '#9ca3af', fontSize: 14 }}>読み込み中...</div>
        ) : tabs.length === 0 ? (
          <div style={{ color: '#9ca3af', fontSize: 14 }}>データがありません</div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActive(tab)} style={{
                  padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                  background: active === tab ? primaryColor : '#f3f4f6',
                  color: active === tab ? '#ffffff' : '#6b7280',
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                }}>{tab}</button>
              ))}
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '10px 20px' }}>
                <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{active}</span>
              </div>
              <pre style={{
                padding: 24, margin: 0, fontSize: 12, lineHeight: 1.8,
                color: '#374151', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                maxHeight: '65vh', overflowY: 'auto', fontFamily: "'Courier New', monospace",
              }}>{renderRich(data[active] ?? '（データなし）')}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
`;
}

interface BrandColor {
  hex: string;
  ratio: number; // 0 = 未指定
}

interface DesignColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  bg: string;
  brandColors: BrandColor[]; // カラーバー用（1〜3色）
}

/** 1行からhex+ratio(%)を抽出する。"なし"行はnullを返す */
function parseColorEntry(line: string): BrandColor | null {
  if (/なし|none|n\/a/i.test(line) && !/#[0-9a-fA-F]{3,8}/.test(line)) return null;
  const hexMatch = line.match(/#([0-9a-fA-F]{6})/i);
  if (!hexMatch) return null;
  const ratioMatch = line.match(/(\d{1,3})\s*%/);
  return {
    hex: '#' + hexMatch[1].toUpperCase(),
    ratio: ratioMatch ? parseInt(ratioMatch[1]) : 0,
  };
}

/** テキスト全体からhexに対応する使用比率(%)を探す */
function findRatioInText(text: string, hex: string): number {
  const pattern = new RegExp(`${hex}[^\\n]*(\\d{1,3})\\s*%`, 'i');
  const m = text.match(pattern);
  return m ? parseInt(m[1]) : 0;
}

/** nodeOutputs の Design.md ノード出力からブランドカラーを抽出する */
function parseDesignMdColors(nodeOutputs: Record<string, string>): DesignColors | null {
  const designKey = Object.keys(nodeOutputs).find(k =>
    /design/i.test(k) || /デザイン/.test(k) || /ブランド/.test(k) || /カラー/.test(k)
  );
  if (!designKey) return null;

  const text = nodeOutputs[designKey];

  const findHexOnLine = (patterns: RegExp[]): string | null => {
    for (const p of patterns) {
      const m = text.match(p);
      if (!m) continue;
      const entry = parseColorEntry(m[0]);
      if (entry) return entry.hex;
    }
    return null;
  };

  const primaryHex   = findHexOnLine([/プライマリ[^\n]*/, /primary[^\n]*/i,   /メイン[^\n]*/,   /コーポレート[^\n]*/]);
  const secondaryHex = findHexOnLine([/セカンダリ[^\n]*/, /secondary[^\n]*/i, /サブ[^\n]*/]);
  const accentHex    = findHexOnLine([/アクセント[^\n]*/, /accent[^\n]*/i,     /補色[^\n]*/]);
  const textHex      = findHexOnLine([/テキスト[^\n]*/,   /文字色[^\n]*/,      /text\s*color[^\n]*/i]);
  const bgHex        = findHexOnLine([/背景色?[^\n]*/,    /バックグラウンド[^\n]*/, /background[^\n]*/i]);

  if (!primaryHex) return null;

  // 「カラー使用比率」セクションから全色をパース（最大5色）
  const ratioSectionMatch = text.match(/カラー使用比率([\s\S]*?)(?:\n#[^#]|\n##\s|$)/);
  const allBrandColors: BrandColor[] = [];
  if (ratioSectionMatch) {
    const section = ratioSectionMatch[1];
    const lineRe = /#([0-9a-fA-F]{6})[^\n]*?(\d{1,3})\s*%/gi;
    let lm: RegExpExecArray | null;
    while ((lm = lineRe.exec(section)) !== null && allBrandColors.length < 5) {
      allBrandColors.push({ hex: '#' + lm[1].toUpperCase(), ratio: parseInt(lm[2]) });
    }
  }

  // セクションが取れなければ primary/secondary/accent から生成
  const fallbackEntries = [{ hex: primaryHex }, ...(secondaryHex ? [{ hex: secondaryHex }] : []), ...(accentHex ? [{ hex: accentHex }] : [])];
  const rawColors = allBrandColors.length > 0
    ? allBrandColors
    : fallbackEntries.map(e => ({ hex: e.hex, ratio: findRatioInText(text, e.hex) }));

  // 比率を正規化（合計100%）
  const totalRatio = rawColors.reduce((s, c) => s + c.ratio, 0);
  let brandColors: BrandColor[];
  if (totalRatio > 0) {
    brandColors = rawColors.map(c => ({ hex: c.hex, ratio: Math.round(c.ratio * 100 / totalRatio) }));
    const sum = brandColors.reduce((s, c) => s + c.ratio, 0);
    if (sum !== 100) brandColors[0].ratio += 100 - sum;
  } else {
    const evenRatios: Record<number, number[]> = { 1: [100], 2: [65, 35], 3: [60, 25, 15], 4: [55, 25, 12, 8], 5: [50, 22, 13, 9, 6] };
    const ratios = evenRatios[rawColors.length] ?? [50, 22, 13, 9, 6];
    brandColors = rawColors.map((c, i) => ({ hex: c.hex, ratio: ratios[i] ?? 6 }));
  }

  return {
    primary:   primaryHex,
    secondary: secondaryHex ?? '#333333',
    accent:    accentHex    ?? primaryHex,
    text:      textHex      ?? '#111827',
    bg:        bgHex        ?? '#FFFFFF',
    brandColors,
  };
}

// Dify生成の4ファイルを読み込み、テンプレート参照を修正してメモリ上に返す
async function readAndFixDifyFiles(
  slug: string,
  companyName: string,
  token: string,
  designColors?: DesignColors | null,
): Promise<Array<{ path: string; content: string }>> {
  const targetPaths = [
    `src/app/${slug}/globals.css`,
    `src/app/${slug}/page.tsx`,
    `src/app/${slug}/guidelines/page.tsx`,
    `src/app/${slug}/components/page.tsx`,
  ];

  const results = await Promise.all(
    targetPaths.map(async (path) => {
      const f = await getFileContent(path, token);
      if (!f) return null;
      let content = f.content;

      // テンプレート参照を修正
      if (content.includes(TPL_SLUG) || content.includes(TPL_NAME)) {
        content = content
          .split(TPL_SLUG).join(slug)
          .split(TPL_NAME).join(companyName)
          .replace('background: #0f172a;', 'background: #efefef;')
          .replace('color: #94a3b8;', 'color: #333333;');
      }

      // page.tsx: resourcesカードが無ければ注入
      if (path.endsWith(`${slug}/page.tsx`) && !content.includes('/resources')) {
        // componentsリンクの直後にresourcesカードを挿入
        const resourcesCard = `
          <a href={\`\${basePath}/resources\`} className="hi-nav-card">
            <div className="hi-card">
              <div className="hi-section-label" style={{ color: primaryColor }}>
                RESOURCES
              </div>
              <h2 className="hi-section-title" style={{ fontSize: 20 }}>
                収集リソース
              </h2>
              <p className="hi-section-desc" style={{ marginBottom: 0 }}>
                リサーチで収集したWebページのデザイン情報（カラー・フォント・CSS）を確認できます。
              </p>
            </div>
          </a>`;
        // componentsへのリンクブロックの末尾 </a> の後に挿入
        content = content.replace(
          /(<a[^>]*components[^>]*>[\s\S]*?<\/a>)(\s*\n\s*<\/div>)/,
          `$1${resourcesCard}$2`
        );
      }

      // globals.css: 標準カラー変数を注入（design.md優先、なければCSS変数から抽出）
      if (path.endsWith('globals.css')) {
        let primary: string;
        let secondary: string;
        let accent: string;
        let textColor: string;
        let bgColor: string;

        if (designColors) {
          // design.md から抽出した色を最優先で使用
          primary   = designColors.primary;
          secondary = designColors.secondary;
          accent    = designColors.accent;
          textColor = designColors.text;
          bgColor   = designColors.bg;
        } else {
          // フォールバック: CSS変数から抽出
          const extract = (patterns: string[]): string | null => {
            for (const p of patterns) {
              const m = content.match(new RegExp(p + ':\\s*(#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))'));
              if (m) return m[1];
            }
            return null;
          };
          primary   = extract(['--primary(?!-color)[\\w-]*', '--color-primary', '--main-color', '--brand-color']) ?? '#004A99';
          secondary = extract(['--secondary(?!-color)[\\w-]*', '--color-secondary', '--sub-color']) ?? '#333333';
          accent    = extract(['--accent(?!-color)[\\w-]*', '--color-accent']) ?? '#F5A623';
          textColor = extract(['--text-main', '--text-color', '--color-text', '--text-primary']) ?? '#111827';
          bgColor   = extract(['--bg(?!-color)[\\w-]*', '--background(?!-color)[\\w-]*', '--portal-bg']) ?? '#FFFFFF';
        }

        const brandLines = (designColors?.brandColors ?? [])
          .map((c, i) => `  --brand-color-${i + 1}: ${c.hex};\n  --brand-ratio-${i + 1}: ${c.ratio};`)
          .join('\n');
        const standardBlock = `\n/* 標準カラー変数（自動注入） */\n:root {\n  --primary-color: ${primary};\n  --secondary-color: ${secondary};\n  --accent-color: ${accent};\n  --text-color: ${textColor};\n  --bg-color: ${bgColor};\n${brandLines ? brandLines + '\n' : ''}}\n`;

        // 既存ブロックがあれば置換、なければ末尾に追加
        if (content.includes('--primary-color:')) {
          content = content.replace(
            /\/\*\s*標準カラー変数[^*]*\*\/\s*:root\s*\{[^}]*--primary-color:[^}]*\}/,
            standardBlock.trim(),
          );
        } else {
          content += standardBlock;
        }
      }

      return { path, content };
    }),
  );

  return results.filter((r): r is { path: string; content: string } => r !== null);
}

export async function POST(req: NextRequest) {
  const { company_name, client_slug, selected_urls } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        send({ progress: 10, status: 'Difyに接続中...' });

        const difyRes = await fetch(`${process.env.DIFY_BASE_URL}/workflows/run`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: {
              company_name,
              client_slug,
              ...(selected_urls ? { selected_urls } : {}),
            },
            response_mode: 'streaming',
            user: 'milize-admin',
          }),
        });

        if (!difyRes.ok) {
          const errText = await difyRes.text();
          send({ error: `Dify API error ${difyRes.status}: ${errText.slice(0, 200)}` });
          controller.close();
          return;
        }

        send({ progress: 20, status: 'ワークフロー実行中...' });

        const reader = difyRes.body!.getReader();
        const decoder = new TextDecoder();
        let progressVal = 20;
        const nodeOutputs: Record<string, string> = {};
        let lineBuffer = '';  // SSEチャンク分割対策

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          lineBuffer += decoder.decode(value, { stream: true });
          const lines = lineBuffer.split('\n');
          lineBuffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const data = JSON.parse(line.slice(6));

              if (data.event === 'workflow_started') {
                progressVal = 20;
                send({ progress: progressVal, status: 'ワークフロー開始...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 8, 55);
                const title = data.data?.title || '';
                send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });
              } else if (data.event === 'node_finished') {
                progressVal = Math.min(progressVal + 2, 58);
                const nodeTitle = data.data?.title || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                const outputs = data.data?.outputs;
                if (outputs && typeof outputs === 'object') {
                  const nodeText = Object.entries(outputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (nodeText.trim()) nodeOutputs[nodeTitle] = nodeText;
                }
                send({ progress: progressVal });
              } else if (data.event === 'workflow_finished') {
                const githubToken = process.env.GITHUB_TOKEN ?? '';
                const vercelToken = process.env.VERCEL_TOKEN ?? '';
                const vercelProjectId = process.env.VERCEL_PROJECT_ID ?? '';

                // workflow_finished.outputs をフォールバックとして追加
                const wfOutputs = data.data?.outputs;
                if (wfOutputs && typeof wfOutputs === 'object') {
                  const wfText = Object.entries(wfOutputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n---\n\n');
                  if (wfText.trim()) nodeOutputs['ワークフロー最終出力'] = wfText;
                }

                const nodeKeys = Object.keys(nodeOutputs);
                send({ progress: 60, status: `GitHubにコミット中... (ノード出力: ${nodeKeys.length}件)` });
                const commitStart = Date.now();

                // Dify生成ファイルを読み込み・修正
                send({ progress: 61, status: 'Dify生成ファイルを読み込み中...' });
                const designColors = parseDesignMdColors(nodeOutputs);
                const difyFiles = await readAndFixDifyFiles(client_slug, company_name, githubToken, designColors);

                // コミットするファイル一覧（重複なし）
                const filesToCommit: Array<{ path: string; content: string }> = [
                  ...difyFiles,
                  // layout.tsx（常に正しいラッパーで上書き）
                  {
                    path: `src/app/${client_slug}/layout.tsx`,
                    content: `import './globals.css';\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`,
                  },
                  // resources.json
                  {
                    path: `src/app/${client_slug}/resources.json`,
                    content: JSON.stringify(nodeOutputs, null, 2),
                  },
                  // resources/page.tsx
                  {
                    path: `src/app/${client_slug}/resources/page.tsx`,
                    content: buildResourcesPage(client_slug, company_name),
                  },
                ];

                send({ progress: 62, status: `${filesToCommit.length}ファイルをバッチコミット中...` });

                let committed = false;
                let lastError = '';
                for (let attempt = 0; attempt < 3; attempt++) {
                  if (attempt > 0) await new Promise(r => setTimeout(r, 3000 * attempt));
                  const result = await batchGitCommit(
                    filesToCommit,
                    `feat: generate portal for ${client_slug} [${nodeKeys.length} nodes]`,
                    githubToken,
                  );
                  if (result.ok) { committed = true; break; }
                  lastError = result.error ?? 'unknown';
                  send({ progress: 62 + attempt, status: `コミット再試行 (${attempt + 1}/3): ${lastError.slice(0, 60)}` });
                }

                if (!committed) {
                  send({ progress: 63, status: `バッチコミット失敗: ${lastError.slice(0, 80)}` });
                } else {
                  send({ progress: 64, status: 'バッチコミット完了！' });
                }

                // page.tsx から除外ディレクトリを解除
                await removeFromExcludedDirs(client_slug, githubToken);
                send({ progress: 65, status: 'GitHubコミット完了。Vercelデプロイ起動待ち...' });

                if (vercelToken && vercelProjectId) {
                  let deployProgress = 65;
                  let deployed = false;
                  for (let i = 0; i < 36; i++) {
                    await new Promise(r => setTimeout(r, 5000));
                    deployProgress = Math.min(deployProgress + 0.8, 95);
                    try {
                      const vRes = await fetch(
                        `https://api.vercel.com/v6/deployments?projectId=${vercelProjectId}&limit=5`,
                        { headers: { Authorization: `Bearer ${vercelToken}` } },
                      );
                      if (!vRes.ok) { send({ progress: deployProgress }); continue; }
                      const vData: { deployments: Array<{ createdAt: number; state: string; readyState: string }> } = await vRes.json();
                      const dep = (vData.deployments ?? []).find(d => d.createdAt >= commitStart - 30000);
                      if (!dep) { send({ progress: deployProgress, status: 'Vercelデプロイ起動待ち...' }); continue; }
                      if (dep.state === 'READY' || dep.readyState === 'READY') {
                        send({ progress: 100, status: 'デプロイ完了！', deploy_done: true });
                        deployed = true; break;
                      } else if (dep.state === 'ERROR' || dep.readyState === 'ERROR') {
                        send({ error: 'Vercelデプロイが失敗しました' });
                        deployed = true; break;
                      } else {
                        send({ progress: deployProgress, status: 'Vercelビルド中...' });
                      }
                    } catch { send({ progress: deployProgress }); }
                  }
                  if (!deployed) send({ error: 'デプロイタイムアウト（3分）' });
                } else {
                  send({ progress: 65, status: 'GitHubコミット完了。Vercelデプロイ待機中...', dify_done: true });
                }
              }
            } catch { /* JSON parse error — skip */ }
          }
        }
      } catch (err) {
        send({ error: String(err) });
      } finally {
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
