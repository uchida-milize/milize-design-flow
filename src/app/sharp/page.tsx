import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#FF0000';

const colorRatios = [
  { hex: '#FF0000', name: 'Primary Red', percent: 40 },
  { hex: '#000000', name: 'Black', percent: 20 },
  { hex: '#F5A623', name: 'Accent Orange', percent: 10 },
  { hex: '#333333', name: 'Text Dark Gray', percent: 20 },
  { hex: '#FFFFFF', name: 'Background White', percent: 10 },
];

export default function Page() {
  return (
    <div className="sharp-finance-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="portal-container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </div>
          <div className="section-title">{clientName} ブランドポータル</div>
          <div className="section-desc">
            ブランドガイドラインとUIコンポーネントを確認できます。
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
            <div key={c.hex} className="color-ratio-label-item">
              <span
                className="color-ratio-swatch"
                style={{
                  background: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span>
                {c.hex}（{c.name}）{c.percent}%
              </span>
            </div>
          ))}
        </div>

        <div className="nav-grid">
          <a href={`${basePath}/guidelines`} className="nav-card">
            <div className="nav-card-title">ガイドライン</div>
            <div className="nav-card-desc">
              ブランドカラー、タイポグラフィ、トンマナなどのデザイン原則を確認できます。
            </div>
          </a>
          <a href={`${basePath}/components`} className="nav-card">
            <div className="nav-card-title">コンポーネント</div>
            <div className="nav-card-desc">
              ブランドに基づいたUIコンポーネントのサンプルを確認できます。
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}