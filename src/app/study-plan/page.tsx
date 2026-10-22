"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { useGoals } from "@/store/useGoals";
import { useVocabulary } from "@/store/useVocabulary";
import { levels } from "@/data/content";
import Link from "next/link";
import {
  Target, BookOpen, Zap, AlertTriangle, BarChart3, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Sparkles, BookHeart, Gamepad2,
  FileText, Search,
} from "lucide-react";

export default function StudyPlanPage() {
  const { xp, streak, lessons, quizResults, exercisesDone, getLevel } = useProgress();
  const { errors, getUnreviewed } = useErrors();
  const { weeklyXpGoal, xpThisWeek, weeklyLessonGoal, lessonsThisWeek, getProgress } = useGoals();
  const { getAll } = useVocabulary();

  const { level, title, nextXP } = getLevel();
  const { xpPct, lessonPct } = getProgress();
  const unreviewed = getUnreviewed();
  const vocab = getAll();
  const masteredWords = vocab.filter(([, v]) => v.mastery === 3).length;
  const doneLessons = Object.values(lessons).filter((l) => l.completed).length;
  const totalLessons = levels.reduce((s, l) => s + l.lessons.length, 0);

  const weakSources = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of errors) {
      if (!e.reviewed) counts[e.source] = (counts[e.source] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [errors]);

  const recommendations = useMemo(() => {
    const recs: { label: string; href: string; icon: any; desc: string; priority: "high" | "medium" | "low" }[] = [];

    if (unreviewed.length > 5) {
      recs.push({ label: "Review Your Mistakes", href: "/weak-areas", icon: AlertTriangle, desc: `${unreviewed.length} unreviewed errors waiting`, priority: "high" });
    }

    const today = new Date().toISOString().split("T")[0];
    let lastActive: string | null = null;
    if (typeof window !== "undefined") {
      try { lastActive = localStorage.getItem("englishcamp-progress"); } catch {}
    }
    if (lastActive) {
      try {
        const parsed = JSON.parse(lastActive);
        if (parsed.state?.lastActiveDate !== today) {
          recs.push({ label: "Daily Challenge", href: "/daily-challenge", icon: Zap, desc: "Complete today's challenge to keep your streak", priority: "high" });
        }
      } catch {}
    }

    if (xpPct < 100) {
      recs.push({ label: "Earn More XP", href: "/practice", icon: Gamepad2, desc: `${100 - xpPct}% of weekly XP goal remaining`, priority: "medium" });
    }

    if (doneLessons < totalLessons) {
      const nextLevel = levels.find((l) => l.lessons.some((lesson) => !lessons[lesson.id]?.completed));
      const nextLesson = nextLevel?.lessons.find((lesson) => !lessons[lesson.id]?.completed);
      if (nextLesson && nextLevel) {
        recs.push({ label: "Next Lesson", href: `/levels/${nextLevel.id}/lessons/${nextLesson.id}`, icon: BookOpen, desc: `Continue with "${nextLesson.title}"`, priority: "high" });
      }
    }

      const quizLevel = levels.find((l) => {
        const done = Object.entries(lessons).filter(([id]) => id.startsWith(l.id)).filter(([, p]) => p.completed).length;
        return done >= 3;
      });
      if (quizLevel) {
        recs.push({ label: "Take a Quiz", href: `/quiz/${quizLevel.id}`, icon: Zap, desc: "Test your knowledge with a level quiz", priority: "medium" });
    }

    if (vocab.length < 50) {
      recs.push({ label: "Build Vocabulary", href: "/vocabulary", icon: BookHeart, desc: "Add more words to your vocabulary list", priority: "medium" });
    }

    const hasWeakGrammar = weakSources.some(([, c]) => c > 3);
    if (hasWeakGrammar) {
      recs.push({ label: "Practice Grammar", href: "/grammar-compare", icon: Search, desc: "Review confusing grammar concepts", priority: "medium" });
    }

    recs.push({ label: "Writing Practice", href: "/writing", icon: FileText, desc: "Practice with guided writing prompts", priority: "low" });
    recs.push({ label: "Explore Grammar", href: "/grammar", icon: BookOpen, desc: "Browse the full grammar reference", priority: "low" });

    return recs.sort((a, b) => a.priority === "high" ? -1 : b.priority === "high" ? 1 : a.priority === "medium" ? -1 : 1);
  }, [unreviewed, xpPct, doneLessons, totalLessons, lessons, vocab, weakSources]);

  return (
    <PageWrapper>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Target className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Study Plan</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Personalized recommendations based on your progress</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { icon: BarChart3, label: "Current Level", value: `${level} — ${title}` },
          { icon: TrendingUp, label: "Weekly XP", value: `${xpThisWeek} / ${weeklyXpGoal}` },
          { icon: CheckCircle2, label: "Lessons Done", value: `${doneLessons} / ${totalLessons}` },
          { icon: Sparkles, label: "Vocabulary", value: `${vocab.length} words (${masteredWords} mastered)` },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-xs text-[var(--color-text-secondary)]">{s.label}</span>
            </div>
            <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Weekly XP Goal</span>
            <span className="text-xs text-[var(--color-text-disabled)]">{xpPct}%</span>
          </div>
          <div className="w-full h-3 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
          <p className="text-xs text-[var(--color-text-disabled)] mt-1">{xpThisWeek} / {weeklyXpGoal} XP this week</p>
        </div>
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Weekly Lesson Goal</span>
            <span className="text-xs text-[var(--color-text-disabled)]">{lessonPct}%</span>
          </div>
          <div className="w-full h-3 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#9B59B6] transition-all duration-500" style={{ width: `${lessonPct}%` }} />
          </div>
          <p className="text-xs text-[var(--color-text-disabled)] mt-1">{lessonsThisWeek} / {weeklyLessonGoal} lessons this week</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
          Recommended for You
        </h2>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <Link key={rec.label} href={rec.href}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-[var(--color-surface)] rounded-[var(--radius-lg)] ring-1 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 ${
                  rec.priority === "high"
                    ? "ring-brand-200 hover:ring-[var(--color-primary)]"
                    : "ring-[var(--color-border-default)] hover:ring-[var(--color-border-default)]"
                }`}
              >
                <div className={`w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 ${
                  rec.priority === "high" ? "bg-[var(--color-primary)] text-[var(--color-primary-dark)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                }`}>
                  <rec.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{rec.label}</span>
                    {rec.priority === "high" && (
                      <span className="text-[10px] font-bold text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] px-1.5 py-0.5 rounded-full">Priority</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{rec.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--color-text-disabled)] shrink-0" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {unreviewed.length === 0 && xpPct >= 100 && lessonPct >= 100 && doneLessons >= totalLessons && (
        <div className="mt-6 bg-gradient-to-r from-emerald-50 to-brand-50 rounded-[var(--radius-lg)] ring-1 ring-emerald-100 p-6 text-center">
          <Sparkles className="w-10 h-10 text-[var(--color-success)] mx-auto mb-2" />
          <h3 className="text-lg font-bold text-emerald-800">All caught up!</h3>
          <p className="text-sm text-[var(--color-success)] mt-1">You&apos;ve completed everything. Try exploring new topics or revisiting challenging areas.</p>
        </div>
      )}
    </PageWrapper>
  );
}
