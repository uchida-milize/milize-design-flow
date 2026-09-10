import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'ソニー・ミュージックエンタテインメント';
  const basePath: string = '/httpswwwsmecojp';
  const primaryColor: string = '#1a1a1a';

  const colors = [
    { hex: '#1a1a1a', name: 'プライマリブラック（推察）' },
    { hex: '#ffffff', name: 'ホワイト（推察）' },
    { hex: '#6b7280', name: 'グレー（補足）' },
  ];

  return (
    <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="section-title">ガイドラインリサーチ</h1>
        <p className="section-desc">
          スクレイピングデータから抽出できたロゴ資産・フォント情報をもとにしたリサーチ結果です。
          HEXカラー・box-shadow・border-radius等の実測値はサイト側に検出されなかったため、
          推測による断定は行っていません。
        </p>
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>カラー</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          ※実測HEX値は未検出のため、ロゴ画像から視覚的に推察した参考カラーです。
        </p>
        <div className="swatch-grid">
          {colors.map((c) => (
            <div key={c.hex} className="portal-card" style={{ padding: 0 }}>
              <div
                className="swatch-color"
                style={{
                  backgroundColor: c.hex,
                  border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none',
                }}
              />
              <div className="swatch-info">
                <div className="swatch-hex">{c.hex}</div>
                <div className="swatch-name">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>タイポグラフィ</h2>
        <div className="portal-card">
          <p style={{ fontSize: 14, marginBottom: 12, color: '#111827' }}>
            <strong>日本語フォント：</strong>秀英角ゴ Std（L/M/B）、A1明朝 Std（Bold）、
            ヒラギノ角ゴ相当（W3）
          </p>
          <p style={{ fontSize: 14, marginBottom: 12, color: '#111827' }}>
            <strong>英数フォント：</strong>Raleway（Google Fonts）、inherit
          </p>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            モリサワ配信CSS（morisawafonts.net）経由でWebフォントを配信。
            font-size・line-height・letter-spacingの実測値は検出されていません。
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>トンマナ</h2>
        <div className="portal-card">
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
            角丸パターン：実測値なし（検出されず）
          </p>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            シャドウ・グロー：実測値なし（検出されず）
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>キーワード</h2>
        <div className="portal-card">
          <ul style={{ paddingLeft: 20, fontSize: 14, color: '#111827' }}>
            <li>モノクロ基調</li>
            <li>モリサワ和文フォント運用</li>
            <li>グループ企業ブランド連携</li>
          </ul>
        </div>
      </section>
    </div>
  );
}