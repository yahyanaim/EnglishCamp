"use client";
import { learnerStorage } from "@/lib/learnerStorage";
import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { PageBanner } from "@/components/ui/PageBanner";

import { Card } from "@/components/ui/shadcn/card";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button as ControlButton } from "@/components/ui/shadcn/button";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Mic,
  PenTool,
  Sparkles,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PAPERS } from "@/data/mock-exams";
import type {
  Certification,
  ExamPaper,
  ExamSkill,
} from "@/data/mock-exams/types";
import {
  advanceAttempt,
  attemptStorageKey,
  availableSections,
  freshAttempt,
  historyStorageKey,
  recordingKey,
  restoreExam,
  type ExamAttempt,
} from "@/lib/mockExam";
import {
  card,
  clockText,
  field,
  primaryButton,
  QuestionCard,
  secondaryButton,
  smallClass,
  StimulusVisual,
  titleClass,
} from "@/components/mock-exam/ExamElements";
import { ExamAudio } from "@/components/mock-exam/ExamAudio";
import {
  ExamRecorder,
  type ExamRecorderHandle,
} from "@/components/mock-exam/ExamRecorder";
import { downloadAttempt, ExamReview } from "@/components/mock-exam/ExamReview";

const MotionCard = motion.create(Card);

const skillIcons = {
  reading: BookOpen,
  listening: Headphones,
  writing: PenTool,
  speaking: Mic,
};
const skillLabel = (skill: ExamSkill, paper: ExamPaper) =>
  skill === "reading" && paper.id === "b2-first"
    ? "Reading & Use of English"
    : skill[0].toUpperCase() + skill.slice(1);
const examIds = Object.keys(MOCK_PAPERS) as Certification[];

