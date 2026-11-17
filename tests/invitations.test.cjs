require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const worker=require('../cloudflare/worker.ts').default;
const {accessHash,approvedLearner}=require('../cloudflare/access.ts');
const {aiQuota}=require('../cloudflare/aiShared.ts');
const {pronunciationResponse}=require('../cloudflare/pronunciation.ts');
const {PRONUNCIATION_LINES,PRONUNCIATION_CONSENT}=require('../src/lib/pronunciationAssessment.ts');
const {encodeSpeakingWav}=require('../src/lib/speakingAudio.ts');
const origin='https://camp.test';
test('the access boundary leaves the existing workspace chrome and original fonts unchanged',()=>{
 const shell=fs.readFileSync('src/components/layout/LayoutShell.tsx','utf8')
  .replace("import {usePathname} from 'next/navigation';\n",'')
  .replace("import {InvitationBoundary,InvitationContent,isEntryPage} from '@/components/session/InvitationBoundary';\n",'')
  .replace('  const pathname=usePathname(),entry=isEntryPage(pathname);\n  // Admin sessions and pages do not mount learner storage/synchronization providers.\n  if(pathname.startsWith(\'/admin/\'))return <main className="camp-entry">{children}</main>;\n','')
  .replace('<SessionProvider><InvitationBoundary>{entry?<main className="camp-entry">{children}</main>:<><WeeklyProgressSync/>','<SessionProvider><WeeklyProgressSync/>')
  .replace('<InvitationContent><PlacementOffer/>{children}</InvitationContent>','{children}')
  .replace('      <LevelCelebration />','      <LevelCelebration />\n      <PlacementOffer />')
  .replace('</div></>}</InvitationBoundary></SessionProvider>','</div></SessionProvider>');
 assert.equal(crypto.createHash('sha256').update(shell).digest('hex'),'6c2d7ddc030f83123dbef0759811494ab951e367197aa92a487c4439ad82300f');
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync('src/app/layout.tsx')).digest('hex'),'a9c15a1a3691462324854c163256fd647c6472245806ebddd1980929f91b4a27');
});
function fixture(skipAccess=false){
 const sql=new DatabaseSync(':memory:');for(const file of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())if(!skipAccess||!['0006_invitations.sql','0009_email_invitations.sql'].includes(file))sql.exec(fs.readFileSync('migrations/'+file,'utf8'));
 function prepare(query){let values=[];const execute=()=>({meta:{changes:Number(sql.prepare(query).run(...values).changes)}});return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return execute();},execute};}
 const db={prepare,async batch(statements){sql.exec('BEGIN');try{const result=statements.map(s=>s.execute());sql.exec('COMMIT');return result;}catch(error){sql.exec('ROLLBACK');throw error;}}};
 const password='only-a-synthetic-management-test-key',env={LEARNERS_DB:db,INVITATION_REQUIRED:'true',INVITATION_ADMIN_HASH:crypto.createHash('sha256').update(password).digest('hex'),ASSETS:{fetch:async request=>new Response('<title>EnglishCamp</title>'+new URL(request.url).pathname,{headers:{'Content-Type':'text/html'}})}};
 const request=(path,method='GET',body,auth={},extra={})=>new Request(origin+path,{method,headers:{Origin:origin,'CF-Connecting-IP':'192.0.2.1',...(body?{'Content-Type':'application/json'}:{}),...auth,...extra},...(body?{body:JSON.stringify(body)}:{})});
 const call=(path,method='GET',body,auth={},extra={})=>worker.fetch(request(path,method,body,auth,extra),env);
 const admin=async()=>{const r=await call('/api/invitations/admin/login','POST',{password});assert.equal(r.status,200);return{Cookie:r.headers.get('set-cookie').split(';')[0]};};
 const invite=async(auth,count=1)=>{const r=await call('/api/invitations/admin/create','POST',{count,days:7,label:'Test group'},auth);assert.equal(r.status,201);return(await r.json()).codes;};
 const redeem=async(code,extra={},ip='192.0.2.2')=>{const response=await call('/api/learners/create','POST',{name:'Test learner',invitationCode:code,...extra},{},{'CF-Connecting-IP':ip});const data=await response.json();return{response,data,auth:{Cookie:response.headers.get('set-cookie')?.split(';')[0],'X-EnglishCamp-Learner':data.account?.id}};};
 return{sql,db,env,password,request,call,admin,invite,redeem};
}
test('the migration approves existing accounts without altering progress, badges, notes or credentials',async()=>{
 const f=fixture(true);try{
  const id=crypto.randomUUID(),token='s'.repeat(32),recoveryHash=await accessHash('existing recovery');
  f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run(id,'Existing learner','apple',recoveryHash,'2026-11-01');
  f.sql.prepare('INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,baseline_xp,updated_at) VALUES(?,?,?,?,?,?)').run(id,JSON.stringify({xp:385,lessons:{intro:{completed:true}}}),JSON.stringify({first:{unlockedAt:'before'}}),'[]',385,'before');
  f.sql.prepare('INSERT INTO cloud_sessions VALUES(?,?,?)').run(await accessHash(token),id,Math.floor(Date.now()/1000)+3600);
  const before=JSON.stringify(f.sql.prepare('SELECT * FROM cloud_progress').all()),learners=JSON.stringify(f.sql.prepare('SELECT * FROM cloud_learners').all());
  f.sql.exec(fs.readFileSync('migrations/0006_invitations.sql','utf8'));
  assert.equal(JSON.stringify(f.sql.prepare('SELECT * FROM cloud_progress').all()),before);assert.equal(JSON.stringify(f.sql.prepare('SELECT * FROM cloud_learners').all()),learners);
  const auth={Cookie:'__Host-camp-session='+token};assert.equal((await f.call('/grammar','GET',undefined,auth)).status,200);
  assert.equal(f.sql.prepare('SELECT source FROM cloud_access').get().source,'existing');
 }finally{f.sql.close();}
});
test('pages, exported payloads and every costly API are blocked before assets or provider calls',async()=>{
 const f=fixture();let assets=0;f.env.ASSETS.fetch=async()=>{assets++;return new Response('should not be reached');};try{
  for(const path of ['/','/dashboard','/grammar.html','/grammar.txt','/levels/band4-5/lessons/band1-toefl-intro','/audio/course.mp3','/_next/static/%2e%2e%2fdashboard.html','/media/brand/%2e%2e%2fdashboard.html']){const r=await f.call(path);assert.equal(r.status,303,path);assert.equal(new URL(r.headers.get('location')).pathname,'/invite');assert.match(r.headers.get('cache-control'),/no-store/);}
  for(const path of ['/api/speech','/api/coach','/api/pronunciation','/api/placement/speaking','/api/placement/writing'])assert.equal((await f.call(path,'POST',{text:'absorb'})).status,401,path);
  assert.equal(assets,0);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_ai_limits').get().n,0);
  for(const path of ['/invite','/invite.txt','/admin/login','/connect-device','/_next/static/test.js'])assert.equal((await f.call(path)).status,200,path);
 }finally{f.sql.close();}
});
test('only the owner key opens management; CSRF and brute-force attempts are rejected',async()=>{
 const f=fixture();try{
  assert.equal((await f.call('/api/invitations/admin/list')).status,401);
  assert.equal((await f.call('/api/invitations/admin/login','POST',{password:f.password},{},{Origin:'https://other.test'})).status,403);
  for(let i=0;i<6;i++){const r=await f.call('/api/invitations/admin/login','POST',{password:'wrong'});assert.equal(r.status,401);assert.ok(!(await r.text()).includes(f.password));}
  assert.equal((await f.call('/api/invitations/admin/login','POST',{password:f.password})).status,429);
 }finally{f.sql.close();}
});
test('codes are hashed, shown once, single-use under racing claims, and imported progress is preserved',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[invitation]=await f.invite(owner);
  const row=f.sql.prepare('SELECT * FROM cloud_invitations').get();assert.equal(row.code_hash,await accessHash(invitation.code));assert.ok(!JSON.stringify(row).includes(invitation.code));
  const progress={xp:90,exercisesDone:{old:true},lessons:{intro:{completed:true,xpEarned:60}}},badges={first:{unlockedAt:'2026-11-01T12:00:00.000Z'}};
  const [a,b]=await Promise.all([f.redeem(invitation.code,{progress,badges}),f.redeem(invitation.code,{},'192.0.2.3')]);
  assert.deepEqual([a.response.status,b.response.status].sort(),[201,403]);const joined=a.response.status===201?a:b;
  assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_learners').get().n,1);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_progress').get().n,1);
  assert.match(joined.response.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/);
  assert.equal((await f.call('/dashboard','GET',undefined,joined.auth)).status,200);
  const listing=await(await f.call('/api/invitations/admin/list','GET',undefined,owner)).json();assert.equal(listing.invitations[0].redeemedAt>0,true);assert.ok(!JSON.stringify(listing).includes(invitation.code));
  assert.equal((await f.call('/api/invitations/admin/list','GET',undefined,joined.auth)).status,401);
  // Administration credentials are not a learner access bypass.
  assert.equal((await f.call('/api/pronunciation','POST',{},owner)).status,401);
  if(a.response.status===201){assert.equal(a.data.snapshot.progress.xp,90);assert.equal(a.data.snapshot.progress.exercisesDone.old,true);assert.ok(a.data.snapshot.badges.first);}
 }finally{f.sql.close();}
});
test('invalid, expired, revoked and paused invitations create no accounts and consume no code',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),codes=await f.invite(owner,3);
  assert.equal((await f.redeem('ECI-'+'x'.repeat(32))).response.status,403);
  f.sql.prepare('UPDATE cloud_invitations SET expires_at=0 WHERE id=?').run(codes[0].id);assert.equal((await f.redeem(codes[0].code)).response.status,403);
  await f.call('/api/invitations/admin/revoke','POST',{id:codes[1].id},owner);assert.equal((await f.redeem(codes[1].code)).response.status,403);
  await f.call('/api/invitations/admin/admissions','POST',{accepting:false},owner);assert.equal((await f.redeem(codes[2].code)).response.status,403);
  assert.equal(f.sql.prepare('SELECT redeemed_at FROM cloud_invitations WHERE id=?').get(codes[2].id).redeemed_at,null);
  assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_learners').get().n,0);
  await f.call('/api/invitations/admin/admissions','POST',{accepting:true},owner);assert.equal((await f.redeem(codes[2].code)).response.status,201);
 }finally{f.sql.close();}
});
test('a failed creation rolls back the invitation claim, profile and session together',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner);f.sql.exec("CREATE TRIGGER fail_progress BEFORE INSERT ON cloud_progress BEGIN SELECT RAISE(ABORT,'test failure'); END;");
  assert.equal((await f.redeem(code.code)).response.status,503);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_learners').get().n,0);assert.equal(f.sql.prepare('SELECT redeemed_at FROM cloud_invitations').get().redeemed_at,null);
  f.sql.exec('DROP TRIGGER fail_progress');assert.equal((await f.redeem(code.code)).response.status,201);
 }finally{f.sql.close();}
});
test('recovery and QR reconnect the admitted profile and its notes without another invitation',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner),joined=await f.redeem(code.code,{progress:{xp:385},badges:{first:{unlockedAt:'2026-11-01T12:00:00.000Z'}}});
  await f.call('/api/learners/notes','PUT',{operations:[{id:crypto.randomUUID(),lessonId:'band1-toefl-intro',text:'My saved note.',baseRevision:0}]},joined.auth);
  const restored=await f.call('/api/learners/restore','POST',{name:joined.data.account.name,code:joined.data.recoveryCode});assert.equal(restored.status,200);const restoredData=await restored.json();assert.equal(restoredData.account.id,joined.data.account.id);assert.equal(restoredData.snapshot.progress.xp,385);assert.ok(restoredData.snapshot.badges.first);
  const qr=await(await f.call('/api/learners/device-link','POST',{},joined.auth)).json();
  const target=await f.call('/api/learners/device-link/claim','POST',{token:qr.token,confirm:true});assert.equal(target.status,200);const targetData=await target.json();assert.equal(targetData.account.id,joined.data.account.id);
  const notes=await(await f.call('/api/learners/notes','GET',undefined,{Cookie:target.headers.get('set-cookie').split(';')[0],'X-EnglishCamp-Learner':targetData.account.id})).json();assert.equal(notes.notes['band1-toefl-intro'].text,'My saved note.');
  await f.call('/api/invitations/admin/admissions','POST',{accepting:false},owner);assert.equal((await f.call('/vocabulary','GET',undefined,joined.auth)).status,200);
 }finally{f.sql.close();}
});
test('suspension blocks existing sessions and recovery immediately while retaining all learning data',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner),joined=await f.redeem(code.code,{progress:{xp:385}}),before=JSON.stringify(f.sql.prepare('SELECT * FROM cloud_progress').all());
  await f.call('/api/invitations/admin/learner','POST',{id:joined.data.account.id,status:'suspended'},owner);
  assert.equal((await f.call('/api/speech','POST',{text:'absorb'},joined.auth)).status,401);assert.equal((await f.call('/dashboard','GET',undefined,joined.auth)).status,303);
  assert.equal((await f.call('/api/learners/restore','POST',{name:joined.data.account.name,code:joined.data.recoveryCode})).status,403);assert.equal(JSON.stringify(f.sql.prepare('SELECT * FROM cloud_progress').all()),before);
  await f.call('/api/invitations/admin/learner','POST',{id:joined.data.account.id,status:'approved'},owner);assert.equal((await f.call('/dashboard','GET',undefined,joined.auth)).status,200);
  await f.call('/api/learners/profile','DELETE',{confirm:'delete'},joined.auth);
  assert.equal((await f.redeem(code.code)).response.status,403,'deleting an account never makes its spent invitation reusable');
 }finally{f.sql.close();}
});
test('owner logout and key rotation invalidate management sessions; database failure closes access',async()=>{
 const f=fixture();try{
  const owner=await f.admin();assert.equal((await f.call('/api/invitations/admin/list','GET',undefined,owner)).status,200);
  const original=f.env.INVITATION_ADMIN_HASH;f.env.INVITATION_ADMIN_HASH=await accessHash('rotated key');assert.equal((await f.call('/api/invitations/admin/list','GET',undefined,owner)).status,401);f.env.INVITATION_ADMIN_HASH=original;
  await f.call('/api/invitations/admin/logout','POST',{},owner);assert.equal((await f.call('/api/invitations/admin/list','GET',undefined,owner)).status,401);
  delete f.env.LEARNERS_DB;assert.equal((await f.call('/dashboard')).status,503);assert.equal((await f.call('/api/coach','POST',{})).status,503);
 }finally{f.sql.close();}
});
test('learner quotas survive a changed IP; repeated daily rejection cannot burn the monthly pool',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner),joined=await f.redeem(code.code);
  await aiQuota(f.request('/api/pronunciation'),f.db,'pronunciation',joined.data.account.id);
  await assert.rejects(aiQuota(f.request('/api/pronunciation','GET',undefined,{},{'CF-Connecting-IP':'192.0.2.33'}),f.db,'pronunciation',joined.data.account.id),/daily pronunciation/);
  const date=new Date(),expiry=Math.floor(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,1)/1000),key=await accessHash('pronunciation:invited-month:'+expiry);
  assert.equal(f.sql.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').get(key).used,1);
 }finally{f.sql.close();}
});
test('busy pronunciation requests restore the daily allowance but retain the shared compute-attempt count',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner),joined=await f.redeem(code.code);
  const samples=Float32Array.from({length:48000},(_,i)=>.1*Math.sin(i/8)),bytes=encodeSpeakingWav([samples],16000),audio=Buffer.from(bytes).toString('base64'),audioHash=crypto.createHash('sha256').update(bytes).digest('hex'),line=PRONUNCIATION_LINES[0];
  const body={reference:{kind:'practice',id:line.id},audio,audioHash,consent:PRONUNCIATION_CONSENT},env={...f.env,OPENPRONOUNCE_URL:'https://owned.test/pronunciation',OPENPRONOUNCE_TOKEN:'synthetic-service-token'};
  const request=()=>f.request('/api/pronunciation','POST',body,joined.auth);
  assert.equal((await pronunciationResponse(request(),env,async()=>new Response(null,{status:429}))).status,429);
  const response=await pronunciationResponse(request(),env,async()=>Response.json({version:'englishcamp-openpronounce-v1',score:80,transcript:line.text,errors:[],audioHash}));assert.equal(response.status,200);
  const day=(Math.floor(Date.now()/1000/86400)+1)*86400,key=await accessHash(`pronunciation:learner:${joined.data.account.id}:${day}`);assert.equal(f.sql.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').get(key).used,1);
 }finally{f.sql.close();}
});
test('an exhausted shared monthly pool cannot start work or consume the learner daily allowance',async()=>{
 const f=fixture();try{
  const owner=await f.admin(),[code]=await f.invite(owner),joined=await f.redeem(code.code),date=new Date(),expiry=Math.floor(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,1)/1000),key=await accessHash('pronunciation:invited-month:'+expiry);
  f.sql.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) VALUES(?,500,?)').run(key,expiry);
  await assert.rejects(aiQuota(f.request('/api/pronunciation'),f.db,'pronunciation',joined.data.account.id),/monthly pronunciation/);
  const day=(Math.floor(Date.now()/1000/86400)+1)*86400,daily=await accessHash(`pronunciation:learner:${joined.data.account.id}:${day}`);
  assert.equal(f.sql.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').get(daily).used,0);assert.equal(f.sql.prepare('SELECT used FROM cloud_ai_limits WHERE bucket=?').get(key).used,500);
 }finally{f.sql.close();}
});
