"use client";
import {useState} from 'react';
import {Button} from '@/components/ui/shadcn/button';
import {useProgress} from '@/store/useProgress';
import type {ShadowLesson} from '@/data/shadowing';
import {shadowLineId,shadowPracticeProgress,recordShadowPractice} from '@/lib/shadowProgress';
export function ShadowPracticeProgress({lesson,index}:{lesson:ShadowLesson;index:number}){
 const done=useProgress(s=>s.exercisesDone),complete=useProgress(s=>s.completeExercise),[notice,setNotice]=useState(''),progress=shadowPracticeProgress(lesson,done),marked=!!done[shadowLineId(lesson.id,index)];
 return <section className="camp-shadow-practice-progress" aria-label="Shadowing practice progress"><div><strong>{progress.lines}/{progress.total} lines practised{progress.complete?' · Conversation complete':''}</strong><p>Repeat the line aloud, then mark your practice. Saved to your XP and activity.</p>{notice&&<p role="status">{notice}</p>}</div><Button variant="outline" size="sm" disabled={marked} onClick={()=>{const xp=recordShadowPractice(lesson,index,done,complete);setNotice(xp?`Practice saved · +${xp} XP`:'Practice already saved.');}}>{marked?'Line practised ✓':'I practised this line'}</Button></section>;
}
