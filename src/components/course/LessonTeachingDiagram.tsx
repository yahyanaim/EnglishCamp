import { ConceptTeachingGraphic } from "./ConceptTeachingGraphic";
import type { TeachingDiagram } from "@/data/teaching-diagrams/types";

const ink = "var(--color-text-primary)";
const muted = "var(--color-text-secondary)";
const accent = "var(--color-text-link)";
const surface = "var(--color-surface)";
const tint = "var(--color-primary-subtle)";
const line = "var(--color-border-strong)";

function WordFamilyGraphic({ compact }: { compact: boolean }) {
  const id = `word-family-${compact ? "mobile" : "wide"}`;
  const nodes = [
    { role: "noun", word: "success", example: ["Success takes", "practice."], wide: "Success takes practice." },
    { role: "verb", word: "succeed", example: ["They want", "to succeed."], wide: "They want to succeed." },
    { role: "adjective", word: "successful", example: ["The project", "is successful."], wide: "The project is successful." },
    { role: "adverb", word: "successfully", example: ["It ended", "successfully."], wide: "It ended successfully." },
  ];
  const positions = compact ? [[75,75],[225,75],[75,415],[225,415]] : [[130,105],[130,295],[670,105],[670,295]];
  return <svg className={compact ? "md:hidden w-full max-w-sm mx-auto" : "hidden md:block w-full max-w-4xl mx-auto"} viewBox={compact ? "0 0 300 520" : "0 0 800 400"} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ fontFamily: "var(--font-body), sans-serif" }}>
    <title id={`${id}-title`}>SUCCESS word-family tree</title>
    <desc id={`${id}-desc`}>Four branches connect the SUCCESS family to success, a noun; succeed, a verb; successful, an adjective; and successfully, an adverb. Each has a sentence example. These are related forms, not interchangeable words.</desc>
    <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
      {(compact ? ["M122 216C100 184 75 178 75 145", "M178 216C200 184 225 178 225 145", "M122 294C100 326 75 332 75 365", "M178 294C200 326 225 332 225 365"] : ["M348 170C300 128 285 105 246 105", "M348 230C300 272 285 295 246 295", "M452 170C500 128 515 105 554 105", "M452 230C500 272 515 295 554 295"]).map(d => <path key={d} d={d} />)}
    </g>
    <circle cx={compact ? 150 : 400} cy={compact ? 255 : 200} r={compact ? 48 : 61} fill={tint} stroke={accent} strokeWidth="2" />
    <text x={compact ? 150 : 400} y={compact ? 261 : 205} textAnchor="middle" fill={ink} fontSize={compact ? 20 : 24} fontWeight="800" style={{ fontFamily: "var(--font-display), sans-serif" }}>SUCCESS</text>
    {nodes.map((node,i) => <g key={node.role} transform={`translate(${positions[i][0]} ${positions[i][1]})`} textAnchor="middle">
      <text y={compact ? -30 : -40} fill={accent} fontSize={compact ? 16 : 18} fontWeight="700">{node.role}</text>
      <text fill={ink} fontSize={compact ? 20 : 28} fontWeight="800" style={{ fontFamily: "var(--font-display), sans-serif" }}>{node.word}</text>
      {compact ? node.example.map((part,j) => <text key={part} y={30+j*22} fill={muted} fontSize="16">{part}</text>) : <text y="34" fill={muted} fontSize="18">{node.wide}</text>}
    </g>)}
  </svg>;
}

