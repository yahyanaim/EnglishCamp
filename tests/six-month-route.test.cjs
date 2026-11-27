process.env.TZ='Europe/Paris'; // covers the March and October clock changes inside a 26-week route
require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {buildSixMonthRoute,allocateSlots,routeWeights,nextLevel,routeCalendar,routeComponentOf,routeReviewKey}=require('../src/lib/sixMonthRoute.ts');
const {ROUTE_PHASES,ROUTE_EXAMS,ROUTE_COMPONENTS,ROUTE_CHECKPOINT_WEEKS,ROUTE_LANGUAGE,ROUTE_WEEKS,HOURS_PER_LEVEL,ROUTE_SOURCES}=require('../src/lib/sixMonthRouteData.ts');
const {LEVEL_STUDY_PLANS}=require('../src/data/level-study-plans.ts');
const {validStudySchedule,readPlacement,savePlacement,emptyPlacement}=require('../src/lib/placement.ts');
const {readStudyReviews}=require('../src/lib/studyReadiness.ts');
const LEVELS=['A1','A2','B1','B2','C1','C2'];
const DAYS=[[1],[2,5],[1,3,5],[1,2,4,5],[1,2,3,4,5],[1,2,3,4,5,6],[0,1,2,3,4,5,6]];
const MINUTES=[15,25,40,60,90];
const schedule=(c={})=>({id:'route-qa-0001',updatedAt:'2026-11-27T10:00:00Z',startDate:'2026-12-01',time:'18:30',days:[1,3,5],minutes:25,goal:'everyday',startingLevel:'B1',weeks:26,...c});
const appRoute=href=>{const p=href.split('#')[0].split('?')[0];return p==='/'||fs.existsSync(path.join(__dirname,'..','src/app',p));};
const phaseOf=week=>ROUTE_PHASES.find(p=>week>=p.from&&week<=p.to).index;
const minutesOfDay=d=>d.getHours()*60+d.getMinutes();

test('phases cover weeks 1–26 without gaps; checkpoints sit at the end of months 1, 2, 4, 5, the mid-point and the end',()=>{
 assert.equal(ROUTE_WEEKS,26);assert.equal(ROUTE_PHASES.length,6);
 ROUTE_PHASES.forEach((p,i)=>{assert.equal(p.index,i+1);assert.equal(p.from,i?ROUTE_PHASES[i-1].to+1:1);assert.ok(p.to>=p.from);});
 assert.equal(ROUTE_PHASES.at(-1).to,26);
 assert.deepEqual(ROUTE_CHECKPOINT_WEEKS.map(c=>c.week),[4,8,13,17,21,26]);
 for(const cp of ROUTE_CHECKPOINT_WEEKS)assert.ok(ROUTE_PHASES.some(p=>p.to===cp.week),'each checkpoint closes a phase');
 for(const p of ROUTE_PHASES)if(p.weights!=='exam')assert.equal(Object.values(p.weights).reduce((a,b)=>a+b),100);
});

