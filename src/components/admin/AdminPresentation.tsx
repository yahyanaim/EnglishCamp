"use client";
import {useId,useState,type ReactNode} from 'react';
import {ChevronRight,Info} from 'lucide-react';
import {LearningArt} from '@/components/brand/LearningArt';
import {adminNavigation} from './adminNavigation';

export type ChartRow={label:string;value:number};
const number=(n:number)=>new Intl.NumberFormat('en').format(n);
export function AdminHeading({section,children}:{section:string;children?:ReactNode}){
  const page=adminNavigation.find(p=>p.id===section)||adminNavigation[0];
  return <header className="admin-title admin-panel"><div className="admin-title-copy"><p className="admin-breadcrumb">{page.group}<ChevronRight size={12}/><span>{page.label}</span></p><h1>{page.label}</h1><p>{page.description}</p></div><div className="admin-title-actions">{children}</div></header>;
}
export function MetricScope({children}:{children:ReactNode}){
  return <details className="admin-metric-scope"><summary><Info size={14}/>How metrics work</summary><div>{children}</div></details>;
}
export function StatCard({label,value,sub,icon='table',trend}:{label:string;value:number;sub:string;icon?:string;trend?:number[]}){
  const max=Math.max(1,...(trend||[])),points=trend?.map((v,i)=>`${i/Math.max(1,trend.length-1)*72},${24-v/max*20}`).join(' ');
  return <article className="admin-stat"><div className="admin-stat-top"><div><span>{label}</span><strong>{number(value||0)}</strong></div><span className="admin-stat-icon"><LearningArt name={icon} size={20}/></span></div><div className="admin-stat-bottom"><small>{sub}</small>{trend&&trend.length>1&&<svg width="72" height="28" viewBox="0 0 72 28" aria-hidden="true"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.75"/></svg>}</div></article>;
}
export function Breakdown({title,rows}:{title:string;rows:ChartRow[]}){
  const max=Math.max(1,...rows.map(r=>r.value)),sum=rows.reduce((n,r)=>n+r.value,0);
  return <section className="admin-panel admin-breakdown"><div className="admin-panel-heading"><div><h2>{title}</h2><p>{number(sum)} recorded total</p></div><LearningArt name="table" size={20}/></div>{rows.length?<ul className="admin-bars">{rows.map((r,i)=><li key={i}><div><span>{r.label}</span><strong>{number(r.value)}</strong></div><div className="admin-bar-track"><i style={{width:Math.max(0,r.value/max*100)+'%'}}/></div></li>)}</ul>:<div className="admin-chart-empty"><LearningArt name="table" size={24}/><p>No recorded data in this period.</p></div>}</section>;
}
export function TrendChart({title,rows,kind='line'}:{title:string;rows:ChartRow[];kind?:'line'|'bar'}){
  const [selected,setSelected]=useState<number|null>(null),id=useId().replace(/:/g,'');
  const max=Math.max(1,...rows.map(r=>r.value)),sum=rows.reduce((n,r)=>n+r.value,0),w=640,h=180,pad=16;
  const dates=rows.map(r=>Date.parse(r.label)),minDate=Math.min(...dates),span=Math.max(1,Math.max(...dates)-minDate);
  const points=rows.map((r,i)=>({x:rows.length===1?w/2:pad+(dates[i]-minDate)/span*(w-pad*2),y:h-pad-r.value/max*(h-pad*2)}));
  const line=points.map(p=>`${p.x},${p.y}`).join(' '),selectedRow=selected===null?null:rows[selected];
  return <section className="admin-panel admin-trend"><div className="admin-panel-heading"><div><h2>{title}</h2><strong className="admin-chart-total">{number(sum)}</strong><p>Recorded dates in the selected period</p></div><LearningArt name={kind==='line'?'pattern':'table'} size={20}/></div>
    {!rows.length?<div className="admin-chart-empty"><LearningArt name="calendar" size={28}/><p>No events recorded in this period yet.</p></div>:<>
      <div className="admin-chart-legend"><span/> {kind==='line'?'Recorded total':'Recorded events'} <strong>{selectedRow?`${selectedRow.label} · ${number(selectedRow.value)}`:'Focus a point to inspect'}</strong></div>
      <div className="admin-plot"><div className="admin-y-axis"><span>{number(max)}</span><span>{number(Math.round(max/2))}</span><span>0</span></div><svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-label={title}>
        <defs><linearGradient id={'fill-'+id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".18"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
        {[pad,h/2,h-pad].map(y=><line key={y} x1={0} x2={w} y1={y} y2={y} className="admin-gridline"/>)}
        {kind==='line'&&rows.length>1?<><polygon points={`${points[0].x},${h-pad} ${line} ${points.at(-1)!.x},${h-pad}`} fill={`url(#fill-${id})`}/><polyline points={line} fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round"/></>:points.map((p,i)=><rect key={i} x={p.x-Math.min(18,w/Math.max(rows.length,1)/3)} y={p.y} width={Math.min(36,w/Math.max(rows.length,1)/1.5)} height={h-pad-p.y} rx="4" fill="currentColor" opacity={selected===null||selected===i?1:.35}/>)}
        {points.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={selected===i?5:3.5} fill="currentColor"/><circle cx={p.x} cy={p.y} r="12" fill="transparent" tabIndex={0} role="button" aria-label={rows[i].label+': '+rows[i].value} onFocus={()=>setSelected(i)} onBlur={()=>setSelected(null)} onMouseEnter={()=>setSelected(i)} onMouseLeave={()=>setSelected(null)} onClick={()=>setSelected(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(i);}}}><title>{rows[i].label}: {rows[i].value}</title></circle></g>)}
      </svg></div><div className="admin-x-axis"><span>{rows[0].label}</span><span>{rows.at(-1)!.label}</span></div>
      <details className="admin-chart-values"><summary>View recorded values</summary><div className="admin-table-wrap"><table><thead><tr><th>Date</th><th>Recorded total</th></tr></thead><tbody>{rows.map(r=><tr key={r.label}><td>{r.label}</td><td>{number(r.value)}</td></tr>)}</tbody></table></div></details>
    </>}
  </section>;
}

const metricNotes:Record<string,string>={
  Learners:'Registered online profiles',Approved:'Profiles with platform access',Paused:'Learning records remain saved',
  'New in range':'Registrations in selected period','Invited registrations':'Accounts created by invitation',
  'Recorded XP':'Saved learning rewards','Mean XP':'Per registered online profile','Lesson completions':'Recorded completed lessons',
  'Recorded stages':'Guided, independent and assessment','Quiz attempts in range':'Saved attempts in selected period',
  'Earned badges':'Awards in summarized profiles','Recently active':'Recorded activity in the last 7 days',
  'Learners with incomplete courses':'At least one course still in progress',
};
export function Metrics({values,trend}:{values:Record<string,number>;trend?:number[]}){
  const secondary=['Mean XP','Quiz attempts in range','Recently active','Learners with incomplete courses'];
  const entries=Object.entries(values),isOverview=entries.length>6;
  return <><div className="admin-kpis">{entries.filter(([label])=>!isOverview||!secondary.includes(label)).map(([label,value])=><StatCard key={label} label={label} value={value} sub={metricNotes[label]||'Recorded learning data'} icon={/XP/.test(label)?'spark':/badge/i.test(label)?'trophy':/stage|lesson/i.test(label)?'book':/range/.test(label)?'calendar':'chat'} trend={label==='New in range'?trend:undefined}/>)}</div>{isOverview&&<section className="admin-secondary-metrics" aria-label="Additional learning metrics">{entries.filter(([label])=>secondary.includes(label)).map(([label,value])=><div key={label}><span>{label}</span><strong>{number(value||0)}</strong><small>{metricNotes[label]}</small></div>)}</section>}</>;
}
