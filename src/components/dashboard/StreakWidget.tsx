"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { Flame } from "lucide-react";

interface Props { streak: number; }

export function StreakWidget({ streak }: Props) {
  return (
    <div
      className="inline-flex items-center gap-2 font-display font-extrabold px-4 py-2 rounded-[var(--radius-pill)] border-[1.5px] transition-all duration-200"
      style={{
        color: streak > 0 ? "var(--color-text-warning)" : "var(--color-text-secondary)",
        backgroundColor: streak > 0 ? "var(--color-warning-bg)" : "var(--color-neutral-50)",
        borderColor: streak > 0 ? "var(--color-warning)" : "var(--color-border-default)",
        boxShadow: streak > 0 ? "0 2px 0 var(--color-warning-dark)" : "none",
      }}
    >
      <LearningArt name="Flame" size={20} className="w-5 h-5" />
      <span style={{ fontSize: "15px" }}>{streak}</span>
      <span className="font-body font-semibold text-xs text-[var(--color-text-secondary)]">day streak</span>
    </div>
  );
}
