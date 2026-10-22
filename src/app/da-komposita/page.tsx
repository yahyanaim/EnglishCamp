"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft } from "lucide-react";
import { COMPOUND_WORDS } from "@/data/da-komposita";

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  pronominal: { label: "Pronominal Adverbs", icon: "🔗" },
  compound: { label: "Compound Words", icon: "🧩" },
};

const TYPE_ORDER = ["pronominal", "compound"];

export default function DaKompositaPage() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const word = selectedWord ? COMPOUND_WORDS.find((w) => w.word === selectedWord) : null;

  if (word) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedWord(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to words
        </button>

        <div className="bg-gradient-to-br from-slate-50 to-[var(--color-info)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)]/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{TYPE_LABELS[word.type]?.icon || "📝"}</span>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{word.word}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{word.meaning}</p>
            </div>
          </div>
          <div className="bg-[var(--color-surface)]/60 rounded-[var(--radius-lg)] p-3 mt-2">
            <p className="text-xs font-bold text-[var(--color-text-disabled)] uppercase tracking-wider mb-1">Example</p>
            <p className="text-sm font-mono text-[var(--color-text-primary)]">{word.example}</p>
            <p className="text-xs text-[var(--color-text-disabled)] italic mt-1">{word.exampleEn}</p>
            {word.arabic && <p className="text-xs text-[var(--color-text-disabled)] italic font-arabic mt-1" lang="ar">{word.arabic}</p>}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">English Compound Words</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Common pronominal adverbs (thereof, thereby, etc.) and compound words (everyone, nevertheless, etc.) explained</p>
        </div>

        {TYPE_ORDER.map((type) => {
          const items = COMPOUND_WORDS.filter((w) => w.type === type);
          if (items.length === 0) return null;
          const meta = TYPE_LABELS[type];
          return (
            <div key={type}>
              <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span>{meta.icon}</span> {meta.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((w, i) => (
                  <motion.button
                    key={w.word} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWord(w.word)}
                    className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{meta.icon}</span>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5">{w.word}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{w.meaning}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">All Compound Words</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]">
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Word</th>
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Type</th>
                  <th className="text-left py-2 font-semibold text-[var(--color-text-secondary)]">Example</th>
                </tr>
              </thead>
              <tbody>
                {COMPOUND_WORDS.map((w, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-default)] last:border-0">
                    <td className="py-2 pr-4 font-mono font-medium text-[var(--color-text-primary)]">{w.word}</td>
                    <td className="py-2 pr-4 font-mono text-[var(--color-text-secondary)]">{TYPE_LABELS[w.type]?.label || w.type}</td>
                    <td className="py-2 text-[var(--color-text-secondary)] break-words max-w-[200px]">{w.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
