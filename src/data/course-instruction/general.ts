import { chapter as c, section as s } from "./authoring";
import type { InstructionChapter } from "./types";
export const generalInstruction: Record<string, InstructionChapter> = {
"band4-listening-accents": {
  "mode": "replace",
  "outcomes": [
    "Recover precise detail from connected speech.",
    "Keep service, time and speaker roles separate in a practical recording."
  ],
  "prerequisite": "Recognise everyday time expressions, negation and present/past forms. IELTS Listening is shared by Academic and General Training. These original synthetic recordings provide controlled practice, not proof of coverage of every accent or a complete paper.",
  "sections": [
    {
      "title": "Connected speech changes sound boundaries",
      "paragraphs": [
        "In natural speech, the end of one word can connect to the beginning of the next. Unstressed words such as to, at and a may contain reduced vowels. A phrase such as ‘at a quarter past’ can sound like a single group. The written words and grammatical relationships remain; a learner needs to recover the group rather than demand a full stressed pronunciation of every word.",
        "Use context to narrow recognition, but do not replace the sound with a guess. If a form asks for a day, predict that category. Then listen for the actual day and any correction. A familiar Friday is not supported merely because it is the day you expected. Replay can help learning; fresh audio tests whether recognition transfers."
      ]
    },
    {
      "title": "Separate recognising a phrase from assigning its role",
      "paragraphs": [
        "Short written or partner-read rehearsal: “a quarter to ten” means 9.45; “a quarter past ten” means 10.15. First recover only the time. Then place it in “The desk opens at a quarter to ten, but repairs begin at a quarter past ten.” The two clear times belong to different services.",
        "Partly complete desk opening → ___; repair start → ___. Next hear a new phrase from a partner without the written text if possible. Reading the phrase checks meaning; recognising unseen speech checks a different step."
      ],
      "check": {
        "prompt": "Complete the roles and explain why choosing the later time is not a general strategy.",
        "answer": "9.45 / 10.15. The question’s service decides which time matters. A later time can be a separate category rather than a correction. A first or last mention rule would lose that distinction."
      }
    },
    {
      "title": "Reduce replay to the actual error",
      "paragraphs": [
        "In the first recording, leave service labels empty before playback. After a wrong answer, decide whether you missed a sound group, confused its role or transferred its format incorrectly. Replay the short relevant phrase, then return to new audio with no transcript.",
        "After another listening module, retrieve a different time or amount in a new sentence. Do not claim accent comprehension from repeatedly recognising one familiar recording."
      ]
    },
    {
      "title": "Attach details to the correct service",
      "paragraphs": [
        "‘The shop closes at six, but the collection desk closes at four’ contains two true deadlines. For collection, four is the relevant one. Six is not necessarily a false detail; it belongs to a different service. A workplace induction may similarly distinguish an arrival time, starting time and time when equipment is available.",
        "Create a compact record: action → person or service → time → condition. If a booking time is changed, update the relevant entry rather than overwriting every number. In a note-completion answer, check whether the unit or preposition is already printed and obey the stated word limit."
      ]
    },
    {
      "title": "Worked recognition and interpretation",
      "paragraphs": [
        "Source: ‘Please arrive at the main entrance by ten to nine. Training starts at nine, but badges need collecting first. Jackets are supplied; bring identification.’ The arrival deadline is 8.50, not 9.10. Training begins at nine; the earlier time serves badge collection. Identification is brought by the participant, while jackets are provided.",
        "A learner might hear the words accurately yet reverse who supplies an item. That is a relationship error. Another may understand the transcript but fail to recognise ten to nine in speech. That is a sound/time-expression issue. Review them differently: paraphrase the roles for the first; replay the short phrase and retrieve its time meaning for the second."
      ]
    },
    {
      "title": "Move from a short replay to a new source",
      "paragraphs": [
        "After checking, select one difficult phrase. Listen while reading once, then listen without text and state the arrangement. Finally use a new recording with the same kind of detail but different facts. Merely recognising a memorised transcript cannot establish unfamiliar listening comprehension.",
        "A strong listener can explain why the tempting detail was wrong for this question. Keep the scope modest: a controlled synthetic voice does not demonstrate mastery of every real-world pronunciation. Use official samples and varied real listening alongside these lessons when preparing for full delivery conditions."
      ],
      "check": {
        "prompt": "What is the difference between ‘The counter opens at eight’ and ‘Collections begin at nine’?",
        "answer": "They govern different actions. Opening does not guarantee that the collection service is available immediately; the question determines which time belongs in the answer."
      }
    }
  ],
  "application": "Use the guided correction, workplace induction and changed-appointment assessment to track action, time and supplied items. The transcript follows response for review. The task measures the details in that recording, not an advertised difficult-accent range."
},
"band4-listening-inference": {
  "mode": "replace",
  "outcomes": [
    "Infer attitude from a developed statement.",
    "Preserve a speaker’s qualification instead of turning it into certainty."
  ],
  "prerequisite": "Inference should follow from evidence rather than an imagined story. An attitude may be mixed: someone can value an idea while questioning its implementation. Words such as might and provided that restrict the claim.",
  "sections": [
    {
      "title": "Distinguish evaluation from emotion words",
      "paragraphs": [
        "‘I was nervous before the first session, but the tutor made it manageable’ reports an initial feeling followed by a positive experience. Choosing a negative evaluation because nervous was heard ignores the development. ‘The idea is attractive, although staffing is unresolved’ supports interest with a practical reservation.",
        "Do not treat every but as making the entire answer negative. Identify which claim is being qualified and which judgement survives. A speaker may contrast cost with value, expectation with experience or a general policy with one local difficulty. These are different relationships even when the connector is the same."
      ]
    },
    {
      "title": "Reconstruct a qualified stance with one note supplied",
      "paragraphs": [
        "New written account: “The exhibition was smaller than I expected. That made the visit easier to manage, although I would have liked clearer labels.” Completed expectation → larger exhibition. Finish actual benefit → ___; limitation → ___; likely judgement → ___.",
        "Compare “disappointed by everything” with “valued the manageable size but wanted clearer information”. The first converts one limitation into a total evaluation; the second retains the trade-off."
      ],
      "check": {
        "prompt": "Complete the stance and explain why a positive adjective alone would be insufficient.",
        "answer": "Manageable visit / unclear labels / positive with a specific reservation. A correct stance depends on the entire turn, including the qualified recommendation, not one emotional word."
      }
    },
    {
      "title": "Remove the supplied attitude label",
      "paragraphs": [
        "For the live recordings, first note the speaker’s final judgement and supporting clause, leaving the label blank until the turn finishes. In the next source, choose your own brief notes. After feedback, identify the nearest wrong summary’s lost qualifier or incorrect speaker.",
        "Return later to a fresh account and state both the view and its limit without using an answer option’s wording. A host’s suggested interpretation belongs to the host until the guest accepts it."
      ]
    },
    {
      "title": "Infer stance without inventing a decision",
      "paragraphs": [
        "Source: ‘I would support the evening service if transport were available. At present the last bus leaves too early, so I am not ready to recommend it for everyone.’ The speaker sees a possible benefit but withholds a universal recommendation. ‘Strongly rejects all evening services’ is too negative. ‘Fully supports the current arrangement’ loses the unresolved access problem.",
        "If a conversation ends with ‘We need to check that first’, the decision remains conditional. Do not infer a confirmed launch. A useful note is benefit / condition / current status. This preserves more meaning than a single positive or negative symbol."
      ]
    },
    {
      "title": "Use evidence to eliminate a near-match",
      "paragraphs": [
        "An option saying ‘concerned about access’ can fit the bus limitation. ‘Dissatisfied with the teaching’ introduces a different object of concern. A familiar topic word does not allow transferring attitude from one issue to another. Compare the full proposition, including what the feeling is about.",
        "After feedback, quote the phrase establishing the stance, then state what cannot be concluded. For a sound-recognition error, replay the phrase; for an inference error, explain why the stronger or weaker alternative goes beyond it. Try a fresh qualified judgement before declaring the skill secure."
      ],
      "check": {
        "prompt": "Does ‘It may help some users’ support ‘It will help every user’?",
        "answer": "No. May becomes will and some becomes every. Both certainty and scope are strengthened beyond the source; neither change is harmless paraphrase."
      }
    }
  ],
  "application": "The guided attitude, independent discussion and new-speaker assessment ask for qualified interpretations. Keep benefit, condition and current decision status separate, and use the actual recording rather than outside assumptions about the topic."
},
"band4-listening-distractors": {
  "mode": "replace",
  "outcomes": [
    "Track a changing plan without confusing a rejected suggestion with an agreement.",
    "Distinguish a final fact from an unresolved condition."
  ],
  "prerequisite": "A distractor can be a true detail that answers another question, an earlier arrangement or an unaccepted suggestion. The last word heard is not automatically the final decision; grammar and context establish status.",
  "sections": [
    {
      "title": "Keep a small decision ledger",
      "paragraphs": [
        "Source: ‘Tuesday would suit me, but the room is booked. Thursday is possible if the technician can attend. I have checked with her, and Friday is now confirmed.’ Tuesday is rejected; Thursday remains a conditional possibility in the account; Friday is confirmed. Notes should preserve those statuses, not simply list the days.",
        "Signals such as originally, instead, actually, confirmed and still matter because they explain change or continuity. ‘The date changed, but the venue is still the same’ updates only the date. Do not carry a changed status into the unchanged location."
      ]
    },
    {
      "title": "Complete a decision ledger before selecting an option",
      "paragraphs": [
        "New written rehearsal: “We considered Saturday, but the hall is unavailable. Sunday is suitable if the caretaker can open it; I will ask her today.” Completed rejected proposal → Saturday, unavailable hall. Finish proposed option → ___; acceptance condition → ___; unresolved action → ___."
      ],
      "check": {
        "prompt": "Complete the ledger. Is Sunday already a confirmed booking?",
        "answer": "Sunday / caretaker can open the hall / ask the caretaker. No confirmation is reported. A proposal plus a future inquiry remains conditional even if it is the only workable option mentioned."
      }
    },
    {
      "title": "Withdraw status prompts without discarding qualifications",
      "paragraphs": [
        "For the first live extract, use proposed / rejected / accepted / unresolved notes. For the next, keep only the entries needed by its questions. If an item requests two answers, satisfy that demand rather than force a single final-choice pattern.",
        "After checking, explain one mentioned distractor’s true status. Replay the acceptance or condition clause and test the distinction on new audio later. The task determines whether a practical consequence or final arrangement is being asked for."
      ]
    },
    {
      "title": "Separate decision from supporting detail",
      "paragraphs": [
        "A service conversation may mention an early collection window, a later shop closing time and a deadline for cancellation. All three can be valid. If asked when the customer must cancel, use the action-specific deadline. A later time for another service does not override it.",
        "A conditional booking rule also matters: ‘The place is held until payment arrives by noon’ does not describe an unconditional reservation. The source may confirm a time but leave payment outstanding. Decide what is settled and what action remains before interpreting the option."
      ]
    },
    {
      "title": "Worked review of a wrong answer",
      "paragraphs": [
        "Question: What will the customer do? Source: ‘I could collect it myself, but I am working late. Could you deliver it instead? That would be easier.’ Choosing self-collection uses a mentioned possibility that the speaker rejects. The request and evaluation support delivery as the preferred arrangement, but a separate provider acceptance would be needed to establish that delivery is booked.",
        "That distinction prevents over-inference. ‘Prefers delivery’ is supported; ‘Delivery has definitely been scheduled’ may not be. During review, mark the point where the candidate option was proposed, cancelled or accepted. Then test the same procedure on a new service recording."
      ],
      "check": {
        "prompt": "‘We might use Room B. I will ask tomorrow.’ Is Room B confirmed?",
        "answer": "No. Might and will ask leave availability unresolved. The source supports a proposed next step, not a completed booking."
      }
    }
  ],
  "application": "The guided changed plan introduces updating; the independent service exchange adds competing actions; the booking assessment includes conditions. For each answer explain the detail’s status, not merely whether its word appeared."
},
"band4-reading-writers-views": {
  "mode": "replace",
  "outcomes": [
    "Distinguish factual evidence, attributed opinion and the writer’s own judgement.",
    "Use support, contradiction and missing information precisely."
  ],
  "prerequisite": "A writer may quote another person without endorsing the claim. Reporting verbs such as argues, doubts and recommends identify whose view is presented. Quantifiers and certainty belong to the claim being judged.",
  "sections": [
    {
      "title": "Find the owner of a view",
      "paragraphs": [
        "‘Some residents call the scheme a complete success, but the author recommends waiting for winter data’ contains two views. Complete success belongs to residents; cautious delay belongs to the author. A question about the writer cannot be answered by copying the first quoted opinion.",
        "Read verbs and contrast carefully. ‘The author acknowledges a benefit’ is weaker than endorses every claim. ‘The author questions the evidence’ does not necessarily mean the project has no value. Identify the exact proposition the writer supports or limits."
      ]
    },
    {
      "title": "Compare an attributed view with the writer’s own view",
      "paragraphs": [
        "New source: “Some shop owners argue that later opening always increases sales. The writer accepts that it can help busy customers, but notes that staffing costs may outweigh extra income in quiet districts.” Completed owner view → universal sales increase. Finish writer’s accepted benefit → ___; qualification → ___.",
        "Judge “The writer believes later opening is guaranteed to be profitable.” Identify the incompatible clause rather than selecting a label because guaranteed sounds strong."
      ],
      "check": {
        "prompt": "Complete the record and judgement.",
        "answer": "Convenience for busy customers / staffing may cost more than extra income / NO. The writer explicitly allows a case where costs outweigh income, contradicting a guaranteed profit. A claim about the exact number of shops surveyed would be NOT GIVEN because no survey count is supplied."
      }
    },
    {
      "title": "Name the missing fact before choosing NOT GIVEN",
      "paragraphs": [
        "For a live claim, underline owner, quantity, time and certainty. If it cannot be judged, write the exact absent comparison or opinion. Missing evidence is not automatically evidence of the opposite.",
        "After another reading task, write a YES claim, a NO claim and a genuinely unanswerable claim about a fresh paragraph. Check that a NO claim has incompatible evidence, rather than just stronger wording. Decide each label from evidence rather than an expected answer sequence."
      ]
    },
    {
      "title": "Work through a source-bound judgement",
      "paragraphs": [
        "Source: ‘The new path makes the river easier to reach. However, the review argues that photographs on social media are a poor sole measure of success. Regular local use should also be considered. The review does not examine property prices.’ Supported view: success needs more than publicity. Contradicted view: publicity alone is sufficient. Unanswered factual comparison: property prices rose more here than elsewhere.",
        "Missing information is not disagreement. The absence of a price result does not establish that prices stayed the same or fell. For a writer-view task, use the labels the instruction requires, often YES, NO and NOT GIVEN, rather than automatically changing them to factual TRUE/FALSE labels."
      ]
    },
    {
      "title": "Preserve scope in a paraphrase",
      "paragraphs": [
        "‘A useful improvement in access’ cannot become ‘a perfect solution for all residents’. The stronger option adds universality and removes limitations. ‘Not the only measure’ cannot become ‘completely irrelevant’: an author can oppose exclusive reliance on publicity while accepting it as one source of information.",
        "After checking, write a short ownership note: writer / quoted stakeholder / factual report. Then compare the complete meaning of the chosen answer with the source clause. This is useful for General Training’s longer text and for evaluative language inside practical notices."
      ],
      "check": {
        "prompt": "If a report says a proposal is useful but costly, does the writer necessarily recommend abandoning it?",
        "answer": "No. The report states a trade-off. Abandonment needs a further recommendation or judgement; cost alone does not establish that decision."
      }
    }
  ],
  "application": "Apply ownership and scope checks to the three fresh reading sources. Use each question’s actual demand: detail, practical condition or writer evaluation. Explain a summary with the writer’s own evidence rather than a view you personally find reasonable."
},
"band4-reading-difficult-texts": {
  "mode": "replace",
  "outcomes": [
    "Unpack a dense clause before deciding its implication.",
    "Infer an unfamiliar word using local explanation and grammar."
  ],
  "prerequisite": "Find subject, finite verb and object or complement. Modifying phrases can separate them. You do not need to understand every rare word before recovering the main clause; identify its role first.",
  "sections": [
    {
      "title": "Recover the sentence skeleton",
      "paragraphs": [
        "‘The proposal, which residents developed after several meetings, was revised when a safety inspection identified a problem’ has main subject proposal and main verb was revised. The relative clause supplies background authorship; the when-clause supplies the trigger. Reducing it to residents identified a problem changes who performed the inspection.",
        "Mark information as main assertion, background, condition or qualification. Then paraphrase the structure in plain English: residents made a proposal; a later inspection found a problem; the proposal changed. The simpler account should preserve time and agency rather than merely shorten the sentence."
      ]
    },
    {
      "title": "Extract the skeleton before interpreting every modifier",
      "paragraphs": [
        "New sentence: “The labels attached to the oldest boxes, which volunteers had copied from a faded register, omitted several dates.” Completed main subject → labels; main finite verb → omitted; object → dates. The oldest boxes does not become the subject merely because it sits near the relative clause.",
        "Partly reduce “The tools stored beside the rear door, although rarely used, require a safety check.” Head → ___; finite verb → ___; required action → ___. Then restore the modifiers and explain what extra information they add."
      ],
      "check": {
        "prompt": "Complete the skeleton and keep the meaning of rarely used.",
        "answer": "Tools / require / safety check. Rarely used describes frequency, not exemption from checking. The subordinate information must not reverse the main rule."
      }
    },
    {
      "title": "Test a local definition in place",
      "paragraphs": [
        "Source: “The inventory was provisional: staff expected to revise it after checking the remaining boxes.” Replace provisional with not final, then reread. “Based only on guesses” adds a claim the definition does not supply.",
        "In the live passages, unpack one difficult sentence, use the local definition, and then reconstruct the paragraph’s argument. Later, retrieve the skeleton of a new sentence without deleting a limitation that affects its claim."
      ]
    },
    {
      "title": "Use context to constrain vocabulary",
      "paragraphs": [
        "Source: ‘The panels are removable: maintenance staff can lift them out to reach the wall.’ Removable means capable of being taken away or detached in this context. The explanation after the colon constrains the meaning; you do not need specialist construction knowledge. ‘Permanent’ would contradict the described action.",
        "Word parts are clues, not proof. An unfamiliar adjective before panels must describe them, but several adjectives could fit grammatically. Use the surrounding explanation to select meaning. A guessed dictionary association that makes the paragraph incoherent should be rejected."
      ]
    },
    {
      "title": "Read difficult arguments without losing the limit",
      "paragraphs": [
        "A source may explain a promising intervention and then name a limitation. ‘May improve local access’ does not guarantee national success. A dense sentence can hide the qualifier in a subordinate clause, so check modal verbs and restricted populations before accepting a broad answer.",
        "Review a difficult passage by writing one plain sentence for each paragraph’s role. If the original says no figures are available, preserve that absence rather than fill it with common knowledge. During fresh practice, see whether your paraphrase lets another reader recover the same actor, action, condition and certainty."
      ],
      "check": {
        "prompt": "Unpack ‘The route, originally designed for commuters, now attracts visitors who stop to observe plants.’",
        "answer": "The route was designed for commuters. It now also attracts visitors, and those visitors stop to observe plants. The sentence does not establish that commuters no longer use it."
      }
    }
  ],
  "application": "The guided and independent passages supply the relevant context; the assessment changes the source. Use clause skeletons for difficult sentences and local evidence for vocabulary. Outside expertise should not be needed to justify the checked answers."
},
"band4-reading-time-pressure": {
  "mode": "replace",
  "outcomes": [
    "Use question demands to locate and verify evidence efficiently.",
    "Preserve multi-condition instructions while reading quickly."
  ],
  "prerequisite": "Scanning finds a likely location; close reading checks meaning. General Training includes everyday, workplace and longer general-interest material. A short local set is not the full test and cannot establish an official band.",
  "sections": [
    {
      "title": "Spend effort where the decision is made",
      "paragraphs": [
        "Read the question first to identify its demand: a document to bring, an eligibility condition, a reason or an overall conclusion. Scan for a distinctive anchor, then read the relevant clause and its exception. Fast reading of all paragraphs without a decision strategy can be less efficient than a short deliberate check.",
        "For a practical notice, mark action, person, time and condition. ‘Applications require references unless you have completed the internal course’ contains a broad rule and an exception. The exception cannot be ignored just because references is easy to find. Two candidates can need different actions under the same notice."
      ]
    },
    {
      "title": "Complete a fresh action/deadline/exception record",
      "paragraphs": [
        "New teaching notice: “Volunteers must return the safety form by Tuesday before joining Saturday’s planting session. Those who completed the same induction last month need not submit it again. Contact the organiser before Tuesday if your form is missing.” Completed event → Saturday planting. Finish submission deadline → ___; exception → ___; missing-form action → ___.",
        "A question asking when to act needs Tuesday or before Tuesday according to the particular verb. It does not need Saturday simply because that is the event. A concise answer is sufficient when it supplies the requested fact within the word limit."
      ],
      "check": {
        "prompt": "Complete the three entries and identify a volunteer who need not submit another form.",
        "answer": "Tuesday / same induction completed last month / contact the organiser before Tuesday. A volunteer meeting the stated induction exception need not resubmit. Do not widen that exception to any previous gardening experience."
      }
    },
    {
      "title": "Return to uncertainty with a reason",
      "paragraphs": [
        "If stuck, note the exact issue—missing evidence, uncertain referent or two competing conditions—then move on. On return, resolve that issue rather than reread everything equally slowly. After checking, distinguish language misunderstanding from failure to locate a relevant line.",
        "An error log should record the source clause and the lost condition. Repeated correct answers on the same notice may reflect memory; a fresh practical source tests whether you can preserve the condition under time pressure. Use local results as feedback on that procedure."
      ],
      "check": {
        "prompt": "Does “forms are required” fully describe the new safety notice?",
        "answer": "No. It loses both the deadline and the exemption for the same induction completed last month. A faithful summary preserves the conditions relevant to the particular reader."
      }
    },
    {
      "title": "Remove the table for a new practical source",
      "paragraphs": [
        "For the first live source, use action / deadline / exception headings but leave their entries empty. In later sources, decide which headings are useful. After checking, record the clause you failed to locate or the condition you lost.",
        "Return after another module and answer a fresh notice with a concise source-bound phrase. Preserve valid short answers when the question already supplies their role; adding unnecessary words may break the limit."
      ]
    }
  ],
  "application": "The guided references item, independent course information and fresh collection notice require different practical facts. Keep their word limits and accepted concise variants. Use evidence first, then a short answer; do not rely on a familiar answer’s previous position."
},
"band4-writing-sophisticated": {
  "mode": "replace",
  "outcomes": [
    "Construct complete letters that develop all three content points.",
    "Adapt requests, explanations and closings to formal, semi-formal and informal relationships."
  ],
  "prerequisite": "A letter has a reader and a communication goal. Formal usually addresses an organisation or unfamiliar person; semi-formal often addresses a known person in a professional role; informal addresses a friend. General Training Task 1 requires at least 150 words. Postal addresses are not needed at the top.",
  "sections": [
    {
      "title": "Make the relationship and purpose explicit",
      "paragraphs": [
        "General Training Task 1 needs at least 150 words developing the requested points. Formal, semi-formal and informal are useful relationship descriptions, not three separate scripts to memorise. An unfamiliar supplier needs a clear service problem and request; a known tutor needs a respectful explanation; a friend needs natural useful detail.",
        "New teaching situations: a book supplier sent the wrong edition; a course tutor needs a request for extra project time because an archive closed; a friend is considering a local book festival. These differ from the live heating, working-hours and coastal-visit tasks. Make three content notes for each before drafting."
      ]
    },
    {
      "title": "Construct the formal letter one point at a time",
      "paragraphs": [
        "Purpose sentence: “I am writing about the reference book delivered under order B417.” Add the observable problem: the delivered edition differs from the ordered one. Explain a consequence rather than repeat unacceptable: the class uses a different chapter order, making preparation difficult.",
        "Partly complete “Could you ___? I can ___, provided ___. Please confirm ___.” Choose a practical exchange request and avoid announcing an agreed replacement. A formal greeting does not make “Fix it immediately or else” appropriate."
      ],
      "check": {
        "prompt": "Complete a clear request before reading the full model.",
        "answer": "For example: “Could you exchange it for the edition listed on my order? I can return the unused copy, provided you explain the return procedure. Please confirm whether a replacement can arrive before the course begins.” It gives action and practical constraints without assuming approval."
      }
    },
    {
      "title": "Complete formal model on new evidence",
      "paragraphs": [
        "Dear Sir or Madam,\n\nI am writing about the reference book delivered yesterday under order B417. I ordered the third edition of A Guide to Local History, but the parcel contained the second edition. The title is correct, although the edition number on the cover differs from my confirmation email.\n\nI need the specified edition for a course beginning next month. Our weekly reading refers to its chapter numbers, and several sections appear in a different order in the older copy. Using it would make preparing for class unnecessarily difficult.\n\nCould you arrange an exchange for the edition shown on my order? The book is unused, and I have kept the packaging. I can return it this week if you send the appropriate instructions. Please also confirm whether the replacement is available and when it could be delivered.\n\nIf an exchange is not possible before the course starts, I would appreciate information about another practical option. Thank you for checking this matter.\n\nYours faithfully,\nNadia Shah",
        "The order identifies the transaction; the consequence explains why the difference matters; the request offers a return and asks for confirmation. The language is direct without making unsupported accusations."
      ]
    },
    {
      "title": "Build a known-reader request before its whole model",
      "paragraphs": [
        "For the tutor, begin with the project and reason, then propose a bounded extension and show how work will continue. Complete “The archive closure prevents me from ___, but I can still ___. Would it be possible to ___?” Respect the tutor’s decision; do not write that the deadline has already changed.",
        "Dear Mr Ellis,\n\nI would like to ask whether I could have a short extension for the local-history project due at the end of next week. The town archive has closed unexpectedly for repairs, and I cannot consult the final set of records identified in my plan.\n\nI have completed the introduction and the comparison based on the material already collected. However, the missing records are important because they would let me check whether the pattern continued into the following decade. I do not want to present that conclusion without the evidence.\n\nWould it be possible to submit the completed project one week later? During the closure, I will revise the existing sections and prepare the source notes, so that only the final comparison remains when access returns. I can send you the current draft now if that would help you assess the request.\n\nPlease let me know whether this arrangement is acceptable or whether you would prefer me to narrow the project instead.\n\nBest regards,\nLena",
        "The proposal is specific, the reason is connected to the work, and the fallback leaves the decision with the known professional reader. Warmth and respect do not require inflated vocabulary."
      ]
    },
    {
      "title": "Develop a friendly recommendation with practical detail",
      "paragraphs": [
        "Use a natural opening, an activity the friend might enjoy, preparation and a next step. Partly complete “I thought you would like ___ because ___. Bring ___ in case ___. Let me know ___ so ___.” The because-part should connect to the friend, not repeat wonderful.",
        "Hi Amir,\n\nI’m delighted that you’re thinking of coming to the book festival next month. I went last year and immediately thought of you because several sessions bring local writers together with readers who are working on their first stories.\n\nWe could begin with the short-story workshop on Saturday morning. Participants try a small writing exercise and then discuss different ways to develop it. Nobody has to read aloud, so you can join in without feeling under pressure. Afterwards, there is time to browse the outdoor stalls and hear one of the free author conversations.\n\nBring a notebook and a light jacket, as some events take place in the courtyard. You don’t need to buy books to attend the free sessions, though it may be worth checking which workshops require advance booking.\n\nLet me know which session interests you most, and I’ll check availability before we make plans. We can also choose somewhere nearby to eat afterwards.\n\nSee you soon,\nRafi",
        "The recommendation links to a known interest, preparation is useful and the closing asks for a decision. It does not claim a booking already exists."
      ]
    },
    {
      "title": "Diagnose a weak letter and transfer with less help",
      "paragraphs": [
        "Weak letter: “Dear Sir, I have a problem. It is terrible. You must help. Thanks.” It lacks identifying detail, a consequence and an actionable request. Repair one body paragraph first, then check whether the opening and closing fit the relationship.",
        "Now close all three models and use the live task’s own three points. Mark one sentence or developed group meeting each point. After another module, rewrite a request for a different reader and explain which factual needs remain and which relationship choices change. A checklist supports revision; it does not award a writing band."
      ]
    }
  ],
  "application": "The guided heating letter, independent manager request and fresh friend letter practise the three relationships. Use each task’s own facts and develop every point. The examples teach construction; copying them does not demonstrate that you can respond to a different situation."
},
"band4-writing-complex-comparisons": {
  "mode": "replace",
  "outcomes": [
    "Interpret eligibility, obligation and exceptions in practical documents.",
    "Combine a notice’s conditions into an accurate action checklist."
  ],
  "prerequisite": "Must signals obligation, may can signal permission and unless introduces an exception. A policy can state a general rule and then narrow it. Read both before deciding what a particular person must do.",
  "sections": [
    {
      "title": "Read a document as a system of rules",
      "paragraphs": [
        "‘Members may enter after induction. Visitors must be accompanied. Equipment is available except during maintenance.’ These clauses govern different groups and resources. Membership alone does not remove the induction condition; visitor access requires accompaniment; equipment permission changes during maintenance. A positive general phrase cannot cancel a specific restriction.",
        "In workplace documents, separate eligibility from procedure. A worker may be eligible to request training but still need approval. ‘Applications are considered monthly’ gives a review schedule, not guaranteed acceptance. A reader who submits a form has completed an action, not obtained the requested outcome."
      ]
    },
    {
      "title": "Reconstruct a rule chain and its exception",
      "paragraphs": [
        "New teaching notice: “Borrowers may collect a telescope after completing the safety briefing. A booking does not reserve the accessory kit. Request the kit separately unless your confirmation lists it.” Completed general sequence → briefing before collection. Finish extra request applies to ___; exception applies when ___; booking alone does not establish ___."
      ],
      "check": {
        "prompt": "Complete the three rules and decide what a confirmation listing only the telescope permits you to assume.",
        "answer": "People needing the kit / confirmation already lists the kit / accessory reservation. Telescope-only confirmation does not establish that the kit is reserved. Read the documents together without merging different permissions."
      }
    },
    {
      "title": "Choose a heading for the whole procedure",
      "paragraphs": [
        "Compare “How to arrange safe collection and optional equipment” with “The history of telescopes” and “All bookings include every accessory”. The first covers the briefing and separate kit process. The others invent subject matter or remove a condition.",
        "For the live notices, mark required action, permission, deadline and exception. In the independent stage, create your own rule map. After checking, explain the exact condition lost in a wrong choice and revisit it with a fresh practical notice later."
      ]
    },
    {
      "title": "Worked practical notice",
      "paragraphs": [
        "Source: ‘Staff may borrow presentation equipment for up to three working days. Collection is from the support desk between noon and two. Returns must reach the desk before four on the due date. An extension can be requested before the due date, but approval depends on other bookings.’",
        "For a return question, before four is relevant; noon to two governs collection. Up to three working days gives a maximum, not an automatic three-day entitlement in every situation. An extension request must be timely and remains conditional. A faithful checklist says collect in the stated window / return by the due time / request extension before the due date / await approval.",
        "‘Borrowers can always keep equipment longer if they email’ is unsupported. It drops both the deadline and the competing-booking condition. Practical comprehension often depends on retaining such small restrictions."
      ]
    },
    {
      "title": "Compare documents without blending rules",
      "paragraphs": [
        "When several notices share a topic, keep their rules separate. One centre may lend tools; another may require participants to bring them. A word shared by both is an anchor, not evidence that the same policy applies. Match a person’s needs against all required conditions in one document.",
        "After feedback, record the action and its governing clause. If two conditions seem to conflict, check whether they apply to different groups, times or stages. Do not import a rule from your own workplace to resolve a reading question. The supplied text is the evidence."
      ],
      "check": {
        "prompt": "Does ‘Members may book a room’ establish that every member can use it without a booking?",
        "answer": "No. Permission to book is different from permission to use an unbooked space. The statement does not remove any reservation procedure or availability condition."
      }
    }
  ],
  "application": "Apply rule tracking to the guided practical source, independent passage and fresh notice assessment. The local sets include everyday and public-service material as well as workplace-style conditions; use the rule in each source rather than a memorised institutional policy."
},
"band4-writing-complex-ideas": {
  "mode": "replace",
  "outcomes": [
    "State a clear conditional position on a complex question.",
    "Explain a mechanism, competing consideration and defensible judgement."
  ],
  "prerequisite": "Nuance means a meaningful distinction, not refusing to answer. A position can support a policy for one purpose and oppose it for another if the distinction is explained. Task 2 requires a developed essay of at least 250 words in a full response.",
  "sections": [
    {
      "title": "Find a distinction that changes the judgement",
      "paragraphs": [
        "New teaching question: Should public museums charge visitors, or should entry be free? A useful distinction is access to a permanent collection versus an optional costly special exhibition. Free general entry can support broad access, while a limited charge may help fund an extra event. The distinction needs a reason; it cannot be an arbitrary compromise.",
        "Weak thesis: “Both views are correct because museums are important.” More precise thesis: “Permanent collections should normally be free where public funding can sustain them, while a transparent charge can be reasonable for additional exhibitions.” It states both the condition and the decision."
      ]
    },
    {
      "title": "Construct a developed paragraph before the whole essay",
      "paragraphs": [
        "Start with a complete claim: “Free entry can make repeat visits easier.” Add a mechanism: a family can return for a short visit without paying each time. Add an illustration tied to that mechanism, then a condition concerning sustainable funding.",
        "Partly complete “A charge may support a special exhibition because ___. For example, ___. However, ___ should remain clear.” Supply a cost mechanism and a practical condition rather than repeat that money is useful."
      ],
      "check": {
        "prompt": "Complete one defensible paragraph and diagnose the missing reasoning in “Fees are good because they are beneficial.”",
        "answer": "For example: “An exhibition may need additional loans and supervision. A short event could therefore use a separate ticket to cover part of those costs. However, the price and what it includes should remain clear.” The weak version repeats an evaluation without explaining what the money supports."
      }
    },
    {
      "title": "Analyse a complete original argument",
      "paragraphs": [
        "Public museums need reliable funding, but they also serve people who may be unable to pay repeatedly for cultural activities. I believe ordinary access should normally be free where public support can sustain it, while separate charges may be reasonable for additional exhibitions.\n\nThe strongest argument for free entry is that it allows people to use a museum in different ways. A family may want to return several times for short visits rather than spend a whole day there. Without a new payment each time, parents can introduce children to one part of a collection and come back when their interest develops. Free entry can also make a brief visit a realistic option for somebody passing the building after work.\n\nHowever, removing ticket income does not remove the costs of maintaining the collection. Staff, accessible facilities and careful conservation still require resources. If public support is insufficient, promising free access without a sustainable budget could lead to reduced opening hours or neglected services. Access therefore depends on a workable funding arrangement, not simply the absence of a ticket price.\n\nA separate charge for a special exhibition can be justified when it supports additional costs and visitors understand what is included. This should not quietly turn the entire permanent collection into a paid attraction. Museums could retain free general entry and explain the purpose of an optional ticket, while reviewing whether the price excludes interested groups.\n\nIn conclusion, free ordinary access and limited optional charges can serve different purposes. The decision should protect meaningful public access while recognising the resources needed to provide it.",
        "The introduction supplies a distinction; one body paragraph develops access; another tests funding sustainability; the next applies the distinction. The conclusion retains the same judgement. This is original teaching material without a certified band."
      ]
    },
    {
      "title": "Repair the position and transfer to another responsibility",
      "paragraphs": [
        "Weak response: “Museums should be free and should charge everyone. Both sides have points.” It leaves the conditions unstated. Name what remains free, what may carry a charge and why the different treatment follows from the argument.",
        "The live training-funding and community-workshop tasks need fresh distinctions about responsibility and benefit. Close this model, build a thesis and a partial paragraph using their facts, then extend it independently. Later, retrieve the difference between a conditional position and an unresolved it depends."
      ]
    }
  ],
  "application": "The guided paragraph isolates the current-job/career-change distinction. The independent essay needs both views and your judgement. The assessment transfers the reasoning method to a community workshop, so develop public benefit, a condition and a realistic limit rather than repeat the employer example."
},
"band4-writing-lexical-resource": {
  "mode": "replace",
  "outcomes": [
    "Choose words that preserve certainty, scope and register.",
    "Retrieve natural collocations instead of inserting rare synonyms."
  ],
  "prerequisite": "Lexical resource includes appropriate meaning, combination, form and spelling. A word with a stronger meaning is not automatically a better synonym. A clear familiar verb can be more precise than an inflated expression.",
  "sections": [
    {
      "title": "Make the strength fit the evidence",
      "paragraphs": [
        "‘The policy may reduce delays’ leaves uncertainty and allows remaining delays. ‘The policy will eradicate every inconvenience’ strengthens certainty, completeness and scope. A vocabulary substitution that changes any of these alters the claim. Before choosing a verb, ask what the evidence actually supports: suggests, indicates, demonstrates and proves are not interchangeable in every context.",
        "Quantity matters too. ‘Some users reported difficulty’ cannot become ‘Users universally rejected the system’. A precise adjective or quantifier often does more work than a rare noun. Preserve the original population and time when paraphrasing."
      ]
    },
    {
      "title": "Preserve certainty while changing expression",
      "paragraphs": [
        "New context: an early report is not final because two sites remain unexamined. Complete “The findings are ___” with preliminary, provisional or another suitable not-final adjective. Empirical instead describes evidence based on observation; it does not by itself mean unfinished. Keep those two meanings separate when choosing an adjective.",
        "Compare “raises a concern” and “proves a failure”. The first can flag a possible problem; the second asserts an established outcome. Choose from the evidence rather than the desired force of your writing."
      ],
      "check": {
        "prompt": "Repair “The preliminary report guarantees that every site is safe.”",
        "answer": "For example: “The preliminary report provides limited findings, with two sites still to be examined.” A preliminary label cannot make an unsupported universal guarantee accurate."
      }
    },
    {
      "title": "Retrieve the phrase without a word list",
      "paragraphs": [
        "A confusing instruction needs clarification; an unmet condition concerns a requirement; a shared decision concerns agreement. Write a natural verb/noun phrase for each, then use one in a complete sentence. Check its complement as well as the main verb.",
        "After a later writing task, replace one inflated or overly strong expression with precise ordinary language and explain the meaning change. Do not replace a correct word simply because it is short."
      ]
    },
    {
      "title": "Learn the complete expression",
      "paragraphs": [
        "Use raise a concern, draw a conclusion, reach an agreement and meet a requirement in sentences. Their verbs form conventional combinations. A related noun may change grammar: ‘The evidence suggests a benefit’ differs from ‘There is a suggestion of a benefit’. The second can also change the source or strength of the claim, so do not swap forms automatically.",
        "Register depends on the recipient. ‘Could you clarify the deadline?’ is suitable for a workplace enquiry. ‘Explain this now’ has a different interpersonal force. ‘Have a belief’ is grammatical where a belief is treated as a held idea; it should not be banned just because believe is often more concise."
      ]
    },
    {
      "title": "Worked revision with a reason for each change",
      "paragraphs": [
        "Draft: ‘This scheme will destroy all problems and do a huge progress.’ Revision: ‘The scheme may address several access problems and make useful progress.’ May reduces unsupported certainty; several narrows an absolute; address describes a response rather than total elimination; make progress repairs the collocation and removes an unsuitable singular article.",
        "Then add context if the reader needs it: which access problems, for whom, and by what mechanism? Lexical precision supports reasoning, but it cannot replace missing explanation. Retrieve a phrase from a fresh context after feedback so that the lesson tests usable selection rather than recognition of supplied words."
      ],
      "check": {
        "prompt": "Can replacing reduce with eliminate change an otherwise grammatical summary?",
        "answer": "Yes. Reduce allows a remaining amount; eliminate means remove it entirely. Choose the stronger verb only when the evidence supports complete removal."
      }
    }
  ],
  "application": "The guided sentence work builds accurate frames. The independent and assessment contexts additionally require selecting or retrieving vocabulary. Explain why a word fits the claim’s strength and combination; an impressive appearance is not evidence of appropriateness."
},
"band4-writing-grammatical-range": {
  "mode": "replace",
  "outcomes": [
    "Express reason, concession, condition and identification with controlled clauses.",
    "Revise fragments, unclear references and overloaded sentences."
  ],
  "prerequisite": "A finite clause normally has a subject and verb. A subordinate clause depends on a main clause; a relative clause modifies or identifies a noun. Range is useful when these structures communicate different relationships accurately.",
  "sections": [
    {
      "title": "Choose meaning before construction",
      "paragraphs": [
        "Reason: ‘The council extended hours because evening workers needed access.’ Concession: ‘Although hours were extended, transport still limited attendance.’ Condition: ‘The change will help if buses run late enough.’ Identification: ‘Residents who work evenings need a different arrangement.’ Each construction answers a different reasoning need.",
        "A complex sentence is not automatically advanced in quality. ‘Because transport was limited’ is a fragment in this context. ‘Because transport was limited, some residents could not attend’ supplies the main consequence. Do not combine although and but to connect the same two clauses as if both were required."
      ]
    },
    {
      "title": "Join clauses only after both are complete",
      "paragraphs": [
        "New pair: “The footpath reopened.” “The bridge remained closed.” The relationship is contrast, so “Although the footpath reopened, the bridge remained closed” is a complete sentence. Now complete “Although the museum extended its hours, ___” with a main clause, then explain what makes the result unexpected.",
        "Next check a relative head: “The visitors who need assistance ___ at reception.” Choose an appropriate plural finite verb and keep need linked to visitors. A nearby singular noun inside another phrase does not control every verb."
      ],
      "check": {
        "prompt": "Give a complete main clause and one relative-head completion.",
        "answer": "For example: “Although the museum extended its hours, some workers still could not attend.” “The visitors who need assistance wait at reception.” Both clauses have clear subjects and finite verbs. Other completions are valid if meaning and agreement remain coherent."
      }
    },
    {
      "title": "Shorten deliberately without losing a relationship",
      "paragraphs": [
        "Draft: “The route, which was a route that many people used and which was very useful, changed.” Replace repeated description with the actual relevant feature: “The busy route changed.” If a causal relationship matters, state it in a separate controlled sentence rather than hide it in modifiers.",
        "In the fresh live paragraphs, choose constructions because they express reason, concession, condition or identification. Later, retrieve one complex sentence by first writing its simple main clause. Range is useful when the reader can recover its meaning."
      ]
    },
    {
      "title": "Control agreement and reference across clauses",
      "paragraphs": [
        "‘The trial that involved three neighbourhoods was short’ has singular trial as the main subject; neighbourhoods belongs inside the relative clause. ‘The residents who attended were satisfied’ has plural residents. Read each verb with its own subject rather than the nearest noun.",
        "An unclear which can point to several ideas: ‘The council changed the room and the time, which confused staff.’ If the time change caused the problem, say so explicitly. Repetition of a precise noun can protect meaning better than a vague pronoun used to display variety."
      ]
    },
    {
      "title": "Revise for clarity, then test range",
      "paragraphs": [
        "Draft: ‘Although the trial short but it found a problem which they said should change it.’ Revision: ‘Although the trial was short, it revealed a problem with the booking system. Staff recommended revising that system before extending the service.’ The repair restores a finite verb, removes a competing conjunction and identifies the object of change.",
        "Now choose another relationship that the argument genuinely needs, such as a condition for expansion. Do not insert an inversion or participle solely to reach a grammatical quota; no such quota defines an IELTS band. Controlled variety emerges from explaining different meanings."
      ],
      "check": {
        "prompt": "Why is ‘Longer hours would help, if staffing can be maintained’ a meaningful qualification rather than empty complexity?",
        "answer": "The condition identifies a practical requirement for the benefit. The structure serves the argument; if staffing is unsupported or irrelevant, the sentence would need a different condition."
      }
    }
  ],
  "application": "Use the three sentence-building stages to preserve actual clause relationships. After a correct reconstruction, explain its meaning and write one fresh sentence with the same relationship; supplied-token success alone does not establish independent grammatical range."
},
"band4-writing-band8-essay": {
  "mode": "replace",
  "outcomes": [
    "Analyse a full essay’s position and paragraph reasoning.",
    "Compare a draft with a model by function rather than copying phrases."
  ],
  "prerequisite": "A developed essay answers the question, explains reasons and reaches a consistent conclusion. A model is an original teaching example, not an examiner-rated band. Use its reasoning functions as a guide, not a script for a different topic.",
  "sections": [
    {
      "title": "Read the argument before judging vocabulary",
      "paragraphs": [
        "Teaching prompt: Some people think councils should build more public sports facilities. Others believe money should support affordable coaching and organised activities. Discuss both views and give your opinion. The decision concerns the use of limited funds, not whether exercise is generally beneficial.",
        "A plan should give each view a fair reason: facilities create places to practise; coaching helps people use those places effectively. A position can support a balance while identifying a priority under specified conditions. ‘Both are important’ needs an explanation of how a council would decide."
      ]
    },
    {
      "title": "Build and revise one paragraph before the full model",
      "paragraphs": [
        "Use the sports prompt. Claim: existing facilities can remain underused. Complete “This may happen because ___. A beginner session could ___ by ___. However, ___.” Explain the participation barrier, a mechanism and a real condition. Do this before reading the model’s swimming example.",
        "Weak paragraph: “Coaching is good. It is useful. Sport is very important.” Keep one claim and replace the repetition with how coaching helps a particular user. Then check whether the example supports that mechanism or merely repeats the broad topic."
      ],
      "check": {
        "prompt": "Give one developed reason and a condition.",
        "answer": "For example: “Some beginners avoid a court because they do not know how to join a game. A supervised introductory session could show them the basic routine, provided staffing is available.” Other reasons work if they explain participation rather than simply praise sport."
      }
    },
    {
      "title": "Complete original model essay",
      "paragraphs": [
        "Public sport depends on both suitable places and opportunities to take part. New facilities can remove physical barriers, while affordable coaching can make existing spaces more useful. I believe councils should examine what their communities lack before deciding, rather than assume construction is always the best investment.",
        "Supporters of new facilities have a strong case where residents have nowhere safe to exercise. A growing neighbourhood without a sports ground cannot solve that shortage through coaching alone. Providing a public space may also allow different groups to organise activities at times that suit them. However, the cost includes maintenance and staffing, not simply the original building work.",
        "In areas where adequate facilities already exist, organised activities may offer a more immediate benefit. A court that stands empty for most evenings does little for people who lack confidence or do not know how to begin. Affordable introductory sessions could help them develop skills and meet others at a similar level. For example, a beginner group might make an existing swimming pool less intimidating to adults who have never learned to swim.",
        "The most effective choice therefore depends on the local barrier. Councils should first identify whether the problem is missing space, poor access or low participation in available activities. They can then fund the measure that addresses that problem and review its use after a reasonable trial. Residents should also have opportunities to explain needs that simple attendance totals may miss.",
        "In conclusion, both facilities and coaching can justify public spending, but neither is automatically the priority. Investment should respond to a demonstrated local need and include a sustainable plan for continued use."
      ]
    },
    {
      "title": "Compare the model with a weak draft",
      "paragraphs": [
        "Weak draft: ‘Sports are good for health. Facilities are important. Activities are important too. Councils should spend money because people need sport.’ It remains on the broad topic but does not develop the competing funding decisions. The model explains why a shortage of space calls for a different response from underuse of existing space.",
        "Mark the model’s functions: position, case for facilities, case for participation support, decision principle and conclusion. Then identify one example and one limitation. The example illustrates a mechanism; it is not fake research. The conclusion follows the decision principle rather than introducing a new benefit."
      ]
    },
    {
      "title": "Compare functions on a new topic without importing the solution",
      "paragraphs": [
        "For the independent funding question, write your own reasons before reopening the sports essay. Mark position, explanation, example, limitation and conclusion only where they occur. Do not assume that a local sports barrier or the model’s priority also applies to cultural events.",
        "After the volunteer-training assessment, choose one paragraph whose example fails to explain its claim and revise that connection. Later, reconstruct the decision principle of a different essay without copying the model’s phrases."
      ],
      "check": {
        "prompt": "What does a useful comparison with the model identify?",
        "answer": "A specific function missing in your own argument, such as a causal bridge or a condition. Matching paragraph count or replacing ordinary words does not by itself improve reasoning."
      }
    }
  ],
  "application": "The guided local-activity paragraph isolates repeated contact and a limitation. The independent cultural-funding essay needs both views and your own judgement. The fresh volunteer-training assessment requires a new benefit, cost and condition. Compare paragraph roles with the model while generating your own content."
},
"band4-speaking-storytelling": {
  "mode": "replace",
  "outcomes": [
    "Develop a relevant event into a coherent Part 2 long turn.",
    "Use time reference, detail and reflection without memorising a script."
  ],
  "prerequisite": "Use past simple for the main event, past progressive for background in progress and past perfect where an earlier event needs clarification. Part 2 allows one minute of preparation and up to two minutes of speech. There is no requirement to fill a fixed spoken-word count.",
  "sections": [
    {
      "title": "Choose a turning point",
      "paragraphs": [
        "A story develops when something changes. For a mistake, identify situation → expectation → mistake → response → result → reflection. For helping someone learn, identify the learner’s difficulty, your demonstration, their attempt and what changed. These sequences give the listener a reason to follow the account.",
        "Avoid beginning with every fact about the person’s life. Select detail that explains the event. A broken brake, a missed instruction or a changed meeting room is enough if you can describe what happened and why it mattered. An ordinary experience can demonstrate coherent language more effectively than an elaborate invented adventure."
      ]
    },
    {
      "title": "Select a turning point and complete its result",
      "paragraphs": [
        "New rehearsal event: a group’s labels became mixed before a small exhibition. The useful turning point is noticing that dates could restore the order. A list of every room colour would not explain how the problem changed.",
        "Partly tell “At first, ___. Then I noticed ___. We tried ___. As a result, ___. Looking back, ___.” Choose one event and keep cause and result connected. Say the first two clauses aloud before adding the whole ending."
      ],
      "check": {
        "prompt": "Repair “We fixed it and it was good” using the label event.",
        "answer": "For example: “We grouped the labels by date, which let us match each one to the correct display. Visitors could then follow the sequence.” The action explains the result instead of simply announcing success."
      }
    },
    {
      "title": "Worked development of a small problem",
      "paragraphs": [
        "Opening: ‘I helped my younger cousin learn to adjust a bicycle brake last spring.’ Background: ‘He had watched several videos, but the brake still rubbed against the wheel.’ Action: ‘I asked him to explain what he had tried, then we checked one adjustment at a time.’ Turning point: ‘He realised that tightening every screw was making the alignment worse.’ Result: ‘After loosening the correct fitting and centring the brake, he could spin the wheel freely.’ Reflection: ‘The experience reminded me that teaching works better when the learner understands the reason for a step.’",
        "Each stage develops the same incident. Past perfect marks the earlier video attempts; past simple carries the main sequence. A sentence about the cousin’s unrelated holiday would interrupt the development. The reflection explains significance rather than merely saying I was very happy."
      ]
    },
    {
      "title": "Make detail support fluency",
      "paragraphs": [
        "Use one concrete difficulty and one change in thinking. You can extend the event by explaining what you expected, what went wrong and how you checked the result. This develops a long turn without listing decorative adjectives or repeating that the event was important.",
        "Prepare notes, not a written speech: cousin / brake rubbing / videos failed / one adjustment / understood reason. During delivery, group clauses at meaning boundaries. If you lose a word, explain it in ordinary language and continue. A brief repair of a relevant fact is natural; restarting every sentence can break the story."
      ]
    },
    {
      "title": "Review speech, then test a fresh event",
      "paragraphs": [
        "Use the developed original model audio in the activity after your own response to notice organisation and pacing. It has no certified band. Listen to your recording for sequence, relevant detail, repetition and understandable endings. Ask a listener to summarise what changed in the story.",
        "Revise one target, then answer a different cue card. If the new story loses all structure unless you repeat the model’s words, the planning method needs more practice. A written narrative can show organisation, but pronunciation and fluency require actual speech."
      ],
      "check": {
        "prompt": "What does a reflection add beyond ‘That was the end’?",
        "answer": "It explains the event’s significance, such as a change in habit or understanding. It should grow from the story rather than introduce an unrelated moral or a memorised closing."
      }
    },
    {
      "title": "Repeat one unclear link before a fresh story",
      "paragraphs": [
        "Replay the moment where the listener would need to know what changed. If the action is missing, add it; if the time relationship is unclear, repair the connector. Retell only that section before attempting the live fresh-event prompt.",
        "After another speaking module, choose a different everyday turning point and tell it without the supplied frame. Use the retained model audio for comparison after your attempt; written notes alone cannot demonstrate fluency."
      ]
    }
  ],
  "application": "Use the guided small problem to practise a turning point. The independent skill-teaching story and new mistake assessment need distinct events. Use the preparation minute to plan development, then review actual delivery or clearly label written study as an alternative."
},
"band4-speaking-abstract-topics": {
  "mode": "replace",
  "outcomes": [
    "Define an abstract distinction through a practical example.",
    "Develop a qualified judgement and address a counterpoint."
  ],
  "prerequisite": "Abstract questions concern patterns such as fairness, tradition or change rather than one personal event. A concrete example can clarify the pattern, but it must be connected back to the broader claim.",
  "sections": [
    {
      "title": "Turn an abstract question into a testable distinction",
      "paragraphs": [
        "New teaching question: Should people always follow expert advice? Distinguish relevant expertise from a recommendation’s fit to the present situation. An experienced walking guide may know the usual route, while a fresh closure notice can change which route is available. The example does not establish that experience is useless.",
        "A clear opening could say “Expert advice is valuable when it concerns the relevant problem, but a decision should also account for current evidence.” This states a principle and condition rather than stopping at it depends."
      ]
    },
    {
      "title": "Build a principle, mechanism and example in stages",
      "paragraphs": [
        "Demonstration mechanism: experience helps identify problems a beginner may overlook. Illustration: a guide can explain why a route takes longer in wet conditions. Limit: an old recommendation may not include a new closure.",
        "Partly complete “Advice is useful because ___. For example, ___. However, ___ would change my decision.” Then answer the question again without the frame and without telling an unrelated long personal story."
      ],
      "check": {
        "prompt": "What is missing from “Experts are good because they are experts”?",
        "answer": "It repeats the status label without explaining how relevant knowledge improves a decision. Explain the overlooked risk, interpretive skill or evidence, then name a meaningful limitation."
      }
    },
    {
      "title": "Answer a counterpoint with a condition",
      "paragraphs": [
        "A listener objects that beginners cannot verify every claim. Recognise the difficulty, then state a practical decision principle: check whether the advice addresses the actual situation and whether new evidence conflicts with it. Do not turn the limit into “all advice should be ignored”.",
        "Weak answer: “Everyone has opinions, so no judgement is possible.” Repair it by naming what would make one recommendation more relevant. A qualified answer still needs a conclusion."
      ]
    },
    {
      "title": "Transfer to fresh abstract questions",
      "paragraphs": [
        "The live resistance, tradition and equal-treatment questions need their own concepts and examples. State the distinction in your own words, explain the mechanism and connect a concrete case back to it. The walking-guide demonstration supplies a reasoning method, not those answers.",
        "Replay for a direct answer, one developed line and an audible qualification. After another module, answer a different abstract question with no written sentence frame. A checklist does not automatically evaluate fluency or pronunciation."
      ]
    }
  ],
  "application": "The guided resistance question teaches cause plus qualification. The independent tradition question needs a decision principle. The equal-treatment assessment needs a practical distinction and a difficulty. Use different examples, and review whether each answers the actual demand."
},
"band4-speaking-pronunciation": {
  "mode": "replace",
  "outcomes": [
    "Use word stress, sentence focus and thought groups to support intelligibility.",
    "Identify and repair one delivery problem from actual speech."
  ],
  "prerequisite": "Pronunciation includes individual sounds and how words are grouped and made prominent. Intelligibility means a listener can understand the message without excessive effort. It does not require imitation of one national accent.",
  "sections": [
    {
      "title": "Word stress belongs to the word form",
      "paragraphs": [
        "Related words can move their stressed syllable: PHOtograph, phoTOGraphy, photoGRAPHic. The capital letters show possible primary stress, not a rule to shout. A changed suffix can alter the whole pronunciation pattern, so learn the spoken form with the word family rather than applying the base word’s stress automatically.",
        "Use a dictionary with audio or a qualified model when unsure, then practise the word inside a phrase. A correct isolated pronunciation may become unclear when rushed in a sentence. The aim is reliable communication, not a display of rare sounds."
      ]
    },
    {
      "title": "Increase the message while retaining its contrast",
      "paragraphs": [
        "New written or partner-read rehearsal: “Return the parcel on MONDAY, not Wednesday.” Add the place: “Return the parcel on MONDAY / at the SAME counter.” Then add a requirement: “Return the parcel on MONDAY / at the SAME counter / with the receipt.” Each extra phrase adds a fact a listener should recover.",
        "Practise one phrase at a time before the whole message. Stress highlights the changed day and unchanged place; it does not justify losing at, the or with. These are new rehearsal messages, not transcriptions of the live appointment audio."
      ],
      "check": {
        "prompt": "What should a listener be able to state after the full message?",
        "answer": "The return day, unchanged counter and required receipt. Ask for those details, not an opinion about whether the accent sounds native. A written stress mark alone cannot establish recoverable speech."
      }
    },
    {
      "title": "Hear the effect of endings and reductions",
      "paragraphs": [
        "Plural -s, past endings and negation can carry important meaning. ‘Booking is required’ differs from ‘Booking is not required’; an indistinct not may reverse the instruction for the listener. A final consonant does not need an extra full vowel after it, but it must remain recognisable where it carries the contrast.",
        "Some English words have weak forms in connected speech. Practise through a clear model without deliberately deleting words. If a listener cannot recover the rehearsal details, slow meaningful groups before experimenting with more reduction."
      ]
    },
    {
      "title": "Repair one audible contrast and transfer",
      "paragraphs": [
        "Record the new parcel message, then ask whether the day, place and item can be recovered. Choose one issue: unclear word, misplaced focus or a pause breaking a phrase. Repeat that short group, then use a different message with no written stress marks.",
        "For the live changed-appointment and workshop tasks, preserve only facts actually given in their prompts and recordings. Do not invent a clinic or extra equipment. Written-study mode is preparation; actual speech and a listener or qualified reviewer are needed to judge intelligibility."
      ],
      "check": {
        "prompt": "How would you practise a missed negative in “Booking is not required”?",
        "answer": "Rehearse the full phrase while retaining not clearly enough to recover the permission meaning. Then test a new required/not-required message. The repair concerns the practical contrast, not volume on every word."
      }
    }
  ],
  "application": "The guided model supports imitation of meaning groups. The independent changed-appointment message tests new focus, and the fresh workshop assessment tests supply versus obligation. Replay your own speech and identify a specific repair; do not assign a band from a written checklist."
},
"band4-grammar-inversion": {
  "mode": "replace",
  "outcomes": [
    "Construct negative-fronted inversion with the correct auxiliary.",
    "Use a cleft to focus information without changing the event."
  ],
  "prerequisite": "Ordinary statement order places the subject before its finite verb or auxiliary. Inversion changes that order in particular constructions. It is an optional resource for emphasis, not a requirement for a high IELTS result.",
  "sections": [
    {
      "title": "Negative fronting changes the clause frame",
      "paragraphs": [
        "Ordinary: ‘I had hardly entered when the alarm sounded.’ Fronted: ‘Hardly had I entered when the alarm sounded.’ Moving hardly to the front of this construction places had before I. The earlier event uses past perfect; the following when-clause gives the next past event. ‘Hardly I had entered’ leaves the ordinary order after a fronted limiting expression.",
        "With no auxiliary in the ordinary present or past statement, do-support supplies one: ‘We rarely see this problem’ → ‘Rarely do we see this problem.’ ‘She never expected that result’ → ‘Never did she expect that result.’ Do or did carries tense, leaving the lexical verb in base form. Do not write ‘Never did she expected’."
      ]
    },
    {
      "title": "Build a fronted clause with the auxiliary supplied",
      "paragraphs": [
        "Ordinary account: “We had rarely seen the hall so full.” Fronted account: “Rarely had we seen the hall so full.” Move the negative-frequency expression first, then place the existing auxiliary before the subject. Seen remains the participle; the event and its rarity stay the same.",
        "Now complete “I understood the instruction only then” → “Only then ___ I ___ the instruction.” No auxiliary exists in the ordinary past-simple clause, so add did and restore the lexical base form. Do not write did understood."
      ],
      "check": {
        "prompt": "Complete the transformation and explain why fronting is optional.",
        "answer": "Did / understand. The fronted frame adds emphasis; the ordinary sentence is already grammatical and may be clearer in a plain account. Complexity is a communication choice."
      }
    },
    {
      "title": "Choose the focus before a cleft",
      "paragraphs": [
        "“Rina corrected the label yesterday.” For who, use “It was Rina who corrected the label.” For when, use “It was yesterday that Rina corrected the label.” Partly complete a cleft focusing the object, then compare what the listener notices."
      ],
      "check": {
        "prompt": "Give an object-focused cleft and identify the retained meaning.",
        "answer": "“It was the label that Rina corrected yesterday.” Keep the actor, object and time. After the live transformations, retrieve a new ordinary clause and decide whether emphasis is useful before fronting it."
      }
    },
    {
      "title": "Keep the meaning and the companion construction",
      "paragraphs": [
        "‘Not only did the change reduce delays, but it also improved access’ uses inversion in the fronted first clause. The second clause retains its ordinary statement frame. ‘Only after the inspection did staff reopen the room’ places the time restriction first; the reopening follows the inspection. Moving only can change what is restricted, so check the intended focus.",
        "No sooner...than and hardly...when are established patterns in past sequencing. Learn the complete relationship rather than mixing their partners indiscriminately. These forms can sound marked in everyday answers; a simple before or after clause may be clearer when no emphasis is needed."
      ]
    },
    {
      "title": "Cleft sentences identify the focus",
      "paragraphs": [
        "Ordinary: ‘The lack of notice caused the difficulty.’ Cleft: ‘It was the lack of notice that caused the difficulty.’ The structure it + be + focused information + that-clause highlights the cause, perhaps contrasting it with price or timing. It does not establish a new cause beyond the original evidence.",
        "A what-cleft can focus a need: ‘What residents needed was clearer information.’ The what-clause acts as a unit; the complement identifies the need. Do not add words merely to lengthen an essay. Choose a cleft when the contrast or focus helps the reader understand the point."
      ]
    },
    {
      "title": "Edit for control, not display",
      "paragraphs": [
        "Incorrect: ‘Hardly had I enter when the alarm sounded.’ Improved: ‘Hardly had I entered when the alarm sounded.’ Had requires the past participle. Incorrect: ‘It was the price that they changed the venue’ leaves the relation unclear. If price caused the decision, ‘It was the price that led them to change the venue’ supplies that causal link.",
        "After reconstructing an inversion, rewrite it in ordinary order to verify the event and time. If you cannot explain the focus difference, use the simpler version in independent writing until control improves. No quota of inversions or clefts establishes an examination band."
      ],
      "check": {
        "prompt": "Convert ‘We did not understand the problem until we read the report’ with Only after.",
        "answer": "Only after we read the report did we understand the problem. Did carries the past marking; understand stays base. The sentence preserves the report as the point after which understanding occurred."
      }
    }
  ],
  "application": "The sentence-building stages isolate inversion and cleft focus in fresh clauses. Check the auxiliary, lexical form and connector, then explain the ordinary-order equivalent. Retain clear simple forms when the communicative situation does not need extra emphasis."
},
"band4-grammar-participles": {
  "mode": "replace",
  "outcomes": [
    "Construct participle clauses with an unambiguous understood subject.",
    "Distinguish simultaneous, earlier and passive relationships."
  ],
  "prerequisite": "A participle clause is non-finite: its verb form does not independently locate tense in the same way as a main finite verb. In the ordinary initial adverbial patterns taught here, its understood subject should match the main clause’s subject.",
  "sections": [
    {
      "title": "Find who performs each action",
      "paragraphs": [
        "‘Walking to the station, Maya noticed the new sign’ means Maya was walking and Maya noticed. ‘Walking to the station, the rain began’ wrongly suggests the rain was walking. Repair it with a full clause when subjects differ: ‘While Maya was walking to the station, the rain began.’ Shortening is useful only when it preserves a clear relationship.",
        "A shared subject is necessary in these patterns, but not sufficient to express every intended meaning. ‘Opening the door, the room became noisy’ does not clearly identify an actor opening the door. Use ‘When the staff opened the door, noise entered the room’ if those are the intended actors and events."
      ]
    },
    {
      "title": "Match the actor before choosing a reduced form",
      "paragraphs": [
        "New pair: “While Mina checked the list, Mina noticed a missing name.” Same actor permits “Checking the list, Mina noticed a missing name.” Compare “While Mina checked the list, the phone rang.” The actors differ; “Checking the list, the phone rang” falsely makes the phone the checker.",
        "Partly reduce “After the volunteers had locked the gate, they returned the key” → “Having ___, the volunteers ___.” Keep the earlier completed action and shared actor. If reduction makes the actor unclear, retain the full clause."
      ],
      "check": {
        "prompt": "Complete the reduction and explain when the full form is preferable.",
        "answer": "“Having locked the gate, the volunteers returned the key.” Keep the full after-clause when actors differ or the reduced phrase would be ambiguous. Shorter is not automatically better."
      }
    },
    {
      "title": "Check voice and logic after shortening",
      "paragraphs": [
        "“Damaged during the storm, the sign was replaced” describes the sign as affected. Before choosing an -ing or participle form, name whether the subject does or receives the action.",
        "For fresh sentences, reconstruct the full version after reduction. Verify actor, sequence, cause and voice. Later, write a sentence that should remain unreduced and explain the ambiguity a shorter form would create."
      ]
    },
    {
      "title": "Choose the participle form for the relationship",
      "paragraphs": [
        "An -ing clause can give overlapping activity or a reason: ‘Checking the figures, the researcher noticed a discrepancy.’ Having + past participle marks an earlier completed action: ‘Having checked the figures, the researcher revised the report.’ The main clause supplies the narrative time; having checked establishes sequence relative to it.",
        "A passive participle can describe an affected subject: ‘Designed for beginners, the workshop introduces basic tools.’ The workshop was designed; it did not design someone else. ‘Having been checked, the equipment was ready for use’ gives an earlier passive process. Keep the meaning clear rather than choosing the longest form."
      ]
    },
    {
      "title": "Preserve logic when reducing a clause",
      "paragraphs": [
        "Full form: ‘Because the organisers had received few replies, they postponed the meeting.’ Reduced form: ‘Having received few replies, the organisers postponed the meeting.’ Organisers receive and postpone, so the subject relationship is clear. Full form: ‘Because few people replied, the organisers postponed the meeting’ has different subjects; reducing it to ‘Having replied, the organisers...’ changes the event.",
        "A participle clause can leave the precise relationship implicit. If a reader might confuse reason with time, retain because or after in a full clause. Concision is not an improvement when the causal link becomes ambiguous."
      ]
    },
    {
      "title": "Check the first main-clause noun",
      "paragraphs": [
        "After an introductory participle clause, inspect the main subject immediately. Ask whether that subject can perform or undergo the participle event. Incorrect: ‘Having inspected the building, several faults were found.’ Improved: ‘Having inspected the building, the engineer found several faults.’ Or retain a full passive account: ‘After the building was inspected, several faults were found.’",
        "In an essay or letter, use participle clauses sparingly and only where they make reference clearer. Sentence-building practice demonstrates control of a supplied structure; independent writing also requires deciding whether a full clause would serve the reader better."
      ],
      "check": {
        "prompt": "Explain ‘Having missed the bus, the appointment was delayed.’ How can it be repaired?",
        "answer": "The appointment did not miss the bus. One repair is ‘Because I missed the bus, my arrival at the appointment was delayed.’ A shared-subject version is ‘Having missed the bus, I arrived late for the appointment.’"
      }
    }
  ],
  "application": "The guided, independent and fresh sentence sets require correct subject alignment and sequence. Before submitting, name the actor of both clauses. After feedback, write a full-clause version to confirm that the reduced form has preserved the intended event."
},
"band4-vocab-awl4": {
  "mode": "replace",
  "outcomes": [
    "Retrieve collocations that preserve a claim’s strength.",
    "Distinguish an observation, inference, concern and formal complaint."
  ],
  "prerequisite": "This lesson teaches selected useful vocabulary in context; it is not a verified Academic Word List sublist inventory. Learn words with their complements and evidential force, not as a numbered collection of supposedly high-scoring expressions.",
  "sections": [
    {
      "title": "Vocabulary encodes what the evidence permits",
      "paragraphs": [
        "Observe can report what was seen or measured. Suggest or indicate can point toward a possible interpretation. Establish or demonstrate can express stronger support in an appropriate context. Prove and guarantee should not replace cautious verbs simply because they sound forceful. A pilot that indicates a benefit can still leave causation unresolved.",
        "‘Draw a conclusion from the findings’ identifies an inference, while ‘collect data’ identifies the material used to investigate. A conclusion is not the same as raw data. Keeping these roles separate helps both reading and argument writing: describe what was measured before evaluating what follows."
      ]
    },
    {
      "title": "Retrieve the complete collocation",
      "paragraphs": [
        "Use raise a concern about a problem, seek clarification of a rule, meet a requirement and reach an agreement. The verb combines with the noun conventionally. ‘Do a concern’ is not the ordinary expression. A complement can matter as much as the verb: comply with a requirement, not normally comply a requirement.",
        "A workplace concern can request clarification without becoming a formal complaint. ‘Could you clarify the new booking rule?’ seeks information. ‘I wish to make a formal complaint about repeated cancellations’ performs a stronger action. Choose the form that matches the actual purpose and relationship."
      ]
    },
    {
      "title": "Choose the speech action before its phrase",
      "paragraphs": [
        "New scenarios: a rule is unclear; a possible problem needs attention; a promised service has repeatedly failed and the writer explicitly wants a formal complaint recorded. Completed first choice → seek clarification. Finish the second and third with natural phrases, then explain the difference in force.",
        "“Could you clarify the collection time?” seeks information. “I wish to make a formal complaint” performs a stronger action that must match the intended purpose. Do not escalate a request just to display vocabulary."
      ],
      "check": {
        "prompt": "Supply suitable phrases and complements.",
        "answer": "Raise a concern about the possible problem; make a formal complaint about repeated failures. Other natural forms can fit. The complement identifies the issue, and the context determines the force."
      }
    },
    {
      "title": "Worked precision review",
      "paragraphs": [
        "Source: ‘After a short trial, users reported shorter waits. The team has not compared other explanations and will collect more data.’ A faithful sentence is ‘The pilot indicates a possible improvement, but further evidence is needed before a causal conclusion is drawn.’ ‘The pilot guarantees shorter waits for all users’ removes uncertainty and widens scope.",
        "To learn the expression, cover it and retrieve it from a new context. For example, a confusing timetable may call for seek clarification, while a failure to provide a promised service may justify raise a concern. Explain the purpose before choosing the phrase; several natural expressions may fit where the task explicitly accepts them."
      ],
      "check": {
        "prompt": "Why is ‘reach a conclusion’ not a licence to treat that conclusion as proven?",
        "answer": "The collocation describes arriving at a judgement. Its reliability still depends on the evidence and reasoning. Natural phrase choice and justified certainty are separate requirements."
      }
    },
    {
      "title": "Withdraw the scenario labels",
      "paragraphs": [
        "Write a new sentence using meet a requirement, comply with a rule or reach an agreement without a supplied verb. Then replace one overconfident inference with source-supported wording. Review collocation and evidential strength separately.",
        "After another vocabulary lesson, retrieve a whole phrase from a real communication need. A natural collocation does not make an unsupported conclusion true."
      ]
    }
  ],
  "application": "Distinguish an observation from an inference and retrieve natural expressions in new situations. After checking, create a different complete message with the same phrase and explain its intended force."
},
"band4-vocab-science": {
  "mode": "replace",
  "outcomes": [
    "Use research vocabulary with accurate grammatical roles.",
    "Distinguish sample, method, outcome and limitation in a general-interest account."
  ],
  "prerequisite": "A study investigates a question using a method. A sample is the set of cases or participants examined. An outcome is what is measured or observed. These language concepts support reading; the fictional examples are not scientific or medical advice.",
  "sections": [
    {
      "title": "Give the research nouns distinct jobs",
      "paragraphs": [
        "Researchers collect data, analyse results and interpret findings. A method describes how evidence is obtained; a conclusion describes what the authors think follows. A limitation restricts what the study can establish. Do not use finding and hypothesis as automatic synonyms: a hypothesis is a proposed explanation or expectation to be investigated.",
        "Word families change syntax: analyse is a verb, analysis a noun and analytical an adjective. ‘The team analysed the results’ cannot become ‘The team analysis the results.’ ‘A detailed analysis’ needs the noun; ‘an analytical approach’ uses the adjective before a noun head."
      ]
    },
    {
      "title": "Classify the job of a research statement",
      "paragraphs": [
        "New illustrative study: a team predicts that seedlings near a window will grow taller. It measures plants at two light levels for four weeks and records height differences. Prediction → hypothesis; procedure → method; observed difference → finding. The finding alone does not exclude every alternative explanation.",
        "Partly complete “The researchers ___ growth weekly (MEASURE). Their ___ covered four weeks (OBSERVE).” Choose a finite verb and noun from the sentence roles, then describe a limitation without inventing results."
      ],
      "check": {
        "prompt": "Complete both forms and distinguish hypothesis from conclusion.",
        "answer": "Measured / observation, or observations if repeated records are intended. A tightly controlled checked item needs a number cue to distinguish the latter choices. The hypothesis is the prior prediction; a conclusion interprets what findings support."
      }
    },
    {
      "title": "Retrieve a research word through its role",
      "paragraphs": [
        "Close the labels and explain method, finding and limitation from another short account. In live tasks, use the actual measured outcome rather than a general impression that one method is better.",
        "After another module, produce a new sentence using reliable or reliability and explain its frame. A relevant technical word helps when its role and evidence are clear."
      ]
    },
    {
      "title": "Compare the actual measured outcome",
      "paragraphs": [
        "Source: ‘One group received a date reminder; another received a reminder with a change-booking link. More people in the second group attended or rescheduled. The groups were not assigned randomly.’ The measured outcome combines attendance and rescheduling. A summary saying more people attended alone changes it. A summary claiming treatment success introduces a different intervention entirely.",
        "Association means two features occur together in the observed account. Causation means one produces the other. Non-random groups may differ before the intervention, so the source can recommend a stronger comparison without dismissing the initial observation. Retain may, suggests and further investigation where the writer uses them."
      ]
    },
    {
      "title": "Use precision in your own sentence",
      "paragraphs": [
        "‘The results suggest a possible association’ is cautious. ‘The results prove the mechanism universally’ needs much stronger support. ‘A representative sample’ describes coverage of a population; it should not be claimed merely because a study has many participants. A large but narrow group can still leave important people out.",
        "After feedback, record the word’s contextual meaning, grammar and one natural partner: conduct a study, collect evidence, analyse data, acknowledge a limitation. Then retrieve it in a fresh sentence rather than copying a glossary definition alone."
      ],
      "check": {
        "prompt": "Why is ‘The researchs were reliable’ unsuitable in ordinary academic reporting?",
        "answer": "Research is normally uncountable in that use. Say ‘The research was reliable’ or ‘The studies were reliable’, depending on whether you mean the activity/evidence or separate investigations. Reliability itself still needs support from context."
      }
    }
  ],
  "application": "Use source-bound reading in the guided stage and contextual selection/retrieval in later stages. Check both vocabulary form and the study’s actual outcome. No external specialist knowledge is needed to justify the task answers."
},
"band4-vocab-globalization": {
  "mode": "replace",
  "outcomes": [
    "Use globalisation vocabulary to explain a mechanism and trade-off.",
    "Preserve the scale and certainty of a source when paraphrasing."
  ],
  "prerequisite": "Globalisation concerns connections across countries in areas such as trade, production and communication. A supply chain links stages in producing and delivering goods. The examples below are hypothetical language practice, not claims about a particular economy.",
  "sections": [
    {
      "title": "Explain the term through a relationship",
      "paragraphs": [
        "‘A company sources components from several countries’ describes where inputs come from. ‘It outsources a service’ describes transferring that work to another provider, which need not always be overseas. ‘It relocates production’ describes a change in where production occurs. Similar business topics do not make these expressions identical.",
        "An interdependent system links participants: a delay at one stage may affect later stages. This can be explained without declaring that international trade is always harmful or beneficial. Choose a mechanism and the group affected before evaluating the result."
      ]
    },
    {
      "title": "Select the relationship that defines a term",
      "paragraphs": [
        "New scenarios: a café buys flour from a nearby mill; a company buys the same ingredient from abroad; a company moves production back to its home country. The second illustrates international sourcing; the third can illustrate reshoring. A foreign name alone does not establish production location.",
        "Partly explain “A lower purchase price does not guarantee lower total cost because ___.” Supply a mechanism such as delivery, damage or coordination, then name the information needed to compare totals."
      ],
      "check": {
        "prompt": "Complete a cautious explanation without assuming every distant order is worse.",
        "answer": "For example: “Transport and handling can add costs absent from the quoted item price.” Totals require relevant amounts and quantities. Distant supply is not automatically cheaper or more expensive in every case."
      }
    },
    {
      "title": "Retrieve a mechanism on a fresh source",
      "paragraphs": [
        "For live passages, distinguish unit price, additional costs and total cost. Where the source offers several additional costs, a response can name a supported one within the word limit. Check whether the question requests one supported cost or every cost before deciding how much to include.",
        "Later, describe one trade-off without a dramatic global claim. Explain its mechanism and condition before choosing a term such as outsourcing or reshoring."
      ]
    },
    {
      "title": "Develop a balanced claim",
      "paragraphs": [
        "Worked paragraph: ‘International sourcing can give a producer access to specialised components. However, dependence on a distant supplier may create difficulties if transport is disrupted. Holding some essential stock or using more than one suitable supplier could reduce that risk, although either measure may add cost.’ The paragraph supplies benefit, risk, response and limitation.",
        "The modals preserve possibility. ‘Globalisation always destroys local businesses’ is a universal claim that this example does not establish. ‘Every business benefits equally’ is equally unsupported. Advanced vocabulary should make differences between cases more visible, not hide them behind broad assertions."
      ]
    },
    {
      "title": "Collocation, register and scope",
      "paragraphs": [
        "Useful combinations include international trade, local employment, cultural exchange, access to markets and dependence on imports. Check prepositions and noun roles. ‘Access to a market’ differs from ‘an increase in sales’; gaining access does not guarantee a sale. ‘Cultural exchange’ does not automatically mean the loss of every local tradition.",
        "When paraphrasing, retain country, company, period and certainty. A source about one trial supplier cannot justify a conclusion about every national industry. After checking the activity, write a new sentence with the chosen expression and explain the specific relationship it communicates."
      ],
      "check": {
        "prompt": "Does outsourcing always mean moving work to another country?",
        "answer": "No. It means using an external provider for work; that provider can be domestic or overseas. If location matters, state it explicitly rather than assuming the term settles it."
      }
    }
  ],
  "application": "Use the guided evidence passage and later contextual vocabulary tasks to preserve meaning, scope and natural combination. Retrieve the expression from the new source; do not select a long word simply because the module concerns a complex topic."
},
"band4-vocab-idioms": {
  "mode": "replace",
  "outcomes": [
    "Use natural multiword expressions only where their meaning fits.",
    "Paraphrase an unavailable term without losing the point."
  ],
  "prerequisite": "An idiom has a conventional figurative meaning, while many useful collocations are more literal. Neither is a compulsory decoration. Spoken vocabulary should help a listener understand the intended experience or judgement.",
  "sections": [
    {
      "title": "Meaning comes before display",
      "paragraphs": [
        "‘We were on the same page’ can mean we shared an understanding. It is unsuitable if the people merely occupied the same room but disagreed about the plan. ‘I weighed the pros and cons’ describes considering benefits and drawbacks; it needs an actual decision context. Inserting either phrase into every answer can make the message less natural.",
        "Ordinary precise language is often enough. ‘I compared the cost with the amount of supervised practice’ explains the decision more clearly than a memorised string of expressions. A familiar expression used accurately is more useful than a rare one with an uncertain meaning or register."
      ]
    },
    {
      "title": "Choose an expression because its meaning fits",
      "paragraphs": [
        "New rehearsal: a student reaches a decision after comparing two options. “I made up my mind” expresses that decision. “I was over the moon” expresses strong happiness, a different claim. An idiom should not replace the message merely because it sounds colourful.",
        "Partly develop “I chose ___ because ___. The deciding factor was ___.” Then decide whether an idiom adds anything. A clear literal explanation is valid; idioms are optional."
      ],
      "check": {
        "prompt": "Why is “I was over the moon” insufficient as an answer about how a decision was made?",
        "answer": "It describes emotion but not options, criterion or reasoning. Add the decision and its cause before considering figurative wording."
      }
    },
    {
      "title": "Explain a missing word and continue",
      "paragraphs": [
        "If tripod is unavailable, try “the stand with three legs that holds a camera”. Give category, distinguishing feature and function. Explain another object without its name, then ask a listener what they understood.",
        "Replay live answers for a clear decision, reason and successful explanation of missing terms. Later, repeat with a different object. A written explanation is planning; actual speech provides communication evidence."
      ]
    },
    {
      "title": "Develop a decision rather than list expressions",
      "paragraphs": [
        "Worked response: ‘I took time to compare the courses because the cheapest one did not include practical sessions. The longer course cost more, but I would receive feedback while trying the skill. I chose it because that support mattered more to me than finishing quickly.’ The verbs compare, include, receive and choose build a connected account without idioms.",
        "An idiom could fit if it adds a natural emphasis: ‘I did not want to rush into a decision.’ But ‘It was a piece of cake’ would not communicate the careful trade-off unless the decision was actually easy. Keep the degree and evaluation consistent with your story."
      ]
    },
    {
      "title": "Use circumlocution as a communication skill",
      "paragraphs": [
        "If you forget timetable, say ‘a plan showing what I need to do each day’. If you forget supervised, say ‘with someone checking my work as I practise’. A clear explanation can preserve meaning better than stopping to search for an impressive word. Avoid changing the concept: teacher feedback is not the same as an official score.",
        "Replay an answer and identify expressions that genuinely help. Remove any phrase that sounds disconnected from your normal sentence structure. Then answer a fresh question using the same decision or explanation method with different vocabulary. A text plan cannot demonstrate how naturally the expression was delivered."
      ],
      "check": {
        "prompt": "Why might ‘It was a piece of cake’ conflict with an account of a difficult decision requiring several days of comparison?",
        "answer": "The idiom normally presents something as easy. Unless the speaker explicitly contrasts stages, it can contradict the difficulty described. Use a phrase that preserves the actual judgement."
      }
    }
  ],
  "application": "The guided decision, independent habit and fresh advice question require precise ordinary language. An idiom is optional. Develop the reason and limitation first, then review actual speech for appropriateness and intelligibility."
},
"band4-mock-ielts-listening": {
  "mode": "replace",
  "outcomes": [
    "Switch appropriately between plan labelling, lecture notes and announcement actions.",
    "Identify the evidence relationship required by each question type."
  ],
  "prerequisite": "Use the direction methods from shared map practice and the cause/qualification methods from earlier listening lessons. This mixed lesson checkpoint is not the separate Mock Exam and does not reproduce a full official paper.",
  "sections": [
    {
      "title": "Choose a method for the task",
      "paragraphs": [
        "For a plan, locate fixed reference points and update the traveller’s direction. For a lecture, record definitions, mechanisms, examples and limitations. For an announcement, separate change, continuity and required action. One rule such as choose the final number cannot answer all these demands.",
        "Before playback, inspect the question format. A plan label needs a location; a note-completion gap may need a process or noun; a multiple-choice question may ask purpose or attitude. Predict the category and relationship, not the answer itself."
      ]
    },
    {
      "title": "Choose the procedure before the detail",
      "paragraphs": [
        "Retrieve the procedure: a room on a plan → orient and trace; a corrected booking time → update status; an explanation → organise mechanism and limit. “Listen for the last word” cannot cover all three.",
        "New written rehearsal: “Enter from the west, walk east to the desk, then turn left. The session starts at eleven; call before ten if you cannot attend.” Complete facing after turn → ___; event time → ___; conditional contact deadline → ___."
      ],
      "check": {
        "prompt": "Complete the record and distinguish contact from event time.",
        "answer": "North / eleven / before ten. Call names the deadline action; starts names the event. West entrance means east-facing before the left turn."
      }
    },
    {
      "title": "Switch procedure on new audio",
      "paragraphs": [
        "Use the first live plan’s actual orientation, then select your own notes for the explanation. A deadline answer needs the time attached to the contact action, not the clearest number.",
        "After feedback, record orientation, status or hierarchy as the error cause. Revisit different audio with the same demand later. This mixed lesson checkpoint is not a full forty-question IELTS Listening test."
      ]
    },
    {
      "title": "Work a fresh plan example",
      "paragraphs": [
        "Teaching plan: a visitor enters from the west and faces east into a central hall. A workshop is north of the hall; storage is south. The speaker says, ‘Turn left for the workshop. Storage remains on your right.’ Left is north from this approach, not always west. The route depends on starting orientation.",
        "If the speaker adds ‘The former café now houses storage’, current labelling needs storage. A historical name can be a distractor without being a false statement. After a direction, verify the landmark and neighbouring space rather than relying on one remembered preposition. The activity’s actual plan uses different facts and must be read independently."
      ]
    },
    {
      "title": "Switch to an explanatory hierarchy",
      "paragraphs": [
        "A talk might describe an intervention, its intended effect and a practical limit. Put the example beneath the claim it illustrates. ‘Shaded paving stayed cooler, but the test covered only one site’ supports a local observation with a scope limit, not a universal design rule.",
        "For the announcement assessment, attach deadlines to their actions. An event date, response deadline and opening time can all be true. Review each missed answer by naming the task-specific failure: orientation, copied word, mechanism, attribution or action status. Then practise that step on unfamiliar audio."
      ],
      "check": {
        "prompt": "Why does listening to the end not guarantee that the last place named is the correct map label?",
        "answer": "The final place may be a landmark, old location or next destination. The question’s target and the route relationships determine the label, not word order alone."
      }
    }
  ],
  "application": "The guided plan/hours recording has four checked responses; use its unlabelled visual. The independent academic talk needs structured notes, and the fresh announcement needs an action record. These are separate skills within one cycle; completion is local practice evidence."
},
"band4-mock-toefl-reading": {
  "mode": "replace",
  "outcomes": [
    "Select a reading method according to detail, condition or evaluation demand.",
    "Justify a mixed-question answer with a precise source claim."
  ],
  "prerequisite": "Use source evidence to distinguish facts, instructions and evaluation. Practical texts may contain conditions and exceptions; longer arguments may qualify a conclusion. This mixed General Training checkpoint is shorter than a complete examination.",
  "sections": [
    {
      "title": "Map the source before switching question types",
      "paragraphs": [
        "A practical notice can be mapped as audience / eligibility / action / deadline / exception. A general-interest passage can be mapped as situation / proposal / evidence / qualification / conclusion. These maps help locate answers but do not replace close reading of the decisive clause.",
        "A question about the reason for a change needs a causal explanation. A question about what a reader must do needs an instruction. A question about the writer’s position needs an evaluation. The same sentence can contribute to more than one question, but the response must match the requested relationship."
      ]
    },
    {
      "title": "Switch demand with one fact already located",
      "paragraphs": [
        "New source: “The community workshop lends tools to trained members. Guests may attend demonstrations but cannot borrow equipment. Repairs to borrowed tools must be reported before return.” Completed audience rule → trained members may borrow. Finish guest permission → ___; guest restriction → ___; report deadline → ___.",
        "A detail question asks who may borrow; a condition question asks whether a guest is eligible; a purpose question asks why reporting is included. The same text requires different relationships."
      ],
      "check": {
        "prompt": "Complete the notes and distinguish before return from a calendar date.",
        "answer": "Attend demonstrations / cannot borrow / before return. The deadline is relative to an action, not a supplied weekday. Do not invent a date because notices often contain one."
      }
    },
    {
      "title": "Worked mixed evidence",
      "paragraphs": [
        "Source: ‘Volunteers map drinking fountains using an old list. A location is marked verified only after a recent visit. Reports of faults are checked before an update. The organisers advise carrying water on longer walks because conditions may change.’ Detail: verification needs a visit. Procedure: a report is not automatically published. Overall position: the map is useful assistance, not a guarantee.",
        "‘Every fountain will work when a walker arrives’ exceeds the source. ‘The organisers reject all public reports’ reverses their checking process. ‘The map provides no help’ discards the useful-assistance judgement. A supported summary retains both practical value and limits."
      ]
    },
    {
      "title": "Review the evidence chain",
      "paragraphs": [
        "For every wrong answer, record question demand → source clause → your interpretation → corrected interpretation. If the source does not discuss a proposed outcome, do not treat missing information as proof of the opposite. A condition after only or unless can change the action for a particular reader.",
        "Repeat with a new text using the same reasoning step. Correct results on a small familiar bank do not establish an IELTS band or full-test speed. Preserve the distinction between learning a procedure and demonstrating it under unfamiliar complete-test conditions."
      ],
      "check": {
        "prompt": "Does checking user reports before publishing mean reports are ignored?",
        "answer": "No. Checking is a verification step. Ignored means not considered, which the described review process contradicts."
      }
    },
    {
      "title": "Retrieve a procedure on a fresh paragraph",
      "paragraphs": [
        "After the mixed sources, explain one summary option’s lost qualification and one practical answer’s condition. Create a new question about another paragraph and identify whether it asks for detail, judgement or procedure.",
        "Return later without the map and reconstruct the evidence chain. Remembered answers on a small bank do not establish a full-test band or speed."
      ]
    }
  ],
  "application": "Use the guided, independent and assessment passages as separate General Training evidence contexts. Explain each summary’s qualification and each practical answer’s condition before a new source."
},
"band4-exam-day-strategies": c(["Separate confirmed booking requirements from assumptions.","Construct a realistic contingency plan and communicate what still needs checking."],
 "This module concerns logistical preparation, not a language score. Test-provider instructions govern identification, arrival, venue and delivery details for a particular booking. The course should not invent those requirements for you.",[
 s("Use three evidence categories",`Confirmed means a requirement is explicitly stated in the relevant booking or provider guidance. To verify means a detail remains unclear or absent. Personal plan means an action you choose, such as checking a route or packing permitted items. Mixing these categories can turn sensible advice into a false official rule.

Example: ‘My booking gives an arrival time’ is confirmed only if you actually have that instruction. ‘I will check the entrance before travelling’ is a personal action. ‘I need to confirm whether my identification matches the booking requirements’ is an unresolved check. If you have no booking, label the entire scenario hypothetical instead of inventing a document.`),
 s("Build a contingency with a trigger and action",`A contingency is not a promise that a problem cannot happen. It connects a trigger to a response: if the first train is cancelled, check the planned alternative and follow the provider’s contact instructions where necessary. A travel buffer is your planning choice; it does not override a stated latest arrival time or guarantee acceptance if late.

Worked record: requirement source—booking email; known detail—specified venue and arrival instruction; personal action—check travel and entrance; unresolved detail—delivery-specific permitted items; contingency—use an alternative route and consult the provider if disruption affects arrival. The record keeps source and assumption visible.`),
 s("Plan the final preparation realistically",`Choose a limited revision task that does not depend on learning an entire new system at the last moment. For example, review one evidence-tracking error and the location of essential booking information. A long checklist that cannot be completed may increase confusion rather than readiness.

In the writing and spoken reflection, explain why each step exists. ‘Check the route’ becomes more useful when linked to an unfamiliar entrance or a known transfer. Avoid prescribing universal identification documents, arrival minutes or test-centre rules. Those are booking-specific facts that must be verified from the actual provider.`,{prompt:"Why is ‘I will arrive early, therefore the provider must admit me’ an unsupported conclusion?",answer:"A personal plan does not determine the provider’s admission rules or whether other requirements are met. State the plan separately and verify the applicable booking conditions."})
 ],"The guided task separates confirmed and unknown details. The independent final-day plan adds a travel contingency and preparation limit. The spoken assessment explains a disruption response while identifying what still needs verification. None of these outcomes establishes an examination band."),
"band4-review": {
  "mode": "replace",
  "outcomes": [
    "Build a four-skill evidence review without hiding unassessed performance.",
    "Connect a diagnosed error to revision and a fresh test."
  ],
  "prerequisite": "Keep actual checked responses, written drafts and speech where available. Listening, Reading, General Training Writing and Speaking need different evidence. Completion and XP retain value as engagement, but are not calibrated proficiency results.",
  "sections": [
    {
      "title": "Make every review claim traceable",
      "paragraphs": [
        "Use task / observed difficulty / supporting evidence / correction / next check. Listening example: selected the first time / later correction changed it / revised the arrangement / new recording with competing times. Reading example: overlooked unless / exception changed eligibility / corrected the action / new notice with a different exception.",
        "Writing needs the actual text: a letter may omit a required point despite adequate length; an essay may list views without developing a judgement. Speaking needs actual speech for delivery and, where relevant, interaction. A well-written plan cannot establish pronunciation or spontaneous fluency. Mark missing speech as unassessed rather than converting a text result into a spoken claim."
      ]
    },
    {
      "title": "Complete a portfolio entry from actual evidence",
      "paragraphs": [
        "Completed record: letter asks for a repair but gives no availability / recipient cannot arrange a visit / add a clear available period and ask for confirmation / fresh letter with another practical request. This improves actionability rather than merely increasing length.",
        "Partial record: a spoken story gives a result but no action explaining it / quote ___ / add ___ / record ___ / ask a listener ___. Complete it from actual work, marking unavailable speech evidence unassessed."
      ],
      "check": {
        "prompt": "What could a focused fresh check establish?",
        "answer": "Whether a new response contains the missing action and whether a listener can follow the sequence. It would not establish an official Speaking band or performance on every task."
      }
    },
    {
      "title": "Retrieve an earlier correction after a delay",
      "paragraphs": [
        "Choose a previous condition, reference, agreement or numerical error. Explain its cause from memory, then apply the correction to a different source. Compare the target feature and record unresolved issues.",
        "Use qualified human feedback for persistent writing or speech problems. Keep completion, local accuracy, self-review and external assessment separate. Name one response, one revision and one fresh test rather than a general promise to study harder."
      ]
    },
    {
      "title": "Choose a specific revision target",
      "paragraphs": [
        "A useful target is narrow enough to practise: distinguish collection and return deadlines, develop the mechanism after an essay claim, or make the changed day audible in an appointment message. ‘Reach a high band’ is a goal but not a practice action. Explain what you will do and what evidence would show improvement.",
        "Keep before and after responses. If a new paragraph explains the causal bridge more clearly, quote that change. If a listener can now identify the day, note which phrasing repair helped. Self-review can be incomplete, so ask a qualified reviewer a focused question when writing quality or intelligibility matters."
      ]
    },
    {
      "title": "Test transfer and preserve limits",
      "paragraphs": [
        "After revising, choose unfamiliar material with the same demand. A new letter should change recipient or purpose; a new listening extract should change its facts; a fresh speaking response should develop another event. Success then provides better evidence of a learned method than repeating an old answer key.",
        "A four-skill plan should identify its weakest evidence, including any missing category. Allocate a realistic next task and identify what needs human feedback. Official results require official assessment; no locally generated score or checklist should be presented as a guaranteed high-band outcome."
      ],
      "check": {
        "prompt": "A learner completes every reading task but has no full letter or spoken response. What should the final review say?",
        "answer": "Reading practice evidence is available; full General Training Writing and spoken delivery remain insufficiently evidenced or unassessed. The next plan should collect those responses rather than average everything into a proficiency claim."
      }
    }
  ],
  "application": "The guided evidence paragraph diagnoses one real difficulty. The independent plan reviews all four skills and marks missing work. The final reflection identifies the weakest evidence and a fresh follow-up, with human feedback where required. Retain the distinction between checked accuracy, self-review and official assessment."
},
};
