"use client";
import { LearningArt } from "@/components/brand/LearningArt";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, RefreshCw, Sparkles, X, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { PracticeCard } from "@/components/ui/PracticeSurface";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { translationQuestion, translationSession, validTranslation, type TranslationDirection, type TranslationEntry } from "@/lib/translationPractice";

type Props = { entries: readonly TranslationEntry[]; title: string; description: string; icon: LucideIcon; groups?: { id: string; label: string }[]; startLabel?: string };

export function TranslationPractice({ entries, title, description, icon: Icon, groups, startLabel = "Start Practice" }: Props) {
  const addXP = useProgress(state => state.addXP);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [direction, setDirection] = useState<TranslationDirection>("ar");
  const [group, setGroup] = useState("all");
  const [items, setItems] = useState<TranslationEntry[]>([]);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const answered = useRef(false), awarded = useRef(false);
  const pool = useMemo(() => entries.filter(item => validTranslation(item) && (group === "all" || item.groupId === group)), [entries, group]);
  const current = items[index];
  const question = useMemo(() => current ? translationQuestion(current, pool, direction) : null, [current, pool, direction]);

  function start() {
    setItems(translationSession(pool, direction)); setIndex(0); setScore(0); setSelected(null);
    answered.current = false; awarded.current = false; setPhase("playing");
  }
  function choose(option: string) {
    if (answered.current || !question) return;
    answered.current = true; setSelected(option);
    if (question.accepted.includes(option)) { setScore(value => value + 10); playCorrect(); } else playWrong();
  }
  function next() {
    if (!answered.current || awarded.current) return;
    if (index + 1 === items.length) {
      awarded.current = true; addXP(score + (score >= 80 ? 20 : 0)); playXP(); setPhase("done");
    } else { setIndex(value => value + 1); setSelected(null); answered.current = false; }
  }

  if (phase === "ready") return <PracticeCard data-practice-surface="intro" className="translation-intro">
    <div className="translation-intro-heading"><span><LearningArt name={Icon.displayName || "book"} size={22} /></span><div><h2>{title}</h2><p>{description}</p></div></div>
    <div className="translation-directions" aria-label="Translation direction">
      <Button variant="unstyled" disabled={!ready} onClick={() => setDirection("ar")} aria-pressed={direction === "ar"} className={direction === "ar" ? "selected" : ""}>AR → EN</Button>
      <Button variant="unstyled" disabled={!ready} onClick={() => setDirection("en")} aria-pressed={direction === "en"} className={direction === "en" ? "selected" : ""}>EN → AR</Button>
    </div>
    {groups && <div className="translation-groups" aria-label="Dialogue selection"><Button variant="ghost" aria-pressed={group === "all"} onClick={() => setGroup("all")}>All</Button>{groups.map(item => <Button key={item.id} variant="ghost" aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.label}</Button>)}</div>}
    <Button className="camp-action" onClick={start} disabled={!ready || pool.length < 4}>{startLabel}<ArrowRight size={15} /></Button>
  </PracticeCard>;

  if (phase === "done") return <PracticeCard data-practice-surface="result" className="translation-result">
    <span className="translation-result-icon"><Check size={24} /></span><h2>Session Complete!</h2>
    <div className="translation-result-stats"><div><strong>{score}<small>/{items.length * 10}</small></strong><span>Points</span></div><div><strong>{Math.round(score / (items.length * 10) * 100)}%</strong><span>Accuracy</span></div></div>
    <p className="translation-xp"><LearningArt name="Sparkles"  /> +{score + (score >= 80 ? 20 : 0)} XP</p>
    <Button className="camp-action" onClick={() => setPhase("ready")}><RefreshCw size={15} />New Session</Button>
  </PracticeCard>;

  if (!current || !question) return null;
  return <div className="translation-session">
    <div className="translation-session-meta"><span>Question {index + 1} of {items.length}</span><span><LearningArt name="Sparkles" size={14}  /> {score} points</span></div>
    <div className="translation-progress" role="progressbar" aria-label="Session progress" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={index + (selected === null ? 0 : 1)}><div style={{ width: `${(index + (selected === null ? 0 : 1)) / items.length * 100}%` }} /></div>
    <PracticeCard data-practice-surface="question" className="translation-question">
      <div className="translation-topic">{current.topic}</div>
      <p className="translation-instruction">{direction === "ar" ? "Translate this Arabic text into English" : "Translate this English text into Arabic"}</p>
      {current.speaker && <p className="translation-speaker">{current.speaker}</p>}
      <p className={`translation-prompt ${direction === "ar" ? "font-arabic" : ""}`} lang={direction} dir={direction === "ar" ? "rtl" : "ltr"}>{question.prompt}</p>
      <div className="translation-options">
        {question.options.map((option, i) => {
          const correct = selected !== null && question.accepted.includes(option);
          const wrong = selected === option && !correct;
          return <Button key={option} variant="unstyled" disabled={selected !== null} onClick={() => choose(option)} className={`translation-option disabled:opacity-100 ${correct ? "correct" : wrong ? "wrong" : ""}`}>
            <span className="translation-option-number" aria-hidden="true">{i + 1}</span>
            <span className={direction === "en" ? "font-arabic" : ""} lang={direction === "ar" ? "en" : "ar"} dir={direction === "ar" ? "ltr" : "rtl"}>{option}</span>
            {correct && <Check size={17} aria-label="Correct answer" />}{wrong && <X size={17} aria-label="Incorrect answer" />}
          </Button>;
        })}
      </div>
      {selected !== null && <div className="translation-question-footer"><Button className="camp-action" onClick={next}>{index + 1 === items.length ? "See results" : "Next"}<ArrowRight size={15} /></Button></div>}
    </PracticeCard>
  </div>;
}
