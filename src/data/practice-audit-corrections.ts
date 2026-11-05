/** Original replacement items with task constraints; completed sentences are feedback only. */
export const WORD_ORDER_PRACTICE=[
 {en:'Begin with Yesterday and use a normal past-tense statement about going to the cinema.',options:['Yesterday I went to the cinema.','Yesterday went I to the cinema.','Yesterday I to the cinema went.','Yesterday I going to the cinema.'],correct:'Yesterday I went to the cinema.',explanation:'A fronted time phrase does not invert subject and verb: Yesterday + I + went.'},
 {en:'Put the because-clause first and keep normal statement order in both clauses.',options:['Because am I sick, I stay at home.','Because I am sick, I stay at home.','Because I sick am, stay I at home.','Because sick I am, I at home stay.'],correct:'Because I am sick, I stay at home.',explanation:'Use subject + verb in the reason clause and the main clause. Because does not cause inversion.'},
 {en:'Report an arrangement: put a that-clause after I know and keep is coming together.',options:['I know that he is coming tomorrow.','I know that is he coming tomorrow.','I know he is that coming tomorrow.','I know that he coming is tomorrow.'],correct:'I know that he is coming tomorrow.',explanation:'That introduces a clause with subject + verb: that he is coming tomorrow.'},
 {en:'Ask a standard yes/no question about another person’s ability to help.',options:['Can help you me?','Can you help me?','You help can me?','Me can help you?'],correct:'Can you help me?',explanation:'A modal question has modal + subject + base verb: Can + you + help.'},
 {en:'Begin with He and put the recipient me before the present.',options:['He gave me a present.','He me gave a present.','Me gave he a present.','He gave I a present.'],correct:'He gave me a present.',explanation:'Use subject + verb + indirect object + direct object. The recipient pronoun is me, not I.'},
 {en:'Put the object English immediately after speaks and the manner phrase at the end.',options:['She speaks very well English.','She very well speaks English.','She speaks English very well.','Speaks she English very well.'],correct:'She speaks English very well.',explanation:'For this requested neutral order, the object follows speaks and very well follows the object.'},
 {en:'Keep English immediately after learning and put the duration at the end.',options:['I have been learning for a year English.','I have been learning English for a year.','For a year I have been learning English.','I have learning been English for a year.'],correct:'I have been learning English for a year.',explanation:'The requested order is subject + have been + learning + English + duration. A fronted duration can be grammatical, but does not meet this task’s instruction.'},
 {en:'Ask a present-simple where-question using do before you.',options:['Where you do study?','Where do study you?','Where do you study?','Where study do you?'],correct:'Where do you study?',explanation:'Use question word + do + subject + base verb: Where + do + you + study.'}
];
export const MODAL_PRACTICE=[
 {verb:'can',en:'Describe a present ability after learning a skill.',sentence:'After two years of lessons, I ____ speak English confidently.',answer:'can',accepted:['can']},
 {verb:'can',en:'Describe a skill she has now.',sentence:'She has trained her voice and now she ____ sing very well.',answer:'can',accepted:['can']},
 {verb:'can',en:'Say that your group is available to attend.',sentence:'Our schedule is free, so we ____ come tomorrow.',answer:'can',accepted:['can','could','will be able to']},
 {verb:'must',en:'Express a strong immediate necessity.',sentence:'His last train leaves in five minutes. He ____ go now.',answer:'must',accepted:['must','has to','needs to']},
 {verb:'must',en:'State a necessary action, rather than an optional suggestion.',sentence:'To meet this requirement, you ____ complete all three forms.',answer:'must',accepted:['must','have to','need to']},
 {verb:'may',en:'Ask politely for permission to enter.',sentence:'____ I come in, please?',answer:'May',accepted:['may','can','could','might']},
 {verb:'may',en:'Give permission after the work is finished.',sentence:'You have finished the task. You ____ leave now.',answer:'may',accepted:['may','can']},
 {verb:'should',en:'Give advice about staying hydrated.',sentence:'You look thirsty. You ____ drink some water.',answer:'should',accepted:['should','ought to']},
 {verb:'should',en:'Give advice about arriving early, without describing a requirement.',sentence:'It is a good idea to avoid the queue. We ____ arrive early.',answer:'should',accepted:['should','ought to']},
 {verb:'will',en:'Complete a statement about a future intention.',sentence:'She has saved for the trip. She ____ travel to London next year.',answer:'will',accepted:['will','is going to','plans to','intends to']},
 {verb:'will',en:'Ask about a future choice.',sentence:'What ____ you eat at tomorrow’s celebration?',answer:'will',accepted:['will','might','could']},
 {verb:'would',en:'Make a polite request using like.',sentence:'I ____ like some tea, please.',answer:'would',accepted:['would']},
 {verb:'would',en:'Make a polite invitation using like.',sentence:'____ you like to play tennis with us?',answer:'Would',accepted:['would']},
 {verb:'can',en:'Describe his present cooking ability.',sentence:'He has learned many recipes and ____ cook very well.',answer:'can',accepted:['can']},
 {verb:'must',en:'Ask whether attendance is necessary.',sentence:'____ you go to work tomorrow, or is it optional?',answer:'Must',accepted:['must','need']},
 {verb:'will',en:'Describe a future plan using a suitable future expression.',sentence:'We have saved enough money. We ____ buy a house next year.',answer:'will',accepted:['will','are going to','plan to','intend to']}
];
export type PracticeTense='Present Simple'|'Present Continuous'|'Past Simple'|'Present Perfect'|'Past Perfect'|'Future';
/** Explicit labels avoid guessing a tense from unrelated words or substrings. */
export const TENSE_IDENTIFICATION_PRACTICE:{sentence:string;tense:PracticeTense;verb:string;explanation:string}[]=[
 {sentence:'I work in the campus library every Friday.',tense:'Present Simple',verb:'work',explanation:'Work is a base-form present verb with I. Every Friday describes a routine.'},
 {sentence:'Mina leaves the office at five each day.',tense:'Present Simple',verb:'leave',explanation:'Leaves is the third-person present-simple form. The sentence describes a regular routine.'},
 {sentence:'They share their notes after every class.',tense:'Present Simple',verb:'share',explanation:'Share is a present-simple verb with they, describing a repeated action.'},
 {sentence:'The train stops at this station.',tense:'Present Simple',verb:'stop',explanation:'Stops is a third-person present-simple form used for a regular service.'},
 {sentence:'We usually have breakfast at eight.',tense:'Present Simple',verb:'have',explanation:'Have is the main verb in the present simple here. It is not followed by a past participle.'},
 {sentence:'I am writing a message right now.',tense:'Present Continuous',verb:'write',explanation:'Am + writing forms the present continuous and describes an action in progress.'},
 {sentence:'The students are discussing the next activity.',tense:'Present Continuous',verb:'discuss',explanation:'Are + discussing is the present-continuous verb phrase.'},
 {sentence:'Mina is waiting outside the office.',tense:'Present Continuous',verb:'wait',explanation:'Is + waiting forms the present continuous.'},
 {sentence:'We are having lunch at the moment.',tense:'Present Continuous',verb:'have',explanation:'Are having is continuous. Have means eat a meal here, rather than possess.'},
 {sentence:'You are speaking very clearly today.',tense:'Present Continuous',verb:'speak',explanation:'Are + speaking forms the present continuous and focuses on current behaviour.'},
 {sentence:'They visited the museum last Saturday.',tense:'Past Simple',verb:'visit',explanation:'Visited is a regular past-simple form. Last Saturday locates the visit in a finished past time.'},
 {sentence:'I sent the form yesterday.',tense:'Past Simple',verb:'send',explanation:'Sent is the irregular past form of send. No perfect auxiliary precedes it.'},
 {sentence:'She bought a ticket at the station.',tense:'Past Simple',verb:'buy',explanation:'Bought is the irregular past-simple form of buy.'},
 {sentence:'We were at home yesterday evening.',tense:'Past Simple',verb:'be',explanation:'Were is the past-simple form of be with we. There is no following -ing verb.'},
 {sentence:'He had a bicycle when he was a child.',tense:'Past Simple',verb:'have',explanation:'Had is a past-simple main verb meaning possessed. It is not followed by a past participle.'},
 {sentence:'I have finished all three activities.',tense:'Present Perfect',verb:'finish',explanation:'Have + finished forms the present perfect and presents a completed result.'},
 {sentence:'She has sent the message.',tense:'Present Perfect',verb:'send',explanation:'Has + the past participle sent forms the present perfect.'},
 {sentence:'We have visited that library twice.',tense:'Present Perfect',verb:'visit',explanation:'Have + visited forms the present perfect and counts experiences up to now.'},
 {sentence:'They have known each other for years.',tense:'Present Perfect',verb:'know',explanation:'Have + known is present perfect. A state can connect an earlier time with now.'},
 {sentence:'He has had three meetings today.',tense:'Present Perfect',verb:'have',explanation:'Has is the auxiliary and had is the past participle of the main verb have.'},
 {sentence:'I had finished the task before noon yesterday.',tense:'Past Perfect',verb:'finish',explanation:'Had + finished forms the past perfect, locating completion before a past reference point.'},
 {sentence:'She had already left by the time of our meeting.',tense:'Past Perfect',verb:'leave',explanation:'Had + left forms the past perfect. Already does not change the auxiliary pattern.'},
 {sentence:'We had booked the room before the deadline.',tense:'Past Perfect',verb:'book',explanation:'Had + booked forms the past perfect and looks back from a past deadline.'},
 {sentence:'They had never seen snow before that trip.',tense:'Past Perfect',verb:'see',explanation:'Had + seen is the past perfect. Never adds negative experience before the past trip.'},
 {sentence:'He had saved enough money by last June.',tense:'Past Perfect',verb:'save',explanation:'Had + saved forms the past perfect. Last June supplies the past reference point.'},
 {sentence:'I will call you tomorrow.',tense:'Future',verb:'call',explanation:'Will + the base form call expresses future time.'},
 {sentence:'She will bring her notes next time.',tense:'Future',verb:'bring',explanation:'Will is followed by the base verb bring in this future expression.'},
 {sentence:'We will meet outside the library.',tense:'Future',verb:'meet',explanation:'Will + meet is the future expression being identified here.'},
 {sentence:'The lesson will start at nine tomorrow.',tense:'Future',verb:'start',explanation:'Will + start expresses an event in the future.'},
 {sentence:'They will have more time next week.',tense:'Future',verb:'have',explanation:'Have is the base main verb after will here. There is no past participle, so this is not future perfect.'}
];
