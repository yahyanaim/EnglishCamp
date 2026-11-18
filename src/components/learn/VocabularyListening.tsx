"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { LISTENING_LEVELS, VOA_LISTENING, voaArticleUrl, type VoaListeningClip } from "@/data/voa-listening";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import { LearningArt } from "@/components/brand/LearningArt";
import { AddToVocabButton } from "@/components/ui/AddToVocabButton";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/shadcn/button";
import { SelectField } from "@/components/ui/shadcn/select-field";

function clock(seconds: number) {
  const rounded = Math.floor(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

function ClipPlayer({ clip }: { clip: VoaListeningClip }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [source, setSource] = useState("");
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/vocabulary/listening?id=${encodeURIComponent(clip.id)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error();
        const { audioUrl } = await response.json() as { audioUrl: string };
        if (!controller.signal.aborted) setSource(audioUrl || clip.audioUrl);
      })
      .catch(() => {
        if (!controller.signal.aborted) setSource(clip.audioUrl);
      });

    const audio = audioRef.current;
    const pause = () => audio?.pause();
    window.addEventListener("camp:natural-audio", pause);
    return () => {
      controller.abort();
      pause();
      window.removeEventListener("camp:natural-audio", pause);
    };
  }, [clip]);

  function updateTime(audio: HTMLAudioElement) {
    if (clip.excerpt && audio.currentTime >= clip.seconds) {
      audio.pause();
      audio.currentTime = clip.seconds;
    }
    setPosition(Math.min(audio.currentTime, clip.seconds));
  }

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !source) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    stopNaturalSpeech();
    window.speechSynthesis?.cancel();
    window.dispatchEvent(new Event("camp:natural-audio"));
    if (audio.ended || audio.currentTime >= clip.seconds) audio.currentTime = 0;
    if (error) audio.load();
    audio.playbackRate = speed;
    setError(false);
    try {
      await audio.play();
    } catch {
      setError(true);
    }
  }

  return (
    <section className="camp-reader-controls" aria-label="Listening audio">
      <audio
        ref={audioRef}
        src={source ? source + (clip.excerpt ? `#t=0,${clip.seconds}` : "") : undefined}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={event => updateTime(event.currentTarget)}
        onError={() => { if (source) setError(true); }}
      />
      <div className="camp-reader-control-row">
        <Button onClick={() => void toggle()} disabled={!source} aria-busy={!source}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {!source ? "Loading audio…" : playing ? "Pause" : "Play clip"}
        </Button>
        <Button variant="outline" aria-label="Restart clip" disabled={!source} onClick={() => {
          if (audioRef.current) audioRef.current.currentTime = 0;
          setPosition(0);
        }}>
          <RotateCcw size={16} aria-hidden="true" />
        </Button>
        <Button variant="secondary" aria-pressed={speed === .8} onClick={() => {
          const next = speed === 1 ? .8 : 1;
          setSpeed(next);
          if (audioRef.current) audioRef.current.playbackRate = next;
        }}>
          {speed === 1 ? "Normal speed" : "Slow speed"}
        </Button>
        <span className="camp-reader-time">{clock(position)} / {clock(Math.round(clip.seconds))}</span>
      </div>
      <label className="camp-reader-seek">
        <span className="sr-only">Audio position</span>
        <input
          type="range" min={0} max={clip.seconds} step="any" value={position}
          disabled={!source} aria-valuetext={clock(position)}
          onChange={event => {
            const next = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = next;
            setPosition(next);
          }}
        />
      </label>
      <p>
        {clip.excerpt && "Selected excerpt · "}
        <a className="underline" href={voaArticleUrl(clip.articleId)} target="_blank" rel="noreferrer">VOA Learning English</a>
      </p>
      {error && <p role="alert">The audio could not play. Try again or open the recording on VOA.</p>}
    </section>
  );
}

