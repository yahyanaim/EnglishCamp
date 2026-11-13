require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {speechResponse,isFixedSpeech,neuralVoice}=require('../cloudflare/speech.ts');
const worker=require('../cloudflare/worker.ts').default;
const fixed=require('../src/data/speech-catalogue.json')[0];
const origin='https://camp.example';
const speech=(value,headers={})=>new Request(origin+'/api/speech',{method:'POST',headers:{origin,'content-type':'application/json',...headers},body:typeof value==='string'?value:JSON.stringify(value)});
const configured={AZURE_SPEECH_KEY:'mock-key-only',AZURE_SPEECH_REGION:'westeurope'};

test('Cloudflare keeps old URLs and locale bookmarks connected to English pages with queries intact',async()=>{
 const routes=(await import('../src/lib/english-routes.mjs')).default;
 const env={ASSETS:{fetch:async()=>new Response('asset')}};
 for(const [old,english] of Object.entries(routes))for(const prefix of ['','/en','/ar']){
  const response=await worker.fetch(new Request(`${origin}${prefix}/${old}?mode=review`),env);
  assert.equal(response.status,308);assert.equal(response.headers.get('location'),`${origin}/${english}?mode=review`);
 }
 assert.equal((await worker.fetch(new Request(origin+'/en/grammar'),env)).headers.get('location'),origin+'/grammar');
 assert.equal((await worker.fetch(new Request(origin+'/reading?topic=1'),env)).headers.get('location'),origin+'/vocabulary?topic=1');
 assert.equal(await (await worker.fetch(new Request(origin+'/grammar'),env)).text(),'asset');
 assert.equal((await worker.fetch(new Request(origin+'/api/unknown'),env)).status,404);
 assert.equal((await worker.fetch(new Request(origin+'/api/speech'),env)).status,405);
 assert.equal((await worker.fetch(new Request(origin+'/grammar',{method:'POST'}),env)).status,405);
 const missing=await worker.fetch(new Request(origin+'/unknown'),{ASSETS:{fetch:async request=>new URL(request.url).pathname==='/404.html'?new Response('custom missing'):new Response('missing',{status:404})}});
 assert.equal(missing.status,404);assert.equal(await missing.text(),'custom missing');
});

test('free deployment leaves paid assessment disabled and preserves the assessment origin gate',async()=>{
 const enabled=process.env.ENGLISHCAMP_SPEAKING_ENABLED;process.env.ENGLISHCAMP_SPEAKING_ENABLED='false';
 try{
  for(const skill of ['speaking','writing']){
   const url=origin+'/api/placement/'+skill;
   assert.equal((await (await worker.fetch(new Request(url),{})).json()).available,false);
   assert.equal((await worker.fetch(new Request(url,{method:'POST',headers:{origin:'https://other.example'}}),{})).status,403);
   assert.equal((await worker.fetch(new Request(url,{method:'POST',headers:{origin}}),{})).status,503);
  }
 }finally{if(enabled===undefined)delete process.env.ENGLISHCAMP_SPEAKING_ENABLED;else process.env.ENGLISHCAMP_SPEAKING_ENABLED=enabled;}
});

test('cloud speech rejects unapproved personal text, malformed data, cross-origin requests and oversized bodies before contacting Microsoft',async()=>{
 let calls=0;const provider=async()=>{calls++;throw Error('must not call');};
 assert.ok(isFixedSpeech(fixed));assert.equal(neuralVoice('Hello'),'en-GB-SoniaNeural');assert.equal(neuralVoice('مرحبا'),'ar-SA-ZariyahNeural');
 for(const [request,status] of [
  [speech({text:'a private text never listed in any lesson 987654321'}),403],
  [speech('{bad'),400],[speech({text:12}),400],[speech({text:''}),400],
  [speech({text:'x'.repeat(12001)}),400],[speech('x'.repeat(25001)),413],
  [speech({text:fixed},{origin:'https://other.example'}),403],
  [speech({text:fixed},{'content-type':'text/plain'}),415],
 ])assert.equal((await speechResponse(request,configured,provider)).status,status);
 assert.equal(calls,0);
 const response=await speechResponse(speech({text:fixed}),{},provider);
 assert.equal(response.status,503);assert.match((await response.json()).error,/Bundled lesson recordings/);assert.equal(calls,0);
});

test('cloud speech sends escaped SSML to the fixed Microsoft region and returns only bounded MP3 audio',async()=>{
 let calls=0;const provider=async(url,options)=>{
  calls++;assert.equal(url,'https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1');
  assert.equal(options.headers['Ocp-Apim-Subscription-Key'],'mock-key-only');
  assert.match(options.body,/en-GB-SoniaNeural/);assert.match(options.body,/&lt;voice&gt;Tom &amp; Ana&apos;s/);
  assert.ok(options.signal);return new Response(new Uint8Array(1300));
 };
 const response=await speechResponse(speech({text:"<voice>Tom & Ana's",approvedPersonal:true}),configured,provider);
 assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'audio/mpeg');
 assert.equal(response.headers.get('cache-control'),'private, max-age=604800');assert.equal((await response.arrayBuffer()).byteLength,1300);assert.equal(calls,1);
 const short=await speechResponse(speech({text:fixed}),configured,async()=>new Response(new Uint8Array(100)));
 assert.equal(short.status,503);
 let cancelled=false,count=0;
 const large=new ReadableStream({pull(controller){count++;controller.enqueue(new Uint8Array(1024*1024));},cancel(){cancelled=true;}});
 assert.equal((await speechResponse(speech({text:fixed}),configured,async()=>new Response(large))).status,503);assert.ok(cancelled);assert.ok(count<20);
 const failure=await speechResponse(speech({text:fixed}),configured,async()=>new Response('private-provider-error',{status:429}));
 assert.equal(failure.status,429);assert.ok(!(await failure.text()).includes('private-provider-error'));
 assert.equal((await speechResponse(speech({text:fixed}),{...configured,AZURE_SPEECH_REGION:'example.com/evil'},provider)).status,503);
 assert.equal(calls,1);
});

