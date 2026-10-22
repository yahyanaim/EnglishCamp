"use client";
import { useVocabulary } from "@/store/useVocabulary";
import { useState } from "react";
import { BookPlus } from "lucide-react";

export function AddToVocabButton({
  de,
  en,
  category,
}: {
  de: string;
  en: string;
  category?: string;
}) {
  const { addWord } = useVocabulary();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addWord(de, en, category);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-[var(--radius-md)] transition-all ${
        added
          ? "bg-[var(--color-success)] text-white"
          : "text-[var(--color-text-disabled)] hover:text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-subtle)]"
      }`}
      title={added ? "Saved!" : "Add to vocabulary"}
    >
      <BookPlus className="w-3 h-3" />
      {added ? "Saved" : "Save"}
    </button>
  );
}
