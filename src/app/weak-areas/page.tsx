"use client";
import { PageBanner } from "@/components/ui/PageBanner";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useErrors } from "@/store/useErrors";
import { useProgress } from "@/store/useProgress";
import { BookOpen, CheckCircle2, ChevronRight, RotateCcw } from "lucide-react";
import { MISTAKE_CATEGORIES, mistakeInfo, type MistakeCategory } from "@/lib/mistakes";
import { SECTIONS } from "@/components/learn/GrammarReference";
import { grammarLessonKey } from "@/data/grammar-curriculum";

const LESSON_TITLES: Record<string, string> = Object.fromEntries(SECTIONS.map(section => [section.id, section.title]));
type Filter = "open" | "all" | MistakeCategory;

/** Every wrong answer from practice, quizzes, listening, reading and courses, grouped by skill, with the grammar lesson that revises it. */
export default function WeakAreasPage() {
  const { errors, markReviewed, clearReviewed } = useErrors();
  const completeExercise = useProgress(s => s.completeExercise);
  const done = useProgress(s => s.exercisesDone);
  const [filter, setFilter] = useState<Filter>("open");

  const open = errors.filter(e => !e.reviewed);
  const counts = useMemo(() => {
    const byCategory = Object.fromEntries(MISTAKE_CATEGORIES.map(c => [c.id, 0])) as Record<MistakeCategory, number>;
    for (const e of errors) if (!e.reviewed) byCategory[mistakeInfo(e.source).category]++;
    return byCategory;
  }, [errors]);
  const suggested = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const e of open) { const lesson = mistakeInfo(e.source).lesson; if (lesson && LESSON_TITLES[lesson]) tally[lesson] = (tally[lesson] ?? 0) + 1; }
    return Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [open]);
  const filtered = errors.filter(e => filter === "all" ? true : filter === "open" ? !e.reviewed : !e.reviewed && mistakeInfo(e.source).category === filter);
  const reviewedTotal = Object.keys(done).filter(key => key.startsWith("review-")).length;

  function review(index: number) {
    const error = errors[index];
    markReviewed(index);
    completeExercise(`review-${error.source}-${error.timestamp}`, 3);
  }

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "open", label: "To review", count: open.length },
    ...MISTAKE_CATEGORIES.map(c => ({ id: c.id as Filter, label: c.label, count: counts[c.id] })),
    { id: "all", label: "All", count: errors.length },
  ];

  return (
    <div className="camp-weak-areas">
      <PageBanner><h1>Weak areas</h1><p>Every wrong answer from practice, quizzes, listening, reading and courses, ready to review.</p></PageBanner>

      <section className="camp-weak-summary" aria-label="Summary">
        <div className="camp-weak-tile"><strong>{open.length}</strong><span>To review</span></div>
        <div className="camp-weak-tile"><strong>{reviewedTotal}</strong><span>Reviewed</span></div>
        <div className="camp-weak-tile"><strong>{counts.grammar}</strong><span>Grammar</span></div>
        <div className="camp-weak-tile"><strong>{counts.vocabulary}</strong><span>Vocabulary</span></div>
      </section>

      {suggested.length > 0 && (
        <section className="camp-weak-lessons" aria-labelledby="weak-lessons-heading">
          <h2 id="weak-lessons-heading">Revise these grammar lessons</h2>
          <div className="camp-weak-lesson-grid">
            {suggested.map(([id, count]) => (
              <Link key={id} href={`/grammar#${id}`} className="camp-weak-lesson">
                <BookOpen size={18} aria-hidden="true" />
                <span><strong>{LESSON_TITLES[id]}</strong><small>{count} {count === 1 ? "mistake" : "mistakes"}{done[grammarLessonKey(id)] ? " · learned" : ""}</small></span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="camp-weak-toolbar">
        <div className="camp-weak-filters" role="group" aria-label="Filter mistakes">
          {filters.map(f => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}<span>{f.count}</span>
            </button>
          ))}
        </div>
        {errors.some(e => e.reviewed) && <button type="button" className="camp-weak-clear" onClick={clearReviewed}><RotateCcw size={14} aria-hidden="true" />Clear reviewed</button>}
      </div>

      {filtered.length === 0 ? (
        <div className="camp-weak-empty">
          <CheckCircle2 size={40} aria-hidden="true" />
          <p><strong>Nothing to review here</strong></p>
          <p>Wrong answers from any practice appear here automatically.</p>
        </div>
      ) : (
        <ul className="camp-weak-list">
          {filtered.map(err => {
            const index = errors.indexOf(err), info = mistakeInfo(err.source);
            return (
              <li key={`${err.timestamp}-${index}`} className="camp-weak-item" data-reviewed={err.reviewed || undefined}>
                <div className="camp-weak-item-head">
                  <span className="camp-weak-tag">{info.label}</span>
                  <time dateTime={err.timestamp}>{new Date(err.timestamp).toLocaleDateString()}</time>
                </div>
                <p className="camp-weak-question">{err.question}</p>
                <dl className="camp-weak-answers">
                  <div><dt>Your answer</dt><dd className="camp-weak-wrong">{err.userAnswer}</dd></div>
                  <div><dt>Correct answer</dt><dd className="camp-weak-right">{err.correctAnswer}</dd></div>
                </dl>
                {err.explanation && <p className="camp-weak-explanation">{err.explanation}</p>}
                <div className="camp-weak-actions">
                  {err.source === "course-activity" && <Link href={`/exercises/${err.sourceId}`}>Revise the course activity</Link>}
                  {info.lesson && LESSON_TITLES[info.lesson] && <Link href={`/grammar#${info.lesson}`}>Open lesson: {LESSON_TITLES[info.lesson]}</Link>}
                  {err.reviewed
                    ? <span className="camp-weak-done"><CheckCircle2 size={14} aria-hidden="true" />Reviewed</span>
                    : <button type="button" className="camp-weak-review" onClick={() => review(index)}>Mark as reviewed · +3 XP</button>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
