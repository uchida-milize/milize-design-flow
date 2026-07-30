import { NextRequest } from 'next/server';

// Dify が生成した globals.css の変数名がバラバラでも、標準変数を自動注入する
async function normalizeColorVars(slug: string, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const path  = `src/app/${slug}/globals.css`;
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
  if (!res.ok) return;
  const data: { content: string; sha: string } = await res.json();
  const css = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');

  // 既に標準変数が揃っていればスキップ
  if (css.includes('--primary-color:')) return;

  // どんな変数名でも色値を抽出するヘルパー
  const extract = (patterns: string[]): string | null => {
    for (const p of patterns) {
      const m = css.match(new RegExp(p + ':\\s*(#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))'));
      if (m) return m[1];
    }
    return null;
  };

  const primary   = extract(['--primary(?!-color)[\\w-]*', '--color-primary', '--main-color', '--brand-color']) ?? '#004A99';
  const secondary = extract(['--secondary(?!-color)[\\w-]*', '--color-secondary', '--sub-color'])               ?? '#333333';
  const accent    = extract(['--accent(?!-color)[\\w-]*', '--color-accent'])                                    ?? '#F5A623';
  const textColor = extract(['--text-main', '--text-color', '--color-text', '--text-primary'])                  ?? '#111827';
  const bgColor   = extract(['--bg(?!-color)[\\w-]*', '--background(?!-color)[\\w-]*', '--portal-bg'])         ?? '#FFFFFF';

  // 標準変数ブロックを末尾に追加
  const injection = `\n/* 標準カラー変数（自動注入） */\n:root {\n  --primary-color: ${primary};\n  --secondary-color: ${secondary};\n  --accent-color: ${accent};\n  --text-color: ${textColor};\n  --bg-color: ${bgColor};\n}\n`;
  const fixed = css + injection;

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `fix: inject standard color vars into ${slug}/globals.css`,
      content: Buffer.from(fixed, 'utf-8').toString('base64'),
      sha: data.sha,
      branch: 'main',
    }),
  });
}

async function removeFromExcludedDirs(slug: string, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const path  = 'src/app/page.tsx';
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // SHA競合に備えて最大3回リトライ
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));

    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
    if (!res.ok) return;
    const data: { content: string; sha: string } = await res.json();
    const raw = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');

    // スラッグが EXCLUDED_DIRS に含まれていなければ何もしない
    if (!raw.includes(`'${slug}'`)) return;

    // 古いバージョンの page.tsx（colors/description がない）は絶対に上書きしない
    if (!raw.includes('colors') || !raw.includes('description')) return;

    // 該当行を削除（行単位で処理）
    const fixed = raw.split('\n').filter(line => !line.includes(`'${slug}'`)).join('\n');

    const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
      method: 'PUT',
      headers: { ...h, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `feat: activate client ${slug}`,
        content: Buffer.from(fixed, 'utf-8').toString('base64'),
        sha: data.sha,
        branch: 'main',
      }),
    });

    if (putRes.ok) return; // 成功
    // 409 (SHA競合) の場合はリトライ、それ以外は諦める
    if (putRes.status !== 409) return;
  }
}

