# MILIZE Design Flow — design.md
# Dify ワークフロー入力仕様 / 新規クライアント生成ガイド

---

## カード UI 仕様（ClientCardGrid.tsx）

クライアント一覧ページのカードは `src/components/ClientCardGrid.tsx` が管理する。
Dify が生成するファイルはこのコンポーネントに影響しないが、
新規クライアントのディレクトリ構成がカードに表示されるタグを決定する。

### カードの構造

```
[カラーバー (40px)]
[クライアント名]  [︙ メニューボタン]
[slug]
[guidelines/page.tsx の TONE & MANNER セクション説明文（2行クランプ）]
[タグ群...]
```

### タグの自動生成ルール

カード下部のタグは `src/app/page.tsx` がクライアントの
サブディレクトリをスキャンして自動決定する。

| サブディレクトリ | 表示タグ | スタイル |
|---|---|---|
| `guidelines/` | ガイドラインリサーチ | 青系 (#f0f4ff / #4b5563) |
| `components/` | コンポーネント | 黄系 (#fef3c7 / #92400e) |
| `pptx/` | PPTX | 緑系 (#f0fdf4 / #166634) |

現在の全クライアント共通: ガイドラインリサーチ + コンポーネント（PPTX は未作成）

PPTX タグを表示させるには `src/app/{slug}/pptx/` ディレクトリを作成すればよい。

### 廃止した要素

- ~~Live バッジ~~ → 削除済み
- ~~デザインシステム タグ~~ → 動的タグに置換
- ~~× ボタン (カード右上 absolute)~~ → クライアント名行の右端に移動

---

## 用語規則

| 廃止 | 採用 | 理由 |
|---|---|---|
| ブランドリサーチ | ガイドラインリサーチ | 自主リサーチ資料のため |
| ブランドカラー | カラーガイドライン | 同上 |
| UIコンポーネント | コンポーネント | 簡潔化 |
| ブランドガイドライン | ガイドラインリサーチ | 同上 |

---

## Dify ワークフロー — 生成セクション仕様

Dify は以下の 4 セクションを生成して GitHub にコミットする。

### GLOBALS_CSS

`src/app/{slug}/globals.css` に出力。
クライアントのデザイントークン (CSS カスタムプロパティ) を定義する。

必須変数（`.{slug}-portal` スコープ内に定義すること）:
```css
.{slug}-portal {
  --primary-color: {メインカラー};      /* カラーバー ratio:35 */
  --secondary-color: {サブカラー};      /* カラーバー ratio:25 */
  --accent-color: {アクセントカラー};   /* カラーバー ratio:20 */
  --text-color: {テキストカラー};       /* カラーバー ratio:15 */
  --bg-color: {背景色};                 /* カラーバー ratio:5  */
}
```

これらの変数は `page.tsx` が自動読み取りしてカード上のカラーバーを生成する。手動設定不要。

### PAGE_TSX

`src/app/{slug}/page.tsx` に出力。
クライアントのトップページ（詳細ページ）。一覧カードとは別物。

含めるもの: クライアント紹介、ガイドライン/コンポーネントページへのリンク
含めないもの: ClientCardGrid の import、Live バッジ、削除ボタン

### GUIDELINES_PAGE

`src/app/{slug}/guidelines/page.tsx` に出力。
このファイルが存在すると「ガイドラインリサーチ」タグが表示される。

含めるもの: カラーガイドライン、タイポグラフィ、トンマナ（TONE & MANNER）
※「ブランド〇〇」という表記は使用しない。「カラーガイドライン」「タイポグラフィ」等を使用。

**重要：トンマナセクションの構造（必須）**
カード一覧の説明文はこのセクションから自動抽出される。以下の構造を必ず含めること:

```tsx
{/* TONE & MANNER セクション */}
<div className="section-label" style={{ color: primaryColor }}>TONE &amp; MANNER</div>
<div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>トンマナ</div>
{/* キーワードタグ群 */}
<div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
  {クライアントのトンマナを1〜2文で説明するテキスト}
</div>
```

`lineHeight: 1.8` の div 内テキストがカード説明文として使われる。

### COMPONENTS_PAGE

`src/app/{slug}/components/page.tsx` に出力。
このファイルが存在すると「コンポーネント」タグが表示される。

2タブ構成:
- タブ 1「実装確認済み」: クライアントの実サイトからスクレイピングした実測値ベースのコンポーネント
- タブ 2「派生デザイン（想定）」: ブランドトンマナを踏まえた連想コンポーネント

**【重要】スクレイピング対象ページ（優先順）**
以下のページを実際に調査し、コンポーネントのスタイルを実測すること：
1. お問い合わせフォームページ
2. ニュースリリース一覧・詳細ページ
3. 採用ページ（フォーム・ボタン類）
4. 会員登録・ログインページ
5. トップページ（ヘッダー・ナビ・CTA ボタン）

**【抽出必須プロパティ】**
各コンポーネントについて以下を実測してコードに反映すること：

| プロパティ | 対象 |
|---|---|
| `border-radius` | ボタン・入力欄・カード・ドロップダウン |
| `padding` (上下・左右) | ボタン・入力欄 |
| `font-family` | 見出し・本文・ラベル |
| `font-size` | 各テキスト要素 |
| `font-weight` | 見出し・ボタンラベル |
| `border` (色・太さ) | 入力欄・セレクトボックス |
| `background-color` | ボタン（通常・hover・disabled）|
| `color` | テキスト・プレースホルダー |
| `box-shadow` | カード・モーダル |
| チェックボックス・ラジオの形状 | カスタムスタイルの有無 |

**【コンポーネント種別（必須）】**
- プライマリボタン / セカンダリボタン / アウトラインボタン / disabled
- テキスト入力欄（通常・focus・error）
- セレクトボックス（ドロップダウン）
- ラジオボタン
- チェックボックス
- テキストエリア
- フォームラベル・バリデーションエラー文言

**【レンダリング形式】**
各コンポーネントは「実物表示エリア」と「CSS値の一覧表示」をセットで出力する：
```tsx
{/* 実物 */}
<div className="component-render">
  <button style={{ borderRadius: '4px', padding: '10px 24px', ... }}>送信する</button>
</div>
{/* 実測値 */}
<div className="component-code">
  border-radius: 4px{'\n'}padding: 10px 24px{'\n'}font-weight: 700
</div>
```

---

## 新規クライアント追加フロー

1. Dify に `company_name` + `client_slug` を入力して実行
2. Dify が 4 ファイルを生成 → GitHub コミット
3. `fixTemplateRefs()` が `client-template` 参照を新 slug に自動置換
4. Vercel が自動デプロイ
5. カードに自動追加（「ガイドラインリサーチ」「コンポーネント」タグ付き）

PPTX コンテンツが必要になったら `src/app/{slug}/pptx/page.tsx` を追加。
「PPTX」タグが自動表示される（コード変更不要）。

---

## カラーバー自動生成（BRAND_COLORS 廃止）

`BRAND_COLORS` は廃止。`globals.css` の CSS 変数から `page.tsx` が自動生成する。
手動でのカラー登録は不要。新規クライアントは `globals.css` の変数を正しく設定するだけでよい。
