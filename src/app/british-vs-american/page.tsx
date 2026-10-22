"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { COMPARATIVE_CATEGORIES } from "@/data/british-vs-american";
import { Search, X, ArrowRightLeft } from "lucide-react";

export default function BritishVsAmericanPage() {
  const [activeCategory, setActiveCategory] = useState(COMPARATIVE_CATEGORIES[0].id);
  const [search, setSearch] = useState("");

  const current = COMPARATIVE_CATEGORIES.find((c) => c.id === activeCategory)!;

  const filtered = current.entries.filter(
    (e) =>
      !search.trim() ||
      e.british.toLowerCase().includes(search.toLowerCase()) ||
      e.american.toLowerCase().includes(search.toLowerCase()) ||
      e.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">British vs American English</h1>
          <p className="text-sm text-[var(--color-text-disabled)] mt-1">Key differences across vocabulary, spelling, grammar, pronunciation &amp; dates</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {COMPARATIVE_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
              className={`px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-display font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[var(--color-primary)] text-white shadow-[0_3px_0_var(--color-primary-dark)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >
              {cat.icon} {cat.label}
              {cat.labelAr && <span className="font-arabic text-xs" lang="ar"> {cat.labelAr}</span>}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search in ${current.label}...`}
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)]" /></button>}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-3">
            {filtered.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <ArrowRightLeft className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[var(--color-text-primary)]">
                        <span className="font-semibold">{entry.british}</span>
                      </span>
                      <span className="text-xs text-[var(--color-text-disabled)]">↔</span>
                      <span className="font-medium text-[var(--color-text-primary)]">
                        <span className="font-semibold">{entry.american}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-disabled)] mt-0.5">{entry.meaning}</p>
                    {entry.meaningAr && <p className="text-xs text-[var(--color-text-disabled)] font-arabic" lang="ar">{entry.meaningAr}</p>}
                  </div>
                </div>
                {entry.notes && (
                  <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] px-3 py-1.5 inline-block">
                    <p className="text-[10px] font-bold text-[var(--color-text-disabled)] font-display">NOTE</p>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)]">{entry.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16"><span className="text-4xl block mb-3">🔍</span><p className="text-sm text-[var(--color-text-disabled)]">No entries found</p></div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
