import type { ToolId, DataFormat, ChartType } from "./types";

export const TOOL_LABELS: Record<ToolId, string> = {
  "vega-lite":       "Vega-Lite",
  "d3js":            "D3.js",
  "seaborn":         "Seaborn",
  "pandas":          "Pandas",
  "chartjs":         "Chart.js",
  "observable-plot": "Observable Plot",
  "matplotlib":      "Matplotlib",
  "sklearn":         "Scikit-learn",
  "r-datasets":      "R",
  "tableau":         "Tableau",
  "power-bi":        "Power BI",
  "rawgraphs":       "RAWGraphs",
  "gephi":           "Gephi",
};

// Full literal class strings — do NOT construct dynamically (Tailwind v4 requirement)
export const FORMAT_COLORS: Record<DataFormat, string> = {
  csv:     "bg-blue-100 text-blue-800",
  json:    "bg-purple-100 text-purple-800",
  tsv:     "bg-teal-100 text-teal-800",
  geojson: "bg-green-100 text-green-800",
  parquet: "bg-orange-100 text-orange-800",
  xlsx:    "bg-emerald-100 text-emerald-800",
  xls:     "bg-lime-100 text-lime-800",
  pbix:    "bg-yellow-100 text-yellow-800",
  gexf:    "bg-fuchsia-100 text-fuchsia-800",
  graphml: "bg-violet-100 text-violet-800",
};

export const CHART_TYPE_COLORS: Record<ChartType, string> = {
  bar:       "bg-indigo-100 text-indigo-800",
  line:      "bg-sky-100 text-sky-800",
  scatter:   "bg-pink-100 text-pink-800",
  pie:       "bg-yellow-100 text-yellow-800",
  heatmap:   "bg-red-100 text-red-800",
  map:       "bg-emerald-100 text-emerald-800",
  histogram: "bg-violet-100 text-violet-800",
  area:      "bg-cyan-100 text-cyan-800",
  bubble:    "bg-rose-100 text-rose-800",
  treemap:   "bg-lime-100 text-lime-800",
};

export const TOOL_COLORS: Record<ToolId, string> = {
  "vega-lite":       "bg-purple-100 text-purple-800",
  "d3js":            "bg-orange-100 text-orange-800",
  "seaborn":         "bg-teal-100 text-teal-800",
  "pandas":          "bg-blue-100 text-blue-800",
  "chartjs":         "bg-pink-100 text-pink-800",
  "observable-plot": "bg-yellow-100 text-yellow-800",
  "matplotlib":      "bg-green-100 text-green-800",
  "sklearn":         "bg-sky-100 text-sky-800",
  "r-datasets":      "bg-indigo-100 text-indigo-800",
  "tableau":         "bg-rose-100 text-rose-800",
  "power-bi":        "bg-amber-100 text-amber-800",
  "rawgraphs":       "bg-red-100 text-red-800",
  "gephi":           "bg-cyan-100 text-cyan-800",
};

export const ALL_FORMATS: DataFormat[] = ["csv", "json", "tsv", "geojson", "parquet", "xlsx", "xls", "pbix", "gexf", "graphml"];

export const ALL_CHART_TYPES: ChartType[] = [
  "bar", "line", "scatter", "pie", "heatmap", "map", "histogram", "area",
];

export const DEFAULT_PER_PAGE = 10;
export const PER_PAGE_OPTIONS = [10, 20, 50] as const;
