import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '株式会社MILIZE';
const basePath = '/milize';
const primaryColor: string = '#004A99';

const colorRatio = [
  { hex: '#004A99', name: '#004A99', percent: 100 },
];

export default function Home() {
  return (
    <div className="milize-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title">{clientName} リサーチポータル</h1>
          <p className="section-desc">
            クライアントごとのトンマナを収集して一覧化をしています。
          </p>
        </div>

        <div className="color-bar">
          {colorRatio.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent / 100,
                background: c.hex,
                borderRight: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div className="color-bar-labels">
          {colorRatio.map((c) => (
            <div key={c.hex} className="color-bar-label-item">
              <span
                className="color-bar-swatch"
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          <a href={`${basePath}/guidelines`} className="nav-card">
            <div className="card">
              <p className="section-label" style={{ color: primaryColor }}>
                GUIDELINES
              </p>
              <h2 className="section-title" style={{ fontSize: 20 }}>
                デザインガイドライン
              </h2>
              <p className="section-desc">
                カラー・タイポグラフィ・アクセシビリティなどのトンマナの基本方針を確認できます。
              </p>
            </div>
          </a>

          <a href={`${basePath}/components`} className="nav-card">
            <div className="card">
              <p className="section-label" style={{ color: primaryColor }}>
                COMPONENTS
              </p>
              <h2 className="section-title" style={{ fontSize: 20 }}>
                コンポーネント
              </h2>
              <p className="section-desc">
                UIUXのベースとなるコンポーネントを一覧化。Figmaと連動可能です。
              </p>
            </div>
          </a>
          <a
            href={`${basePath}/resources`}
            className="nav-card"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div className="card" style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '24px',
              cursor: 'pointer',
              flex: 1,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: '0.05em', marginBottom: 8 }}>
                RESOURCES
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                リソース
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