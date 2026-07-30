'use client';
import { useState, useEffect } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ゼネラル・エレクトリック';
const basePath = '/ge';

export default function ResourcesPage() {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState('');
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

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
      if (keys.length > 0) setActive(keys[0]);
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
