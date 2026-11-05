import type { VerbConjugation } from '@/data/conjugaise';
import { VERB_EXAMPLE_CONTEXTS } from '@/data/verb-example-contexts';
export const VERB_TENSES=[
 {id:'present',label:'Present simple',rule:'Base form; add -s/-es for he, she and it.',ar:'نستخدمه للحقائق والعادات. تتغير صيغة الفعل مع الغائب المفرد.'},
 {id:'present-continuous',label:'Present continuous',rule:'am/is/are + -ing form',ar:'نستخدمه لفعل جارٍ الآن أو وضع مؤقت، وقد يعبّر عن ترتيب مستقبلي.'},
 {id:'past',label:'Past simple',rule:'Past form; be changes to was/were.',ar:'نستخدمه لحدث أو حالة في زمن ماضٍ منتهٍ.'},
 {id:'past-continuous',label:'Past continuous',rule:'was/were + -ing form',ar:'نستخدمه لحدث كان مستمراً عند نقطة معينة في الماضي.'},
 {id:'perfect',label:'Present perfect',rule:'have/has + past participle',ar:'يربط حدثاً أو تجربة سابقة بالحاضر، دون تحديد وقت ماضٍ منتهٍ.'},
 {id:'present-perfect-continuous',label:'Present perfect continuous',rule:'have/has been + -ing form',ar:'يركز على مدة نشاط بدأ في الماضي واستمر إلى الحاضر أو انتهى قريباً.'},
 {id:'past-perfect',label:'Past perfect',rule:'had + past participle',ar:'يصف حدثاً وقع قبل نقطة مرجعية أخرى في الماضي.'},
 {id:'past-perfect-continuous',label:'Past perfect continuous',rule:'had been + -ing form',ar:'يركز على مدة نشاط كان مستمراً قبل حدث ماضٍ آخر.'},
 {id:'future',label:'Future simple',rule:'will + base form',ar:'تستخدم will للتوقعات والوعود والقرارات الفورية بحسب السياق.'},
 {id:'future-continuous',label:'Future continuous',rule:'will be + -ing form',ar:'يصف نشاطاً سيكون جارياً عند نقطة مستقبلية.'},
 {id:'future-perfect',label:'Future perfect',rule:'will have + past participle',ar:'يصف حدثاً سيكون قد اكتمل قبل نقطة في المستقبل.'},
 {id:'future-perfect-continuous',label:'Future perfect continuous',rule:'will have been + -ing form',ar:'يركز على مدة نشاط مستمر حتى نقطة مرجعية مستقبلية.'},
] as const;
export type VerbTense=typeof VERB_TENSES[number]['id'];
/** Affirmative forms. Continuous forms need an appropriate dynamic meaning in context. */
export function conjugatedForm(verb:VerbConjugation,tense:VerbTense,index:number) {
 const third=index===2,be=index===0?'am':third?'is':'are',pastBe=index===0||third?'was':'were',have=third?'has':'have',v=verb.infinitive,ing=verb.presentParticiple,pp=verb.pastParticiple;
 switch(tense){
 case 'present':return verb.present[index]??(third?verb.thirdPerson:v);
 case 'present-continuous':return `${be} ${ing}`;
 case 'past':return v==='be'?pastBe:verb.past;
 case 'past-continuous':return `${pastBe} ${ing}`;
 case 'perfect':return `${have} ${pp}`;
 case 'present-perfect-continuous':return `${have} been ${ing}`;
 case 'past-perfect':return `had ${pp}`;
 case 'past-perfect-continuous':return `had been ${ing}`;
 case 'future':return `will ${v}`;
 case 'future-continuous':return `will be ${ing}`;
 case 'future-perfect':return `will have ${pp}`;
 case 'future-perfect-continuous':return `will have been ${ing}`;
 }
}
export const isContinuous=(tense:VerbTense)=>tense.includes('continuous');
const usualStates=new Set(['be','have','know','like','love','want','need','believe','understand','mean','seem','prefer']);
export const continuousPracticeAllowed=(verb:VerbConjugation)=>!usualStates.has(verb.infinitive);
export function acceptedConjugations(form:string) {
 let choices=[''];for(const token of form.toLowerCase().split(/\s+/)){choices=choices.flatMap(prefix=>token.split('/').map(part=>(prefix+' '+part).trim()));}return choices;
}
export const matchesConjugation=(input:string,form:string)=>acceptedConjugations(form).includes(input.normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' '));

