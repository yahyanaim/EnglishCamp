"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { LevelEncouragement } from "@/components/ui/LevelEncouragement";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface Props { xp: number; level: number; title: string; nextXP: number; }

export function XPBar({ xp, level, title, nextXP }: Props) {
  const progress = nextXP === Infinity ? 100 : Math.min(100, Math.round((xp / nextXP) * 100));

  return (
    <div
      className="camp-xp-card bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "var(--shadow-1)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
          <LevelEncouragement level={level} />
          <span className="font-body text-sm text-[var(--color-text-secondary)]">{title}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-display font-extrabold text-sm px-3 py-1.5 rounded-[var(--radius-sm)] border text-[var(--color-text-warning)] bg-[var(--color-warning-bg)] border-[var(--color-warning)]">
          <LearningArt name="Zap" size={16} className="w-4 h-4 text-[var(--color-warning)]" />
          {xp.toLocaleString()} XP
        </span>
      </div>
      <div className="w-full h-3 bg-[var(--color-neutral-100)] rounded-[var(--radius-pill)] overflow-hidden">
        <motion.div
          className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {nextXP !== Infinity && (
        <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2">
          {nextXP - xp} XP to next level
        </p>
      )}
    </div>
  );
}
