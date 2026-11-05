require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {PLACEMENT_QUESTIONS:Q,PLACEMENT_LEVELS}=require('../src/data/placement/questions.ts');
const {PLACEMENT_LISTENING:L,PLACEMENT_SPEAKING:S,SPEAKING_CRITERIA}=require('../src/data/placement/communication.ts');
const {emptyCommunication,validCommunication,listeningComplete,speakingComplete,communicationSummary}=require('../src/lib/placementCommunication.ts');
const {placementPriority,readPlacement,savePlacement,emptyPlacement,validStudySchedule}=require('../src/lib/placement.ts');
const {studyResources,buildStudySessions,studyCalendar}=require('../src/lib/studyPlanner.ts');
const {LEVEL_STUDY_PLANS}=require('../src/data/level-study-plans.ts');
const {VocabularyPage}=require('../src/components/layout/VocabularyPage.tsx'),{BackButton}=require('../src/components/ui/BackButton.tsx');
const answers=()=>Object.fromEntries(Q.map(q=>[q.id,q.answer]));
const complete=()=>({listening:Object.fromEntries(L.map(q=>[q.id,q.answer])),heard:L.map(q=>q.id),speaking:Object.fromEntries(S.map(s=>[s.id,{status:'reviewed',recorded:true,ratings:{task:2,clarity:2,language:2}}]))});
const schedule=(extra={})=>({id:'qa-new-plan',updatedAt:'2026-11-04T10:00:00Z',startDate:'2026-11-04',time:'18:00',days:[1,2,3,4,5],minutes:25,goal:'everyday',startingLevel:'A1',...extra});

