import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#0055A4';

const colorRatios = [
  { hex: '#0055A4', name: 'Primary Blue', percent: 38 },
  { hex: '#00A0E9', name: 'Secondary Blue', percent: 22 },
  { hex: '#F5A623', name: 'Accent Orange', percent: 12 },
  { hex: '#333333', name: 'Text Black', percent: 18 },
  { hex: '#FFFFFF', name: 'Background White', percent: 10 },
];

export default function HomePage() {
  return (
    <div className="sharp-finance-corp-portal">
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
        </div>
      </div>
    </div>
  );
}