test('Cambridge mapping: next CEFR level, its exam, and weightings that match the official formats',()=>{
 assert.deepEqual(LEVELS.map(nextLevel),['A2','B1','B2','C1','C2','C2']);
 assert.deepEqual(Object.fromEntries(Object.entries(ROUTE_EXAMS).map(([k,e])=>[k,e.name])),{A2:'A2 Key',B1:'B1 Preliminary',B2:'B2 First',C1:'C1 Advanced',C2:'C2 Proficiency'});
 assert.match(ROUTE_EXAMS.A2.papers,/Reading & Writing 50% · Listening 25% · Speaking 25%/);
 assert.match(ROUTE_EXAMS.B1.papers,/Reading 25% · Writing 25% · Listening 25% · Speaking 25%/);
 for(const k of ['B2','C1','C2']){assert.match(ROUTE_EXAMS[k].papers,/Reading, Use of English, Writing, Listening and Speaking count equally/);assert.ok(ROUTE_COMPONENTS.every(c=>ROUTE_EXAMS[k].weights[c]===20));}
 for(const e of Object.values(ROUTE_EXAMS)){assert.equal(Object.values(e.weights).reduce((a,b)=>a+b),100);assert.match(e.href,/^https:\/\/www\.cambridgeenglish\.org\/exams-and-tests\/qualifications\/[a-z]+\/format\/$/);}
 assert.equal(HOURS_PER_LEVEL,200,'Cambridge: about 200 guided learning hours per CEFR level');
 assert.ok(ROUTE_SOURCES.some(s=>s.href.includes('support.cambridgeenglish.org')&&/guided learning hours/i.test(s.title)));
 assert.ok(ROUTE_SOURCES.some(s=>/British Council – EAQUALS Core Inventory/.test(s.title)));
 for(const l of LEVELS){const lang=ROUTE_LANGUAGE[l];for(const k of ['functions','grammar','linking','topics'])assert.ok(lang[k].length>15,l+' '+k);}
});

test('every start level × study days × session length builds a complete, valid 26-week route',()=>{
 let routes=0;
 for(const level of LEVELS)for(const days of DAYS)for(const minutes of MINUTES){
  const s=schedule({startingLevel:level,days,minutes}),r=buildSixMonthRoute(s);routes++;
  const label=`${level} ${days.join('')} ${minutes}`;
  assert.equal(r.start,level);assert.equal(r.target,nextLevel(level));assert.equal(r.exam,ROUTE_EXAMS[r.target]);
  assert.equal(r.sessions.length,days.length*26,label+' one session per chosen day for 26 weeks');
  assert.equal(new Set(r.sessions.map(x=>x.id)).size,r.sessions.length);
  for(const x of r.sessions){
   assert.match(x.id,/^[\w-]{6,100}$/,'id fits saved progress');
   assert.ok(days.includes(x.start.getDay()),label+' on a chosen weekday');
   assert.equal(minutesOfDay(x.start),18*60+30,label+' keeps the local study time across clock changes');
   assert.equal(x.end-x.start,minutes*60000);assert.equal(x.minutes,minutes);
   assert.ok(x.week>=1&&x.week<=26);assert.equal(x.phase,phaseOf(x.week));
   assert.ok(LEVELS.indexOf(x.level)>=0);
   if(x.kind==='study'&&x.phase>1)assert.ok(LEVELS.indexOf(x.level)>=LEVELS.indexOf(r.target),label+' months 2–6 work at the target level or above');
   if(x.external)assert.equal(x.href,r.exam.href);else assert.ok(appRoute(x.href),label+' '+x.href+' exists');
   assert.ok(x.title.length>3&&x.task.length>20);
  }
  for(let i=1;i<r.sessions.length;i++)assert.ok(r.sessions[i].start>r.sessions[i-1].start,'chronological');
  const retests=r.sessions.filter(x=>x.kind==='retest'),mocks=r.sessions.filter(x=>x.kind==='mock');
  assert.equal(retests.length,1);assert.equal(retests[0].week,26);assert.equal(retests[0].href,'/placement-test');
  assert.equal(mocks.length,1);assert.equal(mocks[0].week,25);assert.equal(mocks[0].href,r.target==='B2'?'/mock-exam':r.exam.href);
  const planned=Math.round(days.length*26*minutes/60*10)/10;assert.equal(r.hours.planned,planned);
  assert.equal(r.hours.verdict,level==='C2'?'maintain':planned>=200?'on-track':planned>=120?'stretch':'foundation',label+' verdict');
  assert.equal(r.checkpoints.length,6);
  for(const cp of r.checkpoints){
   assert.equal(cp.canDo.length,3);assert.deepEqual(cp.canDo,LEVEL_STUDY_PLANS[cp.week<=4?level:r.target].ready);
   const firstDay=new Date(2026,11,1,12),expected=new Date(firstDay.getFullYear(),firstDay.getMonth(),firstDay.getDate()+cp.week*7-1,12);
   assert.equal(cp.date.toDateString(),expected.toDateString());
   for(const t of cp.tasks)assert.ok(t.external?t.href===r.exam.href:appRoute(t.href),cp.title+' '+t.href);
  }
  assert.ok(r.checkpoints.find(c=>c.kind==='final').tasks.some(t=>t.href==='/placement-test'));
  assert.ok(r.checkpoints.find(c=>c.kind==='midpoint').tasks.some(t=>t.href==='/placement-test'));
  if(days.length>=2)for(const p of r.phases){const comps=new Set(r.sessions.filter(x=>x.phase===p.index&&x.kind==='study').map(x=>x.component));for(const c of ROUTE_COMPONENTS)assert.ok(comps.has(c),`${label} month ${p.index} includes ${c}`);}
 }
 assert.equal(routes,6*7*5);
});

