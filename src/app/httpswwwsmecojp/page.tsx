import Link from 'next/link';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function Page() {
  const clientName: string = 'ソニー・ミュージックエンタテインメント';
  const basePath: string = '/httpswwwsmecojp';
  const primaryColor: string = '#1a1a1a';

  const colorRatios = [
    { hex: '#1a1a1a', name: 'プライマリブラック', percent: 40 },
    { hex: '#ffffff', name: 'ホワイト', percent: 40, isWhite: true },
    { hex: '#6b7280', name: 'グレー', percent: 20 },
  ];

  return (
    <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="section-title">{clientName} リサーチ</h1>
        <p className="section-desc">
          スクレイピングデータをもとに構築したガイドラインリサーチとコンポーネントを確認できます。
        </p>
      </div>

      <div
        style={{
          height: 32,
          borderRadius: 8,
          overflow: 'hidden',
          display: 'flex',
          marginBottom: 12,
        }}
      >
        {colorRatios.map((c) => (
          <div
            key={c.hex}
            style={{
              width: `${c.percent}%`,
              backgroundColor: c.hex,
              border: c.isWhite ? '1px solid #e5e7eb' : 'none',
            }}
          />
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
          <div key={c.hex} style={{ fontSize: 12, color: '#6b7280' }}>
            <span style={{ fontFamily: 'monospace', color: '#111827' }}>{c.hex}</span>{' '}
            {c.name}（{c.percent}%）
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        <Link href={`${basePath}/guidelines`} className="nav-card">
          <div className="portal-card">
            <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#111827' }}>
              ガイドラインリサーチ
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              カラー・タイポグラフィ・トンマナのリサーチ結果を掲載しています。
            </p>
          </div>
        </Link>

        <Link href={`${basePath}/components`} className="nav-card">
          <div className="portal-card">
            <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#111827' }}>
              コンポーネント
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              実装確認済みコンポーネントと派生デザインを確認できます。
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}