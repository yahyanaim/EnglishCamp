require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {bank,audit}=require('../scripts/audit-practice.cjs'),{prefixStem,relativeAnswers,modalAnswers}=require('../src/lib/practiceQuestions.ts');
const {GRAMMAR_EXTENSIONS:G}=require('../src/data/grammar-extensions.ts'),{ESSENTIAL_VOCABULARY:V}=require('../src/data/essential-vocabulary.ts'),{COUNTRY_FAMILIES}=require('../src/data/essential-geography.ts');
const {referenceStudyId,referenceSnapshot,referenceForHref,REFERENCE_STUDIES}=require('../src/lib/referenceProgress.ts'),{useProgress}=require('../src/store/useProgress.ts'),{activityDays}=require('../src/lib/learningActivity.ts'),{weeklyEvidence}=require('../src/lib/weeklyProgress.ts');
const {weeklyStudyResource,buildStudySessions,studyCalendar}=require('../src/lib/studyPlanner.ts');
function questionHTML(file,exportName,item){const original=React.useState;let injected=false;React.useState=initial=>{if(!injected&&Array.isArray(initial)&&!initial.length){injected=true;return original([item]);}return original(initial);};try{const Component=require('../src/components/learn/'+file)[exportName];return renderToStaticMarkup(React.createElement(Component));}finally{React.useState=original;}}
const visibleWithoutChoices=html=>html.replace(/<button\b[\s\S]*?<\/button>/g,'').replace(/<[^>]+>/g,' ').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();