function TimelineGraphic({ compact }: { compact: boolean }) {
  const id = `tense-timeline-${compact ? "mobile" : "wide"}`;
  const x1 = compact ? 20 : 350, x2 = compact ? 282 : 778, now = compact ? 260 : 730;
  const y1 = compact ? 180 : 105, y2 = compact ? 390 : 270;
  const dots = compact ? [90,155] : [455,555];
  const start = compact ? 65 : 405;
  return <svg className={compact ? "md:hidden w-full max-w-sm mx-auto" : "hidden md:block w-full max-w-4xl mx-auto"} viewBox={compact ? "0 0 300 490" : "0 0 800 350"} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ fontFamily: "var(--font-body), sans-serif" }}>
    <title id={`${id}-title`}>Present perfect: finished amount compared with activity duration</title>
    <desc id={`${id}-desc`}>The first timeline shows two completed doors before now: I have painted two doors. The second shows painting from nine until now, at noon: I have been painting since nine. In this illustration the activity continues to now, while the number of finished doors is unknown. The continuous form can also describe recently stopped activity.</desc>
    <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill={accent} /></marker></defs>
    <text x="20" y={compact ? 28 : 45} fill={accent} fontSize="18" fontWeight="700">RESULT</text>
    <text x="20" y={compact ? 58 : 78} fill={ink} fontSize={compact ? 20 : 22} fontWeight="700">I have painted</text>
    <text x="20" y={compact ? 84 : 106} fill={ink} fontSize={compact ? 20 : 22} fontWeight="700">two doors.</text>
    <line x1={x1} y1={y1} x2={x2} y2={y1} stroke={line} strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
    {dots.map((x,i) => <g key={x}>
      <rect x={x-12} y={y1-53} width="24" height="34" rx="2" fill={tint} stroke={accent} strokeWidth="2" />
      <circle cx={x+5} cy={y1-36} r="2" fill={accent} />
      <circle cx={x} cy={y1} r="5" fill={accent} />
      <text x={x} y={y1-65} textAnchor="middle" fill={ink} fontSize="16">{i+1}</text>
    </g>)}
    <line x1={now} y1={y1-20} x2={now} y2={y1+20} stroke={ink} strokeWidth="2" />
    <text x={x1} y={y1+47} fill={muted} fontSize="16">Past</text>
    <text x={now} y={y1+47} textAnchor="middle" fill={ink} fontSize="16" fontWeight="700">NOW</text>
    <text x="20" y={compact ? 267 : 210} fill={accent} fontSize="18" fontWeight="700">ACTIVITY</text>
    <text x="20" y={compact ? 297 : 243} fill={ink} fontSize={compact ? 20 : 22} fontWeight="700">I have been painting</text>
    <text x="20" y={compact ? 323 : 271} fill={ink} fontSize={compact ? 20 : 22} fontWeight="700">since nine.</text>
    <line x1={x1} y1={y2} x2={x2} y2={y2} stroke={line} strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
    <rect x={start} y={y2-11} width={now-start} height="22" rx="11" fill={tint} />
    <path d={`M${start} ${y2}H${now-3}`} stroke={accent} strokeWidth="5" fill="none" markerEnd={`url(#${id}-arrow)`} />
    <circle cx={start} cy={y2} r="5" fill={accent} />
    <line x1={now} y1={y2-27} x2={now} y2={y2+24} stroke={ink} strokeWidth="2" strokeDasharray="4 4" />
    <text x={start} y={y2+47} textAnchor="middle" fill={muted} fontSize="16">9:00</text>
    <text x={now} y={y2+47} textAnchor="middle" fill={ink} fontSize="16" fontWeight="700">NOW</text>
    <text x={now} y={y2+70} textAnchor="middle" fill={muted} fontSize="16">12:00</text>
    <text x={(start+now)/2} y={y2-28} textAnchor="middle" fill={accent} fontSize="16">painting</text>
  </svg>;
}

