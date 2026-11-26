"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, X } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";
import { AddToVocabButton } from "@/components/ui/AddToVocabButton";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { ComprehensionQuiz } from "./ComprehensionQuiz";
import { CEFR_LABELS, readingMinutes, type ReadingLesson } from "@/data/reading-lessons";
import { articleTokens } from "@/lib/readingAudio";
import { loadVocabularyBank, lookupWord } from "@/lib/vocabularyLookup";
import { readingExerciseId, skillLessonXp } from "@/lib/comprehension";
import { useProgress } from "@/store/useProgress";
import { useSkillPractice } from "@/store/useSkillPractice";

type Selection = { text: string; paragraph: number; index: number; top: number; left: number };
type TextSize = "m" | "l" | "xl";
const SIZE_KEY = "camp-read-text-size";
const SIZES: { value: TextSize; label: string; name: string }[] = [{ value: "m", label: "A", name: "Normal text" }, { value: "l", label: "A+", name: "Large text" }, { value: "xl", label: "A++", name: "Extra large text" }];

/**
 * Text-only reading lesson. Learners can look up single words; the passage is never
 * translated as a whole and no audio controls are offered here.
 */
export function ReadingLessonView({ lesson, onBack, onOpenBank, position, previous, next, onOpen }: {
  lesson: ReadingLesson; onBack: () => void; onOpenBank: () => void;
  position?: { index: number; total: number }; previous?: ReadingLesson; next?: ReadingLesson; onOpen?: (id: string) => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null), popoverRef = useRef<HTMLDivElement>(null), heading = useRef<HTMLHeadingElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [focused, setFocused] = useState(0);
  const [, setBankReady] = useState(false);
  const [size, setSize] = useState<TextSize>("m");
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const [inQuestions, setInQuestions] = useState(false);
  const [looked, setLooked] = useState<{ word: string; meaning: string }[]>([]);
  useEffect(() => { let live = true; loadVocabularyBank().then(() => { if (live) setBankReady(true); }, () => {}); return () => { live = false; }; }, []);
  const paragraphs = useMemo(() => articleTokens(lesson.paragraphs.map(en => ({ en }))), [lesson]);
  const wordCount = useMemo(() => paragraphs.flat().filter(t => t.index >= 0).length, [paragraphs]);
  const details = selection ? lookupWord(selection.text, lesson, selection.paragraph) : null;
  const key = readingExerciseId(lesson.id) as `reading:${string}`;
  const done = useProgress(state => !!state.exercisesDone[key]);
  const completeExercise = useProgress(state => state.completeExercise);
  const practice = useSkillPractice(state => state.lessons[key]);
  const start = useSkillPractice(state => state.start), recordAttempt = useSkillPractice(state => state.recordAttempt);

  useEffect(() => { start(key); heading.current?.focus({ preventScroll: true }); }, [key, start]);
  useEffect(() => { try { const saved = localStorage.getItem(SIZE_KEY); if (saved === "l" || saved === "xl") setSize(saved); } catch { /* storage unavailable */ } }, []);
  const chooseSize = (value: TextSize) => { setSize(value); try { localStorage.setItem(SIZE_KEY, value); } catch { /* storage unavailable */ } };
  // Paragraphs count as read once most of them has been on screen; the questions step lights up when it is in view.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || typeof IntersectionObserver === "undefined") return;
    const paragraphsSeen = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).map(entry => Number((entry.target as HTMLElement).dataset.paragraph));
      if (visible.length) setSeen(current => { const nextSeen = new Set(current); visible.forEach(index => nextSeen.add(index)); return nextSeen.size === current.size ? current : nextSeen; });
    }, { threshold: 0.6 });
    body.querySelectorAll("section[data-paragraph]").forEach(section => paragraphsSeen.observe(section));
    const questions = document.getElementById("reading-questions");
    const step = new IntersectionObserver(entries => entries.forEach(entry => setInQuestions(entry.isIntersecting)), { rootMargin: "-40% 0px -40% 0px" });
    if (questions) step.observe(questions);
    return () => { paragraphsSeen.disconnect(); step.disconnect(); };
  }, [lesson.id]);
  useEffect(() => {
    if (!details?.meaning) return;
    setLooked(list => list.some(item => item.word === details.word) ? list : [...list, { word: details.word, meaning: details.meaning! }]);
  }, [details?.word, details?.meaning]);
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });
  useEffect(() => {
    if (!selection) return;
    popoverRef.current?.focus({ preventScroll: true });
    const close = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (!popoverRef.current?.contains(target) && !target.closest?.(".camp-reader-word")) setSelection(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [selection]);

  function closePopover() {
    const index = selection?.index;
    setSelection(null);
    if (index !== undefined) requestAnimationFrame(() => bodyRef.current?.querySelector<HTMLButtonElement>(`[data-word-index="${index}"]`)?.focus());
  }
  function open(button: HTMLButtonElement, text: string, paragraph: number, index: number) {
    if (selection?.index === index) { setSelection(null); return; }
    const box = bodyRef.current!.getBoundingClientRect(), word = button.getBoundingClientRect();
    const width = Math.min(300, box.width - 16);
    setSelection({ text, paragraph, index, top: word.bottom - box.top + 8, left: Math.max(8, Math.min(word.left - box.left, box.width - width - 8)) });
  }

  const total = lesson.paragraphs.length, read = Math.min(seen.size, total);
  return (
    <article className="camp-article-reader camp-read-lesson camp-reader-v2">
      <header className="camp-lesson-head">
        <div className="camp-lesson-crumbs">
          <button type="button" className="camp-reader-back" onClick={onBack}><ArrowLeft size={15} aria-hidden="true" />Reading library</button>
          {position && position.index >= 0 && <span className="camp-reader-position">Passage {position.index + 1} of {position.total}</span>}
        </div>
        <div className="camp-lesson-title-row">
          <div className="min-w-0">
            <span className="camp-lesson-eyebrow">{CEFR_LABELS[lesson.level]} · {lesson.category}</span>
            <h1 ref={heading} tabIndex={-1}>{lesson.title}</h1>
            <p>Read the passage in English. Tap or select any word to see its Arabic meaning, then answer the questions.</p>
            <div className="camp-reader-meta">
              <span><Clock size={13} aria-hidden="true" />{readingMinutes(lesson)} min read</span>
              <span>{wordCount} words</span>
              {lesson.questions.length > 0 && <span>{lesson.questions.length} questions</span>}
              {done && <span data-tone="done" className="camp-lesson-complete"><CheckCircle2 size={14} aria-hidden="true" />Completed{practice?.total ? ` · best ${practice.best}/${practice.total}` : ""}</span>}
            </div>
          </div>
          <div className="camp-lesson-head-actions camp-reader-art"><ReadingIllustration article={{ id: lesson.id, category: lesson.category as never }} /></div>
        </div>
        <div className="camp-lesson-course-progress" role="progressbar" aria-label="Paragraphs read" aria-valuemin={0} aria-valuemax={total} aria-valuenow={read}><span style={{ width: `${total ? read / total * 100 : 0}%` }} /></div>
      </header>
      <nav className="camp-reader-steps" aria-label="Passage steps">
        <button type="button" data-current={!inQuestions} data-done={read === total} onClick={() => jump("reading-passage")}>
          <span className="camp-reader-step-num">{read === total ? <CheckCircle2 size={18} aria-hidden="true" /> : 1}</span>
          <span className="camp-reader-step-copy"><strong>Read the passage</strong><small>{read} of {total} paragraphs read</small></span>
        </button>
        <button type="button" data-current={inQuestions} data-done={done} onClick={() => jump("reading-questions")}>
          <span className="camp-reader-step-num">{done ? <CheckCircle2 size={18} aria-hidden="true" /> : 2}</span>
          <span className="camp-reader-step-copy"><strong>Check understanding</strong><small>{lesson.questions.length ? `${lesson.questions.length} questions` : "Questions coming soon"}{practice?.total ? ` · best ${practice.best}/${practice.total}` : ""}</small></span>
        </button>
      </nav>
      <section id="reading-passage" className="camp-reader-card" aria-labelledby="reading-passage-title">
        <div className="camp-reader-card-head">
          <div>
            <h2 id="reading-passage-title"><LearningArt name="BookOpenText" size={20} />The passage</h2>
            <p>{wordCount} words · tap any word for its meaning</p>
          </div>
          <div className="camp-reader-size" role="group" aria-label="Text size">
            {SIZES.map(option => <button key={option.value} type="button" aria-pressed={size === option.value} aria-label={option.name} onClick={() => chooseSize(option.value)}>{option.label}</button>)}
          </div>
        </div>
      <div ref={bodyRef} className="camp-read-passage" data-size={size} lang="en">
        {paragraphs.map((tokens, p) => (
          <section key={p} aria-label={`Paragraph ${p + 1}`} data-paragraph={p} data-seen={seen.has(p)}>
            <p>{tokens.map((token, t) => token.index < 0 ? <span key={t}>{token.text}</span> : (
              <button type="button" className="camp-reader-word" key={t} data-word-index={token.index}
                data-active={selection?.index === token.index}
                aria-expanded={selection?.index === token.index} aria-controls={selection?.index === token.index ? "reading-word-popover" : undefined}
                tabIndex={focused === token.index ? 0 : -1} aria-label={`Translate ${token.text.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "")}`}
                onFocus={() => setFocused(token.index)}
                onClick={event => open(event.currentTarget, token.text, p, token.index)}
                onKeyDown={event => {
                  if (event.key === "Escape") { setSelection(null); return; }
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const target = Math.max(0, Math.min(wordCount - 1, token.index + (event.key === "ArrowRight" ? 1 : -1)));
                  setFocused(target);
                  bodyRef.current?.querySelector<HTMLButtonElement>(`[data-word-index="${target}"]`)?.focus();
                }}>{token.text}</button>
            ))}</p>
          </section>
        ))}
        {details && selection && (
          <div id="reading-word-popover" ref={popoverRef} role="dialog" aria-label={`Meaning of ${details.word}`} tabIndex={-1}
            className="camp-word-popover" style={{ top: selection.top, left: selection.left }}
            onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); closePopover(); } }}>
            <header>
              <strong lang="en">{details.word}</strong>
              <button type="button" className="camp-word-popover-close" aria-label="Close translation" onClick={closePopover}><X size={16} aria-hidden="true" /></button>
            </header>
            {details.meaning
              ? <p className="camp-word-popover-ar" lang="ar" dir="rtl">{details.meaning}</p>
              : <p className="camp-word-popover-missing">No saved translation for this word yet. Read the sentence again for clues.</p>}
            {details.definition && <p className="camp-word-popover-def" lang="en">{details.definition}</p>}
            {details.meaning && (
              <div className="camp-word-popover-actions">
                <AddToVocabButton de={details.word} en={details.meaning} category={lesson.category} details={{ example: details.example, definition: details.definition, translationKind: "word" }} />
                <button type="button" className="camp-bank-link" onClick={onOpenBank}>My Bank →</button>
              </div>
            )}
          </div>
        )}
      </div>
        <p className="camp-read-hint">Keyboard: Tab reaches the text, arrow keys move between words and Enter looks one up.</p>
        {looked.length > 0 && (
          <div className="camp-reader-looked-wrap">
            <h3 className="font-display text-sm font-bold">Words you looked up</h3>
            <ul className="camp-reader-looked">{looked.map(item => <li key={item.word}><strong lang="en">{item.word}</strong><span lang="ar" dir="rtl">{item.meaning}</span></li>)}</ul>
          </div>
        )}
      </section>
      <div id="reading-questions">
      {lesson.questions.length > 0 ? (
        <ComprehensionQuiz mistakeSource={{ source: "reading", id: lesson.id }}
          key={lesson.id}
          questions={lesson.questions}
          heading="Comprehension Questions"
          intro="Answer from the passage. You can scroll up and reread at any time."
          previousBest={practice ? { best: practice.best, total: practice.total } : undefined}
          onSubmit={(correct, total) => {
            recordAttempt(key, correct, total);
            const xp = completeExercise(key, skillLessonXp(correct, total));
            return { correct, total, xp, firstCompletion: xp > 0 };
          }}
        />
      ) : <p className="camp-reader-text">Questions for this passage are being prepared.</p>}
      </div>
      {(previous || next) && onOpen && (
        <nav aria-label="Passage navigation" className="camp-module-pager">
          {previous ? <button type="button" className="camp-module-pager-link" data-dir="prev" onClick={() => onOpen(previous.id)}><ArrowLeft size={18} aria-hidden="true" /><span><small>Previous · {previous.level}</small><strong>{previous.title}</strong></span></button> : <span />}
          {next && <button type="button" className="camp-module-pager-link" data-dir="next" onClick={() => onOpen(next.id)}><span><small>Next · {next.level}</small><strong>{next.title}</strong></span><ArrowRight size={18} aria-hidden="true" /></button>}
        </nav>
      )}
    </article>
  );
}
