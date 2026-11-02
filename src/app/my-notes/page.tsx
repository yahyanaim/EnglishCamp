"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { NotebookPen, Search, ArrowUpRight } from "lucide-react";
import { useNotes } from "@/store/useNotes";
import { courseCatalogue } from "@/data/course-catalogue";
import { organiseLessonNotes } from "@/lib/lessonNotes";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { NotesEditor } from "@/components/ui/NotesEditor";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

export default function MyNotes() {
  const notes = useNotes(state => state.notes);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  useEffect(() => setReady(true), []);
  const entries = useMemo(() => ready ? organiseLessonNotes(notes, courseCatalogue, query) : [], [ready, notes, query]);
  const groups = Array.from(new Set(entries.map(note => note.courseId)));
  return <PageWrapper>
    <PageBanner><h1>My notes</h1><p>Your rules, examples and questions, organised by course and lesson.</p></PageBanner>
    <div className="camp-notes-toolbar"><label htmlFor="notes-search"><Search size={17} /><Input aria-label="Search my notes" id="notes-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search lesson titles or your notes" /></label><span>{entries.length} {entries.length === 1 ? "lesson note" : "lesson notes"}</span></div>
    <p className="camp-notes-privacy">Saved only in this browser on this device. Signing out of your name profile keeps your lesson notes. No note text is sent to an EnglishCamp server.</p>
    {!ready ? <p role="status">Loading your notes…</p> : entries.length === 0 ? <div className="camp-notes-empty"><LearningArt name="NotebookPen" className="" /><h2>{query ? "No matching notes" : "A space for your own learning"}</h2><p>{query ? "Try another lesson name or a word from your note." : "Choose Add a note underneath a lesson video. It will appear here under the lesson’s name."}</p><Link prefetch={false} href="/dashboard#courses">Browse your courses <ArrowUpRight size={15} /></Link></div> : groups.map(group => {
      const items = entries.filter(note => note.courseId === group);
      return <section className="camp-notes-group" key={group}><h2>{items[0].courseTitle}<span>{items.length}</span></h2><div className="camp-notes-list">{items.map(note => <article className="camp-saved-note" key={note.lessonId}>
        <div className="camp-saved-note-heading"><div>{note.moduleNumber && <small>Module {note.moduleNumber}</small>}<h3>{note.title}</h3></div><Button variant="outline" size="sm" onClick={() => setEditing(editing === note.lessonId ? null : note.lessonId)}>{editing === note.lessonId ? "Close editor" : "Edit note"}</Button></div>
        {editing === note.lessonId ? <NotesEditor key={note.lessonId} lessonId={note.lessonId} lessonTitle={note.title} /> : <p className="camp-note-text">{note.text}</p>}
        {note.href && <Link prefetch={false} href={note.href}>Open lesson <ArrowUpRight size={14} /></Link>}
      </article>)}</div></section>;
    })}
  </PageWrapper>;
}
