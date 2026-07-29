import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName = "トヨタ自動車株式会社";
  const basePath = "/toyota";
  const primaryColor = "#EB0A1E";

  return (
    <div className="toyota-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div className="container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </div>
          <div className="section-title">コンポーネント</div>
          <div className="section-desc">
            実装済みのUIコンポーネント集です。
          </div>
        </div>

        <div style={{ paddingBottom: 48 }}>
          <div className="component-card">
            <div className="component-label">Button / Primary</div>
            <div className="component-render">
              <button
                className="btn-primary"
                style={{ background: primaryColor }}
              >
                お問い合わせ
              </button>
            </div>
            <div className="component-code">
              {`<button className="btn-primary">お問い合わせ</button>`}
            </div>
          </div>

          <div className="component-card">
            <div className="component-label">Button / Secondary</div>
            <div className="component-render">
              <button className="btn-secondary">詳しく見る</button>
            </div>
            <div className="component-code">
              {`<button className="btn-secondary">詳しく見る</button>`}
            </div>
          </div>

          <div className="component-card">
            <div className="component-label">Button / Outline</div>
            <div className="component-render">
              <button
                className="btn-outline"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                資料請求
              </button>
            </div>
            <div className="component-code">
              {`<button className="btn-outline">資料請求</button>`}
            </div>
          </div>

          <div className="component-card">
            <div className="component-label">Card / Basic</div>
            <div className="component-render">
              <div className="card" style={{ maxWidth: 320 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: "#111827" }}>
                  新型モデル発表
                </div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  最新のハイブリッド技術を搭載した新型モデルの詳細情報です。
                </div>
              </div>
            </div>
            <div className="component-code">
              {`<div className="card">...</div>`}
            </div>
          </div>

          <div className="component-card">
            <div className="component-label">Badge / Tag</div>
            <div className="component-render">
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: primaryColor,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                NEW
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "#000000",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                HYBRID
              </span>
            </div>
            <div className="component-code">
              {`<span className="badge">NEW</span>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}