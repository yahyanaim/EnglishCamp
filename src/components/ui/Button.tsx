"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "level";
type Size    = "sm" | "md" | "lg";

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?:    Size;
  loading?: boolean;
  accent?:  string;
}

const variants: Record<Variant, string> = {
  primary:   "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-[0_4px_0_var(--color-primary-dark)] hover:brightness-[1.06] active:translate-y-1 active:shadow-none",
  secondary: "bg-transparent text-[var(--color-text-secondary)] border-2 border-[var(--color-border-strong)] shadow-[0_4px_0_var(--color-border-strong)] hover:border-[var(--color-neutral-500)] hover:text-[var(--color-neutral-600)] active:translate-y-1 active:shadow-none",
  ghost:     "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline",
  danger:    "bg-[var(--color-error)] text-[var(--color-on-brand)] shadow-[0_4px_0_var(--color-error-dark)] hover:brightness-[1.06] active:translate-y-1 active:shadow-none",
  level:     "text-white shadow-[0_4px_0_rgba(0,0,0,0.2)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm min-w-[100px]",
  md: "px-6 py-2.5 text-sm min-w-[140px]",
  lg: "px-8 py-3.5 text-base min-w-[200px]",
};

export function Button({ variant = "primary", size = "md", loading, accent, className, children, ...props }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wider rounded-[var(--radius-pill)] transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-200)] disabled:text-[var(--color-text-disabled)] disabled:shadow-none",
        variants[variant],
        sizes[size],
        className
      )}
      style={accent ? { backgroundColor: accent } : undefined}
      disabled={loading || props.disabled}
      {...(props as any)}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-[var(--radius-pill)] animate-spin" />
      )}
      {children}
    </motion.button>
  );
}
