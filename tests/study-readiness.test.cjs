require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const {emptyStudyReview,studyReadinessStatus,readStudyReviews,studyReviewKey}=require('../src/lib/studyReadiness.ts');
const {emptyPlacement,readPlacement,savePlacement}=require('../src/lib/placement.ts');
const {buildStudySessions,studyCalendar}=require('../src/lib/studyPlanner.ts');
const {LEVEL_PRACTICE,GUIDED_LEARNING_HOURS,levelPracticeLinks}=require('../src/data/study-practice.ts');

test('harder-material readiness needs all can-do checks, a later independent sample and feedback on both productive skills',()=>{
 const review=emptyStudyReview(),today='2026-11-05';assert.equal(studyReadinessStatus(review,today).ready,false);
 review.checks=[true,true,true];review.practiceDate='2026-11-03';review.retestDate='2026-11-03';review.feedback={speaking:true,writing:true};assert.equal(studyReadinessStatus(review,today).ready,false,'same-day repetition is not later-day transfer');
 review.retestDate='2026-11-04';assert.equal(studyReadinessStatus(review,today).ready,true);
 review.feedback.writing=false;assert.equal(studyReadinessStatus(review,today).ready,false);
 review.feedback.writing=true;review.checks[1]=false;assert.equal(studyReadinessStatus(review,today).ready,false);
 review.checks[1]=true;review.retestDate='2026-11-06';assert.equal(studyReadinessStatus(review,today).ready,false,'future evidence cannot count');
});
test('named records preserve readiness notes without altering attempts, course credit or old timetable checkmarks',()=>{
 let raw='';const storage={getItem:()=>raw,setItem:(_,value)=>raw=value};const base={...emptyPlacement(),studyDone:['qa-plan-original-0']};savePlacement(storage,base);assert.deepEqual(readPlacement(storage),base);
 const key=studyReviewKey('qa-plan-original',1,'A1'),review={...emptyStudyReview(),practiceDate:'2026-11-02',retestDate:'2026-11-04',note:'Check subject before verb.'};const next={...base,studyReviews:{[key]:review}};savePlacement(storage,next);assert.deepEqual(readPlacement(storage),next);assert.deepEqual(readPlacement(storage).results,[]);assert.deepEqual(readPlacement(storage).studyDone,base.studyDone);
 assert.notEqual(key,studyReviewKey('qa-plan-original',1,'B1'));assert.notEqual(key,studyReviewKey('qa-plan-original',2,'A1'));
 const bad=readStudyReviews({'bad key':review,'valid-review-key':{checks:[true,'true',false],practiceDate:'2026-02-30',retestDate:'bad',feedback:{speaking:1,writing:true},note:'x'.repeat(1100)}});assert.deepEqual(Object.keys(bad),['valid-review-key']);assert.deepEqual(bad['valid-review-key'].checks,[true,false,false]);assert.equal(bad['valid-review-key'].practiceDate,'');assert.equal(bad['valid-review-key'].note.length,1000);assert.equal(bad['valid-review-key'].feedback.speaking,false);
});
test('plans and exported calendar share concrete briefs by skill level and never automatically increase difficulty after four weeks',()=>{
 for(const level of Object.keys(LEVEL_PRACTICE)){
  const schedule={id:'qa-solid-plan',updatedAt:'2026-11-05T10:00:00Z',startDate:'2026-11-05',time:'18:00',days:[1,2,3,4,5],minutes:25,goal:'everyday',startingLevel:level,weeks:12};const sessions=buildStudySessions(schedule,'listening');assert.equal(sessions.length,60);assert.ok(sessions.every(s=>s.level===level));
  for(const session of sessions){assert.equal(session.practice,LEVEL_PRACTICE[level][session.resource.domain]);assert.equal(session.parts.reduce((n,p)=>n+p.minutes,0),25);}
  const calendar=studyCalendar(schedule,'Sample learner','listening','https://camp.example',new Date(0));assert.ok(calendar.includes('Practice brief:'));assert.ok(calendar.includes('Repeat a fresh task'));assert.ok(GUIDED_LEARNING_HOURS[level]);
  for(const link of levelPracticeLinks(level))assert.ok(/^https:\/\/learnenglish\.britishcouncil\.org\/free-resources\/(listening|speaking)\/[abc][12]$/.test(link.href));
 }
});
