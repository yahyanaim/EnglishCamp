"use client";
import { PageBanner } from "@/components/ui/PageBanner";
import dynamic from "next/dynamic";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVocabulary } from "@/store/useVocabulary";
import { VocabularyPractice } from "@/components/learn/VocabularyPractice";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { Search, Trash2, BookOpenCheck, ArrowUpDown, Download, Upload, Brain, PenLine, Eye, Target, BarChart3, BookHeart, Library, Plus, BookOpenText, ArrowLeft, ChevronRight, Bookmark } from "lucide-react";
import { VOCABULARY_BANK, VocabBankEntry } from "@/data/vocabulary-5000";
import { ALL_ARTICLES, LEVELS, LEVEL_LABELS, CATEGORIES } from "@/data/articles/index";
import type { ReadingArticle } from "@/data/articles/index";

const ArticleReader = dynamic(() => import("@/components/learn/ArticleReader"), { loading: () => <p role="status" className="text-sm text-[var(--color-text-secondary)]">Opening article…</p> });

type VocabView = "browse" | "quiz" | "write" | "bank" | "read";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
};

export default function VocabularyPage() {
  const { words, addWord, removeWord, updateMastery, getAll, search, importWords, exportWords } = useVocabulary();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "alpha" | "mastery">("date");
  const [view, setView] = useState<VocabView>("read");
  const [bankQuery, setBankQuery] = useState("");
  const [bankFilter, setBankFilter] = useState<string>("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const [readQuery, setReadQuery] = useState("");
  const [readLevel, setReadLevel] = useState<string>("all");
  const [readCat, setReadCat] = useState<string>("all");
  const [readSelected, setReadSelected] = useState<ReadingArticle | null>(null);
  const wordList = useMemo(() => {
    let items = query ? search(query) : getAll();
    if (filter !== "all") items = items.filter(([, v]) => v.category === filter);
    items.sort((a, b) => {
      if (sortBy === "alpha") return a[1].de.localeCompare(b[1].de);
      if (sortBy === "mastery") return a[1].mastery - b[1].mastery;
      return new Date(b[1].addedAt).getTime() - new Date(a[1].addedAt).getTime();
    });
    return items;
  }, [words, query, filter, sortBy]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    getAll().forEach(([, v]) => cats.add(v.category));
    return ["all", ...Array.from(cats).sort()];
  }, [words]);

  const counts = useMemo(() => {
    const all = getAll();
    return {
      total: all.length,
      mastered: all.filter(([, v]) => v.mastery === 3).length,
      learning: all.filter(([, v]) => v.mastery > 0 && v.mastery < 3).length,
      new: all.filter(([, v]) => v.mastery === 0).length,
    };
  }, [words]);

  const bankCategories = useMemo(() => {
    const cats = new Set<string>();
    VOCABULARY_BANK.forEach((v) => cats.add(v.c));
    return ["all", ...Array.from(cats).sort()];
  }, []);

  const bankWordList = useMemo(() => {
    let items = VOCABULARY_BANK;
    if (bankQuery) {
      const q = bankQuery.toLowerCase();
      items = items.filter((v) => v.w.toLowerCase().includes(q) || v.a.toLowerCase().includes(q) || v.d.toLowerCase().includes(q));
    }
    if (bankFilter !== "all") items = items.filter((v) => v.c === bankFilter);
    items = items.slice(0, 200);
    return items;
  }, [bankQuery, bankFilter]);

  function handleAddFromBank(entry: VocabBankEntry) {
    const id = entry.w.toLowerCase().replace(/[^a-z0-9]/g, "-");
    if (words[id]) return;
    addWord(entry.w, entry.a, entry.c);
    setAddedIds((prev) => new Set(prev).add(entry.w.toLowerCase()));
  }

  const readFiltered = useMemo(() => {
    let items = ALL_ARTICLES;
    if (readQuery) {
      const q = readQuery.toLowerCase();
      items = items.filter((a) => a.title.toLowerCase().includes(q) || a.paragraphs.some((p) => p.en.toLowerCase().includes(q)));
    }
    if (readLevel !== "all") items = items.filter((a) => a.level === readLevel);
    if (readCat !== "all") items = items.filter((a) => a.category === readCat);
    return items;
  }, [readQuery, readLevel, readCat]);

  function handleExport() {
    const data = exportWords();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "englishcamp-vocabulary.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          importWords(Object.entries(data) as any);
        } catch {}
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="camp-vocabulary-page space-y-6">
      {/* Header */}
      <PageBanner><h1>Vocabulary & Reading</h1><p>Read, listen and practise useful words.</p></PageBanner>

      {/* Saved-word stats belong to the personal word list. */}
      {view === "browse" && <motion.div variants={itemAnim} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Saved words", value: counts.total, color: "var(--color-primary-dark)", bg: "var(--color-primary-subtle)", border: "var(--color-primary)" },
          { label: "Mastered", value: counts.mastered, color: "var(--color-success-dark)", bg: "var(--color-success-bg)", border: "var(--color-success)" },
          { label: "Learning", value: counts.learning, color: "var(--color-warning-dark)", bg: "var(--color-warning-bg)", border: "var(--color-warning)" },
          { label: "New", value: counts.new, color: "var(--color-info-dark)", bg: "var(--color-info-bg)", border: "var(--color-info)" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border text-center transition-all duration-200"
            style={{ borderColor: s.border, boxShadow: `0 2px 0 ${s.border}` }}
          >
            <p className="font-display font-extrabold" style={{ fontSize: "24px", color: s.color }}>{s.value}</p>
            <p className="font-body text-xs text-[var(--color-text-secondary)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </motion.div>}

      {/* View switcher */}
      <motion.div variants={itemAnim} className="flex flex-wrap gap-1.5 bg-[var(--color-neutral-100)] rounded-[var(--radius-lg)] p-1 w-fit max-w-full">
        {([
          { id: "browse" as const, label: "Browse", icon: Eye },
          { id: "bank" as const, label: "Bank", icon: Library },
          { id: "read" as const, label: "Read & Listen", icon: BookOpenText },
          { id: "quiz" as const, label: "Quiz", icon: Brain },
          { id: "write" as const, label: "Write", icon: PenLine },
        ]).map((v) => {
          const Icon = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] font-display font-extrabold text-xs transition-all duration-150 ${
                view === v.id
                  ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-2)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <LearningArt name={Icon.displayName || "book"} className="w-3.5 h-3.5" />
              {v.label}
            </button>
          );
        })}
      </motion.div>

      {view === "browse" ? (
        <>
          {/* Search & Filters */}
          <motion.div variants={itemAnim} className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your words..."
                className="w-full h-12 pl-10 pr-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(126,34,206,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
              />
            </div>
            <SelectField
              value={filter}
              onValueChange={value => setFilter(value)}
              className="font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
              style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
              ))}
            </SelectField>
            <button
              onClick={() => setSortBy(sortBy === "date" ? "alpha" : sortBy === "alpha" ? "mastery" : "date")}
              className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] px-3 py-2.5 rounded-[var(--radius-md)] hover:border-[var(--color-border-strong)] transition-all duration-150"
              style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortBy === "date" ? "Date" : sortBy === "alpha" ? "A-Z" : "Mastery"}
            </button>
            <button onClick={handleExport} className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] px-3 py-2.5 rounded-[var(--radius-md)] hover:border-[var(--color-border-strong)] transition-all duration-150" style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={handleImport} className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] px-3 py-2.5 rounded-[var(--radius-md)] hover:border-[var(--color-border-strong)] transition-all duration-150" style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
              <Upload className="w-3.5 h-3.5" /> Import
            </button>
          </motion.div>

          {/* Word List */}
          <motion.div variants={itemAnim} className="space-y-2.5">
            {wordList.length === 0 && (
              <div className="text-center py-16">
                <BookOpenCheck className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--color-text-disabled)" }} />
                <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No vocabulary words yet</p>
                <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">Click &ldquo;Save&rdquo; on any English word during lessons to add it here</p>
              </div>
            )}
            {wordList.map(([id, word], i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)] transition-all duration-200"
                style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-display font-bold text-base text-[var(--color-text-primary)]">{word.de}</span>
                    <SpeakerButton text={word.de} />
                    <span className="font-body text-sm text-[var(--color-text-secondary)] italic hidden sm:inline">{word.en}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{word.category}</span>
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateMastery(id, level as 0 | 1 | 2 | 3)}
                          className={`w-4 h-4 rounded-[var(--radius-circle)] border transition-all ${
                            word.mastery >= level
                              ? level === 3
                                ? "bg-[var(--color-success-bg)] border-[var(--color-success)]"
                                : level === 2
                                  ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                                  : level === 1
                                    ? "bg-[var(--color-warning-bg)] border-[var(--color-warning)]"
                                    : "bg-[var(--color-neutral-200)] border-[var(--color-neutral-200)]"
                              : "bg-[var(--color-surface)] border-[var(--color-border-default)]"
                          }`}
                          title={`Mastery level ${level}`}
                        />
                      ))}
                    </div>
                    <button onClick={() => removeWord(id)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-error)] transition-colors p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-body text-xs text-[var(--color-text-secondary)]">Added: {new Date(word.addedAt).toLocaleDateString()}</span>
                  {word.timesReviewed > 0 && <span className="font-body text-xs text-[var(--color-text-secondary)]">Reviewed: {word.timesReviewed}x</span>}
                  {word.lastReview && <span className="font-body text-xs text-[var(--color-text-secondary)]">Last: {new Date(word.lastReview).toLocaleDateString()}</span>}
                </div>
                {word.mastery === 3 && (
                  <div className="mt-1.5">
                    <span className="font-display font-extrabold text-[10px] text-[var(--color-success-dark)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded-[var(--radius-pill)]">Mastered</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : view === "bank" ? (
        <>
          {/* Bank Search */}
          <motion.div variants={itemAnim} className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={bankQuery}
                onChange={(e) => setBankQuery(e.target.value)}
                placeholder="Search 5000 words..."
                className="w-full h-12 pl-10 pr-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(126,34,206,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
              />
            </div>
            <SelectField
              value={bankFilter}
              onValueChange={value => setBankFilter(value)}
              className="font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
              style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            >
              {bankCategories.map((c) => (
                <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
              ))}
            </SelectField>
            <span className="font-body text-xs text-[var(--color-text-secondary)]">Showing {bankWordList.length} of {VOCABULARY_BANK.length} words</span>
          </motion.div>

          {/* Bank Word List */}
          <motion.div variants={itemAnim} className="space-y-2.5">
            {bankWordList.map((entry, i) => {
              const isAdded = addedIds.has(entry.w.toLowerCase()) || !!words[entry.w.toLowerCase().replace(/[^a-z0-9]/g, "-")];
              return (
                <motion.div
                  key={entry.w + entry.c}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.01, duration: 0.2 }}
                  className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)] transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-display font-bold text-base text-[var(--color-text-primary)]">{entry.w}</span>
                      <SpeakerButton text={entry.w} />
                      <span className="font-body text-sm text-[var(--color-text-secondary)] italic hidden sm:inline">{entry.a}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{entry.c}</span>
                      {isAdded ? (
                        <span className="font-body text-[10px] font-bold text-[var(--color-success-dark)] bg-[var(--color-success-bg)] px-2 py-1 rounded-[var(--radius-pill)]">Saved</span>
                      ) : (
                        <button
                          onClick={() => handleAddFromBank(entry)}
                          className="inline-flex items-center gap-1 font-body text-xs font-bold text-[var(--color-on-brand)] bg-[var(--color-primary)] px-3 py-1.5 rounded-[var(--radius-md)] hover:opacity-90 transition-all"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">{entry.d}</p>
                </motion.div>
              );
            })}
            {bankWordList.length === 0 && (
              <div className="text-center py-16">
                <LearningArt name="Library" size={36} className="w-12 h-12 mx-auto mb-3" />
                <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No words found</p>
                <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">Try a different search term or category</p>
              </div>
            )}
          </motion.div>
        </>
      ) : view === "read" ? (
        readSelected ? (
          <ArticleReader key={readSelected.id} article={readSelected} onBack={() => setReadSelected(null)} />
        ) : (
          <>
            <motion.div variants={itemAnim} className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  value={readQuery}
                  onChange={(e) => setReadQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full h-12 pl-10 pr-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150"
                  style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(126,34,206,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
                />
              </div>
              <SelectField
                value={readLevel}
                onValueChange={value => setReadLevel(value)}
                className="font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
              >
                <option value="all">All Levels</option>
                {LEVELS.map((l) => (<option key={l} value={l}>{LEVEL_LABELS[l]}</option>))}
              </SelectField>
              <SelectField
                value={readCat}
                onValueChange={value => setReadCat(value)}
                className="font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </SelectField>
              <span className="font-body text-xs text-[var(--color-text-secondary)]">{readFiltered.length} articles</span>
            </motion.div>
            <motion.div variants={itemAnim} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {readFiltered.map((article) => (
                <motion.button
                  key={article.id}
                  onClick={() => setReadSelected(article)}
                  className="camp-article-card"
                  whileHover={{ y: -2 }}
                >
                  <ReadingIllustration article={article} />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-link)] bg-[var(--color-primary-subtle)] px-2 py-0.5 rounded-[var(--radius-pill)]">{LEVEL_LABELS[article.level]}</span>
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{article.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] leading-snug">{article.title}</h3>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2 line-clamp-2">{article.paragraphs[0]?.en.slice(0, 120)}...</p>
                  <div className="flex items-center gap-1 mt-3 text-[var(--color-primary)] font-body text-xs font-bold">
                    Read & listen <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
            {readFiltered.length === 0 && (
              <div className="text-center py-16">
                <LearningArt name="BookOpenText" size={36} className="w-12 h-12 mx-auto mb-3" />
                <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No articles found</p>
                <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">Try a different search or filter</p>
              </div>
            )}
          </>
        )
      ) : (
        <PracticeFrame layout="quiz"><VocabularyPractice /></PracticeFrame>
      )}
    </motion.div>
  );
}
