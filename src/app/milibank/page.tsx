import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName: string = 'みらいバンク';
const basePath: string = '/milibank';
const primaryColor: string = '#2a5ca8';

const colorRatios: { hex: string; name: string; percent: number }[] = [
  { hex: '#eef4fb', name: '背景色（淡いブルー）', percent: 60 },
  { hex: '#cccccc', name: '未実測（写真・アイコン・ロゴ等）', percent: 40 },
];

export default function Home() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '40px', marginBottom: '48px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          RESEARCH
        </p>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '8px',
          }}
        >
          {clientName} リサーチ
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          スクレイピングデータをもとにしたガイドラインリサーチおよびコンポーネントの確認ページです。
        </p>
      </section>

      {/* カラー使用比率バー */}
      <section style={{ marginBottom: '48px' }}>
        <div
          style={{
            display: 'flex',
            height: '32px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: `${c.percent / 100}`,
                background: c.hex,
                border:
                  c.hex.toLowerCase() === '#ffffff'
                    ? '1px solid #e5e7eb'
                    : 'none',
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '12px',
          }}
        >
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  background: c.hex,
                  border:
                    c.hex.toLowerCase() === '#ffffff'
                      ? '1px solid #e5e7eb'
                      : 'none',
                  display: 'inline-block',
                }}
              />
              <span
                style={{ fontSize: '12px', color: '#111827', fontFamily: 'monospace' }}
              >
                {c.hex}
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {c.name}
              </span>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                {c.percent}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ナビカード */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        <a
          href={`${basePath}/guidelines`}
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
            display: 'block',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: primaryColor,
              marginBottom: '8px',
            }}
          >
            GUIDELINES
          </p>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            ガイドラインリサーチ
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            カラー・タイポグラフィ・トンマナのリサーチ結果を確認できます。
          </p>
        </a>

        <a
          href={`${basePath}/components`}
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
            display: 'block',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: primaryColor,
              marginBottom: '8px',
            }}
          >
            COMPONENTS
          </p>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            コンポーネント
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            実装確認済みのコンポーネントと派生デザイン（想定）を確認できます。
          </p>
        </a>
      </section>
    </div>
  );
}