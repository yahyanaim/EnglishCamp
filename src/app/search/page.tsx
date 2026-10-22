"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { levels } from "@/data/content";
import { GRAMMAR_SEARCH_INDEX } from "@/data/searchIndex";
import { Search, BookOpen, ChevronRight, FileText, BookMarked } from "lucide-react";
import Link from "next/link";

type LessonResult = {
  type: "lesson";
  lessonId: string;
  levelId: string;
  lessonTitle: string;
  text: string;
  blockIndex: number;
};

type GrammarResult = {
  type: "grammar";
  sourceId: string;
  sourceLabel: string;
  sourceHref: string;
  title: string;
  text: string;
};

type Result = LessonResult | GrammarResult;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "lessons" | "grammar">("all");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    const hits: Result[] = [];

    for (const level of levels) {
      for (const lesson of level.lessons) {
        for (let bi = 0; bi < lesson.blocks.length; bi++) {
          const block = lesson.blocks[bi];
          let text = "";
          if (block.kind === "p") text = block.text;
          else if (block.kind === "callout") text = block.text;
          else if (block.kind === "list") text = block.items.join(" ");
          else if (block.kind === "examples") text = block.items.map((i: any) => `${i.de} ${i.tr}`).join(" ");
          else if (block.kind === "table") text = block.rows.flat().join(" ");
          else if (block.kind === "conjugation") text = block.rows.map((r: any) => `${r.pronoun} ${r.form} ${r.meaning}`).join(" ");
          else if (block.kind === "dialogue") text = block.lines.map((l: any) => `${l.de} ${l.tr}`).join(" ");

          if (text.toLowerCase().includes(lower)) {
            const snippet = extractSnippet(text, lower);
            hits.push({ type: "lesson", lessonId: lesson.id, levelId: level.id, lessonTitle: lesson.title, text: snippet, blockIndex: bi });
          }
        }
      }
    }

    for (const entry of GRAMMAR_SEARCH_INDEX) {
      if (entry.text.toLowerCase().includes(lower) || entry.title.toLowerCase().includes(lower)) {
        const snippet = extractSnippet(entry.text, lower);
        hits.push({ type: "grammar", sourceId: entry.sourceId, sourceLabel: entry.sourceLabel, sourceHref: entry.sourceHref, title: entry.title, text: snippet });
      }
    }

    return hits.slice(0, 60);
  }, [query]);

  const filtered = useMemo(() => {
    if (tab === "all") return results;
    return results.filter((r) => r.type === tab);
  }, [results, tab]);

  const lessonCount = results.filter((r) => r.type === "lesson").length;
  const grammarCount = results.filter((r) => r.type === "grammar").length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Search</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Search lessons, grammar topics, and reference content</p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-disabled)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for English words, grammar topics...'
          autoFocus
          className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[#1CB0F6] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
        />
      </div>

      {query && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Found {filtered.length} match{filtered.length !== 1 ? "es" : ""}
            {tab === "all" && <span className="text-[var(--color-text-disabled)]"> ({lessonCount} in lessons, {grammarCount} in grammar)</span>}
          </p>
          <div className="flex gap-1 bg-[var(--color-surface-alt)] rounded-[var(--radius-pill)] p-0.5">
            {(["all", "lessons", "grammar"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
className={`text-xs font-semibold px-4 py-1.5 rounded-[var(--radius-pill)] transition-all ${
                   tab === t ? "bg-[var(--color-primary)] text-white shadow-sm" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}>
                {t === "all" ? "All" : t === "lessons" ? "Lessons" : "Grammar"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {query && filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-disabled)]">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}

        {filtered.map((result, i) => {
          if (result.type === "lesson") {
            const key = `${result.levelId}-${result.lessonId}-${result.blockIndex}`;
            return (
              <Link key={key} href={`/levels/${result.levelId}/lessons/${result.lessonId}`}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:ring-brand-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{result.lessonTitle}</span>
                      <span className="text-[10px] font-medium uppercase text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-full">
                        {result.levelId.toUpperCase()}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)]" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{
                    __html: highlightMatch(result.text, query)
                  }} />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link key={`grammar-${result.sourceId}-${result.title}-${i}`} href={result.sourceHref}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:ring-violet-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-[#9B59B6]" />
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{result.title}</span>
                    <span className="text-[10px] font-medium text-[#9B59B6] bg-[#9B59B6] text-white px-2 py-0.5 rounded-full">
                      {result.sourceLabel}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)]" />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{
                  __html: highlightMatch(result.text, query)
                }} />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function extractSnippet(text: string, query: string): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, 200);
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, idx + query.length + 80);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";
  return snippet;
}

function highlightMatch(text: string, query: string): string {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, "<mark class='bg-amber-100 text-[var(--color-warning)] px-0.5 rounded'>$1</mark>");
}
