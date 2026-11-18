require('./register.cjs');const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),{DatabaseSync}=require('node:sqlite');const worker=require('../cloudflare/worker.ts').default;const{summarize}=require('../cloudflare/adminReports.ts');
function fixture(){const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations').sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));function prepare(q){let v=[];const execute=()=>({meta:{changes:Number(sql.prepare(q).run(...v).changes)}});return{bind(...n){v=n;return this;},async first(){return sql.prepare(q).get(...v)||null;},async run(){return execute()},execute};}const db={prepare,async batch(s){sql.exec('BEGIN');try{const r=s.map(x=>x.execute());sql.exec('COMMIT');return r}catch(e){sql.exec('ROLLBACK');throw e}}},key='synthetic-admin-test-key',env={LEARNERS_DB:db,INVITATION_REQUIRED:'true',INVITATION_ADMIN_HASH:crypto.createHash('sha256').update(key).digest('hex'),ASSETS:{fetch:async()=>new Response('EnglishCamp')}};async function call(path,method='GET',body,cookie='',origin='https://camp.test'){return worker.fetch(new Request('https://camp.test'+path,{method,headers:{Origin:origin,Cookie:cookie,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})}),env)}async function login(){const r=await call('/api/invitations/admin/login','POST',{password:key});return r.headers.get('set-cookie').split(';')[0]}return{sql,db,env,call,login};}
test('summary separates historical course credit from recorded signature-matched stages and excludes private fields',()=>{const p={xp:999,lessons:{'band1-ielts-intro':{completed:true}},modules:{'band1-toefl-intro':{stages:{0:{finishedAt:'2026-11-15',signature:'old',kind:'reading'}},expectedSignatures:['new','b','c']}},quizResults:{'band4-5':[{score:70,takenAt:'2026-11-15',answers:['PRIVATE']} ]},notes:'PRIVATE',recording:'PRIVATE'};const s=summarize(JSON.stringify(p),JSON.stringify({'first-login':{unlockedAt:'2026-11-15'}}),17);assert.equal(s.xp,17);assert.equal(s.courses[0].completed,1);assert.deepEqual(s.courses[0].recordedStages,[0,0,0]);assert.equal(s.courses[0].currentCycles,0);assert.equal(s.badges.length,1);assert.ok(!JSON.stringify(s).includes('PRIVATE'));});
test('all admin pages and APIs require owner authorization even with invitation mode disabled',async()=>{const f=fixture();try{f.env.INVITATION_REQUIRED='false';for(const page of ['dashboard','learners','invitations','analytics','courses','achievements','settings','infrastructure']){const r=await f.call('/admin/'+page);assert.equal(r.status,303);assert.match(r.headers.get('location'),/admin\/login/);}for(const api of ['report','directory','detail','catalogue','infrastructure','invitation-directory'])assert.equal((await f.call('/api/invitations/admin/'+api)).status,401);const cookie=await f.login();const ownerPage=await f.call('/admin/dashboard','GET',undefined,cookie);assert.equal(ownerPage.status,200);assert.match(ownerPage.headers.get('cache-control'),/no-store/);assert.match(ownerPage.headers.get('vary'),/Cookie/);const body=await(await f.call('/api/invitations/admin/report','GET',undefined,cookie)).json();assert.equal(body.totals.learners,0);assert.equal(body.quiz.count,0);assert.deepEqual(body.registrations,[]);assert.match(body.scope,/guests/);assert.equal((await f.call('/api/invitations/admin/admissions','POST',{accepting:false},cookie,'https://other.test')).status,403);await f.call('/api/invitations/admin/logout','POST',{},cookie);assert.equal((await f.call('/api/invitations/admin/report','GET',undefined,cookie)).status,401);}finally{f.sql.close()}});
test('analytics backfill is bounded, supports pagination, and never exposes recovery or answer data',async()=>{const f=fixture();try{for(let i=0;i<27;i++){const id='id-'+i;f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run(id,'Learner '+i,'apple','private-hash-'+i,new Date().toISOString());f.sql.prepare("INSERT INTO cloud_access VALUES(?,'approved','existing',unixepoch())").run(id);f.sql.prepare("INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,baseline_xp,updated_at) VALUES(?,?,?,'[]',?,?)").run(id,JSON.stringify({xp:i,notes:'PRIVATE',quizResults:{'band4-5':[{score:60,takenAt:new Date().toISOString(),answers:['PRIVATE']}]}}),'{}',i,new Date().toISOString());}const cookie=await f.login();let r=await(await f.call('/api/invitations/admin/report','GET',undefined,cookie)).json();assert.equal(r.totals.learners,27);assert.equal(r.summaries.length,5);assert.equal(r.pending,22);assert.ok(!JSON.stringify(r).includes('PRIVATE'));for(let i=0;i<5;i++)await f.call('/api/invitations/admin/report','GET',undefined,cookie);r=await(await f.call('/api/invitations/admin/report','GET',undefined,cookie)).json();assert.equal(r.pending,0);assert.equal(r.quiz.count,27);assert.equal(r.summaries.reduce((n,s)=>n+s.xp,0),351);const dir=await(await f.call('/api/invitations/admin/directory?page=2','GET',undefined,cookie)).json();assert.equal(dir.items.length,2);assert.equal(dir.total,27);assert.ok(!JSON.stringify(dir).includes('private-hash'));const detail=await(await f.call('/api/invitations/admin/detail?id=id-0','GET',undefined,cookie)).json();assert.ok(!JSON.stringify(detail).includes('PRIVATE'));assert.ok(!JSON.stringify(detail).includes('recovery'));const infra=await(await f.call('/api/invitations/admin/infrastructure','GET',undefined,cookie)).json();assert.equal(infra.database,'Connected');assert.equal(infra.billing,'Not connected');assert.equal(infra.apiErrors,'Not collected');assert.ok(!JSON.stringify(infra).includes(f.env.INVITATION_ADMIN_HASH));}finally{f.sql.close()}});

test('admin routing rejects bypass paths and validates filters; expired sessions fail closed',async()=>{const f=fixture();try{f.env.INVITATION_REQUIRED='false';for(const path of ['/admin/dashboard.html','/admin/dashboard.txt','/%61dmin/dashboard','/admin%2Fdashboard']){const r=await f.call(path);assert.equal(r.status,303);assert.match(r.headers.get('cache-control'),/no-store/);}const cookie=await f.login();for(const query of ['directory?page=0','directory?page=1.5','directory?status=unknown','directory?registered=999','invitation-directory?status=unknown','report?days=999']){assert.equal((await f.call('/api/invitations/admin/'+query,'GET',undefined,cookie)).status,400);}f.sql.exec('UPDATE cloud_admin_sessions SET expires_at=0');assert.equal((await f.call('/api/invitations/admin/report','GET',undefined,cookie)).status,401);assert.equal((await f.call('/admin/dashboard','GET',undefined,cookie)).status,303);}finally{f.sql.close()}});

test('administrator and learner sign-in use independent sessions and cannot exchange privileges',async()=>{
 const f=fixture();try{
  const id='separate-learner',token='a'.repeat(32);
  f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run(id,'Synthetic learner','apple','synthetic-recovery',new Date().toISOString());
  f.sql.prepare("INSERT INTO cloud_access VALUES(?,'approved','existing',unixepoch())").run(id);
  f.sql.prepare('INSERT INTO cloud_sessions VALUES(?,?,?)').run(crypto.createHash('sha256').update(token).digest('hex'),id,Math.floor(Date.now()/1000)+3600);
  const learnerCookie='__Host-camp-session='+token;
  assert.equal((await f.call('/admin/login','GET',undefined,learnerCookie)).status,200);
  assert.equal((await f.call('/admin/dashboard','GET',undefined,learnerCookie)).status,303);
  assert.equal((await f.call('/api/invitations/admin/report','GET',undefined,learnerCookie)).status,401);
  assert.equal((await(await f.call('/api/access/session','GET',undefined,learnerCookie)).json()).granted,true);
  const owner=await f.login();assert.match(owner,/^__Host-camp-invite-admin=/);
  assert.equal((await(await f.call('/api/access/session','GET',undefined,owner)).json()).granted,false);
  assert.equal((await f.call('/api/invitations/admin/catalogue','GET',undefined,owner)).status,200);
  await f.call('/api/invitations/admin/logout','POST',{},owner);
  assert.equal((await(await f.call('/api/access/session','GET',undefined,learnerCookie)).json()).granted,true);
 }finally{f.sql.close();}
});

test('invitation batches enforce ready-code capacity atomically and never leave partial batches',async()=>{
 const f=fixture();try{const expiry=Math.floor(Date.now()/1000)+86400;for(let i=0;i<94;i++)f.sql.prepare('INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at) VALUES(?,?,?,?,unixepoch(),?)').run('seed-'+i,'hash-'+i,'masked-'+i,'Capacity fixture',expiry);
 const owner=await f.login(),create=()=>f.call('/api/invitations/admin/create','POST',{count:4,days:7,label:'Atomic batch'},owner);
 const results=await Promise.all([create(),create()]);assert.deepEqual(results.map(r=>r.status).sort(),[201,409]);
 assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitations').get().n,98);assert.equal(f.sql.prepare("SELECT COUNT(*) n FROM cloud_invitations WHERE label='Atomic batch'").get().n,4);
 const rejected=await f.call('/api/invitations/admin/create','POST',{count:3,days:7,label:'Rejected batch'},owner);assert.equal(rejected.status,409);assert.equal(f.sql.prepare("SELECT COUNT(*) n FROM cloud_invitations WHERE label='Rejected batch'").get().n,0);
 const fill=await f.call('/api/invitations/admin/create','POST',{count:2,days:7,label:'Final slots'},owner);assert.equal(fill.status,201);const d=await fill.json();assert.equal(d.codes.length,2);assert.equal(d.label,'Final slots');assert.equal(d.expiresAt-d.createdAt,7*86400);
 assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitations').get().n,100);assert.ok(!JSON.stringify(f.sql.prepare('SELECT * FROM cloud_invitations WHERE id=?').get(d.codes[0].id)).includes(d.codes[0].code));
 }finally{f.sql.close();}
});
test('revocation reports stale used or expired invitations, remains idempotent and preserves learners',async()=>{
 const f=fixture();try{const owner=await f.login(),res=await f.call('/api/invitations/admin/create','POST',{count:3,days:7,label:'Revoke fixture'},owner),{codes}=await res.json();
 f.sql.prepare('UPDATE cloud_invitations SET redeemed_at=unixepoch() WHERE id=?').run(codes[0].id);f.sql.prepare('UPDATE cloud_invitations SET expires_at=0 WHERE id=?').run(codes[1].id);
 for(const id of [codes[0].id,codes[1].id])assert.equal((await f.call('/api/invitations/admin/revoke','POST',{id},owner)).status,409);
 assert.equal((await f.call('/api/invitations/admin/revoke','POST',{id:'missing'},owner)).status,404);
 for(let i=0;i<2;i++)assert.equal((await f.call('/api/invitations/admin/revoke','POST',{id:codes[2].id},owner)).status,200);
 assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_invitations WHERE revoked_at IS NOT NULL').get().n,1);
 }finally{f.sql.close();}
});
test('invitation and settings reads expose bounded safe management metadata without refreshing learning summaries',async()=>{
 const f=fixture();try{f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run('uncached','Synthetic learner','apple','private','2026-11-16');f.sql.prepare("INSERT INTO cloud_access VALUES('uncached','approved','existing',unixepoch())").run();f.sql.prepare("INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,baseline_xp,updated_at) VALUES('uncached','{}','{}','[]',0,'2026-11-16')").run();
 assert.equal((await f.call('/api/invitations/admin/settings')).status,401);const owner=await f.login();await f.call('/api/invitations/admin/create','POST',{count:2,days:7,label:'Safe metadata'},owner);
 const list=await(await f.call('/api/invitations/admin/invitation-directory?page=99','GET',undefined,owner)).json();assert.equal(list.page,1);assert.equal(list.counts.ready,2);assert.equal(list.limits.readyCodes,100);assert.ok(!JSON.stringify(list).includes('code_hash'));
 const settings=await(await f.call('/api/invitations/admin/settings','GET',undefined,owner)).json();assert.equal(settings.accepting,true);assert.equal(settings.limits.pronunciationMonthlyTotal,500);assert.equal(settings.limits.sessionHours,8);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_admin_summaries').get().n,0);
 }finally{f.sql.close();}
});
test('learner sorting and access/activity filters apply to the full directory, with stable ID search and clamped pages',async()=>{
 const f=fixture();try{for(let i=0;i<28;i++){const id='sort-'+i;f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run(id,'Learner '+String(i).padStart(2,'0'),'apple','hash-'+i,new Date().toISOString());f.sql.prepare('INSERT INTO cloud_access VALUES(?,?,?,unixepoch())').run(id,i%2?'suspended':'approved','existing');}
 const owner=await f.login(),call=async(q)=>await(await f.call('/api/invitations/admin/directory?'+q,'GET',undefined,owner)).json();
 const name=await call('sort=name&direction=asc');assert.equal(name.items[0].name,'Learner 00');assert.equal(name.items.length,25);assert.equal(name.total,28);assert.equal(name.counts.approved,14);
 const last=await call('sort=name&direction=asc&page=9');assert.equal(last.page,2);assert.equal(last.items.length,3);assert.equal(last.items[0].name,'Learner 25');
 const id=await call('q=EC-'+String(name.items[0].number).padStart(4,'0'));assert.equal(id.total,1);assert.equal(id.items[0].id,name.items[0].id);
 const paused=await call('status=suspended&activity=inactive');assert.equal(paused.total,14);assert.ok(paused.items.every(i=>i.status==='suspended'));assert.equal((await call('activity=active')).total,0);
 for(const q of ['sort=unknown','direction=sideways','activity=unknown'])assert.equal((await f.call('/api/invitations/admin/directory?'+q,'GET',undefined,owner)).status,400);
 }finally{f.sql.close();}
});
test('visible-page CSV export escapes quotes and neutralizes spreadsheet formulas in learner names',()=>{
 const{adminCsv}=require('../src/lib/adminExport.ts');const csv=adminCsv([['Name','XP'],['=HYPERLINK("https://example.test")',5],[' @SUM(1,2)',10],['A "quoted" name',0],['اسم عربي',2]]);
 assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes('"\'=HYPERLINK(""https://example.test"")"'));assert.ok(csv.includes('"\' @SUM(1,2)"'));assert.ok(csv.includes('"A ""quoted"" name"'));assert.ok(csv.includes('اسم عربي'));
});

