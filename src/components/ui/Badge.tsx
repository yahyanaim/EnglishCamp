import { cn } from "@/lib/utils";
import { Badge as StyledBadge } from "./shadcn/badge";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const variants = {
  default:
    "bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]",
  success:
    "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)]",
  warning:
    "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border-[var(--color-warning)]",
  danger:
    "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]",
  info: "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border-[var(--color-primary)]",
};

export function Badge({ children, variant = "default", className }: Props) {
  return (
    <StyledBadge
      variant="outline"
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-sm)] text-xs font-display font-bold border",
        variants[variant],
        className,
      )}
    >
      {children}
    </StyledBadge>
  );
}
