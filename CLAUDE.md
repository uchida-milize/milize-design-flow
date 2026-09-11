# CLAUDE.md

このファイルは Claude Code（バックエンド／パイプライン／API担当）向けのプロジェクト概要です。
フロントエンドのUI・アニメーション（GSAP/3D等）は Cursor (Composer) と分担して進めています。
運用ルールは `.cursorrules`、進捗・TODOの共有は `docs/PROGRESS.md` を参照してください。

## プロジェクト概要

**milize-design-flow** は、クライアント企業ごとに「ブランドポータル」を自動生成するツールです。

```
企業名を入力
  → Dify ワークフローが対象企業のWEBサイトをリサーチ（Google/Serper検索・Firecrawlスクレイピング）
  → デザイン情報（カラー・フォント・ボタン/カード/フォームCSS・トンマナ解説）を抽出
  → GitHub リポジトリに src/app/{slug}/ 配下としてポータルページをコミット
  → Vercel が push を検知して自動デプロイ
```

生成された各クライアントポータルは以下の4ページで構成されます（`src/components/ClientPortalHeader.tsx` のナビゲーション参照）:

- `/{slug}` ホーム（ロゴ・カラーバー・各セクションへの導線）
- `/{slug}/guidelines` ガイドライン（カラーパレット・フォント・トンマナ解説）
- `/{slug}/components` コンポーネント集（抽出したボタン/フォーム/カード/角丸を実HTML要素として表示）
- `/{slug}/resources` リソース（Difyワークフロー各ノードの生出力を確認する画面）

## 技術スタック

- Next.js 16 (App Router) / React 19 / TypeScript (strict)
- Tailwind CSS v4（`tailwind.config.js` は無し。`src/app/globals.css` で `@import "tailwindcss"` するCSSベース設定）
- スタイリングは基本的に **インラインstyleオブジェクト + 各ポータル専用の `globals.css`**（Tailwindユーティリティは薄く併用）
- ホスティング: Vercel（GitHubリポジトリ連携、`main` ブランチへの push で自動デプロイ）
- データ永続化: 専用DBは無し。各クライアントの生成データは `src/app/{slug}/resources.json` としてリポジトリに直接コミットされる

## ビルド・開発コマンド

```bash
npm run dev     # next dev（ローカル開発サーバー）
npm run build   # next build（本番ビルド確認。デプロイ前に必ず通すこと）
npm run start   # next start（ビルド後の本番相当起動）
npm run lint    # eslint
npx tsc --noEmit -p .   # 型チェックのみ（package.jsonにscript登録はされていないが頻用）
```

## デプロイ

- **Vercel CLIでの手動デプロイは基本使わない。** GitHubの `main` ブランチに push すると Vercel が自動でビルド・デプロイする（GitHub Integration）。
- `waitForVercelDeploy`（`src/app/api/_lib/portal-helpers.ts`）が `VERCEL_TOKEN` / `VERCEL_PROJECT_ID` を使ってデプロイ完了をポーリングし、生成フロー（SSEストリーム）の進捗表示に使っている。
- このリポジトリで `git push` する際、**macOSのKeychain認証プロンプトでハングすることがある**。その場合は `gh auth token` を使い `https://x-access-token:${GH_TOKEN}@github.com/...` 形式のURLに直接pushすると回避できる。

## 環境変数（Vercel Project Settings で設定）

| 変数 | 用途 |
|---|---|
| `GITHUB_TOKEN` | ポータルファイルのコミット・削除（GitHub Contents/Trees API） |
| `VERCEL_TOKEN` / `VERCEL_PROJECT_ID` | デプロイ完了ポーリング |
| `DIFY_API_KEY` / `DIFY_BASE_URL` / `DIFY_FORM_BASE` / `DIFY_URL_COLLECTION_KEY` | Dify ワークフロー起動・再開API連携 |
| `APP_BASE_URL` | サーバー側から自分自身のAPI（`/api/extract-css` 等）を呼ぶ際のベースURL |

## ディレクトリ構成（重要な場所）

```
src/app/{slug}/              クライアントごとの生成済みポータル（page.tsx, globals.css, guidelines/, components/, resources/, resources.json, logo.*）
src/app/milize-asset-portal/ マスターテンプレート。新規/再生成時はここが常にコピー元になる
src/app/page.tsx             トップのクライアント一覧ページ（EXCLUDED_DIRS で表示除外を管理）
src/app/api/_lib/portal-helpers.ts  コア処理（テンプレート読み込み・置換、GitHub commit、Vercelデプロイ待機、色抽出パース）
src/app/api/extract-css/     対象URLをスクレイピングし色/フォント/ボタン・カード・フォームCSS/ロゴを抽出するAPI
src/app/api/dify-*/          Dify ワークフローの開始・再開・コールバック受け口
src/components/              全ポータル共通のReactコンポーネント（ClientLogo, ClientPortalHeader 等）
src/lib/                     Reactに依存しない共有ユーティリティ（designExtract.ts, cssStyle.ts）
```

## 全体の設計方針

- **クライアントごとのページは「テンプレートからの生成物」**。個別ページを直接凝ったコードで作り込むのではなく、まず `src/app/milize-asset-portal/` のテンプレートを直す→そこから各クライアントへ反映、という順番を基本にする。
- ガイドライン/コンポーネントページは静的なSAMPLE表示ではなく、`resources.json` を実行時にfetchして実データ（抽出色・フォント・ボタン/フォーム/カードCSS・design_md）を描画する方針（2026-09-11に刷新済み）。
- 各クライアントのCSSクラスは `.{slug}-portal` でスコープされている。共通コンポーネント側でクラス名を書く際はこの前提を崩さないこと。
- **Difyワークフローは GitHub に直接コミットする**（このNext.jsアプリ経由ではない）。そのため、ローカルのgitブランチが `origin/main` から大きく（時に100コミット以上）遅れることがある。作業前に必ず `git fetch origin main` して差分を確認し、pushする前に `git log --oneline HEAD..origin/main` で追従が必要か確認すること。
- 一覧ページ（`src/app/page.tsx`）は各クライアントの `globals.css` / `resources.json` を `raw.githubusercontent.com` から都度fetchする。`main` ブランチ参照はCDNキャッシュが残ることがあるため、最新コミットSHAを取得してそのSHA参照でfetchすることでキャッシュ遅延を回避している（`getClients()` 内）。
