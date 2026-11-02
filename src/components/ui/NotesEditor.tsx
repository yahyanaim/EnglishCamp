"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import { useNotes } from "@/store/useNotes";
import { NotebookPen, Plus, Check } from "lucide-react";

export function NotesEditor({ lessonId, lessonTitle, compact = false }: { lessonId: string; lessonTitle?: string; compact?: boolean }) {
  const note = useNotes(state => state.notes[lessonId] ?? "");
  const setNote = useNotes(state => state.setNote);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [open, setOpen] = useState(!compact);
  const [error, setError] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setReady(true), []);
  useEffect(() => { if (compact && open) textarea.current?.focus(); }, [compact, open]);
  const stored = ready ? note : "";
  const text = draft ?? stored;
  const dirty = draft !== null && text !== stored;
  function save() {
    try { setNote(lessonId, text); setDraft(null); setError(""); }
    catch { setError("This browser could not save the note. Keep a copy of your text and try again."); }
  }
  return <section className="camp-note-editor" aria-label={lessonTitle ? `Notes for ${lessonTitle}` : "Lesson notes"}>
    <div className="camp-note-heading"><span><LearningArt name="NotebookPen" size={17}  />My lesson note</span>{compact && <Button variant="ghost" size="sm" disabled={!ready} onClick={() => setOpen(value => !value)}>{open ? "Close" : stored.trim() ? "Edit note" : <><Plus size={15} />Add a note</>}</Button>}</div>
    {open && <div className="camp-note-body">
      <label htmlFor={`lesson-note-${lessonId}`}>{lessonTitle || "Personal notes"}</label>
      <Textarea ref={textarea} id={`lesson-note-${lessonId}`} value={text} disabled={!ready} onChange={event => { setDraft(event.target.value); setError(""); }} onBlur={() => { if (dirty) save(); }} placeholder="Write a rule, example or question to revisit…" rows={4} />
      <div className="camp-note-actions"><p role="status" className={error ? "text-[var(--color-text-error)]" : ""}>{error || (dirty ? "Unsaved changes" : stored.trim() ? "Saved on this device" : "Your notes stay on this device.")}</p><Button size="sm" disabled={!ready} onClick={save}><Check size={15} />Save note</Button></div>
      <p className="camp-note-help">Also available in Progress → My notes, under this lesson’s name. No note text is uploaded.</p>
    </div>}
  </section>;
}
