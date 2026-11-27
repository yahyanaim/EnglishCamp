"use client";
import {useEffect,useRef,useState} from 'react';
import {Button} from '@/components/ui/shadcn/button';
import {SpeakerButton} from '@/components/ui/SpeakerButton';
import {prepareSpeakingAudio} from '@/lib/speakingAudio';
import {audioBase64} from '@/lib/audioBase64';
import {PRONUNCIATION_CONSENT,pronunciationText,validPronunciationResult,type PronunciationReference,type PronunciationResult} from '@/lib/pronunciationAssessment';
export function PronunciationFeedback({blob,reference}:{blob:Blob|null;reference:PronunciationReference}){
 const [service,setService]=useState<'checking'|'ready'|'unavailable'>('checking'),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[result,setResult]=useState<PronunciationResult|null>(null),[error,setError]=useState('');
 const request=useRef<AbortController|null>(null),generation=useRef(0),text=pronunciationText(reference)||'';
 const [allowance,setAllowance]=useState<{limit:number;remaining:number}|null>(null);
 useEffect(()=>{const controller=new AbortController();fetch('/api/pronunciation',{signal:controller.signal,cache:'no-store'}).then(r=>r.json()).then(s=>{setService(s.available&&s.consentVersion===PRONUNCIATION_CONSENT?'ready':'unavailable');if(s.allowance)setAllowance(s.allowance);}).catch(()=>{if(!controller.signal.aborted)setService('unavailable');});return()=>{controller.abort();request.current?.abort();generation.current++;};},[]);
 useEffect(()=>{request.current?.abort();generation.current++;setResult(null);setConsent(false);setBusy(false);setError('');},[blob,text]);
 async function assess(){if(!blob||!consent||busy||service!=='ready')return;const current=++generation.current,controller=new AbortController();request.current=controller;setBusy(true);setError('');try{const {bytes,hash}=await prepareSpeakingAudio(blob);if(controller.signal.aborted||current!==generation.current)return;const response=await fetch('/api/pronunciation',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({reference,consent:PRONUNCIATION_CONSENT,audio:audioBase64(bytes),audioHash:hash})}),body=await response.json();if(body.allowance)setAllowance(body.allowance);if(!response.ok){if(response.status===429)setAllowance(a=>a?{...a,remaining:0}:a);throw new Error(body.error||'Pronunciation feedback could not finish.');}if(!validPronunciationResult(body.result,text)||body.result.audioHash!==hash)throw new Error('This feedback does not match your recording. Please try again.');if(current===generation.current)setResult(body.result);}catch(problem){if(current===generation.current)setError(controller.signal.aborted?'Assessment cancelled. Your recording is still available.':problem instanceof Error?problem.message:'Pronunciation feedback is unavailable.');}finally{if(current===generation.current){setBusy(false);setConsent(false);}}}
 const score=result?Math.round(result.score):0,band=score>=80?'Very clear':score>=60?'Mostly clear':'Keep practising';
 const hint=!blob?'Record yourself first (step 1), then come back here.':allowance?.remaining===0?'You have used today’s check. Come back tomorrow, or keep practising with the model voice.':!consent?'Tick the box above to allow sending this recording.':'';
 return <section className="camp-pronunciation-feedback camp-rec-feedback" aria-label="AI pronunciation feedback">
  <div className="camp-rec-feedback-head"><h2>Pronunciation feedback</h2>{allowance&&<p className="camp-ai-allowance" role="status" data-empty={allowance.remaining===0}>{allowance.remaining>0?`${allowance.remaining} of ${allowance.limit} pronunciation ${allowance.limit===1?'check':'checks'} left today`:'Daily pronunciation check used · back tomorrow'}</p>}</div>
  <p className="camp-rec-feedback-lead">Get a score for this line and see which sounds to practise.</p>
  {service==='checking'?<p role="status">Checking pronunciation service…</p>:service==='unavailable'?<p role="status">The pronunciation server is not connected yet. You can still record, replay and use the Microsoft model voice.</p>:!result?<>
   <label className="camp-ai-consent camp-rec-consent" data-disabled={!blob||busy}><input type="checkbox" checked={consent} disabled={!blob||busy} onChange={e=>setConsent(e.target.checked)}/><span><strong>Send this recording for a check</strong><small>Only this recording and the displayed line go to EnglishCamp’s OpenPronounce server. The recording is processed for feedback and is not saved in the lesson-notes database.</small></span></label>
   <div className="camp-ai-actions"><Button disabled={!blob||!consent||busy||allowance?.remaining===0} onClick={assess}>{busy?'Analysing your sounds…':'Check my pronunciation'}</Button>{busy&&<Button variant="outline" onClick={()=>request.current?.abort()}>Cancel</Button>}</div>
   {hint&&<p className="camp-rec-hint">{hint}</p>}
  </>:<div aria-live="polite">
   <div className="camp-pronunciation-score camp-rec-score" data-band={score>=80?'high':score>=60?'mid':'low'}><span className="camp-rec-ring" style={{['--score' as string]:String(score)}} aria-hidden="true"><b>{score}</b></span><div><strong>{score}<small>/100</small></strong><span>Pronunciation practice score · {band}</span></div></div>
   {result.errors.length?<><h4>Sounds to review</h4><ul className="camp-pronunciation-words">{result.errors.map((e,i)=><li key={i}><div><strong>{e.word}</strong><SpeakerButton text={e.word}/></div><p dir="ltr">Reference: /{e.expected}/<br/>Detected: {e.actual?`/${e.actual}/`:'Not detected clearly'}</p><details><summary>Sound details</summary>{e.phones.filter(p=>p.confidence>0).map((p,k)=><p dir="ltr" key={k}>/{p.expected}/ → {p.heard.length?`/${p.heard.join(' ')}/`:'not detected'}</p>)}</details></li>)}</ul></>:<p>No word-level flags in this take. Replay it and compare the rhythm with the model.</p>}
   <details><summary>What the recogniser heard</summary><p>{result.transcript||'No clear transcript was detected.'}</p></details>
   <p className="camp-ai-fine">Automated sound detection can make mistakes, especially with noise and strong accents. Use the feedback to practise, not as an official exam or CEFR score.</p>
  </div>}
  {error&&<p role="alert" className="camp-ai-error">{error}</p>}
  <details className="camp-rec-about"><summary>About this score</summary><p>OpenPronounce compares the words and sounds in your recording with the selected line. This practice score does not assess a whole speaking level.</p></details>
 </section>;
}
