import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'Milize Asset Portal';
const basePath = '/milize-asset-portal';
const primaryColor: string = '#C0C0C0';

const colors = [
  { hex: '#C0C0C0', name: 'プライマリ シルバー' },
  { hex: '#000000', name: 'セカンダリ ブラック' },
  { hex: '#444444', name: 'アクセント ダークグレー' },
  { hex: '#FFFFFF', name: '背景 ホワイト' },
  { hex: '#7F7F7F', name: 'グレー系中間色' },
];

export default function GuidelinesPage() {
  return (
    <div className="milize-asset-portal-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </p>
          <h1 className="section-title">リサーチガイドライン</h1>
          <p className="section-desc">
            坂本龍馬の海援隊旗をモチーフにしたシンボリックなロゴと、時代を超えて輝くシルバー。
            明朝体による品格と誠実さの表現を軸とした指針です。
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
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>見出しフォント</p>
            <p
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: 32,
                fontWeight: 700,
                color: '#111827',
              }}
            >
              情報革命で、人々を幸せに。
            </p>
          </div>
          <div className="card">
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>本文フォント</p>
            <p
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: 16,
                lineHeight: 1.9,
                color: '#111827',
              }}
            >
              伝統と革新が融合したリサーチイメージ。時代を超えて輝くシルバーと、明朝体の書体で品格と誠実さを表現し、未来志向で挑戦し続ける姿勢を体現します。
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
            {['情報革命', '未来志向', '誠実さ'].map((kw) => (
              <div className="card" key={kw} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: primaryColor === '#FFFFFF' ? '#000' : '#111827' }}>
                  {kw}
                </p>
              </div>
            ))}
          </div>
          <div className="card">
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#6b7280' }}>
              伝統と革新が融合したリサーチイメージ。坂本龍馬の海援隊旗をモチーフにしたシンボリックなロゴに、時代を超えて輝くシルバーを使い、明朝体の書体で品格と誠実さを表現。情報革命を通じて社会に貢献し、未来志向で挑戦し続ける姿勢が感じられます。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}