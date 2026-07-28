'use client';
import Link from 'next/link';

const basePath = '/hitachi';

const brandColors = [
  { name: 'Hitachi Red', hex: '#E60012', ratio: 40 },
  { name: 'Black', hex: '#000000', ratio: 20 },
  { name: 'Hitachi Blue', hex: '#0071BC', ratio: 15 },
  { name: 'Dark Gray', hex: '#333333', ratio: 15 },
  { name: 'White', hex: '#FFFFFF', ratio: 10 },
];

export default function HitachiHome() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#333333', marginBottom: '8px' }}>
        日立製作所 ブランドポータル
      </h1>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
        ブランドカラー・UIコンポーネントガイドライン
      </p>

      {/* Brand Color Ratio Bar */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#333333', marginBottom: '12px' }}>
          ブランドカラー比率
        </h2>
        <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
          {brandColors.map((c) => (
            <div
              key={c.hex}
              style={{
                width: c.ratio + '%',
                backgroundColor: c.hex,
                border: c.hex === '#FFFFFF' ? '1px solid #e0e0e0' : 'none',
              }}
              title={c.name + ' ' + c.ratio + '%'}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {brandColors.map((c) => (
            <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#333' }}>
              <span style={{
                display: 'inline-block', width: '14px', height: '14px', borderRadius: '3px',
                backgroundColor: c.hex,
                border: c.hex === '#FFFFFF' ? '1px solid #ccc' : 'none',
                flexShrink: 0,
              }} />
              <span>{c.name}</span>
              <span style={{ color: '#888' }}>{c.hex}</span>
              <span style={{ color: '#888' }}>{c.ratio}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <Link href={`${basePath}/guidelines`} style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer',
            borderTop: '4px solid #E60012', transition: 'box-shadow 0.2s',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333333', marginBottom: '8px' }}>
              ブランドガイドライン
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
              ブランドカラー、タイポグラフィ、ロゴの使用方法など、日立ブランドの基本ルールをご確認ください。
            </p>
          </div>
        </Link>
        <Link href={`${basePath}/components`} style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer',
            borderTop: '4px solid #0071BC', transition: 'box-shadow 0.2s',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333333', marginBottom: '8px' }}>
              UIコンポーネント
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
              ボタン、フォーム、カード、ナビゲーションなど、UIコンポーネントの仕様と実装例をご覧ください。
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
