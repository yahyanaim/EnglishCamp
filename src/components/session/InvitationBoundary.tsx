"use client";
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/shadcn/button';
import {PageLoading} from '@/components/ui/PageLoading';
import '@/app/invitations.css';
import '@/components/admin/admin.css';

export const isEntryPage=(path:string)=>path.startsWith('/admin/')||path==='/invite'||path==='/membership';
const Access=createContext({pending:false,error:'',retry:()=>{}});
function AccessProblem({error,retry}:{error:string;retry:()=>void}){return <section className="camp-access-problem" role="alert"><h1>Let’s reconnect</h1><p>{error}</p><Button onClick={retry}>Try again</Button></section>;}

/** Keep the verified shell mounted, but gate each new route until its check succeeds. */
export function InvitationBoundary({children}:{children:ReactNode}){
 const path=usePathname(),entry=isEntryPage(path)||path.replace(/\/$/,'')==='/connect-device';
 const[allowed,setAllowed]=useState(''),[opened,setOpened]=useState(false),[error,setError]=useState(''),[revision,setRevision]=useState(0);
 useEffect(()=>{
  if(entry)return;
  let disposed=false,version=0,controller:AbortController|undefined;
  async function check(){
   const current=++version;controller?.abort();const attempt=new AbortController();controller=attempt;setError('');const timeout=setTimeout(()=>attempt.abort(),12000);
   try{const response=await fetch('/api/access/session',{cache:'no-store',credentials:'same-origin',signal:attempt.signal});
    if(process.env.NODE_ENV==='development'&&response.status===404){if(!disposed&&current===version){setAllowed(path);setOpened(true);}return;}
    const data=await response.json();if(!response.ok)throw new Error();if(disposed||current!==version)return;
    if(data.granted===true){setAllowed(path);setOpened(true);}else{setAllowed('');window.location.replace(data.destination==='/membership'?'/membership':'/invite?next='+encodeURIComponent(location.pathname+location.search));}
   }catch{if(!disposed&&current===version){setAllowed('');setError('We could not check your access. Your progress is saved. Check your connection and try again.');}}
   finally{clearTimeout(timeout);}
  }
  void check();const refresh=()=>{if(document.visibilityState==='visible')void check();};window.addEventListener('focus',refresh);window.addEventListener('online',refresh);
  return()=>{disposed=true;controller?.abort();window.removeEventListener('focus',refresh);window.removeEventListener('online',refresh);};
 },[path,entry,revision]);
 const retry=()=>setRevision(v=>v+1);
 if(entry)return <>{children}</>;
 if(!opened)return error?<main className="camp-entry"><AccessProblem error={error} retry={retry}/></main>:<PageLoading full label="Getting your learning space ready"/>;
 return <Access.Provider value={{pending:allowed!==path,error,retry}}>{children}</Access.Provider>;
}
/** Only the page slot changes during checks; navigation and progress stay in place. */
export function InvitationContent({children}:{children:ReactNode}){
 const{pending,error,retry}=useContext(Access);
 return error?<AccessProblem error={error} retry={retry}/>:pending?<PageLoading/>:<>{children}</>;
}
