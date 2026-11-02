import { LearningArt } from "@/components/brand/LearningArt";
import { Lightbulb, BookOpen, Info, AlertTriangle } from "lucide-react";

interface Props { tone?: "tip" | "rule" | "note" | "warning"; title?: string; text: string }

const styles = {
  tip:     { bg: "var(--color-success-bg)", border: "var(--color-success)", icon: Lightbulb, color: "var(--color-text-success)" },
  rule:    { bg: "var(--color-warning-bg)", border: "var(--color-warning)", icon: BookOpen,   color: "var(--color-text-warning)" },
  note:    { bg: "var(--color-info-bg)",     border: "var(--color-info)", icon: Info,         color: "var(--color-text-info)" },
  warning: { bg: "var(--color-error-bg)",    border: "var(--color-error)", icon: AlertTriangle, color: "var(--color-text-error)" },
};

export function CalloutBlock({ tone = "note", title, text }: Props) {
  const s = styles[tone];
  const Icon = s.icon;

  return (
    <div className="rounded-[var(--radius-lg)] p-4 border" style={{ backgroundColor: s.bg, borderColor: s.border, boxShadow: "var(--shadow-1)" }}>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center flex-shrink-0 border border-[var(--color-border-default)]" style={{ boxShadow: "none" }}>
          <LearningArt name={Icon.displayName || "book"} size={20} className="w-5 h-5" />
        </div>
        <div className="flex-1">
          {title && <p className="font-display font-extrabold mb-1.5 text-sm" style={{ color: s.color }}>{title}</p>}
          <p className="font-body text-sm leading-relaxed whitespace-pre-line text-[var(--color-text-primary)]">{text}</p>
        </div>
      </div>
    </div>
  );
}