const stateMeaning = new Set(['know','want','need','mean','believe','understand']);
const simpler:Partial<Record<VerbTense,VerbTense>>={'present-continuous':'present','past-continuous':'past','present-perfect-continuous':'perfect','past-perfect-continuous':'past-perfect','future-continuous':'future','future-perfect-continuous':'future-perfect'};
export function unusualReferenceForm(verb:VerbConjugation,tense:VerbTense) {
 return isContinuous(tense) && (stateMeaning.has(verb.infinitive) || (verb.infinitive==='be' && tense.includes('perfect')));
}
const timePhrase:Record<VerbTense,string>={present:'','present-continuous':'at the moment',past:'last week','past-continuous':'when the tutor arrived',perfect:'this week','present-perfect-continuous':'for a while','past-perfect':'before the meeting started','past-perfect-continuous':'for a while before the course changed',future:'tomorrow','future-continuous':'at this time tomorrow','future-perfect':'by Friday','future-perfect-continuous':'for a while by the end of the day'};
export function tenseExample(verb:VerbConjugation,tense:VerbTense,index:number) {
 const subjects=verb.infinitive==='happen'?['The same problem','Technical problems','The same problem','Technical problems','Technical problems']:['I','You','She','We','They'];
 // Happen normally takes an event as its subject, rather than a person.
 const subject=subjects[index],formIndex=verb.infinitive==='happen'?(index===0||index===2?2:4):index;
 const form=acceptedConjugations(conjugatedForm(verb,tense,formIndex))[0];
 const tail=VERB_EXAMPLE_CONTEXTS[verb.infinitive];
 let time=timePhrase[tense];
 if(stateMeaning.has(verb.infinitive)&&tense==='perfect')time='for some time';
 if(stateMeaning.has(verb.infinitive)&&tense==='future-perfect')time='for a week by Friday';
 const sentence=`${subject} ${form} ${tail}${time?' '+time:''}.`;
 const alternative=simpler[tense];
 const preferred=unusualReferenceForm(verb,tense)&&alternative?`${subject} ${acceptedConjugations(conjugatedForm(verb,alternative,formIndex))[0]} ${tail}${time?' '+time:''}.`:undefined;
 return {subject,form,sentence,preferred};
}
export function referenceUsage(verb:VerbConjugation,tense:VerbTense) {
 if(unusualReferenceForm(verb,tense))return {en:verb.infinitive==='be'?'Perfect continuous forms of be are rare and usually rephrased. The pattern is shown for comparison; use the preferred version in the examples.':'This meaning describes a state. Continuous patterns are shown for comparison and are normally avoided; use the preferred version in the examples.',ar:'تُعرض هذه الصيغ للمقارنة. في هذا المعنى نستخدم عادةً الصيغة البديلة الموضحة في الأمثلة.'};
 if(verb.infinitive==='be'&&isContinuous(tense))return {en:'Here, be describes temporary helpful behaviour, rather than a permanent quality.',ar:'تصف هذه الأمثلة سلوكاً مؤقتاً، لا صفة ثابتة.'};
 if(verb.infinitive==='have')return {en:'Here, have means hold or attend a meeting, rather than own something.',ar:'يُستخدم الفعل هنا للحديث عن عقد اجتماع أو حضوره، لا عن الملكية.'};
 if(verb.infinitive==='think')return {en:'Here, think describes actively considering a solution.',ar:'يدل الفعل هنا على التفكير في حل، لا على اعتقاد حقيقة ثابتة.'};
 if(verb.infinitive==='see')return {en:'Here, see means meet a client.',ar:'يعني الفعل هنا مقابلة شخص.'};
 if(verb.infinitive==='hear')return {en:'Here, hear means listen to evidence in a legal case.',ar:'يُستخدم الفعل هنا بمعنى الاستماع رسمياً إلى الأدلة.'};
 if(verb.infinitive==='happen')return {en:'Happen usually has an event or situation as its subject. Notice the singular and plural examples.',ar:'يكون فاعل هذا الفعل عادةً حدثاً أو موقفاً. لاحظ الفرق بين المفرد والجمع في الأمثلة.'};
 return null;
}
