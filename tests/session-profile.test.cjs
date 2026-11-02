require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const {PROFILE_KEY,SIGN_IN_COUNT_KEY,FRUITS,profileTag,createSessionProfile,readSessionProfile,saveSessionProfile,clearSessionProfile}=require('../src/lib/sessionProfile.ts');
function memory(){const map=new Map([['englishcamp-progress','learner-progress']]);return {map,getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}

test('local sign-in uses only the name, random fruit and a tab-local sign-in number',()=>{
 for(let i=0;i<FRUITS.length;i++){
  const p=createSessionProfile('  Mira   Ali  ','7',i/FRUITS.length);assert.deepEqual(p,{version:1,name:'Mira Ali',fruit:FRUITS[i],number:8});assert.equal(profileTag(p),'#miraali-0008');
 }
 assert.equal(profileTag(createSessionProfile('ليلى',null,0)),'#ليلى-0001');
 assert.equal(createSessionProfile('Mira','bad',1).number,1);
 assert.throws(()=>createSessionProfile('   ',null,0),/Enter a name/);
 assert.throws(()=>createSessionProfile('a'.repeat(41),null,0),/Enter a name/);
});

test('profile restoration and sign-out keep existing progress intact and count the next sign-in',()=>{
 const tab=memory(),first=createSessionProfile('Mira',tab.getItem(SIGN_IN_COUNT_KEY),.5);saveSessionProfile(tab,first);
 assert.deepEqual(readSessionProfile(tab),first);assert.equal(tab.getItem('englishcamp-progress'),'learner-progress');
 clearSessionProfile(tab);assert.equal(readSessionProfile(tab),null);assert.equal(tab.getItem('englishcamp-progress'),'learner-progress');
 assert.equal(createSessionProfile('Alex',tab.getItem(SIGN_IN_COUNT_KEY),0).number,2);
 assert.deepEqual([...tab.map.keys()].sort(),['englishcamp-progress',SIGN_IN_COUNT_KEY].sort());
 assert.equal(readSessionProfile(memory()),null,'a new tab has no profile');
});

test('malformed or unavailable session storage never crashes restoration',()=>{
 const tab=memory();for(const value of ['{','null','{"version":1,"name":"Mira","fruit":"remote-url","number":1}','{"version":1,"name":"Mira","fruit":"apple","number":-1}']){tab.setItem(PROFILE_KEY,value);assert.equal(readSessionProfile(tab),null);}
 assert.equal(readSessionProfile({getItem(){throw Error('denied')}}),null);
});

test('matching drill server markup stays stable before browser-only shuffling',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const {Matching}=require('../src/components/exercises/Matching.tsx');
 const props={data:{id:'render-check',xpReward:10,pairs:[['one','first'],['two','second'],['three','third'],['four','fourth']]}};
 const render=()=>renderToStaticMarkup(React.createElement(Matching,props)),first=render();
 for(let i=0;i<5;i++)assert.equal(render(),first);
 for(const pair of props.data.pairs)for(const label of pair)assert.ok(first.includes(label));
});
