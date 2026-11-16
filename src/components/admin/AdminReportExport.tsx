"use client";
import {Button} from '@/components/ui/shadcn/button';
import {adminCsv} from '@/lib/adminExport';
import {AdminIcon} from './AdminIcon';
export function AdminReportExport({data,section,disabled}:{data:any;section:string;disabled:boolean}){
 function download(){if(!data)return;const rows:unknown[][]=[['EnglishCamp report',section],['Period start (UTC)',data.period?.since],['Period end, exclusive (UTC)',data.period?.until],[],['Cumulative account metrics','Value'],['Registered learners',data.totals.learners],['Recorded XP',data.totals.totalXp],['Earned badges in summarized profiles',(data.summaries||[]).reduce((n:number,s:any)=>n+s.badgeCount,0)],[],['Selected-period activity','Value'],['Quiz attempts',data.quiz.count],['Registrations',data.totals.registrations],[],['Date (UTC)','Learning events','XP awarded'],...data.activity.map((r:any)=>[r.day,r.value,r.xp]),[],['Badge','Cumulative awards','Awards in period'],...data.awards.filter((a:any)=>a.count>0).map((a:any)=>[a.title,a.count,a.period]),[],['Coverage',data.scope]];
 const url=URL.createObjectURL(new Blob([adminCsv(rows)],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='englishcamp-'+section+'-'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <Button variant="outline" disabled={disabled||!data} onClick={download}><AdminIcon name="download" size={14}/>Export report</Button>;
}
