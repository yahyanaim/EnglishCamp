require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {SECTIONS}=require('../src/components/learn/GrammarReference.tsx');
const {grammarParagraphText,translatedGrammarParagraphs}=require('../src/components/learn/GrammarTranslation.tsx');
const {GRAMMAR_PARAGRAPH_TRANSLATIONS,grammarTranslationKey}=require('../src/data/grammar-paragraph-translations.ts');
const {ORIGINAL_SHADOW_LESSONS,SHADOW_LESSONS,shadowTimedCues}=require('../src/data/shadowing.ts');
const {shadowCueAt,shadowClipBounds}=require('../src/lib/shadowTimeline.ts');
const {ESSENTIAL_VOCABULARY}=require('../src/data/essential-vocabulary.ts');
const {EssentialVocabularyTopic}=require('../src/components/learn/EssentialVocabulary.tsx');
const originals=require('./fixtures/shadowing-original-lessons.json');

test('every grammar paragraph and standalone tip has Arabic on demand while English stays visible',()=>{
 let count=0;function walk(node){React.Children.forEach(node,child=>{if(!React.isValidElement(child))return;const cls=child.props.className||'';if(child.type==='p'||(cls.includes('camp-grammar-note')&&!React.Children.toArray(child.props.children).some(c=>React.isValidElement(c)&&['p','h4'].includes(c.type)))){const text=grammarTranslationKey(grammarParagraphText(child));assert.match(GRAMMAR_PARAGRAPH_TRANSLATIONS[text],/[\u0600-\u06ff]/,text);const html=renderToStaticMarkup(translatedGrammarParagraphs(child));assert.ok(html.includes('camp-grammar-translation-trigger'));assert.ok(html.includes('tabindex="0"'));assert.ok(!html.includes('lang="ar"'));count++;}else walk(child.props.children);});}
 for(const section of SECTIONS)walk(section.content);assert.equal(count,38);assert.equal(Object.keys(GRAMMAR_PARAGRAPH_TRANSLATIONS).length,38);
});

test('the original source bank is preserved while the visible playlist contains only short communication',()=>{
 const expected=structuredClone(originals);expected.find(l=>l.id==='obvious-choice').lines[3].text='Well, what if David has a twin brother who lives with him?';assert.deepEqual(ORIGINAL_SHADOW_LESSONS,expected);assert.equal(SHADOW_LESSONS.length,14);
 for(const lesson of SHADOW_LESSONS){assert.match(lesson.videoId,/^[\w-]{11}$/);assert.ok(lesson.sourceDuration<120);assert.equal(lesson.kind,'conversation');assert.ok(!lesson.track);assert.ok(new Set(lesson.lines.map(l=>l.speaker)).size>=2);assert.equal(lesson.clipEnd-lesson.clipStart,lesson.duration);for(const line of lesson.lines)assert.match(line.ar,/[\u0600-\u06ff]/);}
 const source=require('fs').readFileSync(require('path').join(__dirname,'../src/app/shadowing-english/page.tsx'),'utf8');assert.ok(!source.includes('Video collection'));assert.ok(!source.includes('Exam skill'));
});

test('video captions select the correct sentence at boundaries, hide during gaps and reject invalid times',()=>{
 const cues=[{start:62,end:65},{start:65,end:66},{start:70,end:72}];
 for(const[t,index]of [[0,-1],[61.9,-1],[62,0],[64.99,0],[65,1],[66,-1],[69.9,-1],[70,2],[72,-1],[NaN,-1],[Infinity,-1]])assert.equal(shadowCueAt(cues,t),index,String(t));
 assert.deepEqual(shadowClipBounds(cues,999),{start:62,end:72});assert.equal(shadowCueAt([],5),-1);assert.deepEqual(shadowClipBounds([],29),{start:0,end:29});
});

test('all twenty-three everyday vocabulary topics have meanings, contextual examples and semantic diagrams',()=>{
 assert.deepEqual(ESSENTIAL_VOCABULARY.slice(0,10).map(t=>t.id),['body','colors','home','family','cafe','office','airport','clothes','time','months']);assert.equal(ESSENTIAL_VOCABULARY.length,23);let count=0;
 for(const topic of ESSENTIAL_VOCABULARY){assert.ok(topic.intro.length>50);assert.ok(topic.words.length>=7);const html=renderToStaticMarkup(React.createElement(EssentialVocabularyTopic,{topic}));assert.equal((html.match(/<figure/g)||[]).length,topic.words.length);assert.equal((html.match(/class="camp-essential-art"/g)||[]).length,topic.words.length);assert.ok(!html.includes('undefined'));for(const word of topic.words){assert.match(word.ar,/[\u0600-\u06ff]/);assert.ok(word.example.length>10);assert.ok(word.art);count++;}}
 assert.equal(count,267);assert.deepEqual(ESSENTIAL_VOCABULARY.find(t=>t.id==='months').words.map(w=>w.value),Array.from({length:12},(_,i)=>String(i+1)));
});


test('every visible dialogue line has an ordered cue within the source video and keeps its identity',()=>{
 for(const lesson of SHADOW_LESSONS){const cues=shadowTimedCues(lesson);assert.equal(cues.length,lesson.lines.length);for(let i=0;i<cues.length;i++){const cue=cues[i];assert.ok(cue.start>=lesson.clipStart&&cue.end>cue.start&&cue.end<=lesson.sourceDuration,lesson.id);assert.equal(cue.line,i);if(i)assert.ok(cues[i-1].end<=cue.start,lesson.id);assert.equal(shadowCueAt(cues,(cue.start+cue.end)/2),i);}}
});

test('paired linking expressions stay in one LTR isolate inside Arabic explanations',()=>{
 const {ArabicText}=require('../src/components/ui/ArabicText.tsx');
 const html=renderToStaticMarkup(React.createElement(ArabicText,{text:'تُستخدم so...that وsuch...that للتعبير عن النتيجة.'}));
 assert.ok(html.includes('<bdi dir="ltr">so...that</bdi>'));assert.ok(html.includes('<bdi dir="ltr">such...that</bdi>'));assert.ok(html.includes('dir="rtl"'));
});

test('all illustrated words share one collapsed Words category with retained topic anchors',()=>{
 const fs=require('fs'),path=require('path'),page=fs.readFileSync(path.join(__dirname,'../src/app/grammar/cheat-sheet/page.tsx'),'utf8'),words=fs.readFileSync(path.join(__dirname,'../src/components/learn/WordsLesson.tsx'),'utf8');assert.ok(page.includes('id="words"'));assert.ok(page.includes('<WordsLesson/>'));assert.ok(!page.includes('ESSENTIAL_VOCABULARY.map'));assert.ok(words.includes('vocabulary-${topic.id}'));assert.ok(page.includes('open.words??false'));assert.ok(page.includes('printing||'));assert.ok(page.includes("startsWith('#vocabulary-')"));
});
