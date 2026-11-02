"use client";
import { learnerStorage } from "@/lib/learnerStorage";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ActivityTask, CourseActivityData } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { useActivityAttempt } from "@/hooks/useActivityAttempt";
import { taskSignature, loadTake, saveTake, setRecordingRisk, STUDY_REVIEW_CRITERIA } from "@/lib/activityState";
import { courseLabel, planningPrompt } from "@/lib/courseLabels";
import type { TaskOutcome } from "@/lib/courseProgress";
import { checkActivityAnswer, countWords, selectedAnswers, createRecordingSession, type RecordingSession } from "@/lib/courseActivity";

const field = "w-full rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-text-primary)] p-3 focus:border-[var(--color-border-focus)] outline-none";
const stages = ["Guided practice", "Independent practice", "Assessment"];
// Keep immutable task labels/signatures compatible with saved attempts; disclose the replacement narration in the player.
const narrationLabel = (label: string) => label.replace(/^Original synthetic (speech|model|dialogue) · [^·]+ · /, (_match, kind: string) => `Original AI-generated neural ${kind === "model" ? "model audio" : kind} · `);
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function Recorder({ storageKey, onReady, onBusy, disabled = false }: { storageKey: string; onReady: (ready: boolean) => void; onBusy: (busy: boolean) => void; disabled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "requesting" | "recording" | "ready">("idle");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [mimeType, setMimeType] = useState("");
  const [saved, setSaved] = useState(true);
  const session = useRef<RecordingSession | null>(null);
  const objectUrl = useRef("");
  const callbacks = useRef({ onReady, onBusy }); callbacks.current = { onReady, onBusy };
  const alive = useRef(true);
  function show(audio: Blob) {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(audio);
    setMimeType(audio.type); setUrl(objectUrl.current); setStatus("ready"); callbacks.current.onReady(true);
  }
  useEffect(() => {
    alive.current = true;
    loadTake(storageKey).then(audio => { if (alive.current && audio && !session.current) show(audio); }).catch(() => { /* New recordings can still be downloaded if local storage is unavailable. */ });
    return () => { alive.current = false; session.current?.dispose(); if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); setRecordingRisk(storageKey, false); };
  // Each recorder is keyed to immutable task content and prompt.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
  useEffect(() => {
    const risky = status === "recording" || status === "requesting" || !saved;
    setRecordingRisk(storageKey, risky);
    return () => setRecordingRisk(storageKey, false);
  }, [status, saved, storageKey]);
  useEffect(() => {
    if (status !== "recording") return;
    const start = Date.now();
    const timer = setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(timer);
  }, [status]);
  async function start() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Recording is unavailable. Use the study alternative or a supported browser with a microphone."); return;
    }
    session.current?.dispose();
    if (objectUrl.current) { URL.revokeObjectURL(objectUrl.current); objectUrl.current = ""; }
    setUrl(""); setError(""); setSeconds(0); setStatus("requesting"); onReady(false); onBusy(true);
    session.current = createRecordingSession(navigator.mediaDevices, MediaRecorder, {
      onStart: () => setStatus("recording"),
      onReady: audio => {
        show(audio); setSaved(false); onBusy(false);
        saveTake(storageKey, audio).then(() => { if (alive.current) setSaved(true); }).catch(() => { if (alive.current) setError("This take could not be saved on this device. Use Save recording before leaving."); });
      },
      onError: message => { setError(message); setStatus("idle"); onReady(false); onBusy(false); },
    });
    await session.current.start();
  }
  return <div className="space-y-3">
    <p className="text-sm">The latest recording for each prompt is saved only in this browser on this device. It is never uploaded. Save a copy for your own records. Pronunciation is not automatically assessed.</p>
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={start} disabled={disabled || status === "recording" || status === "requesting"}>{status === "requesting" ? "Waiting for microphone…" : url ? "Record again" : "Start recording"}</Button>
      <Button size="sm" variant="secondary" disabled={status !== "recording"} onClick={() => session.current?.stop()}>Stop recording</Button>
      {status === "requesting" && <Button size="sm" variant="secondary" onClick={() => { session.current?.dispose(); setStatus("idle"); setError("Microphone request cancelled. You can retry or use the study alternative."); onReady(false); onBusy(false); }}>Cancel microphone request</Button>}
      <span role="status">{status === "recording" ? "Recording · " : "Current take · "}{seconds ? clock(seconds) : status === "ready" ? "ready to replay" : "0:00"}</span>
    </div>
    {error && <p role="alert" className="text-[var(--color-text-error)]">{error}</p>}
    {url && <><audio controls src={url} className="w-full" aria-label="Your speaking response" /><a className="text-[var(--color-text-link)] underline text-sm" href={url} download={`speaking-response.${mimeType.includes("mp4") ? "m4a" : mimeType.includes("ogg") ? "ogg" : "webm"}`} onClick={() => setSaved(true)}>Save recording</a></>}
  </div>;
}

