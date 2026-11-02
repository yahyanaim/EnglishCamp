"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useProgress } from "@/store/useProgress";
import { motion } from "framer-motion";
import { Zap, Flame, ScrollText, Star, CheckCircle2, BookOpen } from "lucide-react";

const statConfig = [
  { label: "Total XP", key: "xp" as const, icon: Zap, fg: "var(--color-text-warning)", bg: "var(--color-warning-bg)", border: "var(--color-warning)" },
  { label: "Day Streak", key: "streak" as const, icon: Flame, fg: "var(--color-text-warning)", bg: "var(--color-warning-bg)", border: "var(--color-warning)" },
  { label: "Quizzes Taken", key: "quizzes" as const, icon: ScrollText, fg: "var(--color-text-info)", bg: "var(--color-info-bg)", border: "var(--color-info)" },
  { label: "Best Quiz", key: "bestQuiz" as const, icon: Star, fg: "var(--color-course-band4-5)", bg: "var(--color-info-bg)", border: "#9B59B6" },
  { label: "Exercises Done", key: "exercises" as const, icon: CheckCircle2, fg: "var(--color-text-link)", bg: "var(--color-primary-subtle)", border: "var(--color-primary)" },
  { label: "Lessons Done", key: "lessons" as const, icon: BookOpen, fg: "var(--color-text-link)", bg: "var(--color-primary-subtle)", border: "#7E22CE" },
];

export function ProgressChart() {
  const { xp, streak, quizResults, exercisesDone, lessons } = useProgress();

  const totalQuizzes = Object.values(quizResults).flat().length;
  const totalExercises = Object.values(exercisesDone).filter(Boolean).length;
  const bestQuizScore = Math.max(
    0,
    ...Object.values(quizResults)
      .flat()
      .map((r) => r.score)
  );
  const totalLessons = Object.values(lessons).filter((l) => l.completed).length;

  const values: Record<string, string> = {
    xp: xp.toLocaleString(),
    streak: `${streak}`,
    quizzes: totalQuizzes.toString(),
    bestQuiz: bestQuizScore > 0 ? `${bestQuizScore}%` : "-",
    exercises: totalExercises.toString(),
    lessons: `${totalLessons}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "var(--shadow-1)" }}
    >
      <h3 className="font-display font-bold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>Learning Stats</h3>
      <div className="grid grid-cols-3 gap-2">
        {statConfig.map((s) => (
          <div
            key={s.key}
            className="rounded-[var(--radius-md)] p-3 text-center border transition-all duration-200"
            style={{
              backgroundColor: s.bg,
              borderColor: s.border,
            }}
          >
            <LearningArt name={s.icon.displayName || "book"} size={16} className="w-4 h-4 mx-auto mb-1" />
            <p className="font-display font-extrabold" style={{ fontSize: "16px", color: s.fg }}>{values[s.key]}</p>
            <p className="font-body text-[10px] font-medium mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
