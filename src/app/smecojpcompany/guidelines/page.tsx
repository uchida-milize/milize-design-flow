import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'ソニー・ミュージックグループ';
  const basePath: string = '/smecojpcompany';
  const primaryColor: string = '#000000';

  const colors = [
    { hex: '#000000', name: 'プライマリカラー（テキスト・ロゴ）' },
    { hex: '#FFFFFF', name: '背景色' },
  ];

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="section-title">ガイドラインリサーチ</h1>
        <p className="section-desc">
          SONYグループの公式ロゴから読み取れる、モノトーン基調のガイドラインリサーチ結果です。
        </p>
      </div>

      {/* カラー */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>カラー</h2>
        <div className="swatch-grid">
          {colors.map((c) => (
            <div key={c.hex}>
              <div className="swatch-color" style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none' }} />
              <div className="swatch-info">
                <div className="swatch-hex">{c.hex}</div>
                <div className="swatch-name">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="section-desc" style={{ marginTop: 16 }}>
          ※HEXコード・RGB値の明示的なCSSデータは取得できず、公式ロゴのモノトーン構成に基づき記述しています。
          セカンダリカラー・アクセントカラーは明示データなしです。
        </p>
      </section>

      {/* タイポグラフィ */}
      <section style={{ marginTop: 48 }} className="card">
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>タイポグラフィ</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000000' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', color: '#111827' }}>要素</th>
              <th style={{ textAlign: 'left', padding: '8px 0', color: '#111827' }}>フォント</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['h1', 'MFW-PShueiGoGinStd-B（秀英角ゴシック Std Bold）'],
              ['h2 / h3', 'MFW-PShueiGoGinStd-M（秀英角ゴシック Std Medium）'],
              ['h4 / h5 / h6', 'MFW-HiraginoSansGB-W3（ヒラギノ角ゴシック W3）'],
              ['body-lg', 'MFW-PShueiGoGinStd-L（秀英角ゴシック Std Light）'],
              ['body', 'MFW-HiraginoSansGB-W3'],
              ['caption', 'MFW-PShueiGoGinStd-L（小さめサイズ想定）'],
            ].map(([k, v]) => (
              <tr key={k} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px 0', color: '#111827' }}>{k}</td>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="section-desc" style={{ marginTop: 16 }}>
          英数フォントには Raleway を使用。ウェイトは Light／Medium／Bold の3段階で運用されています。
        </p>
      </section>

      {/* トンマナ */}
      <section style={{ marginTop: 48 }} className="card">
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>トンマナ</h2>
        <p className="section-desc">
          角丸：明示CSSデータなし。画像タイル構成は角丸なしの矩形が中心と推定されます。
        </p>
        <p className="section-desc" style={{ marginTop: 8 }}>
          シャドウ・グロー：明示データなし。フラットなカード・バナー構成が基調です。
        </p>
      </section>

      {/* キーワード */}
      <section style={{ marginTop: 48 }} className="card">
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>キーワード</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['モノトーン', 'エンタテインメント', 'グループシナジー'].map((k) => (
            <span
              key={k}
              style={{
                padding: '6px 16px',
                borderRadius: 999,
                background: '#000000',
                color: '#ffffff',
                fontSize: 13,
              }}
            >
              {k}
            </span>
          ))}
        </div>
        <p className="section-desc" style={{ marginTop: 16 }}>
          SONYブランドを継承した黒・白基調のミニマルなコーポレートデザイン。装飾色を排し、写真・バナー素材で情報を伝える構成です。
        </p>
      </section>
    </div>
  );
}