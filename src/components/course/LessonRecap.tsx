import { LearningArt } from "@/components/brand/LearningArt";
import type { LessonPrinciple } from "@/data/lesson-principles/types";
import type { CourseEnrichment, TeachingVideo } from "@/data/course-enrichment/types";

export function LessonRecap({ principle, example, video }: { principle?:LessonPrinciple; example?:CourseEnrichment; video:TeachingVideo }) {
  return <section className="camp-video-recap" aria-label="Lesson recap">
    <header className="camp-recap-heading"><LearningArt name="book" size={24} /><div><h3>Lesson recap</h3><span>Understand · see it in context · apply it</span></div></header>
    <div className="camp-recap-rule"><h4>{principle?.title || "The key idea"}</h4><p className="camp-recap-principle">{principle?.statement || video.alternative}</p>{principle && <p>{principle.explanation}</p>}</div>
    {principle && <div className="camp-recap-example"><h4>A concrete example</h4><p>{principle.example}</p><p className="camp-recap-explanation">{principle.interpretation}</p></div>}
    {example && <>
      <div className="camp-recap-worked"><h4>{example.title}</h4><p>{example.context}</p><dl><div><dt>First attempt</dt><dd>{example.before}</dd></div><div><dt>Improved response</dt><dd>{example.after}</dd></div></dl><p><strong>Why it works:</strong> {example.reasoning}</p></div>
      <div className="camp-recap-check"><h4><LearningArt name="puzzle" size={19} />Check your understanding</h4><p>{example.transfer.prompt}</p><details><summary>Compare your reasoning</summary><p>{example.transfer.answer}</p></details></div>
    </>}
    {video.coverage && <p className="camp-recap-coverage">{video.coverage}</p>}
  </section>;
}
