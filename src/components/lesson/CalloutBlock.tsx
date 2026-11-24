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
    <div className="camp-callout" data-tone={tone}>
      <span className="camp-callout-icon"><LearningArt name={Icon.displayName || "book"} size={18} /></span>
      <div>
        {title && <p className="camp-callout-title">{title}</p>}
        <p className="camp-callout-text">{text}</p>
      </div>
    </div>
  );
}
