import datasetsJson from "@/data/datasets.json";
import type { Dataset, FilterState, ToolId, TreeNode } from "./types";
import { TOOL_LABELS } from "./constants";

export const allDatasets: Dataset[] = datasetsJson as Dataset[];

export function filterDatasets(
  datasets: Dataset[],
  state: Partial<FilterState>
): Dataset[] {
  let result = datasets;

  if (state.tool) {
    result = result.filter((d) => d.tool === state.tool);
  }
  if (state.formats?.length) {
    result = result.filter((d) =>
      state.formats!.some((f) => d.formats.includes(f))
    );
  }
  if (state.chartTypes?.length) {
    result = result.filter((d) =>
      state.chartTypes!.some((ct) => d.chartTypes.includes(ct))
    );
  }
  if (state.query) {
    const q = state.query.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tool.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result;
}

export function sortDatasets(
  datasets: Dataset[],
  sortBy: FilterState["sortBy"] = "name",
  sortDir: FilterState["sortDir"] = "asc"
): Dataset[] {
  return [...datasets].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortBy === "tool") {
      cmp = a.tool.localeCompare(b.tool);
    } else if (sortBy === "rows") {
      cmp = (a.rows ?? 0) - (b.rows ?? 0);
    } else if (sortBy === "sizeKb") {
      cmp = (a.sizeKb ?? 0) - (b.sizeKb ?? 0);
    }
    return sortDir === "asc" ? cmp : -cmp;
  });
}

export function paginateDatasets(
  datasets: Dataset[],
  page: number,
  perPage: number
): { items: Dataset[]; total: number; totalPages: number } {
  const total = datasets.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const items = datasets.slice((page - 1) * perPage, page * perPage);
  return { items, total, totalPages };
}

export function buildTreeFromDatasets(datasets: Dataset[]): TreeNode[] {
  const grouped = new Map<ToolId, Dataset[]>();
  for (const d of datasets) {
    if (!grouped.has(d.tool)) grouped.set(d.tool, []);
    grouped.get(d.tool)!.push(d);
  }
  return Array.from(grouped.entries())
    .map(([tool, items]) => ({
      id: tool,
      label: TOOL_LABELS[tool],
      type: "group" as const,
      count: items.length,
      children: [...items]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((d) => ({
          id: d.id,
          label: d.name,
          type: "leaf" as const,
          datasetId: d.id,
        })),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getDatasetById(id: string): Dataset | undefined {
  return allDatasets.find((d) => d.id === id);
}