test('the skill mix of each month follows its weights within one session',()=>{
 for(const days of DAYS)for(const level of ['A2','B1','B2']){
  const r=buildSixMonthRoute(schedule({days,startingLevel:level}));
  for(const p of r.phases.slice(0,5)){
   const list=r.sessions.filter(x=>x.phase===p.index);
   for(const c of ROUTE_COMPONENTS){const n=list.filter(x=>x.component===c).length,ideal=p.weights[c]/100*list.length;assert.ok(Math.abs(n-ideal)<=1,`${days.length}d ${level} month ${p.index} ${c}: ${n} vs ${ideal.toFixed(2)}`);}
  }
 }
 // Months 5–6 follow the target exam: equal five components for B2 First and above.
 const b2=buildSixMonthRoute(schedule({startingLevel:'B1'}));for(const c of ROUTE_COMPONENTS)assert.equal(Math.round(b2.phases[4].weights[c]),20);
 const key=buildSixMonthRoute(schedule({startingLevel:'A1'}));assert.equal(Math.round(key.phases[4].weights.language),10);assert.equal(key.phases[4].weights.reading,key.phases[4].weights.speaking);
});

test('allocation stays within one slot of the ideal at every point, for any weights',()=>{
 let seed=7;const rnd=()=>(seed=(seed*48271)%2147483647)/2147483647;
 for(let t=0;t<300;t++){
  const w=Object.fromEntries(ROUTE_COMPONENTS.map(c=>[c,1+rnd()*40])),total=Object.values(w).reduce((a,b)=>a+b),slots=1+Math.floor(rnd()*40),out=allocateSlots(w,slots);
  assert.equal(out.length,slots);
  for(let k=1;k<=slots;k++)for(const c of ROUTE_COMPONENTS){const n=out.slice(0,k).filter(x=>x===c).length;assert.ok(Math.abs(n-w[c]/total*k)<1+1e-9);}
 }
});

test('weaker skills from the CEFR profile get more time in every month',()=>{
 const base=buildSixMonthRoute(schedule());
 for(const [priority,component] of [['listening','listening'],['speaking','speaking'],['grammar','language'],['vocabulary','language'],['reading','reading']]){
  const r=buildSixMonthRoute(schedule(),{baseLevel:'B1',levels:{},priorities:[priority]});
  assert.equal(routeComponentOf(priority),component);
  r.phases.forEach((p,i)=>{assert.ok(p.weights[component]>base.phases[i].weights[component],`${priority} boosted in month ${p.index}`);assert.deepEqual(p.boosted,[component]);});
 }
 // Stronger skills keep harder material from the first month.
 const mixed=buildSixMonthRoute(schedule({startingLevel:'A2'}),{baseLevel:'A2',levels:{reading:'B2',listening:'A2',grammar:'A2',vocabulary:'A2',speaking:'A2',writing:'A2'},priorities:['listening']});
 assert.ok(mixed.sessions.filter(x=>x.component==='reading'&&x.kind==='study').every(x=>x.level==='B2'),'reading stays at the measured B2');
 assert.ok(mixed.sessions.filter(x=>x.component==='listening'&&x.phase===1).every(x=>x.level==='A2'));
 assert.ok(mixed.sessions.filter(x=>x.component==='listening'&&x.phase>1&&x.kind==='study').every(x=>x.level==='B1'),'then the target level');
});

