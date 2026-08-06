'use client';
import { useState, useEffect } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ゼネラル・エレクトリック';
const basePath = '/ge';

const TOKEN_RE = /(https?:\/\/[^\s"',\]\}\)]+)|(#[0-9a-fA-F]{6,8}|#[0-9a-fA-F]{3}(?![0-9a-fA-F])|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\))/g;

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

  const LABEL_MAP: Record<string, string> = {
    design_md: 'DESIGN.MD生成',
    code: '実装コード生成',
    iteration_output: 'イテレーション出力',
    URL: 'デプロイURL',
    selected_urls: 'URL選択',
    vercel_output: 'Vercelデプロイ',
    name: 'カラー名',
    percent: '使用比率',
    pct: '使用比率',
    state: 'Vercelステータス',
    createdAt: '作成日時',
    isWhite: '白背景フラグ',
  };
  const TAB_ORDER = ['selected_urls', 'design_md', 'code', 'iteration_output', 'URL', 'vercel_output'];
  const SECONDARY_KEYS = new Set(['name', 'percent', 'pct', 'state', 'createdAt', 'isWhite']);
  const primaryTabs = [...tabs].filter(t => !SECONDARY_KEYS.has(t)).sort((a, b) =>
    (TAB_ORDER.indexOf(a) === -1 ? 999 : TAB_ORDER.indexOf(a)) - (TAB_ORDER.indexOf(b) === -1 ? 999 : TAB_ORDER.indexOf(b))
  );
  const secondaryTabs = tabs.filter(t => SECONDARY_KEYS.has(t));

  useEffect(() => {
    Promise.all([
      fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/ge/globals.css?t=${Date.now()}`).then(r => r.text()),
      fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/ge/resources.json?t=${Date.now()}`).then(r => r.json()),
    ]).then(([css, json]) => {
      const m = css.match(/--primary-color:\s*(#[0-9a-fA-F]{3,8})/);
      if (m) setPrimaryColor(m[1]);
      setData(json);
      const keys = Object.keys(json);
      setTabs(keys);
      if (keys.length > 0) {
        const order = ['selected_urls', 'design_md', 'code', 'iteration_output', 'URL', 'vercel_output'];
        const sec = new Set(['name', 'percent', 'pct', 'state', 'createdAt', 'isWhite']);
        const sorted = keys.filter((k: string) => !sec.has(k)).sort((a: string, b: string) =>
          (order.indexOf(a) === -1 ? 999 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 999 : order.indexOf(b))
        );
        setActive(sorted[0] ?? keys[0]);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="ge-portal">
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
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {primaryTabs.map(tab => (
                  <button key={tab} onClick={() => setActive(tab)} style={{
                    padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                    background: active === tab ? primaryColor : '#f3f4f6',
                    color: active === tab ? '#ffffff' : '#6b7280',
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  }}>{LABEL_MAP[tab] ?? tab}</button>
                ))}
              </div>
              {secondaryTabs.length > 0 && (
                <>
                  <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {secondaryTabs.map(tab => (
                      <button key={tab} onClick={() => setActive(tab)} style={{
                        padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                        background: active === tab ? primaryColor : '#f3f4f6',
                        color: active === tab ? '#ffffff' : '#6b7280',
                        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                      }}>{LABEL_MAP[tab] ?? tab}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '10px 20px' }}>
                <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{active}</span>
              </div>
              <pre style={{
                padding: 24, margin: 0, fontSize: 12, lineHeight: 1.8,
                color: '#374151', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                maxHeight: '65vh', overflowY: 'auto', fontFamily: "'Courier New', monospace",
              }}>{renderRich(String(data[active] ?? '（データなし）'))}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
