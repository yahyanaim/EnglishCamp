require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {DatabaseSync}=require('node:sqlite');
const {aiQuota,aiAllowance,aiRefund,learnerDailyLimit}=require('../cloudflare/aiShared.ts');
function db(){const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 return{sql,prepare(query){let values=[];return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return{meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};}};}
const req=(ip)=>new Request('https://camp.test/api/coach',{headers:{'CF-Connecting-IP':ip}});

test('per-learner daily limits are configurable and bounded',()=>{
 assert.equal(learnerDailyLimit('pronunciation'),1);assert.equal(learnerDailyLimit('coach'),20);
 assert.equal(learnerDailyLimit('coach',{AI_COACH_DAILY_PER_LEARNER:'8'}),8);
 assert.equal(learnerDailyLimit('pronunciation',{AI_PRONUNCIATION_DAILY_PER_LEARNER:'3'}),3);
 for(const bad of ['0','-1','1000','abc','2.5'])assert.equal(learnerDailyLimit('coach',{AI_COACH_DAILY_PER_LEARNER:bad}),20);
});

test('each learner has a separate daily allowance that follows them across IP addresses',async()=>{
 const d=db(),env={AI_COACH_DAILY_PER_LEARNER:'3'};
 for(let i=0;i<3;i++)await aiQuota(req('192.0.2.'+(i+1)),d,'coach','learner-a',env);
 await assert.rejects(aiQuota(req('198.51.100.9'),d,'coach','learner-a',env),/today’s 3 coach messages/);
 assert.deepEqual((({limit,used,remaining})=>({limit,used,remaining}))(await aiAllowance(d,'coach','learner-a',env)),{limit:3,used:3,remaining:0});
 await aiQuota(req('203.0.113.5'),d,'coach','learner-b',env);
 assert.equal((await aiAllowance(d,'coach','learner-b',env)).remaining,2);
 d.sql.close();
});

test('reading the allowance never consumes it, and a refund restores one use',async()=>{
 const d=db();const before=await aiAllowance(d,'pronunciation','learner-c');assert.equal(before.remaining,1);
 assert.equal((await aiAllowance(d,'pronunciation','learner-c')).remaining,1);
 const bucket=await aiQuota(req('192.0.2.50'),d,'pronunciation','learner-c');
 assert.equal((await aiAllowance(d,'pronunciation','learner-c')).remaining,0);
 await aiRefund(d,bucket);assert.equal((await aiAllowance(d,'pronunciation','learner-c')).remaining,1);
 d.sql.close();
});
