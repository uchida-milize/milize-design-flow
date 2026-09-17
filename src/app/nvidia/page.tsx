import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function Home() {
  const clientName: string = 'NVIDIA';
  const basePath: string = '/nvidia';
  const primaryColor: string = '#77B801';

  const colorRatios = [
    { hex: '#FFFFFF', name: '背景白', percent: 38, needsBorder: true },
    { hex: '#333333', name: '本文テキスト', percent: 15, needsBorder: false },
    { hex: '#77B801', name: 'プライマリグリーン', percent: 8, needsBorder: false },
    { hex: '#006600', name: 'ダークグリーン', percent: 4, needsBorder: false },
    { hex: '#003EFF', name: 'アクセントブルー', percent: 6, needsBorder: false },
    { hex: '#002BB8', name: 'リンクブルー', percent: 5, needsBorder: false },
    { hex: '#CCCCCC', name: 'ボーダー・区切り線', percent: 10, needsBorder: false },
    { hex: '#AAAAAA', name: 'サブテキスト・アイコン', percent: 8, needsBorder: false },
    { hex: '#F7F7F7', name: 'セクション背景', percent: 6, needsBorder: false },
  ];

  return (
    <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>{clientName} リサーチ</h1>
        <p className="section-desc">
          {clientName}のガイドラインリサーチおよびコンポーネントをまとめたリサーチポータルです。
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden' }}>
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent,
                backgroundColor: c.hex,
                border: c.needsBorder ? '1px solid #e5e7eb' : 'none',
              }}
              title={`${c.name} ${c.hex} ${c.percent}%`}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  backgroundColor: c.hex,
                  border: c.needsBorder ? '1px solid #e5e7eb' : 'none',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: 'monospace' }}>{c.hex}</span>
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <a href={`${basePath}/guidelines`} className="nav-card">
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>ガイドラインリサーチ</h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            カラー・タイポグラフィ・トンマナなど、{clientName}のガイドラインリサーチを掲載しています。
          </p>
          <p style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: primaryColor }}>詳細を見る →</p>
        </a>
        <a href={`${basePath}/components`} className="nav-card">
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>コンポーネント</h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            実装確認済みのUIパーツと、デザイントークンを踏襲した派生デザインを掲載しています。
          </p>
          <p style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: primaryColor }}>詳細を見る →</p>
        </a>
      </section>
    </main>
  );
}