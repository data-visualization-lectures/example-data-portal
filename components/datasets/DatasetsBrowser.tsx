"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Dataset, FilterState } from "@/lib/types";
import { filterDatasets, sortDatasets, paginateDatasets } from "@/lib/datasets";
import { DEFAULT_PER_PAGE, TOOL_LABELS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import { FilterBar } from "./FilterBar";
import { DatasetListClient } from "./DatasetListClient";

interface DatasetsBrowserProps {
  allDatasets: Dataset[];
}

function BrowserContent({ allDatasets }: DatasetsBrowserProps) {
  const params = useSearchParams();

  const formatParam = params.getAll("format");
  const chartParam = params.getAll("chart");
  const isAdmin = params.get("admin") === "true";

  const state: Partial<FilterState> = {
    query: params.get("query") ?? "",
    formats: formatParam as FilterState["formats"],
    chartTypes: chartParam as FilterState["chartTypes"],
    tool: (params.get("tool") ?? null) as FilterState["tool"],
    page: Math.max(1, Number(params.get("page") ?? 1)),
    perPage: Number(params.get("perPage") ?? DEFAULT_PER_PAGE),
    sortBy: (params.get("sortBy") as FilterState["sortBy"]) ?? "name",
    sortDir: (params.get("sortDir") as FilterState["sortDir"]) ?? "asc",
  };

  const filtered = filterDatasets(allDatasets, state);
  const sorted = sortDatasets(filtered, state.sortBy, state.sortDir);
  const { items, total, totalPages } = paginateDatasets(
    sorted,
    state.page!,
    state.perPage!
  );

  const heading = state.tool
    ? TOOL_LABELS[state.tool] ?? state.tool
    : "Datasets List";

  const toolSourceUrl = state.tool
    ? (allDatasets.find((d) => d.tool === state.tool && d.source && d.source !== "internal")?.source ?? null)
    : null;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{heading}</h1>
          {toolSourceUrl && (
            <a
              href={toolSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-0.5"
            >
              <ExternalLink className="w-3 h-3" />
              {toolSourceUrl}
            </a>
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
              Export
            </button>
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              + Add Dataset
            </button>
          </div>
        )}
      </div>

      <FilterBar />

      <p className="text-sm text-gray-500 mb-3">
        {total} 件のデータセット
      </p>

      <DatasetListClient
        items={items}
        total={total}
        page={state.page!}
        perPage={state.perPage!}
        totalPages={totalPages}
      />
    </>
  );
}

export function DatasetsBrowser({ allDatasets }: DatasetsBrowserProps) {
  return (
    <Suspense fallback={<div className="text-sm text-gray-400 py-8 text-center">Loading...</div>}>
      <BrowserContent allDatasets={allDatasets} />
    </Suspense>
  );
}
