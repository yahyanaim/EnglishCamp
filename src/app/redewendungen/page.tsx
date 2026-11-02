"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { IDIOMS } from "@/data/redewendungen";

export default function RedewendungenPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return IDIOMS;
    const q = search.toLowerCase();
    return IDIOMS.filter(
      (id) => id.idiom.toLowerCase().includes(q) || id.meaning.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedEntry = selected !== null ? filtered[selected] : null;

  if (selectedEntry) {
    return (
      <PageWrapper>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to all idioms
        </button>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] ring-1 ring-rose-200/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-3">
            <LearningArt name="💬" size={24} className="" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{selectedEntry.idiom}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{selectedEntry.meaning}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Example</h3>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{selectedEntry.example}</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Idioms</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English idioms, proverbs, and fixed expressions</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search idioms..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{filtered.length} idioms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((id, i) => (
            <motion.button key={id.idiom} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5">{id.idiom}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{id.meaning}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <LearningArt name="🔍" size={36} className=" block mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No idioms found</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
