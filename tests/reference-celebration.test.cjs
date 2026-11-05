require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const before=require('./fixtures/reference-reading-before.json');
const {GRAMMAR_FOUNDATIONS}=require('../src/data/grammar-foundations.ts'),{GRAMMAR_EXTENSIONS}=require('../src/data/grammar-extensions.ts');
const {GrammarFoundationLesson}=require('../src/components/learn/GrammarFoundationLesson.tsx'),{EssentialVocabularyTopic}=require('../src/components/learn/EssentialVocabulary.tsx'),{ESSENTIAL_VOCABULARY}=require('../src/data/essential-vocabulary.ts');
const {useProgress}=require('../src/store/useProgress.ts'),{useAchievements}=require('../src/store/useAchievements.ts'),{useVocabulary}=require('../src/store/useVocabulary.ts'),{useErrors}=require('../src/store/useErrors.ts');
const {learningCelebrations,subscribeLearningCelebrations}=require('../src/lib/celebrations.ts');
const tick=()=>new Promise(resolve=>setTimeout(resolve,15));

test('reference lessons retain every explanation, example, diagram and source while removing exercises',()=>{
 const lessons=[...GRAMMAR_FOUNDATIONS,...GRAMMAR_EXTENSIONS];assert.deepEqual(JSON.parse(JSON.stringify(lessons)),before.grammar);
 for(const lesson of lessons){const html=renderToStaticMarkup(React.createElement(GrammarFoundationLesson,{lesson}));assert.ok(!/<fieldset|<button|Check your understanding|Complete lesson| XP/.test(html),lesson.id);assert.ok(html.includes('Further reading'));}
 for(const topic of ESSENTIAL_VOCABULARY){const html=renderToStaticMarkup(React.createElement(EssentialVocabularyTopic,{topic}));assert.ok(!/ XP|Mark topic studied|camp-reference-completion/.test(html),topic.id);assert.ok(html.includes('Save to My Bank'));}
});
test('a badge can celebrate without a level change, and simultaneous awards share one level milestone',()=>{
 assert.equal(learningCelebrations(20,20,['vocab-10'])[0].achievementId,'vocab-10');
 const events=learningCelebrations(90,100,['xp-100','xp-100','unknown']);assert.equal(events.length,1);assert.equal(events[0].level,2);assert.equal(events[0].levelUp,true);
 assert.deepEqual(learningCelebrations(100,100,[]),[]);assert.deepEqual(learningCelebrations(100,20,[]),[]);
});
test('automatic celebrations observe actual XP and word awards once, and do not replay on subscription or learner changes',async()=>{
 const stores=[useProgress,useAchievements,useVocabulary,useErrors],saved=stores.map(store=>store.getState());let stop;
 try{
  useProgress.setState({xp:0,streak:0,lessons:{},exercisesDone:{},quizResults:{},events:[]});useAchievements.setState({unlocked:{},newlyUnlocked:[]});useVocabulary.setState({words:{}});useErrors.setState({errors:[]});
  const earned=[];stop=subscribeLearningCelebrations(events=>earned.push(...events));await tick();assert.equal(earned.length,0);
  useProgress.getState().completeExercise('qa-first',10);await tick();assert.deepEqual(earned.map(item=>item.achievementId),['first-login']);
  useProgress.getState().completeExercise('qa-first',10);await tick();assert.equal(earned.length,1);
  for(let i=0;i<10;i++)useVocabulary.getState().addWord('word'+String.fromCharCode(97+i),'meaning'+i,'Test');await tick();assert.equal(earned.filter(item=>item.achievementId==='vocab-10').length,1);
  // Dismissing a notification preserves the earned badge and never creates another.
  useAchievements.getState().dismissNew('vocab-10');await tick();assert.ok(useAchievements.getState().unlocked['vocab-10']);assert.equal(earned.length,2);
  stop();stop=subscribeLearningCelebrations(events=>earned.push(...events));await tick();assert.equal(earned.length,2);
  stop();stop=undefined;useProgress.getState().addXP(90);await tick();assert.equal(earned.length,2,'unsubscribed learner receives no event');
 }finally{stop?.();stores.forEach((store,i)=>store.setState(saved[i],true));}
});
