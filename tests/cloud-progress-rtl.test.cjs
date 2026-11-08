require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite'),fs=require('node:fs');
const {learnerResponse}=require('../cloudflare/learners.ts');
const {cleanProgress,mergeProgress,mergeBadges}=require('../src/lib/cloudProgress.ts');
const {GRAMMAR_EXTENSIONS}=require('../src/data/grammar-extensions.ts');
const {GRAMMAR_EXTENSION_ARABIC}=require('../src/data/grammar-extensions-ar.ts');
const {ArabicText}=require('../src/components/ui/ArabicText.tsx');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
function fixture(){
 const sqlite=new DatabaseSync(':memory:');for(const file of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sqlite.exec(fs.readFileSync('migrations/'+file,'utf8'));
 function prepare(sql){let values=[];return {bind(...next){values=next;return this;},async first(){return sqlite.prepare(sql).get(...values)||null;},async run(){return {meta:{changes:Number(sqlite.prepare(sql).run(...values).changes)}};}};}
 const db={prepare,async batch(statements){sqlite.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());sqlite.exec('COMMIT');return result;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
 const origin='https://camp.test';
 async function request(action,method='GET',body,credentials={},extra={}){return learnerResponse(new Request(origin+'/api/learners/'+action,{method,headers:{Origin:origin,...(body?{'Content-Type':'application/json'}:{}),...(credentials.cookie?{Cookie:credentials.cookie}:{}),...(credentials.id?{'X-EnglishCamp-Learner':credentials.id}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})}),{LEARNERS_DB:db});}
 async function create(name='ليلى',progress={xp:90},badges={}){const response=await request('create','POST',{name,progress,badges});assert.equal(response.status,201);const data=await response.json();return{...data,cookie:response.headers.get('set-cookie').split(';')[0],id:data.account.id,headers:response.headers};}
 return{sqlite,request,create};
}
const at='2026-11-07T13:00:00.000Z';
const event=(id,source,xp=5)=>({id,source,xp,at,kind:'exercise'});
test('new grammar-reference lessons have complete Arabic introductions, rules, examples and notes',()=>{
 assert.deepEqual(Object.keys(GRAMMAR_EXTENSION_ARABIC).sort(),GRAMMAR_EXTENSIONS.map(l=>l.id).sort());
 let translated=0;for(const lesson of GRAMMAR_EXTENSIONS){const ar=GRAMMAR_EXTENSION_ARABIC[lesson.id];assert.match(ar.intro,/[ء-ي]/);assert.equal(ar.content.length,lesson.content.length);translated++;
  lesson.content.forEach((item,index)=>{const row=ar.content[index];assert.equal(row.examples.length,item.examples.length);assert.equal(row.notes.length,item.notes?.length||0);for(const text of [row.title,row.formation,...row.examples,...row.notes]){assert.match(text,/[ء-ي]/);translated++;}});
 }assert.equal(translated,96);
});
test('Arabic preserves a whole Latin formula and time inside isolated LTR runs',()=>{
 const html=renderToStaticMarkup(React.createElement(ArabicText,{text:'نستخدم have / has + been + verb-ing عند الساعة 10:30 ضمن المستوى A1–A2.'}));
 assert.match(html,/lang="ar" dir="rtl"/);for(const text of ['have / has + been + verb-ing','10:30','A1–A2'])assert.ok(html.includes(`<bdi dir="ltr">${text}</bdi>`),text);
});
test('sync sanitization excludes notes, answer text, recordings and unrecognized fields',()=>{
 const progress=cleanProgress({xp:75,notes:'private note',recording:'private recording',quizResults:{'band4-5':[{score:60,xpEarned:10,takenAt:at,answers:['private answer']}]} ,modules:{intro:{stages:{0:{finishedAt:at,signature:'abc',kind:'reading',outcome:'checked',response:'private draft'}}}}});
 const text=JSON.stringify(progress);assert.ok(!/private|response|recording|notes/.test(text));assert.deepEqual(progress.quizResults['band4-5'][0].answers,[]);assert.equal(progress.modules.intro.stages[0].signature,'abc');
});
test('completion and badge merging preserves both devices and dated activity',()=>{
 const a={xp:95,exercisesDone:{a:true},lessons:{intro:{completed:true,xpEarned:60,completedAt:at,attempts:1}},modules:{m:{stages:{0:{finishedAt:at,signature:'a',kind:'reading',outcome:'checked'}}}},lastActiveDate:'2026-11-06',streak:2,legacyActiveDays:['2026-11-05','2026-11-06']};
 const b={xp:100,exercisesDone:{b:true,a:false},modules:{m:{stages:{1:{finishedAt:at,signature:'b',kind:'reading',outcome:'checked'}}}},lastActiveDate:'2026-11-07',streak:1};
 const result=mergeProgress(a,b);assert.deepEqual(result.exercisesDone,{a:true,b:true});assert.ok(result.lessons.intro.completed);assert.deepEqual(Object.keys(result.modules.m.stages),['0','1']);assert.equal(result.streak,3);assert.deepEqual(Object.keys(mergeBadges({first:{unlockedAt:at}},{second:{unlockedAt:at}})),['first','second']);
});
test('a recovery code restores the same profile; identical names never grant another learner access',async()=>{
 const f=fixture();try{const a=await f.create(),b=await f.create();assert.notEqual(a.id,b.id);assert.match(a.headers.get('set-cookie'),/HttpOnly/);assert.match(a.headers.get('set-cookie'),/SameSite=Strict/);assert.match(a.headers.get('set-cookie'),/Secure/);const stored=f.sqlite.prepare('SELECT recovery_hash FROM cloud_learners WHERE id=?').get(a.id);assert.match(stored.recovery_hash,/^[a-f0-9]{64}$/);assert.notEqual(stored.recovery_hash,a.recoveryCode);
  assert.equal((await f.request('restore','POST',{name:'someone else',code:a.recoveryCode})).status,401);
  const restored=await f.request('restore','POST',{name:'ليلى',code:a.recoveryCode});assert.equal(restored.status,200);const data=await restored.json();assert.equal(data.account.id,a.id);assert.equal(data.snapshot.progress.xp,90);assert.ok(!JSON.stringify(data).includes(a.recoveryCode));
  assert.equal((await f.request('progress','GET',undefined,{cookie:a.cookie,id:b.id})).status,409);
 }finally{f.sqlite.close();}
});
test('idempotent reward events combine different devices without double-counting a repeated exercise',async()=>{
 const f=fixture();try{const owner=await f.create('Mira',{xp:100,events:[event('old','old-task')],exercisesDone:{'old-task':true}});const put=async(events,exercises)=>{const response=await f.request('progress','PUT',{progress:{xp:1000,exercisesDone:exercises,events},badges:{first:{unlockedAt:at}},pendingEvents:events},owner);assert.equal(response.status,200);return(await response.json()).snapshot;};
  let result=await put([event('old','old-task'),event('device-a','task-a')],{'task-a':true});assert.equal(result.progress.xp,105);
  result=await put([event('device-b-repeat','task-a'),event('device-b','task-b',7)],{'task-b':true});assert.equal(result.progress.xp,112);assert.ok(result.progress.exercisesDone['task-a']&&result.progress.exercisesDone['task-b']);assert.ok(result.badges.first);
  result=await put([event('device-a','task-a')],{});assert.equal(result.progress.xp,112);
 }finally{f.sqlite.close();}
});
test('unsafe origins, unauthenticated reads, malformed bodies and brute-force recovery are rejected',async()=>{
 const f=fixture();try{assert.equal((await f.request('create','POST',{name:'Mira'},{},{Origin:'https://other.test'})).status,403);assert.equal((await f.request('progress')).status,401);
  assert.equal((await f.request('create','POST',{name:'Mira'},{},{'Content-Length':'1048577'})).status,413);
  for(let i=0;i<12;i++)assert.equal((await f.request('restore','POST',{name:'Mira',code:'wrong'})).status,401);
  assert.equal((await f.request('restore','POST',{name:'Mira',code:'wrong'})).status,429);
 }finally{f.sqlite.close();}
});
test('deleting a profile cascades only that account and invalidates its recovery code',async()=>{
 const f=fixture();try{const a=await f.create('Mira'),b=await f.create('Mira');assert.equal((await f.request('profile','DELETE',{confirm:'delete'},a)).status,200);assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS n FROM cloud_learners').get().n,1);assert.equal((await f.request('progress','GET',undefined,b)).status,200);assert.equal((await f.request('restore','POST',{name:'Mira',code:a.recoveryCode})).status,401);assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS n FROM cloud_progress WHERE learner_id=?').get(a.id).n,0);
 }finally{f.sqlite.close();}
});
test('linking a local learner copies its data before switching and separates equal names by cloud ID',()=>{
 const {startLearnerSession,activateCloudLearner}=require('../src/lib/learnerProfiles.ts');const {createLearnerStorage}=require('../src/lib/learnerStorage.ts');const {clearSessionProfile}=require('../src/lib/sessionProfile.ts');
 function memory(){const data=new Map();return{get length(){return data.size;},key:i=>[...data.keys()][i]??null,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),clear:()=>data.clear()};}
 const device=memory(),session=memory(),storage=createLearnerStorage(device,session),local=startLearnerSession(device,session,'Mira',0);storage.setItem('englishcamp-progress','local progress');storage.setItem('englishcamp-notes','private local note');
 const a={id:'9dcc596d-095e-4343-b336-d76ab238b8c1',name:'Mira',number:12,fruit:'apple'},b={...a,id:'2f633f73-6597-4dd3-ac99-694f12fb4094',number:13};
 const linked=activateCloudLearner(device,session,a,true);assert.equal(linked.number,local.number);assert.equal(storage.getItem('englishcamp-progress'),'local progress');assert.equal(storage.getItem('englishcamp-notes'),'private local note');
 clearSessionProfile(session);startLearnerSession(device,session,'Mira',0);assert.equal(storage.getItem('englishcamp-progress'),null,'name-only access cannot open the cloud learner');
 activateCloudLearner(device,session,b);assert.equal(storage.getItem('englishcamp-progress'),null,'an equal display name is a separate account');
 session.clear();activateCloudLearner(device,session,a);assert.equal(storage.getItem('englishcamp-progress'),'local progress','the cloud cache survives closing the tab');
});
test('daily completion summaries follow the saved day and never contain answer choices',()=>{
 const first={dailySummary:{day:'2026-11-07',completed:true,score:3,total:5,xpEarned:30,answers:[0,1,2]}};
 const duplicate={dailySummary:{day:'2026-11-07',completed:true,score:5,total:5,xpEarned:50}};
 assert.equal(mergeProgress(first,duplicate).dailySummary.score,3);assert.ok(!JSON.stringify(cleanProgress(first).dailySummary).includes('answers'));
 const next={dailySummary:{day:'2026-11-08',completed:true,score:4,total:5,xpEarned:40}};assert.equal(mergeProgress(first,next).dailySummary.day,'2026-11-08');
});
