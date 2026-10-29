import type { LessonPrinciple as Principle } from "@/data/lesson-principles/types";
import { CalloutBlock } from "@/components/lesson/CalloutBlock";
import { LessonRuleMindMap } from "./LessonRuleMindMap";

export function LessonPrinciple({ principle }: { principle: Principle }) {
  return <section id="lesson-principle" aria-labelledby="lesson-principle-title" className="scroll-mt-24 space-y-4 text-[var(--color-text-primary)] break-words">
    <div>
      <p className="text-xs font-bold text-[var(--color-text-link)] mb-2">Lesson rule mind map</p>
      <h2 id="lesson-principle-title" className="font-display text-xl sm:text-2xl font-bold">{principle.title}</h2>
    </div>
    {principle.ruleMap && <LessonRuleMindMap map={principle.ruleMap} statement={principle.statement} />}
    <details className="text-sm space-y-4">
      <summary className="cursor-pointer font-bold text-[var(--color-text-link)]">Read the full explanation</summary>
      <p className="leading-relaxed text-[var(--color-text-secondary)]">{principle.explanation}</p>
      <CalloutBlock tone="tip" title="Worked example" text={principle.example} />
      <p className="leading-relaxed"><strong>What it means: </strong>{principle.interpretation}</p>
    </details>
  </section>;
}
