"use client";
import Link from 'next/link';
import {LearningArt} from '@/components/brand/LearningArt';
import {FruitAvatar} from '@/components/session/FruitAvatar';
import {AdminTimeChart} from './AdminCharts';
import {AdminIcon} from './AdminIcon';

export function AdminOverview({data,recent}:{data:any;recent:any}){
 const summaries=data.summaries||[],courses=summaries.flatMap((s:any)=>s.courses);
 const total=(key:string)=>summaries.reduce((n:number,s:any)=>n+(s[key]||0),0);
 const stats=[{label:'Learners',value:data.totals.learners,sub:'Registered profiles',icon:'chat'},{label:'Recorded XP',value:data.totals.totalXp,sub:'Cumulative rewards',icon:'spark'},{label:'Completed lessons',value:total('lessons'),sub:'Summarized profiles',icon:'book'},{label:'Quiz attempts',value:data.quiz.count,sub:'Selected period',icon:'idea'},{label:'Earned badges',value:total('badgeCount'),sub:'Summarized profiles',icon:'trophy'}];
 const values=[data.totals.approved||0,data.totals.suspended||0],sum=values[0]+values[1],circ=2*Math.PI*65,arc=circ*.75;
 const colors=['var(--camp-purple)','var(--color-neutral-300)'];
 const courseRows=Array.from(new Set(courses.map((c:any)=>c.id))).map(id=>{const rows=courses.filter((c:any)=>c.id===id);return{id,title:rows[0].title,credits:rows.reduce((n:number,c:any)=>n+c.completed,0),stages:[0,1,2].map(i=>rows.reduce((n:number,c:any)=>n+c.recordedStages[i],0))};});
 return <div className="admin-overview">
  <section className="admin-summary-strip" aria-label="Key learning statistics">{stats.map(s=><article key={s.label}><div><span>{s.label}</span><LearningArt name={s.icon} size={17}/></div><strong title={Number(s.value||0).toLocaleString()}>{Number(s.value||0).toLocaleString()}</strong><small>{s.sub}</small></article>)}</section>
  <div className="admin-overview-charts">
   <AdminTimeChart title="Activity overview" series={[{label:'Registrations',rows:data.registrations.map((r:any)=>({label:r.day,value:r.value}))},{label:'Learning events',rows:data.activity.map((r:any)=>({label:r.day,value:r.value}))}]}/>
   <AdminTimeChart title="XP awarded" area showTotal series={[{label:'Learning rewards',rows:data.activity.map((r:any)=>({label:r.day,value:r.xp}))}]}/>
   <section className="admin-access-chart admin-panel"><header className="admin-chart-heading"><div><h2>Learner access</h2><p>Registered online profiles</p></div><LearningArt name="document" size={18}/></header><div className="admin-access-gauge"><svg viewBox="0 0 180 170" role="img" aria-label={`${values[0]} approved learners; ${values[1]} suspended learners`}><circle cx="90" cy="88" r="65" fill="none" stroke="var(--camp-purple-soft)" strokeWidth="14" strokeDasharray={`${arc} ${circ-arc}`} strokeLinecap="round" transform="rotate(135 90 88)"/>{values.map((v,i)=>v>0&&<circle key={i} cx="90" cy="88" r="65" fill="none" stroke={colors[i]} strokeWidth="14" strokeDasharray={`${v/sum*arc} ${circ-v/sum*arc}`} strokeDashoffset={-values.slice(0,i).reduce((a,b)=>a+b,0)/sum*arc} strokeLinecap="round" transform="rotate(135 90 88)"/>)}</svg><div><strong>{sum.toLocaleString()}</strong><span>Total learners</span></div></div><ul className="admin-access-legend">{['Approved','Suspended'].map((label,i)=><li key={label}><i style={{background:colors[i]}}/><span>{label}</span><strong>{values[i].toLocaleString()}</strong></li>)}</ul><Link href="/admin/learners">Manage access <AdminIcon name="arrow" size={14}/></Link></section>
  </div>
  <div className="admin-overview-lower">
   <section className="admin-panel admin-course-performance"><div className="admin-overview-heading"><div><h2>Course progress</h2><p>Credits and recorded practice stages</p></div><Link href="/admin/analytics">View analytics <AdminIcon name="arrow" size={14}/></Link></div><div className="admin-data-scroll admin-report-scroll" tabIndex={0}><table className="admin-data-table admin-report-table"><thead><tr><th>Course</th><th>Credits</th><th>Guided</th><th>Independent</th><th>Assessment</th></tr></thead><tbody>{courseRows.map(c=><tr key={String(c.id)}><td><div className="admin-course-name"><LearningArt name="book" size={20}/><strong>{c.title}</strong></div></td><td>{c.credits}</td>{c.stages.map((n,i)=><td key={i}>{n}</td>)}</tr>)}</tbody></table></div>{!courseRows.length&&<p className="admin-empty-copy">No synchronized course progress yet.</p>}<p className="admin-overview-footnote">Historical credits and recorded stages are counted separately.</p></section>
   <section className="admin-panel admin-recent-learners"><div className="admin-overview-heading"><div><h2>Recent learners</h2><p>Latest online registrations</p></div><Link href="/admin/learners" aria-label="View all learners"><AdminIcon name="arrow" size={16}/></Link></div>{recent===undefined?<p className="admin-empty-copy">Loading recent learners…</p>:recent===null?<p className="admin-empty-copy">Recent profiles are unavailable. Open Learners to retry.</p>:recent.items?.length?<ul>{recent.items.slice(0,4).map((l:any)=><li key={l.id}><FruitAvatar fruit={l.fruit} size={30}/><div><strong dir="auto">{l.name}</strong><small>#{l.number} · {new Date(l.created).toLocaleDateString()}</small></div><span className="admin-status">{l.status==='approved'?'Approved':'Paused'}</span></li>)}</ul>:<p className="admin-empty-copy">No online learners have registered yet.</p>}</section>
  </div>
 </div>;
}
