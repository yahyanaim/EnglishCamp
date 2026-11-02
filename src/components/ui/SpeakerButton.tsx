"use client";
import { useEffect,useState } from "react";
import { Volume2,Square,Loader2 } from "lucide-react";
import { playNaturalText,stopNaturalSpeech,wordRecording,speechKey,type SpeechState } from "@/lib/naturalSpeech";
export function SpeakerButton({text,className=""}:{text:string;className?:string}){
  const [state,setState]=useState<SpeechState>("stopped");const busy=state==="loading"||state==="playing";
  useEffect(()=>()=>stopNaturalSpeech(wordRecording(text)||"speech:"+speechKey(text)),[text]);
  return <span className="camp-pronunciation-control"><button type="button" onClick={event=>{event.stopPropagation();if(busy){stopNaturalSpeech();return;}void playNaturalText(text,{onState:setState}).catch(()=>{});}} className={`camp-speaker-button ${className}`} title={busy?"Stop audio":"Hear pronunciation"} aria-label={busy?"Stop audio":"Play audio"} aria-busy={state==="loading"}>{state==="loading"?<Loader2 size={15} className="animate-spin"/>:state==="playing"?<Square size={14}/>:<Volume2 size={15}/>}</button>{state==="error"&&<small role="alert">Audio could not load. Try again.</small>}</span>;
}
