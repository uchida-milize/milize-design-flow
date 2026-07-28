import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

const clientName = 'Ã¦ÂÂ¥Ã§Â«ÂÃ¨Â£Â½Ã¤Â½ÂÃ¦ÂÂ';
const basePath = '/hitachi';
const primaryColor = '#E60012';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {/* カラー比率バー */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ flex: 0.40, background: '#E60012' }} />
            <div style={{ flex: 0.20, background: '#000000' }} />
            <div style={{ flex: 0.15, background: '#0071BC' }} />
            <div style={{ flex: 0.15, background: '#333333' }} />
            <div style={{ flex: 0.10, background: '#FFFFFF', border: '1px solid #e5e7eb' }} />
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { color: '#E60012', label: '日立レッド', pct: '40%' },
              { color: '#000000', label: 'ブラック', pct: '20%' },
              { color: '#0071BC', label: 'ブルー', pct: '15%' },
              { color: '#333333', label: 'ダークグレー', pct: '15%' },
              { color: '#FFFFFF', label: 'ホワイト', pct: '10%' },
            ].map(({ color, label, pct }) => (
              <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: color, border: '1px solid #e5e7eb', flexShrink: 0 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#111827' }}>{color}</span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{pct}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title">{clientName} Ã£ÂÂÃ£ÂÂ©Ã£ÂÂ³Ã£ÂÂÃ£ÂÂÃ£ÂÂ¼Ã£ÂÂ¿Ã£ÂÂ«</h1>
          <p className="section-desc">
            Ã¤Â¿Â¡Ã©Â Â¼Ã¦ÂÂÃ£ÂÂ»Ã¥ÂÂÃ©ÂÂ²Ã¦ÂÂ§Ã£ÂÂ»Ã£ÂÂµÃ£ÂÂ¹Ã£ÂÂÃ£ÂÂÃ£ÂÂÃ£ÂÂªÃ£ÂÂÃ£ÂÂ£Ã£ÂÂÃ¨Â»Â¸Ã£ÂÂ¨Ã£ÂÂÃ£ÂÂÃ£ÂÂÃ¦ÂÂ¥Ã§Â«ÂÃ£ÂÂÃ£ÂÂ©Ã£ÂÂ³Ã£ÂÂÃ£ÂÂ®Ã£ÂÂ¬Ã£ÂÂ¤Ã£ÂÂÃ£ÂÂ©Ã£ÂÂ¤Ã£ÂÂ³Ã£ÂÂ¨Ã£ÂÂ³Ã£ÂÂ³Ã£ÂÂÃ£ÂÂ¼Ã£ÂÂÃ£ÂÂ³Ã£ÂÂÃ¤Â¸ÂÃ¨Â¦Â§Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ
          </p>
        </div>
