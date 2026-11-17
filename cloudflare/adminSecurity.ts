import type {LearnerEnv} from './learners';
import {adminPeriod} from '../src/lib/adminPeriod';
import {billingConfigured,billingEnabled} from './membership';
import {emailConfigured} from './invitationDelivery';
import {pronunciationConfigured} from './pronunciation';
/** Record response totals only, never request bodies or identifying data. */
export async function recordSecurity(request:Request,response:Response,env:LearnerEnv){
 if(!env.LEARNERS_DB||!new URL(request.url).pathname.startsWith('/api/'))return;
 const kind=({401:'auth',403:'denied',429:'limited',503:'unavailable'} as Record<number,string>)[response.status];
 if(!kind)return;
 try{await env.LEARNERS_DB.prepare('INSERT INTO cloud_security_daily(day,kind,total) VALUES(?,?,1) ON CONFLICT(day,kind) DO UPDATE SET total=total+1').bind(new Date().toISOString().slice(0,10),kind).run();}catch{/* Metrics never change authorization or provider responses. */}
}
export async function securityReport(url:URL,env:LearnerEnv,currentSession?:string){
 const db=env.LEARNERS_DB!,period=adminPeriod(url),seconds=Math.floor(Date.now()/1000);
 await db.prepare("DELETE FROM cloud_security_daily WHERE day<date('now','-90 days')").run();
 const bucketUntil=new Date(Date.parse(period.until)-1+86400000).toISOString().slice(0,10);
 const rows=await db.prepare(`SELECT json_group_array(json_object('day',day,'kind',kind,'total',total)) payload FROM (SELECT day,kind,total FROM cloud_security_daily WHERE day>=? AND day<? ORDER BY day,kind)`).bind(period.since.slice(0,10),bucketUntil).first<{payload:string}>();
 const flags=env as LearnerEnv&Record<string,unknown>;
 return{period,events:JSON.parse(rows?.payload||'[]'),retentionDays:90,checkedAt:new Date().toISOString(),
  currentSession:currentSession?await db.prepare('SELECT expires_at expiresAt FROM cloud_admin_sessions WHERE token_hash=? AND expires_at>?').bind(currentSession,seconds).first():null,
  readiness:{database:true,email:emailConfigured(env),microsoft:!!flags.AZURE_SPEECH_KEY&&!!flags.AZURE_SPEECH_REGION,coach:!!flags.GEMINI_API_KEY,pronunciation:pronunciationConfigured(env),billing:billingConfigured(env),billingEnabled:billingEnabled(env),sandbox:env.PAYPAL_ENV==='sandbox'},
  sessions:await db.prepare('SELECT COUNT(*) admins FROM cloud_admin_sessions WHERE expires_at>?').bind(seconds).first(),
  learnerSessions:(await db.prepare('SELECT COUNT(*) total FROM cloud_sessions WHERE expires_at>?').bind(seconds).first<{total:number}>())?.total||0,
  protections:{invitationRequired:env.INVITATION_REQUIRED==='true',adminSessionHours:8,secureCookies:url.protocol==='https:',originChecks:true,loginAttempts:6,loginWindowMinutes:10},
  scope:'API responses recorded since this feature was enabled. UTC daily aggregates covering the selected dates, retained for 90 days. No raw IPs, credentials, emails or request bodies. Responses are not unique people.'};
}
