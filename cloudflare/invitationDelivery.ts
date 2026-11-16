import type {LearnerEnv} from './learners';
import {invitationEmail} from '../src/lib/invitationEmail';

export function invitationProvider(env:LearnerEnv){
 const provider=env.INVITATION_EMAIL_PROVIDER||'resend';
 return provider==='resend'||provider==='brevo'?provider:null;
}
function sender(env:LearnerEnv){
 const raw=env.INVITATION_EMAIL_FROM?.trim()||'';
 if(!raw||raw.length>350||/[\r\n]/.test(raw))return null;
 const match=raw.match(/^([^<>]+)<([^<>]+)>$/),email=invitationEmail(match?.[2]||raw);
 return email?{email,name:match?.[1].trim().replace(/^"|"$/g,'').slice(0,80)||'EnglishCamp'}:null;
}
export function emailConfigured(env:LearnerEnv){
 const provider=invitationProvider(env);
 return !!provider&&!!sender(env)&&!!(provider==='brevo'?env.BREVO_API_KEY:env.RESEND_API_KEY);
}
export class InvitationDeliveryError extends Error{constructor(message:string,readonly status=502){super(message);}}
type Message={id:string;to:{name:string;email:string};subject:string;text:string;html:string};
export async function deliverInvitation(env:LearnerEnv,message:Message){
 const provider=invitationProvider(env),from=sender(env);
 if(!emailConfigured(env)||!from)throw new InvitationDeliveryError('Invitation email sending is not configured.',503);
 const brevo=provider==='brevo';
 const response=await fetch(brevo?'https://api.brevo.com/v3/smtp/email':'https://api.resend.com/emails',{
  method:'POST',signal:AbortSignal.timeout(10000),
  headers:brevo?{'api-key':env.BREVO_API_KEY!,Accept:'application/json','Content-Type':'application/json'}:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'englishcamp-invite/'+message.id},
  body:JSON.stringify(brevo?{
   sender:from,to:[message.to],subject:message.subject,textContent:message.text,htmlContent:message.html,headers:{idempotencyKey:message.id},
  }:{from:env.INVITATION_EMAIL_FROM!.trim(),to:[message.to.email],subject:message.subject,text:message.text,html:message.html}),
 });
 if(!response.ok){await response.body?.cancel();throw new InvitationDeliveryError(brevo?'Brevo did not accept the invitation. Check the API key, verified sender and transactional-email activation. No usable code was issued.':'Resend did not accept the invitation. Check the API key and verified sending domain. No usable code was issued.');}
 const result=await response.json() as {id?:unknown;messageId?:unknown},id=brevo?result.messageId:result.id;
 if(typeof id!=='string'||!id||id.length>512)throw new InvitationDeliveryError('The email provider did not confirm acceptance. No usable code was issued.');
 // This confirms provider acceptance, not delivery to the recipient's inbox.
}
