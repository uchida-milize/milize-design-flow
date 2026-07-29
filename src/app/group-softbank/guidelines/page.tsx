import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/group-softbank';
const primaryColor: string = '#000000';

const brandColors = [
  { hex: '#000000', name: 'プライマリ（ブラック）' },
  { hex: '#FFFFFF', name: 'セカンダリ（ホワイト）' },
  { hex: '#FF0000', name: 'アクセント（レッド）' },
  { hex: '#666666', name: 'グレー（テキスト・アイコン）' },
];

export default function GuidelinesPage() {
  return (
    <div className="group-softbank-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
          <h1 className="section-title">ブランドガイドライン</h1>
          <p className="section-desc">
            シンプルかつ洗練されたモノトーン基調に、アクセントレッドを効果的に用いたトンマナを定義します。
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 16 }}>
            <p className="section-label" style={{ color: primaryColor }}>COLOR PALETTE</p>
            <h2 className="section-title" style={{ fontSize: 20 }}>ブランドカラー</h2>
            <p className="section-desc">プライマリ・セカンダリ・アクセントカラーの構成</p>
          </div>
          <div className="color-swatch-grid">
            {brandColors.map((c) => (
              <div key={c.hex} className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div
                  className="color-swatch-top"
                  style={{
                    background: c.hex,
                    border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <div className="color-swatch-bottom">
                  <div className="color-swatch-hex">{c.hex}</div>
                  <div className="color-swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 16 }}>
            <p className="section-label" style={{ color: primaryColor }}>TYPOGRAPHY</p>
            <h2 className="section-title" style={{ fontSize: 20 }}>タイポグラフィ</h2>
            <p className="section-desc">日本語ウェブ標準のモダンなサンセリフ体を採用</p>
          </div>
          <div className="portal-card">
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>見出しフォント</p>
            <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
              先進的、信頼感、シンプル。
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>本文フォント</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
              ヒラギノ角ゴシック、メイリオ等の読みやすいサンセリフ体を使用し、
              情報を整理してアクセスしやすく親しみやすい印象を実現します。
            </p>
          </div>
        </section>

        <section>
          <div style={{ marginBottom: 16 }}>
            <p className="section-label" style={{ color: primaryColor }}>TONE &amp; MANNER</p>
            <h2 className="section-title" style={{ fontSize: 20 }}>トンマナ</h2>
            <p className="section-desc">3つのキーワードで構成されるブランド印象</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {['先進的', '信頼感', 'シンプル'].map((kw) => (
              <div key={kw} className="portal-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{kw}</div>
              </div>
            ))}
          </div>
          <div className="portal-card" style={{ marginTop: 16 }}>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
              シンプルかつ洗練されたモノトーン基調のデザインをベースに、アクセントとして赤色を効果的に使用。
              先進的な技術イメージを伝えつつ、信頼性と透明性の高さを感じさせるトンマナ。
              全体的に情報が整理されており、アクセスしやすく親しみやすい印象を与えます。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}