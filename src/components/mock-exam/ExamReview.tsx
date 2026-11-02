"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { Button as ControlButton } from "@/components/ui/shadcn/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Mic, PenTool, Trophy } from "lucide-react";
import type { ExamPaper } from "@/data/mock-exams/types";
import {
  availableSections,
  questionMarks,
  recordingKey,
  resultFor,
  type ExamAttempt,
} from "@/lib/mockExam";
import {
  card,
  primaryButton,
  secondaryButton,
  smallClass,
  titleClass,
  StimulusVisual,
} from "./ExamElements";
import { ExamAudio } from "./ExamAudio";
import { ExamRecorder } from "./ExamRecorder";

export function downloadAttempt(state: ExamAttempt) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `englishcamp-${state.certification}-${state.id}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function ExamReview({
  paper,
  attempt,
  onReturn,
}: {
  paper: ExamPaper;
  attempt: ExamAttempt;
  onReturn: () => void;
}) {
  const [tab, setTab] = useState("overview");
  const result = resultFor(paper, attempt);
  const earned =
    result.reading.earned +
    result.useOfEnglish.earned +
    result.listening.earned +
    result.sentenceBuilding.earned;
  const possible =
    result.reading.possible +
    result.useOfEnglish.possible +
    result.listening.possible +
    result.sentenceBuilding.possible;
  const sections =
    tab === "reading"
      ? availableSections(paper, attempt, "reading", true)
      : availableSections(paper, attempt, "listening", true);
  const written = paper.writing.filter(
    (w) => !w.choiceGroup || w.id === attempt.choice,
  );
  const resources =
    paper.id === "toefl-ibt"
      ? [
          [
            "ETS: current task families and timing",
            "https://www.ets.org/toefl/test-takers/ibt/about/content.html",
          ],
          [
            "ETS: current full-length practice test",
            "https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf",
          ],
          [
            "TST Prep: 2026 listening explanation (external video)",
            "https://www.youtube.com/watch?v=C0_sud-fw0k",
          ],
        ]
      : paper.id === "b2-first"
        ? [
            [
              "Cambridge: official preparation and sample papers",
              "https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/",
            ],
            [
              "Cambridge: paired speaking demonstration (external video)",
              "https://www.youtube.com/watch?v=EdeZp0n0JHw",
            ],
            [
              "Cambridge: examiner comments on that demonstration",
              "https://www.cambridgeenglish.org/images/173977-cambridge-english-first-speaking-test-examiner-comments.pdf",
            ],
          ]
        : [
            [
              "IELTS: official sample questions",
              "https://ielts.org/take-a-test/preparation-resources/sample-test-questions",
            ],
            [
              "British Council: how IELTS is assessed",
              "https://takeielts.britishcouncil.org/results/how-is-ielts-assessed",
            ],
          ];
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[var(--radius-lg)] p-8 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #065f46 0%, #064e3b 50%, #281239 100%)",
          boxShadow: "0 10px 30px rgba(6, 95, 70, 0.3)",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-pill)] bg-white/10 text-xs font-display font-bold tracking-wider uppercase text-emerald-200">
              <LearningArt name="Trophy" size={14} className="w-3.5 h-3.5" /> Practice report
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
              {paper.title} {attempt.finishedAt ? "Results" : "Archived draft"}
            </h1>
            <p className="text-emerald-100 text-sm max-w-xl">
              Original practice material. Objective answers are checked against
              the key. Writing and speaking await assessment; an overall
              certification score is not available.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[var(--radius-lg)] p-6 text-center min-w-[200px]">
            <div className="text-xs uppercase font-display font-bold tracking-widest text-emerald-200">
              Objective marks
            </div>
            <div className="font-display text-5xl font-black text-white my-1">
              {earned}
              <span className="text-xl"> / {possible}</span>
            </div>
            <div className="text-xs font-bold text-emerald-200">
              Form {paper.form} · Content {paper.version}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Listening",
            icon: Headphones,
            value: `${result.listening.earned} / ${result.listening.possible}`,
            note: `${result.listening.answered} answered of ${result.listening.items}`,
            colour: "border-t-blue-500",
          },
          {
            label: "Reading",
            icon: BookOpen,
            value: `${result.reading.earned} / ${result.reading.possible}`,
            note: result.useOfEnglish.possible
              ? `Use of English: ${result.useOfEnglish.earned} / ${result.useOfEnglish.possible}`
              : `${result.reading.answered} answered of ${result.reading.items}`,
            colour: "border-t-emerald-500",
          },
          {
            label: "Writing",
            icon: PenTool,
            value: "Unassessed",
            note: result.sentenceBuilding.possible
              ? `Sentence building: ${result.sentenceBuilding.earned} / ${result.sentenceBuilding.possible}`
              : `${result.writing.filter((w) => w.words > 0).length} / ${written.length} responses written`,
            colour: "border-t-purple-500",
          },
          {
            label: "Speaking",
            icon: Mic,
            value: "Unassessed",
            note: `${result.speakingRecorded} / ${paper.speaking.length} recordings saved`,
            colour: "border-t-rose-500",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 text-center space-y-1 border border-[var(--color-border-default)] border-t-4 ${item.colour}`}
          >
            <LearningArt name={item.icon.displayName || "book"} size={20} className="w-5 h-5 mx-auto text-[var(--color-primary)]" />
            <div className={smallClass}>{item.label}</div>
            <div className="font-display text-lg sm:text-2xl font-extrabold text-[var(--color-text-primary)] break-words">
              {item.value}
            </div>
            <div className="text-[11px] text-[var(--color-text-disabled)] font-body">
              {item.note}
            </div>
          </div>
        ))}
      </div>
      <div className={card}>
        <h2 className={titleClass}>What these results mean</h2>
        <p className={smallClass}>
          These are marks on this original paper, not validated IELTS bands, ETS
          bands or Cambridge English Scale scores. Empty answers earn zero.
          Productive skills are never inferred from reading or listening.
        </p>
        {paper.id === "toefl-ibt" && (
          <p className={smallClass}>
            Reading follow-up: {attempt.branches.reading || "not reached"}.
            Listening follow-up: {attempt.branches.listening || "not reached"}.
            If you submitted before a follow-up was selected, the counts include
            only the router; this is a partial paper.
          </p>
        )}
        {paper.notices.map((n) => (
          <p key={n} className={smallClass}>
            {n}
          </p>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border-default)] pb-2">
          {["overview", "listening", "reading", "writing", "speaking"].map(
            (value) => (
              <ControlButton variant="unstyled" size="unstyled"
                key={value}
                className={`px-3 py-1 rounded-[var(--radius-md)] text-xs font-display font-bold ${tab === value ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "text-[var(--color-text-secondary)]"}`}
                onClick={() => setTab(value)}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </ControlButton>
            ),
          )}
        </div>
        {(tab === "listening" || tab === "reading") &&
          sections.map((section) => (
            <section key={section.id} className={card}>
              <h2 className={titleClass}>{section.title}</h2>
              {section.segments && (
                <>
                  <ExamAudio
                    id={section.id}
                    progress={{ completed: 0, offset: 0 }}
                    onProgress={() => {}}
                    review
                  />
                  <details>
                    <summary className="cursor-pointer text-sm font-bold">
                      Original audio transcript
                    </summary>
                    <div className="space-y-2 pt-3">
                      {section.segments.map((turn, i) => (
                        <p key={i} className={smallClass}>
                          <strong>{turn.role}:</strong> {turn.text}
                        </p>
                      ))}
                    </div>
                  </details>
                </>
              )}
              {section.passage && (
                <details>
                  <summary className="cursor-pointer text-sm font-bold">
                    Read the passage
                  </summary>
                  <p className="font-body text-sm whitespace-pre-line leading-relaxed pt-3">
                    {section.passage}
                  </p>
                </details>
              )}
              {section.visual && <StimulusVisual visual={section.visual} />}
              <div className="space-y-3">
                {section.questions.map((q) => {
                  const marks = questionMarks(q, attempt.answers[q.id] || "");
                  return (
                    <div
                      key={q.id}
                      className="border-t border-[var(--color-border-default)] pt-3 space-y-1"
                    >
                      <p className="font-display text-sm font-bold">
                        {q.number}. {q.prompt}
                      </p>
                      <p className={smallClass}>
                        Your answer: {attempt.answers[q.id] || "No answer"} ·{" "}
                        {marks}/{q.marks} marks
                      </p>
                      <p className={smallClass}>
                        <strong>Accepted:</strong> {q.answers.join(" / ")}
                      </p>
                      <p className={smallClass}>
                        <strong>Evidence:</strong> {q.evidence}
                      </p>
                      <p className={smallClass}>
                        {q.explanation !== q.evidence ? q.explanation : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        {tab === "writing" && (
          <>
            {paper.sentenceBuilding && (
              <section className={card}>
                <h2 className={titleClass}>Build a Sentence</h2>
                {paper.sentenceBuilding.map((q) => (
                  <div
                    key={q.id}
                    className="space-y-1 border-t border-[var(--color-border-default)] pt-3"
                  >
                    <p className={smallClass}>
                      Your sentence: {attempt.answers[q.id] || "No answer"} ·{" "}
                      {questionMarks(q, attempt.answers[q.id] || "")}/{q.marks}
                    </p>
                    <p className={smallClass}>
                      Accepted: {q.answers.join(" / ")}
                    </p>
                  </div>
                ))}
              </section>
            )}
            {written.map((w) => (
              <section key={w.id} className={card}>
                <h2 className={titleClass}>{w.title} · Unassessed</h2>
                <p className="font-body text-sm whitespace-pre-line">
                  {w.instructions}
                </p>
                {w.visual && <StimulusVisual visual={w.visual} />}
                <h3 className="font-display font-bold text-sm">
                  Your response
                </h3>
                <p className="font-body text-sm whitespace-pre-line">
                  {attempt.writing[w.id] || "No written response submitted."}
                </p>
                <details>
                  <summary className="cursor-pointer font-display font-bold text-sm">
                    Illustrative response and assessment criteria
                  </summary>
                  <p className="font-body text-sm whitespace-pre-line pt-3">
                    {w.model}
                  </p>
                  <p className={smallClass}>{w.analysis}</p>
                  <ul className="list-disc pl-5 space-y-2 mt-3">
                    {w.rubric.map((r) => (
                      <li key={r} className={smallClass}>
                        {r}
                      </li>
                    ))}
                  </ul>
                </details>
              </section>
            ))}
          </>
        )}
        {tab === "speaking" &&
          paper.speaking.map((task) => (
            <section key={task.id} className={card}>
              <h2 className={titleClass}>{task.title}</h2>
              {task.visual && <StimulusVisual visual={task.visual} />}
              <p className={smallClass}>{task.instructions}</p>
              {task.stimulus && (
                <>
                  <p className={smallClass}>
                    {task.stimulus.map((s) => s.text).join(" ")}
                  </p>
                  <ExamAudio
                    id={task.id}
                    progress={{ completed: 0, offset: 0 }}
                    onProgress={() => {}}
                    review
                  />
                </>
              )}
              {task.prompts.map((p) => (
                <p key={p} className={smallClass}>
                  {p}
                </p>
              ))}
              <ExamRecorder
                task={task}
                storageKey={recordingKey(attempt, task.id)}
                onSaved={() => {}}
                onBusy={() => {}}
                review
              />
              <details>
                <summary className="cursor-pointer font-bold text-sm">
                  Illustrative response and rubric
                </summary>
                <p className="font-body text-sm whitespace-pre-line pt-3">
                  {task.model}
                </p>
                <p className={smallClass}>{task.analysis}</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  {task.rubric.map((r) => (
                    <li key={r} className={smallClass}>
                      {r}
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          ))}
        {tab === "overview" && (
          <div className={card}>
            <h2 className={titleClass}>Review and next steps</h2>
            <p className={smallClass}>
              Use the listening and reading tabs to compare each answer with its
              supporting evidence. Review written responses and replay your
              recordings with an assessor.
            </p>
            {paper.id.startsWith("ielts-") && (
              <p className={smallClass}>
                IELTS Writing Task 2 has twice the weight of Task 1. A sample
                response does not establish an awarded band.
              </p>
            )}
            {paper.id === "b2-first" && (
              <p className={smallClass}>
                For B2 First, a partner or tutor is needed to assess interactive
                communication. The Cambridge video below is a demonstration with
                separate examiner comments, rather than a perfect model to copy.
              </p>
            )}
            <p className={smallClass}>
              External videos are optional review resources and do not run
              inside a timed paper.
            </p>
            <ul className="space-y-2">
              {resources.map(([label, href]) => (
                <li key={href}>
                  <a
                    className="text-sm text-[var(--color-text-link)] underline"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className={smallClass}>
              {paper.provenance.rights} {paper.provenance.status}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <ControlButton variant="unstyled" size="unstyled" className={primaryButton} onClick={onReturn}>
          Back to exam selection
        </ControlButton>
        <ControlButton variant="unstyled" size="unstyled"
          className={secondaryButton}
          onClick={() => downloadAttempt(attempt)}
        >
          Download responses
        </ControlButton>
      </div>
    </div>
  );
}
