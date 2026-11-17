"use client";
import {useAdminWorkspace} from './AdminWorkspace';
import {AdminReportExport} from './AdminReportExport';
import {AdminOverview} from './AdminOverview';
import {AdminAchievements} from './AdminAchievements';
import {AdminHeading,MetricScope,Metrics,Breakdown as Bars,TrendChart} from './AdminPresentation';
import {AdminFeedback,AdminRefresh,useAdminResource} from './AdminControls';
export function AdminView({section}:{section:string}){
 const{range}=useAdminWorkspace(),report=useAdminResource('report?'+range),recent=useAdminResource(section==='dashboard'?'directory?page=1':null);
 const data=report.data,summaries=data?.summaries||[],courses=summaries.flatMap((s:any)=>s.courses),total=(key:string)=>summaries.reduce((n:number,s:any)=>n+(s[key]||0),0),badges=total('badgeCount');
 const courseRows=Array.from(new Map(courses.map((c:any)=>[c.id,c.title])).entries()).map(([id,title])=>({label:String(title),value:courses.filter((c:any)=>c.id===id).reduce((n:number,c:any)=>n+c.completed,0)}));
 return <div className="admin-stack"><AdminHeading section={section}><AdminReportExport data={data} section={section} disabled={report.busy||report.loadedAction!=='report?'+range}/><AdminRefresh busy={report.busy} onClick={()=>{report.reload();recent.reload();}}/></AdminHeading><AdminFeedback error={report.error}/>{!data||report.loadedAction!=='report?'+range?<div role="status" className="admin-loading" aria-label="Loading recorded data…">{report.error?<p>Use Refresh to try again.</p>:<><span className="sr-only">Loading recorded data…</span>{Array.from({length:6},(_,i)=><i key={i}/>)}</>}</div>:<>
  {data.pending>0&&<p className="admin-notice">{data.pending} profiles still need summary refresh. Each refresh processes up to 5 changed profiles. Figures cover {summaries.length} summarized profiles.</p>}
  {section==='dashboard'?<AdminOverview data={data} recent={recent.busy?undefined:recent.data}/>:section==='achievements'?<AdminAchievements data={data}/>:<><Metrics values={{'Recorded XP':total('xp'),'Recorded stages':total('stages'),'Quiz attempts in range':data.quiz.count,'Earned badges':badges}}/><div className="admin-chart-grid"><TrendChart title="Registrations" rows={data.registrations.map((r:any)=>({label:r.day,value:r.value}))}/><TrendChart title="Learning events" kind="bar" rows={data.activity.map((r:any)=>({label:r.day,value:r.value}))}/><Bars title="Quiz practice score distribution" rows={data.quiz.bins}/><Bars title="Course credits" rows={courseRows}/></div></>}
  <MetricScope><p>{data.scope}</p><p>Learning charts cover at most 201 summarized profiles. Account totals cover all registered profiles. Historical course credits and current stage evidence are separate.</p></MetricScope>
 </>}</div>;
}
