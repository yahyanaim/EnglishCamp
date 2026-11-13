require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const {learnerResponse}=require('../cloudflare/learners.ts');
const {coachResponse}=require('../cloudflare/coach.ts');
const {pronunciationResponse}=require('../cloudflare/pronunciation.ts');
const {COACH_CONSENT}=require('../src/lib/englishCoach.ts');
const {PRONUNCIATION_CONSENT,PRONUNCIATION_LINES,validPronunciationResult}=require('../src/lib/pronunciationAssessment.ts');
const {wavBase64}=require('../cloudflare/aiShared.ts');
const {encodeSpeakingWav}=require('../src/lib/speakingAudio.ts');
function fixture(){
 const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 function prepare(query){let values=[];return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return{meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};}
 const db={prepare,async batch(operations){sql.exec('BEGIN');try{const result=[];for(const op of operations)result.push(await op.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 const origin='https://camp.test';const request=(path,method='GET',body,extra={})=>new Request(origin+path,{method,headers:{Origin:origin,...(body?{'Content-Type':'application/json'}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});
 async function create(){const response=await learnerResponse(request('/api/learners/create','POST',{name:'QA learner'}),{LEARNERS_DB:db});assert.equal(response.status,201);const result=await response.json();return{Cookie:response.headers.get('set-cookie').split(';')[0],'X-EnglishCamp-Learner':result.account.id};}
 const notes=(auth,operations)=>learnerResponse(request('/api/learners/notes',operations?'PUT':'GET',operations?{operations}:undefined,auth),{LEARNERS_DB:db});
 return{sql,db,request,create,notes};
}
const op=(lessonId,text,baseRevision=0)=>({id:crypto.randomUUID(),lessonId,text,baseRevision});
test('lesson notes restore privately, remain isolated, and preserve concurrent device edits for explicit resolution',async()=>{
 const f=fixture();try{const a=await f.create(),b=await f.create(),first=op('band1-toefl-intro','My rule: زمن الماضي.');let r=await f.notes(a,[first]);assert.equal(r.status,200);let d=await r.json();assert.equal(d.notes[first.lessonId].text,first.text);assert.equal(d.notes[first.lessonId].revision,1);assert.deepEqual(d.acknowledged,[first.id]);
  d=await(await f.notes(b)).json();assert.deepEqual(d.notes,{});
  const deviceA=op(first.lessonId,'Device A revision',1),deviceB=op(first.lessonId,'Device B offline revision',1);await f.notes(a,[deviceA]);d=await(await f.notes(a,[deviceB])).json();assert.equal(d.notes[first.lessonId].text,deviceA.text);assert.equal(d.conflicts[first.lessonId].text,deviceA.text);assert.equal(d.conflicts[first.lessonId].revision,2);assert.deepEqual(d.acknowledged,[]);
  const chosen=op(first.lessonId,deviceB.text,2);d=await(await f.notes(a,[chosen])).json();assert.equal(d.notes[first.lessonId].text,deviceB.text);assert.equal(d.notes[first.lessonId].revision,3);
  // A delayed retry of a previously accepted operation cannot restore its old text.
  d=await(await f.notes(a,[first])).json();assert.equal(d.notes[first.lessonId].revision,3);assert.equal(d.notes[first.lessonId].text,deviceB.text);assert.ok(d.acknowledged.includes(first.id));
 }finally{f.sql.close();}
});
test('cleared notes use tombstones, invalid submissions are rejected, and deletion cascades only the authenticated notes',async()=>{
 const f=fixture();try{const a=await f.create(),b=await f.create();await f.notes(a,[op('lesson','A')]);await f.notes(b,[op('lesson','B')]);let d=await(await f.notes(a,[op('lesson','',1)])).json();assert.equal(d.notes.lesson.text,'');assert.equal(d.notes.lesson.revision,2);d=await(await f.notes(a,[op('lesson','old offline copy',1)])).json();assert.equal(d.notes.lesson.text,'');assert.ok(d.conflicts.lesson);
  assert.equal((await f.notes(a,[op('lesson','x'.repeat(12001))])).status,400);assert.equal((await f.notes(a,Array.from({length:5},()=>op('test','x')))).status,400);
  assert.equal((await learnerResponse(f.request('/api/learners/notes','GET'),{LEARNERS_DB:f.db})).status,401);
  assert.equal((await learnerResponse(f.request('/api/learners/profile','DELETE',{confirm:'delete'},a),{LEARNERS_DB:f.db})).status,200);assert.equal(f.sql.prepare('SELECT COUNT(*) n FROM cloud_notes').get().n,1);assert.equal((await(await f.notes(b)).json()).notes.lesson.text,'B');
 }finally{f.sql.close();}
});
test('Gemini gets only selected conversation text, keeps its key on the server, and validates output',async()=>{
 const f=fixture();try{let calls=0;const request=f.request('/api/coach','POST',{adult:true,consent:COACH_CONSENT,situation:'cafe',level:'A2',history:[],message:'Yesterday I go to the cafe.',notes:'PRIVATE NOTE',name:'PRIVATE NAME',progress:{xp:999}});
  const response=await coachResponse(request,{LEARNERS_DB:f.db,GEMINI_API_KEY:'private-test-key'},async(url,options)=>{calls++;assert.match(url,/gemini-3.5-flash-lite:generateContent$/);assert.ok(!url.includes('private-test-key'));assert.equal(options.headers['x-goog-api-key'],'private-test-key');assert.ok(!options.body.includes('PRIVATE'));const payload=JSON.parse(options.body);assert.equal(payload.contents.at(-1).parts[0].text,'Yesterday I go to the cafe.');assert.ok(!payload.tools);return Response.json({candidates:[{content:{parts:[{text:JSON.stringify({reply:'What did you order?',correction:'Use went for a finished action yesterday.',natural:'Yesterday I went to the café.',transcript:null})}]}}]});});
  assert.equal(response.status,200);assert.equal(calls,1);assert.ok(!(await response.text()).includes('private-test-key'));
  const bad=await coachResponse(f.request('/api/coach','POST',{adult:true,consent:COACH_CONSENT,situation:'cafe',level:'A2',history:[],message:'Hello'}),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'},async()=>Response.json({candidates:[{content:{parts:[{text:'not JSON'}]}}]}));assert.equal(bad.status,502);
 }finally{f.sql.close();}
});
test('coach configuration, consent, origin, quota and provider failures never fabricate replies or expose provider details',async()=>{
 const f=fixture(),payload={adult:true,consent:COACH_CONSENT,situation:'cafe',level:'A2',history:[],message:'Hello'};try{
  assert.equal((await coachResponse(f.request('/api/coach','POST',payload),{LEARNERS_DB:f.db})).status,503);
  assert.equal((await coachResponse(f.request('/api/coach','POST',{...payload,adult:false}),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'})).status,403);
  assert.equal((await coachResponse(f.request('/api/coach','POST',payload,{Origin:'https://other.test'}),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'})).status,403);
  for(let i=0;i<5;i++){const r=await coachResponse(f.request('/api/coach','POST',payload),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'},async()=>new Response('SECRET provider error',{status:429}));assert.equal(r.status,429);assert.ok(!(await r.text()).includes('SECRET'));}
  let called=false;const r=await coachResponse(f.request('/api/coach','POST',payload),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'},async()=>{called=true;return Response.json({});});assert.equal(r.status,429);assert.equal(called,false);
 }finally{f.sql.close();}
});
test('a busy Gemini model uses one documented free-tier fallback, while quota rejection never triggers another model',async()=>{
 const f=fixture(),payload={adult:true,consent:COACH_CONSENT,situation:'work',level:'B1',history:[],message:'Hello, I am your new colleague.'};try{let calls=0;const response=await coachResponse(f.request('/api/coach','POST',payload),{LEARNERS_DB:f.db,GEMINI_API_KEY:'test'},async(url)=>{calls++;if(calls===1)return new Response('busy',{status:503});assert.match(String(url),/gemini-3.7-flash:generateContent$/);return Response.json({candidates:[{content:{parts:[{text:JSON.stringify({reply:'Welcome! What will you work on?',correction:null,natural:null,transcript:null})}]}}]});});assert.equal(response.status,200);assert.equal(calls,2);
 }finally{f.sql.close();}
});
function recording(){const samples=Float32Array.from({length:16000*3},(_,i)=>.1*Math.sin(i/8));const bytes=encodeSpeakingWav([samples],16000);return{bytes,audio:Buffer.from(bytes).toString('base64'),hash:crypto.createHash('sha256').update(bytes).digest('hex')};}
test('edge audio validation rejects malformed and overlong media without decoding whole recordings',()=>{
 const {bytes,audio}=recording();assert.equal(wavBase64(audio),true);assert.equal(wavBase64('not audio'),false);const bad=bytes.slice();bad[22]=2;assert.equal(wavBase64(Buffer.from(bad).toString('base64')),false);assert.equal(wavBase64(audio.slice(0,-4)),false);
});
test('OpenPronounce sends only the canonical line and selected audio to the private service and binds feedback to that take',async()=>{
 const f=fixture(),{audio,hash}=recording(),reference={kind:'practice',id:PRONUNCIATION_LINES[0].id};try{
  const env={LEARNERS_DB:f.db,OPENPRONOUNCE_URL:'https://pronunciation.test/pronunciation',OPENPRONOUNCE_TOKEN:'private-service-token'},payload={reference,audio,audioHash:hash,consent:PRONUNCIATION_CONSENT,notes:'PRIVATE'};
  const result={version:PRONUNCIATION_CONSENT,score:74.5,transcript:'HELLO IT IS NICE TO MEET YOU',errors:[],audioHash:hash};
  let r=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),env,async(url,options)=>{assert.equal(String(url),env.OPENPRONOUNCE_URL);assert.equal(options.headers.Authorization,'Bearer private-service-token');const sent=JSON.parse(options.body);assert.deepEqual(Object.keys(sent).sort(),['audio','expected_text','lang']);assert.equal(sent.expected_text,PRONUNCIATION_LINES[0].text);assert.equal(sent.audio,audio);return Response.json(result);});assert.equal(r.status,200);assert.equal((await r.json()).result.score,74.5);
  r=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),env,async()=>Response.json({...result,audioHash:'0'.repeat(64)}));assert.equal(r.status,502);
  assert.equal((await pronunciationResponse(f.request('/api/pronunciation','POST',payload),{LEARNERS_DB:f.db})).status,503);
  assert.equal(validPronunciationResult({...result,errors:[{position:99,word:'invented',expected:'x',actual:'y',confidence:1,phones:[]}]},PRONUNCIATION_LINES[0].text),false);
 }finally{f.sql.close();}
});
test('Modal pronunciation stays unavailable with incomplete edge credentials and never sends them to another host',async()=>{
 const f=fixture(),{audio,hash}=recording(),payload={reference:{kind:'practice',id:PRONUNCIATION_LINES[0].id},audio,audioHash:hash,consent:PRONUNCIATION_CONSENT};
 const base={LEARNERS_DB:f.db,OPENPRONOUNCE_URL:'https://camp--pronunciation.modal.run/pronunciation',OPENPRONOUNCE_TOKEN:'adapter-token'};
 try{for(const extra of [{},{OPENPRONOUNCE_MODAL_KEY:'private-proxy-key'},{OPENPRONOUNCE_MODAL_SECRET:'private-proxy-secret'},{OPENPRONOUNCE_URL:'https://other.test/pronunciation',OPENPRONOUNCE_MODAL_KEY:'private-proxy-key',OPENPRONOUNCE_MODAL_SECRET:'private-proxy-secret'}]){
  const env={...base,...extra};let forwarded=false;
  const status=await pronunciationResponse(f.request('/api/pronunciation'),env);assert.equal((await status.json()).available,false);
  const response=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),env,async()=>{forwarded=true;return Response.json({});});assert.equal(response.status,503);assert.equal(forwarded,false);assert.ok(!(await response.text()).includes('private-proxy'));
 }}finally{f.sql.close();}
});
test('Modal receives private edge headers only after consent; its errors and credentials stay off the client',async()=>{
 const f=fixture(),{audio,hash}=recording(),payload={reference:{kind:'practice',id:PRONUNCIATION_LINES[0].id},audio,audioHash:hash,consent:PRONUNCIATION_CONSENT};
 const env={LEARNERS_DB:f.db,OPENPRONOUNCE_URL:'https://camp--pronunciation.modal.run/pronunciation',OPENPRONOUNCE_TOKEN:'adapter-token',OPENPRONOUNCE_MODAL_KEY:'private-proxy-key',OPENPRONOUNCE_MODAL_SECRET:'private-proxy-secret'};
 try{let forwarded=false;
  const unapproved=await pronunciationResponse(f.request('/api/pronunciation','POST',{...payload,consent:false}),env,async()=>{forwarded=true;return Response.json({});});assert.equal(unapproved.status,403);assert.equal(forwarded,false);
  const response=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),env,async(url,options)=>{forwarded=true;assert.equal(options.redirect,'error');assert.equal(options.headers.Authorization,'Bearer adapter-token');assert.equal(options.headers['Modal-Key'],'private-proxy-key');assert.equal(options.headers['Modal-Secret'],'private-proxy-secret');assert.ok(!options.body.includes('private-proxy'));return Response.json({version:PRONUNCIATION_CONSENT,score:80,transcript:'HELLO IT IS NICE TO MEET YOU',errors:[],audioHash:hash});});assert.equal(response.status,200);assert.equal(forwarded,true);assert.ok(!(await response.text()).includes('private-proxy'));
  const denied=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),env,async()=>new Response('private-proxy-secret upstream details',{status:401}));assert.equal(denied.status,502);assert.ok(!(await denied.text()).includes('private-proxy'));
 }finally{f.sql.close();}
});
test('unassessable speech gets a retry instruction without exposing engine details or inventing a score',async()=>{
 const f=fixture(),{audio,hash}=recording(),payload={reference:{kind:'practice',id:PRONUNCIATION_LINES[0].id},audio,audioHash:hash,consent:PRONUNCIATION_CONSENT};
 try{const response=await pronunciationResponse(f.request('/api/pronunciation','POST',payload),{LEARNERS_DB:f.db,OPENPRONOUNCE_URL:'https://pronunciation.test/pronunciation',OPENPRONOUNCE_TOKEN:'private-token'},async()=>new Response('PRIVATE engine detail',{status:422}));
  assert.equal(response.status,422);const body=await response.json();assert.match(body.error,/Record the displayed line again/);assert.ok(!JSON.stringify(body).includes('PRIVATE'));assert.equal(body.result,undefined);
 }finally{f.sql.close();}
});
