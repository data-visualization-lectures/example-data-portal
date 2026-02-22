"use client";

import Link from "next/link";
import { Database, Menu, Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ToolGroup {
  id: string;
  label: string;
  count: number;
}

interface HeaderProps {
  toolGroups: ToolGroup[];
}

export function Header({ toolGroups }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const activeTool = params.get("tool");

  const [inputValue, setInputValue] = useState(params.get("query") ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 外部ナビゲーション（サイドバーのツールリンクなど）でURLのqueryが消えた場合に同期
  useEffect(() => {
    setInputValue(params.get("query") ?? "");
  }, [params]);

  const handleSearch = useCallback(
    (value: string) => {
      setInputValue(value);
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set("query", value);
      } else {
        next.delete("query");
      }
      next.set("page", "1");
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  const adminQuery = params.get("admin") === "true";

  const getToolHref = (toolId: string) => {
    const next = new URLSearchParams();
    next.set("tool", toolId);
    if (adminQuery) {
      next.set("admin", "true");
    }
    return `/datasets?${next.toString()}`;
  };

  return (
    <>
      <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center px-3 sm:px-4 md:px-6 gap-3 z-10">
        <Link href="/" className="md:hidden flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Data Portal</span>
        </Link>

        <div className="relative flex-1 max-w-none md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="データセットを検索..."
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="Open tools menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close tools menu backdrop"
          />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white border-l border-gray-200 shadow-xl flex flex-col">
            <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Tools</p>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                aria-label="Close tools menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {toolGroups.map((tool) => {
                const isActive = activeTool === tool.id;
                return (
                  <Link
                    key={tool.id}
                    href={getToolHref(tool.id)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate">{tool.label}</span>
                    <span className="ml-auto text-xs text-gray-400">{tool.count}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
