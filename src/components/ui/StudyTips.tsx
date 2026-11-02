import { LearningArt } from "@/components/brand/LearningArt";

type Tip = { id:string; topic:string; tip:string; suggest:string; topicAr?:string; tipAr?:string; suggestAr?:string; icon?:string };
export function StudyTips({ title = "Tips & practice suggestions", items }: { title?:string; items:Tip[] }) {
  return <section className="camp-study-tips"><h2><LearningArt name="idea" size={22} />{title}</h2><div className="camp-tips-grid">{items.map(item => <details key={item.id} className="camp-tip">
    <summary><LearningArt name={item.icon || "idea"} size={24} /><span>{item.topic}{item.topicAr && <small lang="ar" dir="rtl">{item.topicAr}</small>}</span><span className="camp-tip-chevron" aria-hidden="true">⌄</span></summary>
    <div className="camp-tip-copy"><p>{item.tip}</p>{item.tipAr && <p lang="ar" dir="rtl">{item.tipAr}</p>}<h3>Try it</h3><p>{item.suggest}</p>{item.suggestAr && <p lang="ar" dir="rtl">{item.suggestAr}</p>}</div>
  </details>)}</div></section>;
}
