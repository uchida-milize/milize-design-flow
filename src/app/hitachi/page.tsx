import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Home() {
  const clientName: string = '日立製作所';
  const basePath: string = '/hitachi';
  const primaryColor: string = '#CC0000';

  const colorRatios = [
    { hex: '#FFFFFF', name: '白（背景）', percent: 50, border: true },
    { hex: '#0C0C0C', name: 'ほぼ黒（テキスト）', percent: 20, border: false },
    { hex: '#CC0000', name: 'Hitachiレッド（プライマリ）', percent: 10, border: false },
    { hex: '#F4F4F4', name: 'ライトグレー（背景区切り）', percent: 8, border: false },
    { hex: '#D9D9D9', name: 'グレー（ボーダー）', percent: 5, border: false },
    { hex: '#B3B3B3', name: 'ミディアムグレー（非活性）', percent: 4, border: false },
    { hex: '#737373', name: 'ダークグレー（補足テキスト）', percent: 3, border: false },
  ];

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <section style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: primaryColor, marginBottom: '8px' }}>
          RESEARCH
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          {clientName} リサーチ
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          日立製作所のガイドラインリサーチおよびコンポーネントの実装確認資料です。
        </p>
      </section>

      {/* カラー使用比率バー */}
      <section style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            height: '32px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              style={{
                flex: c.percent,
                backgroundColor: c.hex,
                border: c.border ? '1px solid #e5e7eb' : 'none',
              }}
              title={`${c.name} ${c.percent}%`}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
          {colorRatios.map((c) => (
            <div key={c.hex} style={{ fontSize: '12px', color: '#6b7280' }}>
              <span style={{ fontFamily: 'monospace', color: '#111827' }}>{c.hex}</span>
              {' '}
              {c.name}（{c.percent}%）
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Link
          href={`${basePath}/guidelines`}
          style={{
            flex: '1 1 300px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
            ガイドラインリサーチ
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            カラー・タイポグラフィ・トンマナなどのガイドラインリサーチを確認できます。
          </p>
        </Link>

        <Link
          href={`${basePath}/components`}
          style={{
            flex: '1 1 300px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
            コンポーネント
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            実装確認済みコンポーネントと派生デザイン（想定）を確認できます。
          </p>
        </Link>
      </section>
    </main>
  );
}