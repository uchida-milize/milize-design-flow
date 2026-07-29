import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープ株式会社';
const basePath = '/sharp-corp';
const primaryColor = '#E60012';

const colorRatios = [
  { hex: '#E60012', name: 'プライマリーレッド', percent: 35 },
  { hex: '#333333', name: 'テキストダークグレー', percent: 30 },
  { hex: '#0071BC', name: 'アクセントブルー', percent: 15 },
  { hex: '#FFFFFF', name: '背景ホワイト', percent: 15 },
  { hex: '#F5F5F5', name: 'ライトグレー背景', percent: 5 },
];

export default function Home() {
  return (
    <div className="sharp-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="section-label" style={{ color: primaryColor }}>BRAND PORTAL</div>
          <div className="section-title">{clientName} ブランドポータル</div>
          <div className="section-desc">
            「ひとの願いの、半歩先。」をスローガンに、誠意と創意、先進性、親近感を体現するブランドガイドラインです。
          </div>
        </div>

        <div className="ratio-bar">
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
        <div className="ratio-labels">
          {colorRatios.map((c) => (
            <div className="ratio-label-item" key={c.hex}>
              <div
                className="ratio-label-swatch"
                style={{
                  background: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span>{c.hex} {c.name} {c.percent}%</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <a href={`${basePath}/guidelines`} className="nav-card">
            <div className="nav-card-title">ガイドライン</div>
            <div className="nav-card-desc">ブランドカラー、タイポグラフィ、トンマナなどのブランド基本要素を確認できます。</div>
          </a>
          <a href={`${basePath}/components`} className="nav-card">
            <div className="nav-card-title">コンポーネント</div>
            <div className="nav-card-desc">ボタンやカードなど、UIコンポーネントの実装例とコードを確認できます。</div>
          </a>
        </div>
      </div>
    </div>
  );
}