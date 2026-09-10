import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName = 'パナソニック株式会社';
  const basePath = '/panasonic';
  const primaryColor: string = '#003DA5';

  const colors = [
    { hex: '#003DA5', name: 'プライマリカラー（Panasonic Blue）' },
    { hex: '#333333', name: 'テキストカラー' },
    { hex: '#FFFFFF', name: '背景色', border: true },
    { hex: '#E6E6E6', name: 'ボーダー・区切り線グレー' },
  ];

  const typography = [
    { label: 'h1', spec: '28px / Bold / Noto Sans JP' },
    { label: 'h2', spec: '24px / Bold / Noto Sans JP' },
    { label: 'h3', spec: '20px / Bold / Noto Sans JP' },
    { label: 'h4', spec: '18px / Medium / Noto Sans JP' },
    { label: 'h5', spec: '16px / Medium / Noto Sans JP' },
    { label: 'h6', spec: '14px / Medium / Noto Sans JP' },
    { label: 'body-lg', spec: '16px / Regular / Noto Sans JP' },
    { label: 'body', spec: '14px / Regular / Noto Sans JP' },
    { label: 'caption', spec: '12px / Regular / Noto Sans JP' },
  ];

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="guidelines" primaryColor={primaryColor} />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
          <h1 className="section-title" style={{ fontSize: 28 }}>ガイドラインリサーチ</h1>
          <p className="section-desc">
            {clientName}のガイドラインリサーチに基づくカラー・タイポグラフィ・トンマナ定義です。
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>カラー</h2>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div key={c.hex}>
                <div className="swatch-top" style={{ background: c.hex, border: c.border ? '1px solid #e5e7eb' : 'none' }} />
                <div className="swatch-bottom">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>タイポグラフィ</h2>
          <div className="card">
            {typography.map((t) => (
              <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ fontWeight: 700, width: 100 }}>{t.label}</span>
                <span style={{ color: '#6b7280', fontSize: 14 }}>{t.spec}</span>
              </div>
            ))}
            <p style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
              日本語フォント: Noto Sans JP　/　英数フォント: monospace, inherit　/　ウェイト: Regular(400), Bold(700)
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>トンマナ</h2>
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>角丸パターン</h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
              ボタン・カード等は4px〜8px程度の小さめ角丸を推定使用。
            </p>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>シャドウ</h3>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              box-shadow: 0 2px 4px rgba(0,0,0,0.1) 相当の軽微な影を推定使用。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}