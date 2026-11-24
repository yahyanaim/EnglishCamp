"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { translatedGrammarParagraphs } from "./GrammarTranslation";
import { useState, useEffect, useMemo } from "react";
import { GRAMMAR_EXTENSIONS } from "@/data/grammar-extensions";
import { GRAMMAR_MORE } from "@/data/grammar-reference-more";
import { GRAMMAR_LIBRARY } from "@/data/grammar-reference-library";
import { GRAMMAR_FOUNDATIONS } from "@/data/grammar-foundations";
import { GrammarFoundationLesson } from "./GrammarFoundationLesson";
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Layers, Map as MapIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/store/useProgress";
import { GRAMMAR_CURRICULUM, GRAMMAR_LESSON_LEVELS, GRAMMAR_XP, grammarLessonKey, grammarLevelProgress } from "@/data/grammar-curriculum";

function T({ de, en }: { de: string; en: string }) {
  return <span>{en}</span>;
}

type GrammarLevel = "A1" | "A2" | "B1" | "B2";
type Section = {
  id: string;
  title: string;
  level?: GrammarLevel;
  summary?: string;
  art?: string;
  parts?: number;
  content: React.ReactNode;
};
const LEVELS: GrammarLevel[] = ["A1", "A2", "B1", "B2"];
const LEVEL_NAMES: Record<GrammarLevel, string> = { A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper intermediate" };
/** CEFR level for the hand-written reference sections below. */
const LEGACY_LEVELS: Record<string, GrammarLevel> = { articles: "A1", "present-tenses": "A1", prepositions: "A1", "past-tenses": "A2", "future-tenses": "A2", "modal-verbs": "A2", comparatives: "A2", conditionals: "B1", passive: "B1", "reported-speech": "B2" };
/** One-line card summaries for the hand-written reference sections. */
const LEGACY_SUMMARIES: Record<string, string> = {
  articles: "When to use a, an, the or no article at all, with the most common exceptions.",
  "present-tenses": "Routines and facts vs actions happening now, plus verbs that are rarely continuous.",
  prepositions: "In, on and at for time and place, with a quick table of everyday phrases.",
  "past-tenses": "Past simple, past continuous and past perfect side by side, with signal words.",
  "future-tenses": "Will, going to and the present continuous for plans, predictions and decisions.",
  "modal-verbs": "Can, could, must, should, may and might for ability, advice, obligation and possibility.",
  comparatives: "Comparatives and superlatives: -er/-est, more/most and the irregular forms.",
  conditionals: "Zero, first and second conditionals: real and imagined situations and their results.",
  passive: "Form the passive in every common tense and decide when the doer matters.",
  "reported-speech": "Backshift, time words, reported questions and reported commands.",
};
const FOUNDATION_LEVELS: Record<string, GrammarLevel> = { "singular-and-plural": "A1", "countable-and-uncountable": "A1", "subject-verb-agreement": "A1", "quantities-and-determiners": "A2" };
const asLevel = (level: string): GrammarLevel => (LEVELS as string[]).includes(level) ? level as GrammarLevel : "B2";

const LEGACY_SECTIONS: Section[] = [
  {
    id: "articles",
    title: "Articles (a/an/the)",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          English has two types of articles: definite (<T de="أداة تعريف" en="the" />) and indefinite (<T de="أداة نكرة" en="a/an" />). No article is also common.
        </p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">Usage</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">Rule</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="أداة نكرة" en="Indefinite (a/an)" /></td><td className="px-3 py-2"><strong>a</strong> before consonant sound, <strong>an</strong> before vowel sound</td><td className="px-3 py-2 font-mono"><T de="a book" en="a book" />, <T de="an apple" en="an apple" /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="أداة تعريف" en="Definite (the)" /></td><td className="px-3 py-2">Used for specific things, unique things, or things already mentioned</td><td className="px-3 py-2 font-mono"><T de="the sun" en="the sun" />, <T de="the book I read" en="the book I read" /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="بدون أداة" en="No article" /></td><td className="px-3 py-2">General plural nouns, uncountable nouns, proper nouns</td><td className="px-3 py-2 font-mono"><T de="Water is life." en="Water is life." />, <T de="Cats are cute." en="Cats are cute." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> Use <strong>the</strong> when both speaker and listener know what is being referred to. Use <strong>a/an</strong> when mentioning something for the first time. Do NOT use articles with names of people, most countries, or meals: <T de="I had lunch." en="I had lunch." /> (not &quot;a lunch&quot;).
        </div>
      </div>
    ),
  },
  {
    id: "present-tenses",
    title: "Present Simple vs Present Continuous",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">These two tenses describe the present but are used differently:</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">&nbsp;</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="المضارع البسيط" en="Present Simple" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="المضارع المستمر" en="Present Continuous" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="الاستخدام" en="Usage" /></td><td className="px-3 py-2">Habits, facts, routines, permanent situations</td><td className="px-3 py-2">Actions happening now, temporary situations, future arrangements</td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="التكوين" en="Formation" /></td><td className="px-3 py-2"><span className="font-mono">base verb</span> (add <strong>-s</strong> for he/she/it)</td><td className="px-3 py-2"><span className="font-mono"><T de="am/is/are + verb-ing" en="am/is/are + verb-ing" /></span></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="كلمات دالة" en="Signal words" /></td><td className="px-3 py-2">always, usually, often, sometimes, never, every day</td><td className="px-3 py-2">now, right now, at the moment, today, this week, look!</td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="أمثلة" en="Examples" /></td><td className="px-3 py-2 font-mono"><T de="I drink coffee every day." en="I drink coffee every day." /><br /><T de="She works in a hospital." en="She works in a hospital." /></td><td className="px-3 py-2 font-mono"><T de="I am drinking coffee now." en="I am drinking coffee now." /><br /><T de="She is working this week." en="She is working this week." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> Stative verbs (know, believe, love, hate, want, need) are NOT used in continuous forms. Say <T de="I know the answer." en="I know the answer." /> — NOT &quot;I am knowing the answer.&quot;
        </div>
      </div>
    ),
  },
  {
    id: "past-tenses",
    title: "Past Simple vs Present Perfect",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Both talk about the past, but the key difference is connection to the present:</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">&nbsp;</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الماضي البسيط" en="Past Simple" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="المضارع التام" en="Present Perfect" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="الاستخدام" en="Usage" /></td><td className="px-3 py-2">Finished action in the past at a specific time</td><td className="px-3 py-2">Past action with present relevance, life experience, or unspecified time</td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="التكوين" en="Formation" /></td><td className="px-3 py-2"><span className="font-mono">verb + -ed</span> (or irregular form)</td><td className="px-3 py-2"><span className="font-mono"><T de="has/have + past participle" en="has/have + past participle" /></span></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="كلمات دالة" en="Signal words" /></td><td className="px-3 py-2">yesterday, last week, in 2010, ago, then</td><td className="px-3 py-2">ever, never, already, yet, just, since, for, so far</td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="أمثلة" en="Examples" /></td><td className="px-3 py-2 font-mono"><T de="I visited London last year." en="I visited London last year." /><br /><T de="She bought a new car yesterday." en="She bought a new car yesterday." /></td><td className="px-3 py-2 font-mono"><T de="I have visited London twice." en="I have visited London twice." /><br /><T de="She has already bought a car." en="She has already bought a car." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> If the time is mentioned (yesterday, last week, in 2010), you MUST use Past Simple. If the time is not important or the action continues, use Present Perfect.
        </div>
      </div>
    ),
  },
  {
    id: "future-tenses",
    title: "Future Tenses (will vs going to vs present continuous)",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">English has several ways to talk about the future, with different meanings:</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الزمن" en="Tense" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الاستخدام" en="Usage" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="مثال" en="Example" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="will" en="will + base verb" /></td><td className="px-3 py-2">Spontaneous decisions, promises, predictions without evidence, offers</td><td className="px-3 py-2 font-mono"><T de="I will help you." en="I will help you." /><br /><T de="It will rain tomorrow." en="It will rain tomorrow." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="going to" en="be going to + verb" /></td><td className="px-3 py-2">Plans/intentions, predictions with evidence</td><td className="px-3 py-2 font-mono"><T de="I am going to study medicine." en="I am going to study medicine." /><br /><T de="Look at those clouds! It is going to rain." en="Look at those clouds! It is going to rain." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="المضارع المستمر" en="Present continuous" /></td><td className="px-3 py-2">Fixed future arrangements (usually with a time)</td><td className="px-3 py-2 font-mono"><T de="I am meeting my friends tonight." en="I am meeting my friends tonight." /><br /><T de="She is flying to Cairo next week." en="She is flying to Cairo next week." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="camp-grammar-note bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="will" en="will" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <T de="قرار فوري: I will answer the phone." en="Spontaneous: I will answer the phone." /><br />
              <T de="وعد: I will always love you." en="Promise: I will always love you." /><br />
              <T de="توقع بدون دليل: I think it will rain." en="Prediction without evidence: I think it will rain." />
            </p>
          </div>
          <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="going to" en="going to" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <T de="خطة مسبقة: We are going to buy a house." en="Prior plan: We are going to buy a house." /><br />
              <T de="توقع مع دليل: The sky is dark. It is going to rain." en="Prediction with evidence: The sky is dark. It is going to rain." />
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "conditionals",
    title: "Conditionals (If-clauses)",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Conditional sentences express <T de="شرط ونتيجة" en="a condition and a result" />. There are four main types:</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="النوع" en="Type" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الاستخدام" en="Usage" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الصيغة" en="Pattern" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="مثال" en="Example" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]">Zero</td><td className="px-3 py-2">General truth / scientific fact</td><td className="px-3 py-2 font-mono">If + present simple, present simple</td><td className="px-3 py-2 font-mono"><T de="If you heat ice, it melts." en="If you heat ice, it melts." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]">First</td><td className="px-3 py-2">Real / possible future</td><td className="px-3 py-2 font-mono">If + present simple, will + base verb</td><td className="px-3 py-2 font-mono"><T de="If it rains, I will stay home." en="If it rains, I will stay home." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]">Second</td><td className="px-3 py-2">Unreal / hypothetical present or future</td><td className="px-3 py-2 font-mono">If + past simple, would + base verb</td><td className="px-3 py-2 font-mono"><T de="If I had money, I would travel." en="If I had money, I would travel." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]">Third</td><td className="px-3 py-2">Unreal past (regret)</td><td className="px-3 py-2 font-mono">If + past perfect, would have + past participle</td><td className="px-3 py-2 font-mono"><T de="If I had studied, I would have passed." en="If I had studied, I would have passed." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> In Second Conditional, use <strong>were</strong> for all subjects (not &quot;was&quot;): <T de="If I were you, I would go." en="If I were you, I would go." /> In First Conditional, the if-clause uses present tense, NOT <strong>will</strong>.
        </div>
      </div>
    ),
  },
  {
    id: "passive",
    title: "Passive Voice",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">The passive focuses on the action or the receiver, not the doer:</p>
        <p className="text-sm text-[var(--color-text-secondary)] font-mono"><T de="be (conjugated) + past participle" en="be (conjugated) + past participle" /></p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الزمن" en="Tense" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="مبني للمعلوم" en="Active" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="مبني للمجهول" en="Passive" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="مضارع بسيط" en="Present Simple" /></td><td className="px-3 py-2 font-mono">Someone cleans the room.</td><td className="px-3 py-2 font-mono"><T de="The room is cleaned." en="The room is cleaned." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="ماضي بسيط" en="Past Simple" /></td><td className="px-3 py-2 font-mono">Someone cleaned the room.</td><td className="px-3 py-2 font-mono"><T de="The room was cleaned." en="The room was cleaned." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="مضارع تام" en="Present Perfect" /></td><td className="px-3 py-2 font-mono">Someone has cleaned the room.</td><td className="px-3 py-2 font-mono"><T de="The room has been cleaned." en="The room has been cleaned." /></td></tr>
              <tr><td className="px-3 py-2 font-medium text-[var(--color-text-secondary)]"><T de="مستقبل" en="Future (will)" /></td><td className="px-3 py-2 font-mono">Someone will clean the room.</td><td className="px-3 py-2 font-mono"><T de="The room will be cleaned." en="The room will be cleaned." /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> Use <strong>by</strong> to mention the agent: <T de="The room was cleaned by Mohamed." en="The room was cleaned by Mohamed." /> If the agent is unknown or unimportant, omit it: <T de="My phone was stolen." en="My phone was stolen." />
        </div>
      </div>
    ),
  },
  {
    id: "prepositions",
    title: "Prepositions of Time and Place (in/at/on)",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">The prepositions <strong>in</strong>, <strong>at</strong>, and <strong>on</strong> are used for both time and place in specific ways:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2"><T de="الوقت" en="TIME" /></h4>
            <div className="space-y-1.5">
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">at</strong> — precise time: <span className="font-mono"><T de="at 5 o'clock" en="at 5 o'clock" />, <T de="at midnight" en="at midnight" /></span></p>
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">on</strong> — days/dates: <span className="font-mono"><T de="on Monday" en="on Monday" />, <T de="on March 3rd" en="on March 3rd" /></span></p>
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">in</strong> — months/years/seasons/longer periods: <span className="font-mono"><T de="in July" en="in July" />, <T de="in 2024" en="in 2024" />, <T de="in summer" en="in summer" /></span></p>
            </div>
          </div>
          <div className="camp-grammar-note bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2"><T de="المكان" en="PLACE" /></h4>
            <div className="space-y-1.5">
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">at</strong> — specific point/address: <span className="font-mono"><T de="at the bus stop" en="at the bus stop" />, <T de="at 10 Main St" en="at 10 Main St" /></span></p>
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">on</strong> — surface/street: <span className="font-mono"><T de="on the table" en="on the table" />, <T de="on Oxford Street" en="on Oxford Street" /></span></p>
              <p className="text-xs text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">in</strong> — enclosed space/city/country: <span className="font-mono"><T de="in the room" en="in the room" />, <T de="in Cairo" en="in Cairo" /></span></p>
            </div>
          </div>
          <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)] p-3 md:col-span-2">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2"><T de="استثناءات مهمة" en="Important exceptions" /></h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)]">
              <span><strong className="text-[var(--color-text-primary)]">at night</strong> — <T de="في الليل" en="at night" /></span>
              <span><strong className="text-[var(--color-text-primary)]">at home</strong> — <T de="في المنزل" en="at home" /></span>
              <span><strong className="text-[var(--color-text-primary)]">at work</strong> — <T de="في العمل" en="at work" /></span>
              <span><strong className="text-[var(--color-text-primary)]">on time</strong> — <T de="في الموعد" en="on time" /></span>
              <span><strong className="text-[var(--color-text-primary)]">in the morning/afternoon/evening</strong> — <T de="في الصباح/بعد الظهر/المساء" en="in the morning/afternoon/evening" /></span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modal-verbs",
    title: "Modal Verbs",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Modal verbs express <T de="الإمكانية، الضرورة، الإذن، الالتزام" en="possibility, necessity, permission, obligation" />. They do not change form for he/she/it.</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الفعل" en="Modal" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="المعنى" en="Meaning" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="مثال" en="Example" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="can" en="can" /></td><td className="px-3 py-2"><T de="قدرة / إذن" en="ability / permission" /></td><td className="px-3 py-2 font-mono"><T de="I can swim." en="I can swim." /> / <T de="Can I go out?" en="Can I go out?" /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="must" en="must" /></td><td className="px-3 py-2"><T de="ضرورة قوية / استنتاج" en="strong obligation / conclusion" /></td><td className="px-3 py-2 font-mono"><T de="You must wear a seatbelt." en="You must wear a seatbelt." /> / <T de="He must be tired." en="He must be tired." /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="should" en="should" /></td><td className="px-3 py-2"><T de="نصيحة / توصية" en="advice / recommendation" /></td><td className="px-3 py-2 font-mono"><T de="You should see a doctor." en="You should see a doctor." /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="may" en="may" /></td><td className="px-3 py-2"><T de="إذن رسمي / احتمال" en="formal permission / possibility" /></td><td className="px-3 py-2 font-mono"><T de="May I come in?" en="May I come in?" /> / <T de="It may rain." en="It may rain." /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="might" en="might" /></td><td className="px-3 py-2"><T de="احتمال ضعيف" en="weak possibility" /></td><td className="px-3 py-2 font-mono"><T de="I might go to the party." en="I might go to the party." /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="have to" en="have to" /></td><td className="px-3 py-2"><T de="ضرورة خارجية" en="external obligation" /></td><td className="px-3 py-2 font-mono"><T de="I have to finish my homework." en="I have to finish my homework." /></td></tr>
              <tr><td className="px-3 py-2 font-mono font-medium text-[var(--color-text-secondary)]"><T de="could" en="could" /></td><td className="px-3 py-2"><T de="قدرة ماضية / طلب مهذب" en="past ability / polite request" /></td><td className="px-3 py-2 font-mono"><T de="I could swim when I was 5." en="I could swim when I was 5." /> / <T de="Could you help me?" en="Could you help me?" /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> Modals are followed by the base verb (no <strong>to</strong>): <T de="You must go." en="You must go." /> NOT &quot;You must to go.&quot; The negative of <strong>must</strong> is <strong>must not / mustn&apos;t</strong> (prohibition). The negative of <strong>have to</strong> is <strong>don&apos;t have to</strong> (no obligation — different meaning!).
        </div>
      </div>
    ),
  },
  {
    id: "comparatives",
    title: "Comparatives and Superlatives",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Used to compare two things (comparative) or more than two (superlative):</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="نوع الصفة" en="Adjective type" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="المقارن" en="Comparative" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="التفضيل" en="Superlative" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2">One-syllable (tall, big, old)</td><td className="px-3 py-2 font-mono">adj + <strong>-er</strong>: taller, bigger, older</td><td className="px-3 py-2 font-mono"><strong>the</strong> + adj + <strong>-est</strong>: the tallest, the biggest, the oldest</td></tr>
              <tr><td className="px-3 py-2">Two syllables ending in -y (happy, easy)</td><td className="px-3 py-2 font-mono">change -y to -<strong>ier</strong>: happier, easier</td><td className="px-3 py-2 font-mono"><strong>the</strong> + -<strong>iest</strong>: the happiest, the easiest</td></tr>
              <tr><td className="px-3 py-2">Two+ syllables (beautiful, expensive)</td><td className="px-3 py-2 font-mono"><strong>more</strong> + adj: more beautiful, more expensive</td><td className="px-3 py-2 font-mono"><strong>the most</strong> + adj: the most beautiful, the most expensive</td></tr>
              <tr><td className="px-3 py-2"><T de="صفات شاذة" en="Irregular adjectives" /></td><td className="px-3 py-2">good → <strong>better</strong>, bad → <strong>worse</strong>, far → <strong>further/farther</strong></td><td className="px-3 py-2">good → <strong>the best</strong>, bad → <strong>the worst</strong>, far → <strong>the furthest/farthest</strong></td></tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="camp-grammar-note bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="المقارن" en="Comparative structure" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono"><T de="adjective-er than" en="adjective-er than" /></p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1"><T de="Ahmed is taller than Ali." en="Ahmed is taller than Ali." /></p>
            <p className="text-xs text-[var(--color-text-secondary)]"><T de="She is more intelligent than him." en="She is more intelligent than him." /></p>
          </div>
          <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="التفضيل" en="Superlative structure" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono"><T de="the adjective-est / the most adjective" en="the adjective-est / the most adjective" /></p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1"><T de="He is the tallest in the class." en="He is the tallest in the class." /></p>
            <p className="text-xs text-[var(--color-text-secondary)]"><T de="This is the most expensive car." en="This is the most expensive car." /></p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">When reporting what someone said, the tense usually shifts back (backshift):</p>
        <div className="camp-grammar-table-scroll overflow-x-auto" tabIndex={0} role="region" aria-label="Grammar reference table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-alt)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الكلام المباشر" en="Direct Speech" /></th>
                <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]"><T de="الكلام المنقول" en="Reported Speech" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>play</strong> tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>played</strong> tennis.</td></tr>
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>am playing</strong> tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>was playing</strong> tennis.</td></tr>
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>played</strong> tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>had played</strong> tennis.</td></tr>
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>will play</strong> tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>would play</strong> tennis.</td></tr>
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>can</strong> play tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>could</strong> play tennis.</td></tr>
              <tr><td className="px-3 py-2 font-mono">&quot;I <strong>have played</strong> tennis.&quot;</td><td className="px-3 py-2 font-mono">He said he <strong>had played</strong> tennis.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="camp-grammar-note bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>Tip:</strong> Other changes: <strong>today</strong> → <strong>that day</strong>, <strong>now</strong> → <strong>then</strong>, <strong>here</strong> → <strong>there</strong>, <strong>this</strong> → <strong>that</strong>, <strong>tomorrow</strong> → <strong>the next day</strong>, <strong>yesterday</strong> → <strong>the day before</strong>. If the reporting verb is present tense (He says...), no backshift is needed.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="camp-grammar-note bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="الأسئلة" en="Reported Questions" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)]">Use <strong>if/whether</strong> for yes/no questions, keep the question word for wh-questions. Word order changes to <strong>subject + verb</strong>.</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-mono"><T de={'"Are you happy? → He asked if I was happy."'} en={'"Are you happy? → He asked if I was happy."'} /></p>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono"><T de={'"Where do you live? → She asked where I lived."'} en={'"Where do you live? → She asked where I lived."'} /></p>
          </div>
          <div className="camp-grammar-note bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1"><T de="الأوامر" en="Reported Commands" /></h4>
            <p className="text-xs text-[var(--color-text-secondary)]">Use <strong>told + object + to + infinitive</strong> or <strong>asked + object + to + infinitive</strong>.</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-mono"><T de={'"Sit down. → He told me to sit down."'} en={'"Sit down. → He told me to sit down."'} /></p>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono"><T de={'"Don\'t go. → She told me not to go."'} en={'"Don\'t go. → She told me not to go."'} /></p>
          </div>
        </div>
      </div>
    ),
  },
];

