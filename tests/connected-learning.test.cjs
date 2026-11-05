require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const {dailyQuestions,dailyScore}=require('../src/lib/dailyChallenge.ts');
const {quizQuestions}=require('../src/data/quizzes.ts');
const {useDailyChallenge}=require('../src/store/useDailyChallenge.ts');
const {useProgress}=require('../src/store/useProgress.ts');
const {activityDays,localDay}=require('../src/lib/learningActivity.ts');
const {courseSnapshot}=require('../src/lib/courseProgress.ts');
const {ADJECTIVE_QUESTIONS,adjectiveRound}=require('../src/data/adjective-questions.ts');
const {readingWordDetails}=require('../src/lib/vocabularyLookup.ts');
const {ALL_ARTICLES}=require('../src/data/articles/index.ts');
const {useVocabulary,vocabId}=require('../src/store/useVocabulary.ts');
const {accentPalette,contrast,ACCENT_PRESETS}=require('../src/lib/accentPalette.ts');

test('daily questions stay stable throughout an attempt and never mutate the source bank',()=>{
 const before=JSON.stringify(quizQuestions),day='2026-11-02',first=dailyQuestions(day,quizQuestions);
 assert.equal(first.length,5);assert.equal(new Set(first.map(q=>q.id)).size,5);
 for(let i=0;i<8;i++)assert.deepEqual(dailyQuestions(day,quizQuestions),first);
 assert.equal(JSON.stringify(quizQuestions),before);assert.notDeepEqual(dailyQuestions('2026-11-03',quizQuestions).map(q=>q.id),first.map(q=>q.id));
 const bad={...quizQuestions[0],options:['yes',''],correct:0};assert.ok(!dailyQuestions(day,[bad]).length);
});
test('daily answers resume sequentially; exact displayed XP is credited once per date',()=>{
 useProgress.getState().reset();useDailyChallenge.setState({attempt:null,completed:false,lastDate:null});
 const day='2026-11-02',q=dailyQuestions(day,quizQuestions),s=useDailyChallenge.getState();
 s.saveAnswer(day,1,0);assert.equal(useDailyChallenge.getState().attempt,null);
 q.forEach((item,i)=>{s.saveAnswer(day,i,item.correct);s.saveAnswer(day,i,(item.correct+1)%item.options.length);});
 const answers=useDailyChallenge.getState().attempt.answers;assert.deepEqual(answers,q.map(x=>x.correct));
 const result=dailyScore(q,answers);assert.equal(result.score,5);assert.equal(result.xp,q.reduce((sum,q)=>sum+q.xpReward+5,0));
 assert.equal(useProgress.getState().completeExercise('daily:'+day,result.xp),result.xp);
 s.setCompleted(result.score,5,result.xp,q.map(q=>({questionId:q.id,correct:true})),day);
 assert.equal(useProgress.getState().completeExercise('daily:'+day,result.xp),0);assert.equal(useProgress.getState().xp,result.xp);
 assert.equal(useDailyChallenge.getState().xpEarned,result.xp);assert.equal(dailyScore(q,[]).xp,0);
 assert.equal(useProgress.getState().completeExercise('daily:2026-11-03',result.xp),result.xp);
});
test('every learning reward path appears in activity and repeat exercise credit is not duplicated',()=>{
 const s=useProgress.getState();s.reset();s.completeLesson('lesson-test',20);s.completeLesson('lesson-test',20);s.completeExercise('exercise-test',5);s.completeExercise('exercise-test',5);s.markCardSeen('card-test');s.addXP(10);
 s.recordQuizResult('band4-5',{score:100,total:1,correct:1,xpEarned:8,takenAt:new Date().toISOString(),answers:[]});
 const state=useProgress.getState();assert.equal(state.xp,43);assert.equal(state.events.length,5);assert.equal(activityDays(state)[localDay()].count,5);
 const before=state.xp;s.addXP(NaN);s.addXP(-5);assert.equal(useProgress.getState().xp,before);
});
test('legacy activity retains dated evidence without manufacturing XP-based historical totals',()=>{
 const state={events:[],lessons:{old:{completed:true,completedAt:'2026-10-30T12:00:00Z',xpEarned:20,attempts:1}},quizResults:{},activityAttempts:[],xp:385,lastActiveDate:'2026-11-01'};
 const days=activityDays(state);assert.equal(days['2026-10-30'].count,1);assert.deepEqual(days['2026-11-01'],{count:0,legacy:true});assert.equal(Object.keys(days).length,2);
});
test('all course surfaces can use the same accepted stages; practice XP does not complete modules',()=>{
 const stages={0:{signature:'a'},1:{signature:'b'}},modules={one:{viewedAt:'now',stages,expectedSignatures:['a','b','c']},two:{stages:{}}};
 assert.deepEqual(courseSnapshot(['one','two'],modules,{}),{completed:0,started:1,stages:2,total:2,percent:33});
 modules.one.stages[2]={signature:'wrong'};assert.equal(courseSnapshot(['one','two'],modules,{}).completed,0);
 modules.one.stages[2]={signature:'c'};assert.equal(courseSnapshot(['one','two'],modules,{}).completed,1);assert.equal(courseSnapshot(['one','two'],modules,{}).percent,50);
 const old={two:{completed:true}};assert.equal(courseSnapshot(['one','two'],modules,old).percent,100);
 useProgress.getState().reset();useProgress.getState().addXP(500);assert.equal(courseSnapshot(['one','two'],useProgress.getState().modules,useProgress.getState().lessons).percent,0);
});
test('adjective rounds have no empty option, one correct full form, stable IDs and no source mutation',()=>{
 const before=JSON.stringify(ADJECTIVE_QUESTIONS);
 for(let run=0;run<30;run++){const pool=adjectiveRound();assert.equal(pool.length,10);assert.equal(new Set(pool.map(q=>q.id)).size,10);for(const q of pool){assert.equal(q.options.filter(o=>o===q.answer).length,1);assert.ok(q.options.every(o=>o.trim()&&/^[a-z]+$/.test(o)));assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.sentence.includes('___'));assert.ok(!q.sentence.includes(q.answer));}}
 assert.equal(JSON.stringify(ADJECTIVE_QUESTIONS),before);assert.equal(ADJECTIVE_QUESTIONS.find(q=>q.id==='story').answer,'exciting');
});
test('article words save Arabic meaning and an original English example to the same personal bank',()=>{
 useVocabulary.setState({words:{}});const a=ALL_ARTICLES[0],v=a.vocabulary[0],i=a.paragraphs.findIndex(p=>p.en.toLowerCase().includes(v.word.toLowerCase()));const item=readingWordDetails(v.word,a,i);
 assert.equal(item.meaning,v.ar);assert.equal(item.translationKind,'word');assert.match(item.meaning,/[\u0600-\u06ff]/);assert.ok(a.paragraphs.some(p=>p.en.includes(item.example)));
 useVocabulary.getState().addWord(item.word,item.meaning,item.category,{example:item.example,definition:item.definition,translationKind:item.translationKind});
 const id=vocabId(item.word);assert.equal(useVocabulary.getState().words[id].example,item.example);assert.equal(useVocabulary.getState().words[id].en,v.ar);
 useVocabulary.getState().updateNotes(id,'Personal note');useVocabulary.getState().addWord(item.word,'different','other',{example:'new example'});
 assert.equal(Object.keys(useVocabulary.getState().words).length,1);assert.equal(useVocabulary.getState().words[id].notes,'Personal note');assert.equal(useVocabulary.getState().words[id].en,v.ar);
 const unknown=readingWordDetails('zzunknown',a,0);assert.equal(unknown.translationKind,'context');assert.equal(unknown.meaning,a.paragraphs[0].ar,'unknown words are honestly labelled context, not a fabricated meaning');
});
test('every palette keeps white button labels and accent text readable in both themes',()=>{
 for(const color of [...ACCENT_PRESETS.map(p=>p.color),'#FFFFFF','#FFFF00','#00FF00','#000000','#FF00FF','#00FFFF'])for(const dark of [false,true]){
 const p=accentPalette(color,dark);assert.ok(contrast(p['--primary'],'#FFFFFF')>=4.5,color+' white label');assert.ok(contrast(p['--camp-control-ink'],dark?'#1C1C1E':'#FFFFFF')>=4.5,color+' accent text');assert.ok(contrast(p['--camp-control-ink'],p['--camp-purple-soft'])>=4.5,color+' selected label');assert.equal(p['--color-primary'],p['--primary']);assert.equal(p['--camp-purple'],p['--primary']);
 }
});

 test('the first new reward preserves an older saved active day after lastActiveDate moves forward',()=>{
 useProgress.getState().reset();useProgress.setState({xp:70,lastActiveDate:'2026-10-30'});useProgress.getState().completeExercise('new-day',5);
 const state=useProgress.getState(),days=activityDays(state);assert.deepEqual(days['2026-10-30'],{count:0,legacy:true});assert.equal(days[localDay()].count,1);assert.ok(state.legacyActiveDays.includes('2026-10-30'));
 });

