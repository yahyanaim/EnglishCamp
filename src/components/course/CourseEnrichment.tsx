"use client";
import Image from "next/image";
import type { CourseEnrichment as Enrichment } from "@/data/course-enrichment/types";
import { CalloutBlock } from "@/components/lesson/CalloutBlock";
import { TableBlock } from "@/components/lesson/TableBlock";

export function CourseEnrichment({ content }: { content: Enrichment }) {
  return <section id="additional-worked-example" aria-label="Additional worked example and reference" className="scroll-mt-24 space-y-6 pt-6 border-t border-[var(--color-border-default)] min-w-0 text-[var(--color-text-primary)]">
    {content.video && <a href="#video-lesson" className="inline-block min-h-11 text-sm font-bold underline text-[var(--color-text-link)]">Watch this lesson’s video explanation</a>}
    <h3 className="font-display font-bold text-xl">Worked example: {content.title}</h3>
    <p className="font-body leading-relaxed text-lg">{content.context}</p>
    {!content.inlineImages && content.visualExplanation && <a href="#lesson-visual-explanation" className="inline-block min-h-11 text-sm font-bold underline text-[var(--color-text-link)]">View this lesson’s illustrated explanation</a>}
    <CalloutBlock tone="note" title="First attempt — find the problem" text={content.before} />
    <CalloutBlock tone="tip" title="Improved response or decision" text={content.after} />
    <p className="font-body leading-relaxed text-lg"><strong>Why this works:</strong> {content.reasoning}</p>
    <div className="space-y-3"><h4 className="font-display font-bold text-lg">Quick reference</h4><TableBlock headers={["Focus", "Example", "What to check"]} rows={content.rows} /></div>
    {!content.inlineImages && content.visual && <figure className="space-y-3 min-w-0">
      <a href={content.visual.src} target="_blank" rel="noreferrer" aria-label="Open teaching visual at full size" className="block">
        <Image src={content.visual.src} alt={content.visual.alt} width={content.visual.width} height={content.visual.height} unoptimized className="w-full max-w-[480px] h-auto mx-auto rounded-[var(--radius-md)] border border-[var(--color-border-default)]" />
      </a>
      <figcaption className="text-sm text-[var(--color-text-secondary)]">{content.visual.caption} <a href={content.visual.src} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open full-size visual</a></figcaption>
    </figure>}
    {!content.inlineImages && content.visualExplanation && <section id="lesson-visual-explanation" aria-label="Visual explanation" className="scroll-mt-24 space-y-4 min-w-0">
      <h4 className="font-display font-bold text-lg">{content.visualExplanation.title}</h4>
      <p className="font-body leading-relaxed">{content.visualExplanation.introduction}</p>
      {content.visualExplanation.images.map((image) => <figure key={image.src} className="space-y-3 min-w-0">
        <a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${image.title}`} className="block">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 100vw, 480px" unoptimized={image.src.endsWith(".svg")} className="w-full max-w-[480px] h-auto mx-auto rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-white" />
        </a>
        <figcaption className="text-sm text-[var(--color-text-secondary)] space-y-1 break-words">
          <p>{image.caption} <a href={image.src} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open full-size image</a></p>
          <p>{image.title} · {image.creator} · <a href={image.source} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Source</a> · <a href={image.licenseUrl} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">{image.license}</a>. {image.changes}</p>
        </figcaption>
      </figure>)}
      <p className="font-body leading-relaxed"><strong>Look closely:</strong> {content.visualExplanation.prompt}</p>
      <details><summary className="min-h-11 cursor-pointer font-bold text-[var(--color-text-link)]">Compare your visual explanation</summary><p className="pt-3 leading-relaxed">{content.visualExplanation.explanation}</p></details>
    </section>}
    <div className="space-y-3"><h4 className="font-display font-bold text-lg">Try a new example</h4><p className="font-body leading-relaxed">{content.transfer.prompt}</p>
      <details><summary className="min-h-11 cursor-pointer font-bold text-[var(--color-text-link)]">Compare your reasoning after trying</summary><p className="pt-3 leading-relaxed">{content.transfer.answer}</p></details>
    </div>
  </section>;
}
