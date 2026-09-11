# PROGRESS.md — Claude Code / Cursor 共有進捗ログ

Claude Code（バックエンド・パイプライン担当）と Cursor（フロントエンドUI・アニメーション担当）が
交互に更新する進捗・TODO管理ファイルです。

**運用ルール**
- 作業を始める前に、このファイルの「現在の状態」「未対応・既知の問題」を読む。
- 作業が終わったら、下の「更新ログ」に **新しいエントリを一番上に追加**する（既存のログは書き換えない）。
- フォーマット: `## YYYY-MM-DD — <Claude Code | Cursor>` の見出しの下に、やったこと・変更したファイル・次にやるべきことを箇条書きで書く。
- プロジェクト概要は `CLAUDE.md`、Cursor向けの作業ルールは `.cursorrules` を参照。

---

## 現在の状態（2026-09-11 時点）

- ライブで確認できているクライアントポータル: `panasonic`, `hitachi`, `apple`（実データで生成済み・4ページ構成すべて動作確認済み）。ほか `dena` 等は旧世代の生成物で `resources.json` が無く、ガイドライン/コンポーネントページは「まだリサーチデータがありません」表示になる。
- ガイドライン・コンポーネントページは静的SAMPLE表示から、`resources.json` を実行時fetchして実データ（抽出カラー・フォント・ボタン/フォーム/カードCSSを適用した実HTML要素・design_mdのトンマナ解説）を描画する方式に刷新済み（マスターテンプレート `src/app/milize-asset-portal/` にも反映済み）。
- `extract-css` APIはボタン・カードに加えてフォーム要素（input/textarea/select/checkbox/radio）のCSSも抽出し、各スタイルに抽出元URLを記録するようになっている。
- クライアント一覧ページ（トップ `/`）のカラーバーは、各クライアントの最新コミットSHAを指定してfetchすることで `raw.githubusercontent.com` の `main` ブランチキャッシュ遅延を回避している。
- 各クライアントホームページの上部にロゴの大きい表示エリア＋ダウンロードリンク（`/api/download-logo` 経由）を追加済み。

## 未対応・既知の問題

- SerpApi のクォータ超過（429）が未解決。現状はGoogle検索系のDifyノードを Serper.dev 経由に切り替えて回避している（応急処置）。Google Custom Search Engine 経由（APIキー方式）は403で未解決。将来的に会社の稟議を通してGoogle検索に戻したいという要望あり。
- `dena` 等、旧世代（`resources.json` 非対応）のクライアントはガイドライン/コンポーネントページが空表示になる。再生成（`repair-portal` 経由等）すれば実データ表示になるはずだが未実施。
- Difyワークフローは GitHub に直接コミットするため、ローカルのgit履歴と `origin/main` が大きく乖離することがある。作業前に `git fetch origin main` して確認する運用（詳細は `CLAUDE.md`）。
- フロントエンドのUI/アニメーション（GSAP・3D演出等）の本格的な調整はこれから（Cursor側の担当領域）。現状は「実データを正しく表示する」ところまでで、視覚的な作り込みは未着手。

---

## 更新ログ

### 2026-09-11 — Claude Code

- `CLAUDE.md` / `.cursorrules` / `docs/PROGRESS.md` を新規作成し、Cursorとの共同作業体制をセットアップ。
- ガイドライン・コンポーネントページを実データ駆動に刷新（`src/lib/designExtract.ts`, `src/lib/cssStyle.ts`, `src/components/MarkdownLite.tsx`, `src/components/SourceLinks.tsx` を新規追加）。`extract-css` にフォーム要素抽出・要素ごとの参照元URL記録を追加。マスターテンプレート＋panasonic/hitachi/apple に適用済み、ブラウザ確認済み。
- 各クライアントホームページにロゴの大表示エリア＋ダウンロードリンク（`ClientLogoHero.tsx`, `/api/download-logo`）を追加。
- クライアント一覧ページの色抽出が「個別ページは更新されるが一覧のカラーバーが古いまま」に見える問題を調査・修正（`raw.githubusercontent.com` の `main` ブランチ参照キャッシュが原因。最新コミットSHA固定fetchに変更）。
- 次にやるべきこと: `dena` 等旧世代クライアントの再生成、Cursor側でのUI/アニメーション作り込みの受け入れ。
