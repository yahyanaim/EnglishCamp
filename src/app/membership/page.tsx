"use client";
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {EntryHeader} from '@/components/session/EntryHeader';
import {AdminIcon} from '@/components/admin/AdminIcon';
import {Button} from '@/components/ui/shadcn/button';
import './membership.css';

type Membership={mode:'legacy'|'trial';trialUntil:number;paidUntil:number;allowed:boolean;subscription:{id:string;status:string;verified_at:number}|null;enabled:boolean;sandbox:boolean;price:string;currency:string;trialDays:number};
type Tone='success'|'info'|'warning';
const date=(n:number)=>n?new Date(n*1000).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'}):'';
const daysLeft=(until:number)=>Math.max(0,Math.ceil((until*1000-Date.now())/86400000));
/** Plain-language PayPal states; the raw status stays visible for support. */
const STATUS:Record<string,{label:string;tone:Tone;help:string}>={
 APPROVAL_PENDING:{label:'Waiting for your PayPal approval',tone:'warning',help:'No payment has been taken. Continue the same checkout to finish; do not start a second one.'},
 APPROVED:{label:'Approved · confirming the first payment',tone:'info',help:'PayPal approved the subscription. The first payment usually confirms within a minute.'},
 ACTIVE:{label:'Active',tone:'success',help:'Renews monthly through PayPal. You can cancel renewal at any time.'},
 SUSPENDED:{label:'Payment problem',tone:'warning',help:'PayPal paused renewal. Update your payment method in PayPal, then check again here.'},
 CANCELLED:{label:'Renewal cancelled',tone:'info',help:'No further payments will be taken. Any paid time you have left is kept.'},
 EXPIRED:{label:'Ended',tone:'info',help:'This subscription has ended. You can subscribe again when you are ready.'},
};

