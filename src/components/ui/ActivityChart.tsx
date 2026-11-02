"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { BarChart3 } from "lucide-react";
export function ActivityChart() {
  const { lessons } = useProgress();

  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return d.toISOString().split("T")[0];
  });

  const activityMap: Record<string, number> = {};
  for (const lesson of Object.values(lessons)) {
    if (lesson.completed && lesson.completedAt) {
      const day = lesson.completedAt.split("T")[0];
      activityMap[day] = (activityMap[day] ?? 0) + 1;
    }
  }

  const max = Math.max(1, ...Object.values(activityMap));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <LearningArt name="BarChart3" size={16} className="w-4 h-4" />
        <h3 className="font-display font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>Activity (28 days)</h3>
      </div>
      <div className="flex gap-[3px] items-end h-16">
        {days.map((day) => {
          const count = activityMap[day] ?? 0;
          const height = Math.max(3, (count / max) * 56);
          const isToday = day === new Date().toISOString().split("T")[0];
          return (
            <div
              key={day}
              className="flex-1 relative group"
              style={{ height: "100%", display: "flex", alignItems: "flex-end" }}
            >
              <div
                className="w-full rounded-sm transition-all duration-300"
                style={{
                  height: `${height}px`,
                  minHeight: count > 0 ? "4px" : "3px",
                  backgroundColor: count > 0
                    ? isToday ? "var(--color-primary)" : "var(--color-primary-light)"
                    : "var(--color-neutral-100)",
                }}
              />
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                <div
                  className="text-white text-[10px] px-2 py-1 rounded-[var(--radius-md)] whitespace-nowrap shadow-lg font-body"
                  style={{ backgroundColor: "var(--color-neutral-700)" }}
                >
                  {`${day}: ${count} activities`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
