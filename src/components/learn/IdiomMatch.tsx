"use client";
import { useEffect,useRef,useState } from 'react';
import { PracticeCard,PracticeButton } from '@/components/ui/PracticeSurface';
import { useProgress } from '@/store/useProgress';
import { idiomRounds,idiomMatches } from '@/lib/idiomMatch';
import { playCorrect,playWrong } from '@/lib/audio';
export function IdiomMatch(){
 const [rounds,setRounds]=useState<ReturnType<typeof idiomRounds>>([]),[index,setIndex]=useState(0),[left,setLeft]=useState<string|null>(null),[right,setRight]=useState<string|null>(null),[matched,setMatched]=useState<string[]>([]),[score,setScore]=useState(0),[attempts,setAttempts]=useState(0),[feedback,setFeedback]=useState(''),[done,setDone]=useState(false);
 const finished=useRef(false),complete=useProgress(s=>s.completeExercise),addXP=useProgress(s=>s.addXP);const round=rounds[index];
 function restart(){setRounds(idiomRounds());setIndex(0);setLeft(null);setRight(null);setMatched([]);setScore(0);setAttempts(0);setFeedback('');setDone(false);finished.current=false;}
 useEffect(()=>{setRounds(idiomRounds());},[]);
 function check(){if(!left||!right||!round)return;setAttempts(n=>n+1);if(idiomMatches(round.pairs,left,right)){setMatched(m=>[...m,left]);setScore(n=>n+1);complete(`idiom-${left}`,10);setFeedback('Matched. Choose the next pair.');playCorrect();}else{setFeedback('These do not match. Try another pair.');playWrong();}setLeft(null);setRight(null);}
 function next(){if(index===rounds.length-1){if(finished.current)return;finished.current=true;addXP(Math.round(score/Math.max(attempts,1)*30));setDone(true);}else{setIndex(n=>n+1);setMatched([]);setLeft(null);setRight(null);setFeedback('');}}
 if(!round)return <p role="status">Preparing idiom practice…</p>;
 if(done)return <PracticeCard data-practice-surface="result"><h2>Idiom Match complete</h2><p>{score}/{rounds.reduce((sum,r)=>sum+r.pairs.length,0)} pairs matched · {attempts} attempts · {Math.round(score/Math.max(attempts,1)*100)}% accuracy</p><PracticeButton className="camp-primary-action" onClick={restart}>Play again</PracticeButton></PracticeCard>;
 const completeRound=matched.length===round.pairs.length;
 return <PracticeCard data-practice-surface="question" className="camp-idiom-match"><header className="camp-quiz-status"><strong>Idiom Match</strong><span>Round {index+1}/{rounds.length} · {matched.length}/5 matched</span></header><p className="camp-practice-instruction">Choose one idiom and one meaning, then check your pair.</p><div className="camp-idiom-columns">{(['left','right'] as const).map(side=><div key={side}><h3>{side==='left'?'Idiom':'Meaning'}</h3>{round[side].map(p=><PracticeButton key={p.idiom} disabled={matched.includes(p.idiom)} aria-pressed={(side==='left'?left:right)===p.idiom} onClick={()=>{(side==='left'?setLeft:setRight)(p.idiom);setFeedback('');}}>{side==='left'?p.idiom:p.meaning}{matched.includes(p.idiom)&&<span aria-label="Matched">✓</span>}</PracticeButton>)}</div>)}</div><div className="camp-quiz-actions">{!completeRound&&<PracticeButton className="camp-primary-action" disabled={!left||!right} onClick={check}>Check pair</PracticeButton>}{completeRound&&<PracticeButton className="camp-primary-action" onClick={next}>{index===rounds.length-1?'See results':'Next round'}</PracticeButton>}</div>{feedback&&<p className="camp-practice-instruction" role="status">{feedback}</p>}{completeRound&&<details className="camp-idiom-review"><summary>Review examples</summary>{round.pairs.map(p=><p key={p.idiom}><strong>{p.idiom}</strong><br/>{p.example}</p>)}</details>}</PracticeCard>;
}
