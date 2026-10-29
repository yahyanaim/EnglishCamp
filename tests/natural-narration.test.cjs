require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const contract=require('./fixtures/natural-narration-contract.json');
const {courseActivities}=require('../src/data/course-activities.ts');
const {taskSignature}=require('../src/lib/activityState.ts');
const {CourseActivity}=require('../src/components/exercises/CourseActivity.tsx');
const root=path.join(__dirname,'..');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'public/media/courses/audio-manifest.json')));

test('all 99 narration replacements preserve their exact scripts, asset paths and speaker roles',()=>{
 assert.equal(manifest.length,99);
 assert.deepEqual(manifest.map(m=>[m.id,m.path]),contract.clips.map(m=>[m.id,m.path]));
 for(let i=0;i<manifest.length;i++){
  const m=manifest[i],old=contract.clips[i];
  assert.equal(hash(m.text),old.scriptSha256,m.id+' script');
  assert.equal(m.scriptSha256,old.scriptSha256,m.id+' provenance');
  assert.match(m.engine,/Microsoft neural TTS/);
  assert.ok(m.voice.split(' + ').every(v=>v.endsWith('Neural')),m.id+' voice');
  assert.deepEqual(Object.keys(m.speakers||{}),old.speakerRoles,m.id+' roles');
  if(old.speakerRoles.length>1)assert.equal(new Set(Object.values(m.speakers)).size,old.speakerRoles.length,m.id+' distinct speakers');
 }
});

test('neural WAVs are complete playable PCM with accurate duration and non-silent, unclipped samples',()=>{
 for(const m of manifest){
  const b=fs.readFileSync(path.join(root,m.path));
  assert.equal(hash(b),m.sha256,m.id+' checksum');
  assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
  assert.equal(b.readUInt32LE(4)+8,b.length,m.id+' complete RIFF');
  let fmt,data;
  for(let off=12;off+8<=b.length;){const size=b.readUInt32LE(off+4),end=off+8+size;assert.ok(end<=b.length,m.id+' chunk');const name=b.toString('ascii',off,off+4);if(name==='fmt ')fmt=b.subarray(off+8,end);if(name==='data')data=b.subarray(off+8,end);off=end+(size%2);}
  assert.ok(fmt&&data,m.id);assert.equal(fmt.readUInt16LE(0),1);assert.equal(fmt.readUInt16LE(2),1);assert.equal(fmt.readUInt32LE(4),24000);assert.equal(fmt.readUInt16LE(14),16);
  assert.ok(Math.abs(data.length/48000-m.durationSeconds)<.002,m.id+' duration');assert.ok(m.durationSeconds>1);
  let energy=0,clipped=0;for(let off=0;off<data.length;off+=2){const sample=data.readInt16LE(off);energy+=sample*sample;if(Math.abs(sample)>=32760)clipped++;}
  const frames=data.length/2;assert.ok(Math.sqrt(energy/frames)/32768>.005,m.id+' audible signal');assert.ok(clipped/frames<.001,m.id+' clipping');
 }
});

test('narration-only changes preserve all activity fingerprints and existing draft/recording keys',()=>{
 assert.deepEqual(Object.fromEntries(courseActivities.flatMap(a=>a.data.tasks.map(t=>[t.id,taskSignature(t)]))),contract.taskSignatures);
});

test('course player accurately discloses AI narration without displaying obsolete system-voice names',()=>{
 const a=courseActivities.find(a=>a.data.tasks[0].audio?.src==='/media/courses/course-audio-001.wav');assert.ok(a);
 const markup=renderToStaticMarkup(React.createElement(CourseActivity,{data:a.data,id:a.id,xpReward:a.xpReward,moduleId:a.lessonId,lessonXP:50}));
 assert.ok(markup.includes('Original AI-generated neural speech'));
 assert.ok(!markup.includes(a.data.tasks[0].audio.label));
 assert.ok(!markup.includes(a.data.tasks[0].audio.transcript));
});