test('checkpoint answers re-balance only the months after that checkpoint, and a newer check replaces an older one',()=>{
 const plain=buildSixMonthRoute(schedule());
 const afterMonth1=buildSixMonthRoute(schedule(),undefined,[{week:4,weakSkills:['speaking']}]);
 assert.deepEqual(afterMonth1.phases[0].weights,plain.phases[0].weights,'month 1 unchanged');
 for(const p of afterMonth1.phases.slice(1))assert.ok(p.weights.speaking>plain.phases[p.index-1].weights.speaking);
 const midpoint=buildSixMonthRoute(schedule(),undefined,[{week:4,weakSkills:['speaking']},{week:13,weakSkills:['writing']}]);
 assert.ok(midpoint.phases[2].boosted.includes('speaking'),'months 2–3 still use the month-1 answer');
 assert.deepEqual(midpoint.phases[3].boosted,['writing'],'from month 4 the mid-point answer replaces it');
 assert.deepEqual(midpoint.phases[5].boosted,['writing']);
 const future=buildSixMonthRoute(schedule(),undefined,[{week:30,weakSkills:['reading']},{week:0,weakSkills:['reading']}]);
 assert.ok(future.phases.every(p=>p.boosted.length===0),'out-of-range checkpoints are ignored');
 // Earlier sessions keep their dates and ids when later months change.
 assert.deepEqual(afterMonth1.sessions.map(x=>x.id),plain.sessions.map(x=>x.id));
 assert.deepEqual(afterMonth1.sessions.filter(x=>x.phase===1).map(x=>x.component),plain.sessions.filter(x=>x.phase===1).map(x=>x.component));
});

test('study-time verdict follows Cambridge’s ~200 hours per level',()=>{
 const cases=[[[1,2,3,4,5,6,0],60,'stretch'],[[1,2,3,4,5,6],90,'on-track'],[[1,2,3,4,5],90,'stretch'],[[1,2,3,4,5],60,'stretch'],[[1,3,5],40,'foundation'],[[1,3],60,'foundation']];
 for(const [days,minutes,verdict] of cases){const r=buildSixMonthRoute(schedule({days,minutes}));assert.equal(r.hours.verdict,verdict,`${days.length}×${minutes}`);}
 const r=buildSixMonthRoute(schedule({days:[1,2,3,4,5,6,0],minutes:60}));assert.equal(r.hours.planned,182);assert.equal(r.hours.perWeek,7);assert.equal(r.hours.weeklyNeeded,7.7);
 assert.equal(buildSixMonthRoute(schedule({days:[1,2,3,4,5,6],minutes:90})).hours.planned,234,'six 90-minute sessions a week reach Cambridge’s ~200 hours');
 assert.equal(buildSixMonthRoute(schedule({startingLevel:'C2'})).hours.verdict,'maintain');
});

test('invalid schedules are refused with a clear message',()=>{
 assert.throws(()=>buildSixMonthRoute(schedule({days:[]})),/at least one study day/);
 assert.throws(()=>buildSixMonthRoute(schedule({startDate:'2026-02-30'})),/does not exist|valid date/);
 assert.throws(()=>buildSixMonthRoute(schedule({time:'25:00'})),/valid date and study time/);
});

