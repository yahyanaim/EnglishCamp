import { chapter as c, section as s } from "./authoring";
import type { InstructionChapter } from "./types";
export const foundationLessons: Record<string, InstructionChapter> = {
"band1-ielts-intro": {
  "mode": "replace",
  "outcomes": [
    "Choose a cloze answer by meaning, grammar and collocation.",
    "Supply a function word that connects both sides of an open gap.",
    "Reformulate a sentence without changing its meaning or the key word."
  ],
  "prerequisite": "Be able to find the subject and verb of a simple clause. Module 3 reinforces time reference; Modules 18–19 explain articles and agreement. A collocation is a conventional combination, such as make a decision. A function word, such as an article or preposition, expresses a grammatical relationship rather than naming a new topic.",
  "sections": [
    {
      "title": "Reading a gap as part of a sentence",
      "paragraphs": [
        "A gap is constrained by what comes before and after it. In ‘The volunteers ___ responsibility for the event’, several verbs might describe the general topic, but take responsibility is the conventional combination. In ‘The volunteers ___ responsible for the event’, the adjective responsible needs a linking verb, such as are. Similar meaning does not create identical grammar. Read the complete clause before comparing individual options.",
        "Distinguish a collocation from a phrasal verb. Raise awareness combines an ordinary verb and noun; set up is a verb with a particle that together can mean establish. Record the whole usable expression and its pattern: offer advice to someone, pay attention to something, make a difference to something. When two options have similar dictionary meanings, the surrounding pattern can decide between them. ‘Do a difference’ fails the collocation even though do and make both describe actions."
      ]
    },
    {
      "title": "Try one combination before a mixed cloze",
      "paragraphs": [
        "Begin with the completed expression “pay attention to the announcement”. Pay does not mean transfer money here; the whole combination means attend carefully. Compare “draw attention to a fault”: draw directs somebody else’s notice. The same noun does not make the two verbs interchangeable.",
        "Complete only the verb first: “The instructor asked us to ___ attention to the warning.” Choose pay / draw, then explain whose attention is involved. Next remove the options: “The bright label ___ attention to the fault.” Read the entire message before choosing a familiar verb."
      ],
      "check": {
        "prompt": "Complete the two messages. Would “make attention” fit either?",
        "answer": "Pay / draws. In the first, listeners are asked to attend; in the second, the label directs notice. Make attention is not the established combination. Record the complete patterns, not a rule that attention always takes one verb."
      }
    },
    {
      "title": "Open cloze: relationships carried by small words",
      "paragraphs": [
        "In an open cloze, decide what kind of connection the gap needs. ‘I have worked here ___ 2021’ identifies a starting point, so since fits. ‘I have worked here ___ four years’ gives duration, so for fits. ‘We meet ___ Fridays’ needs on for a repeated day. A preposition can also belong to a lexical pattern: interested in research and depend on funding.",
        "Read across clause boundaries. ‘Several students joined, all of whom live nearby’ uses whom after of to refer to people. ‘We shared the notes so that everyone could catch up’ marks purpose; that completes the conjunction. ‘The notes are clearer than before’ introduces comparison. ‘She was absent, so we sent her the notes’ expresses a result. Choosing because there would reverse the direction of explanation. Yet commonly marks a not-completed expectation: ‘We have not finished yet.’ These words must fit the meaning as well as the local grammar."
      ],
      "check": {
        "prompt": "Explain the difference: ‘We stayed because it was useful’ and ‘It was useful, so we stayed.’",
        "answer": "Because introduces the reason for staying. So introduces the consequence of the usefulness. Both can describe the same relationship, but their clauses are arranged differently; the words cannot simply exchange positions."
      }
    },
    {
      "title": "Complete a relationship in two steps",
      "paragraphs": [
        "Worked decision: “We left early ___ we could catch the last ferry.” The second clause is the intended purpose, so “so that” expresses the relationship; a one-word gap after an already supplied so would require that. Check the gap boundaries before entering words.",
        "Now finish “We took a map so ___ we could find the trail.” Then create the reverse explanation: “We could find the trail ___ we had a map.” One expresses purpose and the other reason. A plausible story is not enough unless the connector fits that story."
      ],
      "check": {
        "prompt": "Supply the two missing words, then explain why they cannot simply exchange places.",
        "answer": "That / because. So that introduces the intended result of taking the map. Because supplies the reason for being able to find the trail. “So because” does not form the required conjunction."
      }
    },
    {
      "title": "Transformations: keep the event, change the construction",
      "paragraphs": [
        "A transformation gives a second sentence with a gap and an unchanged key word. For B2 First key word transformations, use two to five words including that key word. Count the words in the gap, not the whole second sentence. The surrounding second sentence may already supply an article, pronoun or infinitive, so do not duplicate it. Meaning includes the actor, time, negation, degree and strength of obligation.",
        "Consider ‘They postponed our visit.’ With OFF: ‘They put off our visit.’ Put off preserves the action, whereas put away would describe storage. Consider ‘Lina started working here in 2020 and still works here.’ With SINCE: ‘Lina has worked here since 2020.’ The present perfect connects the start with now. For a duration, use for: ‘Lina has worked here for six years.’ Replacing this with a simple finished past may incorrectly suggest the employment ended.",
        "Degree constructions also need meaning checks. ‘The box was too heavy for me to carry’ can become ‘I was not strong enough to carry the box.’ The adjective changes from heavy to strong because the grammatical subject changes from box to I. ‘I was not heavy enough’ would be grammatically possible but describe the wrong limitation. Too + adjective + to normally expresses an excessive degree that prevents the action; adjective + enough + to expresses sufficient degree."
      ]
    },
    {
      "title": "Rebuild a transformation with one part supplied",
      "paragraphs": [
        "Start from “The soup was so hot that I could not taste it.” The subject of the target is I, so the target must keep the inability to taste, not say that I was hot. With TOO: “The soup was ___ me to taste.” First supply “too hot”; then add the person link “for me”. Only too hot for belongs inside that particular gap because me is already printed.",
        "A second construction starts “It was such a noisy room that we moved outside.” Such modifies a noun phrase: such + a/an + adjective + singular countable noun. Compare so + adjective: “The room was so noisy that…”. Practise with “The task was so difficult that we asked for help” → “It was ___ that we asked for help.” Include SUCH."
      ],
      "check": {
        "prompt": "Complete the difficult-task target, counting only the gap. Then replace task with exercise and check the article.",
        "answer": "Such a difficult task: four words including SUCH. With exercise, “such a difficult exercise” still uses a because the next sound is /d/, from difficult. The construction keeps the degree and consequence; “such difficult” alone lacks the required noun phrase."
      }
    },
    {
      "title": "Requests, obligation and preferences",
      "paragraphs": [
        "Reported instructions use a person plus to-infinitive: ‘Please wait outside,’ the guide said → ‘The guide told us to wait outside.’ A negative instruction places not before to: ‘The guide told us not to enter.’ Check pronouns when the speaker changes. ‘Do not use my bag,’ Lina said → ‘Lina told me not to use her bag.’ Her replaces my because the account now refers to Lina from outside her speech.",
        "‘It is unnecessary to book’ becomes ‘You do not have to book.’ Do not replace it with must not book: lack of necessity permits booking, while prohibition forbids it. A preference changes pattern too: ‘I prefer walking to driving’ → ‘I would rather walk than drive.’ Rather takes a base verb here, not walking. The new clause must preserve which option is preferred.",
        "Use a final checking pass: read both sentences as real messages, locate the unchanged key word, check the gap length, and explain the meaning match. If you can name only a familiar phrase but cannot justify the actor or negation, the transformation is not finished."
      ],
      "check": {
        "prompt": "Rewrite ‘It is not necessary to bring a laptop’ with HAVE: ‘You ___ bring a laptop.’ Then explain why must not is different.",
        "answer": "do not have to. The four-word answer preserves lack of necessity. Must not would prohibit bringing a laptop, which the original does not do."
      }
    },
    {
      "title": "Retrieve without the old wording",
      "paragraphs": [
        "Tomorrow, close this chapter and write three new messages: something was postponed, an action was unnecessary, and somebody preferred one action to another. Reformulate each with an unchanged key word of your choice. Compare actor, time, negation and strength of meaning, not just the presence of a phrase.",
        "If you changed “unnecessary” into “forbidden”, return to obligation. If you duplicated a printed word in a gap, return to the boundary example. This gives a specific correction target before another mixed attempt."
      ]
    }
  ],
  "application": "The repair-café guided cloze asks for natural verb combinations. The study-group open cloze then removes the options, requiring you to supply the grammatical relationship. The final transformations test phrasal meaning, duration, degree, reported instructions, necessity and preference. Use the specific construction taught here to justify each answer, then apply it to a fresh sentence of your own."
},
"band1-ielts-vs-toefl": {
  "mode": "replace",
  "outcomes": [
    "Construct simple, perfect and progressive verb phrases.",
    "Choose a form from the speaker’s timeline and viewpoint.",
    "Explain more than one defensible account of an earlier duration."
  ],
  "prerequisite": "Know how to identify a subject and an action in a simple sentence. This chapter reinforces auxiliary verbs, participles and agreement before asking you to combine time relationships. Work through each short practice step before moving to the mixed tasks.",
  "sections": [
    {
      "title": "Begin with an event and its viewpoint",
      "paragraphs": [
        "Read these messages before studying the forms: “We cleaned the stage yesterday.” “We were cleaning when the alarm rang.” What is different? Both concern cleaning in the past, but the first presents a completed event and the second places us inside an activity. A verb form helps a listener build that picture; it is not selected by finding one magic word.",
        "Find the subject and complete verb phrase in “The musicians had finished their rehearsal.” The musicians is the subject. Had finished is the verb phrase: had is the finite auxiliary, carrying the past viewpoint, and finished is a past participle. If this is unfamiliar, begin with the next two short constructions before comparing several forms."
      ],
      "check": {
        "prompt": "In “The musicians were waiting”, which word changes to was if the subject becomes one musician?",
        "answer": "Were changes to was: “The musician was waiting.” The auxiliary agrees with the subject. Waiting remains the -ing form; it does not become waited merely because the subject is singular."
      }
    },
    {
      "title": "First build a completed past event",
      "paragraphs": [
        "Use past simple to present an event as completed in a finished past account: “Rina opened the hall at seven yesterday.” Opened is the past form of open. Regular verbs commonly add -ed; irregular forms must be learned in context: begin → began, go → went, write → wrote. The past form is normally the same with I, she and they: they opened, she opened.",
        "A negative or ordinary yes/no question uses did plus the base verb: “Rina did not open the side door”; “Did she open it?” Did already carries past time, so “did not opened” repeats the marking. Build a second message from the notes: caretaker / check / lights / last night. Start “The caretaker ___ the lights last night.” Then change it to a negative."
      ],
      "check": {
        "prompt": "Complete the caretaker message and its negative before checking. Why is “has checked last night” unsuitable for this finished-time account?",
        "answer": "“The caretaker checked the lights last night.” “The caretaker did not check the lights last night.” Last night places this event in a finished past period. “Has checked” would create a present-perfect frame that conflicts with that explicit event time in ordinary use."
      }
    },
    {
      "title": "Then describe an activity already in progress",
      "paragraphs": [
        "Past progressive uses was/were + -ing. “At seven, Rina was checking the stage” places the listener inside the activity at seven. It does not by itself say when she began or finished. Compare a photograph taken during the work with a later report that the work was completed. The viewpoint is different even if both describe one real event.",
        "Now add an interruption: “Rina was checking the stage when the alarm rang.” The checking is background in progress; rang introduces the event that occurred within it. Do not write “was checked the stage”: checked after was would suggest a passive construction, while Rina is the person doing the checking here."
      ],
      "check": {
        "prompt": "Complete only the background: “The musicians ___ (WAIT) outside when the caretaker arrived.” Hint: choose the auxiliary from musicians, then the activity form.",
        "answer": "“Were waiting.” Musicians is plural, so use were; waiting presents the background activity. “Waited outside when the caretaker arrived” is possible English but can present a different sequence rather than the requested background-in-progress meaning."
      }
    },
    {
      "title": "Practise the contrast before adding another form",
      "paragraphs": [
        "Read each pair as two possible accounts, not as a correct and incorrect sentence. “The audience left when the bell rang” can report leaving at that point. “The audience were leaving when the bell rang” places the departure already in progress. The second does not prove that everybody had left by the end of the bell.",
        "Try a supported account: rain began at 6.10; the musicians started carrying instruments at 6.00 and finished at 6.20. At 6.10 they ___ carrying instruments; later they ___ the task. Explain the different viewpoints before choosing the words."
      ],
      "check": {
        "prompt": "Complete the two positions, then write one finished event and one background activity about preparing a meal.",
        "answer": "Were / finished. At 6.10 the activity was in progress; the later account reports completion. One new pair is “I cooked dinner at six” and “I was cooking dinner when my friend called.” Your sentences may describe other events if their intended viewpoints remain clear."
      }
    },
    {
      "title": "Use past perfect to look back from a past point",
      "paragraphs": [
        "Past perfect uses had + past participle. At eight, the rehearsal began; the caretaker checked the lights at seven. Looking back from the rehearsal, say “The caretaker had checked the lights before the rehearsal began.” The earlier check was complete by the later past reference point. All subjects use had: I had checked, they had checked.",
        "Irregular participles matter: had gone, not had went; had written, not had wrote. Do not use past perfect for every event merely because it happened long ago. A simple chronological account can say “The caretaker checked the lights and the rehearsal began.” Past perfect makes the earlier relationship explicit when the narrative viewpoint needs it."
      ],
      "check": {
        "prompt": "Finish the supported account: “When the singer arrived, the rehearsal ___ already ___ (BEGIN).” Explain how this differs from “The rehearsal began when she arrived.”",
        "answer": "“Had already begun.” The beginning precedes her arrival. “Began when she arrived” locates the beginning at that arrival instead. The choice changes the account; it is not a matter of making the sentence sound more advanced."
      }
    },
    {
      "title": "Connect past events with the relevant present",
      "paragraphs": [
        "Present perfect uses have/has + past participle: “I have sent the invitations”; “Rina has sent three so far today.” The account connects earlier work with the present situation or an unfinished period. So far today counts results up to now. A finished-time account instead says “Rina sent three invitations yesterday.”",
        "Do not assume that the same time expression always forces one form. “I sent three messages this morning” is natural when the speaker treats the morning as finished. “I have sent three messages this morning” can count results within the current morning. Establish the viewpoint first. Construct a partial message: “Rina ___ sent two invitations so far; the others are not ready.”"
      ],
      "check": {
        "prompt": "Complete the message and repair “They has wrote two replies so far.” Name both repairs.",
        "answer": "Has. The repaired sentence is “They have written two replies so far.” They needs have; have needs the participle written. The correction preserves a count of results up to the present."
      }
    },
    {
      "title": "Add duration only after the basic relationship is secure",
      "paragraphs": [
        "Present perfect progressive uses have/has been + -ing: “Rina has been preparing the programme for an hour.” It foregrounds an activity continuing up to now or recently relevant. “She has prepared three pages” foregrounds results. It is not a rule that every for-phrase needs a progressive: “She has known the organiser for years” uses a state sense of know.",
        "At a past viewpoint, compare “Before the move, he had lived there for ten years” with “He had been living there for ten years.” Both can fit; the progressive foregrounds duration and ongoing activity up to that point. “He lived there for ten years before moving” is also natural. Likewise has invested and has been investing can both describe activity since a starting date, with a different emphasis."
      ],
      "check": {
        "prompt": "Choose a viewpoint for each new message: “I ___ three pages so far (WRITE)” and “I ___ on the programme for an hour and need a break (WORK).” Is the progressive obligatory in every description of the second situation?",
        "answer": "“Have written” counts completed pages. “Have been working” naturally emphasises the continuing activity and its present consequence. It is not the only grammatical way to describe that history; explain the intended meaning rather than invent a universal ban on simple forms."
      }
    },
    {
      "title": "Control states and then combine the forms",
      "paragraphs": [
        "Understand and own normally use simple forms in their ordinary state senses: “I understand the instructions”; “She owns the instrument.” Compare think as an opinion, “I think the plan is sensible”, with thinking as an activity, “I am thinking about a different plan.” Decide the sense in the particular sentence instead of banning -ing for an entire word.",
        "Complete this reduced-help account on paper or in personal notes: “Yesterday we ___ (ARRIVE) at the hall at six. The caretaker ___ (MOVE) chairs when we entered. She ___ already ___ (CHECK) the lights. So far today I ___ (SEND) two thank-you messages.” No form labels are supplied beside the gaps. For each answer, identify a viewpoint or sequence fact before checking."
      ],
      "check": {
        "prompt": "Complete the mixed account. Then explain whether “had moved” could replace “was moving” without changing what we know at arrival.",
        "answer": "Arrived / was moving / had already checked / have sent. “Had moved” would present the moving as earlier completed work, whereas “was moving” places it in progress at arrival. Both can be grammatical, but the account would change."
      }
    },
    {
      "title": "Retrieve the distinctions after a gap",
      "paragraphs": [
        "Before the live mixed tasks, close these explanations and describe three moments in a different event: one completed action, one activity in progress at an interruption and one action already finished by a later point. Then give one present result and one continuing activity. Reopen only the section you could not justify.",
        "After the next module, return without looking at your answers and explain why “did not went”, “has wrote” and “were check” need repair. Use new subjects and events. A correct answer copied from the chapter does not establish that you can choose a viewpoint in fresh context. The existing exhibition, research-visit and residence/investment tasks provide that next application."
      ]
    }
  ],
  "application": "Use the exhibition timeline to distinguish a completed opening, interrupted activity and earlier completed check. In the research-visit stage, separate finished dates from so-far and right-now viewpoints. The final residence and investment items allow the authored simple/progressive alternatives where the context supports them. After feedback, write a timeline that explains your choice."
},
"band1-listening-format": {
  "mode": "replace",
  "outcomes": [
    "Separate an initial intention from a final decision.",
    "Infer a speaker’s purpose from the problem and requested response.",
    "Justify an option using the complete extract."
  ],
  "prerequisite": "Recognise ordinary past, present and future forms, and connectors such as but, although and so. A distractor is a plausible wrong answer. It often describes something genuinely mentioned, but that detail may answer a different question.",
  "sections": [
    {
      "title": "Build an event record while listening",
      "paragraphs": [
        "Listening comprehension involves updating meaning. In ‘I planned to walk, but the bridge is closed, so I have booked a taxi’, walk is an intention that has been replaced, the closed bridge is the reason, and the taxi is the current arrangement. The final answer is not simply the last transport word; it is the option whose status matches the question. A later sentence could mention a bus used last year without changing today’s booking.",
        "Mark grammatical signals of status. Was going to describes an earlier plan; considered describes an option; have booked describes a completed arrangement with present relevance. Might and could can keep an option open. ‘We could drive’ does not establish ‘We will drive.’ Listen until a proposal is accepted or rejected, and attach each detail to its time and speaker."
      ]
    },
    {
      "title": "Practise updating a status note",
      "paragraphs": [
        "Written rehearsal: “I considered cycling, but I have reserved a seat on the ferry. My sister may cycle next week.” One complete note is considered transport → cycling. Finish confirmed arrangement → ___; later possibility → ___ for ___ person. Attach person and time as well as the transport word."
      ],
      "check": {
        "prompt": "Complete the note. Why is cycling not the confirmed journey?",
        "answer": "Ferry; cycling for the sister next week. Considered leaves an option in the past, have reserved establishes the speaker’s booking, and may marks a possibility for another person. Matching a noun without status would combine different journeys."
      }
    },
    {
      "title": "Purpose is what the speaker wants to achieve",
      "paragraphs": [
        "A caller may mention a bad experience while asking only for information. ‘The room was comfortable, but the confirmation gives two check-in times. Which one is correct?’ requests clarification. It is not necessarily a complaint about the room or a demand for money. Identify the information gap and the action requested of the listener.",
        "Compare three replies to an event problem. ‘Could you confirm the starting time?’ asks for information. ‘Could you move my booking?’ asks for a change. ‘I would like a refund’ requests repayment. Shared vocabulary such as booking cannot choose the purpose. A correct option can paraphrase: unclear instructions and conflicting information may describe the same practical problem when the extract supports that relationship."
      ]
    },
    {
      "title": "Work through a different situation before the recording",
      "paragraphs": [
        "Written demonstration, not a listening assessment: “I thought the hotel would be noisy because it faces the square. My room overlooked a courtyard, though, and I slept well. The lift stopped working on the last day, so I would ask for a lower room next time.” Question: How does the guest evaluate the stay?",
        "Identify prediction → actual experience → remaining problem. Noisy is the prediction; slept well is the reported experience; the lift fault qualifies a future recommendation. “A quiet stay with one access problem” preserves both. “Unable to sleep” uses the prediction as an outcome; “no problems at all” removes the lift; “the hotel must close” invents a consequence.",
        "B2 First recordings are heard twice in the examination. These local learning tasks allow replay. In the first travel recording, use empty notes headed original intention / obstacle / confirmed arrangement. On the first pass listen for the message; on the second verify the clause that establishes the arrangement. Do not fill the notes from this hotel demonstration."
      ]
    },
    {
      "title": "Review the source of an error",
      "paragraphs": [
        "If the correct clause is clear in the transcript but was missed in audio, practise recognising its sounds in a short replay. If you heard the words but chose the wrong status, label the error as interpretation. These require different repairs. Reading a transcript can clarify meaning but cannot prove that the same words will be recognised in an unfamiliar recording.",
        "Incorrect reasoning: ‘Friday was mentioned, so the event is Friday.’ Improved reasoning: ‘Friday was rejected because the hall was unavailable; Saturday was confirmed.’ Incorrect reasoning: ‘The speaker disliked one detail, so the whole review is negative.’ Improved reasoning: ‘The speaker recommends the course with a limitation.’ Explain the rejected option as well as the accepted one."
      ],
      "check": {
        "prompt": "‘The hall might be free on Monday. We have not checked yet.’ Is Monday a confirmed booking?",
        "answer": "No. Might marks possibility and have not checked explicitly leaves availability unresolved. An option claiming a confirmed Monday booking adds certainty that the speaker has not supplied."
      }
    }
  ],
  "application": "The guided travel extract changes an intended plan; the independent extracts ask about purpose and evaluation; the fresh concert assessment adds a practical consequence for ticket holders. Before choosing, identify which of those demands the question makes. After feedback, replay the supporting clause and explain why a mentioned alternative is not the answer."
},
"band1-listening-gist": {
  "mode": "replace",
  "outcomes": [
    "Predict the grammatical and informational role of a completion gap.",
    "Follow gist while retaining precise details.",
    "Distinguish sound-recognition errors from meaning errors."
  ],
  "prerequisite": "Know the difference between a noun naming an item, a place phrase and a time expression. In ‘Bring an ___’, the article suggests a singular countable noun beginning with a vowel sound. Grammar narrows a prediction; it does not supply the answer before listening.",
  "sections": [
    {
      "title": "Hear a message, not a sequence of isolated dictionary words",
      "paragraphs": [
        "In connected speech, words influence their neighbours. An unstressed to may have a reduced vowel, and an can connect closely to the noun after it. This can make ‘bring an apron’ sound like one group rather than three separate units. The underlying grammar has not changed. Listen for stressed content words, then reconstruct the small connecting words from the actual phrase, not from an invented sentence.",
        "Gist is the organising message: an introduction to a workshop, for example. Details fill roles inside that message: item to bring, place, cost and deadline. A word can be clear yet belong to the wrong role. In ‘We provide paper, but bring your own apron’, paper is supplied and apron is required from the participant. Recording the first clear noun would reverse the instruction."
      ]
    },
    {
      "title": "Use the question as a listening frame",
      "paragraphs": [
        "Before playback, read the whole note. ‘The session takes place in the ___’ requires a location; ‘Participants should bring an ___’ requires an item. Predict a category rather than a favourite word. As the recording continues, keep your place in the question sequence. If you miss a detail, leave a temporary blank and resume; trying to reconstruct one word can cost the next answer.",
        "Check what the printed sentence already supplies. If a form prints ‘£ ___’, give the amount without repeating the currency sign. If it supplies ‘on’, a day can follow directly. A completion must obey the stated word limit and fit the sentence. Correct understanding with extra copied words can still violate a task’s instructions. Spelling is part of accurate written transfer."
      ]
    },
    {
      "title": "Complete a prediction record without guessing the answer",
      "paragraphs": [
        "Written rehearsal: “The walk starts at ___. Bring a ___ to protect yourself if it rains.” The first gap needs a start time or starting place depending on the fuller question; the second needs a countable item. A prediction identifies a category, not a particular fact. “Starts at the bridge” and “starts at nine” both fit local grammar, so read the note label.",
        "Now use explicitly labelled notes: meeting time: ___; item supplied: ___; item to bring: ___. Demonstration message: “Meet at nine. We lend binoculars, but you should bring a waterproof jacket.” Fill only the time and supplied-item slots first, then complete the bring-slot independently."
      ],
      "check": {
        "prompt": "Fill the three slots. Could binoculars answer item to bring?",
        "answer": "Nine / binoculars / waterproof jacket. Lend marks an item supplied by the organisers, while bring assigns responsibility to the participant. A clear noun heard in the audio still fails if it fills the wrong informational role."
      }
    },
    {
      "title": "Worked example: track the contrast",
      "paragraphs": [
        "Source: ‘Our introductory session costs nothing. Later sessions cost eight pounds. We lend brushes, but participants need their own apron. Meet in the studio behind the library, not at the library reception desk.’ Notes: first-session cost; item participants provide; meeting room.",
        "The introductory cost is zero or free, according to the answer format. Eight pounds describes later sessions. Apron is required from the participant; brushes are supplied. Studio names the room; behind the library locates it, while reception is explicitly rejected. A word-limit task may need studio rather than the entire location phrase. Read the exact demand before choosing how much to transfer.",
        "Now hide the source and retell the arrangements in ordinary English. If you cannot explain who supplies what, revisit meaning before trying a faster recording. Once the relationship is secure, replay a short phrase and notice the weak words around the stressed noun. This moves from understanding to recognition rather than using repeated playback as guesswork."
      ]
    },
    {
      "title": "Listen, diagnose, then remove the notes",
      "paragraphs": [
        "For the first live recording, write only empty labels before playback: supplied material / requested item / location, using the actual question to select the relevant labels. Keep possible answers blank. On replay, listen for the verb beside the noun: provide, bring, collect or meet can assign its role.",
        "Then close the frame for the radio and bookbinding recordings and make your own short notes. If an answer is wrong, first decide whether the sound was missed or the role was confused. Replay a short phrase after transcript review, then listen again without reading. A transcript-based correction is a study step; the new recording supplies the listening transfer."
      ]
    },
    {
      "title": "A useful feedback routine",
      "paragraphs": [
        "Classify a missed answer: sound, vocabulary, relationship, spelling or word limit. For a sound error, compare one phrase with the transcript and replay it without looking. For a vocabulary error, write a new sentence using the expression. For a relationship error, draw supplied → provider or required → participant. For a spelling error, practise the whole word once in context and then retrieve it later.",
        "Do not claim a listening gain from reading the same transcript repeatedly. Transfer requires fresh audio. In the activity, the community-radio account adds earlier and current arrangements: a first location, an initial skill, an item provided and a changed broadcast day. Notes should retain those roles, not just a list of nouns and weekdays."
      ],
      "check": {
        "prompt": "A recording says ‘Headphones are not supplied, although microphones are available.’ What should a participant bring?",
        "answer": "Headphones. The contrast assigns different supply conditions to two items. Microphones is a tempting repeated noun, but it names equipment already available."
      }
    }
  ],
  "application": "Use the guided workshop to practise role prediction. In the radio-project independent stage, track the original location, first skill and current broadcast day separately. The bookbinding assessment changes the topic so that meaning, spelling and the printed word limit must be checked again. The transcript is a review tool; listening evidence comes from the audio response."
},
"band1-listening-attitude": {
  "mode": "replace",
  "outcomes": [
    "Separate concession from the speaker’s overall judgement.",
    "Match several speakers to precise statements without swapping viewpoints."
  ],
  "prerequisite": "Distinguish a fact from an evaluation. ‘The course lasted six weeks’ reports duration; ‘Six weeks was too short’ evaluates it. Concession accepts a point before qualifying it, as in although it was expensive, I would return.",
  "sections": [
    {
      "title": "Attitude develops across the whole turn",
      "paragraphs": [
        "A speaker’s attitude can be positive, negative or qualified. ‘It was expensive, but I would go again’ accepts a cost yet ends with a favourable recommendation. ‘It was inexpensive, but I would not return’ ends with the opposite judgement. Do not score the attitude by counting positive and negative adjectives. Work out which statement is being qualified and what the speaker finally endorses.",
        "Contrast is not always signalled by but. ‘I thought I would enjoy the lecture. In fact, I found it difficult to follow’ revises an expectation. ‘The practical work was demanding; nevertheless, it was the most useful part’ values a difficult experience. A difficulty and a negative judgement are not identical. Listen for the object of the evaluation: the teacher, the pace and the venue can receive different assessments."
      ]
    },
    {
      "title": "Finish a stance record before matching speakers",
      "paragraphs": [
        "Written rehearsal A: “The route was longer than advertised, but the guide stopped when we needed a rest, so I would join again.” Record final stance → positive with a limitation; reason → responsive guide; rejected summary → perfect route. The concession survives even though the recommendation is positive.",
        "Written rehearsal B: “The guide was friendly. Nevertheless, we spent most of the day waiting, so I would choose another company.” Finish stance → ___; main reason → ___; concession → ___. The friendliest adjective is not necessarily the overall judgement."
      ],
      "check": {
        "prompt": "Complete B and explain why it cannot share A’s final recommendation.",
        "answer": "Negative recommendation / excessive waiting / friendly guide. Nevertheless shifts to the problem that determines the final choice. Both speakers mention a positive guide, but only A says they would join again."
      }
    },
    {
      "title": "Matching statements to distinct speakers",
      "paragraphs": [
        "A matching statement often paraphrases a relationship. ‘Benefited from repeating a skill’ could match ‘At first I wanted to move on, but doing the exercise again helped me notice my mistake.’ It does not match ‘The class was longer than I expected’ merely because both concern repetition or duration. Turn the statement into a precise requirement: the speaker must report a benefit caused by repeat practice.",
        "B2 First Part 3 uses five short monologues and eight statements. Our shorter learning sets preserve the need to distinguish messages and leave unused alternatives. Before listening, identify what makes each statement different. During the recording, give each speaker a short label such as useful repetition, unsuitable pace or unexpected confidence. Do not carry one speaker’s complaint into the next speaker’s account."
      ]
    },
    {
      "title": "Worked comparison of three accounts",
      "paragraphs": [
        "Speaker A: ‘I disliked practising the same dialogue twice, until I heard how unclear my first recording had been. The second attempt was much better.’ Speaker B: ‘Everyone was welcoming, but the activities assumed experience I did not have.’ Speaker C: ‘I expected a difficult exam course. Instead, the practical tasks made me less nervous about speaking.’",
        "A supports a benefit from repetition: the change between recordings explains the value. B recognises a friendly atmosphere but finds the level unsuitable; welcoming does not make the course a successful choice. C reports a changed emotional response, moving from anticipated difficulty to reduced anxiety. A statement about improved confidence fits C more closely than A, whose explicit focus is performance on a second attempt.",
        "Eliminate unused statements with evidence. None of these accounts says that the price was unfair or that the tutor cancelled a class. Such statements may be plausible in real life but lack support here. An unused option is not a gap that must be filled by stretching a speaker’s meaning."
      ]
    },
    {
      "title": "Remove one layer of support at a time",
      "paragraphs": [
        "For the first two live speakers, draw two rows and three empty columns: expectation, reported experience, final judgement. Do not assign a statement until the speaker’s turn is complete. Before moving to the five-speaker stage, cover the column titles and decide which two notes you actually need.",
        "On review, isolate a single speaker and state an attractive wrong option in your own words. Identify the clause that contradicts or fails to support it. In the final walk recording, make no prewritten stance list; retrieve the relationship from the whole turn. A repeated extreme option is easy to reject, so explain the closest rival as well."
      ]
    },
    {
      "title": "Review attitude with two notes",
      "paragraphs": [
        "After a wrong match, write expectation → final evaluation and quote the contrast that connects them. If the speaker stays mixed, keep both parts: useful content / unsuitable pace. An option saying entirely useless is too strong when the source praises useful content. An option saying completely satisfied drops the pace concern.",
        "For fresh practice, ask someone to read two short reviews without showing the text. Identify which part is accepted and which judgement survives the qualification. Check the transcript only after responding. If the words were heard correctly but the evaluation was reversed, practise interpreting concessions rather than increasing playback speed."
      ],
      "check": {
        "prompt": "‘I was exhausted by the end, but the practical experience was worth the effort.’ Is the overall evaluation necessarily negative?",
        "answer": "No. Exhaustion is a cost, while worth the effort explicitly values the outcome. A careful summary retains both: demanding but worthwhile."
      }
    }
  ],
  "application": "The guided attitudes establish how contrast affects evaluation. In the independent matching set, keep a separate note for each voice and compare every statement’s specific demand. Use the fresh-speaker assessment to test whether you can recognise the same relationships without relying on familiar wording."
},
"band1-reading-skimming": {
  "mode": "replace",
  "outcomes": [
    "Map how a paragraph develops its main idea.",
    "Choose a supported detail, inference or purpose answer.",
    "Reject an option that changes quantity, time or certainty."
  ],
  "prerequisite": "A proposition is a claim that can be compared with evidence: who did what, when and under what conditions. A paragraph’s topic is what it concerns; its main idea is what it says about that topic. A text about a library may argue for a limited trial rather than simply describe libraries.",
  "sections": [
    {
      "title": "Start with what a sentence actually claims",
      "paragraphs": [
        "Before choosing an answer, separate topic from proposition. “A cinema introduced an afternoon screening” names an event. “The screening helped some shift workers attend” states a claimed result for a limited group. Some does not mean all. If the subject or quantity changes in an answer option, the message changes even when cinema is repeated.",
        "Diagnostic: compare “The trial attracted new visitors” with “The trial made a profit.” The first concerns attendance; the second concerns money after costs. Neither follows automatically from the other. This distinction will matter when a question asks for a fact, inference or the writer’s evaluation."
      ],
      "check": {
        "prompt": "A source says twelve people attended a new session. Which is supported: “Some people attended” or “The session covered its costs”?",
        "answer": "Some people attended. Twelve is a positive attendance count. No income/cost comparison is supplied, so financial success cannot be concluded."
      }
    },
    {
      "title": "Read a complete new passage for its development",
      "paragraphs": [
        "Original teaching passage: The Eastmere cinema introduced a quiet afternoon screening after several residents said evening visits were difficult. Managers expected older viewers to form most of the audience. In the first month, many attendees were shift workers who had previously missed weekday films.\n\nThe smaller audience brought in less ticket income than a normal evening screening. However, staff used an otherwise empty period, so the extra running cost was limited. Managers have not yet calculated whether the session covers that cost.\n\nThe cinema plans to continue for another month and ask people who attended only once why they did not return. The manager calls the trial a useful access experiment, not proof that every cinema should introduce the same timetable.",
        "Read once without questions. Write a short account of what changes between paragraphs. A useful map is unexpected audience → cost question → cautious next step. “Cinema / tickets / people” lists topics but loses the argument. The controlling idea is testing a new access option while checking its limits."
      ]
    },
    {
      "title": "Watch one detail question being solved",
      "paragraphs": [
        "Question: Who formed an unexpectedly important part of the audience? First locate the expectation: older viewers. Then locate the reported experience: many shift workers. The contrast between expected and actual gives the answer. “Older viewers” is tempting because it occurs beside expected, but the question asks about the unexpected audience.",
        "Now complete a supported evidence note for a different question: Why was the extra running cost limited? Candidate location: paragraph two. Evidence starts “staff used ___”. Finish the note before choosing among these explanations: an already unused period / higher ticket prices / unpaid staff."
      ],
      "check": {
        "prompt": "Complete the evidence note and explain why the other two explanations fail.",
        "answer": "“An otherwise empty period.” The cinema used time that was not already serving another screening. The passage does not say prices increased or staff worked unpaid. Those are imaginable explanations, not supplied facts."
      }
    },
    {
      "title": "Move from a detail to its purpose",
      "paragraphs": [
        "A detail question asks what happened. A purpose question asks why the writer includes it. Mentioning shift workers shows the service reached a different audience from the one predicted; it is not a biography of those workers. Mentioning people who came only once introduces a way to investigate why participation did not continue.",
        "Partly completed answer: “The plan to ask non-returning visitors is included to show how managers will investigate ___ rather than assume ___.” Complete it in your own words. A purpose answer must connect the detail to the trial’s unresolved question."
      ],
      "check": {
        "prompt": "Finish the purpose answer. Would “to show that everyone disliked the films” fit?",
        "answer": "For example: “barriers to continued attendance rather than assume the timetable suits everyone.” Universal dislike is not reported. Asking for feedback is an investigation, not a finding about what every visitor thought."
      }
    },
    {
      "title": "Compare near-matching summaries before independent choice",
      "paragraphs": [
        "Consider three summaries: A, “A new screening is a proven financial success.” B, “A timetable experiment widened access for an unexpected group, while its financial and participation effects still need checking.” C, “A cinema stopped evening films because older people refused to attend.” Test actor, action, outcome and certainty. A turns an unresolved cost question into proof. C invents cancellation and refusal. B retains the benefit and the limits.",
        "Reduce the help now. Write one supported inference about the next month, one unsupported inference about profit and one statement the passage directly contradicts. Keep an evidence phrase beside each. Then explain the difference between an inference, a missing fact and a reversal."
      ],
      "check": {
        "prompt": "Compare your three statements with these possibilities: Does planning another month prove that the trial is profitable?",
        "answer": "A supported inference is that managers want more evidence before a broad recommendation. Profit remains unresolved, so “it is definitely profitable” is unsupported. “No shift workers attended” contradicts many attendees being shift workers. Continuing the trial does not settle its finances."
      }
    },
    {
      "title": "Build a main idea from all paragraphs",
      "paragraphs": [
        "A heading about ticket income alone fits only part of the passage. “Testing who benefits from a new screening time” covers the audience change, cost check and follow-up. To test a heading, point to the role of each paragraph. If a heading has no place for an important qualification, it may be too broad or too narrow.",
        "Now close the map and write a two-sentence summary without the cinema’s name. Keep one observed benefit and one unresolved question. This removes the support of familiar nouns and makes you retain the relationship. Reopen only to check quantity, actor and certainty."
      ]
    },
    {
      "title": "Apply the method to different texts and retrieve it later",
      "paragraphs": [
        "The live mobile-library source, Mara’s repair experience and quiet-hour supermarket task use different evidence. Start the guided library task with four headings in your notes: expectation / actual users / adjustment / remaining limit. Leave the values empty until you read that source. In the independent task, create your own headings instead of copying this frame.",
        "After submitting, explain the closest wrong option using the clause it changes; do not merely record its letter. In the next reading module, retrieve the difference between a topic and a controlling idea, then write one purpose question about its new text. If a new passage has a different structure, map that structure rather than forcing every source into a trial template."
      ]
    }
  ],
  "application": "Use the guided reading to distinguish a fact from the writer’s evaluation. The independent passage requires a larger argument map; the transfer passage changes the topic and limitation. For every summary choice, check that both the benefit and its qualification survive. The short sources develop evidence skills; they do not reproduce a full B2 paper."
},
"band1-reading-scanning": {
  "mode": "replace",
  "outcomes": [
    "Break a matching requirement into separate conditions.",
    "Locate candidate text quickly, then verify the full meaning.",
    "Keep different people’s experiences and preferences separate."
  ],
  "prerequisite": "Scanning locates a likely place; close reading decides the answer. Words such as only, unless, although and available can determine whether a text meets a requirement. A shared topic is not the same as a matching experience.",
  "sections": [
    {
      "title": "Turn a requirement into a test",
      "paragraphs": [
        "Suppose a learner needs a weekend course that lends equipment and accepts complete beginners. Three conditions must hold: weekend, supplied equipment and no prior experience. A Saturday course requiring participants to own a camera meets only one of them. A beginner course on Tuesday also fails. Tick each condition separately before deciding.",
        "In B2 multiple matching, the statements may ask which person had an experience rather than which service suits a need. ‘Who discovered that repeating an exercise was useful?’ requires a reported change of judgement. ‘I repeated the activity because the tutor told me to’ mentions repetition without necessarily reporting a benefit. Convert the question into the exact meaning you need to find."
      ]
    },
    {
      "title": "Reject a near-match before completing a profile match",
      "paragraphs": [
        "New teaching profiles: A, a pottery course runs on Saturday mornings and lends tools but requires previous experience. B, a Sunday course lends tools and welcomes beginners. C, an online Saturday course welcomes beginners but students must buy a tool set. A learner needs a weekend beginner course without buying tools. The requirement has three conditions; finding the word Saturday is insufficient.",
        "Completed check for A: weekend yes / equipment yes / beginner no. Complete the same three checks for B and C, then choose. No condition can be replaced by a general impression that the course sounds enjoyable."
      ],
      "check": {
        "prompt": "Which profile satisfies all three conditions, and where does the closest rival fail?",
        "answer": "B satisfies weekend, borrowed tools and beginner access. C fails the no-purchase condition; A fails beginner access. Sunday is still a weekend day, so matching one familiar day word is not the decision."
      }
    },
    {
      "title": "Worked matching from complete profiles",
      "paragraphs": [
        "Profile A: ‘The Saturday drawing class lent pencils and paper. Most of us had never drawn before. I enjoyed the slow pace because it gave me time to correct mistakes.’ Profile B: ‘The weekend photography group was friendly, but you needed your own camera and some knowledge of its settings.’ Profile C: ‘The Tuesday pottery class supplied everything. The tutor repeated each technique, which frustrated me because I already knew the basics.’",
        "For the beginner needing weekend access and supplied equipment, A meets all three conditions. B matches the weekend but fails equipment and entry level. C supplies materials and may introduce techniques, but its meeting day fails the weekend requirement. To match ‘appreciated time to revise’, A again supplies explicit support. To match ‘found repeated instruction unnecessary’, C fits; its repetition was not experienced as a benefit.",
        "One text can answer more than one statement when instructions allow it. Do not rule out A simply because it was already used. Conversely, do not reuse an option where the task forbids it. The printed instruction controls the matching system, not an assumption carried from another exercise."
      ]
    },
    {
      "title": "Scan for anchors, then widen your view",
      "paragraphs": [
        "Names, days, numbers and distinctive activities can locate a candidate rapidly. The deciding meaning often lies beside that anchor. A camera reference may be followed by not supplied; a beginner reference may describe people for whom the class is unsuitable. Negation, comparison and tense matter more than the presence of the keyword.",
        "Work with short notes rather than complete copied profiles: A Saturday / lends / beginner; B weekend / own camera / experienced; C Tuesday / supplied / already knew. The notes are useful only because they preserve the constraints. If you reduce every profile to art course, they cease to distinguish anything."
      ]
    },
    {
      "title": "Move from a literal condition to a personal-experience paraphrase",
      "paragraphs": [
        "Source: “I nearly left because everyone else seemed experienced, but a patient partner helped me finish my first bowl.” The writer initially lacked confidence and benefited from another learner. “Wanted a harder challenge” reverses the initial concern. First underline the action showing uncertainty, then complete “Support came from ___, not necessarily ___.”"
      ],
      "check": {
        "prompt": "Finish the support note, then describe a different learning experience without using the word confidence.",
        "answer": "A partner / the teacher. Patient partner identifies the helper. A new account such as “I hesitated to begin until another learner showed me the first step” can convey uncertainty without repeating a matching statement’s vocabulary."
      }
    },
    {
      "title": "Revise a near-match",
      "paragraphs": [
        "A near-match is educationally useful: explain which condition it meets and which it fails. Incorrect reasoning: ‘B mentions photography, which the learner likes.’ Improved reasoning: ‘B suits the interest, but its equipment requirement conflicts with the stated need.’ This separates a plausible topic from an actual solution.",
        "For independent rehearsal, write three short profiles sharing a topic but differing in one decisive condition. Ask a partner to select for a specified learner. If two profiles genuinely satisfy every condition, the question needs revision; adding an arbitrary preference after checking is not fair evidence."
      ],
      "check": {
        "prompt": "A notice says ‘All materials are provided except protective gloves.’ Does it satisfy ‘I do not need to bring any equipment’?",
        "answer": "Not fully. Except creates a specific exclusion: gloves must still be supplied by the participant. A broad statement about materials does not cancel that exception."
      }
    },
    {
      "title": "Retrieve the conditions on a different day",
      "paragraphs": [
        "After the volunteer assessment, invent a new requirement that would change the correct match. Name the exact failed condition, then check all profiles again. This tests comprehension of the source rather than remembering an A/B/C/D order.",
        "Before the next reading task, retrieve the difference between a required condition and a desirable detail. A source may offer a pleasant extra while still failing a non-negotiable requirement."
      ]
    }
  ],
  "application": "The weekend-course guided task lets you test several practical conditions. The independent accounts switch to personal experiences, so interpret the statement before scanning. The volunteer assessment uses fresh constraints. Use the feedback to identify a failed condition rather than memorising a person’s letter."
},
"band1-reading-completion": {
  "mode": "replace",
  "outcomes": [
    "Use pronoun reference and logical relationships across a gap.",
    "Check chronology and both neighbouring sentences.",
    "Explain why a same-topic sentence can still fail."
  ],
  "prerequisite": "A pronoun points to something identifiable: they may refer to a previously named group. A connector expresses a relationship: however contrasts, therefore gives a result, and meanwhile marks overlapping time. These links contribute to cohesion, the connections that make sentences work as a text.",
  "sections": [
    {
      "title": "A gap has two sides",
      "paragraphs": [
        "In a gapped text, a sentence must connect with what comes before and what follows. ‘The volunteers found the path blocked. ___ . This alternative added twenty minutes to the journey.’ A candidate such as ‘They therefore chose the longer riverside route’ links backward through therefore and forward through this alternative. ‘The path was popular with walkers’ shares the topic but supplies no alternative for the next sentence.",
        "Pronouns create requirements. ‘These tools’ normally needs identifiable plural tools; ‘this decision’ requires a decision or a preceding proposition that can be understood as one. The nearest noun is not always the referent, but the text must make the reference clear. Do not match an isolated pronoun to a convenient noun while ignoring the events."
      ]
    },
    {
      "title": "Supply the missing link with one side already analysed",
      "paragraphs": [
        "New miniature source: “The choir first rehearsed in a small classroom. ___. This larger room also had space for the audience.” Candidate 1: “The caretaker offered them the assembly hall.” Candidate 2: “The conductor had always enjoyed music.” Backward anchor: them can refer to the choir. Finish the forward anchor: This larger room needs ___ to have been introduced."
      ],
      "check": {
        "prompt": "Choose and name both links. Why does a sentence about music fail?",
        "answer": "Candidate 1. Them refers back to the choir; the assembly hall supplies the referent for This larger room. Candidate 2 shares a topic but introduces no room, so the following reference cannot be recovered."
      }
    },
    {
      "title": "Reconstruct a short narrative",
      "paragraphs": [
        "Source: ‘The group planned to display old photographs in the village hall. Two days before opening, a leak damaged part of the ceiling. [Gap] The new venue had less wall space, so each contributor selected just two pictures. Despite that restriction, visitors praised the clear organisation.’ Candidate: ‘The organisers moved the exhibition to the library.’",
        "Step one: the leak creates a problem with the hall. Step two: moving to the library is a practical response. Step three: the new venue now has an identifiable referent. Step four: limited wall space explains the reduction in pictures; that restriction points back to the limit. The final evaluation qualifies a problem rather than claiming the event was cancelled.",
        "‘The library had opened many years earlier’ mentions the eventual venue but does not explain a move. ‘The exhibition was cancelled’ conflicts with visitors praising it. ‘Every picture was displayed’ conflicts with selecting two. Test the whole reconstructed account, not just the nouns either side of the gap."
      ]
    },
    {
      "title": "Test consequence without relying on a repeated noun",
      "paragraphs": [
        "Source: “Heavy rain damaged the outdoor stage. ___. Several families therefore asked to transfer their tickets.” Choose between “The organisers moved the performance to a weekday afternoon” and “Many people enjoyed last year’s performance.” The first sentence creates a problem; the final sentence reports a consequence requiring a new explanation.",
        "Complete the chain before choosing: damage → changed ___ → some families cannot ___ → transfer request. Then remove the chain and write one alternative middle sentence that would also make the consequence coherent."
      ],
      "check": {
        "prompt": "Finish the chain and explain whether shared performance vocabulary is enough.",
        "answer": "Timetable / attend. A weekday afternoon can create an attendance problem, motivating transfer requests. Last year’s enjoyment does not explain therefore. Your alternative must establish a plausible reason for transferring, not merely repeat stage or performance."
      }
    },
    {
      "title": "Track chronology and recurring information",
      "paragraphs": [
        "Past perfect can identify an event earlier than the main past sequence: ‘They had already printed the invitations’ explains why a later change creates difficulty. Later, afterwards and by then also organise time. An option about returning equipment cannot precede the first borrowing unless the text explicitly moves backward. Repeated vocabulary can form a lexical chain, but it must refer to the same topic in a coherent sequence.",
        "Contrast and cause must be real. ‘The hall was unavailable. However, they needed another room’ is an awkward contrast because the need follows naturally. ‘The hall was unavailable, so they needed another room’ expresses the causal link. A candidate using however may still be correct if it contrasts two actual claims, such as unavailable hall versus successful event."
      ]
    },
    {
      "title": "Use elimination as a reasoned last check",
      "paragraphs": [
        "B2 First Part 6 removes six sentences and supplies one extra. A spare sentence is expected. First locate strong links, then test uncertain positions within the complete paragraph. Do not force the leftover sentence into the last gap without checking it. A sentence may fit one side strongly but fail the other.",
        "After feedback, label each decisive link: reference, time, contrast, cause or vocabulary chain. Write a short explanation such as ‘the new venue needs an earlier move’ rather than ‘it sounds right’. Then practise a new gap that uses the same relationship with different nouns. That tests whether you learned cohesion rather than the old sentence order."
      ],
      "check": {
        "prompt": "‘Nora offered to lead the session. ___ . Her replacement arrived at noon.’ What information must a plausible middle sentence establish?",
        "answer": "It must explain why Nora no longer leads, or identify another person taking her place. A sentence merely praising Nora does not establish the replacement referred to afterwards."
      }
    },
    {
      "title": "Retrieve links rather than an answer order",
      "paragraphs": [
        "After the workshop assessment, choose a corrected gap and explain both anchors without quoting its whole sentence. Later, write a fresh three-sentence sequence with a demonstrative reference such as this change. Remove the middle sentence and check whether a reader can tell what information is missing.",
        "A correct first anchor with a broken second anchor is still a failed insertion. Keep the precise cause in your notes: unresolved reference, wrong chronology, missing contrast or unsupported consequence."
      ]
    }
  ],
  "application": "The guided route text introduces reference and consequence. The independent exhibition and assessment workshop use fresh events, so check each gap against both neighbours. Retain unused choices when appropriate; completion depends on coherent links, not using every sentence."
},

"band1-writing-task1-overview": {
  "mode": "replace",
  "outcomes": [
    "Turn an essay question and three content points into a position.",
    "Develop a reason through explanation and example.",
    "Construct and review a complete B2 essay."
  ],
  "prerequisite": "A paragraph groups sentences around one main idea. A thesis states the answer you will defend; it is not merely the topic. In B2 First, the compulsory essay uses two supplied points and an additional idea of your own, with a response of 140–190 words.",
  "sections": [
    {
      "title": "Read a question as a decision to make",
      "paragraphs": [
        "Teaching task: Your class has discussed shopping bags. Should shops stop giving customers single-use bags? Notes: 1 environmental effects; 2 convenience; 3 your own idea. Write a B2 essay. The decision concerns giving out disposable bags, not whether shopping itself is enjoyable. Both supplied points need development, and the additional idea must contribute something different.",
        "Activate an earlier skill: identify the complete claim in “Shops should stop giving away bags because repeated use reduces waste.” Shops should stop giving away bags is the position. The because-clause supplies a reason. A statement such as “Shopping bags are common” names the topic but does not decide the question."
      ],
      "check": {
        "prompt": "Which additional point is more distinct from environmental effects: “less rubbish” or “cost to customers”? Explain your choice before planning.",
        "answer": "Cost to customers adds a different consideration. Less rubbish usually repeats the environmental point unless developed through a genuinely different issue. You could choose another relevant idea, but explain how it differs from the supplied points."
      }
    },
    {
      "title": "Select ideas before writing sentences",
      "paragraphs": [
        "Use short notes: environment → repeated use means fewer discarded bags; convenience → unexpected purchases still need a way to carry items; own idea, cost → small charge versus affordable durable option. Discard “My favourite shop is near the station”: it does not help judge the proposed change. Decide a position: support ending free disposable bags while keeping a practical alternative.",
        "Turn that decision into a plan with functions: opening states the proposal and view; one body paragraph explains environmental value; another weighs convenience and cost; conclusion confirms the resulting judgement. These are functions, not a compulsory paragraph count. If two short points fit one coherent paragraph, they can be developed together."
      ],
      "check": {
        "prompt": "Complete the reasoning note, not a whole essay: “Unexpected purchase → no bag available → offer ___ rather than ___.” Suggest a response that still fits the position.",
        "answer": "One option is “an affordable reusable bag rather than unlimited free disposable bags.” The response addresses the convenience problem while retaining the environmental aim. It need not be the only defensible policy."
      }
    },
    {
      "title": "Construct one accurate sentence at a time",
      "paragraphs": [
        "Start with subject and finite verb: “Reusable bags reduce waste.” Add a condition rather than an absolute: “Reusable bags can reduce waste when customers use them repeatedly.” Can limits certainty; the when-clause explains the condition. “Reusable bags useful because customers uses again” lacks a finite verb and has a plural-agreement error.",
        "Repair the weak sentence in two stages: “Reusable bags are useful.” Then explain why: “Customers can use them again.” Join only after both clauses work: “Reusable bags are useful because customers can use them again.” More elaborate syntax is optional. A controlled sentence that expresses a real relationship is more useful than several unfinished subordinate clauses."
      ],
      "check": {
        "prompt": "Complete this sentence with your own relevant mechanism: “A charge might encourage customers to ___ because ___.” Keep the subject/verb of both clauses visible.",
        "answer": "For example: “A charge might encourage customers to bring a bag because they would avoid paying again.” Customers can bring; they would avoid supplies a complete reason clause. Check relevance and grammar, not whether you reproduced these exact words."
      }
    },
    {
      "title": "Grow a paragraph through explanation and illustration",
      "paragraphs": [
        "Demonstration: “Giving away fewer disposable bags could reduce waste. Customers who reuse one sturdy bag need fewer new bags on later visits. For example, keeping a folded bag in a work bag makes reuse practical during routine shopping.” Sentence one makes the claim; sentence two explains how; sentence three makes the mechanism observable. “It is good and beneficial” would merely repeat the evaluation.",
        "Now finish a partially completed convenience paragraph: “An immediate ban could inconvenience people making unexpected purchases. For example, ___. Shops could respond by ___, so ___.” Supply a realistic situation, an action and its consequence. Do not copy the environmental explanation into this paragraph: its job is to examine a different concern."
      ],
      "check": {
        "prompt": "Develop the convenience paragraph before comparing. What makes your final sentence more than another claim that bags are useful?",
        "answer": "One possible continuation is “a customer may stop for food on the way home without carrying a bag. Shops could respond by offering an inexpensive reusable option, so the customer can carry the purchase and use that bag again.” The proposed action addresses the specific problem. Another practical solution is valid if its consequence is explained."
      }
    },
    {
      "title": "Connect paragraphs and keep the position visible",
      "paragraphs": [
        "The environmental paragraph supports the policy; the convenience paragraph tests a cost. However can introduce that cost. A final judgement can accept the cost and explain the condition for support: the change should include a practical alternative. Do not conclude “Both sides are right” after arguing for a specific policy; that hides what you recommend.",
        "Use reference to avoid unnecessary repetition: “this change” can refer to ending free disposable bags when that decision is clear. If several changes are discussed, name the intended one. Retrieve the article distinction from Module 18 when needed: “a reusable bag” introduces one option; “the bag” can refer to it later. You may study that support module before returning here."
      ]
    },
    {
      "title": "Analyse a complete original response",
      "paragraphs": [
        "Shops should stop giving away single-use bags, although customers still need a practical way to carry unexpected purchases. A gradual change would be more helpful than simply removing every option overnight.\n\nThe main environmental benefit comes from using fewer bags. A customer who keeps a sturdy bag and brings it on later visits does not need a new one each time. However, buying another reusable bag on every trip would weaken that benefit.\n\nConvenience remains a reasonable concern. Someone buying food after work may not have planned the visit. Shops could offer an inexpensive reusable bag and remind regular customers to bring one. This would preserve a solution without encouraging unlimited disposable use.\n\nCost also matters. A charge should encourage a change in habit rather than make an ordinary shopping trip unnecessarily expensive.\n\nOverall, I support ending free disposable bags if shops explain the change and provide an affordable alternative.",
        "Trace the construction: the opening answers the decision; the first body paragraph supplies a mechanism and a limit; the next responds to inconvenience; cost supplies the distinct additional idea. The conclusion retains conditional support. This is an original teaching model, not an examiner-rated script. Read it for those decisions rather than memorising its phrases."
      ]
    },
    {
      "title": "Diagnose a weak response and make a targeted revision",
      "paragraphs": [
        "Weak response: “Bags are very important today. There are advantages and disadvantages. Bags are useful because they are convenient and beneficial. The environment is important. In conclusion, both views are correct.” The problem is not a shortage of impressive words. The response does not state a clear decision, develop environmental effects or add a distinct third point.",
        "Repair one paragraph before replacing the whole response. Keep the convenience claim, explain an unexpected purchase, then propose an affordable alternative. Add a separate cost point. Finally revise the opening and conclusion so the same position is clear in both. A language pass then checks missing verbs, plural agreement and clear references."
      ],
      "check": {
        "prompt": "Replace “The environment is important” with two sentences explaining a relevant mechanism. Then identify one content point the weak response still omits.",
        "answer": "For example: “Repeatedly using the same bag reduces the number of disposable bags needed. A reminder near the entrance could help regular shoppers remember to bring one.” The additional own idea, such as cost, is still missing until developed separately."
      }
    },
    {
      "title": "Write independently and return to the weakest step",
      "paragraphs": [
        "The live college-practical-courses essay changes the decision and evidence. Use its learning and cost points and choose a distinct third idea; the bag examples will not answer it. First attempt the supported thesis/paragraph task, then construct the full essay without copying this model. The teenager-space assessment changes the subject again.",
        "After review, underline one place where you explain how rather than simply say useful. If it is absent, repair that paragraph. On your next writing day, close this chapter and build a new paragraph from a claim of your own: one explanation, one relevant illustration and a limit only where it contributes. Revisit the sentence step if meaning is lost in the grammar."
      ]
    }
  ],
  "application": "The guided stage asks for a thesis and a developed learning paragraph. The independent essay uses the full practical-course question; the assessment changes to space for teenagers. Carry the construction method across, but choose fresh reasons for leisure, safety and your own idea rather than copying the bag-policy example."
},
"band1-writing-trends": {
  "mode": "replace",
  "outcomes": [
    "Choose details that engage a specified magazine reader.",
    "Organise an article around experience and usefulness.",
    "Replace vague praise with concrete description and explanation."
  ],
  "prerequisite": "An article addresses readers who may choose whether to continue reading. It can be personal and lively while remaining clear. For B2 First, practise a complete article within 140–190 words; short opening tasks are scaffolding, not full examination responses.",
  "sections": [
    {
      "title": "Start with reader and purpose",
      "paragraphs": [
        "A student magazine asking about a worthwhile activity needs more than a diary entry. The reader wants to understand what happens, why it is enjoyable and whether it might suit them. Select details that answer those needs. A title can signal the angle: ‘A small workshop with a useful surprise’ promises an experience, while ‘My article’ supplies no reason to read.",
        "An opening can use a concrete scene rather than a rhetorical question. ‘At the Saturday repair club, a broken lamp became my first successful project’ introduces place, activity and a small outcome. A question such as ‘Have you ever wondered...?’ is optional, not a requirement. The important point is that the opening leads into this particular article rather than a memorised introduction."
      ]
    },
    {
      "title": "Build an opening from a small scene",
      "paragraphs": [
        "Use notes rather than an opening formula: repair club / silent broken clock / first successful repair / surprise. The reader needs an activity and an angle. Demonstration: “The clock had been silent for a year. At the repair club, I heard it tick again.” The two sentences create a specific change; they do not claim that every visit has a happy ending.",
        "Complete a different opening from these notes: balcony herb class / recognised mint by smell / beginner. Start “I had never ___ until ___.” Choose one discovery, then add a sentence explaining what a participant actually does. An opening should lead into the article’s subject, not delay it with a general history of plants."
      ],
      "check": {
        "prompt": "Write the two-sentence opening, then remove any detail that does not help a new reader imagine the activity.",
        "answer": "For example: “I had never recognised mint by smell until I joined the balcony herb class. Beginners handle a few safe kitchen herbs and learn how to grow them in small containers.” The concrete discovery creates interest and the second sentence explains the activity. Other natural openings are valid."
      }
    },
    {
      "title": "Develop description into value",
      "paragraphs": [
        "Compare ‘The club is nice and interesting’ with ‘Beginners work beside an experienced volunteer, so you can ask why a repair is safe before trying it yourself.’ The revision tells the reader what the support looks like and why it matters. Specific nouns and verbs often create a clearer picture than a string of adjectives.",
        "Organise one paragraph around what participants do and another around your evaluation or recommendation. The personal experience should support that evaluation: explain one difficulty, action or discovery. Do not let an unrelated story about getting there consume the whole response. A final recommendation can name an audience and a condition, such as people who enjoy patient practical work and are willing to follow safety guidance."
      ]
    },
    {
      "title": "Grow a useful evaluation before the complete article",
      "paragraphs": [
        "Partly built paragraph: “The tutor demonstrates one repair before we try it. This helps beginners because ___. During my visit, ___. However, ___.” Complete the explanation, one observed example and a relevant limit. Avoid repeating “it is helpful” in the explanation slot.",
        "Weak ending: “Everyone must go because it is amazing.” Repair it by naming an audience, a reason and a condition: “It would suit ___ who ___, provided ___.” Then remove the frame for the photographic-walk and overlooked-place prompts."
      ],
      "check": {
        "prompt": "What is a concrete repair to the weak ending?",
        "answer": "“It would suit patient beginners who enjoy solving practical problems, provided they follow the volunteer’s safety advice.” It identifies readers and a meaningful condition. A different audience is valid if the preceding experience supports it."
      }
    },
    {
      "title": "A complete original article",
      "paragraphs": [
        "A Saturday worth repairing",
        "I thought the old lamp on my desk was ready for the bin. After one morning at our college repair club, it was working again, and I understood why it had failed.",
        "The club meets in a small workshop on Saturdays. You bring an item, explain the problem and work with a volunteer who checks what can be done safely. Nobody expects beginners to arrive with tools or technical knowledge. I spent most of my first visit asking questions, but that was part of the activity.",
        "What I enjoyed most was seeing a result from careful observation. Instead of guessing, we tested one possible cause at a time. The session also made me think differently about replacing things immediately.",
        "I would recommend the club to anyone who likes solving practical problems. Be prepared to work slowly, though: some repairs take several visits, and not every item can be saved. Even then, you leave with a better understanding of it.",
        "The scene creates interest, the middle explains the experience, and the final paragraph recommends it with a realistic limit. No claim of an official score is attached to the model."
      ]
    },
    {
      "title": "Edit for a reader who was not there",
      "paragraphs": [
        "Check whether each pronoun has an identifiable referent. ‘It was great there’ tells an unfamiliar reader little. ‘The volunteer’s demonstration made the repair easier to understand’ names both the source of help and its effect. Vary sentence openings when useful, but keep references clear rather than replacing every noun with an exotic synonym.",
        "Incorrect emphasis: ‘Everyone will absolutely love this perfect activity.’ Improved: ‘It would suit students who enjoy practical work, although some may prefer a faster result.’ The second recommendation is more useful because it distinguishes readers and acknowledges a limitation. Engaging writing need not exaggerate."
      ],
      "check": {
        "prompt": "Improve ‘The market is very good’ by adding one observable detail and its value to a visitor.",
        "answer": "One possible revision: ‘On Saturday mornings, local musicians play beside the food stalls, so visitors can hear a performance while trying produce from nearby farms.’ The detail makes the evaluation understandable; other concrete, relevant choices are possible."
      }
    },
    {
      "title": "Return to one reader need",
      "paragraphs": [
        "After the full article, ask a reader to name what participants do and who would enjoy it. If they cannot, revise the sentence where you replaced description with vague praise. On a later day, write a new opening about a different place without the I-had-never frame.",
        "The short final opening assessment checks an introduction, not a complete article. Use the independent full response to review development and organisation across the whole text."
      ]
    }
  ],
  "application": "Write the guided title and opening for the specified student reader. In the independent activity, construct the full article around what people do, your experience and a recommendation. The overlooked-place assessment needs new concrete details rather than the same repair-club story. Use the model for paragraph functions, not phrases to copy."
},
"band1-writing-integrated": {
  "mode": "replace",
  "outcomes": [
    "Cover a correspondent’s questions with usable detail.",
    "Select request and explanation language appropriate to the relationship.",
    "Organise a complete informal email and adapt to a formal request."
  ],
  "prerequisite": "Register is language appropriate to a situation and relationship. Informal writing can use contractions and a warm personal tone; formal writing can still be plain and direct. A greeting alone does not establish register if the requests and explanations are unsuitable.",
  "sections": [
    {
      "title": "Turn instructions into reader needs",
      "paragraphs": [
        "Before drafting, identify the reader, reason for writing and each requested point. If a friend asks about an after-class activity, equipment and enjoyment, a description of the town answers none of those fully. Give enough information for the friend to decide: what happens, what they need to bring and why it might suit them.",
        "Separate supplied information from invented promises. ‘Beginners can borrow equipment’ reassures the reader only if the situation supports it. ‘You will certainly become an expert’ is neither necessary nor credible. When the task invites an original detail, choose a plausible one that helps communication rather than changing the problem."
      ]
    },
    {
      "title": "Answer one concern before drafting an email",
      "paragraphs": [
        "New teaching brief: Your friend Zoe asks about joining a community choir, whether previous singing experience is needed and what happens at a session. First sort the needs: activity / beginner concern / practical next step. “Our town has many cafés” is friendly but does not answer any of them.",
        "Build a complete answer: “You do not need to read music for the beginner group.” Add why: “The leader teaches each short section by ear.” Add a next step only if it helps: “Come to the open session before deciding whether to join.” Each sentence does a different job.",
        "Partly built paragraph: “You may worry about singing alone, but ___. The leader ___, so ___. You could ___ first.” Complete it with plausible rehearsal arrangements rather than a promise that Zoe will become an excellent singer."
      ],
      "check": {
        "prompt": "Complete the paragraph and identify its reassurance, explanation and action.",
        "answer": "One possibility: “You may worry about singing alone, but beginners rehearse in a small group. The leader repeats each part, so nobody has to learn it immediately. You could try the open session first.” The practical support explains the reassurance; the final sentence offers a manageable action."
      }
    },
    {
      "title": "Read a complete email after building its parts",
      "paragraphs": [
        "Hi Zoe,\n\nI’m glad you’re interested in the community choir. I joined last month, and I think you would enjoy trying the beginner group with me.\n\nWe meet on Tuesday evenings in the town hall. The leader teaches a short song in sections, and then we put the parts together. Last week we struggled with the ending at first, but practising it slowly made the final performance much more satisfying.\n\nYou don’t need to read music or sing a solo. Everyone begins together, and the leader repeats a part whenever someone needs more time. Bring some water and a pencil for marking your printed words. You can borrow a folder at the first session.\n\nWhy not come to next Tuesday’s open rehearsal before deciding whether to join? We could meet outside the hall a few minutes early, so you wouldn’t have to find the group alone.\n\nBest wishes,\nAlex",
        "The opening acknowledges the friend, the first body paragraph explains the activity through an experience, the next resolves the beginner concern and gives preparation advice, and the closing proposes a specific action. The paragraph construction comes before this whole model. Its choir details cannot answer the live photography email."
      ]
    },
    {
      "title": "Adapt to a formal information request",
      "paragraphs": [
        "A formal request to an organiser should state why the details matter and ask clearly about each one. ‘I am considering booking the workshop and would like to check the access arrangements’ establishes purpose. Follow with an accessible entrance question, a transport question and the booking deadline. A reader can then answer without guessing what information you need.",
        "Incorrect: ‘Give me all the details immediately.’ Improved: ‘Could you confirm which entrance provides step-free access and whether a bus stop is nearby?’ The revision is specific and courteous. Do not make it less clear by writing ‘I humbly beseech your esteemed clarification’. In B2 First complete letter/email responses use 140–190 words; the shorter formal assessment here isolates the request-writing skill."
      ],
      "check": {
        "prompt": "A friend asks about both accommodation and travel. Why is a warm 170-word description of the city insufficient?",
        "answer": "It may suit the relationship but leaves the actual questions unanswered. Content coverage and communicative appropriateness are separate checks; the revision needs practical accommodation and travel information."
      }
    },
    {
      "title": "Repair a request, then remove the frame",
      "paragraphs": [
        "For an unfamiliar organiser, start with a purpose and a specific information gap: “I am considering the evening language class. Could you confirm whether ___?” Embedded questions use statement order: “whether beginners can join”, not “whether can beginners join”. Courtesy should make the request easy to answer.",
        "Weak message: “Your class sounds good. Send everything.” Revise it by choosing two necessary facts and explaining why one matters. Now close the choir model and answer the live friend’s actual questions; for the organiser task, check each requested detail rather than borrowing the friendly opening."
      ],
      "check": {
        "prompt": "Repair “Could you tell me where does the class meet?” and add a useful reason.",
        "answer": "“Could you tell me where the class meets? I need to check whether I can arrive after work.” The embedded clause uses subject–verb order. The reason explains the practical need without a long apology."
      }
    },
    {
      "title": "Retrieve the reader and purpose later",
      "paragraphs": [
        "After the next writing module, rewrite one informal request for an unfamiliar organiser. Keep the factual need but change greeting, request and closing consistently. Check whether the reader can act on it; changing only Hi to Dear does not complete the register change."
      ]
    }
  ],
  "application": "The guided paragraph isolates reassurance and instruction. The independent email combines activity, equipment and personal relevance. The assessment changes to an organiser and three practical questions, requiring a more formal register. Review coverage before replacing vocabulary or adding a long introduction."
},
"band1-writing-essay-structure": {
  "mode": "replace",
  "outcomes": [
    "Distinguish evaluation for a prospective user from findings for a decision-maker.",
    "Develop a review with a supported recommendation.",
    "Turn a report finding into a feasible action and evaluation method."
  ],
  "prerequisite": "An evaluation judges usefulness against a purpose. A recommendation proposes a choice or action. A review usually helps a potential user decide; a report supplies organised findings for a stated reader. Both need evidence and reasons, not praise alone.",
  "sections": [
    {
      "title": "Separate user advice from managerial action",
      "paragraphs": [
        "New teaching venue: a neighbourhood swimming pool. It has beginner lanes, crowded evening sessions and unclear locker instructions. A review helps a prospective swimmer decide whether it suits them. A report helps the manager choose an improvement. The observed feature can be the same, but its communicative purpose changes.",
        "Description: “There are two beginner lanes.” Evaluation: “The beginner lanes let slower swimmers practise without feeling hurried.” Recommendation to a user: “Try an early session if you need more space.” Action for a manager: “Trial a booking limit in the busiest session.” Trace what the reader can do with each statement."
      ]
    },
    {
      "title": "Complete the evidence-to-value chain",
      "paragraphs": [
        "Demonstration: “A lifeguard explained the lane rules before I entered. That made the first visit less confusing because I knew where a slow swimmer should go.” The visit supplies the evidence; the because-clause explains its value. It is more informative than “The staff are amazing.”",
        "Complete “The lockers had no clear instructions. During my visit, ___. This would be difficult for ___ because ___. I would recommend ___.” Keep the invented teaching detail plausible and label it as an example rather than a survey finding."
      ],
      "check": {
        "prompt": "Complete one defensible evaluation and a proportionate recommendation.",
        "answer": "For example: “During my visit, I had to leave the changing area to ask for help. This would be difficult for a first-time visitor because the payment system is unfamiliar. I would recommend asking at reception before changing.” The action addresses the stated limitation."
      }
    },
    {
      "title": "Analyse a complete review with a fresh venue",
      "paragraphs": [
        "A pool for an unhurried first visit\n\nThe neighbourhood pool is worth trying if you want to return to swimming without joining a competitive group. I visited on a weekday morning after several years away from the water.\n\nThe beginner lanes were the strongest feature. A lifeguard explained the rules before I entered, and slower swimmers had enough space to stop at the end without holding everyone up. This made the first few lengths much less stressful than I expected.\n\nThe changing area needs more attention. The lockers use a payment system that is not explained clearly, so I had to ask for help before leaving my bag. Reception staff were helpful, but a short sign would save time.\n\nI would recommend an early session to nervous beginners. Evening sessions are busier, according to the timetable notice, and may be less relaxing. Check the locker arrangements when you arrive and allow a few extra minutes for your first visit.",
        "The opening names the audience, the experience develops a strength, the limitation is observable, and the ending gives conditional advice. This original review teaches functions; it does not prewrite the live study-space review."
      ]
    },
    {
      "title": "Construct a report action from the same observation",
      "paragraphs": [
        "A report to the pool manager can use headings such as Purpose, Findings and Recommendations. Draft finding: “New visitors cannot easily identify the locker payment process.” Add evidence without exaggeration: “During the visit, I needed reception assistance.” Action: “Place a short illustrated instruction beside the lockers.” Review: “Ask reception to record related questions for the following month.”",
        "Partly built report section: “The main difficulty was ___. This affected ___. I recommend ___ because ___. Staff could check its effect by ___.” Complete it before reading a whole report model in practice. Do not turn one visit into a fabricated percentage of all customers."
      ],
      "check": {
        "prompt": "Diagnose “The pool is terrible. Build another one.” What should be repaired first?",
        "answer": "It makes an unsupported whole-venue judgement and proposes an action unrelated to the scale of the evidence. State the specific locker-information problem and recommend clearer instructions before claiming a new building is needed."
      }
    },
    {
      "title": "Choose the purpose again without the venue example",
      "paragraphs": [
        "The live study-space tasks need fresh observations and consequences. For the review, test whether a prospective student receives usable advice. For the report, trace each recommendation to a stated finding and a feasible action. On a later day, turn one review sentence into a report recommendation and explain how its audience changes."
      ]
    }
  ],
  "application": "The guided paragraph compares a strength and a limitation for a reader. The independent review develops a complete recommendation. The assessment changes audience to the college, so present findings and feasible improvements rather than repeat a review’s personal recommendation. Use separate self-review checks for coverage, organisation and language."
},
"band1-writing-brainstorming": {
  "mode": "replace",
  "outcomes": [
    "Distinguish a topic from the decision being asked about.",
    "Develop a claim with a mechanism, illustration and useful condition.",
    "Weigh a limitation without losing a clear position."
  ],
  "prerequisite": "A reason supports a judgement. A mechanism explains how the proposed effect could happen. An example makes the explanation concrete; it is not a substitute for it. A condition identifies when a claim applies rather than avoiding a decision.",
  "sections": [
    {
      "title": "Make a decision before collecting reasons",
      "paragraphs": [
        "New teaching question: Should a college subsidise student bus passes? The decision concerns spending college funds on travel. “Buses are common in cities” names a topic but supplies no judgement. A defensible position could support a limited subsidy for students whose travel costs prevent regular attendance.",
        "Sort possible reasons: access to classes / favourite bus colour / cost to the college / reduced parking demand. Keep reasons that help evaluate the funding decision. Access and cost are distinct; “helps students attend” and “improves attendance” need different development or they repeat one point."
      ]
    },
    {
      "title": "Watch a claim become a causal explanation",
      "paragraphs": [
        "Claim: a subsidy could improve access. Mechanism: students facing high fares can afford more regular journeys. Illustration: a student with several short sessions no longer has to choose which day to attend because of the return fare. Limit: reduced cost helps only if a usable route exists.",
        "Completed paragraph: “A bus-pass subsidy could make classes more accessible to students with high travel costs. Reducing the price of each journey may help someone attend several short sessions rather than miss a day to save money. However, the policy would do little for a student whose village has no suitable service.” The limit tests the mechanism rather than adding a generic disadvantage."
      ]
    },
    {
      "title": "Finish a reason with support, then remove the support",
      "paragraphs": [
        "Complete “The college would need to limit the cost because ___. It could begin by ___. This would allow staff to check ___ before ___.” Supply a real budget concern, a bounded action and evidence to review. “It is expensive because it costs money” repeats the claim without explaining a consequence."
      ],
      "check": {
        "prompt": "Finish the paragraph and explain why buying more cycle stands is not automatically the matching response.",
        "answer": "For example: “Other student support also needs funding. It could begin by offering a one-term subsidy to a defined group. This would allow staff to check demand and attendance before expanding it.” Cycle stands may be worthwhile, but they do not directly resolve how the bus subsidy is funded."
      }
    },
    {
      "title": "Diagnose an argument, not its vocabulary",
      "paragraphs": [
        "Weak response: “Bus passes are beneficial because they have benefits. The college should pay, although everything has disadvantages.” Repair the missing causal bridge first. Then identify one competing use of money and explain why the proposal should have priority or be limited. A qualification should sharpen the decision, not erase it.",
        "With the frame closed, write a short paragraph about a different small funding decision. Mark claim / mechanism / illustration / limit only where those functions genuinely occur. You do not need four mechanically separate sentences."
      ]
    },
    {
      "title": "Transfer reasoning to fresh decisions",
      "paragraphs": [
        "The guided garden, independent laptop and final music-room tasks require different mechanisms and practical conditions. Reuse the reasoning questions rather than a bus example. After feedback, revise one sentence that merely repeats useful. On the next study day, explain its mechanism aloud without reading the paragraph."
      ]
    }
  ],
  "application": "The guided garden paragraph asks for a benefit, mechanism and limit. The independent laptop paragraph and music-room assessment require new reasoning under different conditions. Use the claim-development method, but do not carry over a gardening detail that does not solve the new problem."
},

"band1-speaking-part1-intro": {
  "mode": "replace",
  "outcomes": [
    "Answer a familiar question directly and extend it with relevant detail.",
    "Choose time reference that matches the interviewer’s demand.",
    "Review phrasing and clarity from an actual spoken response."
  ],
  "prerequisite": "Know present simple for habits, past simple for completed events and would like for wishes. You do not need specialist knowledge to describe ordinary experiences. A relevant short answer is a better starting point than a memorised speech.",
  "sections": [
    {
      "title": "Hear which job the question asks you to do",
      "paragraphs": [
        "Read three questions: “What do you usually cook?” “How did you learn to cook?” “What would you like to cook?” The topic stays cooking, but the required answer changes: routine, past learning and future wish. Before speaking, identify the verb and the information requested. A fluent account of yesterday’s meal does not automatically answer a question about a future wish.",
        "Use this short diagnostic orally: complete “I usually…” with a current habit, then “I learned…” with a finished event. If those forms are difficult, revisit the simple/past distinction in Module 3. You do not need a complicated life story to begin an interview answer."
      ],
      "check": {
        "prompt": "For “What would you like to learn to cook?”, which opening answers directly: “I cooked pasta yesterday” or “I would like to learn to bake bread”? Explain the time difference.",
        "answer": "The bread opening states the desired skill. The pasta sentence reports a finished event and could be relevant background only if connected to that wish. Would like introduces a wish, not an ability already acquired."
      }
    },
    {
      "title": "Choose one idea and say one complete clause",
      "paragraphs": [
        "Suppose the question is “What do you like about cooking?” Candidate ideas: choosing ingredients, saving money, yesterday’s weather. The first two can answer; weather needs an explicit connection or should be left out. Choose one idea you can explain instead of listing everything you know.",
        "Demonstration: “I like choosing the ingredients.” Subject I and finite verb like make the answer complete. Add a reason: “I can adapt a meal to what my family enjoys.” Join when ready: “I like choosing the ingredients because I can adapt a meal to what my family enjoys.” Avoid “I am like cooking because is useful”: like is already the finite verb, and the reason clause needs a subject."
      ],
      "check": {
        "prompt": "Complete aloud: “I enjoy ___ because ___.” Use an ordinary activity and one specific reason. Check whether the because-part has a subject and verb.",
        "answer": "For example: “I enjoy baking because I can make something for other people.” Other activities are valid. “Because useful” leaves the reason incomplete here; “because it is useful” supplies a subject and verb but still benefits from explaining useful in what way."
      }
    },
    {
      "title": "Complete a partly built answer",
      "paragraphs": [
        "Begin with “I like preparing a meal with my sister because we have time to talk.” Add only a brief example: “Last weekend, ___.” Choose an event that shows the conversation or cooperation. An unrelated story about the bus journey would not support that reason.",
        "Possible development: “Last weekend, we tried a new soup and compared what to add.” This makes the shared activity concrete. Now remove the supplied opening and answer a fresh preparation question: “When do you prefer to cook?” Give your own preference, a reason and one small detail, without requiring an exact number of sentences."
      ],
      "check": {
        "prompt": "Which detail best develops “I prefer cooking at weekends because I have more time”: a recipe tried slowly / the colour of the station / a list of every city visited?",
        "answer": "A recipe tried slowly develops the available-time reason. The other details need a new connection that the answer has not established. Relevance is the check; an impressive vocabulary item does not make an unrelated detail useful."
      }
    },
    {
      "title": "Make the message easy to hear",
      "paragraphs": [
        "Say the same idea in meaning groups: “I prefer cooking at weekends / because I can try a new recipe / without rushing.” Each group gives the listener a useful unit. Compare pausing after every word in “a new recipe”: the phrase becomes harder to follow. Pause where the meaning offers a boundary, not at a fixed word count.",
        "Focus stress can make a contrast clearer: “At WEEKENDS, not before WORK.” Keep small words and endings recognisable; stressing weekends does not justify deleting at or the past ending in a later example. The written capitals suggest focus, but only listening to speech can show whether a listener understands it."
      ],
      "check": {
        "prompt": "Read “I tried the recipe twice / before changing the ingredients.” What meaning might be lost if before becomes after or twice is omitted?",
        "answer": "Before sets the sequence; twice gives the number of attempts. Changing or omitting them changes the account. Rehearse the entire phrase at a manageable pace, then ask a listener to recover those details if one is available."
      }
    },
    {
      "title": "Diagnose a weak spoken answer",
      "paragraphs": [
        "Weak answer to “What do you enjoy about cooking?”: “Cooking is good. It is very good and interesting. I think it is good. Yesterday was sunny.” The opening gives only a vague evaluation, later sentences repeat it and the weather changes the topic. Fix development before searching for rare adjectives.",
        "Improved version: “I enjoy trying small changes to a familiar meal. For example, last weekend I added roasted vegetables to our usual soup and asked my sister what she thought. Comparing the result made an ordinary lunch more interesting.” The answer names the enjoyable action and illustrates it. It remains one possible response, not a speech to memorise."
      ],
      "check": {
        "prompt": "Repair “I enjoy learning because learning is enjoyable” by adding one explanation. Try it aloud before reading the example.",
        "answer": "One possibility is “I enjoy learning because a small improvement shows me that practice is working.” A personal example could then explain which improvement. The reason must add meaning rather than repeat enjoyable."
      }
    },
    {
      "title": "Rehearse with less help and review actual speech",
      "paragraphs": [
        "Choose a different activity from cooking. Write only three cues: activity / reason / event. Speak once without reading complete sentences. Replay if recording is available. Ask: did I answer the question early, did the reason explain my preference, and could the key detail be understood? Choose one repair rather than repeatedly restarting the entire answer.",
        "For a missing word, explain plainly and continue: “the tool that measures the amount” may communicate the idea until you recall scale. A short correction such as “last month—actually, last winter” can protect a relevant fact. Replacing a clear word repeatedly can disrupt the message more than keeping it."
      ]
    },
    {
      "title": "Transfer to the interview and revisit one correction",
      "paragraphs": [
        "The live work/study, free-afternoon/new-skill and learning-habit questions require your own content. Diagnose each question separately: a usual habit needs present reference; a desired skill needs a wish; how a habit developed needs a past explanation. The cooking demonstration supplies a construction method, not answers to those questions.",
        "After the next speaking module, answer a new familiar-topic question with no written sentence frame. Listen for the particular repair you practised here, such as a missing reason-clause subject or unclear phrase boundary. B2 interview rehearsal is solo evidence; real paired interaction needs another person, and the checklist does not automatically assess pronunciation or proficiency."
      ]
    }
  ],
  "application": "Use the guided work/study question to practise a direct answer and reason. The independent pair asks about free time and a new skill, so change the time reference and supporting detail accordingly. The assessment asks how a learning habit developed: include a past explanation as well as its present value."
},
"band1-speaking-independent": {
  "mode": "replace",
  "outcomes": [
    "Compare two scenes through a shared dimension.",
    "Separate visible facts from cautious interpretations.",
    "Develop a one-minute comparison and a relevant partner response."
  ],
  "prerequisite": "Both links a shared feature, whereas and while can contrast, and might marks a possible interpretation. The lesson illustrations prepare comparison; they are original visual prompts, not official examination photographs.",
  "sections": [
    {
      "title": "Compare through the question",
      "paragraphs": [
        "A visual comparison is not two separate inventories. If the question asks what people might gain from activities, select details that support a benefit: cooperation, concentration, creativity or exercise. ‘In picture one there are three people; in picture two there are four’ is visible but may not help answer that question.",
        "Choose a shared dimension first. ‘Both groups are working together, but the gardeners are managing an outdoor task whereas the cooks are preparing something indoors.’ This makes a similarity and a contrast within one connected thought. Follow with significance: ‘The garden may offer more physical exercise, while the kitchen could require closer coordination in a small space.’"
      ]
    },
    {
      "title": "Know what the image can and cannot establish",
      "paragraphs": [
        "Visible tools and actions can support a cautious interpretation. ‘They seem to be planning the next stage’ is reasonable when people are gathered over equipment. ‘They are lifelong friends who always work here’ invents a history the picture cannot show. Might, may, appear and seem distinguish interpretation from observation; they are not decorations to add to every sentence.",
        "Use a visual fact as support: ‘They may need to communicate carefully because several people are working around the same table.’ The because-clause explains the inference. Avoid a chain of unsupported emotions such as ‘They are definitely delighted and completely relaxed’ when expressions are unclear."
      ]
    },
    {
      "title": "Build one supported comparison before the long turn",
      "paragraphs": [
        "Sort these statements about the supplied garden/kitchen illustrations: visible people share a work area; possible they need to coordinate; unsupported they have been friends for ten years. Separate a visible fact from an inference and an invented history before speaking.",
        "Partly built comparison: “Both groups ___, whereas ___. This might help them ___ because ___.” Complete one shared feature and one meaningful contrast, then explain the benefit using a visible action. Speak that comparison alone before adding another point."
      ],
      "check": {
        "prompt": "Why is “They are happy because they always do this together” weak when the illustration supplies no history?",
        "answer": "It invents repeated experience and treats emotion as certain. Refer to visible cooperation and qualify the interpretation: for example, sharing a task may help conversation. A cautious word cannot rescue an inference with no visible support."
      }
    },
    {
      "title": "Build a connected long turn",
      "paragraphs": [
        "Possible response: ‘Both activities involve people making something together, although the settings are quite different. The gardeners are outside and have more room to move, while the cooks seem to share a small work surface. I think the first activity could help people feel more energetic because they are working physically and can see changes in the garden over time. Cooking may give a quicker shared result, since the group can eat what they prepare. In either case, cooperation seems important: people need to agree who will do each part rather than all reaching for the same tools.’",
        "The response chooses one dimension, develops two different benefits and returns to a shared requirement. It does not need to describe every object. In B2 First Part 2, the extended comparison is about one minute, followed by a brief partner response. Practise with a timer for pacing, but do not treat reaching a duration as proof of quality."
      ]
    },
    {
      "title": "Practise a response to a different partner idea",
      "paragraphs": [
        "Separate rehearsal: a partner says walking to class is preferable to cycling because it allows conversation. A response could acknowledge that criterion, qualify it and choose: “Walking does make talking easier, though cycling might suit a longer journey. I would walk when there is time because the journey becomes a chance to catch up.” This is a response to the actual reason, not a fresh speech about transport.",
        "Complete “I can see why ___, but ___, so I would ___.” Use a different activity from the live cooking/gardening choice. Then remove the frame and respond to an opinion from a real partner if possible."
      ],
      "check": {
        "prompt": "What is missing from “I disagree. Cycling is nice”?",
        "answer": "It does not acknowledge the conversation reason or compare the alternatives on a relevant criterion. Add a reason tied to the partner’s point, then state a justified preference. Solo rehearsal cannot demonstrate real-time adaptation."
      }
    },
    {
      "title": "Withdraw the sentence frame",
      "paragraphs": [
        "Use only two cues for the independent scene pair: comparison dimension / possible benefit. Speak without a written paragraph, then replay and point to the detail supporting each inference. After the next speaking module, compare two different everyday activities with the same support check.",
        "Keep the one-minute comparison and brief response distinct. Timing is a rehearsal constraint; clear comparison and supported development still need separate review."
      ]
    }
  ],
  "application": "The guided illustration asks for a supported similarity and difference. The independent scene pair asks what participants might gain, requiring an explanation beyond description. In the assessment, acknowledge the partner’s cooking idea before developing your preference. Solo rehearsal cannot assess how you adapt to a live partner."
},
"band1-speaking-hometown": {
  "mode": "replace",
  "outcomes": [
    "Build on a partner’s suggestion and invite a response.",
    "Compare options against shared criteria.",
    "Reach a reasoned decision and qualify a related generalisation."
  ],
  "prerequisite": "A proposal suggests an action; a response accepts, questions or modifies it. Collaboration needs listening as well as speaking. A solo recording can rehearse the language of interaction, but only a human exchange shows whether you respond to another person in real time.",
  "sections": [
    {
      "title": "Respond to a reason before proposing another option",
      "paragraphs": [
        "New discussion: a library can fund either longer weekend opening, extra laptops or a quiet study room. A partner says extra laptops are best because some visitors lack a device. First identify the proposal and reason separately. “Longer opening is nicer” ignores the access problem the partner raised.",
        "Demonstration: “Extra laptops could help visitors without a device. However, they would still need a time when they can reach the library. Could we compare that with opening later on Saturday?” The turn acknowledges, qualifies and invites comparison. It does not require a memorised phrase if the relationship stays clear."
      ]
    },
    {
      "title": "Complete one useful turn",
      "paragraphs": [
        "Partly built reply: “I agree that a quiet room would help ___, although ___. How could we ___?” Choose a relevant user, a genuine limitation and a question that invites a contribution. Do not ask a question only to immediately answer it yourself."
      ],
      "check": {
        "prompt": "Complete the reply and explain what the invitation gives the partner to discuss.",
        "answer": "For example: “I agree that a quiet room would help exam candidates, although it would remove space from shared activities. How could we preserve room for both?” The invitation concerns a trade-off and permits a real response; it is more useful than “Do you agree?” repeated after every sentence."
      }
    },
    {
      "title": "Compare options against one criterion",
      "paragraphs": [
        "Use access as a shared criterion. Laptops address device access; longer opening addresses time access; a quiet room addresses access to concentration. None automatically serves every visitor. Compare one benefit and one cost for each before deciding which group has the greatest unmet need.",
        "Weak exchange: A, “Laptops are good.” B, “The room is good.” Improved exchange: A names the device barrier; B asks whether working visitors can attend; A proposes a limited later session with laptop bookings. Each contribution changes the developing proposal."
      ]
    },
    {
      "title": "Reach a decision and then widen the question",
      "paragraphs": [
        "One defensible decision is to trial longer Saturday opening if staff costs are affordable, while collecting demand for laptop loans. The decision follows a criterion and a condition; it does not prove that the other choices lack value. With a partner, summarise the decision and ask whether it represents both views.",
        "Broader question: Should public services serve every preference? Start with a claim, explain one resource limit and illustrate a fair priority. Partly complete “A service cannot provide ___, but it should ___ because ___.” Then answer without the frame."
      ],
      "check": {
        "prompt": "Why does “Everybody is different, so nothing can be decided” fail to develop the discussion?",
        "answer": "It acknowledges different needs but supplies no principle for choosing. A stronger answer can prioritise an unmet basic need, explain the evidence and keep a review point for other users."
      }
    },
    {
      "title": "Transfer to the welcome-programme tasks",
      "paragraphs": [
        "The live welcome choices need fresh evaluation rather than the library solution. In the first turn, use the partner’s actual walk reason; in the larger rehearsal compare the stated activities. For the broader college-responsibility question, develop your own example and limit.",
        "Replay for a linked response, a fair comparison and a decision that follows the discussion. Later, repeat a short discussion with another person and one unexpected objection. Solo recording rehearses language; it cannot establish live listening or turn-taking ability."
      ]
    }
  ],
  "application": "The guided turn responds to a partner favouring a walk. The independent rehearsal compares all five welcome activities and reaches a decision. The assessment moves to the college’s broader responsibility, so develop a general reason with an example and limit. Use a human partner where possible; mark solo work as rehearsal."
},
"band1-grammar-articles": {
  "mode": "replace",
  "outcomes": [
    "Choose a/an, the or no article from countability and reference.",
    "Explain first and later mentions in a connected account.",
    "Distinguish a general class from a specific identifiable group."
  ],
  "prerequisite": "A countable noun can have a singular and plural form: a workshop, two workshops. An uncountable noun usually names a substance or general idea without counting separate units in that sense: equipment, information. A singular countable common noun normally needs a determiner, such as a, the, my or this.",
  "sections": [
    {
      "title": "Start with the noun, not the article",
      "paragraphs": [
        "In ‘We visited a workshop’, workshop is singular and countable, and the listener does not yet know which one. A introduces one member of that class. In ‘The workshop was beside the station’, the listener can identify the same workshop from the first sentence, so the is appropriate. The signals identifiable reference, not simply a noun mentioned anywhere previously.",
        "A and an depend on sound: a university begins with a consonant sound, while an hour begins with a vowel sound. The written first letter is not enough. An applies to the pronunciation of the next word: an old workshop but a useful workshop. This is a sound-based choice inside an already appropriate indefinite noun phrase."
      ]
    },
    {
      "title": "Make the noun decision before the sound decision",
      "paragraphs": [
        "Role rehearsal: “___ useful tool”; “___ equipment”; “___ hour”. First classify tool and hour as singular countable nouns, and equipment as uncountable in this sense. Only then decide whether an indefinite article is possible. The initial letter of equipment cannot make an equipment correct.",
        "Complete the new-item phrases with a/an where appropriate, then use some before the uncountable item. Say useful and hour aloud to decide the actual next sound."
      ],
      "check": {
        "prompt": "Complete all three phrases and explain why an useful is unsuitable.",
        "answer": "A useful tool / some equipment / an hour. Useful begins with a /j/ consonant sound; hour begins with a vowel sound. This sound check applies after deciding that an indefinite countable phrase is intended."
      }
    },
    {
      "title": "Shared knowledge can identify a first mention",
      "paragraphs": [
        "‘Please close the door’ can introduce door for the first time because the room makes the intended door identifiable. ‘The sun’ commonly names a unique referent in everyday context. ‘The manager’ may be identifiable inside a particular workplace even if no earlier sentence introduced a manager. First mention therefore does not automatically require a.",
        "Contrast ‘I spoke to a manager’ with ‘I spoke to the manager’. The first reports one person with that role; the second expects the listener to identify the relevant one. If several managers are possible and no context selects one, the can leave the reader uncertain. Check what the reader actually knows, not what the writer privately has in mind."
      ]
    },
    {
      "title": "Complete identifiable reference with less help",
      "paragraphs": [
        "Source: “Mina borrowed a torch and a map. ___ torch had a weak battery, so she replaced it. At the campsite she asked the caretaker to unlock ___ gate beside reception.” The first gap refers to an introduced object. The second can be identifiable from the setting and location even without an earlier gate mention."
      ],
      "check": {
        "prompt": "Supply the articles. Would a gate be impossible English in every account?",
        "answer": "The / the. The intended objects are identifiable in this account. A gate could introduce an unspecified gate in a different account; it would change the reference rather than violate a universal first-mention rule."
      }
    },
    {
      "title": "General and specific meanings",
      "paragraphs": [
        "Plural countable nouns often take no article for a general class: ‘Libraries provide useful spaces.’ Uncountable nouns often do the same: ‘Information should be clear.’ Add the when specifying an identifiable set or amount: ‘The libraries in this district close early’; ‘The information on this form is incomplete.’ The phrase after the noun can restrict its reference.",
        "A noun’s sense matters. ‘Coffee helps me wake up’ uses a general substance meaning. ‘A coffee, please’ can mean one serving. Do not present countability as a permanent property with no contextual variation. In the ordinary lesson meaning, equipment remains uncountable: some equipment, an item of equipment, the equipment in this room—not an equipment."
      ]
    },
    {
      "title": "A connected worked account",
      "paragraphs": [
        "‘We visited a museum on Saturday. The museum had a small garden. We sat in the garden and discussed art. The art in the entrance hall was created by local students.’ A introduces the museum; the then identifies it. A introduces the garden; the next sentence refers back to it. Art names a general topic with no article; the art in the entrance hall identifies a specific collection.",
        "Incorrect: ‘A information on form was useful.’ Improved: ‘The information on the form was useful.’ Information is uncountable, so a is unsuitable; the phrase identifies a particular set of information and a particular form. For a genuinely new unspecified form, ‘Information on a form should be clear’ expresses a different generalisation."
      ],
      "check": {
        "prompt": "Explain ‘Students need advice’ versus ‘The students need the advice in this email.’",
        "answer": "The first is a general statement with plural students and uncountable advice. The second identifies a particular group and a specific body of advice; the context must make both identifiable."
      }
    },
    {
      "title": "Retrieve general and specific noun phrases",
      "paragraphs": [
        "Close the chapter and write one general statement about transport and one about the transport used on a particular trip. Explain the difference in reference. Revisit after the next grammar module and check whether every singular countable common noun has a suitable determiner.",
        "After a wrong live answer, name the decision that failed: countability, sound or identifiability. Repeating “second mention means the” will not repair a first-mention shared-knowledge error."
      ]
    }
  ],
  "application": "The guided task traces first mention and later reference. The museum independent stage mixes countability with identifiable places. The assessment contrasts general and specific meanings. Read the connected account before deciding; a neighbouring adjective or previous occurrence alone does not determine the article."
},
"band1-grammar-agreement": {
  "mode": "replace",
  "outcomes": [
    "Find the head of a complex subject and choose an agreeing verb.",
    "Keep auxiliary and main-verb forms consistent.",
    "Explain how quantifiers and reference affect agreement."
  ],
  "prerequisite": "The grammatical head is the central noun of a noun phrase. In the list of rooms, list is the head and of rooms adds information. Finite present verbs often show a singular/plural contrast: the list is; the rooms are. Modals such as can do not add a third-person -s.",
  "sections": [
    {
      "title": "Ignore the distracting neighbour",
      "paragraphs": [
        "‘The list of rooms is on the wall’ has singular list as its subject head. Rooms is inside a modifying phrase. Compare ‘The rooms on the list are available’, where rooms is the plural head. Find the complete subject, then temporarily remove the modifier to test the basic clause: the list is; the rooms are.",
        "Relative clauses add another verb relationship. ‘The students who use this room need identification’ has need agreeing with students. ‘The student who uses this room needs identification’ has two singular verbs. Read each clause separately rather than changing every verb because one plural noun appears nearby."
      ]
    },
    {
      "title": "Mark the head before supplying the verb",
      "paragraphs": [
        "First do a noun-only rehearsal: in “The price of the tickets”, mark price; in “The tickets for the concert”, mark tickets. The of/for phrases add information without replacing the head. Reduce each to price / tickets before choosing a finite verb.",
        "Partly complete “The price of the tickets ___ high” and “The tickets for the concert ___ expensive.” Then add a relative clause: “The ticket that includes a meal ___ more.” Identify the subject of includes separately from the main gap."
      ],
      "check": {
        "prompt": "Complete the three gaps and name each subject.",
        "answer": "Is / are / costs. Price is singular; tickets plural; ticket singular. In the last example that refers to ticket and controls includes. A plural meal name elsewhere would not change the head."
      }
    },
    {
      "title": "Quantifiers change the frame",
      "paragraphs": [
        "‘Each student has a badge’ treats the members individually with singular student. ‘All students have badges’ uses a plural subject. ‘One of the students has a badge’ has one as the head; of the students identifies the group. ‘A number of students have registered’ is a conventional plural pattern, whereas ‘The number of students has increased’ describes a singular total.",
        "Some collective nouns vary with dialect and intended meaning. British English can use ‘The team are discussing their roles’ when thinking of members, while ‘The team is growing’ treats the group as a unit. Do not label every plural team construction wrong. Keep your viewpoint and pronouns coherent and follow any task’s unambiguous supplied frame."
      ]
    },
    {
      "title": "Check the complete verb phrase",
      "paragraphs": [
        "In ‘Does the list include every room?’, does carries the singular present marking, so include remains base. ‘Does the list includes’ marks it twice. ‘The students have finished’ uses plural have with a past participle; ‘The student has finished’ uses singular has. After a modal, use the base form: ‘The list can change’, not ‘can changes’.",
        "Existential there introduces a new noun phrase: ‘There is a problem’ and ‘There are several problems’ are standard edited forms. Informal speech may use there’s before plurals, but formal writing practice should control the intended pattern. The phrase several problems remains plural even when a nearer noun elsewhere is singular."
      ]
    },
    {
      "title": "Keep the auxiliary and lexical verb separate",
      "paragraphs": [
        "Demonstration: “Does the timetable include a break?” Does already carries the singular present marking; include stays base. Complete “Do the sessions ___ (INCLUDE) a break?” and repair “The timetable can changes.” Do not add -s after every singular subject without checking the auxiliary.",
        "In edited formal practice, “Neither of the rooms is available” commonly uses singular agreement. Informal plural agreement also occurs, and collective nouns can reflect members rather than a unit. Follow the unambiguous frame of the checked task without treating one formal exercise as a ban on all variation."
      ],
      "check": {
        "prompt": "Supply the verb and modal repair, then explain what carries agreement in the question.",
        "answer": "Include; can change. Do is the finite auxiliary agreeing with the plural subject sessions. The lexical verb stays base after do or a modal. This is a verb-phrase decision, not just a nearest-noun decision."
      }
    },
    {
      "title": "A worked editing pass",
      "paragraphs": [
        "Draft: ‘The box of forms are on the desk. Each applicant need a copy. The assistants who checks identification has spare copies.’ First identify heads: box, each applicant, assistants. Corrected: ‘The box of forms is on the desk. Each applicant needs a copy. The assistants who check identification have spare copies.’ The relative-clause check also follows assistants.",
        "Then read for reference: who checks or check must refer to the intended person or people. An agreement repair that changes the subject can alter meaning. Keep a short explanation for each edit so that you can apply it in a fresh open-cloze context rather than recognising one memorised sentence."
      ],
      "check": {
        "prompt": "Choose and explain: ‘The quality of the answers has/have improved.’",
        "answer": "Has. Quality is the singular head; answers modifies it in an of-phrase. ‘The answers have improved’ would instead use plural answers as the head."
      }
    },
    {
      "title": "Edit a new two-clause account from memory",
      "paragraphs": [
        "Tomorrow, write two sentences about a group you know: one with a singular head followed by a plural modifier and one with a relative clause. Underline each finite verb and draw its subject link. If you cannot name the head, return to the noun-only step before doing another mixed cloze."
      ]
    }
  ],
  "application": "The guided agreement questions isolate heads and modifiers. The independent open cloze also requires auxiliaries and clear reference, so read the full clause. The assessment changes the noun phrases; use the same head-finding procedure and preserve any defensible collective-noun interpretation identified in feedback."
},

"band1-vocab-awl1": {
  "mode": "replace",
  "outcomes": [
    "Use vocabulary in natural verb–noun and adjective–noun patterns.",
    "Change a word’s form to fit its role without changing its meaning.",
    "Create a retrievable vocabulary record from contextual evidence."
  ],
  "prerequisite": "A synonym is similar in meaning, but it need not share a word’s grammatical pattern or collocations. A word family contains related forms, such as success, successful and successfully. Learn the frame around a word as well as its translation.",
  "sections": [
    {
      "title": "Collocations are usable combinations",
      "paragraphs": [
        "English commonly uses make progress, take responsibility, raise awareness and draw a conclusion. The verb helps form an established expression; substituting a broad synonym can sound unnatural. ‘Do progress’ is not the ordinary expression even though do describes actions. A learner who records progress only as an isolated translation cannot reliably choose its partner.",
        "Patterns include more than pairs. Pay attention to a warning takes to; an increase in attendance takes in; responsible for equipment takes for. The complete phrase includes information about the object and relationship. Compare ‘offer advice to students’ with ‘advise students to arrive early’: the noun and verb express related meanings but build different structures."
      ]
    },
    {
      "title": "Choose an expression, not just its supplied root",
      "paragraphs": [
        "New rehearsal: a student has completed the first part of a difficult project. Choose “made progress” / “did progress” / “took progress” to describe the change. Made progress is the established combination. It does not imply completion, so add a limit if the project is unfinished.",
        "Now complete a different message without options: “The safety notice ___ attention to a loose cable.” Decide whether the subject attends to a warning or directs somebody else’s notice. Then write a new sentence with take responsibility for and a real responsibility you could hold."
      ],
      "check": {
        "prompt": "Complete the notice sentence and explain what the phrase means.",
        "answer": "Draws attention to. The notice directs a reader’s attention to the cable. Pays attention would incorrectly make the notice the attentive person in this ordinary context."
      }
    },
    {
      "title": "Move between forms deliberately",
      "paragraphs": [
        "‘The project was successful’ uses an adjective complement after was. ‘The team completed it successfully’ uses an adverb modifying completed. ‘Its success depended on volunteers’ uses a noun as subject. Read the clause to identify which job is required before choosing the familiar-looking form.",
        "A negative meaning also needs context. ‘The explanation was clear’ describes understandable information; ‘The explanation was unclear’ describes the opposite. A prefix is not merely a way to produce a longer word. Check the consequence in the source and learn the established spelling. Reliable becomes unreliable, not inreliable."
      ]
    },
    {
      "title": "Worked vocabulary in a short report",
      "paragraphs": [
        "‘The team made steady progress after agreeing clear roles. One volunteer took responsibility for safety, while another offered advice to visitors. The first event was successful, although finding replacement parts remained difficult.’ Made progress describes advancement; took responsibility names ownership of a task; offered advice describes help; successful evaluates the event without claiming every problem disappeared.",
        "Now change the grammar: ‘The team progressed steadily’; ‘A volunteer was responsible for safety’; ‘Visitors received useful advice’; ‘The team organised the event successfully.’ These are alternatives with different clause patterns, not instructions to replace every original phrase. The final limitation must remain if you paraphrase the whole report.",
        "Incorrect: ‘We did a significant progress.’ Improved: ‘We made significant progress.’ In this meaning progress is normally uncountable, so a is unsuitable. Incorrect: ‘They completed the task successful.’ Improved: ‘They completed the task successfully.’ Explain both the collocation and the word class rather than correcting the spelling alone."
      ]
    },
    {
      "title": "Construct the family after identifying the message",
      "paragraphs": [
        "Complete “The trial was ___ (SUCCESS), but not every stage developed ___ (SUCCESS).” Begin with successful after linking was; now choose the form that describes developed. The contrast prevents you from treating a family as an automatic promise of overall success."
      ],
      "check": {
        "prompt": "Complete the second form, then create a new noun-subject sentence from the family.",
        "answer": "Successfully. A new noun sentence could be “Its success depended on careful preparation.” The noun becomes the subject; it is not interchangeable with the adverb in the original gap."
      }
    },
    {
      "title": "Retrieve instead of rereading",
      "paragraphs": [
        "Make a record with a short source sentence, the complete expression, its meaning in that sentence and one new example. Later cover the expression and retrieve it from the context. If you only recognise it among supplied options, add a sentence-writing step. A new sentence shows whether you can use its grammar as well as recognise its general meaning.",
        "British and American spellings may both be appropriate where the activity accepts them; use a consistent variety in your own response. A rare synonym is not automatically more accurate. Choose a familiar combination that preserves agency, quantity and certainty."
      ],
      "check": {
        "prompt": "Complete and explain: ‘The team made a useful ___ (CONTRIBUTE), and the project developed ___ (SUCCESS).’",
        "answer": "Contribution and successfully. A useful needs a noun head; developed needs an adverb describing its progress. Reread the meaning: the sentence reports a useful contribution and successful development, not a guarantee that every future stage will succeed."
      }
    },
    {
      "title": "Retrieve one phrase after a gap",
      "paragraphs": [
        "On the next study day, cover the English side of your notes and reconstruct a phrase from its meaning and a situation. Use it in a new sentence with a different subject. The live root-based activities check controlled formation; this additional retrieval checks whether you can choose the expression without a printed base."
      ]
    }
  ],
  "application": "Use the guided collocations to recognise conventional combinations. The independent stage changes both context and word roles. The assessment requires transfer to another topic. After checking, produce a fresh sentence containing the whole expression; the supplied-word drill alone cannot show independent vocabulary use."
},
"band1-vocab-synonyms": {
  "mode": "replace",
  "outcomes": [
    "Interpret a phrasal verb as a whole expression.",
    "Place noun and pronoun objects in appropriate positions.",
    "Preserve tense, agency and meaning in a key-word paraphrase."
  ],
  "prerequisite": "A particle is a short word such as up, off or away used as part of a verb expression. The expression may have a meaning that cannot be guessed from the individual words. Transitive verbs take objects; intransitive verbs do not. These distinctions help determine word order.",
  "sections": [
    {
      "title": "Meaning belongs to the expression",
      "paragraphs": [
        "Put off a meeting means postpone it. Put away equipment means store it. Put up with noise means tolerate it. The shared verb put does not make these expressions interchangeable. Learn the whole form with its normal complement: look after a person, run out of supplies, get over an illness.",
        "Context selects the sense. ‘The event took off’ can describe sudden success, while ‘The aircraft took off’ describes leaving the ground. Do not replace either with an unrelated dictionary meaning. A meaning-preserving paraphrase must retain the event described, not merely contain a related-looking verb."
      ]
    },
    {
      "title": "Object position and verb form",
      "paragraphs": [
        "Some two-part verbs are separable: ‘They called off the meeting’ and ‘They called the meeting off’ can both mean cancelled. With a pronoun object, the normal pattern is ‘They called it off’, not ‘They called off it’. Other expressions stay together: ‘She looked after him’, not ‘She looked him after’. Three-part put up with also stays together before its object.",
        "The verb carries tense: call off → called off; make up → made up; run out of → have run out of. Keep the particle and complement pattern while changing the verb form. ‘We have ran out of coffee’ fails the participle; ‘We have run out coffee’ omits of and changes the construction."
      ]
    },
    {
      "title": "Move a noun object to a pronoun before a mixed set",
      "paragraphs": [
        "Start “Please switch off the lamp.” Both switch off the lamp and switch the lamp off are natural. Replace the lamp with it: “Please switch ___ ___.” Complete this small step before combining meaning, tense and word limits in the live paraphrases."
      ],
      "check": {
        "prompt": "Complete the pronoun form and explain why changing the particle is not a word-order repair.",
        "answer": "It off. Switching on would change the requested action. Pronoun placement is a syntactic correction; the particle still belongs to the intended meaning."
      }
    },
    {
      "title": "Practise new transformations with boundaries supplied",
      "paragraphs": [
        "New demonstration: “They rejected my offer.” With DOWN: “They turned down my offer.” Turn down carries the rejection meaning. With the object replaced by it, use “They turned it down.” The pronoun sits inside this separable verb; “turned down it” is unsuitable in the ordinary personal-pronoun pattern.",
        "Partly complete “The students submitted their forms” → “The students ___ their forms.” Include IN. Handed in preserves submission and past time. Now change the target to “The students handed ___.” Supply the pronoun and particle without duplicating handed.",
        "A different pattern: “We are investigating the fault” → “We are looking into the fault.” Look into stays together before this object. Rewrite with it, then explain why the pronoun-placement rule from turn down cannot be applied mechanically."
      ],
      "check": {
        "prompt": "Complete “The students handed ___” and rewrite the investigation with it.",
        "answer": "Them in; “We are looking into it.” Hand in is separable and the plural forms become them. Look into remains together before it. Read the target words already printed before counting the entered gap."
      }
    },
    {
      "title": "Record structure with meaning",
      "paragraphs": [
        "Use a vocabulary note such as call something off / call it off / cancel an arrangement. Add a sentence in a different tense and one with a pronoun. For an inseparable form, record look after someone and practise a pronoun directly after the complete expression. This makes the syntactic difference memorable.",
        "When reviewing an error, separate wrong meaning from wrong placement. ‘Put away the meeting’ chooses the wrong event meaning; ‘called off it’ chooses a recognisable meaning with the wrong pronoun pattern. Correct the relevant problem, then try a new noun or tense."
      ],
      "check": {
        "prompt": "Why can ‘They called it off’ replace ‘They cancelled it’, while ‘They called off it’ is unsuitable?",
        "answer": "Call off is separable and normally places a personal-pronoun object between verb and particle. The correction preserves cancellation; the issue is object placement, not a new meaning of it."
      }
    },
    {
      "title": "Use the expression outside its original transformation",
      "paragraphs": [
        "After the final set, choose two taught expressions and make new sentences without a key-word prompt: one with a pronoun and one with a different tense. Return after another module and explain which form is separable. The checked tasks reuse taught language in fresh frames; independent expression selection needs this additional sentence-production step."
      ]
    }
  ],
  "application": "Apply each taught expression to the fresh sentence frame. Keep actor, time, negation and gap boundaries intact. The checked forms demonstrate contextual paraphrasing; after checking, produce a different message without a supplied key word to test independent expression choice."
},
"band1-time-reading": {
  "mode": "replace",
  "outcomes": [
    "Choose a reading procedure according to the question demand.",
    "Preserve scope and uncertainty while working efficiently.",
    "Use an error log to distinguish slow reading from unsupported inference."
  ],
  "prerequisite": "Use the evidence and paragraph-linking methods from Modules 7–9. This is a shorter checkpoint, not a full B2 paper. Time management should protect accurate reading rather than replace it with guessing from repeated words.",
  "sections": [
    {
      "title": "Separate locating from deciding",
      "paragraphs": [
        "First map the source’s broad development. Then read the question to decide what evidence is needed: a detail, reason, purpose or overall judgement. Scan for the likely passage and read closely there. Skimming every line equally slowly wastes time, but choosing from a keyword without close reading risks a different kind of error.",
        "If a question remains uncertain, keep a brief note of the candidate evidence and move on. Returning with a clear problem—such as whether the author is cautious or negative—is more useful than restarting the whole text. The B2 Reading and Use of English paper shares 75 minutes across seven parts; a local checkpoint is not an official time allocation for one part."
      ]
    },
    {
      "title": "Work through a fresh evidence record under pressure",
      "paragraphs": [
        "New teaching source: “A community centre installed secure cycle racks in March. More people arrived by bicycle in April, but the weather was also warmer. Staff will compare colder months before judging whether the racks changed travel habits.” Record action → racks installed; observed outcome → more cycle arrivals; alternative explanation → warmer weather; next step → colder-month comparison.",
        "A quick summary, “Racks proved that everyone prefers cycling”, changes a limited observation into a universal preference and a proven cause. A supported summary retains both outcome and uncertainty. For a cause question, point to the weather qualification rather than the rack location.",
        "Now complete the record for this extra sentence: “Visitors welcomed the racks, although some wanted lighting beside them.” Positive response → ___; remaining concern → ___. A concern does not mean the racks were universally rejected."
      ],
      "check": {
        "prompt": "Complete the extra record and write a heading covering both the observation and uncertainty.",
        "answer": "Welcomed racks / lighting. “A promising access change that needs further checking” covers benefit and qualification. A heading only about weather would miss the intervention and the planned evaluation."
      }
    },
    {
      "title": "Use a two-pass decision record",
      "paragraphs": [
        "On the first pass, answer clearly supported questions and mark uncertainties. On return, compare the complete meanings of the remaining options. Reject invented details, reversals, exaggerated quantifiers and incorrect time sequences. The fact that an option is shorter or uses familiar words does not make it more likely.",
        "After checking, record whether the error came from finding the wrong passage, misunderstanding a word, losing a qualifier or running out of time. Practise the weak step on an unfamiliar source. Faster rereading of the same answers can reflect memory rather than improved reading."
      ]
    },
    {
      "title": "Use less support on the live sources",
      "paragraphs": [
        "Before the first task, make only empty notes for observation, explanation and unresolved question. For the independent source, decide your own labels. For the assessment, work without a prewritten record, then reconstruct the evidence after checking.",
        "After the next reading session, retrieve one reference link and one qualifier from an unfamiliar paragraph. Diagnose a slow search separately from an unsupported inference; faster recognition of a memorised answer does not establish improved comprehension."
      ]
    }
  ],
  "application": "The guided later-start account practises observation versus explanation. The independent station-path passage asks you to preserve access and evidence limits. The new fountain-map assessment tests verification and practical reliance. Use raw local results and an error explanation, without converting the checkpoint into a Cambridge score."
},
"band1-time-writing": {
  "mode": "replace",
  "outcomes": [
    "Create a concise content plan for an essay, report or review.",
    "Allocate drafting and checking effort according to actual demands.",
    "Revise an underdeveloped point before polishing surface language."
  ],
  "prerequisite": "Use the genre methods from Modules 10–14. B2 First Writing contains two responses in 80 minutes. The planning routines below are learning choices, not compulsory official minute-by-minute rules.",
  "sections": [
    {
      "title": "Make a usable plan with a different decision",
      "paragraphs": [
        "New teaching question: Should the college publish a monthly student newsletter? Supplied points are information and cost; add an idea of your own. Weak plan: introduction / information / cost / conclusion. Stronger plan: support a small digital trial / one checked timetable helps students locate events / editing needs staff time / student reporting as a distinct learning opportunity.",
        "A plan selects relationships before drafting. Discard “my favourite magazine has a blue cover” unless it helps this decision. A clear position can be conditional without becoming “both views are right”. Keep notes short; writing complete paragraphs in the plan consumes drafting time."
      ]
    },
    {
      "title": "Build a sentence from an incomplete plan",
      "paragraphs": [
        "Completed step: checked event information → fewer missed changes. Sentence: “A checked monthly notice could help students find events, although urgent changes would still need a quicker channel.” The condition limits what a monthly publication can do.",
        "Complete “Editing takes ___, so the college could ___. This would protect ___ while ___.” Choose a real resource and a bounded response. Then remove the sentence frame and write a paragraph on the student-reporting idea, including an explanation and an example."
      ],
      "check": {
        "prompt": "Complete one cost paragraph. What is missing from “It is useful because it has information”?",
        "answer": "For example: “Editing takes staff time, so the college could begin with one short digital issue. This would protect time for checking facts while showing whether students read it.” The weak sentence repeats its evaluation without explaining how the information helps a reader."
      }
    },
    {
      "title": "Reserve a real checking pass",
      "paragraphs": [
        "Review task coverage first. If an essay omits fairness, add its argument before replacing a familiar word with a longer one. Then inspect paragraph order and references. Finally check common personal errors: missing finite verbs, agreement, articles, spelling and sentence boundaries. Editing every sentence at length during the first draft can prevent completion of the second task.",
        "A practical rehearsal might set separate planning, drafting and checking periods, then adjust them from your own evidence. If your plans become complete essays, shorten the notes. If your draft repeatedly loses its position, spend slightly more effort deciding the argument. The useful question is which step improves the response, not whether you obeyed someone else’s exact timing formula."
      ],
      "check": {
        "prompt": "Why is ‘learning / fairness / communication’ weaker than ‘explain ideas to reveal gaps / visible roles make contribution fair / practise negotiation’?",
        "answer": "The second plan includes mechanisms that can become developed sentences. The first lists topics but leaves the writer to invent the reasoning under time pressure."
      }
    },
    {
      "title": "Change genre deliberately",
      "paragraphs": [
        "For a report on the newsletter trial, turn a finding into an action: outdated event details → assign a final fact check → review correction requests after publication. For a review, explain the value and limitation to a student reader rather than issue instructions to a manager. These are different paragraph purposes.",
        "The live group-work essay, report and review need their own reasoning. On a later day, reconstruct a plan for a different topic from memory, then check whether each required point has a mechanism rather than a keyword. Use the existing timer to observe your planning/drafting/checking balance; no exact local timing formula is compulsory."
      ]
    }
  ],
  "application": "The guided stage asks for a thesis, learning development and a distinct third point. The independent report and assessment review change genre, so adjust reader and paragraph purpose. Use the same planning discipline, but do not force an essay introduction into a practical report section."
},
"band1-practice-listening": {
  "mode": "replace",
  "outcomes": [
    "Follow changing expectations and current evaluation across an interview.",
    "Attribute reasons, examples and advice to the right speaker.",
    "Take short relationship-preserving notes from longer audio."
  ],
  "prerequisite": "Use the contrast methods from Modules 4–6. An interviewer’s question establishes the demand; the guest’s reply may describe an original motive, an actual benefit and a later recommendation. These are different information roles.",
  "sections": [
    {
      "title": "Track the question and the time reference",
      "paragraphs": [
        "‘Why did you start?’ asks for an initial reason. ‘What matters most now?’ asks for a current evaluation. ‘What would you change next time?’ asks for a future revision based on experience. A detail that correctly answers one can be a distractor for another.",
        "Consider ‘I joined to find paid work. That has not happened yet, but I have become more confident speaking to strangers.’ Paid employment was the aim; confidence is the achieved gain. The word yet also leaves the career aim open. A summary saying the speaker has abandoned the career invents a decision."
      ]
    },
    {
      "title": "Organise a distinct interview before the live audio",
      "paragraphs": [
        "Written comprehension demonstration: “I began recording local history because I wanted material for a school project. That project is finished, but now I value hearing how neighbours remember the same street differently. I first expected to collect dates; instead, disagreements taught me to ask whose account I was hearing. I would train volunteers in consent and careful note-taking before expanding.”",
        "Completed note: initial purpose → school project. Partly completed notes: current value → ___; expectation → ___; actual learning → ___; future change → ___. The role labels prevent a true detail from answering the wrong question. This written demonstration teaches the process; it is not independent listening evidence."
      ],
      "check": {
        "prompt": "Complete the role notes. Does a finished school project mean the speaker stopped recording?",
        "answer": "Current value: different memories; expectation: dates; learning: attribute accounts to their owners; future change: volunteer preparation. The speaker gives a new ongoing value, so completion of the original project does not establish abandonment."
      }
    },
    {
      "title": "Review longer audio without overloading memory",
      "paragraphs": [
        "B2 Part 4 uses a longer interview or discussion. These original recordings are shorter learning sets. Preview each question’s target, use brief notes and return to the next demand after a missed detail. During review, replay the relevant turn and locate the clause carrying the final judgement.",
        "Separate attribution errors from inference errors. A host can suggest a view that the guest rejects; the question may ask for the guest’s opinion. A real example of one problem does not establish that every similar project fails. After feedback, explain how the question, evidence and selected option connect, then test the same distinction in the new project account."
      ],
      "check": {
        "prompt": "“The archive is small, but collecting a few accounts carefully matters more to me than expanding quickly.” Is rapid expansion the priority?",
        "answer": "No. Matters more ranks careful collection above speed. The small size is a limitation or background fact, not evidence that the speaker prioritises expansion."
      }
    },
    {
      "title": "Remove the labels and listen to fresh accounts",
      "paragraphs": [
        "For the theatre recording, make an empty aim / achieved gain note. For the beekeeper interview, choose your own brief role labels from the questions rather than the written demonstration. The boat-restoration assessment changes the activity and demand again.",
        "After an error, replay the relevant turn and identify the information role before reading the transcript. Once the meaning is clear, replay without text to check recognition. After another listening module, explain a new speaker’s initial motive and current judgement without copying full sentences."
      ]
    }
  ],
  "application": "The guided theatre interview distinguishes a hoped-for job from a gain already achieved. The independent beekeeper account develops motives, present interests and qualified advice. The boat-restoration assessment asks about an unexpected demand and a future change. Keep those roles separate in your notes."
},
"band1-review": {
  "mode": "replace",
  "outcomes": [
    "Diagnose a recurring problem from actual task evidence.",
    "Make a correction and choose a fresh transfer task.",
    "Separate checked accuracy, self-review and externally assessed skill."
  ],
  "prerequisite": "Keep access to a completed language task, a reading or listening response and a writing or speaking sample. Review is a process of testing an explanation for an error, not merely repeating a familiar item until its answer is remembered.",
  "sections": [
    {
      "title": "Build a diagnosis from a specific response",
      "paragraphs": [
        "Weak reflection: ‘My listening is bad.’ Useful reflection: ‘I selected the speaker’s original transport plan even though but introduced a new booking.’ The useful version identifies the task, the mistaken interpretation and the evidence that changes it. It suggests a targeted action: practise distinguishing initial plans from confirmed arrangements in unfamiliar extracts.",
        "A language error needs a different explanation. ‘I wrote have went because I used the simple-past form after have’ identifies an auxiliary-chain problem. Correction is have gone, followed by new sentences with irregular participles. Repeating transport extracts would not address that error."
      ]
    },
    {
      "title": "Complete an evidence record before writing a reflection",
      "paragraphs": [
        "Completed record: original “has went” / intended recent result / correction “has gone” / reason have/has requires the participle / fresh check “She has written two replies”. The final check changes the verb, so recalling gone is insufficient.",
        "Partial record: original “I chose the first proposal” / evidence “but we finally agreed on a different arrangement” / correction ___ / cause ___ / new source to test ___. Complete the reasoning without inventing a numerical score for your ability."
      ],
      "check": {
        "prompt": "Complete the partial record. Why is “listen harder” insufficient as the next action?",
        "answer": "Correct the choice to the final arrangement; the cause is confusing a superseded proposal with agreement. Choose a fresh recording with an initial and revised plan. “Listen harder” does not identify which distinction needs testing."
      }
    },
    {
      "title": "Use a three-step improvement cycle",
      "paragraphs": [
        "First preserve the original response and identify one priority. Next revise it with a reason: change the interpretation or form, not just the final answer. Finally choose a fresh task testing the same feature. A correct answer on the original source may demonstrate memory; success on a new source gives better evidence of transfer.",
        "Worked record: task—interview gain question; original answer—paid work; evidence—‘that has not happened yet’ followed by confidence; correction—confidence is the current gain; next action—new interview with initial motive and achieved outcome. Review success means explaining both roles in the fresh account. This is more informative than a general promise to listen harder."
      ]
    },
    {
      "title": "Retrieve a construction before the mixed checkpoint",
      "paragraphs": [
        "Recall such/so from Module 1. “The explanation was so clear that we needed no help” can become “It was such a clear explanation that we needed no help.” So modifies clear; such introduces the noun phrase. Complete “The route was so long that we stopped twice” → “It was ___ that we stopped twice.” Include SUCH."
      ],
      "check": {
        "prompt": "Complete the transformation and name what must stay unchanged.",
        "answer": "Such a long route. Preserve the route, its degree and the consequence of stopping twice. The noun phrase needs a; omitting route would break the construction."
      }
    },
    {
      "title": "Review the skills with suitable evidence",
      "paragraphs": [
        "Checked language and reading responses provide local correct/incorrect evidence. Writing needs an actual draft reviewed for coverage, organisation and language. Speaking needs actual speech for intelligibility and fluency, and a partner for live interaction. A strong written speaking plan cannot demonstrate pronunciation. A full word count cannot demonstrate that an essay answered its question.",
        "Use a small portfolio: one revised essay, one fresh reading explanation, one audio response and one recorded answer where recording is available. Mark missing evidence as unassessed. A teacher or qualified reviewer can identify issues that self-review misses, particularly unclear sounds or a persistent misunderstanding of the task. Do not turn XP or a short quiz percentage into a CEFR or Cambridge result."
      ],
      "check": {
        "prompt": "A learner gets every repeated cloze item right but cannot explain a new tense choice. What should the review conclude?",
        "answer": "The familiar set is completed, but transfer is not established. Ask the learner to explain a fresh timeline and choose its verb form before claiming the weakness has been resolved."
      }
    },
    {
      "title": "Return to a fresh check after a delay",
      "paragraphs": [
        "Choose one priority from your own response and schedule the next review in your existing study routine after another module. Keep the original, revision, reason and fresh-check result together in personal notes. If the new task still fails, revise the diagnosis rather than claiming that repetition has resolved it.",
        "Speaking review needs actual speech and, for interaction, a partner. Written notes alone leave those aspects unassessed. The completed activity cycle and XP show participation in the local work, not an official language level."
      ]
    }
  ],
  "application": "The guided mixed language checkpoint tests forms from earlier modules. The independent reflection must use a concrete previous error and its evidence. The speaking assessment asks why feedback helps and where self-review is limited. Connect each claim to a response you actually produced, then choose a fresh follow-up."
},

};
