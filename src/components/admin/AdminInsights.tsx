"use client";
import {useId,useState,type ReactNode} from 'react';
import {AdminIcon} from './AdminIcon';
import {LearningArt} from '@/components/brand/LearningArt';
import './insights.css';
export const adminNumber=(n:number)=>new Intl.NumberFormat('en',{maximumFractionDigits:0}).format(n);
export function AdminMetricStrip({items,label='Key statistics'}:{items:{label:string;value:ReactNode;detail:string;icon:string}[];label?:string}){return <section className="admin-insight-metrics" aria-label={label}>{items.map(item=><article key={item.label}><div><span>{item.label}</span>{['book','trophy','spark','calendar'].includes(item.icon)?<LearningArt name={item.icon} size={18}/>:<AdminIcon name={item.icon} size={18}/>}</div><strong>{item.value}</strong><small>{item.detail}</small></article>)}</section>;}
export function AdminSectionTitle({title,description,children}:{title:string;description:string;children?:ReactNode}){return <header className="admin-insight-title"><div><h2>{title}</h2><p>{description}</p></div>{children}</header>;}
export type PieRow={label:string;value:number};
/** AIhubtools-style donut; the same four recorded response categories retain their values. */
export function AdminPieChart({title,rows,description}:{title:string;rows:PieRow[];description:string}){
 const id=useId(),[selected,setSelected]=useState<number|null>(null),total=rows.reduce((n,r)=>n+r.value,0),radius=74,stroke=24,circumference=2*Math.PI*radius;
 const positive=rows.filter(r=>r.value>0),gap=positive.length>1?Math.min(10,circumference/positive.length*.25):0;let offset=0;
 const segments=rows.map((row,i)=>{const raw=total?row.value/total*circumference:0,segment={...row,i,length:Math.max(raw-gap,1.5),offset:-offset};offset+=raw;return segment;}).filter(r=>r.value>0);
 const active=selected===null?null:rows[selected],percent=(value:number)=>total?(value/total*100).toLocaleString('en',{maximumFractionDigits:1})+'%':'0%';
 return <section className="admin-insight-panel admin-pie-panel" aria-label={title}>
  <AdminSectionTitle title={title} description={description}><span className="admin-pie-count">{adminNumber(total)} total</span></AdminSectionTitle>
  <div className="admin-donut-body">
   {active&&active.value>0&&<div className="admin-donut-tooltip" role="status"><i className={'admin-data-series-'+selected}/><span>{active.label}</span><strong>{adminNumber(active.value)}</strong><small>{percent(active.value)}</small></div>}
   <div className="admin-donut-visual"><svg viewBox="0 0 200 200" role="img" aria-labelledby={id+'-chart'}><title id={id+'-chart'}>{title}: {total?rows.map(r=>`${r.label}: ${adminNumber(r.value)}`).join('; '):'No recorded responses'}</title>
    <circle className="admin-donut-track" cx="100" cy="100" r={radius} fill="none" strokeWidth={stroke}/>
    {segments.map(segment=><circle key={segment.label} className={'admin-donut-segment admin-data-series-'+segment.i+(selected===segment.i?' is-selected':'')+(selected!==null&&selected!==segment.i?' is-dimmed':'')} cx="100" cy="100" r={radius} fill="none" strokeWidth={selected===segment.i?stroke+4:stroke} strokeLinecap="round" strokeDasharray={segments.length===1?undefined:`${segment.length} ${circumference}`} strokeDashoffset={segments.length===1?undefined:segment.offset} onPointerEnter={()=>setSelected(segment.i)} onPointerLeave={()=>setSelected(null)} onClick={()=>setSelected(segment.i)}><title>{segment.label}: {adminNumber(segment.value)} ({percent(segment.value)})</title></circle>)}
   </svg><div className="admin-donut-center"><strong>{active&&active.value>0?percent(active.value):new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(total)}</strong><span>{active&&active.value>0?active.label:'Total'}</span></div></div>
  </div>
  <ul className="admin-pie-legend">{rows.map((row,i)=><li key={row.label}><button type="button" data-active={selected===i} onPointerEnter={()=>setSelected(i)} onPointerLeave={()=>setSelected(null)} onFocus={()=>setSelected(i)} onBlur={()=>setSelected(null)} onClick={()=>setSelected(i)}><i className={'admin-data-series-'+i}/><span>{row.label}</span><strong>{adminNumber(row.value)}</strong><small>{total?percent(row.value):'—'}</small></button></li>)}</ul>
  {!total&&<p className="admin-insight-note">No responses recorded in this period.</p>}
 </section>;
}
