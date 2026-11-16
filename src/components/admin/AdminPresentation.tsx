"use client";
import type {ReactNode} from 'react';
import {AdminTimeChart} from './AdminCharts';
import {AdminIcon} from './AdminIcon';

import {LearningArt} from '@/components/brand/LearningArt';
import {adminNavigation} from './adminNavigation';

export type ChartRow={label:string;value:number};
const number=(n:number)=>new Intl.NumberFormat('en').format(n);
export function AdminHeading({section,children}:{section:string;children?:ReactNode}){
  const page=adminNavigation.find(p=>p.id===section)||adminNavigation[0];
  return <header className={"admin-title admin-panel"+(section==='dashboard'?' admin-home-title':'')}><div className="admin-title-copy"><p className="admin-breadcrumb">{page.group}<AdminIcon name="arrow" size={10}/><span>{page.label}</span></p><h1>{section==='dashboard'?'Learning overview':page.label}</h1><p>{page.description}</p></div><div className="admin-title-actions">{children}</div></header>;
}
export function MetricScope({children}:{children:ReactNode}){
  return <details className="admin-metric-scope"><summary><AdminIcon name="info" size={14}/>How metrics work</summary><div>{children}</div></details>;
}
export function StatCard({label,value,sub,icon='table',trend}:{label:string;value:number;sub:string;icon?:string;trend?:number[]}){
  const max=Math.max(1,...(trend||[])),points=trend?.map((v,i)=>`${i/Math.max(1,trend.length-1)*72},${24-v/max*20}`).join(' ');
  return <article className="admin-stat"><div className="admin-stat-top"><div><span>{label}</span><strong>{number(value||0)}</strong></div><span className="admin-stat-icon">{['users','shield','lock','mail','server','ticket'].includes(icon)?<AdminIcon name={icon} size={20}/>:<LearningArt name={icon} size={20}/>}</span></div><div className="admin-stat-bottom"><small>{sub}</small>{trend&&trend.length>1&&<svg width="72" height="28" viewBox="0 0 72 28" aria-hidden="true"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.75"/></svg>}</div></article>;
}
export function Breakdown({title,rows}:{title:string;rows:ChartRow[]}){
  const max=Math.max(1,...rows.map(r=>r.value)),sum=rows.reduce((n,r)=>n+r.value,0);
  return <section className="admin-panel admin-breakdown"><div className="admin-panel-heading"><div><h2>{title}</h2><p>{number(sum)} recorded total</p></div><LearningArt name="table" size={20}/></div>{rows.length?<ul className="admin-bars">{rows.map((r,i)=><li key={i}><div><span>{r.label}</span><strong>{number(r.value)}</strong></div><div className="admin-bar-track"><i style={{width:Math.max(0,r.value/max*100)+'%'}}/></div></li>)}</ul>:<div className="admin-chart-empty"><LearningArt name="table" size={24}/><p>No recorded data in this period.</p></div>}</section>;
}
export function TrendChart({title,rows,kind='line'}:{title:string;rows:ChartRow[];kind?:'line'|'bar'}){return <AdminTimeChart title={title} series={[{label:'Recorded total',rows}]} area={kind==='bar'} showTotal/>;}

const metricNotes:Record<string,string>={
  Learners:'Registered online profiles',Approved:'Profiles with platform access',Paused:'Learning records remain saved',
  'New in range':'Registrations in selected period','Invited registrations':'Accounts created by invitation',
  'Recorded XP':'Saved learning rewards','Mean XP':'Per registered online profile','Lesson completions':'Recorded completed lessons',
  'Recorded stages':'Guided, independent and assessment','Quiz attempts in range':'Saved attempts in selected period',
  'Earned badges':'Awards in summarized profiles','Recently active':'Recorded activity in the last 7 days',
  'Learners with incomplete courses':'At least one course still in progress',
};
export function Metrics({values}:{values:Record<string,number>;trend?:number[]}){return <section className="admin-summary-strip" aria-label="Key statistics">{Object.entries(values).map(([label,value])=><article key={label}><div><span>{label}</span><LearningArt name={/badge|award/i.test(label)?'trophy':/XP/.test(label)?'spark':'table'} size={16}/></div><strong>{number(value||0)}</strong><small>{metricNotes[label]||'Selected period'}</small></article>)}</section>;}
