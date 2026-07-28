import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

const clientName = 'æ¥ç«è£½ä½æ';
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
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title">{clientName} ãã©ã³ããã¼ã¿ã«</h1>
          <p className="section-desc">
            ä¿¡é ¼æã»åé²æ§ã»ãµã¹ããããªãã£ãè»¸ã¨ãããæ¥ç«ãã©ã³ãã®ã¬ã¤ãã©ã¤ã³ã¨ã³ã³ãã¼ãã³ãä¸è¦§ã§ãã
          </p>
        </div>


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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          <Link href={`${basePath}/guidelines`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p
                className="section-label"
                style={{ color: primaryColor, marginBottom: 8 }}
              >
                GUIDELINES
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                ãã©ã³ãã¬ã¤ãã©ã¤ã³
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
                ãã©ã³ãã«ã©ã¼ãã¿ã¤ãã°ã©ãã£ããã³ãããªã©ãæ¥ç«ãã©ã³ãã®åºæ¬æ¹éãç¢ºèªã§ãã¾ãã
              </p>
            </div>
          </Link>

          <Link href={`${basePath}/components`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p
                className="section-label"
                style={{ color: primaryColor, marginBottom: 8 }}
              >
                COMPONENTS
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                UIã³ã³ãã¼ãã³ã
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
                ãã¿ã³ãã«ã¼ããªã©ããã©ã³ãã«ã©ã¼ãé©ç¨ããUIã³ã³ãã¼ãã³ãã®ãµã³ãã«éã§ãã
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}