import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'DeNA株式会社';
const basePath = '/dena';
const primaryColor = '#000000';

const colorRatios = [
  { hex: '#000000', name: 'ブラック', percent: 40, isWhite: false },
  { hex: '#FFFFFF', name: 'ホワイト', percent: 35, isWhite: true },
  { hex: '#00B3E6', name: 'ブランドブルー', percent: 12, isWhite: false },
  { hex: '#00C5CD', name: 'シアン系', percent: 7, isWhite: false },
  { hex: '#00D193', name: 'グリーン系', percent: 3, isWhite: false },
  { hex: '#FF6B6B', name: 'レッド系', percent: 3, isWhite: false },
];

export default function Page() {
  return (
    <div className="dena-portal">
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
          <h1 className="page-title">{clientName} ブランドポータル</h1>
          <p className="page-sub">
            スマート、ユニーク、実直。ブランドガイドラインとコンポーネントをご確認いただけます。
          </p>
        </div>

        <div className="content-section">
          <div className="color-ratio-bar">
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                style={{
                  flex: c.percent,
                  backgroundColor: c.hex,
                  border: c.isWhite ? '1px solid #e5e7eb' : 'none',
                }}
              />
            ))}
          </div>
          <div className="color-ratio-labels">
            {colorRatios.map((c) => (
              <div className="color-ratio-label-item" key={c.hex}>
                <span
                  className="color-ratio-dot"
                  style={{
                    backgroundColor: c.hex,
                    border: c.isWhite ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <span>
                  {c.hex} {c.name} {c.percent}%
                </span>
              </div>
            ))}
          </div>

          <div className="nav-grid">
            <a href={`${basePath}/guidelines`} className="nav-card">
              <div className="section-label" style={{ color: primaryColor }}>
                GUIDELINES
              </div>
              <div className="section-title" style={{ marginBottom: 0 }}>
                ブランドガイドライン
              </div>
              <p className="section-desc" style={{ marginBottom: 0 }}>
                カラー、タイポグラフィ、トンマナなどブランドの基本ルールをご確認いただけます。
              </p>
            </a>
            <a href={`${basePath}/components`} className="nav-card">
              <div className="section-label" style={{ color: primaryColor }}>
                COMPONENTS
              </div>
              <div className="section-title" style={{ marginBottom: 0 }}>
                コンポーネント集
              </div>
              <p className="section-desc" style={{ marginBottom: 0 }}>
                UIコンポーネントのサンプルとコードスニペットをご確認いただけます。
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}