test('report boundaries support UTC Today and inclusive custom days with bounded, valid dates',()=>{
 const{adminPeriod}=require('../src/lib/adminPeriod.ts'),now=new Date('2026-11-16T14:20:00Z');
 assert.deepEqual(adminPeriod(new URL('https://camp.test/?days=1'),now),{since:'2026-11-16',until:now.toISOString()});
 assert.deepEqual(adminPeriod(new URL('https://camp.test/?from=2026-11-01&to=2026-11-15'),now),{since:'2026-11-01',until:'2026-11-16'});
 for(const q of ['from=2026-11-17&to=2026-11-16','from=2026-02-30&to=2026-03-01','from=2026-13-01&to=2026-13-02','from=2026-11-01','from=2020-01-01&to=2026-11-16','days=999'])assert.throws(()=>adminPeriod(new URL('https://camp.test/?'+q),now),TypeError);
});
test('custom reports include only registrations, rewards and redemptions inside both date boundaries',async()=>{
 const f=fixture();try{for(const[date,id]of [['2026-11-01T00:00:00Z','before'],['2026-11-05T12:00:00Z','inside'],['2026-11-10T00:00:00Z','after']]){f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run(id,'Report fixture','apple','hash-'+id,date);f.sql.prepare("INSERT INTO cloud_access VALUES(?,'approved','existing',unixepoch())").run(id);f.sql.prepare("INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,baseline_xp,updated_at) VALUES(?,?,?,'[]',0,?)").run(id,JSON.stringify({quizResults:{'band4-5':[{takenAt:date,score:80}]}}),JSON.stringify({'first-login':{unlockedAt:date}}),date);f.sql.prepare("INSERT INTO cloud_events VALUES(?,'test-event','lesson','fixture',5,?)").run(id,date);f.sql.prepare("INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at,redeemed_at) VALUES(?,?,?,'Report fixture',0,9999999999,?)").run('invite-'+id,'hash-'+id,'masked-'+id,Date.parse(date)/1000);}
 const owner=await f.login(),r=await(await f.call('/api/invitations/admin/report?from=2026-11-05&to=2026-11-09','GET',undefined,owner)).json();assert.equal(r.totals.learners,3);assert.equal(r.totals.registrations,1);assert.equal(r.registrations.length,1);assert.equal(r.registrations[0].day,'2026-11-05');assert.equal(r.period.until,'2026-11-10');assert.equal(r.quiz.count,1);assert.equal(r.activity.length,1);assert.equal(r.activity[0].xp,5);assert.equal(r.redemptions.length,1);assert.equal(r.xpByActivity[0].value,5);assert.equal(r.awards.find(a=>a.id==='first-login').period,1);
 }finally{f.sql.close();}
});

