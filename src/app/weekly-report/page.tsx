"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { useVocabulary } from "@/store/useVocabulary";
import { useGoals } from "@/store/useGoals";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BarChart3, TrendingUp, AlertTriangle, BookHeart, Zap, Flame, Target, Award } from "lucide-react";

export default function WeeklyReportPage() {
  const progress = useProgress();
  const errors = useErrors();
  const vocab = useVocabulary();
  const goals = useGoals();

  const stats = useMemo(() => {
    const lessonsDone = Object.values(progress.lessons).filter((l) => l.completed).length;
    const exercisesDone = Object.values(progress.exercisesDone).filter(Boolean).length;
    const quizResults = Object.values(progress.quizResults).flat();
    const quizzesTaken = quizResults.length;
    const avgScore = quizzesTaken > 0
      ? Math.round(quizResults.reduce((s, r) => s + r.score, 0) / quizzesTaken)
      : 0;
    const bestScore = quizzesTaken > 0
      ? Math.max(...quizResults.map((r) => r.score))
      : 0;
    const unreviewed = errors.getUnreviewed().length;
    const vocabCount = vocab.getAll().length;
    const masteredVocab = vocab.getAll().filter(([, v]) => v.mastery >= 2).length;

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    const dailyXP: number[] = Array(7).fill(0);
    dailyXP[today] = progress.xp % 100 || 25;

    return {
      lessonsDone,
      exercisesDone,
      quizzesTaken,
      avgScore,
      bestScore,
      unreviewed,
      vocabCount,
      masteredVocab,
      dailyXP,
      weekDays,
      weeklyXP: goals.xpThisWeek,
      weeklyGoal: goals.weeklyXpGoal,
      weeklyPct: goals.getProgress().xpPct,
    };
  }, [progress, errors, vocab, goals]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Weekly Learning Report</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Your learning summary and insights</p>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-primary-subtle)]0 to-brand-700 rounded-[var(--radius-lg)] p-6 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-8 h-8 text-[var(--color-primary)]" />
            <div>
              <p className="text-sm text-[var(--color-primary)]">This Week</p>
              <p className="text-3xl font-display font-extrabold">{stats.weeklyXP} / {stats.weeklyGoal} XP</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--color-surface)]/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--color-surface)]"
              initial={{ width: 0 }}
              animate={{ width: `${stats.weeklyPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lessons", value: stats.lessonsDone, icon: BookHeart, color: "text-[#9B59B6]", bg: "bg-[#9B59B6] text-white" },
            { label: "Exercises", value: stats.exercisesDone, icon: Zap, color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)] text-white" },
            { label: "Quizzes", value: stats.quizzesTaken, icon: TrendingUp, color: "text-[var(--color-success)]", bg: "bg-[var(--color-success)] text-white" },
            { label: "Streak", value: progress.streak, icon: Flame, color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)] text-white" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 shadow-sm border-2 border-[var(--color-border-default)]"
            >
              <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center mb-2`}>
                <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
              </div>
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{item.value}</p>
              <p className="text-xs text-[var(--color-text-disabled)]">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {stats.quizzesTaken > 0 && (
          <Card>
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-3 border-l-4 border-[var(--color-primary)] pl-3">Quiz Performance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4">
                <p className="text-xs text-[var(--color-text-disabled)] mb-1">Average Score</p>
                <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{stats.avgScore}%</p>
              </div>
              <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4">
                <p className="text-xs text-[var(--color-text-disabled)] mb-1">Best Score</p>
                <p className="text-2xl font-display font-extrabold text-[var(--color-success)]">{stats.bestScore}%</p>
              </div>
            </div>
          </Card>
        )}

        <Card>
          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-3 border-l-4 border-[var(--color-primary)] pl-3">Vocabulary Growth</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4">
              <p className="text-xs text-[var(--color-text-disabled)] mb-1">Total Words</p>
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{stats.vocabCount}</p>
            </div>
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4">
              <p className="text-xs text-[var(--color-text-disabled)] mb-1">Mastered</p>
              <p className="text-2xl font-display font-extrabold text-[var(--color-success)]">{stats.masteredVocab}</p>
            </div>
          </div>
        </Card>

        {stats.unreviewed > 0 && (
          <div className="bg-[var(--color-warning)] text-white rounded-[var(--radius-lg)] p-5 ring-1 ring-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[var(--color-warning)]">Review Needed</p>
                <p className="text-xs text-[var(--color-warning)] mt-1">
                  You have {stats.unreviewed} unreviewed error{stats.unreviewed > 1 ? "s" : ""}.
                  Reviewing them will help reinforce your weak areas.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-sm border-2 border-[var(--color-border-default)]">
          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-3 border-l-4 border-[var(--color-primary)] pl-3">Daily XP (Estimated)</p>
          <div className="flex items-end gap-2 h-24">
            {stats.dailyXP.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-lg bg-[var(--color-primary)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(8, (xp / Math.max(...stats.dailyXP, 1)) * 80)}px` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
                <span className="text-[10px] text-[var(--color-text-disabled)]">{stats.weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[var(--radius-lg)] p-6 text-white">
            <Target className="w-6 h-6 mb-2 text-[var(--color-primary)]" />
            <p className="text-sm font-bold mb-1">Next Week Focus</p>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-disabled)]">
              {stats.lessonsDone < 5 && <li>• Complete more lessons to build momentum</li>}
              {stats.exercisesDone < 10 && <li>• Practice with exercises to reinforce learning</li>}
              {stats.unreviewed > 0 && <li>• Review errors to close knowledge gaps</li>}
              {stats.vocabCount < 20 && <li>• Add more words to your vocabulary list</li>}
              {stats.quizzesTaken === 0 && <li>• Take a quiz to test your level</li>}
              {progress.streak < 7 && <li>• Try to maintain a daily learning streak</li>}
              {stats.lessonsDone >= 5 && stats.exercisesDone >= 10 && <li>• Great progress! Try the B2 Mock Exam</li>}
            </ul>
          </div>

          <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-sm border-2 border-[var(--color-border-default)]">
            <Award className="w-6 h-6 mb-2 text-[var(--color-warning)]" />
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Achievements Progress</p>
            <p className="text-xs text-[var(--color-text-disabled)]">
              {progress.xp} total XP earned · Level {progress.getLevel().level}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: `${stats.lessonsDone}/50 lessons`, pct: Math.round((stats.lessonsDone / 50) * 100) },
                { label: `${stats.exercisesDone}/250 exercises`, pct: Math.round((stats.exercisesDone / 250) * 100) },
                { label: `${progress.streak}/30 day streak`, pct: Math.round((progress.streak / 30) * 100) },
                { label: `${stats.vocabCount}/200 words`, pct: Math.round((stats.vocabCount / 200) * 100) },
              ].map((item) => (
                <div key={item.label} className="bg-[var(--color-surface-alt)] rounded-lg px-3 py-2 text-xs">
                  <p className="text-[var(--color-text-secondary)] mb-1">{item.label}</p>
                  <div className="w-20 h-1.5 rounded-full bg-[var(--color-border-default)] overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--color-warning)]" style={{ width: `${Math.min(100, item.pct)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
