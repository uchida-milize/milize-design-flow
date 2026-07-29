import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function Page() {
  const clientName = "トヨタ自動車株式会社";
  const basePath = "/toyota";
  const primaryColor = "#EB0A1E";

  const colorRatios = [
    { hex: "#EB0A1E", name: "トヨタレッド", ratio: 35 },
    { hex: "#000000", name: "ブラック", ratio: 20 },
    { hex: "#FFFFFF", name: "ホワイト", ratio: 25 },
    { hex: "#333333", name: "ダークグレー", ratio: 15 },
    { hex: "#F8F8F8", name: "ライトグレー", ratio: 5 },
  ];

  return (
    <div className="toyota-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div className="container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            RESEARCH
          </div>
          <div className="section-title">{clientName} リサーチ</div>
          <div className="section-desc">
            信頼感・先進性・親しみやすさを軸としたガイドラインリサーチとコンポーネントです。
          </div>
        </div>

        <div className="color-bar">
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.ratio / 100,
                background: c.hex,
                border: c.hex === "#FFFFFF" ? "1px solid #e5e7eb" : "none",
              }}
            />
          ))}
        </div>

        <div className="color-bar-labels">
          {colorRatios.map((c) => (
            <div className="color-bar-label-item" key={c.hex}>
              <span
                className="color-bar-dot"
                style={{
                  background: c.hex,
                  border: c.hex === "#FFFFFF" ? "1px solid #e5e7eb" : "none",
                }}
              />
              <span>{c.hex}</span>
              <span>{c.name}</span>
              <span>{c.ratio}%</span>
            </div>
          ))}
        </div>

        <div className="nav-grid">
          <a href={`${basePath}/guidelines`} className="nav-card">
            <div className="nav-card-title">ガイドラインリサーチ</div>
            <div className="nav-card-desc">
              カラーガイドライン、タイポグラフィ、トンマナなどのデザインガイドラインリサーチを確認できます。
            </div>
          </a>
          <a href={`${basePath}/components`} className="nav-card">
            <div className="nav-card-title">コンポーネント</div>
            <div className="nav-card-desc">
              ボタンやカードなど、実装済みのコンポーネントを確認できます。
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
