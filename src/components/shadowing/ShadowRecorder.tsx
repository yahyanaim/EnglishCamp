"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Check, Download, Headphones, Lock, Mic, RotateCcw, Square } from "lucide-react";
import { createRecordingSession, type RecordingSession } from "@/lib/courseActivity";
import { setRecordingRisk } from "@/lib/activityState";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import {PronunciationFeedback} from '@/components/speaking/PronunciationFeedback';
import type {PronunciationReference} from '@/lib/pronunciationAssessment';

/** Recording is local; each optional upload needs a separate deliberate submission. */
export function ShadowRecorder({ lineId,reference,onTake,onBusy,maxSeconds=60,disabled=false,instruction="Repeat the sentence, then listen to your voice" }: { lineId: string;reference?:PronunciationReference;onTake?:(blob:Blob)=>void;onBusy?:(busy:boolean)=>void;maxSeconds?:number;disabled?:boolean;instruction?:string }) {
  const [phase, setPhase] = useState<"idle" | "requesting" | "recording">("idle");
  const [url, setUrl] = useState(""), [error, setError] = useState(""), [extension, setExtension] = useState("webm");
  const [blob,setBlob]=useState<Blob|null>(null),[played,setPlayed]=useState(false),[elapsed,setElapsed]=useState(0);
  const ticker=useRef<ReturnType<typeof setInterval>|null>(null);
  const session = useRef<RecordingSession | null>(null), objectUrl = useRef("");
  const deadline = useRef<ReturnType<typeof setTimeout> | null>(null), alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; if (ticker.current) clearInterval(ticker.current); session.current?.dispose(); if (deadline.current) clearTimeout(deadline.current); if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); setRecordingRisk(`shadow:${lineId}`, false); onBusy?.(false); };
  }, [lineId]);
  function releaseRisk() { if (deadline.current) clearTimeout(deadline.current); if (ticker.current) { clearInterval(ticker.current); ticker.current = null; } setRecordingRisk(`shadow:${lineId}`, false); }
  async function start() {
    setError(""); stopNaturalSpeech();
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setError("This browser cannot record audio. You can still repeat the line aloud."); return; }
    window.dispatchEvent(new Event("camp:natural-audio"));
    setPhase("requesting"); onBusy?.(true); setRecordingRisk(`shadow:${lineId}`, true);
    session.current = createRecordingSession(navigator.mediaDevices, MediaRecorder, {
      onStart() { if (!alive.current) return; setPhase("recording"); setElapsed(0); const began = Date.now(); ticker.current = setInterval(() => setElapsed(Math.min(maxSeconds, Math.floor((Date.now() - began) / 1000))), 250); deadline.current = setTimeout(() => session.current?.stop(), maxSeconds*1000); },
      onReady(blob) { releaseRisk(); if (!alive.current) return; if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); objectUrl.current = URL.createObjectURL(blob); setExtension(blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm"); setUrl(objectUrl.current); setBlob(blob); setPlayed(false); onTake?.(blob); onBusy?.(false); setPhase("idle"); },
      onError(message) { releaseRisk(); if (alive.current) { setError(message); setPhase("idle"); onBusy?.(false); } },
    });
    await session.current.start();
  }
  const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const steps: { label: string; state: "todo" | "current" | "done" }[] = [
    { label: "Record", state: url ? "done" : "current" },
    { label: "Listen back", state: !url ? "todo" : played ? "done" : "current" },
    ...(reference ? [{ label: "Check pronunciation", state: (url ? "current" : "todo") as "todo" | "current" }] : []),
  ];
  const title = phase === "requesting" ? "Waiting for microphone…" : phase === "recording" ? "Tap to stop" : url ? "Record again" : "Tap to record";
  const subtitle = phase === "recording" ? "Say the line now — we are listening" : url ? "Not happy? Record a new take" : instruction;
  return <section className="camp-rec" aria-label="Record your practice" data-phase={phase}>
    <ol className="camp-rec-steps">{steps.map((step, i) => <li key={step.label} data-state={step.state} aria-current={step.state === "current" ? "step" : undefined}><span aria-hidden="true">{step.state === "done" ? <Check size={13}/> : i + 1}</span>{step.label}</li>)}</ol>
    <div className="camp-rec-stage">
      <button type="button" className="camp-rec-button" data-phase={phase} disabled={phase === "requesting" || disabled} onClick={() => { if (phase === "recording") session.current?.stop(); else void start(); }}>
        <span className="camp-rec-mic" aria-hidden="true">{phase === "recording" ? <Square size={22}/> : url ? <RotateCcw size={24}/> : <Mic size={28}/>}</span>
        <span className="camp-rec-copy"><strong>{title}</strong><small>{subtitle}</small></span>
      </button>
      {phase === "recording" && <div className="camp-rec-timer"><span role="timer" aria-label={`Recording time ${elapsed} of ${maxSeconds} seconds`}>{time(elapsed)}<small> / {time(maxSeconds)}</small></span><span className="camp-rec-timer-bar" aria-hidden="true"><i style={{ width: `${(elapsed / maxSeconds) * 100}%` }}/></span></div>}
      {phase === "requesting" && <Button variant="ghost" size="sm" onClick={() => { session.current?.dispose(); releaseRisk(); setPhase("idle"); onBusy?.(false); }}>Cancel microphone request</Button>}
    </div>
    {error && <p role="alert" className="camp-rec-error">{error}</p>}
    {url && <div className="camp-rec-take"><p className="camp-rec-take-label"><Headphones size={16} aria-hidden="true"/>Your recording</p><audio controls src={url} aria-label="Your practice recording" onPlay={() => { setPlayed(true); stopNaturalSpeech(); window.dispatchEvent(new Event("camp:natural-audio")); }}/><a href={url} download={`shadowing-${lineId.replace(/:/g, "-")}.${extension}`}><Download size={14} aria-hidden="true"/>Download my recording</a></div>}
    <p className="camp-rec-note"><Lock size={13} aria-hidden="true"/>Recording stays on this device until you choose to send it for feedback. Download your replay before leaving.</p>
    {reference&&<PronunciationFeedback blob={blob} reference={reference}/>}
  </section>;
}
