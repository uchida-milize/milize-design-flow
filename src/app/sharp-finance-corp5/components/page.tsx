import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance';
const primaryColor = '#004A99';

const colorRatios = [
  { hex: '#004A99', ratio: 40 },
  { hex: '#0071BC', ratio: 25 },
  { hex: '#F5A623', ratio: 15 },
  { hex: '#333333', ratio: 12 },
  { hex: '#f0f0f0', ratio: 8 },
];

export default function ComponentsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontSize: 32, color: '#004A99', marginBottom: 8 }}>
          UIコンポーネント
        </h1>
        <p style={{ fontSize: 16, color: '#333333', marginBottom: 48 }}>
          ブランドカラーとトンマナを反映した実装用UIパーツ集です。
        </p>

        {/* カラー比率帯 */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            カラー使用比率
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
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
        </section>

        {/* ボタン */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            ボタン
          </h2>
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                padding: '12px 28px',
                background: '#004A99',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              プライマリボタン
            </button>
            <button
              style={{
                padding: '12px 28px',
                background: '#0071BC',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              セカンダリボタン
            </button>
            <button
              style={{
                padding: '12px 28px',
                background: '#F5A623',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              アクセントボタン
            </button>
            <button
              style={{
                padding: '12px 28px',
                background: 'transparent',
                color: '#004A99',
                border: '2px solid #004A99',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              アウトラインボタン
            </button>
          </div>
        </section>

        {/* カード */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            カード
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #004A99',
              }}
            >
              <h3 style={{ fontSize: 18, color: '#004A99', marginBottom: 8 }}>
                信頼感
              </h3>
              <p style={{ fontSize: 14, color: '#333333' }}>
                伝統に裏打ちされた安心のサービス基盤をご提供します。
              </p>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #0071BC',
              }}
            >
              <h3 style={{ fontSize: 18, color: '#0071BC', marginBottom: 8 }}>
                成長
              </h3>
              <p style={{ fontSize: 14, color: '#333333' }}>
                お客様とともに歩む、持続的な成長のパートナーです。
              </p>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #F5A623',
              }}
            >
              <h3 style={{ fontSize: 18, color: '#F5A623', marginBottom: 8 }}>
                挑戦
              </h3>
              <p style={{ fontSize: 14, color: '#333333' }}>
                新しい価値創造に向けて、常に挑戦を続けます。
              </p>
            </div>
          </div>
        </section>

        {/* フォーム */}
        <section>
          <h2 style={{ fontSize: 24, color: '#004A99', marginBottom: 24 }}>
            フォーム要素
          </h2>
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              maxWidth: 480,
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: 13,
                color: '#333333',
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              会社名
            </label>
            <input
              type="text"
              placeholder="シャープファイナンス株式会社"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ccc',
                borderRadius: 6,
                fontSize: 14,
                marginBottom: 20,
                color: '#333333',
              }}
            />
            <label
              style={{
                display: 'block',
                fontSize: 13,
                color: '#333333',
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              お問い合わせ内容
            </label>
            <textarea
              placeholder="ご相談内容をご記入ください"
              rows={4}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ccc',
                borderRadius: 6,
                fontSize: 14,
                marginBottom: 20,
                color: '#333333',
                fontFamily: 'inherit',
              }}
            />
            <button
              style={{
                padding: '12px 32px',
                background: '#004A99',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              送信する
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}