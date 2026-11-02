require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {GRAMMAR_SECTIONS}=require('../src/data/grammar-cheat-sheet.ts');
const {GRAMMAR_ARABIC}=require('../src/data/grammar-cheat-sheet-ar.ts');
const {CheatSheetContent,cheatDisplayText}=require('../src/components/learn/CheatSheetContent.tsx');
const escaped=s=>renderToStaticMarkup(React.createElement('span',null,s)).slice(6,-7);

test('Arabic translations cover all 11 reference sections, 47 rules and 107 examples',()=>{
 assert.deepEqual(Object.keys(GRAMMAR_ARABIC).sort(),GRAMMAR_SECTIONS.map(s=>s.id).sort());
 let rules=0,examples=0;
 for(const section of GRAMMAR_SECTIONS){const arabic=GRAMMAR_ARABIC[section.id];assert.match(arabic.title,/[\u0600-\u06ff]/);assert.equal(arabic.content.length,section.content.length);
 for(const[itemIndex,item]of section.content.entries()){const translation=arabic.content[itemIndex];rules++;examples+=item.examples.length;
 assert.match(translation.title,/[\u0600-\u06ff]/);assert.match(translation.formation,/[\u0600-\u06ff]/);assert.equal(translation.examples.length,item.examples.length);assert.equal(translation.notes?.length||0,item.notes?.length||0);
 for(const text of [...translation.examples,...translation.notes||[]])assert.match(text,/[\u0600-\u06ff]/,`${section.id}:${itemIndex}`);
 }}assert.equal(rules,47);assert.equal(examples,107);
});

test('English remains visible and Arabic appears only when requested, including examples and notes',()=>{
 for(const section of GRAMMAR_SECTIONS){const hidden=renderToStaticMarkup(React.createElement(CheatSheetContent,{section,showArabic:false}));const shown=renderToStaticMarkup(React.createElement(CheatSheetContent,{section,showArabic:true}));assert.ok(!hidden.includes('lang="ar"'));
 for(const[i,item]of section.content.entries()){for(const text of [item.title,item.formation,...item.examples.map(e=>e.en),...item.notes||[]]){const expected=escaped(cheatDisplayText(text));assert.ok(hidden.includes(expected),text);assert.ok(shown.includes(expected),text);}
 const translation=GRAMMAR_ARABIC[section.id].content[i];for(const text of [translation.title,translation.formation,...translation.examples,...translation.notes||[]])assert.ok(shown.includes(escaped(cheatDisplayText(text))),text);
 }assert.ok(!hidden.includes('—'));assert.ok(!shown.includes('—'));assert.ok(shown.includes('dir="rtl"'));
 }
});
