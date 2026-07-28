'use client';
import Link from 'next/link';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const basePath = '/hitachi';
const clientName = '日立製作所';
const primaryColor = '#E60012';

const brandColors = [
  { name: 'Hitachi Red', hex: '#E60012', ratio: 40 },
  { name: 'Black', hex: '#000000', ratio: 20 },
  { name: 'Hitachi Blue', hex: '#0071BC', ratio: 15 },
  { name: 'Dark Gray', hex: '#333333', ratio: 15 },
  { name: 'White', hex: '#FFFFFF', ratio: 10 },
];

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#333333' : '#FFFFFF';
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function HitachiHome() {
  return (
    <>
      <style>{`@import url('https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap');`}</style>
      <div style={{ minHeight: '100vh' }}>
        <ClientPortalHeader clientName={clientName} basePath={basePath} active="home" primaryColor={primaryColor} />
        <main style={{ padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>

          <div style={{ display: 'flex', height: '130px', borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
            {brandColors.map((c) => {
              const textColor = getTextColor(c.hex);
              const chillax = "'Chillax', sans-serif";
              return (
                <div key={c.hex} style={{ width: c.ratio + '%', backgroundColor: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #e0e0e0' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0 6px', gap: '2px' }}>
                  <span style={{ color: textColor, fontSize: '13px', fontWeight: 400, fontFamily: chillax, lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap' }}>{hexToRgb(c.hex)}</span>
                  <span style={{ color: textColor, fontSize: '13px', fontWeight: 400, fontFamily: chillax, lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap' }}>{c.hex}</span>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
                    <span style={{ color: textColor, fontSize: '26px', fontWeight: 600, fontFamily: chillax, lineHeight: 1.2 }}>{c.ratio}</span>
                    <span style={{ color: textColor, fontSize: '13px', fontWeight: 400, fontFamily: chillax, lineHeight: 1.2 }}>%</span>
                  </span>
                </div>
              );
            })}
          </div>

          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#333333', marginBottom: '16px' }}>コンテンツ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <Link href={`${basePath}/guidelines`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333333', marginBottom: '8px' }}>ブランドガイドライン</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>ブランドカラー、タイポグラフィ、ロゴの使用方法など、日立ブランドの基本ルールをご確認ください。</p>
              </div>
            </Link>
            <Link href={`${basePath}/components`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333333', marginBottom: '8px' }}>UIコンポーネント</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>ボタン、フォーム、カード、ナビゲーションなど、UIコンポーネントの仕様と実装例をご覧ください。</p>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </>
  );
}