test('infrastructure snapshot reads exact UTC quota windows and safe storage counts without consuming allowances',async()=>{
 const f=fixture();try{
  const now=new Date(),day=(Math.floor(Date.now()/86400000)+1)*86400,month=Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+1,1)/1000;
  for(const[raw,used,expiry]of [[`pronunciation:invited-month:${month}`,17,month],[`pronunciation:global:86400:${day}`,8,day],[`coach:global:86400:${day}`,23,day]])f.sql.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) VALUES(?,?,?)').run(crypto.createHash('sha256').update(raw).digest('hex'),used,expiry);
  f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run('infra-fixture','PRIVATE_LEARNER','apple','PRIVATE_HASH',now.toISOString());
  f.sql.prepare("INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,updated_at) VALUES(?,'{}','{}','[]',?)").run('infra-fixture',now.toISOString());
  f.sql.prepare('INSERT INTO cloud_notes(learner_id,lesson_id,body,revision,last_operation,updated_at) VALUES(?,?,?,?,?,?)').run('infra-fixture','lesson-test','PRIVATE_NOTE_BODY',1,'synthetic-operation',now.toISOString());
  f.env.GEMINI_API_KEY='PRIVATE_GEMINI_KEY';f.env.AZURE_SPEECH_KEY='PRIVATE_AZURE_KEY';f.env.AZURE_SPEECH_REGION='northeurope';f.env.OPENPRONOUNCE_URL='https://private-service.example';f.env.OPENPRONOUNCE_TOKEN='PRIVATE_SERVICE_TOKEN';
  const before=f.sql.prepare('SELECT SUM(used) total FROM cloud_ai_limits').get().total,owner=await f.login(),r=await f.call('/api/invitations/admin/infrastructure','GET',undefined,owner),d=await r.json();
  assert.equal(r.status,200);assert.deepEqual(d.serviceUsage,{monthlyPronunciationAttempts:17,dailyPronunciationRequests:8,dailyCoachRequests:23});
  assert.equal(d.windows.dayResetsAt,new Date(day*1000).toISOString());assert.equal(d.windows.monthResetsAt,new Date(month*1000).toISOString());
  assert.equal(d.limits.modalMonthlyUSD,1);assert.equal(d.limits.pronunciationMonthly,500);assert.equal(d.limits.coachDailyGlobal,200);assert.equal(d.limits.pronunciationDailyGlobal,100);
  assert.equal(d.synchronization.profiles,1);assert.equal(d.synchronization.snapshots,1);assert.equal(d.synchronization.latestSavedAt,now.toISOString());assert.equal(d.synchronization.notes,1);
  assert.ok(Number.isFinite(d.databaseReadMs)&&d.databaseReadMs>=0);assert.equal(d.microsoftConfigured,true);assert.equal(d.coachConfigured,true);assert.equal(d.pronunciationConfigured,true);
  assert.equal(f.sql.prepare('SELECT SUM(used) total FROM cloud_ai_limits').get().total,before);assert.ok(!JSON.stringify(d).includes('PRIVATE'));assert.ok(!JSON.stringify(d).includes('private-service'));
  f.env.OPENPRONOUNCE_URL='https://synthetic.modal.run/score';let configured=await(await f.call('/api/invitations/admin/infrastructure','GET',undefined,owner)).json();assert.equal(configured.pronunciationConfigured,false);
  f.env.OPENPRONOUNCE_MODAL_KEY='PRIVATE_MODAL_KEY';f.env.OPENPRONOUNCE_MODAL_SECRET='PRIVATE_MODAL_SECRET';configured=await(await f.call('/api/invitations/admin/infrastructure','GET',undefined,owner)).json();assert.equal(configured.pronunciationConfigured,true);assert.ok(!JSON.stringify(configured).includes('PRIVATE'));
  f.env.OPENPRONOUNCE_URL='http://unsafe.example/score';configured=await(await f.call('/api/invitations/admin/infrastructure','GET',undefined,owner)).json();assert.equal(configured.pronunciationConfigured,false);
 }finally{f.sql.close();}
});

