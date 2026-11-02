require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {courseCatalogue}=require('../src/data/course-catalogue.ts');
const {courseEnrichment}=require('../src/data/course-enrichment/index.ts');
const {organiseLessonNotes}=require('../src/lib/lessonNotes.ts');
const {useNotes}=require('../src/store/useNotes.ts');
const {useProgress}=require('../src/store/useProgress.ts');
const {CourseVideoLesson}=require('../src/components/course/CourseVideoLesson.tsx');
const {SelectField}=require('../src/components/ui/shadcn/select-field.tsx');
const htmlText=value=>renderToStaticMarkup(React.createElement('span',null,value)).replace(/^<span>|<\/span>$/g,'');

test('lesson notes group by course and module, remain searchable and retain unknown legacy lessons',()=>{
 const first=courseCatalogue[0].lessons[0],second=courseCatalogue[0].lessons[1],last=courseCatalogue[1].lessons[0];
 const notes={[last.id]:'Academic note',[second.id]:'Word families',[first.id]:'Cloze rule','old-lesson-id':'Legacy note','empty':'  '};
 const result=organiseLessonNotes(notes,courseCatalogue);
 assert.deepEqual(result.map(x=>x.lessonId),[first.id,second.id,last.id,'old-lesson-id']);
 assert.equal(result[1].title,second.title);assert.equal(result[1].text,'Word families');
 assert.equal(result[3].courseTitle,'Other saved lessons');assert.equal(result[3].href,undefined);
 assert.deepEqual(organiseLessonNotes(notes,courseCatalogue,'FAMILIES').map(x=>x.lessonId),[second.id]);
 assert.ok(result[0].href.includes('/lessons/'+first.id));assert.equal(notes[second.id],'Word families');
});

test('saving and editing lesson notes preserves bookmarks, other notes and learning XP',()=>{
 const beforeXP=useProgress.getState().xp;
 useNotes.getState().setNote('existing','Keep this note');useNotes.getState().toggleBookmark('existing');
 useNotes.getState().setNote('new-lesson','First version');useNotes.getState().setNote('new-lesson','Revised version');
 assert.equal(useNotes.getState().getNote('existing'),'Keep this note');assert.equal(useNotes.getState().getNote('new-lesson'),'Revised version');
 assert.equal(useNotes.getState().isBookmarked('existing'),true);assert.equal(useProgress.getState().xp,beforeXP);
 const saved=JSON.parse(localStorage.getItem('englishcamp-notes'));assert.equal(saved.state.notes['new-lesson'],'Revised version');
});

test('all 100 lesson videos expose their own authored rule, example and interpretation beneath the player',()=>{
 const entries=Object.entries(courseEnrichment);assert.equal(entries.length,100);
 for(const[id,entry]of entries){
  assert.ok(entry.video&&entry.principle,id);
  const html=renderToStaticMarkup(React.createElement(CourseVideoLesson,{video:entry.video,principle:entry.principle}));
  const frameEnd=html.indexOf('camp-video-caption'),recap=html.indexOf('camp-video-recap');assert.ok(recap>frameEnd,id+' recap below player');
  for(const field of ['statement','example','interpretation'])assert.ok(html.includes(htmlText(entry.principle[field])),id+' '+field);
  assert.ok(!html.includes('<iframe'),id+' third party still opt-in');
 }
});

test('violet selectors preserve selected labels, controlled values and disabled empty placeholders during SSR',()=>{
 const options=[React.createElement('option',{value:'',disabled:true,key:'empty'},'Choose…'),React.createElement('option',{value:'a',key:'a'},'First lesson'),React.createElement('option',{value:'b',key:'b'},'Second lesson')];
 for(const[value,label]of [['','Choose…'],['a','First lesson'],['b','Second lesson']]){
  const html=renderToStaticMarkup(React.createElement(SelectField,{value,'aria-label':'Lesson selector'},options));
  assert.ok(html.includes('role="combobox"'));assert.ok(html.includes(label));assert.ok(html.includes('aria-label="Lesson selector"'));
 }
});
