import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const colorRatios = [
  { hex: '#004A99', name: 'Primary Blue', ratio: 40 },
  { hex: '#0071BC', name: 'Secondary Blue', ratio: 25 },
  { hex: '#F5A623', name: 'Accent Orange', ratio: 15 },
  { hex: '#333333', name: 'Text Black', ratio: 12 },
  { hex: '#F0F0F0', name: 'Background Gray', ratio: 8 },
];

export default function GuidelinesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F0F0F0' }}>
      <ClientPortalHeader
        clientName="サンプル株式会社"
        basePath="/sample-client"
        active="guidelines"
        primaryColor="#004A99"
      />

      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '56px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#004A99', marginBottom: '8px' }}>
          ブランドガイドライン
        </h1>
        <p style={{ fontSize: '15px', color: '#333333', marginBottom: '48px' }}>
          信頼感・成長・挑戦をキーワードに、堅実さと革新性を両立するブランド資産をご紹介します。
        </p>

        {/* カラーセクション */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '22px', color: '#004A99', marginBottom: '24px' }}>
            ブランドカラー
          </h2>

          {/* 使用比率横帯 */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '64px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                style={{
                  width: `${c.ratio}%`,
                  background: c.hex,
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
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
                <div>{c.name}</div>
                <div>{c.ratio}%</div>
              </div>
            ))}
          </div>

          {/* カラーカード */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {colorRatios.map((c) => (
              <div
                key={c.hex}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ height: '90px', background: c.hex }} />
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#333333' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#333333' }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィ */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '22px', color: '#004A99', marginBottom: '24px' }}>
            タイポグラフィ
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{ fontSize: '12px', color: '#0071BC', marginBottom: '8px', fontWeight: 700 }}>
                見出しフォント
              </p>
              <p style={{ fontSize: '28px', color: '#333333', marginBottom: '8px' }}>
                信頼、成長、挑戦。
              </p>
              <p style={{ fontSize: '13px', color: '#333333' }}>
                モダンで読みやすいサンセリフ体（ヒラギノ角ゴシック等）
              </p>
            </div>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{ fontSize: '12px', color: '#0071BC', marginBottom: '8px', fontWeight: 700 }}>
                本文フォント
              </p>
              <p style={{ fontSize: '16px', color: '#333333', marginBottom: '8px', lineHeight: 1.8 }}>
                私たちは、社会や顧客を根本から支え、共に成長していくことを目指しています。堅実さと革新性を両立させ、挑戦を続けます。
              </p>
              <p style={{ fontSize: '13px', color: '#333333' }}>
                親しみやすく安定感のあるサンセリフ体
              </p>
            </div>
          </div>
        </section>

        {/* トンマナ */}
        <section>
          <h2 style={{ fontSize: '22px', color: '#004A99', marginBottom: '24px' }}>
            トンマナ
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            {['信頼感', '成長', '挑戦'].map((keyword) => (
              <span
                key={keyword}
                style={{
                  background: '#004A99',
                  color: '#FFFFFF',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #F5A623',
            }}
          >
            <p style={{ fontSize: '15px', color: '#333333', lineHeight: 1.9 }}>
              社会や顧客を根本から支え、成長を共に歩む姿勢を表現。深いブルーを基調に、明るいオレンジのアクセントで挑戦的かつ前向きなイメージを強調し、堅実さと革新性を両立させたブランドデザインです。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}