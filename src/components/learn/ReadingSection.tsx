"use client";

import "./read-listening.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { LearningArt } from "@/components/brand/LearningArt";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { ReadingLessonView } from "./ReadingLessonView";
import { LibraryPagination, pageCount, pageSlice } from "./LibraryPagination";
import { CEFR_LABELS, CEFR_LEVELS, readingMinutes, type CefrLevel, type ReadingLesson } from "@/data/reading-lessons";
import { loadCatalogue, publishedReading } from "@/lib/learningContent";
import { readingExerciseId } from "@/lib/comprehension";
import { useProgress } from "@/store/useProgress";
import { useSkillPractice } from "@/store/useSkillPractice";

const PAGE_SIZE = 9;
const fieldStyle = { boxShadow: "0 2px 0 var(--color-border-default)" };
const fieldClass = "font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150";
const LEVEL_NOTES: Record<CefrLevel, string> = {
  A1: "Short passages about familiar, everyday situations.",
  A2: "Simple texts with everyday vocabulary and clear grammar.",
  B1: "Longer stories and explanations on practical topics.",
  B2: "Richer vocabulary, explanatory texts and developed arguments.",
  C1: "Advanced passages with nuanced positions and complex structures.",
  C2: "Dense analytical texts with subtle, abstract argument.",
};

export function ReadingSection() {
  const router = useRouter();
  const [lessons, setLessons] = useState<ReadingLesson[]>(() => publishedReading(null));
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);
  const done = useProgress(s => s.exercisesDone);
  const practice = useSkillPractice(s => s.lessons);

  useEffect(() => {
    void loadCatalogue().then(catalogue => { if (catalogue) setLessons(publishedReading(catalogue)); });
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("lesson"), requestedLevel = params.get("level");
    if (requested) setSelectedId(requested);
    if (requestedLevel && CEFR_LEVELS.includes(requestedLevel as CefrLevel)) setLevel(requestedLevel);
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedId) url.searchParams.set("lesson", selectedId); else url.searchParams.delete("lesson");
    window.history.replaceState(window.history.state, "", url);
    if (selectedId) window.scrollTo({ top: 0 });
  }, [selectedId]);

  const categories = useMemo(() => Array.from(new Set(lessons.map(l => l.category))).sort(), [lessons]);
  const status = useCallback((lesson: ReadingLesson) => done[readingExerciseId(lesson.id)] ? "completed" : practice[readingExerciseId(lesson.id)]?.startedAt ? "started" : "new", [done, practice]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter(lesson =>
      (level === "all" || lesson.level === level) && (category === "all" || lesson.category === category) &&
      (state === "all" || status(lesson) === state) &&
      (!q || lesson.title.toLowerCase().includes(q) || lesson.category.toLowerCase().includes(q) || lesson.paragraphs.some(p => p.toLowerCase().includes(q))));
  }, [lessons, query, level, category, state, status]);
  useEffect(() => setPage(1), [query, level, category, state]);
  useEffect(() => { if (page > pageCount(filtered.length, PAGE_SIZE)) setPage(1); }, [filtered.length, page]);
  const turn = (next: number) => { setPage(next); top.current?.scrollIntoView({ block: "start", behavior: "smooth" }); };
  const selected = selectedId ? lessons.find(lesson => lesson.id === selectedId) : null;

  if (selected) return <ReadingLessonView key={selected.id} lesson={selected} onBack={() => setSelectedId(null)} onOpenBank={() => router.push("/vocabulary")} />;

  const visible = pageSlice(filtered, page, PAGE_SIZE);
  const groups = CEFR_LEVELS.map(cefr => ({ cefr, items: visible.filter(lesson => lesson.level === cefr) })).filter(group => group.items.length);
  const completed = lessons.filter(lesson => status(lesson) === "completed").length;
  return (
    <>
      <div ref={top} className="flex flex-wrap gap-3 items-center scroll-mt-24">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
          <input type="search" aria-label="Search reading passages" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search passages..."
            className="w-full h-12 pl-10 pr-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-border-focus)]"
            style={fieldStyle} />
        </div>
        <SelectField aria-label="Reading level" value={level} onValueChange={setLevel} className={fieldClass} style={fieldStyle}>
          <option value="all">All levels</option>
          {CEFR_LEVELS.map(l => <option key={l} value={l}>{CEFR_LABELS[l]}</option>)}
        </SelectField>
        <SelectField aria-label="Reading category" value={category} onValueChange={setCategory} className={fieldClass} style={fieldStyle}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </SelectField>
        <SelectField aria-label="Reading progress" value={state} onValueChange={setState} className={fieldClass} style={fieldStyle}>
          <option value="all">All passages</option>
          <option value="new">Not started</option>
          <option value="started">In progress</option>
          <option value="completed">Completed</option>
        </SelectField>
        <span className="font-body text-xs text-[var(--color-text-secondary)]" role="status">{filtered.length} passages · {completed} completed</span>
      </div>
      {groups.map(group => (
        <section key={group.cefr} className="space-y-3" aria-labelledby={`reading-level-${group.cefr}`}>
          <div>
            <h2 id={`reading-level-${group.cefr}`} className="font-display text-lg font-bold">{CEFR_LABELS[group.cefr]}</h2>
            <p className="font-body text-xs text-[var(--color-text-secondary)]">{LEVEL_NOTES[group.cefr]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map(lesson => {
              const s = status(lesson), record = practice[readingExerciseId(lesson.id)];
              return (
                <motion.button key={lesson.id} type="button" onClick={() => setSelectedId(lesson.id)} className="camp-article-card" whileHover={{ y: -2 }}>
                  <ReadingIllustration article={{ id: lesson.id, category: lesson.category as never }} />
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-link)] bg-[var(--color-primary-subtle)] px-2 py-0.5 rounded-[var(--radius-pill)]">{lesson.level}</span>
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{lesson.category}</span>
                    <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{readingMinutes(lesson)} min</span>
                    {s === "completed" && <span className="font-body text-[10px] font-bold text-[var(--color-success-dark)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded-[var(--radius-pill)] inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" aria-hidden="true" />{record?.total ? `${record.best}/${record.total}` : "Done"}</span>}
                  </div>
                  <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] leading-snug">{lesson.title}</h3>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2 line-clamp-2">{lesson.paragraphs[0]?.slice(0, 120)}...</p>
                  <div className="flex items-center gap-1 mt-3 text-[var(--color-primary)] font-body text-xs font-bold">
                    {s === "completed" ? "Review passage" : s === "started" ? "Continue reading" : "Start reading"} <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}
      <LibraryPagination page={page} total={filtered.length} size={PAGE_SIZE} label="Reading passages pages" onChange={turn} />
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <LearningArt name="BookOpenText" size={36} className="w-12 h-12 mx-auto mb-3" />
          <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No passages found</p>
          <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">{level !== "all" && !lessons.some(l => l.level === level) ? `${CEFR_LABELS[level as CefrLevel]} passages are not published yet.` : "Try a different search or filter."}</p>
        </div>
      )}
    </>
  );
}
