import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = '日立製作所';
  const basePath: string = '/hitachi';
  const primaryColor: string = '#CC0000';

  const colorSwatches = [
    { hex: '#CC0000', name: 'プライマリ（Hitachiレッド）' },
    { hex: '#FA000F', name: 'セカンダリ（アクセント赤）' },
    { hex: '#0C0C0C', name: 'テキストカラー' },
    { hex: '#FFFFFF', name: '背景色（メイン）', border: true },
    { hex: '#F4F4F4', name: '背景色（サブ）' },
    { hex: '#D9D9D9', name: 'ボーダー・区切り線' },
    { hex: '#B3B3B3', name: 'ミディアムグレー' },
    { hex: '#737373', name: 'ダークグレー（補足）' },
  ];

  const typography = [
    { label: 'h1', spec: 'Hitachi Sans, 32–40px, Bold, line-height 1.3' },
    { label: 'h2', spec: 'Hitachi Sans, 28px, Bold' },
    { label: 'h3', spec: 'Hitachi Sans, 22–24px, Bold' },
    { label: 'h4', spec: 'Hitachi Sans, 18–20px, Medium/Bold' },
    { label: 'h5', spec: 'Hitachi Sans, 16px, Medium' },
    { label: 'h6', spec: 'Hitachi Sans, 14px, Medium' },
    { label: 'body-lg', spec: 'Noto Sans JP, 16px, Regular' },
    { label: 'body', spec: 'Noto Sans JP, 14px, Regular' },
    { label: 'caption', spec: 'Noto Sans JP, 12px, Regular' },
  ];

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <section style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: primaryColor, marginBottom: '8px' }}>
          GUIDELINES
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          ガイドラインリサーチ
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          日立製作所のカラー・タイポグラフィ・トンマナに関するリサーチ結果です。
        </p>
      </section>

      {/* カラーセクション */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          カラー
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
          }}
        >
          {colorSwatches.map((c) => (
            <div
              key={c.hex}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  height: '80px',
                  backgroundColor: c.hex,
                  border: c.border ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <div style={{ padding: '8px 12px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#111827' }}>
                  {c.hex}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{c.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイポグラフィセクション */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          タイポグラフィ
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          {typography.map((t) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', width: '100px' }}>
                {t.label}
              </span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>{t.spec}</span>
            </div>
          ))}
        </div>
      </section>

      {/* トンマナセクション */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          トンマナ
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
            角丸パターン: ボタン・カード等は角丸 4px〜8px 程度の控えめな角丸、もしくは角丸なし（矩形）が基調と推測。
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            シャドウ: box-shadow定義の明示なし。基本的にフラットデザインで、影の多用は見られない構成。
          </p>
        </div>
      </section>

      {/* キーワードセクション */}
      <section>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          キーワード
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['信頼感', 'グローバル', 'ミニマル'].map((k) => (
            <span
              key={k}
              style={{
                background: '#ffffff',
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}