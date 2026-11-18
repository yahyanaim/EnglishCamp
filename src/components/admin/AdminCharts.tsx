"use client";
import {useEffect,useId,useRef,useState} from 'react';
import {LearningArt} from '@/components/brand/LearningArt';
export type TimeRow={label:string;value:number};
type Series={label:string;rows:TimeRow[]};
const format=(n:number)=>new Intl.NumberFormat('en',{maximumFractionDigits:0}).format(n);
/** Observed timestamps only. The curves interpolate between recorded points; no historical observations are invented. */
export function AdminTimeChart({title,series,area=false,showTotal=false}:{title:string;series:Series[];area?:boolean;showTotal?:boolean}){
 const id=useId().replace(/:/g,''),ref=useRef<SVGSVGElement>(null);
 const [width,setWidth]=useState(600),[selected,setSelected]=useState<string|null>(null);
 const all=series.flatMap(s=>s.rows),dates=Array.from(new Set(all.map(r=>r.label))).sort();
 const hasData=all.length>0;
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new ResizeObserver(([entry])=>{setWidth(Math.max(100,Math.round(entry.contentRect.width)));});observer.observe(node);return()=>observer.disconnect();},[hasData]);
 const max=Math.max(1,...all.map(r=>r.value)),from=Date.parse(dates[0]),to=Date.parse(dates.at(-1)||''),span=Math.max(1,to-from),h=170,pad=10;
 const xy=(r:TimeRow)=>({x:dates.length===1?width/2:pad+(Date.parse(r.label)-from)/span*(width-pad*2),y:pad+(1-r.value/max)*(h-pad*2)});
 const path=(rows:TimeRow[])=>rows.map((r,i)=>{const p=xy(r);if(!i)return`M${p.x},${p.y}`;const a=xy(rows[i-1]),cx=(a.x+p.x)/2;return`C${cx},${a.y} ${cx},${p.y} ${p.x},${p.y}`;}).join(' ');
 const total=series[0]?.rows.reduce((n,r)=>n+r.value,0)||0;
 return <section className={'admin-time-chart'+(area?' is-area':'')} aria-label={title}>
  <header className="admin-chart-heading"><div><h2>{title}</h2><p>Recorded in the selected period</p></div><LearningArt name={area?'spark':'pattern'} size={18}/></header>
  {showTotal&&<strong className="admin-chart-figure">{format(total)}</strong>}
  <div className="admin-series-legend">{series.map((s,i)=><span key={s.label}><i className={'admin-series-'+i}/>{s.label}</span>)}</div>
  {!all.length?<div className="admin-plot-empty"><LearningArt name="calendar" size={24}/><p>No recorded activity in this period.</p></div>:<>
   <div className="admin-time-plot">
    <div className="admin-time-axis"><span>{format(max)}</span><span>{new Intl.NumberFormat('en',{maximumFractionDigits:1}).format(max/2)}</span><span>0</span></div>
    <svg ref={ref} viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none" aria-label={title}>
     <defs><linearGradient id={'area-'+id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--camp-purple)" stopOpacity=".22"/><stop offset="1" stopColor="var(--camp-purple)" stopOpacity=".01"/></linearGradient></defs>
     {[pad,h/2,h-pad].map(y=><line key={y} x1="0" x2={width} y1={y} y2={y} className="admin-time-grid"/>)}
     {series.map((s,i)=>{const rows=[...s.rows].sort((a,b)=>a.label.localeCompare(b.label));if(!rows.length)return null;const d=path(rows),first=xy(rows[0]),last=xy(rows.at(-1)!);return <g key={s.label} className={'admin-time-series admin-series-'+i}>
      {area&&(rows.length>1?<path d={`${d}L${last.x},${h-pad}L${first.x},${h-pad}Z`} fill={`url(#area-${id})`} stroke="none"/>:<rect x={first.x-10} y={first.y} width="20" height={h-pad-first.y} rx="4" fill={`url(#area-${id})`} stroke="none"/>)}
      {rows.length>1&&<path d={d} fill="none" stroke="currentColor" strokeWidth={area?2:1.6} vectorEffect="non-scaling-stroke"/>}
      {rows.map(r=>{const p=xy(r);return <g key={r.label}><circle cx={p.x} cy={p.y} r={selected===r.label?3.5:2} fill="currentColor"/><circle cx={p.x} cy={p.y} r="9" fill="transparent" tabIndex={0} role="button" aria-label={`${s.label}, ${r.label}: ${format(r.value)}`} onPointerEnter={()=>setSelected(r.label)} onPointerLeave={()=>setSelected(null)} onFocus={()=>setSelected(r.label)} onBlur={()=>setSelected(null)} onClick={()=>setSelected(r.label)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(r.label);}}}/></g>;})}
     </g>;})}
    </svg>
    {selected&&<div className="admin-chart-tooltip" role="status"><strong>{selected}</strong>{series.map((s,i)=><div key={s.label}><span><i className={'admin-series-'+i}/>{s.label}</span><b>{s.rows.some(r=>r.label===selected)?format(s.rows.find(r=>r.label===selected)!.value):'Not recorded'}</b></div>)}</div>}
   </div><div className="admin-time-dates"><span>{dates[0]}</span>{dates.length>1&&<span>{dates.at(-1)}</span>}</div>
   <details className="admin-chart-values"><summary>Recorded values</summary><div className="admin-data-scroll admin-report-scroll" tabIndex={0}><table className="admin-data-table admin-report-table"><thead><tr><th>Date</th>{series.map(s=><th key={s.label}>{s.label}</th>)}</tr></thead><tbody>{dates.map(day=><tr key={day}><td>{day}</td>{series.map(s=><td key={s.label}>{s.rows.some(r=>r.label===day)?format(s.rows.find(r=>r.label===day)!.value):'Not recorded'}</td>)}</tr>)}</tbody></table></div></details>
  </>}
 </section>;
}
