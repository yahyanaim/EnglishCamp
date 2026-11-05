import { type PlacementLevel } from '@/data/placement/questions';
import { CEFR_LEVELS as PLACEMENT_LEVELS } from '@/data/placement/cefr';
import { LEVEL_STUDY_PLANS } from '@/data/level-study-plans';
import { LEVEL_PRACTICE } from '@/data/study-practice';
import { validStudySchedule, type StudySchedule, type StudyGoal, type StudyPriority, type StudyAdaptation } from './placement';
export type StudyResource={title:string;href:string;domain:StudyPriority};
const resource=(title:string,href:string,domain:StudyResource['domain']):StudyResource=>({title,href,domain});
const lesson=(course:string,id:string,title:string,domain:StudyResource['domain'])=>resource(title,`/levels/${course}/lessons/${id}`,domain);
const basics=[resource('Everyday words: people, home and daily life','/grammar/cheat-sheet#words','vocabulary'),resource('Simple sentences and questions','/grammar/cheat-sheet#sentence-structure','grammar'),resource('Present simple: forms and examples','/verb-conjugation','grammar'),resource('Position and movement words','/grammar/cheat-sheet#position-words','vocabulary'),resource('Read everyday words in short sentences','/grammar/cheat-sheet#words','reading'),resource('Listen to a short conversation','/conversation','listening'),resource('Repeat each speaker’s lines','/shadowing-english','speaking'),resource('Write a short personal message','/grammar/cheat-sheet#sentence-structure','writing')];
const foundation=[lesson('band4-5','band1-ielts-vs-toefl','Tense and aspect in context','grammar'),lesson('band4-5','band1-vocab-awl1','Collocations and word families','vocabulary'),lesson('band4-5','band1-reading-skimming','Main ideas and reading evidence','reading'),lesson('band4-5','band1-listening-format','Short listening extracts and detail','listening'),lesson('band4-5','band1-speaking-part1-intro','Developing interview answers','speaking'),lesson('band4-5','band1-writing-integrated','Letters and emails','writing')];
const goals:Record<StudyGoal,StudyResource[]>={
 everyday:[resource('Tenses: use, form and context','/verb-conjugation','grammar'),resource('Useful words and reading articles','/vocabulary','vocabulary'),resource('Read, listen and collect new words','/vocabulary','reading'),resource('Listening Lab: listen and check the evidence','/listening-lab','listening'),resource('Communication: shadow both speakers','/shadowing-english','speaking'),resource('Link ideas accurately','/linking-words','grammar')],
 ielts:[lesson('band5-6','band2-grammar-complex','IELTS: clauses, contrast and control','grammar'),lesson('band5-6','band2-vocab-collocations','IELTS: precise comparisons and collocations','vocabulary'),lesson('band5-6','band2-reading-tfng','IELTS: reading evidence and not given','reading'),lesson('band5-6','band2-listening-mcq','IELTS: listening details and corrections','listening'),lesson('band5-6','band2-speaking-cue-card','IELTS: developed answers and cue-card planning','speaking'),lesson('band5-6','band2-writing-opinion','IELTS: opinion and discussion essays','writing')],
 toefl:[lesson('band6-7','band3-writing-discussion','TOEFL: build accurate sentences','grammar'),lesson('band6-7','band3-vocab-awl3','TOEFL: word families and hedging','vocabulary'),lesson('band6-7','band3-reading-flowchart','TOEFL: academic passages and purpose','reading'),lesson('band6-7','band3-listening-multiple-speakers','TOEFL: conversations and implied decisions','listening'),lesson('band6-7','band3-speaking-opinions','TOEFL: relevant interview answers','speaking'),lesson('band6-7','band3-writing-maps-processes','TOEFL: purposeful emails','writing')],
 'b2-first':foundation,
};
export const studyGoalLabel:Record<StudyGoal,string>={everyday:'Everyday English',ielts:'IELTS Academic',toefl:'TOEFL iBT','b2-first':'B2 First'};
const levelResources:Record<PlacementLevel,StudyResource[]>={
 A1:basics,
 A2:[resource('Past events and useful questions','/simple-past','grammar'),resource('Travel, weather and everyday actions','/grammar/cheat-sheet#words','vocabulary'),resource('Read short examples and retell them','/grammar/cheat-sheet#words','reading'),resource('Listen to a hotel or travel exchange','/conversation','listening'),resource('Invite, clarify and make suggestions','/shadowing-english','speaking'),resource('Write a practical request','/useful-phrases','writing')],
 B1:[resource('Connect ideas and give reasons','/linking-words','grammar'),resource('Learn collocations from a familiar topic','/topic-vocabulary','vocabulary'),resource('Read one article paragraph at a time','/vocabulary','reading'),resource('Listen for the problem and the outcome','/conversation','listening'),resource('Retell an experience in connected speech','/shadowing-english','speaking'),resource('Develop a short opinion or recommendation','/useful-phrases','writing')],
 B2:goals.everyday,
 C2:[lesson('band7-8','band4-writing-grammatical-range','Refine complex language and eliminate ambiguity','grammar'),lesson('band7-8','band4-writing-lexical-resource','Precise meaning, register and nuance','vocabulary'),lesson('band7-8','band4-reading-writers-views','Interpret stance, irony and competing frames','reading'),lesson('band7-8','band4-listening-inference','Check implied meaning against the complete argument','listening'),lesson('band7-8','band4-speaking-abstract-topics','Reframe and defend a complex position','speaking'),lesson('band7-8','band4-writing-complex-ideas','Synthesize and qualify a complex argument','writing')],
 C1:[lesson('band7-8','band4-writing-grammatical-range','Control complex language','grammar'),lesson('band7-8','band4-writing-lexical-resource','Precision and register','vocabulary'),lesson('band7-8','band4-reading-writers-views','Identify stance and qualifications','reading'),lesson('band7-8','band4-listening-inference','Infer supported attitudes','listening'),lesson('band7-8','band4-speaking-abstract-topics','Develop a qualified spoken argument','speaking'),lesson('band7-8','band4-writing-complex-ideas','Develop and evaluate a complex position','writing')]
};
// All levels include receptive and productive work; beginners are not sent to B2 exam lessons.
export function studyResources(level:PlacementLevel,goal:StudyGoal){
 const pool=level==='B2'&&goal!=='everyday'?goals[goal]:levelResources[level];
 return pool.some(r=>r.domain==='writing')?pool:[...pool,resource('Write and revise a purposeful response','/writing','writing')];
}
export function weeklyStudyResource(item:StudyResource,level:PlacementLevel,week:number):StudyResource{
 const phase=(week-1)%4;
 if(level==='A1'||level==='A2'){
  const themes=level==='A1'?['family','time','cafe','places']:['transport','routines','food','places'];
  if(item.domain==='vocabulary'||item.domain==='reading')return resource(`${item.domain==='reading'?'Read examples':'Words in context'}: ${themes[phase]}`,`/grammar/cheat-sheet#vocabulary-${themes[phase]}`,item.domain);
  if(item.domain==='grammar'){
   const forms=level==='A1'?[
    ['Simple personal sentences','/grammar/cheat-sheet#sentence-structure'],['Present simple for routines','/verb-conjugation'],['Articles and quantities in requests','/grammar/cheat-sheet#articles'],['Questions and short answers','/grammar/cheat-sheet#questions']
   ]:[['Present forms for routines and arrangements','/verb-conjugation'],['Past forms for a finished event','/simple-past'],['Quantities and comparisons','/grammar/cheat-sheet#articles'],['Link ideas and correct recurring errors','/linking-words']];
   return resource(forms[phase][0],forms[phase][1],'grammar');
  }
 }
 return item;
}
export function localDateKey(date:Date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseStudyDate(date:string,time:string){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Choose a valid date and study time.');
 const [y,m,d]=date.split('-').map(Number),[h,n]=time.split(':').map(Number);const out=new Date(y,m-1,d,h,n);
 if(y<2000||y>2100||out.getFullYear()!==y||out.getMonth()!==m-1||out.getDate()!==d||out.getHours()!==h||out.getMinutes()!==n)throw new Error('That date or local time does not exist. Choose another time.');return out;
}
export type StudySession={id:string;week:number;start:Date;end:Date;resource:StudyResource;level:PlacementLevel;minutes:number;task:string;success:string;practice:string;parts:{label:string;minutes:number}[]};
export function buildStudySessions(schedule:StudySchedule,weakDomain:StudyPriority='grammar',adaptation?:StudyAdaptation){
 if(!validStudySchedule(schedule))throw new Error('Choose study days, a start date, a time and a session length.');
 const first=parseStudyDate(schedule.startDate,schedule.time),pool=Array.from(new Map(studyResources(schedule.startingLevel,schedule.goal).map(r=>[r.domain,r])).values());
 const priorities=adaptation?.priorities.length?adaptation.priorities:[weakDomain];
 const preferred=[...priorities.flatMap(skill=>pool.filter(r=>r.domain===skill)),...pool.filter(r=>!priorities.includes(r.domain))];
 const cycle=[...preferred,...priorities.flatMap(skill=>pool.filter(r=>r.domain===skill))];
 const sessions:StudySession[]=[];for(let day=0;day<(schedule.weeks||4)*7;day++){
  const calendarDay=new Date(first.getFullYear(),first.getMonth(),first.getDate()+day,12);if(!schedule.days.includes(calendarDay.getDay()))continue;
  const start=parseStudyDate(localDateKey(calendarDay),schedule.time),end=new Date(start.getTime()+schedule.minutes*60000),week=Math.floor(day/7)+1,index=sessions.length,item=cycle[index%cycle.length],measured=adaptation?.levels[item.domain],shift=adaptation?PLACEMENT_LEVELS.indexOf(schedule.startingLevel)-PLACEMENT_LEVELS.indexOf(adaptation.baseLevel):0,level=measured?PLACEMENT_LEVELS[Math.max(0,Math.min(5,PLACEMENT_LEVELS.indexOf(measured)+shift))]:schedule.startingLevel,base=studyResources(level,schedule.goal).find(r=>r.domain===item.domain)||item,resource=weeklyStudyResource(base,level,week),theme=LEVEL_STUDY_PLANS[level].weeks[(week-1)%4];
  const review=Math.max(3,Math.round(schedule.minutes*.2)),main=Math.round(schedule.minutes*.45),output=Math.round(schedule.minutes*.25),check=schedule.minutes-review-main-output;
  const actions:Record<StudyPriority,string>={grammar:'Compare forms in context, then make your own sentences',vocabulary:'Retrieve phrases, then use them in new sentences',reading:'Read for a purpose; identify evidence before checking',listening:'Listen for gist, then details; check against the transcript',speaking:'Plan briefly, record locally, replay and improve',writing:'Plan, draft and revise a short purposeful response'};
  if(resource.domain==='speaking'&&adaptation?.speakingFocus){const focus={intelligibility:'Shadow one short line; record and compare key sounds and word stress',fluency:'Retell the same message twice with fewer pauses and clear links',grammar:'Rebuild two sentences from your recording, then say them in a new answer',vocabulary:'Replace vague words with precise phrases and use them in a new answer'};actions.speaking=focus[adaptation.speakingFocus];}
  const production=resource.domain==='speaking'?'Write a brief summary of what you said':resource.domain==='writing'?'Explain your written ideas aloud':'Retell the idea aloud, then write a short response';
  sessions.push({id:`${schedule.id}-${index}`,week,start,end,resource,level,minutes:schedule.minutes,task:theme.output,success:theme.check,practice:LEVEL_PRACTICE[level][resource.domain],parts:[{label:index===0?'Recall what you already know':'Recall your last session; revisit items from about 3 and 7 days ago',minutes:review},{label:actions[resource.domain],minutes:main},{label:production,minutes:output},{label:week%4===0?'Try fresh details; record one correction and request speaking/writing feedback':'Check the task, note one correction and choose what to revisit',minutes:check}]});
 }
 return sessions;
}
function escapeICS(value:string){return value.replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function foldICS(line:string){const encoder=new TextEncoder();let parts:string[]=[],part='',size=0;for(const c of line){const n=encoder.encode(c).length;if(size+n>75){parts.push(part);part=' '+c;size=1+n;}else{part+=c;size+=n;}}parts.push(part);return parts.join('\r\n');}
const utc=(date:Date)=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
export function studyCalendar(schedule:StudySchedule,name:string,weakDomain:StudyPriority='grammar',origin='https://englishcamp.invalid',now=new Date(),adaptation?:StudyAdaptation){
 const sessions=buildStudySessions(schedule,weakDomain,adaptation);const base=new URL(origin);if(!['http:','https:'].includes(base.protocol))throw new Error('Calendar links need a website address.');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//EnglishCamp//Personal Study Plan//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:EnglishCamp study plan'];
 for(const session of sessions){const url=new URL(session.resource.href,base).href;const description=`${name}’s ${schedule.startingLevel} starting plan · Week ${session.week}\n${session.resource.title} · ${session.level} skill practice\nPractice brief: ${session.practice}\nWeekly output: ${session.task}\nCheck: ${session.success}\n${session.parts.map(p=>`${p.minutes} min: ${p.label}`).join('\n')}\n${url}\nRepeat a fresh task on another day and get speaking and writing feedback before harder material. Continue unfinished lessons next time. Mark progress inside EnglishCamp.`;
 lines.push('BEGIN:VEVENT',`UID:${session.id}@englishcamp.local`,`DTSTAMP:${utc(now)}`,`DTSTART:${utc(session.start)}`,`DTEND:${utc(session.end)}`,`SUMMARY:${escapeICS(`EnglishCamp: ${session.resource.title}`)}`,`DESCRIPTION:${escapeICS(description)}`,`URL:${url}`,'STATUS:CONFIRMED','TRANSP:TRANSPARENT','END:VEVENT');}
 lines.push('END:VCALENDAR');return lines.map(foldICS).join('\r\n')+'\r\n';
}
