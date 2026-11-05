require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {PLACEMENT_QUESTIONS:Q,PLACEMENT_LEVELS:LEVELS}=require('../src/data/placement/questions.ts');
const {PLACEMENT_SPEAKING:S,PLACEMENT_LISTENING:L}=require('../src/data/placement/communication.ts');
const {SPEAKING_ASSESSMENT_VERSION:VERSION,SPEAKING_DIMENSIONS:D,validSpeakingAssessment,speakingBand}=require('../src/lib/speakingAssessment.ts');
const {validCommunication,speakingComplete}=require('../src/lib/placementCommunication.ts');
const {placementProfile,placementPriority,readPlacement,savePlacement,emptyPlacement}=require('../src/lib/placement.ts');
const {buildStudySessions,studyCalendar}=require('../src/lib/studyPlanner.ts');
const {encodeSpeakingWav}=require('../src/lib/speakingAudio.ts');
const {inspectSpeakingWav,assessSpeakingAudio}=require('../src/lib/speakingAssessmentServer.ts');
const {GET,POST}=require('../src/app/api/placement/speaking/route.ts');
const answers=()=>Object.fromEntries(Q.map(q=>[q.id,q.answer]));
const assessment=(task,score=3)=>({version:VERSION,provider:'OpenAI',model:'gpt-audio-1.5',assessedAt:'2026-11-04T10:00:00Z',taskId:task.id,audioHash:'a'.repeat(64),transcript:'I live in a small town and I walk to work every morning.',taskAchievement:3,dimensions:Object.fromEntries(D.map(k=>[k,{score,evidence:'A specific audible observation about the learner response.'}])),strengths:['The main message is clear.'],nextSteps:['Retell the same message with one extra reason.']});
const result=(communication)=>({id:'assessment-qa',version:'englishcamp-placement-v1',completedAt:'2026-11-04T10:00:00Z',answers:answers(),communication});
const communication=(score=3)=>({heard:L.map(q=>q.id),listening:Object.fromEntries(L.map(q=>[q.id,q.answer])),speaking:Object.fromEntries(S.map(t=>[t.id,{status:'assessed',recorded:true,assessment:assessment(t,score)}]))});
const waveform=(seconds=4,rate=16000)=>new Float32Array(rate*seconds).map((_,i)=>.2*Math.sin(2*Math.PI*240*i/rate));
const raw=(a)=>({outcome:'assessed',transcript:a.transcript,taskAchievement:a.taskAchievement,dimensions:a.dimensions,strengths:a.strengths,nextSteps:a.nextSteps});

test('assessments require a real task, audio fingerprint, rubric version and bounded evidence; self-reviews are not grades',()=>{
 const a=assessment(S[0]);assert.deepEqual(validSpeakingAssessment(a,S[0].id),a);assert.equal(validSpeakingAssessment(a,S[1].id),null);
 for(const change of [{audioHash:'wrong'},{version:'old'},{provider:'Other'},{transcript:''},{nextSteps:[]},{assessedAt:'invalid'},{taskAchievement:5}])assert.equal(validSpeakingAssessment({...a,...change},S[0].id),null);
 for(const score of [-1,7,NaN,2.5,'3'])assert.equal(validSpeakingAssessment({...a,dimensions:{...a.dimensions,fluency:{score,evidence:'A detail'}}},S[0].id),null);
 assert.equal(speakingBand(assessment(S[0],5),'A1'),1,'an introduction cannot establish C1');
 const c=communication();assert.ok(speakingComplete(validCommunication(c)));c.speaking[S[0].id]={status:'reviewed',recorded:true,ratings:{task:2,clarity:2,language:2}};assert.equal(speakingComplete(validCommunication(c)),false);
});

test('measured listening and speaking both change placement, while missing or self-rated skills never fabricate an overall level',()=>{
 const full=communication(5);assert.deepEqual([placementProfile(result(full)).language,placementProfile(result(full)).listening,placementProfile(result(full)).speaking,placementProfile(result(full)).level],['C1','C1','C1','C1']);
 assert.equal(placementPriority(result(full)),'grammar','fully successful speaking must not look weak because early tasks have a lower ceiling');
 const lowSpeak=communication(2),p=placementProfile(result(lowSpeak));assert.equal(p.speaking,'A2');assert.equal(p.level,'A2');assert.equal(p.priority,'speaking');assert.ok(p.complete);assert.ok(p.mixed);
 const lowListen=communication(5);for(const q of L)if(!['A1','A2'].includes(q.level))lowListen.listening[q.id]=-1;
 const lp=placementProfile(result(lowListen));assert.equal(lp.listening,'A2');assert.equal(lp.level,'A2');assert.equal(lp.priority,'listening');
 const both=communication(2);both.listening=lowListen.listening;const bp=placementProfile(result(both));assert.deepEqual([...bp.adaptation.priorities].sort(),['listening','speaking']);
 const legacy=communication();legacy.speaking=Object.fromEntries(S.map(t=>[t.id,{status:'reviewed',recorded:true,ratings:{task:2,clarity:2,language:2}}]));assert.equal(placementProfile(result(legacy)).speaking,null);assert.equal(placementProfile(result(legacy)).complete,false);
 const partial=communication();partial.listening=Object.fromEntries(L.slice(0,5).map(q=>[q.id,q.answer]));partial.speaking={[S[4].id]:partial.speaking[S[4].id]};const pp=placementProfile(result(partial));assert.equal(pp.listening,null);assert.equal(pp.speaking,null);assert.equal(pp.level,'C1');assert.equal(pp.complete,false);
 assert.equal(placementPriority({...result(),communication:undefined}),'grammar');
});

