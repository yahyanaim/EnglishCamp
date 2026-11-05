import { CONVERSATIONS } from '@/data/conversations';
import recordings from '@/data/practice-audio.json';
import examRecordings from '../../../public/media/mock-exams/v2/manifest.json';
import listening from '@/data/mock-exams/content/toefl-listening.json';
import type { PlacementLevel } from './questions';
export type ListeningCheck={id:string;level:PlacementLevel;prompt:string;options:string[];answer:number;explanation:string;clips:{src:string;transcript:string}[]};
function conversation(id:string,level:PlacementLevel,scenario:string,lines:number[],prompt:string,options:string[],answer:number,explanation:string):ListeningCheck{
 const source=CONVERSATIONS.find(s=>s.id===scenario)!;
 return {id,level,prompt,options,answer,explanation,clips:lines.map(index=>({src:(recordings.conversation as Record<string,string[]>)[scenario][index],transcript:source.lines[index].text}))};
}
function lecture(id:string,number:number):ListeningCheck{
 const source=listening.find(s=>s.id==='tf2-l-upper-15')!,question=source.questions.find(q=>q.number===number)!;
 return {id,level:'C1',prompt:question.prompt,options:question.options!,answer:question.options!.indexOf(question.answers[0]),explanation:question.explanation,clips:[{src:examRecordings.find(a=>a.id===source.id)!.src,transcript:source.segments.map(s=>s.text).join(' ')}]};
}
/** Existing Microsoft neural recordings; no new text needs to leave the device. Difficulty labels are editorial. */
export const PLACEMENT_LISTENING:ListeningCheck[]=[
 conversation('listen-a1-1','A1','introducing-yourself',[3],'Where is the speaker from?',['Canada','Egypt','Italy','Australia'],1,'The speaker says “I’m from Egypt”.'),
 conversation('listen-a1-2','A1','coffee-shop',[3],'Which drink size does the customer choose?',['Small','Large','Medium','No drink'],2,'The customer chooses medium before asking about the croissant.'),
 conversation('listen-a2-1','A2','asking-directions',[3],'Where will the museum be after the left turn?',['On the right','On the left','Behind the traffic lights','Inside the station'],0,'The directions say to turn left at the lights and then look on the right.'),
 conversation('listen-a2-2','A2','hotel-checkin',[4],'When is breakfast served?',['Six to nine in the evening','Eight to eleven in the morning','Seven to nine in the morning','Seven to ten in the morning'],3,'Breakfast is served from 7 to 10 AM.'),
 conversation('listen-b1-1','B1','renting-apartment',[2],'Which costs are NOT included in the rent?',['Water and heating','Electricity and internet','Heating and internet','Water and electricity'],1,'The rent includes water and heating, but excludes electricity and internet.'),
 conversation('listen-b1-2','B1','volunteering',[1,3],'What makes this applicant suitable for charity-shop work?',['They have already done similar voluntary work.','They have bought the shop.','They can only work online.','They have never worked with donations.'],0,'The speaker has already organised donations and worked at the till in a charity shop.'),
 conversation('listen-b2-1','B2','giving-opinion',[2,3],'How does the second speaker respond to the training concern?',['By denying that training is necessary','By suggesting the current system is fast','By accepting the cost in time but emphasising later benefits','By proposing to postpone the project indefinitely'],2,'The speaker acknowledges the concern but argues that long-term benefits outweigh the initial investment.'),
 conversation('listen-b2-2','B2','news-discussion',[2,3],'What is the second speaker’s attitude towards the commitments?',['They think commitments are certain to fail.','They are cautiously hopeful because public pressure has increased.','They believe all promises have already been fulfilled.','They think citizens have no influence.'],1,'The reply accepts the doubt but sees public and activist pressure as a reason for hope.'),
 lecture('listen-c1-1',20),lecture('listen-c1-2',23)
];
export const SPEAKING_CRITERIA=['task','clarity','language'] as const;
export type SpeakingCriterion=typeof SPEAKING_CRITERIA[number];
export const PLACEMENT_SPEAKING=[
 {id:'speak-a1',level:'A1',title:'Introduce yourself',preparation:15,seconds:30,prompt:'Say your name, where you live and two things you do every day.',targets:['Give at least three pieces of personal information.','Use short sentences a listener can understand.','Use familiar words and simple present forms.']},
 {id:'speak-a2',level:'A2',title:'Arrange a meeting',preparation:20,seconds:45,prompt:'Invite a friend to meet this weekend. Suggest a place and time, explain how to get there, and offer another time if your friend is busy.',targets:['Make an invitation and give practical details.','Speak in short linked phrases with understandable key words.','Use questions, time expressions and simple connectors.']},
 {id:'speak-b1',level:'B1',title:'Explain an experience',preparation:25,seconds:60,prompt:'Describe a time when a journey or a plan went wrong. Explain what happened, what you did and what you learned.',targets:['Tell a connected account with a beginning, problem and outcome.','Keep the main message clear even if you pause or rephrase.','Use past forms, reasons and enough vocabulary to explain the event.']},
 {id:'speak-b2',level:'B2',title:'Discuss a choice',preparation:30,seconds:90,prompt:'A local library can spend its budget on longer opening hours or new digital resources. Compare both choices, recommend one, and respond to one possible objection.',targets:['Compare both options, support a choice and address an objection.','Develop the answer coherently without relying on isolated phrases.','Use a range of relevant vocabulary and mostly controlled complex sentences.']},
 {id:'speak-c1',level:'C1',title:'Qualify an argument',preparation:30,seconds:120,prompt:'Should a university use AI tools to give students feedback on writing? Develop a balanced position, distinguish routine feedback from assessment, and explain the conditions or safeguards that would change your view.',targets:['Develop and qualify a position with a clear distinction and conditions.','Organise ideas flexibly so a listener can follow the reasoning.','Express precise meanings and qualifications with a broad, controlled language range.']}
] as const;
