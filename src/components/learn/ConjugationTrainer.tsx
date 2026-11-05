"use client";
import {useEffect,useState} from 'react';
import {VERBS} from '@/data/conjugaise';
import {VERB_TENSES,conjugatedForm,matchesConjugation,isContinuous,continuousPracticeAllowed,type VerbTense} from '@/lib/verbTenses';
import {PracticeCard,PracticeButton} from '@/components/ui/PracticeSurface';
import {SelectField} from '@/components/ui/shadcn/select-field';
import {useProgress} from '@/store/useProgress';
import {useErrors} from '@/store/useErrors';
import {SpeakerButton} from '@/components/ui/SpeakerButton';
import {playCorrect,playWrong} from '@/lib/audio';
const subjects=['I','you','he/she/it','we','they'] as const;
const round=(tense:VerbTense='present')=>VERBS.filter(verb=>!isContinuous(tense)||continuousPracticeAllowed(verb)).sort(()=>Math.random()-.5).slice(0,8).map(verb=>({verb,subject:Math.floor(Math.random()*5)}));
export function ConjugationTrainer(){
 const [tense,setTense]=useState<VerbTense>('present'),[pool,setPool]=useState<ReturnType<typeof round>>([]),[index,setIndex]=useState(0),[input,setInput]=useState(''),[answered,setAnswered]=useState(false),[score,setScore]=useState(0),[done,setDone]=useState(false),[earned,setEarned]=useState(0);
 const complete=useProgress(s=>s.completeExercise),addError=useErrors(s=>s.addError),item=pool[index],meta=VERB_TENSES.find(t=>t.id===tense)!;
 useEffect(()=>setPool(round()),[]);
 function restart(value=tense){setTense(value);setPool(round(value));setIndex(0);setInput('');setAnswered(false);setScore(0);setDone(false);setEarned(0);}
 const expected=item?conjugatedForm(item.verb,tense,item.subject):'',correct=matchesConjugation(input,expected);
 function check(){if(answered||!input.trim()||!item)return;setAnswered(true);const pronoun=subjects[item.subject],id=tense==='present'?`conj-${item.verb.infinitive}-${pronoun}`:`conj-${tense}-${item.verb.infinitive}-${pronoun}`;if(correct){setScore(s=>s+1);setEarned(complete(id,5));playCorrect();}else{playWrong();addError({question:`${meta.label}: ${pronoun} ___ (${item.verb.infinitive})`,userAnswer:input,correctAnswer:expected,explanation:meta.rule,source:'conjugation',sourceId:id});}}
 return <PracticeCard data-practice-surface={done?'result':'question'} className="camp-conjugation-practice"><label htmlFor="practice-tense">Practise a tense</label><SelectField id="practice-tense" value={tense} onValueChange={value=>restart(value as VerbTense)}>{VERB_TENSES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</SelectField>{done?<><h2>Practice complete</h2><p>{score}/{pool.length} correct</p><PracticeButton className="camp-primary-action" onClick={()=>restart()}>Practise again</PracticeButton></>:item?<><header className="camp-quiz-status"><strong>{meta.label}</strong><span>{index+1}/{pool.length}</span></header><p className="camp-practice-instruction">Write the full affirmative verb form for the subject below.</p><div className="camp-conjugation-prompt"><strong>{subjects[item.subject]}</strong><span>___</span><span>({item.verb.infinitive})</span><SpeakerButton text={item.verb.infinitive}/></div><form onSubmit={e=>{e.preventDefault();check();}}><label className="sr-only" htmlFor="conjugation-answer">Your verb form</label><input id="conjugation-answer" value={input} disabled={answered} autoComplete="off" onChange={e=>setInput(e.target.value)} placeholder="Type the complete verb form"/>{!answered&&<PracticeButton className="camp-primary-action" disabled={!input.trim()}>Check answer</PracticeButton>}</form>{answered&&<div className="camp-daily-feedback" role="status"><strong>{correct?`Correct${earned?` · +${earned} XP`:' · already practised'}`:`Correct form: ${expected}`}</strong><p>{meta.rule}</p><p lang="ar" dir="rtl">{meta.ar}</p><PracticeButton className="camp-primary-action" onClick={()=>{if(index===pool.length-1)setDone(true);else{setIndex(n=>n+1);setInput('');setAnswered(false);}}}>{index===pool.length-1?'See results':'Next question'}</PracticeButton></div>}</>:<p role="status">Preparing practice…</p>}</PracticeCard>;
}
