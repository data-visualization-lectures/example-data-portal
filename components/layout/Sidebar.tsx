"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Database, ExternalLink, LayoutDashboard } from "lucide-react";
import type { TreeNode } from "@/lib/types";
import { TOOL_LABELS } from "@/lib/constants";

interface SidebarProps {
  tree: TreeNode[];
}

export function Sidebar({ tree }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTool = searchParams.get("tool");

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const isAllActive =
    (pathname === "/" || pathname === "/datasets") && !activeTool;

  return (
    <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-gray-200 flex-col overflow-y-auto">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-gray-200 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Example Data Portal</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {/* All datasets */}
        <Link
          href="/datasets"
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isAllActive
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          All Datasets
        </Link>

        <div className="pt-3 pb-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
            By Tool
          </p>
        </div>

        {/* Tool groups */}
        {tree.map((group) => {
          const isGroupActive = activeTool === group.id;
          return (
            <div key={group.id}>
              <div className="flex items-center">
                <button
                  onClick={() => toggle(group.id)}
                  className="w-5 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0 ml-1"
                  aria-label={expanded.has(group.id) ? "Collapse" : "Expand"}
                >
                  {expanded.has(group.id) ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                <Link
                  href={`/datasets?tool=${group.id}`}
                  className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isGroupActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">
                    {TOOL_LABELS[group.id as keyof typeof TOOL_LABELS] ?? group.id}
                  </span>
                  <span className="ml-auto text-xs text-gray-400 font-normal shrink-0">
                    {group.count}
                  </span>
                </Link>
              </div>

              {expanded.has(group.id) && group.children && (
                <div className="ml-6 mt-0.5 space-y-0.5">
                  {group.children.map((leaf) => {
                    const isLeafActive = pathname === `/datasets/${leaf.datasetId}`;
                    return (
                      <Link
                        key={leaf.id}
                        href={`/datasets/${leaf.datasetId}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                          isLeafActive
                            ? "bg-indigo-50 text-indigo-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className="truncate">{leaf.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer links */}
      <div className="p-3 border-t border-gray-100 space-y-1 shrink-0">
        <a
          href="https://visualizing.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-3 h-3 shrink-0" />
          Visualizing.JP
        </a>
        <a
          href="https://data-viz-lectures.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-3 h-3 shrink-0" />
          データ可視化講習
        </a>
      </div>
    </aside>
  );
}
