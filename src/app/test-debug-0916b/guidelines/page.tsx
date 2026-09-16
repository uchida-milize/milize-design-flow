import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'test-debug-0916b株式会社';
  const basePath: string = '/test-debug-0916b';
  const primaryColor: string = '#BE0026';

  const colors = [
    { hex: '#BE0026', name: 'プライマリカラー' },
    { hex: '#CC0033', name: 'セカンダリカラー' },
    { hex: '#FAE5EB', name: 'アクセントカラー' },
    { hex: '#141414', name: 'テキストカラー' },
    { hex: '#585858', name: 'サブテキストカラー' },
    { hex: '#FFFFFF', name: '背景（メイン）' },
    { hex: '#F5F5F5', name: 'セクション背景1' },
    { hex: '#FAFAFA', name: 'セクション背景2' },
    { hex: '#EEEEEE', name: 'セクション背景3' },
    { hex: '#E8E8E8', name: 'ボーダー・区切り1' },
    { hex: '#C3C3C3', name: 'ボーダー・区切り2' },
  ];

  const typography = [
    { name: 'h1', font: 'Bebas Neue / Noto Sans JP', weight: '太字', size: '大' },
    { name: 'h2', font: 'Noto Sans JP', weight: '600', size: '中〜大' },
    { name: 'h3', font: 'Noto Sans JP', weight: '500〜600', size: '中' },
    { name: 'h4', font: 'Noto Sans JP', weight: '500', size: '中' },
    { name: 'h5', font: 'Noto Sans JP', weight: '400〜500', size: '小〜中' },
    { name: 'h6', font: 'Noto Sans JP', weight: '400', size: '小' },
    { name: 'body-lg', font: 'Noto Sans JP', weight: '400', size: '標準' },
    { name: 'body', font: 'Noto Sans JP', weight: '300〜400', size: '標準' },
    { name: 'caption', font: 'Noto Sans JP', weight: '300', size: '小' },
  ];

  return (
    <div className="portal-content" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>
          ガイドラインリサーチ
        </h1>
        <p className="section-desc" style={{ marginTop: 8 }}>
          クライアントサイトから収集したカラー・タイポグラフィ・トンマナ情報のまとめです。
        </p>
      </div>

      {/* カラーセクション */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 8 }}>カラー</h2>
        <p className="section-desc" style={{ marginBottom: 20 }}>
          プライマリカラー #BE0026 を中心とした、白背景ベースのコーポレートカラー構成。
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {colors.map((c) => (
            <div key={c.hex} className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div
                style={{
                  height: 80,
                  backgroundColor: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <div style={{ padding: 12 }}>
                <p style={{ fontFamily: 'monospace', fontSize: 14, color: '#111827' }}>{c.hex}</p>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{c.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイポグラフィ */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 8 }}>タイポグラフィ</h2>
        <p className="section-desc" style={{ marginBottom: 20 }}>
          日本語は Noto Sans JP（Regular / Bold）を全体に使用。
        </p>
        <div className="portal-card">
          {typography.map((t, i) => (
            <div
              key={t.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i !== typography.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <span style={{ fontWeight: 700, width: 80 }}>{t.name}</span>
              <span style={{ color: '#6b7280', flex: 1 }}>{t.font}</span>
              <span style={{ color: '#6b7280', width: 100, textAlign: 'right' }}>{t.weight}</span>
              <span style={{ color: '#9ca3af', width: 60, textAlign: 'right' }}>{t.size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* フォントスタック */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 8 }}>フォントスタック</h2>
        <div className="portal-card">
          <p style={{ marginBottom: 8 }}><strong>日本語:</strong> Noto Sans JP（Regular, Bold）</p>
          <p style={{ marginBottom: 8 }}><strong>英数:</strong> Bebas Neue（見出し）, Lato（本文補助）</p>
          <p><strong>補助:</strong> Roboto Mono, system-ui, Menlo</p>
        </div>
      </section>

      {/* トンマナ */}
      <section>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 8 }}>トンマナ</h2>
        <div className="portal-card">
          <p style={{ marginBottom: 12 }}>
            <strong>角丸:</strong> ボタン・カードは4px〜8px程度を推定適用。フォーム部品は角丸なし〜2px程度。
          </p>
          <p>
            <strong>シャドウ:</strong> 実測データなし。浅めのドロップシャドウ（blur 4〜8px, opacity 5〜10%）の使用可能性あり。
          </p>
        </div>
      </section>
    </div>
  );
}