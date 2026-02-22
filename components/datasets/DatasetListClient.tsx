"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DatasetTable } from "./DatasetTable";
import type { Dataset } from "@/lib/types";

interface Props {
  items: Dataset[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export function DatasetListClient({
  items,
  total,
  page,
  perPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(newPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <DatasetTable
      items={items}
      total={total}
      page={page}
      perPage={perPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