function ArticleDecisionGraphic({ compact }: { compact: boolean }) {
  const id = `article-decision-${compact ? "mobile" : "wide"}`;
  return <svg className={compact ? "md:hidden w-full max-w-sm mx-auto" : "hidden md:block w-full max-w-4xl mx-auto"} viewBox={compact ? "0 0 300 580" : "0 0 800 560"} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ fontFamily: "var(--font-body), sans-serif" }}>
    <title id={`${id}-title`}>A simplified article decision tree</title>
    <desc id={`${id}-desc`}>For ordinary common nouns when choosing an article: can the reader identify which referent? Yes leads to the. Otherwise, is it one singular countable item? Yes leads to a or an. General plural and uncountable meanings commonly use no article: Books help. Advice helps. Other determiners, names, fixed expressions and less common uses need separate checks.</desc>
    <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill={accent} /></marker></defs>
    <g fill="none" stroke={accent} strokeWidth="2" markerEnd={`url(#${id}-arrow)`}>
      {(compact ? ["M77 100H65V165", "M223 100H235V240H150V253", "M86 340H75V420", "M214 340H225V420"] : ["M290 118H150V212", "M510 118H555V190", "M466 300H405V425", "M644 300H690V425"]).map(d => <path key={d} d={d} />)}
    </g>
    <g fill={accent} fontSize="16" fontWeight="700" textAnchor="middle">
      <text x={compact ? 43 : 122} y={compact ? 143 : 178}>Yes</text>
      <text x={compact ? 263 : 581} y={compact ? 181 : 165}>No</text>
      <text x={compact ? 48 : 380} y={compact ? 399 : 385}>Yes</text>
      <text x={compact ? 253 : 716} y={compact ? 399 : 385}>No</text>
    </g>
    <path d={compact ? "M150 4L296 68L150 132L4 68Z" : "M400 4L620 80L400 156L180 80Z"} fill={tint} stroke={accent} strokeWidth="2" />
    <g textAnchor="middle" fill={ink} fontSize={compact ? 18 : 22} fontWeight="700">
      <text x={compact ? 150 : 400} y={compact ? 59 : 72}>Can the reader</text>
      <text x={compact ? 150 : 400} y={compact ? 83 : 100}>identify which?</text>
    </g>
    <g transform={compact ? "translate(65 200)" : "translate(150 260)"} textAnchor="middle">
      <rect x={compact ? -53 : -115} y={compact ? -35 : -48} width={compact ? 106 : 230} height={compact ? 94 : 108} rx="8" fill={surface} stroke={line} />
      <text y={compact ? -8 : -1} fill={accent} fontSize={compact ? 26 : 30} fontWeight="800" style={{ fontFamily: "var(--font-display), sans-serif" }}>THE</text>
      {compact ? <><text y="23" fill={muted} fontSize="16">the book</text><text y="45" fill={muted} fontSize="16">we discussed</text></> : <text y="32" fill={muted} fontSize="18">the book we discussed</text>}
    </g>
    <path d={compact ? "M150 253L286 310L150 367L14 310Z" : "M555 190L743 262L555 334L367 262Z"} fill={tint} stroke={accent} strokeWidth="2" />
    <g textAnchor="middle" fill={ink} fontSize={compact ? 18 : 22} fontWeight="700">
      <text x={compact ? 150 : 555} y={compact ? 302 : 253}>One singular</text>
      <text x={compact ? 150 : 555} y={compact ? 326 : 281}>countable item?</text>
    </g>
    <g transform={compact ? "translate(75 475)" : "translate(405 480)"} textAnchor="middle">
      <rect x={compact ? -63 : -105} y="-55" width={compact ? 126 : 210} height="124" rx="8" fill={surface} stroke={line} />
      <text y="-14" fill={accent} fontSize="30" fontWeight="800" style={{ fontFamily: "var(--font-display), sans-serif" }}>A / AN</text>
      <text y="15" fill={muted} fontSize={compact ? 16 : 18}>a course</text>
      <text y="40" fill={muted} fontSize={compact ? 16 : 18}>an exam</text>
    </g>
    <g transform={compact ? "translate(225 475)" : "translate(690 480)"} textAnchor="middle">
      <rect x={compact ? -63 : -95} y="-55" width={compact ? 126 : 190} height="124" rx="8" fill={surface} stroke={line} />
      <text y="-22" fill={accent} fontSize="30" fontWeight="800" style={{ fontFamily: "var(--font-display), sans-serif" }}>Ø</text>
      <text y="14" fill={ink} fontSize={compact ? 16 : 18} fontWeight="700">General meaning</text>
      <text y="44" fill={muted} fontSize={compact ? 16 : 18}>books / advice</text>
    </g>
  </svg>;
}

export function LessonTeachingDiagram({ diagram }: { diagram: TeachingDiagram }) {
  const Graphic = diagram.kind === "word-family" ? WordFamilyGraphic : diagram.kind === "tense-timeline" ? TimelineGraphic : ArticleDecisionGraphic;
  return <section id="lesson-principle" aria-labelledby="lesson-principle-title" className="scroll-mt-24 space-y-5 text-[var(--color-text-primary)]">
    <div>
      <p className="mb-2 text-xs font-bold text-[var(--color-text-link)]">Visual explanation</p>
      <h2 id="lesson-principle-title" className="font-display text-xl sm:text-2xl font-bold">{diagram.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{diagram.introduction}</p>
    </div>
    <figure aria-label={diagram.title} className="py-4 sm:py-6">
      {diagram.kind === "concept" && diagram.visual ? <>
        <ConceptTeachingGraphic visual={diagram.visual} compact={false} />
        <ConceptTeachingGraphic visual={diagram.visual} compact />
      </> : <><Graphic compact={false} /><Graphic compact /></>}
      <figcaption className="mt-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{diagram.takeaway}</figcaption>
    </figure>
  </section>;
}
