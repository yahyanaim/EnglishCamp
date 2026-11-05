import type { QuizQuestion } from "@/data/types";
export function dailyQuestions(day: string, bank: QuizQuestion[]) {
  const valid=bank.filter(q=>q.options.length>1&&q.options.every(o=>o.trim())&&new Set(q.options.map(o=>o.trim().toLowerCase())).size===q.options.length&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
  let seed=day.split("").reduce((n,c)=>Math.imul(n,31)+c.charCodeAt(0),17)>>>0;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const copy=[...valid];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy.slice(0,5);
}
export function dailyScore(questions: QuizQuestion[], answers: number[]) {
  let score=0,xp=0;questions.forEach((q,index)=>{if(answers[index]===q.correct){score++;xp+=q.xpReward+5;}});
  return {score,xp,total:questions.length};
}
