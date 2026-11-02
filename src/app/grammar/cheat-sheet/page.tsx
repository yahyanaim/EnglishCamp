"use client";
import { flushSync } from "react-dom";
import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/shadcn/button";
import { LearningArt } from "@/components/brand/LearningArt";
import { GRAMMAR_SECTIONS } from "@/data/grammar-cheat-sheet";
import { GRAMMAR_ARABIC } from "@/data/grammar-cheat-sheet-ar";
import { CheatSheetContent } from "@/components/learn/CheatSheetContent";

export default function CheatSheetPage() {
  const [open, setOpen] = useState<Record<string,boolean>>({});
  const [printing, setPrinting] = useState(false);
  const [arabic, setArabic] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const before = () => flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before); window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);
  return <PageWrapper><div className="camp-cheat-sheet">
    <PageBanner><h1>Grammar Cheat Sheet</h1><p>Rules, forms and examples to study on screen or print. All sections are included when printing.</p></PageBanner>
    <div className="camp-print-controls no-print"><p>{GRAMMAR_SECTIONS.length} reference sections · click a topic icon for Arabic</p><div><Button variant="outline" onClick={()=>setOpen(Object.fromEntries(GRAMMAR_SECTIONS.map(s=>[s.id,true])))}>Expand all</Button><Button variant="outline" onClick={()=>setOpen(Object.fromEntries(GRAMMAR_SECTIONS.map(s=>[s.id,false])))}>Collapse all</Button><Button variant="outline" asChild><a href="/media/grammar/englishcamp-grammar-reference.pdf" download>Download English PDF</a></Button><Button onClick={()=>window.print()}><LearningArt name="Printer" size={16}  />Print / PDF</Button></div></div>
    <nav className="camp-cheat-index no-print" aria-label="Grammar topics">{GRAMMAR_SECTIONS.map(section=><a key={section.id} href={`#${section.id}`} onClick={()=>setOpen(o=>({...o,[section.id]:true}))}><LearningArt name={section.art} size={20} />{section.title}</a>)}</nav>
    <div className="camp-cheat-sections">{GRAMMAR_SECTIONS.map(section=><details key={section.id} id={section.id} className="camp-cheat-section" open={printing || (open[section.id] ?? true)} onToggle={event=>{if(printing)return;const expanded=event.currentTarget.open;setOpen(o=>o[section.id]===expanded?o:{...o,[section.id]:expanded});}}>
      <summary><button type="button" className="camp-cheat-translate no-print" aria-label={`${arabic[section.id] ? "Hide" : "Show"} Arabic translation: ${section.title}`} aria-pressed={!!arabic[section.id]} onClick={event=>{event.preventDefault();event.stopPropagation();setArabic(a=>({...a,[section.id]:!a[section.id]}));setOpen(o=>({...o,[section.id]:true}));}}><LearningArt name={section.art} size={24} /></button><h2>{section.title}{arabic[section.id]&&<small className="font-arabic" lang="ar" dir="rtl">{GRAMMAR_ARABIC[section.id].title}</small>}</h2><span className="camp-tip-chevron no-print" aria-hidden="true">⌄</span></summary>
      <CheatSheetContent section={section} showArabic={!!arabic[section.id]} />
    </details>)}</div>
    <p className="camp-print-footer">EnglishCamp · Study reference · Examples are learning material, not examination-board questions.</p>
  </div></PageWrapper>;
}