async function saveResourcesJson(slug: string, nodeOutputs: Record<string, string>, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const path  = `src/app/${slug}/resources.json`;
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const content = Buffer.from(JSON.stringify(nodeOutputs, null, 2), 'utf-8').toString('base64');
  const existing = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
  const body: Record<string, string> = {
    message: `feat: save resources.json for ${slug}`,
    content,
    branch: 'main',
  };
  if (existing.ok) {
    const data: { sha: string } = await existing.json();
    body.sha = data.sha;
  }
  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function ensureResourcesPage(slug: string, companyName: string, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const path  = `src/app/${slug}/resources/page.tsx`;
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const pageContent = `'use client';
import { useState, useEffect } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '${companyName}';
const basePath = '/${slug}';

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
              }}>{data[active] ?? '（データなし）'}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
`;
  const encoded = Buffer.from(pageContent, 'utf-8').toString('base64');
  const existing = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
  const body: Record<string, string> = {
    message: `feat: add resources page for ${slug}`,
    content: encoded,
    branch: 'main',
  };
  if (existing.ok) {
    const d: { sha: string } = await existing.json();
    body.sha = d.sha;
  }
  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function ensureLayoutTsx(slug: string, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const path  = `src/app/${slug}/layout.tsx`;
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const content = `import './globals.css';\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className="${slug}-portal">{children}</div>;\n}\n`;
  const encoded = Buffer.from(content, 'utf-8').toString('base64');

  const existing = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
  const body: Record<string, string> = {
    message: `fix: ensure layout.tsx wraps with ${slug}-portal`,
    content: encoded,
    branch: 'main',
  };
  if (existing.ok) {
    const data: { sha: string } = await existing.json();
    body.sha = data.sha;
  }

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function fixTemplateRefs(slug: string, companyName: string, token: string) {
const OWNER = 'uchida-milize';
const REPO = 'milize-design-flow';
const API = 'https://api.github.com';
const h = {
Authorization: `Bearer ${token}`,
Accept: 'application/vnd.github+json',
'X-GitHub-Api-Version': '2022-11-28',
};

async function listFiles(path: string): Promise<Array<{path: string; sha: string; type: string}>> {
const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
if (!r.ok) return [];
const items: Array<{path: string; sha: string; type: string}> = await r.json();
const out: typeof items = [];
for (const item of items) {
if (item.type === 'file') out.push(item);
else if (item.type === 'dir') out.push(...await listFiles(item.path));
}
return out;
}

const files = await listFiles(`src/app/${slug}`);
const TPL_SLUG = 'sharp-finance-corp';
const TPL_NAME = '\u30b7\u30e3\u30fc\u30d7\u30d5\u30a1\u30a4\u30ca\u30f3\u30b9\u682a\u5f0f\u4f1a\u793e';

for (const file of files) {
const ext = file.path.split('.').pop() ?? '';
if (!['tsx', 'ts', 'css'].includes(ext)) continue;
const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${file.path}`, { headers: h });
if (!r.ok) continue;
const data: { content: string; sha: string } = await r.json();
const raw = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
if (!raw.includes(TPL_SLUG) && !raw.includes(TPL_NAME)) continue;
const fixed = raw
.split(TPL_SLUG).join(slug)
.split(TPL_NAME).join(companyName)
.replace('background: #0f172a;', 'background: #efefef;')
.replace('color: #94a3b8;', 'color: #333333;');
await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${file.path}`, {
method: 'PUT',
headers: { ...h, 'Content-Type': 'application/json' },
body: JSON.stringify({
message: `fix: replace template refs in ${file.path.split('/').pop()}`,
content: Buffer.from(fixed, 'utf-8').toString('base64'),
sha: data.sha,
branch: 'main',
}),
});
}
}

export async function POST(req: NextRequest) {
const { company_name, client_slug } = await req.json();

const encoder = new TextEncoder();

const stream = new ReadableStream({
async start(controller) {
const send = (data: object) => {
controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
};

try {
send({ progress: 10, status: 'Dify\u306b\u63a5\u7d9a\u4e2d...' });

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

send({ progress: 20, status: '\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u5b9f\u884c\u4e2d...' });

const reader = difyRes.body!.getReader();
const decoder = new TextDecoder();
let progressVal = 20;
// \u5168\u30ce\u30fc\u30c9\u51fa\u529b\u3092\u53ce\u96c6 { \u30ce\u30fc\u30c9\u30bf\u30a4\u30c8\u30eb: \u51fa\u529b\u30c6\u30ad\u30b9\u30c8 }
const nodeOutputs: Record<string, string> = {};

while (true) {
const { done, value } = await reader.read();
if (done) break;

const text = decoder.decode(value);
for (const line of text.split('\n')) {
if (!line.startsWith('data: ')) continue;
try {
const data = JSON.parse(line.slice(6));

if (data.event === 'workflow_started') {
progressVal = 20;
send({ progress: progressVal, status: '\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u958b\u59cb...' });
} else if (data.event === 'node_started') {
progressVal = Math.min(progressVal + 8, 55);
const title = data.data?.title || '';
send({ progress: progressVal, status: title ? `${title}\u3092\u51e6\u7406\u4e2d...` : '\u51e6\u7406\u4e2d...' });
} else if (data.event === 'node_finished') {
progressVal = Math.min(progressVal + 2, 58);
// \u30ce\u30fc\u30c9\u51fa\u529b\u3092\u53ce\u96c6
const nodeTitle = data.data?.title || `\u30ce\u30fc\u30c9_${Object.keys(nodeOutputs).length + 1}`;
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

const nodeKeys = Object.keys(nodeOutputs);
send({ progress: 60, status: `GitHub\u306b\u30b3\u30df\u30c3\u30c8\u4e2d... (\u30ce\u30fc\u30c9\u51fa\u529b: ${nodeKeys.length}\u4ef6: ${nodeKeys.join(', ').slice(0, 80)})` });
const commitStart = Date.now();
await fixTemplateRefs(client_slug, company_name, githubToken);
await ensureLayoutTsx(client_slug, githubToken);
await normalizeColorVars(client_slug, githubToken);
try {
  await saveResourcesJson(client_slug, nodeOutputs, githubToken);
  send({ progress: 62, status: `resources.json\u4fdd\u5b58\u5b8c\u4e86 (${nodeKeys.length}\u30ce\u30fc\u30c9)` });
} catch (e) {
  send({ progress: 62, status: `resources.json\u4fdd\u5b58\u30a8\u30e9\u30fc: ${String(e).slice(0, 100)}` });
}
await ensureResourcesPage(client_slug, company_name, githubToken);
await removeFromExcludedDirs(client_slug, githubToken);
send({ progress: 65, status: 'GitHub\u30b3\u30df\u30c3\u30c8\u5b8c\u4e86\u3002Vercel\u30c7\u30d7\u30ed\u30a4\u8d77\u52d5\u5f85\u3061...' });

if (vercelToken && vercelProjectId) {
  // Vercel API \u3067\u30c7\u30d7\u30ed\u30a4\u5b8c\u4e86\u3092\u691c\u77e5
  let deployProgress = 65;
  let deployed = false;
  for (let i = 0; i < 36; i++) { // max 3\u5206 (36 * 5s)
    await new Promise(r => setTimeout(r, 5000));
    deployProgress = Math.min(deployProgress + 0.8, 95);
    try {
      const vRes = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${vercelProjectId}&limit=5`,
        { headers: { Authorization: `Bearer ${vercelToken}` } }
      );
      if (!vRes.ok) { send({ progress: deployProgress }); continue; }
      const vData: { deployments: Array<{ createdAt: number; state: string; readyState: string }> } = await vRes.json();
      const dep = (vData.deployments ?? []).find(d => d.createdAt >= commitStart - 30000);
      if (!dep) { send({ progress: deployProgress, status: 'Vercel\u30c7\u30d7\u30ed\u30a4\u8d77\u52d5\u5f85\u3061...' }); continue; }
      if (dep.state === 'READY' || dep.readyState === 'READY') {
        send({ progress: 100, status: '\u30c7\u30d7\u30ed\u30a4\u5b8c\u4e86\uff01', deploy_done: true });
        deployed = true; break;
      } else if (dep.state === 'ERROR' || dep.readyState === 'ERROR') {
        send({ error: 'Vercel\u30c7\u30d7\u30ed\u30a4\u304c\u5931\u6557\u3057\u307e\u3057\u305f' });
        deployed = true; break;
      } else if (dep.state === 'BUILDING' || dep.readyState === 'BUILDING') {
        send({ progress: deployProgress, status: 'Vercel\u30d3\u30eb\u30c9\u4e2d...' });
      } else {
        send({ progress: deployProgress, status: `Vercel: ${dep.state ?? dep.readyState}` });
      }
    } catch { send({ progress: deployProgress }); }
  }
  if (!deployed) send({ error: '\u30c7\u30d7\u30ed\u30a4\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\uff083\u5206\uff09' });
} else {
  // VERCEL_TOKEN\u672a\u8a2d\u5b9a\u306e\u30d5\u30a9\u30fc\u30eb\u30d0\u30c3\u30af\uff1a\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u5074URL\u30dd\u30fc\u30ea\u30f3\u30b0\u306b\u59d4\u8b72
  send({ progress: 65, status: 'GitHub\u30b3\u30df\u30c3\u30c8\u5b8c\u4e86\u3002Vercel\u30c7\u30d7\u30ed\u30a4\u5f85\u6a5f\u4e2d...', dify_done: true });
}
}
} catch {}
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
