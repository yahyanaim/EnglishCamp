"use client";
import { useState } from "react";
import { Play, ExternalLink, Video } from "lucide-react";
import { courseVideoUrls } from "@/lib/courseVideo";
import { NotesEditor } from "@/components/ui/NotesEditor";
import { LessonRecap } from "./LessonRecap";
import type { LessonPrinciple } from "@/data/lesson-principles/types";
import type { TeachingVideo, CourseEnrichment } from "@/data/course-enrichment/types";

/** Original lesson sources stay intact. The optional player connects only after a click. */
export function CourseVideoLesson({ video, principle, example, lessonId, lessonTitle }: { video: TeachingVideo; principle?: LessonPrinciple; example?: CourseEnrichment; lessonId?: string; lessonTitle?: string }) {
  const [loadedVideo, setLoadedVideo] = useState<string | null>(null);
  const videoKey = `${video.id}-${video.start}`;
  const loaded = loadedVideo === videoKey;
  const { watchUrl, embedUrl } = courseVideoUrls(video);
  return <section id="video-lesson" aria-label="Video lesson" className="camp-video-lesson scroll-mt-24 space-y-4 min-w-0 text-[var(--color-text-primary)]">
    <h2 className="font-display font-bold text-xl">Video lesson</h2>
    <p className="font-bold">{video.title}</p>
    <p className="text-sm text-[var(--color-text-secondary)]">{video.publisher} · {video.segment}</p>
    <p className="text-sm leading-relaxed"><strong>Lesson focus:</strong> {video.notice}</p>
    {video.coverage && <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]"><strong>What this covers:</strong> {video.coverage}</p>}
    <div className="camp-video-frame">
      <div className="camp-video-toolbar"><span><Video size={15} /> Lesson player</span><a href={watchUrl} target="_blank" rel="noreferrer" aria-label="Open this lesson on YouTube"><ExternalLink size={15} /></a></div>
      <div className="camp-video-stage">
        {loaded ? <iframe key={`${video.id}-${video.start}`} src={embedUrl} title={video.title} className="camp-video-iframe" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <button type="button" className="camp-video-placeholder" onClick={() => setLoadedVideo(videoKey)} aria-label={`Load video lesson: ${video.title}`}>
          <span className="camp-video-play"><Play size={26} fill="currentColor" /></span><strong>Load lesson video</strong><span>{video.publisher}</span><small>Connects to YouTube only when you choose to load it</small>
        </button>}
      </div>
      <div className="camp-video-caption"><span>{video.segment}</span><span>YouTube · Optional resource</span></div>
    </div>
    <LessonRecap video={video} principle={principle} example={example} />
    {lessonId && <NotesEditor key={lessonId} lessonId={lessonId} lessonTitle={lessonTitle} compact />}
    <p className="camp-video-links flex flex-wrap gap-x-4 gap-y-2 text-sm"><a href={watchUrl} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Open on YouTube</a><a href={video.source} target="_blank" rel="noreferrer" className="underline text-[var(--color-text-link)]">Publisher lesson and resources</a><a href="#additional-worked-example" className="underline text-[var(--color-text-link)]">Worked example and reference</a></p>
    <div className="camp-video-footer"><details className="camp-video-practice text-sm"><summary className="min-h-11 cursor-pointer font-bold text-[var(--color-text-link)]">Practise with this video</summary>
      <div className="camp-video-practice-copy">
      <p className="pt-2"><strong>Before watching:</strong> {video.before}</p>
      <p><strong>After watching:</strong> {video.after}</p>
      <p><strong>Written alternative:</strong> {video.alternative}</p>
      </div>
    </details>
    <p className="text-xs text-[var(--color-text-secondary)]">YouTube player · playback starts when you press Play. If the video is unavailable, use the written lesson below.</p></div>
  </section>;
}
