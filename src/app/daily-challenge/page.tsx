"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { useMemo,useState } from "react";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { dailyQuestions,dailyScore } from "@/lib/dailyChallenge";
import { localDay } from "@/lib/learningActivity";
import { quizQuestions } from "@/data/quizzes";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeCard,PracticeButton } from "@/components/ui/PracticeSurface";
import { PageBanner } from "@/components/ui/PageBanner";
import { LearningArt } from "@/components/brand/LearningArt";
import { playCorrect,playWrong } from "@/lib/audio";
export default function DailyChallengePage(){
 const {ready}=useSessionProfile();const daily=useDailyChallenge();const complete=useProgress(s=>s.completeExercise);const addError=useErrors(s=>s.addError);
 const [day]=useState(localDay),[started,setStarted]=useState(false),[index,setIndex]=useState<number|null>(null);
 const questions=useMemo(()=>dailyQuestions(day,quizQuestions),[day]);const answers=daily.attempt?.day===day?daily.attempt.answers:[];
 const current=index??Math.min(answers.length,questions.length-1),q=questions[current],chosen=answers[current],answered=chosen!==undefined;
 const result=dailyScore(questions,answers),done=ready&&daily.completed&&daily.lastDate===day;
 function answer(choice:number){if(answered||!q)return;daily.saveAnswer(day,current,choice);if(choice===q.correct)playCorrect();else{playWrong();addError({question:q.question,userAnswer:q.options[choice],correctAnswer:q.options[q.correct],explanation:q.explain,source:"quiz",sourceId:q.id});}}
 function finish(){if(answers.length!==questions.length||done)return;complete(`daily:${day}`,result.xp);daily.setCompleted(result.score,result.total,result.xp,questions.map((q,i)=>({questionId:q.id,correct:answers[i]===q.correct})),day);}
 return (<PageWrapper><div className="camp-daily-page"><PageBanner><h1>Daily Challenge</h1><p>Five mixed questions. Finish once a day to earn your practice XP.</p></PageBanner><PracticeFrame topic="quiz"><PracticeCard>
 {!ready?<p role="status">Loading your challenge…</p>:done?<div className="camp-daily-summary"><LearningArt name="trophy" size={36}/><h2>Today’s challenge is complete</h2><p>{daily.score}/{daily.total} correct · {daily.xpEarned} XP earned</p><p>Your result is saved with your learning progress. Return tomorrow for a new challenge.</p></div>:!started?<div className="camp-daily-summary"><h2>{answers.length?"Continue your challenge":"Your daily practice"}</h2><p>{questions.length} questions · each correct answer earns its question reward plus 5 bonus XP.</p>{answers.length>0&&<p>{answers.length}/{questions.length} answers saved</p>}<PracticeButton className="camp-primary-action" onClick={()=>{setIndex(Math.min(answers.length,questions.length-1));setStarted(true);}}>{answers.length?"Continue challenge":"Start challenge"}</PracticeButton></div>:<>
 <header className="camp-quiz-status"><strong>Question {current+1}/{questions.length}</strong><span>{result.xp} XP so far</span></header><div className="camp-daily-progress" aria-label="Challenge progress">{questions.map((item,i)=><span key={item.id} data-done={answers[i]!==undefined}/>)}</div>
 <h2 className="camp-daily-question">{q.question}</h2><div className="camp-daily-options">{q.options.map((option,i)=><PracticeButton key={option} disabled={answered} data-outcome={answered?(i===q.correct?"correct":i===chosen?"incorrect":"other"):undefined} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{option}</PracticeButton>)}</div>
 {answered&&<div className="camp-daily-feedback" role="status"><strong>{chosen===q.correct?"Correct":"Review the answer"}</strong><p>{q.explain}</p><PracticeButton className="camp-primary-action" onClick={()=>{if(current===questions.length-1)finish();else setIndex(current+1);}}>{current===questions.length-1?"Finish challenge":"Next question"}</PracticeButton></div>}
 </>}
 </PracticeCard></PracticeFrame></div></PageWrapper>);
}
