"use client";
import { useState } from "react";
import { Keyboard } from "lucide-react";
const SPECIAL_CHARS = ["é", "è", "ê", "ë", "à", "â", "ç", "ô", "œ", "ù", "û", "ü", "ï"];

export function SpecialCharsKeyboard({
  onInsert,
}: {
  onInsert: (char: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-subtle)] px-2.5 py-1.5 rounded-[var(--radius-md)] transition-all border border-[var(--color-border-default)]"
        title="Special characters (for loanwords)"
      >
        <Keyboard className="w-3.5 h-3.5" />
        <span>Accents</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 flex gap-1 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-lg border-2 border-[var(--color-border-default)] p-2">
          {SPECIAL_CHARS.map((char) => (
            <button
              key={char}
              onClick={() => {
                onInsert(char);
                setOpen(false);
              }}
              className="w-9 h-9 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary-dark)] hover:ring-2 hover:ring-[var(--color-primary)] transition-all"
            >
              {char}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
