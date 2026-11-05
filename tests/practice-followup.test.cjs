require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {catalogue,literalBanks,audit}=require('../scripts/audit-practice-inventory.cjs');
const {maskPracticeTarget,questionWordAnswers}=require('../src/lib/practiceQuestions.ts');
const {SHADOW_LESSONS,shadowTimedCues}=require('../src/data/shadowing.ts'),{EVERYDAY_SHADOW_LESSONS:added}=require('../src/data/shadowing-everyday.ts');
const {useProgress}=require('../src/store/useProgress.ts'),{shadowLineId,shadowLessonId,recordShadowPractice,shadowPracticeProgress}=require('../src/lib/shadowProgress.ts');
function textWithoutChoices(html){return html.replace(/<button\b[\s\S]*?<\/button>/g,'').replace(/<[^>]+>/g,' ').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();}
function renderQuestion(file,name,item,index=0,direction){
 const original=React.useState;let injected=false,numeric=false,started=false;
 React.useState=initial=>{let value=typeof initial==='function'?initial():initial;if(!injected&&Array.isArray(value)){injected=true;return original([item]);}if(!numeric&&typeof value==='number'){numeric=true;return original(injected?0:index);}if(file==='TimedChallenge.tsx'&&!started&&value===false){started=true;return original(true);}if(value==='ready')return original('playing');if(direction&&value==='sentence')return original(direction);return original(value);};
 try{return renderToStaticMarkup(React.createElement(require('../src/components/learn/'+file)[name]));}finally{React.useState=original;}
}
test('the audit maps all 80 remaining catalogue entries to existing components and extracts the remaining literal banks',()=>{
 assert.equal(catalogue().length,80);for(const item of catalogue()){assert.ok(item.file,item.id);assert.ok(item.exportName,item.id);assert.ok(fs.existsSync(require.resolve('../src/components/learn/'+item.file)));}assert.equal(audit.literalQuestions,348);
});
test('literal-bank questions do not print completed responses or explanations before a choice',()=>{
 let checked=0;for(const entry of catalogue())for(const bank of literalBanks(entry.file))for(let index=0;index<bank.items.length;index++){
  const item=bank.items[index],answer=typeof item.correct==='number'?item.options[item.correct]:item.correct??item.answer;
  const html=renderQuestion(entry.file,entry.exportName,item,index),visible=textWithoutChoices(html).replace('Prepositions with Pronouns','').replace('Complete with the correct preposition','');
  assert.ok(html.includes('data-practice-surface="question"'),entry.file+' rendered no question');
  if(item.explanation)assert.ok(!visible.includes(item.explanation),entry.file+': premature explanation');
  const necessaryRepeatedArticle=entry.id==='sub-clauses'&&answer==='the';
  if(typeof answer==='string'&&answer.length>=3&&!necessaryRepeatedArticle)assert.ok(!new RegExp('(^|[^a-z])'+answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'($|[^a-z])','i').test(visible),entry.file+': '+answer+' in '+visible);
  assert.equal(new Set(item.options).size,item.options.length,entry.file+': duplicate choices');checked++;
 }assert.equal(checked,348);
});
test('discourse-marker exercises hide the missing marker and explanations in sentence and Arabic modes',()=>{
 const {DISCOURSE_MARKERS}=require('../src/data/modalpartikel.ts');
 for(const data of DISCOURSE_MARKERS){const item={particle:data.marker,meaning:data.meaning,usage:data.function,sentence:data.example,sentenceEn:data.exampleEn,ar:data.arabic};assert.ok(!new RegExp('\\b'+data.marker+'\\b','i').test(maskPracticeTarget(data.example,data.marker)));for(const direction of ['sentence','ar']){const text=textWithoutChoices(renderQuestion('ModalpartikelUebersetzer.tsx','ModalpartikelUebersetzer',item,0,direction));assert.ok(!text.toLowerCase().includes(data.marker.toLowerCase()),data.marker);assert.ok(!text.includes(data.exampleEn));}}
 assert.ok(questionWordAnswers({correct:'Who',question:'___ did you see?'}).includes('Whom'));
});
test('five new human conversations have verified short sources, unique videos and valid caption boundaries',()=>{
 assert.equal(added.length,5);assert.equal(SHADOW_LESSONS.length,14);assert.equal(new Set(SHADOW_LESSONS.map(s=>s.videoId)).size,14);
 const verified=require('./fixtures/shadowing-everyday-sources.json');for(const lesson of added){const source=verified.find(s=>s.videoId===lesson.videoId);assert.ok(source);assert.equal(lesson.sourceDuration,source.duration);assert.ok(source.duration<=120);assert.ok(source.embeddable);assert.ok(lesson.sourceUrl.startsWith('https://learningenglish.voanews.com/'));assert.ok(new Set(lesson.lines.map(l=>l.speaker)).size>=2);for(const cue of shadowTimedCues(lesson))assert.ok(cue.end<=source.duration&&cue.end>cue.start);}
});
test('shadowing lines and conversation completion update existing progress once and retain earlier learning',()=>{
 const before=useProgress.getState(),lesson=added[0];useProgress.setState({xp:30,events:[],exercisesDone:{'old-exercise':true},lessons:{kept:{completed:true,xpEarned:30,attempts:1}},modules:{}});
 try{for(let i=0;i<lesson.lines.length;i++)recordShadowPractice(lesson,i,useProgress.getState().exercisesDone,useProgress.getState().completeExercise);const state=useProgress.getState();assert.equal(state.xp,30+lesson.lines.length*2+10);assert.equal(shadowPracticeProgress(lesson,state.exercisesDone).lines,lesson.lines.length);assert.ok(state.exercisesDone[shadowLessonId(lesson.id)]);assert.ok(state.exercisesDone[shadowLineId(lesson.id,0)]);assert.ok(state.exercisesDone['old-exercise']);assert.ok(state.lessons.kept.completed);assert.deepEqual(state.modules,{});assert.equal(recordShadowPractice(lesson,0,state.exercisesDone,state.completeExercise),0);assert.equal(state.events.length,lesson.lines.length+1);}finally{useProgress.setState(before,true);}
});
test('saved-word practice needs distinct meanings, hides the written answer and keeps existing notes and mastery',()=>{
 const {useVocabulary}=require('../src/store/useVocabulary.ts'),{VocabularyPractice}=require('../src/components/learn/VocabularyPractice.tsx'),before=useVocabulary.getState();
 const word=(de,en)=>({de,en,category:'Test',notes:'Keep my note',addedAt:'2026-11-01',timesReviewed:3,lastReview:null,mastery:2});
 try{useVocabulary.setState({words:{apple:word('apple','تفاحة')}});let html=renderToStaticMarkup(React.createElement(VocabularyPractice,{mode:'quiz',showModeSwitch:false}));assert.ok(html.includes('Add more words for a quiz'));
 useVocabulary.setState({words:{apple:word('apple','تفاحة'),book:word('book','كتاب'),cat:word('cat','قط'),house:word('house','منزل')}});html=renderToStaticMarkup(React.createElement(VocabularyPractice,{mode:'write',showModeSwitch:false}));assert.ok(!textWithoutChoices(html).includes('apple'));assert.ok(html.includes('تفاحة'));
 useVocabulary.getState().recordReview('apple');assert.equal(useVocabulary.getState().words.apple.timesReviewed,4);assert.equal(useVocabulary.getState().words.apple.mastery,2);assert.equal(useVocabulary.getState().words.apple.notes,'Keep my note');
 }finally{useVocabulary.setState(before,true);}
});