test('the 26-week schedule, checkpoint answers and done sessions are saved and validated',()=>{
 assert.ok(validStudySchedule(schedule()));assert.ok(validStudySchedule(schedule({minutes:90})));assert.ok(!validStudySchedule(schedule({minutes:45})));assert.ok(!validStudySchedule(schedule({weeks:27})));assert.ok(!validStudySchedule(schedule({weeks:6})));
 const reviews=readStudyReviews({[routeReviewKey('route-qa-0001',4)]:{checks:[true,false,true],weakSkills:['speaking','hacking','speaking','writing']},'bad key!':{checks:[true]}});
 assert.deepEqual(Object.keys(reviews),['route-qa-0001-route-4']);assert.deepEqual(reviews['route-qa-0001-route-4'].weakSkills,['speaking','writing']);
 const m=new Map,storage={getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
 const r=buildSixMonthRoute(schedule());
 savePlacement(storage,{...emptyPlacement(),status:'skipped',schedule:schedule(),studyDone:r.sessions.slice(0,3).map(x=>x.id),studyReviews:reviews});
 const back=readPlacement(storage);assert.equal(back.schedule.weeks,26);assert.deepEqual(back.studyDone,r.sessions.slice(0,3).map(x=>x.id));assert.deepEqual(back.studyReviews['route-qa-0001-route-4'].weakSkills,['speaking','writing']);
});

test('calendar export has one event per session with folded lines and working links',()=>{
 const r=buildSixMonthRoute(schedule({startingLevel:'A2',days:[1,4]})),ics=routeCalendar(r,'Mira, A.','https://englishcamp.example',new Date('2026-11-27T10:00:00Z'));
 assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,r.sessions.length);
 for(const line of ics.split('\r\n'))assert.ok(new TextEncoder().encode(line).length<=75,line);
 assert.match(ics,/URL:https:\/\/englishcamp\.example\/placement-test/);
 assert.ok(ics.replace(/\r\n /g,'').includes('URL:'+ROUTE_EXAMS.B1.href),'external exam link kept');
 assert.match(ics.replace(/\r\n /g,''),/Mira\\, A\.: A2 to B1/);
 assert.throws(()=>routeCalendar(r,'x','ftp://x'),/website address/);
});

test('the study plan offers the 6-month route only after the CEFR check and shows it for 26-week schedules',()=>{
 const t=fs.readFileSync(path.join(__dirname,'../src/components/placement/StudyTimetable.tsx'),'utf8');
 assert.match(t,/<option value="26" disabled=\{!skillProfile\}>6 months · CEFR route/);
 assert.match(t,/if\(!record\.schedule&&skillProfile\)setWeeks\(26\)/,'learners with a CEFR result start on the 6-month route');
 assert.match(t,/schedule\.weeks===26&&<SixMonthRoute /);
 const v=fs.readFileSync(path.join(__dirname,'../src/components/placement/SixMonthRoute.tsx'),'utf8');
 for(const text of ['Your 6-month CEFR route','Target exam','Official exam format','Study time','Checkpoints','Which skills felt hardest?','All 26 weeks','Add to calendar','not an official syllabus'])assert.ok(v.includes(text),text);
 assert.match(fs.readFileSync(path.join(__dirname,'../src/components/layout/GridBalance.tsx'),'utf8'),/import "\.\.\/placement\/route\.css";/);
});

test('topic chips merge near-duplicates and show the most common topics first',()=>{
 const {topicKey}=require('../src/components/learn/HubHero.tsx');
 assert.equal(topicKey('Sports'),topicKey('Sport'));assert.equal(topicKey(' City life '),'city life');
 const src=fs.readFileSync(path.join(__dirname,'../src/components/learn/HubHero.tsx'),'utf8');
 assert.match(src,/max = 8/);assert.match(src,/More topics \(\$\{rest\.length\}\)/);assert.match(src,/selectedHidden/);
 for(const f of ['ListeningSection','ReadingSection']){const s=fs.readFileSync(path.join(__dirname,`../src/components/learn/${f}.tsx`),'utf8');assert.match(s,/<TopicChips /);assert.match(s,/topicKey\(lesson\.(topic|category)\) ===/);}
});
