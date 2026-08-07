# MILIZE Design Flow — Claude Code コンテキスト

## プロジェクト概要

クライアント別のブランドデザインガイドライン・営業アセットを自動生成するポータルサイト。
Next.js 16 App Router + Vercel でホスティング。クライアントのWebサイトURLを入力すると、CSSを解析してブランドカラー・フォント・スタイルを抽出し、ポータルページを自動生成する。

**本番URL（main）**: https://milize-design-flow.vercel.app  
**GitHub**: https://github.com/uchida-milize/milize-design-flow  
**リポジトリオーナー**: uchida-milize

---

## ブランチ戦略

| ブランチ | 用途 | アーキテクチャ |
|---|---|---|
| `main` | 本番（安定版） | Dify ワークフローベース |
| `ver2` | 新アーキテクチャ開発中 | Claude / generate-portal API ベース |

**現在の作業ブランチは `ver2`**。

---

## ディレクトリ構造

```
src/app/
├── page.tsx                    # クライアント一覧ページ（トップ）
├── [client-slug]/              # 各クライアントポータル（自動生成）
│   ├── page.tsx                # ホーム
│   ├── globals.css             # ブランドカラーCSS変数
│   ├── guidelines/page.tsx     # トンマナ・ガイドライン
│   ├── components/page.tsx     # UIコンポーネント
│   └── resources/page.tsx      # リサーチリソース
├── milize-asset-portal/        # ★ テンプレート（全クライアントの雛形）
│   ├── page.tsx
│   ├── globals.css
│   ├── guidelines/page.tsx
│   ├── components/page.tsx
│   └── resources/page.tsx
└── api/
    ├── generate-portal/route.ts  # ★ メイン生成API（ver2の核心）
    ├── extract-css/route.ts      # CSSカラー・トークン抽出API
    ├── _lib/portal-helpers.ts    # テンプレート読込・コミットヘルパー
    ├── dify-create/              # [main専用] Dify起動
    ├── dify-resume/              # [main専用] Dify再開
    └── dify-callback/            # [main専用] Difyコールバック
```

---

## ver2 アーキテクチャ — generate-portal の仕組み

### フロー

```
1. POST /api/generate-portal
   { company_name, client_slug, selected_urls }
        ↓
2. selected_urls を解析
   フォーマット: "https://example.com||カラー,フォント"
        ↓
3. 各URLに POST /api/extract-css
   → hex_colors（パイプ形式）, border_radii, css_files を取得
        ↓
4. hexMap に集計（usages付き）
   visualWeight() で視覚的重みを計算してソート
   （background-color×5, fill×4, CSS変数×3, border×1, color×0.3）
        ↓
5. buildDesignColorsFromEntries() で DesignColors を構築
   { primary, secondary, accent, text, bg, brandColors[] }
        ↓
6. readAndFixDifyFiles() でテンプレートを読み込み、
   DesignColors を注入してファイルを生成
        ↓
7. refreshAndCommitClientFiles() で GitHub へコミット
        ↓
8. waitForVercelDeploy() で Vercel デプロイ完了を待機
        ↓
9. SSEストリームでフロントに進捗を送信
```

### 重要な型

```typescript
interface HexEntry {
  hex: string;    // "#004A99"
  count: number;  // CSS内での出現回数
  usages: string[]; // ["background-color", "color"] 等
}

interface DesignColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  bg: string;
  brandColors: Array<{ hex: string; ratio: number }>;
}
```

### extract-css の出力フォーマット

```
#004A99 | color, background-color | 出現12回 | [external-css]
```

parseHexColorsString() でパースしている。

---

## globals.css — ブランドカラー変数の仕様

クライアント一覧ページ（page.tsx）が `--brand-color-1〜5` と `--brand-ratio-1〜5` を読んでカードのカラーバーを描画する。

```css
:root {
  --brand-color-1: #004A99;   /* プライマリ */
  --brand-ratio-1: 60;
  --brand-color-2: #0071BC;
  --brand-ratio-2: 25;
  --brand-color-3: #F5A623;
  --brand-ratio-3: 15;
}
```

portal-helpers.ts の `readAndFixDifyFiles()` 内で globals.css に注入される。

---

## 技術制約

### GitHub API
- **curl と Python urllib は環境プロキシに遮断されるため使用不可**
- **Node.js の https モジュールのみ GitHub API にアクセス可能**
- トークン: 環境変数 `GITHUB_TOKEN`（Vercelにも設定済み）
- コミットには GitHub Trees API か Contents API（PUT）を使用

### Vercel
- 環境変数は Vercel プロジェクト設定から確認
  - `GITHUB_TOKEN`: GitHubへのコミット用
  - `VERCEL_TOKEN`: デプロイ待機用
  - `VERCEL_PROJECT_ID`: デプロイ待機用
  - `APP_BASE_URL`: https://milize-design-flow.vercel.app
- `next: { revalidate: 60 }` で ISR キャッシュ（60秒で更新）

### Node.js スクリプト（/tmp/ に保存）
APIを直接叩く修正は Node.js スクリプトで実行。以下のパターンを使用：

```js
const https = require('https');
const TOKEN = process.env.GITHUB_TOKEN;
// apiRequest(method, path, body) → { status, body }
```

---

## 現在の既知の課題・TODO

### 優先度高
- [ ] **コンポーネントページのプライマリボタン背景色** が `#000000` ハードコード  
  → `milize-asset-portal/components/page.tsx` 61行目付近  
  → `primaryColor`（DesignColors.primary）を使うように修正する

- [ ] **ver2 専用 Vercel プロジェクト** の作成（`ver2` ブランチをデプロイ）  
  → Vercel ダッシュボードから手動で `milize-design-flow-v2` を作成  
  → Production Branch を `ver2` に設定  
  → 環境変数を既存プロジェクトからコピー

### 優先度中
- [ ] **selected_urls の UI** — 現在は NewClientButton でテキスト入力  
  → URL ごとにカテゴリ（カラー/フォント/UIパターン）をチェックボックスで選べるようにしたい

- [ ] **design.md の自動生成** — 現在は情報が少ない  
  → ブランドカラー・フォント・スペーシングをより詳細に記述する

- [ ] **guidelines / components ページ** のコンテンツ充実  
  → テンプレートの汎用テキストをクライアント情報で上書きする仕組みが未完成

### 優先度低
- [ ] EXCLUDED_DIRS（page.tsx）に不要なスラグが増えてきた → 整理

---

## テンプレートファイルの修正ルール

`milize-asset-portal/` 以下が全クライアントの雛形。修正時のルール：

1. `{/* SAMPLEバナー */}` ブロックは portal-helpers.ts の `readAndFixDifyFiles()` で自動除去される
2. `clientName` 定数はスラグ→会社名に自動置換される
3. CSS変数（`--brand-color-*`等）はブランドカラーに自動注入される
4. テンプレートに手を加えたら必ず `ver2` ブランチにコミットすること

---

## よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド確認
npm run build

# GitHub API テスト（Node.js）
node -e "require('https').get({hostname:'api.github.com', path:'/repos/uchida-milize/milize-design-flow/git/ref/heads/ver2', headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN, Accept:'application/vnd.github+json','User-Agent':'test'}}, r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log(JSON.parse(d).object.sha.slice(0,8)))})"
```

---

## コミットメッセージ規則

```
feat: 新機能
fix: バグ修正
refactor: リファクタリング
docs: ドキュメント
chore: 雑務・設定
```

コミット先は常に `ver2` ブランチ（mainへの直接pushは避ける）。
