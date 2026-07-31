import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function GuidelinesPage() {
  const clientName: string = '株式会社MILIZE';
  const basePath: string = '/testrin';
  const primaryColor: string = '#4B5563';

  const brandLogos = [
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/btt-data_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/new_dai-ichi-life_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/df-life_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/fukuoka-fg_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/jibunbank_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/jiji-data_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/mufg-shintaku_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/kyoto-bank_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/saison_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/yokohama_bank_logo.jpg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/business-record/relo-club_logo.jpg',
  ];

  const productLogos = [
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/dify-logo.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/milize_alternative_data.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/milize-ai_logo.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/smythos-logo.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/news_ad.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/kabu_ad.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/fin_ad.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/mili_talk.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/milize_chat.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/news-ai-searcher.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/milize_similar_chart.svg',
    'https://milize.co.jp/cms/wp-content/themes/milize/img/service/logo/milize_location.svg',
  ];

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>GUIDELINES</p>
        <h1 className="section-title" style={{ fontSize: 28 }}>ガイドラインリサーチ</h1>
        <p className="section-desc">
          提供されたスクレイピングデータには HEX / RGB / Pantone / CSS / フォント指定などの実測デザイントークンが含まれていないため、
          推測値の記載は行わず、実データが存在する項目のみ記載しています。
        </p>

        {/* カラー */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>カラー</h2>
          <div className="card" style={{ marginBottom: 16 }}>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.9, paddingLeft: 18 }}>
              <li>プライマリカラー: データなし（スクレイピングデータにHEX/RGB/Pantoneの記載なし）</li>
              <li>セカンダリカラー: データなし</li>
              <li>アクセントカラー: データなし</li>
              <li>テキストカラー: データなし</li>
              <li>背景色: データなし</li>
            </ul>
          </div>
          <div className="swatch-grid">
            <div>
              <div className="swatch-top" style={{ background: '#e5e7eb' }} />
              <div className="swatch-bottom">
                <div className="swatch-hex">データなし</div>
                <div className="swatch-name">実測不可</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 12 }}>
            カラー使用比率・グラデーション: 実測不可のため記載なし。
          </p>
        </section>

        {/* タイポグラフィ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>タイポグラフィ</h2>
          <div className="card">
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.9, paddingLeft: 18 }}>
              <li>h1〜h6 / body-lg / body / caption: データなし</li>
              <li>フォントスタック: データなし（テキストコンテンツのみでCSS情報が含まれていないため特定不可）</li>
            </ul>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 12 }}>
              ※本リサーチ資料（ポータル）自体の表示フォントには Noto Sans JP（Regular / Bold）を使用しています。
              これはクライアントの実際のブランドフォントではありません。
            </p>
          </div>
        </section>

        {/* トンマナ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>トンマナ</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
              角丸パターン: 抽出データにCSS情報がないため特定不可。
            </p>
            <p style={{ fontSize: 14, color: '#374151' }}>
              グロー・シャドウの深さ: 抽出データにCSS情報がないため特定不可。
            </p>
          </div>
        </section>

        {/* ブランドアセット */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>ブランドアセット</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>取引先ロゴ画像</p>
          <div className="card logo-grid" style={{ marginBottom: 24 }}>
            {brandLogos.map((src) => (
              <img key={src} src={src} alt="取引先ロゴ" />
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>プロダクトロゴ（サービスロゴ）</p>
          <div className="card logo-grid" style={{ marginBottom: 12 }}>
            {productLogos.map((src) => (
              <img key={src} src={src} alt="プロダクトロゴ" />
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>
            コーポレートロゴ画像: 明示的なロゴ画像URLの記載なし。背景・heroエリア画像: URLの記載なし。
          </p>
        </section>

        {/* ナビゲーション */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>ナビゲーション</h2>
          <div className="card">
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.9, paddingLeft: 18 }}>
              <li>ステッパー: データなし</li>
              <li>ページネーション: データなし</li>
              <li>ボタン: 「資料請求・お問い合わせ」ボタンの存在のみ確認（リンク先: https://milize.co.jp/contact）。CSS実測データはなし。</li>
            </ul>
          </div>
        </section>

        {/* ラベル・バッジ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>ラベル・バッジ</h2>
          <div className="card">
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.9, paddingLeft: 18 }}>
              <li>タグ: データなし</li>
              <li>エラーテキスト: データなし</li>
              <li>注釈: 事業内容説明文中に「※」の注記表現あり（例: 「業界初※」）。スタイル情報はなし。</li>
            </ul>
          </div>
        </section>

        {/* 情報表示 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>情報表示</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
              表組: 会社概要ページに「項目−値」形式の情報（社名/設立/代表者/資本金等）はあるが、HTML構造・CSSは未取得。
            </p>
            <p style={{ fontSize: 14, color: '#374151' }}>
              カード: ニュース一覧が日付＋タイトルのカード状リンクとして構成（例: 「2026.2.18 / MILIZE、日本経済新聞社・金融庁主催『FIN/SUM NEXT 2026』に登壇」）。ビジュアル仕様は不明。
            </p>
          </div>
        </section>

        {/* フォーム */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>フォーム</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#374151' }}>
              テキスト入力・テキストエリア・日付入力・ドロップダウン・生年月日・都道府県・性別選択・チェックボックス・ラジオボタン: すべてデータなし。
              お問い合わせページ自体のスクレイピング結果が今回のデータセットに含まれていないため実測不可。
            </p>
          </div>
        </section>

        {/* その他 */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>その他</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
              キーワード: 金融、AI（人工知能）、エンジニアリング
            </p>
            <p style={{ fontSize: 14, color: '#374151' }}>
              全体の印象: 「Financial AI Engineering」を掲げる金融×AIのB2B企業サイトで、大手金融機関との取引実績を前面に押し出したコーポレート／サービス紹介構成。
              配色・タイポグラフィ・コンポーネントの実測CSS情報が欠落しているため、デザイントークンとしての具体値は提示不可。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}