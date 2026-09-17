import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'NVIDIA';
  const basePath: string = '/nvidia';
  const primaryColor: string = '#77B801';

  const colors = [
    { hex: '#77B801', name: 'プライマリグリーン' },
    { hex: '#006600', name: 'セカンダリ（ダークグリーン）' },
    { hex: '#003EFF', name: 'アクセントブルー' },
    { hex: '#002BB8', name: 'リンクブルー' },
    { hex: '#333333', name: '本文テキスト' },
    { hex: '#2B2B2B', name: '見出しテキスト' },
    { hex: '#666666', name: 'サブテキスト' },
    { hex: '#FFFFFF', name: '背景（メイン）' },
    { hex: '#F7F7F7', name: 'セクション背景' },
    { hex: '#EEEEEE', name: 'セクション背景2' },
    { hex: '#CCCCCC', name: 'ボーダー・区切り線' },
    { hex: '#AAAAAA', name: 'サブアイコン' },
  ];

  const typography = [
    { label: 'h1', spec: '32px〜48px / Bold / line-height 1.2' },
    { label: 'h2', spec: '28px〜36px / Bold / line-height 1.3' },
    { label: 'h3', spec: '22px〜28px / Semibold / line-height 1.3' },
    { label: 'h4', spec: '18px〜20px / Semibold / line-height 1.4' },
    { label: 'h5', spec: '16px / Medium / line-height 1.4' },
    { label: 'h6', spec: '14px / Medium / line-height 1.4' },
    { label: 'body-lg', spec: '16px〜18px / Regular / line-height 1.6' },
    { label: 'body', spec: '14px / Regular / line-height 1.6' },
    { label: 'caption', spec: '12px / Regular / line-height 1.4' },
  ];

  const radiusList = [
    { label: 'ボタン', value: '2px〜4px' },
    { label: '入力フォーム', value: '2px' },
    { label: 'カード・サムネイル', value: '0px〜4px' },
    { label: 'タグ・バッジ', value: '12px（ピル型）' },
  ];

  const shadowList = [
    { label: 'レベル1（カード）', value: '0 1px 3px rgba(0,0,0,0.12)' },
    { label: 'レベル2（ホバー・モーダル）', value: '0 4px 12px rgba(0,0,0,0.2)' },
    { label: 'レベル3（CTAフォーカス）', value: '0 0 8px rgba(119,184,1,0.4)' },
  ];

  return (
    <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: 40, marginBottom: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>ガイドラインリサーチ</h1>
        <p className="section-desc">
          {clientName}のガイドラインリサーチをもとに、カラー・タイポグラフィ・トンマナを整理しています。
        </p>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>カラー</h2>
        <div className="swatch-grid">
          {colors.map((c) => (
            <div key={c.hex}>
              <div className="swatch-top" style={{ backgroundColor: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none' }} />
              <div className="swatch-bottom">
                <div className="swatch-hex">{c.hex}</div>
                <div className="swatch-name">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>タイポグラフィ</h2>
        <div className="portal-card">
          {typography.map((t, i) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i !== typography.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <span style={{ fontWeight: 700, width: 100 }}>{t.label}</span>
              <span style={{ color: '#6b7280', fontSize: 14 }}>{t.spec}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: '#9ca3af' }}>
          英数フォント: Arial, monospace ／ ウェイト: Regular(400) / Medium(500) / Semibold(600) / Bold(700)
        </p>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>角丸パターン</h2>
        <div className="portal-card">
          {radiusList.map((r, i) => (
            <div
              key={r.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i !== radiusList.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <span style={{ fontWeight: 700 }}>{r.label}</span>
              <span style={{ color: '#6b7280', fontSize: 14 }}>{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>グロー・シャドウ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {shadowList.map((s) => (
            <div
              key={s.label}
              className="portal-card"
              style={{ boxShadow: s.value.includes('119,184,1') ? '0 0 8px rgba(119,184,1,0.4)' : s.value.includes('0.2') ? '0 4px 12px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.12)' }}
            >
              <p style={{ fontWeight: 700, marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: 12, color: '#6b7280', fontFamily: 'monospace' }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}