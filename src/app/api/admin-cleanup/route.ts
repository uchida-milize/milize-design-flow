import { NextResponse } from 'next/server';

const OWNER = 'uchida-milize';
const REPO = 'milize-design-flow';
const API = 'https://api.github.com';

const CLIENT_SLUGS = [
  'hitachi', 'sony_corp', 'sharp-finance-corp', 'milize',
  'dena', 'group-softbank', 'httpsdenacomjpcompanypolicylogoguidehtml',
  'panasonic', 'sharp', 'toyota'
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? '';
  const h = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  async function listFiles(path: string): Promise<Array<{path: string; sha: string}>> {
    const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, { headers: h });
    if (!r.ok) return [];
    const items: Array<{path: string; sha: string; type: string}> = await r.json();
    const out: Array<{path: string; sha: string}> = [];
    for (const item of items) {
      if (item.type === 'file') out.push({ path: item.path, sha: item.sha });
      else if (item.type === 'dir') out.push(...await listFiles(item.path));
    }
    return out;
  }

  const results: string[] = [];
  for (const slug of CLIENT_SLUGS) {
    const files = await listFiles(`src/app/${slug}`);
    for (const file of files) {
      const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${file.path}`, {
        method: 'DELETE',
        headers: { ...h, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `chore: remove client ${slug}`,
          sha: file.sha,
          branch: 'main',
        }),
      });
      results.push(`${r.status} ${file.path}`);
    }
  }

  return NextResponse.json({ deleted: results });
}

