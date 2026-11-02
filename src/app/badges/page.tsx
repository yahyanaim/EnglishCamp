"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useAchievements, ACHIEVEMENTS } from "@/store/useAchievements";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Trophy, Lock } from "lucide-react";

const categoryColors: Record<string, string> = {
  streak: "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] font-extrabold shadow-sm border-[var(--color-warning)]",
  xp: "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] font-extrabold shadow-sm border-[var(--color-warning)]",
  exercises: "text-[#9B59B6] bg-[#9B59B6] text-white border-[#9B59B6]",
  vocab: "bg-emerald-500 text-white font-bold border-[var(--color-success)]",
  quiz: "text-[var(--color-text-info)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] border-[var(--color-info)]",
  errors: "bg-red-500 text-white font-bold border-[var(--color-error)]",
  special: "text-[var(--color-primary)] bg-[var(--color-primary-subtle)] border-[var(--color-primary)]",
};

export default function BadgesPage() {
  const { getUnlocked, getLocked, getProgress, checkAndUnlock } = useAchievements();
  const [filter, setFilter] = useState<string>("all");
  const [showLocked, setShowLocked] = useState(true);

  useEffect(() => { checkAndUnlock(); }, []);

  const unlocked = getUnlocked();
  const locked = getLocked();

  const displayed = filter === "all"
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter((a) => a.category === filter);

  const categories = Array.from(new Set(ACHIEVEMENTS.map((a) => a.category)));

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Achievements</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{unlocked.length} / {ACHIEVEMENTS.length} unlocked</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-semibold transition-colors ${filter === "all" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-semibold transition-colors capitalize ${filter === cat ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((ach, i) => {
            const isUnlocked = !!unlocked.find((u) => u.id === ach.id);
            const prog = getProgress(ach.id);
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`relative rounded-[var(--radius-lg)] p-5 transition-all ${
                  isUnlocked
                    ? "bg-gradient-to-br from-[var(--color-warning)] to-white ring-1 ring-amber-200 shadow-sm"
                    : "bg-[var(--color-surface)] border border-[var(--color-border-default)] opacity-75"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl ${
                    isUnlocked ? "bg-[var(--color-warning-bg)]" : "bg-[var(--color-surface-alt)]"
                  }`}>
                    {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-[var(--color-text-secondary)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-bold ${isUnlocked ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}>
                        {ach.title}
                      </h3>
                      {isUnlocked && <LearningArt name="Trophy" className="w-3.5 h-3.5 text-[var(--color-text-warning)]" />}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">{ach.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[ach.category] || categoryColors.special}`}>
                        {ach.category}
                      </span>
                    </div>
                    {!isUnlocked && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-[var(--color-text-secondary)] mb-1">
                          <span>{prog.current} / {prog.target}</span>
                          <span>{prog.pct}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-border-default)]" style={{ width: `${prog.pct}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!showLocked && locked.length > 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--color-text-secondary)]">Showing unlocked only</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