/** Lessons follow the curriculum's teaching order inside each level. */
const TEACHING_ORDER: Record<string, number> = Object.fromEntries(Array.from(new Set(GRAMMAR_CURRICULUM.flatMap(level=>level.points.flatMap(point=>point.lessons)))).map((id,index)=>[id,index]));

export const SECTIONS: Section[] = [
  ...GRAMMAR_EXTENSIONS.map(lesson=>({id:lesson.id,title:lesson.title,level:asLevel(lesson.level),summary:lesson.intro,art:lesson.art,parts:lesson.content.length,content:<GrammarFoundationLesson lesson={lesson} translateOnInteraction/>})),
  ...GRAMMAR_MORE.map(lesson=>({id:lesson.id,title:lesson.title,level:asLevel(lesson.level),summary:lesson.intro,parts:lesson.content.length,content:<GrammarFoundationLesson lesson={lesson}/>})),
  ...GRAMMAR_FOUNDATIONS.map(lesson=>({id:lesson.id,title:lesson.title,level:FOUNDATION_LEVELS[lesson.id] ?? "A1",summary:lesson.intro,art:lesson.art,parts:lesson.content.length,content:<GrammarFoundationLesson lesson={lesson}/>})),
  ...GRAMMAR_LIBRARY.map(lesson=>({id:lesson.id,title:lesson.title,level:asLevel(lesson.level),summary:lesson.intro,art:lesson.art,parts:lesson.content.length,content:<GrammarFoundationLesson lesson={{...lesson,practice:{label:"Open the full topic page",href:lesson.from}}}/>})),
  ...LEGACY_SECTIONS.map(section=>({...section,level:LEGACY_LEVELS[section.id] ?? "B1",summary:LEGACY_SUMMARIES[section.id]})),
].map(section=>({...section,level:GRAMMAR_LESSON_LEVELS[section.id] ?? section.level}))
 .sort((a,b)=>(TEACHING_ORDER[a.id] ?? 999)-(TEACHING_ORDER[b.id] ?? 999));

