import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/group-softbank';
const primaryColor = '#000000';

const colorRatios = [
  { hex: '#000000', name: 'ブラック（プライマリ）', percent: 45, border: false },
  { hex: '#FFFFFF', name: 'ホワイト（セカンダリ）', percent: 40, border: true },
  { hex: '#FF0000', name: 'アクセントレッド', percent: 10, border: false },
  { hex: '#666666', name: 'グレー（テキスト・アイコン）', percent: 5, border: false },
];

export default function HomePage() {
  return (
    <div className="group-softbank-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>BRAND PORTAL</p>
          <h1 className="section-title">{clientName} ブランドポータル</h1>
          <p className="section-desc">
            先進的・信頼感・シンプルをキーワードに、モノトーン基調にアクセントレッドを効かせたブランドガイドラインです。
          </p>
        </div>

        <div className="ratio-bar">
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent,
                background: c.hex,
                border: c.border ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>

        <div className="ratio-label-list">
          {colorRatios.map((c) => (
            <div key={c.hex} className="ratio-label-item">
              <span
                className="ratio-label-swatch"
                style={{
                  background: c.hex,
                  border: c.border ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span>{c.hex} / {c.name} / {c.percent}%</span>
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
            <div className="nav-card-title">ガイドライン</div>
            <p className="nav-card-desc">
              ブランドカラー、タイポグラフィ、トンマナなどのデザイン原則を確認できます。
            </p>
          </a>
          <a href={`${basePath}/components`} className="nav-card">
            <div className="nav-card-title">コンポーネント</div>
            <p className="nav-card-desc">
              ボタンやカードなど、実装済みのUIコンポーネント集を確認できます。
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}