test('the local Next.js route uses the same official Microsoft adapter and never sends the key to the browser',async()=>{
 const {POST}=require('../src/app/api/speech/route.ts');
 const oldKey=process.env.AZURE_SPEECH_KEY,oldRegion=process.env.AZURE_SPEECH_REGION,oldFetch=global.fetch;
 process.env.AZURE_SPEECH_KEY='mock-private-key';process.env.AZURE_SPEECH_REGION='westeurope';
 let calls=0;
 global.fetch=async(url,options)=>{
  calls++;assert.equal(url,'https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1');
  assert.equal(options.headers['Ocp-Apim-Subscription-Key'],'mock-private-key');
  assert.match(options.body,/ar-SA-ZariyahNeural/);return new Response(new Uint8Array(1300));
 };
 try{
  const response=await POST(speech({text:'مرحبا',approvedPersonal:true}));
  assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'audio/mpeg');assert.equal(calls,1);
  assert.ok(![...response.headers.values()].join(' ').includes('mock-private-key'));await response.arrayBuffer();
  delete process.env.AZURE_SPEECH_KEY;
  const unavailable=await POST(speech({text:fixed}));assert.equal(unavailable.status,503);assert.equal(calls,1);
  assert.match((await unavailable.json()).error,/not been configured/);
 }finally{
  global.fetch=oldFetch;
  if(oldKey===undefined)delete process.env.AZURE_SPEECH_KEY;else process.env.AZURE_SPEECH_KEY=oldKey;
  if(oldRegion===undefined)delete process.env.AZURE_SPEECH_REGION;else process.env.AZURE_SPEECH_REGION=oldRegion;
 }
});

test('Cloudflare build source cannot copy local secrets or deploy the Python/Next server; content and UI are exported unchanged',()=>{
 const script=fs.readFileSync('scripts/build-cloudflare.cjs','utf8'),config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
 assert.match(script,/output:'export'/);assert.match(script,/QuizPage params=\{params\}/);assert.ok(!script.includes('QuizPage {...props}'));
 assert.deepEqual(config.assets.run_worker_first,['/api/*','/reading','/reading/','/en','/en/*','/ar','/ar/*']);
 assert.equal(config.vars.ENGLISHCAMP_SPEAKING_ENABLED,'false');assert.equal(config.observability.enabled,false);
 assert.ok(config.compatibility_flags.includes('enable_request_signal'),'incoming client cancellation must be enabled for pronunciation uploads');
 assert.equal(config.assets.not_found_handling,'none','legacy URLs must reach the redirect Worker before a static 404 fallback');
 for(const binding of ['containers','r2_buckets','kv_namespaces','durable_objects'])assert.equal(config[binding],undefined);
 assert.equal(config.d1_databases.length,1);
 assert.equal(config.d1_databases[0].binding,'LEARNERS_DB');
 assert.equal(config.d1_databases[0].database_name,'englishcamp-learners');
 assert.match(config.d1_databases[0].database_id,/^[a-f0-9-]{36}$/);
 assert.equal(config.d1_databases[0].migrations_dir,'migrations');
 assert.ok(!fs.readFileSync('cloudflare/worker.ts','utf8').includes('next/server'));
 assert.ok(!fs.readFileSync('cloudflare/speech.ts','utf8').includes('child_process'));
});

test('completed static export covers every real lesson and exercise and keeps invalid course routes as 404s',{skip:!fs.existsSync('.cloudflare-build/manifest.json')},()=>{
 const {courseCatalogue}=require('../src/data/course-catalogue.ts'),out='.cloudflare-build/app/out',manifest=require('../.cloudflare-build/manifest.json');
 assert.equal(manifest.courses,4);assert.equal(manifest.lessonPages,100);assert.equal(manifest.exercisePages,100);
 assert.ok(manifest.staticFiles<=20000);assert.ok(manifest.largestAssetBytes<=25*1024*1024);
 for(const course of courseCatalogue){
  assert.ok(fs.existsSync(path.join(out,`levels/${course.id}.html`)));assert.ok(fs.existsSync(path.join(out,`quiz/${course.id}.html`)));
  for(const lesson of course.lessons){assert.ok(fs.existsSync(path.join(out,`levels/${course.id}/lessons/${lesson.id}.html`)));assert.ok(fs.existsSync(path.join(out,`exercises/${lesson.id}.html`)));}
 }
 assert.ok(fs.existsSync(path.join(out,'verb-conjugation.html')));assert.ok(!fs.existsSync(path.join(out,'conjugaise.html')));
 for(const local of ['.env.local','.dev.vars','api'])assert.ok(!fs.existsSync(path.join(out,local)));
 assert.ok(fs.existsSync(path.join(out,'404.html')));assert.ok(!fs.existsSync(path.join(out,'levels/invalid.html')));
});
