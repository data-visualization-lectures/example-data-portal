export type DataFormat = "csv" | "json" | "tsv" | "geojson" | "parquet" | "xlsx" | "xls" | "pbix" | "gexf" | "graphml";

export type ChartType =
  | "bar"
  | "line"
  | "scatter"
  | "pie"
  | "heatmap"
  | "map"
  | "histogram"
  | "area"
  | "bubble"
  | "treemap";

export type ToolId =
  | "vega-lite"
  | "d3js"
  | "seaborn"
  | "pandas"
  | "chartjs"
  | "observable-plot"
  | "matplotlib"
  | "sklearn"
  | "r-datasets"
  | "tableau"
  | "power-bi"
  | "rawgraphs"
  | "gephi";

export interface Dataset {
  id: string;
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

export interface TreeNode {
  id: string;
  label: string;
  type: "group" | "leaf";
  children?: TreeNode[];
  datasetId?: string;
  count?: number;
}

export interface FilterState {
  query: string;
  formats: DataFormat[];
  chartTypes: ChartType[];
  tool: ToolId | null;
  page: number;
  perPage: number;
  sortBy: "name" | "tool" | "rows" | "sizeKb";
  sortDir: "asc" | "desc";
}
