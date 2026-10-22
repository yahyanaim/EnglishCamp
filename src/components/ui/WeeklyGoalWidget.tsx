"use client";
import { motion } from "framer-motion";
import { useGoals } from "@/store/useGoals";
import { Target } from "lucide-react";
export function WeeklyGoalWidget() {
  const { weeklyXpGoal, weeklyLessonGoal, xpThisWeek, lessonsThisWeek, setGoals } = useGoals();
  const { xpPct, lessonPct } = useGoals().getProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
        <span className="font-display font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>Weekly Goals</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between font-body text-xs mb-1" style={{ color: "var(--color-text-secondary)" }}>
            <span>XP: {xpThisWeek} / {weeklyXpGoal}</span>
            <span>{xpPct}%</span>
          </div>
          <div className="w-full h-2.5 bg-[var(--color-neutral-100)] rounded-[var(--radius-pill)] overflow-hidden">
            <div
              className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between font-body text-xs mb-1" style={{ color: "var(--color-text-secondary)" }}>
            <span>Lessons: {lessonsThisWeek} / {weeklyLessonGoal}</span>
            <span>{lessonPct}%</span>
          </div>
          <div className="w-full h-2.5 bg-[var(--color-neutral-100)] rounded-[var(--radius-pill)] overflow-hidden">
            <div
              className="h-full rounded-[var(--radius-pill)] transition-all duration-500"
              style={{ width: `${lessonPct}%`, backgroundColor: "var(--color-info)" }}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="number"
            value={weeklyXpGoal}
            onChange={(e) => setGoals(Number(e.target.value), weeklyLessonGoal)}
            className="w-16 px-2 py-1.5 font-body text-xs bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-md)] outline-none transition-all duration-150"
            style={{ color: "var(--color-text-primary)" }}
            placeholder="XP"
          />
          <input
            type="number"
            value={weeklyLessonGoal}
            onChange={(e) => setGoals(weeklyXpGoal, Number(e.target.value))}
            className="w-16 px-2 py-1.5 font-body text-xs bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-md)] outline-none transition-all duration-150"
            style={{ color: "var(--color-text-primary)" }}
            placeholder="Lessons"
          />
          <span className="font-body text-[10px] self-center" style={{ color: "var(--color-text-disabled)" }}>Set weekly targets</span>
        </div>
      </div>
    </motion.div>
  );
}
