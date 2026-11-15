"use client";
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {StatCard,TrendChart,type ChartRow} from './AdminPresentation';
import {FruitAvatar} from '@/components/session/FruitAvatar';

export function AdminOverview({data,recent}:{data:any;recent:any}){
  const [metric,setMetric]=useState('registrations');
  const summaries=data.summaries||[],courses=summaries.flatMap((s:any)=>s.courses);
  const total=(key:string)=>summaries.reduce((n:number,s:any)=>n+(s[key]||0),0);
  const views=[{id:'registrations',label:'Registrations'},{id:'activity',label:'Learning events'},{id:'xp',label:'XP awarded'}];
  const series:ChartRow[]=(metric==='registrations'?data.registrations:data.activity).map((r:any)=>({label:r.day,value:metric==='xp'?r.xp:r.value}));
  const labels=['Approved','Suspended'],values=[data.totals.approved||0,data.totals.suspended||0],sum=values.reduce((a,b)=>a+b,0),circ=2*Math.PI*66;
  const colors=['var(--camp-purple)','var(--color-neutral-300)'];
  const courseRows=Array.from(new Set(courses.map((c:any)=>c.id))).map(id=>{const rows=courses.filter((c:any)=>c.id===id);return{id,title:rows[0].title,credits:rows.reduce((n:number,c:any)=>n+c.completed,0),stages:[0,1,2].map(i=>rows.reduce((n:number,c:any)=>n+c.recordedStages[i],0))};});
  const max=Math.max(1,...courseRows.map(c=>c.stages.reduce((a,b)=>a+b,0)));
  return <div className="admin-overview">
    <div className="admin-overview-kpis">
      <StatCard label="Online learners" value={data.totals.learners} sub={`${data.totals.registrations||0} registrations in the selected period`} icon="chat"/>
      <StatCard label="Recorded XP" value={data.totals.totalXp} sub="Learning rewards across online profiles" icon="spark"/>
      <StatCard label="Completed lessons" value={total('lessons')} sub="Recorded in summarized profiles" icon="book"/>
      <StatCard label="Earned badges" value={total('badgeCount')} sub="Awards in summarized profiles" icon="trophy"/>
    </div>
    <div className="admin-overview-charts">
      <section className="admin-growth admin-panel" aria-label="Platform activity chart"><div className="admin-chart-tabs" role="group" aria-label="Activity metric">{views.map(v=><button key={v.id} aria-pressed={metric===v.id} onClick={()=>setMetric(v.id)}>{v.label}</button>)}</div><TrendChart key={metric} title={views.find(v=>v.id===metric)!.label+' over time'} rows={series} kind={metric==='activity'?'bar':'line'}/></section>
      <section className="admin-panel admin-access-chart"><header><h2>Learner access</h2><p>Registered online accounts</p></header><div className="admin-donut"><svg viewBox="0 0 180 180" role="img" aria-label={`Learner access: ${values[0]} approved, ${values[1]} suspended`}><circle cx="90" cy="90" r="66" fill="none" stroke="var(--camp-purple-soft)" strokeWidth="17"/>{values.map((v,i)=>v>0&&<circle key={i} cx="90" cy="90" r="66" fill="none" stroke={colors[i]} strokeWidth="17" strokeDasharray={`${v/sum*circ} ${circ-v/sum*circ}`} strokeDashoffset={-values.slice(0,i).reduce((a,b)=>a+b,0)/sum*circ} transform="rotate(-90 90 90)"/>)}</svg><div><strong>{sum.toLocaleString()}</strong><span>Total learners</span></div></div><ul className="admin-donut-legend">{labels.map((label,i)=><li key={label}><span style={{background:colors[i]}}/><span>{label}</span><strong>{values[i].toLocaleString()}</strong></li>)}</ul><Link href="/admin/learners">Manage learner access <ArrowUpRight size={14}/></Link></section>
    </div>
    <div className="admin-overview-lower">
      <section className="admin-panel admin-course-chart"><div className="admin-overview-heading"><div><h2>Learning across courses</h2><p>Recorded practice stages in summarized profiles</p></div><Link href="/admin/analytics" aria-label="Open learning analytics"><ArrowUpRight size={17}/></Link></div><div className="admin-stage-legend">{['Guided','Independent','Assessment'].map((s,i)=><span key={s}><i className={'admin-stage-'+i}/>{s}</span>)}</div><div className="admin-course-bars">{courseRows.map(c=><article key={String(c.id)}><header><span>{c.title}</span><strong>{c.stages.reduce((a,b)=>a+b,0)}</strong></header><div role="img" aria-label={c.title+': guided '+c.stages[0]+', independent '+c.stages[1]+', assessment '+c.stages[2]}>{c.stages.map((v,i)=><i key={i} className={'admin-stage-'+i} style={{width:v/max*100+'%'}}/>)}</div><small>{c.credits} course credits · {c.stages.join(' / ')} stages</small></article>)}</div><p className="admin-overview-footnote">Historical course credits and recorded practice stages are counted separately.</p></section>
      <section className="admin-panel admin-recent-learners"><div className="admin-overview-heading"><div><h2>Recent learners</h2><p>Latest registered online profiles</p></div><Link href="/admin/learners">View all <ArrowUpRight size={13}/></Link></div>{recent===null?<p>Recent profiles are unavailable. Open Learners to try again.</p>:recent.items?.length?<ul>{recent.items.slice(0,5).map((l:any)=><li key={l.id}><FruitAvatar fruit={l.fruit} size={34}/><div><strong dir="auto">{l.name}</strong><small>#{l.number} · {new Date(l.created).toLocaleDateString()}</small></div><span className="admin-status">{l.status==='approved'?'Approved':'Paused'}</span></li>)}</ul>:<p>No online learners have registered yet.</p>}<p className="admin-overview-footnote">Names and progress are visible only in the protected administrator workspace.</p></section>
    </div>
  </div>;
}
