"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/shadcn/button";
import { COMPARATIVE_CATEGORIES } from "@/data/british-vs-american";

export default function BritishVsAmericanPage() {
  const [activeCategory,setActiveCategory]=useState(COMPARATIVE_CATEGORIES[0].id);
  const [search,setSearch]=useState("");
  const current=COMPARATIVE_CATEGORIES.find(c=>c.id===activeCategory)!;
  const query=search.trim().toLowerCase();
  const filtered=current.entries.filter(e=>!query||[e.british,e.american,e.meaning,e.meaningAr||""].some(value=>value.toLowerCase().includes(query)));
  return <PageWrapper><div className="camp-english-comparison">
    <PageBanner><h1>British vs American English</h1><p>Compare vocabulary, spelling, grammar, pronunciation and dates.</p></PageBanner>
    <div className="camp-comparison-filters" aria-label="Comparison categories">{COMPARATIVE_CATEGORIES.map(cat=><Button key={cat.id} variant={activeCategory===cat.id?"default":"outline"} aria-pressed={activeCategory===cat.id} onClick={()=>{setActiveCategory(cat.id);setSearch("");}}><LearningArt name={({vocabulary:"book",spelling:"note",grammar:"pattern",pronunciation:"mic",dates:"calendar"} as Record<string,string>)[cat.id]||cat.icon} size={20}/>{cat.label}</Button>)}</div>
    <label className="camp-comparison-search"><Search size={17}/><span className="sr-only">Search in {current.label}</span><input aria-label={`Search in ${current.label}`} value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search in ${current.label}...`}/>{search&&<Button variant="ghost" size="icon" aria-label="Clear search" onClick={()=>setSearch("")}><X size={16}/></Button>}</label>
    <div className="camp-comparison-section-heading"><h2>{current.label}</h2>{current.labelAr&&<span lang="ar" dir="rtl">{current.labelAr}</span>}<span>{filtered.length} {filtered.length===1?"comparison":"comparisons"}</span></div>
    <div className="camp-comparison-grid">{filtered.map((entry,i)=><article className="camp-comparison-card" key={`${activeCategory}-${i}`}>
      <div className="camp-comparison-pair"><div><span>British English</span><h3>{entry.british}</h3></div><div><span>American English</span><h3>{entry.american}</h3></div></div>
      <div className="camp-comparison-meaning"><p>{entry.meaning}</p>{entry.meaningAr&&<p lang="ar" dir="rtl">{entry.meaningAr}</p>}</div>
      {entry.notes&&<p className="camp-comparison-note"><strong>In context</strong>{entry.notes}</p>}
    </article>)}</div>
    {!filtered.length&&<p className="camp-comparison-empty">No comparisons found. Try another search.</p>}
  </div></PageWrapper>;
}