function SpokenSequence({ items, storageKey, index, heard, onIndex, onHeard, onReady, onBusy, disabled, alternative }: {
  items: NonNullable<ActivityTask["spokenItems"]>; storageKey: string; index: number; heard: number[];
  onIndex: (index: number) => void; onHeard: (index: number) => void; onReady: (ready: boolean) => void; onBusy: (busy: boolean) => void; disabled: boolean; alternative: boolean;
}) {
  const [recorded, setRecorded] = useState<Record<number, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const sequence = useRef<HTMLDivElement>(null);
  function ready(i: number, value: boolean) { setRecorded(previous => ({ ...previous, [i]: value })); }
  useEffect(() => { onReady(items.every((_, n) => recorded[n])); }, [recorded, items, onReady]);
  return <div ref={sequence} className="space-y-4">
    <div className="flex flex-wrap gap-2" aria-label="Speaking prompt navigation">{items.map((_, i) => <Button key={i} size="sm" aria-pressed={i === index} variant={i === index ? "primary" : "secondary"} disabled={busy} onClick={() => { sequence.current?.querySelectorAll("audio").forEach(player => player.pause()); onIndex(i); }}>Prompt {i + 1}{recorded[i] ? " ✓" : ""}</Button>)}</div>
    <p className="text-xs text-[var(--color-text-secondary)]">Original synthetic English prompts. Lesson replay is allowed. Record every prompt before submitting a spoken set, or choose the clearly labelled study alternative.</p>
    {items.map((item, i) => <div key={item.audioSrc} hidden={i !== index} className="space-y-3">
      <p className="text-sm font-semibold">Prompt {i + 1} of {items.length}</p>
      <audio controls preload="none" src={item.audioSrc} className="w-full" aria-label={`Speaking stimulus ${i + 1}`} onEnded={() => onHeard(i)} onCanPlay={() => setErrors(e => ({ ...e, [i]: false }))} onError={() => setErrors(e => ({ ...e, [i]: true }))} />
      {errors[i] && <p role="alert" className="text-sm text-[var(--color-text-error)]">This prompt could not load. Retry playback or use the study alternative below.</p>}
      {heard.includes(i) && <Recorder storageKey={`${storageKey}:prompt-${i}`} disabled={disabled || alternative} onReady={value => ready(i, value)} onBusy={value => { setBusy(value); onBusy(value); }} />}
      {!heard.includes(i) && !alternative && <p className="text-sm">Listen to the end before recording this response.</p>}
      {(recorded[i] || alternative) && <details className="text-sm" open={alternative}><summary className="cursor-pointer text-[var(--color-text-link)]">Review prompt and possible response</summary><p className="mt-2">Prompt: {item.transcript}</p><p className="mt-2">Model: {item.model}</p></details>}
    </div>)}
  </div>;
}

