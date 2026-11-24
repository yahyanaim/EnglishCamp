"use client";
import { flushSync } from "react-dom";
import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/shadcn/button";
import { LearningArt } from "@/components/brand/LearningArt";
import { GRAMMAR_FOUNDATIONS } from "@/data/grammar-foundations";
import { GrammarFoundationLesson } from "@/components/learn/GrammarFoundationLesson";
import { GRAMMAR_SECTIONS } from "@/data/grammar-cheat-sheet";
import { WordsLesson } from "@/components/learn/WordsLesson";
import { essentialVocabularyCount } from "@/components/learn/EssentialVocabulary";
import { CheatSheetContent } from "@/components/learn/CheatSheetContent";
import { ChevronRight, Search, X } from "lucide-react";

const REFERENCE_IDS=[...GRAMMAR_FOUNDATIONS.map(s=>s.id),...GRAMMAR_SECTIONS.map(section=>section.id),"words"];

export default function CheatSheetPage() {
  const [open, setOpen] = useState<Record<string,boolean>>({});
  const [printing, setPrinting] = useState(false);
  const [topicIndexOpen, setTopicIndexOpen] = useState(false);
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const shown = (title: string) => printing || !needle || title.toLowerCase().includes(needle);
  const topics = [...GRAMMAR_FOUNDATIONS.map(s=>({id:s.id,title:s.title,art:s.art,parts:s.content.length,open:s.id})),...GRAMMAR_SECTIONS.map(s=>({id:s.id,title:s.title,art:s.art,parts:s.content.length,open:s.id})),{id:"position-words",title:"Position and movement",art:"location",parts:0,open:"prepositions"},{id:"words",title:"Words",art:"book",parts:0,open:"words"}];
  const visibleTopics = topics.filter(t=>shown(t.title));
  useEffect(() => {
    const before = () => flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before); window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);
  useEffect(()=>{function revealSection(){const hash=window.location.hash,id=hash.slice(1);const section=hash==='#words'||hash.startsWith('#vocabulary-')?'words':id==='position-words'?'prepositions':[...GRAMMAR_SECTIONS,...GRAMMAR_FOUNDATIONS].some(s=>s.id===id)?id:null;if(section){setOpen(o=>({...o,[section]:true}));requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));}}revealSection();window.addEventListener('hashchange',revealSection);return()=>window.removeEventListener('hashchange',revealSection);},[]);
  return <PageWrapper className="camp-grammar-page"><div className="camp-cheat-sheet">
    <PageBanner><h1>Grammar Cheat Sheet</h1><p>Rules, forms and examples to study on screen or print. All sections are included when printing.</p></PageBanner>
    <section className="camp-hub-filters camp-cheat-filters no-print" aria-label="Find a grammar topic">
      <label className="camp-hub-search"><Search size={16} aria-hidden="true"/><span className="sr-only">Search grammar topics</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search grammar topics…"/></label>
      <div className="camp-cheat-actions"><Button variant="outline" onClick={()=>setOpen(Object.fromEntries(REFERENCE_IDS.map(id=>[id,true])))}>Expand all</Button><Button variant="outline" onClick={()=>setOpen(Object.fromEntries(REFERENCE_IDS.map(id=>[id,false])))}>Collapse all</Button><Button variant="outline" asChild><a href="/media/grammar/englishcamp-grammar-reference.pdf" download>Download PDF</a></Button><Button onClick={()=>window.print()}><LearningArt name="Printer" size={16}  />Print</Button></div>
      <p className="camp-hub-count" role="status">{visibleTopics.length} {visibleTopics.length===1?"topic":"topics"} · {GRAMMAR_SECTIONS.length+GRAMMAR_FOUNDATIONS.length} grammar sections · {essentialVocabularyCount} everyday words{needle ? <> · <button type="button" onClick={()=>setQuery("")}><X size={13} aria-hidden="true"/>Clear</button></> : null}</p>
    </section>
    <Button variant="outline" className="camp-cheat-topic-toggle no-print" aria-expanded={topicIndexOpen} aria-controls="grammar-topic-index" onClick={()=>setTopicIndexOpen(value=>!value)}>Jump to a topic <span aria-hidden="true">{topicIndexOpen ? "⌃" : "⌄"}</span></Button>
    <section id="grammar-topic-index" className="camp-learning-library-group camp-cheat-topics no-print" aria-labelledby="cheat-topics-heading" data-mobile-expanded={topicIndexOpen}>
      <h2 id="cheat-topics-heading">Topics <span className="camp-hub-section-count">{visibleTopics.length}</span></h2>
      <div className="camp-trainer-grid">{visibleTopics.map(t=><a key={t.id} href={`#${t.id}`} className="camp-learning-library-card" onClick={()=>{setOpen(o=>({...o,[t.open]:true}));setTopicIndexOpen(false);}}><span className="camp-library-card-icon"><LearningArt name={t.art} size={22}/></span><span className="camp-library-card-copy"><strong>{t.title}</strong><span className="camp-hub-meta"><span>{t.parts?`${t.parts} parts`:t.id==="words"?`${essentialVocabularyCount} words`:"Reference table"}</span></span></span><ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true"/></a>)}</div>
    </section>
    <div className="camp-cheat-sections">{GRAMMAR_FOUNDATIONS.filter(l=>shown(l.title)).map(lesson=><details key={lesson.id} id={lesson.id} className="camp-cheat-section" open={printing||(open[lesson.id]??false)} onToggle={event=>{if(printing)return;const expanded=event.currentTarget.open;setOpen(o=>o[lesson.id]===expanded?o:{...o,[lesson.id]:expanded});}}><summary><LearningArt name={lesson.art} size={20}/><h2>{lesson.title}</h2><span className="camp-tip-chevron no-print" aria-hidden="true">⌄</span></summary><GrammarFoundationLesson lesson={lesson}/></details>)}{GRAMMAR_SECTIONS.filter(s=>shown(s.title)).map(section=><details key={section.id} id={section.id} className="camp-cheat-section" open={printing || (open[section.id] ?? false)} onToggle={event=>{if(printing)return;const expanded=event.currentTarget.open;setOpen(o=>o[section.id]===expanded?o:{...o,[section.id]:expanded});}}>
      <summary><LearningArt name={section.art} size={20}/><h2>{section.title}</h2><span className="camp-tip-chevron no-print" aria-hidden="true">⌄</span></summary>
      <CheatSheetContent section={section} showArabic={false} />
    </details>)}
    {shown("Words")&&<details id="words" className="camp-cheat-section camp-words-reference" open={printing||(open.words??false)} onToggle={event=>{if(printing)return;const expanded=event.currentTarget.open;setOpen(o=>o.words===expanded?o:{...o,words:expanded});}}><summary><LearningArt name="book" size={20}/><h2>Words</h2><span className="camp-essential-count">A1–A2 · {essentialVocabularyCount} words</span><span className="camp-tip-chevron no-print" aria-hidden="true">⌄</span></summary>{(printing||open.words)&&<WordsLesson/>}</details>}</div>
    <p className="camp-print-footer">EnglishCamp · Study reference · Examples are learning material, not examination-board questions.</p>
  </div></PageWrapper>;
}
