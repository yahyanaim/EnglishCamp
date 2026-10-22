"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X } from "lucide-react";
import { REDEMITTEL, REDEMITTEL_CATEGORIES, type RedemittelCategory } from "@/data/redemittel";

export default function RedemittelPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<RedemittelCategory | "all">("all");

  const filtered = useMemo(() => {
    let items = REDEMITTEL;
    if (filterCat !== "all") items = items.filter((r) => r.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((r) => r.phrase.toLowerCase().includes(q) || r.usage.toLowerCase().includes(q));
    }
    return items;
  }, [search, filterCat]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof REDEMITTEL> = {};
    for (const r of filtered) {
      const cat = r.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(r);
    }
    return groups;
  }, [filtered]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Useful Phrases</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Useful English phrases for B2 exams — speaking, writing, and discussion
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search phrases..."
              className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[#1CB0F6] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)]" /></button>}
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as RedemittelCategory | "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border-2 border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All categories</option>
            {Object.entries(REDEMITTEL_CATEGORIES).map(([id, m]) => (
              <option key={id} value={id}>{m.icon} {m.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{filtered.length} phrases</span>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">No phrases found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([cat, phrases]) => {
              const meta = REDEMITTEL_CATEGORIES[cat as RedemittelCategory];
              return (
                <section key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{meta.icon}</span>
                    <h2 className={`text-sm font-bold ${meta.color}`}>{meta.label}</h2>
                    {meta.labelAr && <p className="text-sm font-arabic text-[var(--color-text-secondary)]" lang="ar">{meta.labelAr}</p>}
                    <span className="text-xs text-[var(--color-text-disabled)]">({meta.desc})</span>
                    {meta.descAr && <span className="text-xs text-[var(--color-text-disabled)] font-arabic" lang="ar">({meta.descAr})</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phrases.map((r, i) => (
                      <motion.div
                        key={r.phrase}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-3.5 shadow-sm"
                      >
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{r.phrase}</p>
                        <p className="text-xs text-[var(--color-text-disabled)] italic mt-0.5">{r.usage}</p>
                        <p className="text-xs text-[var(--color-text-disabled)] italic font-arabic mt-0.5" lang="ar">{r.arabic}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
