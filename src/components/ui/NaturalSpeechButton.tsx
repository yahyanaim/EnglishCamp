"use client";
import { useEffect, useState } from "react";
import { Volume2, Square, Loader2 } from "lucide-react";
import { Button } from "./shadcn/button";
import { playNaturalClip, stopNaturalSpeech, type SpeechState } from "@/lib/naturalSpeech";

export function NaturalSpeechButton({ src, label = "Listen", onBeforePlay }: { src: string; label?: string; onBeforePlay?: () => void }) {
  const [state, setState] = useState<SpeechState>("stopped");
  useEffect(() => () => { stopNaturalSpeech(src); }, [src]);
  return <span className="camp-speech-control"><Button variant="ghost" size="sm" aria-label={state === "playing" ? "Stop audio" : label} onClick={() => {
    if (state === "playing" || state === "loading") { stopNaturalSpeech(); return; }
    onBeforePlay?.(); void playNaturalClip(src, { onState: setState }).catch(() => {});
  }}>{state === "loading" ? <Loader2 size={15} className="animate-spin" /> : state === "playing" ? <Square size={14} /> : <Volume2 size={15} />}{state === "playing" ? "Stop" : label}</Button>{state === "error" && <small role="alert">Audio could not load. Try again.</small>}</span>;
}
