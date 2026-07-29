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

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `feat: activate client ${slug}`,
      content: Buffer.from(fixed, 'utf-8').toString('base64'),
      sha: data.sha,
      branch: 'main',
    }),
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
send({ progress: progressVal });
} else if (data.event === 'workflow_finished') {
const githubToken = process.env.GITHUB_TOKEN ?? '';
await fixTemplateRefs(client_slug, company_name, githubToken);
await ensureLayoutTsx(client_slug, githubToken);
await normalizeColorVars(client_slug, githubToken);
await removeFromExcludedDirs(client_slug, githubToken);
send({ progress: 60, status: 'GitHub\u30b3\u30df\u30c3\u30c8\u5b8c\u4e86\u3002Vercel\u30c7\u30d7\u30ed\u30a4\u5f85\u6a5f\u4e2d...', dify_done: true });
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
