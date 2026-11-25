import { AlertTriangle, BookOpen, Compass, FlaskConical, Info, Lightbulb, ListChecks, PenLine, Repeat2, Target, type LucideIcon } from "lucide-react";

interface Props { tone?: "tip" | "rule" | "note" | "warning"; title?: string; text: string }

const toneIcon: Record<NonNullable<Props["tone"]>, LucideIcon> = { tip: Lightbulb, rule: BookOpen, note: Info, warning: AlertTriangle };

/** Recurring lesson parts get a recognisable icon so learners can scan a long page. */
const titleIcon: Record<string, LucideIcon> = {
  "What you will learn": Target,
  "Learning objectives": Target,
  "Before you begin": ListChecks,
  "Practical strategy": Compass,
  "Guided practice": PenLine,
  "Recap": Repeat2,
  "Apply this in the practice lab": FlaskConical,
  "Common mistakes": AlertTriangle,
};

export function CalloutBlock({ tone = "note", title, text }: Props) {
  const Icon = (title && titleIcon[title]) || toneIcon[tone];
  return (
    <div className="camp-callout" data-tone={tone}>
      <span className="camp-callout-icon" aria-hidden="true"><Icon size={18} strokeWidth={2.2} /></span>
      <div>
        {title && <p className="camp-callout-title">{title}</p>}
        <p className="camp-callout-text">{text}</p>
      </div>
    </div>
  );
}
