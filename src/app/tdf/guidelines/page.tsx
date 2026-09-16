import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = 'T&Dフィナンシャル生命保険株式会社';
  const basePath: string = '/tdf';
  const primaryColor: string = '#1B3A6B'; // design.md上は「未取得」のため暫定値

  const colors: { hex: string; name: string; note: string }[] = [
    { hex: '#1B3A6B', name: 'プライマリカラー（暫定）', note: 'ロゴ画像の実測不可のため未確定' },
    { hex: '#f5f7fa', name: '背景色（ポータル共通値）', note: 'サイト側CSS未取得' },
    { hex: '#ffffff', name: '白色（推定）', note: '実測データなし' },
    { hex: '#9ca3af', name: 'セカンダリ（未取得・グレー代替）', note: '実測データなし' },
  ];

  return (
    <div className="tdf-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <p className="tdf-section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="tdf-section-title">ガイドラインリサーチ</h1>
        <p className="tdf-section-desc">
          スクレイピング結果をもとにしたガイドラインリサーチです。実測値が確認できない項目は「未取得」と明記しており、推測値は記載していません。
        </p>
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>カラー</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          プライマリカラーはロゴ画像の実測不可のため「未取得」。以下はポータル運用上の暫定値・共通値を含みます。
        </p>
        <div className="tdf-swatch-grid">
          {colors.map((c) => (
            <div key={c.hex}>
              <div className="tdf-swatch-color" style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none' }} />
              <div className="tdf-swatch-info">
                <div className="tdf-swatch-hex">{c.hex}</div>
                <div className="tdf-swatch-name">{c.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>タイポグラフィ</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          フォントサイズ・行間等の実測データは未取得です。判明しているフォントスタックのみ記載します。
        </p>
        <div className="tdf-card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', width: 160 }}>日本語フォント</td>
                <td style={{ padding: '8px 0', color: '#111827' }}>ヒラギノ角ゴPro W3（実測確認済み）</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>英数フォント</td>
                <td style={{ padding: '8px 0', color: '#111827' }}>未取得</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>ウェイト</td>
                <td style={{ padding: '8px 0', color: '#111827' }}>W3（Regular相当）</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>h1〜h6 / body 等</td>
                <td style={{ padding: '8px 0', color: '#111827' }}>未取得（CSS実装未取得のため）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>トンマナ</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          角丸パターン・シャドウ・グローの実測データはすべて未取得です。
        </p>
        <div className="tdf-card">
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            border_radii, heights, input_css, button_css 各フィールドが空欄のため、CSSファイル本体の追加取得が必要です。
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>ブランドアセット</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          確認されたロゴ・アイコン画像です。
        </p>
        <div className="tdf-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <img src="https://www.tdf-life.co.jp/common/images/logo/logo_01.png" alt="logo_01" style={{ height: 40 }} />
          <img src="https://www.tdf-life.co.jp/common/images/logo/logo_02.png" alt="logo_02" style={{ height: 40 }} />
          <img src="https://www.tdf-life.co.jp/common/images/logo/logo_03.png" alt="logo_03" style={{ height: 40 }} />
          <img src="https://www.tdf-life.co.jp/common/images/logo/logo_05.png" alt="logo_05" style={{ height: 40 }} />
          <img src="https://www.tdf-life.co.jp/images/icon_line_01.png" alt="icon_line" style={{ height: 32 }} />
          <img src="https://www.tdf-life.co.jp/images/icon_qr_01.png" alt="icon_qr" style={{ height: 32 }} />
          <img src="https://www.tdf-life.co.jp/common/images/icon/icon_pdf_01.png" alt="icon_pdf" style={{ height: 32 }} />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>その他</h2>
        <div className="tdf-card">
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
            <strong style={{ color: '#111827' }}>キーワード：</strong> 安心・生命保険・信頼性
          </p>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            金融・保険業界特有の「正確性」「信頼感」「顧客保護」を重視した情報設計が確認できますが、配色・タイポグラフィの詳細仕様はCSS実データ未取得のため断定的な記載を避けています。
          </p>
        </div>
      </section>
    </div>
  );
}