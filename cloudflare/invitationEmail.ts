import type {LearnerEnv,LearnerDatabase} from './learners';
import {accessHash,accessJson,accessSecret} from './access';
import {invitationEmail,invitationName} from '../src/lib/invitationEmail';
export class InvitationMailError extends Error{constructor(message:string,readonly status=400){super(message);}}
const now=()=>Math.floor(Date.now()/1000);
const sender=(env:LearnerEnv)=>env.INVITATION_EMAIL_FROM?.trim()||'';
export function emailConfigured(env:LearnerEnv){return !!env.RESEND_API_KEY&&!!sender(env)&&!/[\r\n]/.test(sender(env))&&!!invitationEmail(sender(env).match(/<([^<>]+)>$/)?.[1]||sender(env));}
async function limit(db:LearnerDatabase,key:string,max:number,seconds:number){
 const expiry=(Math.floor(now()/seconds)+1)*seconds;
 return !!await db.prepare('INSERT INTO cloud_invitation_mail_limits(bucket,used,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET used=used+1 WHERE used<? RETURNING used').bind(await accessHash(key+':'+expiry),expiry,max).first();
}
async function smallInput(request:Request){
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw new InvitationMailError('Use the invitation form.');
 const reader=request.body?.getReader();let size=0,text='';const decoder=new TextDecoder();
 if(reader)while(true){const c=await reader.read();if(c.done)break;size+=c.value.length;if(size>2048){await reader.cancel();throw new InvitationMailError('This request is too large.',413);}text+=decoder.decode(c.value,{stream:true});}
 try{const data=JSON.parse(text+decoder.decode());if(!data||typeof data!=='object'||Array.isArray(data))throw Error();return data;}catch{throw new InvitationMailError('Complete the invitation form.');}
}
export async function requestInvitation(request:Request,env:LearnerEnv){
 if(request.method!=='POST')return accessJson({error:'Method not allowed.'},405);
 if(request.headers.get('origin')!==new URL(request.url).origin)return accessJson({error:'Open the invitation form on EnglishCamp.'},403);
 const db=env.LEARNERS_DB;if(!db)return accessJson({error:'Invitation requests are temporarily unavailable.'},503);
 try{
  const data=await smallInput(request),name=invitationName(data.name),email=invitationEmail(data.email);
  if(!name||name.length>40||!email||data.consent!==true)throw new InvitationMailError('Enter your name, a valid email and consent to receive your invitation.');
  if(!await limit(db,'invite-request-ip:'+(request.headers.get('CF-Connecting-IP')||'local'),3,3600)||!await limit(db,'invite-request-global',100,86400))throw new InvitationMailError('Too many requests. Please try again later.',429);
  await db.prepare('DELETE FROM cloud_invitation_mail_limits WHERE expires_at<?').bind(now()).run();
  // No email is sent publicly. Duplicates receive the same response and cannot change an existing recipient.
  const inserted=await db.prepare(`INSERT OR IGNORE INTO cloud_invitation_requests(id,name,email,created_at,updated_at)
   SELECT ?,?,?,?,? WHERE (SELECT COUNT(*) FROM cloud_invitation_requests WHERE status IN ('pending','processing'))<500`).bind(crypto.randomUUID(),name,email,now(),now()).run();
  if(!inserted.meta.changes&&!await db.prepare('SELECT id FROM cloud_invitation_requests WHERE email=?').bind(email).first())throw new InvitationMailError('Invitations are busy right now. Please request access again later.',503);
  return accessJson({ok:true,message:'Your request has been received. If the owner approves it, an invitation will be emailed to you. Requesting access does not create a learning account.'},202);
 }catch(e){return e instanceof InvitationMailError?accessJson({error:e.message},e.status):accessJson({error:'Your request could not be saved. Please try again.'},503);}
}
export async function invitationRequests(url:URL,env:LearnerEnv){
 const db=env.LEARNERS_DB!,page=Number(url.searchParams.get('page')||1),q=(url.searchParams.get('q')||'').trim(),status=url.searchParams.get('status')||'pending';
 if(!Number.isInteger(page)||page<1||page>10000||q.length>80||!['all','pending','accepted','declined'].includes(status))throw new InvitationMailError('Choose valid request filters.');
 const pattern='%'+q.replace(/[~%_]/g,'~$&')+'%',where="(name LIKE ? ESCAPE '~' OR email LIKE ? ESCAPE '~') AND (?='all' OR (?='pending' AND status IN ('pending','processing')) OR status=?)",args=[pattern,pattern,status,status,status];
 const total=(await db.prepare('SELECT COUNT(*) total FROM cloud_invitation_requests WHERE '+where).bind(...args).first<{total:number}>())?.total||0,current=Math.min(page,Math.max(1,Math.ceil(total/25)));
 const list=await db.prepare(`SELECT json_group_array(json_object('id',id,'name',name,'email',email,'status',status,'created',created_at,'updated',updated_at,'invitationId',invitation_id,'canReopen',CASE WHEN status='declined' THEN 1 WHEN status='accepted' THEN EXISTS(SELECT 1 FROM cloud_invitations i WHERE i.id=r.invitation_id AND i.redeemed_at IS NULL AND (i.revoked_at IS NOT NULL OR i.expires_at<=unixepoch())) ELSE 0 END)) payload FROM (SELECT * FROM cloud_invitation_requests WHERE ${where} ORDER BY created_at DESC,id LIMIT 25 OFFSET ?) r`).bind(...args,(current-1)*25).first<{payload:string}>();
 return{items:JSON.parse(list?.payload||'[]'),page:current,total,emailConfigured:emailConfigured(env),counts:await db.prepare("SELECT COUNT(*) total,COALESCE(SUM(status IN ('pending','processing')),0) pending,COALESCE(SUM(status='accepted'),0) accepted,COALESCE(SUM(status='declined'),0) declined FROM cloud_invitation_requests").first()};
}
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export async function sendInvitation(request:Request,env:LearnerEnv,body:{id?:unknown;days?:unknown}){
 const db=env.LEARNERS_DB!,days=Number(body.days||7);
 if(typeof body.id!=='string'||body.id.length>64||![1,7,14,30].includes(days))throw new InvitationMailError('Choose a request and a valid expiry.');
 if(!emailConfigured(env))throw new InvitationMailError('Email sending needs setup. Add a Resend key and a verified sender in Cloudflare before approving invitations.',503);
 const previous=await db.prepare('SELECT status,updated_at,invitation_id FROM cloud_invitation_requests WHERE id=?').bind(body.id).first<{status:string;updated_at:number;invitation_id:string|null}>();
 if(!previous)throw new InvitationMailError('Request not found.',404);
 if(previous.status==='accepted')return{ok:true,alreadySent:true};
 // A stale in-flight send is retried with a new code; its old code is always revoked first.
 const stamp=now();
 const claim=await db.prepare("UPDATE cloud_invitation_requests SET status='processing',updated_at=? WHERE id=? AND (status='pending' OR (status='processing' AND updated_at<?)) RETURNING name,email").bind(stamp,body.id,stamp-120).first<{name:string;email:string}>();
 if(!claim)throw new InvitationMailError('This request is already being processed or has been declined.',409);
 const id=crypto.randomUUID(),code='ECI-'+accessSecret();
 try{
  if(previous.invitation_id)await db.prepare('UPDATE cloud_invitations SET revoked_at=? WHERE id=? AND redeemed_at IS NULL').bind(stamp,previous.invitation_id).run();
  if(!await limit(db,'invitation-send-day',30,86400)||!await limit(db,'invitation-send-month',500,31*86400))throw new InvitationMailError('The email sending allowance has been reached. Try again after the current window.',429);
  const inserted=await db.prepare(`INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at,recipient_name,recipient_email,delivery_state)
   SELECT ?,?,?,?,?,?,?,?,'sending' WHERE (SELECT COUNT(*) FROM cloud_invitations WHERE redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>?)<100`).bind(id,await accessHash(code),code.slice(0,8)+'…'+code.slice(-4),'Email invitation',stamp,stamp+days*86400,claim.name,claim.email,stamp).run();
  if(!inserted.meta.changes)throw new InvitationMailError('All 100 invitation slots are occupied. Revoke an unused code first.',409);
  const assigned=await db.prepare('UPDATE cloud_invitation_requests SET invitation_id=? WHERE id=? AND status=\'processing\' AND updated_at=?').bind(id,body.id,stamp).run();
  if(assigned.meta.changes!==1)throw new InvitationMailError('This invitation request changed. Refresh and try again.',409);
  const link=new URL('/invite',request.url);link.hash=new URLSearchParams({invite:code,email:claim.email,name:claim.name}).toString();
  const text=`Hello ${claim.name},\n\nYour EnglishCamp invitation has been approved.\n\nInvitation code: ${code}\nEmail: ${claim.email}\nValid for ${days} days. This code creates one profile.\n\nOpen EnglishCamp: ${link}\n\nAfter registration, save your private recovery code to return on other devices.\nIf you did not request this invitation, ignore this email.`;
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'englishcamp-invite/'+id},signal:AbortSignal.timeout(10000),body:JSON.stringify({from:sender(env),to:[claim.email],subject:'Your EnglishCamp invitation',text,html:`<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:32px;color:#30243c"><p style="color:#7e22ce;font-weight:700">EnglishCamp</p><h1 style="font-size:26px">Your invitation is ready</h1><p>Hello ${escape(claim.name)}, your request has been approved.</p><p>Use this single-use code within ${days} days:</p><p style="background:#f4edf9;padding:16px;border-radius:12px;font-family:monospace;overflow-wrap:anywhere">${code}</p><p><a href="${escape(link.toString())}" style="display:inline-block;background:#7e22ce;color:white;text-decoration:none;padding:12px 20px;border-radius:9px">Join EnglishCamp</a></p><p style="font-size:13px">Use ${escape(claim.email)} when registering. Then save your recovery code to keep your progress across devices.</p><p style="font-size:12px;color:#736a7b">If you did not request this invitation, ignore this email.</p></div>`})});
  if(!response.ok){await response.body?.cancel();throw new InvitationMailError('The email provider did not accept the message. No usable code was issued; check the sender setup and try again.',502);}
  const result=await response.json() as {id?:string};if(!result.id)throw new InvitationMailError('The email provider did not confirm acceptance. Please retry.',502);
  const activated=await db.batch([db.prepare("UPDATE cloud_invitations SET delivery_state='accepted' WHERE id=? AND revoked_at IS NULL").bind(id),db.prepare("UPDATE cloud_invitation_requests SET status='accepted',updated_at=? WHERE id=? AND invitation_id=? AND EXISTS(SELECT 1 FROM cloud_invitations WHERE id=? AND delivery_state='accepted' AND revoked_at IS NULL)").bind(now(),body.id,id,id)]);
  if(activated.some(r=>r.meta.changes!==1))throw new InvitationMailError('This invitation changed before activation. Refresh and try again.',409);
  return{ok:true,accepted:true}; // Provider acceptance is not inbox delivery.
 }catch(e){
  await db.batch([db.prepare("UPDATE cloud_invitations SET revoked_at=?,delivery_state='failed' WHERE id=? AND redeemed_at IS NULL").bind(now(),id),db.prepare("UPDATE cloud_invitation_requests SET status='pending',updated_at=? WHERE id=? AND status='processing' AND updated_at=?").bind(now(),body.id,stamp)]);
  throw e instanceof InvitationMailError?e:new InvitationMailError('The invitation could not be emailed. No usable code was issued. Please try again.',503);
 }
}
export async function declineInvitation(env:LearnerEnv,id:unknown){
 if(typeof id!=='string'||id.length>64)throw new InvitationMailError('Choose a request.');
 const changed=await env.LEARNERS_DB!.prepare("UPDATE cloud_invitation_requests SET status='declined',updated_at=? WHERE id=? AND status='pending'").bind(now(),id).run();
 if(!changed.meta.changes)throw new InvitationMailError('This request has already changed. Refresh the list.',409);
 return{ok:true};
}

export async function reopenInvitation(env:LearnerEnv,id:unknown){
 if(typeof id!=='string'||id.length>64)throw new InvitationMailError('Choose a request.');
 const changed=await env.LEARNERS_DB!.prepare(`UPDATE cloud_invitation_requests SET status='pending',updated_at=? WHERE id=? AND (status='declined' OR (status='accepted' AND EXISTS(SELECT 1 FROM cloud_invitations i WHERE i.id=cloud_invitation_requests.invitation_id AND i.redeemed_at IS NULL AND (i.revoked_at IS NOT NULL OR i.expires_at<=?))))`).bind(now(),id,now()).run();
 if(!changed.meta.changes)throw new InvitationMailError('Only declined requests or unused expired/revoked invitations can be reopened.',409);
 return{ok:true};
}
