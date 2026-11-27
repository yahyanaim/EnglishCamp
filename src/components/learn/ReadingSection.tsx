"use client";

import "./read-listening.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Circle, CircleDot, Clock, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LearningArt } from "@/components/brand/LearningArt";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { HubContinue, HubHero, LevelRail, TopicChips, topicKey } from "./HubHero";
import { ReadingLessonView } from "./ReadingLessonView";
import { LibraryPagination, pageCount, pageSlice } from "./LibraryPagination";
import { CEFR_LABELS, CEFR_LEVELS, readingMinutes, type CefrLevel, type ReadingLesson } from "@/data/reading-lessons";
import { loadCatalogue } from "@/lib/learningContent";
import { publishedReading } from "@/lib/readingCatalogue";
import { readingExerciseId } from "@/lib/comprehension";
import { useProgress } from "@/store/useProgress";
import { useSkillPractice } from "@/store/useSkillPractice";

const PAGE_SIZE = 9;
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

  const status = useCallback((lesson: ReadingLesson) => done[readingExerciseId(lesson.id)] ? "completed" : practice[readingExerciseId(lesson.id)]?.startedAt ? "started" : "new", [done, practice]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter(lesson =>
      (level === "all" || lesson.level === level) && (category === "all" || topicKey(lesson.category) === category) &&
      (state === "all" || status(lesson) === state) &&
      (!q || lesson.title.toLowerCase().includes(q) || lesson.category.toLowerCase().includes(q) || lesson.paragraphs.some(p => p.toLowerCase().includes(q))));
  }, [lessons, query, level, category, state, status]);
  useEffect(() => setPage(1), [query, level, category, state]);
  useEffect(() => { if (page > pageCount(filtered.length, PAGE_SIZE)) setPage(1); }, [filtered.length, page]);
  const turn = (next: number) => { setPage(next); top.current?.scrollIntoView({ block: "start", behavior: "smooth" }); };
  const selected = selectedId ? lessons.find(lesson => lesson.id === selectedId) : null;

  const ordered = useMemo(() => CEFR_LEVELS.flatMap(cefr => lessons.filter(lesson => lesson.level === cefr)), [lessons]);
  if (selected) {
    const at = ordered.findIndex(lesson => lesson.id === selected.id);
    return <ReadingLessonView key={selected.id} lesson={selected} onBack={() => setSelectedId(null)} onOpenBank={() => router.push("/vocabulary")}
      position={{ index: at, total: ordered.length }} previous={ordered[at - 1]} next={ordered[at + 1]} onOpen={setSelectedId} />;
  }

  const visible = pageSlice(filtered, page, PAGE_SIZE);
  const groups = CEFR_LEVELS.map(cefr => ({ cefr, items: visible.filter(lesson => lesson.level === cefr) })).filter(group => group.items.length);
  const completed = lessons.filter(lesson => status(lesson) === "completed").length;
  const started = lessons.filter(lesson => status(lesson) === "started");
  const scored = lessons.map(lesson => practice[readingExerciseId(lesson.id)]).filter(record => record?.total);
  const average = scored.length ? Math.round(scored.reduce((sum, record) => sum + record!.best / record!.total, 0) / scored.length * 100) : null;
  // Next step: the passage started most recently, otherwise the first unread passage in reading order.
  const seenAt = (lesson: ReadingLesson) => Date.parse(practice[readingExerciseId(lesson.id)]?.lastAt ?? "") || 0;
  const resume = [...started].sort((a, b) => seenAt(b) - seenAt(a))[0];
  const upNext = resume ?? ordered.find(lesson => status(lesson) === "new") ?? ordered[0];
  const filtering = query.trim() !== "" || level !== "all" || category !== "all" || state !== "all";
  const clear = () => { setQuery(""); setLevel("all"); setCategory("all"); setState("all"); };
  return (
    <div className="camp-hub-v2 space-y-6">
      <HubHero eyebrow="Reading library" title="Read" art="BookOpenText"
        description="Short English passages at your level. Tap any word for its meaning, then check your understanding."
        stats={[{ label: "Passages", value: lessons.length }, { label: "Completed", value: completed }, { label: "In progress", value: started.length }, { label: "Average score", value: average === null ? "–" : `${average}%` }]}
        progress={{ value: completed, total: lessons.length, label: "Library completed" }}
        action={upNext && <HubContinue art="BookOpenText" kicker={resume ? "Continue reading" : completed === lessons.length ? "Read again" : "Start reading"}
          title={upNext.title} meta={`${CEFR_LABELS[upNext.level]} · ${readingMinutes(upNext)} min`} onClick={() => setSelectedId(upNext.id)} />} />
      <LevelRail label="Reading level" value={level as CefrLevel | "all"} onChange={value => setLevel(value)}
        items={CEFR_LEVELS.map(cefr => ({ value: cefr, name: CEFR_LABELS[cefr].split(" · ")[1] ?? cefr, total: lessons.filter(lesson => lesson.level === cefr).length, done: lessons.filter(lesson => lesson.level === cefr && status(lesson) === "completed").length }))} />
      <section ref={top} className="camp-hub-toolbar scroll-mt-24" aria-label="Find a passage">
        <div className="camp-hub-toolbar-row">
          <label className="camp-hub-search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search reading passages</span>
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search passages…" />
          </label>
          <div className="camp-hub-segment" role="group" aria-label="Reading progress">
            {([["all", "All"], ["new", "Not started"], ["started", "In progress"], ["completed", "Completed"]] as const).map(([value, name]) =>
              <button key={value} type="button" aria-pressed={state === value} onClick={() => setState(value)}>{name}</button>)}
          </div>
        </div>
        <div className="camp-hub-toolbar-row">
          <TopicChips label="Reading category" values={lessons.map(l => l.category)} value={category} onChange={setCategory} />
          <p className="camp-hub-count" role="status">{filtered.length} {filtered.length === 1 ? "passage" : "passages"}{filtering ? <> · <button type="button" onClick={clear}><X size={13} aria-hidden="true" />Clear filters</button></> : null}</p>
        </div>
      </section>
      {groups.map(group => {
        const all = lessons.filter(lesson => lesson.level === group.cefr), finished = all.filter(lesson => status(lesson) === "completed").length;
        return (
          <section key={group.cefr} className="space-y-3" aria-labelledby={`reading-level-${group.cefr}`}>
            <div className="camp-hub-group-head">
              <div>
                <h2 id={`reading-level-${group.cefr}`}><span className="camp-hub-level">{group.cefr}</span>{CEFR_LABELS[group.cefr].split(" · ")[1]}</h2>
                <p>{LEVEL_NOTES[group.cefr]}</p>
              </div>
              <span className="camp-hub-group-progress">{finished}/{all.length} completed<span className="camp-level-rail-bar" aria-hidden="true"><span style={{ width: `${all.length ? finished / all.length * 100 : 0}%` }} /></span></span>
            </div>
            <div className="camp-read-grid">
              {group.items.map(lesson => {
                const s = status(lesson), record = practice[readingExerciseId(lesson.id)];
                return (
                  <motion.button key={lesson.id} type="button" onClick={() => setSelectedId(lesson.id)} className="camp-read-card" data-status={s} whileTap={{ scale: .99 }}>
                    <span className="camp-read-card-art"><ReadingIllustration article={{ id: lesson.id, category: lesson.category as never }} /></span>
                    <span className="camp-read-card-body">
                      <span className="camp-read-card-tags">
                        <span className="camp-hub-level">{lesson.level}</span>
                        <span>{lesson.category}</span>
                        <span><Clock size={12} aria-hidden="true" />{readingMinutes(lesson)} min</span>
                      </span>
                      <h3>{lesson.title}</h3>
                      <span className="camp-read-card-excerpt">{lesson.paragraphs[0]?.slice(0, 140)}…</span>
                      <span className="camp-read-card-foot">
                        <span className="camp-read-card-status">
                          {s === "completed" ? <><CheckCircle2 size={14} aria-hidden="true" />{record?.total ? `Best ${record.best}/${record.total}` : "Completed"}</>
                            : s === "started" ? <><CircleDot size={14} aria-hidden="true" />In progress</> : <><Circle size={14} aria-hidden="true" />Not started</>}
                        </span>
                        <span className="inline-flex items-center gap-1">{s === "completed" ? "Review" : s === "started" ? "Continue" : "Start"}<ChevronRight size={15} aria-hidden="true" /></span>
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        );
      })}
      <LibraryPagination page={page} total={filtered.length} size={PAGE_SIZE} label="Reading passages pages" onChange={turn} />
      {filtered.length === 0 && (
        <div className="camp-hub-empty text-center py-12">
          <LearningArt name="BookOpenText" size={36} className="w-12 h-12 mx-auto mb-3" />
          <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No passages found</p>
          <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">{level !== "all" && !lessons.some(l => l.level === level) ? `${CEFR_LABELS[level as CefrLevel]} passages are not published yet.` : "Try a different search or filter."} <button type="button" onClick={clear}>Clear filters</button></p>
        </div>
      )}
    </div>
  );
}
