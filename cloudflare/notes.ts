import type {LearnerDatabase} from './learners';
import {validNoteOperation,type CloudNote,type NoteConflict} from '../src/lib/cloudNotes';
const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff'}});
type Row={lesson_id:string;body:string;revision:number;updated_at:string};
async function snapshot(db:LearnerDatabase,id:string){const value=await db.prepare("SELECT json_group_array(json_object('lessonId',lesson_id,'text',body,'revision',revision,'updatedAt',updated_at)) AS notes FROM cloud_notes WHERE learner_id=?").bind(id).first<{notes:string}>();return Object.fromEntries((JSON.parse(value?.notes||'[]') as ({lessonId:string}&CloudNote)[]).map(n=>[n.lessonId,{text:n.text,revision:n.revision,updatedAt:n.updatedAt}])) as Record<string,CloudNote>;}
/** A stale revision never overwrites a note from another device. Empty text is a deletion tombstone. */
export async function notesResponse(request:Request,db:LearnerDatabase,id:string,input?:{operations?:unknown}){
 if(request.method==='GET')return reply({notes:await snapshot(db,id)});
 if(request.method!=='PUT')return reply({error:'Method not allowed.'},405);
 if(!Array.isArray(input?.operations)||input.operations.length>4||!input.operations.every(validNoteOperation))return reply({error:'Send up to four valid note changes; each note can contain up to 12,000 characters.'},400);
 const acknowledged:string[]=[],conflicts:Record<string,NoteConflict>={};
 for(const op of input.operations){
  if(await db.prepare('SELECT operation_id FROM cloud_note_operations WHERE learner_id=? AND operation_id=?').bind(id,op.id).first()){acknowledged.push(op.id);continue;}
  const row=await db.prepare('SELECT lesson_id,body,revision,updated_at FROM cloud_notes WHERE learner_id=? AND lesson_id=?').bind(id,op.lessonId).first<Row>();
  if(row&&row.body!==op.text&&row.revision!==op.baseRevision){conflicts[op.lessonId]={text:row.body,revision:row.revision,updatedAt:row.updated_at,operationId:op.id};continue;}
  if(!row){const count=await db.prepare('SELECT COUNT(*) AS n FROM cloud_notes WHERE learner_id=?').bind(id).first<{n:number}>();if((count?.n??0)>=500)return reply({error:'This profile has reached its 500-note storage limit. Your local note is kept.'},409);}
  const now=new Date().toISOString();
  await db.batch([
   db.prepare('INSERT INTO cloud_notes(learner_id,lesson_id,body,revision,last_operation,updated_at) VALUES(?,?,?,1,?,?) ON CONFLICT(learner_id,lesson_id) DO UPDATE SET body=excluded.body,revision=cloud_notes.revision+1,last_operation=excluded.last_operation,updated_at=excluded.updated_at WHERE cloud_notes.revision=? OR cloud_notes.body=excluded.body').bind(id,op.lessonId,op.text,op.id,now,op.baseRevision),
   db.prepare('INSERT OR IGNORE INTO cloud_note_operations(learner_id,operation_id) SELECT learner_id,last_operation FROM cloud_notes WHERE learner_id=? AND lesson_id=? AND last_operation=?').bind(id,op.lessonId,op.id),
  ]);
  const latest=await db.prepare('SELECT lesson_id,body,revision,updated_at FROM cloud_notes WHERE learner_id=? AND lesson_id=?').bind(id,op.lessonId).first<Row>();
  if(latest&&await db.prepare('SELECT operation_id FROM cloud_note_operations WHERE learner_id=? AND operation_id=?').bind(id,op.id).first())acknowledged.push(op.id);
  else if(latest)conflicts[op.lessonId]={text:latest.body,revision:latest.revision,updatedAt:latest.updated_at,operationId:op.id};
 }
 return reply({notes:await snapshot(db,id),acknowledged,conflicts});
}
