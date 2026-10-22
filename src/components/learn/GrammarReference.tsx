"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Languages } from "lucide-react";

function T({ de, en }: { de: string; en: string }) {
  return (
    <span className="group relative inline-flex items-baseline cursor-help border-b border-dotted border-[var(--color-border-default)] hover:border-brand-400 transition-colors">
      <span className="group-hover:hidden">{de}</span>
      <span className="hidden group-hover:inline text-[var(--color-primary-dark)] font-medium">{en}</span>
      <Languages className="w-2.5 h-2.5 ml-0.5 text-[var(--color-text-disabled)] group-hover:text-brand-400 inline-block -translate-y-px" />
    </span>
  );
}

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "articles",
    title: "Articles (a/an/the)",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          English has two types of articles: definite (<T de="أداة تعريف" en="the" />) and indefinite (<T de="أداة نكرة" en="a/an" />). No article is also common.
        </p>
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-warning)] text-white border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> Use <strong>the</strong> when both speaker and listener know what is being referred to. Use <strong>a/an</strong> when mentioning something for the first time. Do NOT use articles with names of people, most countries, or meals: <T de="I had lunch." en="I had lunch." /> (not &quot;a lunch&quot;).
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> Stative verbs (know, believe, love, hate, want, need) are NOT used in continuous forms. Say <T de="I know the answer." en="I know the answer." /> — NOT &quot;I am knowing the answer.&quot;
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-warning)] text-white border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> If the time is mentioned (yesterday, last week, in 2010), you MUST use Past Simple. If the time is not important or the action continues, use Present Perfect.
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
        <div className="overflow-x-auto">
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
          <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="will" en="will" /></h4>
            <p className="text-xs text-white/80">
              <T de="قرار فوري: I will answer the phone." en="Spontaneous: I will answer the phone." /><br />
              <T de="وعد: I will always love you." en="Promise: I will always love you." /><br />
              <T de="توقع بدون دليل: I think it will rain." en="Prediction without evidence: I think it will rain." />
            </p>
          </div>
          <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="going to" en="going to" /></h4>
            <p className="text-xs text-white/80">
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-warning)] text-white border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> In Second Conditional, use <strong>were</strong> for all subjects (not &quot;was&quot;): <T de="If I were you, I would go." en="If I were you, I would go." /> In First Conditional, the if-clause uses present tense, NOT <strong>will</strong>.
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> Use <strong>by</strong> to mention the agent: <T de="The room was cleaned by Mohamed." en="The room was cleaned by Mohamed." /> If the agent is unknown or unimportant, omit it: <T de="My phone was stolen." en="My phone was stolen." />
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
          <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-2"><T de="الوقت" en="TIME" /></h4>
            <div className="space-y-1.5">
              <p className="text-xs text-white/80"><strong className="text-white">at</strong> — precise time: <span className="font-mono"><T de="at 5 o'clock" en="at 5 o'clock" />, <T de="at midnight" en="at midnight" /></span></p>
              <p className="text-xs text-white/80"><strong className="text-white">on</strong> — days/dates: <span className="font-mono"><T de="on Monday" en="on Monday" />, <T de="on March 3rd" en="on March 3rd" /></span></p>
              <p className="text-xs text-white/80"><strong className="text-white">in</strong> — months/years/seasons/longer periods: <span className="font-mono"><T de="in July" en="in July" />, <T de="in 2024" en="in 2024" />, <T de="in summer" en="in summer" /></span></p>
            </div>
          </div>
          <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-2"><T de="المكان" en="PLACE" /></h4>
            <div className="space-y-1.5">
              <p className="text-xs text-white/80"><strong className="text-white">at</strong> — specific point/address: <span className="font-mono"><T de="at the bus stop" en="at the bus stop" />, <T de="at 10 Main St" en="at 10 Main St" /></span></p>
              <p className="text-xs text-white/80"><strong className="text-white">on</strong> — surface/street: <span className="font-mono"><T de="on the table" en="on the table" />, <T de="on Oxford Street" en="on Oxford Street" /></span></p>
              <p className="text-xs text-white/80"><strong className="text-white">in</strong> — enclosed space/city/country: <span className="font-mono"><T de="in the room" en="in the room" />, <T de="in Cairo" en="in Cairo" /></span></p>
            </div>
          </div>
          <div className="bg-[var(--color-warning)] text-white rounded-[var(--radius-lg)] p-3 md:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-2"><T de="استثناءات مهمة" en="Important exceptions" /></h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80">
              <span><strong className="text-white">at night</strong> — <T de="في الليل" en="at night" /></span>
              <span><strong className="text-white">at home</strong> — <T de="في المنزل" en="at home" /></span>
              <span><strong className="text-white">at work</strong> — <T de="في العمل" en="at work" /></span>
              <span><strong className="text-white">on time</strong> — <T de="في الموعد" en="on time" /></span>
              <span><strong className="text-white">in the morning/afternoon/evening</strong> — <T de="في الصباح/بعد الظهر/المساء" en="in the morning/afternoon/evening" /></span>
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-warning)] text-white border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> Modals are followed by the base verb (no <strong>to</strong>): <T de="You must go." en="You must go." /> NOT &quot;You must to go.&quot; The negative of <strong>must</strong> is <strong>must not / mustn&apos;t</strong> (prohibition). The negative of <strong>have to</strong> is <strong>don&apos;t have to</strong> (no obligation — different meaning!).
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
        <div className="overflow-x-auto">
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
          <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="المقارن" en="Comparative structure" /></h4>
            <p className="text-xs text-white/80 font-mono"><T de="adjective-er than" en="adjective-er than" /></p>
            <p className="text-xs text-white/80 mt-1"><T de="Ahmed is taller than Ali." en="Ahmed is taller than Ali." /></p>
            <p className="text-xs text-white/80"><T de="She is more intelligent than him." en="She is more intelligent than him." /></p>
          </div>
          <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="التفضيل" en="Superlative structure" /></h4>
            <p className="text-xs text-white/80 font-mono"><T de="the adjective-est / the most adjective" en="the adjective-est / the most adjective" /></p>
            <p className="text-xs text-white/80 mt-1"><T de="He is the tallest in the class." en="He is the tallest in the class." /></p>
            <p className="text-xs text-white/80"><T de="This is the most expensive car." en="This is the most expensive car." /></p>
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
        <div className="overflow-x-auto">
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
        <div className="bg-[var(--color-warning)] text-white border border-[var(--color-warning)] rounded-[var(--radius-lg)] p-3 text-sm">
          <strong>💡 Tip:</strong> Other changes: <strong>today</strong> → <strong>that day</strong>, <strong>now</strong> → <strong>then</strong>, <strong>here</strong> → <strong>there</strong>, <strong>this</strong> → <strong>that</strong>, <strong>tomorrow</strong> → <strong>the next day</strong>, <strong>yesterday</strong> → <strong>the day before</strong>. If the reporting verb is present tense (He says...), no backshift is needed.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="الأسئلة" en="Reported Questions" /></h4>
            <p className="text-xs text-white/80">Use <strong>if/whether</strong> for yes/no questions, keep the question word for wh-questions. Word order changes to <strong>subject + verb</strong>.</p>
            <p className="text-xs text-white/80 mt-1 font-mono"><T de={'"Are you happy? → He asked if I was happy."'} en={'"Are you happy? → He asked if I was happy."'} /></p>
            <p className="text-xs text-white/80 font-mono"><T de={'"Where do you live? → She asked where I lived."'} en={'"Where do you live? → She asked where I lived."'} /></p>
          </div>
          <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] p-3">
            <h4 className="text-sm font-semibold text-white mb-1"><T de="الأوامر" en="Reported Commands" /></h4>
            <p className="text-xs text-white/80">Use <strong>told + object + to + infinitive</strong> or <strong>asked + object + to + infinitive</strong>.</p>
            <p className="text-xs text-white/80 mt-1 font-mono"><T de={'"Sit down. → He told me to sit down."'} en={'"Sit down. → He told me to sit down."'} /></p>
            <p className="text-xs text-white/80 font-mono"><T de={'"Don\'t go. → She told me not to go."'} en={'"Don\'t go. → She told me not to go."'} /></p>
          </div>
        </div>
      </div>
    ),
  },
];

export function GrammarReference() {
  const [openSection, setOpenSection] = useState<string | null>("articles");

  return (
    <div className="space-y-2">
      {SECTIONS.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div
            key={section.id}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] overflow-hidden shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
          >
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-surface-alt)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{section.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[var(--color-text-disabled)] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-[var(--color-border-default)] pt-3">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
