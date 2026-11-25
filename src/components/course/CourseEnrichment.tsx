"use client";
import Image from "next/image";
import type { CourseEnrichment as Enrichment } from "@/data/course-enrichment/types";
import { ArrowRight, Check, Image as ImageIcon, Lightbulb, PenLine, PlayCircle, Sparkles, Table2, X } from "lucide-react";
import { TableBlock } from "@/components/lesson/TableBlock";

export function CourseEnrichment({ content }: { content: Enrichment }) {
  return <section id="additional-worked-example" aria-label="Additional worked example and reference" data-outline="example" data-outline-label={content.title} data-outline-kind="example" className="camp-worked scroll-mt-24 min-w-0 text-[var(--color-text-primary)]">
    <header className="camp-worked-head">
      <span className="camp-worked-kicker"><Sparkles size={13} aria-hidden="true" />Worked example</span>
      <h3>{content.title}</h3>
      <p className="camp-worked-context">{content.context}</p>
      {(content.video || (!content.inlineImages && content.visualExplanation)) && <div className="camp-worked-links">
        {content.video && <a href="#video-lesson"><PlayCircle size={15} aria-hidden="true" />Watch this lesson’s video explanation</a>}
        {!content.inlineImages && content.visualExplanation && <a href="#lesson-visual-explanation"><ImageIcon size={15} aria-hidden="true" />View this lesson’s illustrated explanation</a>}
      </div>}
    </header>
    <div className="camp-compare">
      <div className="camp-compare-side" data-side="before"><span className="camp-compare-tag"><X size={13} strokeWidth={3} aria-hidden="true" />First attempt — find the problem</span><p>{content.before}</p></div>
      <span className="camp-compare-arrow" aria-hidden="true"><ArrowRight size={16} /></span>
      <div className="camp-compare-side" data-side="after"><span className="camp-compare-tag"><Check size={13} strokeWidth={3} aria-hidden="true" />Improved response or decision</span><p>{content.after}</p></div>
    </div>
    <div className="camp-worked-why"><span aria-hidden="true"><Lightbulb size={17} /></span><p><strong>Why this works:</strong> {content.reasoning}</p></div>
    <div className="camp-worked-ref"><h4><Table2 size={15} aria-hidden="true" />Quick reference</h4><TableBlock headers={["Focus", "Example", "What to check"]} rows={content.rows} /></div>
    {!content.inlineImages && content.visual && <figure className="space-y-3 min-w-0">
      <a href={content.visual.src} target="_blank" rel="noreferrer" aria-label="Open teaching visual at full size" className="block">
        <Image src={content.visual.src} alt={content.visual.alt} width={content.visual.width} height={content.visual.height} unoptimized className="w-full max-w-[480px] h-auto mx-auto rounded-[var(--radius-md)] border border-[var(--color-border-default)]" />
      </a>
      <figcaption className="text-sm text-[var(--color-text-secondary)]">{content.visual.caption} <a href={content.visual.src} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open full-size visual</a></figcaption>
    </figure>}
    {!content.inlineImages && content.visualExplanation && <section id="lesson-visual-explanation" aria-label="Visual explanation" className="camp-worked-visual scroll-mt-24 space-y-4 min-w-0">
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
      <details><summary>Compare your visual explanation</summary><p className="pt-3 leading-relaxed">{content.visualExplanation.explanation}</p></details>
    </section>}
    <div className="camp-lesson-check camp-worked-try">
      <span className="camp-lesson-check-label"><PenLine size={13} aria-hidden="true" />Try a new example</span>
      <p>{content.transfer.prompt}</p>
      <details><summary>Compare your reasoning after trying</summary><p>{content.transfer.answer}</p></details>
    </div>
  </section>;
}
