import type { LessonRuleMap } from "@/data/lesson-principles/maps/types";

export function LessonRuleMindMap({ map, statement }: { map: LessonRuleMap; statement: string }) {
  return <figure aria-label={`Lesson rule: ${map.root}`} className="min-w-0 break-words">
    <figcaption className="sr-only">{map.root}: three connected parts of this lesson’s rule, each with an example.</figcaption>
    <div className="max-w-xl mx-auto rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-primary-subtle)] p-4 text-center">
      <h3 className="font-display font-bold">{map.root}</h3>
      <p className="mt-2 text-sm leading-relaxed">{statement}</p>
    </div>
    <div aria-hidden="true" className="relative h-6 text-[var(--color-border-strong)]">
      <span className="absolute left-1/2 top-0 h-3 border-l border-current" />
      <span className="sm:hidden absolute left-3 right-1/2 top-3 border-t border-current" />
      <span className="sm:hidden absolute left-3 top-3 h-3 border-l border-current" />
      <span className="hidden sm:block absolute left-[16.666667%] right-[16.666667%] top-3 border-t border-current" />
      {["16.666667%", "50%", "83.333333%"].map(left => <span key={left} style={{ left }} className="hidden sm:block absolute top-3 h-3 border-l border-current" />)}
    </div>
    <ul className="ml-3 border-l border-[var(--color-border-strong)] sm:ml-0 sm:border-l-0 grid grid-cols-1 sm:grid-cols-3">
      {map.branches.map(branch => <li key={branch.label} className="relative min-w-0 pl-6 pb-6 last:pb-0 sm:px-3 sm:pb-0">
        <span aria-hidden="true" className="sm:hidden absolute left-0 top-4 w-6 border-t border-[var(--color-border-strong)]" />
        <div className="h-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface)] p-4 space-y-3">
          <h4 className="font-display font-bold text-sm">{branch.label}</h4>
          <p className="text-sm leading-relaxed">{branch.rule}</p>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]"><strong>Example: </strong>{branch.example}</p>
        </div>
      </li>)}
    </ul>
  </figure>;
}
