import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName: string = 'Apple';
  const basePath: string = '/apple';
  const primaryColor: string = '#0071e3';

  const colorRatios = [
    { hex: '#fafafc', name: '背景色', percent: 55, isWhiteBorder: false },
    { hex: '#000000', name: 'テキスト・ロゴカラー', percent: 30, isWhiteBorder: false },
    { hex: '#0071e3', name: 'プライマリ（CTA/リンク）', percent: 10, isWhiteBorder: false },
    { hex: '#ffffff', name: 'ロゴ（ダークモード用）', percent: 5, isWhiteBorder: true },
  ];

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40 }}>
        <p className="section-label">RESEARCH</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>{clientName} リサーチ</h1>
        <p className="section-desc">
          {clientName} の公開情報をもとに独自にリサーチ・定義したガイドラインリサーチとコンポーネント一覧です。
        </p>
      </div>

      {/* カラー使用比率バー */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            height: 32,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent / 100,
                backgroundColor: c.hex,
                border: c.isWhiteBorder ? '1px solid #e5e7eb' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  backgroundColor: c.hex,
                  border: c.isWhiteBorder ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span style={{ fontFamily: 'monospace' }}>{c.hex}</span>
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Link href={`${basePath}/guidelines`}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <p className="section-label">GUIDELINES</p>
            <h2 className="section-title" style={{ fontSize: 20 }}>ガイドラインリサーチ</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              カラー・タイポグラフィ・トンマナなどのガイドラインリサーチを掲載しています。
            </p>
          </div>
        </Link>
        <Link href={`${basePath}/components`}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <p className="section-label">COMPONENTS</p>
            <h2 className="section-title" style={{ fontSize: 20 }}>コンポーネント</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              実装確認済みコンポーネントと派生デザイン（想定）を掲載しています。
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}