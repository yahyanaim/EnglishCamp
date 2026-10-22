"use client";
import { useState } from "react";
import { speak } from "@/lib/audio";
import { Volume2 } from "lucide-react";

export function SpeakerButton({ text, className = "" }: { text: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (playing) return;
    setPlaying(true);
    speak(text);
    setTimeout(() => setPlaying(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] transition-all duration-200 ${
        playing
          ? "bg-[var(--color-primary)] text-[var(--color-primary-dark)] scale-110"
          : "text-[var(--color-text-disabled)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)]"
      } ${className}`}
      title="Hear pronunciation"
      aria-label="Play audio"
    >
      <Volume2 className={`w-3.5 h-3.5 ${playing ? "animate-pulse" : ""}`} />
    </button>
  );
}
