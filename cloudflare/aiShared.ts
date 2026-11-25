import type {LearnerDatabase} from './learners';
export class AiError extends Error{constructor(message:string,readonly status=400){super(message);}}
export const aiJson=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff'}});
export function aiOrigin(request:Request){if(request.headers.get('origin')!==new URL(request.url).origin)throw new AiError('Open this activity on EnglishCamp to continue.',403);}
export async function boundedBytes(request:Request,max:number){const length=Number(request.headers.get('content-length')||0);if(length>max)throw new AiError('This submission is too large.',413);const reader=request.body?.getReader();if(!reader)throw new AiError('Add a message or recording first.');const chunks:Uint8Array[]=[];let size=0;while(true){const next=await reader.read();if(next.done)break;size+=next.value.length;if(size>max){await reader.cancel();throw new AiError('This submission is too large.',413);}chunks.push(next.value);}const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}return bytes;}
export async function aiBody(request:Request,max:number){if(!request.headers.get('content-type')?.startsWith('application/json'))throw new AiError('Use a valid JSON submission.');try{const value=JSON.parse(new TextDecoder().decode(await boundedBytes(request,max)));if(!value||typeof value!=='object'||Array.isArray(value))throw new AiError('Use a valid submission.');return value;}catch(e){if(e instanceof AiError)throw e;throw new AiError('This submission could not be read.');}}
/** Validate only the small canonical header at the edge; expensive signal analysis runs on the CPU service. */
export function wavBase64(audio:unknown,maxSeconds=30):audio is string{
 if(typeof audio!=='string'||audio.length>1410000||audio.length%4!==0||!/^[A-Za-z0-9+/]+={0,2}$/.test(audio))return false;
 try{const size=audio.length/4*3-(audio.endsWith('==')?2:audio.endsWith('=')?1:0),header=Uint8Array.from(atob(audio.slice(0,64)),c=>c.charCodeAt(0));if(header.length<44)return false;const v=new DataView(header.buffer),label=(at:number,length:number)=>new TextDecoder().decode(header.slice(at,at+length)),seconds=(size-44)/32000;return label(0,4)==='RIFF'&&label(8,4)==='WAVE'&&label(12,4)==='fmt '&&label(36,4)==='data'&&v.getUint32(4,true)===size-8&&v.getUint32(16,true)===16&&v.getUint16(20,true)===1&&v.getUint16(22,true)===1&&v.getUint32(24,true)===16000&&v.getUint32(28,true)===32000&&v.getUint16(32,true)===2&&v.getUint16(34,true)===16&&v.getUint32(40,true)===size-44&&(size-44)%2===0&&seconds>=3&&seconds<=maxSeconds+3;}catch{return false;}
}
async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join('');}
/** Shared SQL limits survive Worker restarts. No messages, recordings or raw IP addresses are stored. */
export type AiLimitEnv={AI_COACH_DAILY_PER_LEARNER?:string;AI_PRONUNCIATION_DAILY_PER_LEARNER?:string;AI_COACH_DAILY_GLOBAL?:string;AI_PRONUNCIATION_DAILY_GLOBAL?:string};
/** Site-wide daily cap shared by all learners; tunable with Worker vars (bounded 10–100000), defaults unchanged. */
export function globalDailyLimit(kind:'coach'|'pronunciation',env?:AiLimitEnv){const raw=Number(kind==='coach'?env?.AI_COACH_DAILY_GLOBAL:env?.AI_PRONUNCIATION_DAILY_GLOBAL),fallback=kind==='coach'?200:100;return Number.isInteger(raw)&&raw>=10&&raw<=100000?raw:fallback;}
/** Per-learner daily allowance; operators can tune it with Worker vars (bounded 1–200). */
export function learnerDailyLimit(kind:'coach'|'pronunciation',env?:AiLimitEnv){const raw=Number(kind==='coach'?env?.AI_COACH_DAILY_PER_LEARNER:env?.AI_PRONUNCIATION_DAILY_PER_LEARNER),fallback=kind==='pronunciation'?1:20;return Number.isInteger(raw)&&raw>=1&&raw<=200?raw:fallback;}
const learnerBucket=(kind:string,learnerId:string,expiry:number)=>digest(`${kind}:learner:${learnerId}:${expiry}`);
/** Read-only: how much of today's personal allowance remains. Never consumes a use. */
export async function aiAllowance(db:LearnerDatabase,kind:'coach'|'pronunciation',learnerId:string,env?:AiLimitEnv){
 const now=Math.floor(Date.now()/1000),expiry=(Math.floor(now/86400)+1)*86400,limit=learnerDailyLimit(kind,env);
 const row=await db.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=? AND expires_at>=?').bind(await learnerBucket(kind,learnerId,expiry),now).first<{used:number}>().catch(()=>null);
 const used=Math.min(limit,Number(row?.used||0));return {limit,used,remaining:limit-used,resetsAt:new Date(expiry*1000).toISOString()};
}
export async function aiRefund(db:LearnerDatabase,bucket:string|null){if(bucket)await db.prepare('UPDATE cloud_ai_limits SET used=MAX(0,used-1) WHERE bucket=?').bind(bucket).run().catch(()=>{});}
export async function aiQuota(request:Request,db:LearnerDatabase,kind:'coach'|'pronunciation',learnerId?:string,env?:AiLimitEnv):Promise<string|null>{
 const now=Math.floor(Date.now()/1000),ip=request.headers.get('CF-Connecting-IP')||'local';
 const limits=kind==='coach'?[[60,5,false],[86400,30,false],[86400,globalDailyLimit('coach',env),true]]:[[60,2,false],[86400,15,false],[86400,globalDailyLimit('pronunciation',env),true]];
 await db.prepare('DELETE FROM cloud_ai_limits WHERE expires_at<?').bind(now).run();
 for(const [period,limit,global] of limits){const expiry=(Math.floor(now/Number(period))+1)*Number(period),bucket=await digest(`${kind}:${global?'global':ip}:${period}:${expiry}`);const result=await db.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET used=used+1 WHERE used<? RETURNING used').bind(bucket,expiry,limit).first<{used:number}>();if(!result)throw new AiError('The practice allowance has been reached. Please try again later; your draft is kept.',429);}
 if(!learnerId)return null;
 const expiry=(Math.floor(now/86400)+1)*86400,bucket=await learnerBucket(kind,learnerId,expiry),limit=learnerDailyLimit(kind,env);
 const daily=await db.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET used=used+1 WHERE used<? RETURNING used').bind(bucket,expiry,limit).first();
 if(!daily)throw new AiError(kind==='pronunciation'?(limit===1?'Your daily pronunciation correction is complete. You can practise locally and return tomorrow for another correction.':`You have used today’s ${limit} pronunciation checks. You can practise locally and return tomorrow.`):`You have used today’s ${limit} coach messages. Please return tomorrow; your draft is kept.`,429);
 if(kind==='pronunciation'){
  try{const date=new Date(now*1000),monthlyExpiry=Math.floor(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,1)/1000);
   const monthlyBucket=await digest(`pronunciation:invited-month:${monthlyExpiry}`);
   const row=await db.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET used=used+1 WHERE used<500 RETURNING used').bind(monthlyBucket,monthlyExpiry).first();
   if(!row)throw new AiError('The shared monthly pronunciation allowance has been reached. Your recording stays on this device.',429);
  }catch(error){await db.prepare('UPDATE cloud_ai_limits SET used=MAX(0,used-1) WHERE bucket=?').bind(bucket).run();throw error;}
 }
 return bucket;
}