type LevelFilter = "all" | GrammarLevel;
const sectionLevel = (section: Section): GrammarLevel => section.level ?? "B1";
const PREVIEW = 6;

export function GrammarReference() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [level, setLevel] = useState<LevelFilter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const done = useProgress(s => s.exercisesDone);
  const completeExercise = useProgress(s => s.completeExercise);
  const [earned, setEarned] = useState<number | null>(null);
  const learned = (id: string) => !!done[grammarLessonKey(id)];
  const path = grammarLevelProgress(done);
  useEffect(()=>{const reveal=()=>{const id=window.location.hash.slice(1);setOpenSection(SECTIONS.some(section=>section.id===id)?id:null);};reveal();window.addEventListener("hashchange",reveal);return()=>window.removeEventListener("hashchange",reveal);},[]);
  const counts = useMemo(()=>Object.fromEntries(LEVELS.map(l=>[l,SECTIONS.filter(s=>sectionLevel(s)===l).length])) as Record<GrammarLevel,number>,[]);
  const needle = query.trim().toLowerCase();
  const filtering = needle !== "" || level !== "all";
  const visible = SECTIONS.filter(s=>(level==="all"||sectionLevel(s)===level)&&(!needle||`${s.title} ${s.summary ?? ""}`.toLowerCase().includes(needle)));
  const groups = LEVELS.map(l=>({level:l,sections:visible.filter(s=>sectionLevel(s)===l)})).filter(g=>g.sections.length>0);
  const clear = () => { setQuery(""); setLevel("all"); };
  const open = (id: string) => { setEarned(null); setOpenSection(id); if (window.location.hash !== `#${id}`) history.pushState(null, "", `#${id}`); window.scrollTo({ top: 0 }); };
  const close = () => { const id = openSection; setOpenSection(null); history.pushState(null, "", window.location.pathname + window.location.search); requestAnimationFrame(()=>document.getElementById(`grammar-card-${id}`)?.focus()); };
  const lesson = SECTIONS.find(s => s.id === openSection);

  if (lesson) {
    const index = SECTIONS.indexOf(lesson), next = SECTIONS[index + 1];
    return (
      <article className="camp-grammar-lesson" id={lesson.id} aria-labelledby={`grammar-title-${lesson.id}`}>
        <button type="button" className="camp-grammar-back" onClick={close}><ArrowLeft size={16} aria-hidden="true" />All grammar lessons</button>
        <header className="camp-grammar-lesson-head">
          <span className="camp-library-card-icon"><LearningArt name={lesson.art ?? "BookOpen"} size={26} /></span>
          <div>
            <p className="camp-grammar-lesson-kicker"><span className="camp-hub-level">{sectionLevel(lesson)}</span>{LEVEL_NAMES[sectionLevel(lesson)]}{learned(lesson.id) && <span className="camp-hub-done"><CheckCircle2 size={12} aria-hidden="true" />Learned</span>}</p>
            <h2 id={`grammar-title-${lesson.id}`}>{lesson.title}</h2>
            {lesson.summary && !lesson.parts && <p className="camp-grammar-lesson-summary">{lesson.summary}</p>}
          </div>
        </header>
        <div id={`grammar-${lesson.id}`} className="camp-grammar-lesson-body">{translatedGrammarParagraphs(lesson.content)}</div>
        <div className="camp-grammar-learned" role="status">
          {learned(lesson.id)
            ? <p className="camp-grammar-learned-done"><CheckCircle2 size={20} aria-hidden="true" /><span><strong>Learned</strong>{earned ? ` · +${earned} XP` : " · counted in your progress"}</span></p>
            : <button type="button" className="camp-grammar-learned-button" onClick={() => setEarned(completeExercise(grammarLessonKey(lesson.id), GRAMMAR_XP))}><Check size={18} aria-hidden="true" />Mark as learned · +{GRAMMAR_XP} XP</button>}
        </div>
        {next && <button type="button" className="camp-grammar-next" onClick={() => open(next.id)}><span><small>Next lesson · {sectionLevel(next)}</small><strong>{next.title}</strong></span><ChevronRight size={18} aria-hidden="true" /></button>}
      </article>
    );
  }

  return (
    <div className="camp-grammar-reference camp-grammar-hub">
      <section className="camp-grammar-path" aria-label="Your grammar path">
        {path.map(p=><button key={p.level} type="button" className="camp-grammar-path-tile" aria-pressed={level===p.level} onClick={()=>setLevel(level===p.level?"all":p.level)}>
          <span className="camp-grammar-path-head"><span className="camp-hub-level">{p.level}</span><span className="camp-grammar-path-name">{p.name}</span>{p.complete && <CheckCircle2 size={16} aria-label="Level complete" />}</span>
          <span className="camp-grammar-path-count"><strong>{p.learned}</strong> / {p.total} learned</span>
          <span className="camp-grammar-path-bar" aria-hidden="true"><span style={{ width: `${p.total ? Math.round(p.learned / p.total * 100) : 0}%` }} /></span>
        </button>)}
        <Link href="/grammar/roadmap" className="camp-grammar-path-link"><MapIcon size={16} aria-hidden="true" />What to learn at each level<ChevronRight size={16} aria-hidden="true" /></Link>
      </section>
      <section className="camp-hub-filters" aria-label="Find a grammar lesson">
        <label className="camp-hub-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search grammar lessons</span>
          <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search grammar lessons…" />
        </label>
        <p className="camp-hub-count" role="status">{visible.length} {visible.length===1?"lesson":"lessons"}{level!=="all"?` · ${level} ${LEVEL_NAMES[level]}`:""}{filtering ? <> · <button type="button" onClick={clear}><X size={13} aria-hidden="true" />Clear filters</button></> : null}</p>
      </section>
      {groups.length===0&&<p className="camp-hub-empty">No grammar lesson matches these filters. <button type="button" onClick={clear}>Clear filters</button></p>}
      {groups.map(group=>{
        const headingId=`grammar-level-${group.level}`, showAll=filtering||expanded[group.level], list=showAll?group.sections:group.sections.slice(0,PREVIEW);
        return <section key={group.level} className="camp-learning-library-group" aria-labelledby={headingId}>
          <h2 id={headingId}>{group.level} · {LEVEL_NAMES[group.level]} <span className="camp-hub-section-count">{group.sections.filter(s=>learned(s.id)).length}/{group.sections.length}</span></h2>
          <div className="camp-trainer-grid">
            {list.map(section=><button key={section.id} id={`grammar-card-${section.id}`} type="button" className="camp-learning-library-card" onClick={()=>open(section.id)}>
              <span className="camp-library-card-icon"><LearningArt name={section.art ?? "BookOpen"} size={23} /></span>
              <span className="camp-library-card-copy">
                <strong>{section.title}</strong>
                {section.summary && <span>{section.summary}</span>}
                <span className="camp-hub-meta"><span className="camp-hub-level">{sectionLevel(section)}</span>{section.parts ? <span><Layers size={12} aria-hidden="true" />{section.parts} parts</span> : <span><Layers size={12} aria-hidden="true" />Reference table</span>}{learned(section.id) && <span className="camp-hub-done"><CheckCircle2 size={12} aria-hidden="true" />Learned</span>}</span>
              </span>
              <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />
            </button>)}
          </div>
          {!showAll&&group.sections.length>PREVIEW&&<button type="button" className="camp-hub-more" onClick={()=>setExpanded(e=>({...e,[group.level]:true}))}>Show all {group.sections.length}</button>}
        </section>;
      })}
    </div>
  );
}
