import type { ReadingArticle } from "@/data/reading-articles";

/** Original violet scenes; decorative, with the article title providing the text alternative. */
export function ReadingIllustration({ article }: { article: Pick<ReadingArticle,"id"|"category"> }) {
  const garden = /garden/.test(article.id) || article.category === "Environment";
  const library = /library/.test(article.id) || article.category === "Education";
  const repair = /repair/.test(article.id);
  const map = /map/.test(article.id);
  const journey = /commute/.test(article.id);
  const c = {ink:"#581C87",violet:"#7E22CE",mid:"#A855F7",light:"#D8B4FE",pale:"#F3E8FF",paper:"#FFF9F2"};
  return <svg className="camp-reading-art" width="168" height="116" viewBox="0 0 240 164" aria-hidden="true" focusable="false">
    <path d="m18 67 50-50 103 4 54 67-37 57-123 8Z" fill={c.pale}/><path d="m68 17 48 75 55-71Z" fill={c.light} opacity=".5"/><ellipse cx="122" cy="147" rx="94" ry="8" fill={c.light} opacity=".4"/>
    {garden ? <>
      <path d="M37 100h167l-19 39H54Z" fill={c.violet}/><path d="m37 100 92 15 75-15-19 39H54Z" fill={c.ink}/>
      {[68,120,172].map((x,i)=><g key={x}><path d={`M${x} 105V${48+i*8}`} stroke={c.ink} strokeWidth="4"/><path d={`M${x} ${79+i*3}q-32-3-30-28 29 0 30 28Z`} fill={c.mid}/><path d={`M${x} ${64+i*5}q30-4 29-28-29 1-29 28Z`} fill={c.violet}/></g>)}
      <path d="m54 118 130 12" stroke={c.light} strokeWidth="3"/>
    </> : library ? <>
      <path d="M45 31h152v112H45Z" fill={c.ink}/><path d="M52 38h138v96H52Z" fill={c.paper}/>
      {[49,96].map((y)=><g key={y}><path d={`M58 ${y}h19v31H58Z`} fill={c.mid}/><path d={`M81 ${y-5}h18v36H81Z`} fill={c.violet}/><path d={`m109 ${y} 16-4 8 33-16 4Z`} fill={c.light}/><path d={`M139 ${y+4}h36v27h-36Z`} fill={c.mid}/><path d={`M52 ${y+34}h138v7H52Z`} fill={c.ink}/></g>)}
    </> : repair ? <>
      <path d="M28 115h185v12H28Z" fill={c.ink}/><path d="M44 127h10v20H44Zm142 0h10v20h-10Z" fill={c.violet}/>
      <path d="M61 61h74v51H61Z" fill={c.paper}/><path d="M67 67h62v32H67Z" fill={c.light}/><path d="m59 106 79 0 10 9H50Z" fill={c.violet}/><path d="m83 79 13 11 19-16" fill="none" stroke={c.ink} strokeWidth="3"/>
      <path d="m162 42 13 13-9 10-8-2-18 31 8 8 12-3 17-30 10-3 8-14-16-1-3-14Z" fill={c.mid}/><circle cx="151" cy="97" r="3" fill={c.paper}/>
    </> : map ? <>
      <path d="m37 43 52-14 61 16 52-14v99l-52 15-61-16-52 15Z" fill={c.paper}/><path d="m89 29 61 16v100l-61-16Z" fill={c.light}/><path d="m47 115 31-32 41 22 56-39 16 13" fill="none" stroke={c.mid} strokeWidth="5" strokeDasharray="7 5"/><path d="M151 58a20 20 0 1 1 40 0c0 17-20 34-20 34s-20-17-20-34Z" fill={c.violet}/><circle cx="171" cy="57" r="7" fill={c.paper}/>
    </> : journey ? <>
      <path d="M37 47h166v77H37Z" fill={c.violet}/><path d="M45 56h45v35H45Zm53 0h45v35H98Zm53 0h44v35h-44Z" fill={c.paper}/><path d="M38 104h164v8H38Z" fill={c.light}/><circle cx="70" cy="126" r="16" fill={c.ink}/><circle cx="70" cy="126" r="7" fill={c.light}/><circle cx="174" cy="126" r="16" fill={c.ink}/><circle cx="174" cy="126" r="7" fill={c.light}/><path d="M29 144h185" stroke={c.ink} strokeWidth="3"/>
    </> : <>
      <path d="M68 24h112v91H68Z" fill={c.paper}/><path d="m68 24 23 91H68Z" fill={c.light}/><path d="M90 45h68M90 59h49M90 73h60" stroke={c.mid} strokeWidth="4"/><path d="m127 91 9 9 20-22" fill="none" stroke={c.violet} strokeWidth="5"/>
      {[50,116,188].map((x,i)=><g key={x}><circle cx={x} cy={105+i%2*9} r="13" fill={c.light}/><path d={`M${x-22} 146v-16q22-24 44 0v16Z`} fill={i===1?c.mid:c.violet}/><path d={`m${x-22} 146 22-27 22 27Z`} fill={c.ink} opacity=".3"/></g>)}
    </>}
    <path d="m212 18 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill={c.mid}/>
  </svg>;
}
