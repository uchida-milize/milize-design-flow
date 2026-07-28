import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '日立製作所';
const basePath = '/hitachi';
const primaryColor = '#E60012';

const colorRatios = [
  { hex: '#E60012', name: '日立レッド（プライマリ）', ratio: 40 },
  { hex: '#000000', name: 'ブラック（セカンダリ）', ratio: 20 },
  { hex: '#0071BC', name: 'ブルー（アクセント）', ratio: 15 },
  { hex: '#333333', name: 'ダークグレー（テキスト）', ratio: 15 },
  { hex: '#FFFFFF', name: 'ホワイト（背景）', ratio: 10 },
];

export default function GuidelinesPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <main className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </p>
          <h1 className="section-title">ブランドガイドライン</h1>
          <p className="section-desc">
            日立ブランドの基本方針（カラー、タイポグラフィ、トンマナ）を掲載しています。
          </p>
        </div>

        {/* カラーセクション */}
        <section style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COLOR
          </p>
          <h2 className="section-title">ブランドカラー</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            伝統的かつ力強い赤を基調に、黒やブルーをアクセントとして使用します。
          </p>

          <div className="color-ratio-bar">
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                style={{
                  width: `${c.ratio}%`,
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
                  {c.hex}（{c.ratio}%）
                </span>
              </div>
            ))}
          </div>

          <div className="swatch-grid">
            {colorRatios.map((c) => (
              <div className="swatch-item" key={c.hex}>
                <div
                  className="swatch-color"
                  style={{
                    background: c.hex,
                    border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <div className="swatch-info">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィ */}
        <section style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </p>
          <h2 className="section-title">タイポグラフィ</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            視認性と安定感を重視したゴシック体を使用します。
          </p>

          <div className="card" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>見出しフォント</p>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              日立の技術で、社会を支える。
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              ヒラギノ角ゴシック、または類似のサンセリフ体
            </p>
          </div>

          <div className="card">
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>本文フォント</p>
            <p style={{ fontSize: 16, color: '#333333', lineHeight: 1.8, marginBottom: 8 }}>
              日立のブランドは、伝統的かつ力強い赤を基調に、黒やブルーをアクセントに用いることで信頼性と先進技術を表現しています。
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              ヒラギノ角ゴシック、または類似のサンセリフ体
            </p>
          </div>
        </section>

        {/* トンマナ */}
        <section>
          <p className="section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </p>
          <h2 className="section-title">トンマナ</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            信頼感・先進性・サステナビリティを軸としたブランド表現。
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {['信頼感', '先進性', 'サステナビリティ'].map((kw) => (
              <div className="card" key={kw} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: primaryColor }}>{kw}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <p style={{ fontSize: 14, color: '#333333', lineHeight: 1.9 }}>
              日立のブランドは、伝統的かつ力強い赤を基調に、黒やブルーをアクセントに用いることで信頼性と先進技術を表現しています。白背景による明快で清潔感のあるデザインにより、情報の視認性が高く、サステナブルな社会実現への意志が感じられる堅実かつ未来志向のトンマナです。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}