import { LearningArt } from "@/components/brand/LearningArt";
import { BookOpen } from "lucide-react";

interface Props { verb: string; rows: { pronoun: string; form: string; meaning: string }[] }

export function ConjugationBlock({ verb, rows }: Props) {
  return (
    <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-primary)] overflow-hidden bg-[var(--color-surface)]" style={{ boxShadow: "0 3px 0 var(--color-primary)" }}>
      <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ backgroundColor: "var(--color-primary)" }}>
        <LearningArt name="BookOpen" size={16} className="w-4 h-4 text-white" />
        <span className="font-display font-extrabold text-white font-mono text-base">{verb}</span>
        <span className="font-body text-xs text-white/60 italic">conjugation</span>
      </div>
      <div className="divide-y divide-[var(--color-border-default)]">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center px-5 py-3 font-body text-sm hover:bg-[var(--color-primary-subtle)] transition-colors">
            <span className="w-20 font-bold text-[var(--color-text-secondary)]">{row.pronoun}</span>
            <span className="w-44 font-mono font-bold text-lg text-[var(--color-primary-dark)]">{row.form}</span>
            <span className="text-[var(--color-text-disabled)] italic text-xs">→ {row.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
