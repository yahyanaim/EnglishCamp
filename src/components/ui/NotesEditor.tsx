"use client";
import { useState } from "react";
import { useNotes } from "@/store/useNotes";
import { StickyNote } from "lucide-react";
export function NotesEditor({ lessonId }: { lessonId: string }) {
  const { getNote, setNote } = useNotes();
  const [text, setText] = useState(getNote(lessonId));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setNote(lessonId, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center gap-2 mb-2">
        <StickyNote className="w-4 h-4 text-[var(--color-text-disabled)]" />
        <span className="text-sm font-medium text-[var(--color-text-primary)]">Personal Notes</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes about this lesson..."
        rows={3}
        className="w-full text-sm text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2 resize-y placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 transition-all"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSave}
          className={`text-xs font-medium px-3 py-1.5 rounded-[var(--radius-md)] border transition-all ${
            saved
              ? "bg-[var(--color-success)] text-[var(--color-on-brand)] border-[var(--color-success)]"
              : "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-brand)]"
          }`}
        >
          {saved ? "Saved ✓" : "Save Notes"}
        </button>
      </div>
    </div>
  );
}
