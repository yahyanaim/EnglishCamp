import { SYNTAX_RULES } from "./satzbau";
import { KONNEKTOREN, CATEGORY_META } from "./konnektoren";
import { PASSIVE_RULES } from "./passiv";
import { CONDITIONAL_RULES } from "./konjunktiv-ii";
import { RELATIVE_RULES } from "./relativsaetze";
import { PREPOSITIONS } from "./declensions";
export type CheatItem={title:string;formation:string;examples:{en:string;ar?:string}[];notes?:string[]};
export type CheatSection={id:string;title:string;art:string;content:CheatItem[]};
const item=(title:string,formation:string,...examples:string[]):CheatItem=>({title,formation,examples:examples.map(en=>({en}))});
export const GRAMMAR_SECTIONS:CheatSection[]=[
 {id:"sentence-structure",title:"Sentence structure",art:"pattern",content:SYNTAX_RULES.slice(0,4).map(r=>({title:r.title,formation:r.explanation,examples:r.examples.slice(0,2).map(e=>({en:e.de||e.en})),notes:r.subRules?.map(s=>`${s.label}: ${s.items.join('; ')}`)}))},
 {id:"tenses",title:"Tense and aspect",art:"clock",content:[
 item("Present simple / continuous","Use the simple form for routines and general states; use am/is/are + -ing for activity in progress or a temporary situation. Many state verbs normally use the simple form.","I work in a library. I am working from home this week."),
 item("Past simple / continuous","Past simple locates a completed past event; was/were + -ing presents activity in progress at a past point.","I was cooking when the phone rang."),
 item("Present perfect / past simple","Have/has + past participle connects earlier time with now. Use past simple for an event at a finished past time such as yesterday.","I have lost my keys: I cannot get in. I lost them yesterday."),
 item("Past perfect","Had + past participle presents an event as earlier than another past reference point.","The train had left before we reached the station."),
 item("Future choices","Will can express a promise or immediate decision. Be going to can express an intention or a prediction based on present evidence. Present continuous can describe an arrangement.","I’ll help you. Look at those clouds: it’s going to rain. I’m meeting Salma at six.")
 ]},
 {id:"articles",title:"Articles and countability",art:"book",content:[
 item("A / an","Use a/an with a singular countable noun when introducing one unspecified instance. Choose by the following sound, not its written letter.","a university; an hour; an interesting book"),
 item("The / no article","The often identifies something already known or specified. General plural and uncountable nouns often have no article.","The book on the desk is mine. Books can be expensive. Water is essential."),
 item("Countable / uncountable","Use many/fewer with plural countable nouns and much/less with uncountable nouns. Advice and information are normally uncountable in these uses.","two pieces of advice; some information; fewer mistakes; less noise")
 ]},
 {id:"prepositions",title:"Prepositions",art:"location",content:([['time','Time'],['location','Location'],['direction','Direction'],['other','Other relationships']] as const).map(([category,title])=>({title,formation:category==='time'?'Use at for clock times, on for days/dates and in for months/years. Fixed phrases include at night. For names a duration; since names its starting point.':category==='location'?'A preposition describes a relationship: at a point, on a surface, in an area or container. The intended meaning determines the choice.':category==='direction'?'Distinguish location from movement: in/into, on/onto. To identifies a destination; from identifies an origin.':'Prepositions express relationships and occur in established combinations. Object pronouns follow prepositions: for me, with her, between us.',examples:PREPOSITIONS.filter(p=>p.category===category).map(p=>({en:`${p.preposition} — ${p.usage}: ${p.example}`})),notes:category==='time'?['for two hours; since Monday; during the lesson; by Friday (deadline); until Friday (continuing up to then).']:undefined}))},
 {id:"connectives",title:"Linking words",art:"pattern",content:Object.entries(CATEGORY_META).map(([key,meta])=>({title:meta.label,formation:meta.desc,examples:KONNEKTOREN.filter(k=>k.category===key).slice(0,3).map(k=>({en:k.exampleEn}))}))},
 {id:"passive",title:"Passive voice",art:"compare",content:PASSIVE_RULES.slice(0,4).map(r=>({title:r.title,formation:r.explanation,examples:r.examples.slice(0,2).map(e=>({en:e.de||e.en}))}))},
 {id:"conditionals",title:"Conditionals",art:"idea",content:CONDITIONAL_RULES.slice(0,4).map(r=>({title:r.title,formation:r.explanation,examples:r.examples.slice(0,2).map(e=>({en:e.de||e.en}))}))},
 {id:"relative-clauses",title:"Relative clauses",art:"pattern",content:RELATIVE_RULES.slice(0,4).map(r=>({title:r.title,formation:r.explanation,examples:r.examples.slice(0,2).map(e=>({en:e.en,ar:e.ar}))}))},
 {id:"agreement",title:"Agreement and pronouns",art:"table",content:[
 item("Find the subject head","The head of the subject normally determines subject–verb agreement. A nearby noun inside a modifier does not replace it.","The list of activities is on the desk. The activities are interesting."),
 item("Subject / object / possessive","Use I/he/she/we/they as subjects; me/him/her/us/them as objects, including after prepositions. A possessive determiner comes before its noun.","She helped me. This is for her. Their car is outside; that one is theirs.")
 ]},
 {id:"questions",title:"Questions and negatives",art:"chat",content:[
 item("Questions with auxiliaries","Put the auxiliary before the subject. With ordinary present/past simple verbs, use do/does/did + subject + base verb.","Are you ready? Where does she work? Why did they leave?"),
 item("Indirect questions","After an opener such as Could you tell me, use statement order inside the embedded question.","Where is the station? Could you tell me where the station is?"),
 item("Negation","Add not after an auxiliary; otherwise use do/does/did not + base verb. Standard English normally avoids a second negative for the same meaning.","She does not drive. They have not arrived. I did not see anyone.")
 ]},
 {id:"modals",title:"Modals and verb patterns",art:"note",content:[
 item("Modal + base verb","Can, must, may, might and should take the base form without to. Have to and ought to follow different patterns.","She can swim. You should rest. We have to leave."),
 item("Modal perfect","Modal + have + past participle refers to an earlier situation. The modal expresses possibility, deduction or evaluation.","He might have missed the bus. You should have checked the time."),
 item("Infinitive / -ing","The first verb or expression helps determine the next form. Some verbs permit both with a change of meaning.","I enjoy reading. I hope to travel. I stopped smoking. I stopped to buy a ticket.")
 ]}
];
