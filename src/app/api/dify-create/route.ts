import { NextRequest } from 'next/server';


async function fixTemplateRefs(slug: string, companyName: string, token: string) {
  const OWNER = 'uchida-milize';
  const REPO  = 'milize-design-flow';
  const API   = 'https://api.github.com';
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
  const TPL_NAME = 'シャープファイナンス株式会社';

  for (const file of files) {
    const ext = file.path.split('.').pop() ?? '';
    if (!['tsx', 'ts', 'css'].includes(ext)) continue;
    const r = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${file.path}`, { headers: h });
    if (!r.ok) continue;
    const data: { content: string; sha: string } = await r.json();
    const raw = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
    if (!raw.includes(TPL_SLUG) && !raw.includes(TPL_NAME)) continue;
    const fixed = raw.split(TPL_SLUG).join(slug).split(TPL_NAME).join(companyName);
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
                send({ progress: progressVal, status: 'ワークフロー開始...' });
              } else if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 8, 55);
                const title = data.data?.title || '';
                send({ progress: progressVal, status: title ? `${title}を処理中...` : '処理中...' });
              } else if (data.event === 'node_finished') {
                progressVal = Math.min(progressVal + 2, 58);
                send({ progress: progressVal });
              } else if (data.event === 'workflow_finished') {
                const githubToken = process.env.GITHUB_TOKEN ?? '';
                await fixTemplateRefs(client_slug, company_name, githubToken);
                send({ progress: 60, status: 'GitHubコミット完了。Vercelデプロイ待機中...', dify_done: true });
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
