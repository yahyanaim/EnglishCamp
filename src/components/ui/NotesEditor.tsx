"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import { useNotes } from "@/store/useNotes";
import { NotebookPen, Plus, Check } from "lucide-react";
import {useCloudNotes} from '@/components/session/CloudNotesProvider';
import {NoteConflictNotice} from './NoteConflictNotice';
import {MAX_NOTE_LENGTH} from '@/lib/cloudNotes';

export function NotesEditor({ lessonId, lessonTitle, compact = false }: { lessonId: string; lessonTitle?: string; compact?: boolean }) {
  const cloud=useCloudNotes();
  const note = useNotes(state => state.notes[lessonId] ?? "");
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [baseRevision,setBaseRevision]=useState<number|undefined>(undefined);
  const [open, setOpen] = useState(!compact);
  const [error, setError] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setReady(true), []);
  useEffect(() => { if (compact && open) textarea.current?.focus(); }, [compact, open]);
  const stored = ready ? note : "";
  const text = draft ?? stored;
  const dirty = draft !== null && text !== stored;
  function save() {
    try { cloud.saveNote(lessonId, text,baseRevision); setDraft(null);setBaseRevision(undefined); setError(""); }
    catch { setError("This browser could not save the note. Keep a copy of your text and try again."); }
  }
  return <section className="camp-note-editor" aria-label={lessonTitle ? `Notes for ${lessonTitle}` : "Lesson notes"}>
    <div className="camp-note-heading"><span><LearningArt name="NotebookPen" size={17}  />My lesson note</span>{compact && <Button variant="ghost" size="sm" disabled={!ready} onClick={() => setOpen(value => !value)}>{open ? "Close" : stored.trim() ? "Edit note" : <><Plus size={15} />Add a note</>}</Button>}</div>
    {open && <div className="camp-note-body">
      <label htmlFor={`lesson-note-${lessonId}`}>{lessonTitle || "Personal notes"}</label>
      <Textarea ref={textarea} id={`lesson-note-${lessonId}`} value={text} dir="auto" maxLength={Math.max(MAX_NOTE_LENGTH,stored.length)} disabled={!ready} onChange={event => {if(draft===null)setBaseRevision(cloud.version(lessonId)); setDraft(event.target.value); setError(""); }} onBlur={() => { if (dirty) save(); }} placeholder="Write a rule, example or question to revisit…" rows={4} />
      <div className="camp-note-actions"><p role="status" className={error ? "text-[var(--color-text-error)]" : ""}>{error || (dirty ? "Unsaved changes" : cloud.status==='saved'?"Saved online":cloud.status==='local'?stored.trim()?"Saved on this device":"Your notes stay on this device.":cloud.status==='syncing'?"Saving online…":cloud.message||"Saved on this device; waiting to sync.")}</p><Button size="sm" disabled={!ready} onClick={save}><Check size={15} />Save note</Button></div>
      <NoteConflictNotice lessonId={lessonId} onResolved={()=>{setDraft(null);setBaseRevision(undefined);}}/>
      <p className="camp-note-help">Also available in Progress → My notes, under this lesson’s name. Online profiles sync saved lesson notes privately through Cloudflare.</p>
    </div>}
  </section>;
}
