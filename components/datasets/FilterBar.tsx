"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { ALL_FORMATS, ALL_CHART_TYPES, FORMAT_COLORS, CHART_TYPE_COLORS } from "@/lib/constants";
import type { DataFormat, ChartType } from "@/lib/types";

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeFormats = params.getAll("format") as DataFormat[];
  const activeChartTypes = params.getAll("chart") as ChartType[];

  const toggle = useCallback(
    (key: "format" | "chart", value: string) => {
      const current = params.getAll(key);
      const next = new URLSearchParams(params.toString());
      next.delete(key);

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updated.forEach((v) => next.append(key, v));
      next.set("page", "1");
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  const clearAll = () => {
    const next = new URLSearchParams(params.toString());
    next.delete("format");
    next.delete("chart");
    next.set("page", "1");
    router.push(`${pathname}?${next.toString()}`);
  };

  const hasActive = activeFormats.length > 0 || activeChartTypes.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {/* Format filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
          Format
        </span>
        {ALL_FORMATS.map((f) => (
          <button
            key={f}
            onClick={() => toggle("format", f)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              activeFormats.includes(f)
                ? `${FORMAT_COLORS[f]} border-transparent ring-2 ring-offset-1 ring-indigo-400`
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

      {/* Chart type filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
          Chart
        </span>
        {ALL_CHART_TYPES.map((ct) => (
          <button
            key={ct}
            onClick={() => toggle("chart", ct)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
              activeChartTypes.includes(ct)
                ? `${CHART_TYPE_COLORS[ct]} border-transparent ring-2 ring-offset-1 ring-indigo-400`
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {ct}
          </button>
        ))}
      </div>

      {hasActive && (
        <button
          onClick={clearAll}
          className="ml-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
