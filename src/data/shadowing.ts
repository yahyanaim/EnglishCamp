import { LEGACY_SHADOW_CUES } from "./shadowing-timings";
import { conversationSelection } from "./shadowing-conversations";
export const SHADOW_LEVELS=["A1","A2","B1","B2"] as const;
export type ShadowLevel=typeof SHADOW_LEVELS[number];
export type ShadowLesson={id:string;level?:ShadowLevel;title:string;videoId:string;duration:number;focus:string;task:string;kind?:"pronunciation"|"conversation";channel?:string;track?:"IELTS"|"TOEFL";skill?:"Listening"|"Reading"|"Writing"|"Speaking";topics?:string[];clipStart?:number;clipEnd?:number;sourceDuration?:number;lines:{text:string;ar:string;speaker?:string;start?:number;end?:number}[]};
/** Practice levels are editorial suggestions. Lines are selected VOA public-domain teaching text. */
export const ORIGINAL_SHADOW_LESSONS:ShadowLesson[]=[
 {id:"introduce-yourself",level:"A1",title:"Introduce yourself: I am and I’m",videoId:"65iWtWqWmgY",duration:29,focus:"Hear the difference between careful speech and a contraction.",task:"Say your own name using I’m. Keep the two sounds connected.",lines:[
  {text:"I am Pete.",ar:"أنا بيت."},{text:"I'm Pete.",ar:"أنا بيت. الصيغة المختصرة للكلمتين I am."},{text:"Now you try it. Say your name.",ar:"جرّب الآن. قل اسمك."}]},
 {id:"connected-youre",level:"A2",title:"Connected speech: you’re here",videoId:"C_HDrYHJrzo",duration:31,focus:"Recognise you are when it becomes you’re in natural speech.",task:"Repeat the careful and connected versions. Then tell someone where they are: You’re at the station.",lines:[
  {text:"You are here.",ar:"أنت هنا."},{text:"You're here.",ar:"أنت هنا. الصيغة المختصرة للكلمتين you are."}]},
 {id:"break-the-ice",level:"B1",title:"Starting a conversation: break the ice",videoId:"Tn7a8Cv64B4",duration:60,focus:"Follow the rhythm of an informal conversation and understand an idiom in context.",task:"Repeat a line, then explain what an icebreaker does without translating every word.",lines:[
  {text:"Welcome to English in a Minute.",ar:"مرحباً بكم في الإنجليزية في دقيقة."},
  {text:"Ice is frozen water.",ar:"الجليد هو ماء متجمّد."},
  {text:"But what does it mean if you break it?",ar:"لكن ماذا يعني أن تكسره؟"},
  {text:"To break the ice.",ar:"كسر حاجز الصمت أو بدء التعارف."},
  {text:"Should you fix broken ice?",ar:"هل ينبغي أن تصلح الجليد المكسور؟"},
  {text:"Hey, I saw you at my party last night, but you didn't stay very long.",ar:"رأيتك في حفلتي البارحة، لكنك لم تبقَ طويلاً."},
  {text:"I knew no one, and I didn't have the energy to break the ice with a bunch of new people.",ar:"لم أكن أعرف أحداً، ولم تكن لدي الطاقة لبدء الحديث مع مجموعة من الأشخاص الجدد."},
  {text:"Asking questions is a good icebreaker.",ar:"طرح الأسئلة وسيلة جيدة لبدء التعارف."},
  {text:"True, but even if I broke the ice, I didn't have the energy to listen.",ar:"صحيح، لكن حتى لو بدأت الحديث، لم تكن لدي الطاقة للاستماع."},
  {text:"To break the ice means to start a conversation with someone you don't really know.",ar:"يعني التعبير بدء محادثة مع شخص لا تعرفه جيداً."},
  {text:"In the winter, ships can get stuck in ice.",ar:"في الشتاء قد تعلق السفن في الجليد."},
  {text:"Smaller ships break the ice to open up passageways.",ar:"تكسر سفن أصغر الجليد لفتح ممرّات."},
  {text:"People can open conversations in the same way.",ar:"يمكن للناس فتح باب الحديث بالطريقة نفسها."},
  {text:"And that's English in a Minute.",ar:"وكانت هذه الإنجليزية في دقيقة."}]},
 {id:"give-and-take",level:"B2",title:"Handling criticism: dish it out but can’t take it",videoId:"J8EWSLZ36s0",duration:60,focus:"Use contrast and stress to understand a speaker’s reaction to criticism.",task:"Explain the difference between making a joke and accepting one. Stress the contrast in can and can’t.",lines:[
  {text:"Dish it out but can't take it.",ar:"ينتقد الآخرين لكنه لا يتقبّل النقد الموجّه إليه."},
  {text:"So, I joked about her singing.",ar:"لذلك مازحتها بشأن غنائها."},
  {text:"And she got angry at me!",ar:"وغضبت مني!"}]},
 {id:"wait-a-moment",level:"A2",title:"Asking for help: hold your horses",videoId:"mqPgWweY1vA",duration:60,focus:"Practise short requests and responses between two real speakers. The idiom is an extra challenge.",task:"Ask someone for help with a heavy bag. Reply politely with Just a second instead of the more direct idiom.",lines:[
  {text:"Oh! Andrew, can you help me with this box?",ar:"أندرو، هل يمكنك مساعدتي في حمل هذا الصندوق؟"},
  {text:"Just a second. I'm almost done.",ar:"لحظة واحدة. أوشكت على الانتهاء."},
  {text:"I'm on the last page.",ar:"أنا في الصفحة الأخيرة."},
  {text:"It's really heavy!",ar:"إنه ثقيل جداً!"},
  {text:"Hold your horses! What's in the box?",ar:"تمهّلي! ماذا يوجد في الصندوق؟"},
  {text:"Horses!",ar:"خيول!"}]},
 {id:"productive-day",level:"B1",title:"Talking about your day: on the ball",videoId:"DLi2txV9IVc",duration:59,focus:"Listen to a question about someone's day, then copy the stress in an enthusiastic answer.",task:"Describe one task you finished today. Explain why someone might say you are on the ball.",lines:[
  {text:"Hi Anna! How has your day been?",ar:"مرحباً آنا! كيف كان يومك؟"},
  {text:"Great! Very great! Very productive!",ar:"رائع! رائع جداً! ومثمر للغاية!"},
  {text:"I finished three reports and have only one more to do!",ar:"أنهيت ثلاثة تقارير ولم يبقَ لديّ سوى تقرير واحد!"},
  {text:"Wow, you are on the ball! How did you do them so fast?",ar:"يا للروعة، أنت نشيطة ومنتبهة! كيف أنجزتِها بهذه السرعة؟"},
  {text:"Coffee! Lots of coffee. Do you want some?",ar:"القهوة! الكثير من القهوة. هل تريد بعضاً منها؟"},
  {text:"Uh, sure. But maybe not that much coffee.",ar:"نعم، بالتأكيد. لكن ربما ليس بهذه الكمية من القهوة."}]},
 {id:"obvious-choice",level:"B1",title:"Discussing a mystery: a no-brainer",videoId:"b_ka3-253h0",duration:60,focus:"Use pauses and rising intonation when asking a what-if question in a real conversation.",task:"Suggest a different explanation for a simple mystery. Start with What if and respond to a partner's idea.",lines:[
  {text:"Hey, did you watch the new episode of Catch a Criminal?",ar:"هل شاهدت الحلقة الجديدة من برنامج أمسك بالمجرم؟"},
  {text:"Yeah, but it was such a no-brainer!",ar:"نعم، لكن الحل كان واضحاً جداً!"},
  {text:"The police found a gun and all the money in David's house!",ar:"وجدت الشرطة مسدساً وكل الأموال في منزل ديفيد!"},
  {text:"Well, what if David has a twin brother who lives with him?",ar:"حسناً، ماذا لو كان لديفيد توأم يعيش معه؟"},
  {text:"The police would know if David had a twin brother.",ar:"ستعرف الشرطة لو كان لديفيد أخ توأم."},
  {text:"Well, what if they don't know?",ar:"وماذا لو لم يكونوا يعرفون؟"}]},
 {id:"plans-and-dreams",level:"B2",title:"Plans and reality: pie in the sky",videoId:"gBYnewP1MmY",duration:61,focus:"Notice how speakers use stress to challenge a claim and then react to surprising evidence.",task:"Describe an ambitious plan. Give one reason it might be realistic and one reason it might be pie in the sky.",lines:[
  {text:"Pedro is finally moving to Hollywood to follow his acting dream.",ar:"سينتقل بيدرو أخيراً إلى هوليوود لتحقيق حلمه في التمثيل."},
  {text:"He's been talking about that for years.",ar:"إنه يتحدث عن ذلك منذ سنوات."},
  {text:"His plans are just pie in the sky.",ar:"خططه ليست سوى أحلام بعيدة عن الواقع."},
  {text:"His YouTube channel has over four million subscribers!",ar:"تضم قناته على يوتيوب أكثر من أربعة ملايين مشترك!"},
  {text:"Four million?",ar:"أربعة ملايين؟"}]},

 {id:"say-thank-you",level:"A1",kind:"pronunciation",title:"Everyday courtesy: thank you",videoId:"VDDB2tWE0jU",duration:20,focus:"Practise the opening sound in thank, then connect the two words in thank you.",task:"Say thank slowly, then say thank you as one short phrase. Use it when someone helps you.",lines:[
  {text:"Thank",ar:"فعل الشكر، وهو الجزء الأول من العبارة."},{text:"Thank you.",ar:"شكراً لك."}]},
 {id:"making-party-plans",level:"A2",kind:"conversation",title:"Making plans: around the corner",videoId:"fNk6ZFK8NsI",duration:60,focus:"Practise short turns about plans and notice the difference between planning early and at the last minute.",task:"Tell a partner about an event coming soon. Ask when you should start planning it.",lines:[
  {speaker:"Speaker 1",text:"Andrew, let's meet to plan our party.",ar:"أندرو، لنتقابل للتخطيط لحفلتنا."},
  {speaker:"Speaker 1",text:"New Year's is just around the corner.",ar:"رأس السنة قريب جداً."},
  {speaker:"Speaker 2",text:"Around the corner? It's still weeks away!",ar:"قريب جداً؟ ما زالت تفصلنا عنه أسابيع!"},
  {speaker:"Speaker 1",text:"I know. There's not much time to plan!",ar:"أعرف. ليس هناك وقت طويل للتخطيط!"},
  {speaker:"Speaker 2",text:"You know I like to plan at the last minute.",ar:"تعرفين أنني أحب التخطيط في اللحظة الأخيرة."},
  {speaker:"Speaker 1",text:"I know! That's why I made you a to-do list.",ar:"أعرف! لهذا أعددت لك قائمة مهام."}]},
 {id:"sharing-difficult-news",level:"B1",kind:"conversation",title:"Workplace conversation: breaking the news",videoId:"BKNJxpdNAtY",duration:61,focus:"Hear how a speaker softens difficult news and how the other person reacts.",task:"Practise giving disappointing news politely. Then explain the reason in one clear sentence.",lines:[
  {speaker:"Andrew",text:"So, are you all ready for our big work trip to Brazil?",ar:"هل أنت مستعدة لرحلة عملنا الكبيرة إلى البرازيل؟"},
  {speaker:"Andrew",text:"I just bought a new travel shirt, travel sunglasses and this travel guidebook!",ar:"اشتريت للتو قميص سفر ونظارة شمسية وهذا الدليل السياحي!"},
  {speaker:"Anna",text:"Andrew, I hate to break the news, but you're not traveling.",ar:"أندرو، يؤسفني إبلاغك بالخبر، لكنك لن تسافر."},
  {speaker:"Anna",text:"Budget cuts. There's not enough money for two.",ar:"هناك تخفيض في الميزانية. لا يوجد مال يكفي لشخصين."},
  {speaker:"Anna",text:"But can I borrow that travel book?",ar:"لكن هل يمكنني استعارة دليل السفر؟"}]},
 {id:"fresh-start",level:"B2",kind:"conversation",title:"Talking about habits: a clean slate",videoId:"iVk7Ft6gl5w",duration:60,focus:"Follow how two speakers build on an idea and use humour to challenge a general statement.",task:"Discuss a habit you want to change. Explain what starting with a clean slate would mean in that situation.",lines:[
  {speaker:"Speaker 1",text:"I love the start of the new year!",ar:"أحب بداية العام الجديد!"},
  {speaker:"Speaker 1",text:"It's a great time to start fresh.",ar:"إنه وقت رائع لبداية جديدة."},
  {speaker:"Speaker 2",text:"Me too! This year, I'm going to start with a clean slate and give up bad habits.",ar:"وأنا أيضاً! سأبدأ هذا العام صفحة جديدة وأتخلص من العادات السيئة."},
  {speaker:"Speaker 1",text:"Like eating donuts and drinking too much coffee?",ar:"مثل تناول الدونات وشرب الكثير من القهوة؟"},
  {speaker:"Speaker 2",text:"No. No, other bad habits.",ar:"لا، لا. عادات سيئة أخرى."}]},

];
export const SHADOW_LESSONS=conversationSelection(ORIGINAL_SHADOW_LESSONS);
export const normalizeDictation=(text:string)=>text.normalize("NFKC").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g," ").replace(/\s+/g," ").trim();

