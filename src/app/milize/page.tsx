import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'Milize';
const basePath = '/milize';
const primaryColor: string = '#0055A4';

const colorRatios = [
  { hex: '#0055A4', name: 'Primary Blue', percent: 38 },
  { hex: '#00A0E9', name: 'Secondary Blue', percent: 22 },
  { hex: '#F5A623', name: 'Accent Orange', percent: 12 },
  { hex: '#333333', name: 'Text Black', percent: 18 },
  { hex: '#FFFFFF', name: 'Background White', percent: 10 },
];

export default function HomePage() {
  return (
    <div className="milize-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </div>
          <div className="section-title">{clientName} ブランドポータル</div>
          <div className="section-desc">
            ブランドガイドラインとUIコンポーネントをまとめたポータルサイトです。
          </div>
        </div>

        <div className="color-ratio-bar">
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent,
                background: c.hex,
                border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div className="color-ratio-labels">
          {colorRatios.map((c) => (
            <div className="color-ratio-label-item" key={c.hex}>
              <span
                className="color-ratio-swatch"
                style={{
                  background: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span>
                {c.hex} {c.name} {c.percent}%
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          <a href={`${basePath}/guidelines`} className="nav-card">
            <div className="section-label" style={{ color: primaryColor }}>
              GUIDELINES
            </div>
            <div className="section-title" style={{ fontSize: 20 }}>
              ブランドガイドライン
            </div>
            <div className="section-desc">
              カラー・タイポグラフィ・トンマナなどのブランド定義を確認できます。
            </div>
          </a>
          <a href={`${basePath}/components`} className="nav-card">
            <div className="section-label" style={{ color: primaryColor }}>
              COMPONENTS
            </div>
            <div className="section-title" style={{ fontSize: 20 }}>
              UIコンポーネント
            </div>
            <div className="section-desc">
              ボタンやカードなど、実装済みのUIコンポーネント一覧です。
            </div>
          </a>
          <a
            href={`${basePath}/resources`}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.15s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; const d = e.currentTarget.querySelector('div') as HTMLElement; if (d) d.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; const d = e.currentTarget.querySelector('div') as HTMLElement; if (d) d.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'; }}
          >
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '24px',
              cursor: 'pointer',
              flex: 1,
              transition: 'box-shadow 0.15s ease',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: '0.05em', marginBottom: 8 }}>
                RESOURCES
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                収集リソース
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
                リサーチで収集したWebページのデザイン情報（カラー・フォント・CSS）を確認できます。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
