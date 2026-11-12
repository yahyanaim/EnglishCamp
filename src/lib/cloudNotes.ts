export const MAX_NOTE_LENGTH=12000;
export type CloudNote={text:string;revision:number;updatedAt:string};
export type NoteOperation={id:string;lessonId:string;text:string;baseRevision:number};
export type NoteConflict=CloudNote&{operationId:string};
export function validNoteOperation(value:unknown):value is NoteOperation {
 const v=value as NoteOperation;
 return !!v&&typeof v.id==='string'&&/^[a-f0-9-]{36}$/.test(v.id)&&typeof v.lessonId==='string'&&v.lessonId.trim().length>0&&v.lessonId.length<=180&&!/[\u0000-\u001f\u007f]/.test(v.lessonId)&&!Object.prototype.hasOwnProperty.call(Object.prototype,v.lessonId)&&v.lessonId!=='prototype'&&typeof v.text==='string'&&v.text.length<=MAX_NOTE_LENGTH&&Number.isSafeInteger(v.baseRevision)&&v.baseRevision>=0;
}
