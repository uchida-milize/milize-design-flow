import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName: string = '株式会社MILIZE';
  const basePath: string = '/testrin';
  const primaryColor: string = '#4B5563';

  const colorSegments = [
    { color: '#e5e7eb', name: 'データなし（実測不可）', percent: 100 },
  ];

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="section-title" style={{ fontSize: 28 }}>{clientName} リサーチ</h1>
        <p className="section-desc">
          本リサーチは公式スクレイピングデータをもとに独自にまとめたガイドラインリサーチ資料です。
          カラー・タイポグラフィ等の実測デザイントークンが取得できなかった項目については「データなし」と明記しています。
        </p>

        <div
          style={{
            display: 'flex',
            height: 32,
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          {colorSegments.map((seg) => (
            <div
              key={seg.name}
              style={{
                flex: seg.percent / 100,
                background: seg.color,
                border: seg.color === '#ffffff' ? '1px solid #e5e7eb' : undefined,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          {colorSegments.map((seg) => (
            <div key={seg.name} style={{ fontSize: 12, color: '#6b7280' }}>
              <span style={{ fontFamily: 'monospace', color: '#111827' }}>{seg.color}</span>
              {' '}{seg.name}（{seg.percent}%）
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Link href={`${basePath}/guidelines`} className="nav-card">
            <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>ガイドラインリサーチ</h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              カラー・タイポグラフィ・トンマナ・ブランドアセット等をまとめたリサーチ資料です。
            </p>
          </Link>
          <Link href={`${basePath}/components`} className="nav-card">
            <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>コンポーネント</h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              実サイトから確認できたコンポーネントと、想定される派生デザインの一覧です。
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}