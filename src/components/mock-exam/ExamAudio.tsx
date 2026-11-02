"use client";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { Button as ControlButton } from "@/components/ui/shadcn/button";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import manifest from "../../../public/media/mock-exams/v2/manifest.json";
import { primaryButton, smallClass } from "./ExamElements";

export type AudioAsset = { id: string; src: string; duration: number };
export const examAudioAssets = manifest as AudioAsset[];
export const examAudioSource = (id: string) =>
  examAudioAssets.find((item) => item.id === id)?.src;
export type PlaybackProgress = { completed: number; offset: number };

export function ExamAudio({
  id,
  plays = 1,
  progress,
  onProgress,
  review = false,
  onBusy,
}: {
  id: string;
  plays?: number;
  progress: PlaybackProgress;
  onProgress: (progress: PlaybackProgress) => void;
  review?: boolean;
  onBusy?: (busy: boolean) => void;
}) {
  const player = useRef<HTMLAudioElement>(null);
  const current = useRef({ progress, onProgress, review, plays });
  current.current = { progress, onProgress, review, plays };
  const alive = useRef(true);
  const [playing, setPlaying] = useState(false),
    [error, setError] = useState(""),
    [speed, setSpeed] = useState(1);
  const src = examAudioSource(id);
  const completed = progress.completed >= plays;
  useEffect(() => {
    alive.current = true;
    const el = player.current;
    return () => {
      alive.current = false;
      el?.pause();
    };
  }, [id]);
  async function play() {
    const el = player.current;
    if (!el || !src || (!review && completed)) return;
    setError("");
    if (!el.paused) {
      if (review) el.pause();
      return;
    }
    if (el.error) el.load();
    if (el.ended) el.currentTime = 0;
    el.playbackRate = review ? speed : 1;
    try {
      await el.play();
    } catch {
      if (alive.current)
        setError(
          "The recording could not start. Use Retry audio; your answers are retained.",
        );
    }
  }
  async function ended() {
    setPlaying(false);
    if (review) return;
    const next = {
      completed: current.current.progress.completed + 1,
      offset: 0,
    };
    current.current.progress = next;
    current.current.onProgress(next);
    if (next.completed < plays && player.current) {
      player.current.currentTime = 0;
      try {
        await player.current.play();
      } catch {
        if (alive.current)
          setError("The second playback could not start. Use Retry audio.");
      }
    }
  }
  return (
    <div className="space-y-4">
      <audio
        ref={player}
        src={src}
        preload="none"
        hidden
        onLoadedMetadata={() => {
          if (player.current && !review)
            player.current.currentTime = Math.min(
              progress.offset,
              Math.max(0, player.current.duration - 0.1),
            );
        }}
        onPlay={() => {
          setPlaying(true);
          onBusy?.(true);
        }}
        onPause={() => {
          setPlaying(false);
          onBusy?.(false);
        }}
        onEnded={ended}
        onError={() => {
          setPlaying(false);
          onBusy?.(false);
          setError(
            "The recording could not load. Check your connection and retry. No listening score is inferred from a failed playback.",
          );
        }}
        onTimeUpdate={() => {
          if (!review && player.current) {
            const offset = Math.floor(player.current.currentTime);
            if (offset !== Math.floor(current.current.progress.offset)) {
              const next = { ...current.current.progress, offset };
              current.current.progress = next;
              current.current.onProgress(next);
            }
          }
        }}
      />
      <div className="flex flex-wrap items-center gap-3">
        {review && (
          <SelectField
            aria-label="Review audio speed"
            value={speed}
            className="text-xs font-body bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-2.5 py-1.5 text-[var(--color-text-primary)]"
            onValueChange={value => {
              setSpeed(Number(value));
              if (player.current)
                player.current.playbackRate = Number(value);
            }}
          >
            <option value="0.8">0.8x Speed</option>
            <option value="0.9">0.9x Speed</option>
            <option value="1">1.0x Speed</option>
          </SelectField>
        )}
        <ControlButton variant="unstyled" size="unstyled"
          className={primaryButton}
          onClick={play}
          disabled={!src || (!review && (completed || playing))}
        >
          {playing && review ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {error
            ? "Retry audio"
            : playing
              ? review
                ? "Pause Audio Stream"
                : "Audio playing…"
              : completed && !review
                ? "Playback complete"
                : "Play Audio Stream"}
        </ControlButton>
        <span className={smallClass}>
          {review
            ? "Review · replay allowed"
            : `${progress.completed} / ${plays} playback${plays === 2 ? "s" : ""} complete · 1.0x exam speed`}
        </span>
      </div>
      <div className="h-2 w-full bg-[var(--color-surface-alt)] rounded-full overflow-hidden flex items-center">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          animate={{
            width: playing
              ? ["20%", "70%", "45%", "90%", "60%"]
              : completed
                ? "100%"
                : "0%",
          }}
          transition={{
            repeat: playing ? Infinity : 0,
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className={smallClass}>
        AI-generated neural audio ·{" "}
        {review
          ? "The original script is available below."
          : "Transcripts stay hidden until submission. Exam playback cannot be paused or slowed. Refreshing resumes the saved position."}
      </p>
      {(!src || error) && (
        <p role="alert" className="text-xs text-[var(--color-text-error)]">
          {error ||
            "This recording is not available yet. Your current answers remain saved."}
        </p>
      )}
    </div>
  );
}
