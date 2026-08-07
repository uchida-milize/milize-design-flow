import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '株式会社MILIZE';
const basePath = '/milize';
const primaryColor: string = '#004A99';

const colors = [
  { hex: '#004A99', name: 'プライマリカラー' },
  { hex: '#333333', name: 'セカンダリカラー' },
  { hex: '#F5A623', name: 'アクセントカラー' },
  { hex: '#FFFFFF', name: '背景カラー' },
  { hex: '#7F7F7F', name: 'サブカラー' },
];

export default function GuidelinesPage() {
  return (
    <div className="milize-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>

        {/* SAMPLEバナー */}
        <div style={{
          background: '#fff7ed',
          border: '1px solid #fed7aa',
          borderRadius: 10,
          padding: '12px 20px',
          marginBottom: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{
            background: '#f97316',
            color: '#fff',
            borderRadius: 4,
            padding: '2px 10px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>SAMPLE</span>
          <span style={{ fontSize: 13, color: '#9a3412', lineHeight: 1.6 }}>
            このページはテンプレートのサンプルです。実際のクライアントポータルでは、Difyによって自動生成されたコンテンツが表示されます。
          </span>
        </div>

        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </p>
          <h1 className="section-title">リサーチガイドライン</h1>
          <p className="section-desc">
            クライアントのブランドカラー・タイポグラフィ・トンマナをまとめたガイドラインのサンプルです。
            実際のポータルでは、収集したリサーチ情報をもとに内容が自動生成されます。
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COLOR
          </p>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
            カラーパレット
          </h2>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div className="swatch" key={c.hex}>
                <div
                  className="swatch-color"
                  style={{
                    background: c.hex,
                    borderBottom: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
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

        <section style={{ marginBottom: 48 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </p>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
            タイポグラフィ
          </h2>
          <div className="card" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>見出しフォント（サンプル）</p>
            <p
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#111827',
              }}
            >
              見出しテキストのサンプルです。
            </p>
          </div>
          <div className="card">
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>本文フォント（サンプル）</p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.9,
                color: '#111827',
              }}
            >
              本文テキストのサンプルです。実際のポータルでは、クライアントのリサーチ情報をもとに生成されたブランドコピーやガイドライン文章が表示されます。読みやすさと一貫性を意識したタイポグラフィを設定します。
            </p>
          </div>
        </section>

        <section>
          <p className="section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </p>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
            トンマナ
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {['キーワード A', 'キーワード B', 'キーワード C'].map((kw) => (
              <div className="card" key={kw} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
                  {kw}
                </p>
              </div>
            ))}
          </div>
          <div className="card">
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#6b7280' }}>
              トンマナの説明テキストのサンプルです。実際のポータルでは、収集したWebサイトのデザイン情報をもとにクライアントのブランドイメージやトーン＆マナーを自動生成・一覧化します。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
