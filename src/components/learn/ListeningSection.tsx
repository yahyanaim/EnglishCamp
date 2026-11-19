"use client";

import "./read-listening.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, ExternalLink, Pause, Play, RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { LearningArt } from "@/components/brand/LearningArt";
import { AddToVocabButton } from "@/components/ui/AddToVocabButton";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/shadcn/button";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { ComprehensionQuiz } from "./ComprehensionQuiz";
import { LibraryPagination, pageCount, pageSlice } from "./LibraryPagination";
import { CEFR_LABELS, CEFR_LEVELS, type CefrLevel } from "@/data/reading-lessons";
import { recommendLessons, type ListeningLesson } from "@/lib/listeningLessons";
import { loadCatalogue, publishedListening } from "@/lib/learningContent";
import { listeningExerciseId, skillLessonXp } from "@/lib/comprehension";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import { readPlacement } from "@/lib/placement";
import { learnerStorage } from "@/lib/learnerStorage";
import { useProgress } from "@/store/useProgress";
import { useSkillPractice } from "@/store/useSkillPractice";

const PAGE_SIZE = 8;
const SPEEDS = [0.75, 1, 1.25] as const;
const clock = (seconds: number) => { const s = Math.max(0, Math.floor(seconds)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
const keyOf = (lesson: ListeningLesson) => listeningExerciseId(lesson.id) as `listening:${string}`;
const fieldStyle = { boxShadow: "0 2px 0 var(--color-border-default)" };
const fieldClass = "font-body text-sm bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150";

/** Accessible player: play/pause, seek, replay, speed, resume point and error recovery. */
function ListeningPlayer({ lesson, onHeard }: { lesson: ListeningLesson; onHeard: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const key = keyOf(lesson);
  const saved = useSkillPractice(state => state.lessons[key]?.position ?? 0);
  const savePosition = useSkillPractice(state => state.savePosition);
  const [source, setSource] = useState(lesson.origin === "imported" ? lesson.audioUrl : "");
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [error, setError] = useState(false);
  const [resumeFrom] = useState(() => saved > 2 && saved < lesson.seconds - 2 ? saved : 0);
  const lastSaved = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    if (lesson.origin === "bundled") {
      // The Worker re-reads VOA's own player page or podcast feed; the reviewed MP3 is the fallback.
      void fetch(`/api/listening/audio?id=${encodeURIComponent(lesson.id)}`, { signal: controller.signal })
        .then(async response => { if (!response.ok) throw new Error(); return (await response.json() as { audioUrl: string }).audioUrl; })
        .then(url => { if (!controller.signal.aborted) setSource(url || lesson.audioUrl); })
        .catch(() => { if (!controller.signal.aborted) setSource(lesson.audioUrl); });
    }
    const audio = audioRef.current;
    const pause = () => audio?.pause();
    window.addEventListener("camp:natural-audio", pause);
    return () => { controller.abort(); pause(); window.removeEventListener("camp:natural-audio", pause); };
  }, [lesson]);

  function keep(time: number, force = false) {
    if (force || Math.abs(time - lastSaved.current) >= 5) { lastSaved.current = time; savePosition(key, time); }
  }
  function onTime(audio: HTMLAudioElement) {
    if (lesson.excerpt && audio.currentTime >= lesson.seconds) { audio.pause(); audio.currentTime = lesson.seconds; onHeard(); keep(0, true); }
    const time = Math.min(audio.currentTime, lesson.seconds);
    setPosition(time);
    keep(time);
  }
  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !source) return;
    if (!audio.paused) { audio.pause(); return; }
    stopNaturalSpeech();
    window.speechSynthesis?.cancel();
    if (audio.ended || audio.currentTime >= lesson.seconds - 0.2) audio.currentTime = 0;
    if (error) audio.load();
    audio.playbackRate = speed;
    setError(false);
    try { await audio.play(); } catch { setError(true); }
  }
  function seek(time: number) {
    const next = Math.max(0, Math.min(lesson.seconds, time));
    if (audioRef.current) audioRef.current.currentTime = next;
    setPosition(next);
    keep(next, true);
  }

  return (
    <section className="camp-reader-controls" aria-label="Listening audio">
      <audio ref={audioRef} preload="metadata"
        src={source ? source + (lesson.excerpt ? `#t=0,${lesson.seconds}` : "") : undefined}
        onLoadedMetadata={event => { if (resumeFrom && event.currentTarget.currentTime < 1) { event.currentTarget.currentTime = resumeFrom; setPosition(resumeFrom); } }}
        onPlay={() => setPlaying(true)}
        onPause={event => { setPlaying(false); keep(event.currentTarget.currentTime, true); }}
        onEnded={() => { setPlaying(false); onHeard(); keep(0, true); }}
        onTimeUpdate={event => onTime(event.currentTarget)}
        onError={() => { if (source) { setError(true); onHeard(); } }} />
      <div className="camp-reader-control-row">
        <Button onClick={() => void toggle()} disabled={!source} aria-busy={!source}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {!source ? "Loading audio…" : playing ? "Pause" : position > 0 && position < lesson.seconds - 0.5 ? "Resume" : "Play"}
        </Button>
        <Button variant="outline" aria-label="Back 5 seconds" disabled={!source} onClick={() => seek(position - 5)}>−5s</Button>
        <Button variant="outline" aria-label="Replay from the start" disabled={!source} onClick={() => { seek(0); if (!playing) void toggle(); }}>
          <RotateCcw size={16} aria-hidden="true" />
        </Button>
        <Button variant="secondary" aria-label={`Playback speed ${speed}×. Change speed`} onClick={() => {
          const next = SPEEDS[(SPEEDS.indexOf(speed as typeof SPEEDS[number]) + 1) % SPEEDS.length];
          setSpeed(next);
          if (audioRef.current) { audioRef.current.playbackRate = next; audioRef.current.preservesPitch = true; }
        }}>{speed}× speed</Button>
        <span className="camp-reader-time" aria-live="off">{clock(position)} / {clock(lesson.seconds)}</span>
      </div>
      <label className="camp-reader-seek">
        <span className="sr-only">Audio position</span>
        <input type="range" min={0} max={lesson.seconds} step="any" value={position} disabled={!source}
          aria-valuetext={`${clock(position)} of ${clock(lesson.seconds)}`} onChange={event => seek(Number(event.target.value))} />
      </label>
      <p>
        {resumeFrom > 0 && position === resumeFrom && !playing && `Resuming at ${clock(resumeFrom)} · `}
        {lesson.excerpt && "Selected excerpt · "}
        Source: <a className="underline" href={lesson.sourceUrl} target="_blank" rel="noreferrer">VOA Learning English</a>
      </p>
      {error && <p role="alert">The audio could not play. Check your connection and press Play again, or open the recording on VOA.</p>}
    </section>
  );
}

