import { cleanProgress, cleanBadges, cleanEvents, eventKey, mergeProgress, mergeBadges, type CloudAccount, type CloudSnapshot } from '../src/lib/cloudProgress';
import { FRUITS } from '../src/lib/sessionProfile';
import {notesResponse} from './notes';

interface Statement {
 bind(...values:unknown[]):Statement;
 first<T=Record<string,unknown>>():Promise<T|null>;
 run():Promise<{meta:{changes:number}}>;
}
export interface LearnerDatabase { prepare(sql:string):Statement; batch(statements:Statement[]):Promise<{meta:{changes:number}}[]> }
export type LearnerEnv={LEARNERS_DB?:LearnerDatabase};
type Stored={revision:number;progress_json:string;badges_json:string;imported_keys:string;baseline_xp:number;awarded_xp:number;updated_at:string};
const reply=(body:object,status=200,cookie?:string)=>Response.json(body,{status,headers:{'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff',...(cookie?{'Set-Cookie':cookie}:{})}});
const secret=()=>{const bytes=crypto.getRandomValues(new Uint8Array(24));return btoa(String.fromCharCode(...Array.from(bytes))).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');};
const hash=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(v=>v.toString(16).padStart(2,'0')).join('');
const cookieName=(request:Request)=>new URL(request.url).protocol==='https:'?'__Host-camp-session':'camp_local_session';
const cookie=(request:Request,value:string,age=2592000)=>`${cookieName(request)}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${new URL(request.url).protocol==='https:'?'; Secure':''}`;
function name(value:unknown){if(typeof value!=='string')return '';return value.normalize('NFKC').replace(new RegExp('[\\p{Cc}\\p{Cf}]','gu'),'').trim().replace(/\s+/g,' ');}
class RequestError extends Error{constructor(message:string,readonly status=400){super(message);}}
async function body(request:Request){if(!request.headers.get('content-type')?.startsWith('application/json'))throw new RequestError('Use JSON.');if(Number(request.headers.get('content-length')||0)>1048576)throw new RequestError('Progress is too large.',413);const reader=request.body?.getReader(),chunks:Uint8Array[]=[];let size=0;if(reader){while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.length;if(size>1048576){await reader.cancel();throw new RequestError('Progress is too large.',413);}chunks.push(chunk.value);}}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}let value;try{value=JSON.parse(new TextDecoder().decode(bytes));}catch{throw new RequestError('Invalid JSON.');}if(!value||typeof value!=='object'||Array.isArray(value))throw new RequestError('Invalid request.');return value;}
async function session(request:Request,db:LearnerDatabase){const token=request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName(request)+'='))?.split('=')[1];if(!token||!/^[A-Za-z0-9_-]{32}$/.test(token))return null;const tokenHash=await hash(token);const account=await db.prepare('SELECT l.id,l.name,l.number,l.fruit FROM cloud_sessions s JOIN cloud_learners l ON l.id=s.learner_id WHERE s.token_hash=? AND s.expires_at>?').bind(tokenHash,Math.floor(Date.now()/1000)).first<CloudAccount>();return account?{account,tokenHash}:null;}
async function rate(request:Request,db:LearnerDatabase,action:string){const now=Math.floor(Date.now()/1000),period=action==='create'?3600:600,expiry=(Math.floor(now/period)+1)*period;const bucket=await hash(`${action}:${request.headers.get('CF-Connecting-IP')||'local'}:${expiry}`);await db.prepare('DELETE FROM cloud_auth_limits WHERE expires_at<?').bind(now).run();const result=await db.prepare('INSERT INTO cloud_auth_limits(bucket,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 RETURNING attempts').bind(bucket,expiry).first<{attempts:number}>();return (result?.attempts??999)<=(action==='create'?5:12);}
async function snapshot(db:LearnerDatabase,id:string):Promise<CloudSnapshot>{const row=await db.prepare('SELECT revision,progress_json,badges_json,imported_keys,baseline_xp,awarded_xp,updated_at FROM cloud_progress WHERE learner_id=?').bind(id).first<Stored>();if(!row)throw new Error('Profile unavailable.');const progress=cleanProgress(JSON.parse(row.progress_json));progress.xp=row.baseline_xp+row.awarded_xp;return {progress,badges:cleanBadges(JSON.parse(row.badges_json)),revision:row.revision,updatedAt:row.updated_at};}

