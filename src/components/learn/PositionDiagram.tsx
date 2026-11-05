import { useId } from 'react';
import type { PositionWord } from '@/data/position-lesson';

/** A shared reference object and faceted ball make the spatial relationship the lesson. */
export function PositionDiagram({word}:{word:PositionWord}) {
 const uid=useId();
 const ball=(x:number,y:number,ghost=false)=><g opacity={ghost ? .2 : 1}><circle cx={x} cy={y} r="13" fill="var(--camp-purple,#7e22ce)"/><path d={`M${x-9} ${y-8}L${x+5} ${y-11}L${x-3} ${y+6}Z`} fill="var(--camp-purple-pale,#d8b4fe)"/><path d={`M${x-3} ${y+6}L${x+12} ${y-3}L${x+6} ${y+11}Z`} fill="var(--camp-purple-deep,#581c87)"/></g>;
 const box=(x=80,y=52,w=48,h=40)=><g><path d={`M${x} ${y}h${w}v${h}h-${w}Z`} fill="#eeeaf0" stroke="#a59cae" strokeWidth="1.5"/><path d={`M${x} ${y}l8 -7h${w}l-8 7Z`} fill="#f8f6fa" stroke="#a59cae" strokeWidth="1.5"/><path d={`M${x+w} ${y}l8 -7v${h}l-8 7Z`} fill="#d6d0dc" stroke="#a59cae" strokeWidth="1.5"/></g>;
 const openBox=(x=65,y=38,w=76,h=54)=><path d={`M${x} ${y}v${h}h${w}v-${h}`} fill="none" stroke="#a59cae" strokeWidth="3" strokeLinejoin="round"/>;
 const shelf=<path d="M51 53h106v7H51Z" fill="#d6d0dc" stroke="#a59cae" strokeWidth="1.5"/>;
 const table=<g><path d="M50 42h108v8H50Z" fill="#eeeaf0" stroke="#a59cae" strokeWidth="1.5"/><path d="M61 50v44m86-44v44" stroke="#a59cae" strokeWidth="5"/></g>;
 const arrow=(d:string,head:string)=><g fill="none" stroke="var(--camp-purple,#7e22ce)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/><path d={head}/></g>;
 let scene;
 switch(word.id){
 case 'in':scene=<>{ball(103,75)}{openBox()}</>;break;
 case 'on':scene=<>{table}{ball(104,29)}</>;break;
 case 'under':scene=<>{table}{ball(104,81)}</>;break;
 case 'above':scene=<>{shelf}{ball(104,26)}</>;break;
 case 'below':scene=<>{shelf}{ball(104,87)}</>;break;
 case 'next-to':scene=<>{box(61,50)}{ball(137,79)}</>;break;
 case 'between':scene=<>{box(27,50,34)}{box(147,50,34)}{ball(104,79)}</>;break;
 case 'behind':scene=<>{ball(103,48)}{box(79,54)}</>;break;
 case 'in-front-of':scene=<>{box(79,44)}{ball(104,84)}</>;break;
 case 'opposite':scene=<><path d="M91 8v92h27V8" fill="#eeeaf0"/><path d="M104 12v84" stroke="#a59cae" strokeDasharray="4 4"/>{box(34,48,35)}{ball(159,72)}</>;break;
 case 'near':scene=<>{box(45,50)}{ball(156,79)}</>;break;
 case 'outside':scene=<>{openBox(43,38,71)}{ball(153,79)}</>;break;
 case 'up':scene=<>{ball(104,86,true)}{ball(104,24)}{arrow('M104 67V46','M98 52L104 46L110 52')}</>;break;
 case 'down':scene=<>{ball(104,24,true)}{ball(104,86)}{arrow('M104 43V65','M98 59L104 65L110 59')}</>;break;
 case 'into':scene=<>{openBox(103,38,68)}{ball(43,75,true)}{ball(138,75)}{arrow('M62 69H116','M110 63L116 69L110 75')}</>;break;
 case 'out-of':scene=<>{openBox(37,38,68)}{ball(71,75,true)}{ball(164,75)}{arrow('M91 69H143','M137 63L143 69L137 75')}</>;break;
 }
 return <svg className="camp-position-diagram" viewBox="0 0 208 112" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}><title id={`${uid}-title`}>{word.label}</title><desc id={`${uid}-desc`}>{word.description}</desc>{scene}</svg>;
}