function ListeningLessonView({ lesson, onBack, onOpenBank }: { lesson: ListeningLesson; onBack: () => void; onOpenBank: () => void }) {
  const key = keyOf(lesson), heading = useRef<HTMLHeadingElement>(null);
  const [heard, setHeard] = useState(false), [checked, setChecked] = useState(false), [showTranscript, setShowTranscript] = useState(false);
  const done = useProgress(state => !!state.exercisesDone[key]);
  const completeExercise = useProgress(state => state.completeExercise);
  const practice = useSkillPractice(state => state.lessons[key]);
  const start = useSkillPractice(state => state.start), recordAttempt = useSkillPractice(state => state.recordAttempt);
  useEffect(() => { start(key); heading.current?.focus({ preventScroll: true }); }, [key, start]);
  const transcriptReady = heard || checked || done;

  return (
    <article className="camp-article-reader scroll-mt-24">
      <BackButton onClick={onBack}>Back to listening</BackButton>
      <header className="camp-article-heading">
        <div>
          <p className="camp-article-meta">{CEFR_LABELS[lesson.level]} · {lesson.topic} · {clock(lesson.seconds)}</p>
          <h2 ref={heading} tabIndex={-1}>{lesson.title}</h2>
          {/* The summary is the key for the main-idea question, so it appears only after answers are checked. */}
          <p>{checked || done ? lesson.description : "Listen to the recording first, then answer the questions below."}</p>
          {done && <p className="camp-lesson-complete"><CheckCircle2 size={16} aria-hidden="true" /> Completed{practice?.total ? ` · best ${practice.best}/${practice.total}` : ""}</p>}
        </div>
      </header>
      <ListeningPlayer key={lesson.id} lesson={lesson} onHeard={() => setHeard(true)} />
      {lesson.questions.length > 0 && (
        <ComprehensionQuiz key={lesson.id} questions={lesson.questions} heading="Listening questions"
          intro="Listen first, then answer. You can replay the recording as often as you like."
          previousBest={practice ? { best: practice.best, total: practice.total } : undefined}
          onSubmit={(correct, total) => {
            setChecked(true);
            recordAttempt(key, correct, total);
            const xp = completeExercise(key, skillLessonXp(correct, total));
            return { correct, total, xp, firstCompletion: xp > 0 };
          }} />
      )}
      <section className="camp-reader-text" aria-labelledby="listening-transcript">
        <h3 id="listening-transcript" className="font-display text-lg font-bold">Transcript</h3>
        {!lesson.transcript ? (
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Read the full transcript on <a className="underline" href={lesson.sourceUrl} target="_blank" rel="noreferrer">VOA Learning English <ExternalLink className="inline w-3 h-3" aria-hidden="true" /></a>.</p>
        ) : showTranscript ? (
          <>
            <p className="mt-3 whitespace-pre-line" lang="en">{lesson.transcript}</p>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">Excerpt only. <a className="underline" href={lesson.sourceUrl} target="_blank" rel="noreferrer">Read the full lesson on VOA</a>.</p>
          </>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button variant="outline" disabled={!transcriptReady} aria-describedby="transcript-hint" onClick={() => setShowTranscript(true)}>Show transcript</Button>
            <span id="transcript-hint" className="text-sm text-[var(--color-text-secondary)]">{transcriptReady ? "Check what you heard." : "Available after you listen to the recording or check your answers."}</span>
          </div>
        )}
      </section>
      {lesson.words.length > 0 && (
        <section className="camp-reader-vocabulary" aria-labelledby="listening-words">
          <h3 id="listening-words">Helpful words</h3>
          <div>
            {lesson.words.map(entry => (
              <div key={entry.word} className="camp-reader-vocab-item">
                <h4>{entry.word}</h4>
                <p dir="rtl" lang="ar">{entry.arabic}</p>
                <p>{entry.example}</p>
                <AddToVocabButton de={entry.word} en={entry.arabic} category={lesson.topic} details={{ example: entry.example, translationKind: "word" }} />
              </div>
            ))}
          </div>
          <button type="button" className="camp-bank-link mt-3" onClick={onOpenBank}>Open My Bank →</button>
        </section>
      )}
      <p className="camp-source-note">{lesson.attribution}</p>
    </article>
  );
}

