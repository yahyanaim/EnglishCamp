"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button as StyledButton } from "./shadcn/button";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "level";
type Size = "sm" | "md" | "lg";

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  accent?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--camp-purple)] text-white shadow-[var(--shadow-1)] hover:brightness-[1.06] active:translate-y-px",
  secondary:
    "bg-transparent text-[var(--camp-control-ink)] border border-[var(--color-border-default)] shadow-none hover:border-[var(--color-neutral-500)] hover:text-[var(--color-neutral-600)] active:translate-y-px",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline",
  danger:
    "bg-[var(--color-error)] text-[var(--color-on-brand)] shadow-[var(--shadow-1)] hover:brightness-[1.06] active:translate-y-px",
  level: "text-white shadow-[var(--shadow-1)]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-3.5 py-2 text-sm",
  md: "min-h-11 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  accent,
  className,
  children,
  ...props
}: Props) {
  return (
    <StyledButton
      asChild
      variant="unstyled"
      size="unstyled"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-body font-medium rounded-[8px] transition-all duration-150 disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-200)] disabled:text-[var(--color-text-secondary)] disabled:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.98 }}
        style={accent ? { backgroundColor: accent } : undefined}
        disabled={loading || props.disabled}
        {...(props as any)}
      >
        {loading && (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-[var(--radius-pill)] animate-spin" />
        )}
        {children}
      </motion.button>
    </StyledButton>
  );
}
