"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, GraduationCap, XCircle } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { ROUTE_PHASES, ROUTE_COMPONENT_LABEL, ROUTE_EXAMS } from "@/lib/sixMonthRouteData";
import { routeLessonExerciseId, type RouteLesson } from "@/data/route-lessons";
import { useProgress } from "@/store/useProgress";

const XP = 25;

/** A route lesson: learn, examples, exam focus, five checked questions and a task with a checklist. */
export function RouteLessonView({ lesson }: { lesson: RouteLesson }) {
  const key = routeLessonExerciseId(lesson.id);
  const done = useProgress(s => !!s.exercisesDone[key]), completeExercise = useProgress(s => s.completeExercise);
  const [answers, setAnswers] = useState<(number | null)[]>(() => lesson.practice.map(() => null));
  const [checked, setChecked] = useState(false), [ticks, setTicks] = useState<boolean[]>(() => lesson.task.checklist.map(() => false)), [earned, setEarned] = useState<number | null>(null);
  const phase = ROUTE_PHASES[lesson.phase - 1], exam = ROUTE_EXAMS[lesson.target];
  const score = lesson.practice.filter((item, i) => answers[i] === item.answer).length, allAnswered = answers.every(a => a !== null);

  return (
    <article className="camp-route-lesson">
      <header className="camp-route-lesson-head">
        <Link href="/study-plan" className="camp-route-back"><ArrowLeft size={16} aria-hidden="true" />My study plan</Link>
        <p className="camp-route-eyebrow">{exam.name} route · Month {lesson.phase}: {phase.title} · {lesson.level}</p>
        <h1>{lesson.title}</h1>
        <div className="camp-route-lesson-meta">
          <span><Clock size={14} aria-hidden="true" />{lesson.minutes} min</span>
          <span data-component={lesson.component}>{ROUTE_COMPONENT_LABEL[lesson.component]}</span>
          {done && <span data-done="true"><CheckCircle2 size={14} aria-hidden="true" />Completed</span>}
        </div>
        <p className="camp-route-cando"><b>Goal</b>{lesson.canDo}</p>
      </header>

      <section className="camp-route-lesson-card" aria-labelledby="rl-learn">
        <h2 id="rl-learn">Learn</h2>
        {lesson.learn.map(text => <p key={text}>{text}</p>)}
        <h3>Examples</h3>
        <ul className="camp-route-examples">
          {lesson.examples.map(e => <li key={e.text}><SpeakerButton text={e.text} /><span>{e.text}</span>{e.note && <small>{e.note}</small>}</li>)}
        </ul>
      </section>

      {lesson.exam && (
        <section className="camp-route-lesson-card camp-route-exam-focus" aria-labelledby="rl-exam">
          <h2 id="rl-exam"><GraduationCap size={18} aria-hidden="true" />Exam focus · {exam.name}</h2>
          <p>{lesson.exam}</p>
          <a href={exam.href} target="_blank" rel="noreferrer">Official exam format ↗</a>
        </section>
      )}

      <section className="camp-route-lesson-card" aria-labelledby="rl-practice">
        <h2 id="rl-practice">Practice</h2>
        <ol className="camp-route-quiz">
          {lesson.practice.map((item, i) => {
            const chosen = answers[i], right = chosen === item.answer;
            return (
              <li key={item.prompt}>
                <fieldset>
                  <legend>{item.prompt}</legend>
                  <div>
                    {item.options.map((option, k) => (
                      <label key={option} data-state={checked && k === item.answer ? "right" : checked && k === chosen ? "wrong" : undefined}>
                        <input type="radio" name={`q${i}`} checked={chosen === k} disabled={checked} onChange={() => setAnswers(a => a.map((v, j) => (j === i ? k : v)))} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {checked && <p className="camp-route-why" data-right={right}>{right ? <CheckCircle2 size={15} aria-hidden="true" /> : <XCircle size={15} aria-hidden="true" />}<span><b>{right ? "Correct." : `Answer: ${item.options[item.answer]}.`}</b> {item.why}</span></p>}
                </fieldset>
              </li>
            );
          })}
        </ol>
        <div className="camp-route-quiz-actions" role="status">
          {checked ? <><strong>{score} / {lesson.practice.length} correct</strong><Button variant="outline" onClick={() => { setChecked(false); setAnswers(lesson.practice.map(() => null)); }}>Try again</Button></>
            : <Button disabled={!allAnswered} onClick={() => setChecked(true)}>Check answers</Button>}
          {!checked && !allAnswered && <span>Answer all {lesson.practice.length} questions to check.</span>}
        </div>
      </section>

      <section className="camp-route-lesson-card" aria-labelledby="rl-task">
        <h2 id="rl-task">Your turn</h2>
        <p>{lesson.task.prompt}</p>
        <fieldset className="camp-route-checklist"><legend>Check your work</legend>
          {lesson.task.checklist.map((text, i) => <label key={text}><input type="checkbox" checked={ticks[i]} onChange={e => setTicks(t => t.map((v, j) => (j === i ? e.target.checked : v)))} /><span>{text}</span></label>)}
        </fieldset>
        <div className="camp-route-links"><Link href="/writing">Write it in Writing practice</Link><Link href="/english-coach">Say it to the English coach</Link></div>
      </section>

      <footer className="camp-route-lesson-done">
        {done || earned !== null
          ? <p role="status"><CheckCircle2 size={18} aria-hidden="true" />{earned ? `Lesson complete · +${earned} XP` : "Lesson complete"}. <Link href="/study-plan">Back to my plan</Link></p>
          : <><Button disabled={!checked || !ticks.every(Boolean)} onClick={() => setEarned(completeExercise(key, XP))}>Mark lesson complete · +{XP} XP</Button><span>{!checked ? "Check the practice answers first." : !ticks.every(Boolean) ? "Tick the checklist when your task is done." : ""}</span></>}
      </footer>
    </article>
  );
}
