"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { AddToVocabButton } from "@/components/ui/AddToVocabButton";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { ComprehensionQuiz } from "./ComprehensionQuiz";
import { CEFR_LABELS, readingMinutes, type ReadingLesson } from "@/data/reading-lessons";
import { articleTokens } from "@/lib/readingAudio";
import { lookupWord } from "@/lib/vocabularyLookup";
import { readingExerciseId, skillLessonXp } from "@/lib/comprehension";
import { useProgress } from "@/store/useProgress";
import { useSkillPractice } from "@/store/useSkillPractice";

type Selection = { text: string; paragraph: number; index: number; top: number; left: number };

/**
 * Text-only reading lesson. Learners can look up single words; the passage is never
 * translated as a whole and no audio controls are offered here.
 */
export function ReadingLessonView({ lesson, onBack, onOpenBank }: { lesson: ReadingLesson; onBack: () => void; onOpenBank: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null), popoverRef = useRef<HTMLDivElement>(null), heading = useRef<HTMLHeadingElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [focused, setFocused] = useState(0);
  const paragraphs = useMemo(() => articleTokens(lesson.paragraphs.map(en => ({ en }))), [lesson]);
  const wordCount = useMemo(() => paragraphs.flat().filter(t => t.index >= 0).length, [paragraphs]);
  const details = selection ? lookupWord(selection.text, lesson, selection.paragraph) : null;
  const key = readingExerciseId(lesson.id) as `reading:${string}`;
  const done = useProgress(state => !!state.exercisesDone[key]);
  const completeExercise = useProgress(state => state.completeExercise);
  const practice = useSkillPractice(state => state.lessons[key]);
  const start = useSkillPractice(state => state.start), recordAttempt = useSkillPractice(state => state.recordAttempt);

  useEffect(() => { start(key); heading.current?.focus({ preventScroll: true }); }, [key, start]);
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

  return (
    <article className="camp-article-reader camp-read-lesson">
      <BackButton onClick={onBack}>Back to reading</BackButton>
      <header className="camp-article-heading">
        <div>
          <p className="camp-article-meta">{CEFR_LABELS[lesson.level]} · {lesson.category} · {readingMinutes(lesson)} min read</p>
          <h2 ref={heading} tabIndex={-1}>{lesson.title}</h2>
          <p>Read the passage in English. Tap or select any word to see its Arabic meaning, then answer the questions.</p>
          {done && <p className="camp-lesson-complete"><CheckCircle2 size={16} aria-hidden="true" /> Completed{practice?.total ? ` · best ${practice.best}/${practice.total}` : ""}</p>}
        </div>
        <ReadingIllustration article={{ id: lesson.id, category: lesson.category as never }} />
      </header>
      <div ref={bodyRef} className="camp-reader-text camp-read-passage" lang="en">
        <p className="camp-read-hint">{wordCount} words · Use Tab to reach the text, arrow keys to move between words and Enter to look one up.</p>
        {paragraphs.map((tokens, p) => (
          <section key={p} aria-label={`Paragraph ${p + 1}`}>
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
      {lesson.questions.length > 0 ? (
        <ComprehensionQuiz
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
    </article>
  );
}
