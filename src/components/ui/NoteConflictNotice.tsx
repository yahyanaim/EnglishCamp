"use client";
import {useCloudNotes} from '@/components/session/CloudNotesProvider';
import {Button} from './shadcn/button';
export function NoteConflictNotice({lessonId,onResolved}:{lessonId:string;onResolved?:()=>void}){
 const sync=useCloudNotes(),other=sync.conflicts[lessonId];if(!other)return null;
 return <aside className="camp-note-conflict" aria-label="Note changed on another device"><strong>This lesson note also changed on another device</strong><p>Your version is kept here. Compare it with the other saved version before choosing.</p><blockquote dir="auto">{other.text||'(The other device cleared this note.)'}</blockquote><div><Button size="sm" variant="outline" onClick={()=>{sync.resolve(lessonId,'local');onResolved?.();}}>Keep this device’s note</Button><Button size="sm" onClick={()=>{sync.resolve(lessonId,'remote');onResolved?.();}}>Use the other note</Button></div></aside>;
}