test('six reviewed quiz corrections keep every ID, reward, correct index and all other questions intact',()=>{
 const {corrections,beforeBankSha256}=require('./fixtures/connected-quiz-corrections.json'),crypto=require('crypto');assert.equal(Object.keys(corrections).length,6);
 const restored=quizQuestions.map(q=>{const change=corrections[q.id];if(!change)return q;assert.deepEqual(q,change.after);for(const key of ['id','levelId','xpReward','correct'])assert.equal(q[key],change.before[key]);return change.before;});
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(restored)).digest('hex'),beforeBankSha256);
 assert.match(quizQuestions.find(q=>q.id==='b5-6-q20').options[1],/Repeat/);assert.match(quizQuestions.find(q=>q.id==='b4-5-q23').options[1],/everyday reading/);assert.match(quizQuestions.find(q=>q.id==='b5-6-q4').question,/2010 to 2020/);
});

test('saved consecutive streak dates restore legacy active days without inventing activity counts',()=>{
 const state={events:[],lessons:{},quizResults:{},xp:385,streak:3,lastActiveDate:'2026-11-02'};
 const days=activityDays(state);assert.deepEqual(Object.keys(days).sort(),['2026-10-31','2026-11-01','2026-11-02']);for(const day of Object.values(days))assert.deepEqual(day,{count:0,legacy:true});
 useProgress.getState().reset();useProgress.setState({...state,lastActiveDate:'2026-10-20'});useProgress.getState().addXP(5);assert.ok(useProgress.getState().legacyActiveDays.includes('2026-10-18'));assert.equal(activityDays(useProgress.getState())['2026-10-18'].count,0);
});

