import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = '三菱UFJフィナンシャル・グループ';
  const basePath: string = '/mufg';
  const primaryColor: string = '#C8102E';

  const swatches = [
    { hex: '#C8102E', name: 'MUFGレッド（プライマリ・参考値）' },
    { hex: '#333333', name: 'テキストカラー（ダークグレー〜ブラック系）' },
    { hex: '#FFFFFF', name: '背景カラー（ホワイト系）' },
    { hex: '#9CA3AF', name: 'その他（画像領域参考色）' },
  ];

  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '48px' }}>
        <div className="section-label" style={{ color: primaryColor }}>
          GUIDELINES
        </div>
        <h1 className="section-title" style={{ fontSize: '32px' }}>
          ガイドラインリサーチ
        </h1>
        <p className="section-desc">
          本リサーチはMUFG公式サイトのスクレイピング結果（4ページ分）に基づく参考記述です。
          HEXコード・RGB値・Pantone番号の実測値は取得できていないため、視覚的観察による推定値です。
        </p>
      </section>

      <section className="card" style={{ marginTop: '32px' }}>
        <h2 className="section-title" style={{ fontSize: '18px' }}>
          カラー
        </h2>
        <p className="section-desc" style={{ marginBottom: '16px' }}>
          プライマリカラー: MUFGレッド（シンボルマークの赤系統。実測HEX値は取得不可のため参考値）
          <br />
          セカンダリカラー・アクセントカラー: 実測データなし
          <br />
          テキストカラー: ダークグレー〜ブラック系（実測値なし）
          <br />
          背景色: ホワイト系（実測値なし）
        </p>
        <div className="swatch-grid">
          {swatches.map((s) => (
            <div key={s.hex}>
              <div className="swatch-top" style={{ background: s.hex }} />
              <div className="swatch-bottom">
                <div className="swatch-hex">{s.hex}</div>
                <div className="swatch-name">{s.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: '24px' }}>
        <h2 className="section-title" style={{ fontSize: '18px' }}>
          カラー使用比率
        </h2>
        <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${primaryColor}` }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>比率</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>用途</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>備考</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px' }}>約70%</td>
              <td style={{ padding: '8px' }}>背景（ホワイト系）</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>コンテンツ背景全般</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px' }}>約15%</td>
              <td style={{ padding: '8px' }}>テキスト（ダークグレー〜ブラック系）</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>本文・見出し</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px' }}>約10%</td>
              <td style={{ padding: '8px' }}>MUFGレッド（ロゴ・シンボルマーク）</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>ブランドロゴ、アクセント使用箇所</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>約5%</td>
              <td style={{ padding: '8px' }}>その他（画像・写真領域の色）</td>
              <td style={{ padding: '8px', color: '#6b7280' }}>Hero画像、ブランドストーリー画像等</td>
            </tr>
          </tbody>
        </table>
        <p className="section-desc" style={{ marginTop: '12px' }}>
          ※実測CSS値が取得できなかったため、ページサマリー・画像構成から視覚的に推計した概算比率です。
        </p>
      </section>

      <section className="card" style={{ marginTop: '24px' }}>
        <h2 className="section-title" style={{ fontSize: '18px' }}>
          タイポグラフィ
        </h2>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>h1 見出し（Our Brand）</div>
            <p className="section-desc">Graphik / ヒラギノ角ゴ Pro, Bold, 大見出し</p>
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>h2 見出し（Brand Personality）</div>
            <p className="section-desc">Graphik / ヒラギノ角ゴ Pro, Bold, セクション見出し</p>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>h3 見出し（懐の深いしなやかさ）</div>
            <p className="section-desc">ヒラギノ角ゴ Pro, Semibold</p>
          </div>
          <div>
            <div style={{ fontSize: '16px' }}>body-lg リード文</div>
            <p className="section-desc">ヒラギノ角ゴ Pro, Regular</p>
          </div>
          <div>
            <div style={{ fontSize: '14px' }}>body 本文テキスト</div>
            <p className="section-desc">ヒラギノ角ゴ Pro, Regular</p>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>caption（PDF（204KB）等）</div>
            <p className="section-desc">ヒラギノ角ゴ Pro, Regular, 小さめサイズ</p>
          </div>
        </div>
        <p className="section-desc" style={{ marginTop: '16px' }}>
          フォントスタック: 日本語＝ヒラギノ角ゴ Pro / 英数＝Graphik, Arial
          <br />
          ウェイト: Regular / Medium / Semibold / Bold（実測値なし、一般的階層を推定表記）
        </p>
      </section>

      <section className="card" style={{ marginTop: '24px' }}>
        <h2 className="section-title" style={{ fontSize: '18px' }}>
          トンマナ
        </h2>
        <p className="section-desc" style={{ marginTop: '12px' }}>
          角丸パターン: 実測 border_radii データは取得できず。ページトップアイコン等の小型ボタンパーツについても数値未検出のため、
          一般的な金融機関サイトに準じた小〜中程度の角丸（4px〜8px程度）を想定パターンとして記載。
        </p>
        <p className="section-desc" style={{ marginTop: '8px' }}>
          シャドウ: 実測シャドウ値の取得なし。カード・画像枠に軽微なドロップシャドウが使用されている可能性はあるが、
          CSS値未検出のため記載を保留。
        </p>
      </section>

      <section className="card" style={{ marginTop: '24px' }}>
        <h2 className="section-title" style={{ fontSize: '18px' }}>
          その他
        </h2>
        <p className="section-desc" style={{ marginTop: '12px' }}>
          キーワード: 信頼性／グローバル／総合金融
        </p>
        <p className="section-desc" style={{ marginTop: '8px' }}>
          全体の印象: MUFGは日本発の総合金融グループとして、赤を基調としたシンボルマークと落ち着いたホワイト・グレートーンの配色で、
          信頼感と歴史の重みを表現するコーポレートデザインを採用している。ただし本リサーチからは具体的なHEXコード・RGB値・詳細なCSS実装値
          （角丸・シャドウ・フォームパーツ寸法等）を取得できておらず、デザイントークンとしての精度は限定的である。
        </p>
      </section>
    </div>
  );
}