export default function MembershipPage(){
 const[data,setData]=useState<Membership|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[accepted,setAccepted]=useState(false),[cancel,setCancel]=useState(false);
 const[notice,setNotice]=useState<{text:string;tone:Tone}|null>(null),[confirming,setConfirming]=useState(false);
 const alive=useRef(true);
 async function load(){try{const r=await fetch('/api/billing/status',{cache:'no-store'}),d=await r.json();if(r.status===401){window.location.replace('/invite?next=%2Fmembership');return null;}if(!r.ok)throw new Error(d.error);if(alive.current)setData(d);return d as Membership;}catch(e){if(alive.current)setError((e as Error).message||'Could not load membership.');return null;}}
 async function action(name:'start'|'refresh'|'cancel',quiet=false):Promise<Membership|null>{
  if(busy&&!quiet)return null;setBusy(true);setError('');
  try{const r=await fetch('/api/billing/'+name,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({acceptTerms:accepted}),signal:AbortSignal.timeout(30000)}),d=await r.json();
   if(!r.ok)throw new Error(d.error||'PayPal could not confirm this request.');
   if(d.approvalUrl){const u=new URL(d.approvalUrl);if(!['https://www.paypal.com','https://www.sandbox.paypal.com'].includes(u.origin))throw new Error('Invalid PayPal approval link.');window.location.assign(u.toString());return null;}
   setData(d);setCancel(false);
   if(!quiet)setNotice(name==='cancel'?{text:'Renewal cancelled. Any remaining paid access is kept.',tone:'info'}:d.allowed?{text:'Membership confirmed. You can continue learning.',tone:'success'}:{text:'PayPal has not confirmed a completed payment yet. We will keep checking for a moment.',tone:'warning'});
   return d;
  }catch(e){if(!quiet)setError((e as Error).message);return null;}finally{if(alive.current)setBusy(false);}
 }
 /** After PayPal sends the learner back, confirm automatically instead of asking them to press a button. */
 async function confirmReturn(){
  setConfirming(true);setNotice({text:'Welcome back. Confirming your payment with PayPal…',tone:'info'});
  for(const wait of [0,6000,16000]){
   if(wait)await new Promise(r=>setTimeout(r,wait));if(!alive.current)return;
   const d=await action('refresh',true);
   if(d?.allowed){setNotice({text:'Payment confirmed. Your membership is active.',tone:'success'});setConfirming(false);return;}
   if(d&&d.subscription&&!['APPROVAL_PENDING','APPROVED'].includes(d.subscription.status))break;
  }
  if(alive.current){setConfirming(false);setNotice({text:'PayPal is still processing. This page will update when you press “Check payment status” in a minute.',tone:'warning'});}
 }
 useEffect(()=>{alive.current=true;document.title='Your membership · EnglishCamp';
  const q=new URLSearchParams(location.search),back=q.get('paypal');if(back)history.replaceState(null,'',location.pathname);
  void load().then(d=>{if(back==='cancel')setNotice({text:'Checkout closed. No payment was taken and no new access was granted.',tone:'info'});else if(back&&d?.subscription)void confirmReturn();});
  return()=>{alive.current=false;};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);

 const sub=data?.subscription,status=sub?STATUS[sub.status]??{label:sub.status.replaceAll('_',' ').toLowerCase(),tone:'info' as Tone,help:''}:null;
 const pending=sub?.status==='APPROVAL_PENDING',renewable=!!sub&&['ACTIVE','SUSPENDED','APPROVED'].includes(sub.status);
 const trial=!!data&&data.trialUntil>Date.now()/1000,paid=!!data&&data.paidUntil>Date.now()/1000;
 const canSubscribe=!!data&&data.enabled&&data.mode!=='legacy'&&!data.allowed&&!renewable;
 const step=paid||sub?.status==='ACTIVE'?3:pending||sub?.status==='APPROVED'?2:1;
 const paypalManage=data?.sandbox?'https://www.sandbox.paypal.com/myaccount/autopay/':'https://www.paypal.com/myaccount/autopay/';
 const title=!data?'Opening your membership…':data.mode==='legacy'?'Your existing access is kept':paid?'Your membership is active':trial?'Your free trial':data.enabled?'Continue learning with a membership':'Membership is being prepared';

 return <div className="camp-entry-auth"><EntryHeader/><main className="camp-membership">
  <header><span className="camp-membership-art"><AdminIcon name="shield" size={25}/></span><h1>Your learning, continued.</h1><p>Your courses, notes and badges stay with your profile.</p></header>
  <section className="camp-membership-card" aria-busy={busy||confirming}>
   <div className="camp-membership-title"><h2>{title}</h2>{data&&data.mode!=='legacy'&&<span className="camp-membership-pill" data-tone={paid?'success':trial?'info':data.enabled?'warning':'info'}>{paid?'Active':trial?`${daysLeft(data.trialUntil)} ${daysLeft(data.trialUntil)===1?'day':'days'} left`:data.enabled?'Not active':'Free for now'}</span>}</div>
   {data&&<>
    {data.mode==='legacy'?<p>You can continue with your existing profile. A subscription is not required for your account.</p>:<>
     <div className="camp-membership-price"><strong>${Number(data.price||2).toFixed(0)}<span>{data.currency||'USD'} / month</span></strong><small>Cancel renewal any time · billed by PayPal</small></div>
     {data.enabled&&(!trial||!!sub)&&<ol className="camp-membership-steps" aria-label="Subscription steps">
      {['Agree to the monthly price','Approve in PayPal','Membership active'].map((label,i)=><li key={label} data-state={i+1<step?'done':i+1===step?'current':'next'}><span>{i+1<step?'✓':i+1}</span>{label}</li>)}
     </ol>}
     <p>{trial?`Your free access continues until ${date(data.trialUntil)}. No payment method is needed during your trial.`:paid?`Paid access continues until ${date(data.paidUntil)}.`:data.enabled?'Your free access has ended. Subscribe to continue learning with your saved progress.':'Payments are not open yet. You can keep learning while the owner completes the setup.'}</p>
     <ul><li><AdminIcon name="shield" size={15}/>Your saved progress and badges are preserved</li><li><AdminIcon name="audio" size={15}/>Courses, practice and Microsoft learning voices</li><li><AdminIcon name="info" size={15}/>AI and speaking corrections remain subject to daily limits</li></ul>
    </>}
    {data.sandbox&&data.enabled&&<p className="camp-membership-notice" data-tone="warning">Sandbox test mode. Use a PayPal sandbox account; no real payment is taken.</p>}
    {canSubscribe&&<div className="camp-membership-checkout">
     {!pending&&<label className="camp-membership-consent"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} disabled={busy}/><span>I agree to $2.00 USD charged monthly through PayPal until I cancel. Renewal can be cancelled here or in PayPal. Access continues through the paid period.</span></label>}
     {pending&&<label className="camp-membership-consent"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} disabled={busy}/><span>I still agree to $2.00 USD monthly. Continue the checkout I already started.</span></label>}
     <Button className="camp-membership-paypal" disabled={!accepted||busy} onClick={()=>void action('start')}>{busy?'Opening PayPal…':pending?'Continue PayPal approval':'Subscribe with PayPal'}<AdminIcon name="arrow" size={15}/></Button>
     <small className="camp-membership-secure"><AdminIcon name="shield" size={13}/>You approve the payment on PayPal’s own page. EnglishCamp never sees your card details.</small>
    </div>}
    {sub&&status&&<div className="camp-membership-sub" data-tone={status.tone}>
     <div><span>Subscription</span><strong>{status.label}</strong>{status.help&&<p>{status.help}</p>}</div>
     <div className="camp-membership-sub-actions">
      <Button variant="outline" disabled={busy||confirming} onClick={()=>void action('refresh')}>{confirming?'Checking…':'Check payment status'}</Button>
      {renewable&&<Button variant="outline" asChild><a href={paypalManage} target="_blank" rel="noreferrer">Manage in PayPal</a></Button>}
      {renewable&&<button disabled={busy} className="camp-membership-text" onClick={()=>setCancel(true)}>Cancel renewal</button>}
     </div>
    </div>}
    {cancel&&<div className="camp-membership-cancel" role="group" aria-label="Confirm cancellation"><strong>Stop future payments?</strong><p>Your learning records remain saved. {paid?`Your paid access continues until ${date(data.paidUntil)}.`:'Any confirmed paid access continues to its end date.'}</p><div><Button variant="outline" disabled={busy} onClick={()=>setCancel(false)}>Keep subscription</Button><Button disabled={busy} onClick={()=>void action('cancel')}>{busy?'Cancelling…':'Confirm cancellation'}</Button></div></div>}
    {data.allowed&&<Button asChild className="camp-membership-continue"><Link href="/dashboard">Continue learning<AdminIcon name="arrow" size={15}/></Link></Button>}
   </>}
   {notice&&<p role="status" className="camp-membership-notice" data-tone={notice.tone}>{notice.text}</p>}
   {error&&<p role="alert" className="camp-auth-error">{error}</p>}
   {!data&&error&&<Button variant="outline" onClick={()=>{setError('');void load();}}>Try again</Button>}
  </section>
  <p className="camp-membership-help">Using another account? <Link href="/invite">Restore your profile</Link> · Questions about a payment? Your PayPal receipt shows every charge.</p>
 </main></div>;
}
