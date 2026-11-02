export type ClozeItem={title:string;en:string;text:string[];blanks:{index:number;answer:string;options:string[]}[]};
/** Empty segments mark gaps explicitly; surrounding fragments must never be discarded. */
export const CLOZE_PASSAGES:ClozeItem[]=[
 {title:"My Day",en:"Present simple routines",text:["I","","up at 7 AM every morning. Then I have breakfast and","","to school."],blanks:[{index:1,answer:"wake",options:["wake","wakes","woke","waking"]},{index:3,answer:"go",options:["go","goes","went","going"]}]},
 {title:"At the Restaurant",en:"Completed past events",text:["Yesterday I","","to a restaurant with friends. We","","pizza and salad."],blanks:[{index:1,answer:"went",options:["went","go","gone","going"]},{index:3,answer:"ordered",options:["ordered","order","ordering","have ordered"]}]},
 {title:"My Family",en:"Present simple agreement",text:["There","","four people in my family. My father","","as an engineer."],blanks:[{index:1,answer:"are",options:["are","is","am","be"]},{index:3,answer:"works",options:["works","work","working","worked"]}]},
 {title:"The Weather",en:"Use present continuous in the first gap",text:["Right now the sun","",". It","","very warm, and the sky is clear."],blanks:[{index:1,answer:"is shining",options:["is shining","shines","shone","shine"]},{index:3,answer:"is",options:["is","am","are","be"]}]},
 {title:"On Vacation",en:"Past simple narrative",text:["Last summer we","","to Italy. We relaxed on the beach and","","a lot of ice cream."],blanks:[{index:1,answer:"went",options:["went","go","gone","going"]},{index:3,answer:"ate",options:["ate","eat","eating","eaten"]}]},
 {title:"Shopping",en:"Past simple narrative",text:["Yesterday I","","shopping and","","a lot of money."],blanks:[{index:1,answer:"went",options:["went","go","goes","going"]},{index:3,answer:"spent",options:["spent","spend","spending","have spent"]}]},
 {title:"Sickness",en:"Past states",text:["Yesterday I","","not feeling well. I","","a headache and a fever."],blanks:[{index:1,answer:"was",options:["was","am","were","been"]},{index:3,answer:"had",options:["had","have","has","having"]}]},
 {title:"Hobby",en:"Habit and completed event",text:["I","","playing soccer very much. Last week I","","a goal."],blanks:[{index:1,answer:"like",options:["like","likes","liking","to like"]},{index:3,answer:"scored",options:["scored","score","scoring","have scored"]}]},
];
