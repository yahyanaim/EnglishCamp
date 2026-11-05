"use client";
import { useEffect,useState } from "react";
import { adjectiveRound } from "@/data/adjective-questions";
import { PracticeCard,PracticeButton } from "@/components/ui/PracticeSurface";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect,playWrong } from "@/lib/audio";
export function AdjectiveEndingsTrainer(){
 const [pool,setPool]=useState<ReturnType<typeof adjectiveRound>>([]),[index,setIndex]=useState(0),[choice,setChoice]=useState<string|null>(null),[score,setScore]=useState(0),[done,setDone]=useState(false);
 const complete=useProgress(s=>s.completeExercise),addError=useErrors(s=>s.addError),item=pool[index];
 useEffect(()=>setPool(adjectiveRound()),[]);
 function select(value:string){if(choice!==null||!item)return;setChoice(value);if(value===item.answer){setScore(s=>s+1);playCorrect();complete(`adjective:${item.id}`,5);}else{playWrong();addError({question:item.sentence,userAnswer:value,correctAnswer:item.answer,explanation:item.explain,source:'exercise',sourceId:`adjective:${item.id}`});}}
 if(done)return <PracticeCard data-practice-surface="result" className="text-center"><h2>Adjective forms complete</h2><p>{score}/{pool.length} correct</p><PracticeButton className="camp-primary-action" onClick={()=>{setPool(adjectiveRound());setIndex(0);setChoice(null);setScore(0);setDone(false);}}>Practise again</PracticeButton></PracticeCard>;
 if(!item)return <p role="status">Preparing adjective practice…</p>;
 return <PracticeCard data-practice-surface="question"><header className="camp-quiz-status"><strong>Adjective forms</strong><span>{index+1}/{pool.length}</span></header><p className="camp-daily-question">{item.sentence}</p><div className="camp-adjective-options">{item.options.map(value=><PracticeButton key={value} disabled={choice!==null} data-outcome={choice===null?undefined:value===item.answer?'correct':value===choice?'incorrect':'other'} onClick={()=>select(value)}>{value}</PracticeButton>)}</div>{choice!==null&&<div className="camp-daily-feedback" role="status"><strong>{choice===item.answer?'Correct':`Correct form: ${item.answer}`}</strong><p>{item.explain}</p><PracticeButton className="camp-primary-action" onClick={()=>{if(index===pool.length-1)setDone(true);else{setIndex(i=>i+1);setChoice(null);}}}>{index===pool.length-1?'See result':'Next question'}</PracticeButton></div>}</PracticeCard>;
}
