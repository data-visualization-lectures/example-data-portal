"use client";

import { Search } from "lucide-react";
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
    <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center px-6 gap-4 z-10">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="データセットを検索..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-gray-400"
        />
      </div>
    </header>
  );
}
