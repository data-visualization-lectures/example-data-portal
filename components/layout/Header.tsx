"use client";

import Link from "next/link";
import { Database, Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [inputValue, setInputValue] = useState(params.get("query") ?? "");

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

  return (
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
    </header>
  );
}