test('listening covers five editorial difficulty bands with genuine existing neural audio and unambiguous choices',()=>{
 assert.equal(L.length,10);assert.equal(new Set(L.map(q=>q.id)).size,10);
 for(const level of PLACEMENT_LEVELS)assert.equal(L.filter(q=>q.level===level).length,2);
 for(const q of L){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.explanation.length>20);for(const clip of q.clips){assert.ok(clip.transcript.length>15);assert.ok(clip.src.startsWith('/media/'));assert.ok(fs.existsSync('public'+clip.src),clip.src);}}
});
test('unassessed audio is not scored wrong, and a partial speaking reflection never becomes a completed assessment',()=>{
 const c=emptyCommunication();assert.equal(listeningComplete(c),false);assert.equal(speakingComplete(c),false);
 c.listening=Object.fromEntries(L.map(q=>[q.id,-2]));c.speaking=Object.fromEntries(S.map(s=>[s.id,{status:'skipped'}]));
 assert.ok(listeningComplete(c));assert.ok(speakingComplete(c));assert.deepEqual(communicationSummary(c).listening,{correct:0,total:0,skipped:10,complete:true});assert.equal(communicationSummary(c).speaking.confidence,null);
 c.speaking[S[0].id]={status:'reviewed',recorded:true,ratings:{task:2}};assert.equal(validCommunication(c).speaking[S[0].id].status,'recorded');assert.equal(speakingComplete(validCommunication(c)),false);
 const tampered=validCommunication({listening:{[L[0].id]:99,unknown:0},heard:['unknown',L[0].id,L[0].id],speaking:{[S[0].id]:{status:'reviewed',recorded:false,ratings:{task:2,clarity:2,language:2}}}});
 assert.deepEqual(tampered.listening,{});assert.deepEqual(tampered.heard,[L[0].id]);assert.deepEqual(tampered.speaking,{});
 assert.equal(communicationSummary(complete()).listening.correct,10);assert.equal(communicationSummary(complete()).speaking.reviewed,5);
});
test('skill evidence changes practice priority while legacy language results and named records remain compatible',()=>{
 const r={id:'qa-result',completedAt:'2026-11-04T10:00:00Z',version:'englishcamp-placement-v1',answers:answers()};assert.equal(placementPriority(r),'grammar');
 const c=complete();L.slice(0,7).forEach(q=>c.listening[q.id]=-1);assert.equal(placementPriority({...r,communication:c}),'listening');
 for(const s of S)c.speaking[s.id].ratings={task:0,clarity:0,language:0};assert.equal(placementPriority({...r,communication:c}),'listening','legacy self-ratings must not count as measured speaking evidence');
 let text='';const storage={getItem:()=>text,setItem:(_,v)=>{text=v}};const old={...emptyPlacement(),status:'complete',results:[r]};savePlacement(storage,old);assert.deepEqual(readPlacement(storage),old);
 const newRecord={...old,communication:c,results:[r,{...r,id:'qa-result-new',communication:c}],studyDone:['qa-new-plan-0']};savePlacement(storage,newRecord);const restored=readPlacement(storage);assert.deepEqual(restored,newRecord);assert.equal(restored.results.length,2);
});
test('all level plans have distinct weekly outcomes, six skills, valid durations and configurable horizons',()=>{
 const unique=new Set;for(const level of PLACEMENT_LEVELS){const plan=LEVEL_STUDY_PLANS[level];assert.equal(plan.weeks.length,4);assert.equal(new Set(plan.weeks.map(w=>w.output)).size,4);unique.add(plan.aim);assert.ok(plan.ready.length>=3);assert.ok(plan.sources.every(s=>s.href.startsWith('https://')));
 for(const goal of ['everyday','ielts','toefl','b2-first'])assert.deepEqual([...new Set(studyResources(level,goal).map(r=>r.domain))].sort(),['grammar','listening','reading','speaking','vocabulary','writing']);
 for(const weeks of [4,8,12])for(const minutes of [15,25,40,60]){const sessions=buildStudySessions(schedule({startingLevel:level,weeks,minutes}),'listening');assert.equal(sessions.length,weeks*5);assert.equal(sessions[0].resource.domain,'listening');assert.ok(sessions.some(s=>s.resource.domain==='writing'));for(const session of sessions){assert.equal(session.parts.reduce((a,p)=>a+p.minutes,0),minutes);assert.ok(session.parts.every(p=>p.minutes>0));assert.ok(session.task.length>30);assert.ok(session.success.length>30);assert.ok(session.week>=1&&session.week<=weeks);}}}
 assert.equal(unique.size,5);assert.equal(validStudySchedule(schedule({weeks:5})),false);
 const events=studyCalendar(schedule({weeks:8}),'QA','speaking','https://camp.example',new Date(0));assert.equal((events.match(/BEGIN:VEVENT/g)||[]).length,40);assert.ok(events.includes('Weekly output:'));assert.ok(events.includes('Check:'));assert.ok(!events.includes('ATTENDEE:'));
});
test('shared vocabulary shell puts one local return after its banner and keeps interactive children',()=>{
 const child=React.createElement('div',null,React.createElement(BackButton,{onClick:()=>{}},'Back to topics'),React.createElement('button',{onClick:()=>{}},'Choose topic'));
 const html=renderToStaticMarkup(React.createElement(VocabularyPage,{title:'Topics',description:'Useful words'},child));assert.equal((html.match(/<h1/g)||[]).length,1);assert.equal((html.match(/Back to topics/g)||[]).length,1);assert.ok(html.indexOf('Back to topics')>html.indexOf('</h1>'));assert.ok(html.includes('Choose topic'));assert.equal((html.match(/aria-label="Return navigation"/g)||[]).length,1);
});
test('all word illustrations use defined palette colours and a legible drawing surface',()=>{
 const {ESSENTIAL_VOCABULARY}=require('../src/data/essential-vocabulary.ts'),{EssentialVocabularyTopic}=require('../src/components/learn/EssentialVocabulary.tsx'),{accentPalette}=require('../src/lib/accentPalette.ts');const palette=accentPalette('#7E22CE');
 for(const topic of ESSENTIAL_VOCABULARY){const html=renderToStaticMarkup(React.createElement(EssentialVocabularyTopic,{topic}));for(const match of html.matchAll(/var\((--camp-[^,)]+)/g))assert.ok(Object.hasOwn(palette,match[1]),topic.id+': '+match[1]);assert.ok(html.includes('fill="#faf8fc"'));}
});
