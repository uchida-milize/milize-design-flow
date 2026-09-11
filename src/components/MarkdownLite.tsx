'use client';
import type { ReactNode } from 'react';

/** 見出し(#)・箇条書き(-,・)・**太字**・URL・HEXカラーだけを扱う簡易Markdownレンダラー。design_md表示用。 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const re = /\*\*([^*]+)\*\*|(#[0-9a-fA-F]{3,8})\b|(https?:\/\/[^\s)）]+)/g;
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{m[1]}</strong>);
    } else if (m[2]) {
      parts.push(
        <span key={`${keyPrefix}-${i++}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: m[2],
              border: '1px solid #e5e7eb',
              display: 'inline-block',
            }}
          />
          {m[2]}
        </span>,
      );
    } else if (m[3]) {
      parts.push(
        <a
          key={`${keyPrefix}-${i++}`}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3b82f6', wordBreak: 'break-all' }}
        >
          {m[3]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function MarkdownLite({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    const items = listBuffer;
    listBuffer = [];
    blocks.push(
      <ul key={key} style={{ margin: '4px 0 16px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((li, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#374151' }}>
            {inline(li, `${key}-${i}`)}
          </li>
        ))}
      </ul>,
    );
  };

  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) {
      flushList(`l${idx}`);
      return;
    }
    if (/^-{3,}$/.test(line)) {
      flushList(`l${idx}`);
      return;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushList(`l${idx}`);
      const level = h[1].length;
      blocks.push(
        <p
          key={`h${idx}`}
          style={{ fontSize: level <= 2 ? 16 : 14, fontWeight: 700, color: '#111827', marginTop: 20, marginBottom: 8 }}
        >
          {inline(h[2], `h${idx}`)}
        </p>,
      );
      return;
    }
    const bullet = line.match(/^[-・]\s?(.*)$/);
    if (bullet) {
      listBuffer.push(bullet[1]);
      return;
    }
    flushList(`l${idx}`);
    blocks.push(
      <p key={`p${idx}`} style={{ fontSize: 14, lineHeight: 1.9, color: '#374151', marginBottom: 8 }}>
        {inline(line, `p${idx}`)}
      </p>,
    );
  });
  flushList('lend');

  return <>{blocks}</>;
}