function MockExamContent() {
  const params = useSearchParams();
  const [selected, setSelected] = useState<Certification>("ielts-academic");
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [saved, setSaved] = useState<
    Partial<Record<Certification, ExamAttempt>>
  >({});
  const [history, setHistory] = useState<ExamAttempt[]>([]);
  const [reviewingHistory, setReviewingHistory] = useState(false);
  const [pending, setPending] = useState<
    "section" | "finish" | Certification | null
  >(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(Date.now()),
    [storageError, setStorageError] = useState(""),
    [busy, setBusy] = useState(false),
    [audioBusy, setAudioBusy] = useState(false),
    [transitioning, setTransitioning] = useState(false);
  const recorder = useRef<ExamRecorderHandle>(null),
    current = useRef(attempt),
    transitionLock = useRef(false);
  current.current = attempt;
  const paper = MOCK_PAPERS[attempt?.certification || selected];
  const skill = attempt ? paper.order[attempt.skillIndex] : paper.order[0];
  const [ready, setReady] = useState(false);
  const runningId =
    attempt && !attempt.finishedAt && !reviewingHistory ? attempt.id : null;
  useEffect(() => {
    if (pending) confirmationRef.current?.focus();
  }, [pending]);
  useEffect(() => {
    const restored: Partial<Record<Certification, ExamAttempt>> = {};
    try {
      for (const id of examIds) {
        const value = restoreExam(
          MOCK_PAPERS[id],
          learnerStorage.getItem(attemptStorageKey(MOCK_PAPERS[id])),
        );
        if (value) restored[id] = value;
      }
      const old = JSON.parse(learnerStorage.getItem(historyStorageKey) || "[]");
      if (Array.isArray(old))
        setHistory(
          old.flatMap((value) => {
            const p = MOCK_PAPERS[value?.certification as Certification];
            const valid = p && restoreExam(p, JSON.stringify(value));
            return valid ? [valid] : [];
          }),
        );
      setSaved(restored);
    } catch {
      setStorageError(
        "Browser storage is unavailable. You can work in this tab, but download your responses before leaving.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    const id = params.get("exam") as Certification;
    if (MOCK_PAPERS[id] && !current.current) setSelected(id);
  }, [params]);
  useEffect(() => {
    if (!attempt || reviewingHistory) return;
    try {
      learnerStorage.setItem(attemptStorageKey(paper), JSON.stringify(attempt));
      setStorageError("");
    } catch {
      setStorageError(
        "Your latest changes could not be saved in browser storage. Download your responses before leaving this page.",
      );
    }
  }, [attempt, paper, reviewingHistory]);
  const update = useCallback((fn: (state: ExamAttempt) => ExamAttempt) => {
    const old = current.current;
    if (!old) return;
    const next = fn(old);
    current.current = next;
    setAttempt(next);
    setNow(Date.now());
  }, []);
  const advance = useCallback(async (expired = false, finish = false) => {
    const state = current.current;
    if (!state || state.finishedAt || transitionLock.current) return;
    transitionLock.current = true;
    setTransitioning(true);
    setPending(null);
    try {
      if (recorder.current && !(await recorder.current.finish())) {
        setStorageError(
          "Save or download the current recording before continuing.",
        );
        return;
      }
      // A successful recorder save may update the attempt while we await its final data.
      const latest = current.current || state;
      const next = finish
        ? { ...latest, finishedAt: Date.now(), deadline: Date.now() }
        : advanceAttempt(
            MOCK_PAPERS[latest.certification],
            latest,
            expired ? latest.deadline : Date.now(),
          );
      current.current = next;
      setAttempt(next);
      setNow(Date.now());
      setAudioBusy(false);
      setBusy(false);
      if (next.finishedAt) {
        try {
          const previous = JSON.parse(
            learnerStorage.getItem(historyStorageKey) || "[]",
          );
          const entries = Array.isArray(previous) ? previous : [];
          const list = [
            ...entries.filter((item: ExamAttempt) => item?.id !== next.id),
            next,
          ];
          learnerStorage.setItem(historyStorageKey, JSON.stringify(list));
          setHistory(
            list.flatMap((item) => {
              const p = MOCK_PAPERS[item?.certification as Certification];
              const valid = p && restoreExam(p, JSON.stringify(item));
              return valid ? [valid] : [];
            }),
          );
        } catch {
          setStorageError(
            "The submitted response is still in this tab, but history could not be saved. Download your responses now.",
          );
        }
      }
    } finally {
      transitionLock.current = false;
      setTransitioning(false);
    }
  }, []);
  useEffect(() => {
    if (!runningId) return;
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, [runningId]);
  useEffect(() => {
    if (
      attempt &&
      !reviewingHistory &&
      !attempt.finishedAt &&
      now >= attempt.deadline &&
      !transitioning
    )
      void advance(true);
  }, [now, attempt, reviewingHistory, transitioning, advance]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (busy || storageError) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy, storageError]);
  function start(id: Certification, resume = false) {
    setPending(null);
    if (!resume && saved[id] && !saved[id]!.finishedAt) {
      // Archive the unfinished version before replacing the active slot.
      try {
        const previous = JSON.parse(
          learnerStorage.getItem(historyStorageKey) || "[]",
        );
        const list = Array.isArray(previous) ? previous : [];
        const archived = [
          ...list.filter((item: ExamAttempt) => item?.id !== saved[id]!.id),
          saved[id]!,
        ];
        learnerStorage.setItem(historyStorageKey, JSON.stringify(archived));
        setHistory(
          archived.flatMap((value) => {
            const p = MOCK_PAPERS[value?.certification as Certification];
            const valid = p && restoreExam(p, JSON.stringify(value));
            return valid ? [valid] : [];
          }),
        );
      } catch {
        setStorageError(
          "The unfinished attempt could not be archived. Resume it and download your responses before replacing it.",
        );
        return;
      }
    }
    setSelected(id);
    setReviewingHistory(false);
    setAudioBusy(false);
    setBusy(false);
    const startTime = Date.now();
    setNow(startTime);
    const state = resume ? saved[id] : undefined;
    const next = state || freshAttempt(MOCK_PAPERS[id], startTime);
    current.current = next;
    setAttempt(next);
    // Timers use wall-clock deadlines. An interruption never grants extra exam time.
  }
  function returnToSelection() {
    setPending(null);
    if (current.current && !reviewingHistory)
      setSaved((previous) => ({
        ...previous,
        [current.current!.certification]: current.current!,
      }));
    current.current = null;
    setAttempt(null);
    setReviewingHistory(false);
    setBusy(false);
    setAudioBusy(false);
  }
  function answer(id: string, value: string) {
    update((s) => ({ ...s, answers: { ...s.answers, [id]: value } }));
  }
  function flag(id: string) {
    update((s) => ({ ...s, flags: { ...s.flags, [id]: !s.flags[id] } }));
  }
  function commit() {
    setPending("section");
  }
  function submitEarly() {
    setPending("finish");
  }
  const confirmation = pending && (
    <div
      ref={confirmationRef}
      tabIndex={-1}
      role="alertdialog"
      aria-labelledby="submission-title"
      className={card}
    >
      <h2 id="submission-title" className={titleClass}>
        {pending === "section"
          ? "Submit this section or module?"
          : pending === "finish"
            ? "Submit the paper now?"
            : "Start a new attempt?"}
      </h2>
      <p className={smallClass}>
        {pending === "section"
          ? "You cannot return to a submitted section. Unanswered questions remain blank."
          : pending === "finish"
            ? "Your current responses and recordings will be retained. Unanswered tasks stay unassessed."
            : "Your unfinished responses will remain in previous attempts. Their original deadlines keep running."}
      </p>
      <div className="flex flex-wrap gap-3">
        <ControlButton variant="unstyled" size="unstyled"
          className={primaryButton}
          disabled={transitioning}
          onClick={() => {
            if (pending === "section") void advance();
            else if (pending === "finish") void advance(false, true);
            else start(pending);
          }}
        >
          {pending === "section" || pending === "finish"
            ? "Confirm submission"
            : "Confirm new attempt"}
        </ControlButton>
        <ControlButton variant="unstyled" size="unstyled" className={secondaryButton} onClick={() => setPending(null)}>
          Keep working
        </ControlButton>
      </div>
    </div>
  );
  if (!attempt)
    return (
      <PageWrapper>
        <div className="max-w-5xl mx-auto space-y-5">
          <PageBanner>
            <div className="relative z-10 max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius-sm)] bg-white/10 text-xs font-display font-bold tracking-wider uppercase text-blue-200">
                <LearningArt name="Sparkles" className="w-3.5 h-3.5" /> Examination practice centre
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Authentic English Exam Simulations
              </h1>
              <p className="text-blue-100/90 text-sm leading-relaxed">
                Full practice papers for IELTS Academic, IELTS General Training,
                TOEFL iBT® 2026 and Cambridge B2 First. Original questions,
                natural recorded audio, section timing and local speaking
                capture. Assessment limits are clearly reported.
              </p>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          </PageBanner>
          {confirmation}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              Choose Your Examination Track
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {examIds.map((id) => {
                const p = MOCK_PAPERS[id];
                return (
                  <MotionCard
                    key={id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelected(id)}
                    className={`bg-[var(--color-surface)] border rounded-[var(--radius-lg)] p-4 cursor-pointer flex flex-col justify-between transition-all ${selected === id ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20 shadow-[var(--shadow-1)]" : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={id === "ielts-general" ? "success" : "info"}
                        >
                          {id === "toefl-ibt"
                            ? "2026 format"
                            : id === "b2-first"
                              ? "Adult B2 First"
                              : id === "ielts-general"
                                ? "Immigration & Work"
                                : "University & Medical"}
                        </Badge>
                        <span className="font-display text-xs font-bold text-[var(--color-text-secondary)]">
                          Form {p.form}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                        {p.title}
                      </h3>
                      <p className={smallClass}>{p.description}</p>
                      <ul className="space-y-1.5 pt-2 text-xs font-body text-[var(--color-text-primary)]">
                        {p.order.map((key) => {
                          const Icon = skillIcons[key];
                          return (
                            <li className="flex items-center gap-2" key={key}>
                              <LearningArt name={Icon.displayName || "book"} className={`w-3.5 h-3.5 ${key === "listening" ? "text-blue-500" : key === "reading" ? "text-emerald-500" : key === "writing" ? "text-purple-500" : "text-rose-500"}`} />
                              {skillLabel(key, p)} ·{" "}
                              {Math.round(p.seconds[key] / 60)} min
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[var(--color-border-default)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <LearningArt name="Clock" size={14} className="w-3.5 h-3.5" />
                        {id === "toefl-ibt"
                          ? "90 min timed work + directions"
                          : `${Math.round(Object.values(p.seconds).reduce((a, b) => a + b, 0) / 60)} min`}
                      </div>
                      <ControlButton variant="unstyled" size="unstyled"
                        disabled={!ready}
                        onClick={() => start(id, !!saved[id])}
                        className={
                          id === "ielts-general"
                            ? primaryButton
                                .replace(
                                  "bg-[var(--color-primary)]",
                                  "bg-emerald-600",
                                )
                                .replace(
                                  "hover:bg-[var(--color-primary-hover)]",
                                  "hover:bg-emerald-700",
                                )

                            : id === "toefl-ibt"
                              ? primaryButton
                                  .replace(
                                    "bg-[var(--color-primary)]",
                                    "bg-purple-600",
                                  )
                                  .replace(
                                    "hover:bg-[var(--color-primary-hover)]",
                                    "hover:bg-purple-700",
                                  )
                                  .replace("text-[var(--color-on-brand)]", "text-white")
                              : primaryButton
                        }
                      >
                        {saved[id]
                          ? saved[id]!.finishedAt
                            ? "View saved report"
                            : "Resume exam"
                          : "Start Exam"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </ControlButton>
                      {saved[id] && (
                        <ControlButton variant="unstyled" size="unstyled"
                          disabled={!ready}
                          className={secondaryButton}
                          onClick={() => {
                            if (saved[id]!.finishedAt) start(id);
                            else setPending(id);
                          }}
                        >
                          New attempt
                        </ControlButton>
                      )}
                    </div>
                  </MotionCard>
                );
              })}
            </div>
          </div>
          <div className={card}>
            <h3 className="font-display text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[var(--camp-control-ink)]" />
              Test conditions and assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body text-[var(--color-text-secondary)]">
              <p>
                <strong>Listening:</strong> fixed natural recordings, hidden
                transcripts and exam playback limits. B2 extracts play twice;
                IELTS and TOEFL stimuli play once.
              </p>
              <p>
                <strong>Timing:</strong> separate section/module clocks and
                committed navigation. Leaving the page does not pause the
                deadline.
              </p>
              <p>
                <strong>Writing and speaking:</strong> written responses and
                actual microphone recordings are retained locally. Missing or
                unassessed skills remain unassessed.
              </p>
              <p>
                <strong>Practice status:</strong> original material aligned with
                public specifications. Independent teacher review and score
                calibration are pending. No official endorsement or predicted
                certification score.
              </p>
            </div>
            <div className="space-y-2">
              {MOCK_PAPERS[selected].notices.map((n) => (
                <p key={n} className={smallClass}>
                  {n}
                </p>
              ))}
            </div>
          </div>
          {history.length > 0 && (
            <div className={card}>
              <h2 className={titleClass}>Previous attempts</h2>
              {history
                .slice()
                .reverse()
                .map((h) => (
                  <ControlButton variant="unstyled" size="unstyled"
                    key={h.id}
                    className={secondaryButton}
                    onClick={() => {
                      setSelected(h.certification);
                      setReviewingHistory(true);
                      setAttempt(h);
                    }}
                  >
                    {MOCK_PAPERS[h.certification].title} ·{" "}
                    {h.finishedAt ? "Submitted" : "Unfinished"} ·{" "}
                    {new Date(h.finishedAt || h.startedAt).toLocaleString()}
                  </ControlButton>
                ))}
            </div>
          )}
          {storageError && (
            <p role="alert" className="text-sm text-[var(--color-text-error)]">
              {storageError}
            </p>
          )}
        </div>
      </PageWrapper>
    );
  if (attempt.finishedAt || reviewingHistory)
    return (
      <PageWrapper>
        {storageError && (
          <p role="alert" className="text-sm text-[var(--color-text-error)]">
            {storageError}
          </p>
        )}
        <ExamReview
          paper={paper}
          attempt={attempt}
          onReturn={returnToSelection}
        />
      </PageWrapper>
    );
  const sections =
    skill === "reading" || skill === "listening"
      ? availableSections(paper, attempt, skill)
      : [];
  const section = sections[attempt.sectionIndex];
  const firstUnheard =
    skill === "listening"
      ? sections.findIndex(
          (s) => (attempt.playback[s.id]?.completed || 0) < (s.plays || 1),
        )
      : -1;
  const toefl = paper.id === "toefl-ibt";
  const spoken = paper.speaking[attempt.speakingIndex];
  const progress = section
    ? attempt.playback[section.id] || { completed: 0, offset: 0 }
    : { completed: 0, offset: 0 };
  const heard =
    skill !== "listening" || progress.completed >= (section?.plays || 1);
  const questionList = section
    ? skill === "listening" && toefl
      ? [section.questions[attempt.questionIndex]]
      : section.questions
    : [];
  const written = paper.writing
    .filter((w) => !w.choiceGroup || w.id === attempt.choice)
    .filter((_, i) => !toefl || i === attempt.writingIndex - 1);
  function navigateSection(index: number) {
    setAudioBusy(false);
    update((s) => ({ ...s, sectionIndex: index, questionIndex: 0 }));
  }
  function nextListening() {
    if (!section) return;
    if (toefl && attempt!.questionIndex < section.questions.length - 1)
      update((s) => ({ ...s, questionIndex: s.questionIndex + 1 }));
    else if (attempt!.sectionIndex < sections.length - 1)
      navigateSection(attempt!.sectionIndex + 1);
    else commit();
  }
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-5 pb-12">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 flex flex-wrap items-center justify-between gap-4 sticky top-16 sm:top-[72px] z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--camp-purple-soft)] text-[var(--camp-control-ink)] flex items-center justify-center font-display font-black text-sm">
              {toefl ? "iBT" : paper.id === "b2-first" ? "B2" : "IELTS"}
            </div>
            <div>
              <h1 className="font-display text-sm sm:text-base font-extrabold text-[var(--color-text-primary)]">
                {paper.title}
              </h1>
              <p className="font-body text-xs text-[var(--color-text-secondary)]">
                {paper.subtitle} · {skillLabel(skill, paper)}
                {toefl && (skill === "reading" || skill === "listening")
                  ? ` · Module ${attempt.branches[skill] ? 2 : 1}`
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="timer"
              aria-label="Section time remaining"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border font-mono font-bold text-sm ${attempt.deadline - now < 300000 ? "bg-[var(--color-error-bg)] text-red-600 border-red-200" : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border-[var(--color-border-default)]"}`}
            >
              <LearningArt name="Clock" size={16} className="w-4 h-4" />
              <span>
                {clockText(
                  Math.max(0, Math.ceil((attempt.deadline - now) / 1000)),
                )}
              </span>
            </div>
            <ControlButton variant="unstyled" size="unstyled"
              disabled={transitioning}
              onClick={submitEarly}
              className="px-4 py-1.5 rounded-[var(--radius-md)] bg-rose-600 hover:bg-rose-700 text-white font-display font-extrabold text-xs transition-colors shadow-sm"
            >
              Finish Exam
            </ControlButton>
          </div>
        </div>
        {confirmation}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 border-b border-[var(--color-border-default)] pb-1">
          {paper.order.map((key, index) => {
            const Icon = skillIcons[key];
            return (
              <ControlButton variant="unstyled" size="unstyled"
                key={key}
                disabled={key !== skill}
                aria-current={key === skill ? "step" : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-[var(--radius-md)] font-display text-xs font-bold transition-all ${key === skill ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-sm" : "text-[var(--color-text-secondary)]"}`}
              >
                <LearningArt name={Icon.displayName || "book"} className="w-4 h-4" />
                {skillLabel(key, paper)}
                {index < attempt.skillIndex ? " ✓" : ""}
              </ControlButton>
            );
          })}
        </div>
        {storageError && (
          <div role="alert" className={card}>
            <p className="text-sm text-[var(--color-text-error)]">
              {storageError}
            </p>
            <ControlButton variant="unstyled" size="unstyled"
              className={secondaryButton}
              onClick={() => downloadAttempt(attempt)}
            >
              Download current responses
            </ControlButton>
          </div>
        )}
        {toefl && (
          <p className={smallClass}>
            {skill === "reading" || skill === "listening"
              ? `EnglishCamp practice routing · ${attempt.branches[skill] ? (attempt.branches[skill] === "upper" ? "challenge follow-up" : "foundation follow-up") : "router module"}. ETS routing and score calibration are not reproduced.`
              : skill === "writing"
                ? `Writing task ${attempt.writingIndex + 1} of 3 · ${attempt.writingIndex === 0 ? "Build a Sentence · 6 minutes" : attempt.writingIndex === 1 ? "Email · 7 minutes" : "Academic Discussion · 10 minutes"}`
                : "Practice response windows: 8/10/12 seconds for repetition; 45 seconds for interview. No preparation time."}
          </p>
        )}
        {(skill === "reading" || skill === "listening") && section && (
          <div className="space-y-6">
            {!(toefl && skill === "listening") && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {sections.map((s, index) => (
                  <ControlButton variant="unstyled" size="unstyled"
                    key={s.id}
                    disabled={
                      audioBusy ||
                      transitioning ||
                      (skill === "listening" &&
                        firstUnheard >= 0 &&
                        index > firstUnheard)
                    }
                    onClick={() => navigateSection(index)}
                    className={`px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-display font-bold whitespace-nowrap transition-all ${attempt.sectionIndex === index ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-sm" : "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"}`}
                  >
                    {s.title}
                  </ControlButton>
                ))}
              </div>
            )}
            {skill === "listening" && (
              <div className={card}>
                <div>
                  <span className="font-display text-xs font-bold uppercase text-[var(--camp-control-ink)]">
                    {section.title}
                  </span>
                  <h2 className={titleClass}>{section.subtitle}</h2>
                </div>
                <ExamAudio
                  key={section.id}
                  id={section.id}
                  plays={section.plays}
                  progress={progress}
                  onBusy={setAudioBusy}
                  onProgress={(value) =>
                    update((s) => ({
                      ...s,
                      playback: { ...s.playback, [section.id]: value },
                    }))
                  }
                />
              </div>
            )}
            <div
              className={
                skill === "reading"
                  ? "grid grid-cols-1 lg:grid-cols-12 gap-6"
                  : "space-y-4"
              }
            >
              {skill === "reading" && (
                <div className="lg:col-span-7 bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 sm:p-5 space-y-3 lg:max-h-[750px] lg:overflow-y-auto">
                  <div>
                    <span className="text-xs font-display font-bold uppercase text-[var(--camp-control-ink)]">
                      {section.subtitle}
                    </span>
                    <h2 className="font-display text-xl font-extrabold text-[var(--color-text-primary)] mt-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none text-sm font-body leading-relaxed text-[var(--color-text-primary)] whitespace-pre-line border-t border-[var(--color-border-default)] pt-4">
                    {section.passage}
                  </div>
                </div>
              )}
              <div
                className={
                  skill === "reading"
                    ? "lg:col-span-5 space-y-4 lg:max-h-[750px] lg:overflow-y-auto pr-1"
                    : "space-y-4"
                }
              >
                <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-[var(--radius-md)] p-3.5 text-xs text-blue-900 dark:text-blue-200">
                  <strong>Instructions:</strong> {section.instructions}
                </div>
                {section.visual && <StimulusVisual visual={section.visual} />}
                {skill === "listening" && toefl && !heard ? (
                  <p className={smallClass}>
                    Listen to the recording before answering. The next questions
                    will appear one at a time.
                  </p>
                ) : (
                  questionList.map((q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      answer={attempt.answers[q.id] || ""}
                      onChange={(value) => answer(q.id, value)}
                      flagged={!!attempt.flags[q.id]}
                      onFlag={() => flag(q.id)}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border-default)]">
              {!(toefl && skill === "listening") && (
                <ControlButton variant="unstyled" size="unstyled"
                  className={secondaryButton}
                  disabled={attempt.sectionIndex === 0 || audioBusy}
                  onClick={() => navigateSection(attempt.sectionIndex - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous section
                </ControlButton>
              )}
              <span className={smallClass}>
                {attempt.sectionIndex + 1} / {sections.length} sections in this{" "}
                {toefl ? "module" : "skill"}
              </span>
              <ControlButton variant="unstyled" size="unstyled"
                disabled={
                  transitioning ||
                  audioBusy ||
                  (skill === "listening" && !heard)
                }
                className={primaryButton}
                onClick={() =>
                  skill === "listening"
                    ? nextListening()
                    : attempt.sectionIndex < sections.length - 1
                      ? navigateSection(attempt.sectionIndex + 1)
                      : commit()
                }
              >
                {toefl &&
                skill === "listening" &&
                attempt.questionIndex < section.questions.length - 1
                  ? "Next question"
                  : attempt.sectionIndex < sections.length - 1
                    ? "Next section"
                    : toefl && !attempt.branches[skill]
                      ? "Submit module"
                      : "Submit section"}
                <ChevronRight className="w-4 h-4" />
              </ControlButton>
            </div>
            {skill === "listening" && (
              <ControlButton variant="unstyled" size="unstyled"
                className={secondaryButton}
                disabled={transitioning || audioBusy}
                onClick={commit}
              >
                Submit listening {toefl ? "module" : "section"} early
              </ControlButton>
            )}
          </div>
        )}
        {skill === "writing" && (
          <div className="space-y-6">
            {toefl && attempt.writingIndex === 0 && (
              <section className={card}>
                <h2 className={titleClass}>Build a Sentence</h2>
                <p className={smallClass}>
                  Arrange every supplied chunk into an appropriate sentence. Use
                  Undo or Clear to change your response. You have six minutes
                  for ten items.
                </p>
                {paper.sentenceBuilding?.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    answer={attempt.answers[q.id] || ""}
                    onChange={(v) => answer(q.id, v)}
                    flagged={!!attempt.flags[q.id]}
                    onFlag={() => flag(q.id)}
                  />
                ))}
              </section>
            )}
            {paper.id === "b2-first" && (
              <label className="block space-y-2">
                <span className="font-display text-sm font-bold">
                  Part 2 · Choose ONE task
                </span>
                <SelectField
                  className={field}
                  value={attempt.choice}
                  onValueChange={value => update((s) => ({ ...s, choice: value }))}
                >
                  {paper.writing
                    .filter((w) => w.choiceGroup)
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.title}
                      </option>
                    ))}
                </SelectField>
                <span className={smallClass}>
                  The compulsory essay and the selected Part 2 response are
                  submitted. Drafts for other choices remain saved.
                </span>
              </label>
            )}
            {written.map((w) => {
              const text = attempt.writing[w.id] || "",
                words = text.trim().match(/\S+/g)?.length || 0;
              return (
                <section
                  key={w.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 sm:p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-default)] pb-3">
                    <h2 className={titleClass}>{w.title}</h2>
                    <Badge
                      variant={
                        (w.minimumWords && words < w.minimumWords) ||
                        (w.maximumWords && words > w.maximumWords)
                          ? "warning"
                          : "success"
                      }
                    >
                      {words} words
                      {w.maximumWords
                        ? ` · target ${w.minimumWords}–${w.maximumWords}`
                        : w.minimumWords
                          ? ` · minimum ${w.minimumWords}`
                          : ""}
                    </Badge>
                  </div>
                  <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 text-xs font-body text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed">
                    {w.instructions}
                  </div>
                  {w.visual && <StimulusVisual visual={w.visual} />}
                  <label className="block space-y-2">
                    <span className={smallClass}>Your response</span>
                    <Textarea
                      rows={10}
                      value={text}
                      onChange={(e) =>
                        update((s) => ({
                          ...s,
                          writing: { ...s.writing, [w.id]: e.target.value },
                        }))
                      }
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-border-default)] focus:border-[var(--color-primary)] rounded-[var(--radius-lg)] p-4 text-sm font-body text-[var(--color-text-primary)] outline-none transition-all leading-relaxed"
                    />
                  </label>
                  <p className={smallClass}>
                    Word count is guidance; your response is retained even if
                    short. Quality is assessed separately using the task
                    criteria.
                  </p>
                </section>
              );
            })}
            <div className="flex justify-end">
              <ControlButton variant="unstyled" size="unstyled"
                className={primaryButton}
                disabled={transitioning}
                onClick={commit}
              >
                {toefl && attempt.writingIndex < 2
                  ? "Submit task and continue"
                  : "Submit writing section"}
                <ArrowRight className="w-4 h-4" />
              </ControlButton>
            </div>
          </div>
        )}
        {skill === "speaking" && spoken && (
          <div className="space-y-6">
            <div className={card}>
              <span className="font-display text-xs font-bold uppercase text-[var(--camp-control-ink)]">
                Speaking task {attempt.speakingIndex + 1} /{" "}
                {paper.speaking.length}
              </span>
              <h2 className={titleClass}>{spoken.title}</h2>
              <p className={smallClass}>{spoken.instructions}</p>
              {spoken.visual && <StimulusVisual visual={spoken.visual} />}
              <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800 rounded-[var(--radius-lg)] p-5 space-y-3">
                {spoken.prompts.length ? (
                  spoken.prompts.map((p) => (
                    <p
                      key={p}
                      className="text-sm font-body text-amber-950 dark:text-amber-100"
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-sm font-body text-amber-950 dark:text-amber-100">
                    Listen carefully. The spoken question or repeat target is
                    hidden during the attempt.
                  </p>
                )}
              </div>
              <ExamRecorder
                key={spoken.id}
                ref={recorder}
                task={spoken}
                storageKey={recordingKey(attempt, spoken.id)}
                onBusy={setBusy}
                onSaved={() =>
                  update((s) => ({
                    ...s,
                    recordings: Array.from(
                      new Set([...s.recordings, spoken.id]),
                    ),
                  }))
                }
              />
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <p className={smallClass}>
                Local recording · no automatic pronunciation or interaction
                score
              </p>
              <ControlButton variant="unstyled" size="unstyled"
                className={primaryButton}
                disabled={busy || transitioning}
                onClick={async () => {
                  if (recorder.current && !(await recorder.current.finish()))
                    return;
                  if (attempt.speakingIndex < paper.speaking.length - 1)
                    update((s) => ({
                      ...s,
                      speakingIndex: s.speakingIndex + 1,
                    }));
                  else commit();
                }}
              >
                {attempt.speakingIndex < paper.speaking.length - 1
                  ? "Next speaking task"
                  : "Submit speaking section"}
                <ArrowRight className="w-4 h-4" />
              </ControlButton>
            </div>
            <ControlButton variant="unstyled" size="unstyled"
              className={secondaryButton}
              disabled={transitioning}
              onClick={commit}
            >
              Submit speaking section early
            </ControlButton>
          </div>
        )}
        <p className={smallClass}>
          Form {paper.form} · Content {paper.version} ·{" "}
          {storageError
            ? "Unsaved changes — download a copy"
            : "Responses save automatically on this device"}
          . Previously submitted sections are locked until review.
        </p>
      </div>
    </PageWrapper>
  );
}
export default function MockExamPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper>
          <p className="font-body text-sm text-[var(--color-text-secondary)]">
            Loading exam papers…
          </p>
        </PageWrapper>
      }
    >
      <MockExamContent />
    </Suspense>
  );
}