test('achievement timeline and practice average respect the selected period and never invent a score for no attempts',async()=>{
 const f=fixture();try{
  const owner=await f.login(),empty=await(await f.call('/api/invitations/admin/report?from=2026-11-05&to=2026-11-09','GET',undefined,owner)).json();assert.equal(empty.quiz.average,null);assert.deepEqual(empty.awardsTimeline,[]);
  const progress={quizResults:{'band4-5':[{score:50,takenAt:'2026-11-05T12:00:00Z'},{score:80,takenAt:'2026-11-09T12:00:00Z'},{score:100,takenAt:'2026-11-10T00:00:00Z'}]}};
  f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run('achievement-fixture','Synthetic milestone','apple','synthetic-hash','2026-11-01T00:00:00Z');
  f.sql.prepare("INSERT INTO cloud_access VALUES(?,'approved','existing',unixepoch())").run('achievement-fixture');
  const badges={'first-login':{unlockedAt:'2026-11-05T18:00:00Z'},'first-lesson':{unlockedAt:'2026-11-05T19:00:00Z'},'next-day':{unlockedAt:'2026-11-09T01:00:00Z'},'outside':{unlockedAt:'2026-11-10T00:00:00Z'}};
  f.sql.prepare("INSERT INTO cloud_progress(learner_id,progress_json,badges_json,imported_keys,updated_at) VALUES(?,?,?,'[]',?)").run('achievement-fixture',JSON.stringify(progress),JSON.stringify(badges),'2026-11-09T12:00:00Z');
  const data=await(await f.call('/api/invitations/admin/report?from=2026-11-05&to=2026-11-09','GET',undefined,owner)).json();
  assert.equal(data.quiz.average,65);assert.equal(data.quiz.count,2);assert.deepEqual(data.awardsTimeline,[{label:'2026-11-05',value:2},{label:'2026-11-09',value:1}]);
 }finally{f.sql.close();}
});

