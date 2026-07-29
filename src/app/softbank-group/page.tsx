import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/softbank-group';
const primaryColor: string = '#C0C0C0';

const colorRatio = [
  { hex: '#C0C0C0', name: 'シルバー', percent: 35 },
  { hex: '#000000', name: 'ブラック', percent: 30 },
  { hex: '#444444', name: 'ダークグレー', percent: 15 },
  { hex: '#FFFFFF', name: 'ホワイト', percent: 15 },
  { hex: '#7F7F7F', name: 'グレー系中間色', percent: 5 },
];

export default function Home() {
  return (
    <div className="softbank-group-portal">
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
          <h1 className="section-title">{clientName} ブランドポータル</h1>
          <p className="section-desc">
            情報革命・未来志向・誠実さを軸にした、伝統と革新が融合するブランドガイドラインです。
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
                ブランドガイドライン
              </h2>
              <p className="section-desc">
                カラー・タイポグラフィ・トンマナなど、ブランドの基本方針を確認できます。
              </p>
            </div>
          </a>

          <a href={`${basePath}/components`} className="nav-card">
            <div className="card">
              <p className="section-label" style={{ color: primaryColor }}>
                COMPONENTS
              </p>
              <h2 className="section-title" style={{ fontSize: 20 }}>
                コンポーネント集
              </h2>
              <p className="section-desc">
                ブランドカラーとタイポグラフィを反映したUIコンポーネントのサンプルです。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}