export const shadowLessonKind=(lesson:ShadowLesson)=>lesson.kind??(["introduce-yourself","connected-youre"].includes(lesson.id)?"pronunciation":"conversation");
const topics:Record<string,string[]>={
 "introduce-yourself":["Introductions","Everyday English"],"connected-youre":["Connected speech"],
 "break-the-ice":["Meeting people","Idioms"],"give-and-take":["Feedback","Handling criticism"],
 "wait-a-moment":["Asking for help","Idioms"],"productive-day":["Work","Daily life"],
 "obvious-choice":["Opinions","Entertainment"],"plans-and-dreams":["Ambitions","Future plans"],
 "say-thank-you":["Courtesy","Everyday English"],"making-party-plans":["Making plans","Celebrations"],
 "sharing-difficult-news":["Work","Giving news"],"fresh-start":["Habits","New beginnings"],
};
export const shadowTopics=(lesson:ShadowLesson)=>lesson.topics??topics[lesson.id]??["Everyday English"];

export const shadowChannel=(lesson:ShadowLesson)=>lesson.channel??"VOA Learning English";
export const shadowTimedCues=(lesson:ShadowLesson)=>lesson.lines.some(line=>line.start!==undefined)?lesson.lines.flatMap((line,index)=>line.start!==undefined&&line.end!==undefined?[{line:index,start:line.start,end:line.end}]:[]):LEGACY_SHADOW_CUES[lesson.id]??[];
