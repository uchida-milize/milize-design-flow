import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'Apple';
  const basePath: string = '/apple';
  const primaryColor: string = '#0071e3';

  const colors = [
    { hex: '#0071e3', name: 'プライマリ（Apple Blue）' },
    { hex: '#000000', name: 'テキストカラー' },
    { hex: '#fafafc', name: '背景色' },
    { hex: '#ffffff', name: 'ロゴ（ダークモード用）' },
  ];

  const typography = [
    { label: 'h1', desc: 'SF Pro Display, Bold相当、大見出し（製品名表示等）' },
    { label: 'h2', desc: 'SF Pro Display, Semibold相当' },
    { label: 'h3', desc: 'SF Pro Display, Medium相当' },
    { label: 'h4', desc: 'SF Pro Text, Medium相当' },
    { label: 'h5', desc: 'SF Pro Text, Regular相当' },
    { label: 'h6', desc: 'SF Pro Text, Regular相当（小見出し）' },
    { label: 'body-lg', desc: 'SF Pro Text, Regular（製品説明文などやや大きめ本文）' },
    { label: 'body', desc: 'SF Pro Text, Regular（標準本文）' },
    { label: 'caption', desc: 'SF Pro Text, Regular（脚注・注釈番号表記等）' },
  ];

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <p className="section-label">GUIDELINES</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>ガイドラインリサーチ</h1>
        <p className="section-desc">
          {clientName} の公開情報をもとに独自にリサーチ・定義したガイドラインリサーチです。
        </p>
      </div>

      {/* カラー */}
      <section style={{ marginBottom: 48 }}>
        <p className="section-label">COLOR</p>
        <h2 className="section-title" style={{ fontSize: 20 }}>カラー</h2>
        <p className="section-desc">
          プライマリカラーは Apple Blue（#0071e3）。テキストは黒、背景はオフホワイトを基調としています。
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {colors.map((c) => (
            <div key={c.hex} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 80, backgroundColor: c.hex, border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none' }} />
              <div style={{ padding: 12 }}>
                <p style={{ fontFamily: 'monospace', fontSize: 14, color: '#111827' }}>{c.hex}</p>
                <p style={{ fontSize: 12, color: '#6b7280' }}>{c.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイポグラフィ */}
      <section style={{ marginBottom: 48 }}>
        <p className="section-label">TYPOGRAPHY</p>
        <h2 className="section-title" style={{ fontSize: 20 }}>タイポグラフィ</h2>
        <p className="section-desc">
          英数フォントは SF Pro Display / SF Pro Text を使用。日本語フォントの明示的な指定はスクレイピングデータ内に未検出です。
        </p>
        <div className="card">
          {typography.map((t, i) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                gap: 16,
                padding: '12px 0',
                borderBottom: i < typography.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <div style={{ width: 80, fontWeight: 700, color: '#111827' }}>{t.label}</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* トンマナ */}
      <section style={{ marginBottom: 48 }}>
        <p className="section-label">TONE &amp; MANNER</p>
        <h2 className="section-title" style={{ fontSize: 20 }}>トンマナ</h2>
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>角丸パターン</h3>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
            スクレイピングデータ内に具体的な border-radius 数値は未検出のため記載なし。
          </p>
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>グロー・シャドウ</h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Hero画像に「発光するネオンエフェクト」という表現があり、光彩（グロー）演出がキービジュアルに使用されていることを確認。具体的な box-shadow 数値は未検出。
          </p>
        </div>
      </section>

      {/* その他 */}
      <section>
        <p className="section-label">OVERVIEW</p>
        <h2 className="section-title" style={{ fontSize: 20 }}>その他</h2>
        <div className="card">
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>
            キーワード: ミニマル／プレミアム／プロダクトフォーカス
          </p>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            白基調の余白を活かしたミニマルなレイアウトに、鮮やかなHero画像とApple Blue（#0071e3）のCTAボタンがアクセントとして配置される、洗練されたプレミアム感のあるデザイン。
          </p>
        </div>
      </section>
    </div>
  );
}