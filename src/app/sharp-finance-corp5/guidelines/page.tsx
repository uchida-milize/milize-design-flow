import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance';
const primaryColor = '#004A99';

const colorRatios = [
  { hex: '#004A99', name: 'Primary Blue', ratio: 40 },
  { hex: '#0071BC', name: 'Secondary Blue', ratio: 25 },
  { hex: '#F5A623', name: 'Accent Orange', ratio: 15 },
  { hex: '#333333', name: 'Text Black', ratio: 12 },
  { hex: '#f0f0f0', name: 'Background Gray', ratio: 8 },
];

export default function GuidelinesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontSize: 32, color: '#004A99', marginBottom: 8 }}>
          ブランドガイドライン
        </h1>
        <p style={{ fontSize: 16, color: '#333333', marginBottom: 48 }}>
          信頼感、成長、挑戦——シャープファイナンスのブランドを支える基本要素です。
        </p>

        {/* カラーセクション */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            ブランドカラー
          </h2>

          <div className="color-ratio-bar" style={{ marginBottom: 12 }}>
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                className="color-ratio-segment"
                style={{ width: `${c.ratio}%`, background: c.hex }}
              >
                {c.ratio}%
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 40,
            }}
          >
            {colorRatios.map((c) => (
              <div key={c.hex} style={{ fontSize: 13, color: '#333333' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: c.hex,
                    marginRight: 6,
                  }}
                />
                {c.hex}（{c.ratio}%）
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
            }}
          >
            {[
              { hex: '#004A99', label: 'プライマリカラー', desc: 'コーポレートブルー' },
              { hex: '#0071BC', label: 'セカンダリカラー', desc: 'アクセントブルー' },
              { hex: '#F5A623', label: 'アクセントカラー', desc: 'オレンジ' },
              { hex: '#333333', label: 'テキストカラー', desc: '本文用グレー' },
              { hex: '#f0f0f0', label: '背景色', desc: 'ライトグレー' },
            ].map((c) => (
              <div
                key={c.hex}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ height: 80, background: c.hex }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#333333' }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                    {c.desc}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#333333',
                      marginTop: 4,
                      fontFamily: 'monospace',
                    }}
                  >
                    {c.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィセクション */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            タイポグラフィ
          </h2>
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              marginBottom: 24,
            }}
          >
            <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
              見出しフォント
            </p>
            <h3 style={{ fontSize: 28, color: '#333333', marginBottom: 16 }}>
              シャープファイナンス株式会社
            </h3>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
              本文フォント
            </p>
            <p style={{ fontSize: 16, color: '#333333' }}>
              信頼感を基盤に、未来へ挑戦し続ける成長企業として、法人のお客様に安心と革新をお届けします。
            </p>
          </div>
        </section>

        {/* トンマナセクション */}
        <section>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            トンマナ
          </h2>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 24,
              flexWrap: 'wrap',
            }}
          >
            {['信頼感', '成長', '挑戦'].map((word) => (
              <span
                key={word}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  background: '#004A99',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #F5A623',
            }}
          >
            <p style={{ fontSize: 15, color: '#333333' }}>
              シャープファイナンス株式会社は、伝統的な信頼感を基盤にしつつ未来へ挑戦・成長し続ける姿勢を表現。ロゴの3つの円は「三方よし」の理念と成長の輪を象徴し、色使いは落ち着いたブルーを基調に高級感と親しみやすさを両立しています。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}