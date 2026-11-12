require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const {learnerResponse}=require('../cloudflare/learners.ts');
const {deviceLinkUrl,rememberDeviceLink,clearDeviceLink,DEVICE_LINK_TTL}=require('../src/lib/deviceLink.ts');
function fixture(){
 const sql=new DatabaseSync(':memory:');for(const file of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+file,'utf8'));
 function prepare(query){let values=[];return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return{meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};}
 const db={prepare,async batch(operations){sql.exec('BEGIN');try{const results=[];for(const op of operations)results.push(await op.run());sql.exec('COMMIT');return results;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 const origin='https://camp.test';async function call(path,method='POST',body={},auth={},extra={}){const response=await learnerResponse(new Request(origin+'/api/learners/'+path,{method,headers:{Origin:origin,'Content-Type':'application/json',...auth,...extra},...(method!=='GET'?{body:JSON.stringify(body)}:{})}),{LEARNERS_DB:db});return{response,status:response.status,data:await response.json()};}
 async function create(){const r=await call('create','POST',{name:'QR learner',progress:{xp:40},badges:{'first-lesson':{unlockedAt:'2026-11-12T10:00:00.000Z'}}});assert.equal(r.status,201);return{Cookie:r.response.headers.get('set-cookie').split(';')[0],'X-EnglishCamp-Learner':r.data.account.id};}
 return{sql,call,create};
}
test('private QR pairing restores progress, badges and notes through the existing authenticated profile',async()=>{
 const f=fixture();try{
  const owner=await f.create();assert.equal((await f.call('device-link')).status,401);
  await f.call('notes','PUT',{operations:[{id:crypto.randomUUID(),lessonId:'band1-toefl-intro',text:'An adverb describes an action. ملاحظة خاصة.',baseRevision:0}]},owner);
  const made=await f.call('device-link','POST',{},owner);assert.equal(made.status,201);const {token,expiresAt}=made.data;assert.equal(token.length,32);assert.ok(expiresAt>Math.floor(Date.now()/1000));assert.ok(expiresAt<=Math.floor(Date.now()/1000)+DEVICE_LINK_TTL);
  const stored=f.sql.prepare('SELECT * FROM cloud_device_links').get();assert.notEqual(stored.token_hash,token);assert.equal(stored.token_hash,crypto.createHash('sha256').update(token).digest('hex'));assert.ok(!JSON.stringify(stored).includes('EC1-'));
  const preview=await f.call('device-link/preview','POST',{token});assert.equal(preview.status,200);assert.equal(preview.data.name,'QR learner');assert.deepEqual(Object.keys(preview.data).sort(),['expiresAt','fruit','name']);
  assert.equal((await f.call('device-link/claim','POST',{token})).status,400);
  const claim=await f.call('device-link/claim','POST',{token,confirm:true});assert.equal(claim.status,200);assert.equal(claim.data.account.id,owner['X-EnglishCamp-Learner']);assert.equal(claim.data.snapshot.progress.xp,40);assert.ok(claim.data.snapshot.badges['first-lesson']);assert.match(claim.response.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/);assert.match(claim.response.headers.get('set-cookie'),/; Secure/);
  const target={Cookie:claim.response.headers.get('set-cookie').split(';')[0],'X-EnglishCamp-Learner':claim.data.account.id};
  const notes=await f.call('notes','GET',undefined,target);assert.equal(notes.status,200);assert.match(notes.data.notes['band1-toefl-intro'].text,/ملاحظة/);
  assert.equal((await f.call('device-link/claim','POST',{token,confirm:true})).status,410);assert.equal((await f.call('device-link/status','POST',{token},owner)).data.state,'connected');assert.equal((await f.call('progress','GET',undefined,owner)).status,200);
  await f.call('profile','DELETE',{confirm:'delete'},owner);assert.equal(f.sql.prepare('SELECT count(*) n FROM cloud_device_links').get().n,0);
 }finally{f.sql.close();}
});
test('device QR codes expire, can be cancelled, replace old codes and cannot be controlled by another learner',async()=>{
 const f=fixture();try{const a=await f.create(),b=await f.create();const first=(await f.call('device-link','POST',{},a)).data.token,second=(await f.call('device-link','POST',{},a)).data.token;assert.notEqual(first,second);assert.equal((await f.call('device-link/preview','POST',{token:first})).status,410);
  await f.call('device-link','DELETE',{token:second},b);assert.equal((await f.call('device-link/preview','POST',{token:second})).status,200);
  f.sql.prepare('UPDATE cloud_device_links SET expires_at=0 WHERE learner_id=?').run(a['X-EnglishCamp-Learner']);assert.equal((await f.call('device-link/claim','POST',{token:second,confirm:true})).status,410);
  const third=(await f.call('device-link','POST',{},a)).data.token;assert.equal((await f.call('device-link','DELETE',{token:third},a)).status,200);assert.equal((await f.call('device-link/preview','POST',{token:third})).status,410);
  assert.equal((await f.call('device-link','POST',{},a,{Origin:'https://other.test'})).status,403);assert.equal((await f.call('device-link','POST',{},a,{'X-EnglishCamp-Learner':b['X-EnglishCamp-Learner']})).status,409);
  assert.equal((await f.call('device-link/claim','POST',{token:'invalid',confirm:true})).status,400);
 }finally{f.sql.close();}
});
test('QR links keep credentials out of HTTP URLs and survive learner-scope remounts without persistent storage',()=>{
 const token='a'.repeat(32),url=new URL(deviceLinkUrl('https://camp.test',token));assert.equal(url.origin,'https://camp.test');assert.equal(url.pathname,'/connect-device');assert.equal(url.search,'');assert.equal(new URLSearchParams(url.hash.slice(1)).get('link'),token);assert.throws(()=>deviceLinkUrl('javascript:alert(1)',token));
 const replacements=[],history={replaceState:(...args)=>replacements.push(args)};assert.equal(rememberDeviceLink({hash:url.hash,pathname:url.pathname,search:''},history),token);assert.equal(replacements[0][2],'/connect-device');assert.equal(rememberDeviceLink({hash:'',pathname:url.pathname,search:''},history),token);clearDeviceLink();assert.equal(rememberDeviceLink({hash:'',pathname:url.pathname,search:''},history),'');
});