test('advanced speaking needs supported performance on two suitably demanding tasks, with no inflation from off-task or skipped responses',()=>{
 for(let band=1;band<=5;band++){const c=communication(band);assert.equal(placementProfile(result(c)).speaking,LEVELS[band-1]);}
 const c=communication(5);for(const t of S)c.speaking[t.id]={status:'skipped'};c.speaking[S[0].id]={status:'assessed',recorded:true,assessment:assessment(S[0],5)};c.speaking[S[4].id]={status:'assessed',recorded:true,assessment:assessment(S[4],5)};
 assert.equal(placementProfile(result(c)).speaking,'A2','one high-level performance plus an introduction is not enough for advanced placement');
 const off=communication(5);for(const t of S)off.speaking[t.id].assessment.taskAchievement=0;assert.equal(placementProfile(result(off)).speaking,'A1');assert.ok(placementProfile(result(off)).speakingFoundationReview);
 const uneven=assessment(S[4],5);uneven.dimensions.grammar.score=1;assert.equal(speakingBand(uneven,'C1'),2,'one weak dimension cannot be hidden by averaging');
});

test('the study timetable and calendar prioritise BOTH audio skills and retain stronger reading difficulty',()=>{
 const c=communication(2);for(const q of L)if(!['A1','A2'].includes(q.level))c.listening[q.id]=-1;
 const p=placementProfile(result(c)),schedule={id:'skill-plan-qa',updatedAt:'2026-11-04T10:00:00Z',startDate:'2026-11-04',time:'18:00',days:[0,1,2,3,4,5,6],minutes:25,goal:'everyday',startingLevel:p.level,weeks:4};
 const sessions=buildStudySessions(schedule,p.priority,p.adaptation),count=k=>sessions.filter(s=>s.resource.domain===k).length;
 assert.ok(count('listening')>count('reading'));assert.ok(count('speaking')>count('reading'));
 for(const s of sessions){assert.equal(s.level,['listening','speaking','writing'].includes(s.resource.domain)?'A2':'C1');assert.equal(s.parts.reduce((n,p)=>n+p.minutes,0),25);}
 const speaking=sessions.find(s=>s.resource.domain==='speaking');assert.ok(speaking.parts.some(p=>p.label.includes('key sounds')));
 const adjusted=buildStudySessions({...schedule,startingLevel:'A1'},p.priority,p.adaptation);assert.equal(adjusted.find(s=>s.resource.domain==='reading').level,'B2');assert.equal(adjusted.find(s=>s.resource.domain==='speaking').level,'A1');
 const ics=studyCalendar(schedule,'QA',p.priority,'https://camp.example',new Date(0),p.adaptation);assert.ok(ics.includes('A2 skill practice'));assert.ok(ics.includes('C1 skill practice'));assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,sessions.length);
});

test('new assessment records round-trip without altering legacy answers, identity records or earlier results',()=>{
 let value='';const storage={getItem:()=>value,setItem:(_,v)=>value=v},old=result();delete old.communication;
 const record={...emptyPlacement(),status:'complete',results:[old,result(communication())],studyDone:['skill-plan-qa-1']};savePlacement(storage,record);assert.deepEqual(readPlacement(storage),record);
 const bad=communication();bad.speaking[S[0].id].assessment.dimensions.grammar.score=99;const restored=validCommunication(bad);assert.equal(restored.speaking[S[0].id],undefined);
});

