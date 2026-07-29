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
[クライアント名]  [× 非表示ボタン]
[slug]
[デザインガイドライン・コンポーネントカタログを確認できます。]
[タグ群...]  [開く ›]
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

必須変数:
```css
:root {
  --color-primary: {main};
  --color-secondary: {sub};   /* <- page.tsx がカラーバー抽出に使用 */
  --color-accent: {accent};
}
```

### PAGE_TSX

`src/app/{slug}/page.tsx` に出力。
クライアントのトップページ（詳細ページ）。一覧カードとは別物。

含めるもの: クライアント紹介、ガイドライン/コンポーネントページへのリンク
含めないもの: ClientCardGrid の import、Live バッジ、削除ボタン

### GUIDELINES_PAGE

`src/app/{slug}/guidelines/page.tsx` に出力。
このファイルが存在すると「ガイドラインリサーチ」タグが表示される。

含めるもの: カラーガイドライン、タイポグラフィ、デザインコンセプト
※「ブランド〇〇」という表記は使用しない。「カラーガイドライン」「タイポグラフィ」等を使用。

### COMPONENTS_PAGE

`src/app/{slug}/components/page.tsx` に出力。
このファイルが存在すると「コンポーネント」タグが表示される。

2タブ構成 (sharp-finance-corp テンプレート準拠):
- タブ 1「実装確認済み」: スクレイピング済みコンポーネント
- タブ 2「派生デザイン（想定）」: 連想コンポーネント

---

## 新規クライアント追加フロー

1. Dify に `company_name` + `client_slug` を入力して実行
2. Dify が 4 ファイルを生成 → GitHub コミット
3. `fixTemplateRefs()` が `sharp-finance-corp` 参照を新 slug に自動置換
4. Vercel が自動デプロイ
5. カードに自動追加（「ガイドラインリサーチ」「コンポーネント」タグ付き）

PPTX コンテンツが必要になったら `src/app/{slug}/pptx/page.tsx` を追加。
「PPTX」タグが自動表示される（コード変更不要）。

---

## BRAND_COLORS 追加手順

`src/components/ClientCardGrid.tsx` の `BRAND_COLORS` オブジェクトに追記:

```typescript
'{slug}': [
  { hex: '{color1}', ratio: 40 },
  { hex: '{color2}', ratio: 30 },
  // ...ratio 合計 = 100
],
```

未定義の場合は `globals.css` の `--color-primary` を単色で使用。
