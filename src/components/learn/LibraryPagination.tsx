"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export const pageCount = (total: number, size: number) => Math.max(1, Math.ceil(total / size));
export const pageSlice = <T,>(items: readonly T[], page: number, size: number) => items.slice((page - 1) * size, page * size);

/** Shared pager for the Read and Listening libraries. Hidden when everything fits on one page. */
export function LibraryPagination({ page, total, size, label, onChange }: { page: number; total: number; size: number; label: string; onChange: (page: number) => void }) {
  const pages = pageCount(total, size);
  if (pages <= 1) return null;
  const start = Math.max(1, Math.min(page - 2, pages - 4)), numbers = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i);
  return (
    <nav className="camp-library-pagination" aria-label={label}>
      <span className="camp-library-pagination-range">{(page - 1) * size + 1}–{Math.min(total, page * size)} of {total}</span>
      <div>
        <Button variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><ChevronLeft size={16} aria-hidden="true" /></Button>
        {numbers.map(n => (
          <Button key={n} variant={n === page ? "default" : "outline"} aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined} onClick={() => onChange(n)}>{n}</Button>
        ))}
        <Button variant="outline" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Next page"><ChevronRight size={16} aria-hidden="true" /></Button>
      </div>
    </nav>
  );
}
