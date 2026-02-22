import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import type { Dataset } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import {
  FORMAT_COLORS,
  CHART_TYPE_COLORS,
  TOOL_COLORS,
  TOOL_LABELS,
} from "@/lib/constants";

interface DatasetTableProps {
  items: Dataset[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function DatasetTable({
  items,
  total,
  page,
  perPage,
  totalPages,
  onPageChange,
}: DatasetTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="md:hidden divide-y divide-gray-100">
        {items.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">
            No datasets match your filters.
          </div>
        ) : (
          items.map((dataset) => (
            <div key={dataset.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/datasets/${dataset.id}`}
                    className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {dataset.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">
                    {dataset.description}
                  </p>
                </div>
                <Badge className={TOOL_COLORS[dataset.tool]}>
                  {TOOL_LABELS[dataset.tool]}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {dataset.formats.map((f) => (
                    <Badge key={f} className={FORMAT_COLORS[f]}>
                      {f.toUpperCase()}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {dataset.chartTypes.slice(0, 3).map((ct) => (
                    <Badge key={ct} className={CHART_TYPE_COLORS[ct]}>
                      {ct}
                    </Badge>
                  ))}
                  {dataset.chartTypes.length > 3 && (
                    <Badge className="bg-gray-100 text-gray-500">
                      +{dataset.chartTypes.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Rows: {dataset.rows?.toLocaleString() ?? "—"}</span>
                <span>Size: {dataset.sizeKb ? `${dataset.sizeKb} KB` : "—"}</span>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/datasets/${dataset.id}`}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View
                </Link>
                <a
                  href={Object.values(dataset.downloadUrls)[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  <Download className="w-3 h-3" />
                  DL
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Dataset Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Tool
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Formats
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Chart Types
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Rows
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No datasets match your filters.
                </td>
              </tr>
            ) : (
              items.map((dataset) => (
                <tr
                  key={dataset.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/datasets/${dataset.id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 transition-colors text-sm"
                    >
                      {dataset.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                      {dataset.description}
                    </p>
                    {dataset.source && dataset.source !== "internal" && (
                      <a
                        href={dataset.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-xs text-indigo-400 hover:text-indigo-600 mt-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        {dataset.source.replace(/^https?:\/\//, "").split("/")[0]}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={TOOL_COLORS[dataset.tool]}>
                      {TOOL_LABELS[dataset.tool]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {dataset.formats.map((f) => (
                        <Badge key={f} className={FORMAT_COLORS[f]}>
                          {f.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {dataset.chartTypes.slice(0, 3).map((ct) => (
                        <Badge key={ct} className={CHART_TYPE_COLORS[ct]}>
                          {ct}
                        </Badge>
                      ))}
                      {dataset.chartTypes.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-500">
                          +{dataset.chartTypes.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {dataset.rows?.toLocaleString() ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {dataset.sizeKb ? `${dataset.sizeKb} KB` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/datasets/${dataset.id}`}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View
                      </Link>
                      <a
                        href={Object.values(dataset.downloadUrls)[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium"
                      >
                        <Download className="w-3 h-3" />
                        DL
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        perPage={perPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
