import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'Sony Pictures';
  const basePath: string = '/sonypictures';
  const primaryColor: string = '#000000';

  const colors = [
    { hex: '#000000', name: 'プライマリ（ブラック）' },
    { hex: '#FFFFFF', name: 'セカンダリ（ホワイト）' },
    { hex: '#E60012', name: 'アクセント（レッド系・推定）' },
    { hex: '#111111', name: 'テキストカラー' },
  ];

  const typography = [
    { label: 'h1', desc: '大見出し（映画タイトル等）Bold', size: '40px / Bold' },
    { label: 'h2', desc: 'セクション見出し', size: '32px / Bold' },
    { label: 'h3', desc: 'サブセクション見出し', size: '24px / Bold' },
    { label: 'h4', desc: 'カード見出し', size: '18px / Bold' },
    { label: 'h5', desc: '小見出し', size: '16px / Bold' },
    { label: 'h6', desc: '補助見出し', size: '14px / Bold' },
    { label: 'body-lg', desc: '導入文・リード文', size: '18px / Regular' },
    { label: 'body', desc: '本文（NotoSansJP-Regular）', size: '14px / Regular' },
    { label: 'caption', desc: '画像キャプション・日付表記', size: '12px / Regular' },
  ];

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="portal-section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="portal-section-title" style={{ fontSize: 32 }}>ガイドラインリサーチ</h1>
        <p className="portal-section-desc">
          Sony Picturesのロゴ・掲載画像から確認できた配色・タイポグラフィ・トンマナのリサーチ結果です。
          HEXの正確な数値は実測不可のため、視覚情報からの推定値を含みます。
        </p>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>カラー</h2>
          <p className="portal-section-desc" style={{ marginBottom: 20 }}>
            プライマリ：ブラック／セカンダリ：ホワイト／アクセント：レッド系（推定）
          </p>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div className="swatch-item" key={c.hex}>
                <div className="swatch-color" style={{ background: c.hex }} />
                <div className="swatch-info">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>タイポグラフィ</h2>
          <p className="portal-section-desc" style={{ marginBottom: 20 }}>
            日本語フォント: NotoSansJP-Bold（見出し）／NotoSansJP-Regular（本文）<br />
            英数フォント: Avenir / DinCond / SF Pro Text（サイトにより併用）
          </p>
          <div className="portal-card">
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
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{t.desc}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', alignSelf: 'center' }}>{t.size}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>トンマナ</h2>
          <div className="portal-card" style={{ marginTop: 16 }}>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
              角丸パターン: 実測データなし。ボタン角丸4px〜8px程度を想定して実装。<br />
              シャドウ: 実測データなし。Hero画像上のテキスト可読性向上のための軽度なドロップシャドウを想定。<br />
              キーワード: エンターテインメント／シネマティック／グローバル
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}