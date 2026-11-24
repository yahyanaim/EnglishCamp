"use client";
import { Button } from "@/components/ui/shadcn/button";
import { shadowChannel, shadowLessonKind, shadowTopics, type ShadowLesson } from "@/data/shadowing";
import {useProgress} from '@/store/useProgress';
import {shadowLessonId,shadowLineId} from '@/lib/shadowProgress';
import {useEffect,useState} from 'react';
import {NumberSeal} from '@/components/ui/NumberSeal';
export function ShadowLessonCard({lesson,selected,onSelect}:{lesson:ShadowLesson;selected:boolean;onSelect:(id:string)=>void}){
 const [mounted,setMounted]=useState(false);useEffect(()=>setMounted(true),[]);
 const map=useProgress(s=>s.exercisesDone);
 const done=mounted&&!!map[shadowLessonId(lesson.id)],practised=mounted?lesson.lines.filter((_,i)=>map[shadowLineId(lesson.id,i)]).length:0;
 return <Button type="button" variant="unstyled" size="unstyled" className="camp-shadow-lesson" aria-pressed={selected} onClick={()=>onSelect(lesson.id)}>
  <span className="camp-shadow-thumb">{lesson.level&&<span className="camp-shadow-seal camp-shadow-thumb-seal" data-level={lesson.level}><NumberSeal value={lesson.level} label={`Level ${lesson.level}`}/></span>}<img src={`https://i.ytimg.com/vi/${lesson.videoId}/mqdefault.jpg`} alt="" loading="lazy" width={144} height={81}/></span>
  <span className="camp-shadow-lesson-copy"><strong>{lesson.title}</strong><small>{Math.round(lesson.duration)}s · {done?'Completed ✓':`${practised}/${lesson.lines.length} lines practised`}</small><small>{shadowChannel(lesson)}</small><span className="camp-shadow-topic-list"><span className="camp-shadow-topic">{lesson.track?`${lesson.track} · ${lesson.skill}`:shadowLessonKind(lesson)==='pronunciation'?'Pronunciation':'Conversation'}</span>{shadowTopics(lesson).map(topic=><span key={topic} className="camp-shadow-topic">{topic}</span>)}</span></span>
 </Button>;
}
