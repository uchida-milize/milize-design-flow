import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName = 'パナソニック株式会社';
  const basePath = '/panasonic';
  const primaryColor: string = '#003DA5';

  const colorBars = [
    { color: '#FFFFFF', name: '背景色（白）', percent: 65, isWhite: true },
    { color: '#003DA5', name: 'プライマリブルー', percent: 15, isWhite: false },
    { color: '#333333', name: 'テキストカラー', percent: 15, isWhite: false },
    { color: '#E6E6E6', name: 'ボーダー・区切り線グレー', percent: 5, isWhite: false },
  ];

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="home" primaryColor={primaryColor} />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>RESEARCH</p>
          <h1 className="section-title" style={{ fontSize: 28 }}>{clientName} リサーチ</h1>
          <p className="section-desc">
            スクレイピングデータおよびガイドラインリサーチに基づく、{clientName}のデザインシステムリサーチ資料です。
          </p>
        </div>

        <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          {colorBars.map((c) => (
            <div
              key={c.color}
              style={{
                flex: c.percent / 100,
                background: c.color,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          {colorBars.map((c) => (
            <div key={c.color} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <span style={{
                width: 12, height: 12, borderRadius: 3, background: c.color,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none', display: 'inline-block'
              }} />
              <span className="swatch-hex" style={{ fontSize: 12 }}>{c.color}</span>
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Link href={`${basePath}/guidelines`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
              <h2 className="section-title" style={{ fontSize: 20 }}>ガイドラインリサーチ</h2>
              <p className="section-desc">カラー・タイポグラフィ・トンマナなどのデザイントークンを確認できます。</p>
            </div>
          </Link>
          <Link href={`${basePath}/components`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
              <h2 className="section-title" style={{ fontSize: 20 }}>コンポーネント</h2>
              <p className="section-desc">実装確認済みのコンポーネントと派生デザインを確認できます。</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}