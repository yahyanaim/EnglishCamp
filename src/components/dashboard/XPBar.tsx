"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface Props { xp: number; level: number; title: string; nextXP: number; }

export function XPBar({ xp, level, title, nextXP }: Props) {
  const progress = nextXP === Infinity ? 100 : Math.min(100, Math.round((xp / nextXP) * 100));

  return (
    <div
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "15px", letterSpacing: "0.5px" }}>
            Level {level}
          </span>
          <span className="font-body text-sm text-[var(--color-text-secondary)]">— {title}</span>
        </div>
        <span className="inline-flex items-center gap-1 font-display font-extrabold text-sm px-3 py-1.5 rounded-[var(--radius-pill)] border-[1.5px] text-[var(--color-warning-dark)] bg-[var(--color-warning-bg)] border-[var(--color-warning)]">
          <Zap className="w-4 h-4 text-[var(--color-warning)]" />
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
