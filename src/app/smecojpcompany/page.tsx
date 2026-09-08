import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Home() {
  const clientName: string = 'ソニー・ミュージックグループ';
  const basePath: string = '/smecojpcompany';
  const primaryColor: string = '#000000';

  const colorRatios = [
    { hex: '#FFFFFF', name: '背景白', percent: 65, isWhite: true },
    { hex: '#000000', name: 'テキスト・ロゴ・ナビゲーション文字', percent: 20, isWhite: false },
    { hex: '#888888', name: '画像（ニュースサムネイル／バナー写真等、多色）', percent: 15, isWhite: false },
  ];

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
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
          公式サイトから収集したガイドラインリサーチとコンポーネントをまとめています。
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          height: 32,
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 40,
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12, marginBottom: 40 }}>
        {colorRatios.map((c) => (
          <div key={c.hex} style={{ fontSize: 12, color: '#6b7280' }}>
            <span style={{ fontFamily: 'monospace', color: '#111827', marginRight: 4 }}>{c.hex}</span>
            {c.name}（{c.percent}%）
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Link href={`${basePath}/guidelines`}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8, color: '#111827' }}>ガイドラインリサーチ</h2>
            <p className="section-desc">カラー・タイポグラフィ・トンマナのリサーチ結果を掲載しています。</p>
          </div>
        </Link>
        <Link href={`${basePath}/components`}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8, color: '#111827' }}>コンポーネント</h2>
            <p className="section-desc">実装確認済みのコンポーネントと派生デザイン（想定）を掲載しています。</p>
          </div>
        </Link>
      </div>
    </div>
  );
}