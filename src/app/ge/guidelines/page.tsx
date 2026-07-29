import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ゼネラル・エレクトリック';
const basePath = '/ge';
const primaryColor: string = '#3B73B9';

const colors = [
  { hex: '#3B73B9', name: 'Primary Blue' },
  { hex: '#000000', name: 'Corporate Black' },
  { hex: '#B7282E', name: 'Accent Red（水引）' },
  { hex: '#333333', name: 'Text Black' },
  { hex: '#f0f0f0', name: 'Background Gray' },
];

export default function GuidelinesPage() {
  return (
    <div className="ge-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div className="hi-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </div>
          <h1 className="hi-section-title">ガイドラインリサーチ</h1>
          <p className="hi-section-desc">
            {clientName}のデザインリサーチ資産、カラー、タイポグラフィ、トンマナを定義します。
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            COLOR
          </div>
          <h2 className="hi-section-title" style={{ fontSize: 20 }}>
            カラーガイドライン
          </h2>
          <p className="hi-section-desc">
            プライマリ、セカンダリ、アクセントカラーと使用比率の定義。
          </p>

          <div className="hi-swatch-grid">
            {colors.map((c) => (
              <div className="hi-card" style={{ padding: 0, overflow: 'hidden' }} key={c.hex}>
                <div
                  className="hi-swatch-top"
                  style={{
                    background: c.hex,
                    border: c.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <div className="hi-swatch-bottom" style={{ padding: '8px 12px 12px' }}>
                  <div className="hi-swatch-hex">{c.hex}</div>
                  <div className="hi-swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </div>
          <h2 className="hi-section-title" style={{ fontSize: 20 }}>
            タイポグラフィ
          </h2>
          <p className="hi-section-desc">見出し・本文フォントの方針。</p>

          <div className="hi-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="hi-swatch-name" style={{ marginBottom: 8 }}>
                見出しフォント（モダンで堅実なサンセリフ体）
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>
                信頼と革新をつなぐ、次世代の重工業へ
              </div>
            </div>
            <div>
              <div className="hi-swatch-name" style={{ marginBottom: 8 }}>
                本文フォント（読みやすさ重視のサンセリフ体）
              </div>
              <div style={{ fontSize: 14, color: '#333333', lineHeight: 1.8 }}>
                私たちは、グローバルな重工業企業として伝統と革新の融合を目指しています。
                安心感と先進性を兼ね備えた青を基調としたデザインで、世界中のお客様に信頼をお届けします。
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </div>
          <h2 className="hi-section-title" style={{ fontSize: 20 }}>
            トンマナ
          </h2>
          <p className="hi-section-desc">体現すべき3つのキーワード。</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {['信頼感', '先進性', '誠実さ'].map((word) => (
              <div className="hi-card" key={word} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: primaryColor }}>
                  {word}
                </div>
              </div>
            ))}
          </div>

          <div className="hi-card" style={{ marginTop: 16 }}>
            <p style={{ fontSize: 14, color: '#333333', lineHeight: 1.8 }}>
              伝統と革新が融合したゼネラル・エレクトリック。青を基調にした色使いで安心感と先進性を演出しつつ、
              日本市場向けには文化的要素（水引）を取り入れて誠意と親近感を表現。デジタル化・ユーザー体験向上に重きを置き、
              洗練されたシンプルかつ機能的なデザインで幅広い顧客層にアプローチしています。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}