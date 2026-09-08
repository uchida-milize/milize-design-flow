import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName: string = 'Sony Pictures';
  const basePath: string = '/sonypictures';
  const primaryColor: string = '#000000';

  const colorRatio = [
    { color: '#FFFFFF', name: 'ホワイト', pct: 60, border: true },
    { color: '#000000', name: 'ブラック', pct: 30, border: false },
    { color: '#E60012', name: 'レッド系（推定）', pct: 10, border: false },
  ];

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="portal-section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="portal-section-title" style={{ fontSize: 32 }}>{clientName} リサーチ</h1>
        <p className="portal-section-desc">
          Sony Picturesのガイドラインリサーチおよびコンポーネントリサーチのまとめです。
        </p>

        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden' }}>
            {colorRatio.map((c) => (
              <div
                key={c.name}
                style={{
                  flex: c.pct / 100,
                  background: c.color,
                  border: c.border ? '1px solid #e5e7eb' : 'none',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
            {colorRatio.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: c.color,
                    border: c.border ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                  {c.color} {c.name} {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginTop: 40,
          }}
        >
          <Link href={`${basePath}/guidelines`}>
            <div className="portal-card" style={{ cursor: 'pointer', height: '100%' }}>
              <p className="portal-section-label" style={{ color: primaryColor }}>GUIDELINES</p>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>ガイドラインリサーチ</h2>
              <p className="portal-section-desc">
                カラー・タイポグラフィ・トンマナなどのガイドラインリサーチを確認する
              </p>
            </div>
          </Link>
          <Link href={`${basePath}/components`}>
            <div className="portal-card" style={{ cursor: 'pointer', height: '100%' }}>
              <p className="portal-section-label" style={{ color: primaryColor }}>COMPONENTS</p>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>コンポーネント</h2>
              <p className="portal-section-desc">
                実装確認済みのコンポーネントと派生デザインを確認する
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}