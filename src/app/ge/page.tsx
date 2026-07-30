import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ゼネラル・エレクトリック';
const basePath = '/ge';
const primaryColor: string = '#0071BC';

const colorRatios = [
  { hex: '#0071BC', name: 'Primary Blue', pct: 40 },
  { hex: '#000000', name: 'Corporate Black', pct: 25 },
  { hex: '#FFFFFF', name: 'White', pct: 20 },
  { hex: '#333333', name: 'Text Black', pct: 10 },
  { hex: '#F0F0F0', name: 'Background Gray', pct: 5 },
];

export default function HomePage() {
  return (
    <div className="ge-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div className="hi-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            RESEARCH
          </div>
          <h1 className="hi-section-title">{clientName} リサーチ</h1>
          <p className="hi-section-desc">
            信頼感・先進性・誠実さを軸にした、伝統と革新が融合するガイドラインリサーチ資料です。
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
                ガイドラインリサーチ
              </h2>
              <p className="hi-section-desc" style={{ marginBottom: 0 }}>
                カラー、タイポグラフィ、トンマナなどデザインの基本方針を確認できます。
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
                デザインガイドラインに準拠したUIコンポーネントのサンプルとコードを確認できます。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}