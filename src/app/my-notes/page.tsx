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
import {useCloudNotes} from '@/components/session/CloudNotesProvider';
import {NoteConflictNotice} from '@/components/ui/NoteConflictNotice';

export default function MyNotes() {
  const cloud=useCloudNotes();
  const notes = useNotes(state => state.notes);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  useEffect(() => setReady(true), []);
  const entries = useMemo(() => {if(!ready)return [];const visible={...notes};for(const id of Object.keys(cloud.conflicts))if(!visible[id]?.trim())visible[id]='This device cleared the note. Review the other device’s version below.';return organiseLessonNotes(visible,courseCatalogue,query);}, [ready, notes, query, cloud.conflicts]);
  const groups = Array.from(new Set(entries.map(note => note.courseId)));
  return <PageWrapper>
    <PageBanner><h1>My notes</h1><p>Your rules, examples and questions, organised by course and lesson.</p></PageBanner>
    <section className="camp-hub-filters camp-notes-filters" aria-label="Find a note">
      <label className="camp-hub-search" htmlFor="notes-search"><Search size={16} aria-hidden="true" /><Input aria-label="Search my notes" id="notes-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search lesson titles or your notes" /></label>
      <div className="camp-notes-sync"><span className="camp-notes-sync-dot" data-status={cloud.status} aria-hidden="true" /><p role="status">{cloud.status==='local'?'Saved on this device':cloud.status==='syncing'?'Syncing your lesson notes…':cloud.message}</p>{cloud.status!=='local'&&<Button size="sm" variant="outline" disabled={cloud.status==='syncing'} onClick={()=>void cloud.sync()}>Sync notes</Button>}</div>
    </section>
    <div className="camp-notes-stats" aria-label="Notes overview">
      <div><span><LearningArt name="NotebookPen" size={20} /></span><strong>{entries.length}</strong><small>{entries.length === 1 ? "Lesson note" : "Lesson notes"}</small></div>
      <div><span><LearningArt name="book" size={20} /></span><strong>{groups.length}</strong><small>{groups.length === 1 ? "Course" : "Courses"}</small></div>
      <div><span><LearningArt name="review" size={20} /></span><strong>{cloud.status==='local'?'Device':'Cloud'}</strong><small>{cloud.status==='local'?'Save your profile to sync':'Synced across devices'}</small></div>
    </div>
    {!ready ? <p role="status">Loading your notes…</p> : entries.length === 0 ? <div className="camp-notes-empty">
      <span className="camp-notes-empty-art"><LearningArt name="NotebookPen" size={34} /></span>
      <h2>{query ? "No matching notes" : "A space for your own learning"}</h2>
      <p>{query ? "Try another lesson name or a word from your note." : "Write rules, examples and questions while you watch. Every note is filed under its lesson automatically."}</p>
      {!query && <ol className="camp-notes-howto"><li><span>1</span><p>Open a course lesson</p></li><li><span>2</span><p>Choose <strong>Add a note</strong> under the video</p></li><li><span>3</span><p>Find it here, organised by course</p></li></ol>}
      <Link prefetch={false} href="/dashboard#courses" className="camp-notes-cta">Browse your courses <ArrowUpRight size={15} /></Link>
    </div> : groups.map(group => {
      const items = entries.filter(note => note.courseId === group);
      return <section className="camp-notes-group camp-learning-library-group" key={group}><h2>{items[0].courseTitle}<span className="camp-hub-section-count">{items.length}</span></h2><div className="camp-notes-list">{items.map(note => <article className="camp-saved-note" key={note.lessonId} data-editing={editing === note.lessonId}>
        <div className="camp-saved-note-heading"><div>{note.moduleNumber && <small>Module {note.moduleNumber}</small>}<h3>{note.title}</h3></div></div>
        {editing === note.lessonId ? <NotesEditor key={note.lessonId} lessonId={note.lessonId} lessonTitle={note.title} /> : <><p className="camp-note-text" dir="auto">{note.text}</p><NoteConflictNotice lessonId={note.lessonId}/></>}
        <div className="camp-saved-note-actions"><Button variant="outline" size="sm" onClick={() => setEditing(editing === note.lessonId ? null : note.lessonId)}>{editing === note.lessonId ? "Close editor" : "Edit note"}</Button>{note.href && <Link prefetch={false} href={note.href}>Open lesson <ArrowUpRight size={14} /></Link>}</div>
      </article>)}</div></section>;
    })}
  </PageWrapper>;
}
