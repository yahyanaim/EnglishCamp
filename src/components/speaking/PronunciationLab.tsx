"use client";
import {useState} from 'react';
import {PRONUNCIATION_LINES} from '@/lib/pronunciationAssessment';
import {ShadowRecorder} from '@/components/shadowing/ShadowRecorder';
import {SpeakerButton} from '@/components/ui/SpeakerButton';

const STEPS=[['1','Listen','Play the model voice'],['2','Record','Say the line out loud'],['3','Compare','Replay and get feedback']] as const;

export function PronunciationLab(){
 const [id,setId]=useState<string>(PRONUNCIATION_LINES[0].id),line=PRONUNCIATION_LINES.find(l=>l.id===id)!,index=PRONUNCIATION_LINES.findIndex(l=>l.id===id);
 return <section className="camp-pronunciation-lab">
  <div className="camp-pronunciation-lab-heading"><div><span className="camp-pron-eyebrow">Speaking studio</span><h2>Read, record and compare</h2><p>Pick a situation, listen to the model, then record your own voice.</p></div><span className="camp-pron-counter">{index+1} / {PRONUNCIATION_LINES.length}</span></div>
  <div className="camp-pron-situations" role="radiogroup" aria-label="Choose a pronunciation situation">{PRONUNCIATION_LINES.map(p=><button type="button" role="radio" aria-checked={p.id===id} key={p.id} onClick={()=>setId(p.id)}>{p.title}</button>)}</div>
  <div className="camp-pron-stage"><small>{line.title}</small><blockquote>{line.text}</blockquote><div className="camp-pron-listen"><SpeakerButton text={line.text}/><span>Listen to the model</span></div></div>
  <ol className="camp-pron-steps">{STEPS.map(([n,t,d])=><li key={n}><span>{n}</span><div><strong>{t}</strong><small>{d}</small></div></li>)}</ol>
  <ShadowRecorder key={id} lineId={'pronunciation:'+id} maxSeconds={30} reference={{kind:'practice',id}}/>
 </section>;
}
