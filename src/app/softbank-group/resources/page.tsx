'use client';
import { useState, useEffect } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/softbank-group';

const TOKEN_RE = /(https?:\/\/[^\s"',\]\}\)]+)|(#[0-9a-fA-F]{6,8}|#[0-9a-fA-F]{3}(?![0-9a-fA-F])|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\))/g;

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('').toUpperCase();
}

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
      const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      const hexLabel = rgbMatch ? rgbToHex(Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])) : null;
      parts.push(
        <span key={m.index}>
          <span style={{
            display: 'inline-block', color, fontSize: 14, lineHeight: 1,
            marginRight: 3, verticalAlign: 'middle',
          }}>■</span>
          {hexLabel ? `${hexLabel} (${color})` : color}
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

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return '（データなし）';
  // selected_urls: "url||tag1,tag2" 形式 → URLのみ表示（パイプ以降を除去）
  if (key === 'selected_urls') {
    const arr = Array.isArray(value) ? value :
      (typeof value === 'string' ? value.split('\n').filter(Boolean) : [String(value)]);
    return arr.map((item: unknown) => {
      const s = String(item).trim();
      const pipeIdx = s.indexOf('||');
      return pipeIdx >= 0 ? s.slice(0, pipeIdx).trim() : s;
    }).filter(Boolean).join('\n');
  }
  // createdAt: ミリ秒タイムスタンプを日本語日時に変換
  if (key === 'createdAt') {
    const ts = typeof value === 'number' ? value : Number(String(value));
    if (!isNaN(ts) && ts > 1_000_000_000_000) {
      try { return new Date(ts).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }); } catch { /* fall through */ }
    }
    return String(value);
  }
  if (typeof value === 'string') return value;
  // 配列・オブジェクトはJSON整形して表示
  return JSON.stringify(value, null, 2);
}

export default function ResourcesPage() {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState('');
  const [data, setData] = useState<Record<string, unknown>>({});
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
    border: 'ボーダー情報',
    date: '日付',
  };
  // ゴミキーを除外：50文字超 OR 英数字・アンダースコア・ハイフン以外の文字を含む（URLやJSON断片を排除）
  const VALID_KEY = (k: string) => k.length <= 50 && /^[\w-]+$/.test(k);
  const getTabLabel = (tab: string) => {
    const raw = LABEL_MAP[tab] ?? tab;
    return raw.length > 28 ? raw.slice(0, 26) + '…' : raw;
  };
  // vercel_output・date・border は技術的/ゴミ値なのでセカンダリへ
  const TAB_ORDER = ['selected_urls', 'design_md', 'code', 'iteration_output', 'URL'];
  const SECONDARY_KEYS = new Set(['name', 'percent', 'pct', 'state', 'createdAt', 'isWhite', 'border', 'date', 'vercel_output']);
  const validTabs = tabs.filter(VALID_KEY);
  const primaryTabs = [...validTabs].filter(t => !SECONDARY_KEYS.has(t)).sort((a, b) =>
    (TAB_ORDER.indexOf(a) === -1 ? 999 : TAB_ORDER.indexOf(a)) - (TAB_ORDER.indexOf(b) === -1 ? 999 : TAB_ORDER.indexOf(b))
  );
  const secondaryTabs = validTabs.filter(t => SECONDARY_KEYS.has(t));

  useEffect(() => {
    Promise.all([
      fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/softbank-group/globals.css?t=${Date.now()}`).then(r => r.text()),
      fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/softbank-group/resources.json?t=${Date.now()}`).then(r => r.json()),
    ]).then(([css, json]) => {
      const m = css.match(/--primary-color:\s*(#[0-9a-fA-F]{3,8})/);
      if (m) setPrimaryColor(m[1]);
      setData(json);
      // ゴミキーを除外：50文字超 OR 英数字・アンダースコア・ハイフン以外の文字を含む
      const keys = Object.keys(json).filter((k: string) => k.length <= 50 && /^[\w-]+$/.test(k));
      setTabs(keys);
      if (keys.length > 0) {
        const order = ['selected_urls', 'design_md', 'code', 'iteration_output', 'URL'];
        const sec = new Set(['name', 'percent', 'pct', 'state', 'createdAt', 'isWhite', 'border', 'date', 'vercel_output']);
        const sorted = keys.filter((k: string) => !sec.has(k)).sort((a: string, b: string) =>
          (order.indexOf(a) === -1 ? 999 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 999 : order.indexOf(b))
        );
        setActive(sorted[0] ?? keys[0]);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="softbank-group-portal">
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
                  }}>{getTabLabel(tab)}</button>
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
                      }}>{getTabLabel(tab)}</button>
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
              }}>{renderRich(formatValue(active, data[active] ?? null))}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
