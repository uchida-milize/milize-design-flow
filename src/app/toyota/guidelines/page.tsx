import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName = "トヨタ自動車株式会社";
  const basePath = "/toyota";
  const primaryColor = "#EB0A1E";

  const colors = [
    { hex: "#EB0A1E", name: "プライマリ（トヨタレッド）" },
    { hex: "#000000", name: "セカンダリ（ブラック）" },
    { hex: "#FFFFFF", name: "アクセント（ホワイト）" },
    { hex: "#333333", name: "テキストカラー" },
    { hex: "#F8F8F8", name: "背景色" },
  ];

  return (
    <div className="toyota-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div className="container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </div>
          <div className="section-title">デザインガイドライン</div>
          <div className="section-desc">
            ブランドカラー、タイポグラフィ、トンマナを定義します。
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            COLORS
          </div>
          <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
            ブランドカラー
          </div>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div className="swatch" key={c.hex}>
                <div className="swatch-color" style={{ background: c.hex }} />
                <div className="swatch-info">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </div>
          <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
            タイポグラフィ
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
              見出しフォント
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
              ヒラギノ角ゴシック / モダンサンセリフ体
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
              本文フォント
            </div>
            <div style={{ fontSize: 16, color: "#333333" }}>
              ヒラギノ角ゴシック、メイリオなどの読みやすい日本語サンセリフ体を使用します。信頼感と親しみやすさを両立する読みやすさを重視しています。
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </div>
          <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
            トンマナ
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            {["信頼感", "先進性", "親しみやすさ"].map((k) => (
              <span
                key={k}
                style={{
                  padding: "6px 16px",
                  borderRadius: 999,
                  background: "#f3f4f6",
                  color: primaryColor,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {k}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
            トヨタのブランドイメージにふさわしい、力強く洗練されたデザイン。赤を基調としたブランドカラーが躍動感と情熱を表現し、モダンでシンプルなレイアウトとタイポグラフィが信頼感と先進性を演出。画像や動画を効果的に使い、親しみやすくユーザーに伝わりやすい構成となっています。
          </div>
        </div>
      </div>
    </div>
  );
}