test('learner directory exposes only effective payment dates and subscription status for the visible learner',async()=>{
 const f=fixture();
 try {
  const now=Math.floor(Date.now()/1000),created=new Date(now*1000).toISOString();
  f.sql.prepare('INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,?)').run('billing-learner','Synthetic billing learner','apple','synthetic-hash',created);
  f.sql.prepare("INSERT INTO cloud_access VALUES(?,'approved','invitation',?)").run('billing-learner',now);
  f.sql.prepare("INSERT INTO cloud_memberships VALUES(?,'trial',?,?)").run('billing-learner',now+604800,now);
  f.sql.prepare("INSERT INTO cloud_subscriptions(id,learner_id,plan_id,status,created_at) VALUES(?,?,?,'CANCELLED',?)").run('private-subscription-id','billing-learner','private-plan-id',now);
  const pay=f.sql.prepare("INSERT INTO cloud_subscription_payments(id,subscription_id,state,paid_at,paid_until) VALUES(?,'private-subscription-id','paid',?,?)");
  pay.run('private-valid-payment',now,now+1000);
  pay.run('private-reversed-payment',now+10,now+5000);
  f.sql.prepare("INSERT INTO cloud_billing_reversals VALUES(?,'reversed')").run('private-reversed-payment');
  const owner=await f.login();
  const response=await f.call('/api/invitations/admin/directory','GET',undefined,owner);
  assert.equal(response.status,200);
  const result=await response.json();
  assert.deepEqual(result.items[0].payment,{mode:'trial',trialUntil:now+604800,subscriptionStatus:'CANCELLED',paidUntil:now+1000,lastPaidAt:now});
  assert.doesNotMatch(JSON.stringify(result),/private-(subscription|plan|valid|reversed)|synthetic-hash/);
 }finally{f.sql.close();}
});
