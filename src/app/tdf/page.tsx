import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName: string = 'T&Dフィナンシャル生命保険株式会社';
  const basePath: string = '/tdf';
  const primaryColor: string = '#1B3A6B'; // design.md上は「未取得」のため、生命保険業界の信頼感を踏まえた暫定値

  // design.mdでは実測カラー比率データは「未取得」とされているため、
  // 判明している唯一のカラーガイドライン候補(primaryColor)と、
  // ポータル共通で確認できる背景色・白色を用いた暫定的な構成比を表示する。
  const colorRatios: { hex: string; name: string; percent: number; isWhite?: boolean }[] = [
    { hex: '#1B3A6B', name: 'プライマリカラー（暫定・未確定）', percent: 40 },
    { hex: '#f5f7fa', name: '背景色（ポータル共通値）', percent: 35 },
    { hex: '#ffffff', name: '白色（未取得・推定）', percent: 25, isWhite: true },
  ];

  return (
    <div className="tdf-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40 }}>
        <p className="tdf-section-label" style={{ color: primaryColor }}>RESEARCH</p>
        <h1 className="tdf-section-title">{clientName} リサーチ</h1>
        <p className="tdf-section-desc">
          スクレイピングデータをもとにしたガイドラインリサーチです。カラーコード・CSS実装等の実測値が取得できていない項目については「未取得」として扱い、推測値は記載していません。
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          height: 32,
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        {colorRatios.map((c) => (
          <div
            key={c.hex}
            style={{
              flex: c.percent / 100,
              background: c.hex,
              border: c.isWhite ? '1px solid #e5e7eb' : 'none',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        {colorRatios.map((c) => (
          <div key={c.hex} style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: 2,
                background: c.hex,
                border: c.isWhite ? '1px solid #e5e7eb' : 'none',
              }}
            />
            <span style={{ fontFamily: 'monospace' }}>{c.hex}</span>
            <span>{c.name}</span>
            <span>{c.percent}%</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <Link href={`${basePath}/guidelines`} className="tdf-card" style={{ display: 'block' }}>
          <p className="tdf-section-label" style={{ color: primaryColor }}>DOCUMENT</p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>ガイドラインリサーチ</h2>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            カラー・タイポグラフィ・トンマナ等のリサーチ結果を確認できます。
          </p>
        </Link>

        <Link href={`${basePath}/components`} className="tdf-card" style={{ display: 'block' }}>
          <p className="tdf-section-label" style={{ color: primaryColor }}>UI</p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>コンポーネント</h2>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            実装確認済みコンポーネントと、派生デザイン（想定）を確認できます。
          </p>
        </Link>
      </div>
    </div>
  );
}