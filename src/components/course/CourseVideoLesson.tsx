import type { TeachingVideo } from "@/data/course-enrichment/types";

/** A visible lesson resource. Native lazy loading defers off-screen players. */
export function CourseVideoLesson({ video }: { video: TeachingVideo }) {
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}&t=${video.start}s`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?start=${video.start}${video.end ? `&end=${video.end}` : ""}&autoplay=0&playsinline=1&cc_load_policy=1`;
  return <section id="video-lesson" aria-label="Video lesson" className="scroll-mt-24 space-y-4 min-w-0 text-[var(--color-text-primary)]">
    <h2 className="font-display font-bold text-xl">Video lesson</h2>
    <p className="font-bold">{video.title}</p>
    <p className="text-sm text-[var(--color-text-secondary)]">{video.publisher} · {video.segment}</p>
    <p className="text-sm leading-relaxed"><strong>Lesson focus:</strong> {video.notice}</p>
    {video.coverage && <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]"><strong>What this covers:</strong> {video.coverage}</p>}
    <iframe key={`${video.id}-${video.start}`} src={embedUrl} title={video.title} className="block w-full min-h-[200px] aspect-video rounded-[var(--radius-md)] border border-[var(--color-border-default)]" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm"><a href={watchUrl} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open on YouTube</a><a href={video.source} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Publisher lesson and resources</a><a href="#additional-worked-example" className="underline text-[var(--color-text-link)]">Worked example and reference</a></p>
    <details className="text-sm space-y-3"><summary className="min-h-11 cursor-pointer font-bold text-[var(--color-text-link)]">Practise with this video</summary>
      <p className="pt-2"><strong>Before watching:</strong> {video.before}</p>
      <p><strong>After watching:</strong> {video.after}</p>
      <p><strong>Written alternative:</strong> {video.alternative}</p>
    </details>
    <p className="text-xs text-[var(--color-text-secondary)]">YouTube player · playback starts when you press Play. If the video is unavailable, use the written lesson below.</p>
  </section>;
}
