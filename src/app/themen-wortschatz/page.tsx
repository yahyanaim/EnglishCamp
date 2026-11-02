"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X } from "lucide-react";
import { TOPICS } from "@/data/themen-wortschatz";

export default function ThemenWortschatzPage() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return TOPICS;
    const q = search.toLowerCase();
    return TOPICS.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.words.some((w) => w.word.toLowerCase().includes(q) || w.definition.toLowerCase().includes(q) || w.arabic.includes(q))
    );
  }, [search]);

  const topic = selectedTopic ? TOPICS.find((t) => t.id === selectedTopic) : null;

  const allWords = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    for (const t of TOPICS) {
      const match = t.words.find((w) => w.word.toLowerCase().includes(q) || w.definition.toLowerCase().includes(q) || w.arabic.includes(q));
      if (match) return match;
    }
    return null;
  }, [search]);

  if (topic) {
    return (
      <PageWrapper>
        <div className="space-y-4">
          <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            ← Back to all topics
          </button>

          <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] border border-[var(--color-border-default)]/50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <LearningArt name={topic.icon} size={24} className="" />
              <h2 className="text-xl font-bold text-[var(--camp-control-ink)]">{topic.label}</h2>
              <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{topic.words.length} words</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {topic.words.map((w, i) => (
              <motion.div key={w.word} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{w.word}</span>
                      <span className="text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded">{w.pos}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] italic mt-1">{w.definition}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">&ldquo;{w.example}&rdquo;</p>
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] font-arabic" lang="ar">{w.arabic}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Topic Vocabulary</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{TOPICS.length} topics · {TOPICS.reduce((sum, t) => sum + t.words.length, 0)} words with definitions and examples</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search across all topics..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        {allWords && search.trim() && (
          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] ring-1 ring-[var(--color-primary)] p-4 shadow-sm">
            <p className="text-xs text-[var(--color-text-link)] font-semibold mb-1">Found in a topic:</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{allWords.word}</span>
              <span className="text-sm text-[var(--color-text-secondary)] italic">{allWords.definition}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTopics.map((t, i) => (
            <motion.button key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTopic(t.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <LearningArt name={t.icon} size={24} className="" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-[var(--camp-control-ink)]">{t.label}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{t.words.length} words</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
