"use client";
import { learnerStorage } from "@/lib/learnerStorage";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { Button } from "@/components/ui/shadcn/button";
import { useProgress } from "@/store/useProgress";
import { playCorrect } from "@/lib/audio";
import type { FlashcardData } from "@/data/flashcards";
interface Props {card:FlashcardData;cardId:string;onNext:()=>void;onPrev:()=>void;index:number;total:number;}
const SRS_INTERVALS:Record<string,number>={easy:7,medium:3,hard:1};
export function FlashCard({card,cardId,onNext,onPrev,index,total}:Props) {
  const [flipped,setFlipped]=useState(false),[rated,setRated]=useState(false);
  const {markCardSeen,getCardSeenCount}=useProgress();const seen=getCardSeenCount(cardId);
  useEffect(()=>{setFlipped(false);setRated(false);},[cardId]);
  function handleFlip(){if(!flipped)markCardSeen(cardId);setFlipped(f=>!f);}
  function handleRate(level:string){if(rated)return;setRated(true);const nextDate=new Date();nextDate.setDate(nextDate.getDate()+(SRS_INTERVALS[level]||1));try{learnerStorage.setItem(`srs-${cardId}`,JSON.stringify({level,nextDate:nextDate.toISOString()}));}catch{}playCorrect();setTimeout(()=>{setFlipped(false);setRated(false);onNext();},400);}
  return <div className="camp-flashcard-study">
    <div className="camp-flashcard-position"><span>{index+1} / {total}</span>{seen>0&&<span><RotateCcw size={13}/> Reviewed {seen} {seen===1?"time":"times"}</span>}</div>
    <section className="camp-flashcard-surface"><div className="camp-small-centered-art"><LearningArt name="book" size={32}/></div>
      <div className="camp-flashcard-word"><span>{card.article||card.cat}</span><h2>{card.de}</h2><SpeakerButton text={card.de}/></div>
      <Button variant="outline" className="camp-flashcard-reveal" onClick={handleFlip} aria-expanded={flipped}>{flipped?"Hide meaning":"Reveal meaning"}</Button>
      {flipped&&<div className="camp-flashcard-answer"><p>{card.en}</p>{card.ar&&card.ar.trim()!==card.en.trim()&&<p lang="ar" dir="rtl">{card.ar}</p>}{card.plural&&<p><strong>Plural:</strong> {card.plural}</p>}{card.example&&<div><h3>In a sentence</h3><p>{card.example.de}</p><p>{card.example.en}</p>{card.example.ar&&card.example.ar.trim()!==card.example.en.trim()&&<p lang="ar" dir="rtl">{card.example.ar}</p>}</div>}</div>}
    </section>
    {flipped&&!rated&&<div className="camp-flashcard-rating" aria-label="Choose a review interval">{["hard","medium","easy"].map(level=><Button key={level} variant="outline" onClick={()=>handleRate(level)}>{level[0].toUpperCase()+level.slice(1)}<small>{SRS_INTERVALS[level]} {SRS_INTERVALS[level]===1?"day":"days"}</small></Button>)}</div>}
    <div className="camp-flashcard-navigation"><Button variant="outline" onClick={onPrev} disabled={index===0} aria-label="Previous card"><ChevronLeft size={16}/></Button><span>{flipped?"Choose how soon to review, or move on.":"Think of the meaning before revealing it."}</span><Button variant="outline" onClick={onNext} disabled={index>=total-1} aria-label="Next card"><ChevronRight size={16}/></Button></div>
  </div>;
}
