import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function Page() {
  const clientName: string = '株式会社ビデオリサーチ';
  const basePath: string = '/videor';
  const primaryColor: string = '#202945';

  const colorRatios = [
    { hex: '#202945', name: 'プライマリネイビー', percent: 15, isWhite: false },
    { hex: '#FFFFFF', name: '背景ホワイト', percent: 65, isWhite: true },
    { hex: '#000000', name: 'ロゴ黒・本文テキスト', percent: 15, isWhite: false },
    { hex: '#CCCCCC', name: 'バナー装飾色（推定）', percent: 5, isWhite: false },
  ];

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="home" primaryColor={primaryColor} />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="section-label" style={{ color: primaryColor }}>RESEARCH</div>
        <h1 className="section-title">{clientName} リサーチ</h1>
        <p className="section-desc">
          videor.co.jp のスクレイピングデータを基に整理したガイドラインリサーチとコンポーネントです。
        </p>

        <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent / 100,
                backgroundColor: c.hex,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c.hex, border: c.isWhite ? '1px solid #e5e7eb' : 'none', display: 'inline-block' }} />
              <span style={{ fontFamily: 'monospace' }}>{c.hex}</span>
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <a href={`${basePath}/guidelines`} className="card" style={{ display: 'block' }}>
            <div className="section-label" style={{ color: primaryColor }}>GUIDELINES</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>ガイドラインリサーチ</h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              カラー・タイポグラフィ・トンマナなどのガイドラインリサーチを確認できます。
            </p>
          </a>
          <a href={`${basePath}/components`} className="card" style={{ display: 'block' }}>
            <div className="section-label" style={{ color: primaryColor }}>COMPONENTS</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>コンポーネント</h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              実装確認済みおよび派生デザインのコンポーネントを確認できます。
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}