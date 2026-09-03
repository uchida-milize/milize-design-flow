import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = '株式会社ビデオリサーチ';
  const basePath: string = '/videor';
  const primaryColor: string = '#202945';

  const colors = [
    { hex: '#202945', name: 'プライマリネイビー' },
    { hex: '#FFFFFF', name: '背景ホワイト' },
    { hex: '#202945', name: 'テキストカラー' },
  ];

  const typography = [
    { name: 'h1', font: 'Roboto / ヒラギノ角ゴ Pro W3', weight: 'Bold', size: '28–36px' },
    { name: 'h2', font: 'Roboto / ヒラギノ角ゴ Pro W3', weight: 'Bold', size: '24–28px' },
    { name: 'h3', font: 'Montserrat / ヒラギノ角ゴ Pro W3', weight: 'Medium〜Bold', size: '20–22px' },
    { name: 'h4', font: 'ヒラギノ角ゴ Pro W3', weight: 'Medium', size: '18px' },
    { name: 'h5', font: 'ヒラギノ角ゴ Pro W3', weight: 'Regular〜Medium', size: '16px' },
    { name: 'h6', font: 'ヒラギノ角ゴ Pro W3', weight: 'Regular', size: '14px' },
    { name: 'body-lg', font: 'ヒラギノ角ゴ Pro W3', weight: 'Regular', size: '16px' },
    { name: 'body', font: 'ヒラギノ角ゴ Pro W3', weight: 'Regular', size: '14px' },
    { name: 'caption', font: 'ヒラギノ角ゴ Pro W3', weight: 'Regular', size: '12px' },
  ];

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="guidelines" primaryColor={primaryColor} />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="section-label" style={{ color: primaryColor }}>GUIDELINES</div>
        <h1 className="section-title">ガイドラインリサーチ</h1>
        <p className="section-desc">
          videor.co.jp のスクレイピングデータから取得・推定したカラー、タイポグラフィ、トンマナの情報です。
        </p>

        {/* カラーセクション */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>カラー</h2>
          <div className="swatch-grid">
            {colors.map((c, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="swatch-top" style={{ backgroundColor: c.hex }} />
                <div className="swatch-hex">{c.hex}</div>
                <div className="swatch-name">{c.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>タイポグラフィ</h2>
          <div className="card">
            {typography.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < typography.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <span style={{ fontWeight: 700, color: '#111827', width: 80 }}>{t.name}</span>
                <span style={{ color: '#6b7280', flex: 1 }}>{t.font}</span>
                <span style={{ color: '#6b7280', width: 100, textAlign: 'right' }}>{t.weight}</span>
                <span style={{ color: '#9ca3af', width: 100, textAlign: 'right' }}>{t.size}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
            ※ サイズ・行間は非実測の推定値です。実測できたのはフォントファミリーのみです。
          </p>
        </section>

        {/* フォントスタック */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>フォントスタック</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#111827', marginBottom: 8 }}>
              日本語フォント: ヒラギノ角ゴ Pro W3, ヒラギノ角ゴ Pro, 游明朝
            </p>
            <p style={{ fontSize: 14, color: '#111827', marginBottom: 8 }}>
              英数フォント: Roboto, Montserrat, Verdana
            </p>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              ウェイト: Regular / Medium / Bold（実測の数値ウェイト指定なし）
            </p>
          </div>
        </section>

        {/* トンマナ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>トンマナ</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#111827', marginBottom: 8, fontWeight: 700 }}>角丸パターン</p>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
              border_radii の実測値は検出されず。追加のCSS実測が必要です。
            </p>
            <p style={{ fontSize: 14, color: '#111827', marginBottom: 8, fontWeight: 700 }}>シャドウ・グロー</p>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              input_css / button_css / heights は全て空欄。落ち着いたトーンから浅めのシャドウと推定。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}