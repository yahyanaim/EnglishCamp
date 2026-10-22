"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { levels } from "@/data/content";
import { useVocabulary } from "@/store/useVocabulary";
import { useErrors } from "@/store/useErrors";
import { ProgressChart } from "@/components/ui/ProgressChart";
import { ActivityChart } from "@/components/ui/ActivityChart";
import { Download, BarChart3 } from "lucide-react";

export default function StatsPage() {
  const { xp, streak, lessons, quizResults, exercisesDone, getLevel } = useProgress();
  const { getAll } = useVocabulary();
  const { errors } = useErrors();
  const { level, title, nextXP } = getLevel();

  const doneLessons = Object.values(lessons).filter((l) => l.completed).length;
  const vocab = getAll();
  const masteredWords = vocab.filter(([, v]) => v.mastery === 3).length;
  const totalQuizzes = Object.values(quizResults).flat().length;
  const bestQuiz = Math.max(0, ...Object.values(quizResults).flat().map((r) => r.score));

  const levelBreakdown = useMemo(() => {
    return levels.map((lv) => {
      const lvlLessons = Object.entries(lessons).filter(([id]) => id.startsWith(lv.id));
      const done = lvlLessons.filter(([, p]) => p.completed).length;
      const total = lv.lessons.length;
      const xpEarned = lvlLessons.reduce((s, [, p]) => s + p.xpEarned, 0);
      return { id: lv.id, title: lv.title, done, total, xpEarned, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
    });
  }, [lessons]);

  function handleExport() {
    const data = {
      exportedAt: new Date().toISOString(),
      level: `${level} - ${title}`,
      xp,
      streak,
      doneLessons,
      masteredWords,
      totalQuizzes,
      bestQuiz,
      errorCount: errors.length,
      levelBreakdown,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `englishcamp-stats-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Statistics</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Your learning data at a glance</p>
        </div>
        <button onClick={handleExport}
          className="inline-flex items-center gap-1.5 text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border-default)] px-4 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-alt)] transition-all">
          <Download className="w-4 h-4" /> Export Stats
        </button>
      </motion.div>

      <ProgressChart />
      <ActivityChart />

      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">Level Breakdown</h3>
        <div className="space-y-3">
          {levelBreakdown.map((lv) => (
            <div key={lv.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-semibold text-[var(--color-text-primary)]">{lv.title}</span>
                <span className="text-[var(--color-text-secondary)]">{lv.done}/{lv.total} lessons &middot; {lv.xpEarned} XP</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500" style={{ width: `${lv.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total XP", value: xp.toLocaleString() },
          { label: "Streak", value: `${streak} days` },
          { label: "Lessons Done", value: doneLessons.toString() },
          { label: "Vocabulary", value: `${vocab.length} (${masteredWords} mastered)` },
          { label: "Quizzes Taken", value: totalQuizzes.toString() },
          { label: "Best Quiz Score", value: bestQuiz > 0 ? `${bestQuiz}%` : "-" },
          { label: "Exercises Done", value: Object.values(exercisesDone).filter(Boolean).length.toString() },
          { label: "Errors Tracked", value: errors.length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4 text-center">
            <p className="text-lg font-bold text-[var(--color-text-primary)]">{s.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
