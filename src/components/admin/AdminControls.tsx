"use client";
import {useEffect,useState,type ReactNode} from 'react';
import {Button} from '@/components/ui/shadcn/button';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/shadcn/dialog';
import {AdminIcon} from './AdminIcon';

export async function adminRequest<T=any>(action:string,{body,signal}:{body?:object;signal?:AbortSignal}={}):Promise<T>{
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(new Error('Connection timed out. Please try again.')),15000),abort=()=>controller.abort();
 signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)controller.abort();
 try{const r=await fetch('/api/invitations/admin/'+action,{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',signal:controller.signal,...(body?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})});
  if(r.status===401){window.location.replace('/admin/login');throw new Error('Your administrator session expired.');}
  const result=await r.json();if(!r.ok)throw new Error(result.error||'Could not complete this request.');return result;
 }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
}
export function useAdminResource<T=any>(action:string|null){
 const[data,setData]=useState<T|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(!!action),[revision,setRevision]=useState(0),[loadedAction,setLoadedAction]=useState<string|null>(null);
 useEffect(()=>{if(!action){setData(null);setError('');setBusy(false);return;}const controller=new AbortController();setBusy(true);setError('');
  void adminRequest<T>(action,{signal:controller.signal}).then(d=>{if(!controller.signal.aborted){setData(d);setLoadedAction(action);}}).catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:'Could not load records.');}).finally(()=>{if(!controller.signal.aborted)setBusy(false);});
  return()=>controller.abort();
 },[action,revision]);
 return{data,error,busy,loadedAction,reload:()=>setRevision(v=>v+1)};
}
export function AdminFeedback({error}:{error:string}){return error?<p role="alert" className="admin-feedback">{error}</p>:null;}
export function AdminRefresh({busy,onClick}:{busy:boolean;onClick:()=>void}){return <Button variant="outline" disabled={busy} onClick={onClick}><AdminIcon name="refresh" size={15} className={busy?'animate-spin':''}/>{busy?'Refreshing…':'Refresh'}</Button>;}
export function AdminStatus({children,tone='quiet'}:{children:ReactNode;tone?:'good'|'quiet'|'warning'}){return <span className={'admin-state admin-state-'+tone}><i/>{children}</span>;}
export function AdminPagination({page,total,onChange,busy=false}:{page:number;total:number;onChange:(n:number)=>void;busy?:boolean}){
 const pages=Math.max(1,Math.ceil(total/25)),start=Math.max(1,Math.min(page-2,pages-4));
 return <div className="admin-data-pagination"><span>Showing <strong>{total?(page-1)*25+1:0}–{Math.min(total,page*25)}</strong> of <strong>{total.toLocaleString()}</strong></span><div><button disabled={busy||page<=1} onClick={()=>onChange(page-1)}><AdminIcon name="chevron-left" size={12}/>Prev</button>{Array.from({length:Math.min(5,pages)},(_,i)=>start+i).map(n=><button key={n} disabled={busy} aria-label={'Page '+n} aria-current={n===page?'page':undefined} onClick={()=>onChange(n)}>{n}</button>)}<button disabled={busy||page>=pages} onClick={()=>onChange(page+1)}>Next<AdminIcon name="chevron-right" size={12}/></button></div></div>;
}
export function AdminConfirm({open,onClose,onConfirm,title,description,confirmLabel,busy,error}:{open:boolean;onClose:()=>void;onConfirm:()=>void;title:string;description:string;confirmLabel:string;busy:boolean;error?:string}){
 return <Dialog open={open} onOpenChange={v=>{if(!v&&!busy)onClose();}}><DialogContent className="admin-confirm-dialog"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription><AdminFeedback error={error||''}/><div className="admin-dialog-actions"><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button disabled={busy} onClick={onConfirm}>{busy?'Saving…':confirmLabel}</Button></div></DialogContent></Dialog>;
}
export function AdmissionControl({accepting,onChanged}:{accepting:boolean;onChanged:()=>void}){
 const[open,setOpen]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function save(){if(busy)return;setBusy(true);setError('');try{await adminRequest('admissions',{body:{accepting:!accepting}});setOpen(false);onChanged();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 return <><Button variant="outline" onClick={()=>{setError('');setOpen(true);}}>{accepting?'Pause admissions':'Reopen admissions'}</Button><AdminConfirm open={open} onClose={()=>setOpen(false)} onConfirm={()=>void save()} busy={busy} error={error} title={accepting?'Pause new registrations?':'Reopen new registrations?'} description={accepting?'Unused invitation codes will stop accepting new profiles until admissions reopen. Existing learners can still sign in, recover their accounts and keep all progress.':'Learners with a valid, unused invitation code will be able to create a profile again. Existing accounts and service limits stay the same.'} confirmLabel={accepting?'Pause admissions':'Reopen admissions'}/></>;
}
export function AdminCopy({value,label,children}:{value:string;label:string;children?:ReactNode}){
 const[copied,setCopied]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{if(!copied)return;const timer=setTimeout(()=>setCopied(false),1500);return()=>clearTimeout(timer);},[copied]);
 return <span className="admin-copy-wrap"><button type="button" className="admin-copy" aria-label={label} title={label} onClick={async e=>{e.stopPropagation();try{await navigator.clipboard.writeText(value);setCopied(true);setFailed(false);}catch{setFailed(true);}}}>{copied?'Copied':children||<AdminIcon name="copy" size={14}/>}</button><span className="sr-only" role="status">{failed?'Copy unavailable. Select the text manually.':copied?'Copied to clipboard.':''}</span></span>;
}
export function AdminInfoCard({label,value,detail,icon}:{label:string;value:string;detail:string;icon:string}){return <article className="admin-info-card"><div><span>{label}</span><AdminIcon name={icon} size={22}/></div><strong>{value}</strong><small>{detail}</small></article>;}