function LessonCard({ lesson, state, onOpen }: { lesson: ListeningLesson; state: { done: boolean; position: number; best?: string }; onOpen: () => void }) {
  return (
    <button type="button" id={`listening-${lesson.id}`} className="camp-learning-library-card" onClick={onOpen}>
      <span className="camp-library-card-icon"><LearningArt name="Headphones" size={23} /></span>
      <span className="camp-library-card-copy">
        <strong>{lesson.title}</strong>
        <span>{lesson.level} · {lesson.topic} · {clock(lesson.seconds)}{state.done ? ` · Completed${state.best ? ` ${state.best}` : ""}` : state.position > 0 ? ` · Resume at ${clock(state.position)}` : ""}</span>
      </span>
      {state.done ? <CheckCircle2 className="camp-library-card-arrow" size={18} aria-label="Completed" /> : <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />}
    </button>
  );
}

export function ListeningSection() {
  const router = useRouter();
  const [lessons, setLessons] = useState<ListeningLesson[]>(() => publishedListening(null));
  const [query, setQuery] = useState(""), [level, setLevel] = useState("all"), [topic, setTopic] = useState("all"), [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [placementLevel, setPlacementLevel] = useState<CefrLevel | undefined>();
  const returnTo = useRef<string | null>(null), libraryTop = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);
  const done = useProgress(s => s.exercisesDone), practice = useSkillPractice(s => s.lessons);

  useEffect(() => {
    void loadCatalogue().then(catalogue => { if (catalogue) setLessons(publishedListening(catalogue)); });
    const requested = new URLSearchParams(window.location.search).get("lesson");
    if (requested) setSelectedId(requested);
    try { setPlacementLevel(readPlacement(learnerStorage).cefr?.results.at(-1)?.taskLevel); } catch {}
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedId) url.searchParams.set("lesson", selectedId); else url.searchParams.delete("lesson");
    window.history.replaceState(window.history.state, "", url);
    if (selectedId) window.scrollTo({ top: 0 });
    else if (returnTo.current) { document.getElementById(returnTo.current)?.focus(); returnTo.current = null; }
  }, [selectedId]);

  const info = useCallback((lesson: ListeningLesson) => {
    const record = practice[keyOf(lesson)];
    return { done: !!done[keyOf(lesson)], position: record?.position ?? 0, best: record?.total ? `${record.best}/${record.total}` : undefined };
  }, [done, practice]);
  const topics = useMemo(() => Array.from(new Set(lessons.map(l => l.topic))).sort(), [lessons]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter(lesson => {
      const s = info(lesson), state = s.done ? "completed" : s.position > 0 ? "started" : "new";
      return (level === "all" || lesson.level === level) && (topic === "all" || lesson.topic === topic) && (status === "all" || status === state) &&
        (!q || [lesson.title, lesson.topic, lesson.description, lesson.transcript ?? ""].some(text => text.toLowerCase().includes(q)));
    }).sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level));
  }, [lessons, query, level, topic, status, info]);
  useEffect(() => setPage(1), [query, level, topic, status]);
  useEffect(() => { if (page > pageCount(filtered.length, PAGE_SIZE)) setPage(1); }, [filtered.length, page]);
  const turn = (next: number) => { setPage(next); libraryTop.current?.scrollIntoView({ block: "start", behavior: "smooth" }); };
  const resume = lessons.filter(lesson => !info(lesson).done && info(lesson).position > 0).sort((a, b) => (practice[keyOf(b)]?.lastAt ?? "").localeCompare(practice[keyOf(a)]?.lastAt ?? "")).slice(0, 3);
  const suggested = recommendLessons(lessons, id => !!done[listeningExerciseId(id)], placementLevel).filter(lesson => !resume.includes(lesson));
  const selected = selectedId ? lessons.find(lesson => lesson.id === selectedId) : null;
  const open = (lesson: ListeningLesson) => { returnTo.current = `listening-${lesson.id}`; setSelectedId(lesson.id); };

  if (selected) return <ListeningLessonView key={selected.id} lesson={selected} onBack={() => setSelectedId(null)} onOpenBank={() => router.push("/vocabulary")} />;
  const filtering = query || level !== "all" || topic !== "all" || status !== "all";
  return (
    <>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
          <input type="search" aria-label="Search listening lessons" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search listening lessons..."
            className="w-full h-12 pl-10 pr-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-border-focus)]"
            style={fieldStyle} />
        </div>
        <SelectField aria-label="Listening level" value={level} onValueChange={setLevel} className={fieldClass} style={fieldStyle}>
          <option value="all">All levels</option>
          {CEFR_LEVELS.filter(l => lessons.some(lesson => lesson.level === l)).map(l => <option key={l} value={l}>{CEFR_LABELS[l]}</option>)}
        </SelectField>
        <SelectField aria-label="Listening topic" value={topic} onValueChange={setTopic} className={fieldClass} style={fieldStyle}>
          <option value="all">All topics</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </SelectField>
        <SelectField aria-label="Listening progress" value={status} onValueChange={setStatus} className={fieldClass} style={fieldStyle}>
          <option value="all">All lessons</option>
          <option value="new">Not started</option>
          <option value="started">In progress</option>
          <option value="completed">Completed</option>
        </SelectField>
        <span className="font-body text-xs text-[var(--color-text-secondary)]" role="status">{filtered.length} lessons · {lessons.filter(l => info(l).done).length} completed</span>
      </div>
      {!filtering && resume.length > 0 && (
        <section className="camp-learning-library-group" aria-labelledby="listening-resume">
          <h2 id="listening-resume" className="font-display text-lg font-bold">Continue listening</h2>
          <div className="camp-trainer-grid">{resume.map(lesson => <LessonCard key={lesson.id} lesson={lesson} state={info(lesson)} onOpen={() => open(lesson)} />)}</div>
        </section>
      )}
      {!filtering && suggested.length > 0 && (
        <section className="camp-learning-library-group" aria-labelledby="listening-suggested">
          <h2 id="listening-suggested" className="font-display text-lg font-bold">Suggested for you</h2>
          <p className="font-body text-xs text-[var(--color-text-secondary)]">{placementLevel ? `Based on your ${placementLevel} placement and completed lessons.` : "Based on the lessons you have completed."}</p>
          <div className="camp-trainer-grid">{suggested.map(lesson => <LessonCard key={lesson.id} lesson={lesson} state={info(lesson)} onOpen={() => open(lesson)} />)}</div>
        </section>
      )}
      <section ref={libraryTop} className="camp-learning-library-group scroll-mt-24" aria-labelledby="listening-library">
        <h2 id="listening-library" className="font-display text-lg font-bold">Listening library</h2>
        <div className="camp-trainer-grid">{pageSlice(filtered, page, PAGE_SIZE).map(lesson => <LessonCard key={lesson.id} lesson={lesson} state={info(lesson)} onOpen={() => open(lesson)} />)}</div>
        <LibraryPagination page={page} total={filtered.length} size={PAGE_SIZE} label="Listening lessons pages" onChange={turn} />
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <LearningArt name="Headphones" size={36} className="w-12 h-12 mx-auto mb-3" />
            <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No listening lessons found</p>
            <p className="font-body text-xs mt-1 text-[var(--color-text-secondary)]">Try a different search or filter.</p>
          </div>
        )}
      </section>
      <p className="camp-source-note">Recordings from VOA Learning English, a public-domain service of Voice of America. Levels are EnglishCamp teaching estimates.</p>
    </>
  );
}
