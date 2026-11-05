"use client";
import { Button } from "@/components/ui/shadcn/button";
import { shadowChannel, shadowLessonKind, shadowTopics, type ShadowLesson } from "@/data/shadowing";
import {useProgress} from '@/store/useProgress';
import {shadowLessonId} from '@/lib/shadowProgress';
export function ShadowLessonCard({lesson,selected,onSelect}:{lesson:ShadowLesson;selected:boolean;onSelect:(id:string)=>void}){
 const done=useProgress(s=>!!s.exercisesDone[shadowLessonId(lesson.id)]);
 return <Button type="button" variant="unstyled" size="unstyled" className="camp-shadow-lesson" aria-pressed={selected} onClick={()=>onSelect(lesson.id)}>
  <span className="camp-shadow-thumb"><img src={`https://i.ytimg.com/vi/${lesson.videoId}/mqdefault.jpg`} alt="" loading="lazy" width={144} height={81}/></span>
  <span className="camp-shadow-lesson-copy"><strong>{lesson.title}{done?' · Practised ✓':''}</strong><small>{Math.round(lesson.duration)}s conversation · {lesson.lines.length} practice lines</small><small>{shadowChannel(lesson)}</small><span className="camp-shadow-topic-list"><span className="camp-shadow-topic">{lesson.track?`${lesson.track} · ${lesson.skill}`:shadowLessonKind(lesson)==='pronunciation'?'Pronunciation':'Conversation'}</span>{shadowTopics(lesson).map(topic=><span key={topic} className="camp-shadow-topic">{topic}</span>)}</span></span>
 </Button>;
}
