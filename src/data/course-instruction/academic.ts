import { chapter as c, section as s } from "./authoring";
import type { InstructionChapter } from "./types";
export const academicInstruction: Record<string, InstructionChapter> = {
"band2-listening-mcq": {
  "mode": "extend",
  "outcomes": [
    "Attach each detail to the correct person, service and final arrangement.",
    "Transfer a heard answer in the grammatical form the note requires."
  ],
  "prerequisite": "Recognise names, dates, amounts and ordinary correction signals. A form can already supply a unit or preposition; inspect the whole printed phrase before predicting the answer.",
  "sections": [
    {
      "title": "Meaning survives reduced pronunciation",
      "paragraphs": [
        "In ordinary speech, unstressed words may have reduced vowels and connect closely to neighbouring words. ‘At a quarter past ten’ may not sound like six isolated dictionary entries. Identify the information-bearing words, but do not invent an answer from them alone. A reduced not or a correction such as no, sorry can reverse an apparently settled detail.",
        "Create an internal record with separate slots: person / service / date / price category. ‘The adult ticket is fourteen, but your student ticket is ten’ leaves both prices true. Only the category determines the answer. A correction changes an earlier value; a contrast can instead describe two simultaneous categories. These are different relationships."
      ]
    },
    {
      "title": "Complete a category record before the audio form",
      "paragraphs": [
        "Written rehearsal: “A standard repair costs thirty pounds. Your warranty covers the inspection, but not a replacement part. We first offered Monday; the confirmed appointment is Wednesday.” Completed slot: customer category → warranty holder. Finish charge covered → ___; charge excluded → ___; appointment status → ___.",
        "Keep category differences separate from corrections. Thirty pounds can remain true for a standard repair while not being this customer’s inspection charge. Wednesday replaces an earlier appointment proposal; that is a genuine update."
      ],
      "check": {
        "prompt": "Complete the three notes, then explain why copying the first amount would be unsafe.",
        "answer": "Inspection / replacement part / Wednesday confirmed. The first amount describes another pricing frame. A later value is not automatically the answer either: category and final status must match the question."
      }
    },
    {
      "title": "Withdraw the frame for the next recording",
      "paragraphs": [
        "For the course booking, preview only the printed fields and leave their values empty. For the repair and reservation recordings, make your own notes rather than carrying over the rehearsal categories. Read a unit already printed beside the gap before entering an amount.",
        "After checking, replay the clause that attaches the answer to its category. If the transcript was clear but the sound was missed, rehearse that short group and replay without text. If the wrong customer was selected, repair the category record first. Return to that distinction in a new recording after another module."
      ]
    },
    {
      "title": "Work from speech to a completed form",
      "paragraphs": [
        "Suppose the note reads ‘Bring an ___’ and the recording says ‘We supply brushes, but you should bring an apron.’ The noun apron both answers the question and fits the printed article. Writing brushes follows a clear sound but reverses the supply relationship. Writing your own apron may break a one-word limit even though the instruction was understood.",
        "After checking, classify the error before replaying. If the transcript was understood immediately, practise recognition of the exact sound group. If the supplied-versus-required relationship was misunderstood even in writing, paraphrase it first: organisers supply brushes; participant supplies apron. Fresh audio, not a reread transcript alone, tests whether the distinction has transferred."
      ],
      "check": {
        "prompt": "‘The desk opens at nine; collections begin at ten.’ Which time answers a collection question?",
        "answer": "Ten. Opening and collection are separate services or stages; the first time is not automatically wrong, but it answers a different question."
      }
    }
  ],
  "application": "Apply category tracking to the course booking, repair appointment and room reservation. Keep the original audio hidden from transcript view until your response is made, then use the transcript to diagnose sound recognition, role confusion or transfer errors."
},
"band2-listening-maps": {
  "mode": "extend",
  "outcomes": [
    "Convert relative directions using the traveller’s orientation.",
    "Match a facility to a stated feature rather than an old location."
  ],
  "prerequisite": "North, south, east and west are fixed on a marked plan. Left and right depend on which way the traveller faces. Identify the entrance and named landmarks before interpreting movement.",
  "sections": [
    {
      "title": "Separate fixed position from a route instruction",
      "paragraphs": [
        "Facing north, right is east; facing south, right is west. If a visitor enters from the north and walks toward the centre, ‘turn right’ can lead west. Do not use a remembered equation right = east. Follow the route from the actual starting point, updating orientation after a turn.",
        "A landmark is an anchor, not necessarily the answer. ‘The office is beyond the café’ asks you to continue past the café. ‘The room opposite the desk’ requires the desk’s position before selecting the room. Trace one relationship at a time; several prepositions in one sentence can connect different pairs of places."
      ]
    },
    {
      "title": "Finish a route one movement at a time",
      "paragraphs": [
        "Use an imagined square plan with north at the top. You enter from the east and face west. Completed first step: right turn → face north. Complete next step: walk north, turn left → face ___. Then name the fixed direction of a door immediately ahead.",
        "Now change only the starting entrance to the south and repeat right then left. The sequence of turns stays the same, but the absolute directions change. A label-bearing learning plan supplies support; it is not equivalent to an unseen examination map."
      ],
      "check": {
        "prompt": "Complete both routes. Why must you update orientation after each turn?",
        "answer": "From the east: west → right north → left west. From the south: north → right east → left north. Ahead follows the current facing direction; using the original orientation throughout would place the final door incorrectly."
      }
    },
    {
      "title": "Location, history and feature are different targets",
      "paragraphs": [
        "‘The studio used to be the exhibition room, but exhibitions now take place upstairs’ supplies history and current function. A present-day plan needs studio in the old room, not exhibition. A facility-matching question might instead ask which space stays open late; its answer depends on a feature, not a direction.",
        "Worked orientation: enter through a northern door and walk south to the central hall. Turn right and walk west to the help desk. To continue south from there, turn left. A room ahead is south of the desk, even though the route earlier included a right turn. Distinguish an instruction to turn from a statement that a facility is on your right."
      ],
      "check": {
        "prompt": "A speaker says ‘The former shop is now an advice desk.’ Which label describes its current use?",
        "answer": "Advice desk. Former and now distinguish the historical use from the present one; both nouns may be heard, but they do not describe the same time."
      }
    },
    {
      "title": "Check present function separately from position",
      "paragraphs": [
        "Written rehearsal: “The old café is now a meeting room; refreshments are sold beside the entrance.” Complete current use of old café → ___; place to buy refreshments → ___. A historical label and a present service can occupy different places."
      ],
      "check": {
        "prompt": "Complete the two entries, then choose your own empty route/feature notes for the live park and facility tasks.",
        "answer": "Meeting room / beside the entrance. Now marks the changed function; refreshments identifies a separate service. After a mistake, state whether you confused orientation, former/current use or a feature rather than redrawing every location."
      }
    }
  ],
  "application": "Use the centre plan for orientation, the park tour for a fresh route and the facilities stage for feature matching. The existing visuals and audio remain the evidence; the teaching table is a separate schematic, so do not transfer its room names to the new activity."
},
"band2-listening-form-completion": {
  "mode": "extend",
  "outcomes": [
    "Attribute opinions and proposals to the correct speaker.",
    "Organise lecture notes into claim, mechanism, example and limitation."
  ],
  "prerequisite": "A proposal is a suggested method; an objection identifies a problem with it. A qualification limits an endorsement without necessarily rejecting the entire idea. Keep speaker identity separate from the topic shared by all speakers.",
  "sections": [
    {
      "title": "Follow ownership as a discussion changes",
      "paragraphs": [
        "In a research discussion, one student can propose an online survey, another identify excluded users, and the first revise the method to interviews. The final method does not belong automatically to the last speaker or the first idea mentioned. Track name → proposal → concern → revised plan. A tutor saying useful but limited supports neither unqualified approval nor complete rejection.",
        "Pronouns and short replies depend on context. ‘That would help’ may accept the immediately preceding adjustment, not every earlier proposal. Ask what that refers to. If a speaker says ‘I agree about speed, but not coverage’, preserve the separate dimensions rather than labelling the person simply agrees."
      ]
    },
    {
      "title": "Finish a speaker-attribution record",
      "paragraphs": [
        "Written exchange: Ada proposes counting visitors at the main door. Ben notes that another entrance is used after six. Ada suggests adding an evening count there. Completed: initial proposal → Ada, main-door count. Finish concern → ___; revised method → ___; person revising → ___."
      ],
      "check": {
        "prompt": "Complete the record. Does the final proposal belong to Ben merely because he raised the concern?",
        "answer": "Ben identifies missed evening entrants; the revision is a second evening count, proposed by Ada. Concern and proposal are different contributions. In the live discussions, attach every note to the speaker and the exact proposal it modifies."
      }
    },
    {
      "title": "Build lecture notes from a different explanation",
      "paragraphs": [
        "Written demonstration: “Photographs show visible wear on a bridge. Maintenance logs show when repairs occurred. Combining them helps inspectors compare appearance with repair history, although incomplete old logs leave gaps.” Completed method → photographs; information → visible wear. Finish logs → ___; combination → ___; limitation → ___.",
        "The hierarchy is method / information / value / limitation. A gap beneath Limitation cannot be filled by an attractive benefit. When exact source words are required, paraphrase privately to understand, then transfer the instructed words and obey the word limit."
      ],
      "check": {
        "prompt": "Complete the three notes and explain why incomplete logs do not mean photographs have no value.",
        "answer": "Repair dates/history / comparison of appearance and repairs / gaps in old records. The limitation concerns one information source and the combined account, not an absolute rejection of every method."
      }
    },
    {
      "title": "Use the source type to choose the note structure",
      "paragraphs": [
        "For the first conversation, keep empty speaker / proposal / qualification notes. For the next discussion, select your own labels from its questions. For the lecture, replace speaker tracking with a cause/example/limit hierarchy. Do not look for a negotiated final decision when the task asks for an explanatory mechanism.",
        "After the next listening lesson, retrieve one missed relationship in fresh audio. Use transcripts for diagnosis after an attempt; a written explanation alone cannot demonstrate recognition of the new recording."
      ]
    }
  ],
  "application": "The research-planning and project-discussion recordings require speaker tracking; the fresh academic talk requires a note hierarchy. Use those different procedures deliberately rather than applying ‘listen for the final decision’ to every explanatory detail."
},
"band2-reading-headings": {
  "mode": "extend",
  "outcomes": [
    "Separate a paragraph’s controlling idea from a supporting detail.",
    "Use attribution to match features accurately."
  ],
  "prerequisite": "A topic names the subject; a controlling idea explains what the paragraph does with it. An example can illustrate growth, a problem or a solution without becoming the paragraph’s main point.",
  "sections": [
    {
      "title": "Test a heading against the whole paragraph",
      "paragraphs": [
        "Reduce each sentence to its role: starting situation, change, example, consequence. If a paragraph moves from informal exchanges to scheduled services, catalogues may be one example of organisation. A heading about the history of catalogues is too narrow even when the word appears prominently. A heading about organised growth covers the development.",
        "Worked contrast: ‘Volunteers first exchanged seeds at home. When demand grew, they introduced collection days and written records. The service now reaches several neighbourhoods.’ The controlling idea is expansion from a small informal exchange. ‘Difficulties storing seeds’ is a possible topic elsewhere, but no storage difficulty occurs here. Eliminate headings for wrong scope as well as invented facts."
      ]
    },
    {
      "title": "Test two near headings by paragraph role",
      "paragraphs": [
        "New paragraph: “A town archive began by accepting every donated photograph. Unlabelled duplicates soon made searching difficult. Volunteers now ask for dates and names before adding an image.” Completed map: open collection → search problem → controlled intake. Compare headings “Reducing storage costs” / “Making a growing collection usable” / “Rejecting public participation”.",
        "The second covers all three roles. The first invents a cost motive; the third turns selective documentation into rejection of participation. Now complete a heading in your own words: “From ___ to ___.” Keep both the original approach and the adjustment."
      ],
      "check": {
        "prompt": "Complete the heading and explain why Unlabelled photographs is too narrow.",
        "answer": "For example: “From unrestricted donations to documented collection.” Unlabelled photographs identifies the middle problem but misses both the earlier policy and the resulting change."
      }
    },
    {
      "title": "Attribute a qualification to its owner",
      "paragraphs": [
        "Source: “Nair recommends scanning fragile originals. Holt supports scanning but warns that handwritten notes may be difficult to read. Nair agrees that the original must be retained.” Complete person / proposal / limit for Holt before matching a feature. Do not assign Nair’s first recommendation to both people merely because both discuss scanning."
      ],
      "check": {
        "prompt": "Who explicitly raises readability, and what does the agreement establish?",
        "answer": "Holt raises readability. Nair’s later agreement supports retaining originals; it does not make Holt the originator of every scanning recommendation. Match the actual claim and reporting clause."
      }
    },
    {
      "title": "Switch reading level when the question changes",
      "paragraphs": [
        "Matching information asks where a detail appears; matching features asks who or what is associated with a statement. For a named researcher, read reporting verbs and clause boundaries: ‘Cole recommends dry storage, whereas Reed studies social contact.’ The shared topic does not make both researchers responsible for both claims.",
        "Before checking, annotate your evidence as gist, detail or attribution. If you selected an answer because a name or noun matched, reread the complete claim. A correct match should be explainable without relying on the answer’s position in the list."
      ],
      "check": {
        "prompt": "Why can a paragraph mention a missing-label problem without ‘Missing labels’ being its best heading?",
        "answer": "The problem may be a supporting example in a broader account, such as how a service became more organised. A heading needs to cover the controlling development, while an information question can legitimately target the specific detail."
      }
    },
    {
      "title": "Retrieve the reading level required",
      "paragraphs": [
        "After the targeted heading task, write one gist question and one detail question about a new paragraph. Answer each with the appropriate amount of evidence. On a later day, retrieve why a memorable example can be a correct detail answer but an incomplete heading."
      ]
    }
  ],
  "application": "The activity passages test evidence and summary, with a targeted heading-matching transfer. Use paragraph-role notes for headings and clause-level attribution for feature questions; retain the original instructions about whether options can be reused."
},
"band2-reading-mcq": {
  "mode": "extend",
  "outcomes": [
    "Decompose an answer option into claims that all need support.",
    "Distinguish a cautious inference from an invented causal conclusion."
  ],
  "prerequisite": "Inference connects supplied facts. It does not add an unsupported event, statistic or intention. Qualifiers such as may, some and in this trial are part of the claim, not optional stylistic extras.",
  "sections": [
    {
      "title": "Check actor, outcome and scope separately",
      "paragraphs": [
        "For each option ask: who or what is involved, what happened, when, and how certain is it? A passage about complaints on four streets cannot establish an effect on every street in a city. Fewer complaints do not automatically mean fewer accidents. An option can be wrong in one component even when its other words closely resemble the source.",
        "In the quiet-vehicle example, three streets improve and one worsens after night deliveries increase. A supported inference is that schedules may matter alongside vehicle noise. ‘Quiet vehicles cause all streets to become quieter’ ignores the exception and claims causation beyond the account. ‘The scheme has no value’ discards the improvements."
      ]
    },
    {
      "title": "Complete a claim-decomposition record",
      "paragraphs": [
        "New source: “A museum trialled timed entry on six Saturdays. Queues were shorter on four days, but two rainy days had unusually high attendance. Managers want to compare another season.” Worked option: “Timed entry eliminated queues every day.” Actor matches; outcome eliminated is too strong; every day contradicts the uneven result.",
        "Partly analyse “Managers will collect more evidence before judging the timetable.” Actor → ___; action → ___; certainty → ___. Then compare “Rain always causes museum crowding” without a supplied grid."
      ],
      "check": {
        "prompt": "Complete the supported option and diagnose the rain claim.",
        "answer": "Managers / compare another season / a planned check rather than a proven general effect. Rain always causes crowding turns two associated days into a universal causal conclusion. The source does not support that scope or certainty."
      }
    },
    {
      "title": "Use the closest rival to locate a misconception",
      "paragraphs": [
        "After a live choice, explain the nearest wrong option in one sentence: wrong actor, changed outcome, widened scope or strengthened certainty. If the evidence is found but the answer is still uncertain, return to the exact clause; another whole-text scan does not resolve a may/must distinction.",
        "Later, retrieve reference and qualifier skills from the earlier reading modules on a new paragraph. The short sets provide bounded comprehension evidence, not an official IELTS score."
      ]
    },
    {
      "title": "Use the limitation to understand the recommendation",
      "paragraphs": [
        "An author may recommend further research because the sample is small, conditions changed or a comparison is missing. That recommendation does not necessarily reject the approach. Connect observation → uncertainty → next step. This is especially useful when purpose and inference questions paraphrase different points in the same paragraph.",
        "During timed work, separate the location problem from the interpretation problem. Once you have found the relevant evidence, repeatedly scanning the whole source is unlikely to resolve uncertainty about may versus must. Compare the complete option with the supporting clause and identify the exact difference."
      ],
      "check": {
        "prompt": "A trial covers four streets. Can ‘No other streets have ever been studied’ be inferred?",
        "answer": "No. The scope of this trial does not establish the history of all other research. The passage would need an explicit statement about that wider history."
      }
    }
  ],
  "application": "Apply claim decomposition to the existing guided, independent and fresh evidence passages. Use the final summary question to test the whole option, including its qualification. Keep local practice accuracy separate from official IELTS band conversion."
},
"band2-writing-bar-pie": {
  "mode": "extend",
  "outcomes": [
    "Construct a complete report from proportional data.",
    "Keep populations and comparison measures distinct."
  ],
  "prerequisite": "A percentage describes a share of a specified whole. Percentage points compare two percentages by subtraction; relative percentage change compares the difference with a starting percentage. Without group sizes, shares cannot establish headcounts.",
  "sections": [
    {
      "title": "Build the report before choosing elaborate vocabulary",
      "paragraphs": [
        "Begin by naming what is compared, the groups and period. Select an overview before writing individual values: which mode dominates each group, and which contrast is most important? Group details around that overview rather than listing every cell in table order. A report can use simple, exact comparison language and still communicate a well-selected account.",
        "Compare ‘Cars were used by a higher proportion of staff’ with ‘More staff drove’. The first is supported by shares alone. The second could mean a larger absolute number, which requires staff and student totals. Keep proportion or share visible when the denominator matters."
      ]
    },
    {
      "title": "Calculate shares in stages before choosing words",
      "paragraphs": [
        "New rehearsal: cycling represents 20% of group A and 30% of group B. Completed difference: 30 minus 20 = 10 percentage points. Relative to A’s share, the increase is 10 divided by 20 = 50%. The two statements use different baselines; neither gives a headcount.",
        "Now complete the same calculations for 25% and 35%: point difference ___; relative difference against 25% ___. If the groups each contain 200 people, calculate the headcounts. Then explain what becomes unknown when those group sizes are removed."
      ],
      "check": {
        "prompt": "Complete the calculations and decide whether 35% is a majority.",
        "answer": "10 percentage points; 40% relative difference; 50 and 70 people with equal groups of 200. Without group sizes, absolute counts are unknown. 35% is not a majority, even if it is the largest category."
      }
    },
    {
      "title": "Complete an overview before listing table cells",
      "paragraphs": [
        "For the supplied transport table, write “Overall, ___ led among students, whereas ___ led among staff.” Then group non-car comparisons rather than walking through every cell without a point. A full model follows after this attempt.",
        "After the new pie-chart and table tasks, underline each comparison’s population and unit. Revisit one calculation after the next writing module without looking at its answer. If the result is correct but the sentence says people instead of share, revise the meaning as well as the arithmetic."
      ]
    },
    {
      "title": "Complete original model for the supplied table",
      "paragraphs": [
        "The table compares how students and staff travelled to Northbank College in 2025. It gives the percentage of each group using buses, bicycles, walking and cars.",
        "Overall, bus travel accounted for the largest share of student journeys, while cars were the leading mode among staff. Students had a higher share in each of the three non-car categories. The figures do not indicate the total number of people in either group.",
        "Buses were used by 45% of students, compared with 30% of staff. Cycling was also more common as a share of student travel, at 25%, against 15% among staff. Walking represented a further 20% of students and 10% of staff.",
        "The pattern was reversed for car travel. Only 10% of students drove, whereas the staff figure was 45%, a difference of 35 percentage points. Taken together, non-car modes accounted for 90% of students and 55% of staff. These combined shares describe the distribution within each group, rather than the number of travellers.",
        "The report has an overview, grouped comparisons and an explicit denominator. It does not invent a cause for the difference or call a 45% share a majority."
      ],
      "check": {
        "prompt": "Could a larger student population produce more student drivers despite its smaller driving percentage?",
        "answer": "Yes. Ten percent of a large group can exceed 45% of a much smaller group. The table supplies no group totals, so the absolute comparison remains unknown."
      }
    }
  ],
  "application": "The guided services table, independent pie charts and fresh assessment table use different categories. Keep the construction method, but calculate their own overview and comparisons. Do not import transport figures or the same grouping if the new data does not support it."
},
"band2-writing-letter": {
  "mode": "extend",
  "outcomes": [
    "Construct map-change and process sentences with accurate voice and sequence.",
    "Write a complete report without adding unshown causes or machinery."
  ],
  "prerequisite": "Passive voice uses be plus a past participle: is sorted, was replaced. It foregrounds the material or place affected. Processes describe an order; maps describe spatial relationships and changes. Neither requires an opinion letter.",
  "sections": [
    {
      "title": "Choose the subject that keeps the sequence clear",
      "paragraphs": [
        "For maps, ‘A playground replaced the lawn’ and ‘The lawn was replaced by a playground’ describe the same change with different subjects. ‘The playground was replaced by a lawn’ reverses it. For a general process, ‘Workers sort the paper’ and ‘The paper is sorted’ focus on different participants; use the passive when the supplied material is the main thread.",
        "References should preserve that thread: paper → pulp → mixture → new paper. Do not call the mixture sheets before pressing creates sheets, or invent a machine simply because one seems likely. Sequence words should reflect the supplied order. After and before can combine stages without a list of first, secondly and thirdly in every sentence."
      ]
    },
    {
      "title": "Build a passive clause, then choose spatial grouping",
      "paragraphs": [
        "Actor clause: “Workers remove stones.” Affected subject: stones. Be agrees with the plural subject, so “Stones are removed.” Complete “The clay ___ (SHAPE) into pots.” Shaped is the participle; clay is singular in this material sense.",
        "For a map, use a different frame: “A path was added along the southern boundary.” It gives change plus location. Complete “The pond remained ___, while ___ was added to the south.” Use only the actual supplied map features. A process needs sequence, while a map often benefits from spatial groups."
      ],
      "check": {
        "prompt": "Complete the clay passive and diagnose “The pots are firing” as a substitute.",
        "answer": "Is shaped. “Are firing” would make pots the active participants in this ordinary clause rather than the objects being fired. Use “are fired” for the supplied passive process. The map gaps depend on the particular visual and cannot be filled by copying clay stages."
      }
    },
    {
      "title": "Study a different complete process report",
      "paragraphs": [
        "Original teaching sequence: clay is collected → stones are removed → clay is shaped into pots → pots dry → pots are fired → pots cool → finished pots are inspected. The sequence is linear and supplies no durations, temperatures or rejected-pot route.",
        "The sequence illustrates the production of clay pots, beginning with the collection of raw material and ending with inspection of the finished items. It shows the order of the main stages rather than their duration or operating conditions.\n\nOverall, clay undergoes preparation and shaping before the resulting pots are dried and fired. Cooling and a final inspection complete the sequence. No return route to the first stage is displayed.\n\nInitially, clay is collected and any stones are removed. The prepared material is then shaped into pots. At this point, the subject of the description changes naturally from the raw clay to the objects made from it. The pots are left to dry before they are fired.\n\nAfter firing, the pots cool and are subsequently inspected. The diagram provides no separate outcome for items that fail inspection, so such a branch should not be added. Similarly, it does not specify a firing temperature or the equipment used for shaping. The report therefore describes only the stages and relationships supplied.",
        "Trace subject continuity: clay before shaping; pots afterwards. The report uses passive forms where the affected material is the thread. The live process has its own branch and must be read independently."
      ]
    },
    {
      "title": "Remove the frame and inspect the new branch",
      "paragraphs": [
        "Before writing the assessment, trace every displayed arrow and note whether a rejected item returns, leaves the system or follows another route. Do not add a branch from general knowledge. After feedback, repair the first sentence where your subject name changes before the visual transformation occurs.",
        "On a later day, describe one map change and one process step without a model. Check affected subject, auxiliary and participle separately from location or sequence."
      ]
    }
  ],
  "application": "Use the map overview to distinguish replacement, addition and continuity. The full independent map report needs spatial grouping; the fresh process assessment needs sequence and its rejection branch. Preserve the exact stages in that new visual rather than copying the linear example here."
},
"band2-writing-problem-solution": {
  "mode": "extend",
  "outcomes": [
    "Develop a cause through a mechanism and a matching solution.",
    "Make an explicit evaluation when a question asks whether benefits outweigh costs."
  ],
  "prerequisite": "A cause explains why a problem occurs; a solution acts on that mechanism. A benefit/disadvantage list becomes an evaluation only when you explain relative importance, conditions or who is affected.",
  "sections": [
    {
      "title": "Make the solution reach the cause",
      "paragraphs": [
        "Plan: expensive housing near jobs → limited suitable supply plus concentrated demand → additional homes near transport, with infrastructure planning. Developed paragraph: ‘Housing near major workplaces can become expensive when many households compete for a limited number of suitable homes. Expanding supply near reliable transport could widen the area in which people can realistically live. However, new construction takes time and needs services, so short-term help may still be necessary.’",
        "The solution targets access to suitable supply. ‘Tell residents to be more positive’ does not address that mechanism. ‘Build homes everywhere immediately’ ignores the condition and creates an unrealistic promise. A good proposal can acknowledge implementation costs without abandoning the problem."
      ]
    },
    {
      "title": "Match a second demand to its own explanation",
      "paragraphs": [
        "New teaching scenario: a town has low attendance at free language classes. Question one asks why attendance is low; question two asks how organisers could respond. Cause → unpredictable work shifts; response → flexible session choice. Cause → unclear level information; response → a short placement conversation. A single measure may not solve both barriers.",
        "Partly completed paragraph: “Some learners cannot commit to the same evening because ___. Offering ___ would help by ___. However, ___ would still need attention.” Supply a mechanism and a remaining limitation. Then judge whether the benefit of flexibility outweighs the staffing cost for a clearly defined group."
      ],
      "check": {
        "prompt": "Complete one paragraph and identify the missing demand in “Classes are useful, enjoyable and important.”",
        "answer": "For example: “Their shifts change weekly. Offering a choice of two sessions would help by allowing attendance around work. However, teacher workload would still need attention.” The weak evaluation explains neither low attendance nor a targeted response."
      }
    },
    {
      "title": "Repair coverage before polishing language",
      "paragraphs": [
        "Weak two-part answer: “Language classes are good because languages are useful. More advertising is needed.” It does not explain the attendance barrier or why advertising would reach it. Add a cause paragraph, then match the solution to that cause. Use a full introduction and conclusion only to frame those developed answers.",
        "The live access, congestion and service-participation prompts change the problem. Choose fresh mechanisms rather than copy the language-class solution. Later, retrieve one failed cause/solution match and explain which step failed: diagnosis, mechanism or feasibility."
      ]
    }
  ],
  "application": "The guided evening-access paragraph isolates a cause and response. The independent congestion essay needs several developed mechanisms, not the housing example repeated. The final service-participation essay has two explicit questions; check coverage of both before polishing language."
},
"band2-writing-cohesion": {
  "mode": "extend",
  "outcomes": [
    "Maintain one controlling point through a paragraph.",
    "Use reference and connectors that reflect actual logical relationships."
  ],
  "prerequisite": "A main clause can stand as a complete sentence. A reference expression, such as this change, points back to an idea. Coherence concerns the order and development of meaning; cohesion supplies connections, including pronouns and recurring vocabulary.",
  "sections": [
    {
      "title": "Give each sentence a job",
      "paragraphs": [
        "Consider: ‘Online appointments can reduce telephone queues. Users can choose a free slot without waiting for a staff member. This change may help workers who cannot call during office hours. However, assisted booking remains necessary for users without reliable internet.’ The paragraph moves claim → mechanism → beneficiary → limitation. The last sentence does not contradict the benefit; it limits who can access it unaided.",
        "A new sentence about the cost of unrelated road repairs would break unity even if it began furthermore. A connector cannot manufacture a logical connection. Label each sentence’s role before adding signposts; if the roles do not form a sensible progression, reorganise the ideas."
      ]
    },
    {
      "title": "Reconstruct sentence roles before adding connectors",
      "paragraphs": [
        "New paragraph notes: a market changed its opening time / shift workers could visit after work / some stallholders needed later transport / trial one evening. Put them into claim → mechanism → limitation → proportionate action. First write plain sentences without moreover, nevertheless or consequently.",
        "Partial link: “The later opening gave shift workers more time to shop. This ___ helped visitors, but it created ___ for some stallholders.” Choose specific nouns for the two references. Do not use this issue twice when one refers to a benefit and the other to a cost."
      ],
      "check": {
        "prompt": "Supply clear references and choose a justified connector for the limitation.",
        "answer": "For example: “This timetable change helped visitors, but it created a transport problem for some stallholders.” But or however signals the trade-off. A result connector would incorrectly make the benefit itself the explanation for every later difficulty."
      }
    },
    {
      "title": "Remove an unnecessary connector and test the meaning",
      "paragraphs": [
        "Draft: “The newsletter lists events. Furthermore, it gives dates and locations. Nevertheless, students can plan a visit.” The last sentence is a consequence, not an unexpected contrast. Repair the relationship, then try the same three facts with no connector at all. Clear order and reference may supply enough cohesion.",
        "After the live paragraphs, label one sentence’s function and identify its exact referent. If the label is “new unrelated topic”, reorganise before replacing vocabulary. Revisit a different paragraph after the next writing module and repeat the test without the role prompts."
      ]
    },
    {
      "title": "Repair ambiguity with a precise noun",
      "paragraphs": [
        "‘The council discussed the app with the library, but it was unavailable’ leaves it unclear whether the app or library was unavailable. ‘The app was unavailable’ resolves the referent. ‘This problem’ can summarise an earlier proposition, but name the problem when several possibilities compete.",
        "Lexical variation should preserve meaning. A service, platform and appointment are not automatic synonyms. Replacing service with appointment to avoid repetition can change the actor or object in the argument. Repeat a necessary noun when it protects clarity. Then remove connectors whose relationship is already obvious, instead of trying to meet a quota."
      ],
      "check": {
        "prompt": "Why is ‘Buses are unreliable. Nevertheless, students may arrive late’ an awkward link?",
        "answer": "Late arrival follows naturally from unreliable buses, so a result link such as as a result is more suitable. Nevertheless would suggest an unexpected contrast, such as students arriving on time despite unreliability."
      }
    }
  ],
  "application": "The three activity paragraphs require inclusion, digital-newsletter evaluation and consultation of non-users. Give each a controlling point, clear references and a justified limit. Compare your sentence roles with the model before revising connectors."
},
"band2-speaking-cue-card": {
  "mode": "extend",
  "outcomes": [
    "Expand one relevant event into a sustained long turn.",
    "Use a brief note plan to develop rather than memorise a response."
  ],
  "prerequisite": "Know basic past narration and because/although relationships. Part 2 gives one minute of preparation and up to two minutes of speech. The aim is developed relevant communication; there is no official spoken-word minimum to fill.",
  "sections": [
    {
      "title": "Develop one event from brief cues",
      "paragraphs": [
        "Use a different teaching experience: learning to organise a small exhibition. Cues: community hall / confusing label order / volunteer grouped pictures by date / I rewrote labels / visitors could follow the story. Begin with setting only: “I helped organise a small exhibition at the community hall.” Then add a specific difficulty rather than a list of adjectives.",
        "Build action and result separately: “The labels mixed several periods, so a volunteer showed me how to group the pictures by date. I tried the same grouping on the last wall, and visitors could follow the sequence more easily.” Significance: “I learned that clear organisation can matter more than adding more information.” The details develop one event."
      ]
    },
    {
      "title": "Complete the middle, then reduce the notes",
      "paragraphs": [
        "Partly built account: “At first, I could not ___. The volunteer demonstrated ___. While she ___, I ___. Afterwards, ___.” Finish it using a different small organising task. A while-clause should connect actions actually occurring together; it is not a way to add complexity without a time relationship.",
        "Now reduce your full sentences to five cues and speak again. For a one-minute preparation period, cues should support a sustained account rather than become a script to read. There is no official spoken-word minimum; actual relevance, development and delivery need review."
      ],
      "check": {
        "prompt": "What can extend “I learned to organise displays” without changing topic?",
        "answer": "Explain the original confusing arrangement, a demonstration, your own attempt and how you later used the method. Each adds depth to the same learning event. A new story about an unrelated holiday would add length without developing this cue."
      }
    },
    {
      "title": "Transfer to your own experience and revisit one pause",
      "paragraphs": [
        "The live skill-learning and place-learning prompts need your own specific event. Keep notes brief and listen to the available original long-turn model after attempting your response. Identify where your setting, action or result becomes unclear, then repeat only that section before a fresh full answer.",
        "After the next speaking lesson, tell a different learning event without the supplied frame. A written plan can show organisation; actual speech is required to judge continuity and intelligibility."
      ]
    }
  ],
  "application": "The guided Part 1 answer needs brief relevant development. The independent skill-learning and fresh place-learning tasks need a sustained event. Use one-minute notes, record actual speech where possible and compare its organisation with the model. Written planning alone does not assess delivery."
},
"band2-speaking-describe": {
  "mode": "extend",
  "outcomes": [
    "Use thought groups and focus stress to clarify meaning.",
    "Diagnose one intelligibility problem from a recording without chasing an accent."
  ],
  "prerequisite": "A syllable is a unit of speech within a word; word stress makes one syllable more prominent. Sentence focus highlights information relevant to the message. Thought groups organise a phrase or clause into a manageable unit.",
  "sections": [
    {
      "title": "Stress changes what the listener notices",
      "paragraphs": [
        "Compare ‘The room was SMALL, but the windows were LARGE’ with stress on every word equally. The contrast is clearer when the opposing descriptions stand out. Capitals in a transcript mark possible focus, not louder speech on every syllable. Keep small grammatical words audible enough to preserve the message.",
        "Final sounds can carry grammar: worked marks past time; rooms marks number. If a listener hears work when past narration requires worked, the message may become harder to follow. Review the sound in its phrase rather than drilling it only as an isolated word. A teacher or listener can help distinguish a genuinely unclear ending from an accent difference that causes no difficulty."
      ]
    },
    {
      "title": "Protect a small message before extending it",
      "paragraphs": [
        "Say “We moved the meeting BEFORE lunch” and “We moved the meeting AFTER lunch.” The time word changes the sequence. Now say “The room was SMALL / but the windows were LARGE.” The contrast relies on two descriptions, not equal stress on every word.",
        "Partly complete a thought-group version: “When the lights failed / we ___ / so ___.” Choose an action and result, then say the phrase without pausing inside a noun group. If you drop failed’s past ending, a listener may lose the past account."
      ],
      "check": {
        "prompt": "What should a listener recover from the before/after contrast?",
        "answer": "Which event came first. If that detail is unclear, slow the short phrase, retain the time word and ask for the sequence again. A transcript with correct spelling cannot demonstrate that the spoken distinction was understood."
      }
    },
    {
      "title": "Repeat one repair and then change the event",
      "paragraphs": [
        "Record a short new description and choose one phrase where the listener cannot recover a key detail. Rehearse that phrase with clear grouping, then place it back in the answer. Next describe another event without the same wording to test transfer.",
        "Review hesitation by location: a pause between complete ideas can help; repeated pauses between adjective and noun can obscure a unit. Keep manageable continuity rather than simply increasing speed. After another module, ask whether the same key ending or time word remains intelligible."
      ]
    },
    {
      "title": "Choose a narrow repair and test it again",
      "paragraphs": [
        "Record a description once, then listen for one priority: repeated pauses inside noun phrases, unclear endings, word stress or an indistinct key word. If every sentence is interrupted by self-correction, plan shorter meaning groups. ‘The old library / had a quiet reading room / overlooking a garden’ supplies a natural organisation. A pause between old and library breaks a unit that belongs together.",
        "Repeat with the same idea to practise the repair, then use a fresh event to test transfer. Do not infer pronunciation improvement from a cleaned-up transcript. Reading aloud can practise delivery, while spontaneous description also requires planning language; the two activities provide different evidence."
      ],
      "check": {
        "prompt": "Does speaking faster automatically improve fluency?",
        "answer": "No. Speed that merges words or removes useful pauses can reduce intelligibility. Aim for continuity with meaningful grouping and manageable hesitation, then check what a listener actually understands."
      }
    }
  ],
  "application": "The 45-second object response isolates grouping. The independent problem-solving story and assessment changed-plan account require longer development and clear time sequence. Listen to your own speech and the original model separately; models illustrate possibilities and carry no examiner-certified band."
},
"band2-speaking-integrated": {
  "mode": "extend",
  "outcomes": [
    "Compare alternatives on a shared dimension.",
    "Develop a prediction or judgement with an explicit condition."
  ],
  "prerequisite": "Part 3 questions can ask why, compare, evaluate or predict. A relevant answer needs a clear response to that demand before supporting detail. A qualification should specify a condition, not replace the answer with an unexplained it depends.",
  "sections": [
    {
      "title": "Develop a judgement on a distinct policy question",
      "paragraphs": [
        "New teaching question: Should towns charge for parking near the centre? Begin with a direct clause: “A charge can discourage some short car journeys.” Explain how: drivers compare the parking cost with another available route. Illustrate with a short shopping visit, then limit the claim where public transport is unavailable.",
        "A comparison needs a shared dimension. A charge and a better bus service can both affect access, but one discourages a mode while the other supplies an alternative. Comparing the charge’s revenue with the bus’s colour would not evaluate the same issue."
      ]
    },
    {
      "title": "Complete a condition before making a prediction",
      "paragraphs": [
        "Partly built response: “Charging may reduce ___ if ___. For example, ___. However, ___.” Supply the particular journey, a usable alternative and a case where the proposal would be less effective. The condition should explain a mechanism rather than repeat “it depends”.",
        "Weak universal claim: “Any parking charge always makes travel easier.” One counterexample is a worker travelling when no alternative service runs. The example qualifies always; it does not prove that every charge fails."
      ],
      "check": {
        "prompt": "Repair the universal claim while keeping a clear answer.",
        "answer": "For example: “A charge can reduce some unnecessary car journeys when a practical alternative exists, but it may add difficulty for travellers who have no usable route.” The answer distinguishes groups and conditions instead of abandoning judgement."
      }
    },
    {
      "title": "Transfer the reasoning without the parking example",
      "paragraphs": [
        "The live public-space, tourism and technological-convenience questions require their own criteria and mechanisms. In a prediction, separate likely change from a guaranteed outcome. In an always-question, check the scope explicitly.",
        "After recording, point to the clause that answers the demand and the example that supports its reason. If the example becomes a long unrelated story, shorten it. Later, answer a new why-question with one clear mechanism before adding a qualification."
      ]
    }
  ],
  "application": "Apply dimension-first reasoning to public space, tourism and technological convenience. The fresh assessment asks whether changes always help, so preserve that universal demand when qualifying your view. Review relevance and intelligibility from actual speech, not from text choices alone."
},
"band2-grammar-tenses": {
  "mode": "extend",
  "outcomes": [
    "Build a verb phrase that reflects an observation, current process or projection.",
    "Keep time reference consistent across a report paragraph."
  ],
  "prerequisite": "Past participles follow have: has risen, had fallen. Progressive forms use be + -ing. A date can refer to when a forecast was made or when its projected outcome would occur; keep those times separate.",
  "sections": [
    {
      "title": "Separate the reporting frame from the data",
      "paragraphs": [
        "‘The chart shows’ describes the visual in front of the reader now. ‘Visits fell in 2020’ describes a completed observation. The two present/past forms can coexist correctly in the same sentence: ‘The chart shows that visits fell in 2020.’ Consistency means matching each verb to its job, not forcing every verb into the same tense.",
        "For a forecast, ‘Visits are projected to rise’ identifies uncertainty in the outcome. ‘The 2025 plan projected a rise by 2030’ also identifies the historical source. Do not turn an old forecast into an observed result merely because the calendar has moved on; the supplied dataset still contains a projection."
      ]
    },
    {
      "title": "Construct observed, current and projected forms separately",
      "paragraphs": [
        "New data: a theatre recorded 300 visitors in 2022 and 360 in 2024. A plan issued in 2024 projected 420 for 2028. Completed observation: “Visits rose from 300 to 360 between 2022 and 2024.” The past observation has a finished dated frame.",
        "Complete “The plan ___ (PROJECT) a total of 420 for 2028” and “The chart ___ (SHOW) both observations and a projection.” Next write a future-result sentence that explicitly retains the projection label. Even after 2028, an old forecast in this source remains a forecast unless actual results are supplied."
      ],
      "check": {
        "prompt": "Complete the two verbs and give a labelled projection.",
        "answer": "Projected / shows. One labelled version is “Visits were projected in the 2024 plan to reach 420 in 2028.” The report does not claim that 420 was later observed. Current chart description and historical data can correctly use different tenses."
      }
    },
    {
      "title": "Choose aspect from viewpoint",
      "paragraphs": [
        "‘Analysis continues now’ describes an ongoing situation. ‘Researchers have analysed three samples so far’ counts results up to now. ‘They analysed three samples in September 2024’ places completed work in a finished period. Since does not automatically require a progressive: ‘The centre has opened on Saturdays since 2022’ can describe a repeated schedule.",
        "Check auxiliary chains: ‘was projected’, not ‘was project’; ‘has fallen’, not ‘has fell’. Then reread the paragraph for unintended findings. A statement that data collection ended does not imply the study found an effect. Grammar must not add an outcome that the source never reports."
      ],
      "check": {
        "prompt": "A report says “The new route is proposed.” Can this become “The new route operates daily” without further evidence?",
        "answer": "No. Proposed describes a plan; operates daily claims an implemented schedule. Preserve the evidence status as well as the date."
      }
    },
    {
      "title": "Combine viewpoints without inventing findings",
      "paragraphs": [
        "Use a new research timeline: interviews finished in May; analysis continues; no finding is supplied. Write one sentence for completed work and one for the current process. Avoid “The study has proved success”, because a timeline supplies no such result.",
        "After the live task, underline every finite verb and label its evidence role. Revisit after another grammar lesson with different dates. If the grammar is correct but a proposal becomes a fact, revise the status word as well as the tense."
      ]
    }
  ],
  "application": "Apply time labels to the library figures, research timeline and proposed Sunday access. Each activity changes the reporting situation; identify observed, current and proposed information before drafting."
},
"band2-grammar-complex": {
  "mode": "extend",
  "outcomes": [
    "Construct complete reason, concession and condition sentences.",
    "Use punctuation and reference to control complex clauses."
  ],
  "prerequisite": "A main clause can stand alone: the trial revealed a problem. A subordinate clause depends on one: although the trial was short. A finite clause normally needs its own subject and finite verb.",
  "sections": [
    {
      "title": "Choose a relationship and build its grammar",
      "paragraphs": [
        "Reason: ‘The college extended opening because students needed evening access.’ Concession: ‘Although opening was extended, some students still could not attend.’ Condition: ‘The plan will help if transport remains available.’ Each relationship expresses a different argument; exchanging the conjunction changes it.",
        "When a subordinate clause comes first, a comma commonly marks its boundary: ‘Although the trial was short, it revealed a problem.’ Do not write ‘Although the trial was short, but it revealed a problem’ for the same two-clause relationship. Although already supplies the subordinating contrast; but would introduce another coordinating frame."
      ]
    },
    {
      "title": "Find the main clause before adding a relationship",
      "paragraphs": [
        "Sort “Although the bus was late” and “We reached the hall on time”. The first depends on a main assertion; the second can stand alone. Join them with a comma after the initial subordinate clause. Do not add but to the same two-clause although relationship.",
        "Complete “Because the signs were unclear, ___.” Supply a subject and finite verb that states a consequence or decision. Then repair “Although the guide arrived. We could not enter.” Decide whether the intended meaning is concession or cause before choosing the connection."
      ],
      "check": {
        "prompt": "Give one complete repair and explain what a fragment lacks.",
        "answer": "“Because the signs were unclear, we asked at reception.” A reason clause alone leaves the main assertion unfinished. For the second pair, “Although the guide arrived, we could not enter” accepts arrival while reporting an unexpected restriction; use because only if arrival actually caused it."
      }
    },
    {
      "title": "Add a genuine condition in a different context",
      "paragraphs": [
        "Partly complete “The garden will stay open if ___.” Choose a condition that changes whether the outcome can happen, such as staff cover. Then give a relative clause identifying the affected group: “Visitors who ___ may need ___.” Check each clause’s own subject and finite verb.",
        "Close the frames for the live trial, shared-space and staffing paragraphs. After the next writing task, retrieve one complete main clause from a complex sentence before editing punctuation. A correct complex form should preserve the source relationship, not merely lengthen the sentence."
      ]
    },
    {
      "title": "Keep a clear main clause and a clear referent",
      "paragraphs": [
        "Fragment: ‘Because longer hours create staffing pressure.’ Complete: ‘Longer hours may be useful, but they create staffing pressure.’ Or: ‘Because longer hours create staffing pressure, the college should trial them on one evening first.’ The reason clause needs a main assertion in this context.",
        "A relative clause can identify a group: ‘Students who work during the day may need evening sessions.’ Who refers to students, and work agrees with them. If a sentence becomes overloaded, split it before adding another clause. A clear sequence of controlled sentences can express more range than one long sentence with uncertain boundaries."
      ],
      "check": {
        "prompt": "Combine ‘The trial found greater satisfaction’ and ‘It did not measure long-term outcomes’ with a concession.",
        "answer": "Although the trial found greater satisfaction, it did not measure long-term outcomes. The sentence accepts the finding while limiting what the study establishes; it does not deny the finding."
      }
    }
  ],
  "application": "Use concession for the short trial, a real condition for shared study space and a controlled contrast for staffing pressure. Check that the complex form preserves the original relationship rather than merely increasing sentence length."
},
"band2-vocab-awl2": {
  "mode": "extend",
  "outcomes": [
    "Preserve agency, quantity and certainty when paraphrasing.",
    "Use syntax to check a copied completion answer."
  ],
  "prerequisite": "A paraphrase restates meaning using a different structure or wording. Copy-from-text completion instead requires the instructed source words. These are different operations even when used in the same lesson.",
  "sections": [
    {
      "title": "Paraphrase a proposition, not isolated words",
      "paragraphs": [
        "‘Less heat escaped after shutters were installed’ can restate ‘Heat loss decreased following installation of shutters.’ Both preserve the direction of change and the affected process. ‘The shutters created more heat’ changes reduced loss into production. A dictionary synonym for one word cannot protect the meaning of the whole claim.",
        "Check four anchors: actor or subject, action, scope and certainty. ‘Researchers suggest the material may help’ cannot become ‘Scientists proved it works everywhere.’ The substitution strengthens the verb, removes possibility and widens the population. A faithful paraphrase may need a different clause structure while retaining those anchors."
      ]
    },
    {
      "title": "Complete a proposition comparison before choosing synonyms",
      "paragraphs": [
        "New source: “A temporary screen reduced glare at three desks, but the study did not measure concentration.” Worked paraphrase: “Less reflected light reached three workspaces after the screen was added.” Actor/process and limited coverage survive. “The screen proved that all staff worked better” changes outcome, scope and certainty.",
        "Partly compare “The trial suggests a possible benefit at the measured desks.” Coverage → ___; certainty → ___; measured outcome → ___. Then write one tempting but unsupported concentration claim and explain the missing evidence."
      ],
      "check": {
        "prompt": "Complete the record and distinguish copying from paraphrasing.",
        "answer": "The measured desks / possible or suggested / glare, not concentration. In a source-word gap, use the exact instructed phrase; in a paraphrase choice, evaluate the whole proposition. A valid synonym can still be an invalid copied answer."
      }
    },
    {
      "title": "Check the gap after finding the phrase",
      "paragraphs": [
        "Source phrase: “adjustable screens”. Printed summary: “Workers fitted ___ beside the desks.” With a two-word source limit, copy adjustable screens. Now change the printed summary to “The fitted ___ were adjustable.” Only screens belongs in that gap; copying both words would duplicate the adjective meaning awkwardly.",
        "After the new live summary, label a wrong answer as source selection, transferred grammar, word limit or strengthened meaning. Retrieve the same distinction on a fresh paragraph after the next reading lesson."
      ]
    },
    {
      "title": "Let gap grammar verify the source phrase",
      "paragraphs": [
        "In ‘Researchers installed ___ before repeating measurements’, a noun phrase can name the installed item. If the instruction says no more than two words from the passage, removable shutters fits; the removable shutters exceeds that limit. In ‘The study did not estimate the ___’, cost fits the noun position and the original meaning. Price may be a reasonable synonym but fails a strict source-word instruction.",
        "Reference matters too: if the source distinguishes the first trial from a later survey, a summary using they or this study must point to the intended investigation. After checking, explain whether an error came from copying, grammar or meaning before practising a new passage."
      ],
      "check": {
        "prompt": "Why does ‘Heat loss was reduced’ preserve more than replacing loss with generation?",
        "answer": "Reduced loss concerns less heat leaving; increased generation concerns producing heat. The first changes voice while preserving the process, whereas the second changes the proposition."
      }
    }
  ],
  "application": "Use the guided completion, independent summary and new transfer questions according to their actual instructions. Copy exact source words when requested, and explain the full meaning separately when selecting a paraphrase."
},
"band2-vocab-collocations": {
  "mode": "extend",
  "outcomes": [
    "Choose noun and verb comparison structures accurately.",
    "Distinguish an overall change from an uninterrupted trend."
  ],
  "prerequisite": "A baseline is the value used for comparison. By gives the size of a change; to gives an endpoint. A noun phrase such as an increase requires a different structure from the finite verb increased.",
  "sections": [
    {
      "title": "Move between noun and verb frames",
      "paragraphs": [
        "‘Attendance increased by 60’ uses a verb. ‘There was an increase of 60 in attendance’ uses a noun. Do not mix them as ‘There was an increased by 60’. A noun can take an adjective: a gradual increase. A verb can take an adverb: increased gradually. Choose the frame first, then its modifier.",
        "For two methods, ‘A is faster but less precise than B’ compares the same dimensions. ‘A has more speed’ may be understandable, but the direct comparative is usually clearer. If purpose determines the choice, state the condition: use A for rapid preliminary checks and B when precision matters."
      ]
    },
    {
      "title": "Calculate, then complete one comparison",
      "paragraphs": [
        "A rehearsal series rises from 70 to 91 requests. Completed calculation: 91 minus 70 = 21. Verb frame: “Requests increased by 21 to 91.” Noun frame: “There was an increase of 21 in requests.” Do not mix the finite verb with the noun article.",
        "Now complete the same two frames for a fall from 80 to 64. Name the absolute change and the relative percentage change against 80 before selecting a modifier."
      ],
      "check": {
        "prompt": "Complete the fall and explain why to 16 is incorrect as its endpoint.",
        "answer": "“Requests fell by 16 to 64”; “There was a fall of 16 in requests.” The relative fall is 16/80 = 20%. Sixteen is the change, not the ending value."
      }
    },
    {
      "title": "Describe the whole series without inventing continuity",
      "paragraphs": [
        "A new teaching series records 30, 42, 39 and 48 requests at four dated observations. The final value is 18 above the first, but the sequence includes a fall from 42 to 39. “Rose overall” preserves that interruption; “rose continuously” does not. Twice 30 would be 60, so “doubled” is false.",
        "For sparse dated values, avoid claiming a smooth curve or unshown peak. ‘Increased between the recorded dates’ states the supplied comparison without inventing what happened in each intermediate month. Precise ordinary language is stronger than dramatic trend vocabulary unsupported by the visual."
      ],
      "check": {
        "prompt": "Revise ‘A was the most popular’ when A rose from 20 to 30 users and B stayed at 40.",
        "answer": "A gained users, rising from 20 to 30, but B remained more popular at 40. The revision separates growth from rank; gaining faster does not mean finishing highest."
      }
    },
    {
      "title": "Choose a grouping without the rehearsal numbers",
      "paragraphs": [
        "For the live schemes and four-year series, calculate their actual changes and compare rank separately. A smaller category can grow faster while remaining smaller. For the research-method comparison, choose the method from purpose and limitation rather than calling one universally best.",
        "After another writing task, retrieve a noun and verb version of a new comparison. Check whether each claim describes recorded endpoints or invents the curve between them."
      ]
    }
  ],
  "application": "Apply amount/end-point and rank/change distinctions to the two schemes, purpose-dependent research methods and four-year series. The assessment needs overall growth with a mid-period fall, not a memorised description of steady growth."
},
"band2-vocab-environment": {
  "mode": "extend",
  "outcomes": [
    "Convert an academic explanation into cause-and-condition notes.",
    "Distinguish a mechanism from its example and implementation limits."
  ],
  "prerequisite": "A mechanism explains how an effect occurs. An example illustrates it. A condition limits when or where it operates. Notes should preserve these roles even when they use arrows or abbreviations.",
  "sections": [
    {
      "title": "Build a hierarchy instead of a word list",
      "paragraphs": [
        "For urban cooling, shade and evaporation are mechanisms. ‘Shade reduces sunlight reaching a pavement’ develops the first; ‘water leaving foliage uses energy’ develops the second. Species, maturity and root space are conditions. Notes such as trees / water / space preserve vocabulary but lose which idea explains which.",
        "A useful format is mechanism → effect / constraint. Keep contrasts: a measure can work biologically yet be difficult to implement in a narrow street. That is not a contradiction; it distinguishes a potential effect from a local design condition."
      ]
    },
    {
      "title": "Finish a cause note, then identify a signal’s role",
      "paragraphs": [
        "Written rehearsal: “A roof over a waiting area blocks direct sunlight. This reduces heating of the seats. However, open sides do not protect users from wind.” Completed mechanism → blocked sunlight. Finish effect → ___; remaining condition → ___. The limitation concerns another environmental demand rather than denying the shade effect.",
        "Now classify “For example, a covered bench…” as illustration and “because the surface absorbs less sunlight…” as mechanism. Write an arrow showing the cause rather than copying unrelated nouns."
      ],
      "check": {
        "prompt": "Complete the notes and explain why wind is not the cooling mechanism.",
        "answer": "Reduced heating of the seats / exposure to wind. Wind appears under the remaining limitation, while blocked sunlight explains the lower heating. A clear word still fails when placed under the wrong heading."
      }
    },
    {
      "title": "Use exact words only when the instruction requires them",
      "paragraphs": [
        "For live lecture gaps, predict the note role, listen, then transfer exact words if requested. Personal arrow notes may paraphrase the mechanism, but a source-word response must follow its stated rule. These are separate operations.",
        "After review, replay the phrase that connects cause and effect, then listen without the transcript. In the new stream and packaging recordings, choose your own note labels. Later, reconstruct one mechanism from a fresh short explanation, retaining its implementation limit."
      ]
    },
    {
      "title": "Turn signal language into the right note",
      "paragraphs": [
        "For example usually introduces an illustration, whereas because points toward a reason and however can introduce a qualification. Signals help orient you, but the following clause supplies the content. ‘However, young trees need watering’ limits a practical proposal; it does not mean shade has no effect.",
        "After checking, identify the exact missed relationship. If you wrote a consequence under cause, rewrite it as an arrow. If you selected precipitation for evaporation, study the contextual meaning and listen to the word again. Do not solve a semantic confusion by merely playing the whole lecture faster."
      ],
      "check": {
        "prompt": "Does a limitation on root space prove that planting trees can never help a narrow street?",
        "answer": "No. May not have enough space limits some cases. It does not establish an absolute impossibility or remove other design options; preserve the source’s qualification."
      }
    }
  ],
  "application": "Use the lecture introduction, urban-stream talk and packaging assessment to practise mechanism, effect and limit with fresh content. The actual audio supplies the evidence; the written teaching example is not a substitute for hearing the new recording."
},
"band2-vocab-technology": {
  "mode": "extend",
  "outcomes": [
    "Develop both explanation and recommendation demands.",
    "Match each access barrier to a specific response without stereotyping users."
  ],
  "prerequisite": "Digital access includes connectivity, usable design and the ability to complete a task. Someone can own a device yet face an inaccessible form. Distinguish the barrier before proposing a solution.",
  "sections": [
    {
      "title": "Plan distinct demands and mechanisms",
      "paragraphs": [
        "For why services move online, a mechanism could be lower routine administrative work: users choose available appointments directly rather than waiting for a telephone operator. For how to avoid exclusion, identify who cannot benefit from that route and why. A telephone alternative helps someone without internet; clearer labels may help someone confused by navigation; neither is a universal cure.",
        "A developed answer can connect these demands: ‘Online booking can reduce routine calls, but the same efficiency may exclude users who cannot complete the form. Assisted booking would preserve access while leaving the online option available to others.’ The response explains adoption and targets a cost, rather than declaring technology simply good or bad."
      ]
    },
    {
      "title": "Build the two answers before drafting the whole essay",
      "paragraphs": [
        "Mark the actual demands in the supplied online-service question: explanation of adoption / response to exclusion. A remote-work outweigh question has a different second demand: evaluate which effects matter more. Do not choose a plan from the shared word technology.",
        "Partly completed explanation: “A booking system can reduce routine calls because ___. For example, ___. This benefit depends on ___.” Then build the response paragraph: barrier → targeted support → access retained → implementation cost. Supply the missing reasoning before reading the complete model."
      ],
      "check": {
        "prompt": "Why does “Give everyone a device” leave some barriers unanswered?",
        "answer": "A device does not automatically resolve an inaccessible form, unclear instructions or lack of assistance. Name the actual barrier, then choose a measure that reaches it. Age alone is not a diagnosis of digital ability."
      }
    },
    {
      "title": "Use a full paragraph plan to prevent drift",
      "paragraphs": [
        "Plan an explanation paragraph with reason → mechanism → example. Plan a response paragraph with barrier → targeted measure → condition or cost. If the prompt instead asks whether remote-work benefits outweigh disadvantages, change the plan to an explicit evaluation. The broad topic technology does not decide the essay type.",
        "Avoid ‘All older people cannot use computers’. It stereotypes a population and confuses age with specific access needs. ‘Users unfamiliar with the form may need assistance’ describes a relevant condition without assigning it to everyone in a demographic group. Precise language improves both reasoning and vocabulary."
      ],
      "check": {
        "prompt": "Why might supplying a device fail to solve an inaccessible booking form?",
        "answer": "Connectivity and hardware do not automatically make the interface usable. The barrier may require accessible design, clearer instructions or assistance rather than another device."
      }
    },
    {
      "title": "Analyse a complete original two-part response",
      "paragraphs": [
        "Online services are becoming common in public organisations because they can simplify routine work and make some transactions available outside office hours. However, these advantages do not remove the need to support people who cannot use the digital route independently.\n\nOne reason for adoption is that a single online system can reduce repeated administrative tasks. A user who chooses an available appointment directly does not need a staff member to read out every possible time. The same record can show the booking to both sides, reducing the risk of separate lists becoming inconsistent. For someone who works during the day, completing this task in the evening may also be more convenient than waiting for a telephone line to open.\n\nThese gains are conditional rather than universal. A user may have no reliable connection, while another may own a device but struggle with the form. Complex labels, inaccessible controls or unclear confirmation messages can turn a simple transaction into a barrier. Describing every unsuccessful user as unwilling to learn would miss these different causes.\n\nOrganisations should therefore identify where people fail to complete the process and offer matching support. A telephone or in-person route can preserve access for those without internet. Clearer instructions and accessible design may help users who already have a connection. Staff assistance should explain the next step without making decisions on a person’s behalf. These alternatives require time and funding, so their use should be reviewed rather than assumed to be cost-free.\n\nIn conclusion, digital services can reduce routine work and extend convenient access, but implementation should preserve a usable route for people facing different barriers. Efficiency is valuable when the service remains available to those who need it.",
        "The introduction answers both demands; the first body paragraph explains an operational mechanism; the next diagnoses different barriers; the response paragraph matches measures to them and recognises cost. The conclusion retains conditional support. This original model is a teaching response, with no examiner rating. The independent remote-work essay requires a new evaluation and examples."
      ]
    },
    {
      "title": "Diagnose and revise one weak response",
      "paragraphs": [
        "Weak response: “Technology is modern. All older people dislike computers. Give them phones and the problem is solved.” It fails to explain adoption, stereotypes users and supplies an incomplete solution. Replace the stereotype with a specific barrier, explain its mechanism and match a measure to it.",
        "For the reminder assessment, reason about the stated possible effect and a limiting condition rather than copy the whole adoption essay. After the next writing task, retrieve the difference between explaining a mechanism and weighing its importance."
      ]
    }
  ],
  "application": "The guided adoption paragraph develops one mechanism and condition. The independent remote-work essay requires a weighed judgement. The reminder assessment asks about a possible effect and a limiting reason. Adjust the reasoning to each demand rather than reusing one technology essay."
},
"band2-mistakes-prepositions": {
  "mode": "extend",
  "outcomes": [
    "Keep units and baselines intact in comparisons.",
    "Distinguish a language error from an unsupported causal interpretation."
  ],
  "prerequisite": "A percentage point is an absolute difference between percentages. Relative percentage change divides that difference by the starting percentage. A headcount and a rate can move differently if the population changes.",
  "sections": [
    {
      "title": "Construct a comparison with a distinct baseline",
      "paragraphs": [
        "New teaching rate: 12% rises to 18%. Difference: 18 minus 12 = 6 percentage points. Relative increase: 6 divided by 12 = 50%. Complete “The rate rose ___ 18%, an increase ___ 6 percentage points.” To names the endpoint; by names the change. Neither gives a headcount without population totals.",
        "New unit price: 80 currency units falls to 60. Difference: 20 units; relative fall: 20/80 = 25%. The price of one item has fallen, but total spending also depends on quantity. A change in unit price cannot establish total cost without that quantity."
      ]
    },
    {
      "title": "Repair one numerical sentence before a paragraph",
      "paragraphs": [
        "Draft: “The rate increased to six percentage points, and twice as many people attended.” Complete the repair “The rate increased ___ six percentage points, from ___ to ___.” Then decide which part must be deleted or marked unknown when there is no population total."
      ],
      "check": {
        "prompt": "Supply the comparison and diagnose the headcount claim.",
        "answer": "By / 12% / 18%. Delete or qualify twice as many people: neither the totals nor a doubling are supplied. The relative rate increase is 50%, not 100%, and even that does not establish the headcount."
      }
    },
    {
      "title": "Edit the strength of the conclusion",
      "paragraphs": [
        "‘Participation rose after the timetable changed’ reports sequence. ‘The timetable change caused the rise’ needs stronger evidence about alternative explanations. If only before/after counts are supplied, use cautious association language. A grammatical sentence can still make an unsupported claim.",
        "Not every less familiar phrase is wrong. According to the study’s results is a normal attribution. Editing should explain whether it fixes grammar, numerical meaning, scope or style. Label a shorter wording as a concision choice when the original was grammatical, rather than inventing a universal rule."
      ],
      "check": {
        "prompt": "A participation rate rises from 12% to 18%. Could the headcount still fall?",
        "answer": "Yes, if the relevant population falls enough. For example, 12% of 1,000 is 120 while 18% of 500 is 90. A rate and its population must be considered together."
      }
    },
    {
      "title": "Name the measure before choosing a causal verb",
      "paragraphs": [
        "In each live task, identify whether cost means a total or a unit price from its actual source. If the source only gives cost, do not quietly rename it unit cost. Report the known change and identify any missing quantity.",
        "After feedback, separate a grammar repair from a numerical or causal repair. On a later day, write a new from/to/by comparison without a frame and explain what information would be needed to claim cause or total spending."
      ]
    }
  ],
  "application": "The rate, cost and participation tasks require different units and evidence limits. Check each numerical statement and causal verb separately, then use feedback to justify the correction rather than applying a list of banned phrases."
},
"band2-mistakes-countable": {
  "mode": "extend",
  "outcomes": [
    "Choose articles and quantifiers from a noun’s intended sense.",
    "Maintain agreement through a connected academic description."
  ],
  "prerequisite": "Countable nouns identify separate units, such as a study and three microscopes. Uncountable nouns can name an activity, substance or body of material, such as research, equipment and information in their ordinary academic senses.",
  "sections": [
    {
      "title": "Choose the unit before the quantity word",
      "paragraphs": [
        "‘Three studies supplied useful information’ distinguishes countable investigations from the material they produced. ‘Much research’ and ‘many studies’ use different quantifiers. To count advice, use suggestions or pieces of advice. To count equipment, name the items or use items of equipment.",
        "An article can change the intended sense. ‘Experience helps’ names accumulated knowledge; ‘an experience changed my view’ names an event. This does not license a singular article before every uncountable noun. In ordinary reporting, an equipment remains unsuitable; use a device or an item of equipment."
      ]
    },
    {
      "title": "Choose a countable unit before building the clause",
      "paragraphs": [
        "Role rehearsal: three ___ of equipment / two ___ of advice / much ___. Suitable units are items and pieces; a material noun such as information can follow much. The unit head controls number, so “three items of equipment were delivered” differs from “the equipment was delivered”.",
        "Partly build “Two studies supplied ___ information. This information ___ useful, but it did not provide conclusive ___.” Choose a suitable quantity expression, an agreeing verb and the material noun evidence. Do not add plural endings merely because several studies are involved."
      ],
      "check": {
        "prompt": "Complete the account and explain why researches is unsuitable in this ordinary reporting sense.",
        "answer": "For example: “some / was / evidence.” Research names an activity or body of investigation here; studies counts separate investigations. Specialised uses exist, but the ordinary academic frames in these tasks use research as uncountable."
      }
    },
    {
      "title": "Move from noun phrases to a new connected report",
      "paragraphs": [
        "Write two sentences about a school receiving devices and guidance. Name the counted devices, then refer back to the equipment with consistent agreement. Add one recommendation as a piece of advice. Close the model before doing the independent information/evidence paragraph.",
        "On the next study day, repair “Many information were supplied, but it were not evidence.” Explain each article/quantifier, head and reference decision rather than only deleting -s endings."
      ]
    },
    {
      "title": "Keep the noun phrase and verb together",
      "paragraphs": [
        "‘The equipment was delivered’ uses singular agreement with the uncountable head. ‘The three items of equipment were delivered’ has plural items as its head. The number of physical objects does not directly determine the grammar of equipment.",
        "Worked report: ‘The laboratory received three microscopes and some safety equipment. The equipment was checked before use. Staff also received advice about storage and two written suggestions about maintenance.’ Each quantity uses a grammatical unit, and the references remain identifiable. Review article, quantifier, noun form and verb as one system rather than fixing plural endings alone."
      ],
      "check": {
        "prompt": "Revise ‘Several research provides many evidences.’",
        "answer": "One ordinary version is ‘Several studies provide substantial evidence.’ Studies supplies countable investigations and plural agreement; evidence remains uncountable in this use. More research does not automatically imply stronger evidence, which is a separate reasoning question."
      }
    }
  ],
  "application": "Apply countability in the equipment description, information-versus-evidence paragraph and source-comparison advice. Write connected text so that references and agreement remain clear; isolated correction success does not replace a developed paragraph."
},
"band2-review": {
  "mode": "extend",
  "outcomes": [
    "Build a four-skill evidence log from actual responses.",
    "Define a fresh-task check for a specific revision target."
  ],
  "prerequisite": "Keep original and revised responses. Checked reading/listening answers, written length, self-review and external evaluation are different evidence types. A local set has not been equated to an official IELTS paper.",
  "sections": [
    {
      "title": "Make the review operational",
      "paragraphs": [
        "Use four columns: task and response / observed difficulty / correction and reason / fresh check. Example: listening booking / selected regular fee instead of student fee / attached the value to the wrong customer / new booking with two price categories. For writing, quote the underdeveloped claim and show the mechanism or example added. For speaking, use an actual recording and identify what a listener struggled to understand.",
        "If there is no speech sample, mark delivery unassessed. If a written task reaches 250 words but omits one required view, note coverage rather than treating length as success. A complete portfolio needs evidence appropriate to each skill, not a single percentage covering everything."
      ]
    },
    {
      "title": "Finish a portfolio diagnosis with the missing evidence named",
      "paragraphs": [
        "Completed example: a chart report reaches 160 words but calls a projected figure an observation. Evidence → quoted projection label; repair → retain projected status; fresh check → a different chart containing both observed and forecast values. Word count alone would not diagnose the problem.",
        "Partial record: a speaking outline is clear, but no recording exists. Known evidence → ___; unassessed aspect → ___; next response → ___. Then make a separate record from an actual writing paragraph rather than applying the speaking diagnosis to every skill."
      ],
      "check": {
        "prompt": "Complete the speaking record and specify a focused review question.",
        "answer": "Known: written organisation. Unassessed: spoken continuity, pronunciation and intelligibility. Next: an actual recorded response on a fresh prompt. A useful question is which time words a listener could not recover, rather than requesting a band from an outline."
      }
    },
    {
      "title": "Connect a repair to a fresh check",
      "paragraphs": [
        "Choose one target from an actual response: missed qualifier, lost overview, unclear causal mechanism or unintelligible key phrase. State the change you will make, the unfamiliar task that will test it and the evidence you will collect. “Practise everything” is not a workable diagnosis.",
        "After another module, compare original and fresh responses for that single target. Keep missing evidence marked unassessed and seek qualified review for persistent writing or speech problems. Retained XP and local accuracy remain participation and task evidence, not official score conversions."
      ]
    },
    {
      "title": "Judge improvement with a fresh comparison",
      "paragraphs": [
        "Revise one priority, then choose a comparable unfamiliar task. Keep the demand similar enough to test the target, while changing content so that success cannot rely on the old key. A clearer overview on a new chart is useful evidence of transfer; memorising the previous model is not.",
        "Qualified human feedback remains valuable for Writing and Speaking. Ask a focused question such as ‘Which paragraph fails to explain the cause?’ or ‘Which words were unclear?’ rather than requesting an unsupported band from a checklist. Use the reply to plan another response and keep the actual changes visible."
      ],
      "check": {
        "prompt": "What can eight correct answers out of ten and a 265-word essay establish by themselves?",
        "answer": "They establish local accuracy on that set and the essay’s length. They do not establish an official band, full task fulfilment, spoken intelligibility or performance on an unfamiliar complete test."
      }
    }
  ],
  "application": "Use the guided error explanation, independent two-skill improvement plan and spoken transfer reflection to build a concrete next step. Retain raw results and self-review labels, and record any missing skill as unassessed."
},
};
