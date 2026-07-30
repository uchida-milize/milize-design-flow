import { NextRequest } from 'next/server';

export const maxDuration = 300;

export interface UrlItem {
  url: string;
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const { company_name } = await req.json();

  const apiKey = process.env.DIFY_URL_COLLECTION_KEY ?? '';
  const baseUrl = process.env.DIFY_BASE_URL ?? '';

  if (!apiKey) {
    return Response.json({ error: 'DIFY_URL_COLLECTION_KEY が設定されていません' }, { status: 500 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        send({ progress: 10, status: 'URL収集ワークフローを起動中...' });

        const difyRes = await fetch(`${baseUrl}/workflows/run`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: { company_name },
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

        send({ progress: 20, status: 'URLを収集中...' });

        const reader = difyRes.body!.getReader();
        const decoder = new TextDecoder();
        let lineBuffer = '';
        let progressVal = 20;
        const nodeOutputs: Record<string, string> = {};

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

              if (data.event === 'node_started') {
                progressVal = Math.min(progressVal + 15, 80);
                const title = data.data?.title || '';
                send({ progress: progressVal, status: title ? `${title}を実行中...` : '処理中...' });
              } else if (data.event === 'node_finished') {
                const nodeTitle = data.data?.title || `ノード_${Object.keys(nodeOutputs).length + 1}`;
                const outputs = data.data?.outputs;
                if (outputs && typeof outputs === 'object') {
                  const text = Object.entries(outputs)
                    .map(([k, v]) => `[${k}]\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
                    .join('\n\n');
                  if (text.trim()) nodeOutputs[nodeTitle] = text;
                }
              } else if (data.event === 'workflow_finished') {
                send({ progress: 90, status: 'URLリストを解析中...' });

                // workflow outputs から urls を取得
                const wfOutputs = data.data?.outputs ?? {};
                const urlsRaw: string =
                  wfOutputs.urls ?? wfOutputs.url_list ?? wfOutputs.result ?? '';

                const urls: UrlItem[] = parseUrls(urlsRaw, nodeOutputs);

                send({ progress: 100, status: '収集完了', urls });
              }
            } catch { /* skip */ }
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`)
        );
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

/** Dify出力からURLリストをパース。JSON配列 or マークダウンリスト両対応 */
function parseUrls(raw: string, nodeOutputs: Record<string, string>): UrlItem[] {
  // まずJSON配列を試す
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item: { url?: string; title?: string; description?: string } | string) => {
        if (typeof item === 'string') return { url: item, title: item, description: '' };
        return {
          url: item.url ?? '',
          title: item.title ?? item.url ?? '',
          description: item.description ?? '',
        };
      }).filter((u: UrlItem) => u.url.startsWith('http'));
    }
  } catch { /* not JSON */ }

  // マークダウンリスト or 改行区切りからURL抽出
  const sources = [raw, ...Object.values(nodeOutputs)].join('\n');
  const urlRe = /https?:\/\/[^\s"',\]}\)]+/g;
  const seen = new Set<string>();
  const urls: UrlItem[] = [];

  for (const m of sources.matchAll(urlRe)) {
    const url = m[0].replace(/[.,;:!?]+$/, '');
    if (seen.has(url)) continue;
    seen.add(url);

    // 同じ行からタイトルっぽいテキストを取得
    const lineStart = sources.lastIndexOf('\n', m.index) + 1;
    const lineEnd = sources.indexOf('\n', m.index);
    const line = sources.slice(lineStart, lineEnd > -1 ? lineEnd : undefined).trim();
    const titleMatch = line.replace(url, '').replace(/^[-*#\d.)\s]+/, '').trim();

    urls.push({
      url,
      title: titleMatch.slice(0, 80) || new URL(url).hostname,
      description: '',
    });
  }

  return urls.slice(0, 20); // 最大20件
}
