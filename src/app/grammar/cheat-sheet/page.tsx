"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SYNTAX_RULES } from "@/data/satzbau";
import { KONNEKTOREN, CATEGORY_META } from "@/data/konnektoren";
import { PASSIVE_RULES } from "@/data/passiv";
import { CONDITIONAL_RULES } from "@/data/konjunktiv-ii";
import { RELATIVE_RULES } from "@/data/relativsaetze";
import { Printer } from "lucide-react";

const GRAMMAR_SECTIONS = [
  {
    id: "sentence-structure",
    title: "Sentence Structure",
    icon: "📐",
    content: SYNTAX_RULES.slice(0, 3).map((r) => ({
      title: r.title,
      formation: r.explanation,
      examples: r.examples.slice(0, 2),
      subRules: r.subRules,
    })),
  },
  {
    id: "connectives",
    title: "Connectives",
    icon: "🔗",
    content: Object.entries(CATEGORY_META).slice(0, 6).map(([key, meta]) => ({
      title: `${meta.icon} ${meta.label}`,
      formation: meta.desc,
      examples: KONNEKTOREN.filter((k) => k.category === key).slice(0, 2).map((k) => ({
        de: k.example,
        en: k.exampleEn,
      })),
    })),
  },
  {
    id: "declensions",
    title: "Prepositions",
    icon: "📍",
    content: [],
  },
  {
    id: "passive",
    title: "Passive Voice",
    icon: "🛡️",
    content: PASSIVE_RULES.slice(0, 3).map((r) => ({
      title: `${r.icon} ${r.title}`,
      formation: r.explanation,
      examples: r.examples.slice(0, 2),
    })),
  },
  {
    id: "conditionals",
    title: "Conditionals",
    icon: "💎",
    content: CONDITIONAL_RULES.slice(0, 3).map((r) => ({
      title: `${r.icon} ${r.title}`,
      formation: r.explanation,
      examples: r.examples.slice(0, 2),
    })),
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    icon: "🔀",
    content: RELATIVE_RULES.slice(0, 3).map((r: { icon: string; title: string; explanation: string; examples: { en: string; ar?: string }[] }) => ({
      title: `${r.icon} ${r.title}`,
      formation: r.explanation,
      examples: r.examples.slice(0, 2),
    })),
  },
];

export default function CheatSheetPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections((s) => ({ ...s, [id]: !s[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageWrapper>
      <div className="no-print space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Grammar Cheat Sheet</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Quick reference — print-friendly summaries</p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-pill)] text-sm font-bold uppercase tracking-wide shadow-[0_4px_0_0_#3FA302] active:translate-y-[4px] active:shadow-none transition-all duration-150 hover:brightness-105"
          >
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {GRAMMAR_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
className={`text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] ring-1 transition-all ${
                 expandedSections[section.id] ? "ring-[var(--color-primary)] shadow-[0_6px_20px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]" : "ring-[var(--color-border-default)] hover:ring-[var(--color-text-disabled)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{section.icon}</span>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">{section.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6 print:space-y-4 print:mt-0">
        {GRAMMAR_SECTIONS.map((section) => (
          <motion.div
            key={section.id}
            initial={false}
            animate={expandedSections[section.id] ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            className={`overflow-hidden print:overflow-visible print:opacity-100 print:h-auto ${
              expandedSections[section.id] || true
            }`}
          >
            <style jsx global>{`
              @media print {
                body { background: white; }
                .no-print { display: none !important; }
                @page { margin: 1.5cm; }
              }
            `}</style>

            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border-2 border-[var(--color-border-default)] print:shadow-none print:ring-0 print:border print:border-[var(--color-border-default)] print:break-inside-avoid" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.content.map((item: { title: string; formation: string; examples: { de?: string; en: string; ar?: string }[]; subRules?: { label: string; items: string[] }[] }, i: number) => (
                  <div key={i} className="print:break-inside-avoid">
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2 leading-relaxed">{item.formation}</p>

                    <div className="space-y-1">
                      {item.examples.map((ex: { de?: string; en: string; ar?: string }, j: number) => (
                        <div key={j} className="bg-[var(--color-surface-alt)] rounded-lg px-3 py-1.5">
                          <p className="text-xs font-mono text-[var(--color-text-primary)]">{ex.de || ex.en}</p>
                          {ex.en && ex.de && ex.en !== ex.de && <p className="text-[10px] text-[var(--color-text-disabled)] italic">{ex.en}</p>}
                          {ex.ar && <p className="text-[10px] text-[var(--color-text-disabled)] italic font-arabic mt-0.5" lang="ar">{ex.ar}</p>}
                        </div>
                      ))}
                    </div>

                    {"subRules" in item && item.subRules && (
                      <ul className="mt-1 space-y-0.5">
                        {item.subRules.map((sr: { label: string; items: string[] }, j: number) => (
                          <li key={j} className="text-[10px] text-[var(--color-text-secondary)] flex items-start gap-1">
                            <span className="text-[var(--color-primary)] mt-0.5">•</span>
                            <span>{sr.label}: {sr.items.join("; ")}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="text-center text-[10px] text-[var(--color-text-disabled)] print:block hidden mt-4">
          Generated by EnglishCamp · English B2 Preparation
        </div>
      </div>
    </PageWrapper>
  );
}
