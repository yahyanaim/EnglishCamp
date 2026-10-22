import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = "text", width, height }: Props) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]",
        variant === "circular" && "rounded-[var(--radius-pill)]",
        variant === "rectangular" && "rounded-[var(--radius-lg)]",
        variant === "text" && "rounded-[var(--radius-md)] h-4",
        className
      )}
      style={{ width, height }}
    />
  );
}