test('audio conversion is deterministic, mono PCM, size bounded and rejects silence, corruption and excessive duration',()=>{
 const bytes=encodeSpeakingWav([waveform(4,48000)],48000),info=inspectSpeakingWav(bytes,30);assert.equal(bytes.length,128044);assert.equal(info.seconds,4);assert.equal(info.audioHash.length,64);
 assert.throws(()=>inspectSpeakingWav(encodeSpeakingWav([new Float32Array(64000)],16000),30),/audible speech/);
 const bad=bytes.slice();bad[22]=2;assert.throws(()=>inspectSpeakingWav(bad,30),/could not be read/);
 assert.throws(()=>inspectSpeakingWav(bytes,0),/response window/);assert.throws(()=>encodeSpeakingWav([waveform(2)],16000),/three seconds/);assert.throws(()=>encodeSpeakingWav([waveform(124)],16000),/response limit/);
});

test('provider receives actual audio and fixed task text only, store:false, strict evidence parsing, and no fake fallback',async()=>{
 const prevKey=process.env.OPENAI_API_KEY,prevEnabled=process.env.ENGLISHCAMP_SPEAKING_ENABLED;process.env.OPENAI_API_KEY='test-not-a-real-secret';process.env.ENGLISHCAMP_SPEAKING_ENABLED='true';
 try{
  const bytes=encodeSpeakingWav([waveform()],16000);let calls=0;
  const provider=async(url,options)=>{calls++;assert.equal(url,'https://api.openai.com/v1/chat/completions');const body=JSON.parse(options.body);assert.equal(body.store,false);assert.deepEqual(body.modalities,['text']);assert.equal(body.messages[1].content[1].type,'input_audio');assert.equal(Buffer.from(body.messages[1].content[1].input_audio.data,'base64').length,bytes.length);assert.ok(!options.body.includes('learnerName'));return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(raw(assessment(S[0])))}}]});};
  const a=await assessSpeakingAudio(S[0].id,bytes,provider);assert.equal(calls,1);assert.equal(a.audioHash,inspectSpeakingWav(bytes,30).audioHash);
  for(const content of ['not json',JSON.stringify({...raw(assessment(S[0])),dimensions:{}}),JSON.stringify({outcome:'insufficient',reason:'Too little clear speech.'})])await assert.rejects(()=>assessSpeakingAudio(S[0].id,bytes,async()=>Response.json({choices:[{finish_reason:'stop',message:{content}}]})));
  await assert.rejects(()=>assessSpeakingAudio(S[0].id,bytes,async()=>new Response('',{status:429})),/quota/);
  await assert.rejects(()=>assessSpeakingAudio(S[0].id,bytes,async()=>{throw new Error('secret-provider-detail');}),e=>e.status===503&&!e.message.includes('secret'));
  process.env.ENGLISHCAMP_SPEAKING_ENABLED='false';await assert.rejects(()=>assessSpeakingAudio(S[0].id,bytes,provider),/not configured/);assert.equal(calls,1);
 }finally{if(prevKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=prevKey;if(prevEnabled===undefined)delete process.env.ENGLISHCAMP_SPEAKING_ENABLED;else process.env.ENGLISHCAMP_SPEAKING_ENABLED=prevEnabled;}
});

test('upload API enforces explicit consent, same origin, configuration and bounded multipart without contacting the provider',async()=>{
 const prevKey=process.env.OPENAI_API_KEY,prevEnabled=process.env.ENGLISHCAMP_SPEAKING_ENABLED;process.env.OPENAI_API_KEY='qa-disabled-provider';process.env.ENGLISHCAMP_SPEAKING_ENABLED='false';
 try{
  assert.equal((await (await GET()).json()).available,false);
  assert.equal((await POST(new Request('http://localhost:3030/api/placement/speaking',{method:'POST',headers:{origin:'https://elsewhere.example'}}))).status,403);
  assert.equal((await POST(new Request('http://localhost:3030/api/placement/speaking',{method:'POST',headers:{origin:'http://localhost:3030'}}))).status,503);
  process.env.ENGLISHCAMP_SPEAKING_ENABLED='true';assert.equal((await (await GET()).json()).available,true);
  const form=new FormData();form.set('taskId',S[0].id);form.set('audio',new Blob([new Uint8Array(12)],{type:'audio/wav'}),'response.wav');
  assert.equal((await POST(new Request('http://localhost:3030/api/placement/speaking',{method:'POST',headers:{origin:'http://localhost:3030'},body:form}))).status,403);
  const source=fs.readFileSync('src/components/placement/PlacementSpeaking.tsx','utf8');assert.ok(source.includes('!consent'));assert.ok(source.includes('assessment.audioHash !== hash'));assert.ok(source.includes('readSessionProfile(sessionStorage)?.number === owner'));assert.ok(source.includes('controller.current?.abort()'));assert.ok(!source.includes('SPEAKING_CRITERIA.map'));
 }finally{if(prevKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=prevKey;if(prevEnabled===undefined)delete process.env.ENGLISHCAMP_SPEAKING_ENABLED;else process.env.ENGLISHCAMP_SPEAKING_ENABLED=prevEnabled;}
});