test('weekly evidence uses local Monday and counts each dated reward once',()=>{
 const {weeklyEvidence,localWeekStart}=require('../src/lib/weeklyProgress.ts');assert.equal(localWeekStart(new Date('2026-11-01T12:00:00')),'2026-10-26');
 const at='2026-11-02T12:00:00',state={events:[{kind:'lesson',source:'one',at,xp:20},{kind:'exercise',source:'two',at,xp:5}],lessons:{one:{completed:true,completedAt:at,xpEarned:20}},quizResults:{'band4-5':[{takenAt:at,xpEarned:8}]}};
 assert.deepEqual(weeklyEvidence(state,new Date(at)),{week:'2026-11-02',xp:33,lessons:1});state.events.push({kind:'quiz',source:'band4-5',at,xp:8});assert.equal(weeklyEvidence(state,new Date(at)).xp,33);
 assert.equal(weeklyEvidence(state,new Date('2026-11-09T12:00:00')).xp,0);
});
test('weekly goal reconciliation backfills known XP, preserves old credit and never awards it twice',()=>{
 const {useGoals}=require('../src/store/useGoals.ts'),{localWeekStart}=require('../src/lib/weeklyProgress.ts');const at=new Date().toISOString();
 const state={events:[{kind:'exercise',source:'one',at,xp:75}],lessons:{},quizResults:{}};
 useGoals.setState({weekStart:localWeekStart(),xpThisWeek:0,lessonsThisWeek:0,evidenceXp:null,evidenceLessons:null});
 useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,75);useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,75);
 useGoals.setState({xpThisWeek:200,evidenceXp:null});useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,200,'earlier saved goal credit is retained');
 state.events.push({kind:'practice',source:'two',at,xp:10});useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,210);useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,210);
 useGoals.setState({weekStart:'1999-01-04'});useGoals.getState().syncProgress(state);assert.equal(useGoals.getState().xpThisWeek,85,'an earlier week does not inflate the current one');
});

test('the weekly report shows recorded daily XP, including zero for an empty history',()=>{
 const {weeklyXPDays}=require('../src/lib/weeklyProgress.ts'),now=new Date('2026-11-02T12:00:00');const empty={events:[],lessons:{},quizResults:{}};
 const blank=weeklyXPDays(empty,now);assert.deepEqual(blank.map(d=>d.xp),[0,0,0,0,0,0,0]);assert.deepEqual(blank.map(d=>d.label),['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
 const days=weeklyXPDays({...empty,events:[{kind:'exercise',source:'daily',at:'2026-11-02T10:00:00',xp:70},{kind:'practice',source:'drill',at:'2026-11-02T11:00:00',xp:5}]},now);assert.equal(days[0].xp,75);assert.equal(days[0].day,'2026-11-02');assert.equal(days.reduce((sum,d)=>sum+d.xp,0),75);
});
