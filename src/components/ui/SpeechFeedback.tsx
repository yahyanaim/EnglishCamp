"use client";
import { useEffect,useRef,useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./shadcn/button";
import { LearningArt } from "@/components/brand/LearningArt";
type Consent={text:string;resolve:(value:boolean)=>void};
export function SpeechFeedback(){const [pending,setPending]=useState<Consent|null>(null),[error,setError]=useState(false);const current=useRef<Consent|null>(null);
  const close=(approved=false)=>{current.current?.resolve(approved);current.current=null;setPending(null);};
  useEffect(()=>{const ask=(event:Event)=>{current.current?.resolve(false);const value=(event as CustomEvent<Consent>).detail;current.current=value;setPending(value);};const cancel=()=>{current.current?.resolve(false);current.current=null;setPending(null);};const failed=()=>setError(true);window.addEventListener('camp:speech-consent',ask);window.addEventListener('camp:speech-cancel',cancel);window.addEventListener('camp:speech-error',failed);return()=>{cancel();window.removeEventListener('camp:speech-consent',ask);window.removeEventListener('camp:speech-cancel',cancel);window.removeEventListener('camp:speech-error',failed);};},[]);
  return <><Modal open={!!pending} onClose={()=>close()} title="Hear your own text"><div className="camp-speech-consent"><LearningArt name="headphones" size={28}/><p>This text is from your personal vocabulary. Generate its pronunciation with Microsoft?</p><blockquote>{pending?.text}</blockquote><p>Only the displayed text is sent. Notes, answers and microphone recordings are not included. Audio is cached locally.</p><div><Button variant="outline" onClick={()=>close()}>Cancel</Button><Button onClick={()=>close(true)}>Generate pronunciation</Button></div></div></Modal>{error&&<div className="camp-speech-notice" role="alert"><span>Natural audio could not load. Please try again.</span><Button variant="ghost" size="sm" onClick={()=>setError(false)}>Dismiss</Button></div>}</>;
}
