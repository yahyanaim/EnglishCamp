require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {PLACEMENT_QUESTIONS:Q,PLACEMENT_LEVELS,PLACEMENT_VERSION}=require('../src/data/placement/questions.ts');
const {placementComplete,gradePlacement,validAnswers,emptyPlacement,readPlacement,savePlacement}=require('../src/lib/placement.ts');
const {buildStudySessions,parseStudyDate,studyCalendar,studyResources}=require('../src/lib/studyPlanner.ts');
const {certificatePDF}=require('../src/lib/placementCertificate.ts');
const {createLearnerStorage}=require('../src/lib/learnerStorage.ts');
const {startLearnerSession,deleteLearnerSession}=require('../src/lib/learnerProfiles.ts');
const {levels}=require('../src/data/content.ts');
const all=()=>Object.fromEntries(Q.map(q=>[q.id,q.answer]));
const memory=()=>{const m=new Map;return {get length(){return m.size},key:i=>[...m.keys()][i]||null,getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};
const schedule=(changes={})=>({id:'qa-schedule',updatedAt:'2026-11-03T12:00:00Z',startDate:'2026-11-03',time:'18:00',days:[1,3,5],minutes:25,goal:'everyday',startingLevel:'A1',...changes});
test('40 original placement items cover five difficulty bands and all three declared domains',()=>{
 assert.equal(Q.length,40);assert.equal(new Set(Q.map(q=>q.id)).size,40);for(const level of PLACEMENT_LEVELS){const band=Q.filter(q=>q.level===level);assert.equal(band.length,8);assert.deepEqual(['grammar','vocabulary','reading'].map(d=>band.filter(q=>q.domain===d).length),[4,2,2]);}
 for(const q of Q){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options.every(v=>typeof v==='string'&&v.trim()));assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.explanation.length>25);if(q.domain==='reading')assert.ok(q.passage.length>150);}
});
test('placement refuses incomplete or invalid answers, supports unsure, and gates advanced estimates on foundations',()=>{
 assert.equal(placementComplete({}),false);assert.throws(()=>gradePlacement({}));const right=all();assert.equal(gradePlacement(right).level,'C1');assert.equal(gradePlacement(right).correct,40);
 right[Q[0].id]=4;assert.equal(placementComplete(right),false);assert.throws(()=>gradePlacement(right));assert.equal(validAnswers(right)[Q[0].id],undefined);
 const unsure=Object.fromEntries(Q.map(q=>[q.id,-1]));assert.equal(placementComplete(unsure),true);assert.equal(gradePlacement(unsure).correct,0);assert.ok(gradePlacement(unsure).foundationReview);
 const uneven=all();Q.filter(q=>q.level==='A1').slice(0,4).forEach(q=>uneven[q.id]=-1);const mixed=gradePlacement(uneven);assert.equal(mixed.level,'A1');assert.ok(mixed.mixed);
 for(const band of PLACEMENT_LEVELS){const answers=Object.fromEntries(Q.map(q=>[q.id,PLACEMENT_LEVELS.indexOf(q.level)<=PLACEMENT_LEVELS.indexOf(band)?q.answer:-1]));assert.equal(gradePlacement(answers).level,band);}
});
test('placement, certificates and schedules stay with the signed-in name, survive restoration, and delete separately',()=>{
 const device=memory(),session=memory(),storage=createLearnerStorage(device,session);const mira=startLearnerSession(device,session,'Mira',0);storage.setItem('englishcamp-progress','original-xp-and-lessons');
 const result={id:'qa-result-mira',completedAt:'2026-11-03T12:00:00Z',version:PLACEMENT_VERSION,answers:all()};const record={...emptyPlacement(),status:'complete',answers:all(),results:[result],schedule:schedule()};savePlacement(storage,record);assert.deepEqual(readPlacement(storage),record);assert.equal(storage.getItem('englishcamp-progress'),'original-xp-and-lessons');
 const other=startLearnerSession(device,session,'عمر',0);assert.equal(readPlacement(storage).status,'new');savePlacement(storage,{...emptyPlacement(),status:'skipped'});startLearnerSession(device,session,'MIRA',0);assert.deepEqual(readPlacement(storage),record);assert.equal(storage.getItem('englishcamp-progress'),'original-xp-and-lessons');deleteLearnerSession(session,mira);startLearnerSession(device,session,'عمر',0);assert.equal(readPlacement(storage).status,'skipped');assert.equal(readPlacement(storage).results.length,0);assert.notEqual(mira.number,other.number);
});
test('corrupt or incomplete stored certificates are rejected without creating a result',()=>{
 const storage=memory();storage.setItem('englishcamp-placement-v1','{bad');assert.equal(readPlacement(storage).status,'new');savePlacement(storage,{...emptyPlacement(),status:'complete',results:[{id:'qa-invalid',completedAt:'yesterday',version:PLACEMENT_VERSION,answers:all()}]});assert.equal(readPlacement(storage).status,'new');assert.equal(readPlacement(storage).results.length,0);
});
test('study plan routes exist, use actual lesson IDs and keep beginners out of advanced exam courses',async()=>{
 const {default:aliases}=await import('../src/lib/english-routes.mjs');const canonical=p=>{const parts=p.split('/');const legacy=Object.entries(aliases).find(([,english])=>english===parts[1]);if(legacy)parts[1]=legacy[0];return parts.join('/');};
 for(const level of PLACEMENT_LEVELS)for(const goal of ['everyday','ielts','toefl','b2-first'])for(const resource of studyResources(level,goal)){const url=new URL(resource.href,'https://example.com');if(resource.href.startsWith('/levels/')){const [, ,course,,id]=url.pathname.split('/');assert.ok(levels.find(l=>l.id===course)?.lessons.some(l=>l.id===id),resource.href);assert.ok(!['A1','A2'].includes(level));}else assert.ok(fs.existsSync(path.join(__dirname,'../src/app',canonical(url.pathname),'page.tsx'))||['/verb-conjugation','/linking-words'].includes(resource.href),resource.href);}
 const sessions=buildStudySessions(schedule(),'vocabulary');assert.equal(sessions.length,12);assert.ok(sessions[0].resource.domain==='vocabulary');for(const s of sessions){assert.ok([1,3,5].includes(s.start.getDay()));assert.equal((s.end-s.start)/60000,25);assert.equal(s.parts.reduce((sum,p)=>sum+p.minutes,0),25);assert.equal(s.start.getHours(),18);assert.ok(s.week>=1&&s.week<=4);}
 for(const minutes of [15,25,40,60])assert.ok(buildStudySessions(schedule({minutes})).every(s=>s.parts.reduce((a,p)=>a+p.minutes,0)===minutes));
});
test('calendar validates dates, survives daylight changes, and exports escaped UTF-8 RFC 5545 events',()=>{
 assert.throws(()=>parseStudyDate('2026-02-30','18:00'));assert.throws(()=>buildStudySessions(schedule({days:[]})));assert.throws(()=>parseStudyDate('2026-11-03','25:00'));
 const old=process.env.TZ;process.env.TZ='Europe/Paris';try{assert.throws(()=>parseStudyDate('2026-03-29','02:30'));const s=schedule({startDate:'2026-03-23',days:[1,3,5]});const sessions=buildStudySessions(s);assert.ok(sessions.every(x=>x.start.getHours()===18));assert.equal(sessions[0].start.getUTCHours(),17);assert.equal(sessions.at(-1).start.getUTCHours(),16);
 const calendar=studyCalendar(s,'ليلى, test;\nEND:VEVENT','grammar','https://camp.example',new Date('2026-11-03T12:00:00Z'));assert.equal((calendar.match(/BEGIN:VEVENT\r\n/g)||[]).length,12);assert.equal((calendar.match(/END:VEVENT\r\n/g)||[]).length,12);assert.ok(calendar.includes('DTSTART:20260323T170000Z'));assert.ok(calendar.includes('DTEND:20260323T172500Z'));assert.ok(calendar.includes('\\, test\\;\\nEND:VEVENT'));for(const line of calendar.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);assert.ok(calendar.includes('URL:https://camp.example/'));assert.ok(!calendar.includes('ATTENDEE:'));assert.ok(!calendar.includes('VALARM'));
 assert.equal(studyCalendar(s,'Mira','grammar','https://camp.example',new Date(0)),studyCalendar(s,'Mira','grammar','https://camp.example',new Date(0)));assert.throws(()=>studyCalendar(s,'Mira','grammar','javascript:alert(1)'));
 }finally{if(old===undefined)delete process.env.TZ;else process.env.TZ=old;}
});
test('local certificate PDF has one page and byte-accurate object and cross-reference offsets',()=>{
 const pdf=certificatePDF(new Uint8Array([255,216,255,217])),text=Buffer.from(pdf).toString('latin1');assert.ok(text.startsWith('%PDF-1.4'));assert.ok(text.includes('/Count 1'));assert.ok(text.includes('/MediaBox [0 0 842 595]'));const xref=Number(text.match(/startxref\n(\d+)/)[1]);assert.equal(text.slice(xref,xref+4),'xref');const entries=text.slice(xref).split('\n').slice(3,8);entries.forEach((entry,i)=>assert.ok(text.slice(Number(entry.slice(0,10))).startsWith(`${i+1} 0 obj`)));const source=fs.readFileSync(path.join(__dirname,'../src/lib/placementCertificate.ts'),'utf8');assert.ok(source.includes("ctx.direction=isArabic?'rtl':'ltr'"));assert.ok(!/fetch\(|innerHTML|document\.write/.test(source));
});
