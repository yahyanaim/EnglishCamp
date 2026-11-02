"use client";
import { useState } from "react";
import Link from "next/link";
import { LearningArt } from "@/components/brand/LearningArt";
const steps=[
 {title:"Choose",icon:"location",copy:"Choose one small goal and a text or clip you can mostly understand.",task:"Start with a short shadowing lesson.",href:"/shadowing-english",link:"Find a short clip"},
 {title:"Notice",icon:"headphones",copy:"Listen or read once for meaning. Then notice one useful phrase, sound or pattern.",task:"Collect a few words in context rather than a long isolated list.",href:"/vocabulary",link:"Read and listen"},
 {title:"Try",icon:"mic",copy:"Use the language yourself: repeat a line, write a sentence or answer a practice question.",task:"Make one attempt before looking at the answer or model.",href:"/practice",link:"Open practice"},
 {title:"Return",icon:"review",copy:"Check the feedback and return to the difficult part on another day.",task:"A useful review asks you to recall the language before seeing it again.",href:"/review",link:"Review your learning"},
];
export function StudyJourney(){const [active,setActive]=useState(0);return <section className="camp-study-journey" aria-label="Your study journey"><header><h2>A small learning journey</h2><p>Select a stop to see what to do next.</p></header><ol className="camp-study-route">{steps.map((step,i)=><li key={step.title}><button type="button" aria-pressed={active===i} onClick={()=>setActive(i)}><span className="camp-study-stop"><LearningArt name={step.icon} size={24}/></span><span><small>0{i+1}</small><strong>{step.title}</strong></span></button></li>)}</ol><article className="camp-study-route-detail" aria-live="polite"><h3>{active+1}. {steps[active].title}</h3><p>{steps[active].copy}</p><p>{steps[active].task}</p><Link href={steps[active].href}>{steps[active].link} <span aria-hidden="true">↗</span></Link></article></section>;}