test('completed Word Order, Negation and Linking Ideas sentences are absent before an answer across every reviewed round',()=>{
 for(const [file,name,variable,answer]of [['WordOrderTrainer.tsx','WordOrderTrainer','WO','correct'],['NegationTrainer.tsx','NegationTrainer','NEG','en'],['CoordinatingConjunctionsTrainer.tsx','CoordinatingConjunctionsTrainer','ITEMS','en']]){
  for(const item of bank(file,variable)){const html=questionHTML(file,name,item);assert.ok(!visibleWithoutChoices(html).includes(item[answer]),file+': '+item[answer]);}
 }
});
test('prefix stems conceal their prefixes and modal prompts use meanings while accepting suitable equivalents',()=>{
 for(const item of bank('PrefixVerbsTrainer.tsx','ITEMS')){const stem=prefixStem(item.verb,item.prefix);assert.notEqual(stem,item.verb);assert.equal(item.prefix.replace(/-$/,'')+stem,item.verb);const text=visibleWithoutChoices(questionHTML('PrefixVerbsTrainer.tsx','PrefixVerbsTrainer',item));assert.ok(!text.includes('___'+item.verb));}
 for(const item of bank('ModalVerbsTrainer.tsx','MODALS')){const text=visibleWithoutChoices(questionHTML('ModalVerbsTrainer.tsx','ModalVerbsTrainer',item));assert.ok(!new RegExp('\\b'+item.answer+'\\b','i').test(text),item.sentence);assert.ok(modalAnswers(item).includes(item.answer.toLowerCase()));}
 const permission=bank('ModalVerbsTrainer.tsx','MODALS').find(s=>s.answer==='May');assert.ok(modalAnswers(permission).includes('can'));assert.ok(modalAnswers(permission).includes('could'));
});
test('relative pronouns accept valid alternatives, and relative/possessive gaps keep their position and number',()=>{
 for(const item of bank('RelativeClausesTrainer.tsx','ITEMS')){assert.ok(relativeAnswers(item).includes(item.blank));const text=visibleWithoutChoices(questionHTML('RelativeClausesTrainer.tsx','RelativeClausesTrainer',item));assert.ok(text.includes(item.sentence));if(item.blank==='whom')assert.ok(relativeAnswers(item).includes('who'));}
 const city=bank('RelativeClausesTrainer.tsx','ITEMS').find(s=>s.sentence.startsWith('The city'));assert.deepEqual(relativeAnswers(city),['which','that']);
 for(const item of bank('GenitiveTrainer.tsx','ITEMS')){const text=visibleWithoutChoices(questionHTML('GenitiveTrainer.tsx','GenitiveTrainer',item));assert.equal((text.match(/___/g)||[]).length,1,item.sentence);}
});
test('preposition usage is labelled accurately and no React object is printed inside gap questions',()=>{
 for(const item of bank('PrepositionsTrainer.tsx','PREPOSITIONS')){const text=visibleWithoutChoices(questionHTML('PrepositionsTrainer.tsx','PrepositionsTrainer',item));assert.ok(text.includes('How is the preposition used'));assert.ok(!text.includes('Which case'));assert.ok(!text.includes(item.meaning));}
 for(const item of bank('PrepositionalContractionsTrainer.tsx','ITEMS')){const html=questionHTML('PrepositionalContractionsTrainer.tsx','EnglishContractionsTrainer',item);assert.ok(!html.includes('[object Object]'));}
 assert.equal(audit.reviewedTrainers,13);assert.equal(audit.reviewedItems,198);
});
test('phrasal particles are concealed and every generated verb-puzzle cell has a real subject-specific answer',()=>{
 for(const item of bank('SeparableVerbsTrainer.tsx','VERBS')){const text=visibleWithoutChoices(questionHTML('SeparableVerbsTrainer.tsx','SeparableVerbsTrainer',item));assert.ok(!text.includes(item.verb),item.verb);assert.ok(text.includes('___'));}
 assert.deepEqual(require('../src/lib/practiceQuestions.ts').phrasalParticles({verb:'fill in',particle:'in'}),['in','out']);
 const {verbPuzzleForms}=require('../src/lib/practiceQuestions.ts'),{VERBS}=require('../src/data/conjugaise.ts');for(const verb of VERBS)for(const tense of ['present','past']){const forms=verbPuzzleForms(verb,tense);assert.equal(forms.length,6);assert.ok(forms.every(form=>typeof form==='string'&&form.length>0));}
 const be=VERBS.find(v=>v.infinitive==='be');assert.deepEqual(verbPuzzleForms(be,'past'),['was','were','was','were','were','were']);assert.deepEqual(verbPuzzleForms(be,'present'),['am','are','is','are','are','are']);
 const puzzle=fs.readFileSync(require.resolve('../src/components/learn/VerbPuzzle.tsx'),'utf8');assert.ok(!puzzle.includes('{current.verb.thirdPerson}'));assert.ok(puzzle.includes('correct: forms[i]'));
});
test('tense questions have explicit labels, cover six patterns, and distinguish main have from perfect auxiliaries',()=>{
 const items=bank('TensesQuiz.tsx','TENSE_IDENTIFICATION_PRACTICE');assert.equal(items.length,30);assert.equal(new Set(items.map(i=>i.sentence)).size,30);assert.equal(new Set(items.map(i=>i.tense)).size,6);for(const item of items)assert.ok(item.explanation.length>40);
 assert.equal(items.find(i=>i.sentence==='We are having lunch at the moment.').tense,'Present Continuous');assert.equal(items.find(i=>i.sentence==='He has had three meetings today.').tense,'Present Perfect');assert.equal(items.find(i=>i.sentence==='They will have more time next week.').tense,'Future');
 const source=fs.readFileSync(require.resolve('../src/components/learn/TensesQuiz.tsx'),'utf8');assert.ok(!source.includes('function detectTense'));assert.ok(source.includes('{current.explanation}'));
});
test('six sourced extension lessons keep original examples and reference-only teaching',()=>{
 assert.equal(G.length,6);assert.equal(new Set(G.map(s=>s.id)).size,6);
 for(const lesson of G){assert.ok(lesson.source.href.startsWith('https://learnenglish.britishcouncil.org/'));assert.ok(lesson.content.length>=3);assert.ok(!('check' in lesson));}
});
test('new vocabulary pairs country names with nationality adjectives, with Arabic meanings and contextual examples',()=>{
 assert.equal(COUNTRY_FAMILIES.length,20);assert.equal(V.length,23);assert.equal(V.reduce((n,t)=>n+t.words.length,0),267);
 for(const topic of V.filter(s=>['countries','nationalities','languages'].includes(s.id))){assert.ok(topic.source.href.startsWith('https://dictionary.cambridge.org/'));for(const word of topic.words){assert.match(word.ar,/[\u0600-\u06ff]/);assert.ok(word.example.includes(word.en));assert.ok(word.value);}}
 assert.equal(V.find(t=>t.id==='countries').words.length,V.find(t=>t.id==='nationalities').words.length);assert.ok(V.find(t=>t.id==='weather').words.some(w=>w.en==='rainy season'));
});
test('earlier reference completion and XP remain readable without awarding anything new',()=>{
 const before=useProgress.getState();useProgress.setState({xp:25,exercisesDone:{[referenceStudyId('grammar',G[0].id)]:true,[referenceStudyId('words','countries')]:true,'old-exercise':true}});
 try{const state=useProgress.getState();assert.equal(referenceSnapshot(state.exercisesDone).grammar.done,1);assert.equal(referenceSnapshot(state.exercisesDone).words.done,1);assert.equal(state.xp,25);assert.ok(state.exercisesDone['old-exercise']);}finally{useProgress.setState(before,true);}
});
test('planning uses new grammar and word topics, skips studied references and exports the same planned resources',()=>{
 const item={title:'Grammar',href:'/grammar',domain:'grammar'},first=weeklyStudyResource(item,'B1',1),entry=referenceForHref(first.href);assert.ok(entry);const next=weeklyStudyResource(item,'B1',1,{[entry.id]:true});assert.notEqual(next.href,first.href);
 assert.ok(weeklyStudyResource({title:'Words',href:'/vocabulary',domain:'vocabulary'},'A2',1).href.includes('nationalities'));
 const examGrammar={title:'Exam grammar',href:'/levels/band5-6/lessons/band2-grammar-complex',domain:'grammar'};assert.equal(weeklyStudyResource(examGrammar,'B2',1).href,examGrammar.href);assert.ok(weeklyStudyResource(examGrammar,'B2',3).href.startsWith('/grammar#'));assert.ok(weeklyStudyResource(item,'A2',3).href.endsWith('#quantities-and-determiners'));
 const schedule={id:'qa-reference-plan',updatedAt:new Date().toISOString(),startDate:'2026-11-09',time:'18:00',days:[1,2,3,4,5],minutes:25,goal:'everyday',startingLevel:'B1',weeks:4},done={[entry.id]:true},sessions=buildStudySessions(schedule,'grammar',undefined,done),calendar=studyCalendar(schedule,'QA','grammar','https://camp.example',new Date(0),undefined,done);
 assert.ok(sessions.some(s=>s.resource.href.startsWith('/grammar#')));for(const session of sessions)assert.ok(calendar.includes(new URL(session.resource.href,'https://camp.example').href));assert.equal(new Set(REFERENCE_STUDIES.map(s=>s.id)).size,REFERENCE_STUDIES.length);
});
test('all 207 previously published word cards keep their IDs, translations, examples and drawings',()=>{
 const before=require('./fixtures/reference-vocabulary-before.json');assert.equal(before.reduce((n,t)=>n+t.words.length,0),207);
 for(const topic of before){const current=V.find(t=>t.id===topic.id);assert.ok(current);assert.equal(current.title,topic.title);assert.equal(current.intro,topic.intro);assert.deepEqual(JSON.parse(JSON.stringify(current.words.slice(0,topic.words.length))),topic.words);}
});
