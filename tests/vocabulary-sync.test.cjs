require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {DatabaseSync}=require('node:sqlite');
const {learnerResponse}=require('../cloudflare/learners.ts');
const {mergeVocabulary,cleanVocabulary,sameVocabulary}=require('../src/lib/cloudVocabulary.ts');
const {cleanEvents,mergeProgress}=require('../src/lib/cloudProgress.ts');
const {skillLessonXp,SKILL_LESSON_MAX_XP}=require('../src/lib/comprehension.ts');
const word=(de,at,extra={})=>({de,en:'معنى',category:'general',notes:'',addedAt:'2026-11-01T10:00:00.000Z',updatedAt:at,timesReviewed:0,lastReview:null,mastery:0,...extra});
function fixture(){
 const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 function prepare(query){let values=[];return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return{meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};}
 const db={prepare,async batch(operations){sql.exec('BEGIN');try{const result=[];for(const op of operations)result.push(await op.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 const origin='https://camp.test',request=(path,method='GET',body,extra={})=>new Request(origin+path,{method,headers:{Origin:origin,...(body?{'Content-Type':'application/json'}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});
 async function create(){const r=await learnerResponse(request('/api/learners/create','POST',{name:'Word learner'}),{LEARNERS_DB:db});assert.equal(r.status,201);const d=await r.json();return{Cookie:r.headers.get('set-cookie').split(';')[0],'X-EnglishCamp-Learner':d.account.id};}
 const bank=(auth,vocabulary)=>learnerResponse(request('/api/learners/vocabulary',vocabulary?'PUT':'GET',vocabulary?{vocabulary}:undefined,auth),{LEARNERS_DB:db});
 return{sql,db,request,create,bank};
}

test('word bank merge keeps every device’s words, honours deletions and is order-independent',()=>{
 const phone={words:{apple:word('apple','2026-11-02T00:00:00.000Z'),river:word('river','2026-11-03T00:00:00.000Z',{mastery:2,timesReviewed:4})},removed:{}};
 const laptop={words:{river:word('river','2026-11-02T00:00:00.000Z',{timesReviewed:6}),house:word('house','2026-11-04T00:00:00.000Z')},removed:{apple:'2026-11-05T00:00:00.000Z'}};
 const a=mergeVocabulary(phone,laptop),b=mergeVocabulary(laptop,phone);
 assert.ok(sameVocabulary(a,b));assert.deepEqual(Object.keys(a.words).sort(),['house','river']);
 assert.equal(a.words.river.mastery,2,'newer edit wins');assert.equal(a.words.river.timesReviewed,6,'review count never goes down');
 assert.ok(a.removed.apple,'deletion is remembered');
 const readded=mergeVocabulary(a,{words:{apple:word('apple','2026-11-06T00:00:00.000Z')},removed:{}});
 assert.ok(readded.words.apple&&!readded.removed.apple,'saving a word again after deleting it brings it back');
 assert.ok(sameVocabulary(mergeVocabulary(a,a),a),'merge is idempotent');
 const dirty=cleanVocabulary({words:{'__proto__':word('x','2026-11-01T00:00:00.000Z'),ok:{de:'ok',addedAt:'2026-11-01',mastery:9,notes:'n'.repeat(5000)},bad:{en:'no headword'}}});
 assert.deepEqual(Object.keys(dirty.words),['ok']);assert.equal(dirty.words.ok.mastery,0);assert.equal(dirty.words.ok.notes.length,2000);
});

test('the word bank syncs between devices of one learner only and is deleted with the profile',async()=>{
 const f=fixture();try{const a=await f.create(),b=await f.create();
  let r=await f.bank(a,{words:{apple:word('apple','2026-11-02T00:00:00.000Z')},removed:{}});assert.equal(r.status,200);
  r=await f.bank(a,{words:{river:word('river','2026-11-03T00:00:00.000Z')},removed:{}});let d=await r.json();
  assert.deepEqual(Object.keys(d.vocabulary.words).sort(),['apple','river'],'a second device adds without overwriting');
  d=await(await f.bank(a,{words:{},removed:{apple:'2026-11-04T00:00:00.000Z'}})).json();assert.deepEqual(Object.keys(d.vocabulary.words),['river']);
  d=await(await f.bank(a)).json();assert.deepEqual(Object.keys(d.vocabulary.words),['river']);
  d=await(await f.bank(b)).json();assert.deepEqual(d.vocabulary,{words:{},removed:{}},'other learners never see it');
  assert.equal((await learnerResponse(f.request('/api/learners/vocabulary'),{LEARNERS_DB:f.db})).status,401);
  assert.equal((await learnerResponse(f.request('/api/learners/profile','DELETE',{confirm:'delete'},a),{LEARNERS_DB:f.db})).status,200);
  assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_vocabulary').get().n,0);
 }finally{f.sql.close();}
});

test('listening and reading lessons earn XP once and count in synced progress like other practice',()=>{
 assert.equal(skillLessonXp(4,4),SKILL_LESSON_MAX_XP);assert.equal(skillLessonXp(0,4),5);
 const at='2026-11-19T10:00:00.000Z',events=cleanEvents([{id:'e1',source:'listening:for-the-birds',kind:'exercise',at,xp:999},{id:'e2',source:'reading:a1-my-cat-mimi',kind:'exercise',at,xp:15}]);
 assert.deepEqual(events.map(e=>e.xp),[SKILL_LESSON_MAX_XP,15],'a client cannot claim more than one lesson reward');
 const merged=mergeProgress({xp:10,exercisesDone:{'listening:for-the-birds':true},events},{xp:5,exercisesDone:{'reading:a1-my-cat-mimi':true}});
 assert.ok(merged.exercisesDone['listening:for-the-birds']&&merged.exercisesDone['reading:a1-my-cat-mimi']);assert.equal(merged.events.length,2);
 const stats=fs.readFileSync('src/app/stats/page.tsx','utf8');assert.match(stats,/Listening lessons/i);assert.match(stats,/Reading passages/i);
});
