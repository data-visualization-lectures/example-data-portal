# Example Data Portal

データ可視化ツール向けのサンプルデータを横断的に閲覧・ダウンロードできるポータルです。  
静的サイトとしてビルドし、GitHub Pages で配信します。

- Production URL: `https://example-data-portal.dataviz.jp/`
- Framework: Next.js App Router (`output: "export"`)
- Dataset count: 80

## 主な機能

- ツール別ナビゲーション（Sidebar）
- フォーマット / チャートタイプのフィルタ
- キーワード検索
- ページネーション付き一覧表示
- データセット詳細ページ（メタ情報・ダウンロードリンク）
- モバイル閲覧向けレイアウト最適化
- 管理機能ボタン（Export / Add Dataset）は現状UI非表示

## 技術構成

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React

## 主要ディレクトリ

- `app/`: ルーティングとページ
- `components/`: UIコンポーネント群
- `data/datasets.json`: データセット定義
- `public/data/`: ローカル配信用のデータファイル
- `lib/`: 型・定数・フィルタ/ソート等のロジック
- `.github/workflows/deploy-pages.yml`: GitHub Pages デプロイ定義

## ローカル開発

```bash
npm ci
npm run dev
```

- 開発URL: `http://localhost:3000`
- 本番相当ビルド確認:

```bash
npm run build
```

## GitHub Pages デプロイ

`main` への push で GitHub Actions が実行され、`out/` を Pages にデプロイします。

- Workflow: `.github/workflows/deploy-pages.yml`
- Pages Source: `GitHub Actions`
- Custom Domain: `example-data-portal.dataviz.jp`（`public/CNAME` 管理）

## 分析タグ

Google tag（gtag.js）を `app/layout.tsx` で読み込んでいます。

- Measurement ID: `G-2BEWN8STG4`