function ListeningQuestions({ questions }: Pick<VoaListeningClip, "questions">) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const firstChoice = useRef<HTMLInputElement>(null);
  const ready = questions.every((_, index) => answers[index] !== undefined);
  const score = questions.filter((question, index) => answers[index] === question.correct).length;

  return (
    <section className="camp-reader-text camp-listening-questions" aria-labelledby="listening-questions">
      <h3 id="listening-questions" className="font-display text-lg font-bold">Check your understanding</h3>
      <form onSubmit={event => {
        event.preventDefault();
        if (ready) setChecked(true);
      }}>
        <div className="camp-listening-question-grid">
          {questions.map((question, index) => (
            <fieldset key={question.prompt} disabled={checked}>
              <legend>{index + 1}. {question.prompt}</legend>
              <div className="camp-listening-options">
                {question.choices.map((choice, choiceIndex) => {
                  const selected = answers[index] === choiceIndex;
                  const outcome = checked && (choiceIndex === question.correct ? "correct" : selected ? "incorrect" : undefined);
                  return (
                    <label key={choice} data-selected={selected} data-outcome={outcome || undefined}>
                      <input
                        ref={index === 0 && choiceIndex === 0 ? firstChoice : undefined}
                        type="radio" name={`listening-question-${index}`} value={choiceIndex}
                        checked={selected}
                        onChange={() => setAnswers(previous => ({ ...previous, [index]: choiceIndex }))}
                      />
                      <span>{choice}</span>
                    </label>
                  );
                })}
              </div>
              <div aria-live="polite">
                {checked && (
                  <p className="camp-listening-feedback">
                    <strong>{answers[index] === question.correct ? "Correct." : "Not quite."}</strong> {question.feedback}
                  </p>
                )}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="camp-listening-question-actions">
          {checked ? (
            <Button type="button" variant="outline" onClick={() => {
              setAnswers({});
              setChecked(false);
              requestAnimationFrame(() => firstChoice.current?.focus());
            }}>
              <RotateCcw size={16} aria-hidden="true" />
              Try again
            </Button>
          ) : (
            <Button type="submit" disabled={!ready}>Check answers</Button>
          )}
          <span role="status">{checked ? `${score} of ${questions.length} correct` : ""}</span>
        </div>
      </form>
    </section>
  );
}

export function VocabularyListening({ onOpenBank }: { onOpenBank: () => void }) {
  const [level, setLevel] = useState("all");
  const [selected, setSelected] = useState<VoaListeningClip | null>(null);
  const returnTo = useRef<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (selected) {
      heading.current?.focus({ preventScroll: true });
      document.getElementById("listening-clip-detail")?.scrollIntoView({ block: "start" });
    } else if (returnTo.current) {
      document.getElementById(returnTo.current)?.focus();
      returnTo.current = null;
    }
  }, [selected]);

  if (selected) {
    return (
      <article id="listening-clip-detail" className="camp-article-reader scroll-mt-24">
        <BackButton onClick={() => setSelected(null)}>Back to listening</BackButton>
        <header className="camp-article-heading">
          <div>
            <p className="camp-article-meta">{selected.level} · {selected.topic}</p>
            <h2 ref={heading} tabIndex={-1}>{selected.title}</h2>
            <p>{selected.description}</p>
          </div>
        </header>
        <ClipPlayer key={selected.id} clip={selected} />
        <ListeningQuestions key={selected.id} questions={selected.questions} />
        {selected.transcriptExcerpt && (
          <details className="camp-reader-text">
            <summary className="cursor-pointer font-semibold">Transcript excerpt</summary>
            <p className="mt-3 whitespace-pre-line">{selected.transcriptExcerpt}</p>
            <a className="mt-3 inline-block underline" href={voaArticleUrl(selected.articleId)} target="_blank" rel="noreferrer">
              Read the conversation on VOA
            </a>
          </details>
        )}
        <section className="camp-reader-vocabulary" aria-labelledby="listening-words">
          <h3 id="listening-words">Words and phrases</h3>
          <div>
            {selected.words.map(entry => (
              <div key={entry.word} className="camp-reader-vocab-item">
                <h4>{entry.word}</h4>
                <p dir="rtl" lang="ar">{entry.arabic}</p>
                <p>{entry.example}</p>
                <AddToVocabButton
                  de={entry.word} en={entry.arabic} category={selected.topic}
                  details={{ example: entry.example, translationKind: "word" }}
                />
              </div>
            ))}
          </div>
          <button type="button" className="camp-bank-link mt-3" onClick={onOpenBank}>Open My Bank →</button>
        </section>
      </article>
    );
  }

  const clips = level === "all" ? VOA_LISTENING : VOA_LISTENING.filter(clip => clip.level === level);
  return (
    <section className="camp-learning-library-group" aria-labelledby="listening-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="listening-heading" className="font-display text-lg font-bold">Everyday listening</h2>
        <SelectField aria-label="Listening level" value={level} onValueChange={setLevel}>
          <option value="all">All levels</option>
          {LISTENING_LEVELS.map(item => <option key={item} value={item}>{item}</option>)}
        </SelectField>
      </div>
      <div className="camp-trainer-grid">
        {clips.map(clip => (
          <button
            type="button" key={clip.id} id={`listening-${clip.id}`} className="camp-learning-library-card"
            onClick={() => {
              returnTo.current = `listening-${clip.id}`;
              setSelected(clip);
            }}
          >
            <span className="camp-library-card-icon"><LearningArt name="Headphones" size={23} /></span>
            <span className="camp-library-card-copy">
              <strong>{clip.title}</strong>
              <span>{clip.level} · {clip.topic} · {clock(Math.round(clip.seconds))}</span>
            </span>
            <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
