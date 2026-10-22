import type { Letter } from "@/data/types";

interface Props { letter: Letter; index: number; }

export function AlphabetCard({ letter, index }: Props) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 border-2 border-[var(--color-border-default)] group transition-all duration-200 hover:border-[var(--color-primary)]"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="text-center mb-3">
        <span className="font-display font-extrabold text-4xl text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-dark)] transition-colors">{letter.letter}</span>
      </div>
      <div className="text-center space-y-1 text-sm">
        <p className="text-[var(--color-primary-dark)] font-mono font-medium">{letter.pronunciation}</p>
        <p className="text-[var(--color-text-primary)]">{letter.example}</p>
        <p className="text-[var(--color-text-disabled)] italic text-xs">{letter.meaning}</p>
      </div>
    </div>
  );
}
