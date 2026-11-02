"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Mic, Square } from "lucide-react";
import { createRecordingSession, type RecordingSession } from "@/lib/courseActivity";
import { setRecordingRisk } from "@/lib/activityState";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";

/** Deliberate local recording, never automatic capture or an uploaded pronunciation score. */
export function ShadowRecorder({ lineId }: { lineId: string }) {
  const [phase, setPhase] = useState<"idle" | "requesting" | "recording">("idle");
  const [url, setUrl] = useState(""), [error, setError] = useState(""), [extension, setExtension] = useState("webm");
  const session = useRef<RecordingSession | null>(null), objectUrl = useRef("");
  const deadline = useRef<ReturnType<typeof setTimeout> | null>(null), alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; session.current?.dispose(); if (deadline.current) clearTimeout(deadline.current); if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); setRecordingRisk(`shadow:${lineId}`, false); };
  }, [lineId]);
  function releaseRisk() { if (deadline.current) clearTimeout(deadline.current); setRecordingRisk(`shadow:${lineId}`, false); }
  async function start() {
    setError(""); stopNaturalSpeech();
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setError("This browser cannot record audio. You can still repeat the line aloud."); return; }
    window.dispatchEvent(new Event("camp:natural-audio"));
    setPhase("requesting"); setRecordingRisk(`shadow:${lineId}`, true);
    session.current = createRecordingSession(navigator.mediaDevices, MediaRecorder, {
      onStart() { if (!alive.current) return; setPhase("recording"); deadline.current = setTimeout(() => session.current?.stop(), 60000); },
      onReady(blob) { releaseRisk(); if (!alive.current) return; if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); objectUrl.current = URL.createObjectURL(blob); setExtension(blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm"); setUrl(objectUrl.current); setPhase("idle"); },
      onError(message) { releaseRisk(); if (alive.current) { setError(message); setPhase("idle"); } },
    });
    await session.current.start();
  }
  return <section className="camp-shadow-recorder" aria-label="Record your practice"><button type="button" className="camp-shadow-record-bar" disabled={phase === "requesting"} onClick={() => { if (phase === "recording") session.current?.stop(); else void start(); }}><span className="camp-shadow-record-symbol">{phase === "recording" ? <Square size={19}/> : <Mic size={24}/>}</span><span><strong>{phase === "requesting" ? "Waiting for microphone…" : phase === "recording" ? "Tap to stop recording" : url ? "Tap to record again" : "Tap to record"}</strong><small>{phase === "recording" ? "Recording your voice · up to 60 seconds" : "Repeat the sentence, then listen to your voice"}</small></span><span className="camp-shadow-local-label">Local only</span></button>{phase === "requesting" && <Button variant="ghost" onClick={() => { session.current?.dispose(); releaseRisk(); setPhase("idle"); }}>Cancel microphone request</Button>}{error && <p role="alert">{error}</p>}{url && <div className="camp-shadow-take"><audio controls src={url} aria-label="Your shadowing recording" onPlay={() => { stopNaturalSpeech(); window.dispatchEvent(new Event("camp:natural-audio")); }}/><a href={url} download={`shadowing-${lineId.replace(/:/g, "-")}.${extension}`}>Download my recording</a></div>}<p className="camp-shadow-recording-note">Not uploaded. Download your replay before changing lines or leaving.</p></section>;
}
