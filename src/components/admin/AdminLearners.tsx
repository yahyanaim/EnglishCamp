"use client";
import {useEffect,useState} from 'react';
import {useAdminWorkspace} from './AdminWorkspace';
import {AdminHeading,StatCard} from './AdminPresentation';
import {AdminIcon} from './AdminIcon';
import {AdminConfirm,AdminCopy,AdminFeedback,AdminPagination,AdminRefresh,AdminStatus,adminRequest,useAdminResource} from './AdminControls';
import {FruitAvatar} from '@/components/session/FruitAvatar';
import {Button} from '@/components/ui/shadcn/button';
import {Input} from '@/components/ui/shadcn/input';
import {SelectField} from '@/components/ui/shadcn/select-field';
import {AdminLearnerPanel} from './AdminLearnerPanel';
import {adminCsv} from '@/lib/adminExport';
const idLabel=(n:number)=>'EC-'+String(n).padStart(4,'0');
const date=(value:string|null)=>value?new Date(value).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'}):'Not recorded';
type Payment = { mode: 'legacy'|'trial'; trialUntil: number; paidUntil: number; lastPaidAt: number; subscriptionStatus: string|null };
type Billing = { enabled: boolean; sandbox: boolean; asOf: number };
function paymentLabel(payment: Payment|undefined, billing: Billing|undefined) {
 if (!payment || !billing) return 'Not recorded';
 if (payment.paidUntil > billing.asOf) return billing.sandbox ? 'Sandbox payment' : 'Paid';
 if (payment.mode === 'legacy') return 'Grandfathered';
 if (!billing.enabled) return 'Billing disabled';
 if (payment.trialUntil > billing.asOf) return 'Free trial';
 return 'Payment required';
}
function PaymentCell({payment,billing}:{payment?:Payment;billing?:Billing}) {
 const status=paymentLabel(payment,billing);
 const until=payment&&billing?(payment.paidUntil>billing.asOf?payment.paidUntil:status==='Free trial'?payment.trialUntil:0):0;
 const renewal=payment?.subscriptionStatus?.toLowerCase().replaceAll('_',' ');
 return <div className="admin-payment-cell">
  <AdminStatus tone={status==='Paid'?'good':status==='Payment required'?'warning':'quiet'}>{status}</AdminStatus>
  {until>0&&<small>Until {date(new Date(until*1000).toISOString())}</small>}
  {!!payment?.lastPaidAt&&<small>Last payment {date(new Date(payment.lastPaidAt*1000).toISOString())}</small>}
  {renewal&&<small>PayPal · {renewal}</small>}
 </div>;
}
export function AdminLearners(){
 const{inspectId,setInspectId}=useAdminWorkspace();
 const[draft,setDraft]=useState(''),[query,setQuery]=useState(''),[status,setStatus]=useState('all'),[activity,setActivity]=useState('all'),[registered,setRegistered]=useState('all'),[sort,setSort]=useState('created'),[direction,setDirection]=useState('desc'),[page,setPage]=useState(1),[selected,setSelected]=useState<string|null>(null),[change,setChange]=useState<any>(null),[saving,setSaving]=useState(false),[saveError,setSaveError]=useState('');
 useEffect(()=>{if(inspectId)setSelected(inspectId);},[inspectId]);
 function closeDetails(){setSelected(null);setInspectId(null);}
 useEffect(()=>{const id=new URL(window.location.href).searchParams.get('profile');if(id&&id.length<=64)setSelected(id);},[]);
 useEffect(()=>{const timer=setTimeout(()=>{setPage(1);setQuery(draft.trim());},250);return()=>clearTimeout(timer);},[draft]);
 const request='directory?'+new URLSearchParams({page:String(page),q:query,status,activity,registered,sort,direction});
 const{data,error,busy,reload,loadedAction}=useAdminResource(request);

 useEffect(()=>{if(data&&loadedAction===request&&data.page!==page)setPage(data.page);},[data,page,loadedAction,request]);
 function toggleSort(field:string){setPage(1);setSort(field);setDirection(sort===field&&direction==='asc'?'desc':'asc');}
 function exportPage(){const rows=[['ID','Name','Email','Registered','Access','Payment','PayPal subscription','Trial ends (UTC)','Paid through (UTC)','Last payment (UTC)','XP','Course credits','Badges','Last recorded activity'],...(data?.items||[]).map((l:any)=>[idLabel(l.number),l.name,l.email||'',l.created,l.status,paymentLabel(l.payment,data?.billing),l.payment?.subscriptionStatus||'',
 ...[l.payment?.trialUntil,l.payment?.paidUntil,l.payment?.lastPaidAt].map(v=>v?new Date(v*1000).toISOString():''),l.summary?.xp??'',l.summary?.courses.reduce((n:number,c:any)=>n+c.completed,0)??'',l.summary?.badges.length??'',l.summary?.lastActivity||''])];const url=URL.createObjectURL(new Blob([adminCsv(rows)],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='englishcamp-learners-page-'+page+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function saveAccess(){if(saving||!change)return;setSaving(true);setSaveError('');try{await adminRequest('learner',{body:{id:change.id,status:change.status==='approved'?'suspended':'approved'}});setChange(null);reload();window.dispatchEvent(new Event('camp-admin-refresh'));}catch(e){setSaveError((e as Error).message);}finally{setSaving(false);}}
 const sortHead=(field:string,label:string)=><th aria-sort={sort===field?(direction==='asc'?'ascending':'descending'):'none'}><button onClick={()=>toggleSort(field)}>{label}<AdminIcon name={sort===field?'sort-'+direction:'sort'} size={12}/></button></th>;
 return <div className="admin-stack"><AdminHeading section="learners"><AdminRefresh busy={busy} onClick={reload}/></AdminHeading><AdminFeedback error={error}/>
  <section className="admin-kpi-grid admin-learner-kpis" aria-label="Learner statistics"><StatCard label="Total registered learners" value={data?.overview?.total||0} sub="All online profiles" icon="users"/><StatCard label="Approved accounts" value={data?.overview?.approved||0} sub="Admitted by the owner" icon="shield"/><StatCard label="Paused accounts" value={data?.overview?.paused||0} sub="Progress is preserved" icon="lock"/></section>
  <section className="admin-distribution-card" aria-label="Account access distribution"><header><h2>Account access distribution</h2><p>All registered learners, independent of table filters.</p></header><div className="admin-distribution-track"><i style={{width:((data?.overview?.approved||0)/Math.max(1,data?.overview?.total||0)*100)+'%'}}/><i style={{width:((data?.overview?.paused||0)/Math.max(1,data?.overview?.total||0)*100)+'%'}}/></div><div className="admin-distribution-labels"><span><i/>{data?.overview?.approved||0} approved</span><span><i/>{data?.overview?.paused||0} paused</span></div></section>
  <div className="admin-filter-row"><div className="admin-filter-pills" aria-label="Learner access filters">{[{key:'all',label:'All',count:data?.counts?.total},{key:'approved',label:'Approved',count:data?.counts?.approved},{key:'suspended',label:'Paused',count:data?.counts?.suspended}].map(t=><button key={t.key} aria-pressed={status===t.key} onClick={()=>{setPage(1);setStatus(t.key);}}>{t.label}<span>({t.count??0})</span></button>)}</div><div className="admin-inline-filters"><SelectField aria-label="Activity filter" value={activity} onValueChange={v=>{setPage(1);setActivity(v);}}><option value="all">All activity</option><option value="active">Active in last 7 days</option><option value="inactive">No recent activity</option></SelectField><SelectField aria-label="Registration period" value={registered} onValueChange={v=>{setPage(1);setRegistered(v);}}><option value="all">All registration dates</option>{['7','30','90','365'].map(v=><option key={v} value={v}>Last {v} days</option>)}</SelectField></div></div>
  <section className="admin-data-card" aria-label="Registered accounts" aria-busy={busy}><header className="admin-data-header"><div><h2>Registered accounts</h2><p>Profiles, recorded learning, payment and platform access.</p></div><div className="admin-data-tools"><label className="admin-search"><AdminIcon name="search" size={15}/><Input type="search" aria-label="Search learners" placeholder="Search name, email or ID…" maxLength={80} value={draft} onChange={e=>setDraft(e.target.value)}/></label><Button variant="outline" disabled={busy||!data?.items?.length} onClick={exportPage}><AdminIcon name="download" size={14}/>Export page</Button></div></header>
   <div className="admin-data-scroll"><table className="admin-data-table"><thead><tr><th>ID</th>{sortHead('name','Account')}{sortHead('created','Registered')}{sortHead('xp','Learning')}<th>Payment</th><th className="align-right">Status</th><th className="align-right">Action</th></tr></thead><tbody>{busy?<tr><td colSpan={7} className="admin-data-empty">Loading accounts…</td></tr>:data?.items?.length?data.items.map((l:any)=><tr key={l.id} tabIndex={0} aria-label={'View profile '+l.name} onClick={()=>setSelected(l.id)} onKeyDown={e=>{if(e.target===e.currentTarget&&(e.key==='Enter'||e.key===' ')){e.preventDefault();setSelected(l.id);}}}><td><AdminCopy value={idLabel(l.number)} label={'Copy profile ID '+idLabel(l.number)}><span className="admin-id-badge">{idLabel(l.number)}</span></AdminCopy></td><td><button className="admin-account" onClick={()=>setSelected(l.id)} aria-label={'View '+l.name}><span className="admin-account-avatar"><FruitAvatar fruit={l.fruit} size={36}/><i className={l.status==='approved'?'is-approved':''}/></span><span><strong dir="auto">{l.name}</strong><small dir={l.email?'ltr':undefined}>{l.email||(l.source==='invitation'?'Invited learner':'Existing learner')}</small></span></button></td><td className="admin-nowrap">{date(l.created)}</td><td>{l.summary?<div className="admin-learning-cell"><strong>{l.summary.courses.reduce((n:number,c:any)=>n+c.completed,0)} / {l.summary.courses.reduce((n:number,c:any)=>n+c.total,0)} course credits</strong><div className="admin-table-progress"><i style={{width:(l.summary.courses.reduce((n:number,c:any)=>n+c.completed,0)/Math.max(1,l.summary.courses.reduce((n:number,c:any)=>n+c.total,0))*100)+'%'}}/></div><small>{l.summary.xp.toLocaleString()} XP · {l.summary.badges.length} badges</small></div>:<small>Summary pending</small>}</td><td><PaymentCell payment={l.payment} billing={data.billing}/></td><td className="align-right"><AdminStatus tone={l.status==='approved'?'good':'quiet'}>{l.status==='approved'?'Approved':'Paused'}</AdminStatus></td><td><div className="admin-row-actions"><button className="admin-row-icon" title="View profile" aria-label={'View '+l.name} onClick={e=>{e.stopPropagation();setSelected(l.id);}}><AdminIcon name="eye" size={17}/></button><button className="admin-row-icon" title={l.status==='approved'?'Pause access':'Restore access'} aria-label={(l.status==='approved'?'Pause ':'Restore ')+l.name} onClick={e=>{e.stopPropagation();setSaveError('');setChange(l);}}><AdminIcon name={l.status==='approved'?'lock':'shield'} size={16}/></button></div></td></tr>):<tr><td colSpan={7} className="admin-data-empty">{error?'Use Refresh to try again.':'No matching accounts found.'}</td></tr>}</tbody></table></div>
   <AdminPagination page={data?.page||page} total={data?.total||0} onChange={setPage} busy={busy}/>
  </section>{data?.pending>0&&<p className="admin-note">{data.pending} learning summaries are waiting to refresh. Each refresh processes up to five profiles; existing progress is preserved.</p>}
  <AdminConfirm open={!!change} onClose={()=>setChange(null)} onConfirm={()=>void saveAccess()} title={change?.status==='approved'?'Pause learner access?':'Restore learner access?'} description={change?.status==='approved'?'This learner will be unable to use the platform until you restore access. Their progress, badges, notes and recovery code will remain saved.':'This learner can sign in with their existing recovery code and continue their saved progress.'} confirmLabel={change?.status==='approved'?'Pause access':'Restore access'} busy={saving} error={saveError}/>
  <AdminLearnerPanel id={selected} onClose={closeDetails} onChanged={reload}/>
 </div>;
}