export async function learnerResponse(request:Request,env:LearnerEnv):Promise<Response>{
 const url=new URL(request.url),action=url.pathname.slice('/api/learners/'.length),db=env.LEARNERS_DB;
 if(!db)return reply({error:'Online progress is not configured yet. Your local learning records are safe.',available:false},503);
 if(!['GET','POST','PUT','DELETE'].includes(request.method))return reply({error:'Method not allowed.'},405);
 if(request.method!=='GET'&&request.headers.get('origin')!==url.origin)return reply({error:'Use EnglishCamp to make this request.'},403);
 try {
  if(action==='create'&&request.method==='POST'){
   if(!await rate(request,db,'create'))return reply({error:'Too many new profiles. Please try again later.'},429);
   const input=await body(request),displayName=name(input.name);if(!displayName||displayName.length>40)return reply({error:'Enter a name with 1–40 characters.'},400);
   const id=crypto.randomUUID(),recoveryCode='EC1-'+secret(),token=secret(),now=new Date().toISOString(),progress=cleanProgress(input.progress),badges=cleanBadges(input.badges);
   const importedKeys=Array.from(new Set([...progress.events.map(eventKey),...Object.entries(progress.lessons).filter(([,v])=>v.completed).map(([key])=>'lesson:'+key),...Object.keys(progress.exercisesDone).filter(key=>progress.exercisesDone[key]).map(key=>'exercise:'+key)]));
   const fruit=FRUITS.includes(input.fruit)?input.fruit:FRUITS[crypto.getRandomValues(new Uint8Array(1))[0]%FRUITS.length];
   await db.batch([
    db.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').bind(id,displayName,fruit,await hash(recoveryCode),now),
    db.prepare('INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,baseline_xp,updated_at) VALUES(?,?,?,?,?,?)').bind(id,JSON.stringify(progress),JSON.stringify(badges),JSON.stringify(importedKeys),progress.xp,now),
    db.prepare('INSERT INTO cloud_sessions(token_hash,learner_id,expires_at) VALUES(?,?,?)').bind(await hash(token),id,Math.floor(Date.now()/1000)+2592000),
   ]);
   const account=await db.prepare('SELECT id,name,number,fruit FROM cloud_learners WHERE id=?').bind(id).first<CloudAccount>();
   return reply({account,recoveryCode,snapshot:{progress,badges,revision:0,updatedAt:now}},201,cookie(request,token));
  }
  if(action==='restore'&&request.method==='POST'){
   if(!await rate(request,db,'restore'))return reply({error:'Too many recovery attempts. Please try again in a few minutes.'},429);
   const input=await body(request),displayName=name(input.name),code=typeof input.code==='string'?input.code.trim():'';
   if(!/^EC1-[A-Za-z0-9_-]{32}$/.test(code))return reply({error:'The name or recovery code is incorrect.'},401);
   const account=await db.prepare('SELECT id,name,number,fruit FROM cloud_learners WHERE recovery_hash=?').bind(await hash(code)).first<CloudAccount>();
   if(!account||account.name.normalize('NFKC').toLowerCase()!==displayName.toLowerCase())return reply({error:'The name or recovery code is incorrect.'},401);
   const token=secret(),now=Math.floor(Date.now()/1000);await db.batch([db.prepare('DELETE FROM cloud_sessions WHERE expires_at<?').bind(now),db.prepare('INSERT INTO cloud_sessions(token_hash,learner_id,expires_at) VALUES(?,?,?)').bind(await hash(token),account.id,now+2592000)]);
   return reply({account,snapshot:await snapshot(db,account.id)},200,cookie(request,token));
  }
  const current=await session(request,db);
  if(action==='session'&&request.method==='GET')return reply({available:true,account:current?.account??null});
  if(!current)return reply({error:'Restore your profile with its recovery code to reconnect.'},401);
  if(request.headers.get('X-EnglishCamp-Learner')!==current.account.id)return reply({error:'Another learner is signed in in this browser. Reconnect your profile before syncing.',code:'learner_changed'},409);
  if(action==='notes')return await notesResponse(request,db,current.account.id,request.method==='PUT'?await body(request):undefined);
  if(action==='logout'&&request.method==='POST'){await db.prepare('DELETE FROM cloud_sessions WHERE token_hash=?').bind(current.tokenHash).run();return reply({ok:true},200,cookie(request,'',0));}
  if(action==='profile'&&request.method==='DELETE'){const input=await body(request);if(input.confirm!=='delete')return reply({error:'Confirm deletion first.'},400);await db.prepare('DELETE FROM cloud_learners WHERE id=?').bind(current.account.id).run();return reply({ok:true},200,cookie(request,'',0));}
  if(action==='progress'&&request.method==='GET')return reply({account:current.account,snapshot:await snapshot(db,current.account.id)});
  if(action==='progress'&&request.method==='PUT'){
   const input=await body(request);if(!Array.isArray(input.pendingEvents)||input.pendingEvents.length>100)return reply({error:'Send up to 100 learning events at a time.'},400);
   const incoming=cleanProgress(input.progress),badges=cleanBadges(input.badges),events=cleanEvents(input.pendingEvents,100);
   for(let attempt=0;attempt<4;attempt++){
    const row=await db.prepare('SELECT revision,progress_json,badges_json,imported_keys,baseline_xp,updated_at FROM cloud_progress WHERE learner_id=?').bind(current.account.id).first<Stored>();if(!row)return reply({error:'Profile unavailable.'},404);
    const imported=new Set<string>(JSON.parse(row.imported_keys)),fresh=events.filter(e=>!imported.has(eventKey(e))),statements:Statement[]=[];
    for(let i=0;i<fresh.length;i+=12){const chunk=fresh.slice(i,i+12);statements.push(db.prepare(`INSERT OR IGNORE INTO cloud_events(learner_id,event_key,kind,source,xp,at) VALUES ${chunk.map(()=>'(?,?,?,?,?,?)').join(',')}`).bind(...chunk.flatMap(e=>[current.account.id,eventKey(e),e.kind,e.source,e.xp,e.at])));}
    const merged=mergeProgress(JSON.parse(row.progress_json),incoming),mergedBadges=mergeBadges(JSON.parse(row.badges_json),badges),now=new Date().toISOString();
    statements.push(db.prepare('UPDATE cloud_progress SET progress_json=?,badges_json=?,revision=revision+1,updated_at=? WHERE learner_id=? AND revision=?').bind(JSON.stringify(merged),JSON.stringify(mergedBadges),now,current.account.id,row.revision));
    const results=await db.batch(statements);if(results.at(-1)?.meta.changes)return reply({account:current.account,snapshot:await snapshot(db,current.account.id),acknowledged:events.map(eventKey)});
   }
   return reply({error:'Progress changed on another device. Please sync again; your local progress is kept.',code:'retry_sync'},409);
  }
  return reply({error:'Not found.'},404);
 }catch(error){return error instanceof RequestError?reply({error:error.message},error.status):reply({error:'Online progress is temporarily unavailable. Your local records are kept.'},503);}
}
