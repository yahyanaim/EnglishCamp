export const SHADOW_LEVELS=["A1","A2","B1","B2"] as const;
export type ShadowLevel=typeof SHADOW_LEVELS[number];
export type ShadowLesson={id:string;level:ShadowLevel;title:string;videoId:string;duration:number;focus:string;task:string;lines:{text:string;ar:string}[]};
/** Practice levels are editorial suggestions. Lines are selected VOA public-domain teaching text. */
export const SHADOW_LESSONS:ShadowLesson[]=[
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
];
export const normalizeDictation=(text:string)=>text.normalize("NFKC").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g," ").replace(/\s+/g," ").trim();
