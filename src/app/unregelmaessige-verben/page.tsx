"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { VERB_PATTERNS } from "@/data/unregelmaessige-verben";

export default function UnregelmaessigeVerbenPage() {
  const [search, setSearch] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  const pattern = selectedPattern ? VERB_PATTERNS.find((p) => p.pattern === selectedPattern) : null;

  const allVerbs = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    for (const p of VERB_PATTERNS) {
      const found = p.verbs.find((v) => v.infinitive.toLowerCase().includes(q) || v.english.toLowerCase().includes(q));
      if (found) return { verb: found, pattern: p };
    }
    return null;
  }, [search]);

  if (pattern) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedPattern(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to all patterns
        </button>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-[var(--radius-lg)] ring-1 ring-violet-200/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl">📊</span>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] font-mono">{pattern.pattern}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{pattern.desc}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border-2 border-[var(--color-border-default)] bg-[var(--color-surface)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)] border-b border-[var(--color-border-default)]">
                <th className="text-left px-4 py-3 font-semibold text-[var(--color-text-secondary)]">Infinitive</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--color-text-secondary)]">Past Simple</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--color-text-secondary)]">Past Participle</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--color-text-secondary)]">English</th>
              </tr>
            </thead>
            <tbody>
              {pattern.verbs.map((v, i) => (
                <tr key={v.infinitive} className={i < pattern.verbs.length - 1 ? "border-b border-[var(--color-border-default)]" : ""}>
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--color-text-primary)]">{v.infinitive}</td>
                  <td className="px-4 py-2.5 font-mono text-[var(--color-text-primary)]">{v.pastSimple || v.praeteritum}</td>
                  <td className="px-4 py-2.5 font-mono text-[var(--color-text-primary)]">{v.pastParticiple || v.perfekt}</td>
                  <td className="px-4 py-2.5 text-[var(--color-text-disabled)] italic">{v.english}<br />{v.arabic && <span className="font-arabic" lang="ar">{v.arabic}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Irregular Verbs</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English irregular verbs organized by vowel change pattern</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a verb..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[#1CB0F6] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        {allVerbs && search.trim() && (
          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] ring-1 ring-[var(--color-primary)] p-4 shadow-sm">
            <p className="text-xs text-[var(--color-primary-dark)] font-semibold mb-1">
              Found in pattern &ldquo;{allVerbs.pattern.pattern}&rdquo;:
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono font-bold text-[var(--color-text-primary)]">{allVerbs.verb.infinitive}</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{allVerbs.verb.pastSimple || allVerbs.verb.praeteritum}</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{allVerbs.verb.pastParticiple || allVerbs.verb.perfekt}</span>
              <span className="text-[var(--color-text-disabled)] italic">{allVerbs.verb.english}</span>
              {allVerbs.verb.arabic && <span className="text-[var(--color-text-disabled)] italic font-arabic" lang="ar">{allVerbs.verb.arabic}</span>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VERB_PATTERNS.map((p, i) => (
            <motion.button key={p.pattern} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedPattern(p.pattern); setSearch(""); }}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-mono font-bold text-[var(--color-text-primary)] mb-1">{p.pattern}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-2">{p.desc}</p>
              <div className="flex flex-wrap gap-1">
                {p.verbs.slice(0, 5).map((v) => (
                  <span key={v.infinitive} className="text-xs font-mono text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded border border-[var(--color-border-default)]">{v.infinitive}</span>
                ))}
                {p.verbs.length > 5 && <span className="text-xs text-[var(--color-text-disabled)]">+{p.verbs.length - 5} more</span>}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
