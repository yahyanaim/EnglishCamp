"use client";
import { Button } from "./shadcn/button";
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
    <Button variant="unstyled" size="unstyled"
      onClick={handleAdd}
      className={`font-body inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-[var(--radius-md)] transition-all ${
        added
          ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-link)] hover:bg-[var(--color-primary-subtle)]"
      }`}
      title={added ? "Saved!" : "Add to vocabulary"}
    >
      <BookPlus className="w-3 h-3" />
      {added ? "Saved" : "Save"}
    </Button>
  );
}
