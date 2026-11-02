"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
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
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search phrases..."
              className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
          </div>
          <SelectField
            value={filterCat}
            onValueChange={value => setFilterCat(value as RedemittelCategory | "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All categories</option>
            {Object.entries(REDEMITTEL_CATEGORIES).map(([id, m]) => (
              <option key={id} value={id}>{m.icon} {m.label}</option>
            ))}
          </SelectField>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{filtered.length} phrases</span>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <LearningArt name="🔍" size={36} className=" block mb-3" />
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">No phrases found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([cat, phrases]) => {
              const meta = REDEMITTEL_CATEGORIES[cat as RedemittelCategory];
              return (
                <section key={cat}>
                  <div className="camp-phrase-heading flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                    <LearningArt name={meta.icon} size={24} className="" />
                    <h2 className={`text-sm font-bold ${meta.color}`}>{meta.label}</h2>
                    {meta.labelAr && <p className="text-sm font-arabic text-[var(--color-text-secondary)]" lang="ar">{meta.labelAr}</p>}
                    <span className="text-xs text-[var(--color-text-secondary)]">({meta.desc})</span>
                    {meta.descAr && <span className="text-xs text-[var(--color-text-secondary)] font-arabic" lang="ar">({meta.descAr})</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phrases.map((r, i) => (
                      <motion.div
                        key={r.phrase}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 shadow-sm"
                      >
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{r.phrase}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] italic mt-0.5">{r.usage}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{r.arabic}</p>
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
