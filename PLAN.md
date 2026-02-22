# Example Data Portal — 実装計画

## Context
各種データ可視化ツール（Vega-Lite, D3.js, Seaborn, Pandas, Chart.js等）のサンプルデータを提供するポータルサイトを新規構築する。_tempにある参考デザイン（Fixoria salesダッシュボード）のスタイル（左サイドバー、ヘッダー、フィルタバー、テーブル）を踏襲し、ツール名によるツリー分類とタグ分類（ファイル形式・チャートタイプ）を実現する。

## 技術スタック
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS v4**
- **lucide-react** (アイコン)
- **bun** (パッケージマネージャー)
- 静的データ（JSONファイル、DBなし）、`output: "export"` で静的サイトとして出力

## ディレクトリ構成

```
example-data-portal/
├── app/
│   ├── globals.css              # @import "tailwindcss" + CSS変数
│   ├── layout.tsx               # ルートレイアウト（Sidebar + Header）
│   ├── page.tsx                 # /datasets へリダイレクト
│   └── datasets/
│       ├── page.tsx             # データセット一覧（Server Component）
│       └── [id]/
│           └── page.tsx         # データセット詳細（Server Component）
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # 左ナビ（ツリー構造、折りたたみ）
│   │   └── Header.tsx           # 上部バー（検索、アイコン）
│   ├── datasets/
│   │   ├── FilterBar.tsx        # フォーマット/チャートタイプ フィルタ
│   │   ├── DatasetTable.tsx     # テーブル（バッジ、DLリンク）
│   │   └── DatasetListClient.tsx # ページネーション用Clientラッパー
│   └── ui/
│       ├── Badge.tsx            # カラーバッジ
│       └── Pagination.tsx       # ページネーション
├── lib/
│   ├── types.ts                 # 型定義
│   ├── constants.ts             # ラベル、カラーマップ
│   └── datasets.ts              # filter / sort / paginate / buildTree
├── data/
│   └── datasets.json            # 全データセット定義（15件以上）
├── public/
│   └── data/
│       ├── chartjs-monthly-sales.json
│       └── chartjs-browser-stats.json
└── next.config.ts               # output: "export"
```

## データモデル（`lib/types.ts`）

```typescript
type DataFormat = "csv" | "json" | "tsv" | "geojson" | "parquet";
type ChartType = "bar" | "line" | "scatter" | "pie" | "heatmap" | "map" | "histogram" | "area" | "bubble" | "treemap";
type ToolId = "vega-lite" | "d3js" | "seaborn" | "pandas" | "chartjs" | "observable-plot" | "matplotlib";

interface Dataset {
  id: string;             // URLスラッグ
  name: string;
  tool: ToolId;
  formats: DataFormat[];
  chartTypes: ChartType[];
  description: string;
  longDescription?: string;
  rows?: number;
  columns?: number;
  sizeKb?: number;
  license?: string;
  source?: string;
  downloadUrls: { [K in DataFormat]?: string };
  tags?: string[];
}
```

## 収録データセット（15件）

| ツール | データセット |
|---|---|
| Vega-Lite | Cars, Seattle Weather, Stocks, Movies, Iris |
| D3.js | US States (GeoJSON), World 110m |
| Seaborn | Titanic, Penguins, Tips |
| Chart.js | Monthly Sales, Browser Stats（合成データ） |
| Observable Plot | Olympic Athletes, GISTEMP |
| Pandas | NBA Players |

## UIデザイン方針（参考画像に合わせる）
- **背景**: `#F9FAFB`（gray-50）
- **サイドバー**: 白、幅256px、ボーダー
- **アクセントカラー**: `#6366F1`（indigo-500/600）
- **バッジ**: フォーマット・チャートタイプ・ツールごとに色分け
- **テーブル**: ヘッダーにソートアイコン、各行にチェックボックス、バッジ、DLリンク
- **ページネーション**: 「Result X-Y of Z」＋前/次/ページ番号

## 状態管理
URLサーチパラムを単一ソースとして使用：
- `?format=csv&chart=bar&query=iris&page=2`
- ServerComponentがsearchParamsを読み取り→フィルタ済みデータをpropsで渡す
- FilterBar/Pagination（Client）は `router.push()` でURLを更新
- useStateはSidebarの折りたたみ状態のみ

## 実装順序

**Phase 1 — 基盤**
1. `bun create next-app` スキャフォールド → Tailwind v4に更新
2. `lib/types.ts`, `lib/constants.ts`
3. `data/datasets.json`（15件）
4. `lib/datasets.ts`（filter/sort/paginate/buildTree）

**Phase 2 — UIプリミティブ**
5. `components/ui/Badge.tsx`, `Pagination.tsx`
6. `app/globals.css`

**Phase 3 — レイアウトシェル**
7. `components/layout/Header.tsx`
8. `components/layout/Sidebar.tsx`
9. `app/layout.tsx`

**Phase 4 — 一覧ページ**
10. `components/datasets/FilterBar.tsx`
11. `components/datasets/DatasetTable.tsx`
12. `components/datasets/DatasetListClient.tsx`
13. `app/datasets/page.tsx`, `app/page.tsx`

**Phase 5 — 詳細ページ & 仕上げ**
14. `app/datasets/[id]/page.tsx`（`generateStaticParams`含む）
15. `app/not-found.tsx`
16. `public/data/`合成データJSON配置

## 注意事項
- Tailwind v4でバッジクラスは定数ファイルに文字列リテラルで完全記述（動的結合NG）
- `searchParams`は`await`必須（Next.js 14 async API）
- `output: "export"`には`generateStaticParams`が必須

## 検証方法
1. `bun dev` でローカル起動 → `http://localhost:3000` で一覧表示確認
2. フィルタ（Format/ChartType）クリックでURLが変わり絞り込みが動作すること
3. サイドバーのツール名クリックで折りたたみ展開・データセットリンクが動作すること
4. 各行の「View」リンクで詳細ページへ遷移・メタデータ表示確認
5. 「Download」リンクでファイルDLが動作すること
6. `bun run build` でビルドエラーなし、`out/` に静的ファイルが生成されること
