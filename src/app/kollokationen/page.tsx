"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { COLLOCATIONS } from "@/data/kollokationen";
import { Search, X } from "lucide-react";

const ALL_TYPES = COLLOCATIONS.reduce<string[]>((acc, k) => acc.includes(k.type) ? acc : [...acc, k.type], []);

export default function KollokationenPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let colls = activeType ? COLLOCATIONS.filter((k) => k.type === activeType) : COLLOCATIONS;
    if (!search.trim()) return colls;
    const q = search.toLowerCase();
    return colls.filter(
      (c) =>
        c.collocation?.toLowerCase().includes(q) ||
        c.meaning?.toLowerCase().includes(q) ||
        c.example?.toLowerCase().includes(q)
    );
  }, [search, activeType]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Collocations</h1>
          <p className="text-sm text-[var(--color-text-disabled)] mt-1">Common English word combinations</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => { setActiveType(null); setSearch(""); }}
            className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm font-display font-bold transition-all ${
              !activeType
                ? "bg-[var(--color-primary)] text-white shadow-[0_3px_0_var(--color-primary-dark)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
            }`}
          >
            All
          </button>
          {ALL_TYPES.map((type) => (
            <button key={type} onClick={() => { setActiveType(type); setSearch(""); }}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm font-display font-bold transition-all ${
                activeType === type
                  ? "bg-[var(--color-primary)] text-white shadow-[0_3px_0_var(--color-primary-dark)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collocations..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)]" /></button>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((coll, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4  border-2 border-[var(--color-border-default)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] transition-all duration-200" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                {coll.type && (
                  <span className="text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded-[var(--radius-pill)] bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)]">{coll.type}</span>
                )}
              </div>
              <p className="font-display font-bold text-base text-[var(--color-text-primary)] mb-1">{coll.collocation}</p>
              <p className="text-xs text-[var(--color-text-disabled)] mb-2">{coll.meaning}</p>
              <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3">
                <p className="text-sm font-mono text-[var(--color-text-secondary)]">{coll.example}</p>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16"><span className="text-4xl block mb-3">🔍</span><p className="text-sm text-[var(--color-text-disabled)]">No collocations found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
