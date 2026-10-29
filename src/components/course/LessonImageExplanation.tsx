import Image from "next/image";
import type { InlineLessonImages } from "@/data/course-enrichment/types";

export function LessonImageExplanation({ content }: { content: InlineLessonImages }) {
  return <section id="lesson-images" aria-labelledby="lesson-images-title" className="scroll-mt-24 space-y-4 min-w-0 text-[var(--color-text-primary)]">
    <h3 id="lesson-images-title" className="font-display text-lg font-bold">{content.title}</h3>
    <p className="font-body leading-relaxed">{content.introduction}</p>
    <div className={content.images.length > 1 ? "grid gap-6 md:grid-cols-2" : "space-y-6"}>
      {content.images.map(image => <figure key={image.src} className="space-y-3 min-w-0">
        <a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${image.title}`} className="block">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 100vw, 640px" unoptimized loading="lazy" className={`w-full ${image.height > image.width ? "max-w-sm" : "max-w-2xl"} h-auto mx-auto rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-white`} />
        </a>
        <figcaption className="space-y-1 text-sm leading-relaxed text-[var(--color-text-secondary)] break-words">
          <p>{image.caption} <a href={image.src} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open full-size image</a></p>
          <p>{image.title} · {image.creator} · <a href={image.source} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Source</a> · <a href={image.licenseUrl} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">{image.license}</a>. {image.changes}</p>
        </figcaption>
      </figure>)}
    </div>
    <p className="font-body leading-relaxed"><strong>Apply the lesson:</strong> {content.prompt}</p>
    <details><summary className="min-h-11 cursor-pointer font-bold text-[var(--color-text-link)]">Compare your explanation</summary><p className="pt-3 font-body leading-relaxed">{content.explanation}</p></details>
  </section>;
}
