import { Lightbulb, BookOpen, Info, AlertTriangle } from "lucide-react";

interface Props { tone?: "tip" | "rule" | "note" | "warning"; title?: string; text: string }

const styles = {
  tip:     { bg: "var(--color-success-bg)", border: "var(--color-success)", icon: Lightbulb, color: "var(--color-success-dark)" },
  rule:    { bg: "var(--color-warning-bg)", border: "var(--color-warning)", icon: BookOpen,   color: "var(--color-warning-dark)" },
  note:    { bg: "var(--color-info-bg)",     border: "var(--color-info)", icon: Info,         color: "var(--color-info-dark)" },
  warning: { bg: "var(--color-error-bg)",    border: "var(--color-error)", icon: AlertTriangle, color: "var(--color-error)" },
};

export function CalloutBlock({ tone = "note", title, text }: Props) {
  const s = styles[tone];
  const Icon = s.icon;

  return (
    <div className="rounded-[var(--radius-lg)] p-5 border-2" style={{ backgroundColor: s.bg, borderColor: s.border, boxShadow: `0 3px 0 ${s.border}` }}>
      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center flex-shrink-0 border-2 border-[var(--color-border-default)]" style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
          <Icon className="w-5 h-5" style={{ color: s.color }} />
        </div>
        <div className="flex-1">
          {title && <p className="font-display font-extrabold mb-1.5 text-sm" style={{ color: s.color }}>{title}</p>}
          <p className="font-body text-sm leading-relaxed whitespace-pre-line text-[var(--color-text-primary)]">{text}</p>
        </div>
      </div>
    </div>
  );
}
