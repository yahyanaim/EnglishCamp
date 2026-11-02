"use client";
import { Input } from "@/components/ui/shadcn/input";
import {
  Button as ControlButton,
  buttonVariants,
} from "@/components/ui/shadcn/button";
import Image from "next/image";
import { Flag } from "lucide-react";
import { lessonImageAssets } from "@/data/lesson-images/assets";
import type { ExamQuestion, ExamVisual } from "@/data/mock-exams/types";

// Reuse the existing mock page's typography, surface, border, radius and button classes.
export const card =
  "bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 sm:p-5 space-y-3";
export const field =
  "w-full bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3.5 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-all font-body";
export const primaryButton = buttonVariants({
  variant: "unstyled",
  size: "sm",
  className:
    "bg-[var(--camp-purple)] text-white text-xs font-semibold shadow-[var(--shadow-1)] hover:bg-[var(--camp-purple-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
});
export const secondaryButton = buttonVariants({
  variant: "outline",
  size: "sm",
  className:
    "text-[var(--color-text-primary)] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed",
});
export const titleClass =
  "font-display text-lg font-extrabold text-[var(--color-text-primary)]";
export const smallClass =
  "font-body text-xs text-[var(--color-text-secondary)] leading-relaxed";
export const clockText = (n: number) =>
  `${Math.floor(Math.max(0, n) / 60)}:${String(Math.max(0, n) % 60).padStart(2, "0")}`;

export function StimulusVisual({ visual }: { visual: ExamVisual }) {
  const pair =
    visual.src === "pair-a"
      ? ["chess", "dance"]
      : visual.src === "pair-b"
        ? ["picnic", "walking"]
        : null;
  if (pair)
    return (
      <figure className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          {pair.map((key, i) => {
            const item = lessonImageAssets[key];
            return (
              <div key={key} className="space-y-2">
                <p className={smallClass}>Photograph {i + 1}</p>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto rounded-[var(--radius-md)]"
                />
                <a
                  href={item.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[var(--color-text-link)] underline"
                  aria-label={`View photograph ${i + 1} full size`}
                >
                  View full size
                </a>
              </div>
            );
          })}
        </div>
        <figcaption className={smallClass}>
          <details>
            <summary className="cursor-pointer">Photograph credits</summary>
            {pair.map((key) => {
              const item = lessonImageAssets[key];
              return (
                <p key={key}>
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {item.title}
                  </a>{" "}
                  · {item.creator} ·{" "}
                  <a
                    href={item.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {item.license}
                  </a>
                  . Image content unchanged.
                </p>
              );
            })}
          </details>
        </figcaption>
      </figure>
    );
  return (
    <figure className="bg-white dark:bg-slate-900 border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 sm:p-5 space-y-3">
      <Image
        src={visual.src}
        alt={visual.alt}
        width={660}
        height={visual.src.includes("plan") ? 475 : 390}
        className="w-full h-auto"
        unoptimized
      />
      {visual.caption && (
        <figcaption className={smallClass}>{visual.caption}</figcaption>
      )}
    </figure>
  );
}

export function QuestionCard({
  question: q,
  answer,
  onChange,
  flagged,
  onFlag,
}: {
  question: ExamQuestion;
  answer: string;
  onChange: (value: string) => void;
  flagged: boolean;
  onFlag: () => void;
}) {
  // Sentence-builder responses are stored as text for scoring; chunks are selected by index to support repeated words.
  const chosen =
    q.kind === "sentence-build" && answer
      ? (() => {
          const remaining = answer.split(" ");
          const used: number[] = [];
          while (remaining.length) {
            const index =
              q.chunks?.findIndex(
                (chunk, i) =>
                  !used.includes(i) &&
                  remaining
                    .slice(0, chunk.split(" ").length)
                    .join(" ")
                    .toLowerCase() === chunk.toLowerCase(),
              ) ?? -1;
            if (index < 0) break;
            used.push(index);
            remaining.splice(0, q.chunks![index].split(" ").length);
          }
          return used;
        })()
      : [];
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] flex items-center justify-center font-display font-extrabold text-xs">
            {q.number}
          </span>
          <span className="font-display text-xs font-bold text-[var(--color-text-secondary)] uppercase">
            {q.kind.replace(/-/g, " ")}
          </span>
        </div>
        <ControlButton
          variant="unstyled"
          size="unstyled"
          aria-label={`Flag question ${q.number}`}
          aria-pressed={flagged}
          onClick={onFlag}
          className={`text-xs font-body flex items-center gap-1 ${flagged ? "text-[var(--color-text-warning)] font-bold" : "text-[var(--color-text-secondary)]"}`}
        >
          <Flag className="w-3.5 h-3.5" />
          {flagged ? "Flagged" : "Flag"}
        </ControlButton>
      </div>
      <p
        id={`prompt-${q.id}`}
        className="font-body text-sm font-semibold text-[var(--color-text-primary)] whitespace-pre-line"
      >
        {q.prompt}
      </p>
      {q.kind === "sentence-build" ? (
        <div className="space-y-3">
          <div
            className="flex flex-wrap gap-2"
            aria-label={`Available chunks for question ${q.number}`}
          >
            {q.chunks?.map((chunk, i) => (
              <ControlButton
                variant="unstyled"
                size="unstyled"
                key={i}
                disabled={chosen.includes(i)}
                className={secondaryButton}
                onClick={() =>
                  onChange(
                    [...chosen, i].map((index) => q.chunks![index]).join(" "),
                  )
                }
              >
                {chunk}
              </ControlButton>
            ))}
          </div>
          <p className={field} aria-live="polite">
            {answer || "Select the chunks in order…"}
          </p>
          <div className="flex flex-wrap gap-2">
            <ControlButton
              variant="unstyled"
              size="unstyled"
              className={secondaryButton}
              disabled={!chosen.length}
              onClick={() =>
                onChange(
                  chosen
                    .slice(0, -1)
                    .map((index) => q.chunks![index])
                    .join(" "),
                )
              }
            >
              Undo last chunk
            </ControlButton>
            <ControlButton
              variant="unstyled"
              size="unstyled"
              className={secondaryButton}
              disabled={!answer}
              onClick={() => onChange("")}
            >
              Clear sentence
            </ControlButton>
          </div>
        </div>
      ) : q.options ? (
        <div className="space-y-2 pt-1">
          {q.options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-[var(--radius-md)] border cursor-pointer text-xs font-body transition-all ${answer === opt ? "bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 text-blue-900 dark:text-blue-100 font-bold" : "border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"}`}
            >
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={answer === opt}
                onChange={() => onChange(opt)}
                className="accent-blue-600"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      ) : (
        <label className="block space-y-2">
          <span className={smallClass}>
            {q.kind === "word-ending"
              ? `${q.prefix}… · Enter missing letters only`
              : "Your answer"}
          </span>
          <Input
            autoComplete="off"
            spellCheck={false}
            aria-labelledby={`prompt-${q.id}`}
            value={answer}
            onChange={(e) => onChange(e.target.value)}
            className={field}
          />
        </label>
      )}
    </div>
  );
}
