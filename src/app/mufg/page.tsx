import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function Home() {
  const clientName: string = '三菱UFJフィナンシャル・グループ';
  const basePath: string = '/mufg';
  const primaryColor: string = '#C8102E';

  const colorRatios = [
    { hex: '#FFFFFF', name: '背景（ホワイト系）', percent: 70, isWhite: true },
    { hex: '#333333', name: 'テキスト（ダークグレー〜ブラック系）', percent: 15, isWhite: false },
    { hex: '#C8102E', name: 'MUFGレッド（ロゴ・シンボルマーク）', percent: 10, isWhite: false },
    { hex: '#9CA3AF', name: 'その他（画像・写真領域）', percent: 5, isWhite: false },
  ];

  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '48px' }}>
        <div className="section-label" style={{ color: primaryColor }}>
          RESEARCH
        </div>
        <h1 className="section-title" style={{ fontSize: '32px' }}>
          {clientName} リサーチ
        </h1>
        <p className="section-desc">
          スクレイピングデータおよび視覚的観察に基づくガイドラインリサーチとコンポーネントの整理です。
        </p>
      </section>

      <section style={{ marginTop: '40px' }}>
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
                flex: `${c.percent} 0 0`,
                background: c.hex,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  background: c.hex,
                  border: c.isWhite ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {c.hex} {c.name} ({c.percent}%)
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
      >
        <a href={`${basePath}/guidelines`} className="card" style={{ display: 'block' }}>
          <div className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </div>
          <h2 className="section-title" style={{ fontSize: '20px' }}>
            ガイドラインリサーチ
          </h2>
          <p className="section-desc">カラー・タイポグラフィ・トンマナの調査結果</p>
        </a>

        <a href={`${basePath}/components`} className="card" style={{ display: 'block' }}>
          <div className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </div>
          <h2 className="section-title" style={{ fontSize: '20px' }}>
            コンポーネント
          </h2>
          <p className="section-desc">実装確認済み・想定コンポーネントの一覧</p>
        </a>
      </section>
    </div>
  );
}