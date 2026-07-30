import { NextRequest } from 'next/server';

const OWNER = 'uchida-milize';
const REPO  = 'milize-design-flow';
const API   = 'https://api.github.com';

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

// GitHub Trees API で複数ファイルを1コミットにまとめる
async function batchGitCommit(
  files: Array<{ path: string; content: string }>,
  message: string,
  token: string,
): Promise<boolean> {
  const h = ghHeaders(token);

  // 1. HEAD SHA 取得
  const refRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/refs/heads/main`, { headers: h });
  if (!refRes.ok) return false;
  const refData = await refRes.json();
  const headSha: string = refData.object.sha;

  // 2. 現在のツリー SHA 取得
  const commitRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/commits/${headSha}`, { headers: h });
  if (!commitRes.ok) return false;
  const commitData = await commitRes.json();
  const treeSha: string = commitData.tree.sha;

  // 3. 各ファイルの blob を作成
  const treeItems = await Promise.all(
    files.map(async (f) => {
      const blobRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/blobs`, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({
          content: Buffer.from(f.content, 'utf-8').toString('base64'),
          encoding: 'base64',
        }),
      });
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
  if (!treeRes.ok) return false;
  const treeData = await treeRes.json();

  // 5. コミットを作成
  const newCommitRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    headers: h,
    body: JSON.stringify({ message, tree: treeData.sha, parents: [headSha] }),
  });
  if (!newCommitRes.ok) return false;
  const newCommitData = await newCommitRes.json();

  // 6. refs/heads/main を更新（競合時は失敗を返す）
  const updateRes = await fetch(`${API}/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
    method: 'PATCH',
    headers: h,
    body: JSON.stringify({ sha: newCommitData.sha, force: false }),
  });
  return updateRes.ok;
}

// page.tsx から slug を EXCLUDED_DIRS に含まれていたら除外する（別コミット）
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

// slug ディレクトリ以下の全ファイルを取得
async function listClientFiles(slug: string, token: string): Promise<Array<{ path: string; sha: string }>> {
  const h = ghHeaders(token);
  async function walk(p: string): Promise<Array<{ path: string; sha: string }>> {
    const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${p}`, { headers: h });
    if (!r.ok) return [];
    const items: Array<{ path: string; sha: string; type: string }> = await r.json();
    const out: Array<{ path: string; sha: string }> = [];
    for (const item of items) {
      if (item.type === 'file') out.push({ path: item.path, sha: item.sha });
      else if (item.type === 'dir') out.push(...await walk(item.path));
    }
    return out;
  }
  return walk(`src/app/${slug}`);
}

// ファイル内容を取得
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

function buildResourcesPageContent(slug: string, companyName: string): string {
  return `'use client';
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
        send({ progress: 10, status: 'Difyに接続中...' });

        const difyRes = await fetch(`${process.env.DIFY_BASE_URL}/workflows/run`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: { company_name, client_slug },
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

                // ===== ファイルを全て読み込んでメモリ上で変更し、1コミットにまとめる =====
                const TPL_SLUG = 'sharp-finance-corp';
                const TPL_NAME = 'シャープファイナンス株式会社';

                send({ progress: 61, status: 'ファイルを読み込み中...' });
                const existingFiles = await listClientFiles(client_slug, githubToken);
                const filesToCommit: Array<{ path: string; content: string }> = [];

                // 1) Dify生成ファイルのテンプレート参照を修正
                for (const file of existingFiles) {
                  const ext = file.path.split('.').pop() ?? '';
                  if (!['tsx', 'ts', 'css'].includes(ext)) continue;
                  const f = await getFileContent(file.path, githubToken);
                  if (!f) continue;
                  let content = f.content;
                  const needsFix = content.includes(TPL_SLUG) || content.includes(TPL_NAME);
                  if (needsFix) {
                    content = content
                      .split(TPL_SLUG).join(client_slug)
                      .split(TPL_NAME).join(company_name)
                      .replace('background: #0f172a;', 'background: #efefef;')
                      .replace('color: #94a3b8;', 'color: #333333;');
                  }
                  // globals.css: 標準カラー変数を注入（未定義の場合のみ）
                  if (file.path.endsWith('globals.css') && !content.includes('--primary-color:')) {
                    const extract = (patterns: string[]): string | null => {
                      for (const p of patterns) {
                        const m = content.match(new RegExp(p + ':\\s*(#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))'));
                        if (m) return m[1];
                      }
                      return null;
                    };
                    const primary   = extract(['--primary(?!-color)[\\w-]*', '--color-primary', '--main-color', '--brand-color']) ?? '#004A99';
                    const secondary = extract(['--secondary(?!-color)[\\w-]*', '--color-secondary', '--sub-color']) ?? '#333333';
                    const accent    = extract(['--accent(?!-color)[\\w-]*', '--color-accent']) ?? '#F5A623';
                    const textColor = extract(['--text-main', '--text-color', '--color-text', '--text-primary']) ?? '#111827';
                    const bgColor   = extract(['--bg(?!-color)[\\w-]*', '--background(?!-color)[\\w-]*', '--portal-bg']) ?? '#FFFFFF';
                    content += `\n/* 標準カラー変数（自動注入） */\n:root {\n  --primary-color: ${primary};\n  --secondary-color: ${secondary};\n  --accent-color: ${accent};\n  --text-color: ${textColor};\n  --bg-color: ${bgColor};\n}\n`;
                  }
                  // layout.tsx を上書き（正しいラッパーを保証）
                  if (file.path.endsWith('layout.tsx') && file.path.includes(`/${client_slug}/layout.tsx`)) {
                    content = `import './globals.css';\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`;
                  }
                  filesToCommit.push({ path: file.path, content });
                }

                // 2) layout.tsx が存在しない場合は新規作成
                const hasLayout = existingFiles.some(f => f.path === `src/app/${client_slug}/layout.tsx`);
                if (!hasLayout) {
                  filesToCommit.push({
                    path: `src/app/${client_slug}/layout.tsx`,
                    content: `import './globals.css';\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className="${client_slug}-portal">{children}</div>;\n}\n`,
                  });
                }

                // 3) resources.json
                filesToCommit.push({
                  path: `src/app/${client_slug}/resources.json`,
                  content: JSON.stringify(nodeOutputs, null, 2),
                });

                // 4) resources/page.tsx
                filesToCommit.push({
                  path: `src/app/${client_slug}/resources/page.tsx`,
                  content: buildResourcesPageContent(client_slug, company_name),
                });

                // ===== 1回のバッチコミット =====
                send({ progress: 63, status: `${filesToCommit.length}ファイルを1コミットで保存中...` });
                let retries = 0;
                let committed = false;
                while (retries < 3 && !committed) {
                  if (retries > 0) await new Promise(r => setTimeout(r, 2000 * retries));
                  committed = await batchGitCommit(
                    filesToCommit,
                    `feat: generate portal for ${client_slug} [${nodeKeys.length} node outputs]`,
                    githubToken,
                  );
                  retries++;
                }

                // ===== page.tsx から除外ディレクトリを解除（別コミット） =====
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
                        send({ progress: deployProgress, status: `Vercelビルド中...` });
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
