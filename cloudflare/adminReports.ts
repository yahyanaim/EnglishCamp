import {emailConfigured,invitationProvider} from './invitationDelivery';
import {billingConfigured,billingEnabled,membership} from './membership';
import {getLevelInfo} from '../src/lib/xp';
import {adminPeriod} from '../src/lib/adminPeriod';
import {accessHash} from './access';
import type {LearnerDatabase,LearnerEnv} from './learners';
import {cleanProgress,cleanBadges} from '../src/lib/cloudProgress';
import {courseCatalogue} from '../src/data/course-catalogue';
import {courseSnapshot,cycleComplete} from '../src/lib/courseProgress';
import ACHIEVEMENTS from './achievementCoverage.json';
import coverage from './contentCoverage.json';
import mocks from './mockCoverage.json';
import assets from './assetCoverage.json';
const safe=(text:string)=>{try{return text.length<=1500000?JSON.parse(text):{};}catch{return {};}};
export function summarize(progress:string,badges:string,xp:number){
 const p=cleanProgress(safe(progress)),b=cleanBadges(safe(badges));
 const courses=courseCatalogue.map(c=>{const ids=c.lessons.map(l=>l.id),s=courseSnapshot(ids,p.modules,p.lessons);return{id:c.id,title:c.title,...s,currentCycles:ids.filter(id=>cycleComplete(p.modules[id])).length,recordedStages:[0,1,2].map(stage=>ids.filter(id=>{const m=p.modules[id];return !!m?.stages[stage]&&(!m.expectedSignatures||m.expectedSignatures[stage]===m.stages[stage].signature);}).length)};});
 const quizzes=Object.entries(p.quizResults).flatMap(([course,rows])=>rows.map(q=>({course,score:q.score,takenAt:q.takenAt})));
 const dates=[...p.events.map(e=>e.at),...Object.values(p.modules).flatMap(m=>[m.lastActiveAt,...Object.values(m.stages).map(s=>s.finishedAt)]),p.lastActiveDate].filter((x):x is string=>!!x).sort();
 return{xp,streak:p.streak,courses,lessons: Object.values(p.lessons).filter(l=>l.completed).length,stages:courses.reduce((n,c)=>n+c.recordedStages.reduce((a,b)=>a+b,0),0),quizzes,badges:Object.entries(b).map(([id,v])=>({id,at:v.unlockedAt})),lastActivity:dates.at(-1)||null};
}
async function rows(db:LearnerDatabase,sql:string,args:unknown[]=[]){const row=await db.prepare(`SELECT json_group_array(json(x.row)) payload FROM (${sql}) x`).bind(...args).first<{payload:string}>();return JSON.parse(row?.payload||'[]');}
export async function refreshSummaries(db:LearnerDatabase){
 const pending=await rows(db,`SELECT json_object('id',p.learner_id,'revision',p.revision,'progress',p.progress_json,'badges',p.badges_json,'xp',p.baseline_xp+p.awarded_xp) row FROM cloud_progress p LEFT JOIN cloud_admin_summaries s ON s.learner_id=p.learner_id WHERE s.revision IS NULL OR s.revision<>p.revision LIMIT 5`);
 if(pending.length)await db.batch(pending.map((p:any)=>db.prepare('INSERT INTO cloud_admin_summaries(learner_id,revision,summary_json,refreshed_at) VALUES(?,?,?,?) ON CONFLICT(learner_id) DO UPDATE SET revision=excluded.revision,summary_json=excluded.summary_json,refreshed_at=excluded.refreshed_at WHERE excluded.revision>=cloud_admin_summaries.revision').bind(p.id,p.revision,JSON.stringify(summarize(p.progress,p.badges,p.xp)),new Date().toISOString())));
 return await db.prepare('SELECT COUNT(*) pending FROM cloud_progress p LEFT JOIN cloud_admin_summaries s ON s.learner_id=p.learner_id WHERE s.revision IS NULL OR s.revision<>p.revision').first<{pending:number}>();
}
async function invitationSettings(db:LearnerDatabase){
 const counts=await db.prepare(`SELECT COUNT(*) total,
  COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>unixepoch()),0) ready,
  COALESCE(SUM(redeemed_at IS NOT NULL),0) used,
  COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NOT NULL),0) revoked,
  COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NULL AND expires_at<=unixepoch()),0) expired FROM cloud_invitations`).first();
 return{accepting:(await db.prepare('SELECT accepting FROM cloud_invitation_settings WHERE id=1').first<{accepting:number}>())?.accepting===1,counts,
  limits:{batch:20,readyCodes:100,expiryDays:[1,7,14,30],pronunciationDaily:1,pronunciationMonthlyTotal:500,coachDaily:20,sessionHours:8}};
}
export async function adminReport(action:string,url:URL,env:LearnerEnv){
 const db=env.LEARNERS_DB!;
 if(action==='catalogue')return{courses:coverage,mocks,assets,achievements:ACHIEVEMENTS.map(({id,title,description,category})=>({id,title,description,category}))};
 if(action==='infrastructure'){const date=new Date(),day=(Math.floor(Date.now()/1000/86400)+1)*86400,month=Math.floor(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,1)/1000);const usage:Record<string,number>={};for(const [name,raw]of Object.entries({monthlyPronunciationAttempts:`pronunciation:invited-month:${month}`,dailyPronunciationRequests:`pronunciation:global:86400:${day}`,dailyCoachRequests:`coach:global:86400:${day}`})){usage[name]=(await db.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').bind(await accessHash(raw)).first<{used:number}>())?.used||0;}await db.prepare('SELECT 1 ok').first();const flags=env as LearnerEnv&Record<string,unknown>;return{checkedAt:date.toISOString(),serviceUsage:usage,worker:'Responding',database:'Connected',invitationRequired:env.INVITATION_REQUIRED==='true',speakingEnabled:flags.ENGLISHCAMP_SPEAKING_ENABLED==='true',speechHourlyLimit:flags.ENGLISHCAMP_SPEAKING_HOURLY_LIMIT||null,microsoftConfigured:!!flags.AZURE_SPEECH_KEY&&!!flags.AZURE_SPEECH_REGION,coachConfigured:!!flags.GEMINI_API_KEY,pronunciationConfigured:!!flags.OPENPRONOUNCE_URL&&!!flags.OPENPRONOUNCE_TOKEN,observability:'Disabled',deployment:assets.deployment||'Not connected',billing:billingEnabled(env)?(env.PAYPAL_ENV==='live'?'Live PayPal enabled':'Sandbox test mode'):billingConfigured(env)?'Configured; payments disabled':'Not connected',apiErrors:'Not collected',syncErrors:'Not collected',authCounters:await db.prepare('SELECT COUNT(*) buckets,COALESCE(SUM(attempts),0) attempts FROM cloud_auth_limits WHERE expires_at>?').bind(Math.floor(Date.now()/1000)).first(),note:'Auth counters count requests, not confirmed login failures. Provider configuration is not a live provider health check. No provider requests are made here.'};}
 if(action==='settings')return{...await invitationSettings(db),invitationRequired:env.INVITATION_REQUIRED==='true',emailConfigured:emailConfigured(env),emailProvider:invitationProvider(env),invitationRequests:await db.prepare("SELECT COUNT(*) pending FROM cloud_invitation_requests WHERE status IN ('pending','processing')").first(),profile:await db.prepare('SELECT display_name displayName,role_title roleTitle FROM cloud_admin_profile WHERE id=1').first()};
 if(action==='directory'||action==='invitation-directory'){
  const page=Number(url.searchParams.get('page')||1),q=(url.searchParams.get('q')||'').trim(),status=url.searchParams.get('status')||'all';if(!Number.isInteger(page)||page<1||page>10000||q.length>80)throw new TypeError('Invalid pagination');
  const invitation=action==='invitation-directory',allowed=invitation?['all','pending','used','revoked','expired']:['all','approved','suspended','active','inactive'];if(!allowed.includes(status))throw new TypeError('Invalid filter');
  if(invitation){
   const condition=status==='pending'?'redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>unixepoch()':status==='used'?'redeemed_at IS NOT NULL':status==='revoked'?'redeemed_at IS NULL AND revoked_at IS NOT NULL':status==='expired'?'redeemed_at IS NULL AND revoked_at IS NULL AND expires_at<=unixepoch()':'1=1';
   const pattern='%'+q.replace(/[~%_]/g,'~$&')+'%',where=`(label LIKE ? ESCAPE '~' OR recipient_name LIKE ? ESCAPE '~' OR recipient_email LIKE ? ESCAPE '~') AND (${condition})`,args=[pattern,pattern,pattern];
   const total=(await db.prepare('SELECT COUNT(*) total FROM cloud_invitations WHERE '+where).bind(...args).first<{total:number}>())?.total||0;
   const currentPage=Math.min(page,Math.max(1,Math.ceil(total/25)));
   return{...await invitationSettings(db),total,page:currentPage,items:await rows(db,`SELECT json_object('id',id,'label',label,'recipientName',recipient_name,'recipientEmail',recipient_email,'deliveryState',delivery_state,'code',display_code,'created',created_at,'expires',expires_at,'used',redeemed_at,'revoked',revoked_at) row FROM cloud_invitations WHERE ${where} ORDER BY created_at DESC,id LIMIT 25 OFFSET ?`,[...args,(currentPage-1)*25])};
  }
  const pending=await refreshSummaries(db),period=url.searchParams.get('registered')||'all';if(!['all','7','30','90','365'].includes(period))throw new TypeError('Invalid registration period');
  const activity=url.searchParams.get('activity')||(status==='active'||status==='inactive'?status:'all'),access=status==='active'||status==='inactive'?'all':status;
  const sort=url.searchParams.get('sort')||'created',direction=url.searchParams.get('direction')||'desc';
  if(!['all','active','inactive'].includes(activity)||!['name','created','xp'].includes(sort)||!['asc','desc'].includes(direction))throw new TypeError('Invalid directory sort');
  const registeredSince=period==='all'?'':new Date(Date.now()-Number(period)*86400000).toISOString(),pattern='%'+q.replace(/[~%_]/g,'~$&')+'%',profileNumber=/^EC-0*\d+$/i.test(q)?Number(q.slice(3)):-1;
  const base=`l.created_at>=? AND (l.name LIKE ? ESCAPE '~' OR CAST(l.number AS TEXT) LIKE ? ESCAPE '~' OR l.id LIKE ? ESCAPE '~' OR l.number=? OR EXISTS(SELECT 1 FROM cloud_invitations i WHERE i.redeemed_by=l.id AND i.recipient_email LIKE ? ESCAPE '~')) AND (?='all' OR (?='active' AND julianday(json_extract(s.summary_json,'$.lastActivity'))>=julianday('now','-7 days')) OR (?='inactive' AND COALESCE(julianday(json_extract(s.summary_json,'$.lastActivity')),0)<julianday('now','-7 days')))`;
  const args=[registeredSince,pattern,pattern,pattern,profileNumber,pattern,activity,activity,activity],from=' FROM cloud_learners l JOIN cloud_access a ON a.learner_id=l.id LEFT JOIN cloud_admin_summaries s ON s.learner_id=l.id';
  const counts=await db.prepare("SELECT COUNT(*) total,COALESCE(SUM(a.status='approved'),0) approved,COALESCE(SUM(a.status='suspended'),0) suspended"+from+' WHERE '+base).bind(...args).first();
  const where=base+" AND (?='all' OR a.status=?)",filterArgs=[...args,access,access];
  const total=(await db.prepare('SELECT COUNT(*) total'+from+' WHERE '+where).bind(...filterArgs).first<{total:number}>())?.total||0,currentPage=Math.min(page,Math.max(1,Math.ceil(total/25)));
  const order={name:'l.name COLLATE NOCASE',created:'l.created_at',xp:"COALESCE(json_extract(s.summary_json,'$.xp'),0)"}[sort as 'name'|'created'|'xp'];
  const overview=await db.prepare("SELECT COUNT(*) total,COALESCE(SUM(a.status='approved'),0) approved,COALESCE(SUM(a.status='suspended'),0) paused FROM cloud_learners l JOIN cloud_access a ON a.learner_id=l.id").first();
  return{total,page:currentPage,counts,overview,pending:pending?.pending,items:await rows(db,`SELECT json_object('id',l.id,'name',l.name,'number',l.number,'fruit',l.fruit,'email',(SELECT recipient_email FROM cloud_invitations WHERE redeemed_by=l.id AND recipient_email IS NOT NULL LIMIT 1),'created',l.created_at,'status',a.status,'source',a.source,'summary',json(s.summary_json)) row${from} WHERE ${where} ORDER BY ${order} ${direction.toUpperCase()},l.number DESC LIMIT 25 OFFSET ?`,[...filterArgs,(currentPage-1)*25])};
 }
 const pending=await refreshSummaries(db);
 if(action==='detail'){
  const id=url.searchParams.get('id')||'';if(!id||id.length>64)throw new TypeError('Invalid learner');
  const record=await db.prepare(`SELECT l.id,l.name,l.number,l.fruit,l.created_at,a.status,a.source,p.revision,p.updated_at,p.progress_json,p.badges_json,COALESCE(p.baseline_xp+p.awarded_xp,0) xp,
   (SELECT recipient_email FROM cloud_invitations WHERE redeemed_by=l.id AND recipient_email IS NOT NULL LIMIT 1) email
   FROM cloud_learners l JOIN cloud_access a ON a.learner_id=l.id LEFT JOIN cloud_progress p ON p.learner_id=l.id WHERE l.id=?`).bind(id).first<any>();
  if(!record)return{learner:null};
  const {progress_json,badges_json,...account}=record,progress=cleanProgress(safe(progress_json)),summary=summarize(progress_json,badges_json,record.xp),level=getLevelInfo(record.xp);
  return{emailConfigured:emailConfigured(env),learner:{...account,summary,learningLevel:{level:level.level,title:level.title,nextXP:Number.isFinite(level.nextXP)?level.nextXP:null},
   membership:await membership(db,id,env),
   notesCount:(await db.prepare('SELECT COUNT(*) total FROM cloud_notes WHERE learner_id=?').bind(id).first<{total:number}>())?.total||0,
   mail:await db.prepare("SELECT COALESCE(SUM(status='accepted'),0) accepted,MAX(CASE WHEN status='accepted' THEN created_at END) lastSent FROM cloud_admin_mail WHERE learner_id=?").bind(id).first(),
   badgeDetails:summary.badges.map(b=>({...b,title:ACHIEVEMENTS.find(a=>a.id===b.id)?.title||b.id})),
   evidence:courseCatalogue.flatMap(c=>c.lessons.filter(l=>progress.lessons[l.id]?.completed||progress.modules[l.id]).map(l=>({id:l.id,course:c.title,title:l.title,completed:!!progress.lessons[l.id]?.completed,stages:Object.entries(progress.modules[l.id]?.stages||{}).map(([stage,s])=>({stage,finishedAt:s.finishedAt,outcome:s.outcome}))})))},sync:'Last synchronized learning records only.'};
 }
 const {since,until}=adminPeriod(url);
 const totals=await db.prepare(`SELECT (SELECT COALESCE(SUM(baseline_xp+awarded_xp),0) FROM cloud_progress) totalXp,COUNT(*) learners,SUM(a.status='approved') approved,SUM(a.status='suspended') suspended,SUM(a.source='invitation') invited,SUM(l.created_at>=? AND l.created_at<?) registrations FROM cloud_learners l JOIN cloud_access a ON a.learner_id=l.id`).bind(since,until).first();
 const invitations=await db.prepare(`SELECT COUNT(*) total,COALESCE(SUM(redeemed_at IS NOT NULL),0) used,COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>unixepoch()),0) pending,COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NOT NULL),0) revoked,COALESCE(SUM(redeemed_at IS NULL AND revoked_at IS NULL AND expires_at<=unixepoch()),0) expired FROM cloud_invitations`).first();
 const cached=await rows(db,`SELECT summary_json row FROM cloud_admin_summaries ORDER BY learner_id LIMIT 201`),quizzes=cached.flatMap((s:any)=>s.quizzes).filter((q:any)=>Date.parse(q.takenAt)>=Date.parse(since)&&Date.parse(q.takenAt)<Date.parse(until)),allBadges=cached.flatMap((s:any)=>s.badges);
 return{period:{since,until},quiz:{count:quizzes.length,bins:[0,25,50,75].map(n=>({label:`${n}–${n===75?100:n+24}%`,value:quizzes.filter((q:any)=>q.score>=n&&(n===75||q.score<n+25)).length}))},awards:ACHIEVEMENTS.map(a=>({id:a.id,category:a.category,title:a.title,count:allBadges.filter((b:any)=>b.id===a.id).length,period:allBadges.filter((b:any)=>b.id===a.id&&Date.parse(b.at)>=Date.parse(since)&&Date.parse(b.at)<Date.parse(until)).length})),totals,invitations,accepting:(await db.prepare('SELECT accepting FROM cloud_invitation_settings WHERE id=1').first<any>())?.accepting===1,pending:pending?.pending,xpByActivity:await rows(db,`SELECT json_object('kind',kind,'value',SUM(xp),'count',COUNT(*)) row FROM cloud_events WHERE at>=? AND at<? GROUP BY kind ORDER BY SUM(xp) DESC`,[since,until]),scope:'Cumulative learning totals from synchronized online profiles only. Date range applies to timestamped registrations, redemptions, events and quiz attempts. Imported/guest histories may be incomplete; device-only guests are unknown.',summaries:cached.map(({quizzes,badges,...s}:any)=>({...s,badgeCount:badges.length})),registrations:await rows(db,`SELECT json_object('day',substr(created_at,1,10),'value',COUNT(*)) row FROM cloud_learners WHERE created_at>=? AND created_at<? GROUP BY substr(created_at,1,10) ORDER BY created_at`,[since,until]),redemptions:await rows(db,`SELECT json_object('day',date(redeemed_at,'unixepoch'),'value',COUNT(*)) row FROM cloud_invitations WHERE redeemed_at>=? AND redeemed_at<? GROUP BY date(redeemed_at,'unixepoch') ORDER BY redeemed_at`,[Math.floor(Date.parse(since)/1000),Math.floor(Date.parse(until)/1000)]),activity:await rows(db,`SELECT json_object('day',substr(at,1,10),'value',COUNT(*),'xp',SUM(xp)) row FROM cloud_events WHERE at>=? AND at<? GROUP BY substr(at,1,10) ORDER BY at`,[since,until])};
}
