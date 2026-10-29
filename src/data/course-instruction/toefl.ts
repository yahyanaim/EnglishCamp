import { chapter as c, section as s } from "./authoring";
import type { InstructionChapter } from "./types";
export const toeflInstruction: Record<string, InstructionChapter> = {
"band3-listening-section3": {
  "mode": "extend",
  "outcomes": [
    "Infer an utterance’s communicative purpose.",
    "Choose a reply that supplies the relevant information or action."
  ],
  "prerequisite": "Question form and social purpose can differ. ‘Could you open the window?’ normally requests an action, rather than an account of your physical ability. Use context and the missing information to interpret it.",
  "sections": [
    {
      "title": "Listen for the information gap",
      "paragraphs": [
        "Where asks for a location, when for time and why for a reason, but an indirect request can put those words inside a courteous frame. ‘Do you know where the forms are?’ still needs a location. ‘Yes, I know’ may be literally relevant to knowledge but fails to supply the information the speaker seeks.",
        "An offer invites acceptance or refusal: ‘Would you like a hand with those boxes?’ A relevant response might accept help and identify what to carry. An apology may need acknowledgement rather than a new information request. Shared words do not decide the response; the conversational action does."
      ]
    },
    {
      "title": "Complete the conversational action before choosing a reply",
      "paragraphs": [
        "New written rehearsal: “Do you know when the last ferry leaves?” Completed action → request for departure information. A useful answer supplies a time; “Yes, I know” leaves the information gap open. Now analyse “Would you like me to carry the folder?” Action → ___; relevant response type → ___.",
        "An offer can be accepted or declined. A confirmation question can receive yes or no if the responder knows the facts. A question alone cannot establish that a change happened; distinguish a contextually possible reply from one that explicitly confirms a change."
      ],
      "check": {
        "prompt": "Complete the offer record and give an acceptance and a refusal.",
        "answer": "An offer of help; acceptance or refusal. “Thanks, please take it to the desk” accepts; “No, thank you, I can manage” declines. Both can be appropriate. When a question specifically asks for confirmation of a changed date, choose a confirming reply; do not assume a negative or uncertain reply is inappropriate in every conversation."
      }
    },
    {
      "title": "Remove the action labels for fresh exchanges",
      "paragraphs": [
        "For the guided recording, identify the missing information before looking at options. For later exchanges, listen to the whole utterance and decide whether it requests information, help, confirmation or consideration of a suggestion. Do not force every item into “final decision”.",
        "After feedback, explain the closest distractor’s conversational mismatch: wrong information, unperformed action or unsupported certainty. Revisit one distinction on a new spoken question later. A transcript can clarify the speech act; recognition still needs the audio."
      ]
    },
    {
      "title": "Work through indirectness and context",
      "paragraphs": [
        "Source: ‘I cannot find the room-change notice. Could you check the board for me?’ The speaker reports a problem and requests help. ‘Of course; I will look now’ fits. ‘The board is made of wood’ answers no useful part of that request. ‘I checked my email yesterday’ shares a checking verb but changes the action and time.",
        "Negative forms need care. ‘Isn't the office closed today?’ can seek confirmation of an expectation. A reply such as ‘It is open until noon’ corrects that expectation. Do not assume every negative question requires a negative reply; interpret the facts and communicative purpose together."
      ],
      "check": {
        "prompt": "‘Would you mind sending the schedule?’ Why is ‘Not at all—I will email it’ a relevant response?",
        "answer": "Would you mind frames a request. Not at all signals that the action is not an inconvenience, and the following clause accepts it. It does not mean the person refuses to send anything."
      }
    }
  ],
  "application": "The guided exchange isolates purpose. The independent exchanges and fresh assessment change the information gap and social action. Use the playable audio for comprehension, then inspect the transcript to distinguish missed sounds from a misread request."
},
"band3-listening-lecture": {
  "mode": "extend",
  "outcomes": [
    "Distinguish a definition, mechanism, example and qualification in a talk.",
    "Preserve a lecturer’s level of certainty in notes."
  ],
  "prerequisite": "An example is a particular case; a mechanism explains how an outcome occurs. A definition explains a term. The same topic word can appear at each level, so note the relationship rather than copying it repeatedly.",
  "sections": [
    {
      "title": "Build notes at different levels",
      "paragraphs": [
        "In a talk about colour and protection, concealment is one mechanism and a leaf insect is an example. A conspicuous pattern can instead function as a warning. The shared protective outcome does not make the mechanisms the same. Useful notes group example under mechanism: blending → harder to detect → leaf insect; warning → possible deterrence → conspicuous pattern.",
        "A definition such as ‘Conspicuous means easy to notice’ helps interpret later claims. Do not reverse it to camouflaged merely because both occur in a protection talk. A word’s local explanation is more reliable than a guessed meaning based on the broad topic."
      ]
    },
    {
      "title": "Complete a two-level note map",
      "paragraphs": [
        "New written demonstration: “Some seeds have wings that slow their fall. A maple seed illustrates this. Slower falling gives wind more time to carry it, but the distance depends on wind conditions.” Completed mechanism → slowed fall. Finish example → ___; possible effect → ___; condition → ___. The example names a case; it is not itself an explanation of every dispersal pattern."
      ],
      "check": {
        "prompt": "Complete the map and repair “Winged seeds always reach distant places.”",
        "answer": "Maple seed / wind has more time to carry it / wind conditions. Repair: wings can support wind dispersal, but the distance varies with conditions. Always and distant add certainty and outcome beyond the explanation."
      }
    },
    {
      "title": "Explain why the example was included",
      "paragraphs": [
        "Partly built purpose answer: “The maple seed is included to illustrate ___, not to prove ___.” Finish the relationship, then try a new purpose question without the frame. A noun repeated in the question is not enough evidence for purpose.",
        "In the actual talks, create a new mechanism/example/limit map from each recording. After an error, replay the clause carrying the relationship, then listen again without text. After another module, retrieve the difference between a term’s definition and an example of it."
      ]
    },
    {
      "title": "Retain what the lecturer qualifies",
      "paragraphs": [
        "‘Colour can warn predators’ reports a possible function. ‘Colour always prevents attacks’ makes a universal claim. The difference concerns meaning, not stylistic variety. A final limitation—behaviour and habitat also matter—often explains why one feature cannot classify every case.",
        "When a question asks why an example was mentioned, answer its explanatory role. ‘To illustrate concealment’ is a purpose; ‘Because the talk concerns insects’ is only the topic. During review, connect each answer to the note level it requires and test the same distinction on the fresh recording."
      ],
      "check": {
        "prompt": "Does two strategies having the same outcome mean they work in the same way?",
        "answer": "No. Blending and warning can both reduce attacks while using different mechanisms. The lecturer’s comparison depends on preserving that distinction."
      }
    }
  ],
  "application": "The three academic talks use fresh subject matter. Keep claim, mechanism, example and limit separate in each recording rather than memorising the insect notes. The visible teaching script supports analysis; the activity’s actual audio supplies listening evidence."
},
"band3-listening-multiple-speakers": {
  "mode": "extend",
  "outcomes": [
    "Track rejected, proposed and accepted arrangements.",
    "Infer a next action without treating an intention as completed."
  ],
  "prerequisite": "A constraint is a requirement an option must satisfy, such as a fixed day or quiet space. A proposal can be possible yet unsuitable because it fails one constraint. Keep each speaker’s requirements identifiable.",
  "sections": [
    {
      "title": "Give each option a status",
      "paragraphs": [
        "If a guest is free only on Wednesday, a room available on Thursday fails even if it is otherwise ideal. An alternative booth may solve the date and noise problem while creating a new equipment requirement. Notes should distinguish original plan / rejected alternative / proposed solution / remaining action.",
        "Short responses signal stance: ‘That should work’ cautiously accepts; ‘I am not sure that solves it’ questions adequacy; ‘If we can borrow a recorder’ adds a condition. These phrases do not repeat the complete arrangement, so their interpretation depends on the previous turn."
      ]
    },
    {
      "title": "Finish a constraint comparison before inferring a decision",
      "paragraphs": [
        "Written rehearsal: A rehearsal must happen on Monday and needs a keyboard. Room A is free Monday but has no instrument. Room B has a keyboard but is free Tuesday. Room C is free Monday if the group collects a portable keyboard. Completed row for A: day yes / equipment no. Complete B and C before naming a workable conditional option."
      ],
      "check": {
        "prompt": "Which option could work, and what remains to be arranged?",
        "answer": "C could work if the portable keyboard is collected. B fails the fixed day; A fails the equipment requirement. Could work is not a completed booking or collection."
      }
    },
    {
      "title": "Repair an inference one turn at a time",
      "paragraphs": [
        "“Who should I contact to reserve Room C?” supports an intention to arrange it, not a reservation already made. Partly complete “The speaker still needs to ___ because ___.” Then compare with “I received confirmation this morning” and explain the change in status.",
        "For the fresh live conversations, use empty option / constraint / status notes first, then reduce them to your own short cues. After checking, name the exact failed requirement or status change. Later, retrieve the difference between asking permission and receiving confirmation on a new exchange."
      ]
    },
    {
      "title": "Infer only the step supported",
      "paragraphs": [
        "‘How do I reserve the booth?’ suggests an intention to arrange it, not an existing reservation. ‘I have reserved it’ establishes a completed action. ‘Could I reserve it?’ requests permission or availability. The verb form and conversational stage determine which conclusion is safe.",
        "A useful review asks whether a wrong option changed the date, ignored a condition or moved an action from future to completed. After understanding the transcript, replay the short turn carrying that status. This targets the actual error rather than vaguely trying to understand more of the conversation."
      ],
      "check": {
        "prompt": "A booth has sound insulation but requires a borrowed recorder. Can you infer that recording equipment is built in?",
        "answer": "No. Sound insulation concerns the acoustic environment. The separate borrowing instruction shows that recording equipment still needs arranging."
      }
    }
  ],
  "application": "Use the guided campus exchange, independent conversation and transfer conversation to trace constraints and action status. The lesson teaches a relationship; each recording changes its facts, so retain the audio evidence for the new arrangement."
},
"band3-reading-summary-completion": {
  "mode": "extend",
  "outcomes": [
    "Restore a partial word using syntax, meaning and spelling.",
    "Explain why a related word-family form fails in context."
  ],
  "prerequisite": "A noun phrase needs a noun head; an adjective can modify it; a finite verb anchors a clause. Official Complete the Words restores missing letters in partial words. The three-stage activity asks you to type the complete restored word, as each question states. Optional short drills keep their own explicit input rules: when a drill asks for missing letters only, enter only the ending. Underscores indicate an omitted segment, not an exact letter count.",
  "sections": [
    {
      "title": "Identify the role before spelling the word",
      "paragraphs": [
        "New teaching source: “The team kept caref___ notes and recorded each change accurate___. Its final descript___ distinguished observations from guesses.” First label the roles without completing letters: a description of notes / a modifier of recorded / a noun after final. Grammar narrows the candidate forms before the visible stem is used.",
        "Completed first restoration: careful, an adjective describing notes. Now restore the second word by choosing the adverb form of accurate, then decide which noun form of describe fits the final gap."
      ],
      "check": {
        "prompt": "Restore accurate___ and descript___ as full words, explaining each role.",
        "answer": "Accurately / description. Recorded is already the action verb, so accurately describes how it was done. Its final description needs a noun head; descriptive would need another noun to modify."
      }
    },
    {
      "title": "Keep the local input instruction separate from the official family",
      "paragraphs": [
        "For a three-stage prompt “Restore the complete word: caref___”, enter careful. Do not enter only ul. An optional drill explicitly asking for missing letters after caref would instead require ul; read the particular input instruction. The activity deliberately reviews a whole-word response in one box; it does not reproduce the official missing-letter interface or adaptive sequencing.",
        "Partly complete the decision record for “Several observ___ were compared”: role → ___; number cue → ___; full word → ___. Read the sentence back before checking spelling. A plural noun elsewhere does not automatically make every word plural."
      ],
      "check": {
        "prompt": "Complete the record and explain why an adjective would fail.",
        "answer": "Noun head of the subject / several and plural were / observations. Observational is an adjective needing a noun, so it cannot complete this subject by itself."
      }
    },
    {
      "title": "Reduce the hints and retrieve the correction",
      "paragraphs": [
        "Now restore “The team repeated the proced___ to check whether the result was reli___.” No role labels are supplied. Explain the job of each word, then compare procedure and reliable. Keep lexical meaning and spelling separate from input format.",
        "In the three-stage garden, library and coastal-plant sources, type the complete word requested by each question. After a wrong answer, label role, meaning or spelling and make a new sentence using the corrected form. Return after another module and reconstruct that form without the visible stem."
      ]
    }
  ],
  "application": "Use the full passage to decide role and meaning. In the three-stage activity, type each complete restored word. In optional short drills, follow the stated whole-word or missing-letters-only instruction. The official task-family name is retained, but the three-stage whole-word adaptation is not ETS delivery or scoring."
},
"band3-reading-flowchart": {
  "mode": "extend",
  "outcomes": [
    "Recover an academic paragraph’s observation, explanation and recommendation.",
    "Use local definitions and reference to interpret unfamiliar vocabulary."
  ],
  "prerequisite": "An observation reports what was found. An explanation proposes why; a recommendation states what to do next. An academic writer may keep these separate to avoid claiming more certainty than the study supplies.",
  "sections": [
    {
      "title": "Unpack a dense sentence",
      "paragraphs": [
        "In ‘Rooftop readings varied more during strong winds’, the subject is readings, the result is greater variation and the condition is strong winds. More variation does not mean a consistently higher total. In ‘The researchers suggest that turbulence can alter water entering a sensor’, suggest and can qualify the mechanism.",
        "Treat a technical term through its explanation. If turbulence is described as disturbed air movement around buildings, test that meaning in the sentence. You do not need an external meteorology guide to understand its stated role in this passage."
      ]
    },
    {
      "title": "Unpack one clause, then finish a second",
      "paragraphs": [
        "New source: “At two forest sites, young trees grew faster beside the path, although the study did not separate the effects of light and soil moisture.” Completed observation → faster growth beside the path; scope → two sites. Finish unresolved explanation → ___; unsupported claim → ___.",
        "Near-summary A: “Paths always cause rapid growth.” Near-summary B: “Growth differed at two sites, but the cause remains uncertain.” B preserves observation and limits. A widens scope and claims a cause that was not isolated."
      ],
      "check": {
        "prompt": "Finish the unresolved explanation and name a missing comparison that would be relevant.",
        "answer": "The separate roles of light and moisture remain unresolved. Measuring or comparing those conditions could help; the current source supplies no controlled separation. A new recommendation must respond to that uncertainty rather than invent a universal finding."
      }
    },
    {
      "title": "Withdraw the observation labels",
      "paragraphs": [
        "Write a two-sentence account of the forest source without observation/explanation headings. Retain one measured difference and one limit. Then use the live academic passages’ own structure rather than force all of them into the same research template.",
        "After feedback, trace a reference expression and define one unfamiliar term from its local explanation. Return later to an unfamiliar paragraph and reject the closest strengthened summary in your own words."
      ]
    },
    {
      "title": "Read the conclusion as a response to the limitation",
      "paragraphs": [
        "A recommendation to record surroundings preserves the method’s usefulness while accounting for conditions. It is not equivalent to rejecting rooftop data. A purpose question about strong winds asks how that detail supports the explanation; a main-idea question asks how the whole argument connects observation and practical response.",
        "Check references such as these readings and local conditions. They connect clauses without repeating every noun. A paraphrase that changes sensor surroundings into national climate changes the scale and loses the actual recommendation. Trace each major noun phrase to the source before accepting it."
      ],
      "check": {
        "prompt": "Can ‘varied more’ be paraphrased as ‘recorded more rain every time’?",
        "answer": "No. Variation concerns inconsistency or spread; a consistently higher amount is a different measurement. The passage does not establish that direction for every reading."
      }
    }
  ],
  "application": "The existing guided, independent and fresh academic passages require source-bound detail and summary. Organise each as observation → possible explanation → qualified response, while preserving whatever structure the new source actually uses."
},
"band3-writing-multiple-charts": {
  "mode": "extend",
  "outcomes": [
    "Add an original mechanism or application to a discussion.",
    "Develop a clear position without recapping the thread."
  ],
  "prerequisite": "A discussion contribution answers a professor’s question in relation to existing posts. A position is your judgement; a mechanism explains how the proposed result could happen. Current TOEFL Academic Discussion uses ten minutes; the learning target of a developed response should not become padding.",
  "sections": [
    {
      "title": "Find what your post adds",
      "paragraphs": [
        "A peer may say electives reveal interests. You can add a condition, such as manageable prerequisites, and a concrete application, such as statistics helping a biology student interpret results. ‘I agree that electives are good’ merely repeats the judgement. ‘An accessible statistics elective could help biology students evaluate later experiments’ contributes a mechanism linking fields.",
        "Meaningful engagement does not require naming both students. Use a peer reference when it connects to your reasoning: ‘Mina’s exploration point is persuasive, but advisers should check workload.’ The rest of the sentence explains what you add rather than treating a name as a scoring token."
      ]
    },
    {
      "title": "Construct a short extension before a full post",
      "paragraphs": [
        "New teaching thread: a professor asks whether a campus café should offer pre-ordering. A peer says it could shorten queues. First respond with a position: “I would offer pre-ordering for a limited menu.” Explain a mechanism: staff can prepare repeated orders before the busiest period. Add a limit: walk-in customers still need a usable route.",
        "Partly completed contribution: “The queue argument is persuasive because ___. For example, ___. However, ___.” Complete a mechanism and example that add something to the peer’s claim. Then remove the frame and write a short extension with your own practical condition."
      ],
      "check": {
        "prompt": "What is missing from “I agree because shorter queues are good”?",
        "answer": "It repeats the evaluation. Explain how the proposed arrangement changes waiting and name a condition or consequence, such as separate collection and walk-in service. A peer’s name alone does not create development."
      }
    },
    {
      "title": "Diagnose a weak contribution and transfer",
      "paragraphs": [
        "Weak post: “Both students are correct. I completely agree. There are many advantages.” It neither identifies a recommendation nor develops a new idea. Keep one point of agreement and add a causal explanation plus a concrete application before increasing length.",
        "The guided practice now extends a short academic thread; the independent community-project and final mentoring/advice threads require new content. After review, underline what your contribution adds. On a later day, build a new post from position, mechanism and example without reading the model."
      ]
    }
  ],
  "application": "Use the short guided discussion to add reasoning to a peer’s idea. The independent and assessment threads require fresh recommendations and examples. Ten-minute practice and word targets do not produce a predicted TOEFL score."
},
"band3-writing-discussion": {
  "mode": "extend",
  "outcomes": [
    "Construct a complete clause from subject, finite verb and complements.",
    "Choose word-family forms and agreement inside that structure."
  ],
  "prerequisite": "A finite verb anchors the clause: reduces, included, can change. An object receives an action, while a complement can describe the subject after a linking verb. The words before and after a gap help identify the required role.",
  "sections": [
    {
      "title": "Build the clause skeleton first",
      "paragraphs": [
        "‘The revised procedure reduces delays’ has subject the revised procedure, finite verb reduces and object delays. Revised is a modifier inside the subject phrase; it does not replace the main verb. In ‘Additional evidence becomes available’, becomes links evidence to the adjective available rather than taking a direct object.",
        "After a modal, use a base verb: ‘The procedure can reduce delays.’ After an article and adjective, find the noun head: ‘a clear description’. Describe is a verb and descriptive an adjective, so neither completes that noun phrase alone."
      ]
    },
    {
      "title": "Mark the skeleton before filling a word form",
      "paragraphs": [
        "New rehearsal: “The updated timetable includes a short break.” Mark subject → the updated timetable; finite verb → includes; object → a short break. Updated modifies timetable and does not carry the main assertion. Now mark the same roles in “The assistants can provide a detailed explanation.”",
        "Partly build “Each notice ___ a clear ___ (INCLUDE / EXPLAIN).” First select a finite verb agreeing with each notice; then build the noun phrase after a clear. Do not solve both decisions by choosing the most familiar family form."
      ],
      "check": {
        "prompt": "Complete the sentence and explain why explanatory cannot stand at the end.",
        "answer": "Includes / explanation. Singular each notice takes includes; a clear needs a noun head. Explanatory is an adjective and would require another noun, as in an explanatory note."
      }
    },
    {
      "title": "Repair the auxiliary without rewriting the whole message",
      "paragraphs": [
        "Draft: “The notices can includes details.” Keep the subject, modal and object; replace only the lexical verb. Then construct a fresh sentence with an embedded why-clause, locating its own subject and finite verb.",
        "For the live token tasks, use every supplied piece and respect the fixed boundaries and punctuation conditions. Later, reconstruct a new clause from your own notes without tokens to test production beyond the exact-order adaptation."
      ]
    },
    {
      "title": "Connect clauses without losing the main frame",
      "paragraphs": [
        "‘The assistant explained why the procedure had changed’ contains a main clause and an embedded explanation. Inside why, use statement order: the procedure had changed. ‘Why had the procedure changed?’ is a direct question and has a different frame.",
        "When building from supplied tokens, locate the finite verb for each clause, then place its subject and complements. Read the result as a response to the situation. A grammatical rearrangement that changes who acted or turns a question into a statement may fail the intended communication."
      ],
      "check": {
        "prompt": "Why is ‘Each record includes a clear description’ grammatical while ‘Each record include a clear describe’ is not?",
        "answer": "Each record is singular, so the present verb is includes. The phrase a clear needs a noun head, description, rather than the verb describe."
      }
    }
  ],
  "application": "The sentence-building stages test agreement and embedded clauses with fresh tokens. Construct the clause frames first, then verify every supplied word and its role. The existing reorder adaptation uses an intended exact sequence; it is not a full replica of ETS fixed slots."
},
"band3-writing-advantages": {
  "mode": "extend",
  "outcomes": [
    "Use do-support in a direct question.",
    "Retain statement order inside an embedded question."
  ],
  "prerequisite": "A direct question can invert an auxiliary and subject. When a present-simple statement has no other auxiliary, do or does supplies that frame. An embedded question is a clause inside a larger request or statement.",
  "sections": [
    {
      "title": "Place the tense marking once",
      "paragraphs": [
        "Statement: ‘The course begins at nine.’ Direct question: ‘When does the course begin?’ Does carries present tense and singular marking, so begin stays base. ‘When does the course begins?’ marks the same grammatical job twice. With be, invert be directly: ‘Where is the office?’ With a modal: ‘When can students register?’",
        "A subject question is different: ‘Who teaches the course?’ already asks for the subject and does not normally add do. Identify what information is missing before rearranging pieces; not every question uses the same order."
      ]
    },
    {
      "title": "Build one question frame at a time",
      "paragraphs": [
        "Statement: “The shop closes at six.” The missing information is the time, so move to “When does the shop close?” Does carries singular present marking. Complete the parallel question from “The buses leave at six”: “When ___ the buses ___?” Then ask a location question about “The key is upstairs” using be rather than do."
      ],
      "check": {
        "prompt": "Complete both questions and explain why who questions can be different.",
        "answer": "Do / leave; “Where is the key?” A subject question such as “Who owns the key?” asks for the subject and normally does not use the same do-support frame. Diagnose the missing information before rearranging."
      }
    },
    {
      "title": "Convert a direct question with part of the request supplied",
      "paragraphs": [
        "Direct: “Why is the gate locked?” Target: “Could you explain why ___?” Complete only the embedded clause, then compare with the direct order. The outer request already supplies the question frame."
      ],
      "check": {
        "prompt": "Complete the request, then convert a fresh question without the frame.",
        "answer": "“Could you explain why the gate is locked?” Subject the gate precedes is inside the embedded clause. For the fresh conversion, check both the outer request and the inner proposition separately. After another module, retrieve the difference without copying the shop or gate wording."
      }
    },
    {
      "title": "Build an embedded request",
      "paragraphs": [
        "‘Could you explain when the course begins?’ has a courteous main question plus the embedded clause when the course begins. Inside it, subject precedes verb. Compare the direct ‘When does the course begin?’ The meaning stays about time, but the clause’s grammatical role changes.",
        "Worked repair: ‘Could you tell me why do these results differ?’ → ‘Could you tell me why these results differ?’ Remove the embedded do-support rather than changing the main request. Then check the whole response for the requested time, reason or method, and use each supplied token according to the task."
      ],
      "check": {
        "prompt": "Turn ‘Where are the forms?’ into a request beginning ‘Could you tell me...?’",
        "answer": "Could you tell me where the forms are? The embedded clause uses the forms are, while the main clause already carries the question frame."
      }
    }
  ],
  "application": "Use direct-versus-embedded analysis in all three sentence stages. The new assessment changes the words and situation, so identify each clause before applying a memorised order."
},
"band3-writing-task-response": {
  "mode": "extend",
  "outcomes": [
    "Make every required email action usable by its recipient.",
    "Construct clear, courteous alternatives without inventing agreement."
  ],
  "prerequisite": "An email request seeks a response; it does not announce a decision already made. A reader needs enough time, place and action detail to understand the problem and decide what to do next.",
  "sections": [
    {
      "title": "Turn coverage into actionability",
      "paragraphs": [
        "For a meeting conflict, ‘I am busy’ mentions a problem but does not help reschedule it. ‘I have a compulsory laboratory session at 10 am on Friday’ identifies the exact conflict. ‘Would Friday after 2 pm or Monday morning be possible?’ gives alternatives. ‘Please let me know whether I should send a project outline’ asks about preparation rather than claiming it was requested.",
        "Connect the detail to the purpose. A long biography of your studies does not explain the unavailable slot. A brief reason is useful when it shows why the conflict cannot simply be ignored. The recipient should be able to reply with a practical decision without asking several basic clarification questions."
      ]
    },
    {
      "title": "Turn a vague request into a usable one",
      "paragraphs": [
        "New notes: registration email contains wrong surname / certificate needs correct name / attach enrolment reference. Weak message: “My details are wrong. Fix them.” Completed first step: “My surname appears as Green in the registration email, but it should be Greene.” Finish consequence → ___; requested action → ___; identifying detail → ___."
      ],
      "check": {
        "prompt": "Complete the three jobs without pretending a correction has already been agreed.",
        "answer": "For example: the certificate needs the correct surname; ask whether the record can be corrected; provide the enrolment reference. “You have corrected it” would claim a completed action rather than make the request."
      }
    },
    {
      "title": "Separate availability from a reply deadline",
      "paragraphs": [
        "Written rehearsal: “I can collect the corrected certificate after three on Monday. Could you confirm by noon on Friday?” Complete collection time → ___; reply deadline → ___. They govern different actions.",
        "For the technician and induction emails, make a short coverage plan and develop each required action into a clear sentence or paragraph. After review, repair one vague pronoun or missing alternative. Later, write a new actionable request without the supplied problem/consequence/action labels."
      ],
      "check": {
        "prompt": "Complete the two times and explain why Friday noon is not automatically the collection time.",
        "answer": "Monday after three / Friday noon. Confirm names the reply action, while collect names the later visit. Attaching a date to the wrong verb changes the practical arrangement."
      }
    },
    {
      "title": "Use a polite frame with precise content",
      "paragraphs": [
        "‘Would it be possible to attend another induction?’ uses a modal frame plus an infinitive. ‘Could you confirm whether another session is available?’ embeds a statement-order clause. Neither needs repeated apologies to be respectful. ‘We will meet at two’ wrongly treats the suggested alternative as agreed.",
        "Write dates and times so they cannot be confused with the deadline for replying. ‘I am available after two on Friday; could you confirm by Thursday?’ separates availability from response time. In the seven-minute email, cover all communication points before revising vocabulary."
      ],
      "check": {
        "prompt": "Why does ‘Please change it’ remain weak even though it is grammatically correct?",
        "answer": "It leaves the event and requested alternative unclear. A more actionable request names the meeting or session and offers a specific time or asks about an identified alternative."
      }
    }
  ],
  "application": "The guided plan identifies required actions; the independent technician email and fresh volunteer-induction email need developed messages. Keep their audiences and scheduling facts separate. The existing saved editor and timer support rehearsal; self-review does not assign an official TOEFL score."
},
"band3-writing-formality": {
  "mode": "extend",
  "outcomes": [
    "Develop a discussion contribution with a condition and concrete application.",
    "Choose academic register for clarity rather than inflated vocabulary."
  ],
  "prerequisite": "A concession accepts a reasonable concern while maintaining a position. Appropriate register depends on purpose and reader, not the number of rare words. A short discussion still needs developed reasoning.",
  "sections": [
    {
      "title": "Build an extension before reading a whole contribution",
      "paragraphs": [
        "New rehearsal thread: a peer supports allowing students to revise a first draft because feedback identifies weaknesses. First agree or qualify in one complete clause. Then explain a mechanism: revision requires a learner to apply a correction, not simply read it.",
        "Partly built post: “Revision is useful when students ___. For example, ___. To keep the process meaningful, ___.” Complete the explanation, one changed sentence or decision, and a condition. A sentence that merely repeats feedback is useful adds no mechanism."
      ],
      "check": {
        "prompt": "Give one specific condition and diagnose an inflated replacement for help.",
        "answer": "For example: require a short explanation of the change so the learner connects revision to a reason. “This will eradicate all mistakes” overstates the effect. Plain help or improve is suitable when it expresses the limited claim accurately."
      }
    },
    {
      "title": "Add a complete line of reasoning",
      "paragraphs": [
        "Original full contribution to the reflection thread:",
        "I would include an individual reflection, but ask students to describe one decision they changed during the project. Rosa’s point about learning is convincing because this makes students explain their thinking rather than list completed jobs. For example, a group might replace a broad survey with focused interviews after discovering that its first questions were unclear. Explaining that change would reveal what the student learned about research design. Dilan is right that students may write what the teacher expects, so the reflection could refer to a draft or meeting note. It would still be imperfect evidence, but it would be more useful than a general statement that everyone worked hard.",
        "The post states a position, explains a mechanism, illustrates it and answers a concern with a practical measure. It does not claim the reflection proves every student’s contribution."
      ]
    },
    {
      "title": "Keep register natural and precise",
      "paragraphs": [
        "‘This could help students explain their decisions’ is suitable academic language. Replacing it with ‘This pedagogical paradigm will eradicate all opacity’ makes the claim less natural and much stronger. Formality does not require avoiding help, people or problem whenever they are the clearest words.",
        "A reference to a classmate should do reasoning work. ‘Rosa is right’ alone supplies agreement; the because-clause explains its relevance. A useful concession can lead to a design condition instead of a contradiction. Review whether the final judgement remains identifiable after acknowledging a cost."
      ],
      "check": {
        "prompt": "Does mentioning both classmates automatically produce a meaningful contribution?",
        "answer": "No. The post needs to add reasoning, an example, a consequence or a condition. Names can locate the connection, but they do not create development by themselves."
      }
    },
    {
      "title": "Repair the contribution rather than count names",
      "paragraphs": [
        "Weak post: “I agree with both classmates. Their ideas are excellent. Reflection is an important concept.” State your position, explain what reflection would reveal and give one concrete decision it could document. A peer reference should connect to that reasoning.",
        "The live library-access and lecture/workshop threads need new applications. After feedback, underline a mechanism and one useful qualification in your own post. Revisit after another module with a different thread and no paragraph frame."
      ]
    }
  ],
  "application": "Apply the same reasoning standard to library hours versus digital access and the fresh lecture-versus-workshop discussion. Use different examples and practical conditions for those questions rather than copying the reflection model."
},
"band3-speaking-part3": {
  "mode": "extend",
  "outcomes": [
    "Retain grammatical words while repeating a heard sentence.",
    "Distinguish an accurate repetition from a meaning-only paraphrase."
  ],
  "prerequisite": "Recognise the subject, verb and main location or object in a simple sentence. In Listen and Repeat the response reproduces the heard wording; summarising or giving an opinion is a different task.",
  "sections": [
    {
      "title": "Use meaning to support exact retention",
      "paragraphs": [
        "‘The guide will meet visitors near the information desk’ can be retained as subject → action → people → location. This organisation reduces the burden of remembering an unstructured sound sequence. However, reconstructing the idea as ‘A guide meets people by a desk’ changes articles, tense and nouns. Similar meaning is not accurate repetition.",
        "Small words and endings carry information: the identifies a particular guide; will marks the future arrangement; visitors is plural; near locates rather than places something on the desk. Attend to these elements after grasping the main message. Do not deliberately omit them to speak faster."
      ]
    },
    {
      "title": "Increase retention load without changing the job",
      "paragraphs": [
        "Written or partner-read rehearsal uses new wording: “The gate opens.” Then “The side gate opens at noon.” Then “The side gate opens at noon for visitors with tickets.” First hear a short version from a partner if available, repeat it, and compare every word. Add the next phrase only when the earlier wording is retained.",
        "Meaning cues may help: subject / action / time / eligible group. They do not permit substitutions. “A gate is open later” loses the original article, event and time. Written rehearsal practises wording and articulation; unfamiliar audio adds perception and auditory retention."
      ],
      "check": {
        "prompt": "What changes if with tickets is omitted from the longer sentence?",
        "answer": "The eligibility restriction disappears, broadening the message to visitors without tickets. Review omission separately from whether the remaining words were clearly spoken."
      }
    },
    {
      "title": "Withdraw the written cue for a new sentence",
      "paragraphs": [
        "After a corrected repetition, use a different sentence heard once rather than reciting the same text again. In the live seven-item set, compare omission, substitution and order for each prompt, then listen for intelligibility. Do not add an opinion or reason to an exact repetition.",
        "Return after the next speaking module and check whether the same small word or ending is retained in fresh audio. The local replay and study alternative support learning; they do not recreate the official prompt conditions or score pronunciation automatically."
      ]
    },
    {
      "title": "Review omission and intelligibility separately",
      "paragraphs": [
        "After a recorded response, compare the transcript for missing words, substitutions and changed order. Then listen to the actual recording for whether important words and endings are understandable. A written transcript can show grammatical accuracy but cannot establish how clearly it was spoken.",
        "Use a gradual repair: replay one difficult phrase for learning, repeat it, then attempt a new sentence heard once. Reading the phrase aloud practises articulation; repeating unseen audio also tests perception and retention. Keep those evidence types separate. The local lesson permits replay, unlike the once-heard prompt conditions described for the official task."
      ],
      "check": {
        "prompt": "Why does ‘The library open at eight’ lose accuracy compared with ‘The library opens at eight’?",
        "answer": "The missing -s changes the standard present-tense agreement with singular library. In repetition, preserving that small ending is part of reproducing the actual sentence; its audibility also needs speech review."
      }
    }
  ],
  "application": "The guided two-sentence set introduces the recorder and comparison process. Complete all seven independent prompts before submitting that set. The fresh repetition assessment changes the wording; do not substitute the model’s nouns. Written-study mode remains labelled engagement rather than spoken performance."
},
"band3-speaking-opinions": {
  "mode": "extend",
  "outcomes": [
    "Develop an interview answer with a relevant reason and experience.",
    "Choose grammar that distinguishes routine, past event and future wish."
  ],
  "prerequisite": "An interview question can request more than one action: describe a method and explain why it helps, or state a preference and give an experience. Identify those demands before speaking.",
  "sections": [
    {
      "title": "Start with the requested answer",
      "paragraphs": [
        "For a study routine, ‘I break a large assignment into small tasks’ states the method. ‘It lets me find missing evidence before the final day’ explains its benefit. A presentation example then shows the mechanism in action. An unrelated account of a holiday may be fluent but does not support the answer.",
        "Match time reference to the role. Present simple describes the routine; past simple narrates the example; would like can describe a desired future skill. You can move between these forms within one coherent answer because the information has different time relationships."
      ]
    },
    {
      "title": "Parse the demand and choose one relevant idea",
      "paragraphs": [
        "New interview question: “What do you value about a familiar journey, and why?” Demand one → identify a valued feature; demand two → explain it. Choose between reliable arrival time / favourite historical fact about another city / a specific chance to read. The first and third can fit; the second needs a connection.",
        "Partly built answer: “I value ___ because ___. Last week, ___.” Say one complete clause first, add a reason, then one experience showing that reason. Change tense for the completed example without changing the topic."
      ],
      "check": {
        "prompt": "Repair “I like the journey because it is a journey.”",
        "answer": "For example: “I like the journey because it gives me twenty quiet minutes to read before work.” The reason explains value rather than repeating the noun. Add a real example only if it supports that value."
      }
    },
    {
      "title": "Rehearse a short repair and continue",
      "paragraphs": [
        "If a word is missing, explain it: “the stop where I change to another bus”. Then continue the answer rather than restarting every sentence. If a fact was wrong, make a brief correction and keep the main reason clear.",
        "In the live interview, answer each heard question’s actual demand. After replay, identify direct answer, developed reason and relevant example where requested. Later, answer a fresh question without written frames; text alone does not show spoken intelligibility."
      ]
    },
    {
      "title": "Use a repair without losing the thread",
      "paragraphs": [
        "If you forget a precise word, explain it plainly: ‘the part where we practise before the presentation’ can communicate rehearsal. A brief correction such as ‘the first deadline—actually, the draft deadline’ protects meaning. Repeatedly restarting the whole answer to search for an impressive synonym can make the main point harder to follow.",
        "Listen to a recording for a direct opening, a developed reason and a connected example. Ask a listener to state what method you prefer and why. If the answer is unclear, revise organisation before adding complexity. The local 45-second target is a rehearsal tool, not an automatic judgement of response quality."
      ],
      "check": {
        "prompt": "What is missing from ‘I use a timetable’ when the question asks how you organise study and why it helps?",
        "answer": "The method is named, but its operation and benefit are not developed. Explain how tasks are scheduled and give a concrete consequence, such as finding a missing section before submission."
      }
    }
  ],
  "application": "Listen to each guided, independent and transfer question before responding. Complete all four prompts in the independent interview. Use fresh experiences for the assessment and review actual speech for fluency and intelligibility; text planning is separate evidence."
},
"band3-speaking-toefl4": {
  "mode": "extend",
  "outcomes": [
    "Retain dependent clauses that restrict people, time or access.",
    "Preserve contrast and sequence in longer repetition."
  ],
  "prerequisite": "A main clause expresses the central assertion. A relative clause can identify which people are affected; a time clause states when an action applies. Removing either can alter a practical instruction.",
  "sections": [
    {
      "title": "Find the condition inside the sentence",
      "paragraphs": [
        "‘Visitors who arrive after the tour begins should wait near reception’ contains a main instruction and a clause identifying late arrivals. Repeating only ‘Visitors should wait near reception’ broadens the rule to everyone. Replacing after with before reverses who the instruction concerns.",
        "‘Although the gallery is closed, the upstairs exhibition remains open’ contrasts two facilities. Because would change the relationship to cause. Retain the conjunction as part of the meaning group instead of memorising only gallery, closed and open."
      ]
    },
    {
      "title": "Attach the restriction before lengthening the sentence",
      "paragraphs": [
        "New rehearsal: “Guests must sign in.” Add “who arrive after noon”: “Guests who arrive after noon must sign in.” The relative clause restricts the group. Then add “at the side entrance” and retain every word rather than replacing it with an imagined front desk.",
        "Partly map “Please keep the receipt until the parcel arrives”: action → ___; object → ___; time boundary → ___. Repeat the sentence as heard, not just the three notes."
      ],
      "check": {
        "prompt": "Complete the map and explain what changes if until becomes after.",
        "answer": "Keep / receipt / until parcel arrival. After would reverse the timing instruction: it would no longer clearly require keeping the receipt during the waiting period. A small connector can carry the essential rule."
      }
    },
    {
      "title": "Compare deletion with substitution",
      "paragraphs": [
        "Omitting “who arrive after noon” broadens the sign-in rule. Replacing after with before selects a different group. Both need review even if the main nouns remain. Rehearse the difficult clause, then place it back in the entire sentence.",
        "For the live longer sets, check wording and actual delivery separately. After another module, try a fresh once-heard sentence with a condition. A smoother reading of the old transcript demonstrates rehearsal; it does not establish retention of new audio."
      ]
    },
    {
      "title": "Retain sequence without replacing words",
      "paragraphs": [
        "Break ‘Please return the audio guide before you leave through the eastern exit’ into action → time limit → route. Keep the original wording when repeating. A summary such as ‘Leave the guide near reception’ may sound practical but changes both action and location.",
        "During review, mark whether the first error occurred in perception, memory or delivery. A repeated missing clause may need slower phrase practice before a fresh once-heard attempt. Reading aloud alone cannot show that you retained the clause after listening. Ask a listener whether the ending and key prepositions were clear, not whether you copied a preferred accent."
      ],
      "check": {
        "prompt": "Why does changing remains open to is closed matter even if both facility names are repeated correctly?",
        "answer": "It reverses availability. Accurate nouns cannot compensate for a lost verb or negation that changes the instruction’s central meaning."
      }
    }
  ],
  "application": "Move from the guided phrases to the independent seven-sentence set, preserving each prompt’s complete condition. The transfer assessment uses new restrictions. Compare exact wording and actual intelligibility separately before self-review."
},
"band3-grammar-conditionals": {
  "mode": "extend",
  "outcomes": [
    "Construct direct and embedded questions about arrangements.",
    "Express a real condition without turning it into a guarantee."
  ],
  "prerequisite": "A condition states the circumstance under which another claim applies. A modal such as may can express permission or possibility. Each finite clause needs a subject and verb in the appropriate order.",
  "sections": [
    {
      "title": "Keep question frames separate",
      "paragraphs": [
        "‘When does registration close?’ is a direct question: does carries present tense and close stays base. ‘Please explain when registration closes’ embeds that information question with statement order. ‘Could you explain whether registration remains open?’ asks about an unresolved yes/no condition using whether.",
        "The courteous main question does not require another inversion inside it. ‘Could you tell me whether does registration remain open?’ contains an extra question frame. Identify the outer request and the embedded proposition before rearranging supplied tokens."
      ]
    },
    {
      "title": "Build the condition and consequence separately",
      "paragraphs": [
        "Complete a condition only: “If the road ___ open (REMAIN)…” Use present remains for the future-related real condition. Now add a main clause: “…the bus will use the normal route.” The if-clause does not itself confirm that the road will remain open.",
        "Unless means if not in a suitable context: “The picnic will go ahead unless it rains” corresponds to proceeding if it does not rain. Do not add not again unless the intended meaning genuinely needs it. Complete “We will wait here unless the guide ___ us to move (ASK).”"
      ],
      "check": {
        "prompt": "Complete the guide sentence and identify the exception.",
        "answer": "Asks. The guide asking them to move is the exception to waiting. “Unless the guide does not ask” would make a different and usually unintended condition."
      }
    },
    {
      "title": "Condition, consequence and politeness",
      "paragraphs": [
        "‘If places remain, students may register online’ makes permission conditional on availability. It does not promise available places. ‘If more places became available, I would register’ imagines a less certain situation. The forms express different viewpoints; not every conditional is a fixed prediction.",
        "In an email, ‘If another session is available, could I attend it?’ combines a real condition with a courteous request. Do not write only ‘If another session is available’ as a complete answer when a main request is required. Finish the clause relationship and check the practical meaning."
      ],
      "check": {
        "prompt": "What does ‘You may register if places remain’ leave uncertain?",
        "answer": "Whether places actually remain. It states a condition for permission, not confirmed availability or a completed registration."
      }
    },
    {
      "title": "Use present forms in future time clauses",
      "paragraphs": [
        "“We will leave after the guide arrives” uses present arrives inside the future-time clause. The main clause supplies the future plan. The same pattern commonly follows when, once, until and before in this use: “I will wait until the gate opens.” Do not apply this as a ban on will inside every clause with when: “I do not know when it will open” is an embedded question, not the same time-adverbial structure.",
        "Partly complete “Once the forms ___ (ARRIVE), we will check them” and “Please explain when the forms ___ (ARRIVE)”. In the second, a future reading can use will arrive because the clause asks for the arrival time."
      ],
      "check": {
        "prompt": "Complete both with the intended future meanings and explain the different clause jobs.",
        "answer": "Arrive / will arrive. Once introduces the time condition for checking; explain when embeds a question about future arrival. Clause function matters more than a rule attached to the word when alone."
      }
    },
    {
      "title": "Combine the frames with less help",
      "paragraphs": [
        "Close the labels and write a courteous request containing a real availability condition. Then write a plan with after or once, preserving the time sequence. For the live mixed tokens, identify whether the inner clause is a question, time clause or condition before ordering it.",
        "After the next grammar module, retrieve an unless example and explain its exception in plain English. A correct remembered sentence is only the starting point for a fresh scenario."
      ]
    }
  ],
  "application": "Apply clause-frame analysis to the three sentence-building stages. Use the workshop context to distinguish a request, an availability condition and an actual arrangement. Retain every supplied token according to the reorder task."
},
"band3-grammar-passive": {
  "mode": "extend",
  "outcomes": [
    "Construct passive forms while preserving tense.",
    "Keep agency, eligibility and pronoun reference clear."
  ],
  "prerequisite": "Passive voice uses be plus a past participle. It changes the clause’s focus, not the event’s time by itself. A relative clause can restrict who is allowed to act.",
  "sections": [
    {
      "title": "Build the auxiliary chain",
      "paragraphs": [
        "Active past: ‘Staff inspected the room.’ Passive past: ‘The room was inspected.’ Active future: ‘Staff will inspect the room.’ Passive future: ‘The room will be inspected.’ Present perfect: ‘The room has been inspected.’ The auxiliary chain carries time and aspect; inspected remains the participle.",
        "Choose focus for communication. If responsibility matters, name staff or the relevant person. If equipment readiness matters, the passive can keep equipment first. Passive voice is not automatically more formal or objective; ‘We will send the replacement tomorrow’ may be the clearest useful promise."
      ]
    },
    {
      "title": "Complete one auxiliary chain at a time",
      "paragraphs": [
        "Active: “The team repairs the door.” Passive: “The door is repaired.” For a completed past account, change only the auxiliary to was. For a future arrangement, use will be. Complete “The door ___ ___ repaired already” in a present-perfect account before adding any agent."
      ],
      "check": {
        "prompt": "Complete the chain and decide when by the maintenance team would help.",
        "answer": "Has been. Name the agent if responsibility matters or another team is possible. It can be omitted if readiness is the relevant focus and the actor adds no useful information. Passive is a focus choice, not an automatic formality requirement."
      }
    },
    {
      "title": "Retain eligibility while changing focus",
      "paragraphs": [
        "New instruction: “Only members who completed the safety briefing may use the tool.” Partly rewrite “The tool may be used by ___.” Keep the restricted group rather than broaden it to every member."
      ],
      "check": {
        "prompt": "Complete the passive and name the lost meaning in by members alone.",
        "answer": "“Members who completed the safety briefing.” By members alone removes the safety restriction. In the fresh live sentences, preserve eligibility, time and reference before deciding whether the passive is preferable. Return later with a new instruction and explain what changes if its relative clause is deleted."
      }
    },
    {
      "title": "Keep restrictions and reference intact",
      "paragraphs": [
        "‘Students who completed induction may enter’ restricts permission. Removing who completed induction widens the rule. ‘They must collect a badge’ needs a clear referent for they; if staff and students were both mentioned, repeat the noun when necessary.",
        "Worked repair: ‘The equipment were check before class’ → ‘The equipment was checked before class.’ Equipment is uncountable in this sense and checked is the required participle. The correction does not establish who checked it or whether tomorrow’s check is complete; retain the source’s actual time and agency."
      ],
      "check": {
        "prompt": "Why is ‘The room was inspected tomorrow’ normally inconsistent?",
        "answer": "Was inspected presents a completed past event, while tomorrow locates the event after the present viewpoint. A planned future check could be ‘will be inspected tomorrow’, provided the context supports that plan."
      }
    }
  ],
  "application": "Use the active/passive and reference stages to build complete sentences, not to maximise passive forms. The fresh assessment changes the conditions and actors, so keep eligibility clauses and time reference while reconstructing the response."
},
"band3-vocab-awl3": {
  "mode": "extend",
  "outcomes": [
    "Choose a contextual meaning with the right evidential strength.",
    "Use related nouns, adjectives and verbs in suitable sentence roles."
  ],
  "prerequisite": "A word family shares a lexical base but not a single grammar pattern. Suggest, prove and guarantee also differ in strength; they are not interchangeable ways to avoid repetition.",
  "sections": [
    {
      "title": "Check certainty and scope together",
      "paragraphs": [
        "‘The trial suggests a possible benefit’ offers tentative support. ‘The trial proves a benefit for every learner’ raises certainty and widens scope. Even if proves is familiar academic vocabulary, it is unsuitable when the source keeps the result provisional. ‘Consistent with’ means compatible with an earlier finding, not necessarily caused by it or identical in every respect.",
        "Try a candidate meaning in the original sentence. If persists means continues over time in a retention study, replacing it with begins would change the time relationship. A vocabulary answer must fit the surrounding argument, not just a memorised dictionary association."
      ]
    },
    {
      "title": "Sort claim strength before replacing a word",
      "paragraphs": [
        "New context: a small pilot found a possible improvement but has not been repeated. Sort suggests / proves universally / is compatible with. Suggests offers tentative support; is compatible with says the result does not conflict with an explanation; proves universally exceeds the evidence.",
        "Partly revise “The pilot guarantees success for every class” → “The pilot ___ a ___ benefit in ___.” Supply wording that retains limited scope without pretending that cautious vocabulary alone fixes a weak method."
      ],
      "check": {
        "prompt": "Give a defensible revision and explain what guarantee loses.",
        "answer": "For example: “The pilot suggests a possible benefit in the classes studied.” Guarantee removes uncertainty and every class widens the population. Both changes require more evidence than the pilot provides."
      }
    },
    {
      "title": "Produce the family without a printed root",
      "paragraphs": [
        "Use observe as a verb in one new sentence, observation as a noun in another and observational before a suitable noun in a third. Explain the grammatical job of each. Then paraphrase one source claim without changing its strength.",
        "After a delay, reconstruct the three frames from their intended meanings. The checked reading tasks demonstrate contextual interpretation; choosing and using the expression yourself is a further production step."
      ]
    },
    {
      "title": "Use the family in a new grammatical frame",
      "paragraphs": [
        "‘Researchers observe behaviour’ uses a verb; ‘the observation was useful’ uses a noun; ‘an observational study’ uses an adjective. ‘A clear observe’ fails because the noun phrase needs a noun head. ‘The finding suggests that...’ uses a clause complement, while ‘a suggestion about practice’ uses a noun phrase.",
        "Create a record with contextual meaning, word class, a natural partner and a new sentence. Then paraphrase the original claim without strengthening it. This combines retrieval and precision rather than treating an unverified word-list label as a course outcome."
      ],
      "check": {
        "prompt": "Does compatible evidence guarantee that a technique succeeds for every learner?",
        "answer": "No. Compatibility supports consistency with a possible explanation; a universal guarantee would require a much stronger claim and evidence than the passage supplies."
      }
    }
  ],
  "application": "The guided, independent and fresh reading contexts require both source comprehension and vocabulary precision. Use the actual sentence to distinguish a word’s role and strength, then explain the evidence for the summary choice."
},
"band3-vocab-education": {
  "mode": "extend",
  "outcomes": [
    "Follow changes, unchanged facts and conditional actions in an announcement.",
    "Identify the announcement’s purpose rather than a repeated topic word."
  ],
  "prerequisite": "An announcement can revise one part of an arrangement while preserving another. A deadline for contacting staff is not the event date. A conditional action applies only to the group named in its condition.",
  "sections": [
    {
      "title": "Build a change record",
      "paragraphs": [
        "For a workshop moved from Tuesday Room 6 to Thursday Room 9, keep separate entries for date and room. If the start remains 2 pm, do not replace it with a later number that refers to a reply deadline. Existing registrations remaining valid means attendance does not require a new registration unless the announcement says so.",
        "Words such as still, instead, now and no longer mark different status changes. ‘Materials are still available’ preserves access; ‘Places are no longer available’ removes it. Attach each marker to the correct noun or action rather than assigning a single positive or negative label to the whole announcement."
      ]
    },
    {
      "title": "Complete changed, unchanged and conditional slots",
      "paragraphs": [
        "New written announcement: “The archive visit moves from Monday to Wednesday. It still begins at ten. If you cannot attend, contact the tutor by Tuesday noon; existing bookings remain valid.” Completed changed slot → day, Monday to Wednesday. Finish unchanged → ___; reply deadline → ___; people who must act → ___."
      ],
      "check": {
        "prompt": "Complete the record. Must an available booked visitor register again?",
        "answer": "Ten o’clock and existing booking validity / Tuesday noon / those who cannot attend. No new registration is required by this source. A deadline for contacting the tutor is not the visit date."
      }
    },
    {
      "title": "Reduce the record to the question’s demand",
      "paragraphs": [
        "For the first live announcement, use an empty change / unchanged / action-if-needed frame. For later recordings, take only the roles the questions require. Identify whether an option states the announcement’s broad purpose or an instruction for one subgroup.",
        "After feedback, attach each incorrect time or action to the verb it actually belongs to. Replay that clause without reading. Later, retrieve the difference between a conditional instruction and an instruction applying to everyone on fresh audio."
      ]
    },
    {
      "title": "Purpose and audience guide the action",
      "paragraphs": [
        "The overall purpose may be to explain a changed arrangement. A question asking what an unavailable participant should do targets a narrower conditional instruction. ‘If you cannot attend, email by Wednesday noon’ does not require every registered student to send an email.",
        "An offer of materials is not a promise of a future seat. ‘We cannot guarantee a place next time’ limits the alternative explicitly. Review errors by identifying which slot was confused: event, deadline, eligibility or certainty. Then try the new recording without the transcript."
      ],
      "check": {
        "prompt": "A student can attend the revised date. Does a conditional instruction for those who cannot attend automatically apply?",
        "answer": "No. The condition identifies a particular group. Unless another instruction requires action, the available student follows the revised arrangement with the existing registration."
      }
    }
  ],
  "application": "Apply the change record to all three announcement tasks. Use the actual audio’s dates and conditions, not those in the teaching transcript. The fresh assessment tests whether you distinguish a changed event from a response deadline."
},
"band3-vocab-work": {
  "mode": "extend",
  "outcomes": [
    "Interpret obligation, permission and exceptions in practical messages.",
    "Combine supplied details for a bounded time inference."
  ],
  "prerequisite": "Must normally signals obligation; may can signal permission; do not prohibits an action. A request to change an arrangement does not imply approval. Practical reading depends on the text’s rules rather than assumptions about familiar workplaces.",
  "sections": [
    {
      "title": "Read the force of each instruction",
      "paragraphs": [
        "‘Bring identification’ requires the item. ‘A jacket will be provided’ describes a supplied item. ‘Do not bring safety clothing’ is a prohibition or instruction against bringing it, not a statement that clothing is unnecessary in every situation. An exception such as unless you have already completed induction narrows the group that must act.",
        "Permission can be conditional: ‘You may change the shift if a supervisor is available.’ A reader who submits a request has not yet met the approval condition. Keep request, assessment and confirmation as separate steps, just as collection and return can have different deadlines."
      ]
    },
    {
      "title": "Reconstruct permission steps before inferring an outcome",
      "paragraphs": [
        "New message: “Send a change request to the coordinator. Do not use the new room until approval arrives. If approved, collect the key before five.” Completed first step → request. Finish second → ___; third → ___; action prohibited before approval → ___."
      ],
      "check": {
        "prompt": "Complete the sequence and judge “A submitted request authorises the move.”",
        "answer": "Receive approval / collect the key before five / using the new room. The judgement is unsupported and conflicts with the explicit approval condition. Request, permission and action are separate stages."
      }
    },
    {
      "title": "Attach a time to its action",
      "paragraphs": [
        "Source: “The delivery arrives Thursday morning; tell reception by Wednesday at four if you cannot be there.” Complete event → ___; contact deadline → ___; group requiring contact → ___. Then explain what is unknown about the delivery’s precise hour."
      ],
      "check": {
        "prompt": "Complete the three roles and identify one safe inference.",
        "answer": "Thursday morning / Wednesday four / those unable to attend. The exact delivery hour is not supplied. A safe inference is that unavailable recipients must notify reception before the delivery day. In fresh live texts, trace every permission and deadline to its source clause; retrieve the sequence later without the written frame."
      }
    },
    {
      "title": "Combine facts without adding a story",
      "paragraphs": [
        "A 9 am start and a fifteen-minute-early instruction imply arrival at 8.45 am. The calculation follows directly. It does not specify travel time, payment terms or a requirement to arrive at 8.30. Such details might matter in real life but cannot be imported into a reading answer.",
        "A useful checklist records action / time / condition / source clause. After choosing an inference, explain the two facts that combine to support it. If the explanation needs an unstated assumption about policy, the inference is too broad."
      ],
      "check": {
        "prompt": "Does ‘contact the coordinator before Friday at three’ mean the shift itself is on Friday at three?",
        "answer": "No. The time governs the contact action. The message’s separate shift date remains the event time unless explicitly changed."
      }
    }
  ],
  "application": "Use the guided, independent and fresh daily-life sources to separate preparation, deadlines and permission. Keep each inference traceable to the source; the course is teaching practical comprehension, not making employment-policy decisions."
},
"band3-paraphrasing": {
  "mode": "extend",
  "outcomes": [
    "Compare preferences on a common dimension.",
    "Paraphrase a prompt without changing its requested action."
  ],
  "prerequisite": "A comparison needs a shared dimension such as feedback, pace or convenience. A preference can be conditional and still clear. Paraphrasing should preserve who is learning, what is compared and what evidence the interviewer requests.",
  "sections": [
    {
      "title": "Build a comparison from one shared dimension",
      "paragraphs": [
        "New rehearsal question: “Would you prefer a short course or individual tuition for learning a language? Explain a preference and an experience.” Sort demands → choose / compare / support with experience. Teaching a class is not a faithful paraphrase of being a learner.",
        "Shared dimension: feedback. A course can expose learners to peers’ questions, while individual tuition can focus more time on one learner’s errors. Partly complete “I would choose ___ at first because ___. In my experience, ___. Later, ___ might be useful if ___.” The stages may justify a conditional preference without contradiction."
      ],
      "check": {
        "prompt": "Why is “Courses are sociable, while tuition has a red sign” not a useful comparison?",
        "answer": "The second detail does not evaluate a relevant shared dimension or explain the preference. Use feedback, pace or another meaningful criterion, then connect the experience to that judgement."
      }
    },
    {
      "title": "Preserve the demand when restating it",
      "paragraphs": [
        "‘Learning with others’ can become ‘practising in a small group’ when the context supports it. It cannot automatically become teaching a class, because the participant’s role changes. ‘Explain your preference and describe an experience’ requires both judgement and evidence. Restating only the topic leaves a demand unanswered.",
        "When a precise term is unavailable, use a clear explanation rather than stopping for a rare synonym. Listen back for a direct preference, a shared comparison dimension and a visible connection between experience and judgement. Those content checks accompany, but do not replace, review of actual delivery."
      ],
      "check": {
        "prompt": "Why is ‘Group learning is sociable, while studying alone is cheaper in my town’ a weak comparison without further explanation?",
        "answer": "It switches dimensions. It can be developed, but a clearer comparison first weighs the same consideration across both options, or explains why the different considerations are relevant to the final preference."
      }
    },
    {
      "title": "Test a counterexample without losing the preference",
      "paragraphs": [
        "Suppose a learner needs flexible hours unavailable in the preferred course. State the condition that would change your recommendation, then keep your usual preference clear. A counterexample can qualify a universal claim without proving the opposite universal claim.",
        "For the live interviews, use your own experience and answer every requested action. After replay, ask whether the restated question kept the same learner, options and demand. Later, make a fresh comparison without a sentence frame."
      ]
    }
  ],
  "application": "The interview stages use new questions and examples. Answer each heard prompt fully before moving on. Complete the independent four-question set and use your own experience for the assessment rather than repeating the photography example."
},
"band3-practice-essay": {
  "mode": "extend",
  "outcomes": [
    "Construct complete email and discussion responses under their separate demands.",
    "Review communication and reasoning before surface polish."
  ],
  "prerequisite": "The current writing families include Build a Sentence, Write an Email and Write for an Academic Discussion. The timed pair here practises the latter two; it is not a complete Writing section. Email and discussion need different communication structures.",
  "sections": [
    {
      "title": "Construct an email in a distinct communication setting",
      "paragraphs": [
        "New rehearsal: a library loan record shows an item still borrowed although it was returned. Plan fact / identifying detail / requested check. Begin “I returned the atlas on Tuesday, but it still appears on my account.” Explain why this matters without accusing staff or claiming a fine has already been removed.",
        "Partly complete “Could you check ___ using ___? If the return has not been recorded, ___.” Supply an item or reference and a feasible next step. Then remove the frame and draft the message as connected prose rather than an essay with a general introduction."
      ],
      "check": {
        "prompt": "Repair “Your record is wrong. Cancel everything.”",
        "answer": "For example: “Could you check the return record for atlas reference A16? I placed it in the returns box on Tuesday afternoon and can bring my loan receipt.” The request identifies a practical check without assuming the outcome."
      }
    },
    {
      "title": "Construct a discussion contribution with another purpose",
      "paragraphs": [
        "New discussion: a professor asks whether phones should be kept out of small seminars. A peer values concentration; another values quick access to sources. Choose a position, explain a mechanism and add a condition, such as keeping devices available for a defined source-checking task.",
        "Partly complete “I support ___ because ___. For example, ___. The concern about ___ could be addressed by ___.” Now close the frame and add a new practical idea. A greeting, request for a personal appointment and sign-off would serve an email purpose rather than this discussion."
      ],
      "check": {
        "prompt": "What should be added to “I agree with both classmates”?",
        "answer": "A clear recommendation and a mechanism explaining how it addresses a concern, with an example or condition. Agreement is a starting relationship, not the developed contribution."
      }
    },
    {
      "title": "Transfer under the separate task demands",
      "paragraphs": [
        "The live course-choice discussion and careers-event email need fresh content. Use their own instructions and the separate ten- and seven-minute rehearsal allowances. Review the discussion for a new reason; review the email for an actionable request. Do not import the library or phone example.",
        "After the next study session, retrieve one weak sentence from each response and repair its task-specific problem before surface language. This mixed checkpoint covers two writing families; Build a Sentence still requires separate practice."
      ]
    }
  ],
  "application": "The guided plan prepares the discussion issue; the independent stage requires a full contribution; the assessment changes to a practical email. Use the existing editors and model-based self-review. Retain earlier drafts to compare coverage and development, without treating a timer or word count as a score."
},
"band3-review": {
  "mode": "extend",
  "outcomes": [
    "Match each current task family to suitable practice evidence.",
    "Diagnose a weakness and design a fresh follow-up."
  ],
  "prerequisite": "Raw local accuracy, XP, task completion and official TOEFL results are different measures. Written transcript choices do not establish auditory comprehension; written speaking plans do not establish intelligibility.",
  "sections": [
    {
      "title": "Choose evidence that measures the actual skill",
      "paragraphs": [
        "For contextual reading, keep answers and source explanations. For listening, use actual audio before transcript review. For Build a Sentence, preserve the reconstructed clause and explain its grammar. For email and discussion, save full responses and identify coverage and development. For repetition and interview, use actual speech with word-accuracy and delivery review.",
        "A weakness should be specific: missing articles in repetition, reversing embedded-question order, or failing to propose an actionable email solution. ‘Improve English’ does not identify a teachable target. Link the difficulty to a response you actually produced; mark a skill unassessed when the necessary evidence is absent."
      ]
    },
    {
      "title": "Finish a task-family evidence record",
      "paragraphs": [
        "Completed record: missing article during repetition / actual recording omits the / rehearse the short noun group / test a different once-heard sentence / compare wording and intelligibility. A written correction alone would not complete this check.",
        "Partial record: email offers no usable next action / quote ___ / revise ___ / fresh communication problem ___ / evidence to collect ___. Complete it from your own response rather than invent an error for every skill."
      ],
      "check": {
        "prompt": "What distinguishes the email check from an Academic Discussion check?",
        "answer": "The email must enable its recipient to act on required communication points. A discussion needs a relevant developed contribution to a thread. Both need clear language, but one generic checkbox cannot establish both purposes."
      }
    },
    {
      "title": "Retrieve the families without a score conversion",
      "paragraphs": [
        "Close the format list and name the task family for restoring contextual words, choosing a conversational reply, reconstructing a sentence, making a practical request, extending an academic thread, repeating exact heard wording and answering interview questions. Then reopen only to check what you missed.",
        "After another module, choose a fresh follow-up for the one weakness documented in your plan. Use official sample delivery for full-format rehearsal where needed, and retain local results as local evidence. XP, a word total or a small fixed quiz does not establish the current official score."
      ]
    },
    {
      "title": "Plan a fresh test of the revision",
      "paragraphs": [
        "Revise the original response once, then choose unfamiliar material with the same demand. After practising an embedded request, construct a new request with different information. After improving a discussion’s mechanism, write a new contribution rather than memorise the old post. Compare the target feature, not only total words or time spent.",
        "Use current official sample material for full delivery rehearsal and qualified feedback for productive quality. The format summary below identifies task families and current terminology; it does not equate the local bank with adaptive testing or calibrated scoring."
      ],
      "check": {
        "prompt": "Can a correct written response to every visible transcript demonstrate the Listen and Repeat skill?",
        "answer": "No. It may show comprehension or planning, but repetition requires hearing and reproducing the wording in actual speech. Keep those evidence categories separate in the review."
      }
    }
  ],
  "application": "Use the guided format questions, independent evidence plan and fresh interview to collect task-appropriate evidence. Explain what remains unassessed instead of inferring an official result from completion."
},
};
