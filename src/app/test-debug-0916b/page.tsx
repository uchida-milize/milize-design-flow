import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName: string = 'test-debug-0916b株式会社';
  const basePath: string = '/test-debug-0916b';
  const primaryColor: string = '#BE0026';

  const colorRatios = [
    { hex: '#FFFFFF', name: '背景・白', percent: 55, isWhite: true },
    { hex: '#141414', name: '本文テキスト', percent: 15, isWhite: false },
    { hex: '#585858', name: 'サブテキスト', percent: 8, isWhite: false },
    { hex: '#BE0026', name: 'プライマリ・アクセント', percent: 10, isWhite: false },
    { hex: '#F5F5F5', name: 'セクション背景', percent: 7, isWhite: false },
    { hex: '#E8E8E8', name: 'ボーダー・区切り', percent: 3, isWhite: false },
    { hex: '#FAE5EB', name: '強調背景', percent: 2, isWhite: false },
  ];

  return (
    <div className="portal-content" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 24 }}>
        <p className="section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>
          {clientName} リサーチ
        </h1>
        <p className="section-desc" style={{ marginTop: 8 }}>
          このサイトはクライアントの公開情報をもとに独自にリサーチ・分析した資料です。
        </p>
      </div>

      {/* カラー使用比率 横帯 */}
      <div style={{ marginBottom: 12 }}>
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
                flex: c.percent,
                backgroundColor: c.hex,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none',
              }}
              title={`${c.name} ${c.percent}%`}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  backgroundColor: c.hex,
                  border: c.isWhite ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <span style={{ fontFamily: 'monospace' }}>{c.hex}</span>
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
        <Link href={`${basePath}/guidelines`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="portal-card" style={{ height: '100%' }}>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>ガイドラインリサーチ</h2>
            <p className="section-desc">
              カラー・タイポグラフィ・トンマナなど、ガイドラインリサーチの詳細を確認できます。
            </p>
          </div>
        </Link>
        <Link href={`${basePath}/components`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="portal-card" style={{ height: '100%' }}>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>コンポーネント</h2>
            <p className="section-desc">
              実装確認済みのコンポーネントと、派生デザイン（想定）を確認できます。
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}