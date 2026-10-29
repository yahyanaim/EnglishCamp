"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useErrors } from "@/store/useErrors";
import { useProgress } from "@/store/useProgress";
import { Zap, CheckCircle, AlertCircle, Filter } from "lucide-react";

export default function WeakAreasPage() {
  const { errors, markReviewed, clearReviewed } = useErrors();
  const { completeExercise } = useProgress();
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return errors;
    if (filter === "unreviewed") return errors.filter((e) => !e.reviewed);
    return errors.filter((e) => e.source === filter && !e.reviewed);
  }, [errors, filter]);

  const counts = useMemo(() => ({
    total: errors.length,
    unreviewed: errors.filter((e) => !e.reviewed).length,
    course: errors.filter(e => e.source === "course-activity").length,
    quiz: errors.filter((e) => e.source === "quiz").length,
    gender: errors.filter((e) => e.source === "gender").length,
    conjugation: errors.filter((e) => e.source === "conjugation").length,
  }), [errors]);

  function handleReview(index: number, realIndex: number) {
    markReviewed(realIndex);
    completeExercise(`review-${realIndex}`, 3);
  }

  const sources = [
    { id: "all", label: "All", count: counts.total },
    { id: "unreviewed", label: "Unreviewed", count: counts.unreviewed },
    { id: "course-activity", label: "Course practice", count: counts.course },
    { id: "quiz", label: "Quizzes", count: counts.quiz },
    { id: "gender", label: "Gender", count: counts.gender },
    { id: "conjugation", label: "Conjugation", count: counts.conjugation },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Weak Areas</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Review and practice your mistakes</p>
          </div>
          {counts.unreviewed > 0 && (
            <button
              onClick={clearReviewed}
              className="text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] px-3 py-1.5 rounded-lg hover:bg-[var(--color-surface-alt)] transition-all"
            >
              Clear Reviewed
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {sources.map((s) => (
          <button
            key={s.id}
            aria-pressed={filter === s.id}
            onClick={() => setFilter(s.id)}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[var(--radius-pill)] border transition-all ${
              filter === s.id
                ? "bg-[var(--color-primary)] text-white border-[#58CC02]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)]"
            }`}
          >
            {s.id === "quiz" && <Zap className="w-3 h-3" />}
            {s.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              filter === s.id ? "bg-[var(--color-primary)]/20" : "bg-[var(--color-surface-alt)]"
            }`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>

      {/* Error list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-disabled)]">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
            <p className="text-sm">No errors found!</p>
            <p className="text-xs mt-1">Keep up the great work 🌟</p>
          </div>
        )}
        {filtered.map((err, i) => {
          const realIndex = errors.indexOf(err);
          return (
            <motion.div
              key={`${err.timestamp}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm ${
                err.reviewed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-[var(--color-error)] flex-shrink-0" />
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{err.question}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1">
                    <span className="text-[var(--color-error)]">You: {err.userAnswer}</span>
                    <span className="text-[var(--color-success)] font-medium">Correct: {err.correctAnswer}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">{err.explanation}</p>
                  {err.source === "course-activity" && <Link className="text-xs text-[var(--color-text-link)] underline inline-block mt-2" href={`/exercises/${err.sourceId}`}>Revise this course activity</Link>}
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[var(--color-text-disabled)]">
                    <span className="bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-full capitalize">{err.source}</span>
                    <span>{new Date(err.timestamp).toLocaleDateString()}</span>
                    {err.reviewed && <span className="text-[var(--color-success)]">✓ Reviewed</span>}
                  </div>
                </div>
                {!err.reviewed && (
                  <button
                    onClick={() => handleReview(i, realIndex)}
                    className="text-xs font-bold bg-emerald-500 text-white border border-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all flex-shrink-0"
                  >
                    Mark Reviewed (+3 XP)
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
