require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDIOMS}=require('../src/data/redewendungen.ts');
const {idiomRounds,idiomMatches}=require('../src/lib/idiomMatch.ts');
const {VERBS}=require('../src/data/conjugaise.ts');
const {VERB_TENSES,conjugatedForm,acceptedConjugations,matchesConjugation,continuousPracticeAllowed}=require('../src/lib/verbTenses.ts');
const {GRAMMAR_SECTIONS}=require('../src/data/grammar-cheat-sheet.ts');
const {GRAMMAR_SUPPORT}=require('../src/data/grammar-support.ts');
const {SHADOW_LESSONS,SHADOW_LEVELS,shadowLessonKind}=require('../src/data/shadowing.ts');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {PronounQuestion}=require('../src/components/learn/CaseTrainer.tsx');

test('a pronoun question does not reveal the missing word or play its completed sentence before an answer',()=>{
 const props={sentence:'To ___ should I address this formal inquiry?',word:'whom'};
 const before=renderToStaticMarkup(React.createElement(PronounQuestion,{...props,answered:false}));
 assert.ok(before.includes('To ___ should I address'));assert.ok(!before.includes('whom'));assert.ok(!before.includes('<button'));
 const after=renderToStaticMarkup(React.createElement(PronounQuestion,{...props,answered:true}));assert.ok(after.includes('<button'));assert.ok(after.includes('Play audio'));
});

test('idiom rounds always provide fifteen unique, matchable pairs without modifying the source bank',()=>{
 const original=JSON.stringify(IDIOMS);
 for(let run=0;run<100;run++){
  const rounds=idiomRounds();assert.equal(rounds.length,3);
  const all=rounds.flatMap(r=>r.pairs);assert.equal(new Set(all.map(p=>p.idiom)).size,15);assert.equal(new Set(all.map(p=>p.meaning.trim().toLowerCase())).size,15);
  for(const r of rounds){assert.equal(r.left.length,5);assert.equal(r.right.length,5);for(const p of r.pairs){assert.ok(r.left.includes(p));assert.ok(r.right.includes(p));assert.ok(idiomMatches(r.pairs,p.idiom,p.idiom));assert.ok(!idiomMatches(r.pairs,p.idiom,r.pairs.find(x=>x!==p).idiom));}assert.ok(!idiomMatches(r.pairs,'missing','missing'));}
 }
 assert.equal(JSON.stringify(IDIOMS),original);
});

test('all twelve tense forms use correct subject agreement and irregular verb parts',()=>{
 const go=VERBS.find(v=>v.infinitive==='go'),be=VERBS.find(v=>v.infinitive==='be');
 assert.equal(VERB_TENSES.length,12);
 const expected=['goes','is going','went','was going','has gone','has been going','had gone','had been going','will go','will be going','will have gone','will have been going'];
 VERB_TENSES.forEach((t,i)=>assert.equal(conjugatedForm(go,t.id,2),expected[i]));
 assert.deepEqual([0,1,2,3,4].map(i=>conjugatedForm(be,'present',i)),['am','are','is','are','are']);
 assert.deepEqual([0,1,2,3,4].map(i=>conjugatedForm(be,'past',i)),['was','were','was','were','were']);
 for(const verb of VERBS)for(const tense of VERB_TENSES)for(let subject=0;subject<5;subject++){const form=conjugatedForm(verb,tense.id,subject);assert.ok(form&&!form.includes('undefined'));assert.ok(matchesConjugation(acceptedConjugations(form)[0],form));}
});

test('conjugation accepts British and American alternatives and excludes contextless stative continuous drills',()=>{
 const get=VERBS.find(v=>v.infinitive==='get'),learn=VERBS.find(v=>v.infinitive==='learn');
 assert.ok(matchesConjugation('has got',conjugatedForm(get,'perfect',2)));assert.ok(matchesConjugation('has gotten',conjugatedForm(get,'perfect',2)));
 assert.ok(matchesConjugation('  LEARNT ',conjugatedForm(learn,'past',0)));assert.ok(matchesConjugation('learned',conjugatedForm(learn,'past',0)));assert.ok(!matchesConjugation('learn',conjugatedForm(learn,'past',0)));
 for(const word of ['know','like','want','be','have']){const verb=VERBS.find(v=>v.infinitive===word);if(verb)assert.equal(continuousPracticeAllowed(verb),false,word);}
 assert.ok(continuousPracticeAllowed(VERBS.find(v=>v.infinitive==='run')));
});

test('each grammar cheat-sheet section has a substantial Arabic concept explanation',()=>{
 for(const section of GRAMMAR_SECTIONS){assert.ok(GRAMMAR_SUPPORT[section.id],section.id);assert.ok(GRAMMAR_SUPPORT[section.id].length>120,section.id);assert.match(GRAMMAR_SUPPORT[section.id],/[\u0600-\u06ff]/);}
});

test('shadowing now prioritises communication rather than exam teaching or CEFR selectors',()=>{
 assert.equal(SHADOW_LESSONS.length,14);for(const lesson of SHADOW_LESSONS){assert.ok(lesson.sourceDuration>0&&lesson.sourceDuration<120);assert.equal(shadowLessonKind(lesson),'conversation');assert.ok(!lesson.track);assert.ok(lesson.lines.length>=4);assert.ok(lesson.lines.every(l=>l.speaker));assert.ok(new Set(lesson.lines.map(l=>l.speaker)).size>=2);}
});
