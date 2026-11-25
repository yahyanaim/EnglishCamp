import { section } from "./authoring";
import type { InstructionSection } from "./types";

/**
 * Additive teaching for topics the existing chapters covered only partly or not at all.
 * Each entry is appended after the module's existing sections; nothing here replaces or
 * reorders authored teaching, activities or answers.
 */
const table = (s: InstructionSection, headers: string[], rows: string[][]): InstructionSection => ({ ...s, table: { headers, rows } });

export const courseSupplements: Record<string, InstructionSection[]> = {
  // ── Cambridge B2 First ────────────────────────────────────────────────
  "band1-ielts-intro": [
    table(section("Modal verbs: obligation, permission and deduction", `
Modal verbs add the speaker’s judgement: what is necessary, allowed or possible, and how certain a conclusion is. They take a bare infinitive (must go, not must to go) and no -s (she can). Many Part 4 keys depend on modal meaning. ‘It wasn’t necessary for you to bring food’ becomes ‘You needn’t have brought food’ when the food was actually brought; ‘You didn’t need to bring food’ only says it was not required.

Deduction about the past uses modal + have + past participle. Must have shows a confident conclusion, might/may/could have a possibility, and can’t/couldn’t have an impossibility: ‘I’m sure she forgot’ → ‘She must have forgotten’; ‘It’s impossible that he saw us’ → ‘He can’t have seen us’. Mustn’t is a prohibition, not a deduction: ‘You mustn’t park here’ differs from ‘You don’t have to park here’, which removes the obligation.`, {
      prompt: "Complete with three to five words, including the word in capitals. ‘I’m sure the parcel arrived yesterday.’ MUST → The parcel ___ yesterday. ‘It was a mistake not to book in advance.’ SHOULD → We ___ in advance.",
      answer: "Must have arrived; should have booked. The first is a confident past deduction, so must + have + past participle. The second criticises a past choice that did not happen, so should have + past participle rather than should book.",
    }), ["Meaning", "Present or future", "Past"], [
      ["Strong obligation", "must / have to", "had to"],
      ["No obligation", "don’t have to / needn’t", "didn’t have to; needn’t have done (done, but unnecessary)"],
      ["Prohibition", "mustn’t / can’t", "wasn’t allowed to / couldn’t"],
      ["Advice", "should / ought to / had better", "should have done (criticism or regret)"],
      ["Ability", "can / be able to", "could (general); was able to, managed to (one occasion)"],
      ["Confident deduction", "must", "must have done"],
      ["Possible deduction", "might / may / could", "might / may / could have done"],
      ["Negative deduction", "can’t / couldn’t", "can’t / couldn’t have done"],
    ]),
    table(section("Conditionals: zero, first, second and third", `
Each conditional pairs a condition with a result and shows how real the situation is. Zero states a general truth: ‘If you heat ice, it melts.’ First describes a real future possibility: ‘If it rains, we’ll stay inside.’ Second imagines an unreal or unlikely present or future: ‘If I had more time, I’d volunteer.’ Third imagines a past that did not happen: ‘If we had left earlier, we would have caught the train.’ When the if-clause comes second, no comma is needed: ‘We’ll stay inside if it rains.’

Transformations often replace if. Unless means if not: ‘If you don’t hurry, you’ll miss the bus’ → ‘Unless you hurry, you’ll miss the bus.’ Provided (that) and as long as make a condition stricter. In case describes a precaution, not a condition: ‘Take an umbrella in case it rains’ means take it anyway. Wish and if only express regret: ‘I regret not studying harder’ → ‘I wish I had studied harder.’`, {
      prompt: "‘We didn’t go to the beach because it was raining.’ WOULD → If it hadn’t been raining, we ___ to the beach. ‘You can borrow my car if you return it by six.’ LONG → You can borrow my car ___ it by six.",
      answer: "Would have gone; as long as you return. The first imagines a different past result, so would have + past participle. The second keeps the real condition and its time limit; as long as expresses the same requirement as if.",
    }), ["Type", "If-clause", "Main clause", "Use"], [
      ["Zero", "present simple", "present simple", "general truths and rules"],
      ["First", "present simple", "will / can / may + verb", "real future possibility"],
      ["Second", "past simple (were)", "would / could / might + verb", "unreal present or unlikely future"],
      ["Third", "past perfect", "would / could / might have + past participle", "unreal past"],
    ]),
  ],
  "band1-toefl-intro": [
    table(section("Parts of speech: name every word’s job", `
Word formation moves mainly between four open word classes: nouns, verbs, adjectives and adverbs. The closed classes – pronouns, determiners, prepositions and conjunctions – rarely change form, but they tell you which open class a gap needs. ‘___ it rained, the event went ahead’ needs a conjunction because a full clause follows; despite, a preposition, would need a noun phrase (despite the rain).

Some words belong to more than one class, so decide from the sentence, not from the dictionary entry you remember. ‘The team will present the present’ uses one spelling as a verb and then a noun. Fast and hard are both adjectives and adverbs; hardly is a different word meaning almost not. Before adding a suffix, name the class the position requires, then choose the family member that belongs to it.`, {
      prompt: "Name the class needed, then complete. ‘The museum’s ___ (POPULAR) has grown.’ ‘Staff responded ___ (QUICK).’ ‘___ the warning, people stayed on the beach.’ (despite / although)",
      answer: "Popularity: a noun after the possessive and the subject of has grown. Quickly: an adverb describing how they responded. Despite: the warning is a noun phrase, not a clause, so the preposition fits; although would need a clause such as ‘although there was a warning’.",
    }), ["Class", "Job in the sentence", "Typical signals", "Example"], [
      ["Noun", "names a person, thing or idea; subject or object", "-tion, -ment, -ness, -ity, -ance; after a, the or a possessive", "Their arrival was delayed."],
      ["Verb", "action or state; carries tense", "-ise, -en, -ify; after a subject or modal", "The rain may weaken tonight."],
      ["Adjective", "describes a noun; follows be, seem, become", "-ful, -less, -ive, -able, -ous, -al", "The plan seems realistic."],
      ["Adverb", "modifies a verb, adjective, adverb or clause", "often -ly, but also fast, well, hard", "Prices rose sharply."],
      ["Pronoun", "replaces a noun phrase", "he, it, which, who, themselves", "The guide, who knew the area, led us."],
      ["Determiner", "introduces and limits a noun", "a, the, this, some, each, their", "Each applicant needs identification."],
      ["Preposition", "links a noun phrase to the sentence", "in, during, despite, because of", "Despite the delay, we arrived."],
      ["Conjunction", "links clauses or equal items", "and, but, although, because, unless", "Although it was late, we stayed."],
      ["Interjection", "reacts; stands outside the grammar", "oh, wow, well", "Well, that was unexpected."],
    ]),
  ],
  "band1-ielts-vs-toefl": [
    table(section("The complete tense map: time plus aspect", `
An English verb form combines a time – present, past or future – with an aspect: simple, continuous, perfect or perfect continuous. That gives twelve combinations. The earlier sections practised the past and present forms in context; use the map to locate any form by asking two questions: when is the viewpoint, and is the event complete, in progress, or connected to a later point?

Two contrasts cause most B2 errors. The present perfect connects the past to now and cannot take a finished time expression (‘I have visited Rome in 2019’ ✗ → ‘I visited Rome in 2019’). The perfect continuous highlights duration and may leave the activity unfinished (‘I have been reading the report’), while the perfect simple highlights a result (‘I have read the report’).`, {
      prompt: "Name the form and its meaning, then correct any error: ‘I have finished the report yesterday.’ ‘By next year, she will work here for a decade.’",
      answer: "‘I finished the report yesterday’: yesterday is a finished time, so past simple, not present perfect. ‘By next year, she will have worked (or will have been working) here for a decade’: by + a future point needs a perfect form to look back from that point.",
    }), ["Form", "Example", "Core meaning"], [
      ["Present simple", "She teaches on Mondays.", "habit, fact, timetable"],
      ["Present continuous", "She is teaching now. / She is teaching at six tomorrow.", "in progress around now; fixed arrangement"],
      ["Present perfect", "She has taught here since 2020.", "past connected to now; result or unfinished period"],
      ["Present perfect continuous", "She has been teaching all morning.", "duration up to now"],
      ["Past simple", "She taught there in 2019.", "finished, dated past"],
      ["Past continuous", "She was teaching when the alarm rang.", "background in progress at a past point"],
      ["Past perfect", "She had left before the call came.", "earlier than another past point"],
      ["Past perfect continuous", "She had been waiting for an hour when it arrived.", "duration up to a past point"],
      ["Future simple", "I’ll call you later. / Prices will probably rise.", "decision while speaking, prediction, promise"],
      ["Future continuous", "This time tomorrow I’ll be travelling.", "in progress at a future point"],
      ["Future perfect", "By June she will have finished.", "complete before a future point"],
      ["Future perfect continuous", "By June she will have been teaching for ten years.", "duration up to a future point"],
    ]),
    section("Future forms: choose by plan, evidence and timetable", `
English has no single future tense. Use will for a decision made while speaking (‘I’ll take the blue one’) and for predictions based on opinion. Use be going to for an intention already decided and for a prediction from present evidence (‘Look at those clouds – it’s going to rain’). Use the present continuous for a personal arrangement with a time (‘I’m meeting my tutor at four’) and the present simple for timetables (‘The train leaves at 6.15’).

By + a time often signals the future perfect in transformations: ‘The builders will finish before Friday’ → ‘By Friday, the builders will have finished.’ By means no later than; until means continuing up to that point: ‘I’ll be at the office until six’ but ‘I’ll have sent it by six.’`, {
      prompt: "Choose the form. (a) ‘Wait – I ___ help you with that bag.’ (b) ‘We ___ my aunt this weekend; we booked the tickets last month.’ (c) ‘By the time you arrive, we ___ dinner.’",
      answer: "(a) ’ll help: a decision made at the moment of speaking. (b) are visiting or are going to visit: an arrangement or intention already made, so will would sound like a new decision. (c) will have finished: completed before a future point.",
    }),
  ],
  "band1-vocab-synonyms": [
    table(section("Reported speech: report the meaning, adjust the frame", `
When you report what someone said, change whatever the new viewpoint requires: pronouns, time and place words, and usually the tense when the reporting verb is past. ‘“I’m leaving tomorrow,” Sam said’ becomes ‘Sam said (that) he was leaving the next day.’ Backshift is optional when the information is still true: ‘She said the museum opens at nine’ is correct if it still does.

Reported questions use statement word order and no question mark: ‘“Where do you live?”’ → ‘She asked where I lived.’ Yes/no questions use if or whether. Requests and orders use ask/tell + object + to-infinitive: ‘He told us to wait’, ‘She asked me not to shout’. Part 4 often uses reporting verbs that summarise the function: advise someone to do, suggest doing or suggest that someone do (never suggest someone to do), deny doing, apologise for doing, accuse someone of doing, refuse to do, warn someone not to do.`, {
      prompt: "‘“Let’s take a taxi,” Ana said.’ SUGGESTED → Ana ___ a taxi. ‘“I didn’t break the window,” said Tom.’ DENIED → Tom ___ the window.",
      answer: "Suggested taking (or suggested that they take); denied breaking (or denied having broken). Suggest is followed by -ing or a that-clause, and deny by -ing. Both reporting verbs carry the speech act, so the original words are not repeated.",
    }), ["Direct speech", "Reported after a past reporting verb"], [
      ["present simple: ‘I work’", "past simple: he worked"],
      ["present continuous: ‘I am working’", "past continuous: he was working"],
      ["present perfect or past simple: ‘I have worked / I worked’", "past perfect: he had worked"],
      ["will / can / may", "would / could / might"],
      ["today / tomorrow / yesterday", "that day / the next day / the day before"],
      ["here / this / now", "there / that / then"],
    ]),
    table(section("Gerund or infinitive: the first verb decides", `
Some verbs are followed by -ing: enjoy, avoid, finish, mind, consider, deny, risk, keep, can’t help. Others take a to-infinitive: decide, hope, agree, refuse, manage, afford, offer, plan, promise, seem. After a preposition, always use -ing: interested in joining, instead of waiting, look forward to hearing (here to is a preposition). Some verbs take an object + to-infinitive (allow, encourage, persuade, want someone to do); make and let take an object + bare infinitive (‘They made us wait’).

A few verbs change meaning with the pattern, and Part 4 tests them. Learn each pair as two different expressions rather than one verb with a free choice.`, {
      prompt: "Complete. ‘I remember ___ (LOCK) the door – I can picture the key in my hand.’ ‘Remember ___ (LOCK) the door when you leave.’ ‘I’m looking forward to ___ (MEET) you.’",
      answer: "Locking: a memory of a completed action. To lock: a task still to do. Meeting: to is a preposition in look forward to, so -ing follows.",
    }), ["Verb", "+ -ing", "+ to-infinitive"], [
      ["stop", "quit an activity: He stopped smoking.", "pause in order to do something: He stopped to rest."],
      ["remember / forget", "memory of a past action", "a task you must or must not forget to do"],
      ["try", "an experiment to see what happens: Try restarting it.", "an effort that may fail: I tried to open it."],
      ["regret", "sorry about the past: I regret leaving.", "formal announcement now: We regret to inform you…"],
      ["go on", "continue the same activity", "move to the next stage or activity"],
    ]),
  ],
  "band1-speaking-independent": [
    section("Comparatives and superlatives that carry a comparison", `
One-syllable adjectives add -er and -est (cheaper, the cheapest); two-syllable adjectives ending in -y change to -ier and -iest (busier); most longer adjectives use more and most (more relaxing, the most relaxing). Good, bad and far are irregular: better/best, worse/worst, further/furthest. Use fewer with countable nouns and less with uncountable ones: fewer people, less noise.

Grade the difference instead of stopping at a bare comparative: much, far or considerably for a big gap (far busier), slightly or a bit for a small one, not quite as … as, nowhere near as … as, twice as … as. The double comparative links two changes: ‘The longer you wait, the harder it gets.’ In the long turn, add the reason that makes the comparison useful: ‘The people in the first photo seem far more relaxed than those in the second, probably because they are not working to a deadline.’`, {
      prompt: "‘The second hotel was less expensive than the first.’ AS → The second hotel wasn’t ___ the first. Then complete: ‘The ___ (MANY) people arrived, the ___ (NOISY) it became.’",
      answer: "As expensive as. More; noisier. The double comparative uses the + comparative in both halves; noisy follows the -y rule.",
    }),
  ],
  "band1-writing-task1-overview": [
    section("Topic sentences and supporting sentences", `
A topic sentence states what the whole paragraph will prove; the supporting sentences then explain why, give an example, show a consequence or add a limit. ‘Public transport should be free for students’ is a position. ‘Free travel would let students choose courses by quality rather than distance’ works as a topic sentence for one paragraph because every following sentence can be checked against it.

Test unity by covering the topic sentence and reading the support. If a sentence would not help a reader guess the topic sentence, move it or delete it. One paragraph develops one controlling idea; a second main reason needs a new paragraph with its own topic sentence.`, {
      prompt: "Which sentence breaks the unity of this paragraph, and why? ‘Learning to cook at school would improve young people’s health. Many teenagers rely on processed food because they cannot prepare meals. Cooking classes would teach simple, affordable recipes. Schools also need more sports facilities.’",
      answer: "The last sentence. Sports facilities may also affect health, but the controlling idea is that cooking lessons improve health. That point belongs in a separate paragraph or should be removed.",
    }),
    table(section("Conjunctions, linking adverbs and the punctuation between them", `
Coordinating conjunctions (and, but, or, so, yet) join two main clauses inside one sentence, usually with a comma when both clauses are long: ‘The tickets were expensive, but the show was worth it.’ Subordinating conjunctions (although, because, while, whereas, unless, since, so that) introduce a dependent clause. Put a comma after that clause when it comes first: ‘Although the tickets were expensive, the show was worth it.’ No comma is usual when it comes second.

Linking adverbs such as however, therefore, moreover and nevertheless are not conjunctions. They cannot join two sentences with only a comma; use a full stop or a semicolon before them and a comma after: ‘The tickets were expensive; however, the show was worth it.’ Despite and in spite of are prepositions, so they take a noun or -ing form, not a clause: ‘despite the price’, ‘despite being expensive’.`, {
      prompt: "Correct both. ‘Many people work from home, however offices are still busy.’ ‘Despite it was cold, we swam.’",
      answer: "‘Many people work from home; however, offices are still busy.’ (or a full stop before However, or ‘…home, but offices…’). ‘Although it was cold, we swam.’ or ‘Despite the cold, we swam.’",
    }), ["Relationship", "Conjunction (joins clauses)", "Linking adverb (new sentence)", "Preposition (+ noun or -ing)"], [
      ["Contrast", "but, although, whereas", "however, nevertheless", "despite, in spite of"],
      ["Reason", "because, since, as", "—", "because of, due to"],
      ["Result", "so", "therefore, as a result, consequently", "—"],
      ["Addition", "and", "moreover, in addition, furthermore", "in addition to, as well as"],
      ["Condition", "if, unless, provided that", "otherwise", "—"],
    ]),
  ],

  // ── IELTS Academic ─────────────────────────────────────────────────────
  "band2-listening-mcq": [
    section("The same answer in different accents", `
IELTS recordings use a range of English accents – British, Australian, New Zealand, North American and others – and Part 1 often asks for spelled names, numbers and postcodes. Prepare for letters and numbers that sound different. Z is ‘zed’ in British and Australian English and ‘zee’ in American English. H may be ‘aitch’ or ‘haitch’. Speakers say ‘double’ or ‘triple’ for repeated characters (double seven = 77) and ‘oh’ for zero in phone numbers. Thirteen and thirty differ mainly in stress: thirTEEN, THIRty.

Vowels and consonants also vary. Bath, can’t and dance have a long /ɑː/ in southern British English but /æ/ in North American English. Many American and Australian speakers make a t between vowels sound like a quick d (water, better), and North American speakers pronounce an r after a vowel (car, form) that southern British speakers drop. Use the category you predicted and the grammar of the gap to confirm the word; do not change the spelling because a vowel sounded unfamiliar.`, {
      prompt: "A caller spells her surname: ‘double-u, aitch, I, double-T, L, E’, and gives her number as ‘oh-seven-seven, double-four, THIRty’. Write both.",
      answer: "WHITTLE; 0774430. Double-T is two Ts, ‘oh’ is zero, and stress on the first syllable means thirty, not thirteen.",
    }),
  ],
  "band2-vocab-awl2": [
    table(section("Antonyms and negation: recognising the opposite claim", `
Paraphrase questions test synonyms, but TRUE/FALSE/NOT GIVEN and multiple choice also test opposites. An antonym can be a different word (increase/decline, scarce/abundant, permanent/temporary), a negative prefix (likely/unlikely, accurate/inaccurate, legal/illegal, agree/disagree) or a negative structure (few, hardly any, failed to, no longer). ‘The method is rarely used’ contradicts ‘The method is common’, so the statement is FALSE, not NOT GIVEN.

Separate gradable antonyms from complementary ones. Gradable pairs such as cheap/expensive leave a middle ground: ‘not expensive’ does not mean cheap. Complementary pairs such as present/absent leave no middle: if one is true, the other is false. Check scope too: ‘Most participants improved’ is not contradicted by ‘Some participants did not improve’.`, {
      prompt: "Statement: ‘The new procedure was inexpensive.’ Text: ‘The procedure was not as costly as the older method.’ TRUE, FALSE or NOT GIVEN?",
      answer: "NOT GIVEN. Expensive/inexpensive is a gradable pair. Being cheaper than an older method does not establish a low cost; the text gives no absolute price judgement.",
    }), ["Type", "Example pair", "What it means for the answer"], [
      ["Different word", "increase / decline", "direct contradiction if the measure and period match"],
      ["Negative prefix", "reliable / unreliable", "opposite meaning; check which prefix the word actually takes"],
      ["Negative structure", "many / few (not a few)", "few = not many; a few = some"],
      ["Gradable", "expensive / cheap", "‘not expensive’ ≠ cheap; a middle ground is possible"],
      ["Complementary", "present / absent", "no middle ground"],
    ]),
  ],
  "band2-vocab-collocations": [
    table(section("Comparative and superlative structures for data", `
Task 1 comparisons need their size: ‘Spending on rail was almost twice as high as spending on air travel’, ‘the second-largest share’, ‘the least popular option’. Choose modifiers that match the numbers: slightly or marginally for a small gap, considerably, significantly or far for a large one. Do not use very with a comparative: very higher ✗ → much higher.

Keep the comparison parallel. ‘Higher than in 2010’ compares the same measure in two years; ‘higher than 2010’ compares a figure with a year. Use that of or those of to avoid comparing a country with a number: ‘The proportion in Japan was higher than that of Korea.’ A superlative needs a defined set: ‘the highest of the five countries’, ‘the largest proportion in any year shown’.`, {
      prompt: "Correct: ‘The number of cyclists in 2020 was more higher than 2015, and London had the most big increase.’",
      answer: "‘The number of cyclists in 2020 was much higher than in 2015, and London had the biggest (or largest) increase.’ More is not added to a comparative ending in -er; than in keeps the comparison between years; big takes -est.",
    }), ["Meaning", "Structure", "Example"], [
      ["Large difference", "much / far / considerably + comparative", "far higher than in 2010"],
      ["Small difference", "slightly / marginally + comparative", "slightly lower than the average"],
      ["Equal or nearly equal", "as … as / almost as … as", "almost as popular as cycling"],
      ["Multiple", "twice / three times as … as", "twice as high as in 2005"],
      ["Rank", "the second-largest, the least + adjective", "the second-largest share"],
      ["Avoid repetition", "that of / those of", "higher than that of Korea"],
    ]),
  ],
  "band2-writing-cohesion": [
    section("Write a topic sentence the paragraph can prove", `
In a Task 2 body paragraph the opening sentence sets the controlling idea. ‘There are many reasons for traffic congestion’ only names a topic; the reader cannot tell what the paragraph will argue. ‘The main cause of urban congestion is the lack of affordable alternatives to driving’ commits to a claim that the next sentences can develop through explanation, a specific example and a limitation. A clear central idea in each paragraph is part of Coherence and Cohesion.

Make the topic sentence as wide as its evidence. If the support discusses only young commuters, the topic sentence should not claim ‘everyone’. Draft it after planning the support, then reread the finished paragraph and adjust whichever is wider.`, {
      prompt: "Improve this topic sentence for a paragraph about recorded lectures helping students who work part-time: ‘Technology is an important issue in education.’",
      answer: "For example: ‘Recorded lectures make university study more accessible to students who work part-time.’ It names the specific claim the support goes on to prove instead of a broad subject area.",
    }),
    table(section("Punctuation and capitalisation that examiners notice", `
Grammatical Range and Accuracy includes punctuation, so repeated errors limit the score even when vocabulary is strong. Common problems are comma splices (‘Prices rose, however demand fell’ → ‘Prices rose; however, demand fell’), a missing comma after a long introductory phrase or clause, missing commas around a non-defining relative clause (‘London, which has nine million residents, …’), and apostrophes: its (possessive) and it’s (it is), the government’s decision, people’s, but plurals without an apostrophe (the 1990s).

Capitalise proper nouns and adjectives (Japan, Japanese, the United Nations), days and months (Monday, March) and the first word of a sentence, but not seasons (summer) or general nouns used for emphasis (education, the government, unless part of a title). Avoid full capitals for emphasis and exclamation marks in academic writing.`, {
      prompt: "Correct: ‘In the 1990’s the governments spending on Education rose, however it’s share of the budget fell in the Summer of 1998.’",
      answer: "‘In the 1990s, the government’s spending on education rose; however, its share of the budget fell in the summer of 1998.’ No apostrophe in 1990s; possessive government’s; lower-case education and summer; a semicolon before however; its without an apostrophe.",
    }), ["Error", "Correction", "Rule"], [
      ["Sales rose, however profits fell.", "Sales rose; however, profits fell.", "a linking adverb cannot join sentences with a comma"],
      ["Its clear that it’s cost rose.", "It’s clear that its cost rose.", "it’s = it is; its = possessive"],
      ["The 1990’s", "The 1990s", "plural decades take no apostrophe"],
      ["in Spring, the Government", "in spring, the government", "seasons and general nouns are lower case"],
      ["The city which is the capital has…", "The city, which is the capital, has…", "commas around a non-defining clause"],
    ]),
  ],
  "band2-speaking-describe": [
    table(section("Use IPA to check the sounds that matter", `
Dictionaries show pronunciation in the International Phonetic Alphabet (IPA). You only need the symbols that separate words you confuse. The schwa /ə/ is the most common English vowel and appears in unstressed syllables: about /əˈbaʊt/, problem /ˈprɒbləm/ (British). The mark ˈ comes before the stressed syllable, and ː shows a long vowel.

Endings have predictable sounds. Past -ed is /t/ after voiceless sounds (worked, watched), /d/ after voiced sounds (played, lived) and /ɪd/ after t or d (wanted, needed). Plural -s is /s/ (cats), /z/ (dogs) or /ɪz/ (buses). Pronunciation is assessed on how easily you are understood, not on matching one accent; use IPA to fix the contrasts that cause misunderstanding.`, {
      prompt: "Give the -ed sound in decided, stopped and travelled.",
      answer: "/ɪd/, /t/, /d/. Decided ends in d, so an extra syllable is added; stopped ends in voiceless p; travelled ends in voiced l.",
    }), ["Symbol", "As in", "Often confused with"], [
      ["/ɪ/", "ship, live (verb)", "/iː/ sheep, leave"],
      ["/æ/", "hat, cap", "/ʌ/ hut, cup"],
      ["/ɜː/", "work, bird", "/ɔː/ walk, board"],
      ["/θ/", "think, three", "/s/ sink, /t/ tree"],
      ["/v/", "vine, very", "/w/ wine, /b/ berry"],
      ["/ə/", "about, the (weak form)", "a full vowel in every syllable"],
    ]),
  ],

  // ── TOEFL iBT 2026 ─────────────────────────────────────────────────────
  "band3-listening-lecture": [
    table(section("Abbreviations and symbols for fast notes", `
Lecture notes need relationships, not full sentences. A consistent personal system saves time: an arrow for cause or result, up and down arrows for increase and decrease, = and ≠ for definitions and contrasts, e.g. for examples, b/c for because, w/ and w/o for with and without, and ? for a claim the lecturer questions. Write a long key term once in full, then abbreviate it (photosynthesis → PS).

Lay the notes out in levels: main idea at the margin, mechanisms indented, examples indented further, so the hierarchy from the first section stays visible. If you miss something, leave a gap and keep listening; the next sentence often supplies the link. Mark signals of importance – ‘The key point is…’, ‘However, recent studies…’, ‘So, to sum up…’ – because questions often target the main point, the purpose of an example and the speaker’s attitude.`, {
      prompt: "Turn into notes: ‘Bees are declining mainly because of habitat loss; pesticides also play a role, although researchers disagree about how large that role is.’",
      answer: "bees ↓ — main: habitat loss; + pesticides (size? researchers ≠). The note keeps the ranking (main vs additional cause) and the disagreement, which a question about the speaker’s certainty could target.",
    }), ["Symbol", "Meaning", "Example note"], [
      ["→", "causes / leads to", "drought → crop failure"],
      ["↑ ↓", "increases / decreases", "temp ↑ → ice ↓"],
      ["= / ≠", "means / differs from", "mimicry ≠ camouflage"],
      ["e.g.", "example", "e.g. leaf insect"],
      ["b/c, w/, w/o", "because, with, without", "fails w/o water"],
      ["?", "uncertain or disputed", "pesticides (size?)"],
    ]),
  ],
  "band3-grammar-conditionals": [
    table(section("Complete the set: zero, first, second and third conditionals", `
The earlier sections used real conditions and one imagined case. Two further types are common in academic talks and discussions. Zero conditionals state general rules or scientific facts with present + present: ‘If water reaches 100°C at sea level, it boils.’ Third conditionals imagine a past that did not happen with past perfect + would have + past participle: ‘If the researchers had used a larger sample, they would have reached a firmer conclusion.’ The second conditional stays unreal in the present or future: ‘If the library opened earlier, more students would use it.’

A mixed conditional joins a past condition to a present result: ‘If I had applied last year, I would be a member now.’ In listening, a third conditional usually means the speaker is describing what did not happen, which is a common inference question. In Build a Sentence, the verb in the if-clause carries the tense; would does not go inside the if-clause: ‘If I would have known’ ✗ → ‘If I had known’.`, {
      prompt: "A professor says: ‘If the team had measured the temperature at night, they would have noticed the pattern.’ Did the team measure at night? Did they notice the pattern?",
      answer: "No to both. The third conditional describes an unreal past, so the professor is pointing to a limitation in the team’s method.",
    }), ["Type", "If-clause", "Main clause", "Reality"], [
      ["Zero", "present", "present", "always true when the condition holds"],
      ["First", "present", "will / may / can + verb", "real future possibility"],
      ["Second", "past (were)", "would / could + verb", "unreal or unlikely now or in the future"],
      ["Third", "past perfect", "would / could have + past participle", "did not happen in the past"],
      ["Mixed", "past perfect", "would + verb", "past cause, present result"],
    ]),
  ],
  "band3-writing-discussion": [
    section("Verb patterns: -ing or to after the main verb", `
When building a sentence, a second verb must fit the pattern of the verb before it. Avoid, enjoy, finish, consider, mind and keep take -ing: ‘I’m considering joining the club’, not ‘considering to join’. Decide, plan, hope, agree, need, want and afford take to + verb: ‘She decided to change the course.’ After a preposition, always use -ing: interested in, instead of, before, after, look forward to.

Some verbs take an object first: ask, encourage, remind and allow someone to do; let and make someone do, without to (‘The tutor let us leave early’). If the supplied tokens include both to and an -ing form, decide which verb controls each slot before ordering the words.`, {
      prompt: "Order the tokens: [forward / I / look / to / hearing / from you] and [decided / she / the course / to / change].",
      answer: "‘I look forward to hearing from you.’ – to is a preposition here, so -ing follows. ‘She decided to change the course.’ – decide takes a to-infinitive.",
    }),
  ],
  "band3-speaking-part3": [
    section("Copy the intonation, not only the words", `
In Listen and Repeat, the melody of the model carries meaning. A statement usually falls at the end to show it is complete (‘The lab closes at five↘’). Yes/no questions usually rise (‘Is the lab open↗?’), while wh-questions usually fall (‘Where is the lab↘?’). In a list, each item rises except the last, which falls: ‘pens↗, paper↗ and a calculator↘’. Copying these patterns also helps you remember the sentence’s structure.

The main stress, or tonic, falls on new or contrasted information, usually the last content word: ‘The meeting moved to TUESDAY’, but ‘The MEETING moved, not the class.’ Thought groups end with a small pitch movement and a short pause at clause boundaries. Repeat at the model’s pace; slowing down every word flattens the intonation and makes the sentence sound like a list.`, {
      prompt: "Mark the pitch at the end of each: ‘Do you need a student card?’ / ‘Bring your card, a pen and some water.’",
      answer: "A rise on the yes/no question. In the list: a rise on card and pen, then a fall on water to show the list is complete.",
    }),
  ],

  // ── IELTS General & High-Band Masterclass ─────────────────────────────
  "band4-listening-accents": [
    table(section("Regional accents: predictable differences", `
IELTS uses a range of English accents, and their differences are systematic enough to anticipate. North American, Scottish and Irish speakers pronounce r after a vowel (car, word); southern British, Australian and New Zealand speakers usually do not, so order can sound like ‘or-duh’. A t between vowels often becomes a quick d-like sound in North American and Australian speech (city, matter) and a glottal stop in some British accents (bottle, get it). Vowels shift too: a New Zealand ‘six’ can sound like ‘sux’ to an unfamiliar listener, and British bath /ɑː/ contrasts with American /æ/.

An unfamiliar accent is hardest in the first few seconds; listeners adapt quickly if they keep processing instead of stopping on one word. Rely on your prediction (category, gap grammar, topic) and wait for repetition or paraphrase of key information. Practise with the same type of content – news, interviews, podcasts – from speakers of different regions, and note which sounds surprised you.`, {
      prompt: "A New Zealand speaker gives a price that sounds like ‘SUX-ty dollars’. What do you write, and why?",
      answer: "$60. The vowel shift makes six sound like ‘sux’, and stress on the first syllable means sixty; sixteen would be stressed on the second syllable (sixTEEN).",
    }), ["Feature", "Where common", "Example"], [
      ["r pronounced after a vowel", "North America, Scotland, Ireland", "car, word, order"],
      ["r dropped after a vowel", "southern England, Australia, New Zealand", "car ≈ ‘cah’"],
      ["t as a quick d", "North America, Australia", "water, city"],
      ["t as a glottal stop", "parts of Britain", "bottle, get it"],
      ["Front vowels shift", "New Zealand, Australia", "six ≈ ‘sux’; day ≈ ‘dye’"],
      ["bath, dance vowel", "/ɑː/ southern Britain; /æ/ North America", "can’t, path"],
    ]),
  ],
  "band4-writing-complex-ideas": [
    section("Topic sentences that commit to a qualified claim", `
At a high band, a topic sentence states the paragraph’s exact contribution to the argument, including its limits: ‘Remote work benefits employees mainly where their tasks can be measured by output rather than presence.’ Compare ‘Remote work has advantages’, which leaves the paragraph free to drift. The qualification – mainly where – tells the reader what the supporting sentences must show: an output-based example, the mechanism, and a case where presence still matters.

Each supporting sentence should advance one step: mechanism, example, then implication or limitation. If two consecutive sentences make the same point in different words, cut one; repetition reads as limited development, not emphasis. The same applies to everyday General Training topics: a clear controlling idea matters more than formal vocabulary.`, {
      prompt: "Rewrite so it commits to a position: ‘There are both good and bad points about living in a big city.’",
      answer: "For example: ‘City life benefits young professionals most, because access to careers outweighs higher housing costs at that stage of life.’ It names who benefits, the reason and the trade-off the paragraph will defend.",
    }),
  ],
  "band4-writing-grammatical-range": [
    section("Mixed conditionals: when the times differ", `
A mixed conditional combines an unreal condition and result from different times. A past condition with a present result uses if + past perfect and would + verb: ‘If the council had invested in cycle lanes ten years ago, the city centre would be less congested now.’ A present or permanent condition with a past result uses if + past simple and would have + past participle: ‘If I were more organised, I would have submitted the form on time.’ Use them when the logic genuinely crosses time, not to display range.

Check that both halves are unreal. The first example implies the council did not invest and the centre is congested; the second implies the writer is not organised and did not submit. Do not mix in a real result: ‘If they had invested, the city will be…’ ✗. In General Training letters a mixed conditional can explain a problem precisely: ‘If the delivery had arrived on Monday, I would not be writing to you now.’`, {
      prompt: "Combine into one sentence: ‘The company didn’t train its staff properly. Customers are still complaining today.’",
      answer: "‘If the company had trained its staff properly, customers would not still be complaining today.’ A past condition with a present result: past perfect, then would + verb.",
    }),
  ],
  "band4-speaking-pronunciation": [
    section("Intonation and tonic stress carry attitude", `
Intonation shows how you feel about what you say and which part matters. A clear fall sounds definite: ‘That’s a good IDEA↘.’ A fall-rise signals reservation or an unstated contrast: ‘The location is GOOD↘↗…’ suggests something else is not. A flat tone across a long answer can sound uninterested even when the vocabulary is advanced. The higher Pronunciation bands describe using intonation flexibly to convey precise meaning.

Move the tonic stress to show contrast or correction: ‘I didn’t say the PROJECT failed’ versus ‘I didn’t say the project FAILED’ – the second implies problems short of failure. Question tags fall when you expect agreement (‘It’s expensive, isn’t it↘?’) and rise when you genuinely ask (‘You’re from Leeds, aren’t you↗?’). Record one Part 3 answer twice, once flat and once with a deliberate fall on each conclusion, and compare which is easier to follow.`, {
      prompt: "The examiner asks, ‘So you moved to the city for your studies?’ Reply that the reason was work. Which word carries the main stress?",
      answer: "‘No, I moved for WORK.’ The tonic falls on work because it is the new, contrasting information that corrects the assumption.",
    }),
  ],
};
