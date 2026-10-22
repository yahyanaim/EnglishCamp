"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  value:   number;
  color?:  string;
  size?:   "sm" | "md" | "lg";
  label?:  boolean;
  glow?:   boolean;
}

const heights = { sm: "h-2", md: "h-3", lg: "h-4" };

export function Progress({ value, color = "var(--color-primary)", size = "md", label, glow }: Props) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
      <div className={cn("w-full bg-[var(--color-neutral-100)] rounded-[var(--radius-pill)] overflow-hidden", heights[size])}>
        <motion.div
          className="h-full rounded-[var(--radius-pill)]"
          style={{
            backgroundColor: color,
            boxShadow: glow ? `0 0 12px ${color}80` : undefined,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
