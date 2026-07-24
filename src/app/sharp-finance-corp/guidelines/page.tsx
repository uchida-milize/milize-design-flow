import Link from "next/link";

const colors = [
  {
    name: "Primary Blue",
    hex: "#0071BC",
    ratio: 40,
    desc: "メインCTA、リンク、主要アイコンなど、ブランドの中心となる色。信頼感と先進性を表現します。",
  },
  {
    name: "Secondary Blue",
    hex: "#004A99",
    ratio: 25,
    desc: "見出し、ヘッダー、フッターなど、堅実さと安定感を支える色。",
  },
  {
    name: "Accent Orange",
    hex: "#F5A623",
    ratio: 15,
    desc: "アクセント、強調、CTAのハイライトなど、挑戦と情熱を象徴。",
  },
  {
    name: "Text Black",
    hex: "#333333",
    ratio: 12,
    desc: "本文テキストなど、読みやすさを担保する基本色。",
  },
  {
    name: "Background Gray",
    hex: "#F0F0F0",
    ratio: 8,
    desc: "背景・余白など、コンテンツを引き立てる基調色。",
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <header className="siteHeader">
        <div className="container">
          <div className="siteHeader__logo">
            シャープ<span>ファイナンス</span>
          </div>
          <nav className="siteNav">
            <Link href="/guidelines">ガイドライン</Link>
            <Link href="/components">コンポーネント</Link>
          </nav>
        </div>
      </header>

      <section className="pageHero">
        <div className="container">
          <h1>ブランドガイドライン</h1>
          <p>信頼感・成長・挑戦 — シャープファイナンス株式会社のデザイン基盤</p>
        </div>
      </section>

      {/* カラーセクション */}
      <section className="section" id="colors">
        <div className="container">
          <span className="sectionLabel">Brand Colors</span>
          <h2 className="sectionTitle">ブランドカラー</h2>
          <p className="sectionSubtitle">
            堅実さと先進性を両立させるため、ブルーを基調に、オレンジをアクセントとして使用します。
          </p>

          {/* 使用比率バー（コンテンツ幅100%） */}
          <div className="full">
            <div className="ratioBar">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  className="ratioBar__segment"
                  style={{ width: `${c.ratio}%`, backgroundColor: c.hex }}
                >
                  {c.ratio}%
                </div>
              ))}
            </div>
            <div className="ratioLabels">
              {colors.map((c) => (
                <div className="ratioLabels__item" key={c.hex}>
                  <span
                    className="ratioLabels__swatch"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="ratioLabels__hex">{c.hex}</span>
                  <span>{c.name}</span>
                  <span>／{c.ratio}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="colorGrid">
            {colors.map((c) => (
              <div className="colorCard" key={c.hex}>
                <div
                  className="colorCard__swatch"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="colorCard__body">
                  <div className="colorCard__name">{c.name}</div>
                  <div className="colorCard__hex">{c.hex}</div>
                  <div className="colorCard__desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* タイポグラフィ */}
      <section className="section section--alt" id="typography">
        <div className="container">
          <span className="sectionLabel">Typography</span>
          <h2 className="sectionTitle">タイポグラフィ</h2>
          <p className="sectionSubtitle">
            見出し・本文ともに、堅実で読みやすいサンセリフ体を採用しています。
          </p>

          <div className="typeSample">
            <span className="typeSample__label">Heading / 見出しフォント</span>
            <h1 style={{ marginBottom: 12 }}>信頼を礎に、未来へ挑戦する。</h1>
            <h2 style={{ marginBottom: 12 }}>共に成長するパートナーへ。</h2>
            <h3>法人金融の新しいスタンダード</h3>
          </div>

          <div className="typeSample">
            <span className="typeSample__label">Body / 本文フォント</span>
            <p style={{ marginBottom: 12 }}>
              シャープファイナンス株式会社は、堅実かつ未来志向のデザインを基盤に、社会や顧客を根本から支え共に成長するという理念を表現しています。
            </p>
            <p style={{ color: "#666", fontSize: 13 }}>
              本文フォント：ヒラギノ角ゴシック／メイリオ・システムフォント使用
            </p>
          </div>
        </div>
      </section>

      {/* トンマナ */}
      <section className="section" id="tone">
        <div className="container">
          <span className="sectionLabel">Tone &amp; Manner</span>
          <h2 className="sectionTitle">トーン&amp;マナー</h2>
          <p className="sectionSubtitle">
            ブランドが体現する3つのキーワードと、全体の印象方針です。
          </p>

          <div style={{ marginBottom: 32 }}>
            <span className="keywordTag keywordTag--primary">信頼感</span>
            <span className="keywordTag keywordTag--accent">挑戦</span>
            <span className="keywordTag">成長</span>
          </div>

          <div className="toneBox">
            シャープファイナンス株式会社は、堅実かつ未来志向のデザインを基盤に、社会や顧客を根本から支え共に成長するという理念を表現します。
            高級感と信頼性を兼ね備えたトーンで、法人向け金融サービスとしての安心感と先進性を感じさせるトンマナを、
            全てのタッチポイントにおいて一貫して展開します。
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="container">
          © シャープファイナンス株式会社 Brand Guidelines
        </div>
      </footer>
    </>
  );
}