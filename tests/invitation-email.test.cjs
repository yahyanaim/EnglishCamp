require('./register.cjs');
const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),{DatabaseSync}=require('node:sqlite');
const worker=require('../cloudflare/worker.ts').default;
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function fixture(){
 const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 function prepare(q){let v=[];const execute=()=>({meta:{changes:Number(sql.prepare(q).run(...v).changes)}});return{bind(...a){v=a;return this},async first(){return sql.prepare(q).get(...v)||null},async run(){return execute()},execute}}
 const db={prepare,async batch(s){sql.exec('BEGIN');try{const r=s.map(x=>x.execute());sql.exec('COMMIT');return r}catch(e){sql.exec('ROLLBACK');throw e}}},key='test-only-owner-key',env={LEARNERS_DB:db,INVITATION_REQUIRED:'true',INVITATION_ADMIN_HASH:hash(key),ASSETS:{fetch:async()=>new Response('EnglishCamp')}};
 const call=(path,method='GET',body,cookie='',origin='https://camp.test',ip='192.0.2.80')=>worker.fetch(new Request('https://camp.test'+path,{method,headers:{origin,Cookie:cookie,'CF-Connecting-IP':ip,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})}),env);
 const login=async()=>{const r=await call('/api/invitations/admin/login','POST',{password:key});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0]};
 const request=async(email='learner@example.test',name='Synthetic learner')=>{const r=await call('/api/invitations/request','POST',{name,email,consent:true});assert.equal(r.status,202);return sql.prepare('SELECT * FROM cloud_invitation_requests WHERE email=?').get(email.toLowerCase())};
 const configured=()=>Object.assign(env,{RESEND_API_KEY:'synthetic-not-a-real-key',INVITATION_EMAIL_FROM:'EnglishCamp <invite@example.test>'});
 return{sql,env,call,login,request,configured};
}
test('public invitation requests require consent and origin, deduplicate privately and never create learners or send mail',async()=>{
 const f=fixture();try{
  assert.equal((await f.call('/api/invitations/request','POST',{name:'Test',email:'x@example.test',consent:true},'','https://other.test')).status,403);
  assert.equal((await f.call('/api/invitations/request','POST',{name:'Test',email:'bad',consent:true})).status,400);
  assert.equal((await f.call('/api/invitations/request','POST',{name:'Test',email:'x@example.test',consent:false})).status,400);
  const first=await f.request();await f.request('learner@example.test','Changed name');assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitation_requests').get().n,1);assert.equal(f.sql.prepare('SELECT name FROM cloud_invitation_requests').get().name,first.name);
  assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_learners').get().n,0);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitations').get().n,0);
  assert.equal((await f.call('/api/invitations/admin/requests')).status,401);const cookie=await f.login();const data=await(await f.call('/api/invitations/admin/requests','GET',undefined,cookie)).json();assert.equal(data.items.length,1);assert.equal(data.emailConfigured,false);
  assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:first.id},cookie)).status,503);assert.equal(f.sql.prepare('SELECT status FROM cloud_invitation_requests').get().status,'pending');
 }finally{f.sql.close()}
});
test('owner approval emails one recipient-bound code; replay and wrong email cannot consume it',async()=>{
 const f=fixture(),original=global.fetch;let sends=0,code='';try{
  const row=await f.request(),cookie=await f.login();f.configured();
  global.fetch=async(url,opts)=>{assert.equal(url,'https://api.resend.com/emails');const body=JSON.parse(opts.body);assert.deepEqual(body.to,['learner@example.test']);assert.ok(opts.headers['Idempotency-Key']);code=body.text.match(/ECI-[\w-]{32}/)[0];const link=body.text.match(/https:\/\/camp.test\/invite[^\s]+/)[0];assert.equal(new URL(link).search,'');assert.ok(new URL(link).hash.includes(code));sends++;return Response.json({id:'synthetic-message-id'})};
  const responses=await Promise.all([f.call('/api/invitations/admin/email-invitation','POST',{id:row.id,days:7},cookie),f.call('/api/invitations/admin/email-invitation','POST',{id:row.id,days:7},cookie)]);assert.ok(responses.some(r=>r.ok));assert.equal(sends,1);
  assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,200);assert.equal(sends,1);
  assert.equal((await f.call('/api/learners/create','POST',{name:'Synthetic learner',email:'other@example.test',invitationCode:code})).status,403);assert.equal(f.sql.prepare('SELECT redeemed_at FROM cloud_invitations').get().redeemed_at,null);
  const good=await f.call('/api/learners/create','POST',{name:'Synthetic learner',email:'LEARNER@example.test',invitationCode:code,progress:{xp:25}});assert.equal(good.status,201);assert.equal((await good.json()).snapshot.progress.xp,25);
  assert.equal((await f.call('/api/learners/create','POST',{name:'Duplicate',email:'learner@example.test',invitationCode:code})).status,403);
  const directory=await(await f.call('/api/invitations/admin/requests?status=all','GET',undefined,cookie)).json();assert.equal(directory.items[0].status,'accepted');assert.ok(!JSON.stringify(directory).includes(code));assert.ok(!JSON.stringify(f.sql.prepare('SELECT * FROM cloud_invitations').get()).includes(code));
 }finally{global.fetch=original;f.sql.close()}
});
test('failed and interrupted mail sends leave no usable token, can retry, and do not affect progress',async()=>{
 const f=fixture(),original=global.fetch;try{const row=await f.request(),cookie=await f.login();f.configured();global.fetch=async()=>new Response('provider-private-detail',{status:500});
 const fail=await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie);assert.equal(fail.status,502);assert.ok(!(await fail.text()).includes('provider-private-detail'));const first=f.sql.prepare('SELECT * FROM cloud_invitations').get();assert.ok(first.revoked_at);assert.equal(first.delivery_state,'failed');assert.equal(f.sql.prepare('SELECT status FROM cloud_invitation_requests').get().status,'pending');
 f.sql.prepare("UPDATE cloud_invitation_requests SET status='processing',updated_at=0").run();global.fetch=async()=>Response.json({id:'synthetic-retry'});assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,200);assert.equal(f.sql.prepare("SELECT COUNT(*) n FROM cloud_invitations WHERE delivery_state='accepted' AND revoked_at IS NULL").get().n,1);
 assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_progress').get().n,0);
 }finally{global.fetch=original;f.sql.close()}
});
test('public requests and provider sends have independent hard limits; decline never calls a provider',async()=>{
 const f=fixture(),original=global.fetch;try{const row=await f.request(),cookie=await f.login();f.configured();let sends=0;global.fetch=async()=>{sends++;throw Error('must not send')};
 const expiry=(Math.floor(Date.now()/1000/86400)+1)*86400;f.sql.prepare('INSERT INTO cloud_invitation_mail_limits VALUES(?,30,?)').run(hash('invitation-send-day:'+expiry),expiry);
 assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,429);assert.equal(sends,0);assert.equal(f.sql.prepare('SELECT status FROM cloud_invitation_requests').get().status,'pending');
 assert.equal((await f.call('/api/invitations/admin/decline-request','POST',{id:row.id},cookie)).status,200);assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,409);assert.equal(sends,0);
 for(let i=0;i<2;i++)await f.request(`request-${i}@example.test`);assert.equal((await f.call('/api/invitations/request','POST',{name:'Fourth',email:'fourth@example.test',consent:true})).status,429);
 }finally{global.fetch=original;f.sql.close()}
});
test('security reports show real response aggregates and revoking other admins preserves learner sessions and credentials',async()=>{
 const f=fixture();try{
  await f.call('/api/invitations/admin/security');await f.call('/api/invitations/admin/login','POST',{password:'wrong'});const owner=await f.login(),other=await f.login();
  const token='s'.repeat(32);f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run('preserved','Original learner','apple','original-recovery-hash','2026-11-01');f.sql.prepare("INSERT INTO cloud_access VALUES('preserved','approved','existing',unixepoch())").run();f.sql.prepare('INSERT INTO cloud_sessions VALUES(?,?,?)').run(hash(token),'preserved',Math.floor(Date.now()/1000)+3600);
  const report=await(await f.call('/api/invitations/admin/security?days=7','GET',undefined,owner)).json();assert.equal(report.sessions.admins,2);assert.ok(report.events.some(e=>e.kind==='auth'&&e.total>=2));assert.ok(!JSON.stringify(report).includes('original-recovery'));assert.equal(report.learnerSessions,1);
  assert.equal((await f.call('/api/invitations/admin/revoke-sessions','POST',{},owner,'https://other.test')).status,403);
  assert.equal((await f.call('/api/invitations/admin/revoke-sessions','POST',{},owner)).status,200);assert.equal((await f.call('/api/invitations/admin/settings','GET',undefined,other)).status,401);assert.equal((await f.call('/api/invitations/admin/settings','GET',undefined,owner)).status,200);
  assert.equal((await(await f.call('/api/access/session','GET',undefined,'__Host-camp-session='+token)).json()).granted,true);assert.equal(f.sql.prepare('SELECT recovery_hash FROM cloud_learners').get().recovery_hash,'original-recovery-hash');
  assert.equal((await f.call('/api/invitations/admin/profile','POST',{displayName:'Owner name',roleTitle:'School owner'},owner)).status,200);const settings=await(await f.call('/api/invitations/admin/settings','GET',undefined,owner)).json();assert.equal(settings.profile.displayName,'Owner name');assert.equal(settings.profile.roleTitle,'School owner');assert.equal(f.env.INVITATION_ADMIN_HASH,hash('test-only-owner-key'));
 }finally{f.sql.close()}
});
test('an email response cannot activate a code revoked while the provider request is in flight',async()=>{
 const f=fixture(),original=global.fetch;try{const row=await f.request(),cookie=await f.login();f.configured();global.fetch=async()=>{f.sql.prepare("UPDATE cloud_invitations SET revoked_at=unixepoch() WHERE delivery_state='sending'").run();return Response.json({id:'synthetic-cancelled'})};
 assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,409);assert.equal(f.sql.prepare("SELECT COUNT(*) n FROM cloud_invitations WHERE delivery_state='accepted' AND revoked_at IS NULL").get().n,0);assert.equal(f.sql.prepare('SELECT status FROM cloud_invitation_requests').get().status,'pending');
 }finally{global.fetch=original;f.sql.close()}
});
test('targeted codes awaiting email acceptance cannot be redeemed, and request filtering rejects invalid input',async()=>{
 const f=fixture();try{const code='ECI-'+'a'.repeat(32);f.sql.prepare("INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at,recipient_email,delivery_state) VALUES('pending-code',?,'masked','test',unixepoch(),unixepoch()+86400,'pending@example.test','sending')").run(hash(code));
 assert.equal((await f.call('/api/learners/create','POST',{name:'Synthetic pending',email:'pending@example.test',invitationCode:code})).status,403);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_learners').get().n,0);
 const owner=await f.login();for(const q of ['status=bad','page=0','page=1.5'])assert.equal((await f.call('/api/invitations/admin/requests?'+q,'GET',undefined,owner)).status,400);
 }finally{f.sql.close()}
});
test('declined or unused expired invitations can be reviewed again, but active and redeemed codes cannot issue a duplicate invitation',async()=>{
 const f=fixture(),original=global.fetch;try{const row=await f.request(),cookie=await f.login();f.configured();global.fetch=async()=>Response.json({id:'synthetic-reissue'});
 await f.call('/api/invitations/admin/decline-request','POST',{id:row.id},cookie);assert.equal((await f.call('/api/invitations/admin/reopen-request','POST',{id:row.id},cookie)).status,200);
 assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,200);assert.equal((await f.call('/api/invitations/admin/reopen-request','POST',{id:row.id},cookie)).status,409);
 f.sql.prepare('UPDATE cloud_invitations SET expires_at=0').run();const requests=await(await f.call('/api/invitations/admin/requests?status=accepted','GET',undefined,cookie)).json();assert.equal(requests.items[0].canReopen,1);
 assert.equal((await f.call('/api/invitations/admin/reopen-request','POST',{id:row.id},cookie)).status,200);assert.equal((await f.call('/api/invitations/admin/email-invitation','POST',{id:row.id},cookie)).status,200);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitations WHERE revoked_at IS NOT NULL').get().n,1);
 f.sql.prepare('UPDATE cloud_invitations SET redeemed_at=unixepoch(),expires_at=0 WHERE revoked_at IS NULL').run();assert.equal((await f.call('/api/invitations/admin/reopen-request','POST',{id:row.id},cookie)).status,409);
 }finally{global.fetch=original;f.sql.close()}
});
