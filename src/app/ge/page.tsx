import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '重工業株式会社';
const basePath = '/heavy-industries-corp';
const primaryColor: string = '#004A99';

const colorRatios = [
  { hex: '#004A99', name: 'Primary Blue', pct: 45 },
  { hex: '#000000', name: 'Corporate Black', pct: 25 },
  { hex: '#B7282E', name: 'Accent Red（水引）', pct: 10 },
  { hex: '#333333', name: 'Text Black', pct: 15 },
  { hex: '#f0f0f0', name: 'Background Gray', pct: 5 },
];

export default function HomePage() {
  return (
    <div className="heavy-industries-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div className="hi-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </div>
          <h1 className="hi-section-title">{clientName} ブランドポータル</h1>
          <p className="hi-section-desc">
            信頼感・先進性・誠実さを軸にした、伝統と革新が融合するブランドガイドラインです。
          </p>
        </div>

        <div className="hi-ratio-bar">
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.pct / 100,
                background: c.hex,
                border: c.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>

        <div className="hi-ratio-labels">
          {colorRatios.map((c) => (
            <div className="hi-ratio-label-item" key={c.hex}>
              <span
                className="hi-ratio-dot"
                style={{
                  background: c.hex,
                  border: c.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span className="hi-swatch-hex" style={{ fontSize: 12 }}>
                {c.hex}
              </span>
              <span>{c.name}</span>
              <span>{c.pct}%</span>
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
          <a href={`${basePath}/guidelines`} className="hi-nav-card">
            <div className="hi-card">
              <div className="hi-section-label" style={{ color: primaryColor }}>
                GUIDELINES
              </div>
              <h2 className="hi-section-title" style={{ fontSize: 20 }}>
                ブランドガイドライン
              </h2>
              <p className="hi-section-desc" style={{ marginBottom: 0 }}>
                カラー、タイポグラフィ、トンマナなどブランドの基本方針を確認できます。
              </p>
            </div>
          </a>

          <a href={`${basePath}/components`} className="hi-nav-card">
            <div className="hi-card">
              <div className="hi-section-label" style={{ color: primaryColor }}>
                COMPONENTS
              </div>
              <h2 className="hi-section-title" style={{ fontSize: 20 }}>
                コンポーネント集
              </h2>
              <p className="hi-section-desc" style={{ marginBottom: 0 }}>
                ブランドに準拠したUIコンポーネントのサンプルとコードを確認できます。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}