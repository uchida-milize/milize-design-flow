import Link from "next/link";

export default function ComponentsPage() {
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
          <h1>UIコンポーネント</h1>
          <p>ブランドガイドラインに基づく実装用パーツ集</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="section" id="buttons">
        <div className="container">
          <span className="sectionLabel">Buttons</span>
          <h2 className="sectionTitle">ボタン</h2>
          <p className="sectionSubtitle">用途に応じて4種類のボタンを使い分けます。</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn btn-primary">お問い合わせ</button>
            <button className="btn btn-secondary">資料請求</button>
            <button className="btn btn-accent">今すぐ申し込む</button>
            <button className="btn btn-outline">詳しく見る</button>
            <button className="btn btn-disabled" disabled>
              受付終了
            </button>
          </div>
        </div>
      </section>

      {/* Badges & Alerts */}
      <section className="section section--alt" id="feedback">
        <div className="container">
          <span className="sectionLabel">Badges &amp; Alerts</span>
          <h2 className="sectionTitle">バッジ・アラート</h2>
          <p className="sectionSubtitle">ステータスや通知の表現に使用します。</p>

          <div style={{ marginBottom: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="badge badge-primary">審査中</span>
            <span className="badge badge-secondary">契約済み</span>
            <span className="badge badge-accent">新規</span>
          </div>

          <div className="alert alert-info">
            ご入力内容を確認の上、担当者よりご連絡いたします。
          </div>
          <div className="alert alert-success">
            お申し込みが正常に完了しました。
          </div>
          <div className="alert alert-warning">
            必須項目が未入力です。ご確認ください。
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section" id="cards">
        <div className="container">
          <span className="sectionLabel">Cards</span>
          <h2 className="sectionTitle">カード</h2>
          <p className="sectionSubtitle">サービス紹介や実績紹介に使用するカードコンポーネント。</p>

          <div className="grid3">
            <div className="card">
              <span className="card__eyebrow">Service</span>
              <h3 className="card__title">法人融資サービス</h3>
              <p className="card__text">
                成長企業の挑戦を資金面から支える、柔軟な融資プランをご用意しています。
              </p>
            </div>
            <div className="card">
              <span className="card__eyebrow">Service</span>
              <h3 className="card__title">資産運用コンサルティング</h3>
              <p className="card__text">
                専門アドバイザーが企業の将来を見据えた資産形成をサポートします。
              </p>
            </div>
            <div className="card card--bordered">
              <span className="card__eyebrow">Support</span>
              <h3 className="card__title">導入サポート</h3>
              <p className="card__text">
                導入前から導入後まで、専任担当者が一貫してサポートいたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="section section--alt" id="forms">
        <div className="container">
          <span className="sectionLabel">Forms</span>
          <h2 className="sectionTitle">フォーム</h2>
          <p className="sectionSubtitle">お問い合わせ・申し込みフォームに使用する入力パーツ。</p>

          <div className="grid2">
            <div className="formGroup">
              <label className="formLabel">会社名</label>
              <input className="formInput" type="text" placeholder="シャープ株式会社" />
            </div>
            <div className="formGroup">
              <label className="formLabel">ご担当者名</label>
              <input className="formInput" type="text" placeholder="山田 太郎" />
            </div>
            <div className="formGroup">
              <label className="formLabel">メールアドレス</label>
              <input className="formInput" type="email" placeholder="example@sharp-finance.co.jp" />
            </div>
            <div className="formGroup">
              <label className="formLabel">ご相談内容</label>
              <select className="formSelect">
                <option>法人融資について</option>
                <option>資産運用について</option>
                <option>その他</option>
              </select>
            </div>
          </div>
          <div className="formGroup">
            <label className="formLabel">お問い合わせ内容</label>
            <textarea className="formTextarea" rows={4} placeholder="お問い合わせ内容をご記入ください" />
          </div>
          <button className="btn btn-primary">送信する</button>
        </div>
      </section>

      {/* Table */}
      <section className="section" id="table">
        <div className="container">
          <span className="sectionLabel">Table</span>
          <h2 className="sectionTitle">テーブル</h2>
          <p className="sectionSubtitle">プラン比較や実績データの表示に使用します。</p>

          <table className="table">
            <thead>
              <tr>
                <th>プラン</th>
                <th>融資限度額</th>
                <th>金利</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>スタンダード</td>
                <td>3,000万円</td>
                <td>年 2.5%〜</td>
                <td><span className="badge badge-primary">受付中</span></td>
              </tr>
              <tr>
                <td>プレミアム</td>
                <td>1億円</td>
                <td>年 1.8%〜</td>
                <td><span className="badge badge-secondary">審査あり</span></td>
              </tr>
              <tr>
                <td>エンタープライズ</td>
                <td>個別見積</td>
                <td>個別見積</td>
                <td><span className="badge badge-accent">要相談</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabs & Progress */}
      <section className="section section--alt" id="tabs">
        <div className="container">
          <span className="sectionLabel">Tabs &amp; Progress</span>
          <h2 className="sectionTitle">タブ・プログレス</h2>
          <p className="sectionSubtitle">申し込みステップやコンテンツ切り替えに使用します。</p>

          <div className="tabs">
            <div className="tabs__item tabs__item--active">サービス概要</div>
            <div className="tabs__item">導入事例</div>
            <div className="tabs__item">よくある質問</div>
          </div>

          <div style={{ marginBottom: 12, fontSize: 13, color: "#666" }}>
            お申し込み進捗：ステップ 2 / 4
          </div>
          <div className="progressTrack">
            <div className="progressFill" style={{ width: "50%" }} />
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="container">
          © シャープファイナンス株式会社 Component Library
        </div>
      </footer>
    </>
  );
}