require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{DatabaseSync}=require('node:sqlite');
const {playableAudioSrc}=require('../src/lib/audioSource.ts');
const {membership,membershipAllowed}=require('../cloudflare/membership.ts');
const {gatedCacheControl}=require('../cloudflare/cachePolicy.ts');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const masters=['public/media/courses','public/media/mock-exams'].flatMap(d=>walk(path.join(root,d))).filter(f=>f.endsWith('.wav'));

function wavSeconds(b){
 for(let off=12;off+8<=b.length;){const size=b.readUInt32LE(off+4);if(b.toString('ascii',off,off+4)==='data'){const fmt=b.indexOf('fmt ');return size/b.readUInt32LE(fmt+16);}off+=8+size+(size%2);}
 throw new Error('no data chunk');
}

test('F02: every course and mock-exam WAV master has a compact MP3 copy of the same length',()=>{
 assert.equal(masters.length,180);
 let wavBytes=0,mp3Bytes=0;
 for(const wav of masters){
  const mp3=wav.slice(0,-4)+'.mp3',w=fs.readFileSync(wav),m=fs.readFileSync(mp3);
  wavBytes+=w.length;mp3Bytes+=m.length;
  const sync=m.toString('ascii',0,3)==='ID3'||(m[0]===0xff&&(m[1]&0xe0)===0xe0);assert.ok(sync,path.basename(mp3)+' is MPEG audio');
  const seconds=wavSeconds(w),estimate=m.length*8/48000;
  assert.ok(Math.abs(estimate-seconds)<0.35,`${path.basename(mp3)} ${estimate.toFixed(2)}s vs ${seconds.toFixed(2)}s`);
 }
 assert.ok(mp3Bytes*5<wavBytes,'learners download at least 5x less audio');
});

test('F02: players request the MP3 copy and the build ships no WAV master that has one',()=>{
 assert.equal(playableAudioSrc('/media/courses/course-audio-001.wav'),'/media/courses/course-audio-001.mp3');
 assert.equal(playableAudioSrc('/media/mock-exams/v2/x-1.wav'),'/media/mock-exams/v2/x-1.mp3');
 assert.equal(playableAudioSrc('/media/practice-audio/a.mp3'),'/media/practice-audio/a.mp3');
 assert.equal(playableAudioSrc('blob:https://camp.test/1'),'blob:https://camp.test/1');
 assert.equal(playableAudioSrc(undefined),undefined);
 const sources=[read('src/data/course-activities.ts'),read('src/data/mock-exam-audio.ts'),read('src/data/speech-catalogue.json')].join('\n').match(/\/media\/(?:courses|mock-exams)\/[\w./-]+\.wav/g);
 assert.ok(sources.length>=100);
 for(const src of new Set(sources))assert.ok(fs.existsSync(path.join(root,'public',playableAudioSrc(src))),src);
 assert.match(read('src/components/exercises/CourseActivity.tsx'),/src=\{playableAudioSrc\(task\.audio\.src\)\}/);
 assert.match(read('src/components/mock-exam/ExamAudio.tsx'),/src=\{playableAudioSrc\(src\)\}/);
 assert.match(read('src/lib/naturalSpeech.ts'),/new Audio\(playableAudioSrc\(src\)\)/);
 assert.match(read('scripts/build-cloudflare.cjs'),/endsWith\('\.wav'\)[\s\S]*\.mp3'\)[\s\S]*fs\.rm\(file\)/);
});

test('F06: signed-in browsers may reuse gated files but never share them or cache pages',()=>{
 assert.equal(gatedCacheControl('/media/courses/course-audio-001.mp3'),'private, max-age=86400');
 assert.equal(gatedCacheControl('/_next/static/chunks/app.js'),'private, max-age=31536000, immutable');
 for(const page of ['/dashboard','/levels/a1/lessons/x','/admin/content','/index.txt'])assert.equal(gatedCacheControl(page),'no-store, private');
});

test('F06: the one-query access check agrees with the full membership record',async()=>{
 const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 let queries=0;const db={prepare(q){queries++;let v=[];return{bind(...a){v=a;return this},async first(){return sql.prepare(q).get(...v)||null}}}};
 const on={BILLING_ENABLED:'true',PAYPAL_ENV:'sandbox',PAYPAL_PLAN_ID:'P-TEST',PAYPAL_CLIENT_ID:'id',PAYPAL_CLIENT_SECRET:'secret',PAYPAL_WEBHOOK_ID:'hook'},off={BILLING_ENABLED:'false'};
 const now=Math.floor(Date.now()/1000);
 const learner=(id,mode,trial)=>{sql.prepare("INSERT INTO cloud_learners(id,name,fruit,recovery_hash,created_at) VALUES(?,?,?,?,unixepoch())").run(id,'Synthetic '+id,'apple','h-'+id);if(mode)sql.prepare('INSERT INTO cloud_memberships(learner_id,mode,trial_until,created_at) VALUES(?,?,?,unixepoch())').run(id,mode,trial);};
 learner('legacy','legacy',null);learner('none',null,null);learner('trial','trial',now+3600);learner('expired','trial',now-3600);learner('paid','trial',now-3600);learner('refunded','trial',now-3600);
 sql.prepare("INSERT INTO cloud_subscriptions(id,learner_id,plan_id,status,created_at) VALUES('I-PAID','paid','P-TEST','ACTIVE',unixepoch()),('I-REF','refunded','P-TEST','ACTIVE',unixepoch())").run();
 sql.prepare("INSERT INTO cloud_subscription_payments(id,subscription_id,state,paid_until) VALUES('S1','I-PAID','paid',?),('S2','I-REF','paid',?)").run(now+86400,now+86400);
 sql.prepare("INSERT INTO cloud_billing_reversals(sale_id,state) VALUES('S2','refunded')").run();
 const expected={legacy:true,none:true,trial:true,expired:false,paid:true,refunded:false};
 for(const[id,allowed]of Object.entries(expected)){
  assert.equal((await membership(db,id,on)).allowed,allowed,id+' full record');
  queries=0;assert.equal(await membershipAllowed(db,id,on),allowed,id);assert.equal(queries,1,id+' uses one query');
  queries=0;assert.equal(await membershipAllowed(db,id,off),true);assert.equal(queries,0,'no query while billing is off');
 }
 assert.match(read('cloudflare/access.ts'),/await membershipAllowed\(env\.LEARNERS_DB,learner,env\)/);
});

test('F11: heavy data loads on demand instead of inside the Reading, Listening and Search bundles',()=>{
 assert.ok(!/from "@\/data\/vocabulary-5000"/.test(read('src/lib/vocabularyLookup.ts').replace(/import type[^\n]+\n/g,'')));
 assert.match(read('src/lib/vocabularyLookup.ts'),/import\("@\/data\/vocabulary-5000"\)/);
 assert.match(read('src/components/learn/ReadingLessonView.tsx'),/loadVocabularyBank\(\)/);
 const listening=read('src/components/learn/ListeningSection.tsx');
 assert.ok(!listening.includes('@/data/reading-lessons'));
 assert.ok(!/import \{[^}]*READING_LESSONS/.test(read('src/lib/learningContent.ts')));
 const search=read('src/app/search/page.tsx');
 assert.match(search,/import type \{ levels as Levels \} from "@\/data\/content"/);
 assert.match(search,/import\("@\/data\/content"\), import\("@\/data\/searchIndex"\)/);
});
