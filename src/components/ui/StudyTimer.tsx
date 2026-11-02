"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
const POMODORO = 25 * 60;
const BREAK = 5 * 60;

export function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(POMODORO);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setRunning(false);
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(BREAK);
      } else {
        setMode("focus");
        setTimeLeft(POMODORO);
      }
    }
  }, [timeLeft, mode]);

  function toggle() {
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    setTimeLeft(mode === "focus" ? POMODORO : BREAK);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const pct = mode === "focus"
    ? (timeLeft / POMODORO) * 100
    : (timeLeft / BREAK) * 100;

  const accentColor = mode === "focus" ? "var(--color-primary)" : "var(--color-info)";
  const accentDark = mode === "focus" ? "var(--color-text-link)" : "var(--color-text-info)";
  const accentBg = mode === "focus" ? "var(--color-primary-subtle)" : "var(--color-info-bg)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "var(--shadow-1)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LearningArt name="Timer" size={16} className="w-4 h-4" />
          <span className="font-display font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>Study Timer</span>
        </div>
        <span
          className="font-body font-semibold text-xs px-2.5 py-1 rounded-[var(--radius-pill)]"
          style={{
            backgroundColor: accentBg,
            color: accentDark,
          }}
        >
          {mode === "focus" ? "Focus" : "Break"}
        </span>
      </div>

      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-3">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-neutral-100)" strokeWidth="2.5" />
            <circle
              cx="18" cy="18" r="15.5" fill="none"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute font-display font-extrabold tabular-nums" style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150"
            style={{
              backgroundColor: accentBg,
              color: accentDark,
            }}
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150"
            style={{
              backgroundColor: "var(--color-neutral-50)",
              color: "var(--color-text-secondary)",
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
