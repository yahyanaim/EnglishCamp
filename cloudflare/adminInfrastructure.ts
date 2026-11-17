import type {LearnerEnv} from './learners';
import {accessHash} from './access';
import {billingConfigured,billingEnabled} from './membership';
import assets from './assetCoverage.json';
import {pronunciationConfigured} from './pronunciation';

/** Read existing counters only. Refreshing this report never calls a model or changes allowances. */
export async function infrastructureReport(env:LearnerEnv){
 const db=env.LEARNERS_DB!,now=new Date(),seconds=Math.floor(now.getTime()/1000),day=(Math.floor(seconds/86400)+1)*86400,month=Math.floor(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+1,1)/1000);
 const started=performance.now();await db.prepare('SELECT 1 ok').first();const databaseReadMs=Math.max(0,Math.round((performance.now()-started)*10)/10);
 const usage:Record<string,number>={};
 for(const [name,raw]of Object.entries({monthlyPronunciationAttempts:`pronunciation:invited-month:${month}`,dailyPronunciationRequests:`pronunciation:global:86400:${day}`,dailyCoachRequests:`coach:global:86400:${day}`}))usage[name]=(await db.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').bind(await accessHash(raw)).first<{used:number}>())?.used||0;
 const synchronization=await db.prepare(`SELECT (SELECT COUNT(*) FROM cloud_learners) profiles,COUNT(*) snapshots,MAX(updated_at) latestSavedAt,(SELECT COUNT(*) FROM cloud_notes WHERE body<>'') notes FROM cloud_progress`).first();
 const flags=env as LearnerEnv&Record<string,unknown>;
 return{checkedAt:now.toISOString(),databaseReadMs,synchronization,serviceUsage:usage,
  windows:{dayResetsAt:new Date(day*1000).toISOString(),monthResetsAt:new Date(month*1000).toISOString()},
  limits:{pronunciationMonthly:500,pronunciationDailyGlobal:100,coachDailyGlobal:200,pronunciationDailyPerLearner:1,coachDailyPerLearner:20,modalMonthlyUSD:1},
  worker:'Responding',database:'Connected',invitationRequired:env.INVITATION_REQUIRED==='true',speakingEnabled:flags.ENGLISHCAMP_SPEAKING_ENABLED==='true',speechHourlyLimit:flags.ENGLISHCAMP_SPEAKING_HOURLY_LIMIT||null,
  microsoftConfigured:!!flags.AZURE_SPEECH_KEY&&!!flags.AZURE_SPEECH_REGION,coachConfigured:!!flags.GEMINI_API_KEY,pronunciationConfigured:pronunciationConfigured(env),
  observability:'Disabled',deployment:assets.deployment||'Not connected',billing:billingEnabled(env)?(env.PAYPAL_ENV==='live'?'Live PayPal enabled':'Sandbox test mode'):billingConfigured(env)?'Configured; payments disabled':'Not connected',apiErrors:'Not collected',syncErrors:'Not collected',
  authCounters:await db.prepare('SELECT COUNT(*) buckets,COALESCE(SUM(attempts),0) attempts FROM cloud_auth_limits WHERE expires_at>?').bind(seconds).first(),
  note:'A D1 read is a point-in-time check, not uptime or end-to-end latency. Provider rows show configuration only. Counters record attempts, not completed corrections, tokens or charges. No provider requests are made.'};
}