function Task({ task, exerciseId, moduleId, stage, active, onComplete, onBusy, planningContext }: { planningContext?: string; task: ActivityTask; exerciseId: string; moduleId: string; stage: number; active: boolean; onComplete: (outcome: TaskOutcome) => void; onBusy: (busy: boolean) => void }) {
  const { state, setState, patch, loaded, saving, key } = useActivityAttempt(exerciseId, task);
  const { text, previous, answers, index, submitted, checks, heard, remaining, timerPhase, alternative, studyNotes } = state;
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [running, setRunning] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const wasActive = useRef(false);
  const recordAttempt = useProgress(s => s.recordActivityAttempt);
  const resolveErrors = useErrors(s => s.resolveActivityErrors);
  const addError = useErrors(s => s.addError);
  const open = task.kind === "writing" || task.kind === "speaking";
  const words = countWords(text);
  const questions = task.questions ?? [];
  const question = questions[index];
  const allAnswered = questions.every(q => q.selectCount ? selectedAnswers(answers[q.id] ?? "").length === q.selectCount : !!answers[q.id]?.trim());
  const correct = questions.filter(q => checkActivityAnswer(q, answers[q.id] ?? "")).length;
  const outcome: TaskOutcome = alternative ? "study-alternative" : open ? "self-reviewed" : "checked";
  const reviewRubric = alternative ? STUDY_REVIEW_CRITERIA : task.rubric ?? [];
  function recordingBusy(value: boolean) { setBusy(value); onBusy(value); }
  useEffect(() => {
    if (!active) { setRunning(false); root.current?.querySelectorAll("audio").forEach(player => player.pause()); }
    // Restoring a saved stage must not scroll past the lesson or its video.
    else if (wasActive.current) heading.current?.focus({ preventScroll: true });
    wasActive.current = true;
  }, [active]);
  useEffect(() => {
    if (!running || !active) return;
    const started = Date.now(), initial = remaining;
    const timer = setInterval(() => {
      const next = Math.max(0, initial - Math.floor((Date.now() - started) / 1000)); patch({ remaining: next });
      if (!next) setRunning(false);
    }, 250);
    return () => clearInterval(timer);
  // remaining is the countdown; restart only when the learner toggles the timer.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, active]);
  function log(status: "attempted" | "correct" | "incorrect" | "revised" | "completed") {
    recordAttempt({ moduleId, taskId: task.id, stage, signature: taskSignature(task), status, outcome,
      ...(!open ? { correct, total: questions.length, wrongQuestionIds: questions.filter(q => !checkActivityAnswer(q, answers[q.id] ?? "")).map(q => q.id) } : {}) });
  }
  function submit() {
    patch({ submitted: true }); setRunning(false); log(open ? "attempted" : correct === questions.length ? "correct" : "incorrect");
    if (!open) resolveErrors(moduleId, task.id, questions.filter(q => checkActivityAnswer(q, answers[q.id] ?? "")).map(q => q.id));
    if (!open) questions.filter(q => !checkActivityAnswer(q, answers[q.id] ?? "")).forEach(q => addError({ question: q.prompt, userAnswer: "Incorrect response (answer text not retained in history)", correctAnswer: q.answers.join(" / "), explanation: `${q.explanation} Evidence: ${q.evidence}`, source: "course-activity", sourceId: moduleId, taskId: task.id, questionId: q.id }));
  }
  function revise() { log("revised"); patch({ previous: open ? text : previous, submitted: false, checks: [] }); }
  const canComplete = !busy && (open ? reviewRubric.every(item => checks.includes(item)) && (alternative ? countWords(studyNotes) >= 10 : task.kind === "writing" ? words >= (task.minWords ?? 0) : ready) : correct === questions.length);
  return <div ref={root} className="space-y-4 text-[var(--color-text-primary)]" hidden={!active}>
    <h3 ref={heading} tabIndex={-1} className="font-display text-lg font-bold focus:outline-none">{courseLabel(task.title)}</h3>
    <p className="text-sm whitespace-pre-line">{planningContext ? `${task.instructions}\n\nRead this prompt, then write your plan:\n${planningContext}\n\nWrite only the plan in this stage. Compose the full response in independent practice.` : task.instructions}</p>
    {!!task.seconds && <div className="flex flex-wrap items-center gap-3 text-sm">
      <span role="timer">{timerPhase === "preparation" ? "Preparation" : "Response"} · {clock(remaining)}</span>
      <Button size="sm" variant="secondary" onClick={() => setRunning(v => !v)} disabled={remaining === 0}>{running ? "Pause timer" : "Start timer"}</Button>
      {task.preparationSeconds && <Button size="sm" variant="secondary" onClick={() => { setRunning(false); patch({ timerPhase: timerPhase === "preparation" ? "response" : "preparation", remaining: timerPhase === "preparation" ? task.seconds! : task.preparationSeconds! }); }}>{timerPhase === "preparation" ? "Begin response" : "Restart preparation"}</Button>}
      <Button size="sm" variant="ghost" onClick={() => { setRunning(false); patch({ timerPhase: "response", remaining: task.seconds! }); }}>Reset response timer</Button>
      <span className="text-xs text-[var(--color-text-secondary)]">Optional local practice timer; no automatic submission.</span>
    </div>}
    {task.source && <div className="whitespace-pre-line text-sm leading-relaxed bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4" aria-label="Source passage">{task.source}</div>}
    {task.visual && <figure className="space-y-2"><div className="overflow-x-auto"><Image src={task.visual.src} alt={task.visual.alt} width={800} height={task.visual.src.endsWith("paper-process.svg") ? 520 : 450} unoptimized className="w-full h-auto min-w-[600px] rounded-[var(--radius-md)]" /></div><figcaption className="text-xs">{task.visual.description} Scroll horizontally on a small screen. <a className="text-[var(--color-text-link)] underline" href={task.visual.src} target="_blank" rel="noreferrer">Open full-size visual</a></figcaption></figure>}
    {task.audio && <div className="space-y-2">
      <audio controls preload={active ? "metadata" : "none"} src={task.audio.src} className="w-full" aria-label="Task audio" onEnded={() => patch({ heard: true })} onCanPlay={() => setAudioError(false)} onError={() => setAudioError(true)} />
      <p className="text-xs text-[var(--color-text-secondary)]">{narrationLabel(task.audio.label)} Replay is allowed. Listen to the end before submitting, or choose the study alternative.</p>
      {audioError && <p role="alert" className="text-[var(--color-text-error)]">Audio could not load. Retry playback or use transcript study below.</p>}
    </div>}
    {(task.audio || task.kind === "speaking") && <div className="space-y-3">
      <label className="flex gap-2 text-sm"><input type="checkbox" checked={alternative} disabled={busy || submitted} onChange={e => patch({ alternative: e.target.checked, checks: [] })} />Use accessible study alternative</label>
      {alternative && <div className="space-y-3 text-sm bg-[var(--color-surface-alt)] p-4 rounded-[var(--radius-md)]"><p>Transcript / written study records engagement only. It does not demonstrate listening or spoken performance.</p>
        {task.audio && <p className="whitespace-pre-line">{task.audio.transcript}</p>}
        {task.kind === "speaking" && <><p className="whitespace-pre-line">{task.spokenItems ? "Read each written prompt and possible response below. Compare the wording or organisation, then plan a suitable next activity." : task.model}</p><p>Use this material to study meaning and structure. A recording, accessible performance arrangement or human feedback is needed to evaluate the performance skill.</p><label className="block" htmlFor={`${task.id}-study`}>Study reflection: explain what you would practise and why (at least 10 words)</label><Textarea id={`${task.id}-study`} value={studyNotes} readOnly={submitted} onChange={e => patch({ studyNotes: e.target.value })} className={field} rows={4} /></>}
      </div>}
    </div>}
    {task.kind === "writing" && <div className="space-y-2">
      <label className="block font-semibold text-sm" htmlFor={`${task.id}-response`}>Your written response</label>
      <Textarea id={`${task.id}-response`} value={text} onChange={e => patch({ text: e.target.value })} readOnly={submitted} rows={12} className={field} spellCheck />
      <p role="status" className="text-xs">{words} words · Target: {task.minWords}{task.maxWords ? `–${task.maxWords}` : "+"} · {saving}</p>
      {previous && <details className="text-sm"><summary className="cursor-pointer text-[var(--color-text-link)]">{state.earlierPrompt ? "Preserved draft from an earlier task version" : "Compare with your previous draft"}</summary><p className="whitespace-pre-line mt-2">{previous}</p></details>}
    </div>}
    {task.kind === "speaking" && (task.spokenItems ? <SpokenSequence items={task.spokenItems} storageKey={key} index={state.promptIndex} heard={state.heardPrompts} onIndex={promptIndex => patch({ promptIndex })} onHeard={i => setState(s => ({ ...s, heardPrompts: Array.from(new Set([...s.heardPrompts, i])) }))} onReady={setReady} onBusy={recordingBusy} disabled={submitted} alternative={alternative} /> : heard && !alternative ? <Recorder storageKey={key} onReady={setReady} onBusy={recordingBusy} disabled={submitted} /> : !alternative ? <p className="text-sm">Listen to the model to the end before recording.</p> : null)}
    {question && <fieldset className="space-y-3" disabled={submitted || !loaded}>
      <legend className="font-semibold text-sm">Question {index + 1} of {questions.length} · {question.prompt}</legend>
      {question.options ? question.options.map(option => <label key={option} className="flex gap-3 items-start p-3 border border-[var(--color-border-default)] rounded-[var(--radius-md)] text-sm"><input type={question.selectCount ? "checkbox" : "radio"} name={`${task.id}-${question.id}`} checked={question.selectCount ? selectedAnswers(answers[question.id] ?? "").includes(option) : answers[question.id] === option} onChange={() => setState(s => {
        const current = selectedAnswers(s.answers[question.id] ?? "");
        return { ...s, answers: { ...s.answers, [question.id]: question.selectCount ? JSON.stringify(current.includes(option) ? current.filter(x => x !== option) : [...current, option]) : option } };
      })} className="mt-1" /><span>{option}</span></label>) : <Input aria-label={`Answer to question ${index + 1}: ${question.prompt}`} className={field} value={answers[question.id] ?? ""} onChange={e => patch({ answers: { ...answers, [question.id]: e.target.value } })} autoComplete="off" />}
      {question.maxWords && <p className="text-xs">No more than {question.maxWords} word(s).</p>}
    </fieldset>}
    {questions.length > 1 && <div className="flex gap-2 flex-wrap" aria-label="Question navigation">{questions.map((q, i) => <Button key={q.id} size="sm" aria-pressed={i === index} variant={i === index ? "primary" : "secondary"} onClick={() => patch({ index: i })} aria-label={`Question ${i + 1}${answers[q.id] ? ", answered" : ""}`}>{i + 1}{answers[q.id] ? " ✓" : ""}</Button>)}</div>}
    {!submitted && <Button size="sm" onClick={submit} disabled={!loaded || (!heard && !alternative) || busy || (open ? task.kind === "writing" ? words === 0 : alternative ? countWords(studyNotes) < 10 : !ready : !allAnswered)}>Submit for review</Button>}
    {submitted && <div className="space-y-4" aria-live="polite">
      {!open && <><p className="font-bold text-[var(--color-text-info)]">{correct}/{questions.length} answers correct · {alternative ? "transcript study" : "local practice result"}</p>{questions.map(q => <div key={q.id} className="text-sm space-y-1 p-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-md)]"><p className={checkActivityAnswer(q, answers[q.id] ?? "") ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}>{q.prompt} — Your answer: {q.selectCount ? selectedAnswers(answers[q.id] ?? "").join("; ") : answers[q.id]}</p><p>Accepted answer: {q.answers.join(q.selectCount ? " and " : " / ")}</p><p>{q.explanation}</p><p className="text-[var(--color-text-secondary)]">Evidence: {q.evidence}</p></div>)}</>}
      {task.audio && <details><summary className="cursor-pointer text-[var(--color-text-link)] text-sm">Review transcript</summary><p className="whitespace-pre-line text-sm mt-2">{task.audio.transcript}</p></details>}
      {open && <>
        <p className="text-sm font-semibold">Self-review, not automated grading. No official band or readiness score is assigned.</p>
        {task.kind === "writing" && words < (task.minWords ?? 0) && <p className="text-sm text-[var(--color-text-warning)]">Your response is below the task word target. Develop relevant detail before marking the task complete.</p>}
        {task.maxWords && words > task.maxWords && <p className="text-sm text-[var(--color-text-warning)]">Your response exceeds the practice target. Review relevance and concision.</p>}
        <details><summary className="cursor-pointer text-[var(--color-text-link)] text-sm">Model response and commentary</summary><p className="whitespace-pre-line text-sm mt-3">{task.model}</p><p className="text-sm mt-3 text-[var(--color-text-secondary)]">{task.analysis}</p>{task.modelAudio && <audio controls src={task.modelAudio.src} preload="none" aria-label="Developed model response" className="w-full mt-3" />}</details>
        <div className="space-y-2">{reviewRubric.map(item => <label key={item} className="flex gap-3 text-sm"><input type="checkbox" checked={checks.includes(item)} onChange={e => patch({ checks: e.target.checked ? [...checks, item] : checks.filter(x => x !== item) })} /><span>{item}</span></label>)}</div>
      </>}
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant="secondary" disabled={busy} onClick={revise}>Revise / try again</Button>
        <Button size="sm" onClick={() => { log("completed"); onComplete(outcome); }} disabled={!canComplete}>{stage === 2 ? "Record assessment completion" : "Continue to next stage"}</Button>
      </div>
      {!open && correct < questions.length && <p className="text-xs">Use the evidence to correct your answers, then resubmit. Your entries remain available for revision.</p>}
    </div>}
    {task.kind !== "writing" && <p className="text-xs text-[var(--color-text-secondary)]" role="status">{saving}</p>}
  </div>;
}

export function CourseActivity({ data, id, xpReward, moduleId = id.replace(/^activity-/, ""), lessonXP = 0 }: { data: CourseActivityData; id: string; xpReward: number; moduleId?: string; lessonXP?: number }) {
  const [stage, setStage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [award, setAward] = useState<number | null>(null);
  const completeExercise = useProgress(s => s.completeExercise);
  const registerContent = useProgress(s => s.registerContent);
  const visitModule = useProgress(s => s.visitModule);
  const finishStage = useProgress(s => s.finishStage);
  const completed = useProgress(s => s.exercisesDone[id]);
  const evidence = useProgress(s => s.modules[moduleId]);
  const [unlocked, setUnlocked] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const raw = learnerStorage.getItem(`${id}:stages`);
      if (raw) { const saved = JSON.parse(raw); if (Number.isInteger(saved.unlocked) && saved.unlocked >= 0 && saved.unlocked <= 2) { setUnlocked(saved.unlocked); setStage(Number.isInteger(saved.stage) && saved.stage >= 0 ? Math.min(saved.stage, saved.unlocked) : 0); } }
    } catch { /* Per-task storage messages cover unavailable local storage. */ }
    setLoaded(true);
  }, [id]);
  useEffect(() => {
    if (!loaded) return;
    try { learnerStorage.setItem(`${id}:stages`, JSON.stringify({ unlocked, stage })); } catch { /* Tasks remain usable without persistence. */ }
    visitModule(moduleId, stage);
  }, [loaded, id, unlocked, stage, moduleId, visitModule]);
  useEffect(() => { registerContent(moduleId, data.tasks.map(taskSignature)); }, [moduleId, data, registerContent]);
  const currentCycle = data.tasks.every((task, i) => evidence?.stages[i]?.signature === taskSignature(task));
  function changeStage(i: number) { container.current?.querySelectorAll("audio").forEach(player => player.pause()); setStage(i); }
  return <div ref={container} className="space-y-5">
    <p className="text-xs text-[var(--color-text-secondary)]">{data.exam} · Original practice material · {data.exam === "TOEFL iBT 2026" ? "Non-adaptive practice" : "Lesson practice, not a full examination"}</p>
    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Learning objective: {courseLabel(data.objective)}</p>
    <details className="text-sm text-[var(--color-text-primary)]"><summary className="font-bold cursor-pointer">Learn and observe / hint</summary><p className="mt-3 whitespace-pre-line">{data.learn}</p><p className="mt-3 whitespace-pre-line">Worked example: {data.worked.example}</p><p className="mt-2 text-[var(--color-text-secondary)]">Why it works: {data.worked.reasoning}</p></details>
    <div className="flex flex-wrap gap-2" aria-label="Learning stages">{stages.map((label, i) => <Button key={label} size="sm" aria-pressed={stage === i} variant={stage === i ? "primary" : "secondary"} disabled={busy || i > unlocked} onClick={() => changeStage(i)}>{label}{evidence?.stages[i]?.signature === taskSignature(data.tasks[i]) ? " ✓" : ""}</Button>)}</div>
    <p className="sr-only" role="status">Current stage: {stages[stage]}</p>
    {data.tasks.map((task, i) => <Task key={`${id}-${task.id}-${taskSignature(task)}`} task={task} exerciseId={id} moduleId={moduleId} stage={i} active={stage === i} planningContext={planningPrompt(data, i)} onBusy={setBusy} onComplete={outcome => {
      const lessonAward = finishStage(moduleId, i, { signature: taskSignature(task), kind: task.kind, outcome }, lessonXP);
      if (i === 2) { setAward(completeExercise(id, xpReward) + lessonAward); }
      else { setUnlocked(v => Math.max(v, i + 1)); changeStage(i + 1); }
    }} />)}
    {(award !== null || currentCycle) && <p role="status" className="text-sm text-[var(--color-text-success)]">{currentCycle ? "Practice cycle complete." : "Assessment recorded. Complete the earlier stages to finish this cycle."} {award ? `+${award} XP earned.` : "No additional XP awarded."} This records task completion and self-review, not an examination score.</p>}
    {completed && <p className="text-xs text-[var(--color-text-secondary)]">Earlier activity completion retained. Repeating an activity does not award its XP again. Checked answers are local task evidence; Writing and Speaking are self-reviewed.</p>}
  </div>;
}
