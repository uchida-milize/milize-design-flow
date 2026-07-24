import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const colorRatios = [
  { hex: '#004A99', name: 'Primary Blue', ratio: 40 },
  { hex: '#0071BC', name: 'Secondary Blue', ratio: 25 },
  { hex: '#F5A623', name: 'Accent Orange', ratio: 15 },
  { hex: '#333333', name: 'Text Black', ratio: 12 },
  { hex: '#F0F0F0', name: 'Background Gray', ratio: 8 },
];

export default function ComponentsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F0F0F0' }}>
      <ClientPortalHeader
        clientName="サンプル株式会社"
        basePath="/sample-client"
        active="components"
        primaryColor="#004A99"
      />

      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '56px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#004A99', marginBottom: '8px' }}>
          コンポーネント集
        </h1>
        <p style={{ fontSize: '15px', color: '#333333', marginBottom: '48px' }}>
          ブランドカラーに基づいたUIコンポーネントのサンプルです。
        </p>

        {/* カラーセクション（帯） */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', color: '#004A99', marginBottom: '16px' }}>
            カラーリファレンス
          </h2>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {colorRatios.map((c) => (
              <div key={c.hex} style={{ width: `${c.ratio}%`, background: c.hex }} />
            ))}
          </div>
          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                style={{
                  width: `${c.ratio}%`,
                  minWidth: '90px',
                  fontSize: '12px',
                  color: '#333333',
                  padding: '4px 8px',
                }}
              >
                <div style={{ fontWeight: 700 }}>{c.hex}</div>
                <div>{c.ratio}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* ボタン */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', color: '#004A99', marginBottom: '24px' }}>
            ボタン
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              style={{
                background: '#004A99',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Primary Button
            </button>
            <button
              style={{
                background: '#0071BC',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Secondary Button
            </button>
            <button
              style={{
                background: '#F5A623',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Accent Button
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#004A99',
                border: '2px solid #004A99',
                borderRadius: '6px',
                padding: '10px 26px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Outline Button
            </button>
          </div>
        </section>

        {/* カード */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', color: '#004A99', marginBottom: '24px' }}>
            カード
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #004A99',
              }}
            >
              <h3 style={{ fontSize: '16px', color: '#004A99', marginBottom: '8px' }}>
                信頼感
              </h3>
              <p style={{ fontSize: '13px', color: '#333333', lineHeight: 1.7 }}>
                堅実な深いブルーで、安心と信頼を伝えるカードデザインです。
              </p>
            </div>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #0071BC',
              }}
            >
              <h3 style={{ fontSize: '16px', color: '#0071BC', marginBottom: '8px' }}>
                成長
              </h3>
              <p style={{ fontSize: '13px', color: '#333333', lineHeight: 1.7 }}>
                鮮やかなブルーが前向きな成長の姿勢を表現します。
              </p>
            </div>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '4px solid #F5A623',
              }}
            >
              <h3 style={{ fontSize: '16px', color: '#F5A623', marginBottom: '8px' }}>
                挑戦
              </h3>
              <p style={{ fontSize: '13px', color: '#333333', lineHeight: 1.7 }}>
                明るいオレンジが挑戦的で前向きな印象を強めます。
              </p>
            </div>
          </div>
        </section>

        {/* タグ・バッジ */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', color: '#004A99', marginBottom: '24px' }}>
            タグ・バッジ
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: '#004A99',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Primary
            </span>
            <span
              style={{
                background: '#0071BC',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Secondary
            </span>
            <span
              style={{
                background: '#F5A623',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Accent
            </span>
            <span
              style={{
                background: '#F0F0F0',
                color: '#333333',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid #333333',
              }}
            >
              Default
            </span>
          </div>
        </section>

        {/* フォーム要素 */}
        <section>
          <h2 style={{ fontSize: '20px', color: '#004A99', marginBottom: '24px' }}>
            フォーム要素
          </h2>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <label style={{ fontSize: '13px', color: '#333333', fontWeight: 700 }}>
              お名前
              <input
                type="text"
                placeholder="山田 太郎"
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '6px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cccccc',
                  fontSize: '14px',
                }}
              />
            </label>
            <label style={{ fontSize: '13px', color: '#333333', fontWeight: 700 }}>
              メッセージ
              <textarea
                placeholder="お問い合わせ内容をご記入ください"
                rows={4}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '6px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cccccc',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </label>
            <button
              style={{
                background: '#F5A623',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 0',
                fontSize: '14px',
                fontWeight: 700,
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