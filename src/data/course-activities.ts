import type { Exercise, CourseActivityData } from "./types";

// Original local learning activities; no official questions or score conversion.
export const courseActivities = [
  {
  "id": "activity-band1-ielts-intro",
  "lessonId": "band1-ielts-intro",
  "type": "course-activity",
  "prompt": "B2 Use of English: cloze and transformations — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Use of English: cloze and transformations",
    "learn": "The Reading and Use of English paper has seven parts in 75 minutes. Parts 1–4 test language in context: multiple-choice cloze, open cloze, word formation and key word transformations. For multiple-choice cloze, compare meaning, grammar and collocation across the whole paragraph. In open cloze, supply one word that fits both sides of the gap. In transformations, use two to five words including the unchanged key word. A familiar expression is not enough: the second sentence must preserve the original meaning.",
    "worked": {
      "example": "We postponed the trip because it was raining. PUT → We put off the trip because it was raining.",
      "reasoning": "“Put off” means postpone. The two-word answer keeps PUT unchanged. “Put away” is grammatical but changes the meaning."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided multiple-choice cloze",
        "instructions": "For the first gap, identify the event meaning and the verb–particle or verb–noun pattern before choosing. For each later gap, state the relationship before entering the word. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A college repair café\nOur college decided to (1) ___ a repair café. We hoped to (2) ___ awareness of waste, but first we had to (3) ___ permission to use a classroom. Volunteers (4) ___ responsibility for different tasks. At the first event, we (5) ___ advice to people with broken lamps. Most visitors (6) ___ attention when we explained basic safety. The project has (7) ___ a difference, although we still (8) ___ difficulties finding spare parts.",
        "questions": [
          {
            "prompt": "Gap 1",
            "answers": [
              "set up"
            ],
            "evidence": "Set up means establish an organisation or event.",
            "explanation": "Set up means establish the repair café. The particle belongs to that creation meaning; an expression about extinguishing or resembling somebody would describe a different event.",
            "options": [
              "set up",
              "put out",
              "take after",
              "break in"
            ],
            "id": "q1"
          },
          {
            "prompt": "Gap 2",
            "answers": [
              "raise"
            ],
            "evidence": "The collocation is raise awareness.",
            "explanation": "Raise awareness is the conventional verb/noun combination. The intended effect is making people aware of waste, not lifting a physical object.",
            "options": [
              "rise",
              "raise",
              "lift up",
              "grow up"
            ],
            "id": "q2"
          },
          {
            "prompt": "Gap 3",
            "answers": [
              "obtain"
            ],
            "evidence": "Obtain permission means receive authorisation.",
            "explanation": "Obtain permission means receive authorisation. The café needs that authorisation before using the classroom; words for giving it would change the volunteers’ role.",
            "options": [
              "obtain",
              "attend",
              "invent",
              "perform"
            ],
            "id": "q3"
          },
          {
            "prompt": "Gap 4",
            "answers": [
              "took"
            ],
            "evidence": "The collocation is take responsibility.",
            "explanation": "Volunteers took responsibility: took preserves the past account and responsibility takes take in this expression. A broadly similar action verb cannot replace the collocation automatically.",
            "options": [
              "made",
              "did",
              "took",
              "held"
            ],
            "id": "q4"
          },
          {
            "prompt": "Gap 5",
            "answers": [
              "gave"
            ],
            "evidence": "Give advice is the appropriate verb–noun combination.",
            "explanation": "Gave advice is a natural combination for helping visitors. Advice is the noun object; the sentence is not asking for a new verb meaning repair.",
            "options": [
              "gave",
              "said",
              "told",
              "spoke"
            ],
            "id": "q5"
          },
          {
            "prompt": "Gap 6",
            "answers": [
              "paid"
            ],
            "evidence": "Pay attention means listen or observe carefully.",
            "explanation": "Paid attention describes visitors listening carefully during safety explanations. The subject is the attentive visitor; draw attention would instead direct somebody else’s notice.",
            "options": [
              "spent",
              "paid",
              "cost",
              "bought"
            ],
            "id": "q6"
          },
          {
            "prompt": "Gap 7",
            "answers": [
              "made"
            ],
            "evidence": "Make a difference means have an effect.",
            "explanation": "Has made a difference reports an effect with present relevance. Made is the participle after has; the expression does not mean manufacture a physical difference.",
            "options": [
              "done",
              "taken",
              "made",
              "kept"
            ],
            "id": "q7"
          },
          {
            "prompt": "Gap 8",
            "answers": [
              "face"
            ],
            "evidence": "Face difficulties means encounter problems.",
            "explanation": "Face difficulties means encounter problems. Still keeps that problem current despite the project’s positive effect, so a past-only success interpretation would lose the contrast.",
            "options": [
              "watch",
              "face",
              "look",
              "view"
            ],
            "id": "q8"
          }
        ],
        "seconds": 600,
        "id": "band1-ielts-intro-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent open cloze",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A study group\nComplete the eight gaps using ONE word each. Read the connected account before answering.",
        "questions": [
          {
            "prompt": "I have lived near the college ___ 2022.",
            "answers": [
              "since"
            ],
            "evidence": "Since introduces the starting point 2022.",
            "explanation": "Since introduces the starting point 2022. For would require a duration such as three years, not a date naming the beginning.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The group meets ___ Tuesday evenings.",
            "answers": [
              "on"
            ],
            "evidence": "On is used with named days.",
            "explanation": "On links a repeated named day to the meeting. At would suit a clock time in a different frame, so the information type matters.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "There are six students, all of ___ study biology.",
            "answers": [
              "whom"
            ],
            "evidence": "Whom refers to the students after “of”.",
            "explanation": "All of whom refers to people in the preceding group. Of is already supplied, and the relative phrase needs whom rather than a new independent they clause.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "We take turns so ___ everyone can ask questions.",
            "answers": [
              "that"
            ],
            "evidence": "So that introduces purpose.",
            "explanation": "So that introduces the intended purpose. That completes the already started conjunction; entering the whole conjunction would duplicate so.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "I am interested ___ environmental research.",
            "answers": [
              "in"
            ],
            "evidence": "Interested is followed by in.",
            "explanation": "Interested in is the adjective’s usual complement pattern here. The preposition links the interest to its topic rather than mark a location.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Our notes are clearer ___ they were last term.",
            "answers": [
              "than"
            ],
            "evidence": "Than introduces the comparison after clearer.",
            "explanation": "Clearer introduces a comparison with the earlier version, so than connects its standard. Then would describe time order instead.",
            "maxWords": 1,
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "One student was absent, ___ we shared the notes with her.",
            "answers": [
              "so"
            ],
            "evidence": "So expresses the result of her absence.",
            "explanation": "So introduces a consequence of the absence. Because in this position would reverse the reason/result relationship.",
            "maxWords": 1,
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "We have not finished the project ___.",
            "answers": [
              "yet"
            ],
            "evidence": "Yet fits this negative present perfect statement.",
            "explanation": "Yet fits an expected action not completed by the present point in a negative perfect account. It retains the not-completed expectation rather than assert completion.",
            "maxWords": 1,
            "id": "q8",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-ielts-intro-stage-2",
        "compatibleWithSignature": "v1-51e0254e"
      },
      {
        "kind": "language",
        "title": "Assessment: key word transformations",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Keep each key word unchanged. Write TWO to FIVE words in each gap. Contractions are avoided here to make word counting transparent.",
        "questions": [
          {
            "prompt": "They cancelled the meeting. OFF → They ___ the meeting.",
            "answers": [
              "called off"
            ],
            "evidence": "Call off means cancel; called preserves past tense.",
            "explanation": "Called off preserves cancellation and the original past time. Putting something away would describe storage, and calling it on would not preserve the action.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Mina started studying here three years ago. FOR → Mina has studied here ___.",
            "answers": [
              "for three years"
            ],
            "evidence": "For introduces a duration; present perfect connects past to now.",
            "explanation": "For three years gives duration while the printed perfect verb connects it to now. Do not duplicate a verb already outside the gap or replace duration with a starting date.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The bag was too heavy for me to lift. ENOUGH → I was not ___ the bag.",
            "answers": [
              "strong enough to lift"
            ],
            "evidence": "Not strong enough preserves the inability to lift.",
            "explanation": "Not strong enough to lift keeps the person’s inability. Heavy described the box; the target subject is the person, so not heavy enough would change the limitation.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "“Do not use my laptop,” Ana said. TOLD → Ana ___ use her laptop.",
            "answers": [
              "told me not to"
            ],
            "evidence": "Reported negative instructions use told + object + not to.",
            "explanation": "Told me not to uses a person object and puts the negative before the infinitive. Check the remaining printed verb and pronouns so the speaker’s instruction survives.",
            "maxWords": 5,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "It is unnecessary to bring food. HAVE → You ___ bring food.",
            "answers": [
              "do not have to"
            ],
            "evidence": "Lack of necessity is do not have to, not must not.",
            "explanation": "Do not have to permits the action without requiring it. Must not would forbid it, so it is not an equivalent stronger-sounding alternative.",
            "maxWords": 5,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "I prefer cycling to driving. RATHER → I would ___ drive.",
            "answers": [
              "rather cycle than"
            ],
            "evidence": "Would rather A than B expresses the same preference.",
            "explanation": "Would rather cycle than preserves which activity is preferred. Rather takes a base verb in this frame; reversing the two activities would reverse the preference.",
            "maxWords": 5,
            "id": "q6",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-ielts-intro-stage-3",
        "compatibleWithSignature": "v1-b3a13089"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-toefl-intro",
  "lessonId": "band1-toefl-intro",
  "type": "course-activity",
  "prompt": "B2 Word Formation: building meaning in context — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Word Formation: building meaning in context",
    "learn": "In Part 3, the gap needs a form of the supplied word. Read the whole sentence to decide its grammatical role, then check number, negative meaning and spelling. Suffixes are clues, not rules that work for every word. A noun may require a plural ending; an adjective may need a negative prefix. Read the finished paragraph to ensure the meaning fits.",
    "worked": {
      "example": "The tutor gave a detailed ___ of the method. (EXPLAIN) → explanation. The tutor explained the method ___ . (CLEAR) → clearly.",
      "reasoning": "A detailed needs the noun head explanation; explained is already the finite verb, so clearly is an adverb describing how the action was performed. Identify the complete phrase and role before selecting the family form."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "A community garden",
        "instructions": "First label each target role without spelling a form: noun, adjective, verb or adverb. Complete one form, then reread for meaning and number. Use fewer labels as the paragraph becomes clear. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Residents turned an unused yard into a garden. A shared project required careful planning, patient communication and decisions about who would do each job.",
        "questions": [
          {
            "prompt": "The garden is open to all local ___ (RESIDE).",
            "answers": [
              "residents"
            ],
            "evidence": "A plural noun names the people who live locally.",
            "explanation": "The source supports this answer: A plural noun names the people who live locally.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Its ___ (CREATE) required months of work.",
            "answers": [
              "creation"
            ],
            "evidence": "Its is followed by a noun; creation names the process.",
            "explanation": "The source supports this answer: Its is followed by a noun; creation names the process.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "A detailed plan made the work more ___ (MANAGE).",
            "answers": [
              "manageable"
            ],
            "evidence": "More modifies the adjective manageable.",
            "explanation": "The source supports this answer: More modifies the adjective manageable.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Volunteers receive ___ (PRACTICE) training.",
            "answers": [
              "practical"
            ],
            "evidence": "The adjective practical modifies training.",
            "explanation": "The source supports this answer: The adjective practical modifies training.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "The coordinator explains tasks ___ (CLEAR).",
            "answers": [
              "clearly"
            ],
            "evidence": "An adverb modifies explains.",
            "explanation": "The source supports this answer: An adverb modifies explains.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Teamwork has been especially ___ (VALUE).",
            "answers": [
              "valuable"
            ],
            "evidence": "Been is followed by an adjective here.",
            "explanation": "The source supports this answer: Been is followed by an adjective here.",
            "maxWords": 1,
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Water use fell ___ (SIGNIFICANT).",
            "answers": [
              "significantly"
            ],
            "evidence": "The adverb describes the size of the fall.",
            "explanation": "The source supports this answer: The adverb describes the size of the fall.",
            "maxWords": 1,
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "The project depends on regular ___ (MAINTAIN).",
            "answers": [
              "maintenance"
            ],
            "evidence": "The noun after regular is maintenance.",
            "explanation": "The source supports this answer: The noun after regular is maintenance.",
            "maxWords": 1,
            "id": "q8",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-toefl-intro-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "An accessible museum",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A small museum redesigned its displays after speaking with visitors. The team wanted clearer information without removing challenging ideas.",
        "questions": [
          {
            "prompt": "The new signs improve ___ (ACCESS).",
            "answers": [
              "accessibility",
              "access"
            ],
            "evidence": "Accessibility and access are both nouns that fit improve in this context. Accessibility highlights ease of access; the source does not require that distinction.",
            "explanation": "Accessibility and access are both nouns that fit improve in this context. Accessibility highlights ease of access; the source does not require that distinction.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The director welcomed visitors’ ___ (SUGGEST).",
            "answers": [
              "suggestions",
              "suggestion"
            ],
            "evidence": "A plural possessive names the owners; it does not require the thing owned to be plural. Visitors may share one suggestion or offer several suggestions here.",
            "explanation": "A plural possessive names the owners; it does not require the thing owned to be plural. Visitors may share one suggestion or offer several suggestions here.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "A ___ (DESIGN) created a simpler map.",
            "answers": [
              "designer"
            ],
            "evidence": "A person who designs is a designer.",
            "explanation": "The source supports this answer: A person who designs is a designer.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Each display includes a short ___ (EXPLAIN).",
            "answers": [
              "explanation"
            ],
            "evidence": "A countable noun follows a short.",
            "explanation": "The source supports this answer: A countable noun follows a short.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "The museum avoids ___ (NECESSARY) technical terms.",
            "answers": [
              "unnecessary"
            ],
            "evidence": "The context requires terms that are not needed.",
            "explanation": "The source supports this answer: The context requires terms that are not needed.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "The labels are ___ (USUAL) easy to read.",
            "answers": [
              "unusually",
              "usually"
            ],
            "evidence": "Both adverbs can modify easy. Unusually means more easily readable than expected; usually means normally. The source does not specify a frequency or surprise constraint, so both forms are accepted.",
            "explanation": "Both adverbs can modify easy. Unusually means more easily readable than expected; usually means normally. The source does not specify a frequency or surprise constraint, so both forms are accepted.",
            "maxWords": 1,
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "The changes increased visitor ___ (SATISFY).",
            "answers": [
              "satisfaction"
            ],
            "evidence": "The noun satisfaction names the feeling.",
            "explanation": "The source supports this answer: The noun satisfaction names the feeling.",
            "maxWords": 1,
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Staff will review their ___ (EFFECTIVE) next year.",
            "answers": [
              "effectiveness"
            ],
            "evidence": "The noun names how effective the changes are.",
            "explanation": "The source supports this answer: The noun names how effective the changes are.",
            "maxWords": 1,
            "id": "q8",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-toefl-intro-stage-2",
        "compatibleWithSignature": "v1-390c0784"
      },
      {
        "kind": "language",
        "title": "A volunteer survey",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A library asked users to comment on its weekend programme. Staff compared responses, recorded limitations and planned a small trial.",
        "questions": [
          {
            "prompt": "The survey encouraged active ___ (PARTICIPATE).",
            "answers": [
              "participation"
            ],
            "evidence": "A noun follows active.",
            "explanation": "The source supports this answer: A noun follows active.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Some comments were ___ (CRITIC).",
            "answers": [
              "critical"
            ],
            "evidence": "An adjective describes the comments.",
            "explanation": "The source supports this answer: An adjective describes the comments.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Staff responded ___ (POLITE).",
            "answers": [
              "politely"
            ],
            "evidence": "An adverb describes responded.",
            "explanation": "The source supports this answer: An adverb describes responded.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "The results revealed a ___ (PREFER) for later opening.",
            "answers": [
              "preference"
            ],
            "evidence": "The noun preference follows a.",
            "explanation": "The source supports this answer: The noun preference follows a.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "A ___ (RELY) timetable was essential.",
            "answers": [
              "reliable"
            ],
            "evidence": "The adjective reliable modifies timetable.",
            "explanation": "The source supports this answer: The adjective reliable modifies timetable.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "The trial was not ___ (COMPLETE) successful.",
            "answers": [
              "completely"
            ],
            "evidence": "The adverb modifies successful.",
            "explanation": "The source supports this answer: The adverb modifies successful.",
            "maxWords": 1,
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Costs remained ___ (REASON).",
            "answers": [
              "reasonable"
            ],
            "evidence": "The adjective means fair or sensible in amount.",
            "explanation": "The source supports this answer: The adjective means fair or sensible in amount.",
            "maxWords": 1,
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Further ___ (IMPROVE) will depend on funding.",
            "answers": [
              "improvements",
              "improvement"
            ],
            "evidence": "Further improvement can name an uncountable process; further improvements can name multiple changes. Will depend has the same form with either subject, and the context allows both.",
            "explanation": "Further improvement can name an uncountable process; further improvements can name multiple changes. Will depend has the same form with either subject, and the context allows both.",
            "maxWords": 1,
            "id": "q8",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-toefl-intro-stage-3",
        "compatibleWithSignature": "v1-e9d9a1b1"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-ielts-vs-toefl",
  "lessonId": "band1-ielts-vs-toefl",
  "type": "course-activity",
  "prompt": "Tense and aspect: events, duration and evidence — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "Tense and aspect: events, duration and evidence",
    "learn": "Choose tense by the meaning and time relationship, not by a single trigger word. Past simple locates a finished event; present perfect connects an earlier event with now. Past perfect establishes an earlier past event when the sequence needs clarification. Progressive forms describe an activity in progress; many state verbs normally use simple forms. Read the speaker’s viewpoint and the surrounding clauses.",
    "worked": {
      "example": "When I arrived, the workshop had already started.",
      "reasoning": "Arrival is one past event. The workshop began before that event, so past perfect makes the order explicit."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided timeline: a college exhibition",
        "instructions": "Work through the exhibition in order: completed dated opening / background action at interruption / check completed before arrival. Build the auxiliary and main form separately before reading the whole timeline. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Complete each verb phrase. Context establishes the timeline; use the form of the verb in brackets.",
        "questions": [
          {
            "prompt": "The exhibition ___ yesterday at noon. (OPEN)",
            "answers": [
              "opened"
            ],
            "evidence": "Yesterday locates a finished event.",
            "explanation": "Opened reports the exhibition’s completed event yesterday. A present-perfect form would conflict with that explicit finished event time in this account.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "We ___ the posters when the lights went out. (PRINT)",
            "answers": [
              "were printing"
            ],
            "evidence": "The printing was in progress when interrupted.",
            "explanation": "Were printing places a plural subject’s activity in progress at the interruption. Printed would normally present a completed event; had printed would locate completion earlier.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "By the time visitors arrived, we ___ every display. (CHECK)",
            "answers": [
              "had checked"
            ],
            "evidence": "The check was complete before the past arrival.",
            "explanation": "Had checked makes the check complete before the later past arrival. The past perfect marks that relationship, rather than simply making every past verb more advanced.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-ielts-vs-toefl-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent timeline: a research visit",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Supply the verb phrase; preserve the time reference.",
        "questions": [
          {
            "prompt": "I ___ three emails to the organiser so far today. (SEND)",
            "answers": [
              "have sent"
            ],
            "evidence": "So far today is an unfinished period with a present result.",
            "explanation": "Have sent counts completed results up to now in the unfinished so-far-today period. The participle follows plural have.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "She ___ the laboratory in 2021. (JOIN)",
            "answers": [
              "joined"
            ],
            "evidence": "2021 is a finished past time.",
            "explanation": "Joined places the event in the finished time 2021. Present-perfect joined would not match that explicitly finished event frame.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The students ___ the samples right now. (EXAMINE)",
            "answers": [
              "are examining"
            ],
            "evidence": "Right now describes a current activity.",
            "explanation": "Are examining uses plural be plus -ing for the activity occurring right now. The auxiliary carries agreement while examining supplies the activity.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-ielts-vs-toefl-stage-2",
        "compatibleWithSignature": "v1-78cf4224"
      },
      {
        "kind": "language",
        "title": "Assessment: change the viewpoint",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use the bracketed verb to complete each account.",
        "questions": [
          {
            "prompt": "Before he moved here, he ___ in a rural town for ten years. (LIVE)",
            "answers": [
              "had lived",
              "had been living",
              "lived"
            ],
            "evidence": "The residence occurred before the past move.",
            "explanation": "Had lived, had been living and lived can all describe the residence before the move. The perfect forms look back from a past point; the progressive foregrounds duration. The context does not justify rejecting the other authored accounts.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The institute ___ in public education since 2018. (INVEST)",
            "answers": [
              "has invested",
              "has been investing"
            ],
            "evidence": "Since 2018 links a starting point to the present.",
            "explanation": "Has invested and has been investing both connect activity since 2018 with now. The progressive emphasises ongoing activity; the simple perfect can present the accumulated investment. Since does not force one form universally.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "I ___ your concern, but the trial needs more time. (UNDERSTAND)",
            "answers": [
              "understand"
            ],
            "evidence": "Understand is a state verb in this meaning.",
            "explanation": "Understand expresses a present state of comprehension here, so the ordinary simple form fits. This concerns the verb’s current sense, not a ban on every progressive use of every state-related word.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-ielts-vs-toefl-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-c805eaf6"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-listening-format",
  "lessonId": "band1-listening-format",
  "type": "course-activity",
  "prompt": "B2 Listening: short extracts and precise detail — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Listening: short extracts and precise detail",
    "learn": "B2 Listening Part 1 uses short extracts with three answer options. Identify the speaker’s purpose and final meaning. Words from a rejected option may still occur in the recording. Read all alternatives, listen once for the situation and again for evidence. In the examination recordings are heard twice; these shorter lesson activities allow replay.",
    "worked": {
      "example": "“I wanted to book Friday, but it was full, so I chose Saturday.” → The booking is for Saturday.",
      "reasoning": "Friday is a distractor because it was the first preference, not the final booking."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided extract: a changed plan",
        "instructions": "For the first recording, make empty notes for earlier intention / obstacle / confirmed arrangement. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-001.wav",
          "transcript": "I was going to take the bus to the festival, but the road near the park is closed. My brother offered to drive, although that would mean leaving very early. In the end I booked a place on the river boat. It costs more, but it stops right beside the entrance.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "How will the speaker travel?",
            "answers": [
              "By boat"
            ],
            "evidence": "In the end I booked a place on the river boat.",
            "explanation": "The source supports this answer: In the end I booked a place on the river boat.",
            "options": [
              "By bus",
              "By car",
              "By boat"
            ],
            "id": "q1"
          }
        ],
        "id": "band1-listening-format-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent extracts: purpose and detail",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-002.wav",
          "transcript": "Extract one. I am calling about the pottery class. I do not need a refund, and the teacher was excellent. However, the website says that beginners do not need equipment, while the confirmation email asks us to bring our own tools. Could you tell me which instruction is correct? Extract two. I expected the photography workshop to be too basic. Actually, the technical advice was quite demanding, and I left with several useful ideas. I only wish there had been more time to practise outside.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Why does the first speaker call?",
            "answers": [
              "To clarify conflicting information"
            ],
            "evidence": "Website and confirmation email give different instructions.",
            "explanation": "The source supports this answer: Website and confirmation email give different instructions.",
            "options": [
              "To request a refund",
              "To clarify conflicting information",
              "To complain about the teacher"
            ],
            "id": "q1"
          },
          {
            "prompt": "How does the second speaker feel?",
            "answers": [
              "Impressed by the teaching but wanting more practice"
            ],
            "evidence": "Useful demanding advice; wished for more time outside.",
            "explanation": "The source supports this answer: Useful demanding advice; wished for more time outside.",
            "options": [
              "Disappointed by elementary teaching",
              "Impressed by the teaching but wanting more practice",
              "Unable to understand any advice"
            ],
            "id": "q2"
          }
        ],
        "id": "band1-listening-format-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment: new extract",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-003.wav",
          "transcript": "The organiser asked whether we should cancel the concert because of the rain. I suggested using the school hall instead. It would hold fewer people, but anyone with an existing ticket would still get a seat. We agreed to move indoors and tell people online. There is no need to apply for a new ticket.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What has been decided?",
            "answers": [
              "Change the venue"
            ],
            "evidence": "We agreed to move indoors.",
            "explanation": "The source supports this answer: We agreed to move indoors.",
            "options": [
              "Cancel the concert",
              "Change the venue",
              "Issue new tickets"
            ],
            "id": "q1"
          },
          {
            "prompt": "What must existing ticket holders do?",
            "answers": [
              "Keep their current tickets"
            ],
            "evidence": "There is no need to apply for a new ticket.",
            "explanation": "The source supports this answer: There is no need to apply for a new ticket.",
            "options": [
              "Buy replacement tickets",
              "Ask for a refund",
              "Keep their current tickets"
            ],
            "id": "q2"
          }
        ],
        "id": "band1-listening-format-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-listening-gist",
  "lessonId": "band1-listening-gist",
  "type": "course-activity",
  "prompt": "B2 Listening: gist and sentence completion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Listening: gist and sentence completion",
    "learn": "Connected speech reduces boundaries between words, so listen for meaning groups rather than trying to identify every syllable. For Part 2 sentence completion, predict the type of information needed, then record the precise detail in the recording. Check spelling and whether your answer fits the surrounding sentence. Reduced pronunciation does not change the underlying words.",
    "worked": {
      "example": "“The first session is free; later sessions cost eight pounds.” → The introductory session costs nothing.",
      "reasoning": "The contrast separates the initial offer from the regular price. Writing eight pounds for the first session would ignore that contrast."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided completion: a workshop",
        "instructions": "For the first recording, make empty notes for supplied item / participant item / requested location. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-004.wav",
          "transcript": "Our introductory printing session is free. Please bring an apron because the ink can stain clothing. We provide paper, so you do not need to buy any. The session will take place in the studio behind the library.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Participants should bring an ___.",
            "answers": [
              "apron"
            ],
            "evidence": "Please bring an apron.",
            "explanation": "The source supports this answer: Please bring an apron.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The session is in the ___.",
            "answers": [
              "studio"
            ],
            "evidence": "In the studio behind the library.",
            "explanation": "The source supports this answer: In the studio behind the library.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band1-listening-gist-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent completion: a community radio project",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-005.wav",
          "transcript": "Our community radio project began in a garage before moving into the arts centre. Beginners first learn interviewing, rather than editing, because we believe good questions are the basis of useful programmes. Each team then prepares a five-minute report about a local event. Last year the most popular report was about a garden created beside the railway. We lend microphones to teams, but headphones must be brought from home. Finished reports are broadcast on Sundays. We originally used Friday evenings, but too many volunteers were unavailable. Please send your application by email, and include one idea for a local story.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "The project first operated from a ___.",
            "answers": [
              "garage"
            ],
            "evidence": "Our project began in a garage.",
            "explanation": "The source supports this answer: Our project began in a garage.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The first skill taught is ___.",
            "answers": [
              "interviewing"
            ],
            "evidence": "Beginners first learn interviewing.",
            "explanation": "The source supports this answer: Beginners first learn interviewing.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The popular report described a ___.",
            "answers": [
              "garden"
            ],
            "evidence": "A garden created beside the railway.",
            "explanation": "The source supports this answer: A garden created beside the railway.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Participants must provide their own ___.",
            "answers": [
              "headphones"
            ],
            "evidence": "Headphones must be brought from home.",
            "explanation": "The source supports this answer: Headphones must be brought from home.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Reports are now broadcast on ___.",
            "answers": [
              "Sundays"
            ],
            "evidence": "Finished reports are broadcast on Sundays.",
            "explanation": "The source supports this answer: Finished reports are broadcast on Sundays.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          }
        ],
        "id": "band1-listening-gist-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment: a new activity",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-006.wav",
          "transcript": "The bookbinding course lasts six weeks. In the first lesson you will learn to fold the paper accurately. We supply thread and glue, but please bring scissors. The fee includes a visit to a local archive during the fourth week. The final session ends with an exhibition of participants’ work, rather than a written test.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Bring your own ___.",
            "answers": [
              "scissors"
            ],
            "evidence": "Please bring scissors.",
            "explanation": "The source supports this answer: Please bring scissors.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The fourth week includes a visit to an ___.",
            "answers": [
              "archive"
            ],
            "evidence": "A visit to a local archive during the fourth week.",
            "explanation": "The source supports this answer: A visit to a local archive during the fourth week.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The course finishes with an ___.",
            "answers": [
              "exhibition"
            ],
            "evidence": "The final session ends with an exhibition.",
            "explanation": "The source supports this answer: The final session ends with an exhibition.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "id": "band1-listening-gist-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-listening-attitude",
  "lessonId": "band1-listening-attitude",
  "type": "course-activity",
  "prompt": "B2 Listening: attitude and multiple matching — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Listening: attitude and multiple matching",
    "learn": "Identify attitude from the whole statement, including contrasts and changes of mind. Part 3 uses five short monologues and a list of eight statements. Match each speaker’s message, not one familiar word. These lesson sets build toward that format with extra unused statements. A positive detail can occur inside a critical overall judgement.",
    "worked": {
      "example": "“It was expensive, but I would happily go again.” → The overall recommendation is positive.",
      "reasoning": "The concession about price does not cancel the willingness to return."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided speaker attitudes",
        "instructions": "For the first recording, make empty notes for expectation / actual experience / final judgement. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-007.wav",
          "transcript": "Speaker A. I signed up because my friends did, but I stayed because the work felt useful. Speaker B. I loved the idea, but I had not realised how much preparation each session would involve.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Which statement best describes why Speaker A continued?",
            "answers": [
              "Motivated by the value of the work"
            ],
            "evidence": "Stayed because the work felt useful.",
            "explanation": "Friends explain the initial enrolment, but stayed because identifies useful work as the continuing motive. The answer must match that later reason; it does not say the work felt pointless.",
            "options": [
              "Motivated by the value of the work",
              "Surprised by the workload",
              "Disappointed because the work felt pointless",
              "Found less preparation was needed than expected",
              "Values the company more than the work itself"
            ],
            "id": "q1"
          },
          {
            "prompt": "What did Speaker B find unexpected?",
            "answers": [
              "Surprised by the workload"
            ],
            "evidence": "Had not realised how much preparation was involved.",
            "explanation": "Had not realised marks a mismatch between expectation and preparation demands. Loving the idea can coexist with surprise at workload; it is not a total rejection or evidence of less planning.",
            "options": [
              "Motivated by the value of the work",
              "Surprised by the workload",
              "Disappointed because the work felt pointless",
              "Found less preparation was needed than expected",
              "Values the company more than the work itself"
            ],
            "id": "q2"
          }
        ],
        "id": "band1-listening-attitude-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent multiple matching",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-008.wav",
          "transcript": "Speaker A. At first I worried about speaking in front of strangers. The tutor let us practise in pairs, and now I enjoy explaining my ideas. Speaker B. I thought the course would help me get promoted, but the certificate is not recognised by my employer. I still learned something useful. Speaker C. I almost left because the room was always noisy. Once we moved upstairs, I could finally concentrate. Speaker D. The subject was difficult, but another learner shared her notes every week. Without that support I might not have finished. Speaker E. I did not expect to enjoy the practical work. Now I spend my weekends building small pieces of furniture.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Match speaker A",
            "answers": [
              "Gained confidence"
            ],
            "evidence": "Now I enjoy explaining my ideas.",
            "explanation": "The speaker moves from fear of strangers to enjoying explanation after pair practice. The change is confidence; the tutor’s pair work helped rather than hindered it.",
            "options": [
              "Gained confidence",
              "Missed a career expectation",
              "Benefited from a change of setting",
              "Relied on another learner",
              "Developed an unexpected interest",
              "Found pair practice unhelpful",
              "Regrets the move to a quieter room",
              "Lost interest after trying practical work"
            ],
            "id": "q1"
          },
          {
            "prompt": "Match speaker B",
            "answers": [
              "Missed a career expectation"
            ],
            "evidence": "The certificate is not recognised by my employer.",
            "explanation": "The hoped-for promotion benefit failed because the employer did not recognise the certificate. Still learned something useful preserves an educational benefit despite that career disappointment.",
            "options": [
              "Gained confidence",
              "Missed a career expectation",
              "Benefited from a change of setting",
              "Relied on another learner",
              "Developed an unexpected interest",
              "Found pair practice unhelpful",
              "Regrets the move to a quieter room",
              "Lost interest after trying practical work"
            ],
            "id": "q2"
          },
          {
            "prompt": "Match speaker C",
            "answers": [
              "Benefited from a change of setting"
            ],
            "evidence": "Once we moved upstairs, I could finally concentrate.",
            "explanation": "The noisy room prevented concentration; moving upstairs solved that difficulty. This is a setting change, not regret about the quieter space.",
            "options": [
              "Gained confidence",
              "Missed a career expectation",
              "Benefited from a change of setting",
              "Relied on another learner",
              "Developed an unexpected interest",
              "Found pair practice unhelpful",
              "Regrets the move to a quieter room",
              "Lost interest after trying practical work"
            ],
            "id": "q3"
          },
          {
            "prompt": "Match speaker D",
            "answers": [
              "Relied on another learner"
            ],
            "evidence": "Another learner shared her notes every week.",
            "explanation": "Another learner’s weekly notes made completion possible. The support comes from a peer, not a claim that the subject became easy.",
            "options": [
              "Gained confidence",
              "Missed a career expectation",
              "Benefited from a change of setting",
              "Relied on another learner",
              "Developed an unexpected interest",
              "Found pair practice unhelpful",
              "Regrets the move to a quieter room",
              "Lost interest after trying practical work"
            ],
            "id": "q4"
          },
          {
            "prompt": "Match speaker E",
            "answers": [
              "Developed an unexpected interest"
            ],
            "evidence": "Now I spend my weekends building small pieces of furniture.",
            "explanation": "Unexpected enjoyment develops into weekend furniture building. That continuing activity shows a new interest, the opposite of losing interest after practical work.",
            "options": [
              "Gained confidence",
              "Missed a career expectation",
              "Benefited from a change of setting",
              "Relied on another learner",
              "Developed an unexpected interest",
              "Found pair practice unhelpful",
              "Regrets the move to a quieter room",
              "Lost interest after trying practical work"
            ],
            "id": "q5"
          }
        ],
        "id": "band1-listening-attitude-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment: new speakers",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-009.wav",
          "transcript": "Speaker A. I had read every instruction before the walk, but they did not prepare me for how steep the path would be. Next time I will train first. Speaker B. The route was harder than expected. Still, everyone waited when I needed a rest, which made all the difference. Speaker C. I appreciated the scenery, but the main pleasure was discovering that I could finish a challenge I had almost refused.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Match speaker A",
            "answers": [
              "Recognises a need for better preparation"
            ],
            "evidence": "Next time I will train first.",
            "explanation": "Reading instructions did not prepare the speaker physically for a steep path. Training next time is the proposed repair; the statement does not claim instructions replace training.",
            "options": [
              "Recognises a need for better preparation",
              "Values the group’s patience",
              "Feels proud of a personal achievement",
              "Thinks written instructions remove the need to train",
              "Would prefer the group not to wait for anyone",
              "Values the scenery more than completing the challenge"
            ],
            "id": "q1"
          },
          {
            "prompt": "Match speaker B",
            "answers": [
              "Values the group’s patience"
            ],
            "evidence": "Everyone waited when I needed a rest.",
            "explanation": "The route was difficult, but the group waited at rests. The valued factor is patience, rather than a wish to keep moving without others.",
            "options": [
              "Recognises a need for better preparation",
              "Values the group’s patience",
              "Feels proud of a personal achievement",
              "Thinks written instructions remove the need to train",
              "Would prefer the group not to wait for anyone",
              "Values the scenery more than completing the challenge"
            ],
            "id": "q2"
          },
          {
            "prompt": "Match speaker C",
            "answers": [
              "Feels proud of a personal achievement"
            ],
            "evidence": "Discovering that I could finish a challenge.",
            "explanation": "Scenery is appreciated, but main pleasure ranks completing the nearly refused challenge higher. The answer must retain that comparison, not choose the scenery merely because it was mentioned.",
            "options": [
              "Recognises a need for better preparation",
              "Values the group’s patience",
              "Feels proud of a personal achievement",
              "Thinks written instructions remove the need to train",
              "Would prefer the group not to wait for anyone",
              "Values the scenery more than completing the challenge"
            ],
            "id": "q3"
          }
        ],
        "id": "band1-listening-attitude-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-reading-skimming",
  "lessonId": "band1-reading-skimming",
  "type": "course-activity",
  "prompt": "B2 Reading: main ideas, evidence and multiple choice — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Reading: main ideas, evidence and multiple choice",
    "learn": "Part 5 tests understanding of a longer text, including detail, purpose, attitude and implications. Skim to find the topic and development, then read around the relevant evidence carefully. A topic sentence may appear anywhere: there is no reliable percentage rule for its position. A correct option must fit the whole relevant idea; copied vocabulary alone proves nothing.",
    "worked": {
      "example": "“Attendance fell at first, then recovered after the timetable changed.” The project had an early difficulty, not a permanent decline.",
      "reasoning": "The time sequence rules out an option claiming that participation kept falling."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: purpose and evidence",
        "instructions": "Make empty notes for expectation, actual users, adjustment and remaining limit. Locate the clause needed by the current question; distinguish a reported fact from an evaluation before choosing. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A library without walls\n\nWhen Hillford Library began lending books from a converted bus, staff expected most visitors to be older residents who could not reach the town centre. Several did use it, but young families soon became its largest group. The bus stopped beside a playground after school, allowing parents to borrow books while children chose stories together.\n\nThe service did not replace the main library. Its small shelves held only a limited selection, so readers ordered specialist titles in advance. Staff brought these on the next visit. This arrangement made the collection feel much larger than the vehicle itself.\n\nThe trial also revealed a difficulty: a popular stopping place was beside a busy road. After residents raised safety concerns, the route was changed to use a nearby community centre. Attendance dipped during the first week, then recovered. The librarian argues that a mobile service should be judged by access as well as borrowing totals. A bus cannot offer quiet study space, but it can help people begin a reading habit. Expansion would depend on whether enough staff could maintain a reliable timetable.",
        "questions": [
          {
            "prompt": "Where was the popular but unsafe stopping place?",
            "answers": [
              "busy road"
            ],
            "evidence": "A popular stopping place was beside a busy road.",
            "explanation": "The source supports this answer: A popular stopping place was beside a busy road.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What conclusion does the Hillford trial support?",
            "answers": [
              "The service improves access but cannot replace every library function."
            ],
            "evidence": "The trial also revealed a difficulty: a popular stopping place was beside a busy road. After residents raised safety concerns, the route was changed to use a nearby community centre. Attendance dipped during the first week, then recovered. The librarian argues that a mobile service should be judged by access as well as borrowing totals. A bus cannot offer quiet study space, but it can help people begin a reading habit. Expansion would depend on whether enough staff could maintain a reliable timetable.",
            "explanation": "The bus improves access and borrowing, but its limited stock and lack of quiet study space prevent a whole-library replacement claim. Safety and staffing also condition expansion.",
            "options": [
              "The bus should replace the main library because families prefer it.",
              "Specialist books cannot be borrowed through a mobile service.",
              "The service improves access but cannot replace every library function.",
              "Borrowing totals alone establish whether the route should expand."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band1-reading-skimming-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: purpose and evidence",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Learning to repair\n\nAt nineteen, Mara bought a broken radio from a market because she liked its wooden case. She intended to use it as a decoration, but a neighbour offered to help her repair it. The radio eventually worked, and the experience changed what she noticed when she went shopping. A low price no longer seemed attractive if a product could not be opened without breaking it.\n\nMara later joined a repair group at college. The sessions were informal, yet safety was taken seriously: volunteers checked plugs before touching any electrical part. Members were encouraged to explain their reasoning rather than take a tool out of a beginner’s hands. This sometimes made a repair slower, but the aim was learning rather than simply increasing the number of fixed objects.\n\nNot everything could be saved. Replacement parts for one printer cost more than a new machine, and another device had been sealed with glue. These failures became useful discussions about product design. Mara does not claim that people should repair every item indefinitely. Some equipment uses so much energy that replacement may be sensible. She believes, however, that buyers should have enough information to make that decision rather than being forced into it by an inaccessible screw or unavailable part.\n\nThe group’s approach also changed how Mara responded to mistakes. During her first attempt to mend a lamp, she replaced a part before checking whether it was actually responsible for the fault. A volunteer asked her to explain the evidence for the decision. She realised that she had chosen the most visible component rather than tested the simpler possibilities. The lamp eventually needed only a loose connection secured.\n\nInstead of feeling that the failed attempt had been wasted, Mara began keeping a brief record of what she had checked and why. The notes helped when a similar problem appeared later. They also made it easier to ask for useful advice, because she could explain what had already been tried. She now sees diagnosis as a skill in its own right, rather than a delay before the more satisfying moment of using a tool.\n\nThe repair group has considered charging for its work, but members are cautious. A service expected to fix objects quickly might leave less time for explanations. They would prefer a small contribution toward materials while keeping the sessions focused on shared learning. This would not make the group a replacement for a professional repair business. It would give beginners a place to understand ordinary problems and recognise the limits of their knowledge.",
        "questions": [
          {
            "prompt": "What did Mara originally want to use as a decoration?",
            "answers": [
              "radio"
            ],
            "evidence": "She intended to use the radio as a decoration.",
            "explanation": "The source supports this answer: She intended to use the radio as a decoration.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What principle links Mara's repair experiences?",
            "answers": [
              "Repair knowledge helps buyers make informed decisions, although replacement can sometimes be sensible."
            ],
            "evidence": "The repair group has considered charging for its work, but members are cautious. A service expected to fix objects quickly might leave less time for explanations. They would prefer a small contribution toward materials while keeping the sessions focused on shared learning. This would not make the group a replacement for a professional repair business. It would give beginners a place to understand ordinary problems and recognise the limits of their knowledge.",
            "explanation": "Repair knowledge helps people test causes and judge whether repair is worthwhile. Replacing a part without diagnosis wastes effort, while some replacements are still sensible; neither automatic repair nor automatic replacement matches Mara’s view.",
            "options": [
              "Repair knowledge helps buyers make informed decisions, although replacement can sometimes be sensible.",
              "Keeping any old device is preferable to replacing it.",
              "Successful repair depends mainly on choosing the most visible faulty part.",
              "A repair club should prioritise the number of completed jobs over explanation."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "What mistake did Mara make with the lamp?",
            "answers": [
              "She replaced a part without testing whether it caused the fault"
            ],
            "evidence": "She chose a visible component rather than testing simpler possibilities.",
            "explanation": "Evidence and reasoning: She chose a visible component rather than testing simpler possibilities.",
            "options": [
              "She refused all help",
              "She replaced a part without testing whether it caused the fault",
              "She bought a new lamp immediately",
              "She lost every tool"
            ],
            "id": "q3"
          },
          {
            "prompt": "Why did she begin keeping notes?",
            "answers": [
              "To track reasoning and explain previous checks"
            ],
            "evidence": "Notes helped with later problems and requests for advice.",
            "explanation": "Evidence and reasoning: Notes helped with later problems and requests for advice.",
            "options": [
              "To avoid thinking about mistakes",
              "To track reasoning and explain previous checks",
              "To prove every repair succeeds",
              "To advertise expensive products"
            ],
            "id": "q4"
          },
          {
            "prompt": "Why is the group cautious about charging for repairs?",
            "answers": [
              "Speed expectations could reduce teaching time"
            ],
            "evidence": "Quick service might leave less time for explanations.",
            "explanation": "Evidence and reasoning: Quick service might leave less time for explanations.",
            "options": [
              "Nobody needs spare parts",
              "Speed expectations could reduce teaching time",
              "All professional repair is unnecessary",
              "The group refuses safety rules"
            ],
            "id": "q5"
          },
          {
            "prompt": "How has Mara’s view of diagnosis changed?",
            "answers": [
              "She values it as a skill rather than a delay"
            ],
            "evidence": "She sees diagnosis as a skill in its own right.",
            "explanation": "Evidence and reasoning: She sees diagnosis as a skill in its own right.",
            "options": [
              "She believes it is always wasted time",
              "She values it as a skill rather than a delay",
              "She thinks visible parts are always faulty",
              "She now avoids every repair"
            ],
            "id": "q6"
          }
        ],
        "seconds": 720,
        "id": "band1-reading-skimming-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-22cbbae4"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: purpose and evidence",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The quiet hour\n\nA supermarket in Longmere introduced a weekly quiet hour after a customer explained that the combination of music, announcements and bright advertising screens made shopping exhausting. Managers turned the music off and stopped non-essential announcements on Tuesday mornings. The lighting remained unchanged because staff needed to read labels and work safely.\n\nInitially, the quiet hour attracted few additional shoppers. A local access group pointed out that the Tuesday timing excluded many people who worked during the day. The supermarket added an early evening session and published the times clearly at the entrance. More customers then used the service.\n\nSome staff expected complaints from other shoppers, but most people barely noticed the absence of background music. Others said the calmer setting helped them concentrate. Managers have not measured whether sales increased, and they avoid presenting the change as a commercial success. The main benefit, in their view, is that customers who previously needed help can shop more independently. Other shops could learn from the trial, but would need to ask their own customers which changes would actually remove barriers.",
        "questions": [
          {
            "prompt": "What remained unchanged during the quiet hour?",
            "answers": [
              "lighting"
            ],
            "evidence": "The lighting remained unchanged for safety.",
            "explanation": "The source supports this answer: The lighting remained unchanged for safety.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What lesson do the quiet-hour adjustments illustrate?",
            "answers": [
              "A useful access measure needs consultation and practical adjustments rather than assumptions."
            ],
            "evidence": "Some staff expected complaints from other shoppers, but most people barely noticed the absence of background music. Others said the calmer setting helped them concentrate. Managers have not measured whether sales increased, and they avoid presenting the change as a commercial success. The main benefit, in their view, is that customers who previously needed help can shop more independently. Other shops could learn from the trial, but would need to ask their own customers which changes would actually remove barriers.",
            "explanation": "Consulting people affected and adjusting practice makes the quiet hour useful. Assuming one arrangement suits everyone or treating it as a complete accessibility solution loses the practical qualifications.",
            "options": [
              "Turning off music was enough to make the original session accessible to working customers.",
              "The trial's principal achievement was a measured rise in sales.",
              "The same timing and changes should be introduced in every shop.",
              "A useful access measure needs consultation and practical adjustments rather than assumptions."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band1-reading-skimming-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-5d3f3aa3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-reading-scanning",
  "lessonId": "band1-reading-scanning",
  "type": "course-activity",
  "prompt": "B2 Reading: multiple matching and accurate scanning — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Reading: multiple matching and accurate scanning",
    "learn": "Part 7 matches statements to sections or short texts. Read the statements to identify the precise need, scan for likely passages, then compare the full meaning. One text may answer more than one question. Distinguish a shared topic from the particular experience requested.",
    "worked": {
      "example": "One learner says the course was slower than expected but useful. Match “benefited from repeated practice”, not “wanted a longer course”.",
      "reasoning": "The learner’s evaluation, rather than the word slow alone, determines the match."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Choosing a weekend course",
        "instructions": "Turn each requirement into separate conditions. Mark one condition at a time against the profiles, rejecting a near-match when any required condition fails. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A · Photography: Bring a camera with manual controls. Sessions take place outdoors, and the tutor lends tripods.\nB · Pottery: Tools and clay are supplied. Work is fired after the final class and collected the following week.\nC · Cooking: Participants work in pairs. Tell the organiser about food allergies before booking.\nD · Drama: No previous experience is needed. The final class includes a short performance for invited guests.",
        "questions": [
          {
            "prompt": "Which course needs equipment brought from home?",
            "answers": [
              "A"
            ],
            "evidence": "A asks participants to bring a camera.",
            "explanation": "The source supports this answer: A asks participants to bring a camera.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q1"
          },
          {
            "prompt": "Which course has a delayed collection?",
            "answers": [
              "B"
            ],
            "evidence": "Pottery is collected the following week.",
            "explanation": "The source supports this answer: Pottery is collected the following week.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q2"
          },
          {
            "prompt": "Which course needs dietary information?",
            "answers": [
              "C"
            ],
            "evidence": "Cooking asks about food allergies.",
            "explanation": "The source supports this answer: Cooking asks about food allergies.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q3"
          },
          {
            "prompt": "Which course has an audience at the end?",
            "answers": [
              "D"
            ],
            "evidence": "Drama ends with a performance for guests.",
            "explanation": "The source supports this answer: Drama ends with a performance for guests.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q4"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-scanning-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "reading",
        "title": "Four accounts of learning a skill",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A · Nia learned bicycle maintenance through online videos but struggled when a bolt was in a different place from the one shown. A workshop helped her understand the purpose of each part, so she could adapt the advice.\nB · Omar joined a singing class mainly to meet people. He enjoyed the group, although listening to a recording of his voice was uncomfortable at first. He now uses recordings to notice improvements.\nC · Eva wanted to learn photography quickly for a holiday. The evening course moved slowly, but practising the same technique in different light taught her more than a list of camera settings.\nD · Ben tried learning woodwork alone and wasted expensive material through inaccurate measuring. Working beside a more experienced learner made him check each measurement twice. He still prefers making his own design choices.",
        "questions": [
          {
            "prompt": "Who benefited from understanding how equipment works?",
            "answers": [
              "A"
            ],
            "evidence": "Nia learned the purpose of each part.",
            "explanation": "The source supports this answer: Nia learned the purpose of each part.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q1"
          },
          {
            "prompt": "Who uses recordings to monitor progress?",
            "answers": [
              "B"
            ],
            "evidence": "Omar now uses recordings to notice improvements.",
            "explanation": "The source supports this answer: Omar now uses recordings to notice improvements.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q2"
          },
          {
            "prompt": "Who initially wanted a rapid result?",
            "answers": [
              "C"
            ],
            "evidence": "Eva wanted to learn quickly for a holiday.",
            "explanation": "The source supports this answer: Eva wanted to learn quickly for a holiday.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q3"
          },
          {
            "prompt": "Who changed a habit that had wasted materials?",
            "answers": [
              "D"
            ],
            "evidence": "Ben began checking measurements twice.",
            "explanation": "The source supports this answer: Ben began checking measurements twice.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q4"
          },
          {
            "prompt": "Who learned to adapt advice to unfamiliar equipment?",
            "answers": [
              "A"
            ],
            "evidence": "Nia could adapt the advice when parts differed.",
            "explanation": "The source supports this answer: Nia could adapt the advice when parts differed.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q5"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-scanning-stage-2"
      },
      {
        "kind": "reading",
        "title": "Volunteer opportunities",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A · River team: Help record water clarity on Saturday mornings. Training is supplied, and measurements must follow the same procedure each week.\nB · Museum team: Interview residents about local history. Volunteers need patience and must obtain permission before recording anyone.\nC · Garden team: Maintain vegetable beds with school groups. All tools are supplied, but wear waterproof footwear.\nD · Theatre team: Welcome visitors at evening performances. Volunteers receive a short briefing and can watch the show after their duties finish.",
        "questions": [
          {
            "prompt": "Which role requires permission for recording?",
            "answers": [
              "B"
            ],
            "evidence": "Museum volunteers must obtain permission.",
            "explanation": "The source supports this answer: Museum volunteers must obtain permission.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q1"
          },
          {
            "prompt": "Which role involves repeated standard measurements?",
            "answers": [
              "A"
            ],
            "evidence": "The river team follows the same procedure weekly.",
            "explanation": "The source supports this answer: The river team follows the same procedure weekly.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q2"
          },
          {
            "prompt": "Which role requires suitable footwear?",
            "answers": [
              "C"
            ],
            "evidence": "The garden team asks for waterproof footwear.",
            "explanation": "The source supports this answer: The garden team asks for waterproof footwear.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q3"
          },
          {
            "prompt": "Which role includes a performance as a benefit?",
            "answers": [
              "D"
            ],
            "evidence": "Theatre volunteers can watch the show.",
            "explanation": "The source supports this answer: Theatre volunteers can watch the show.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "id": "q4"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-scanning-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-reading-completion",
  "lessonId": "band1-reading-completion",
  "type": "course-activity",
  "prompt": "B2 Reading: gapped text, reference and cohesion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Reading: gapped text, reference and cohesion",
    "learn": "In Part 6, six sentences are removed and seven options are offered. Track pronouns, time sequence, contrast and cause across both sides of each gap. Try an option in the complete paragraph; a sentence that fits only the preceding line may break the next reference. One sentence is unused.",
    "worked": {
      "example": "A paragraph ends “The path was flooded.” An option begins “For that reason, we chose another route.”",
      "reasoning": "That reason refers to the flooding and explains the change. Matching the topic without checking the link is insufficient."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided gapped text: a new route",
        "instructions": "For the first gap, write a backward anchor and a forward anchor before selecting a letter. Check the next gap without the written frame, then apply the same two-sided test yourself. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Our walking group usually followed the same path through the woods. [1] We therefore asked local residents about other routes.\nAn old map showed a path beside the canal. [2] Before planning a group walk, two members went to inspect it.\nThey found that a short section was covered with branches. [3] The council agreed to clear it the following week.\nOn the first walk, the group stopped at a disused mill. [4] A resident explained that it had once supplied flour to the whole valley.\nThe walk took longer than our usual route. [5] Several people suggested including it once a month.\nWe still use the woodland path in wet weather. [6] Having a choice has made the programme more interesting.\n\nRemoved sentences:\nA · The unfamiliar building prompted several questions.\nB · However, some members wanted a change.\nC · The canal bank can become slippery after heavy rain.\nD · Even so, nobody seemed in a hurry to finish.\nE · That obstacle needed attention before a large group could pass.\nF · Unfortunately, the map gave no indication of its present condition.\nG · The new route was shorter than the woodland path.",
        "questions": [
          {
            "prompt": "Gap 1",
            "answers": [
              "B"
            ],
            "evidence": "Wanted a change explains therefore seeking alternatives.",
            "explanation": "Wanted a change contrasts with the familiar woodland routine and explains therefore asking residents for alternatives. The following request needs that motive.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q1"
          },
          {
            "prompt": "Gap 2",
            "answers": [
              "F"
            ],
            "evidence": "Its refers to the canal path; condition motivates inspection.",
            "explanation": "Its refers to the canal path; uncertainty about its present condition motivates the inspection that follows. The old map establishes a route, not current safety.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q2"
          },
          {
            "prompt": "Gap 3",
            "answers": [
              "E"
            ],
            "evidence": "That obstacle refers to the branches.",
            "explanation": "That obstacle points back to branches and explains why council clearance is requested next. Both reference and subsequent action connect.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q3"
          },
          {
            "prompt": "Gap 4",
            "answers": [
              "A"
            ],
            "evidence": "The building is the mill; questions lead to the resident’s explanation.",
            "explanation": "The unfamiliar building is the disused mill; questions explain why a resident supplies its history. A sentence with only a route detail would not bridge those two ideas.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q4"
          },
          {
            "prompt": "Gap 5",
            "answers": [
              "D"
            ],
            "evidence": "Even so contrasts longer duration with enjoyment.",
            "explanation": "Even so accepts that the walk was longer while showing nobody wanted to finish quickly. The following monthly suggestion fits that positive experience.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q5"
          },
          {
            "prompt": "Gap 6",
            "answers": [
              "C"
            ],
            "evidence": "Slipperiness explains choosing woodland in wet weather.",
            "explanation": "Wet-weather slipperiness explains using the woodland alternative. The final sentence then evaluates having a choice; the spare shorter-route claim contradicts the reported longer duration.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q6"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-completion-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "reading",
        "title": "Independent gapped text: a community exhibition",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The museum asked residents to lend objects that told a local story. [1] A faded bus ticket proved more interesting than several expensive ornaments.\nIts owner had kept it from the day she arrived in the town. [2] Her account became the opening panel of the exhibition.\nAt first, volunteers planned to arrange everything by date. [3] Grouping objects by experiences such as travel and work created clearer connections.\nSome lenders worried about damage. [4] A written agreement also explained when each object would be returned.\nThe opening attracted many people who had never visited the museum. [5] Conversations between lenders and visitors became an unexpected part of the event.\nThe museum cannot keep every object permanently. [6] The collection of recorded memories will remain available online.\n\nRemoved sentences:\nA · Instead, the team decided that themes would help visitors compare stories.\nB · Careful display cases and clear handling procedures helped reassure them.\nC · The value lay in the memory attached to an object, rather than its price.\nD · Fortunately, the stories can survive after the loans end.\nE · She described feeling both frightened and hopeful during that journey.\nF · Many stayed longer than they had intended.\nG · The lenders’ stories would become unavailable after the objects were returned.",
        "questions": [
          {
            "prompt": "Gap 1",
            "answers": [
              "C"
            ],
            "evidence": "Price contrasts with ticket and ornaments.",
            "explanation": "The ticket/ornament contrast concerns memory versus price. The next paragraph develops the ticket owner’s memory, so the value sentence links both sides.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q1"
          },
          {
            "prompt": "Gap 2",
            "answers": [
              "E"
            ],
            "evidence": "She is the ticket owner; journey explains the arrival.",
            "explanation": "She refers to the ticket owner and that journey refers to her arrival. Her account then has content that can become an opening panel.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q2"
          },
          {
            "prompt": "Gap 3",
            "answers": [
              "A"
            ],
            "evidence": "Instead introduces the change from dates to themes.",
            "explanation": "Instead reverses the date-order plan into themes; the following grouping-by-experience sentence explains the new organising choice.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q3"
          },
          {
            "prompt": "Gap 4",
            "answers": [
              "B"
            ],
            "evidence": "Them refers to worried lenders.",
            "explanation": "Them refers to worried lenders. Cases and procedures address damage; the written agreement then adds a return safeguard.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q4"
          },
          {
            "prompt": "Gap 5",
            "answers": [
              "F"
            ],
            "evidence": "Many refers to opening visitors.",
            "explanation": "Many refers to first-time visitors. Longer stays provide time for the conversations reported next; it is not a claim about every resident.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q5"
          },
          {
            "prompt": "Gap 6",
            "answers": [
              "D"
            ],
            "evidence": "Stories remaining online contrasts with returning objects.",
            "explanation": "Stories surviving contrasts with the inability to keep all objects, and the following online record supplies how they survive. The spare sentence contradicts that continued availability.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q6"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-completion-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "reading",
        "title": "Assessment gapped text: a shared workshop",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A group of neighbours rented a workshop together. [1] Sharing made equipment affordable.\nThey soon discovered that access needed planning. [2] An online booking calendar reduced these clashes.\nSafety rules were agreed at the first meeting. [3] New members had to complete an introduction before working alone.\nA noticeboard displayed unfinished projects. [4] This made it easier to offer advice at the right moment.\nNot every suggestion was accepted. [5] Members learned to ask what kind of help was wanted.\nThe group is considering opening another room. [6] A survey will establish whether enough people would actually use it.\n\nRemoved sentences:\nA · Two people sometimes needed the same machine at once.\nB · However, it will check demand before signing a larger lease.\nC · Each person still wanted control over their own design.\nD · No single member could have bought all the tools.\nE · Beside each one, its maker wrote the next problem to solve.\nF · These included wearing eye protection and clearing tools away.\nG · New members could work alone without completing an introduction.",
        "questions": [
          {
            "prompt": "Gap 1",
            "answers": [
              "D"
            ],
            "evidence": "Cost of tools explains sharing.",
            "explanation": "The inability to buy all tools individually explains why sharing makes equipment affordable in the next sentence.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q1"
          },
          {
            "prompt": "Gap 2",
            "answers": [
              "A"
            ],
            "evidence": "Clashes refers to simultaneous machine demand.",
            "explanation": "Simultaneous machine demand explains access planning and supplies the referent for clashes in the next sentence.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q2"
          },
          {
            "prompt": "Gap 3",
            "answers": [
              "F"
            ],
            "evidence": "These refers to the agreed safety rules.",
            "explanation": "These refers to the safety rules. Examples of protection and clearing tools lead naturally to the separate induction requirement.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q3"
          },
          {
            "prompt": "Gap 4",
            "answers": [
              "E"
            ],
            "evidence": "Each one refers to projects; problems allow advice.",
            "explanation": "Each one refers to unfinished projects. Naming the next problem explains why the following advice can be timely.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q4"
          },
          {
            "prompt": "Gap 5",
            "answers": [
              "C"
            ],
            "evidence": "Design control explains refusing some suggestions.",
            "explanation": "Wanting control of a design explains why some suggestions were refused and why members later ask what help is wanted.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q5"
          },
          {
            "prompt": "Gap 6",
            "answers": [
              "B"
            ],
            "evidence": "Survey checks demand before expansion.",
            "explanation": "However qualifies expansion with a demand check. The survey supplies that check; the spare uninducted-access claim contradicts the explicit new-member rule.",
            "options": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "id": "q6"
          }
        ],
        "seconds": 600,
        "id": "band1-reading-completion-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-writing-task1-overview",
  "lessonId": "band1-writing-task1-overview",
  "type": "course-activity",
  "prompt": "B2 Writing: the compulsory essay — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: the compulsory essay",
    "learn": "B2 First Writing lasts 80 minutes and requires two responses of 140–190 words. Part 1 is an essay using two supplied points and a third point of your own. Address the question directly, develop rather than list reasons, and organise the argument for a reader who does not share your background. Content, communicative achievement, organisation and language guide the self-review.",
    "worked": {
      "example": "Question: Should schools organise more outdoor lessons? Thesis: Schools should use outdoor lessons when the setting helps students understand a topic, while retaining classrooms for work that needs quiet concentration.",
      "reasoning": "The thesis answers the question with a defensible qualification rather than simply promising to discuss it."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided thesis and plan",
        "instructions": "Should colleges offer practical courses? Given points: learning and cost. Write a thesis and a developed paragraph on learning; then name a distinct third point of your own. This is a short planning task.",
        "model": "Colleges should offer practical courses alongside academic subjects. Applying ideas in a real project can reveal whether students understand them. For example, building a simple weather station requires accurate measurement rather than memorised definitions. Cost needs careful planning, but it does not make all practical work impossible. My additional point would be confidence: students may discover abilities that written tests do not reveal.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I state a thesis, develop learning and name a distinct third idea.",
          "Development: I explain how practical learning works rather than list subjects.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I add a mechanism to the learning paragraph before drafting the whole essay."
        ],
        "analysis": "Review this planning response against its own demand: State a thesis, develop learning and name a distinct third idea. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how practical learning works rather than list subjects; a weaker one only names the topic or repeats a judgement. For your revision, add a mechanism to the learning paragraph before drafting the whole essay. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-task1-overview-stage-1",
        "compatibleWithSignature": "v1-37e6e54e"
      },
      {
        "kind": "writing",
        "title": "Independent essay",
        "instructions": "Your class has discussed education. Write an essay: Should colleges offer practical courses alongside traditional subjects? Notes: 1 learning; 2 cost; 3 your own idea. Write 140–190 words.",
        "model": "Many colleges are deciding whether to provide practical courses as well as traditional subjects. I believe they should offer both, because students need opportunities to connect ideas with real situations.\n\nPractical lessons can make classroom knowledge easier to understand. For example, planning a small garden requires students to calculate area and consider how plants grow. Such activities do not replace mathematics or biology; they give learners a reason to use them carefully.\n\nCost is a real concern. Workshops need equipment, and schools cannot buy everything. However, sharing tools with a community organisation could make a limited programme affordable. Starting with one project would allow teachers to judge its value before expanding it.\n\nA further advantage is confidence. Students who find written tests difficult may discover that they can solve practical problems successfully. This can encourage them to participate more in other lessons too.\n\nOverall, practical courses deserve a place in education, provided their cost is controlled and their connection with academic learning is clear.",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I develop learning, cost and an additional distinct point.",
          "Development: I keep the college-course position visible while explaining each reason.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair a missing content point before changing vocabulary."
        ],
        "analysis": "Review this response against its own demand: Develop learning, cost and an additional distinct point. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will keep the college-course position visible while explaining each reason; a weaker one only names the topic or repeats a judgement. For your revision, repair a missing content point before changing vocabulary. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-task1-overview-stage-2",
        "compatibleWithSignature": "v1-62d36aef"
      },
      {
        "kind": "writing",
        "title": "Assessment essay: a new topic",
        "instructions": "Should towns provide more space for teenagers? Notes: 1 leisure; 2 safety; 3 your own idea. Write 140–190 words. Use a clear position and develop all three points.",
        "model": "Towns should provide more suitable places for teenagers, but young people should help decide what those places offer.\n\nLeisure spaces can give teenagers something positive to do after school. A sports area is useful, yet it will not interest everyone. Rooms for music, art or simply meeting friends would allow more young people to take part.\n\nSafety also matters. A well-maintained centre with approachable staff can be more welcoming than an isolated meeting place. However, supervision should help teenagers feel supported rather than watched constantly. Clear rules agreed with users could achieve this balance.\n\nA further benefit is responsibility. If teenagers help organise events and manage a small budget, they gain practical experience while improving the centre. Adults would still need to offer guidance.\n\nIn conclusion, more space would be valuable if it responds to different interests and gives young people a real role. A costly building without suitable activities would be a much weaker investment.",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I develop leisure, safety and a distinct own idea.",
          "Development: I connect teenage space to a specific use or consequence.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that the conclusion retains the position in the opening."
        ],
        "analysis": "Review this response against its own demand: Develop leisure, safety and a distinct own idea. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect teenage space to a specific use or consequence; a weaker one only names the topic or repeats a judgement. For your revision, check that the conclusion retains the position in the opening. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-task1-overview-stage-3",
        "compatibleWithSignature": "v1-135b805d"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-writing-trends",
  "lessonId": "band1-writing-trends",
  "type": "course-activity",
  "prompt": "B2 Writing: articles and engaging a reader — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: articles and engaging a reader",
    "learn": "An article needs to inform or entertain its target reader. A relevant title, direct opening and specific experience can engage the reader, but rhetorical questions are optional. Organise the content around the task, avoiding exaggerated claims or a list of disconnected adjectives. B2 First article responses use 140–190 words.",
    "worked": {
      "example": "“My town is very nice” → “On Saturday mornings the old market becomes a place to hear local musicians and try food from nearby farms.”",
      "reasoning": "The revision replaces a vague evaluation with concrete detail that explains the attraction."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided article opening",
        "instructions": "A student magazine wants articles about a worthwhile free-time activity. Write a title and opening paragraph that names an activity and gives the reader a reason to continue.",
        "model": "A route worth exploring\n\nDo your weekends always look the same? Mine did until I joined a walking group that explores overlooked parts of our town. I expected exercise, but I also found stories hidden in ordinary streets. You do not need special equipment or expert knowledge to join us; curiosity and comfortable shoes are enough.",
        "minWords": 45,
        "seconds": 600,
        "rubric": [
          "Content: I name the activity and create an opening worth reading.",
          "Development: I use a concrete scene or discovery to establish reader interest.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace a vague adjective with an observable detail."
        ],
        "analysis": "Review this response against its own demand: Name the activity and create an opening worth reading. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use a concrete scene or discovery to establish reader interest; a weaker one only names the topic or repeats a judgement. For your revision, replace a vague adjective with an observable detail. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-trends-stage-1",
        "compatibleWithSignature": "v1-ce579751"
      },
      {
        "kind": "writing",
        "title": "Independent article",
        "instructions": "A college magazine asks: What activity has improved your free time? Explain what people do, why you enjoy it, and who you would recommend it to. Write an article of 140–190 words.",
        "model": "A small change that made my weekends better\n\nWhen did you last learn something with people you had never met? Until recently, my answer would have been “years ago”. Then I joined a Saturday photography walk, and my weekends became much more interesting.\n\nThe group meets outside the station and chooses a different route each week. You do not need an expensive camera: several members use their phones. What matters is noticing details. One week we photographed reflections; another week we tried to show movement without making every picture completely blurred.\n\nThe best part is sharing ideas afterwards. Nobody pretends to be an expert, so it is easy to ask questions. I have learned useful techniques, but I have also discovered streets I had walked past without noticing.\n\nIf you want a new activity, I would recommend trying a local group rather than buying more equipment. Choose something you are curious about, attend a session, and give yourself permission to be a beginner.",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I explain what participants do, why it matters to me and who it suits.",
          "Development: I connect the experience to a conditional recommendation.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove a diary detail that does not help the magazine reader."
        ],
        "analysis": "Review this response against its own demand: Explain what participants do, why it matters to me and who it suits. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect the experience to a conditional recommendation; a weaker one only names the topic or repeats a judgement. For your revision, remove a diary detail that does not help the magazine reader. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-trends-stage-2",
        "compatibleWithSignature": "v1-6761a45b"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh article paragraph",
        "instructions": "A local website wants an article about an overlooked place. Write 80–110 words describing a specific place and explaining why a visitor should go. Use concrete detail and an appropriate engaging tone.",
        "model": "Behind the station, a narrow path leads to a small riverside garden. It is easy to miss because there is no large entrance sign, yet the benches offer one of the calmest views in town. Volunteers have planted herbs beside the path, and visitors can read short notes explaining how each plant was traditionally used. I would recommend going in the early evening, when the traffic becomes quieter and the light falls across the water. Bring a book rather than expecting a busy tourist attraction: the garden’s appeal is its simplicity.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I identify an overlooked place and a reason to visit.",
          "Development: I make the value visible through a specific feature or experience.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that the recommendation follows the described place."
        ],
        "analysis": "Review this response against its own demand: Identify an overlooked place and a reason to visit. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the value visible through a specific feature or experience; a weaker one only names the topic or repeats a judgement. For your revision, check that the recommendation follows the described place. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 110,
        "id": "band1-writing-trends-stage-3",
        "compatibleWithSignature": "v1-c6b4e940"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-writing-integrated",
  "lessonId": "band1-writing-integrated",
  "type": "course-activity",
  "prompt": "B2 Writing: letters and emails — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: letters and emails",
    "learn": "Read who you are writing to, why you are writing and which points must be covered. An email to a friend can use a warm opening and contractions; a formal request needs a respectful, direct tone. Neither format benefits from memorised phrases that do not fit the situation. B2 First responses are 140–190 words.",
    "worked": {
      "example": "A friend asks about accommodation and travel. A reply that describes only the town leaves the reader uninformed.",
      "reasoning": "Content coverage requires answering each requested point; an attractive style cannot compensate for missing information."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided email paragraph",
        "instructions": "Your friend asks whether beginners need expensive equipment for a college club. Write one reassuring paragraph with a practical instruction.",
        "model": "You do not need to buy expensive equipment before joining. The club lends cameras to beginners, so you can try the activity before deciding what suits you. You should reserve one a few days ahead because the number is limited. Bring a notebook as well: writing down one useful technique after each session makes practice at home much easier.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I answer the equipment concern and give a practical instruction.",
          "Development: I explain how a beginner can start without an unnecessary purchase.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace an unsupported promise with a feasible preparation detail."
        ],
        "analysis": "Review this response against its own demand: Answer the equipment concern and give a practical instruction. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how a beginner can start without an unnecessary purchase; a weaker one only names the topic or repeats a judgement. For your revision, replace an unsupported promise with a feasible preparation detail. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-integrated-stage-1",
        "compatibleWithSignature": "v1-ecb8507f"
      },
      {
        "kind": "writing",
        "title": "Independent email",
        "instructions": "Your friend Sam may join your college. Write an email explaining an after-class activity, what equipment is needed, and why Sam might enjoy it. Write 140–190 words.",
        "model": "Hi Sam,\n\nIt was great to hear that you are thinking of joining our college. You asked about activities after classes, so I thought I would tell you about the photography club.\n\nWe meet on Wednesday afternoons, usually in the media room. The tutor introduces a technique, and then we practise around the campus. Last week we photographed the same scene from different angles, which was much more useful than simply reading camera instructions.\n\nYou do not need to buy a camera before joining. The club has a few that members can borrow, although you should reserve one in advance. Comfortable shoes are useful because we sometimes walk quite a long way.\n\nI think you would enjoy the group. Everyone shares ideas, and beginners are welcome. If you arrive before the end of term, come to a session with me and see what you think. I can introduce you to the organiser afterwards.\n\nLet me know when you are coming.\n\nBest wishes,\nAlex",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I cover the activity, required equipment and personal relevance to Sam.",
          "Development: I connect each practical detail to the friend’s decision.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check register throughout the requests and closing."
        ],
        "analysis": "Review this response against its own demand: Cover the activity, required equipment and personal relevance to Sam. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect each practical detail to the friend’s decision; a weaker one only names the topic or repeats a judgement. For your revision, check register throughout the requests and closing. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-integrated-stage-2",
        "compatibleWithSignature": "v1-b86a842e"
      },
      {
        "kind": "writing",
        "title": "Assessment: formal request",
        "instructions": "Write an 80–110-word email to a course organiser asking about an accessible entrance, available transport and a booking deadline. State why you need the information and use an appropriate formal tone.",
        "model": "Dear Course Organiser,\n\nI am interested in attending your Saturday ceramics workshop and would appreciate some practical information before booking. One member of our group uses a wheelchair. Could you confirm whether the entrance and teaching room are accessible without steps?\n\nWe will be travelling by public transport, so please also let us know which bus stop is closest to the venue. Finally, could you tell me the deadline for reserving two places? This will help us arrange our journey and confirm that we can both attend.\n\nThank you for your assistance.\n\nYours faithfully,\nAlex Karim",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I ask about entrance access, transport and booking deadline.",
          "Development: I explain why the organiser’s information is needed.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair embedded-question order without losing a requested point."
        ],
        "analysis": "Review this response against its own demand: Ask about entrance access, transport and booking deadline. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain why the organiser’s information is needed; a weaker one only names the topic or repeats a judgement. For your revision, repair embedded-question order without losing a requested point. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 110,
        "id": "band1-writing-integrated-stage-3",
        "compatibleWithSignature": "v1-3afca583"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-writing-essay-structure",
  "lessonId": "band1-writing-essay-structure",
  "type": "course-activity",
  "prompt": "B2 Writing: reviews and reports — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: reviews and reports",
    "learn": "A review evaluates an experience and recommends it to a reader. A report presents findings and practical recommendations for a stated audience; headings can make its structure clear. Both require reasons and relevant detail. Avoid labelling a response “high band” without examiner evidence. In B2 First, write 140–190 words.",
    "worked": {
      "example": "Review: “The rooms are bright, but the early closing time limits evening use.” Report: “Extend opening on two evenings and review attendance after a month.”",
      "reasoning": "The review evaluates suitability; the report proposes an actionable response to a finding."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided evaluation",
        "instructions": "Write a 50-word review paragraph comparing one strength and one limitation of a study space. Explain who would benefit from it.",
        "model": "The library’s group rooms are useful for students preparing presentations because each room has a screen and a door that keeps discussion from disturbing readers. However, they must be booked a day ahead. I would recommend them to organised groups, while students making an unexpected visit may prefer the open tables.",
        "minWords": 45,
        "seconds": 600,
        "rubric": [
          "Content: I compare a strength and a limitation for a particular user.",
          "Development: I explain how a facility affects studying rather than simply list it.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the recommendation match the stated reader."
        ],
        "analysis": "Review this response against its own demand: Compare a strength and a limitation for a particular user. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how a facility affects studying rather than simply list it; a weaker one only names the topic or repeats a judgement. For your revision, make the recommendation match the stated reader. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-essay-structure-stage-1",
        "compatibleWithSignature": "v1-c66be242"
      },
      {
        "kind": "writing",
        "title": "Independent review",
        "instructions": "A student website wants reviews of a place suitable for studying. Describe its facilities, evaluate strengths and limitations, and recommend it to a particular reader. Write 140–190 words.",
        "model": "A useful place to study\n\nIf you need somewhere to work away from a busy home, the new Riverside Study Centre is worth considering. I spent two afternoons there preparing a group presentation and found it generally well organised.\n\nThe main advantage is the choice of spaces. There are quiet desks for individual work and small rooms that groups can book. Our room had a large screen, which made comparing slides much easier. Staff explained the booking system clearly and helped when the connection failed.\n\nThere are a few limitations. The café closes early, so anyone working in the evening should bring food. Also, the quiet area can become crowded during examination weeks. Booking ahead is sensible if you need a particular room.\n\nDespite these problems, I would recommend the centre to students who need reliable facilities and a clear separation between discussion and silent study. It is less suitable for someone who wants to work without planning a visit in advance.",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I describe facilities and evaluate both strengths and limits.",
          "Development: I use an experience or observation to support the user recommendation.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace universal praise with conditional advice."
        ],
        "analysis": "Review this response against its own demand: Describe facilities and evaluate both strengths and limits. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use an experience or observation to support the user recommendation; a weaker one only names the topic or repeats a judgement. For your revision, replace universal praise with conditional advice. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-essay-structure-stage-2",
        "compatibleWithSignature": "v1-e7e4a9a5"
      },
      {
        "kind": "writing",
        "title": "Assessment report",
        "instructions": "Your college wants a report about its study area. Describe current strengths, explain two problems, and recommend feasible improvements. Write 140–190 words.",
        "model": "Report on the college study area\n\nPurpose\nThis report evaluates the current study area and recommends improvements based on comments from students who use it regularly.\n\nCurrent strengths\nThe area is close to teaching rooms and remains open after afternoon classes. Students appreciate the large desks and reliable internet connection. These facilities make it useful for individual assignments and short group meetings.\n\nProblems\nThe main difficulty is noise. Students discussing projects sit beside people who need to read quietly, so both groups become frustrated. There are also too few power sockets near the central tables. As a result, some students leave when their laptop batteries run low.\n\nRecommendations\nI recommend dividing the room into clearly marked discussion and quiet areas. This would require signs and a small change in furniture arrangement rather than major building work. Additional sockets should be considered after an electrical safety check. A short trial followed by student feedback would show whether these changes meet users’ needs.",
        "minWords": 140,
        "seconds": 2400,
        "rubric": [
          "Content: I report strengths, two problems and feasible improvements.",
          "Development: I trace each proposed action to a specific finding.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I add a manageable action instead of an unrelated expensive wish."
        ],
        "analysis": "Review this response against its own demand: Report strengths, two problems and feasible improvements. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will trace each proposed action to a specific finding; a weaker one only names the topic or repeats a judgement. For your revision, add a manageable action instead of an unrelated expensive wish. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 190,
        "id": "band1-writing-essay-structure-stage-3",
        "compatibleWithSignature": "v1-de021f28"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-writing-brainstorming",
  "lessonId": "band1-writing-brainstorming",
  "type": "course-activity",
  "prompt": "B2 Writing: planning and developing arguments — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: planning and developing arguments",
    "learn": "Before writing, separate the question from the topic. Choose a clear position, select reasons that answer that question and develop each through explanation or an example. A counterargument is useful when it advances the reasoning; it is not a compulsory formula. Planning should leave time for drafting and checking. Quality depends on relevance and control, not on the number of linking words.",
    "worked": {
      "example": "Claim: A shared garden can help neighbours meet. Development: Weekly planting sessions create repeated contact, so people have time to build trust rather than merely exchange greetings.",
      "reasoning": "The second sentence explains how the benefit happens. It does not repeat the claim with synonyms."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: argument development",
        "instructions": "Write a thesis and a developed paragraph arguing whether a college should fund a shared garden. Consider a benefit, its mechanism and one practical limitation.",
        "model": "A college garden could be valuable if students help maintain it. Working beside classmates from other courses creates repeated opportunities to talk, which can build a stronger sense of belonging. The benefit would be weaker if a few volunteers did all the work. A shared timetable and a small equipment budget would therefore be necessary. The college should begin with a limited area and review participation before expanding it.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I state a funding judgement, benefit and practical limitation.",
          "Development: I explain how shared activity produces the proposed benefit.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace a circular useful-because-useful reason."
        ],
        "analysis": "Review this response against its own demand: State a funding judgement, benefit and practical limitation. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how shared activity produces the proposed benefit; a weaker one only names the topic or repeats a judgement. For your revision, replace a circular useful-because-useful reason. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-brainstorming-stage-1",
        "compatibleWithSignature": "v1-6fe85af8"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: argument development",
        "instructions": "Write 80–110 words arguing whether a college should lend laptops. Develop one reason, an example and a condition under which the proposal would work.",
        "model": "A laptop loan scheme could reduce an avoidable barrier to study. Students whose devices fail would still be able to complete assignments instead of missing deadlines while saving for repairs. For example, a short loan during examination week could be more useful than a permanent subsidy for everyone. The college would need clear return dates and technical support, since lending unreliable equipment would simply create a different problem. A small trial could show whether demand justifies a larger scheme. Students could report whether a loan prevented a missed assignment, giving the college evidence about the scheme’s specific educational purpose.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I develop a laptop-loan reason, example and workable condition.",
          "Development: I link temporary device access to a specific study barrier.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that return or support arrangements target a real risk."
        ],
        "analysis": "Review this response against its own demand: Develop a laptop-loan reason, example and workable condition. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will link temporary device access to a specific study barrier; a weaker one only names the topic or repeats a judgement. For your revision, check that return or support arrangements target a real risk. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-brainstorming-stage-2",
        "maxWords": 110,
        "compatibleWithSignature": "v1-63e109dd"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: argument development",
        "instructions": "Write 60–90 words explaining whether a town should fund a youth music room. Include a specific benefit and a realistic cost concern.",
        "model": "A youth music room could give teenagers a place to practise without disturbing neighbours. It could also encourage cooperation when young musicians organise a shared rehearsal schedule. However, sound insulation and maintenance may be expensive. The town should compare adapting an existing room with constructing a new building, then ask potential users how often they would attend. A modest, regularly used space would be better than an impressive but empty facility.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I judge the youth music room with a benefit and cost concern.",
          "Development: I explain which users gain and what resource the proposal needs.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep the judgement clear after acknowledging the cost."
        ],
        "analysis": "Review this response against its own demand: Judge the youth music room with a benefit and cost concern. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain which users gain and what resource the proposal needs; a weaker one only names the topic or repeats a judgement. For your revision, keep the judgement clear after acknowledging the cost. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-writing-brainstorming-stage-3",
        "maxWords": 90,
        "compatibleWithSignature": "v1-3d27689b"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-speaking-part1-intro",
  "lessonId": "band1-speaking-part1-intro",
  "type": "course-activity",
  "prompt": "B2 Speaking: interview answers and development — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Speaking: interview answers and development",
    "learn": "In the first speaking part, answer familiar questions about yourself with relevant detail. A direct answer followed by a reason or example usually gives more useful evidence than a memorised speech. You may ask for a question to be repeated if necessary. The partner is also a candidate: listen while they speak. These recordings practise individual answers, not a full live paired examination.",
    "worked": {
      "example": "I enjoy studying in the morning because the house is quiet. Last week I finished a difficult report before anyone else got up.",
      "reasoning": "The reason and example develop the answer naturally without changing the topic."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided interview",
        "instructions": "Answer: What do you enjoy about your studies or work? Give a direct answer and one reason.",
        "model": "I enjoy the practical part of my course because I can test whether I understand an idea. For example, our group recently built a simple measuring device and discovered why our first calculations were wrong.",
        "rubric": [
          "Relevance: I answer the work/study question directly and explain one preference.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 45,
        "analysis": "Use the actual recording to answer the work/study question directly and explain one preference. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-part1-intro-stage-1",
        "audio": {
          "src": "/media/courses/course-audio-093.wav",
          "transcript": "I enjoy the practical part of my course because I can test whether I understand an idea. For example, our group recently built a simple measuring device and discovered why our first calculations were wrong.",
          "label": "Original synthetic model · Samantha · EnglishCamp text."
        },
        "compatibleWithSignature": "v1-49920182"
      },
      {
        "kind": "speaking",
        "title": "Independent interview",
        "instructions": "Answer both questions aloud: How do you usually spend a free afternoon? What new skill would you like to learn, and why?",
        "model": "I often walk by the river with a friend. It gives us time to talk without looking at our phones. I would like to learn basic bicycle repairs because I cycle regularly and want to solve small problems myself.",
        "rubric": [
          "Relevance: I answer both free-afternoon and desired-skill questions with the appropriate time reference.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to answer both free-afternoon and desired-skill questions with the appropriate time reference. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-part1-intro-stage-2",
        "compatibleWithSignature": "v1-48699c0d"
      },
      {
        "kind": "speaking",
        "title": "Assessment interview",
        "instructions": "Describe one habit that helps you learn and explain how you developed it. Avoid repeating the model examples.",
        "model": "I review my notes on the bus home rather than waiting until the weekend. I began doing this after forgetting details from a workshop. A few minutes of checking helps me notice questions while the lesson is still fresh.",
        "rubric": [
          "Relevance: I explain a learning habit and the past process by which it developed.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 60,
        "analysis": "Use the actual recording to explain a learning habit and the past process by which it developed. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-part1-intro-stage-3",
        "compatibleWithSignature": "v1-9fef847d"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-speaking-independent",
  "lessonId": "band1-speaking-independent",
  "type": "course-activity",
  "prompt": "B2 Speaking: comparing two visual prompts — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Speaking: comparing two visual prompts",
    "learn": "In Part 2, each candidate speaks for about a minute comparing two photographs in response to a question; the partner then responds briefly. Compare rather than describe each picture separately. Select details relevant to the question and use cautious language for interpretations. The original illustrations in these lesson tasks train comparison; they are not official exam photographs.",
    "worked": {
      "example": "Both groups are working together, but the gardeners appear to be outdoors while the cooks share an indoor workspace.",
      "reasoning": "Both/but establish comparison. “Appear” appropriately marks interpretation rather than claiming to know the people’s feelings."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided visual comparison",
        "instructions": "Compare the two illustrated scenes. Say what the people are doing and identify one similarity and one difference.",
        "model": "Both scenes involve people completing a practical task together. In the garden they appear to be planting, whereas the other group is preparing food indoors. Both activities need cooperation, although cooking may require closer coordination because several steps have to happen at the same time.",
        "rubric": [
          "Relevance: I compare a visible similarity and difference without inventing a history.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 60,
        "analysis": "Use the actual recording to compare a visible similarity and difference without inventing a history. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "visual": {
          "src": "/media/courses/b2-comparison.svg",
          "alt": "Two original scenes: people planting in a community garden and people preparing food together in a shared kitchen.",
          "description": "Original illustrated prompts for comparing collaboration in two settings; use observable details and mark speculation as uncertain."
        },
        "id": "band1-speaking-independent-stage-1",
        "audio": {
          "src": "/media/courses/course-audio-094.wav",
          "transcript": "Both scenes involve people completing a practical task together. In the garden they appear to be planting, whereas the other group is preparing food indoors. Both activities need cooperation, although cooking may require closer coordination because several steps have to happen at the same time.",
          "label": "Original synthetic model · Daniel · EnglishCamp text."
        },
        "compatibleWithSignature": "v1-38df6267"
      },
      {
        "kind": "speaking",
        "title": "Independent long turn",
        "instructions": "Compare the new scenes and explain what people might gain from these activities. Speak for one minute, comparing rather than listing details.",
        "model": "Both activities could provide a sense of achievement, although they involve different kinds of effort. The students appear to be developing knowledge indoors, while the volunteers are improving a shared outdoor space. Studying may offer a longer-term personal benefit, such as preparing for a qualification. The clean-up produces a more immediate visible result and may help people feel connected to their neighbourhood. Both can also involve cooperation, even if the students spend part of their time working individually.",
        "rubric": [
          "Relevance: I compare the scenes through possible participant benefits supported by visible actions.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 60,
        "analysis": "Use the actual recording to compare the scenes through possible participant benefits supported by visible actions. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "visual": {
          "src": "/media/courses/b2-independent-comparison.svg",
          "alt": "Two original illustrated scenes: people studying at desks indoors and volunteers collecting litter beside a river.",
          "description": "Fresh original illustrations for independent comparison, distinct from the guided garden and kitchen scenes."
        },
        "id": "band1-speaking-independent-stage-2",
        "compatibleWithSignature": "v1-4267e5bc"
      },
      {
        "kind": "speaking",
        "title": "Assessment: partner follow-up",
        "instructions": "Your partner says: “I think cooking would help people become friends more quickly.” Respond for about 30 seconds: which activity would you prefer to join, and why? Acknowledge the partner’s idea before developing your view.",
        "model": "I agree that cooking could bring people together quickly because they can share the meal afterwards. Personally, I would choose the garden, since meeting regularly over several months might help friendships last. I also enjoy being outside after studying indoors.",
        "rubric": [
          "Relevance: I acknowledge the partner’s cooking reason before a justified preference.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 30,
        "analysis": "Use the actual recording to acknowledge the partner’s cooking reason before a justified preference. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-independent-stage-3",
        "compatibleWithSignature": "v1-db5e093"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-speaking-hometown",
  "lessonId": "band1-speaking-hometown",
  "type": "course-activity",
  "prompt": "B2 Speaking: collaboration and discussion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Speaking: collaboration and discussion",
    "learn": "Part 3 requires interaction: compare options, respond to your partner and work toward a decision. Part 4 develops related ideas in discussion. A solo recording can practise proposals and responses but cannot establish live interactive ability. Use a human partner when possible, allowing them space rather than delivering a series of speeches.",
    "worked": {
      "example": "Partner: A sports day would include everyone. Response: It could bring many students together, although some may not enjoy competition. Could we include a non-competitive activity too?",
      "reasoning": "The response acknowledges the suggestion, adds a qualification and invites a decision."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided collaboration",
        "instructions": "A college wants to welcome new students. Options: a sports afternoon, a town walk, a shared meal, a music evening, a study-skills workshop. Respond to a partner who favours the town walk. Add a reason and invite another view.",
        "model": "A town walk would help students find useful places, so I can see why you favour it. However, we should consider people who cannot walk far. Perhaps a short accessible route followed by a shared meal would work. What do you think would make quieter students feel comfortable?",
        "rubric": [
          "Relevance: I respond to the town-walk suggestion with a reason and a genuine invitation.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Interaction: I used the partner’s actual reason and left space for a reply; a solo recording is only rehearsal.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 60,
        "analysis": "Use the actual recording to respond to the town-walk suggestion with a reason and a genuine invitation. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-hometown-stage-1",
        "audio": {
          "src": "/media/courses/course-audio-095.wav",
          "transcript": "A town walk would help students find useful places, so I can see why you favour it. However, we should consider people who cannot walk far. Perhaps a short accessible route followed by a shared meal would work. What do you think would make quieter students feel comfortable?",
          "label": "Original synthetic model · Samantha · EnglishCamp text."
        },
        "compatibleWithSignature": "v1-be4c6cbe"
      },
      {
        "kind": "speaking",
        "title": "Independent decision rehearsal",
        "instructions": "With a partner if possible, discuss how useful the five welcome activities would be. Discuss for two minutes, then agree on the best option in a further minute. If practising alone, record two possible viewpoints and a reasoned decision.",
        "model": "The shared meal may encourage informal conversations, while the workshop offers immediately useful advice. A sports event could be enjoyable but might exclude some students. We would choose an accessible town walk followed by refreshments because it combines practical information with opportunities to talk. We would also provide a seated alternative.",
        "rubric": [
          "Relevance: I compare the five choices on relevant criteria and reach a decision; label solo work rehearsal.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Interaction: I used the partner’s actual reason and left space for a reply; a solo recording is only rehearsal.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 180,
        "analysis": "Use the actual recording to compare the five choices on relevant criteria and reach a decision; label solo work rehearsal. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-hometown-stage-2",
        "compatibleWithSignature": "v1-ed6e2bb4"
      },
      {
        "kind": "speaking",
        "title": "Assessment discussion",
        "instructions": "Respond to this related discussion question: How much responsibility should colleges take for helping students make friends? Include a reason, an example and a qualification.",
        "model": "Colleges should create opportunities, but they cannot make friendships happen. A small welcome group can help students meet repeatedly, which is often more useful than one large party. For example, a regular project brings people together around a shared interest. At the same time, students should be free to decide how much they participate.",
        "rubric": [
          "Relevance: I develop college responsibility through a reason, example and meaningful limit.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Interaction: I used the partner’s actual reason and left space for a reply; a solo recording is only rehearsal.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to develop college responsibility through a reason, example and meaningful limit. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-speaking-hometown-stage-3",
        "compatibleWithSignature": "v1-cf6c8779"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-grammar-articles",
  "lessonId": "band1-grammar-articles",
  "type": "course-activity",
  "prompt": "B2 Articles: reference and shared knowledge — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Articles: reference and shared knowledge",
    "learn": "Use a/an when introducing a singular countable noun that is not yet identified; choose the form by sound. Use the when the reader can identify the referent from context. Plural and uncountable nouns often take no article when expressing general meaning. “The environment” and other established phrases need to be learned in context. Avoid the false rule that every abstract noun always has zero article.",
    "worked": {
      "example": "We visited a workshop. The workshop was beside the station.",
      "reasoning": "A introduces a new place; the points back to the same identifiable place."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided articles: first mention and reference",
        "instructions": "First identify each noun’s countability and whether the listener can identify its referent. Choose an article only after that decision; use sound to choose a/an where an indefinite phrase is intended. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Write a, an, the or — for no article.",
        "questions": [
          {
            "prompt": "We interviewed ___ engineer who designs bridges.",
            "answers": [
              "an"
            ],
            "evidence": "Engineer begins with a vowel sound.",
            "explanation": "An introduces one unspecified engineer and matches the next vowel sound. The sound test follows the choice of an indefinite singular countable phrase.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "___ engineer showed us her latest model.",
            "answers": [
              "the"
            ],
            "evidence": "The engineer has already been introduced.",
            "explanation": "The refers back to the engineer already introduced. Repeating an would introduce or leave open another engineer rather than identify the same person.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "She believes ___ teamwork is essential.",
            "answers": [
              "—"
            ],
            "evidence": "Teamwork is uncountable and general here.",
            "explanation": "No article presents teamwork as a general uncountable idea. A would require a countable sense not intended in this sentence.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-articles-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent articles: a museum visit",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Write a, an, the or —.",
        "questions": [
          {
            "prompt": "There is ___ university museum near my home.",
            "answers": [
              "a"
            ],
            "evidence": "University begins with a /j/ consonant sound.",
            "explanation": "A university follows the initial /j/ consonant sound. A written vowel letter alone does not require an.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "We went to ___ museum that you recommended.",
            "answers": [
              "the"
            ],
            "evidence": "The relative clause identifies the museum.",
            "explanation": "The identifying relative clause makes the particular museum recoverable in this context. First mention does not automatically mean an indefinite article.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "___ information on the website was incomplete.",
            "answers": [
              "the"
            ],
            "evidence": "The information is identified by on the website.",
            "explanation": "The information on the website identifies a particular body of information. Information remains uncountable, so a would not fit this ordinary sense.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-articles-stage-2",
        "compatibleWithSignature": "v1-475e136f"
      },
      {
        "kind": "language",
        "title": "Assessment articles: general and specific",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Write a, an, the or —.",
        "questions": [
          {
            "prompt": "___ students need useful feedback. (students in general)",
            "answers": [
              "—"
            ],
            "evidence": "The plural noun refers to students generally.",
            "explanation": "No article gives a general statement about students as a class. The would instead require an identifiable group.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "I waited for ___ hour before the talk began.",
            "answers": [
              "an"
            ],
            "evidence": "Hour begins with a vowel sound.",
            "explanation": "An hour follows a vowel sound because h is silent in this word. Choose from pronunciation, not the written first letter.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Please close ___ door behind you. (the room has one door)",
            "answers": [
              "the"
            ],
            "evidence": "The shared situation identifies the door.",
            "explanation": "The door is identifiable from the shared situation even on first mention. A door would introduce an unspecified member and change the intended reference.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-articles-stage-3",
        "compatibleWithSignature": "v1-ba08093f"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-grammar-agreement",
  "lessonId": "band1-grammar-agreement",
  "type": "course-activity",
  "prompt": "B2 Agreement: complex subjects and open cloze — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Agreement: complex subjects and open cloze",
    "learn": "Find the grammatical head of a subject before choosing the verb. A nearby plural noun does not necessarily make the subject plural. Collective nouns can vary with dialect and intended meaning, so do not treat every British plural use of “team” as wrong. In formal editing, keep the interpretation consistent. Open-cloze practice also requires attention to auxiliaries and reference.",
    "worked": {
      "example": "The list of rooms is on the wall.",
      "reasoning": "List is the singular head; rooms belongs to an of-phrase."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided agreement",
        "instructions": "Mark only the head of each subject before supplying the verb. Temporarily remove modifiers, then restore them and check every clause’s own subject. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use the bracketed verb in present simple.",
        "questions": [
          {
            "prompt": "The number of applicants ___ each year. (RISE)",
            "answers": [
              "rises"
            ],
            "evidence": "The number is the singular head.",
            "explanation": "The number is the singular head, so rises agrees with the total. A plural noun inside its modifier does not become the main subject.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Each of the rooms ___ a window. (HAVE)",
            "answers": [
              "has"
            ],
            "evidence": "Each takes singular agreement.",
            "explanation": "Each treats one member at a time and takes has in the supplied present frame. The group may contain many people without making each plural.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The students who live nearby ___ to class. (WALK)",
            "answers": [
              "walk"
            ],
            "evidence": "Students is the plural subject.",
            "explanation": "Students is the plural subject, so walk has no third-person singular -s. Locate the subject of this particular verb rather than the nearest noun.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-agreement-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent open cloze",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Supply ONE word in each gap.",
        "questions": [
          {
            "prompt": "Neither of these keys ___ the cupboard. (OPEN)",
            "answers": [
              "opens"
            ],
            "evidence": "Neither takes singular agreement in this formal sentence.",
            "explanation": "Opens follows the formal singular neither frame intended here. Plural agreement occurs in some informal usage; this item practises the explicit formal construction, not a universal prohibition.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "There ___ two reasons for the delay. (BE)",
            "answers": [
              "are"
            ],
            "evidence": "Two reasons is plural.",
            "explanation": "Two reasons is plural, so the edited existential frame is there are. A singular noun elsewhere does not change that introduced noun phrase.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The equipment ___ checked every morning. (BE)",
            "answers": [
              "is"
            ],
            "evidence": "Equipment is uncountable and singular.",
            "explanation": "Equipment is the uncountable head and takes is in this ordinary reporting sense. Count the individual items only when an item noun becomes the head.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-agreement-stage-2",
        "compatibleWithSignature": "v1-5e349c81"
      },
      {
        "kind": "language",
        "title": "Assessment agreement",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Supply the present-simple form.",
        "questions": [
          {
            "prompt": "One of the tutors ___ evening support. (PROVIDE)",
            "answers": [
              "provides"
            ],
            "evidence": "One is the singular head.",
            "explanation": "One is the singular head of the complete subject phrase, so provides agrees with one. The plural group in of the… does not replace that head.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The results of the trial ___ encouraging. (BE)",
            "answers": [
              "are"
            ],
            "evidence": "Results is the plural head.",
            "explanation": "Results is the plural head, so are agrees with it. A modifying singular phrase does not turn those results into one thing.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Every participant ___ a safety briefing. (RECEIVE)",
            "answers": [
              "receives"
            ],
            "evidence": "Every participant is singular.",
            "explanation": "Every participant selects each person individually, so receives has singular present marking. Every does not behave like all participants.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-grammar-agreement-stage-3",
        "compatibleWithSignature": "v1-31b329c5"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-vocab-awl1",
  "lessonId": "band1-vocab-awl1",
  "type": "course-activity",
  "prompt": "B2 Vocabulary: collocations and word families — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Vocabulary: collocations and word families",
    "learn": "Learn vocabulary as usable combinations rather than isolated translations. A word may change form when its role changes, and a near-synonym may not fit the same collocation. Read before and after a gap, test the whole phrase, then check spelling. Both British and American spelling can be appropriate when used consistently.",
    "worked": {
      "example": "We made progress, not “did progress”. The project was successful; we completed it successfully.",
      "reasoning": "The collocation fixes the verb; adjective/adverb choice depends on what the word modifies."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided collocations",
        "instructions": "For each gap, name the complete expression or sentence role first. Explain the difference between selecting the collocation and changing its word-family form. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Complete the expression using the bracketed base form or its correct derivative.",
        "questions": [
          {
            "prompt": "The tutor gave us useful ___ (ADVISE).",
            "answers": [
              "advice"
            ],
            "evidence": "Advice is the uncountable noun.",
            "explanation": "The source supports this answer: Advice is the uncountable noun.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "We must ___ responsibility for our mistakes. (TAKE)",
            "answers": [
              "take"
            ],
            "evidence": "Take responsibility is the collocation.",
            "explanation": "The source supports this answer: Take responsibility is the collocation.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The team worked ___ (EFFICIENT).",
            "answers": [
              "efficiently"
            ],
            "evidence": "An adverb modifies worked.",
            "explanation": "The source supports this answer: An adverb modifies worked.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-awl1-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent vocabulary in context",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Complete each sentence.",
        "questions": [
          {
            "prompt": "The new route will ___ a difference to commuters. (MAKE)",
            "answers": [
              "make"
            ],
            "evidence": "Make a difference means have an effect.",
            "explanation": "The source supports this answer: Make a difference means have an effect.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The decision requires careful ___ (CONSIDER).",
            "answers": [
              "consideration"
            ],
            "evidence": "A noun follows careful.",
            "explanation": "The source supports this answer: A noun follows careful.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "The instructions were easy to ___ (UNDERSTAND).",
            "answers": [
              "understand"
            ],
            "evidence": "To is followed by the base verb here.",
            "explanation": "The source supports this answer: To is followed by the base verb here.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-awl1-stage-2"
      },
      {
        "kind": "language",
        "title": "Assessment: transfer to a new topic",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Complete each sentence.",
        "questions": [
          {
            "prompt": "Students should ___ attention to feedback. (PAY)",
            "answers": [
              "pay"
            ],
            "evidence": "Pay attention is the collocation.",
            "explanation": "The source supports this answer: Pay attention is the collocation.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The results were surprisingly ___ (CONSIST).",
            "answers": [
              "consistent"
            ],
            "evidence": "An adjective describes the results.",
            "explanation": "The source supports this answer: An adjective describes the results.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Regular practice can improve your ___ (PERFORM).",
            "answers": [
              "performance"
            ],
            "evidence": "The noun performance follows your.",
            "explanation": "The source supports this answer: The noun performance follows your.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-awl1-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-vocab-synonyms",
  "lessonId": "band1-vocab-synonyms",
  "type": "course-activity",
  "prompt": "B2 Phrasal verbs and meaning-preserving paraphrase — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Phrasal verbs and meaning-preserving paraphrase",
    "learn": "A phrasal verb’s meaning depends on its whole expression and context. Check whether the object can separate the verb and particle; a pronoun often must go between them in separable forms. Do not replace a phrase with a formal word unless meaning and grammar are preserved.",
    "worked": {
      "example": "They put off the meeting → They postponed the meeting. They put the equipment away → They stored it.",
      "reasoning": "The same verb with different particles expresses different actions."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided paraphrase",
        "instructions": "Identify the intended event, then complete the phrasal expression while preserving the printed tense and object. If an object becomes a pronoun, check placement separately. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use TWO to FIVE words including the unchanged key word.",
        "questions": [
          {
            "prompt": "The class was cancelled. CALLED → They ___ the class.",
            "answers": [
              "called off"
            ],
            "evidence": "Call off means cancel.",
            "explanation": "The source supports this answer: Call off means cancel.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "I care for my neighbour’s cat. AFTER → I ___ my neighbour’s cat.",
            "answers": [
              "look after"
            ],
            "evidence": "Look after means care for.",
            "explanation": "The source supports this answer: Look after means care for.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Please reduce the volume. TURN → Please ___ the volume.",
            "answers": [
              "turn down"
            ],
            "evidence": "Turn down means reduce volume.",
            "explanation": "The source supports this answer: Turn down means reduce volume.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-synonyms-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent transformations",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use TWO to FIVE words including the unchanged key word.",
        "questions": [
          {
            "prompt": "She invented the story. UP → She ___ the story.",
            "answers": [
              "made up"
            ],
            "evidence": "Make up means invent in this context.",
            "explanation": "The source supports this answer: Make up means invent in this context.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "We have no coffee left. RUN → We have ___ coffee.",
            "answers": [
              "run out of"
            ],
            "evidence": "Run out of means have none remaining.",
            "explanation": "The source supports this answer: Run out of means have none remaining.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "I cannot tolerate this noise. PUT → I cannot ___ this noise.",
            "answers": [
              "put up with"
            ],
            "evidence": "Put up with means tolerate.",
            "explanation": "The source supports this answer: Put up with means tolerate.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-synonyms-stage-2"
      },
      {
        "kind": "language",
        "title": "Assessment: new meanings",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use TWO to FIVE words including the unchanged key word.",
        "questions": [
          {
            "prompt": "He recovered from the illness. OVER → He ___ the illness.",
            "answers": [
              "got over"
            ],
            "evidence": "Get over can mean recover from illness.",
            "explanation": "The source supports this answer: Get over can mean recover from illness.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "She continued working. ON → She ___ working.",
            "answers": [
              "carried on"
            ],
            "evidence": "Carry on means continue.",
            "explanation": "The source supports this answer: Carry on means continue.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "They established a club. UP → They ___ a club.",
            "answers": [
              "set up"
            ],
            "evidence": "Set up means establish.",
            "explanation": "The source supports this answer: Set up means establish.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-vocab-synonyms-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-time-reading",
  "lessonId": "band1-time-reading",
  "type": "course-activity",
  "prompt": "B2 Reading: timed evidence checkpoint — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Reading: timed evidence checkpoint",
    "learn": "Use an initial skim to map the source, then answer in a deliberate order. Move past a difficult question and return after securing clearer evidence. The full Reading and Use of English paper lasts 75 minutes, but this checkpoint is a shorter local exercise. Its result cannot predict a Cambridge score. After checking, explain why each distractor fails.",
    "worked": {
      "example": "A heading must cover the paragraph’s main development, not an interesting example mentioned once.",
      "reasoning": "Testing the entire passage prevents selecting a narrow but attractive option."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: timed reading",
        "instructions": "Use an empty observation / explanation / unresolved-question record on the first source. Find the evidence before deciding how strong the conclusion can be. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A later start\n\nA college moved one morning workshop from eight to nine after students reported transport difficulties. Attendance improved in the first month, particularly among those travelling from villages. However, the organiser warns that the change coincided with a quieter assessment period. Staff will compare another term before deciding whether the timetable alone explains the improvement. Starting later also means finishing later, which may affect students with afternoon jobs. The college is therefore keeping an alternative early session on one day each week.",
        "questions": [
          {
            "prompt": "What difficulty prompted the timetable change?",
            "answers": [
              "transport"
            ],
            "evidence": "Students reported transport difficulties.",
            "explanation": "The source supports this answer: Students reported transport difficulties.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should the college interpret its improved attendance?",
            "answers": [
              "The later start is promising, but its effects need further comparison."
            ],
            "evidence": "A college moved one morning workshop from eight to nine after students reported transport difficulties. Attendance improved in the first month, particularly among those travelling from villages. However, the organiser warns that the change coincided with a quieter assessment period. Staff will compare another term before deciding whether the timetable alone explains the improvement. Starting later also means finishing later, which may affect students with afternoon jobs. The college is therefore keeping an alternative early session on one day each week.",
            "explanation": "Attendance improved after the later start, but the less busy assessment period is an alternative influence. Further comparison tests that cause; promising association is not proof.",
            "options": [
              "The new starting time alone explains the improvement.",
              "The later start is promising, but its effects need further comparison.",
              "The trial shows that afternoon jobs no longer affect students.",
              "Keeping an early alternative invalidates the later-start trial."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band1-time-reading-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: timed reading",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "When a shortcut becomes a destination\n\nThe path behind Greystone Station was once used mainly by commuters avoiding the main road. When a local group planted flowers along it, visitors began stopping to look rather than simply walking through. A school added labels describing insects that used the plants, and residents began recording what they saw.\n\nThe project did not begin with a detailed wildlife survey. For that reason, the group cannot confidently claim that insect numbers have increased. More sightings may reflect the fact that people are now paying attention. A biology teacher has suggested recording observations at the same time each week to make future comparisons more useful.\n\nThe path still needs to function as a route to the station. Some large planters narrowed it too much for wheelchairs and luggage, so they were moved. Volunteers also leave a clear area near the exit to prevent people stopping suddenly in front of commuters.\n\nThe project’s value may lie less in a dramatic environmental result than in a changed relationship with an ordinary place. People now notice the seasons and speak with neighbours they previously passed in silence. That is a worthwhile outcome, provided enthusiasm for the garden does not undermine access for those who simply need to catch a train.",
        "questions": [
          {
            "prompt": "What prevented a confident claim about increased insect numbers?",
            "answers": [
              "wildlife survey"
            ],
            "evidence": "The project did not begin with a detailed wildlife survey.",
            "explanation": "The source supports this answer: The project did not begin with a detailed wildlife survey.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What balance does the station-path account favour?",
            "answers": [
              "The project has social value, but environmental claims and access need care."
            ],
            "evidence": "The project’s value may lie less in a dramatic environmental result than in a changed relationship with an ordinary place. People now notice the seasons and speak with neighbours they previously passed in silence. That is a worthwhile outcome, provided enthusiasm for the garden does not undermine access for those who simply need to catch a train.",
            "explanation": "The station-path project can support social use while wildlife and access claims require different evidence. One benefit does not settle every environmental outcome or remove access barriers.",
            "options": [
              "More insect sightings establish that planting increased insect numbers.",
              "The project has social value, but environmental claims and access need care.",
              "The route should become a garden even if commuters cannot pass.",
              "A fixed observation schedule would remove the need to preserve access."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band1-time-reading-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-c2cf7ad7"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: timed reading",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A shared map\n\nVolunteers created a map of public drinking fountains. They initially copied locations from an old council list, but several fountains no longer worked. The group now marks a location as verified only after a recent visit. Users can report a fault, although a volunteer checks the report before changing the map. This makes updates slower than an unrestricted system, but it reduces accidental misinformation. The organisers do not promise that every listed fountain will work at the moment of arrival. They advise walkers to carry water on longer journeys and treat the map as useful assistance rather than a guarantee.",
        "questions": [
          {
            "prompt": "What must happen before a location is marked verified?",
            "answers": [
              "recent visit"
            ],
            "evidence": "A location is verified only after a recent visit.",
            "explanation": "The source supports this answer: A location is verified only after a recent visit.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should walkers use the fountain map?",
            "answers": [
              "Verification improves usefulness without guaranteeing every future condition."
            ],
            "evidence": "Volunteers created a map of public drinking fountains. They initially copied locations from an old council list, but several fountains no longer worked. The group now marks a location as verified only after a recent visit. Users can report a fault, although a volunteer checks the report before changing the map. This makes updates slower than an unrestricted system, but it reduces accidental misinformation. The organisers do not promise that every listed fountain will work at the moment of arrival. They advise walkers to carry water on longer journeys and treat the map as useful assistance rather than a guarantee.",
            "explanation": "Recent checks make the fountain map more useful, but conditions can change afterwards. Verification is assistance, not a guarantee that every fountain will work on arrival.",
            "options": [
              "A verified listing guarantees water at the time of arrival.",
              "Fault reports should change the map immediately without checking.",
              "The old council list is a more reliable source than recent visits.",
              "Verification improves usefulness without guaranteeing every future condition."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band1-time-reading-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-53e613c6"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-time-writing",
  "lessonId": "band1-time-writing",
  "type": "course-activity",
  "prompt": "B2 Writing: planning under time pressure — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Writing: planning under time pressure",
    "learn": "The two B2 writing tasks share 80 minutes. A useful practice routine reserves time for reading instructions, planning, writing and checking. There is no official requirement to follow a fixed paragraph count. Use the target reader and purpose to decide what detail matters; check that both supplied essay points and your own idea are developed.",
    "worked": {
      "example": "A plan with three relevant points is more useful than a memorised opening that could fit any topic.",
      "reasoning": "The plan directs the response toward content coverage and reduces repetition."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: planning and focused drafting",
        "instructions": "Plan an essay about whether students should work in groups. Given points: learning and fairness. Write a thesis, develop the learning point and propose a distinct third idea.",
        "model": "Group projects can improve learning if responsibilities are clear. Explaining an idea to classmates reveals gaps that individual revision may hide. For example, a student who can repeat a definition may struggle when asked to apply it to a real problem. Fairness should be addressed through visible contributions, while my own third point would be communication skills that students can use beyond college.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I give a thesis, learning development and distinct third idea.",
          "Development: I turn a group-work learning note into an explanation.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I separate the third point from a repeated learning benefit."
        ],
        "analysis": "Review this planning response against its own demand: Give a thesis, learning development and distinct third idea. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will turn a group-work learning note into an explanation; a weaker one only names the topic or repeats a judgement. For your revision, separate the third point from a repeated learning benefit. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-time-writing-stage-1",
        "compatibleWithSignature": "v1-3cf04391"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: planning and focused drafting",
        "instructions": "Write a 100–130-word report section recommending how a college can improve group projects. Include a finding, a practical recommendation and a way to evaluate it.",
        "model": "Students report that group projects are useful when roles are agreed early, but frustrating when deadlines are unclear. I recommend asking each group to submit a short work plan during its first meeting. This should name the person responsible for each stage and include a shared review date. Tutors could check the plan briefly rather than supervising every decision. After the project, students should compare the plan with what actually happened. Their comments would show whether the process improved fairness and helped identify difficulties before the final deadline. The college could compare groups’ comments before and after the trial, while checking whether the extra planning requirement itself became burdensome.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I include a finding, recommendation and evaluation method.",
          "Development: I make the action address the reported group-project problem.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I add evidence that could show whether the trial helped."
        ],
        "analysis": "Review this planning response against its own demand: Include a finding, recommendation and evaluation method. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the action address the reported group-project problem; a weaker one only names the topic or repeats a judgement. For your revision, add evidence that could show whether the trial helped. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-time-writing-stage-2",
        "maxWords": 130,
        "compatibleWithSignature": "v1-27a1d081"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: planning and focused drafting",
        "instructions": "Write an 80–100-word review paragraph about a teamwork activity. Evaluate its usefulness for a particular audience and acknowledge a limitation.",
        "model": "The bridge-building workshop would suit students who enjoy solving practical problems with others. Each person has different information, so the group has to explain ideas rather than letting one confident member do everything. However, the short time limit can make quieter participants feel rushed. I would recommend the activity if the leader includes a few minutes for everyone to suggest an approach before construction begins. That brief planning stage would make the recommendation more useful to beginners who need time to organise what they want to contribute.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I evaluate the teamwork activity for a particular audience.",
          "Development: I connect the activity design to a benefit and limitation.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the recommendation conditional on the audience’s needs."
        ],
        "analysis": "Review this planning response against its own demand: Evaluate the teamwork activity for a particular audience. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect the activity design to a benefit and limitation; a weaker one only names the topic or repeats a judgement. For your revision, make the recommendation conditional on the audience’s needs. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band1-time-writing-stage-3",
        "maxWords": 100,
        "compatibleWithSignature": "v1-af8cfa15"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-practice-listening",
  "lessonId": "band1-practice-listening",
  "type": "course-activity",
  "prompt": "B2 Listening: a longer interview — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Listening: a longer interview",
    "learn": "Part 4 uses a longer interview or discussion with multiple-choice questions. Follow changes in opinion, examples and reasons. A speaker may qualify an earlier claim later in the answer. Take short notes that preserve relationships rather than attempting a complete transcript. The local recordings are shorter than a full examination set; use them to practise evidence-based interpretation.",
    "worked": {
      "example": "“I joined for the qualification, but the practical experience mattered more.” → The value changed from the initial expectation.",
      "reasoning": "The final comparison explains the speaker’s current judgement."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided interview excerpt",
        "instructions": "For the first recording, make empty notes for initial motive / achieved gain / current evaluation. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-010.wav",
          "transcript": "Interviewer. Why did you start volunteering at the theatre? Guest. I hoped it would help me find paid work backstage. That has not happened yet, but I have become much more confident talking to people. I would still like a theatre career, although I now value the experience for other reasons too.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What has the guest gained so far?",
            "answers": [
              "Greater confidence"
            ],
            "evidence": "I have become much more confident talking to people.",
            "explanation": "The source supports this answer: I have become much more confident talking to people.",
            "options": [
              "Paid backstage work",
              "Greater confidence",
              "A change of career"
            ],
            "id": "q1"
          }
        ],
        "id": "band1-practice-listening-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent interview: an urban beekeeper",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-011.wav",
          "transcript": "Interviewer. What first interested you in keeping bees? Guest. A neighbour invited me to help inspect a hive. I expected to be nervous, but concentrating on the work made me surprisingly calm. I did not decide immediately to keep my own bees. I spent a season helping first, which taught me how much responsibility was involved. Interviewer. Is honey the main reward? Guest. It is enjoyable, but I am more interested in observing how a colony responds to changes in weather and food. People sometimes assume a hive makes any neighbourhood better for wildlife. The situation is more complicated. Managed honeybees can compete with wild insects when flowers are scarce. Planting a wider range of flowers may sometimes help more than adding another hive. Interviewer. What would you advise a beginner? Guest. Find an experienced local group before buying equipment. Books are useful, but conditions vary, and you need someone who can help when a colony behaves unexpectedly. I would also check the rules for the site and speak with neighbours. Being enthusiastic does not remove your responsibility to other people.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Why did the guest wait before buying bees?",
            "answers": [
              "To understand the responsibility"
            ],
            "evidence": "A season of helping taught the responsibility.",
            "explanation": "The source supports this answer: A season of helping taught the responsibility.",
            "options": [
              "To save money for travel",
              "To understand the responsibility",
              "To wait for a neighbour to move"
            ],
            "id": "q1"
          },
          {
            "prompt": "What interests the guest most now?",
            "answers": [
              "Observing the colony’s responses"
            ],
            "evidence": "More interested in observing responses to weather and food.",
            "explanation": "The source supports this answer: More interested in observing responses to weather and food.",
            "options": [
              "Selling honey",
              "Observing the colony’s responses",
              "Collecting expensive equipment"
            ],
            "id": "q2"
          },
          {
            "prompt": "What qualification does the guest make about hives?",
            "answers": [
              "They may compete with wild insects"
            ],
            "evidence": "Honeybees can compete with wild insects when flowers are scarce.",
            "explanation": "The source supports this answer: Honeybees can compete with wild insects when flowers are scarce.",
            "options": [
              "They always improve biodiversity",
              "They may compete with wild insects",
              "They never affect other insects"
            ],
            "id": "q3"
          },
          {
            "prompt": "What is the main advice for beginners?",
            "answers": [
              "Join an experienced local group"
            ],
            "evidence": "Find an experienced local group before buying equipment.",
            "explanation": "The source supports this answer: Find an experienced local group before buying equipment.",
            "options": [
              "Buy equipment immediately",
              "Rely only on books",
              "Join an experienced local group"
            ],
            "id": "q4"
          }
        ],
        "id": "band1-practice-listening-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment interview: a different project",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-012.wav",
          "transcript": "Interviewer. Was restoring the boat what you expected? Guest. Not really. I imagined learning mainly about woodwork, but finding old plans and checking local records took just as much time. That research was frustrating initially, although it helped us avoid changing features that made the boat distinctive. Interviewer. Would you do it again? Guest. Yes, with a smaller team. We had plenty of enthusiasm, but unclear responsibilities led to duplicated work. Next time I would agree roles before starting.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What became unexpectedly important?",
            "answers": [
              "Historical research"
            ],
            "evidence": "Finding plans and checking records took as much time.",
            "explanation": "The source supports this answer: Finding plans and checking records took as much time.",
            "options": [
              "Selling tickets",
              "Historical research",
              "Painting lessons"
            ],
            "id": "q1"
          },
          {
            "prompt": "What would the guest change next time?",
            "answers": [
              "Clarify responsibilities earlier"
            ],
            "evidence": "Agree roles before starting.",
            "explanation": "The source supports this answer: Agree roles before starting.",
            "options": [
              "Avoid all research",
              "Clarify responsibilities earlier",
              "Recruit as many people as possible"
            ],
            "id": "q2"
          }
        ],
        "id": "band1-practice-listening-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band1-review",
  "lessonId": "band1-review",
  "type": "course-activity",
  "prompt": "B2 Review: demonstrate and reflect — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "B2 First",
    "objective": "B2 Review: demonstrate and reflect",
    "learn": "Readiness requires evidence across reading, language use, writing, listening and speaking. One quiz cannot establish a CEFR result. Use this mixed local checkpoint alongside your earlier full writing tasks and audio responses. Identify an error pattern, revise one response and plan a specific follow-up activity. Record evidence rather than declaring yourself ready from a percentage.",
    "worked": {
      "example": "“I missed two contrast questions because I selected the first idea.” → Replay a fresh extract and note the final judgement.",
      "reasoning": "A useful study plan connects a recurring error with a concrete corrective action."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided language review",
        "instructions": "Identify the grammatical construction and target gap boundaries before entering the mixed form. After feedback, create a different sentence illustrating the same correction. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use the unchanged key word in TWO to FIVE words.",
        "questions": [
          {
            "prompt": "The last time I visited was in May. SINCE → I have not visited ___.",
            "answers": [
              "since May"
            ],
            "evidence": "Since marks the starting point after a negative present perfect.",
            "explanation": "The source supports this answer: Since marks the starting point after a negative present perfect.",
            "maxWords": 5,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "The task was so difficult that I needed help. SUCH → It was ___ that I needed help.",
            "answers": [
              "such a difficult task"
            ],
            "evidence": "Such + a/an + adjective + noun.",
            "explanation": "The source supports this answer: Such + a/an + adjective + noun.",
            "maxWords": 5,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "They postponed the event. OFF → They ___ the event.",
            "answers": [
              "put off"
            ],
            "evidence": "Put off means postpone.",
            "explanation": "The source supports this answer: Put off means postpone.",
            "maxWords": 5,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 480,
        "id": "band1-review-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "writing",
        "title": "Independent review reflection",
        "instructions": "Write 80–110 words identifying one specific difficulty from an earlier reading, listening or writing task. Quote or describe the evidence, explain the error and propose a targeted practice action. Do not give yourself an official score.",
        "model": "In the interview task I chose an answer about the speaker’s original career aim, although the question asked what she had gained so far. The phrase “that has not happened yet” cancelled the expected benefit. I noticed a similar mistake in the travel extract, where I selected the first plan rather than the final choice. I will practise three short extracts, pause after each contrast and note what is still true at the end. After checking the transcript, I will explain why the rejected option is tempting before trying a new recording.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I identify a real difficulty, evidence and targeted next action.",
          "Development: I explain the cause of the error rather than only quote the key.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I choose an unfamiliar follow-up that tests the same distinction."
        ],
        "analysis": "Review this response against its own demand: Identify a real difficulty, evidence and targeted next action. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain the cause of the error rather than only quote the key; a weaker one only names the topic or repeats a judgement. For your revision, choose an unfamiliar follow-up that tests the same distinction. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 110,
        "id": "band1-review-stage-2",
        "compatibleWithSignature": "v1-11fe5862"
      },
      {
        "kind": "speaking",
        "title": "Assessment discussion",
        "instructions": "Answer: What makes feedback useful for learning? Give an example from an activity you completed, explain one limitation of self-review, and propose a next step.",
        "model": "Useful feedback identifies a specific gap and gives me a way to improve it. In a reading task, seeing the evidence helped me understand why a repeated word was a distractor. Self-review is less reliable for pronunciation because I may not notice an unclear sound in my own speech. I would therefore compare two recordings and ask a teacher which parts are hard to understand.",
        "rubric": [
          "Relevance: I use a completed activity to explain feedback value, self-review limits and a next step.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to use a completed activity to explain feedback value, self-review limits and a next step. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band1-review-stage-3",
        "compatibleWithSignature": "v1-c0d85d74"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-listening-mcq",
  "lessonId": "band2-listening-mcq",
  "type": "course-activity",
  "prompt": "Listening: Part 1 Details, Corrections and Distractors — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Listening: Part 1 Details, Corrections and Distractors",
    "learn": "Listen for the relationship between the question and the final meaning of the recording. Preview word limits and predict whether a name, number, place or explanation is needed. Rejected suggestions and changed plans create distractors. These original local sets practise part 1: details and corrections. Lesson replay is allowed; no full IELTS listening score is calculated.",
    "worked": {
      "example": "“It used to cost twenty; the new price is twenty-five.” → current price: twenty-five.",
      "reasoning": "Used to marks an earlier state; the final price is the current answer."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "A course booking",
        "instructions": "For the first recording, make empty notes for person / service / final value / price category. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-013.wav",
          "transcript": "Receptionist. Which course would you like? Caller. The evening drawing course, please. I first thought Tuesday would work, but I have changed to Thursday. Receptionist. That starts at six thirty. Caller. Is the fee forty pounds? Receptionist. It was last term. It is forty-five now, including materials. Please bring a folder for your finished work.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Day of the course",
            "answers": [
              "Thursday"
            ],
            "evidence": "I have changed to Thursday.",
            "explanation": "The source supports this answer: I have changed to Thursday.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should the caller bring?",
            "answers": [
              "folder"
            ],
            "evidence": "Please bring a folder.",
            "explanation": "The source supports this answer: Please bring a folder.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-mcq-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A repair appointment",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-014.wav",
          "transcript": "Receptionist. I can book a bicycle repair for you. What is your surname? Customer. Malik. That is M A L I K. Receptionist. Thank you. We have a slot on the eighteenth of June. Customer. I cannot manage that. Is the nineteenth available? Receptionist. Yes, at ten fifteen in the morning. Customer. Good. The brakes work, but the gears keep slipping. Receptionist. I will note that. The basic inspection is twelve pounds. If new parts are needed, the mechanic will call before fitting them. Customer. Where should I leave the bicycle? Receptionist. At the side entrance, beside the workshop. Please remove your lights and bring your booking reference. You do not need to leave a deposit.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Surname",
            "answers": [
              "Malik"
            ],
            "evidence": "That is M A L I K.",
            "explanation": "The source supports this answer: That is M A L I K.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Date in June",
            "answers": [
              "19",
              "nineteenth",
              "19th"
            ],
            "evidence": "Is the nineteenth available? Yes.",
            "explanation": "The source supports this answer: Is the nineteenth available? Yes.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Part needing attention",
            "answers": [
              "gears"
            ],
            "evidence": "The gears keep slipping.",
            "explanation": "The source supports this answer: The gears keep slipping.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Basic inspection price in pounds",
            "answers": [
              "12",
              "twelve"
            ],
            "evidence": "The basic inspection is twelve pounds.",
            "explanation": "The source supports this answer: The basic inspection is twelve pounds.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Leave the bicycle at the ___ entrance.",
            "answers": [
              "side"
            ],
            "evidence": "At the side entrance.",
            "explanation": "The source supports this answer: At the side entrance.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-mcq-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A room reservation",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-015.wav",
          "transcript": "Visitor. I need a meeting room for Monday, the ninth. Clerk. The small room is available, but it seats only eight. Visitor. We have ten people, so we need the larger one. Clerk. That is available after two in the afternoon. The hire is thirty pounds per hour, and a screen is included. Refreshments cost extra. Visitor. Fine. Please reserve it for two hours. Clerk. Bring proof of identity when you collect the key.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Which room is booked?",
            "answers": [
              "larger"
            ],
            "evidence": "Ten people require the larger room.",
            "explanation": "The source supports this answer: Ten people require the larger room.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What equipment is included?",
            "answers": [
              "screen"
            ],
            "evidence": "A screen is included.",
            "explanation": "The source supports this answer: A screen is included.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "How many hours?",
            "answers": [
              "two",
              "2"
            ],
            "evidence": "Reserve it for two hours.",
            "explanation": "The source supports this answer: Reserve it for two hours.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-mcq-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-listening-maps",
  "lessonId": "band2-listening-maps",
  "type": "course-activity",
  "prompt": "Listening: Part 2 Plans, Directions and Matching — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Listening: Part 2 Plans, Directions and Matching",
    "learn": "Listen for the relationship between the question and the final meaning of the recording. Preview word limits and predict whether a name, number, place or explanation is needed. Rejected suggestions and changed plans create distractors. These original local sets practise part 2: plans, directions and matching. Lesson replay is allowed; no full IELTS listening score is calculated.",
    "worked": {
      "example": "“It used to cost twenty; the new price is twenty-five.” → current price: twenty-five.",
      "reasoning": "Used to marks an earlier state; the final price is the current answer."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "A centre orientation",
        "instructions": "For the first recording, make empty notes for entrance / current facing direction / turn / destination. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-016.wav",
          "transcript": "Welcome to the learning centre. On the plan, the entrance is at the bottom, on the south side. Walk straight north to the reception desk. The café is immediately to the west of reception. The studio is east of reception. The garden occupies the north-east corner. The lecture room is in the north-west corner. Toilets are beside the entrance on its east side.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Which place is immediately west of reception?",
            "answers": [
              "café"
            ],
            "evidence": "The café is immediately to the west of reception.",
            "explanation": "The source supports this answer: The café is immediately to the west of reception.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Which place occupies the north-east corner?",
            "answers": [
              "garden"
            ],
            "evidence": "The garden occupies the north-east corner.",
            "explanation": "The source supports this answer: The garden occupies the north-east corner.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-maps-stage-1",
        "visual": {
          "src": "/media/courses/centre-plan.svg",
          "alt": "Plan of the centre, north at top: lecture room north-west, garden north-east; café west of reception, studio east; entrance south, toilets south-east.",
          "description": "Original plan. Match the places described in the recording to their positions."
        },
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A park tour",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-017.wav",
          "transcript": "We are at the south gate. Walk north along the central path to the fountain. The picnic area is west of the fountain, while the children’s garden is east of it. Continue north from the fountain to reach the greenhouse. There used to be a shop in the greenhouse, but it is now used only for plants. For refreshments, follow the western path from the fountain to the lake. The kiosk is on the lake’s south side. The bridge at the north end is closed this week, so do not use it as a shortcut to the greenhouse. The information point remains at the south gate, beside the entrance. Our guided tour ends at the greenhouse, where a volunteer will answer questions.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What is west of the fountain?",
            "answers": [
              "picnic area"
            ],
            "evidence": "The picnic area is west of the fountain.",
            "explanation": "The source supports this answer: The picnic area is west of the fountain.",
            "maxWords": 2,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What is east of the fountain?",
            "answers": [
              "children’s garden"
            ],
            "evidence": "The children’s garden is east of it.",
            "explanation": "The source supports this answer: The children’s garden is east of it.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Where does the tour end?",
            "answers": [
              "greenhouse"
            ],
            "evidence": "Our guided tour ends at the greenhouse.",
            "explanation": "The source supports this answer: Our guided tour ends at the greenhouse.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Which structure is closed?",
            "answers": [
              "bridge"
            ],
            "evidence": "The bridge at the north end is closed.",
            "explanation": "The source supports this answer: The bridge at the north end is closed.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-maps-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Facilities matching",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-018.wav",
          "transcript": "For anyone wanting a quiet place to read, the oak room is reserved for silent use. The willow room allows group discussion but must be booked. The cedar room contains computers and a printer, although printing requires credit on your account. The birch room has art materials and is open only when a tutor is present.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Match: silent reading",
            "answers": [
              "oak room"
            ],
            "evidence": "The oak room is reserved for silent use.",
            "explanation": "The source supports this answer: The oak room is reserved for silent use.",
            "maxWords": 2,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Match: bookable discussion",
            "answers": [
              "willow room"
            ],
            "evidence": "The willow room allows group discussion but must be booked.",
            "explanation": "The source supports this answer: The willow room allows group discussion but must be booked.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Match: supervised art",
            "answers": [
              "birch room"
            ],
            "evidence": "The birch room has art materials and requires a tutor.",
            "explanation": "The source supports this answer: The birch room has art materials and requires a tutor.",
            "maxWords": 2,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-maps-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-listening-form-completion",
  "lessonId": "band2-listening-form-completion",
  "type": "course-activity",
  "prompt": "Listening: Parts 3–4 Opinions, Lectures and Note Completion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Listening: Parts 3–4 Opinions, Lectures and Note Completion",
    "learn": "Listen for the relationship between the question and the final meaning of the recording. Preview word limits and predict whether a name, number, place or explanation is needed. Rejected suggestions and changed plans create distractors. These original local sets practise parts 3–4: discussion and note completion. Lesson replay is allowed; no full IELTS listening score is calculated.",
    "worked": {
      "example": "“It used to cost twenty; the new price is twenty-five.” → current price: twenty-five.",
      "reasoning": "Used to marks an earlier state; the final price is the current answer."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Research planning",
        "instructions": "For the first recording, make empty notes for speaker / proposal / concern / revised method. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-019.wav",
          "transcript": "Tutor. Why have you chosen interviews? Student. We thought a questionnaire would be faster, but it would not explain why students avoid the service. Tutor. Interviews can help, though your sample will be small. Student. We will describe that limitation and avoid generalising to the whole college.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Why choose interviews?",
            "answers": [
              "To explore reasons"
            ],
            "evidence": "Would not explain why students avoid the service.",
            "explanation": "The source supports this answer: Would not explain why students avoid the service.",
            "options": [
              "To reach every student",
              "To explore reasons",
              "To avoid all limitations"
            ],
            "id": "q1"
          },
          {
            "prompt": "What limitation is acknowledged?",
            "answers": [
              "small sample"
            ],
            "evidence": "Your sample will be small.",
            "explanation": "The source supports this answer: Your sample will be small.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-form-completion-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A student project discussion",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-020.wav",
          "transcript": "Tutor. Tell me about your transport project. Student one. We planned to compare travel times on every bus route, but there is not enough time. Student two. We now want to focus on two routes serving the same hospital. Tutor. That is manageable. How will you collect data? Student one. We considered asking drivers for estimates. However, delays vary, so we will record actual arrival times over five weekdays. Tutor. Remember that one week may be unusual. Student two. Yes. We will note weather and roadworks, then compare our results with the operator’s monthly figures. Tutor. Good. What do you expect to recommend? Student one. We should wait for the evidence. A new timetable might help, but better information at stops could be more useful if arrival times are unpredictable.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What has changed about the project?",
            "answers": [
              "Its scope has narrowed"
            ],
            "evidence": "Every route changed to two routes.",
            "explanation": "The source supports this answer: Every route changed to two routes.",
            "options": [
              "Its scope has narrowed",
              "It no longer uses data",
              "It has changed to railway travel"
            ],
            "id": "q1"
          },
          {
            "prompt": "What will students record?",
            "answers": [
              "arrival times"
            ],
            "evidence": "We will record actual arrival times.",
            "explanation": "The source supports this answer: We will record actual arrival times.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "For how many weekdays?",
            "answers": [
              "five",
              "5"
            ],
            "evidence": "Over five weekdays.",
            "explanation": "The source supports this answer: Over five weekdays.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Which outside information will they compare?",
            "answers": [
              "monthly figures"
            ],
            "evidence": "The operator’s monthly figures.",
            "explanation": "The source supports this answer: The operator’s monthly figures.",
            "maxWords": 2,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Why postpone recommendations?",
            "answers": [
              "The evidence is not yet available"
            ],
            "evidence": "We should wait for the evidence.",
            "explanation": "The source supports this answer: We should wait for the evidence.",
            "options": [
              "The tutor has banned recommendations",
              "The evidence is not yet available",
              "The operator has already agreed a solution"
            ],
            "id": "q5"
          }
        ],
        "id": "band2-listening-form-completion-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A short academic talk",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-021.wav",
          "transcript": "Today we will consider how shade affects city streets. Trees can reduce direct sunlight on paving, but their benefits vary with canopy size and water availability. A young tree does not immediately provide the same cooling as a mature one. Researchers therefore record canopy cover as well as tree numbers. They also distinguish surface temperature from air temperature, since a cooler pavement does not necessarily mean an identical reduction in the air around it. For planning, maintenance matters: a planting programme without reliable watering may lose trees before they establish.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Researchers record tree numbers and ___ .",
            "answers": [
              "canopy cover"
            ],
            "evidence": "Record canopy cover as well as tree numbers.",
            "explanation": "The source supports this answer: Record canopy cover as well as tree numbers.",
            "maxWords": 2,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "A cooler pavement does not imply the same reduction in ___ .",
            "answers": [
              "air temperature"
            ],
            "evidence": "Surface temperature is distinguished from air temperature.",
            "explanation": "The source supports this answer: Surface temperature is distinguished from air temperature.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "What maintenance need is emphasised?",
            "answers": [
              "watering"
            ],
            "evidence": "Without reliable watering trees may be lost.",
            "explanation": "The source supports this answer: Without reliable watering trees may be lost.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-listening-form-completion-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-vocab-environment",
  "lessonId": "band2-vocab-environment",
  "type": "course-activity",
  "prompt": "Listening: Academic Talks, Cause and Note Completion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Listening: Academic Talks, Cause and Note Completion",
    "learn": "Listen for the relationship between the question and the final meaning of the recording. Preview word limits and predict whether a name, number, place or explanation is needed. Rejected suggestions and changed plans create distractors. These original local sets practise part 4: causes, qualifications and notes. Lesson replay is allowed; no full IELTS listening score is calculated.",
    "worked": {
      "example": "“It used to cost twenty; the new price is twenty-five.” → current price: twenty-five.",
      "reasoning": "Used to marks an earlier state; the final price is the current answer."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "A lecture introduction",
        "instructions": "For the first recording, make empty notes for mechanism / example / condition. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-022.wav",
          "transcript": "Today’s topic is peatland restoration. Peat forms when plant material decomposes slowly in waterlogged conditions. Draining the land changes those conditions and allows stored carbon to be released. Restoration often begins by blocking drainage channels, but water levels must be monitored rather than assumed to recover immediately.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Peat forms in ___ conditions.",
            "answers": [
              "waterlogged"
            ],
            "evidence": "Plant material decomposes slowly in waterlogged conditions.",
            "explanation": "The source supports this answer: Plant material decomposes slowly in waterlogged conditions.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restoration often begins by blocking drainage ___ .",
            "answers": [
              "channels"
            ],
            "evidence": "Blocking drainage channels.",
            "explanation": "The source supports this answer: Blocking drainage channels.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band2-vocab-environment-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "An academic talk on urban streams",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-023.wav",
          "transcript": "Urban streams are often treated as drains, yet they are also habitats. When rain falls on roofs and roads, water reaches the stream more quickly than it would through soil. This can produce a sudden increase in flow, carrying pollutants and disturbing organisms. One response is to create planted areas that temporarily hold rainwater. These areas slow the movement of water, although their capacity is limited during prolonged storms. Researchers assessing a project should measure both the amount of water retained and how quickly it is released. Counting the number of planted areas alone tells us little about performance. Maintenance also influences results: blocked inlets may prevent water entering a site at all. Finally, a cleaner stream after construction does not prove the planting caused the change. Weather, upstream activity and other improvements may have changed at the same time. Comparing several sites over a longer period gives stronger evidence.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Roofs and roads make runoff reach streams more ___ .",
            "answers": [
              "quickly"
            ],
            "evidence": "Water reaches the stream more quickly.",
            "explanation": "The source supports this answer: Water reaches the stream more quickly.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Planted areas hold ___ temporarily.",
            "answers": [
              "rainwater"
            ],
            "evidence": "Temporarily hold rainwater.",
            "explanation": "The source supports this answer: Temporarily hold rainwater.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Performance depends on retained volume and release ___ .",
            "answers": [
              "speed"
            ],
            "evidence": "How quickly it is released means release speed.",
            "explanation": "The source supports this answer: How quickly it is released means release speed.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Blocked ___ may prevent water entering.",
            "answers": [
              "inlets"
            ],
            "evidence": "Blocked inlets prevent entry.",
            "explanation": "The source supports this answer: Blocked inlets prevent entry.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "What design gives stronger evidence?",
            "answers": [
              "Longer comparison across several sites"
            ],
            "evidence": "Comparing several sites over a longer period.",
            "explanation": "The source supports this answer: Comparing several sites over a longer period.",
            "options": [
              "Counting planted areas only",
              "Longer comparison across several sites",
              "Assuming every improvement has one cause"
            ],
            "id": "q5"
          }
        ],
        "id": "band2-vocab-environment-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "A lecture on reusable packaging",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-024.wav",
          "transcript": "Reusable packaging may reduce material demand, but the outcome depends on how often containers return. A durable box that is used only once can require more material than a lightweight alternative. Transport distance and washing also matter. In one trial, organisers improved returns by placing collection points beside bus stops rather than inside a shop with limited opening hours. That change made returning containers convenient, but the trial did not measure the full environmental impact. A wider evaluation would include production, cleaning, losses and transport.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "The benefit depends partly on the number of ___ .",
            "answers": [
              "returns"
            ],
            "evidence": "How often containers return.",
            "explanation": "The source supports this answer: How often containers return.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Where were collection points moved?",
            "answers": [
              "bus stops"
            ],
            "evidence": "Beside bus stops.",
            "explanation": "The source supports this answer: Beside bus stops.",
            "maxWords": 2,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Was the full environmental impact measured?",
            "answers": [
              "No"
            ],
            "evidence": "The trial did not measure the full environmental impact.",
            "explanation": "The source supports this answer: The trial did not measure the full environmental impact.",
            "options": [
              "Yes",
              "No",
              "Only production was measured"
            ],
            "id": "q3"
          }
        ],
        "id": "band2-vocab-environment-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-reading-tfng",
  "lessonId": "band2-reading-tfng",
  "type": "course-activity",
  "prompt": "Reading: True/False/Not Given and Yes/No/Not Given — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Reading: True/False/Not Given and Yes/No/Not Given",
    "learn": "Read a complete argument before judging individual claims. Separate a statement supported by the text, a contradiction and information the text does not provide. Match headings to the main development rather than a striking detail. For completion tasks, preserve grammar and the stated word limit. These shorter original passage sets train evidence use; they are not a full three-passage IELTS Reading examination.",
    "worked": {
      "example": "A trial found an improvement but changed two conditions together. Claim: one condition caused all of the improvement → not established.",
      "reasoning": "A relationship is not enough to establish a unique cause. Use the author’s qualifications when interpreting the result."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: True/False/Not Given and Yes/No/Not Given",
        "instructions": "Compare subject, quantity, time and certainty with the source. For each judgement, identify support, an incompatible fact or the exact missing information; do not infer a label pattern. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A cautious transport trial\n\nA university tested an electric shuttle between two campuses for eight weeks. Passenger surveys reported greater convenience, but the vehicle was not used after sunset. The researchers state that the trial cannot establish safety in night-time conditions. They recommend a further trial before any all-day service is introduced. Ticket revenue was recorded, although the report does not compare it with operating costs.",
        "questions": [
          {
            "prompt": "When was the shuttle not used?",
            "answers": [
              "after sunset"
            ],
            "evidence": "The vehicle was not used after sunset.",
            "explanation": "The source supports this answer: The vehicle was not used after sunset.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Which conclusion stays within the shuttle trial's evidence?",
            "answers": [
              "A further trial is needed before broader claims can be made."
            ],
            "evidence": "A university tested an electric shuttle between two campuses for eight weeks. Passenger surveys reported greater convenience, but the vehicle was not used after sunset. The researchers state that the trial cannot establish safety in night-time conditions. They recommend a further trial before any all-day service is introduced. Ticket revenue was recorded, although the report does not compare it with operating costs.",
            "explanation": "Daytime convenience cannot establish night-time safety, because the shuttle was not used after sunset. Ticket income without a cost comparison also cannot establish viability. The recommendation responds to those limits.",
            "options": [
              "A further trial is needed before broader claims can be made.",
              "The shuttle is safe after sunset because daytime passengers liked it.",
              "Recorded ticket revenue shows the service covers its operating costs.",
              "Convenience ratings establish that an all-day service is justified."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "The shuttle trial lasted eight weeks.",
            "answers": [
              "TRUE"
            ],
            "evidence": "A university tested the shuttle for eight weeks.",
            "explanation": "TRUE: the stated duration is eight weeks. This is agreement with an explicit fact, without inferring night-time safety or financial viability.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The shuttle could carry a maximum of twelve passengers.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply maximum passenger capacity. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q4"
          }
        ],
        "seconds": 420,
        "id": "band2-reading-tfng-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: True/False/Not Given and Yes/No/Not Given",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Measuring the effects of a shorter working week\n\nA small design company introduced a four-day week while keeping salaries unchanged. Managers expected the arrangement to improve retention, but the first evaluation focused mainly on staff-reported fatigue. Employees said they felt less tired and found it easier to manage domestic responsibilities. The report cautioned that these responses did not establish whether productivity had increased.\n\nThe company had reduced the length of internal meetings at the same time. Some work that previously required a meeting was handled through written updates. This made it difficult to separate the effect of fewer working days from the effect of a changed communication system. The researchers also noted that most employees worked on projects with flexible deadlines. Results might differ in settings where customers require continuous service.\n\nTo improve the next evaluation, the company plans to record missed deadlines, client complaints and staff departures for a full year. It will compare these figures with those from the previous year, while noting any major change in workload. Even this approach cannot control every influence, but it provides more useful evidence than a single satisfaction survey.\n\nThe researchers do not argue against shorter working weeks. Instead, they suggest that an appealing policy should be examined with measures that match the claims made for it. Improved wellbeing is valuable in itself; it should not automatically be presented as proof of higher output.\n\nA further difficulty concerns the distinction between output and productivity. Completing the same number of projects in fewer paid hours might suggest greater efficiency, but only if the quality and difficulty of the work remain comparable. If employees complete easier assignments during the trial, a simple project count would overstate the change. Conversely, a team handling a particularly demanding commission might appear less productive despite improving its working methods.\n\nThe evaluators therefore proposed describing the work completed as well as counting it. They also wanted to record whether unfinished tasks were being moved into unpaid time. A shorter official week would offer less benefit if employees regularly answered messages on their days off. Staff interviews could reveal this hidden work, although the researchers acknowledged that people may be reluctant to report it. Anonymous responses were suggested as one way to reduce that pressure.\n\nThese questions show why evaluating a working arrangement requires more than choosing a favourable headline. Measures should distinguish wellbeing, output, work quality and the distribution of effort. The policy could still be worthwhile if it improves wellbeing without increasing output, provided that its costs are understood and the claim is stated accurately.",
        "questions": [
          {
            "prompt": "Which outcome did the first evaluation mainly examine?",
            "answers": [
              "fatigue"
            ],
            "evidence": "The first evaluation focused mainly on staff-reported fatigue.",
            "explanation": "The source supports this answer: The first evaluation focused mainly on staff-reported fatigue.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What distinction is central to the four-day-week report?",
            "answers": [
              "Wellbeing gains are valuable, but productivity claims need separate evidence."
            ],
            "evidence": "These questions show why evaluating a working arrangement requires more than choosing a favourable headline. Measures should distinguish wellbeing, output, work quality and the distribution of effort. The policy could still be worthwhile if it improves wellbeing without increasing output, provided that its costs are understood and the claim is stated accurately.",
            "explanation": "Fatigue and wellbeing were examined, while productivity requires comparable output, quality and effort measures. Shorter meetings and hidden unpaid work are additional influences. Valuing wellbeing does not require claiming proven output gains.",
            "options": [
              "Staff satisfaction is a sufficient measure of productivity.",
              "Fewer meetings can be ignored when evaluating the shorter week.",
              "Wellbeing gains are valuable, but productivity claims need separate evidence.",
              "A lack of proven output gains makes improved wellbeing valueless."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "The first evaluation established an increase in productivity.",
            "answers": [
              "FALSE"
            ],
            "evidence": "Responses did not establish whether productivity had increased.",
            "explanation": "The passage supports this answer: Responses did not establish whether productivity had increased.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The company employed exactly forty people during the trial.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply the exact number of employees. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q4"
          },
          {
            "prompt": "Why might counting completed projects be misleading?",
            "answers": [
              "Project difficulty may differ"
            ],
            "evidence": "Easier assignments could overstate a productivity change.",
            "explanation": "The passage supports the answer: Easier assignments could overstate a productivity change.",
            "options": [
              "Project difficulty may differ",
              "Every project always has the same value",
              "Counts cannot ever be recorded",
              "The company stopped doing projects"
            ],
            "id": "q5"
          },
          {
            "prompt": "What hidden work should be investigated?",
            "answers": [
              "Unpaid tasks on days off"
            ],
            "evidence": "Employees may answer messages on their days off.",
            "explanation": "The passage supports the answer: Employees may answer messages on their days off.",
            "options": [
              "Unpaid tasks on days off",
              "The company’s building repairs",
              "Visitors’ shopping habits",
              "A change in city population"
            ],
            "id": "q6"
          },
          {
            "prompt": "What is a suggested way to reduce reporting pressure?",
            "answers": [
              "Anonymous responses"
            ],
            "evidence": "Anonymous responses were suggested.",
            "explanation": "The passage supports the answer: Anonymous responses were suggested.",
            "options": [
              "Publishing every employee’s name",
              "Anonymous responses",
              "Removing all interviews",
              "Assuming no hidden work occurs"
            ],
            "id": "q7"
          }
        ],
        "seconds": 720,
        "id": "band2-reading-tfng-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-4c710c1c"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: True/False/Not Given and Yes/No/Not Given",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Restoring a lake\n\nA lake restoration project reduced fertiliser runoff from nearby fields. Water clarity improved over the next two summers, but rainfall was also lower than average. The monitoring team therefore refuses to attribute the entire improvement to the project. It recommends continuing measurements during wetter years. Fish populations were not measured in the initial study, so the report cannot establish whether they benefited.",
        "questions": [
          {
            "prompt": "What was reduced near the lake?",
            "answers": [
              "fertiliser runoff"
            ],
            "evidence": "The project reduced fertiliser runoff.",
            "explanation": "The source supports this answer: The project reduced fertiliser runoff.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How does the lake report qualify its findings?",
            "answers": [
              "The improvement is promising, but changing weather limits causal certainty."
            ],
            "evidence": "A lake restoration project reduced fertiliser runoff from nearby fields. Water clarity improved over the next two summers, but rainfall was also lower than average. The monitoring team therefore refuses to attribute the entire improvement to the project. It recommends continuing measurements during wetter years. Fish populations were not measured in the initial study, so the report cannot establish whether they benefited.",
            "explanation": "Water clarity improved, but lower rainfall changed at the same time. The report therefore retains a promising observation while withholding a claim that runoff reduction caused the whole improvement; fish were not measured.",
            "options": [
              "Clearer water proves that runoff reduction caused the whole improvement.",
              "Lower rainfall shows that restoration had no influence.",
              "Improved clarity establishes a rise in fish populations.",
              "The improvement is promising, but changing weather limits causal certainty."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Water clarity improved over the next two summers.",
            "answers": [
              "TRUE"
            ],
            "evidence": "Water clarity improved over the next two summers.",
            "explanation": "TRUE: the improvement and period are explicitly reported. Agreement on this observation does not establish that the project caused the whole change or that fish populations rose.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The lake restoration project cost two million pounds.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply the project cost. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],
            "id": "q4"
          }
        ],
        "seconds": 720,
        "id": "band2-reading-tfng-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-reading-headings",
  "lessonId": "band2-reading-headings",
  "type": "course-activity",
  "prompt": "Reading: Headings, Information and Features — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Reading: Headings, Information and Features",
    "learn": "Read a complete argument before judging individual claims. Separate a statement supported by the text, a contradiction and information the text does not provide. Match headings to the main development rather than a striking detail. For completion tasks, preserve grammar and the stated word limit. These shorter original passage sets train evidence use; they are not a full three-passage IELTS Reading examination.",
    "worked": {
      "example": "A trial found an improvement but changed two conditions together. Claim: one condition caused all of the improvement → not established.",
      "reasoning": "A relationship is not enough to establish a unique cause. Use the author’s qualifications when interpreting the result."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Headings, Information and Features",
        "instructions": "Map each paragraph’s controlling development before heading choice. For a detail or attributed proposal, switch to its specific clause instead of repeating the gist method. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Passage\n\nA museum counted visitors to evaluate a new exhibition. Numbers rose, but a survey showed that many visitors could not explain its central question. Staff therefore added short prompts inviting people to compare two objects. The next review will examine what visitors discuss as well as how many enter. Attendance remains useful, but it does not capture every educational outcome.",
        "questions": [
          {
            "prompt": "What did staff add?",
            "answers": [
              "short prompts"
            ],
            "evidence": "Staff added short prompts inviting comparison.",
            "explanation": "The source supports this answer: Staff added short prompts inviting comparison.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Why will the museum examine visitor discussions?",
            "answers": [
              "Attendance and learning require different measures."
            ],
            "evidence": "A museum counted visitors to evaluate a new exhibition. Numbers rose, but a survey showed that many visitors could not explain its central question. Staff therefore added short prompts inviting people to compare two objects. The next review will examine what visitors discuss as well as how many enter. Attendance remains useful, but it does not capture every educational outcome.",
            "explanation": "More visitors did not establish understanding of the exhibition’s central question. Prompts and discussion review add educational evidence; attendance remains useful rather than becoming either sufficient or worthless.",
            "options": [
              "Higher visitor totals show that the central question was understood.",
              "Short prompts make attendance figures unnecessary.",
              "Attendance and learning require different measures.",
              "The survey showed that visitors disliked comparing objects."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Choose the best heading for the whole text.",
            "answers": [
              "Beyond the number of visitors"
            ],
            "evidence": "The heading covers both the purpose and the qualification in the whole account.",
            "explanation": "The account moves from rising attendance to an unresolved learning question and then a broader evaluation. Adding prompts is one response, not the whole controlling idea. Attendance does not prove understanding, and reduced attendance is not the stated goal.",
            "options": [
              "Beyond the number of visitors",
              "Adding comparison prompts as the whole exhibition strategy",
              "Attendance as proof of visitor understanding",
              "Reducing attendance to improve discussion"
            ],
            "id": "q3"
          }
        ],
        "seconds": 420,
        "id": "band2-reading-headings-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Headings, Information and Features",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Passage\n\nA public database can appear to be a finished product: users search, download and compare figures without seeing the work that keeps records usable. Yet maintenance often demands as much judgement as initial collection. A change in the definition of a category can make a new figure look comparable with an old one when it is not.\n\nOne city discovered this problem when comparing reported cycling journeys across a decade. Earlier surveys counted only travel to work, while later ones included shopping and leisure. The rise in the total therefore reflected both a possible behavioural change and a wider definition. Publishing the numbers without an explanation would have invited a misleading conclusion.\n\nThe data team retained the original records and added notes describing each change. It also created a narrower series using only categories shared across the surveys. This made some comparisons possible, although it could not recover information that had never been collected.\n\nSuch work is rarely visible in promotional accounts of digital services. A new dashboard may attract attention, while correcting a category description does not. Nevertheless, reliable access depends on both. The writer argues that funding should include long-term documentation and review rather than treating publication as the end of the project. A dataset is useful only when users can understand what its figures represent and where their limits lie.\n\nResearchers’ proposals: A · Lee: retain original records and document changed definitions. B · Rao: remove historical figures whenever definitions change. C · Chen: publish only the latest headline total.\n\nDocumentation also needs to explain missing values. A blank entry may mean that no event occurred, that no measurement was taken or that the information could not be released. Treating all blanks as zero would combine fundamentally different situations. The team introduced separate labels for these cases and included examples showing how each should be interpreted.\n\nVersion control offered another safeguard. When a record was corrected, the database retained a note of the change rather than silently replacing the figure. This allowed a researcher to understand why an analysis downloaded earlier no longer matched the latest release. Keeping a history did not eliminate errors, but it made them easier to trace and discuss.\n\nThere was a cost to this approach. Staff had to decide which explanations were essential and which level of detail would overwhelm ordinary users. The team placed short definitions beside the figures and linked them to fuller notes for specialist readers. This layered presentation recognised that transparency requires communication as well as disclosure. A large archive of technical notes is of limited help if users cannot find the one qualification that changes the meaning of a comparison.",
        "questions": [
          {
            "prompt": "Which journeys did the earlier surveys count?",
            "answers": [
              "travel to work"
            ],
            "evidence": "Earlier surveys counted only travel to work.",
            "explanation": "The source supports this answer: Earlier surveys counted only travel to work.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What is the writer's main funding recommendation for public databases?",
            "answers": [
              "Reliable datasets need ongoing documentation as well as initial publication."
            ],
            "evidence": "There was a cost to this approach. Staff had to decide which explanations were essential and which level of detail would overwhelm ordinary users. The team placed short definitions beside the figures and linked them to fuller notes for specialist readers. This layered presentation recognised that transparency requires communication as well as disclosure. A large archive of technical notes is of limited help if users cannot find the one qualification that changes the meaning of a comparison.",
            "explanation": "Definitions, missing-value labels and correction history let users interpret figures across releases. A dashboard alone cannot preserve comparability, while deleting old data would remove the context the team deliberately retains.",
            "options": [
              "Fund attractive dashboards instead of maintaining old definitions.",
              "Reliable datasets need ongoing documentation as well as initial publication.",
              "Delete historical records whenever categories change.",
              "Publish totals without notes so ordinary users face less complexity."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Choose the best heading for the whole text.",
            "answers": [
              "The hidden work of maintaining a public dataset"
            ],
            "evidence": "The heading covers both the purpose and the qualification in the whole account.",
            "explanation": "Changed definitions, missing values, correction history and layered notes all belong to ongoing maintenance. The transport survey is one example; deleting history or definitions reverses the team’s safeguards.",
            "options": [
              "The hidden work of maintaining a public dataset",
              "Expanding the coverage of a transport survey",
              "Replacing historical records with a current dashboard",
              "Making comparisons simpler by removing definitions"
            ],
            "id": "q3"
          },
          {
            "id": "q4",
            "prompt": "Match the proposal: preserve context for future comparison.",
            "answers": [
              "A"
            ],
            "evidence": "Lee proposes retaining original records and documenting changes.",
            "explanation": "The source supports this answer: Lee proposes retaining original records and documenting changes.",
            "options": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "prompt": "Which interpretation of every blank entry would be unsafe?",
            "answers": [
              "Zero"
            ],
            "evidence": "A blank can mean several different things.",
            "explanation": "The passage supports the answer: A blank can mean several different things.",
            "options": [
              "Zero",
              "A need to check definitions",
              "A possible missing measurement",
              "A possible release restriction"
            ],
            "id": "q5"
          },
          {
            "prompt": "Why retain correction history?",
            "answers": [
              "To explain differences between releases"
            ],
            "evidence": "An earlier download may differ from a later corrected release.",
            "explanation": "The passage supports the answer: An earlier download may differ from a later corrected release.",
            "options": [
              "To hide errors permanently",
              "To explain differences between releases",
              "To stop all users downloading data",
              "To make every figure larger"
            ],
            "id": "q6"
          },
          {
            "prompt": "How does the team manage different information needs?",
            "answers": [
              "Short definitions with links to fuller notes"
            ],
            "evidence": "Layered explanations serve ordinary and specialist readers.",
            "explanation": "The passage supports the answer: Layered explanations serve ordinary and specialist readers.",
            "options": [
              "Only unexplained numbers",
              "Short definitions with links to fuller notes",
              "No documentation",
              "A single technical note without links"
            ],
            "id": "q7"
          }
        ],
        "seconds": 720,
        "id": "band2-reading-headings-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Headings, Information and Features",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A\n\nEngineers produced a lighter insulation panel and measured its performance in a laboratory. It retained heat effectively under stable conditions. However, buildings experience moisture, vibration and changing temperatures. The team therefore plans field trials before recommending wide adoption. A successful laboratory result establishes potential, not performance in every building.\n\nB\n\nThe field trial will compare the panel in occupied homes with different moisture levels. Residents will note any damage, while sensors record indoor temperatures. These observations will help engineers distinguish heat retention from durability: an effective insulator could still be unsuitable if its surface deteriorates quickly.\n\nC\n\nThe team will publish the maintenance requirements alongside the thermal results. Buyers should be able to compare the cost of repairs with the energy saved, rather than judge the material only by its weight. The report will state which conditions were tested and which still require investigation.",
        "questions": [
          {
            "prompt": "What kind of trials are planned?",
            "answers": [
              "field trials"
            ],
            "evidence": "The team plans field trials.",
            "explanation": "The source supports this answer: The team plans field trials.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What does the insulation-panel result establish?",
            "answers": [
              "Laboratory promise must be checked in realistic conditions."
            ],
            "evidence": "Engineers produced a lighter insulation panel and measured its performance in a laboratory. It retained heat effectively under stable conditions. However, buildings experience moisture, vibration and changing temperatures. The team therefore plans field trials before recommending wide adoption. A successful laboratory result establishes potential, not performance in every building.",
            "explanation": "Stable laboratory heat retention shows potential. Moisture, vibration and everyday use remain to be tested, so neither universal adoption nor complete rejection follows from the result.",
            "options": [
              "Laboratory promise must be checked in realistic conditions.",
              "Effective laboratory heat retention justifies adoption in every building.",
              "Field testing is needed because the laboratory test found no potential.",
              "Moisture and vibration are irrelevant if temperature is stable."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Match paragraph A to the best heading. Choose one of i–v.",
            "answers": [
              "i · A promising result with limited scope"
            ],
            "explanation": "Paragraph A introduces the laboratory promise and explains why it has limited scope.",
            "evidence": "Paragraph A introduces the laboratory promise and explains why it has limited scope.",
            "options": [
              "i · A promising result with limited scope",
              "ii · Collecting evidence under everyday conditions",
              "iii · Helping buyers weigh benefits against ongoing costs",
              "iv · Proof that lighter materials never need maintenance",
              "v · Replacing household trials with laboratory work"
            ]
          },
          {
            "id": "q4",
            "prompt": "Match paragraph B to the best heading. Choose one of i–v.",
            "answers": [
              "ii · Collecting evidence under everyday conditions"
            ],
            "explanation": "Paragraph B explains evidence collection in occupied homes and the distinction between thermal performance and durability.",
            "evidence": "Paragraph B explains evidence collection in occupied homes and the distinction between thermal performance and durability.",
            "options": [
              "i · A promising result with limited scope",
              "ii · Collecting evidence under everyday conditions",
              "iii · Helping buyers weigh benefits against ongoing costs",
              "iv · Proof that lighter materials never need maintenance",
              "v · Replacing household trials with laboratory work"
            ]
          },
          {
            "id": "q5",
            "prompt": "Match paragraph C to the best heading. Choose one of i–v.",
            "answers": [
              "iii · Helping buyers weigh benefits against ongoing costs"
            ],
            "explanation": "Paragraph C connects maintenance costs, energy savings and reported limits to an informed purchasing decision.",
            "evidence": "Paragraph C connects maintenance costs, energy savings and reported limits to an informed purchasing decision.",
            "options": [
              "i · A promising result with limited scope",
              "ii · Collecting evidence under everyday conditions",
              "iii · Helping buyers weigh benefits against ongoing costs",
              "iv · Proof that lighter materials never need maintenance",
              "v · Replacing household trials with laboratory work"
            ]
          }
        ],
        "seconds": 720,
        "id": "band2-reading-headings-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-c7ab21db"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-reading-mcq",
  "lessonId": "band2-reading-mcq",
  "type": "course-activity",
  "prompt": "Reading: Multiple Choice, Inference and Time Management — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Reading: Multiple Choice, Inference and Time Management",
    "learn": "Read a complete argument before judging individual claims. Separate a statement supported by the text, a contradiction and information the text does not provide. Match headings to the main development rather than a striking detail. For completion tasks, preserve grammar and the stated word limit. These shorter original passage sets train evidence use; they are not a full three-passage IELTS Reading examination.",
    "worked": {
      "example": "A trial found an improvement but changed two conditions together. Claim: one condition caused all of the improvement → not established.",
      "reasoning": "A relationship is not enough to establish a unique cause. Use the author’s qualifications when interpreting the result."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Multiple Choice, Inference and Time Management",
        "instructions": "Complete an empty actor / outcome / scope / certainty record for the first option. Then compare remaining options without the supplied labels. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "When a prediction changes behaviour\n\nA station displayed predicted crowding levels to help passengers choose quieter trains. Some travellers changed departure times, which meant the actual pattern differed from the prediction. The system was not necessarily defective: its information had influenced the behaviour being predicted. Evaluators must therefore consider how people respond to a forecast, rather than treating every difference as a simple error.",
        "questions": [
          {
            "prompt": "What did some travellers change?",
            "answers": [
              "departure times"
            ],
            "evidence": "Some travellers changed departure times.",
            "explanation": "The source supports this answer: Some travellers changed departure times.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Why can a crowding forecast differ from the eventual pattern?",
            "answers": [
              "Forecast evaluation must account for responses to the forecast itself."
            ],
            "evidence": "A station displayed predicted crowding levels to help passengers choose quieter trains. Some travellers changed departure times, which meant the actual pattern differed from the prediction. The system was not necessarily defective: its information had influenced the behaviour being predicted. Evaluators must therefore consider how people respond to a forecast, rather than treating every difference as a simple error.",
            "explanation": "A forecast can change people’s behaviour, which can then change the observed outcome. Evaluation must consider that response instead of treating the forecast as detached from the event it predicts.",
            "options": [
              "A difference necessarily proves that the system malfunctioned.",
              "Passenger choices are independent of the information displayed.",
              "Forecast evaluation must account for responses to the forecast itself.",
              "Only forecasts that passengers ignore can be evaluated fairly."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band2-reading-mcq-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Multiple Choice, Inference and Time Management",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The value of a negative result\n\nResearch reports tend to attract attention when a new treatment or method appears to work. A finding that an intervention produced no measurable improvement may seem less newsworthy, yet it can prevent others from repeating an ineffective approach. The absence of an observed effect also needs careful interpretation. A study may be too small, too short or too imprecise to detect a change that exists.\n\nIn a trial of classroom lighting, researchers found no clear difference in test performance between two settings. They had measured only one kind of task during a single afternoon. It would therefore be unreasonable to conclude that lighting never affects learning. The result supported a narrower statement: under the tested conditions, this particular change did not produce a detectable difference on that task.\n\nPublishing the method and uncertainty allowed another team to design a longer study. That team could avoid repeating the same limitations and could choose measures more closely related to fatigue. The initial result was therefore useful even without a positive effect.\n\nThe writer argues that researchers should describe both what their evidence permits and what remains unresolved. Treating a negative result as failure encourages exaggerated claims and hides useful information. Equally, calling every inconclusive result proof of no effect would be a different mistake. Progress depends on clear questions, transparent methods and conclusions no broader than the evidence supports.\n\nThe distinction becomes especially important when results enter public discussion. A headline saying that a method does not work is simpler than an explanation of uncertainty, but it may discourage a useful follow-up study. The opposite headline, claiming that a small unresolved effect proves success, would be equally misleading. Researchers cannot control every summary of their work, yet they can make the limits clear in the report itself.\n\nA well-described negative result can also improve decisions about resources. If several careful studies fail to find the benefit a programme was designed to produce, continuing it unchanged becomes harder to justify. That conclusion depends on the combined evidence, not merely on one unsuccessful afternoon. It may lead to revising the intervention, changing the outcome measured or choosing a different approach.\n\nThe writer therefore separates openness to new evidence from a refusal to make decisions. Uncertainty does not mean that all options are equally supported. It means that a decision should reflect the strength of the available evidence and remain open to revision. Publishing methods and results, including those that are disappointing, allows others to understand that judgement and build on it.",
        "questions": [
          {
            "prompt": "Which outcome did the lighting trial measure?",
            "answers": [
              "test performance"
            ],
            "evidence": "No clear difference in test performance.",
            "explanation": "The source supports this answer: No clear difference in test performance.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What makes a negative research result valuable?",
            "answers": [
              "Negative results are useful when uncertainty and scope are explained."
            ],
            "evidence": "The writer therefore separates openness to new evidence from a refusal to make decisions. Uncertainty does not mean that all options are equally supported. It means that a decision should reflect the strength of the available evidence and remain open to revision. Publishing methods and results, including those that are disappointing, allows others to understand that judgement and build on it.",
            "explanation": "A negative result has value when the measured task and uncertainty are clear. It neither proves universal ineffectiveness nor becomes worthless because the expected benefit was not found.",
            "options": [
              "It establishes that the tested intervention never works.",
              "It should be withheld until a study produces a positive finding.",
              "Any unresolved effect is enough to justify continued spending.",
              "Negative results are useful when uncertainty and scope are explained."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Choose TWO limitations of the classroom-lighting trial described in the passage.",
            "options": [
              "Only one type of task was measured.",
              "The study lasted a single afternoon.",
              "No classroom was used.",
              "All lighting research was prohibited."
            ],
            "answers": [
              "Only one type of task was measured.",
              "The study lasted a single afternoon."
            ],
            "selectCount": 2,
            "evidence": "They had measured only one kind of task during a single afternoon.",
            "explanation": "Both design limits narrow the conclusion; neither justifies claiming that lighting never affects learning."
          },
          {
            "prompt": "What is the problem with a simple “does not work” headline?",
            "answers": [
              "It may hide the scope and uncertainty"
            ],
            "evidence": "The headline may discourage a useful follow-up by simplifying uncertainty.",
            "explanation": "The passage supports the answer: The headline may discourage a useful follow-up by simplifying uncertainty.",
            "options": [
              "It always contains too many figures",
              "It may hide the scope and uncertainty",
              "It proves the original study was dishonest",
              "It guarantees public understanding"
            ],
            "id": "q4"
          },
          {
            "prompt": "When is continuing an unchanged programme harder to justify?",
            "answers": [
              "When several careful studies fail to find its intended benefit"
            ],
            "evidence": "The conclusion depends on combined evidence.",
            "explanation": "The passage supports the answer: The conclusion depends on combined evidence.",
            "options": [
              "After any single disappointing afternoon",
              "When several careful studies fail to find its intended benefit",
              "Before its purpose is defined",
              "Whenever a headline is short"
            ],
            "id": "q5"
          },
          {
            "prompt": "Does uncertainty mean every option is equally supported?",
            "answers": [
              "No"
            ],
            "evidence": "Uncertainty does not mean all options are equally supported.",
            "explanation": "The passage supports the answer: Uncertainty does not mean all options are equally supported.",
            "options": [
              "Yes",
              "No",
              "Only if the study is public",
              "The writer does not discuss this"
            ],
            "id": "q6"
          }
        ],
        "seconds": 720,
        "id": "band2-reading-mcq-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-bf5d616b"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Multiple Choice, Inference and Time Management",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A shared digital catalogue\n\nSeveral archives created a shared catalogue, but kept the original documents in their own buildings. Users could discover material more easily, although access still depended on each archive’s opening hours and handling rules. The catalogue improved discovery rather than creating unrestricted access. Future evaluation will examine whether users understand that distinction before travelling.",
        "questions": [
          {
            "prompt": "What remained in separate buildings?",
            "answers": [
              "original documents"
            ],
            "evidence": "The original documents stayed in their own buildings.",
            "explanation": "The source supports this answer: The original documents stayed in their own buildings.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What distinction should users make about the shared catalogue?",
            "answers": [
              "Improved discovery does not necessarily mean unrestricted physical access."
            ],
            "evidence": "Several archives created a shared catalogue, but kept the original documents in their own buildings. Users could discover material more easily, although access still depended on each archive’s opening hours and handling rules. The catalogue improved discovery rather than creating unrestricted access. Future evaluation will examine whether users understand that distinction before travelling.",
            "explanation": "Finding a catalogue record improves discovery, but physical consultation still depends on the holding archive’s hours and handling rules. Online discovery is not unrestricted possession or access.",
            "options": [
              "Listed documents are now held in one central building.",
              "Improved discovery does not necessarily mean unrestricted physical access.",
              "Discovery through the catalogue removes archive handling rules.",
              "The catalogue makes each archive's opening hours irrelevant."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "What should a researcher check before travelling to view a listed document?",
            "answers": [
              "The holding archive’s opening hours and handling rules."
            ],
            "explanation": "Original documents remain at separate archives, each with access conditions.",
            "evidence": "Original documents remain at separate archives, each with access conditions.",
            "options": [
              "Whether the shared catalogue has replaced all original documents.",
              "Whether the document is now in one central building.",
              "The holding archive’s opening hours and handling rules.",
              "The total number of searches across all archives."
            ]
          },
          {
            "id": "q4",
            "prompt": "What will the planned evaluation investigate?",
            "answers": [
              "Whether users distinguish discovery from physical access."
            ],
            "explanation": "The final sentence asks whether users understand this distinction before travelling.",
            "evidence": "The final sentence asks whether users understand this distinction before travelling.",
            "options": [
              "Whether users distinguish discovery from physical access.",
              "Whether every archive should discard its handling rules.",
              "Which archive should store all originals.",
              "How to replace catalogue searches with unplanned visits."
            ]
          }
        ],
        "seconds": 720,
        "id": "band2-reading-mcq-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-3864062a"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-vocab-awl2",
  "lessonId": "band2-vocab-awl2",
  "type": "course-activity",
  "prompt": "Reading and Vocabulary: Paraphrase, Summary and Sentence Completion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
    "learn": "Read a complete argument before judging individual claims. Separate a statement supported by the text, a contradiction and information the text does not provide. Match headings to the main development rather than a striking detail. For completion tasks, preserve grammar and the stated word limit. These shorter original passage sets train evidence use; they are not a full three-passage IELTS Reading examination.",
    "worked": {
      "example": "A trial found an improvement but changed two conditions together. Claim: one condition caused all of the improvement → not established.",
      "reasoning": "A relationship is not enough to establish a unique cause. Use the author’s qualifications when interpreting the result."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
        "instructions": "Identify the copied gap’s role and locate the exact source phrase. Separate that transfer check from the whole-proposition check required by a paraphrase choice. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Water use in a greenhouse\n\nA greenhouse replaced a fixed watering schedule with sensors that measured soil moisture. Water use fell during the first trial, but some sensors needed recalibration. Staff concluded that automation could assist decisions only if measurements were checked. The report does not give the cost of the sensors or claim that human oversight is unnecessary.",
        "questions": [
          {
            "prompt": "What did the sensors measure?",
            "answers": [
              "soil moisture"
            ],
            "evidence": "Sensors measured soil moisture.",
            "explanation": "The source supports this answer: Sensors measured soil moisture.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What condition accompanies the greenhouse's automation result?",
            "answers": [
              "Automation is useful when measurement quality is maintained."
            ],
            "evidence": "A greenhouse replaced a fixed watering schedule with sensors that measured soil moisture. Water use fell during the first trial, but some sensors needed recalibration. Staff concluded that automation could assist decisions only if measurements were checked. The report does not give the cost of the sensors or claim that human oversight is unnecessary.",
            "explanation": "Automated measurement can increase usable coverage only if quality checks preserve what the readings mean. More records cannot compensate for an unrecognised measurement problem.",
            "options": [
              "Automation is useful when measurement quality is maintained.",
              "Reduced water use means the sensors need no further checking.",
              "The trial proves that buying sensors is cheaper than employing staff.",
              "Recalibration shows that automation cannot assist watering decisions."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band2-vocab-awl2-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Why a tree count is not enough\n\nCity planting programmes often announce how many trees will be added, because a single number is easy to communicate. That total does not show where trees will survive or whom they will benefit. A tree planted beside a pavement without enough soil may remain small, while one in a suitable site can develop a broad canopy.\n\nResearchers comparing neighbourhoods therefore examine canopy cover, species diversity and maintenance as well as planting totals. They also distinguish private gardens from public streets. A leafy district may still have exposed bus stops where people wait in direct sun. The location of shade matters for access, not merely its total area.\n\nWater availability creates another constraint. Species chosen for rapid growth may require more care than a local maintenance team can provide. In one trial, staff recorded survival rates annually and replaced a popular but unsuitable species with a slower-growing alternative. The change reduced the headline planting target but improved the proportion of trees that established successfully.\n\nThe writer argues that public reporting should connect targets with outcomes. This does not make tree planting unimportant; it makes its evaluation more useful. A modest programme with suitable sites and reliable care may create more lasting benefit than a larger announcement followed by high losses. The challenge is to communicate this complexity without making the evidence inaccessible to residents.\n\nA distributional question also arises. Two districts with the same average canopy cover may offer very different experiences at street level. In one, shade may be concentrated in private gardens; in another, it may line the routes to schools and shops. A city-wide average can therefore hide whether people can reach useful shade during an ordinary journey. Mapping the location of trees alongside pedestrian routes gives planners a more practical view.\n\nResidents’ knowledge can improve that map. A route that looks shaded from above may still be difficult to use because roots have damaged the pavement or because there are no safe crossings. Consultation does not replace measurement, but it can reveal which measurements are missing. The researchers recommend recording these observations systematically rather than treating them as isolated complaints.\n\nThe same reasoning applies to future targets. Announcing an ambitious number of new trees may create political support, yet a programme needs resources for the years after planting. Public reports should show what was planted, what survived and which areas gained usable shade. This would make progress harder to express in one headline, but easier to connect with the reasons the programme exists.",
        "questions": [
          {
            "prompt": "Which measure was recorded annually in the trial?",
            "answers": [
              "survival rates"
            ],
            "evidence": "Staff recorded survival rates annually.",
            "explanation": "The source supports this answer: Staff recorded survival rates annually.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should a city judge a planting programme?",
            "answers": [
              "Planting targets should be evaluated through survival, location and long-term care."
            ],
            "evidence": "The same reasoning applies to future targets. Announcing an ambitious number of new trees may create political support, yet a programme needs resources for the years after planting. Public reports should show what was planted, what survived and which areas gained usable shade. This would make progress harder to express in one headline, but easier to connect with the reasons the programme exists.",
            "explanation": "Planting totals do not establish survival, useful location or care. Long-term shade and access depend on where trees persist and how they are maintained, rather than a target number alone.",
            "options": [
              "The number planted is sufficient to compare neighbourhood benefit.",
              "Planting targets should be evaluated through survival, location and long-term care.",
              "A fast-growing species always provides more lasting shade.",
              "A city-wide canopy average establishes access at every bus stop."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete the summary: public reporting should connect targets with ___.",
            "answers": [
              "outcomes"
            ],
            "evidence": "Public reporting should connect targets with outcomes.",
            "explanation": "The source supports this answer: Public reporting should connect targets with outcomes.",
            "maxWords": 1,
            "punctuation": "terminal"
          },
          {
            "prompt": "Why may equal average canopy cover hide unequal access?",
            "answers": [
              "Shade may be concentrated in different places"
            ],
            "evidence": "Private gardens and public routes offer different access.",
            "explanation": "The passage supports the answer: Private gardens and public routes offer different access.",
            "options": [
              "All trees are identical",
              "Shade may be concentrated in different places",
              "Every route has safe crossings",
              "Averages always show street conditions"
            ],
            "id": "q4"
          },
          {
            "prompt": "What can residents reveal?",
            "answers": [
              "Practical barriers missing from the map"
            ],
            "evidence": "Damaged pavements and unsafe crossings may be missing.",
            "explanation": "The passage supports the answer: Damaged pavements and unsafe crossings may be missing.",
            "options": [
              "The exact future rainfall",
              "Practical barriers missing from the map",
              "A guarantee that all species survive",
              "The age of every tree"
            ],
            "id": "q5"
          },
          {
            "prompt": "What should future reports connect with planting totals?",
            "answers": [
              "Survival and usable shade"
            ],
            "evidence": "Reports should show survival and areas gaining usable shade.",
            "explanation": "The passage supports the answer: Reports should show survival and areas gaining usable shade.",
            "options": [
              "Only promotional photographs",
              "Survival and usable shade",
              "Only the purchase price",
              "An assumption of equal benefit"
            ],
            "id": "q6"
          }
        ],
        "seconds": 720,
        "id": "band2-vocab-awl2-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-5b4a8b5c"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A survey with missing voices\n\nAn online consultation attracted many responses about a proposed cycle route. However, residents without reliable internet access were less likely to participate. The council added paper forms at libraries and held a public meeting. It will report results separately by collection method before combining them. A larger response total alone would not show that every group had been represented fairly.",
        "questions": [
          {
            "prompt": "Where were paper forms made available?",
            "answers": [
              "libraries"
            ],
            "evidence": "Paper forms were added at libraries.",
            "explanation": "The source supports this answer: Paper forms were added at libraries.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Why did the council add paper forms and a public meeting?",
            "answers": [
              "Participation methods can affect whose views are represented."
            ],
            "evidence": "An online consultation attracted many responses about a proposed cycle route. However, residents without reliable internet access were less likely to participate. The council added paper forms at libraries and held a public meeting. It will report results separately by collection method before combining them. A larger response total alone would not show that every group had been represented fairly.",
            "explanation": "Different participation routes can include or exclude different groups. A larger response total alone does not prove representation; residual barriers still need checking.",
            "options": [
              "A high online response total already established fair representation.",
              "Responses should be combined before the collection method is recorded.",
              "Participation methods can affect whose views are represented.",
              "Offline participation should replace all online responses."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete the summary using no more than TWO words from the passage: The council supplemented its online consultation with ___ at libraries.",
            "answers": [
              "paper forms"
            ],
            "explanation": "The council added paper forms at libraries.",
            "evidence": "The council added paper forms at libraries.",
            "maxWords": 2,
            "punctuation": "terminal"
          },
          {
            "id": "q4",
            "prompt": "Complete the sentence using no more than TWO words from the passage: Results will first be separated by ___.",
            "answers": [
              "collection method"
            ],
            "explanation": "It will report results separately by collection method before combining them.",
            "evidence": "It will report results separately by collection method before combining them.",
            "maxWords": 2,
            "punctuation": "terminal"
          },
          {
            "id": "q5",
            "prompt": "Why is a larger response total insufficient evidence of fair representation?",
            "answers": [
              "Some groups may still be less likely to participate."
            ],
            "explanation": "Internet access affected participation, so a larger total need not correct the imbalance.",
            "evidence": "Internet access affected participation, so a larger total need not correct the imbalance.",
            "options": [
              "The consultation did not concern a cycle route.",
              "Some groups may still be less likely to participate.",
              "Paper forms cannot be included in a combined result.",
              "The council has already removed online responses."
            ]
          }
        ],
        "seconds": 720,
        "id": "band2-vocab-awl2-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-3c9e1a3b"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-practice-reading",
  "lessonId": "band2-practice-reading",
  "type": "course-activity",
  "prompt": "Reading: Evidence-Based Mixed-Question Practice — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Reading: Evidence-Based Mixed-Question Practice",
    "learn": "Read a complete argument before judging individual claims. Separate a statement supported by the text, a contradiction and information the text does not provide. Match headings to the main development rather than a striking detail. For completion tasks, preserve grammar and the stated word limit. These shorter original passage sets train evidence use; they are not a full three-passage IELTS Reading examination.",
    "worked": {
      "example": "A trial found an improvement but changed two conditions together. Claim: one condition caused all of the improvement → not established.",
      "reasoning": "A relationship is not enough to establish a unique cause. Use the author’s qualifications when interpreting the result."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Evidence-Based Mixed-Question Practice",
        "instructions": "Name the current demand first: detail, judgement, completion or summary. Keep a short source-clause note, then use that demand’s own checking procedure. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A cooling roof trial\n\nResearchers compared two identical small buildings, one with a pale roof and one with a dark roof. The pale-roofed building was cooler on sunny afternoons, but the difference narrowed at night. The authors limit their conclusion to the weather and building type tested. They recommend trials in occupied buildings before estimating energy savings at city scale.",
        "questions": [
          {
            "prompt": "When did the temperature difference narrow?",
            "answers": [
              "at night"
            ],
            "evidence": "The difference narrowed at night.",
            "explanation": "The source supports this answer: The difference narrowed at night.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How far can the cooling-roof result be generalised?",
            "answers": [
              "The trial supports a limited result rather than a city-wide energy claim."
            ],
            "evidence": "Researchers compared two identical small buildings, one with a pale roof and one with a dark roof. The pale-roofed building was cooler on sunny afternoons, but the difference narrowed at night. The authors limit their conclusion to the weather and building type tested. They recommend trials in occupied buildings before estimating energy savings at city scale.",
            "explanation": "The local trial supports the measured limited outcome. It does not supply a city-wide energy comparison, so wider savings cannot be inferred from a narrower result.",
            "options": [
              "The trial supports a limited result rather than a city-wide energy claim.",
              "The measured afternoon difference proves a city-wide energy saving.",
              "The difference remains equally large at night.",
              "Two unoccupied test buildings establish performance in every building type."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band2-practice-reading-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Evidence-Based Mixed-Question Practice",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Learning from a restored wetland\n\nA coastal wetland was restored by reopening channels that had been blocked for agriculture. Water returned quickly, but the vegetation changed more slowly. Early photographs made the project appear complete, while field surveys showed that some expected plant communities had not yet established.\n\nThe monitoring team selected several indicators: water levels, plant distribution and the use of the area by birds. These did not always move in the same direction. One bird species became more common while another declined. The team avoided combining every measure into a single success score, because doing so would conceal the different ecological responses.\n\nLocal residents also valued the new walking route, although some were concerned about flooding. Engineers explained that the channels were designed for a specific range of tides and that extreme events remained a separate risk. Public meetings helped distinguish the restoration’s intended function from expectations it could not meet.\n\nAfter five years, the project had created valuable habitat and a well-used public space. Nevertheless, the report describes continuing uncertainty about long-term sediment movement. The writer presents restoration as an ongoing process of observation and adjustment rather than a one-time return to a perfectly known past. This interpretation supports the project while resisting the temptation to declare every outcome settled.\n\nThe project also changed how evidence was shared. Early updates used aerial photographs, which clearly showed the reopened channels but revealed little about plant diversity. Later reports combined images with field observations and short explanations of what each indicator could establish. This helped residents see why an area that looked green might still be developing ecologically.\n\nMonitoring involved choices about where and when to collect information. A bird count at one time of day could miss species active at another. The team therefore used a repeatable schedule and recorded unusual weather or disturbance. Consistency made comparisons more useful, although it could not capture every event. The researchers described this as a practical compromise rather than a perfect measure of the wetland.\n\nThe report also recorded disagreements about priorities. Some residents favoured easier walking access, while conservation volunteers wanted quiet areas where wildlife would be disturbed less often. The final route avoided several sensitive locations but included viewing points. This did not satisfy every preference, yet it made the trade-off explicit. The writer regards that openness as part of responsible restoration: decisions about a living landscape involve social choices as well as technical evidence.",
        "questions": [
          {
            "prompt": "What changed more slowly than water levels?",
            "answers": [
              "vegetation"
            ],
            "evidence": "Water returned quickly, but the vegetation changed more slowly.",
            "explanation": "The source supports this answer: Water returned quickly, but the vegetation changed more slowly.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What view of wetland restoration does the report support?",
            "answers": [
              "Restoration needs continued monitoring because different outcomes develop at different rates."
            ],
            "evidence": "The report also recorded disagreements about priorities. Some residents favoured easier walking access, while conservation volunteers wanted quiet areas where wildlife would be disturbed less often. The final route avoided several sensitive locations but included viewing points. This did not satisfy every preference, yet it made the trade-off explicit. The writer regards that openness as part of responsible restoration: decisions about a living landscape involve social choices as well as technical evidence.",
            "explanation": "Different restoration outcomes appear at different rates, and public access can conflict with disturbance control. Continued comparable monitoring responds to those different demands rather than declaring uniform success.",
            "options": [
              "Water returning quickly establishes that all ecological recovery is complete.",
              "Different bird responses should be hidden in one success score.",
              "Reopening channels removes the risk of every extreme tide.",
              "Restoration needs continued monitoring because different outcomes develop at different rates."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "What did early aerial photographs fail to show clearly?",
            "answers": [
              "Plant diversity"
            ],
            "evidence": "Photographs showed channels but little about plant diversity.",
            "explanation": "The passage supports the answer: Photographs showed channels but little about plant diversity.",
            "options": [
              "Reopened channels",
              "Plant diversity",
              "The existence of the coast",
              "The project boundary"
            ],
            "id": "q3"
          },
          {
            "prompt": "Why use a repeatable bird-count schedule?",
            "answers": [
              "To make comparisons more useful"
            ],
            "evidence": "Consistency improves comparison despite incomplete coverage.",
            "explanation": "The passage supports the answer: Consistency improves comparison despite incomplete coverage.",
            "options": [
              "To guarantee every bird is counted",
              "To make comparisons more useful",
              "To avoid recording weather",
              "To remove every disturbance"
            ],
            "id": "q4"
          },
          {
            "prompt": "What trade-off affected the walking route?",
            "answers": [
              "Public access versus wildlife disturbance"
            ],
            "evidence": "Some wanted access while others favoured quiet wildlife areas.",
            "explanation": "The passage supports the answer: Some wanted access while others favoured quiet wildlife areas.",
            "options": [
              "Housing versus factory production",
              "Public access versus wildlife disturbance",
              "Fishing versus airport expansion",
              "Tourism versus laboratory equipment"
            ],
            "id": "q5"
          }
        ],
        "seconds": 720,
        "id": "band2-practice-reading-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-b6e404a9"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Evidence-Based Mixed-Question Practice",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Open access to research tools\n\nA laboratory released plans for a low-cost measuring device. Other teams could build it, but accuracy depended on calibration and the quality of locally obtained parts. The laboratory published a checking procedure alongside the plans. The writer welcomes the wider access while warning that an open design should not be mistaken for a guarantee of identical results in every setting.",
        "questions": [
          {
            "prompt": "What procedure accompanied the plans?",
            "answers": [
              "checking procedure"
            ],
            "evidence": "A checking procedure was published alongside the plans.",
            "explanation": "The source supports this answer: A checking procedure was published alongside the plans.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What caution accompanies the open measuring-device plans?",
            "answers": [
              "Open designs improve access while still requiring quality checks."
            ],
            "evidence": "A laboratory released plans for a low-cost measuring device. Other teams could build it, but accuracy depended on calibration and the quality of locally obtained parts. The laboratory published a checking procedure alongside the plans. The writer welcomes the wider access while warning that an open design should not be mistaken for a guarantee of identical results in every setting.",
            "explanation": "Open designs widen access to the instructions, while construction quality and checks still matter. Availability of a design cannot guarantee that every resulting item performs safely or accurately.",
            "options": [
              "Open publication guarantees identical accuracy from locally sourced parts.",
              "Calibration is unnecessary if the plans are followed closely.",
              "Sharing a checking procedure prevents teams from adapting the design.",
              "Open designs improve access while still requiring quality checks."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete the sentence with ONE word from the passage: Accuracy depends partly on ___.",
            "answers": [
              "calibration"
            ],
            "explanation": "The source explicitly names calibration alongside part quality.",
            "evidence": "The source explicitly names calibration alongside part quality.",
            "maxWords": 1,
            "punctuation": "terminal"
          },
          {
            "id": "q4",
            "prompt": "The released plans guarantee identical results in all settings.",
            "answers": [
              "FALSE"
            ],
            "explanation": "The writer explicitly warns against interpreting an open design as a guarantee.",
            "evidence": "The writer explicitly warns against interpreting an open design as a guarantee.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ]
          },
          {
            "id": "q5",
            "prompt": "The checking procedure takes less than an hour to complete.",
            "answers": [
              "NOT GIVEN"
            ],
            "explanation": "No duration is provided for the checking procedure.",
            "evidence": "No duration is provided for the checking procedure.",
            "options": [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ]
          }
        ],
        "seconds": 720,
        "id": "band2-practice-reading-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-e6e6b8e8"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-line-graphs",
  "lessonId": "band2-writing-line-graphs",
  "type": "course-activity",
  "prompt": "Writing Task 1: Line Graphs, Bar Charts and Overviews — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Task 1: Line Graphs, Bar Charts and Overviews",
    "learn": "Academic Task 1 requires at least 150 words describing visual information. For graphs, identify the variables, units and period, then select the main trends for an overview. Support comparisons with accurate data. A percentage-point change is the difference between two percentages; it is not the same as a relative percentage increase. Do not invent causes or predict beyond the graph.",
    "worked": {
      "example": "Cycling rose from 10% to 35%: an increase of 25 percentage points.",
      "reasoning": "The subtraction is 35 minus 10. It is not a 25% relative increase."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided graph overview",
        "instructions": "Using this separate mini-dataset, write a 50–80-word introduction and overview. Identify the opposing trends and final ranking without inventing causes.",
        "model": "The mini-dataset compares bicycle and bus travel in 2000 and 2005. Cycling gained share, while bus travel declined. Despite these opposite movements, buses still accounted for a larger proportion in the final year. The gap narrowed from 35 percentage points to 20, but the ranking did not reverse. The figures describe shares rather than total numbers of journeys.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I introduce the mini-dataset and give opposing trends and final rank.",
          "Development: I select main patterns without explaining an unshown cause.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check scope and units before adding exact values."
        ],
        "analysis": "Review this response against its own demand: Introduce the mini-dataset and give opposing trends and final rank. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will select main patterns without explaining an unshown cause; a weaker one only names the topic or repeats a judgement. For your revision, check scope and units before adding exact values. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band2-writing-line-graphs-stage-1",
        "source": "Separate guided dataset: bicycle trips rose from 10% in 2000 to 20% in 2005; bus trips fell from 45% to 40%.",
        "compatibleWithSignature": "v1-feefbc08"
      },
      {
        "kind": "writing",
        "title": "Independent line-graph report",
        "instructions": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
        "model": "The line graph compares the proportions of all trips made by bicycle and bus in Norford at four points between 2010 and 2025.\n\nOverall, cycling became more common throughout the period, whereas the share of bus travel declined. Buses accounted for a much larger proportion initially, but bicycles had overtaken them by the final year shown.\n\nIn 2010, 10% of trips were made by bicycle, compared with 40% by bus. The cycling figure rose to 15% in 2015 and then increased more rapidly, reaching 25% in 2020 and 35% in 2025. Its overall gain was therefore 25 percentage points.\n\nBus travel followed the opposite pattern. Its share fell slightly to 38% in 2015, then declined to 35% in 2020 and 30% in 2025. The gap between the two modes narrowed from 30 percentage points at the start to ten in 2020. By 2025, cycling exceeded bus travel by five points. The graph gives proportions rather than total trip numbers.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I report the main graph features with an overview and comparisons.",
          "Development: I group values to support the overview rather than list every point.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I verify each endpoint, unit and comparison against the visual."
        ],
        "analysis": "Review this response against its own demand: Report the main graph features with an overview and comparisons. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will group values to support the overview rather than list every point; a weaker one only names the topic or repeats a judgement. For your revision, verify each endpoint, unit and comparison against the visual. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/travel-line.svg",
          "alt": "Line graph: percentage of trips by bicycle and bus in Norford, 2010, 2015, 2020, 2025. Bicycle 10, 15, 25, 35; bus 40, 38, 35, 30.",
          "description": "Original fictional data. Percentages of all trips; values are shown at each point. Remaining trips use other modes."
        },
        "id": "band2-writing-line-graphs-stage-2",
        "compatibleWithSignature": "v1-5987b98d"
      },
      {
        "kind": "writing",
        "title": "Assessment: a new bar chart",
        "instructions": "Summarise the new chart. Include an overview and accurate comparisons. Write at least 150 words.",
        "model": "The bar chart compares average weekly library visits in the North, Central and South districts in 2020 and 2025.\n\nOverall, visits increased in the North and South, while the Central district experienced a small decline. Central remained the busiest of the three in both years, although its lead over North became considerably smaller.\n\nIn 2020, Central recorded 400 visits per week, twice the figure for North and well above South’s 150. By 2025, its total had fallen by 20 to 380. This was the only reduction shown in the chart.\n\nNorth rose from 200 to 320 weekly visits, an increase of 120. South also grew substantially, from 150 to 260, gaining 110 visits. Consequently, the difference between Central and North narrowed from 200 to 60 visits. South remained the least visited district despite its growth, and the gap between North and South changed only slightly, from 50 to 60 visits. The chart does not indicate the reasons for these changes.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I select the new chart’s main patterns and support them accurately.",
          "Development: I construct a new overview instead of importing the earlier one.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove an invented intermediate peak or causal explanation."
        ],
        "analysis": "Review this response against its own demand: Select the new chart’s main patterns and support them accurately. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will construct a new overview instead of importing the earlier one; a weaker one only names the topic or repeats a judgement. For your revision, remove an invented intermediate peak or causal explanation. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/library-bar.svg",
          "alt": "Bar chart: average weekly library visits in three districts, 2020 and 2025. North 200 and 320; Central 400 and 380; South 150 and 260.",
          "description": "Original fictional data. Unit: visits per week; two series share the same zero baseline."
        },
        "id": "band2-writing-line-graphs-stage-3",
        "compatibleWithSignature": "v1-f0e869c8"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-bar-pie",
  "lessonId": "band2-writing-bar-pie",
  "type": "course-activity",
  "prompt": "Writing Task 1: Tables, Pie Charts and Proportions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Task 1: Tables, Pie Charts and Proportions",
    "learn": "Tables and pie charts require selection and comparison rather than a list of every number. Check denominators before comparing shares. A category can lose percentage share while its absolute amount rises if the total grows. Use an overview to describe the dominant distribution and changes, then group related details.",
    "worked": {
      "example": "A share falling from 20% to 10% halves; without totals, the amount consumed is unknown.",
      "reasoning": "The denominator matters. Do not substitute a statement about quantities for one about shares."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided table comparisons",
        "instructions": "Write 50–80 words comparing services and manufacturing in this separate table. Report the narrowing gap without inventing a ranking reversal.",
        "model": "Services gained share from 20% to 30%, while manufacturing fell from 50% to 40%. Both changed by ten percentage points in opposite directions. Manufacturing remained larger, although its lead narrowed from 30 points to ten. The other category stayed at 30%. These figures describe employment shares, so they do not establish how many people worked in each sector.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I compare services and manufacturing with the narrowing gap intact.",
          "Development: I distinguish a smaller difference from a rank reversal.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I calculate both endpoints before calling a category dominant."
        ],
        "analysis": "Review this response against its own demand: Compare services and manufacturing with the narrowing gap intact. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will distinguish a smaller difference from a rank reversal; a weaker one only names the topic or repeats a judgement. For your revision, calculate both endpoints before calling a category dominant. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band2-writing-bar-pie-stage-1",
        "source": "Separate guided table: employment shares, 2000 and 2010. Services: 20%, 30%; manufacturing: 50%, 40%; other: 30%, 30%.",
        "compatibleWithSignature": "v1-1e9ce68a"
      },
      {
        "kind": "writing",
        "title": "Independent pie-chart report",
        "instructions": "Summarise the two pie charts, selecting the main features and making relevant comparisons. Write at least 150 words.",
        "model": "The pie charts show how household electricity use was divided among four categories in 2015 and 2025.\n\nOverall, appliances replaced heating as the largest category. The proportions used for heating and lighting fell, while appliances and other uses both gained share. The charts do not show whether total electricity consumption increased or decreased.\n\nIn 2015, heating accounted for 40% of electricity use, making it the largest category. Appliances followed at 30%, while lighting represented 20% and other uses the remaining 10%. Together, heating and appliances therefore made up 70% of the total.\n\nBy 2025, the appliance share had risen by ten percentage points to 40%. Heating had fallen by the same amount to 30%, so the combined proportion of these two categories remained unchanged. Lighting’s share halved to 10%, whereas other uses doubled to 20%. Although these changes altered the distribution, the absence of total consumption figures means that a smaller percentage cannot automatically be interpreted as a smaller amount of electricity.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I report the two pie charts’ main distributions and comparisons.",
          "Development: I keep each whole or population visible when comparing shares.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check percentage points separately from relative percentage change."
        ],
        "analysis": "Review this response against its own demand: Report the two pie charts’ main distributions and comparisons. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will keep each whole or population visible when comparing shares; a weaker one only names the topic or repeats a judgement. For your revision, check percentage points separately from relative percentage change. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/energy-pie.svg",
          "alt": "Pie charts of household electricity use: 2015 heating 40%, appliances 30%, lighting 20%, other 10%; 2025 heating 30%, appliances 40%, lighting 10%, other 20%.",
          "description": "Original fictional data. Shares sum to 100% in each year; total electricity consumption is not supplied."
        },
        "id": "band2-writing-bar-pie-stage-2",
        "compatibleWithSignature": "v1-7d78d92a"
      },
      {
        "kind": "writing",
        "title": "Assessment table report",
        "instructions": "Summarise the table, with an overview and supporting comparisons. Write at least 150 words.",
        "model": "The table compares the distribution of employed adults across manufacturing, services and agriculture in Eastford in 2010 and 2025.\n\nOverall, services became the largest employment sector, replacing manufacturing. Agriculture maintained the same share, while the increase in services matched the decline in manufacturing in percentage-point terms.\n\nIn 2010, manufacturing employed 45% of working adults, ten percentage points more than services at 35%. Agriculture accounted for the remaining 20%, making it the smallest sector. Manufacturing and services together represented four-fifths of employment.\n\nBy 2025, the manufacturing share had fallen to 30%, a decline of 15 percentage points. Services rose by the same amount to reach 50%, meaning that half of employed adults worked in this sector. Its lead over manufacturing was now 20 points. Agriculture remained at 20%, so it continued to have the smallest share. The table gives percentages rather than numbers of workers. It therefore does not establish whether employment in any sector rose or fell in absolute terms.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I give an overview and grouped comparisons from the new table.",
          "Development: I separate highest share from majority and headcount.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I recalculate every combined share using the correct denominator."
        ],
        "analysis": "Review this response against its own demand: Give an overview and grouped comparisons from the new table. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will separate highest share from majority and headcount; a weaker one only names the topic or repeats a judgement. For your revision, recalculate every combined share using the correct denominator. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/employment-table.svg",
          "alt": "Table: employed adults by sector in Eastford. Manufacturing: 2010 45%, 2025 30%; services 35%, 50%; agriculture 20%, 20%.",
          "description": "Original fictional data. Shares of employed adults; total employment counts are unknown."
        },
        "id": "band2-writing-bar-pie-stage-3",
        "compatibleWithSignature": "v1-3f1906fe"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-letter",
  "lessonId": "band2-writing-letter",
  "type": "course-activity",
  "prompt": "Writing Task 1: Maps and Processes — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Task 1: Maps and Processes",
    "learn": "Map reports describe spatial changes using a consistent frame of reference. Separate additions, removals, replacements and unchanged features. Process reports describe sequence, inputs, outputs and branches. Passive forms are useful when the agent is unknown, but they are not compulsory in every sentence. Do not invent stages, dimensions or causes.",
    "worked": {
      "example": "The car park was replaced by a garden; the fountain remained in the centre.",
      "reasoning": "The first clause reports a replacement, while the second distinguishes an unchanged feature."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided map overview",
        "instructions": "Write 50–80 words describing the changes in these separate map notes. Distinguish a replacement, an addition and an unchanged feature.",
        "model": "The area gained a clinic and a footpath between 2005 and 2020. The clinic replaced the post office on the western side of the lake, while a new path was added to the east. The lake itself remained unchanged. The notes show changes in land use and access, but they do not give the dimensions of the new facilities or explain why the alterations occurred.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I describe replacement, addition and continuity in the map notes.",
          "Development: I keep what replaced what and where it happened clear.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair a reversed passive replacement before polishing style."
        ],
        "analysis": "Review this response against its own demand: Describe replacement, addition and continuity in the map notes. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will keep what replaced what and where it happened clear; a weaker one only names the topic or repeats a judgement. For your revision, repair a reversed passive replacement before polishing style. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band2-writing-letter-stage-1",
        "source": "Separate guided map notes: in 2005 a post office stood west of a lake. In 2020 it had become a clinic. A footpath was added on the east side. The lake was unchanged.",
        "compatibleWithSignature": "v1-985e9810"
      },
      {
        "kind": "writing",
        "title": "Independent map report",
        "instructions": "Summarise the maps, selecting main features and comparing the two years. Write at least 150 words.",
        "model": "The maps show changes to a town square between 2010 and 2025.\n\nOverall, the square gained a garden, a library and a café, while the central fountain and the road along the southern boundary remained in place. The main changes occurred around the edges rather than in the centre.\n\nIn 2010, a car park occupied the western side of the square. By 2025, this had been replaced by a garden. To the north, the area shown as lawn in the earlier map had become a library. These two changes removed the original parking and open grass areas from those locations.\n\nOn the eastern side, shops were present in both years, but a café had been added by 2025. The maps do not indicate the size of each business or whether the existing shops changed use. The fountain continued to occupy the centre, and access from the road on the south remained. No further changes to the surrounding street network are shown.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I summarise map changes and important unchanged features.",
          "Development: I group changes spatially while maintaining the correct dates.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check every location and avoid unshown purposes or benefits."
        ],
        "analysis": "Review this response against its own demand: Summarise map changes and important unchanged features. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will group changes spatially while maintaining the correct dates; a weaker one only names the topic or repeats a judgement. For your revision, check every location and avoid unshown purposes or benefits. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/town-map.svg",
          "alt": "Two maps of a town square in 2010 and 2025. North is up. Road on south remains. In 2010: west car park, centre fountain, east shops, north lawn. In 2025: west garden, centre fountain, east café and shops, north library.",
          "description": "Original schematic maps, not to scale. Describe only labelled changes; no explanation of causes is supplied."
        },
        "id": "band2-writing-letter-stage-2",
        "compatibleWithSignature": "v1-de07ba46"
      },
      {
        "kind": "writing",
        "title": "Assessment: process report",
        "instructions": "Describe the process, including its overall sequence and the rejection branch. Write at least 150 words.",
        "model": "The diagram illustrates how used paper is processed into new paper.\n\nOverall, the process consists of a sequence beginning with collection and ending with finished paper being rolled. Unsuitable material is removed during sorting, while the accepted paper continues through several treatment and drying stages.\n\nFirst, used paper is collected and taken to be sorted. At this point, rejected material leaves the main process. The paper that is retained is then mixed with water. This mixture passes through a filtering stage before it is pressed.\n\nAfter pressing, the material is dried. The dried paper is finally formed into rolls, which are the output shown at the end of the diagram. All the main stages proceed in one direction, and the diagram does not show any material returning to an earlier step. It also provides no information about the time required, the temperature used for drying or the quantity of paper produced. These details therefore cannot be included as factual parts of the description.",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I report the sequence and the rejection branch.",
          "Development: I trace what happens to the material at each displayed arrow.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I restore an omitted branch or remove an invented stage."
        ],
        "analysis": "Review this response against its own demand: Report the sequence and the rejection branch. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will trace what happens to the material at each displayed arrow; a weaker one only names the topic or repeats a judgement. For your revision, restore an omitted branch or remove an invented stage. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "visual": {
          "src": "/media/courses/paper-process.svg",
          "alt": "Process diagram: used paper is collected, sorted, mixed with water, filtered, pressed, dried, then rolled into new paper. Rejected material leaves the sorting stage.",
          "description": "Original linear process. Arrows show order; there is one rejection branch and no stated times or temperatures."
        },
        "id": "band2-writing-letter-stage-3",
        "compatibleWithSignature": "v1-6ee1c203"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-opinion",
  "lessonId": "band2-writing-opinion",
  "type": "course-activity",
  "prompt": "Writing Task 2: Opinion and Discussion Essays — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Task 2: Opinion and Discussion Essays",
    "learn": "Task 2 requires at least 250 words and contributes twice as much as Task 1 to the Writing result. Identify exactly what the question asks: opinion, both views, causes and solutions, advantages and disadvantages, or two separate questions. Develop a position with reasons and relevant examples. Avoid invented statistics and claims about universal effects. A strong paragraph explains how or why its central claim works.",
    "worked": {
      "example": "A transport charge can reduce some car journeys, but its fairness depends on the availability of alternatives.",
      "reasoning": "The condition qualifies the claim and opens a relevant explanation rather than adding complexity for display."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided argument paragraph",
        "instructions": "Write 60–90 words explaining one benefit of providing public computers in libraries. Include a mechanism and one limitation.",
        "model": "Public computers can help people complete tasks that have moved online, such as applying for a job. The benefit is greatest when staff can explain unfamiliar steps rather than simply point to a screen. However, a few shared devices may be insufficient at busy times. A booking system and brief support sessions could make access more predictable without requiring a large new building.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain a public-computer benefit with a mechanism and limit.",
          "Development: I show how access helps a particular library user.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the limit specific rather than add a generic disadvantage."
        ],
        "analysis": "Review this response against its own demand: Explain a public-computer benefit with a mechanism and limit. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will show how access helps a particular library user; a weaker one only names the topic or repeats a judgement. For your revision, make the limit specific rather than add a generic disadvantage. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band2-writing-opinion-stage-1",
        "compatibleWithSignature": "v1-664b0441"
      },
      {
        "kind": "writing",
        "title": "Independent full Task 2",
        "instructions": "Some people think public libraries should focus only on printed books. Others believe they should also provide digital services. Discuss both views and give your own opinion. Write at least 250 words.",
        "model": "Public libraries are sometimes judged mainly by how many printed books they lend. In my view, they should continue to provide books while also offering practical access to digital services. The purpose is to help people obtain and use information, and that purpose does not depend on one medium.\n\nPrinted books remain valuable because they can be read without a device or internet connection. A local collection also gives readers access to material they may not be able to buy. For children, choosing books with a knowledgeable librarian can make reading less intimidating and encourage interests that an online recommendation system might not reveal.\n\nAt the same time, digital support meets a different need. Applications for work, housing and public services often require online forms. Providing computers without guidance may be insufficient for someone who has little experience using them. A short appointment with trained staff can help users complete a task independently rather than leaving them dependent on relatives.\n\nThere is a reasonable concern about resources. Staff time and equipment are limited, so every new service has an opportunity cost. Libraries should therefore consult users and review demand instead of adding technology simply because it appears modern. Partnerships with local organisations may also provide specialist training without requiring librarians to solve every technical problem.\n\nOverall, books and digital support serve related educational and social purposes. A balanced library should preserve a useful collection while responding to genuine barriers to information. Its success should be assessed through the quality and accessibility of those services, rather than through a single measure such as book loans or computer numbers.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I discuss print-only and digital-service views and state my opinion.",
          "Development: I give each view a fair reason and maintain the resulting judgement.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair an omitted view before expanding examples."
        ],
        "analysis": "Review this response against its own demand: Discuss print-only and digital-service views and state my opinion. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give each view a fair reason and maintain the resulting judgement; a weaker one only names the topic or repeats a judgement. For your revision, repair an omitted view before expanding examples. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-opinion-stage-2",
        "compatibleWithSignature": "v1-4d854a7d"
      },
      {
        "kind": "writing",
        "title": "Assessment: opinion essay",
        "instructions": "Some people believe that public spaces should be designed mainly for organised events. To what extent do you agree or disagree? Write at least 250 words.",
        "model": "Public spaces can support organised events, but I disagree that this should be their main purpose. Their greatest value is often that people can use them freely in ordinary life, including when no programme has been arranged.\n\nEvents can bring people together and give local businesses opportunities. A concert or market may introduce residents to activities they would not otherwise encounter. However, a space designed primarily for large gatherings may offer little comfort on a quiet weekday. Broad paved areas can accommodate crowds while leaving few places to sit in shade or talk without interruption.\n\nEveryday access serves a wider range of needs. A parent may need somewhere to pause with a child, an older person may value a short walk with regular seating, and a worker may simply want to eat lunch outdoors. These uses do not produce impressive attendance figures, but they contribute to the quality of daily life. They also require attention to practical details such as accessible paths, maintenance and toilets.\n\nA flexible design can support both purposes. Movable furniture and a modest open area may allow occasional events without removing gardens or quiet corners. Organisers should also consider noise and the periods when public access is restricted. A popular festival does not justify making the space unavailable to residents for much of the year.\n\nIn conclusion, organised activities are a useful part of a public space’s role, but they should complement rather than dominate everyday use. Design should begin with the varied needs of ordinary users and accommodate events where they fit. This would make the space valuable beyond the moments when it attracts a large crowd.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I answer the extent-of-agreement demand about organised events.",
          "Development: I weigh event use against other public-space purposes.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the conclusion follow the position rather than add a new view."
        ],
        "analysis": "Review this response against its own demand: Answer the extent-of-agreement demand about organised events. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will weigh event use against other public-space purposes; a weaker one only names the topic or repeats a judgement. For your revision, make the conclusion follow the position rather than add a new view. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-opinion-stage-3",
        "compatibleWithSignature": "v1-940e1341"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-problem-solution",
  "lessonId": "band2-writing-problem-solution",
  "type": "course-activity",
  "prompt": "Writing Task 2: Problems, Trade-offs and Two-Part Questions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Task 2: Problems, Trade-offs and Two-Part Questions",
    "learn": "Task 2 requires at least 250 words and contributes twice as much as Task 1 to the Writing result. Identify exactly what the question asks: opinion, both views, causes and solutions, advantages and disadvantages, or two separate questions. Develop a position with reasons and relevant examples. Avoid invented statistics and claims about universal effects. A strong paragraph explains how or why its central claim works.",
    "worked": {
      "example": "A transport charge can reduce some car journeys, but its fairness depends on the availability of alternatives.",
      "reasoning": "The condition qualifies the claim and opens a relevant explanation rather than adding complexity for display."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided argument paragraph",
        "instructions": "Write 60–90 words explaining a cause of poor access to evening activities and one practical response. Include a condition for the response to work.",
        "model": "People may miss evening activities because public transport stops before the event ends. Simply advertising the programme more widely would not remove that barrier. Organisers could finish earlier or coordinate a shared return journey, provided the arrangement is reliable and accessible. They should ask potential users which times are practical before changing the schedule. The response would then address a specific cause of non-attendance rather than assume that people lack interest.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I link an evening-access cause to a practical response and condition.",
          "Development: I explain why the response reaches the diagnosed barrier.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace a measure that addresses a different problem."
        ],
        "analysis": "Review this response against its own demand: Link an evening-access cause to a practical response and condition. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain why the response reaches the diagnosed barrier; a weaker one only names the topic or repeats a judgement. For your revision, replace a measure that addresses a different problem. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band2-writing-problem-solution-stage-1",
        "compatibleWithSignature": "v1-11d3d53c"
      },
      {
        "kind": "writing",
        "title": "Independent full Task 2",
        "instructions": "Traffic congestion is increasing in many cities. What are the main causes, and what measures could address them? Write at least 250 words.",
        "model": "Many cities face increasing traffic congestion, and it is tempting to seek one simple solution. In my view, improving public transport and managing road demand need to work together. Either approach alone may shift the problem rather than solve it.\n\nA major cause of congestion is that many journeys are difficult to make without a car. Housing and employment may be separated by long distances, while bus routes fail to connect the places people actually need to reach. A person cannot reasonably be expected to abandon driving if the alternative involves an unreliable service and several changes. More frequent routes and clear connections can therefore make shared transport a realistic choice.\n\nHowever, additional buses will not automatically reduce traffic if driving remains the easiest option for every trip. Cities may need to limit parking in crowded areas or charge for scarce road space. Such measures can discourage unnecessary car journeys, but they must be introduced carefully. Workers travelling at unusual hours and people with mobility needs may have fewer alternatives than office commuters.\n\nAn effective policy would combine better services with targeted demand management. Revenue from parking charges, for example, could help fund routes serving areas that currently have poor access. Authorities should also publish evidence about reliability, journey times and the distribution of costs. This would allow residents to judge whether the policy is meeting its stated goals.\n\nIn conclusion, congestion reflects both transport provision and the incentives affecting individual choices. Coordinated improvements offer a stronger response than expecting one new road or one charge to transform travel. The aim should be accessible movement, with fair options for people whose needs differ.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I develop congestion causes and matching measures.",
          "Development: I connect each measure to a mechanism instead of list policies.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I add a feasibility condition where it affects the recommendation."
        ],
        "analysis": "Review this response against its own demand: Develop congestion causes and matching measures. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect each measure to a mechanism instead of list policies; a weaker one only names the topic or repeats a judgement. For your revision, add a feasibility condition where it affects the recommendation. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-problem-solution-stage-2",
        "compatibleWithSignature": "v1-f95c8e1b"
      },
      {
        "kind": "writing",
        "title": "Assessment: full two-part essay",
        "instructions": "Why might residents hesitate to use a new public service, and what can organisers do to encourage appropriate participation? Answer both questions. Write at least 250 words.",
        "model": "A new public service can attract fewer users than its organisers expect, even when it addresses a real need. Hesitation may arise from practical barriers, unclear information or uncertainty about whether the service is intended for a particular person. Encouraging participation therefore requires more than wider advertising.\n\nOne reason is that potential users cannot easily judge what will happen when they attend. A notice may name an advice session without explaining whether appointments are needed, what documents to bring or whether there is a charge. People who have had a discouraging experience elsewhere may be especially reluctant to risk an unnecessary journey. Others may understand the offer but be unable to attend at the advertised time.\n\nOrganisers should first investigate these different barriers. Speaking only to current users may produce a positive picture while missing the people who never arrive. Short conversations with non-users, conducted through trusted local groups, can reveal whether the main difficulty is information, access or the service itself. The questions should invite criticism rather than assume that reluctance reflects a lack of interest.\n\nThe response can then be specific. Clear examples of who the service can help, practical booking instructions and a low-commitment introductory session may reduce uncertainty. Different opening times or an accessible alternative may address physical and scheduling barriers. However, encouraging everyone to attend regardless of need could overload the service, so communication should also explain its limits and direct people elsewhere when appropriate.\n\nOverall, hesitation is often understandable rather than irrational. Organisers can encourage suitable participation by explaining the complete experience, consulting missing voices and changing practical arrangements where evidence shows a barrier. Success should mean useful access for the intended users, not simply a larger attendance total.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I answer both hesitation and encouragement questions.",
          "Development: I match a specific participation barrier to a targeted response.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair the unanswered demand before checking sentence variety."
        ],
        "analysis": "Review this response against its own demand: Answer both hesitation and encouragement questions. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will match a specific participation barrier to a targeted response; a weaker one only names the topic or repeats a judgement. For your revision, repair the unanswered demand before checking sentence variety. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-problem-solution-stage-3",
        "compatibleWithSignature": "v1-2a92cbf"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-writing-cohesion",
  "lessonId": "band2-writing-cohesion",
  "type": "course-activity",
  "prompt": "Writing: Assessment Criteria, Coherence and Cohesion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing: Assessment Criteria, Coherence and Cohesion",
    "learn": "Coherence concerns the progression of ideas; cohesion concerns the language connecting them. Linking words cannot repair a missing reason. Use clear topic development, reference words with unambiguous antecedents and connectors that express the actual relationship. Repetition can be useful when it prevents ambiguity.",
    "worked": {
      "example": "An online appointment system may reduce queues. However, people without internet access still need another way to book.",
      "reasoning": "However signals a real limitation; it is not a decorative synonym for also."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Coherence and purposeful paragraphing",
        "instructions": "Explain how a college can introduce online appointments without excluding users. Write one coherent paragraph with a clear contrast.",
        "model": "An online appointment system can reduce unnecessary waiting by allowing students to choose a time before travelling. However, students without reliable internet access still need a way to book. A telephone option and a staffed desk would preserve access while the college introduces the new system. These alternatives should use the same timetable so that appointments are not accidentally duplicated. The change would then improve convenience without assuming that every user has the same resources.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain online appointment access with a clear inclusion contrast.",
          "Development: I make the benefit and excluded group logically connected.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I name an unclear referent rather than add another connector."
        ],
        "analysis": "Review this response against its own demand: Explain online appointment access with a clear inclusion contrast. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the benefit and excluded group logically connected; a weaker one only names the topic or repeats a judgement. For your revision, name an unclear referent rather than add another connector. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-cohesion-stage-1",
        "compatibleWithSignature": "v1-63bcbf81"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Coherence and purposeful paragraphing",
        "instructions": "Argue for or against replacing a paper newsletter with an online version. Develop a paragraph with clear references and a justified qualification.",
        "model": "An online newsletter would make urgent corrections easier to publish and could reduce printing costs. Those advantages do not mean that a paper version has no value. Some residents may not check the website regularly, particularly if they do not use digital services for other purposes. The organisation could publish online first while providing a small number of printed copies at meeting places. This approach would preserve access and allow actual demand, rather than assumptions about age or ability, to guide future provision.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I take a position on replacing the paper newsletter.",
          "Development: I develop the chosen benefit while retaining a justified limit.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove a connector whose relationship the sentences do not support."
        ],
        "analysis": "Review this response against its own demand: Take a position on replacing the paper newsletter. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will develop the chosen benefit while retaining a justified limit; a weaker one only names the topic or repeats a judgement. For your revision, remove a connector whose relationship the sentences do not support. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-cohesion-stage-2",
        "compatibleWithSignature": "v1-22d51fef"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Coherence and purposeful paragraphing",
        "instructions": "Explain why a community project should consult non-participants as well as current users. Use logical links without an excessive list of connectors.",
        "model": "Current users can explain what they value in a project, but they cannot fully represent people who never attend. Non-participants may face barriers that regular users no longer notice, such as an unsuitable timetable or unclear booking instructions. Asking both groups would therefore produce a more useful picture of demand. The findings should be reported separately before being combined, since a high satisfaction rating among existing members does not establish that the service is accessible to everyone.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain why non-participants should be consulted.",
          "Development: I show what their evidence adds beyond current-user satisfaction.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make each sentence advance the same controlling point."
        ],
        "analysis": "Review this response against its own demand: Explain why non-participants should be consulted. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will show what their evidence adds beyond current-user satisfaction; a weaker one only names the topic or repeats a judgement. For your revision, make each sentence advance the same controlling point. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-writing-cohesion-stage-3",
        "compatibleWithSignature": "v1-d0cd1d15"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-grammar-tenses",
  "lessonId": "band2-grammar-tenses",
  "type": "course-activity",
  "prompt": "Grammar for Writing: Time Reference and Accurate Tenses — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Grammar for Writing: Time Reference and Accurate Tenses",
    "learn": "Select tense from the time reference and meaning. A finished date normally calls for past forms; a prediction is not an observed result. The present perfect can connect earlier developments to now when no finished past date controls the clause. Do not force a single tense across a report that compares different periods.",
    "worked": {
      "example": "In 2020 the rate was 12%; it is projected to reach 18% by 2030.",
      "reasoning": "Was reports an observed past value; is projected separates a forecast from a fact."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Accurate time reference in academic reporting",
        "instructions": "Write a report paragraph: library visits were 120 weekly in 2018, 150 in 2023 and are projected to reach 180 in 2028. Distinguish observations from forecasts.",
        "model": "Weekly library visits rose from 120 in 2018 to 150 in 2023, an observed increase of 30. The figure is projected to reach 180 by 2028, which would represent a further rise of the same size. This final value is a forecast rather than a recorded outcome. Although the pattern suggests continued growth, the figures do not explain its causes or establish that the projection will be achieved. A report should therefore distinguish the two measured points from the expected future total.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I separate the two observed library values from the projection.",
          "Development: I use time and forecast labels to preserve evidence status.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove a sentence treating the future value as an observation."
        ],
        "analysis": "Review this response against its own demand: Separate the two observed library values from the projection. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use time and forecast labels to preserve evidence status; a weaker one only names the topic or repeats a judgement. For your revision, remove a sentence treating the future value as an observation. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-tenses-stage-1",
        "compatibleWithSignature": "v1-1e251b82"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Accurate time reference in academic reporting",
        "instructions": "Write about this research timeline: recruitment began in March 2024; data collection ended in September 2024; analysis continues now. Do not invent findings.",
        "model": "Recruitment for the study began in March 2024, and data collection ended in September of the same year. The researchers have now moved to the analysis stage, which remains in progress. No findings have been released, so the completion of collection should not be described as proof that the study has answered its question. The next report will need to explain both the results and the limits of the method. Until then, conclusions about the intervention’s effectiveness would be premature.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I report recruitment, completed collection and current analysis.",
          "Development: I choose tense from each event’s viewpoint without inventing findings.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I underline unsupported result verbs such as proved."
        ],
        "analysis": "Review this response against its own demand: Report recruitment, completed collection and current analysis. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will choose tense from each event’s viewpoint without inventing findings; a weaker one only names the topic or repeats a judgement. For your revision, underline unsupported result verbs such as proved. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-tenses-stage-2",
        "compatibleWithSignature": "v1-66db0ff0"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Accurate time reference in academic reporting",
        "instructions": "Write a paragraph comparing a past habit with a current situation: a centre opened only on weekdays until 2022; it now also opens Saturdays; Sunday access is only proposed.",
        "model": "Until 2022, the centre opened only on weekdays. It now also provides Saturday access, which gives people with weekday commitments another opportunity to use its facilities. Sunday opening has been proposed, but it has not yet been introduced. These stages should not be combined into a claim that the centre is already available throughout the weekend. Any evaluation of the Saturday change should use actual attendance records, while the Sunday proposal remains a question for future planning.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I distinguish weekday history, current Saturdays and proposed Sunday access.",
          "Development: I keep a proposal separate from an implemented schedule.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I restore the status word if a grammatical edit changes the fact."
        ],
        "analysis": "Review this response against its own demand: Distinguish weekday history, current Saturdays and proposed Sunday access. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will keep a proposal separate from an implemented schedule; a weaker one only names the topic or repeats a judgement. For your revision, restore the status word if a grammatical edit changes the fact. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-tenses-stage-3",
        "compatibleWithSignature": "v1-97a4f31d"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-grammar-complex",
  "lessonId": "band2-grammar-complex",
  "type": "course-activity",
  "prompt": "Grammar for Writing: Clauses, Contrast and Control — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Grammar for Writing: Clauses, Contrast and Control",
    "learn": "Use subordinate clauses to express a relationship such as condition, concession or cause. A longer sentence is not automatically better. Check the subject of each clause and make sure a connector matches the logic. Avoid comma splices between independent clauses.",
    "worked": {
      "example": "Although the survey was small, it revealed a concern worth investigating.",
      "reasoning": "The concession limits the strength of the evidence without denying that the finding may be useful."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Complex clauses that preserve meaning",
        "instructions": "Write a paragraph about a small trial that found greater satisfaction but did not measure long-term outcomes. Use a concession accurately.",
        "model": "Although the trial involved only a small group, participants reported that the new service was easier to use. That finding is useful because it identifies a possible improvement in access. It does not establish a lasting benefit, since the evaluation ended after one month. A longer trial should examine whether the initial satisfaction continues and whether users can complete their tasks without additional help. The limitation narrows the conclusion rather than making the entire exercise worthless.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I accept the satisfaction finding while retaining the long-term limit.",
          "Development: I use concession to connect evidence and its scope.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair an although fragment or duplicated although/but frame."
        ],
        "analysis": "Review this response against its own demand: Accept the satisfaction finding while retaining the long-term limit. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use concession to connect evidence and its scope; a weaker one only names the topic or repeats a judgement. For your revision, repair an although fragment or duplicated although/but frame. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-complex-stage-1",
        "compatibleWithSignature": "v1-d9d35b50"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Complex clauses that preserve meaning",
        "instructions": "Write a paragraph recommending a flexible study space only if quiet work and discussion can coexist. Use a conditional relationship.",
        "model": "A flexible study space would be useful if its different purposes were managed clearly. Students preparing presentations need to talk, whereas others may require silence to read difficult material. Simply placing both groups in one open room could create frustration. The college should therefore test separate zones and explain their purpose before expanding the space. If students still struggle to concentrate, bookable rooms may be a better solution than expecting everyone to adjust to the same noise level. A review should ask both groups whether the arrangement met their different needs rather than assume that one quiet visit proves coexistence.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I make the space recommendation conditional on coexistence.",
          "Development: I explain what would allow discussion and quiet work to coexist.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that the if-clause is a real condition rather than decorative complexity."
        ],
        "analysis": "Review this response against its own demand: Make the space recommendation conditional on coexistence. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain what would allow discussion and quiet work to coexist; a weaker one only names the topic or repeats a judgement. For your revision, check that the if-clause is a real condition rather than decorative complexity. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-complex-stage-2",
        "compatibleWithSignature": "v1-ca366aa9"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Complex clauses that preserve meaning",
        "instructions": "Write a paragraph explaining why longer opening hours may help access while creating staffing pressure. Use a controlled contrast.",
        "model": "Longer opening hours could improve access for people who work during the day, but they would also require additional staff time. The service should not assume that a later closing time is useful on every evening. A trial on two days would show when demand is strongest and whether users complete tasks they previously could not manage. This evidence would allow the organisation to balance convenience with staffing costs rather than treating either benefit or expense as the only consideration.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I show the access benefit and staffing pressure in controlled contrast.",
          "Development: I make the two clauses complete and their relationship clear.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I split an overloaded sentence before adding more subordinate clauses."
        ],
        "analysis": "Review this response against its own demand: Show the access benefit and staffing pressure in controlled contrast. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the two clauses complete and their relationship clear; a weaker one only names the topic or repeats a judgement. For your revision, split an overloaded sentence before adding more subordinate clauses. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-grammar-complex-stage-3",
        "compatibleWithSignature": "v1-ab5306da"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-vocab-collocations",
  "lessonId": "band2-vocab-collocations",
  "type": "course-activity",
  "prompt": "Writing Vocabulary: Precise Comparisons and Collocations — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing Vocabulary: Precise Comparisons and Collocations",
    "learn": "Choose vocabulary that matches the relationship in the data or argument. A marked increase needs evidence of scale; “fluctuate” requires movement in both directions. Use natural collocations such as conduct research, provide evidence and pose a challenge. Avoid replacing every repeated technical term with an inaccurate synonym.",
    "worked": {
      "example": "A rose from 20 to 30 while B stayed at 40 → A increased, but B remained higher.",
      "reasoning": "An increase does not necessarily imply the highest final value."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Precise comparisons and collocations",
        "instructions": "Compare scheme A, which rose from 20 to 30 users, with scheme B, which stayed at 40. Do not call A the most popular.",
        "model": "Scheme A increased from 20 to 30 users, gaining ten over the period. Scheme B remained unchanged at 40, so it still attracted more users at the end. The difference between the schemes narrowed from 20 users to ten, but their ranking did not reverse. These figures describe participation rather than satisfaction or effectiveness. It would therefore be inaccurate to call the growing scheme more successful without explaining which outcome is being evaluated.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I report A’s growth without taking B’s higher rank away.",
          "Development: I separate amount of change from final popularity.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that faster growth is not renamed most popular."
        ],
        "analysis": "Review this response against its own demand: Report A’s growth without taking B’s higher rank away. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will separate amount of change from final popularity; a weaker one only names the topic or repeats a judgement. For your revision, check that faster growth is not renamed most popular. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-collocations-stage-1",
        "compatibleWithSignature": "v1-3a450a8d"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Precise comparisons and collocations",
        "instructions": "Explain a research comparison: one method is faster but less precise; another is slower but more precise. Recommend a choice conditional on purpose.",
        "model": "The faster method may be suitable when researchers need a broad initial picture, but its lower precision limits the detail it can support. The slower method is preferable when small differences matter to the research question. Neither approach is best in every situation. A project with limited time could use the rapid method to identify areas for further investigation, then apply the more precise procedure selectively. The recommendation depends on the evidence needed, not simply on which method produces more results.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I compare speed and precision and recommend by purpose.",
          "Development: I explain which requirement makes each method suitable.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace a universal best-method claim with a justified condition."
        ],
        "analysis": "Review this response against its own demand: Compare speed and precision and recommend by purpose. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain which requirement makes each method suitable; a weaker one only names the topic or repeats a judgement. For your revision, replace a universal best-method claim with a justified condition. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-collocations-stage-2",
        "compatibleWithSignature": "v1-9e0fc06f"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Precise comparisons and collocations",
        "instructions": "Describe values of 12, 18, 16 and 22 across four successive years. Distinguish overall growth from continuous growth.",
        "model": "The value rose overall from 12 to 22 across the four years, but the increase was not continuous. After reaching 18 in the second year, it fell to 16 before recovering to the highest point of 22. The final value was ten above the starting level. Describing the series as a steady rise would conceal the intermediate decline. The data establish the direction and size of the changes but provide no evidence about the forces that caused them.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I describe the four values with overall rise and intervening fall.",
          "Development: I calculate the net change and retain the interruption.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove continuously or doubled where the numbers contradict it."
        ],
        "analysis": "Review this response against its own demand: Describe the four values with overall rise and intervening fall. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will calculate the net change and retain the interruption; a weaker one only names the topic or repeats a judgement. For your revision, remove continuously or doubled where the numbers contradict it. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-collocations-stage-3",
        "compatibleWithSignature": "v1-40559d64"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-vocab-technology",
  "lessonId": "band2-vocab-technology",
  "type": "course-activity",
  "prompt": "Writing: Two-Part Questions and Technology Arguments — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Writing: Two-Part Questions and Technology Arguments",
    "learn": "Answer both questions explicitly and develop each through a mechanism or example. Benefits and disadvantages should not become lists of fashionable claims. Distinguish what a tool can do from what users actually do with it. A balanced argument may still have a clear position.",
    "worked": {
      "example": "Online access saves travel only when the task can genuinely be completed remotely.",
      "reasoning": "The condition prevents a broad technological claim from ignoring a practical barrier."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Two-part questions and technology arguments",
        "instructions": "Explain one reason people adopt online services and one condition needed for successful use.",
        "model": "People may adopt an online service because it allows them to complete a task without travelling during working hours. This convenience is real only if the process can be finished remotely. If users must still print a form and visit an office, the website may add another step rather than remove a barrier. Clear instructions and a reliable way to obtain help are therefore important. The value of the tool depends on the complete user journey, not simply on its availability.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain one adoption mechanism and one enabling condition.",
          "Development: I link the online benefit to a specific user action.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace a general modern-is-better claim with how it works."
        ],
        "analysis": "Review this response against its own demand: Explain one adoption mechanism and one enabling condition. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will link the online benefit to a specific user action; a weaker one only names the topic or repeats a judgement. For your revision, replace a general modern-is-better claim with how it works. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-technology-stage-1",
        "compatibleWithSignature": "v1-ee4284bf"
      },
      {
        "kind": "writing",
        "title": "Independent full advantages/disadvantages essay",
        "instructions": "Technology increasingly allows people to work from home. Do the advantages of this development outweigh the disadvantages? Write at least 250 words.",
        "model": "Technology has made home working possible for many occupations, and I believe its advantages can outweigh its disadvantages when organisations manage it carefully. The benefit is flexibility rather than the assumption that every job should become remote.\n\nA major advantage is the reduction in unnecessary travel. Workers can use time previously spent commuting for rest, family responsibilities or focused work. Employers may also recruit people who live farther away or have difficulty attending an office every day. These gains can widen access to employment, provided the role can genuinely be performed remotely and the worker has suitable equipment.\n\nThe disadvantages concern both working conditions and communication. A home may lack a quiet space, and the boundary between work and personal time can become unclear. Employees may feel expected to answer messages throughout the evening. Informal learning is also harder when beginners cannot easily observe experienced colleagues or ask a brief question. These problems would make unrestricted remote working unsuitable as a universal rule.\n\nHowever, they can be reduced through clear arrangements. Employers should define availability, provide appropriate support and create deliberate opportunities for collaboration. Some teams may benefit from a hybrid pattern, while others can work remotely with scheduled contact. The decision should reflect the task and the employee’s circumstances rather than a desire to treat every worker identically.\n\nIn conclusion, technology-enabled home working offers substantial advantages in time and access, but those benefits depend on reasonable boundaries and effective communication. I therefore favour it as a supported option rather than a compulsory replacement for workplaces. Under those conditions, the flexibility it creates is likely to be more valuable than the difficulties it introduces.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I judge whether remote-work benefits outweigh disadvantages.",
          "Development: I weigh effects for a defined context instead of list equal sides.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the conclusion state which effects carry more weight and why."
        ],
        "analysis": "Review this response against its own demand: Judge whether remote-work benefits outweigh disadvantages. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will weigh effects for a defined context instead of list equal sides; a weaker one only names the topic or repeats a judgement. For your revision, make the conclusion state which effects carry more weight and why. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-technology-stage-2",
        "compatibleWithSignature": "v1-6f13444a"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Two-part questions and technology arguments",
        "instructions": "Explain whether digital reminders can improve attendance, and identify one reason their effect might be limited.",
        "model": "Digital reminders can reduce missed appointments when people simply forget the date or location. A message containing the practical details may help them plan their journey and arrive on time. However, a reminder cannot remove every cause of absence. Someone who cannot afford transport or obtain time off work still faces the original barrier. An evaluation should therefore distinguish forgetting from other reasons for non-attendance before concluding that more messages will solve the problem.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain a possible reminder effect and a limiting reason.",
          "Development: I show why a message may help yet fail to remove another barrier.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I retain may rather than guarantee attendance from a reminder."
        ],
        "analysis": "Review this response against its own demand: Explain a possible reminder effect and a limiting reason. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will show why a message may help yet fail to remove another barrier; a weaker one only names the topic or repeats a judgement. For your revision, retain may rather than guarantee attendance from a reminder. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-vocab-technology-stage-3",
        "compatibleWithSignature": "v1-76577dc5"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-mistakes-prepositions",
  "lessonId": "band2-mistakes-prepositions",
  "type": "course-activity",
  "prompt": "Grammar and Editing: Prepositions, Rates and Evidence — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Grammar and Editing: Prepositions, Rates and Evidence",
    "learn": "Prepositions express relationships: increase by gives a change, increase to gives an endpoint, and rise from introduces a starting point. Be careful when reporting rates, denominators and dates. Edit for meaning before polishing style; a fluent sentence with the wrong relationship misreports the evidence.",
    "worked": {
      "example": "The rate rose from 5% to 8%, an increase of three percentage points.",
      "reasoning": "From and to identify endpoints. By describes the difference, not the final value."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Prepositions, rates and evidence",
        "instructions": "Report a rate changing from 5% to 8%. Include an accurate comparison and explain what cannot be inferred without population totals.",
        "model": "The rate increased from 5% to 8%, a rise of three percentage points. This describes the proportion affected, not necessarily the number of people. If the underlying population changed, the absolute count might follow a different pattern. The figures therefore support a statement about the rate but do not establish how many additional individuals were involved. They also provide no explanation for the change. A careful report should preserve these distinctions rather than replacing the percentages with an unsupported claim about total cases.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I report the rate difference and missing population evidence.",
          "Development: I distinguish percentage points, relative change and headcount.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I show the baseline used in each calculation."
        ],
        "analysis": "Review this response against its own demand: Report the rate difference and missing population evidence. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will distinguish percentage points, relative change and headcount; a weaker one only names the topic or repeats a judgement. For your revision, show the baseline used in each calculation. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-prepositions-stage-1",
        "compatibleWithSignature": "v1-d1c972b2"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Prepositions, rates and evidence",
        "instructions": "Report a unit cost falling from 120 currency units per item to 90 currency units per item. The quantity purchased remains unknown. Distinguish the amount of change from the endpoint and explain what cannot be inferred about total spending.",
        "model": "The unit cost fell by 30 currency units per item, from 120 to 90. The final amount was therefore three-quarters of the initial value, representing a reduction of 25%. This does not show whether total spending fell by the same proportion, because the volume purchased is not supplied. A buyer ordering more items could spend more overall despite a lower unit cost. The report should state the measured change clearly and avoid treating an unreported quantity as if it were constant. Knowing the number of items purchased would allow the two unit prices to be converted into comparable total-spending figures.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I report unit-price change and endpoint with quantity unknown.",
          "Development: I explain why total spending cannot follow from price alone.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep per-item units visible throughout the comparison."
        ],
        "analysis": "Review this response against its own demand: Report unit-price change and endpoint with quantity unknown. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain why total spending cannot follow from price alone; a weaker one only names the topic or repeats a judgement. For your revision, keep per-item units visible throughout the comparison. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-prepositions-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Prepositions, rates and evidence",
        "instructions": "Explain a study in which participation rose from 40 to 55 people after a timetable change, without claiming proven causation.",
        "model": "Participation rose from 40 to 55 people after the timetable changed, an increase of 15. The sequence is consistent with the possibility that the new time was more convenient, but it does not prove that the timetable caused the entire rise. Promotion, seasonal demand or other changes may also have influenced attendance. Comparing several periods and asking participants why they joined would provide more useful evidence. The initial finding is promising, but the causal explanation remains uncertain.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I report the 40-to-55 observation without proven causation.",
          "Development: I separate after-the-change sequence from causal explanation.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace caused with an evidence-appropriate relationship."
        ],
        "analysis": "Review this response against its own demand: Report the 40-to-55 observation without proven causation. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will separate after-the-change sequence from causal explanation; a weaker one only names the topic or repeats a judgement. For your revision, replace caused with an evidence-appropriate relationship. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-prepositions-stage-3",
        "compatibleWithSignature": "v1-70e2e563"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-mistakes-countable",
  "lessonId": "band2-mistakes-countable",
  "type": "course-activity",
  "prompt": "Grammar and Vocabulary: Countability in Academic Reporting — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Grammar and Vocabulary: Countability in Academic Reporting",
    "learn": "Information, advice, equipment, research and evidence are usually uncountable in their general academic meanings. Use a piece of information or an item of equipment when a count is needed. “Data” can take different agreement patterns by style and discipline; follow a consistent convention rather than marking all alternatives wrong. Countability choices should preserve the intended unit.",
    "worked": {
      "example": "We bought three items of equipment, not “three equipments”.",
      "reasoning": "The count belongs to items; equipment names the category."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided paragraph: Countability and accurate academic vocabulary",
        "instructions": "Describe a laboratory receiving three items of equipment and new safety advice. Use countable and uncountable nouns accurately.",
        "model": "The laboratory received three items of equipment and new advice on safe storage. Each item was checked before use, and staff recorded the information in a shared register. The guidance explains which materials require special handling, but it does not replace practical training. A short demonstration will therefore accompany the written instructions. This approach distinguishes the number of physical items from the uncountable information and advice needed to use them responsibly.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I describe three equipment items and safety advice accurately.",
          "Development: I use the unit head to control quantity and agreement.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check equipment and advice as ordinary uncountable nouns."
        ],
        "analysis": "Review this response against its own demand: Describe three equipment items and safety advice accurately. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use the unit head to control quantity and agreement; a weaker one only names the topic or repeats a judgement. For your revision, check equipment and advice as ordinary uncountable nouns. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-countable-stage-1",
        "compatibleWithSignature": "v1-9ffd736c"
      },
      {
        "kind": "writing",
        "title": "Independent paragraph: Countability and accurate academic vocabulary",
        "instructions": "Write a paragraph explaining why more information does not always mean stronger evidence. Use research, evidence and information naturally.",
        "model": "A larger amount of information does not automatically provide stronger evidence. Several reports may repeat the same untested claim, giving the impression of agreement without adding independent support. Useful research explains how observations were collected and what alternatives were considered. Readers should therefore examine the quality and relevance of the evidence rather than simply counting sources. A small, carefully designed study may answer a narrow question more reliably than a much larger collection of unrelated comments. Independent observations that address the same question would strengthen the comparison more than additional sources repeating an unsupported assertion.",
        "minWords": 80,
        "seconds": 600,
        "rubric": [
          "Content: I distinguish information quantity from evidential strength.",
          "Development: I explain independence, relevance or method rather than count reports.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check research, evidence and information in complete phrases."
        ],
        "analysis": "Review this response against its own demand: Distinguish information quantity from evidential strength. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain independence, relevance or method rather than count reports; a weaker one only names the topic or repeats a judgement. For your revision, check research, evidence and information in complete phrases. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-countable-stage-2",
        "compatibleWithSignature": "v1-8cf7a7a0"
      },
      {
        "kind": "writing",
        "title": "Transfer assessment: Countability and accurate academic vocabulary",
        "instructions": "Write a paragraph advising a student to compare sources and seek practical advice before purchasing equipment.",
        "model": "Before buying equipment, a student should identify the task it must perform and compare reliable information about the available options. Practical advice from someone who uses similar tools can reveal limitations that promotional material overlooks. However, one person’s preference is not conclusive evidence that an item will suit every learner. Borrowing or testing a device first may be more useful than purchasing several accessories immediately. The decision should follow the actual need rather than the amount of equipment advertised.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I advise comparison and practical guidance before purchase.",
          "Development: I connect source review to the equipment decision.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I repair an advice or equipment quantity phrase without losing the message."
        ],
        "analysis": "Review this response against its own demand: Advise comparison and practical guidance before purchase. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect source review to the equipment decision; a weaker one only names the topic or repeats a judgement. For your revision, repair an advice or equipment quantity phrase without losing the message. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band2-mistakes-countable-stage-3",
        "compatibleWithSignature": "v1-bcbe42e0"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-speaking-cue-card",
  "lessonId": "band2-speaking-cue-card",
  "type": "course-activity",
  "prompt": "Speaking: Part 1 Answers and Part 2 Cue-Card Planning — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Speaking: Part 1 Answers and Part 2 Cue-Card Planning",
    "learn": "IELTS Speaking is assessed through fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. Part 1 development and Part 2 planning. Develop relevant ideas naturally, use examples that support the point, and qualify claims where appropriate. Part 2 allows one minute of preparation and up to two minutes of speaking. These recordings support rehearsal and self-review; they do not reproduce a live examiner interaction.",
    "worked": {
      "example": "I like the small park near my home because it gives people somewhere to meet without spending money. I often walk there after work, and seeing familiar neighbours makes the area feel more welcoming.",
      "reasoning": "The response answers directly, develops a relevant point and avoids a memorised list of complex expressions."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided response",
        "instructions": "What do you like about the place where you live? Answer directly and explain one detail.",
        "model": "I like the small park near my home because it gives people somewhere to meet without spending money. I often walk there after work, and seeing familiar neighbours makes the area feel more welcoming.",
        "rubric": [
          "Relevance: I answer the familiar-place question and develop one relevant detail.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to answer the familiar-place question and develop one relevant detail. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "audio": {
          "src": "/media/courses/course-audio-025.wav",
          "transcript": "I like the small park near my home because it gives people somewhere to meet without spending money. I often walk there after work, and seeing familiar neighbours makes the area feel more welcoming.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band2-speaking-cue-card-stage-1",
        "compatibleWithSignature": "v1-abd4591a"
      },
      {
        "kind": "speaking",
        "title": "Independent response",
        "instructions": "Describe a skill you learned from another person. Say what it was, who helped, how you learned, and why it mattered. Prepare for one minute, then speak for up to two minutes.",
        "model": "A practical skill I learned from another person was repairing a punctured bicycle tyre. My neighbour, Helen, taught me about two years ago, shortly after I started cycling to work. I had been paying a shop to fix every puncture, so I wanted to handle a simple repair myself rather than stop cycling whenever something went wrong.\n\nWe worked in her garden on a Saturday morning. First she showed me how to remove the wheel and find the hole in the inner tube using a bowl of water. Instead of doing everything for me, she asked what I thought the bubbles meant. That small question helped me understand the reason for each step, rather than just memorise a sequence.\n\nThe awkward part was putting the tyre back. I trapped a section of the tube under the edge, and Helen noticed before I inflated it. We took it off again, checked the position and tried a second time. I felt slightly embarrassed, but she explained that checking a mistake was part of learning a safe repair.\n\nLater that month I had another puncture on the way home. It took me longer than it would have taken a mechanic, but I managed it. The lesson mattered because it gave me useful independence and changed how I ask for help. I now prefer someone to explain a decision and let me try it, instead of taking over immediately.\n\nI also remember how patient Helen was when I asked the same question twice. She suggested keeping a small repair kit in my bag, but reminded me that some problems still need professional attention. That distinction was useful: being independent did not mean pretending to know everything. It meant recognising a repair I could attempt safely and knowing when to stop.",
        "rubric": [
          "Relevance: I develop a skill-learning event through the person, demonstration, own action and significance.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 120,
        "analysis": "Use the actual recording to develop a skill-learning event through the person, demonstration, own action and significance. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "preparationSeconds": 60,
        "id": "band2-speaking-cue-card-stage-2",
        "contentVersion": 2,
        "modelAudio": {
          "src": "/media/courses/recovery-band2-speaking-cue-card-long-turn.wav",
          "label": "Original synthetic long-turn demonstration · Samantha · paced EnglishCamp model."
        },
        "compatibleWithSignature": "v2-ae97cf45"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Describe a place where you learned something useful. Explain what happened there and why you remember it. Use a fresh personal example.",
        "model": "One memorable place was a small community workshop where I learned to use basic tools safely. The instructor gave us a practical task rather than a long lecture. Completing it made the advice easier to remember, and I still use the same checking routine before starting a repair.",
        "rubric": [
          "Relevance: I use a fresh place-learning event with a clear action and result.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to use a fresh place-learning event with a clear action and result. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "id": "band2-speaking-cue-card-stage-3",
        "compatibleWithSignature": "v1-5f6f9601"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-speaking-describe",
  "lessonId": "band2-speaking-describe",
  "type": "course-activity",
  "prompt": "Speaking: Part 2 Description, Fluency and Pronunciation — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Speaking: Part 2 Description, Fluency and Pronunciation",
    "learn": "IELTS Speaking is assessed through fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. Part 2 description, fluency and intelligibility. Develop relevant ideas naturally, use examples that support the point, and qualify claims where appropriate. Part 2 allows one minute of preparation and up to two minutes of speaking. These recordings support rehearsal and self-review; they do not reproduce a live examiner interaction.",
    "worked": {
      "example": "My reusable notebook is useful because I can organise short plans without carrying several pads. I used it during a group project to record decisions after each meeting. It is not expensive, but having a reliable place for notes helps me remember what I agreed to do.",
      "reasoning": "The response answers directly, develops a relevant point and avoids a memorised list of complex expressions."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided response",
        "instructions": "Describe a useful object in 45 seconds. Group your ideas into purpose, a specific occasion and personal value.",
        "model": "My reusable notebook is useful because I can organise short plans without carrying several pads. I used it during a group project to record decisions after each meeting. It is not expensive, but having a reliable place for notes helps me remember what I agreed to do.",
        "rubric": [
          "Relevance: I organise the useful object by purpose, occasion and value.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 45,
        "analysis": "Use the actual recording to organise the useful object by purpose, occasion and value. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "audio": {
          "src": "/media/courses/course-audio-026.wav",
          "transcript": "My reusable notebook is useful because I can organise short plans without carrying several pads. I used it during a group project to record decisions after each meeting. It is not expensive, but having a reliable place for notes helps me remember what I agreed to do.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band2-speaking-describe-stage-1",
        "compatibleWithSignature": "v1-a75f10a6"
      },
      {
        "kind": "speaking",
        "title": "Independent response",
        "instructions": "Describe a time you solved a problem with other people. Say what the problem was, who helped, what you did and how you felt. Prepare for one minute, then speak for up to two minutes.",
        "model": "One occasion when I solved a problem with other people was the opening of our college exhibition last spring. Four of us had spent several weeks arranging photographs in different rooms. We had checked the display boards and lighting, but we had forgotten to test the route from the main entrance.\n\nJust before the opening, a visitor asked where the exhibition was. We realised that the corridor split in two and there were no signs. Simply telling that visitor would not solve the problem for the next fifty people, so we stopped and divided the work. I drew a quick plan, two classmates made large arrows, and another waited by the entrance while we put them up.\n\nThere was a small disagreement about whether the signs needed to look professional. One classmate wanted to print them, but the nearest printer was in another building. We agreed that clear temporary signs were more useful than perfect ones arriving late. We used thick pens and placed each arrow where a visitor actually had to choose a direction.\n\nTen minutes later we walked the route ourselves. One arrow was partly hidden by a door, so we moved it. After that, people found the rooms without asking for help. I felt relieved, but also pleased that we had listened to each other under pressure. The experience taught me to check an event from a visitor's point of view, and to decide which part of a problem needs attention first.\n\nAfter the exhibition we added a visitor walk-through to our planning checklist. It was a simple change, but it gave everyone a chance to notice problems that the organisers had become used to. I would use the same approach again: agree on the immediate goal, share the jobs and then test the solution instead of assuming that putting up a sign has finished the task.",
        "rubric": [
          "Relevance: I develop the shared problem, others’ help, own action and response in a clear sequence.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 120,
        "analysis": "Use the actual recording to develop the shared problem, others’ help, own action and response in a clear sequence. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "preparationSeconds": 60,
        "id": "band2-speaking-describe-stage-2",
        "contentVersion": 2,
        "modelAudio": {
          "src": "/media/courses/recovery-band2-speaking-describe-long-turn.wav",
          "label": "Original synthetic long-turn demonstration · Samantha · paced EnglishCamp model."
        },
        "compatibleWithSignature": "v2-fa8d589c"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Describe a different occasion when a plan changed unexpectedly. Explain the original plan, the change and your response. Focus on a clear time sequence.",
        "model": "A train cancellation changed a trip I had planned with a friend. We first checked whether another route was available, then realised a bus would arrive too late. We decided to visit a nearby town instead. Although it was disappointing initially, choosing a realistic alternative helped us enjoy the day.",
        "rubric": [
          "Relevance: I distinguish the original plan, unexpected change and action taken afterwards.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to distinguish the original plan, unexpected change and action taken afterwards. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "id": "band2-speaking-describe-stage-3",
        "compatibleWithSignature": "v1-408f2564"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-speaking-integrated",
  "lessonId": "band2-speaking-integrated",
  "type": "course-activity",
  "prompt": "Speaking: Part 3 Reasons, Examples and Qualified Judgements — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "Speaking: Part 3 Reasons, Examples and Qualified Judgements",
    "learn": "IELTS Speaking is assessed through fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. Part 3: reasons, examples and qualified judgements. Develop relevant ideas naturally, use examples that support the point, and qualify claims where appropriate. Part 2 allows one minute of preparation and up to two minutes of speaking. These recordings support rehearsal and self-review; they do not reproduce a live examiner interaction.",
    "worked": {
      "example": "Public spaces can make social contact easier because people can meet without arranging a private visit. A small square with seating may help older residents spend time outside. However, the design needs to consider different users, since a space suitable for a busy event may not suit someone seeking quiet.",
      "reasoning": "The response answers directly, develops a relevant point and avoids a memorised list of complex expressions."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided response",
        "instructions": "Why do people value public spaces? Give a reason and an example without claiming everyone has the same needs.",
        "model": "Public spaces can make social contact easier because people can meet without arranging a private visit. A small square with seating may help older residents spend time outside. However, the design needs to consider different users, since a space suitable for a busy event may not suit someone seeking quiet.",
        "rubric": [
          "Relevance: I give a public-space reason and example without a universal needs claim.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to give a public-space reason and example without a universal needs claim. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "audio": {
          "src": "/media/courses/course-audio-027.wav",
          "transcript": "Public spaces can make social contact easier because people can meet without arranging a private visit. A small square with seating may help older residents spend time outside. However, the design needs to consider different users, since a space suitable for a busy event may not suit someone seeking quiet.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band2-speaking-integrated-stage-1",
        "compatibleWithSignature": "v1-8843147c"
      },
      {
        "kind": "speaking",
        "title": "Independent response",
        "instructions": "How should a city balance tourism with residents’ needs? Discuss an advantage, a possible cost and a practical response.",
        "model": "Tourism can support local businesses, but a crowded centre may become difficult for residents to use. The city could spread activities across different areas and improve information about quieter visiting times. It should also consult residents about the specific problems they face. A useful policy would preserve economic opportunities while protecting access to housing, transport and everyday services.",
        "rubric": [
          "Relevance: I weigh tourism benefit and resident cost through a practical response.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to weigh tourism benefit and resident cost through a practical response. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band2-speaking-integrated-stage-2",
        "compatibleWithSignature": "v1-a93d30e4"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Do technological changes always make life more convenient? Give a qualified judgement with a specific example and a counterexample.",
        "model": "They often remove small difficulties, but convenience depends on the user. An online booking system can save travel for someone comfortable with digital forms. For a person without reliable access or confidence, it may create another barrier. Keeping a telephone option can preserve the benefit without assuming that one method suits everyone.",
        "rubric": [
          "Relevance: I answer always with a specific benefit, counterexample and qualified judgement.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to answer always with a specific benefit, counterexample and qualified judgement. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band2-speaking-integrated-stage-3",
        "compatibleWithSignature": "v1-2715e1b1"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band2-review",
  "lessonId": "band2-review",
  "type": "course-activity",
  "prompt": "IELTS Academic: Review, Criteria and Independent Study Plan — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS Academic",
    "objective": "IELTS Academic: Review, Criteria and Independent Study Plan",
    "learn": "Use several kinds of evidence when reviewing progress: passage answers with explanations, complete writing, listening notes and recorded speaking. A local score or self-review checklist cannot establish an IELTS band. Identify recurring weaknesses and choose practice that actually requires the skill you want to improve.",
    "worked": {
      "example": "A fluent paragraph that omits half the question needs content revision before vocabulary polishing.",
      "reasoning": "Task response and language quality are distinct dimensions of performance."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided review",
        "instructions": "Write 60–90 words identifying a specific error from an earlier task. Explain the evidence and how you would correct it.",
        "model": "In my graph report I described a fall from 20% to 10% as a reduction of ten percent. The correct difference is ten percentage points, while the relative reduction is fifty percent. I will check the denominator and distinguish these two measures before drafting my next comparison. I will also avoid claiming a fall in total consumption when the chart gives only shares.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I identify a concrete earlier error and its evidence.",
          "Development: I explain the correction and why the first response failed.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I choose one specific cause rather than label an entire skill weak."
        ],
        "analysis": "Review this response against its own demand: Identify a concrete earlier error and its evidence. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain the correction and why the first response failed; a weaker one only names the topic or repeats a judgement. For your revision, choose one specific cause rather than label an entire skill weak. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band2-review-stage-1",
        "compatibleWithSignature": "v1-3d49c948"
      },
      {
        "kind": "writing",
        "title": "Independent improvement plan",
        "instructions": "Write 100–140 words using evidence from two different skills. Identify a specific problem, a targeted activity and how you will judge improvement without assigning an official band.",
        "model": "My listening notes show that I sometimes record the first date mentioned rather than the corrected booking. I will practise short appointment recordings and note the final decision after contrast words. In writing, my examples occasionally repeat the main claim instead of explaining it. I will revise one paragraph by adding a mechanism and a specific illustration, then ask whether each sentence contributes new meaning. Improvement will mean fewer correction errors in fresh audio and clearer development in a new paragraph. Neither result alone will establish an IELTS band, so I will continue collecting complete responses across all four skills.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I use evidence from two skills with targeted activities and fresh checks.",
          "Development: I match each follow-up to the documented difficulty.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I separate local accuracy, self-review and externally assessed quality."
        ],
        "analysis": "Review this planning response against its own demand: Use evidence from two skills with targeted activities and fresh checks. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will match each follow-up to the documented difficulty; a weaker one only names the topic or repeats a judgement. For your revision, separate local accuracy, self-review and externally assessed quality. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 140,
        "id": "band2-review-stage-2",
        "compatibleWithSignature": "v1-b7075f7b"
      },
      {
        "kind": "speaking",
        "title": "Assessment reflection",
        "instructions": "Explain aloud how you would prepare for a task that combines unfamiliar content with a strict time limit. Give an example and a realistic limitation.",
        "model": "I would first identify the required output and the information available, rather than trying to understand every unfamiliar word. In a reading task, mapping the paragraphs can help me return to evidence efficiently. A time limit means I may need to move past one difficult question. After practice, I would review whether the problem was language knowledge or decision-making, since those require different follow-up activities.",
        "rubric": [
          "Relevance: I connect a preparation method to unfamiliar content and a time limit, with a realistic limitation.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to connect a preparation method to unfamiliar content and a time limit, with a realistic limitation. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band2-review-stage-3",
        "compatibleWithSignature": "v1-c959e885"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-listening-section3",
  "lessonId": "band3-listening-section3",
  "type": "course-activity",
  "prompt": "Listening: Listen and Choose a Response — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Listening: Listen and Choose a Response",
    "learn": "The current TOEFL iBT uses practical and academic listening tasks. Listen and Choose a Response requires interpreting what the speaker means, the purpose of the message and relevant details. These original lesson sets are non-adaptive. Listen before consulting a transcript, select a response supported by the situation and review why each distractor fails. Do not infer a TOEFL 1–6 score from a short local set.",
    "worked": {
      "example": "“The start time is unchanged, but the room is different.” → the location changed.",
      "reasoning": "Only one feature changed. A familiar number or word is not sufficient evidence for another option."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided exchange",
        "instructions": "For the first recording, make empty notes for information gap / request or offer / relevant reply. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-028.wav",
          "transcript": "Could you tell me where the registration desk is?",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Choose the most appropriate response.",
            "answers": [
              "It is beside the main entrance."
            ],
            "evidence": "The question asks for a location.",
            "explanation": "The source supports this answer: The question asks for a location.",
            "options": [
              "Registration closes at four.",
              "I registered for a different session.",
              "It is beside the main entrance.",
              "You need to fill in the registration form."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-section3-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Independent short exchanges",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-029.wav",
          "transcript": "Question one. Would you mind opening the window? Question two. Has the seminar been moved to Friday? Question three. I cannot find the article on the course website. Question four. Why don’t we compare our notes before the quiz?",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Response to question one",
            "answers": [
              "Of course, I will open it now."
            ],
            "evidence": "Would you mind requests an action.",
            "explanation": "The source supports this answer: Would you mind requests an action.",
            "options": [
              "Of course, I will open it now.",
              "The window looks onto the garden.",
              "You can buy tickets at that window.",
              "I opened the course website earlier."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "Which response explicitly confirms that the seminar date has changed to Friday?",
            "answers": [
              "Yes, the tutor confirmed the new date."
            ],
            "evidence": "Yes, the tutor confirmed the new date explicitly confirms the change. The heard question alone does not establish whether the change occurred.",
            "explanation": "The requested response must confirm the changed date. The yes-response does so. The Thursday response denies a change; the two uncertain responses do not confirm one. Those could be appropriate in another conversation, so they are not rejected merely for being negative or uncertain.",
            "options": [
              "No, the seminar is on Thursday as originally planned.",
              "The room changed, but I do not know the date.",
              "I have not checked whether the timetable changed.",
              "Yes, the tutor confirmed the new date."
            ],
            "id": "q2",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "Response to question three",
            "answers": [
              "Try the reading list under week three."
            ],
            "evidence": "The speaker needs help locating an article.",
            "explanation": "The source supports this answer: The speaker needs help locating an article.",
            "options": [
              "Submit your finished article by Friday.",
              "Try the reading list under week three.",
              "The quiz is based on the lecture notes.",
              "Ask for a printed timetable at reception."
            ],
            "id": "q3",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "Response to question four",
            "answers": [
              "Good idea; I am free after lunch."
            ],
            "evidence": "Why do not we makes a suggestion.",
            "explanation": "The source supports this answer: Why do not we makes a suggestion.",
            "options": [
              "The quiz starts immediately after the lecture.",
              "The notes have already been collected by the tutor.",
              "Good idea; I am free after lunch.",
              "You can compare the article titles on the reading list."
            ],
            "id": "q4",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-section3-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment exchange",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-030.wav",
          "transcript": "I was supposed to meet the adviser at two, but my train has been delayed.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Choose a helpful, relevant response.",
            "answers": [
              "You should call the office and explain."
            ],
            "evidence": "The problem concerns a delayed arrival at an appointment.",
            "explanation": "The source supports this answer: The problem concerns a delayed arrival at an appointment.",
            "options": [
              "Go straight to the meeting without notifying anyone.",
              "You should call the office and explain.",
              "Ask the adviser to change the seminar topic.",
              "Wait until tomorrow to mention the missed appointment."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-section3-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-listening-lecture",
  "lessonId": "band3-listening-lecture",
  "type": "course-activity",
  "prompt": "Listening: Academic Talks, Structure and Qualified Claims — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Listening: Academic Talks, Structure and Qualified Claims",
    "learn": "The current TOEFL iBT uses practical and academic listening tasks. Listen to an Academic Talk requires interpreting what the speaker means, the purpose of the message and relevant details. These original lesson sets are non-adaptive. Listen before consulting a transcript, select a response supported by the situation and review why each distractor fails. Do not infer a TOEFL 1–6 score from a short local set.",
    "worked": {
      "example": "“The start time is unchanged, but the room is different.” → the location changed.",
      "reasoning": "Only one feature changed. A familiar number or word is not sufficient evidence for another option."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided academic talk",
        "instructions": "For the first recording, make empty notes for definition / mechanism / example / qualification. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-031.wav",
          "transcript": "When we study animal behaviour, we must distinguish an observation from an explanation. Seeing a bird return to the same location tells us what happened, but not necessarily why. It may remember food there, follow another bird or respond to a feature we have not noticed. A useful experiment tests these possibilities rather than treating the first plausible explanation as a fact.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What is the main point?",
            "answers": [
              "Observations can have several explanations"
            ],
            "evidence": "Several possible reasons for returning are listed.",
            "explanation": "The source supports this answer: Several possible reasons for returning are listed.",
            "options": [
              "Returning to a location identifies the bird’s exact motive.",
              "An observed action is sufficient evidence of a single explanation.",
              "Experiments should record locations without comparing possible causes.",
              "Observations can have several explanations"
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-lecture-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Independent academic talk",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-032.wav",
          "transcript": "Today we will look at how plants respond to limited water. One visible response is wilting, but important changes may occur before leaves lose their shape. Some plants close tiny openings on their leaves, reducing water loss. Those openings also allow gases to move in and out, so closing them can restrict the carbon dioxide available for photosynthesis. The response therefore involves a trade-off rather than a cost-free solution. Researchers comparing species must consider when and where they grow. A plant adapted to brief dry periods may respond differently from one that regularly faces long droughts. In an experiment, giving all plants the same amount of water does not necessarily create the same degree of stress, because leaf area and root systems vary. Measurements should match the question being asked. If we want to understand survival, a short-term change in growth is relevant but not sufficient on its own.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Why does the speaker mention leaf openings?",
            "answers": [
              "To explain a trade-off"
            ],
            "evidence": "Closing them reduces water loss but limits carbon dioxide.",
            "explanation": "The source supports this answer: Closing them reduces water loss but limits carbon dioxide.",
            "options": [
              "To explain a trade-off",
              "To show that reduced water loss has no effect on photosynthesis.",
              "To explain why all plants experience equal stress.",
              "To identify wilting as the first change in every species."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "Why may equal water amounts produce different stress?",
            "answers": [
              "Plants differ in leaf area and roots"
            ],
            "evidence": "Leaf area and root systems vary.",
            "explanation": "The source supports this answer: Leaf area and root systems vary.",
            "options": [
              "The same water quantity always produces the same leaf response.",
              "Plants differ in leaf area and roots",
              "Water allocation determines stress without reference to plant structure.",
              "Differences arise only from how the water is labelled."
            ],
            "id": "q2",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What is insufficient to establish survival outcomes?",
            "answers": [
              "A short-term growth change"
            ],
            "evidence": "A short-term change in growth is not sufficient on its own.",
            "explanation": "The source supports this answer: A short-term change in growth is not sufficient on its own.",
            "options": [
              "Longer-term survival observations under the relevant conditions",
              "A comparison designed specifically to measure survival",
              "A short-term growth change",
              "A record covering the outcome the study is trying to establish"
            ],
            "id": "q3",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-lecture-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment academic talk",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-033.wav",
          "transcript": "A historical map is evidence of how a place was represented, but it may not be a neutral record of every feature. The mapmaker selected what mattered for a particular purpose. A shipping map may show channels in detail while omitting inland paths. Comparing maps made for different users can therefore reveal both physical changes and changing priorities.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What does the shipping example illustrate?",
            "answers": [
              "Purpose affects what a map includes"
            ],
            "evidence": "Channels are detailed while inland paths may be omitted.",
            "explanation": "The source supports this answer: Channels are detailed while inland paths may be omitted.",
            "options": [
              "Purpose affects what a map includes",
              "A shipping map records inland travel in greater detail than channels.",
              "Different mapmakers necessarily observed different physical landscapes.",
              "Omitted paths prove that no inland routes existed."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-lecture-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-listening-multiple-speakers",
  "lessonId": "band3-listening-multiple-speakers",
  "type": "course-activity",
  "prompt": "Listening: Conversations, Problems and Implied Decisions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Listening: Conversations, Problems and Implied Decisions",
    "learn": "The current TOEFL iBT uses practical and academic listening tasks. Listen to a Conversation requires interpreting what the speaker means, the purpose of the message and relevant details. These original lesson sets are non-adaptive. Listen before consulting a transcript, select a response supported by the situation and review why each distractor fails. Do not infer a TOEFL 1–6 score from a short local set.",
    "worked": {
      "example": "“The start time is unchanged, but the room is different.” → the location changed.",
      "reasoning": "Only one feature changed. A familiar number or word is not sufficient evidence for another option."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided campus conversation",
        "instructions": "For the first recording, make empty notes for option / required condition / status / remaining action. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-034.wav",
          "transcript": "Student. I booked a study room, but I cannot see my reservation. Librarian. Did you confirm the email? Student. I thought submitting the form was enough. Librarian. The link completes the booking. Check your inbox first; if it has expired, we can make another reservation.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What should the student do first?",
            "answers": [
              "Check the confirmation email"
            ],
            "evidence": "Check your inbox first.",
            "explanation": "The source supports this answer: Check your inbox first.",
            "options": [
              "Submit another booking before checking the first one.",
              "Ask someone else to surrender a reserved room.",
              "Go directly to the room because a form guarantees access.",
              "Check the confirmation email"
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-multiple-speakers-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Independent conversation",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-035.wav",
          "transcript": "Student one. Our presentation is on Thursday, and the survey results are not ready. Student two. I thought we would get them today. Student one. So did I, but the tutor says two forms were incomplete. We can either wait until tomorrow or explain the limitation and use the responses we already have. Student two. Waiting would leave very little time to prepare the slides. Could we use the current results and clearly state how many people responded? Student one. That seems sensible. We should avoid saying the findings represent the whole class. Student two. Agreed. I will make a slide about the sample and the missing responses. Could you revise the conclusion? Student one. Yes. I will remove the claim that everyone prefers the new timetable. The evidence supports a more limited statement.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What problem do the students face?",
            "answers": [
              "Incomplete survey responses"
            ],
            "evidence": "Two forms were incomplete.",
            "explanation": "The source supports this answer: Two forms were incomplete.",
            "options": [
              "The presentation date has moved to Friday.",
              "Every survey form has been lost.",
              "Incomplete survey responses",
              "The slides have already been submitted."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "Why do they reject waiting?",
            "answers": [
              "It would reduce preparation time"
            ],
            "evidence": "Waiting leaves little time for slides.",
            "explanation": "The source supports this answer: Waiting leaves little time for slides.",
            "options": [
              "It would reduce preparation time",
              "The tutor has forbidden use of survey results.",
              "They would lose access to the survey website.",
              "A later survey would require a different topic."
            ],
            "id": "q2",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What will the second student prepare?",
            "answers": [
              "A slide explaining the sample"
            ],
            "evidence": "I will make a slide about the sample and missing responses.",
            "explanation": "The source supports this answer: I will make a slide about the sample and missing responses.",
            "options": [
              "A slide claiming the whole class was surveyed",
              "A replacement questionnaire for every student",
              "A list of proposed changes to the room booking",
              "A slide explaining the sample"
            ],
            "id": "q3",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What change will be made to the conclusion?",
            "answers": [
              "A broad claim will be narrowed"
            ],
            "evidence": "Remove the claim that everyone prefers the timetable.",
            "explanation": "The source supports this answer: Remove the claim that everyone prefers the timetable.",
            "options": [
              "It will claim that every student supports the timetable.",
              "A broad claim will be narrowed",
              "It will avoid mentioning the sample size.",
              "It will describe the missing responses as positive."
            ],
            "id": "q4",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-multiple-speakers-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment conversation",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-036.wav",
          "transcript": "Student. I need the field guide for tomorrow, but every copy is on loan. Staff member. There is an electronic version. Student. I will be outdoors without a connection. Staff member. Download it before you leave. Some pages have large images, so use the campus network rather than mobile data.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What solution is suggested?",
            "answers": [
              "Download the electronic guide in advance"
            ],
            "evidence": "Download it before you leave.",
            "explanation": "The source supports this answer: Download it before you leave.",
            "options": [
              "Use the electronic guide online after reaching the field site.",
              "Wait for a printed copy even if it misses the visit.",
              "Download the electronic guide in advance",
              "Download the image-heavy pages using mobile data outdoors."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-listening-multiple-speakers-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-vocab-education",
  "lessonId": "band3-vocab-education",
  "type": "course-activity",
  "prompt": "Listening: Announcements, Changes and Required Actions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Listening: Announcements, Changes and Required Actions",
    "learn": "The current TOEFL iBT uses practical and academic listening tasks. Listen to an Announcement requires interpreting what the speaker means, the purpose of the message and relevant details. These original lesson sets are non-adaptive. Listen before consulting a transcript, select a response supported by the situation and review why each distractor fails. Do not infer a TOEFL 1–6 score from a short local set.",
    "worked": {
      "example": "“The start time is unchanged, but the room is different.” → the location changed.",
      "reasoning": "Only one feature changed. A familiar number or word is not sufficient evidence for another option."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided announcement",
        "instructions": "For the first recording, make empty notes for changed detail / unchanged detail / action for the named group. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-037.wav",
          "transcript": "The chemistry demonstration will take place in room eight instead of room five. The starting time is unchanged. Please leave bags in the lockers, but bring your notebook. Protective glasses will be supplied at the door.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What has changed?",
            "answers": [
              "The room"
            ],
            "evidence": "Room eight instead of room five.",
            "explanation": "The source supports this answer: Room eight instead of room five.",
            "options": [
              "The starting time",
              "The room",
              "The notebook requirement",
              "The protective-glasses arrangement"
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What should students bring?",
            "answers": [
              "notebook"
            ],
            "evidence": "Bring your notebook.",
            "explanation": "The source supports this answer: Bring your notebook.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band3-vocab-education-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Independent campus announcement",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-038.wav",
          "transcript": "The writing centre is changing its appointment system from next Monday. Students will be able to book online up to seven days ahead, but same-day appointments must still be arranged at the desk. This is intended to keep some places available for urgent questions. A session lasts twenty minutes. Please bring the assignment instructions and one section of your draft that you want to discuss. Tutors can help you understand feedback and develop revision strategies, but they will not proofread an entire assignment or predict your grade. If you cannot attend, cancel the booking at least two hours beforehand so another student can use it. Students who need an accessible room should mention this when booking; the centre will confirm the arrangement by email.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "How are same-day appointments arranged?",
            "answers": [
              "At the desk"
            ],
            "evidence": "Same-day appointments must still be arranged at the desk.",
            "explanation": "The source supports this answer: Same-day appointments must still be arranged at the desk.",
            "options": [
              "Online in the same way as advance bookings",
              "By cancelling another student’s booking",
              "At the desk only seven days beforehand",
              "At the desk"
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What should students bring?",
            "answers": [
              "Instructions and a selected draft section"
            ],
            "evidence": "Bring assignment instructions and one section of your draft.",
            "explanation": "The source supports this answer: Bring assignment instructions and one section of your draft.",
            "options": [
              "Instructions and a selected draft section",
              "A complete final assignment for proofreading",
              "The tutor’s grade prediction and the textbook",
              "Only the course title without a draft"
            ],
            "id": "q2",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "What will tutors not do?",
            "answers": [
              "Predict a grade"
            ],
            "evidence": "They will not predict your grade.",
            "explanation": "The source supports this answer: They will not predict your grade.",
            "options": [
              "Discuss feedback",
              "Predict a grade",
              "Suggest revision strategies",
              "Explain unclear instructions"
            ],
            "id": "q3",
            "reviewId": "TOEFL-context"
          },
          {
            "prompt": "When should cancellation occur?",
            "answers": [
              "At least two hours before"
            ],
            "evidence": "Cancel at least two hours beforehand.",
            "explanation": "The source supports this answer: Cancel at least two hours beforehand.",
            "options": [
              "Seven days before the appointment",
              "At the start of the twenty-minute session",
              "At least two hours before",
              "Within two hours after the session ends"
            ],
            "id": "q4",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-vocab-education-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment announcement",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-039.wav",
          "transcript": "Due to maintenance, the east entrance to the science building will be closed tomorrow morning. Use the west entrance and follow signs to reception. Deliveries should use the service gate after noon. Classes will run as scheduled, although students should allow a few extra minutes to reach their rooms.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What should students do?",
            "answers": [
              "Use the west entrance"
            ],
            "evidence": "Use the west entrance.",
            "explanation": "The source supports this answer: Use the west entrance.",
            "options": [
              "Use the west entrance",
              "Use the east entrance because classes are unchanged.",
              "Use the service gate in the morning.",
              "Wait until the afternoon to attend morning classes."
            ],
            "id": "q1",
            "reviewId": "TOEFL-context"
          }
        ],
        "id": "band3-vocab-education-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-reading-summary-completion",
  "lessonId": "band3-reading-summary-completion",
  "type": "course-activity",
  "prompt": "Reading: Complete the Words in Context — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Reading: Complete the Words in Context",
    "learn": "Complete the Words tests vocabulary and grammar within a passage containing partially spelled words. Read the whole context, infer the intended word, then check its spelling and grammatical role. The local input asks for the complete restored word, so your answer can be reviewed clearly. This non-adaptive lesson does not reproduce ETS delivery or scoring.",
    "worked": {
      "example": "The report provides useful informa____ → information.",
      "reasoning": "The context needs a noun meaning facts; information is normally uncountable."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided missing-letter completion",
        "instructions": "Label each target role before restoring its spelling. Read the visible stem and whole sentence together, then type the complete restored word requested by the question. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The campus garden offers a practical oppor______ for students to observe plant growth. Volunteers record changes and comp___ their notes each week. Their observations help them under_____ how weather affects the garden.",
        "questions": [
          {
            "prompt": "Restore the complete word: oppor______",
            "answers": [
              "opportunity"
            ],
            "evidence": "The restored word is opportunity; read it back in the passage for grammar and meaning.",
            "explanation": "A practical opportunity needs a singular noun head naming a chance to learn. The visible oppor segment and observe purpose fit opportunity; an adjective would leave the phrase without its head.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: comp___",
            "answers": [
              "compare"
            ],
            "evidence": "The restored word is compare; read it back in the passage for grammar and meaning.",
            "explanation": "Volunteers record and compare are coordinated actions of a plural subject. Compare takes their notes as its object; comparison would supply a noun where the second action is needed.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: under_____",
            "answers": [
              "understand"
            ],
            "evidence": "The restored word is understand; read it back in the passage for grammar and meaning.",
            "explanation": "Help them understand uses a base verb after the object in this help frame. Understanding or understandingly would not complete the intended structure.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-reading-summary-completion-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent Complete the Words",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A university library introduced a new system for reserving study rooms. The aim was to make access more equi_____ while keeping the process simple. Students could book one session at a time and received a confir______ by email. Staff monitored demand to iden____ periods when extra rooms were needed. The first report suggested an impro______ in availability, although the team noted that examination schedules could influ____ the results. A longer evaluation would provide a more reli____ basis for deciding whether to expand the system.",
        "questions": [
          {
            "prompt": "Restore the complete word: equi_____",
            "answers": [
              "equitable"
            ],
            "evidence": "The restored word is equitable; read it back in the passage for grammar and meaning.",
            "explanation": "More equitable describes fairer access with an adjective. Equitably would normally describe an action rather than complete make access more… in this frame.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: confir______",
            "answers": [
              "confirmation"
            ],
            "evidence": "The restored word is confirmation; read it back in the passage for grammar and meaning.",
            "explanation": "A confirmation is a countable noun naming the email acknowledgement. Confirm is a verb and cannot head the phrase after received a.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: iden____",
            "answers": [
              "identify"
            ],
            "evidence": "The restored word is identify; read it back in the passage for grammar and meaning.",
            "explanation": "To identify expresses the purpose of monitoring demand. To is the infinitive marker here, so use the base verb rather than identification.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: impro______",
            "answers": [
              "improvement"
            ],
            "evidence": "The restored word is improvement; read it back in the passage for grammar and meaning.",
            "explanation": "An improvement names a change in availability after suggested an. Improving alone does not head that singular countable noun phrase.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: influ____",
            "answers": [
              "influence"
            ],
            "evidence": "The restored word is influence; read it back in the passage for grammar and meaning.",
            "explanation": "Could influence uses a base verb after the modal. The possible schedule effect limits the interpretation; influenced would incorrectly place a past form after could.",
            "maxWords": 1,
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: reli____",
            "answers": [
              "reliable"
            ],
            "evidence": "The restored word is reliable; read it back in the passage for grammar and meaning.",
            "explanation": "A more reliable basis needs an adjective modifying basis. Reliability is a noun, so it would require a different sentence frame.",
            "maxWords": 1,
            "id": "q6",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-reading-summary-completion-stage-2",
        "compatibleWithSignature": "v1-da0e9954"
      },
      {
        "kind": "language",
        "title": "Assessment missing-letter completion",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Researchers studying coastal plants collected samples from several locations. They used the same proce____ at every site so that comparisons would be meaningful. The results revealed consi_______ differences, but the team avoided a simple causal expla______. Soil conditions and recent weather could both contrib___ to the pattern.",
        "questions": [
          {
            "prompt": "Restore the complete word: proce____",
            "answers": [
              "procedure"
            ],
            "evidence": "The restored word is procedure; read it back in the passage for grammar and meaning.",
            "explanation": "The same procedure is a noun phrase naming the method used at each site. Procedural is an adjective and would need a noun after it.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: consi_______",
            "answers": [
              "considerable"
            ],
            "evidence": "The restored word is considerable; read it back in the passage for grammar and meaning.",
            "explanation": "Considerable describes the extent of differences. Considerably would be an adverb needing a suitable action or adjective to modify.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: expla______",
            "answers": [
              "explanation"
            ],
            "evidence": "The restored word is explanation; read it back in the passage for grammar and meaning.",
            "explanation": "A simple causal explanation requires a noun head after the two modifiers. Explain would leave the noun phrase incomplete.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Restore the complete word: contrib___",
            "answers": [
              "contribute"
            ],
            "evidence": "The restored word is contribute; read it back in the passage for grammar and meaning.",
            "explanation": "Could both contribute requires a base verb after the modal. To belongs to the complement contribute to the pattern; contribution would change the required role.",
            "maxWords": 1,
            "id": "q4",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-reading-summary-completion-stage-3",
        "compatibleWithSignature": "v1-6c43664a"
      }
    ]
  },
  "xpReward": 20
},
  {
    "id": "activity-band3-reading-matching-features",
    "lessonId": "band3-reading-matching-features",
    "type": "course-activity",
    "prompt": "Reading: Read in Daily Life—Notices and Practical Conditions — guided practice, independent response and transfer assessment",
    "data": {
      "exam": "TOEFL iBT 2026",
      "objective": "Reading: Read in Daily Life—Notices and Practical Conditions",
      "learn": "Read the source for its purpose, conditions and supporting evidence. In daily-life texts, track who must do what and in which order. In academic passages, distinguish observations, explanations and qualified conclusions. Use context to interpret vocabulary. These original shorter sets are non-adaptive skill practice, with local results rather than TOEFL score estimates.",
      "worked": {
        "example": "Permission to enter a building does not necessarily include permission to operate specialist equipment.",
        "reasoning": "The wider context can restrict an apparently broad permission."
      },
      "tasks": [
        {
          "kind": "reading",
          "title": "Guided evidence reading: Reading: Read in Daily Life—Notices and Practical Conditions",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "A room-booking notice\n\nStudy rooms may be reserved for up to two hours. A booking is held for ten minutes after its start time; after that, staff may give the room to another user. Students must confirm their reservation through the email link. An unconfirmed request does not reserve a room. The system improves access only if users follow the confirmation and cancellation rules.",
          "questions": [
            {
              "prompt": "How long is a booking held after its start?",
              "answers": [
                "ten minutes"
              ],
              "evidence": "A booking is held for ten minutes.",
              "explanation": "The source supports this answer: A booking is held for ten minutes.",
              "id": "q1",
              "options": [
                "two hours",
                "twenty minutes",
                "ten minutes",
                "until the end of the day"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "What must room users understand about the notice?",
              "answers": [
                "The booking system depends on confirmation and timely attendance."
              ],
              "evidence": "Study rooms may be reserved for up to two hours. A booking is held for ten minutes after its start time; after that, staff may give the room to another user. Students must confirm their reservation through the email link. An unconfirmed request does not reserve a room. The system improves access only if users follow the confirmation and cancellation rules.",
              "explanation": "The booking system depends on confirmation and timely attendance. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "The booking system depends on confirmation and timely attendance.",
                "Submitting a request reserves a room without email confirmation.",
                "A booking is held for the entire two hours even if nobody arrives.",
                "Confirming by email removes the need to attend promptly."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            }
          ],
          "seconds": 420,
          "id": "band3-reading-matching-features-stage-1",
          "contentVersion": 2
        },
        {
          "kind": "reading",
          "title": "Independent passage: Reading: Read in Daily Life—Notices and Practical Conditions",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "A field-trip message\n\nTo: Environmental Science students\nSubject: Friday’s estuary visit\n\nThe coach will leave from the north gate at 8:15. Please arrive ten minutes early because attendance must be checked before departure. The original meeting point outside the library is no longer in use due to roadworks.\n\nBring waterproof footwear, a packed lunch and the printed recording sheet. The department will provide sampling containers and gloves. Mobile coverage is unreliable at the estuary, so download the safety instructions before leaving campus.\n\nStudents who cannot walk the full route should contact the coordinator by Wednesday. A shorter accessible route can be arranged, but transport needs to be planned in advance. The visit will proceed in light rain. If severe weather requires cancellation, a message will be sent by 6:30 on Friday morning. Do not assume that ordinary rain means the trip is cancelled.\n\nThe arrangements should make the visit useful and safe, provided students read the updated instructions rather than relying on last term’s schedule.",
          "questions": [
            {
              "prompt": "Where will the coach leave from?",
              "answers": [
                "north gate"
              ],
              "evidence": "The coach leaves from the north gate.",
              "explanation": "The source supports this answer: The coach leaves from the north gate.",
              "id": "q1",
              "options": [
                "outside the library",
                "north gate",
                "south gate",
                "the estuary car park"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "What practical message connects the field-trip instructions?",
              "answers": [
                "Updated practical instructions matter because earlier arrangements have changed."
              ],
              "evidence": "The arrangements should make the visit useful and safe, provided students read the updated instructions rather than relying on last term’s schedule.",
              "explanation": "Updated practical instructions matter because earlier arrangements have changed. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "Students should use last term's meeting point if it is more convenient.",
                "Light rain automatically cancels the visit.",
                "Updated practical instructions matter because earlier arrangements have changed.",
                "Safety instructions can reliably be downloaded at the estuary."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            },
            {
              "prompt": "What is provided by the department?",
              "answers": [
                "Sampling containers and gloves"
              ],
              "evidence": "The department will provide sampling containers and gloves.",
              "explanation": "The passage supports this answer: The department will provide sampling containers and gloves.",
              "options": [
                "Sampling containers and gloves",
                "Waterproof footwear",
                "Packed lunches",
                "Printed student records"
              ],
              "id": "q3"
            },
            {
              "prompt": "What should students do before leaving campus?",
              "answers": [
                "Download safety instructions"
              ],
              "evidence": "Mobile coverage is unreliable, so download instructions.",
              "explanation": "The passage supports this answer: Mobile coverage is unreliable, so download instructions.",
              "options": [
                "Buy a sampling kit",
                "Download safety instructions",
                "Wait for ordinary rain to cancel the visit",
                "Go to the old library meeting point"
              ],
              "id": "q4"
            },
            {
              "prompt": "When can cancellation information arrive?",
              "answers": [
                "By 6:30 on Friday morning"
              ],
              "evidence": "A message will be sent by 6:30 if severe weather requires cancellation.",
              "explanation": "The passage supports this answer: A message will be sent by 6:30 if severe weather requires cancellation.",
              "options": [
                "After the coach leaves",
                "By 6:30 on Friday morning",
                "Only the following Monday",
                "No cancellation message will be sent"
              ],
              "id": "q5"
            }
          ],
          "seconds": 720,
          "id": "band3-reading-matching-features-stage-2",
          "contentVersion": 2
        },
        {
          "kind": "reading",
          "title": "Transfer assessment: Reading: Read in Daily Life—Notices and Practical Conditions",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "A campus repair service\n\nThe student repair service examines laptops by appointment. Diagnosis is free, but replacement parts require the owner’s approval before purchase. Staff cannot guarantee recovery of lost files, so users should back up important work before handing in a device. The service may extend a laptop’s life, but it is not a substitute for keeping copies of essential documents.",
          "questions": [
            {
              "prompt": "What requires owner approval?",
              "answers": [
                "replacement parts"
              ],
              "evidence": "Replacement parts require the owner’s approval.",
              "explanation": "The source supports this answer: Replacement parts require the owner’s approval.",
              "id": "q1",
              "options": [
                "diagnosis",
                "backing up personal files",
                "making an appointment",
                "replacement parts"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "How should students regard the laptop repair service?",
              "answers": [
                "Repair support is useful but does not remove the need for backups."
              ],
              "evidence": "The student repair service examines laptops by appointment. Diagnosis is free, but replacement parts require the owner’s approval before purchase. Staff cannot guarantee recovery of lost files, so users should back up important work before handing in a device. The service may extend a laptop’s life, but it is not a substitute for keeping copies of essential documents.",
              "explanation": "Repair support is useful but does not remove the need for backups. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "Free diagnosis includes guaranteed recovery of lost files.",
                "Repair support is useful but does not remove the need for backups.",
                "Owners should wait until diagnosis before backing up important work.",
                "Making an appointment authorises staff to buy any required part."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            }
          ],
          "seconds": 720,
          "id": "band3-reading-matching-features-stage-3",
          "contentVersion": 2
        }
      ]
    },
    "xpReward": 20
  },
  {
  "id": "activity-band3-reading-flowchart",
  "lessonId": "band3-reading-flowchart",
  "type": "course-activity",
  "prompt": "Reading: Academic Passages, Evidence and Author Purpose — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Reading: Academic Passages, Evidence and Author Purpose",
    "learn": "Read the source for its purpose, conditions and supporting evidence. In daily-life texts, track who must do what and in which order. In academic passages, distinguish observations, explanations and qualified conclusions. Use context to interpret vocabulary. These original shorter sets are non-adaptive skill practice, with local results rather than TOEFL score estimates.",
    "worked": {
      "example": "Permission to enter a building does not necessarily include permission to operate specialist equipment.",
      "reasoning": "The wider context can restrict an apparently broad permission."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Academic Passages, Evidence and Author Purpose",
        "instructions": "Unpack one dense sentence into subject, action and condition. Then map the paragraph’s observation and interpretation before choosing a wider conclusion. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Signals and interpretation\n\nAn archaeological object can support several interpretations. A polished stone may have been a tool, a decoration or an item exchanged for another purpose. Wear patterns and the place where it was found provide additional evidence. Researchers should compare these sources rather than treating the first familiar shape as conclusive.",
        "questions": [
          {
            "prompt": "What physical evidence is mentioned?",
            "answers": [
              "wear patterns"
            ],
            "evidence": "Wear patterns provide additional evidence.",
            "explanation": "The source supports this answer: Wear patterns provide additional evidence.",
            "id": "q1",
            "options": [
              "wear patterns",
              "the first observer’s preference",
              "the object’s sale price",
              "a modern catalogue number"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What approach to the polished stone is recommended?",
            "answers": [
              "Interpretations need several kinds of evidence."
            ],
            "evidence": "An archaeological object can support several interpretations. A polished stone may have been a tool, a decoration or an item exchanged for another purpose. Wear patterns and the place where it was found provide additional evidence. Researchers should compare these sources rather than treating the first familiar shape as conclusive.",
            "explanation": "An interpretation needs comparison among available evidence, not one attractive detail. The passage’s qualified conclusion reflects what the combined sources can establish.",
            "options": [
              "Identify its purpose from its familiar shape alone.",
              "Treat its find location as irrelevant once wear is visible.",
              "Interpretations need several kinds of evidence.",
              "Assume that every polished object had a decorative purpose."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band3-reading-flowchart-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Academic Passages, Evidence and Author Purpose",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "How social learning can preserve a mistake\n\nAnimals can learn by observing others, which may save time and reduce the risks of exploring unfamiliar food or places. However, copying is useful only when the observed behaviour suits the current situation. A route that once led to food may no longer do so after conditions change.\n\nIn one experimental design, researchers allow a few individuals to discover a feeding location and then introduce inexperienced animals. If the newcomers follow the experienced group, this shows that social information influences their choice. It does not establish that the copied choice is always the best one. To test flexibility, the researchers can move the food and observe whether individuals continue following the old route.\n\nPersistence may look like an inability to learn, but its interpretation depends on the cost of exploration. When searching independently is dangerous, following a usually reliable group may remain a reasonable strategy even after occasional failure. The important question is how animals balance personal experience with social information.\n\nThis distinction also affects how the findings are described. Saying that animals “blindly copy” may exaggerate what a limited experiment demonstrates. A more careful account identifies the conditions under which copying continues and the evidence that causes behaviour to change. Social learning is neither an infallible solution nor a simple error; its value depends on the environment and the alternatives available.",
        "questions": [
          {
            "prompt": "What can researchers move to test flexibility?",
            "answers": [
              "food"
            ],
            "evidence": "Researchers can move the food.",
            "explanation": "The source supports this answer: Researchers can move the food.",
            "id": "q1",
            "options": [
              "the animals’ ages",
              "the length of the experiment",
              "the number of newcomers",
              "food"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What determines whether social copying is a useful strategy?",
            "answers": [
              "The usefulness of copying depends on changing conditions and the cost of exploration."
            ],
            "evidence": "This distinction also affects how the findings are described. Saying that animals “blindly copy” may exaggerate what a limited experiment demonstrates. A more careful account identifies the conditions under which copying continues and the evidence that causes behaviour to change. Social learning is neither an infallible solution nor a simple error; its value depends on the environment and the alternatives available.",
            "explanation": "Copying can reduce exploration costs, but its value changes with conditions and the danger of independent investigation. The finding is conditional, not a universal recommendation to copy or explore.",
            "options": [
              "Copying shows that the chosen feeding location is always best.",
              "The usefulness of copying depends on changing conditions and the cost of exploration.",
              "Persisting with an old route necessarily proves an inability to learn.",
              "Independent exploration is always preferable after one failure."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Why can copying remain reasonable after an occasional failure?",
            "answers": [
              "Independent exploration may be dangerous"
            ],
            "evidence": "When searching independently is dangerous, following a usually reliable group may remain reasonable.",
            "explanation": "The passage supports this answer: When searching independently is dangerous, following a usually reliable group may remain reasonable.",
            "options": [
              "The old route always has food",
              "Independent exploration may be dangerous",
              "Animals never use personal experience",
              "The researchers prohibit new routes"
            ],
            "id": "q3"
          },
          {
            "prompt": "What does following experienced animals establish?",
            "answers": [
              "Social information affects choice"
            ],
            "evidence": "It shows that social information influences their choice.",
            "explanation": "The passage supports this answer: It shows that social information influences their choice.",
            "options": [
              "The copied choice is always optimal",
              "Social information affects choice",
              "Every alternative has been tested",
              "The animals cannot remember"
            ],
            "id": "q4"
          },
          {
            "prompt": "What does the writer recommend avoiding?",
            "answers": [
              "Claims broader than the experiment supports"
            ],
            "evidence": "Blindly copy may exaggerate what a limited experiment demonstrates.",
            "explanation": "The passage supports this answer: Blindly copy may exaggerate what a limited experiment demonstrates.",
            "options": [
              "All experimental comparisons",
              "Claims broader than the experiment supports",
              "Any record of behaviour",
              "Questions about changing conditions"
            ],
            "id": "q5"
          }
        ],
        "seconds": 720,
        "id": "band3-reading-flowchart-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-dac5b5ec"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Academic Passages, Evidence and Author Purpose",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Why old buildings need several dates\n\nA building may have been constructed, enlarged and repaired in different periods. A date cut into a doorway might refer to an extension rather than the whole structure. Historians compare documents, materials and building techniques before assigning a chronology. One visible date is useful evidence, but it cannot settle every question about the site.",
        "questions": [
          {
            "prompt": "What might a doorway date refer to?",
            "answers": [
              "extension"
            ],
            "evidence": "A date may refer to an extension.",
            "explanation": "The source supports this answer: A date may refer to an extension.",
            "id": "q1",
            "options": [
              "the whole structure’s original construction",
              "extension",
              "the start of occupation on the site",
              "the manufacture of every building material"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "Why compare a building's materials and documents with its doorway date?",
            "answers": [
              "Building history requires comparison among several kinds of evidence."
            ],
            "evidence": "A building may have been constructed, enlarged and repaired in different periods. A date cut into a doorway might refer to an extension rather than the whole structure. Historians compare documents, materials and building techniques before assigning a chronology. One visible date is useful evidence, but it cannot settle every question about the site.",
            "explanation": "Building history is reconstructed by comparing documentary and physical evidence. One surviving feature cannot automatically establish a complete chronology or every later use.",
            "options": [
              "The doorway date establishes when every part was constructed.",
              "Repairs necessarily remove all useful evidence of earlier periods.",
              "Documents make examination of building techniques unnecessary.",
              "Building history requires comparison among several kinds of evidence."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band3-reading-flowchart-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-2ebc36c4"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-vocab-awl3",
  "lessonId": "band3-vocab-awl3",
  "type": "course-activity",
  "prompt": "Reading and Vocabulary: Word Families, Evidence and Hedging — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Reading and Vocabulary: Word Families, Evidence and Hedging",
    "learn": "Read the source for its purpose, conditions and supporting evidence. In daily-life texts, track who must do what and in which order. In academic passages, distinguish observations, explanations and qualified conclusions. Use context to interpret vocabulary. These original shorter sets are non-adaptive skill practice, with local results rather than TOEFL score estimates.",
    "worked": {
      "example": "Permission to enter a building does not necessarily include permission to operate specialist equipment.",
      "reasoning": "The wider context can restrict an apparently broad permission."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading and Vocabulary: Word Families, Evidence and Hedging",
        "instructions": "Read the contextual claim before choosing a lexical meaning. Compare the candidate’s certainty and scope, then check its grammatical role. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Cautious scientific language\n\nResearchers described a result as consistent with their hypothesis. This wording means the observation fits the proposed explanation; it does not mean every alternative has been eliminated. Terms such as may, suggests and under these conditions express the limits of a claim. Removing them can make a summary sound stronger while making it less accurate.",
        "questions": [
          {
            "prompt": "Which word indicates a possibility?",
            "answers": [
              "may"
            ],
            "evidence": "May expresses the limits of a claim.",
            "explanation": "The source supports this answer: May expresses the limits of a claim.",
            "id": "q1",
            "options": [
              "eliminated",
              "every",
              "may",
              "means"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "Why retain words such as suggests in a research summary?",
            "answers": [
              "Qualification can make a scientific claim more precise."
            ],
            "evidence": "Researchers described a result as consistent with their hypothesis. This wording means the observation fits the proposed explanation; it does not mean every alternative has been eliminated. Terms such as may, suggests and under these conditions express the limits of a claim. Removing them can make a summary sound stronger while making it less accurate.",
            "explanation": "A qualification narrows a claim to the evidence actually supplied. It can improve precision without making the finding valueless or guaranteeing a universal result.",
            "options": [
              "Qualification can make a scientific claim more precise.",
              "They indicate that observations contradict the hypothesis.",
              "They make a result less accurate by making it less confident.",
              "Consistent with means that every alternative explanation was eliminated."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band3-vocab-awl3-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading and Vocabulary: Word Families, Evidence and Hedging",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A measurement that changed its meaning\n\nA research group compared household energy use over several years. At first, the figures appeared to show a sharp increase. The team then discovered that the recording system had changed: earlier records included only purchased electricity, while later ones also estimated energy generated by household solar panels.\n\nThe apparent rise therefore combined a possible change in behaviour with a broader measurement definition. The researchers reconstructed a narrower series using the categories shared across the records. This reduced the size of the increase but did not remove it entirely. They described the revised pattern as evidence of a moderate rise, while noting that some historical information remained unavailable.\n\nThe case illustrates why a word such as “consumption” needs an operational definition. A familiar label does not guarantee that every dataset measures the same thing. Comparisons are useful when differences in collection and classification are understood. Without that context, greater numerical detail may create an illusion of precision rather than a more reliable conclusion.",
        "questions": [
          {
            "prompt": "What did later records additionally estimate?",
            "answers": [
              "solar energy"
            ],
            "evidence": "Energy generated by household solar panels.",
            "explanation": "The source supports this answer: Energy generated by household solar panels.",
            "id": "q1",
            "options": [
              "only purchased electricity",
              "the price of household appliances",
              "the number of power cuts",
              "solar energy"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What must be checked before comparing household energy figures?",
            "answers": [
              "Comparable labels need comparable definitions and collection methods."
            ],
            "evidence": "The case illustrates why a word such as “consumption” needs an operational definition. A familiar label does not guarantee that every dataset measures the same thing. Comparisons are useful when differences in collection and classification are understood. Without that context, greater numerical detail may create an illusion of precision rather than a more reliable conclusion.",
            "explanation": "The apparent increase partly reflects a broader measurement definition. The narrower comparable series still rises less, so the headline total cannot be treated as pure behavioural change.",
            "options": [
              "Comparable labels need comparable definitions and collection methods.",
              "The same label proves that all records include the same sources.",
              "The apparent increase was entirely behavioural.",
              "Adding solar estimates made it impossible to construct any comparison."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Why did the initial comparison exaggerate the rise?",
            "answers": [
              "The measurement definition became broader"
            ],
            "evidence": "Later figures also estimated household generation.",
            "explanation": "The passage supports this answer: Later figures also estimated household generation.",
            "options": [
              "All households disappeared",
              "The measurement definition became broader",
              "Researchers refused to compare years",
              "The earlier figures included more categories"
            ],
            "id": "q3"
          },
          {
            "prompt": "What did the narrower series show?",
            "answers": [
              "A smaller increase remained"
            ],
            "evidence": "The increase was reduced but not removed.",
            "explanation": "The passage supports this answer: The increase was reduced but not removed.",
            "options": [
              "The entire increase disappeared",
              "A smaller increase remained",
              "Energy use was never measured",
              "All historical information was recovered"
            ],
            "id": "q4"
          },
          {
            "prompt": "What is the main warning about a familiar label?",
            "answers": [
              "It may cover different definitions"
            ],
            "evidence": "A familiar label does not guarantee the same measurement.",
            "explanation": "The passage supports this answer: A familiar label does not guarantee the same measurement.",
            "options": [
              "It guarantees perfect comparability",
              "It may cover different definitions",
              "It makes documentation unnecessary",
              "It proves a causal explanation"
            ],
            "id": "q5"
          }
        ],
        "seconds": 720,
        "id": "band3-vocab-awl3-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-55d954d6"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading and Vocabulary: Word Families, Evidence and Hedging",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A useful distinction\n\nA study can be reliable in the sense that its procedure produces consistent measurements, yet fail to measure the concept the researcher intended. A timed typing task might give stable results but provide a narrow picture of writing ability. Repetition and relevance are therefore separate considerations when evaluating evidence.",
        "questions": [
          {
            "prompt": "Which ability is only narrowly represented by typing speed?",
            "answers": [
              "writing ability"
            ],
            "evidence": "A typing task gives a narrow picture of writing ability.",
            "explanation": "The source supports this answer: A typing task gives a narrow picture of writing ability.",
            "id": "q1",
            "options": [
              "writing ability",
              "finger strength",
              "reading comprehension",
              "spoken fluency"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What distinction does the typing example illustrate?",
            "answers": [
              "Consistent measurement does not automatically establish relevance."
            ],
            "evidence": "A study can be reliable in the sense that its procedure produces consistent measurements, yet fail to measure the concept the researcher intended. A timed typing task might give stable results but provide a narrow picture of writing ability. Repetition and relevance are therefore separate considerations when evaluating evidence.",
            "explanation": "A measure can be consistent yet fail to capture the intended question. Repeatability alone does not establish relevance; the measurement must match the claim.",
            "options": [
              "Stable measurements necessarily cover the whole concept of writing ability.",
              "A measure cannot be consistent unless it is conceptually relevant.",
              "Repeating a narrow test expands the range of skills it measures.",
              "Consistent measurement does not automatically establish relevance."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band3-vocab-awl3-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-9a4343e7"
      }
    ]
  },
  "xpReward": 20
},
  {
    "id": "activity-band3-vocab-health",
    "lessonId": "band3-vocab-health",
    "type": "course-activity",
    "prompt": "Reading: Health Research, Comparisons and Causal Limits — guided practice, independent response and transfer assessment",
    "data": {
      "exam": "TOEFL iBT 2026",
      "objective": "Reading: Health Research, Comparisons and Causal Limits",
      "learn": "Read the source for its purpose, conditions and supporting evidence. In daily-life texts, track who must do what and in which order. In academic passages, distinguish observations, explanations and qualified conclusions. Use context to interpret vocabulary. These original shorter sets are non-adaptive skill practice, with local results rather than TOEFL score estimates.",
      "worked": {
        "example": "Permission to enter a building does not necessarily include permission to operate specialist equipment.",
        "reasoning": "The wider context can restrict an apparently broad permission."
      },
      "tasks": [
        {
          "kind": "reading",
          "title": "Guided evidence reading: Reading: Health Research, Comparisons and Causal Limits",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "A health comparison\n\nTwo groups reported different sleep quality after a workplace change. The groups also differed in shift patterns, so the researchers could not attribute the whole difference to the intervention. They recommended a study that accounted for working hours. The report did not establish that the intervention has no effect; it established uncertainty about the cause.",
          "questions": [
            {
              "prompt": "What differed besides the intervention?",
              "answers": [
                "shift patterns"
              ],
              "evidence": "The groups differed in shift patterns.",
              "explanation": "The source supports this answer: The groups differed in shift patterns.",
              "id": "q1",
              "options": [
                "the name of the intervention",
                "shift patterns",
                "the stated sleep outcome",
                "the report’s title"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "What does the sleep comparison establish?",
              "answers": [
                "Confounding conditions limit causal interpretation."
              ],
              "evidence": "Two groups reported different sleep quality after a workplace change. The groups also differed in shift patterns, so the researchers could not attribute the whole difference to the intervention. They recommended a study that accounted for working hours. The report did not establish that the intervention has no effect; it established uncertainty about the cause.",
              "explanation": "Confounding conditions limit causal interpretation. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "The workplace intervention caused the entire sleep difference.",
                "Shift patterns prove that the intervention had no effect.",
                "Confounding conditions limit causal interpretation.",
                "Different group averages remove the need to examine working hours."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            }
          ],
          "seconds": 420,
          "id": "band3-vocab-health-stage-1",
          "contentVersion": 2
        },
        {
          "kind": "reading",
          "title": "Independent passage: Reading: Health Research, Comparisons and Causal Limits",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "When a health average hides variation\n\nAn average can summarise a health outcome, but it may conceal important differences among participants. Suppose a programme produces a modest average improvement while helping one group substantially and making little difference to another. Reporting only the overall figure would not show who benefited or why.\n\nResearchers therefore examine variation, while avoiding the temptation to explain every subgroup difference after seeing the results. Dividing a small sample into many categories can produce apparent patterns by chance. A useful analysis distinguishes questions planned in advance from exploratory observations that need confirmation.\n\nThe way an outcome is measured matters too. A self-reported improvement in comfort is valuable, but it is not identical to a change in physical function. Neither measure should automatically replace the other. Together, they may provide a fuller account of what participants experience.\n\nThe writer argues for reporting benefits with enough detail to reveal uncertainty and practical meaning. This does not make an intervention ineffective simply because its effects vary. It helps readers understand which claims are supported and what further research should investigate.",
          "questions": [
            {
              "prompt": "What can many divisions of a small sample produce?",
              "answers": [
                "chance patterns"
              ],
              "evidence": "Apparent patterns may arise by chance.",
              "explanation": "The source supports this answer: Apparent patterns may arise by chance.",
              "id": "q1",
              "options": [
                "chance patterns",
                "a more representative sample",
                "automatically confirmed explanations",
                "equal benefits in every group"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "How does the writer recommend interpreting health benefits?",
              "answers": [
                "Averages need context about variation, measurement and uncertainty."
              ],
              "evidence": "The writer argues for reporting benefits with enough detail to reveal uncertainty and practical meaning. This does not make an intervention ineffective simply because its effects vary. It helps readers understand which claims are supported and what further research should investigate.",
              "explanation": "Averages need context about variation, measurement and uncertainty. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "The overall average describes every participant equally well.",
                "Averages need context about variation, measurement and uncertainty.",
                "Exploratory subgroup patterns are conclusive in small samples.",
                "Reported comfort and physical function are interchangeable measures."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            },
            {
              "prompt": "Why distinguish planned from exploratory analyses?",
              "answers": [
                "Many subgroup comparisons can reveal chance patterns"
              ],
              "evidence": "Dividing a small sample many ways can produce apparent chance patterns.",
              "explanation": "The passage supports this answer: Dividing a small sample many ways can produce apparent chance patterns.",
              "options": [
                "All subgroup differences are false",
                "Many subgroup comparisons can reveal chance patterns",
                "Averages never contain information",
                "Exploration is prohibited"
              ],
              "id": "q3"
            },
            {
              "prompt": "How are comfort and physical function related in the passage?",
              "answers": [
                "They are different outcomes that may complement each other"
              ],
              "evidence": "Neither should automatically replace the other.",
              "explanation": "The passage supports this answer: Neither should automatically replace the other.",
              "options": [
                "They are identical measures",
                "They are different outcomes that may complement each other",
                "Comfort is always irrelevant",
                "Only physical function can be reported"
              ],
              "id": "q4"
            },
            {
              "prompt": "Does variation make an intervention automatically ineffective?",
              "answers": [
                "No; it requires more detailed interpretation"
              ],
              "evidence": "This does not make an intervention ineffective simply because effects vary.",
              "explanation": "The passage supports this answer: This does not make an intervention ineffective simply because effects vary.",
              "options": [
                "Yes, always",
                "No; it requires more detailed interpretation",
                "Only when every participant improves",
                "The writer gives no view"
              ],
              "id": "q5"
            }
          ],
          "seconds": 720,
          "id": "band3-vocab-health-stage-2",
          "contentVersion": 2
        },
        {
          "kind": "reading",
          "title": "Transfer assessment: Reading: Health Research, Comparisons and Causal Limits",
          "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
          "source": "A survey about exercise\n\nA survey found that people who used a new walking route reported more weekly exercise. It did not record their activity before the route opened. The result could mean that the route encouraged activity, but it could also mean that already active people chose to use it. A before-and-after comparison would help distinguish these explanations.",
          "questions": [
            {
              "prompt": "What was not recorded before opening?",
              "answers": [
                "activity"
              ],
              "evidence": "Their activity before the route opened was not recorded.",
              "explanation": "The source supports this answer: Their activity before the route opened was not recorded.",
              "id": "q1",
              "options": [
                "the number of route users after opening",
                "the existence of the new route",
                "activity",
                "the reported weekly activity of current users"
              ],
              "reviewId": "EC-03-detail"
            },
            {
              "prompt": "What is unresolved by the walking-route survey?",
              "answers": [
                "The association is useful but does not settle the direction of influence."
              ],
              "evidence": "A survey found that people who used a new walking route reported more weekly exercise. It did not record their activity before the route opened. The result could mean that the route encouraged activity, but it could also mean that already active people chose to use it. A before-and-after comparison would help distinguish these explanations.",
              "explanation": "The association is useful but does not settle the direction of influence. Compare the conditions and scope in the passage: the other options remove a stated restriction, confuse measures, or claim more than the evidence establishes.",
              "options": [
                "The route certainly caused all users to exercise more.",
                "The survey proves that the route has no effect on activity.",
                "No follow-up comparison could help examine the association.",
                "The association is useful but does not settle the direction of influence."
              ],
              "id": "q2",
              "reviewId": "EC-03"
            }
          ],
          "seconds": 720,
          "id": "band3-vocab-health-stage-3",
          "contentVersion": 2
        }
      ]
    },
    "xpReward": 20
  },
  {
  "id": "activity-band3-vocab-work",
  "lessonId": "band3-vocab-work",
  "type": "course-activity",
  "prompt": "Reading: Daily-Life Messages and Workplace Inference — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Reading: Daily-Life Messages and Workplace Inference",
    "learn": "Read the source for its purpose, conditions and supporting evidence. In daily-life texts, track who must do what and in which order. In academic passages, distinguish observations, explanations and qualified conclusions. Use context to interpret vocabulary. These original shorter sets are non-adaptive skill practice, with local results rather than TOEFL score estimates.",
    "worked": {
      "example": "Permission to enter a building does not necessarily include permission to operate specialist equipment.",
      "reasoning": "The wider context can restrict an apparently broad permission."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Daily-Life Messages and Workplace Inference",
        "instructions": "Write the actions in source order: request, permission, action or update as applicable. Attach each deadline to its own action before inferring what may happen next. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A shift notice\n\nStaff may exchange shifts only after both workers agree and a supervisor approves the change. Updating the shared calendar is required after approval, not instead of it. The procedure helps maintain coverage, but an entry in the calendar alone does not make an exchange valid.",
        "questions": [
          {
            "prompt": "Who must approve the exchange?",
            "answers": [
              "supervisor"
            ],
            "evidence": "A supervisor approves the change.",
            "explanation": "The source supports this answer: A supervisor approves the change.",
            "id": "q1",
            "options": [
              "either worker acting alone",
              "the person updating the calendar",
              "both workers without a supervisor",
              "supervisor"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What sequence makes a shift exchange valid?",
            "answers": [
              "Calendar updates follow approval and do not replace it."
            ],
            "evidence": "Staff may exchange shifts only after both workers agree and a supervisor approves the change. Updating the shared calendar is required after approval, not instead of it. The procedure helps maintain coverage, but an entry in the calendar alone does not make an exchange valid.",
            "explanation": "Approval precedes the calendar update. Updating a record cannot itself grant permission, so the procedure’s sequence must survive in the answer.",
            "options": [
              "Enter the change in the calendar instead of requesting approval.",
              "Calendar updates follow approval and do not replace it.",
              "Ask one worker to update the calendar without the other's agreement.",
              "Supervisor approval is optional if both workers have agreed."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band3-vocab-work-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Daily-Life Messages and Workplace Inference",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "An email about equipment training\n\nTo: New research assistants\nSubject: Access to the imaging room\n\nYour building access card does not automatically permit use of the imaging equipment. Before working independently, complete the safety module and attend a practical demonstration with a technician. The online module introduces procedures, while the demonstration checks that you can apply them to the actual device.\n\nDemonstrations are offered on Tuesday and Thursday afternoons. Reserve a place through the training calendar; each session is limited to four participants. If both sessions are full, contact the technician rather than joining an unbooked group.\n\nAfter training, your supervisor must confirm which procedures your project requires. Access will then be added to your account. This sequence may take several working days, so plan experiments accordingly. It is intended to support safe, appropriate use, not to certify expertise in every possible imaging method.",
        "questions": [
          {
            "prompt": "How many participants can attend each demonstration?",
            "answers": [
              "four"
            ],
            "evidence": "Each session is limited to four participants.",
            "explanation": "The source supports this answer: Each session is limited to four participants.",
            "id": "q1",
            "options": [
              "two",
              "six",
              "four",
              "an unlimited number"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What does the imaging-room email require?",
            "answers": [
              "Independent access requires several checks rather than a building card alone."
            ],
            "evidence": "After training, your supervisor must confirm which procedures your project requires. Access will then be added to your account. This sequence may take several working days, so plan experiments accordingly. It is intended to support safe, appropriate use, not to certify expertise in every possible imaging method.",
            "explanation": "Independent room access requires the specified safety and practical checks as well as administrative access. A building card alone does not establish machine permission or immediate activation.",
            "options": [
              "Independent access requires several checks rather than a building card alone.",
              "A building card is sufficient permission for independent equipment use.",
              "Completing the online module grants immediate access to every method.",
              "An unbooked demonstration can replace the supervisor's confirmation."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "What must occur before independent equipment use?",
            "answers": [
              "Online safety training and a practical demonstration"
            ],
            "evidence": "Complete the module and attend a demonstration.",
            "explanation": "The passage supports this answer: Complete the module and attend a demonstration.",
            "options": [
              "Obtain only a building card",
              "Online safety training and a practical demonstration",
              "Read an advertisement",
              "Join an unbooked group"
            ],
            "id": "q3"
          },
          {
            "prompt": "What should a student do if both sessions are full?",
            "answers": [
              "Contact the technician"
            ],
            "evidence": "Contact the technician rather than joining an unbooked group.",
            "explanation": "The passage supports this answer: Contact the technician rather than joining an unbooked group.",
            "options": [
              "Attend without booking",
              "Contact the technician",
              "Use the equipment alone",
              "Ask another student to share access credentials"
            ],
            "id": "q4"
          },
          {
            "prompt": "Why should experiments be planned ahead?",
            "answers": [
              "Adding access may take several working days"
            ],
            "evidence": "This sequence may take several working days.",
            "explanation": "The passage supports this answer: This sequence may take several working days.",
            "options": [
              "The equipment is permanently closed",
              "Adding access may take several working days",
              "The online module has no purpose",
              "The supervisor never reviews procedures"
            ],
            "id": "q5"
          }
        ],
        "seconds": 720,
        "id": "band3-vocab-work-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-e61cd7b8"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Daily-Life Messages and Workplace Inference",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A reimbursement message\n\nTravel claims must include a receipt and a brief explanation of the work purpose. Submit them within thirty days of the journey. A manager’s prior permission to travel does not replace the claim form. Finance staff may request clarification before payment, so complete records can reduce delays without guaranteeing immediate reimbursement.",
        "questions": [
          {
            "prompt": "What must accompany the receipt?",
            "answers": [
              "work purpose"
            ],
            "evidence": "A brief explanation of the work purpose is required.",
            "explanation": "The source supports this answer: A brief explanation of the work purpose is required.",
            "id": "q1",
            "options": [
              "the manager’s permission alone",
              "work purpose",
              "a description of a personal holiday",
              "a promise to send the claim form later"
            ],
            "reviewId": "EC-03-detail"
          },
          {
            "prompt": "What should staff infer about travel reimbursement?",
            "answers": [
              "Complete records support processing but do not guarantee immediate payment."
            ],
            "evidence": "Travel claims must include a receipt and a brief explanation of the work purpose. Submit them within thirty days of the journey. A manager’s prior permission to travel does not replace the claim form. Finance staff may request clarification before payment, so complete records can reduce delays without guaranteeing immediate reimbursement.",
            "explanation": "Complete records help processing, but review and acceptance remain separate conditions. The message does not promise immediate payment merely because documents were submitted.",
            "options": [
              "Prior travel permission removes the need for a claim form.",
              "A complete claim guarantees immediate payment.",
              "Complete records support processing but do not guarantee immediate payment.",
              "Submitting a receipt removes the thirty-day deadline."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band3-vocab-work-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-81b8a74"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-discussion",
  "lessonId": "band3-writing-discussion",
  "type": "course-activity",
  "prompt": "Writing: Build a Sentence—Word Forms and Agreement — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Build a Sentence—Word Forms and Agreement",
    "learn": "Build a Sentence requires forming a grammatical sentence or question from supplied words and phrases. Identify the subject, finite verb and clause boundaries before deciding the order. Agreement and embedded clauses. In a direct question an auxiliary may precede the subject; an embedded question normally keeps statement order. Use every supplied word without adding a new claim.",
    "worked": {
      "example": "Where is the room? → Could you tell me where the room is?",
      "reasoning": "The embedded question keeps the subject before the verb."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: agreement and embedded clauses",
        "instructions": "Mark subject, finite verb and complement before ordering the tokens. Build the main clause first, then check the embedded clause and fixed boundaries. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: has / The / schedule / changed Keep the beginning “The schedule” and the final word “changed.” fixed.",
            "answers": [
              "The schedule has changed."
            ],
            "evidence": "Schedule is singular, so has agrees.",
            "explanation": "The source supports this answer: Schedule is singular, so has agrees.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: need / more / time / The / students Keep the beginning “The students” and the final word “time.” fixed.",
            "answers": [
              "The students need more time."
            ],
            "evidence": "Students is plural; need takes no -s.",
            "explanation": "The source supports this answer: Students is plural; need takes no -s.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: where / the / know / office / is / I Keep the beginning “I know” and the final word “is.” fixed.",
            "answers": [
              "I know where the office is."
            ],
            "evidence": "An embedded question uses statement order.",
            "explanation": "The source supports this answer: An embedded question uses statement order.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-discussion-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: agreement and embedded clauses",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: requires / The / equipment / maintenance / regular Keep the beginning “The equipment” and the final word “maintenance.” fixed.",
            "answers": [
              "The equipment requires regular maintenance."
            ],
            "evidence": "Equipment is an uncountable singular noun.",
            "explanation": "The source supports this answer: Equipment is an uncountable singular noun.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: works / you / Could / system / the / explain / how Keep the beginning “Could you” and the final word “works?” fixed.",
            "answers": [
              "Could you explain how the system works?"
            ],
            "evidence": "The embedded clause has statement order.",
            "explanation": "The source supports this answer: The embedded clause has statement order.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: a / Each / confirmation / participant / email / receives Keep the beginning “Each participant” and the final word “email.” fixed.",
            "answers": [
              "Each participant receives a confirmation email."
            ],
            "evidence": "Each participant is singular.",
            "explanation": "The source supports this answer: Each participant is singular.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: explanation / suggest / a / results / different / The Keep the beginning “The results” and the final word “explanation.” fixed.",
            "answers": [
              "The results suggest a different explanation."
            ],
            "evidence": "Results is plural.",
            "explanation": "The source supports this answer: Results is plural.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: available / whether / the / was / room / She / asked Keep the beginning “She asked” and the final word “available.” fixed.",
            "answers": [
              "She asked whether the room was available."
            ],
            "evidence": "Whether introduces an embedded yes/no question.",
            "explanation": "The source supports this answer: Whether introduces an embedded yes/no question.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: The / increased / number / has / applications / of Keep the beginning “The number” and the final word “increased.” fixed.",
            "answers": [
              "The number of applications has increased."
            ],
            "evidence": "The number is the singular head.",
            "explanation": "The source supports this answer: The number is the singular head.",
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: workshop / Do / you / starts / know / when / the Keep the beginning “Do you” and the final word “starts?” fixed.",
            "answers": [
              "Do you know when the workshop starts?"
            ],
            "evidence": "When the workshop starts uses statement order.",
            "explanation": "The source supports this answer: When the workshop starts uses statement order.",
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: describes / main / findings / the / The / report Keep the beginning “The report” and the final word “findings.” fixed.",
            "answers": [
              "The report describes the main findings."
            ],
            "evidence": "Report is singular.",
            "explanation": "The source supports this answer: Report is singular.",
            "id": "q8",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: have / the / completed / safety / We / training Keep the beginning “We have” and the final word “training.” fixed.",
            "answers": [
              "We have completed the safety training."
            ],
            "evidence": "Have completed forms the present perfect.",
            "explanation": "The source supports this answer: Have completed forms the present perfect.",
            "id": "q9",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: revised / They / the / discussing / are / proposal Keep the beginning “They are” and the final word “proposal.” fixed.",
            "answers": [
              "They are discussing the revised proposal."
            ],
            "evidence": "Are discussing describes an ongoing action.",
            "explanation": "The source supports this answer: Are discussing describes an ongoing action.",
            "id": "q10",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-discussion-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: agreement and embedded clauses",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: speakers / is / of / The / online / list Keep the beginning “The list” and the final word “online.” fixed.",
            "answers": [
              "The list of speakers is online."
            ],
            "evidence": "List is the singular head.",
            "explanation": "The source supports this answer: List is the singular head.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: is / me / you / tell / the / Can / meeting / where Keep the beginning “Can you” and the final word “is?” fixed.",
            "answers": [
              "Can you tell me where the meeting is?"
            ],
            "evidence": "The embedded clause uses statement order.",
            "explanation": "The source supports this answer: The embedded clause uses statement order.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: rooms / Several / remain / available Keep the beginning “Several rooms” and the final word “available.” fixed.",
            "answers": [
              "Several rooms remain available."
            ],
            "evidence": "Several rooms is plural.",
            "explanation": "The source supports this answer: Several rooms is plural.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-discussion-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-advantages",
  "lessonId": "band3-writing-advantages",
  "type": "course-activity",
  "prompt": "Writing: Build a Sentence—Statements and Questions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Build a Sentence—Statements and Questions",
    "learn": "Build a Sentence requires forming a grammatical sentence or question from supplied words and phrases. Identify the subject, finite verb and clause boundaries before deciding the order. Statements and questions. In a direct question an auxiliary may precede the subject; an embedded question normally keeps statement order. Use every supplied word without adding a new claim.",
    "worked": {
      "example": "Where is the room? → Could you tell me where the room is?",
      "reasoning": "The embedded question keeps the subject before the verb."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: statements and questions",
        "instructions": "Identify whether the target is a statement, direct question or embedded request. Build that frame before placing modifiers; mark tense only once in a do-support question. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: take / the / does / Where / place / seminar Keep the beginning “Where does” and the final word “place?” fixed.",
            "answers": [
              "Where does the seminar take place?"
            ],
            "evidence": "Does is followed by the base verb take.",
            "explanation": "The source supports this answer: Does is followed by the base verb take.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: takes / place / upstairs / The / seminar Keep the beginning “The seminar” and the final word “upstairs.” fixed.",
            "answers": [
              "The seminar takes place upstairs."
            ],
            "evidence": "The statement uses singular takes.",
            "explanation": "The source supports this answer: The statement uses singular takes.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: deadline / the / been / extended / Has Keep the beginning “Has the” and the final word “extended?” fixed.",
            "answers": [
              "Has the deadline been extended?"
            ],
            "evidence": "The auxiliary precedes the subject in a direct question.",
            "explanation": "The source supports this answer: The auxiliary precedes the subject in a direct question.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-advantages-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: statements and questions",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: did / Why / the / the / trip / cancel / organiser Keep the beginning “Why did” and the final word “trip?” fixed.",
            "answers": [
              "Why did the organiser cancel the trip?"
            ],
            "evidence": "Did carries past tense; cancel stays in base form.",
            "explanation": "The source supports this answer: Did carries past tense; cancel stays in base form.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: yesterday / organiser / The / trip / cancelled / the Keep the beginning “The organiser” and the final word “yesterday.” fixed.",
            "answers": [
              "The organiser cancelled the trip yesterday."
            ],
            "evidence": "A finished past event uses cancelled.",
            "explanation": "The source supports this answer: A finished past event uses cancelled.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / What / library / time / close / does Keep the beginning “What time” and the final word “close?” fixed.",
            "answers": [
              "What time does the library close?"
            ],
            "evidence": "Does supports the direct question.",
            "explanation": "The source supports this answer: Does supports the direct question.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: eight / closes / at / library / The Keep the beginning “The library” and the final word “eight.” fixed.",
            "answers": [
              "The library closes at eight."
            ],
            "evidence": "The subject is singular.",
            "explanation": "The source supports this answer: The subject is singular.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: today / available / computers / Are / the Keep the beginning “Are the” and the final word “today?” fixed.",
            "answers": [
              "Are the computers available today?"
            ],
            "evidence": "Are precedes the plural subject.",
            "explanation": "The source supports this answer: Are precedes the plural subject.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: The / today / computers / available / are Keep the beginning “The computers” and the final word “today.” fixed.",
            "answers": [
              "The computers are available today."
            ],
            "evidence": "The statement uses subject before verb.",
            "explanation": "The source supports this answer: The statement uses subject before verb.",
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: Have / submitted / you / the / application Keep the beginning “Have you” and the final word “application?” fixed.",
            "answers": [
              "Have you submitted the application?"
            ],
            "evidence": "Present perfect question order.",
            "explanation": "The source supports this answer: Present perfect question order.",
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / application / submitted / I / have Keep the beginning “I have” and the final word “application.” fixed.",
            "answers": [
              "I have submitted the application."
            ],
            "evidence": "Present perfect statement order.",
            "explanation": "The source supports this answer: Present perfect statement order.",
            "id": "q8",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: will / results / the / be / When / published Keep the beginning “When will” and the final word “published?” fixed.",
            "answers": [
              "When will the results be published?"
            ],
            "evidence": "Will precedes the subject; passive be published follows.",
            "explanation": "The source supports this answer: Will precedes the subject; passive be published follows.",
            "id": "q9",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: published / The / be / will / results / tomorrow Keep the beginning “The results” and the final word “tomorrow.” fixed.",
            "answers": [
              "The results will be published tomorrow."
            ],
            "evidence": "Future passive statement.",
            "explanation": "The source supports this answer: Future passive statement.",
            "id": "q10",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-advantages-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: statements and questions",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: send / the / tutor / Did / link / the Keep the beginning “Did the” and the final word “link?” fixed.",
            "answers": [
              "Did the tutor send the link?"
            ],
            "evidence": "Did + subject + base verb.",
            "explanation": "The source supports this answer: Did + subject + base verb.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / tutor / this / link / The / sent / morning Keep the beginning “The tutor” and the final word “morning.” fixed.",
            "answers": [
              "The tutor sent the link this morning."
            ],
            "evidence": "Past simple statement.",
            "explanation": "The source supports this answer: Past simple statement.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: me / tell / Could / the / you / when / ends / course Keep the beginning “Could you” and the final word “ends?” fixed.",
            "answers": [
              "Could you tell me when the course ends?"
            ],
            "evidence": "Polite request plus embedded statement order.",
            "explanation": "The source supports this answer: Polite request plus embedded statement order.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-writing-advantages-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-grammar-conditionals",
  "lessonId": "band3-grammar-conditionals",
  "type": "course-activity",
  "prompt": "Grammar for Writing: Sentence Building with Questions and Conditions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Grammar for Writing: Sentence Building with Questions and Conditions",
    "learn": "Build a Sentence requires forming a grammatical sentence or question from supplied words and phrases. Identify the subject, finite verb and clause boundaries before deciding the order. Conditions and indirect questions. In a direct question an auxiliary may precede the subject; an embedded question normally keeps statement order. Use every supplied word without adding a new claim.",
    "worked": {
      "example": "Where is the room? → Could you tell me where the room is?",
      "reasoning": "The embedded question keeps the subject before the verb."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: conditions and indirect questions",
        "instructions": "Identify the outer request and any condition or time clause separately. Build each subject/verb pair before joining the clauses and retaining all supplied tokens. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: meet / we / the / is / free, / room / If / there / can Keep the beginning “If the” and the final word “there.” fixed.",
            "answers": [
              "If the room is free, we can meet there."
            ],
            "evidence": "If states the condition; comma separates the initial clause.",
            "explanation": "The source supports this answer: If states the condition; comma separates the initial clause.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: whether / open / is / me / Please / registration / tell Keep the beginning “Please tell” and the final word “open.” fixed.",
            "answers": [
              "Please tell me whether registration is open."
            ],
            "evidence": "Whether introduces an indirect question.",
            "explanation": "The source supports this answer: Whether introduces an indirect question.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: wait / until / will / the / tutor / We / arrives Keep the beginning “We will” and the final word “arrives.” fixed.",
            "answers": [
              "We will wait until the tutor arrives."
            ],
            "evidence": "Present tense follows until for a future event.",
            "explanation": "The source supports this answer: Present tense follows until for a future event.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-conditionals-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: conditions and indirect questions",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: you / If / need / the / technician / contact / help, Keep the beginning “If you” and the final word “technician.” fixed.",
            "answers": [
              "If you need help, contact the technician."
            ],
            "evidence": "The condition precedes an imperative.",
            "explanation": "The source supports this answer: The condition precedes an imperative.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: changed / wonder / I / has / deadline / whether / the Keep the beginning “I wonder” and the final word “changed.” fixed.",
            "answers": [
              "I wonder whether the deadline has changed."
            ],
            "evidence": "Whether introduces an embedded question.",
            "explanation": "The source supports this answer: Whether introduces an embedded question.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: when / We / is / everyone / can / ready / begin Keep the beginning “We can” and the final word “ready.” fixed.",
            "answers": [
              "We can begin when everyone is ready."
            ],
            "evidence": "When introduces the time condition.",
            "explanation": "The source supports this answer: When introduces the time condition.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: Unless / weather / improves, / indoors / stay / will / we / the Keep the beginning “Unless the” and the final word “indoors.” fixed.",
            "answers": [
              "Unless the weather improves, we will stay indoors."
            ],
            "evidence": "Unless means if not.",
            "explanation": "The source supports this answer: Unless means if not.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: stored / how / should / explain / be / equipment / Please / the Keep the beginning “Please explain” and the final word “stored.” fixed.",
            "answers": [
              "Please explain how the equipment should be stored."
            ],
            "evidence": "The embedded clause uses statement order.",
            "explanation": "The source supports this answer: The embedded clause uses statement order.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: request / If / the / one / another / expires, / link Keep the beginning “If the” and the final word “one.” fixed.",
            "answers": [
              "If the link expires, request another one."
            ],
            "evidence": "The imperative gives a response to a condition.",
            "explanation": "The source supports this answer: The imperative gives a response to a condition.",
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / will / We / booking / after / confirm / arrives / payment Keep the beginning “We will” and the final word “arrives.” fixed.",
            "answers": [
              "We will confirm the booking after payment arrives."
            ],
            "evidence": "Present tense follows after for a future event.",
            "explanation": "The source supports this answer: Present tense follows after for a future event.",
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / opens / Do / on / Saturday / whether / office / you / know Keep the beginning “Do you” and the final word “Saturday?” fixed.",
            "answers": [
              "Do you know whether the office opens on Saturday?"
            ],
            "evidence": "The embedded question uses opens after office.",
            "explanation": "The source supports this answer: The embedded question uses opens after office.",
            "id": "q8",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: plan / change / may / increases / if / The / demand Keep the beginning “The plan” and the final word “increases.” fixed.",
            "answers": [
              "The plan may change if demand increases."
            ],
            "evidence": "The if-clause supplies a condition.",
            "explanation": "The source supports this answer: The if-clause supplies a condition.",
            "id": "q9",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: when / Please / know / us / let / arrive / you Keep the beginning “Please let” and the final word “arrive.” fixed.",
            "answers": [
              "Please let us know when you arrive."
            ],
            "evidence": "When introduces the arrival time.",
            "explanation": "The source supports this answer: When introduces the arrival time.",
            "id": "q10",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-conditionals-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: conditions and indirect questions",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / organiser / call / is / late, / If / the / bus Keep the beginning “If the” and the final word “organiser.” fixed.",
            "answers": [
              "If the bus is late, call the organiser."
            ],
            "evidence": "A real condition plus instruction.",
            "explanation": "The source supports this answer: A real condition plus instruction.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: where / cannot / entrance / the / I / remember / is Keep the beginning “I cannot” and the final word “is.” fixed.",
            "answers": [
              "I cannot remember where the entrance is."
            ],
            "evidence": "Where the entrance is uses statement order.",
            "explanation": "The source supports this answer: Where the entrance is uses statement order.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / We / trial / plan / once / ends / will / review / the Keep the beginning “We will” and the final word “ends.” fixed.",
            "answers": [
              "We will review the plan once the trial ends."
            ],
            "evidence": "Once introduces a future time clause.",
            "explanation": "The source supports this answer: Once introduces a future time clause.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-conditionals-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-grammar-passive",
  "lessonId": "band3-grammar-passive",
  "type": "course-activity",
  "prompt": "Grammar for Writing: Active, Passive and Reference — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Grammar for Writing: Active, Passive and Reference",
    "learn": "Build a Sentence requires forming a grammatical sentence or question from supplied words and phrases. Identify the subject, finite verb and clause boundaries before deciding the order. Active, passive and clear reference. In a direct question an auxiliary may precede the subject; an embedded question normally keeps statement order. Use every supplied word without adding a new claim.",
    "worked": {
      "example": "Where is the room? → Could you tell me where the room is?",
      "reasoning": "The embedded question keeps the subject before the verb."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: active, passive and clear reference",
        "instructions": "Name who does and receives the action. Build the auxiliary chain one part at a time, then restore time, agent and eligibility restrictions. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: checked / technician / The / device / the Keep the beginning “The technician” and the final word “device.” fixed.",
            "answers": [
              "The technician checked the device."
            ],
            "evidence": "Active voice names the agent.",
            "explanation": "The source supports this answer: Active voice names the agent.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: checked / technician / the / was / The / by / device Keep the beginning “The device” and the final word “technician.” fixed.",
            "answers": [
              "The device was checked by the technician."
            ],
            "evidence": "Passive voice focuses on the device.",
            "explanation": "The source supports this answer: Passive voice focuses on the device.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: a / stored / in / samples / are / cool / room / The Keep the beginning “The samples” and the final word “room.” fixed.",
            "answers": [
              "The samples are stored in a cool room."
            ],
            "evidence": "Present passive describes the procedure.",
            "explanation": "The source supports this answer: Present passive describes the procedure.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-passive-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: active, passive and clear reference",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: has / The / committee / proposal / the / approved Keep the beginning “The committee” and the final word “proposal.” fixed.",
            "answers": [
              "The committee has approved the proposal."
            ],
            "evidence": "Present perfect active.",
            "explanation": "The source supports this answer: Present perfect active.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: been / proposal / The / the / approved / by / has / committee Keep the beginning “The proposal” and the final word “committee.” fixed.",
            "answers": [
              "The proposal has been approved by the committee."
            ],
            "evidence": "Present perfect passive.",
            "explanation": "The source supports this answer: Present perfect passive.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / Staff / timetable / will / tomorrow / publish Keep the beginning “Staff will” and the final word “tomorrow.” fixed.",
            "answers": [
              "Staff will publish the timetable tomorrow."
            ],
            "evidence": "Future active.",
            "explanation": "The source supports this answer: Future active.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: tomorrow / will / be / timetable / published / The Keep the beginning “The timetable” and the final word “tomorrow.” fixed.",
            "answers": [
              "The timetable will be published tomorrow."
            ],
            "evidence": "Future passive.",
            "explanation": "The source supports this answer: Future passive.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: week / the / data / last / Researchers / collected Keep the beginning “Researchers collected” and the final word “week.” fixed.",
            "answers": [
              "Researchers collected the data last week."
            ],
            "evidence": "Past simple active.",
            "explanation": "The source supports this answer: Past simple active.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: The / week / data / last / collected / were Keep the beginning “The data” and the final word “week.” fixed.",
            "answers": [
              "The data were collected last week."
            ],
            "evidence": "Plural agreement is used consistently in this academic sentence.",
            "explanation": "The source supports this answer: Plural agreement is used consistently in this academic sentence.",
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: The / clearly / instructions / explain / the / procedure Keep the beginning “The instructions” and the final word “clearly.” fixed.",
            "answers": [
              "The instructions explain the procedure clearly."
            ],
            "evidence": "Active voice identifies what provides the explanation.",
            "explanation": "The source supports this answer: Active voice identifies what provides the explanation.",
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: glasses / worn / the / laboratory / be / in / Protective / must Keep the beginning “Protective glasses” and the final word “laboratory.” fixed.",
            "answers": [
              "Protective glasses must be worn in the laboratory."
            ],
            "evidence": "Modal passive must be worn.",
            "explanation": "The source supports this answer: Modal passive must be worn.",
            "id": "q8",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: librarian / the / reserved / us / room / The / for Keep the beginning “The librarian” and the final word “us.” fixed.",
            "answers": [
              "The librarian reserved the room for us."
            ],
            "evidence": "Active voice keeps the agent clear.",
            "explanation": "The source supports this answer: Active voice keeps the agent clear.",
            "id": "q9",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: for / The / reserved / was / room / group / our Keep the beginning “The room” and the final word “group.” fixed.",
            "answers": [
              "The room was reserved for our group."
            ],
            "evidence": "Past passive focuses on the room.",
            "explanation": "The source supports this answer: Past passive focuses on the room.",
            "id": "q10",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-passive-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: active, passive and clear reference",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: before / must / signed / be / The / submission / form Keep the beginning “The form” and the final word “submission.” fixed.",
            "answers": [
              "The form must be signed before submission."
            ],
            "evidence": "Modal passive states a requirement.",
            "explanation": "The source supports this answer: Modal passive states a requirement.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: form / supervisor / the / The / signed Keep the beginning “The supervisor” and the final word “form.” fixed.",
            "answers": [
              "The supervisor signed the form."
            ],
            "evidence": "Active voice names the actor.",
            "explanation": "The source supports this answer: Active voice names the actor.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: shortly / email / A / confirmation / be / will / sent Keep the beginning “A confirmation” and the final word “shortly.” fixed.",
            "answers": [
              "A confirmation email will be sent shortly."
            ],
            "evidence": "Future passive describes the next step.",
            "explanation": "The source supports this answer: Future passive describes the next step.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-grammar-passive-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-error-analysis",
  "lessonId": "band3-error-analysis",
  "type": "course-activity",
  "prompt": "Writing: Error Analysis and Meaning-Preserving Revision — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Error Analysis and Meaning-Preserving Revision",
    "learn": "Build a Sentence requires forming a grammatical sentence or question from supplied words and phrases. Identify the subject, finite verb and clause boundaries before deciding the order. Meaning-preserving revision. In a direct question an auxiliary may precede the subject; an embedded question normally keeps statement order. Use every supplied word without adding a new claim.",
    "worked": {
      "example": "Where is the room? → Could you tell me where the room is?",
      "reasoning": "The embedded question keeps the subject before the verb."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: meaning-preserving revision",
        "instructions": "Find the main subject and finite verb, then check the verb’s complement pattern. Rebuild one clause before adding reasons, parallel phrases and fixed punctuation. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: our / it / the / is / small, / room / Although / needs / meets Keep the beginning “Although the” and the final word “needs.” fixed.",
            "answers": [
              "Although the room is small, it meets our needs."
            ],
            "evidence": "Although expresses concession.",
            "explanation": "The source supports this answer: Although expresses concession.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: extended / website / deadline / the / failed / The / because / was Keep the beginning “The deadline” and the final word “failed.” fixed.",
            "answers": [
              "The deadline was extended because the website failed."
            ],
            "evidence": "Because introduces a reason.",
            "explanation": "The source supports this answer: Because introduces a reason.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: instructions / are / revised / easier / to / The / follow Keep the beginning “The revised” and the final word “follow.” fixed.",
            "answers": [
              "The revised instructions are easier to follow."
            ],
            "evidence": "Comparative easier is followed by to follow.",
            "explanation": "The source supports this answer: Comparative easier is followed by to follow.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-error-analysis-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: meaning-preserving revision",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: survey / The / provides / about / useful / information / travel / habits Keep the beginning “The survey” and the final word “habits.” fixed.",
            "answers": [
              "The survey provides useful information about travel habits."
            ],
            "evidence": "Information is uncountable.",
            "explanation": "The source supports this answer: Information is uncountable.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: applying / should / Students / before / deadline / check / the Keep the beginning “Students should” and the final word “applying.” fixed.",
            "answers": [
              "Students should check the deadline before applying."
            ],
            "evidence": "Before applying uses an -ing form.",
            "explanation": "The source supports this answer: Before applying uses an -ing form.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: allows / The / reserve / equipment / new / to / system / users Keep the beginning “The new” and the final word “equipment.” fixed.",
            "answers": [
              "The new system allows users to reserve equipment."
            ],
            "evidence": "Allow + object + to-infinitive.",
            "explanation": "The source supports this answer: Allow + object + to-infinitive.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: lunch / suggested / meeting / adviser / after / The Keep the beginning “The adviser” and the final word “lunch.” fixed.",
            "answers": [
              "The adviser suggested meeting after lunch."
            ],
            "evidence": "Suggest is followed by an -ing form here.",
            "explanation": "The source supports this answer: Suggest is followed by an -ing form here.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: conclusion / evidence / before / a / drawing / We / need Keep the beginning “We need” and the final word “conclusion.” fixed.",
            "answers": [
              "We need evidence before drawing a conclusion."
            ],
            "evidence": "Before + -ing; evidence is uncountable.",
            "explanation": "The source supports this answer: Before + -ing; evidence is uncountable.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: for / The / course / beginners / complete / suitable / is Keep the beginning “The course” and the final word “beginners.” fixed.",
            "answers": [
              "The course is suitable for complete beginners."
            ],
            "evidence": "Suitable is followed by for.",
            "explanation": "The source supports this answer: Suitable is followed by for.",
            "id": "q6",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: know / let / Please / if / the / me / changes / plan Keep the beginning “Please let” and the final word “changes.” fixed.",
            "answers": [
              "Please let me know if the plan changes."
            ],
            "evidence": "Let + object + base verb; real if-condition.",
            "explanation": "The source supports this answer: Let + object + base verb; real if-condition.",
            "id": "q7",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: focuses / practical / improvements / on / The / report Keep the beginning “The report” and the final word “improvements.” fixed.",
            "answers": [
              "The report focuses on practical improvements."
            ],
            "evidence": "Focuses on is the dependent preposition.",
            "explanation": "The source supports this answer: Focuses on is the dependent preposition.",
            "id": "q8",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: look / to / forward / response / receiving / We / your Keep the beginning “We look” and the final word “response.” fixed.",
            "answers": [
              "We look forward to receiving your response."
            ],
            "evidence": "To is a preposition before receiving.",
            "explanation": "The source supports this answer: To is a preposition before receiving.",
            "id": "q9",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: library / group / both / rooms / The / and / desks / quiet / offers Keep the beginning “The library” and the final word “rooms.” fixed.",
            "answers": [
              "The library offers both quiet desks and group rooms."
            ],
            "evidence": "Both ... and connects parallel noun phrases.",
            "explanation": "The source supports this answer: Both ... and connects parallel noun phrases.",
            "id": "q10",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-error-analysis-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: meaning-preserving revision",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: original / recommended / the / checking / The / source / tutor Keep the beginning “The tutor” and the final word “source.” fixed.",
            "answers": [
              "The tutor recommended checking the original source."
            ],
            "evidence": "Recommend + -ing.",
            "explanation": "The source supports this answer: Recommend + -ing.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: accessible / make / change / will / service / This / more / the Keep the beginning “This change” and the final word “accessible.” fixed.",
            "answers": [
              "This change will make the service more accessible."
            ],
            "evidence": "Make + object + adjective.",
            "explanation": "The source supports this answer: Make + object + adjective.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: an / appreciate / We / of / would / explanation / delay / the Keep the beginning “We would” and the final word “delay.” fixed.",
            "answers": [
              "We would appreciate an explanation of the delay."
            ],
            "evidence": "A polite request with a noun phrase.",
            "explanation": "The source supports this answer: A polite request with a noun phrase.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band3-error-analysis-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-multiple-charts",
  "lessonId": "band3-writing-multiple-charts",
  "type": "course-activity",
  "prompt": "Writing: Write for an Academic Discussion — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Write for an Academic Discussion",
    "learn": "Current TOEFL Writing includes Build a Sentence, Write an Email and Write for an Academic Discussion. Academic Discussion requires producing an original response, not selecting a strategy answer. Address the communicative purpose, develop relevant detail and use a suitable register. The local timers and word targets support practice; they do not reproduce adaptive delivery or generate an official score.",
    "worked": {
      "example": "A request should explain the issue, provide actionable details and say what response is needed.",
      "reasoning": "A polite opening cannot compensate for an unclear purpose or omitted task point."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided discussion extension",
        "instructions": "Professor: Should a college offer a small garden for student use? Maya says it could create opportunities for practical learning. Write a 50–80-word discussion extension. State your view, explain one mechanism or example, and add a relevant practical condition. This is a short preparation task, not a complete timed response.",
        "model": "I support a small garden if students have regular opportunities to use it. Maya’s practical-learning point is useful because learners could compare how plants respond to different care rather than only read about growth. For example, a class could keep a simple observation record over several weeks. However, someone must take responsibility during holidays, or the learning space may be unavailable when the next group needs it.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I state a view on the garden thread and extend Maya’s learning point.",
          "Development: I add a mechanism or example and a practical condition.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I remove agreement that only repeats the peer."
        ],
        "analysis": "Review this response against its own demand: State a view on the garden thread and extend Maya’s learning point. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will add a mechanism or example and a practical condition; a weaker one only names the topic or repeats a judgement. For your revision, remove agreement that only repeats the peer. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band3-writing-multiple-charts-stage-1",
        "taskFamily": "discussion",
        "contentVersion": 2
      },
      {
        "kind": "writing",
        "title": "Independent Academic Discussion",
        "instructions": "Professor: Should colleges require a community project as part of every course? Lina says projects make learning meaningful. Omar worries about time and scheduling. Contribute your own view, respond to an idea in the discussion, and develop your reasoning. Aim for at least 100 words in this ten-minute local practice.",
        "model": "I agree with Lina that community projects can make learning more meaningful, but I would prioritise a clear connection with the course. A project that merely keeps students busy may use time without helping them understand the subject. For example, a biology class could compare plant growth in two local gardens and explain the limits of its observations. Students would practise collecting evidence while producing something useful for residents. Omar’s concern about scheduling is reasonable, so participation should be planned within teaching time rather than relying entirely on evenings. A small, focused project would be more manageable than a large event and would make its educational value easier to evaluate.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I answer the community-project question and engage with an idea.",
          "Development: I add a course-linked mechanism while addressing scheduling.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that the example supports learning rather than merely busyness."
        ],
        "analysis": "Review this response against its own demand: Answer the community-project question and engage with an idea. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will add a course-linked mechanism while addressing scheduling; a weaker one only names the topic or repeats a judgement. For your revision, check that the example supports learning rather than merely busyness. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-multiple-charts-stage-2",
        "taskFamily": "discussion",
        "compatibleWithSignature": "v1-a76ff447"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh academic discussion",
        "instructions": "Professor: Our university can fund either a peer-mentoring scheme for first-year students or additional drop-in advice sessions with staff. Lina favours mentors because students share practical experience. Omar prefers staff because advice must be accurate. Contribute your view, engage with at least one student, and support your position. Aim for at least 100 words.",
        "model": "I would give priority to peer mentoring, but with staff support for questions that require specialist advice. Lina makes a useful point about shared experience: a student who has recently adjusted to university can explain everyday routines in a way a formal information sheet may not. For example, a mentor could show a new student how to organise group work or find a quiet study space. Omar is right that accuracy matters, especially for course rules or financial decisions. Mentors should therefore have clear guidance about when to refer someone to staff. This arrangement would widen informal support without asking students to replace professional advisers. A small pilot could also reveal which questions most often need referral.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I choose mentoring or staff advice with a justified arrangement.",
          "Development: I develop a practical benefit and a boundary for specialist advice.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep the new contribution distinct from a peer’s original statement."
        ],
        "analysis": "Review this response against its own demand: Choose mentoring or staff advice with a justified arrangement. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will develop a practical benefit and a boundary for specialist advice; a weaker one only names the topic or repeats a judgement. For your revision, keep the new contribution distinct from a peer’s original statement. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-multiple-charts-stage-3",
        "contentVersion": 2,
        "taskFamily": "discussion",
        "compatibleWithSignature": "v2-452ab493"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-maps-processes",
  "lessonId": "band3-writing-maps-processes",
  "type": "course-activity",
  "prompt": "Writing: Write an Email—Purpose, Detail and Tone — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Write an Email—Purpose, Detail and Tone",
    "learn": "Current TOEFL Writing includes Build a Sentence, Write an Email and Write for an Academic Discussion. Write an Email requires producing an original response, not selecting a strategy answer. Address the communicative purpose, develop relevant detail and use a suitable register. The local timers and word targets support practice; they do not reproduce adaptive delivery or generate an official score.",
    "worked": {
      "example": "A request should explain the issue, provide actionable details and say what response is needed.",
      "reasoning": "A polite opening cannot compensate for an unclear purpose or omitted task point."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided task planning",
        "instructions": "Write 50–80 words planning the independent Write an Email task below. Identify the reader or discussion issue, the required points and the order you would use. Do not compose the full response yet.",
        "model": "I will write to the instructor about the broken projector in our presentation room. First I will identify the room and explain how the fault prevents us showing our slides. Next I will propose moving to a room with working equipment, with a practical alternative if that is unavailable. I will ask the instructor to confirm the arrangement before the presentation, using a courteous tone rather than announcing an unapproved change.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I plan the reader, problem, alternative and decision request.",
          "Development: I order notes so the instructor can act on the projector problem.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep the plan as preparation rather than a premature whole email."
        ],
        "analysis": "Review this planning response against its own demand: Plan the reader, problem, alternative and decision request. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will order notes so the instructor can act on the projector problem; a weaker one only names the topic or repeats a judgement. For your revision, keep the plan as preparation rather than a premature whole email. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band3-writing-maps-processes-stage-1",
        "compatibleWithSignature": "v1-f49781b0"
      },
      {
        "kind": "writing",
        "title": "Independent Write an Email",
        "instructions": "You are preparing a group presentation. The assigned room’s projector does not work. Write to your instructor: explain the problem, propose an alternative, and ask for a decision. Include enough detail for the instructor to respond. Local practice target: 120–180 words in seven minutes.",
        "model": "Dear Dr Chen,\n\nI am writing about the presentation scheduled for Thursday. Our group has completed the research, but the projector in the assigned room is not working. We tested it this morning and could not display our slides, even with a different laptop.\n\nWould it be possible to move the presentation to room 12? The room is listed as available at the same time, and its screen worked during our last seminar. If changing rooms is not possible, we can prepare printed copies of the key charts, although this would make the demonstration less clear.\n\nPlease let us know which option you prefer so that we can inform the other students and prepare the appropriate materials. We are available to test the equipment again before class if that would help.\n\nThank you for your advice.\n\nBest regards,\nSam Malik",
        "minWords": 120,
        "seconds": 420,
        "rubric": [
          "Content: I explain the faulty projector, propose an alternative and request a decision.",
          "Development: I give timing and event detail needed to evaluate the solution.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I ask for approval rather than announce an agreed replacement."
        ],
        "analysis": "Review this response against its own demand: Explain the faulty projector, propose an alternative and request a decision. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give timing and event detail needed to evaluate the solution; a weaker one only names the topic or repeats a judgement. For your revision, ask for approval rather than announce an agreed replacement. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 180,
        "id": "band3-writing-maps-processes-stage-2",
        "compatibleWithSignature": "v1-9b74b823"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh email",
        "instructions": "You organise a student photography exhibition. A room booking confirmation gives the wrong date: 18 March rather than 25 March. Email the campus events officer. Explain the error and why it matters, request the correct date or a suitable alternative, and ask how to confirm the amended booking.",
        "model": "Dear Events Officer,\n\nI am writing about the room confirmation for our student photography exhibition. Our group requested 25 March, but the confirmation lists 18 March. Several contributors will be away on that earlier date, so we could not display their work.\n\nCould you check whether the room is available on 25 March and amend the booking? If it has already been reserved, a similar space on the same afternoon would be helpful. We need room for twelve display boards and expect about thirty visitors.\n\nPlease let me know which option is possible and whether I need to submit a new form. I can send our original request immediately if that would help you locate the correct booking.\n\nKind regards,\nAlex",
        "minWords": 120,
        "seconds": 420,
        "rubric": [
          "Content: I identify the date error, its consequence and amendment request.",
          "Development: I separate requested date from the incorrect confirmation and fallback.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I ask how the amended booking will be confirmed."
        ],
        "analysis": "Review this response against its own demand: Identify the date error, its consequence and amendment request. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will separate requested date from the incorrect confirmation and fallback; a weaker one only names the topic or repeats a judgement. For your revision, ask how the amended booking will be confirmed. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-maps-processes-stage-3",
        "contentVersion": 2,
        "taskFamily": "email",
        "compatibleWithSignature": "v2-6596978a"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-task-response",
  "lessonId": "band3-writing-task-response",
  "type": "course-activity",
  "prompt": "Writing: Email Task Fulfilment and Actionable Requests — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Email Task Fulfilment and Actionable Requests",
    "learn": "Current TOEFL Writing includes Build a Sentence, Write an Email and Write for an Academic Discussion. Email task fulfilment requires producing an original response, not selecting a strategy answer. Address the communicative purpose, develop relevant detail and use a suitable register. The local timers and word targets support practice; they do not reproduce adaptive delivery or generate an official score.",
    "worked": {
      "example": "A request should explain the issue, provide actionable details and say what response is needed.",
      "reasoning": "A polite opening cannot compensate for an unclear purpose or omitted task point."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided task planning",
        "instructions": "Write 50–80 words planning the independent Email task fulfilment task below. Identify the reader or discussion issue, the required points and the order you would use. Do not compose the full response yet.",
        "model": "I will email the laboratory technician, identify my booked training and explain the compulsory-class conflict. I will ask whether another session is available rather than assume a change is approved. Then I will give specific times when I could attend, so the technician can offer a workable alternative. I will keep the explanation brief and polite, placing the scheduling request before any less relevant background about my studies.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I plan conflict, requested alternative and availability.",
          "Development: I give each required communication point a distinct role.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I avoid replacing a practical plan with a general apology."
        ],
        "analysis": "Review this planning response against its own demand: Plan conflict, requested alternative and availability. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give each required communication point a distinct role; a weaker one only names the topic or repeats a judgement. For your revision, avoid replacing a practical plan with a general apology. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band3-writing-task-response-stage-1",
        "compatibleWithSignature": "v1-f414f7ca"
      },
      {
        "kind": "writing",
        "title": "Independent Email task fulfilment",
        "instructions": "You booked laboratory training but a compulsory class now conflicts with it. Email the technician: explain the conflict, ask about another session, and state when you are available. Local practice target: 120–180 words in seven minutes.",
        "model": "Dear Laboratory Technician,\n\nI am registered for the equipment training on Tuesday afternoon, but my department has moved a compulsory seminar to the same time. I would therefore like to ask whether I can attend another session before beginning my project next week.\n\nI have completed the online safety module, and I can send the confirmation if needed. I am available on Wednesday after two and throughout Thursday morning. If neither period is possible, please let me know the next scheduled session so that I can adjust my project plan rather than use the equipment without training.\n\nCould you also confirm whether I should cancel the original booking myself? I do not want to prevent another student from using the place.\n\nThank you for helping me arrange a suitable alternative.\n\nBest regards,\nMaya Lee",
        "minWords": 120,
        "seconds": 420,
        "rubric": [
          "Content: I explain the laboratory conflict and request another session.",
          "Development: I give availability that lets the technician propose a workable time.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep availability separate from the deadline for replying."
        ],
        "analysis": "Review this response against its own demand: Explain the laboratory conflict and request another session. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give availability that lets the technician propose a workable time; a weaker one only names the topic or repeats a judgement. For your revision, keep availability separate from the deadline for replying. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 180,
        "id": "band3-writing-task-response-stage-2",
        "compatibleWithSignature": "v1-78f140fd"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh email",
        "instructions": "You signed up for a campus volunteer induction on Tuesday morning, but a required laboratory session has been moved to the same time. Email the volunteer coordinator. Explain the conflict, request another induction or an alternative arrangement, and give your availability so the coordinator can act.",
        "model": "Dear Volunteer Coordinator,\n\nThank you for reserving a place for me at Tuesday morning’s induction. My department has moved a compulsory laboratory session to the same time, so I can no longer attend as planned. I still want to join the weekend reading project and would appreciate advice on completing the induction.\n\nWould it be possible to attend another session later in the week? I am free after two on Wednesday and throughout Friday morning. If neither is suitable, I could review the introductory material in advance and arrange a short meeting to cover the safety procedures.\n\nPlease let me know whether one of these arrangements would meet the project’s requirements. I understand that I should not begin volunteering until the induction is complete.\n\nBest wishes,\nMorgan",
        "minWords": 120,
        "seconds": 420,
        "rubric": [
          "Content: I request an induction alternative and develop usable availability.",
          "Development: I explain the required-session conflict without claiming approval.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the coordinator’s next decision explicit."
        ],
        "analysis": "Review this response against its own demand: Request an induction alternative and develop usable availability. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain the required-session conflict without claiming approval; a weaker one only names the topic or repeats a judgement. For your revision, make the coordinator’s next decision explicit. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-task-response-stage-3",
        "contentVersion": 2,
        "taskFamily": "email",
        "compatibleWithSignature": "v2-db96a7ce"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-writing-formality",
  "lessonId": "band3-writing-formality",
  "type": "course-activity",
  "prompt": "Writing: Academic Discussion Development and Register — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Academic Discussion Development and Register",
    "learn": "Current TOEFL Writing includes Build a Sentence, Write an Email and Write for an Academic Discussion. Academic Discussion development requires producing an original response, not selecting a strategy answer. Address the communicative purpose, develop relevant detail and use a suitable register. The local timers and word targets support practice; they do not reproduce adaptive delivery or generate an official score.",
    "worked": {
      "example": "A request should explain the issue, provide actionable details and say what response is needed.",
      "reasoning": "A polite opening cannot compensate for an unclear purpose or omitted task point."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided task planning",
        "instructions": "Write 50–80 words planning the independent Academic Discussion development task below. Identify the reader or discussion issue, the required points and the order you would use. Do not compose the full response yet.",
        "model": "I will support a limited extension of library hours where students lack quiet study space. I will acknowledge Noah’s physical-space argument and Priya’s digital-access concern, then add a trial-and-review proposal. A student in shared housing will illustrate why online resources cannot replace a quiet room. I will qualify the recommendation with staffing and demand conditions, keeping a clear position rather than claiming one option serves everyone equally.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I plan a position on library funding and engagement with a peer.",
          "Development: I choose a new reason or application before writing the post.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I avoid treating peer names as development."
        ],
        "analysis": "Review this planning response against its own demand: Plan a position on library funding and engagement with a peer. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will choose a new reason or application before writing the post; a weaker one only names the topic or repeats a judgement. For your revision, avoid treating peer names as development. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band3-writing-formality-stage-1",
        "compatibleWithSignature": "v1-6d4b75e8"
      },
      {
        "kind": "writing",
        "title": "Independent Academic Discussion development",
        "instructions": "Professor: Should a university spend limited funds on longer library opening hours or more online resources? Noah favours longer hours for quiet study. Priya favours digital access for commuting students. Contribute an original, supported view that responds to the discussion. Aim for at least 100 words.",
        "model": "Priya’s point about commuting students is important, but I would first identify which barrier affects the largest number of users. More online resources will not solve the problem for students who lack a quiet place to work, while longer opening hours may be unhelpful if transport stops early. I would use a short survey and existing access records to compare these needs. The university could then trial one later evening alongside remote access to a small set of frequently requested materials. This would produce evidence before committing the whole budget. The choice should follow actual learning needs rather than assuming that either physical or digital access is always superior.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I recommend library hours or online resources with a supported view.",
          "Development: I connect the measure to a particular access need and trade-off.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I clarify the condition instead of claiming one route helps everyone."
        ],
        "analysis": "Review this response against its own demand: Recommend library hours or online resources with a supported view. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect the measure to a particular access need and trade-off; a weaker one only names the topic or repeats a judgement. For your revision, clarify the condition instead of claiming one route helps everyone. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-formality-stage-2",
        "taskFamily": "discussion",
        "compatibleWithSignature": "v1-9a7367c8"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh academic discussion",
        "instructions": "Professor: A university is considering replacing some large lectures with small workshops. Sara believes workshops make participation easier. Ben worries that fewer lectures would reduce access to expert explanations. What arrangement would you recommend? Engage with a viewpoint and explain your reasoning. Aim for at least 100 words.",
        "model": "I would retain a shorter expert lecture and use the remaining time for small workshops. Sara is right that students need opportunities to test their understanding rather than only listen. In a workshop, they could explain an answer to a partner and discover which step they have misunderstood. However, Ben identifies a real risk: students may struggle if they are asked to solve problems before the key concepts have been explained. A short lecture could introduce those concepts, while a prepared workshop task would require students to apply them. Tutors could collect common difficulties and pass them back to the lecturer. This would connect explanation and participation rather than make them competing priorities.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I recommend a lecture/workshop arrangement and engage with a viewpoint.",
          "Development: I explain how participation and expert explanation would be supported.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I add a mechanism rather than simply agree with both classmates."
        ],
        "analysis": "Review this response against its own demand: Recommend a lecture/workshop arrangement and engage with a viewpoint. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how participation and expert explanation would be supported; a weaker one only names the topic or repeats a judgement. For your revision, add a mechanism rather than simply agree with both classmates. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-writing-formality-stage-3",
        "contentVersion": 2,
        "taskFamily": "discussion",
        "compatibleWithSignature": "v2-33fc7583"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-practice-essay",
  "lessonId": "band3-practice-essay",
  "type": "course-activity",
  "prompt": "Writing: Timed Email and Academic Discussion Practice — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Writing: Timed Email and Academic Discussion Practice",
    "learn": "Current TOEFL Writing includes Build a Sentence, Write an Email and Write for an Academic Discussion. Timed Email and Discussion transfer requires producing an original response, not selecting a strategy answer. Address the communicative purpose, develop relevant detail and use a suitable register. The local timers and word targets support practice; they do not reproduce adaptive delivery or generate an official score.",
    "worked": {
      "example": "A request should explain the issue, provide actionable details and say what response is needed.",
      "reasoning": "A polite opening cannot compensate for an unclear purpose or omitted task point."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided task planning",
        "instructions": "Write 50–80 words planning the independent Timed Email and Discussion transfer task below. Identify the reader or discussion issue, the required points and the order you would use. Do not compose the full response yet.",
        "model": "I will recommend a partly required first-year programme with a genuine choice of electives. I will connect David’s guidance point to prerequisites, explaining how beginners might otherwise miss essential foundations. I will also address Elise’s freedom concern by preserving an exploratory elective. A practical course-selection example will show how the balance works. I will finish with an advising condition, avoiding the unsupported claim that either unrestricted choice or complete compulsion suits every student.",
        "minWords": 50,
        "seconds": 600,
        "rubric": [
          "Content: I plan the course-choice discussion with position, peer connection and development.",
          "Development: I choose an argument that answers freedom versus required guidance.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep this as a discussion plan rather than an email request."
        ],
        "analysis": "Review this planning response against its own demand: Plan the course-choice discussion with position, peer connection and development. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will choose an argument that answers freedom versus required guidance; a weaker one only names the topic or repeats a judgement. For your revision, keep this as a discussion plan rather than an email request. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 80,
        "id": "band3-practice-essay-stage-1",
        "compatibleWithSignature": "v1-a68f586b"
      },
      {
        "kind": "writing",
        "title": "Independent Timed Email and Discussion transfer",
        "instructions": "Professor: Should first-year students choose all their courses, or follow a partly required programme? Elise favours freedom; David argues that beginners need guidance. Contribute your position and engage with at least one viewpoint. Aim for at least 100 words.",
        "model": "I support a partly required programme because first-year students may not yet know which foundations later courses assume. David is right that guidance can prevent choices that close useful opportunities. However, Elise’s concern about motivation also matters: students should have room to explore a subject that interests them. A small required core combined with several elective options would balance these needs. Advisers could explain the purpose of each requirement rather than presenting it as an arbitrary restriction. After the first year, students would have more experience on which to base independent choices. This approach provides support without treating all learners as if they have identical goals.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I give a course-choice position and develop a peer-related contribution.",
          "Development: I explain how the programme balances guidance and exploration.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I retain a clear recommendation after the qualification."
        ],
        "analysis": "Review this response against its own demand: Give a course-choice position and develop a peer-related contribution. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain how the programme balances guidance and exploration; a weaker one only names the topic or repeats a judgement. For your revision, retain a clear recommendation after the qualification. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 180,
        "id": "band3-practice-essay-stage-2",
        "taskFamily": "discussion",
        "compatibleWithSignature": "v1-305b3f2d"
      },
      {
        "kind": "writing",
        "title": "Assessment: a fresh email",
        "instructions": "You are helping organise a campus careers event. A guest speaker has asked for an online connection, but the assigned room has no video-call equipment. Email the careers adviser. Explain the difficulty, propose a practical solution, and request a decision before you contact the speaker. Local practice target: 120–180 words in seven minutes.",
        "model": "Dear Careers Adviser,\n\nI am contacting you about Thursday’s careers event. Our guest speaker has asked to join online because her train has been cancelled. Unfortunately, Room 14 has no camera or speakers suitable for a video call, so the current arrangement will not allow the audience to hear her properly.\n\nCould we move the session to the language laboratory? It has the necessary equipment and is free after three, according to the booking calendar. I could help test the connection with the technician before the event. If that room cannot be reserved, another option would be to hold the interview online and send students a joining link.\n\nPlease let me know which arrangement you approve by tomorrow afternoon. I will wait for your decision before confirming anything with the speaker.\n\nKind regards,\nJamie",
        "minWords": 120,
        "seconds": 420,
        "rubric": [
          "Content: I explain the missing video equipment, solution and decision request.",
          "Development: I make the arrangement feasible before contacting the speaker.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I name what the adviser must decide and when."
        ],
        "analysis": "Review this response against its own demand: Explain the missing video equipment, solution and decision request. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the arrangement feasible before contacting the speaker; a weaker one only names the topic or repeats a judgement. For your revision, name what the adviser must decide and when. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band3-practice-essay-stage-3",
        "contentVersion": 2,
        "taskFamily": "email",
        "compatibleWithSignature": "v2-4abfe900"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-speaking-part3",
  "lessonId": "band3-speaking-part3",
  "type": "course-activity",
  "prompt": "Speaking: Listen and Repeat—Accuracy and Meaning Groups — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Speaking: Listen and Repeat—Accuracy and Meaning Groups",
    "learn": "Listen and Repeat requires reproducing the sentence you hear, preserving words and order. Listen for meaning groups, then speak clearly without adding an explanation. The independent set contains seven original sentences of increasing length. Lesson mode allows replay and retry; it is not an official scored test. Compare the recording with the revealed wording only after your first attempt.",
    "worked": {
      "example": "Heard: “The form must be signed before submission.” Repeat the complete sentence without changing must to may.",
      "reasoning": "A small modal substitution can change the requirement. Accuracy includes meaning as well as intelligibility."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided repetition",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-040.wav",
            "transcript": "The library opens at eight.",
            "model": "The library opens at eight."
          },
          {
            "audioSrc": "/media/courses/course-audio-041.wav",
            "transcript": "Please bring your student card.",
            "model": "Please bring your student card."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-part3-stage-1",
        "compatibleWithSignature": "v1-7ab38dc"
      },
      {
        "kind": "speaking",
        "title": "Independent seven-sentence set",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-042.wav",
            "transcript": "The meeting will take place in the main hall.",
            "model": "The meeting will take place in the main hall."
          },
          {
            "audioSrc": "/media/courses/course-audio-043.wav",
            "transcript": "You can borrow a laptop from the service desk.",
            "model": "You can borrow a laptop from the service desk."
          },
          {
            "audioSrc": "/media/courses/course-audio-044.wav",
            "transcript": "The new timetable is available on the course website.",
            "model": "The new timetable is available on the course website."
          },
          {
            "audioSrc": "/media/courses/course-audio-045.wav",
            "transcript": "Students should arrive before the safety demonstration begins.",
            "model": "Students should arrive before the safety demonstration begins."
          },
          {
            "audioSrc": "/media/courses/course-audio-046.wav",
            "transcript": "The adviser explained how to complete the application form.",
            "model": "The adviser explained how to complete the application form."
          },
          {
            "audioSrc": "/media/courses/course-audio-047.wav",
            "transcript": "Although the room is small, it has everything we need.",
            "model": "Although the room is small, it has everything we need."
          },
          {
            "audioSrc": "/media/courses/course-audio-048.wav",
            "transcript": "Please check whether your booking has been confirmed before travelling.",
            "model": "Please check whether your booking has been confirmed before travelling."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-part3-stage-2",
        "compatibleWithSignature": "v1-27d8edbc"
      },
      {
        "kind": "speaking",
        "title": "Transfer repetition assessment",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-049.wav",
            "transcript": "The workshop has been moved to Friday.",
            "model": "The workshop has been moved to Friday."
          },
          {
            "audioSrc": "/media/courses/course-audio-050.wav",
            "transcript": "We will send a reminder after registration closes.",
            "model": "We will send a reminder after registration closes."
          },
          {
            "audioSrc": "/media/courses/course-audio-051.wav",
            "transcript": "If you need an accessible room, contact the organiser in advance.",
            "model": "If you need an accessible room, contact the organiser in advance."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-part3-stage-3",
        "compatibleWithSignature": "v1-a1ed4b6d"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-speaking-toefl4",
  "lessonId": "band3-speaking-toefl4",
  "type": "course-activity",
  "prompt": "Speaking: Listen and Repeat—Longer Clauses and Precision — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Speaking: Listen and Repeat—Longer Clauses and Precision",
    "learn": "Listen and Repeat requires reproducing the sentence you hear, preserving words and order. Listen for meaning groups, then speak clearly without adding an explanation. The independent set contains seven original sentences of increasing length. Lesson mode allows replay and retry; it is not an official scored test. Compare the recording with the revealed wording only after your first attempt.",
    "worked": {
      "example": "Heard: “The form must be signed before submission.” Repeat the complete sentence without changing must to may.",
      "reasoning": "A small modal substitution can change the requirement. Accuracy includes meaning as well as intelligibility."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided repetition",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-052.wav",
            "transcript": "The laboratory equipment must be checked regularly.",
            "model": "The laboratory equipment must be checked regularly."
          },
          {
            "audioSrc": "/media/courses/course-audio-053.wav",
            "transcript": "A confirmation message will arrive shortly.",
            "model": "A confirmation message will arrive shortly."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-toefl4-stage-1",
        "compatibleWithSignature": "v1-6026c2f0"
      },
      {
        "kind": "speaking",
        "title": "Independent seven-sentence set",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-054.wav",
            "transcript": "The students discussed the proposal before making a decision.",
            "model": "The students discussed the proposal before making a decision."
          },
          {
            "audioSrc": "/media/courses/course-audio-055.wav",
            "transcript": "You should save a copy of your work before leaving.",
            "model": "You should save a copy of your work before leaving."
          },
          {
            "audioSrc": "/media/courses/course-audio-056.wav",
            "transcript": "The exhibition includes objects collected from several local communities.",
            "model": "The exhibition includes objects collected from several local communities."
          },
          {
            "audioSrc": "/media/courses/course-audio-057.wav",
            "transcript": "Because the weather has changed, the field visit may be delayed.",
            "model": "Because the weather has changed, the field visit may be delayed."
          },
          {
            "audioSrc": "/media/courses/course-audio-058.wav",
            "transcript": "The report explains why the first experiment did not answer the question.",
            "model": "The report explains why the first experiment did not answer the question."
          },
          {
            "audioSrc": "/media/courses/course-audio-059.wav",
            "transcript": "If the article is unavailable online, ask the librarian for assistance.",
            "model": "If the article is unavailable online, ask the librarian for assistance."
          },
          {
            "audioSrc": "/media/courses/course-audio-060.wav",
            "transcript": "Although the results were encouraging, the researchers recommended a longer trial.",
            "model": "Although the results were encouraging, the researchers recommended a longer trial."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-toefl4-stage-2",
        "compatibleWithSignature": "v1-4c82ef5a"
      },
      {
        "kind": "speaking",
        "title": "Transfer repetition assessment",
        "instructions": "Listen to each sentence, then record it as accurately as you can. Use the prompt navigation to complete the whole set. Compare omissions, substitutions and word order after recording.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-061.wav",
            "transcript": "The revised plan addresses the main concern.",
            "model": "The revised plan addresses the main concern."
          },
          {
            "audioSrc": "/media/courses/course-audio-062.wav",
            "transcript": "We need to know whether the equipment is available.",
            "model": "We need to know whether the equipment is available."
          },
          {
            "audioSrc": "/media/courses/course-audio-063.wav",
            "transcript": "After completing the training, students can reserve the room independently.",
            "model": "After completing the training, students can reserve the room independently."
          }
        ],
        "seconds": 30,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "For each prompt, compare the original sentence with your actual recording. First mark omitted, substituted, added or reordered words. Then listen for a key ending, preposition or condition that became unclear. Similar meaning is insufficient for exact repetition, and a reason or personal example should not be added. Rehearse the difficult group, place it back in the complete sentence and test new audio. The model transcribes the intended wording; it does not automatically assess your pronunciation or award an official score.",
        "rubric": [
          "Wording: I compared every response with its heard sentence for omissions, substitutions and added words.",
          "Order and grammar: I retained articles, negation, endings and the original sequence, including any restriction or time clause.",
          "Intelligibility: I replayed actual speech and checked whether a listener could recover the key words and small grammatical contrasts.",
          "Revision: I repaired one difficult phrase, then tested a different heard sentence; reading a transcript alone leaves auditory retention unassessed."
        ],
        "id": "band3-speaking-toefl4-stage-3",
        "compatibleWithSignature": "v1-5f1a020f"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-speaking-opinions",
  "lessonId": "band3-speaking-opinions",
  "type": "course-activity",
  "prompt": "Speaking: Take an Interview—Relevant Developed Answers — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Speaking: Take an Interview—Relevant Developed Answers",
    "learn": "Take an Interview asks for relevant spoken responses to recorded questions. Answer directly, develop a reason or example and use clear phrasing. The independent practice contains four original questions. There is no preparation countdown in these local interview tasks. The response timer supports rehearsal and does not create an official score.",
    "worked": {
      "example": "A useful comparison explains which option suits which purpose rather than declaring one universally better.",
      "reasoning": "A condition and a specific example demonstrate reasoning without requiring specialised knowledge."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided interview",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-064.wav",
            "transcript": "What do you enjoy about learning a new skill?",
            "model": "I enjoy noticing a small improvement after practice. When I learned basic cooking, preparing one meal successfully made the instructions feel useful rather than abstract."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to answer the heard skill-learning question with a developed reason. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I answer the heard skill-learning question with a developed reason.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-speaking-opinions-stage-1",
        "compatibleWithSignature": "v1-16aac302"
      },
      {
        "kind": "speaking",
        "title": "Independent four-question interview",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-065.wav",
            "transcript": "Describe a place where you prefer to study.",
            "model": "I prefer a quiet table in the library because there are fewer interruptions. I can still ask for help when needed, but I am less tempted to leave a difficult task unfinished."
          },
          {
            "audioSrc": "/media/courses/course-audio-066.wav",
            "transcript": "Do you learn better alone or with other people?",
            "model": "It depends on the task. I like reading difficult material alone first, then discussing questions with classmates. Explaining an idea to another person helps me notice what I have not understood."
          },
          {
            "audioSrc": "/media/courses/course-audio-067.wav",
            "transcript": "What would improve your college experience?",
            "model": "More bookable group rooms would help. Our teams often need to compare work aloud, and doing that beside silent readers creates frustration. A clear booking system would make access fairer."
          },
          {
            "audioSrc": "/media/courses/course-audio-068.wav",
            "transcript": "Why is it useful to try unfamiliar activities?",
            "model": "An unfamiliar activity can reveal interests or abilities we did not expect. It also reminds us how beginners feel, which can make us more patient when helping someone else learn."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to complete each of the four interview prompts with relevant development. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I complete each of the four interview prompts with relevant development.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-speaking-opinions-stage-2",
        "compatibleWithSignature": "v1-170d4431"
      },
      {
        "kind": "speaking",
        "title": "Transfer interview assessment",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-069.wav",
            "transcript": "Should students take part in community projects?",
            "model": "They can benefit when a project connects with a real learning goal. For example, collecting local history stories develops interviewing and evidence skills. Participation should be organised accessibly rather than relying only on free evenings."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to use a fresh supported example for the community-project judgement. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I use a fresh supported example for the community-project judgement.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-speaking-opinions-stage-3",
        "compatibleWithSignature": "v1-4cfd57dd"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-paraphrasing",
  "lessonId": "band3-paraphrasing",
  "type": "course-activity",
  "prompt": "Speaking: Interview Comparison and Precise Paraphrasing — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "Speaking: Interview Comparison and Precise Paraphrasing",
    "learn": "Take an Interview asks for relevant spoken responses to recorded questions. Answer directly, develop a reason or example and use clear phrasing. The independent practice contains four original questions. There is no preparation countdown in these local interview tasks. The response timer supports rehearsal and does not create an official score.",
    "worked": {
      "example": "A useful comparison explains which option suits which purpose rather than declaring one universally better.",
      "reasoning": "A condition and a specific example demonstrate reasoning without requiring specialised knowledge."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided interview",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-070.wav",
            "transcript": "Would you prefer a practical workshop or an online tutorial?",
            "model": "For a physical skill I would choose a workshop because someone can notice a mistake before it becomes a habit. An online tutorial is useful later when I need to review the steps."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to answer the heard comparison demand on a shared dimension. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I answer the heard comparison demand on a shared dimension.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-paraphrasing-stage-1",
        "compatibleWithSignature": "v1-642024a"
      },
      {
        "kind": "speaking",
        "title": "Independent four-question interview",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-071.wav",
            "transcript": "Compare learning from a book with learning from a demonstration.",
            "model": "A book lets me work at my own pace and return to a detailed explanation. A demonstration makes movement and sequence easier to understand. I would often combine them rather than assume one is always better."
          },
          {
            "audioSrc": "/media/courses/course-audio-072.wav",
            "transcript": "Should public services keep both online and in-person access?",
            "model": "Usually yes, because people face different barriers. Online access can save travel, while an in-person option helps someone who needs clarification. The balance should follow actual demand and the importance of the service."
          },
          {
            "audioSrc": "/media/courses/course-audio-073.wav",
            "transcript": "What makes a group project fair?",
            "model": "A fair project has clear responsibilities and a way to review contributions. Equal amounts of visible speaking do not necessarily mean equal work, so the group should also record research and preparation."
          },
          {
            "audioSrc": "/media/courses/course-audio-074.wav",
            "transcript": "Is speed always a useful measure of learning?",
            "model": "No. Speed can matter in a timed task, but quick completion may hide guessing or shallow understanding. I would also ask whether the learner can explain the answer and apply the skill in a new situation."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to complete all four prompts without replacing their demands with a prepared speech. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I complete all four prompts without replacing their demands with a prepared speech.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-paraphrasing-stage-2",
        "compatibleWithSignature": "v1-717c8146"
      },
      {
        "kind": "speaking",
        "title": "Transfer interview assessment",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-075.wav",
            "transcript": "How can feedback be both encouraging and accurate?",
            "model": "It should identify a real strength and a specific next step. Saying that everything is excellent gives little direction, while listing errors without explaining priorities can overwhelm the learner."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to use a fresh preference and experience, preserving what the question asks. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I use a fresh preference and experience, preserving what the question asks.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-paraphrasing-stage-3",
        "compatibleWithSignature": "v1-107bd634"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band3-review",
  "lessonId": "band3-review",
  "type": "course-activity",
  "prompt": "TOEFL iBT 2026: Format, Score Terminology and Study Review — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "TOEFL iBT 2026",
    "objective": "TOEFL iBT 2026: Format, Score Terminology and Study Review",
    "learn": "TOEFL iBT 2026 reports section and overall results on a 1–6 scale. A comparable overall 0–120 result is provided during the transition described by ETS. This non-adaptive course does not model the official routing or equate local answers with a score. Review your evidence across reading, listening, sentence building, practical writing and spoken responses.",
    "worked": {
      "example": "Completing seven repetition prompts records rehearsal, not a pronunciation score.",
      "reasoning": "A recording and self-review provide useful evidence, but official scoring requires a validated assessment process."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided format and evidence check",
        "instructions": "Distinguish the response evidence actually present from the skills or official scores it cannot establish. Use the stated practice record only. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A learner completed one short listening set, an email draft and a recorded interview. The activities were original, non-adaptive practice. No validated scoring model or live examiner was used.",
        "questions": [
          {
            "prompt": "What conclusion is supported?",
            "answers": [
              "The learner has practice responses to review."
            ],
            "evidence": "The evidence consists of practice responses.",
            "explanation": "Completed practice produces responses that can be reviewed. It does not calibrate a TOEFL result or establish a skill whose necessary audio or speech evidence is absent.",
            "options": [
              "The learner has practice responses to review.",
              "The learner has an official 6.0 score.",
              "The learner is guaranteed admission.",
              "The learner has completed an adaptive test."
            ],
            "id": "q1"
          }
        ],
        "seconds": 600,
        "id": "band3-review-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "writing",
        "title": "Independent evidence-based plan",
        "instructions": "Write 100–140 words identifying one practical writing issue and one speaking issue from earlier activities. Give a specific revision action for each.",
        "model": "In my email, I explained the problem but did not say when I needed a response. I will add a clear request and enough timing information for the recipient to act. In the interview, I repeated a general opinion instead of developing it. I will record a second answer using one concrete example and remove the repeated sentence. To judge improvement, I will check whether a reader can identify the requested action and whether a listener can follow the reason without guessing. These are local review criteria, not a conversion to the TOEFL scale. I will then test the same targets in a new email situation and a different interview question, keeping both recordings and drafts for comparison.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I identify one actual writing and one actual speaking issue.",
          "Development: I give a separate revision and fresh test for each evidence type.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I retain drafts and recordings instead of converting completion to a score."
        ],
        "analysis": "Review this planning response against its own demand: Identify one actual writing and one actual speaking issue. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give a separate revision and fresh test for each evidence type; a weaker one only names the topic or repeats a judgement. For your revision, retain drafts and recordings instead of converting completion to a score. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 140,
        "id": "band3-review-stage-2",
        "compatibleWithSignature": "v1-c6f9c0d9"
      },
      {
        "kind": "speaking",
        "title": "Assessment: fresh interview",
        "instructions": "Listen to each interview question and record a relevant answer. Use the prompt navigation to complete the set. The 45-second response timer is a local rehearsal target.",
        "spokenItems": [
          {
            "audioSrc": "/media/courses/course-audio-076.wav",
            "transcript": "How would you decide which learning activity to practise next?",
            "model": "I would look for a recurring difficulty in my recent responses, then choose an activity that requires that skill. If I keep missing corrected details in audio, reading more strategy notes would not be enough; I would need fresh recordings and evidence-based review."
          }
        ],
        "seconds": 45,
        "model": "Review each prompt and response above. Re-record the item where the meaning or wording was least clear.",
        "analysis": "Use the actual recording to answer the heard interview demand using an actual response or clearly identified missing evidence. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "rubric": [
          "Relevance: I answer the heard interview demand using an actual response or clearly identified missing evidence.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "id": "band3-review-stage-3",
        "compatibleWithSignature": "v1-e5f7b48c"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-listening-accents",
  "lessonId": "band4-listening-accents",
  "type": "course-activity",
  "prompt": "Listening: connected speech and careful detail — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Listening: connected speech and careful detail",
    "learn": "IELTS Listening is shared by Academic and General Training. Listen for the final decision, the scope of a claim and the speaker’s attitude. A contrast can revise an earlier expectation. These original synthetic recordings practise meaning and detail; they do not claim to reproduce a range of difficult regional accents or a full 40-question paper. Replay is available for learning, and transcript review follows submission.",
    "worked": {
      "example": "“The shop stays open until six, but the collection desk closes at four.” → collection deadline: four.",
      "reasoning": "The two times refer to different services, so choosing the later one would ignore the restriction."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided correction",
        "instructions": "For the first recording, make empty notes for heard time or amount / service / customer category. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-077.wav",
          "transcript": "Caller. I need to collect the keys at a quarter to six. Agent. We close at half past five, so please come by five fifteen. Caller. All right, five fifteen. I will bring the signed agreement.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What collection time is agreed?",
            "answers": [
              "5:15",
              "five fifteen"
            ],
            "evidence": "All right, five fifteen.",
            "explanation": "The source supports this answer: All right, five fifteen.",
            "maxWords": 2,
            "id": "q1",
            "punctuation": "terminal"
          }
        ],
        "id": "band4-listening-accents-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent workplace induction",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-078.wav",
          "transcript": "Welcome to the distribution centre. Your first shift begins at seven, but arrive at six forty-five tomorrow for the induction. Use the staff entrance on the west side, not the loading gate. We will issue a locker key and a visitor badge at reception. Please bring proof of address; your identity document has already been checked. Safety shoes are required on the floor. If you have not received yours, tell the supervisor before entering the work area. The first session covers emergency procedures, followed by a tour. Training on the scanning equipment will take place after lunch. Do not begin that task simply because you have used a similar device elsewhere; our system has a different checking process.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Arrival time for induction",
            "answers": [
              "6:45",
              "six forty-five"
            ],
            "evidence": "Arrive at six forty-five.",
            "explanation": "The source supports this answer: Arrive at six forty-five.",
            "maxWords": 2,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Use the ___ entrance.",
            "answers": [
              "staff"
            ],
            "evidence": "Use the staff entrance.",
            "explanation": "The source supports this answer: Use the staff entrance.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "What document should be brought?",
            "answers": [
              "proof of address"
            ],
            "evidence": "Please bring proof of address.",
            "explanation": "The source supports this answer: Please bring proof of address.",
            "maxWords": 3,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "What training is after lunch?",
            "answers": [
              "scanning equipment"
            ],
            "evidence": "Training on the scanning equipment takes place after lunch.",
            "explanation": "The source supports this answer: Training on the scanning equipment takes place after lunch.",
            "maxWords": 2,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "id": "q5",
            "prompt": "Match induction arrival to its scheduled time.",
            "answers": [
              "A · Before the first shift"
            ],
            "explanation": "The shift starts at seven; induction arrival is six forty-five.",
            "evidence": "The shift starts at seven; induction arrival is six forty-five.",
            "punctuation": "terminal",
            "options": [
              "A · Before the first shift",
              "B · In the first session",
              "C · After lunch",
              "D · At the end of the week"
            ]
          },
          {
            "id": "q6",
            "prompt": "Match emergency procedures to its scheduled time.",
            "answers": [
              "B · In the first session"
            ],
            "explanation": "The first session covers emergency procedures.",
            "evidence": "The first session covers emergency procedures.",
            "punctuation": "terminal",
            "options": [
              "A · Before the first shift",
              "B · In the first session",
              "C · After lunch",
              "D · At the end of the week"
            ]
          },
          {
            "id": "q7",
            "prompt": "Match scanning-equipment training to its scheduled time.",
            "answers": [
              "C · After lunch"
            ],
            "explanation": "Training on the scanning equipment takes place after lunch.",
            "evidence": "Training on the scanning equipment takes place after lunch.",
            "punctuation": "terminal",
            "options": [
              "A · Before the first shift",
              "B · In the first session",
              "C · After lunch",
              "D · At the end of the week"
            ]
          }
        ],
        "id": "band4-listening-accents-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment: a changed appointment",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-079.wav",
          "transcript": "The maintenance visit was originally booked for Wednesday morning. The engineer is now available on Thursday after two. You do not need to remain at home all afternoon: a message will be sent thirty minutes before arrival. Please keep the area around the boiler clear and leave the previous inspection certificate on the kitchen table.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Which day is now booked?",
            "answers": [
              "Thursday"
            ],
            "evidence": "Now available on Thursday.",
            "explanation": "The source supports this answer: Now available on Thursday.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How many minutes before arrival will a message be sent?",
            "answers": [
              "30",
              "thirty"
            ],
            "evidence": "Thirty minutes before arrival.",
            "explanation": "The source supports this answer: Thirty minutes before arrival.",
            "maxWords": 1,
            "id": "q2",
            "punctuation": "terminal"
          }
        ],
        "id": "band4-listening-accents-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-listening-inference",
  "lessonId": "band4-listening-inference",
  "type": "course-activity",
  "prompt": "Listening: inference and qualified attitudes — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Listening: inference and qualified attitudes",
    "learn": "IELTS Listening is shared by Academic and General Training. Listen for the final decision, the scope of a claim and the speaker’s attitude. A contrast can revise an earlier expectation. These original synthetic recordings practise meaning and detail; they do not claim to reproduce a range of difficult regional accents or a full 40-question paper. Replay is available for learning, and transcript review follows submission.",
    "worked": {
      "example": "“The shop stays open until six, but the collection desk closes at four.” → collection deadline: four.",
      "reasoning": "The two times refer to different services, so choosing the later one would ignore the restriction."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided attitude",
        "instructions": "For the first recording, make empty notes for expectation / evaluation / qualification. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-080.wav",
          "transcript": "I thought the training would repeat things I already knew. In fact, the practical examples showed me several mistakes I had been making. I would have liked more time for questions, but I am glad I attended.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What is the overall attitude?",
            "answers": [
              "Positive with a reservation"
            ],
            "evidence": "Glad I attended, but wanted more question time.",
            "explanation": "The source supports this answer: Glad I attended, but wanted more question time.",
            "options": [
              "Entirely negative",
              "Positive with a reservation",
              "Indifferent",
              "Certain the course was unnecessary"
            ],
            "id": "q1"
          }
        ],
        "id": "band4-listening-inference-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent discussion",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-081.wav",
          "transcript": "Tutor. How did the interviews for your workplace study go? Student. We spoke to an employee about the trial of flexible shifts. She said it went better than expected because she could collect her son from school twice a week. Tutor. Did she report any difficulties? Student. The first rota changed after people had already made plans, which was frustrating. Once the team agreed a deadline for changes, it became more predictable. Tutor. Would she keep the arrangement? Student. Yes, provided the notice period remained clear. She did not want flexibility to mean being available at any moment. It should give staff more control, rather than move all the uncertainty onto them. Tutor. How will you present that finding? Student. We will distinguish her positive experience from the condition that made it work. One interview cannot establish whether every team can access the option fairly.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "Why was the first rota frustrating?",
            "answers": [
              "It changed after people made plans"
            ],
            "evidence": "Changed after people had already made plans.",
            "explanation": "The source supports this answer: Changed after people had already made plans.",
            "options": [
              "It never allowed leave",
              "It changed after people made plans",
              "It removed all school collection",
              "It was written in another language"
            ],
            "id": "q1"
          },
          {
            "prompt": "What condition supports the employee’s approval?",
            "answers": [
              "A clear notice period"
            ],
            "evidence": "Provided the notice period remains clear.",
            "explanation": "The source supports this answer: Provided the notice period remains clear.",
            "options": [
              "Unlimited last-minute changes",
              "A clear notice period",
              "No review of fairness",
              "Every worker must use the same hours"
            ],
            "id": "q2"
          },
          {
            "prompt": "What concern is implied?",
            "answers": [
              "Flexibility could transfer uncertainty to staff"
            ],
            "evidence": "Not move all the uncertainty onto them.",
            "explanation": "The source supports this answer: Not move all the uncertainty onto them.",
            "options": [
              "All workers dislike change",
              "The trial has failed completely",
              "Flexibility could transfer uncertainty to staff",
              "The manager wants to close the workplace"
            ],
            "id": "q3"
          }
        ],
        "id": "band4-listening-inference-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment: a new speaker",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-082.wav",
          "transcript": "The guide knew the area extremely well, and I enjoyed the stories. I am less sure about recommending the walk to families with very young children, because several paths were steep. For adults who are comfortable walking, though, it was excellent.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Who is the recommendation mainly for?",
            "answers": [
              "Adults comfortable with walking"
            ],
            "evidence": "For adults who are comfortable walking it was excellent.",
            "explanation": "The source supports this answer: For adults who are comfortable walking it was excellent.",
            "options": [
              "All families regardless of age",
              "Adults comfortable with walking",
              "People unable to use steep paths",
              "Only professional climbers"
            ],
            "id": "q1"
          }
        ],
        "id": "band4-listening-inference-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-listening-distractors",
  "lessonId": "band4-listening-distractors",
  "type": "course-activity",
  "prompt": "Listening: distractors and final decisions — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Listening: distractors and final decisions",
    "learn": "IELTS Listening is shared by Academic and General Training. Listen for the final decision, the scope of a claim and the speaker’s attitude. A contrast can revise an earlier expectation. These original synthetic recordings practise meaning and detail; they do not claim to reproduce a range of difficult regional accents or a full 40-question paper. Replay is available for learning, and transcript review follows submission.",
    "worked": {
      "example": "“The shop stays open until six, but the collection desk closes at four.” → collection deadline: four.",
      "reasoning": "The two times refer to different services, so choosing the later one would ignore the restriction."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided changed plan",
        "instructions": "For the first recording, make empty notes for proposal / rejected option / accepted or unresolved arrangement. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-083.wav",
          "transcript": "We considered holding the event outdoors, but the forecast is uncertain. The hall is available, and we have now confirmed it. The garden will be used only if the weather improves during the afternoon.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What is confirmed?",
            "answers": [
              "The hall"
            ],
            "evidence": "We have now confirmed the hall.",
            "explanation": "The source supports this answer: We have now confirmed the hall.",
            "options": [
              "The garden",
              "The hall",
              "Cancellation",
              "A new date"
            ],
            "id": "q1"
          }
        ],
        "id": "band4-listening-distractors-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Independent service conversation",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-084.wav",
          "transcript": "Customer. I asked for delivery on Friday, but the message says Monday. Adviser. Friday was the estimated dispatch date, not the delivery date. The order will leave the warehouse then and should arrive on Monday. Customer. I need it for an event on Sunday. Could I collect it instead? Adviser. Collection is possible from Saturday morning. We can refund the delivery charge if you choose that option. Customer. Yes, please change it to collection. Adviser. I have done that. Bring the order number and photo identification. The collection desk closes at four on Saturday, although the shop remains open until six. Customer. Thank you. I will come before four.",
          "label": "Original synthetic dialogue · Daniel and Samantha · EnglishCamp text."
        },
        "questions": [
          {
            "prompt": "What did Friday refer to?",
            "answers": [
              "Dispatch"
            ],
            "evidence": "Friday was the estimated dispatch date.",
            "explanation": "The source supports this answer: Friday was the estimated dispatch date.",
            "options": [
              "Delivery",
              "Dispatch",
              "The event",
              "The refund deadline"
            ],
            "id": "q1"
          },
          {
            "prompt": "What does the customer finally choose?",
            "answers": [
              "Collection"
            ],
            "evidence": "Please change it to collection.",
            "explanation": "The source supports this answer: Please change it to collection.",
            "options": [
              "Monday delivery",
              "Collection",
              "Cancellation",
              "Sunday delivery"
            ],
            "id": "q2"
          },
          {
            "prompt": "When does the collection desk close?",
            "answers": [
              "four"
            ],
            "evidence": "The collection desk closes at four.",
            "explanation": "The source supports this answer: The collection desk closes at four.",
            "maxWords": 1,
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "What will be refunded?",
            "answers": [
              "delivery charge"
            ],
            "evidence": "We can refund the delivery charge.",
            "explanation": "The source supports this answer: We can refund the delivery charge.",
            "maxWords": 2,
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "id": "q5",
            "prompt": "Select the TWO items the customer must bring for collection.",
            "answers": [
              "Order number",
              "Photo identification"
            ],
            "explanation": "The adviser asks for the order number and photo identification, not a new ticket or a printed delivery invoice.",
            "evidence": "The adviser asks for the order number and photo identification, not a new ticket or a printed delivery invoice.",
            "punctuation": "terminal",
            "options": [
              "Printed delivery invoice",
              "Order number",
              "New delivery ticket",
              "Photo identification",
              "Membership card"
            ],
            "selectCount": 2
          }
        ],
        "id": "band4-listening-distractors-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "listening",
        "title": "Assessment: booking conditions",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-085.wav",
          "transcript": "The standard ticket includes entry to the exhibition but not the workshop. Members can attend the workshop without paying an additional fee, although they still need to reserve a place. A membership card alone will not secure a seat because the room has limited capacity.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What must members still do?",
            "answers": [
              "Reserve a place"
            ],
            "evidence": "They still need to reserve a place.",
            "explanation": "The source supports this answer: They still need to reserve a place.",
            "options": [
              "Pay an additional fee",
              "Reserve a place",
              "Buy a standard ticket",
              "Bring their own chair"
            ],
            "id": "q1"
          }
        ],
        "id": "band4-listening-distractors-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-mock-ielts-listening",
  "lessonId": "band4-mock-ielts-listening",
  "type": "course-activity",
  "prompt": "Listening: a mixed lesson checkpoint — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Listening: a mixed lesson checkpoint",
    "learn": "IELTS Listening is shared by Academic and General Training. Listen for the final decision, the scope of a claim and the speaker’s attitude. A contrast can revise an earlier expectation. These original synthetic recordings practise meaning and detail; they do not claim to reproduce a range of difficult regional accents or a full 40-question paper. Replay is available for learning, and transcript review follows submission.",
    "worked": {
      "example": "“The shop stays open until six, but the collection desk closes at four.” → collection deadline: four.",
      "reasoning": "The two times refer to different services, so choosing the later one would ignore the restriction."
    },
    "tasks": [
      {
        "kind": "listening",
        "title": "Guided checkpoint: hours and plan labelling",
        "instructions": "For the first recording, make empty notes for plan orientation or explanatory hierarchy, according to the question. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/recovery-gt-plan.wav",
          "transcript": "The community centre opens at nine on weekdays and ten on Saturdays. The advice desk closes an hour before the building. For a Saturday advice appointment, arrive before three; the building itself closes at four. Now look at the plan, with north at the top and the entrance at the bottom. Walk north along the central corridor. The advice room is on your left, on the west side. Opposite it, on the east side, is the training room. Continue north to reach the waiting area at the end of the corridor. The café is in the north-west corner, behind the advice room. Please wait in the waiting area until someone calls you.",
          "label": "Original synthetic speech · Daniel · EnglishCamp plan-labelling lesson."
        },
        "questions": [
          {
            "prompt": "Latest arrival time for Saturday advice",
            "answers": [
              "three",
              "3"
            ],
            "evidence": "Arrive before three.",
            "explanation": "The source supports this answer: Arrive before three.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "id": "plan-A",
            "prompt": "Label A on the plan. Use no more than TWO words.",
            "answers": [
              "advice room"
            ],
            "explanation": "The advice room is west of the corridor.",
            "evidence": "The advice room is west of the corridor.",
            "punctuation": "terminal",
            "maxWords": 2
          },
          {
            "id": "plan-B",
            "prompt": "Label B on the plan. Use no more than TWO words.",
            "answers": [
              "training room"
            ],
            "explanation": "The training room is opposite, to the east.",
            "evidence": "The training room is opposite, to the east.",
            "punctuation": "terminal",
            "maxWords": 2
          },
          {
            "id": "plan-C",
            "prompt": "Label C on the plan. Use no more than TWO words.",
            "answers": [
              "waiting area"
            ],
            "explanation": "The waiting area is at the north end of the corridor.",
            "evidence": "The waiting area is at the north end of the corridor.",
            "punctuation": "terminal",
            "maxWords": 2
          }
        ],
        "id": "band4-mock-ielts-listening-stage-1",
        "contentVersion": 3,
        "visual": {
          "src": "/media/courses/recovery-gt-plan.svg",
          "alt": "Unlabelled centre plan with north at the top and entrance at the bottom. A is west of the central corridor; B is opposite A to the east; C is at the north end; D is in the north-west corner. The room names must be supplied from the recording.",
          "description": "Original Listening plan. Supply the room names at A, B and C using the recording; the diagram gives positions, not answers."
        }
      },
      {
        "kind": "listening",
        "title": "Independent academic talk",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-087.wav",
          "transcript": "When organisations measure service quality, they often begin with satisfaction surveys. These can reveal useful experiences, but their interpretation depends on who responds. People who complete a service successfully may be more willing to answer than those who abandoned it. A high satisfaction figure can therefore coexist with serious access problems. One way to investigate this is to record where users leave a process and ask a sample of non-completers about the difficulty. The aim is not to dismiss positive feedback, but to place it alongside evidence from people whose experience is less visible. Evaluators should also distinguish a polite interaction from a successful outcome. A staff member may be helpful even when the procedure prevents a person from obtaining what they need.",
          "label": "Original synthetic speech · Samantha · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "Whose experience may be less visible?",
            "answers": [
              "non-completers"
            ],
            "evidence": "People who abandoned the service may not respond.",
            "explanation": "The source supports this answer: People who abandoned the service may not respond.",
            "maxWords": 1,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should evaluators record?",
            "answers": [
              "Where users leave the process"
            ],
            "evidence": "Record where users leave a process.",
            "explanation": "The source supports this answer: Record where users leave a process.",
            "options": [
              "Only completed surveys",
              "Where users leave the process",
              "Only staff opinions",
              "The age of every visitor"
            ],
            "id": "q2"
          },
          {
            "prompt": "Which distinction is emphasised?",
            "answers": [
              "Polite interaction versus successful outcome"
            ],
            "evidence": "A polite interaction is not identical to a successful outcome.",
            "explanation": "The source supports this answer: A polite interaction is not identical to a successful outcome.",
            "options": [
              "Online versus printed advertisements",
              "Polite interaction versus successful outcome",
              "Morning versus evening weather",
              "Paid versus free music"
            ],
            "id": "q3"
          }
        ],
        "id": "band4-mock-ielts-listening-stage-2",
        "contentVersion": 2
      },
      {
        "kind": "listening",
        "title": "Assessment: a new announcement",
        "instructions": "Choose your own brief notes from the new questions; do not copy facts from the teaching example. Preview the questions, then play the recording. Answer the detail, relationship or speaker purpose actually requested. Replay is allowed in lesson mode. The transcript becomes available after submission.",
        "audio": {
          "src": "/media/courses/course-audio-088.wav",
          "transcript": "The neighbourhood advice session will run in the usual room, but appointments are now required. This will reduce waiting and help staff prepare the right documents. People with urgent questions can still speak briefly to reception, where staff will decide whether a same-day appointment is needed. Please do not send original documents by post; bring them to the session.",
          "label": "Original synthetic speech · Daniel · EnglishCamp lesson audio."
        },
        "questions": [
          {
            "prompt": "What has changed?",
            "answers": [
              "Appointments are required"
            ],
            "evidence": "Appointments are now required.",
            "explanation": "The source supports this answer: Appointments are now required.",
            "options": [
              "The room",
              "Appointments are required",
              "All urgent access is removed",
              "Original documents must be posted"
            ],
            "id": "q1"
          },
          {
            "prompt": "What should people do with original documents?",
            "answers": [
              "Bring them"
            ],
            "evidence": "Bring them to the session.",
            "explanation": "The source supports this answer: Bring them to the session.",
            "options": [
              "Post them",
              "Destroy them",
              "Bring them",
              "Upload them publicly"
            ],
            "id": "q2"
          }
        ],
        "id": "band4-mock-ielts-listening-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-reading-writers-views",
  "lessonId": "band4-reading-writers-views",
  "type": "course-activity",
  "prompt": "Reading: Identifying Writer's Views — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Reading: Identifying Writer's Views",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Identifying Writer's Views",
        "instructions": "Mark whose view the claim reports. Compare its exact wording with the writer’s judgement; name missing information before selecting NOT GIVEN. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A proposal worth testing\n\nThe council’s plan for a repair centre deserves a trial, but its value should not be assumed from the number of donated tools. Skilled supervision and convenient opening hours will determine whether residents can use it. I would support a small pilot with published costs rather than an immediate large investment.",
        "questions": [
          {
            "prompt": "What does the writer support first?",
            "answers": [
              "small pilot"
            ],
            "evidence": "I would support a small pilot.",
            "explanation": "The source supports this answer: I would support a small pilot.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What level of commitment does the repair-centre writer support?",
            "answers": [
              "A repair centre is worth testing before a large commitment."
            ],
            "evidence": "The council’s plan for a repair centre deserves a trial, but its value should not be assumed from the number of donated tools. Skilled supervision and convenient opening hours will determine whether residents can use it. I would support a small pilot with published costs rather than an immediate large investment.",
            "explanation": "The writer supports a small, cost-transparent pilot because supervision and opening hours determine use. Tool donations alone do not justify an immediate large investment.",
            "options": [
              "Immediate large investment based on the number of donated tools.",
              "Rejecting the idea before considering supervision or opening hours.",
              "A repair centre is worth testing before a large commitment.",
              "A pilot whose costs are kept private to avoid criticism."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "The writer supports an immediate large investment before a trial.",
            "answers": [
              "NO"
            ],
            "evidence": "The writer favours a small pilot rather than immediate large investment.",
            "explanation": "The passage supports this answer: The writer favours a small pilot rather than immediate large investment.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The writer believes the repair centre should open on Sundays.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply a recommendation for Sunday opening. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q4"
          }
        ],
        "seconds": 420,
        "id": "band4-reading-writers-views-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Identifying Writer's Views",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Who benefits from a redesigned high street?\n\nA high street redesign is often presented as a choice between cars and pedestrians. That framing overlooks how many different journeys a street supports. A delivery driver, a wheelchair user, a parent with a pushchair and a shop assistant travelling home late may all need different things from the same space.\n\nThe recent proposal for Westbridge removes some parking to widen pavements and add seating. Those changes could make the street more comfortable, especially where narrow paths currently force people to move into the road. However, the proposal says little about deliveries or access after public transport becomes less frequent in the evening. These omissions deserve attention before construction begins.\n\nThis is not an argument for preserving every parking space. A street is a shared public place, and storing private vehicles should not automatically take priority over safe movement. Equally, a design described as accessible should be tested with people who face practical barriers, rather than judged only from an attractive drawing.\n\nI would support a temporary trial using movable planters and marked loading areas. Residents and businesses could then report specific difficulties while the layout is still easy to adjust. The council should publish what it learns, including problems that do not fit the original expectations. A successful project would improve everyday access for a wider range of people, not merely produce a more impressive photograph of the town centre.",
        "questions": [
          {
            "prompt": "What kind of trial does the writer propose?",
            "answers": [
              "temporary trial"
            ],
            "evidence": "A temporary trial using movable planters and marked loading areas.",
            "explanation": "The source supports this answer: A temporary trial using movable planters and marked loading areas.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What would make the high-street redesign convincing to the writer?",
            "answers": [
              "The redesign has potential but needs practical testing with varied users."
            ],
            "evidence": "I would support a temporary trial using movable planters and marked loading areas. Residents and businesses could then report specific difficulties while the layout is still easy to adjust. The council should publish what it learns, including problems that do not fit the original expectations. A successful project would improve everyday access for a wider range of people, not merely produce a more impressive photograph of the town centre.",
            "explanation": "The writer recognises pavement benefits while identifying delivery and evening-access omissions. Practical testing with varied users addresses those gaps; attractive design drawings or preservation of every parking space do not.",
            "options": [
              "The redesign has potential but needs practical testing with varied users.",
              "An attractive drawing showing that parking has been removed.",
              "Preserving every parking space regardless of pedestrian barriers.",
              "Consulting daytime shoppers alone about all access needs."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "The writer supports testing the design with people who face practical access barriers.",
            "answers": [
              "YES"
            ],
            "evidence": "A design described as accessible should be tested with people who face practical barriers.",
            "explanation": "YES: the writer explicitly recommends practical testing with affected users. An attractive drawing alone is insufficient, and support for testing is not support for preserving every parking place.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The writer prefers a high-street trial lasting at least six months.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply a minimum six-month trial duration. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q4"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-writers-views-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Identifying Writer's Views",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A cautious endorsement\n\nThe new volunteer programme could strengthen local services, provided it supplements rather than replaces trained staff. Volunteers bring useful experience and local knowledge, but they should not be expected to handle complex cases without support. Clear roles and supervision would make the scheme more credible than a promise that enthusiasm alone will meet every need.",
        "questions": [
          {
            "prompt": "What should volunteers supplement?",
            "answers": [
              "trained staff"
            ],
            "evidence": "It should supplement rather than replace trained staff.",
            "explanation": "The source supports this answer: It should supplement rather than replace trained staff.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What condition underlies the endorsement of volunteers?",
            "answers": [
              "Volunteering is valuable when responsibilities and support are clear."
            ],
            "evidence": "The new volunteer programme could strengthen local services, provided it supplements rather than replaces trained staff. Volunteers bring useful experience and local knowledge, but they should not be expected to handle complex cases without support. Clear roles and supervision would make the scheme more credible than a promise that enthusiasm alone will meet every need.",
            "explanation": "The endorsement depends on trained-staff support, clear roles and supervision. Useful volunteer experience does not authorise replacement of professionals in complex cases.",
            "options": [
              "Enthusiasm makes trained staff and supervision unnecessary.",
              "Volunteering is valuable when responsibilities and support are clear.",
              "Volunteers should replace trained staff in complex cases.",
              "Local knowledge alone certifies readiness for every responsibility."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Volunteers should supplement trained staff rather than replace them.",
            "answers": [
              "YES"
            ],
            "evidence": "The programme should supplement rather than replace trained staff.",
            "explanation": "YES: this repeats the writer’s explicit condition for support. It does not authorise volunteers to handle complex cases without supervision.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q3"
          },
          {
            "prompt": "The writer recommends paying volunteers a fixed hourly wage.",
            "answers": [
              "NOT GIVEN"
            ],
            "evidence": "The source does not give this figure, schedule, duration or recommendation.",
            "explanation": "NOT GIVEN: the source does not supply a recommendation to pay a fixed hourly wage. Related discussion of the project does not settle this precise claim. Absence of that fact is not a contradiction; a NO/FALSE answer would need incompatible information.",
            "options": [
              "YES",
              "NO",
              "NOT GIVEN"
            ],
            "id": "q4"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-writers-views-stage-3",
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-reading-difficult-texts",
  "lessonId": "band4-reading-difficult-texts",
  "type": "course-activity",
  "prompt": "Reading: Dealing with Difficult Texts — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Reading: Dealing with Difficult Texts",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Dealing with Difficult Texts",
        "instructions": "Find the main subject and finite verb before interpreting modifiers. Test an unfamiliar expression against its local definition and the rule’s exception. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Reading beyond an unfamiliar word\n\nA notice says that access to a workshop is provisional until training is completed. Even if provisional is unfamiliar, the phrase until training is completed establishes that permission is conditional. The reader should not treat the notice as unrestricted access. Context can clarify the practical meaning without requiring a dictionary for every word.",
        "questions": [
          {
            "prompt": "What must be completed?",
            "answers": [
              "training"
            ],
            "evidence": "Access remains provisional until training is completed.",
            "explanation": "The source supports this answer: Access remains provisional until training is completed.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How does the workshop notice help explain provisional?",
            "answers": [
              "Context can reveal a restriction even when a word is unfamiliar."
            ],
            "evidence": "A notice says that access to a workshop is provisional until training is completed. Even if provisional is unfamiliar, the phrase until training is completed establishes that permission is conditional. The reader should not treat the notice as unrestricted access. Context can clarify the practical meaning without requiring a dictionary for every word.",
            "explanation": "The surrounding rule and exception constrain the unfamiliar word. A general association with the topic cannot override an explicit restriction in context.",
            "options": [
              "It makes access unconditional as soon as the notice is read.",
              "It means permission continues even if training is unfinished.",
              "It makes the surrounding time condition irrelevant.",
              "Context can reveal a restriction even when a word is unfamiliar."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-reading-difficult-texts-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Dealing with Difficult Texts",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The changing life of a public building\n\nThe old market hall in Alderwick has served several purposes since trading moved elsewhere. It was used for storage, stood empty for years and later became a venue for occasional events. Each phase left traces in the building, from repaired doorways to marks showing where temporary partitions had stood.\n\nA current proposal would turn it into a community workshop and exhibition space. Supporters describe this as a return to the hall’s original role as a meeting place. The phrase is appealing, but the building’s history is less simple. Trading brought people together, yet access and influence were not shared equally. A new public use should therefore be judged by present needs rather than by an idealised account of the past.\n\nThe survey has identified practical questions. The roof needs repairs, and the main entrance includes steps. An accessible entrance could be created on the east side, but this would affect the layout of one proposed workshop. Organisers also need a realistic plan for heating and staffing during quieter months.\n\nNone of these issues means the project should be abandoned. They show why a useful feasibility study must go beyond an attractive picture of a finished building. A phased approach could begin with a safe, accessible section and expand once demand is clearer. The hall’s history offers possibilities, not a guarantee that every proposed activity will succeed.\n\nA phased plan also has risks. An unfinished appearance could make residents doubt whether the project will ever be completed, while repeated building work may disrupt early users. Organisers propose publishing a sequence of achievable stages, with a clear explanation of what each stage would provide. This would allow the public to distinguish a limited first opening from a promise that every proposed facility is already available.\n\nConsultation has revealed differences in expected use. Some residents want classes led by qualified tutors, while others mainly need affordable space for groups they organise themselves. Both could fit the building, but they imply different staffing and booking arrangements. The project team has therefore resisted treating a large number of expressions of interest as proof of one uniform demand. It will ask what people would attend, when they could come and what they could reasonably pay.\n\nThese practical questions connect the building’s history with its future without pretending that the past supplies a complete answer. Preserving a market hall can protect a distinctive part of the town, but preservation should enable useful access rather than turn the building into a symbol that residents cannot afford to use. The writer’s support remains conditional on a plan that explains both its ambitions and its limits.",
        "questions": [
          {
            "prompt": "Where could an accessible entrance be created?",
            "answers": [
              "east side"
            ],
            "evidence": "An accessible entrance could be created on the east side.",
            "explanation": "The source supports this answer: An accessible entrance could be created on the east side.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should determine the market hall's future use?",
            "answers": [
              "The building has potential, but practical feasibility matters more than an idealised history."
            ],
            "evidence": "These practical questions connect the building’s history with its future without pretending that the past supplies a complete answer. Preserving a market hall can protect a distinctive part of the town, but preservation should enable useful access rather than turn the building into a symbol that residents cannot afford to use. The writer’s support remains conditional on a plan that explains both its ambitions and its limits.",
            "explanation": "The building’s history creates interest, but viable use requires practical access, affordability and conditions suited to different activities. An idealised past cannot settle present feasibility.",
            "options": [
              "An idealised account of its past supplies a sufficient business plan.",
              "The building has potential, but practical feasibility matters more than an idealised history.",
              "Expressions of interest establish one uniform pattern of demand.",
              "Opening one section promises that all planned facilities are ready."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "What risk accompanies phased opening?",
            "answers": [
              "The unfinished appearance may weaken confidence"
            ],
            "evidence": "Residents may doubt completion and early users may face disruption.",
            "explanation": "Evidence and reasoning: Residents may doubt completion and early users may face disruption.",
            "options": [
              "The building becomes instantly complete",
              "The unfinished appearance may weaken confidence",
              "No access work is needed",
              "Every proposed facility is automatically available"
            ],
            "id": "q3"
          },
          {
            "prompt": "Why are expressions of interest insufficient?",
            "answers": [
              "People want different activities under different conditions"
            ],
            "evidence": "Classes and self-organised groups imply different arrangements.",
            "explanation": "Evidence and reasoning: Classes and self-organised groups imply different arrangements.",
            "options": [
              "Nobody can ever know what residents want",
              "People want different activities under different conditions",
              "All residents want identical courses",
              "Interest guarantees the ability to pay"
            ],
            "id": "q4"
          },
          {
            "prompt": "What relationship between preservation and use does the writer favour?",
            "answers": [
              "Preservation should support practical, affordable access"
            ],
            "evidence": "Preservation should enable useful access.",
            "explanation": "Evidence and reasoning: Preservation should enable useful access.",
            "options": [
              "A symbol residents cannot use",
              "Preservation should support practical, affordable access",
              "Removing all historic features",
              "Leaving every part permanently empty"
            ],
            "id": "q5"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-difficult-texts-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-7bf9f296"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Dealing with Difficult Texts",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A handbook restriction\n\nThe handbook permits reasonable personal use of the staff printer, subject to manager approval and payment for materials. Reasonable does not mean unlimited, and approval is required before printing begins. The rule supports occasional use while preserving capacity for work tasks. Its conditions matter more than an isolated phrase saying personal use is permitted.",
        "questions": [
          {
            "prompt": "What is required before printing?",
            "answers": [
              "manager approval"
            ],
            "evidence": "Approval is required before printing begins.",
            "explanation": "The source supports this answer: Approval is required before printing begins.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should the printer permission be interpreted?",
            "answers": [
              "Permissions must be read together with their conditions."
            ],
            "evidence": "The handbook permits reasonable personal use of the staff printer, subject to manager approval and payment for materials. Reasonable does not mean unlimited, and approval is required before printing begins. The rule supports occasional use while preserving capacity for work tasks. Its conditions matter more than an isolated phrase saying personal use is permitted.",
            "explanation": "A permission remains limited by its stated conditions. Reading one positive clause without its restriction wrongly broadens access.",
            "options": [
              "The phrase personal use is permitted overrides the approval condition.",
              "Payment after printing removes the need for prior approval.",
              "Reasonable personal use includes unlimited printing during work hours.",
              "Permissions must be read together with their conditions."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-difficult-texts-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-5da454ec"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-reading-time-pressure",
  "lessonId": "band4-reading-time-pressure",
  "type": "course-activity",
  "prompt": "Reading: Time Pressure Strategies — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Reading: Time Pressure Strategies",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Reading: Time Pressure Strategies",
        "instructions": "Make an empty action / deadline / exception record. Fill only the roles needed by the question, then transfer a concise answer within its word limit. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A deadline notice\n\nApplications for the travel grant close at noon on 14 May. Supporting references may arrive up to two working days later, but the application form itself must be submitted by the main deadline. An incomplete form cannot be replaced by a late reference. Applicants should allow time for technical difficulties rather than assuming an email sent after noon will be accepted.",
        "questions": [
          {
            "prompt": "What can arrive after the main deadline?",
            "answers": [
              "supporting references",
              "references"
            ],
            "evidence": "Supporting references may arrive two working days later.",
            "explanation": "The source supports this answer: Supporting references may arrive two working days later.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What distinction matters most in the grant notice?",
            "answers": [
              "Different documents have different deadlines and conditions."
            ],
            "evidence": "Applications for the travel grant close at noon on 14 May. Supporting references may arrive up to two working days later, but the application form itself must be submitted by the main deadline. An incomplete form cannot be replaced by a late reference. Applicants should allow time for technical difficulties rather than assuming an email sent after noon will be accepted.",
            "explanation": "Each document governs a different requirement or time. Carry the deadline with its own action rather than choose one date for the whole process.",
            "options": [
              "A late reference extends the deadline for the application form.",
              "Any email sent after noon must be accepted if technical problems occur.",
              "Different documents have different deadlines and conditions.",
              "Every required document has the same submission deadline."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-reading-time-pressure-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Reading: Time Pressure Strategies",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Choosing a practical course\n\nThree evening courses are available at the adult learning centre. The bicycle-maintenance course runs on Mondays and supplies tools, but participants should bring a bicycle if possible. The cooking course meets on Wednesdays and requires learners to disclose allergies before enrolment. Ingredients are included in the fee. The digital-skills course runs on Thursdays; laptops are supplied, although learners may use their own device.\n\nAll courses require advance booking. Places are confirmed only after payment, and a waiting-list request is not a confirmed place. Refunds are available until seven days before the first session. After that point, a transfer to another person may be possible if the organiser agrees. The centre cannot guarantee a transfer when a course has specific entry requirements.\n\nLearners who need an accessible room or communication support should contact the centre before booking. Staff will discuss arrangements rather than assume that one standard adjustment suits every person. The programme offers useful opportunities, provided applicants read the conditions and choose a course that matches their needs.",
        "questions": [
          {
            "prompt": "Which course requires allergy information?",
            "answers": [
              "cooking"
            ],
            "evidence": "Cooking requires learners to disclose allergies.",
            "explanation": "The source supports this answer: Cooking requires learners to disclose allergies.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should guide an evening-course booking?",
            "answers": [
              "Course choice should account for practical requirements and booking conditions."
            ],
            "evidence": "Learners who need an accessible room or communication support should contact the centre before booking. Staff will discuss arrangements rather than assume that one standard adjustment suits every person. The programme offers useful opportunities, provided applicants read the conditions and choose a course that matches their needs.",
            "explanation": "A course can be attractive yet fail a practical requirement or booking condition. The choice needs all relevant conditions, not a single appealing detail.",
            "options": [
              "Course choice should account for practical requirements and booking conditions.",
              "Joining the waiting list confirms a paid place.",
              "Any learner can transfer a place after the refund deadline without permission.",
              "Accessibility needs can be assumed from the standard course description."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-time-pressure-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-806ada94"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Reading: Time Pressure Strategies",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A collection notice\n\nReserved items are held for five days after the notification email. If you need more time, contact the library before the holding period ends. Items not collected may be offered to the next person. An extension is possible when there is no waiting list, but it is not automatic.",
        "questions": [
          {
            "prompt": "When should an extension be requested?",
            "answers": [
              "before expiry",
              "before expiration",
              "before the deadline",
              "before it expires"
            ],
            "evidence": "Contact the library before the holding period ends.",
            "explanation": "The source supports this answer: Contact the library before the holding period ends.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should a reader infer about a library extension?",
            "answers": [
              "Early contact may allow an extension, but availability is conditional."
            ],
            "evidence": "Reserved items are held for five days after the notification email. If you need more time, contact the library before the holding period ends. Items not collected may be offered to the next person. An extension is possible when there is no waiting list, but it is not automatic.",
            "explanation": "Contact before expiry permits consideration of an extension; another reservation can still prevent approval. Early contact is not an automatic entitlement.",
            "options": [
              "Early contact may allow an extension, but availability is conditional.",
              "It is automatic whenever an item has not been collected.",
              "It can be requested only after the five-day period ends.",
              "Contacting staff guarantees an extension even with a waiting list."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band4-reading-time-pressure-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-ba27d27f"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-complex-comparisons",
  "lessonId": "band4-writing-complex-comparisons",
  "type": "course-activity",
  "prompt": "IELTS General Reading: Workplace & Public Notices Masterclass — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "IELTS General Reading: Workplace & Public Notices Masterclass",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: IELTS General Reading: Workplace & Public Notices Masterclass",
        "instructions": "Trace the rule sequence and keep space permission separate from equipment permission. Check exceptions before choosing a whole-document heading. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Passage\n\nBefore using the shared workshop, members must complete an induction and sign the safety agreement. A booking confirms access to the space but does not permit use of every machine. Equipment-specific training is recorded separately. The rules are intended to support safe independent work, not to remove the need to ask for help when uncertain.",
        "questions": [
          {
            "prompt": "What training is recorded separately?",
            "answers": [
              "equipment-specific training"
            ],
            "evidence": "Equipment-specific training is recorded separately.",
            "explanation": "The source supports this answer: Equipment-specific training is recorded separately.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What distinction do the shared-workshop rules make?",
            "answers": [
              "Space access and machine permission are separate."
            ],
            "evidence": "Before using the shared workshop, members must complete an induction and sign the safety agreement. A booking confirms access to the space but does not permit use of every machine. Equipment-specific training is recorded separately. The rules are intended to support safe independent work, not to remove the need to ask for help when uncertain.",
            "explanation": "The booking permits space access, while equipment-specific permission is separately recorded. Induction and a safety agreement do not authorise every machine.",
            "options": [
              "A room booking authorises use of every machine.",
              "Signing the safety agreement replaces equipment-specific training.",
              "Space access and machine permission are separate.",
              "Completing an induction means a member should never ask for help."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Choose the best heading for the whole text.",
            "answers": [
              "Separate permission for space and machines"
            ],
            "evidence": "The heading covers both the purpose and the qualification in the whole account.",
            "explanation": "The whole notice separates space access from equipment permission and preserves a need for help when uncertain. A booking or safety signature cannot replace machine-specific training.",
            "options": [
              "Separate permission for space and machines",
              "A room booking as complete machine authorisation",
              "Replacing equipment training with a signed agreement",
              "Independent work without further safety questions"
            ],
            "id": "q3"
          }
        ],
        "seconds": 420,
        "id": "band4-writing-complex-comparisons-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: IELTS General Reading: Workplace & Public Notices Masterclass",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Passage\n\nA · Before travel\nObtain written approval from your manager and record the work purpose. Approval to travel does not automatically approve every possible expense.\n\nB · During the journey\nKeep itemised receipts. A bank statement alone does not show what was purchased. If a receipt is unavailable, ask the supplier for a replacement before leaving.\n\nC · After travel\nComplete the claim form within thirty days. Attach receipts and explain any change from the approved plan. Send the form to your manager for review.\n\nD · Finance review\nAfter manager approval, finance checks the documents and may request clarification. Payment is scheduled only after the claim is accepted. Complete records can reduce delays, but the procedure does not guarantee immediate reimbursement.",
        "questions": [
          {
            "prompt": "What should replace a missing receipt?",
            "answers": [
              "replacement receipt"
            ],
            "evidence": "Ask the supplier for a replacement.",
            "explanation": "The source supports this answer: Ask the supplier for a replacement.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What does the reimbursement procedure imply?",
            "answers": [
              "Each approval stage has a different purpose; complete records help but do not guarantee immediate payment."
            ],
            "evidence": "D · Finance review\nAfter manager approval, finance checks the documents and may request clarification. Payment is scheduled only after the claim is accepted. Complete records can reduce delays, but the procedure does not guarantee immediate reimbursement.",
            "explanation": "Travel approval, manager review and finance acceptance perform different jobs. Receipts and complete records support the process but do not guarantee instant reimbursement.",
            "options": [
              "Travel approval authorises every possible expense.",
              "A bank statement always replaces an itemised receipt.",
              "Finance schedules payment before reviewing an accepted claim.",
              "Each approval stage has a different purpose; complete records help but do not guarantee immediate payment."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Choose the best heading for the whole text.",
            "answers": [
              "A workplace expense procedure"
            ],
            "evidence": "The heading covers both the purpose and the qualification in the whole account.",
            "explanation": "The heading covers before, during and after travel plus finance review. Each rival removes a required record or review stage, rather than summarising the complete procedure.",
            "options": [
              "A workplace expense procedure",
              "Automatic reimbursement after travel approval",
              "Replacing itemised receipts with bank statements",
              "Scheduling payment before document review"
            ],
            "id": "q3"
          },
          {
            "id": "q4",
            "prompt": "Which section explains what a bank statement cannot replace?",
            "answers": [
              "B"
            ],
            "evidence": "Section B says a bank statement does not show what was purchased.",
            "explanation": "The source supports this answer: Section B says a bank statement does not show what was purchased.",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ]
          },
          {
            "id": "q5",
            "prompt": "Complete the process: manager approves travel → retain receipts → complete ___ → manager review → finance review.",
            "answers": [
              "claim form"
            ],
            "evidence": "Section C requires completing the claim form.",
            "explanation": "The source supports this answer: Section C requires completing the claim form.",
            "maxWords": 2,
            "punctuation": "terminal"
          },
          {
            "id": "q6",
            "prompt": "Complete the sentence: Payment is scheduled only after…",
            "answers": [
              "the claim is accepted"
            ],
            "evidence": "Section D states this condition.",
            "explanation": "The source supports this answer: Section D states this condition.",
            "options": [
              "the journey is planned",
              "the claim is accepted",
              "the bank statement is printed",
              "the manager travels"
            ]
          }
        ],
        "seconds": 720,
        "id": "band4-writing-complex-comparisons-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: IELTS General Reading: Workplace & Public Notices Masterclass",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Passage\n\nThe sports centre’s pool is open to members and day-ticket holders. Children under eight must be accompanied in the water by an adult. The café is open to the public without a sports ticket. Booking a class does not include pool access unless the class description states this explicitly. Readers should distinguish admission to one activity from access to all facilities.",
        "questions": [
          {
            "prompt": "Which facility needs no sports ticket?",
            "answers": [
              "café"
            ],
            "evidence": "The café is open without a sports ticket.",
            "explanation": "The source supports this answer: The café is open without a sports ticket.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should readers distinguish at the sports centre?",
            "answers": [
              "Access depends on the particular facility and stated conditions."
            ],
            "evidence": "The sports centre’s pool is open to members and day-ticket holders. Children under eight must be accompanied in the water by an adult. The café is open to the public without a sports ticket. Booking a class does not include pool access unless the class description states this explicitly. Readers should distinguish admission to one activity from access to all facilities.",
            "explanation": "The café, pool and classes have different access rules, including a child-supervision condition. Access to one activity must not be extended to every facility.",
            "options": [
              "A café visit requires a sports ticket.",
              "Access depends on the particular facility and stated conditions.",
              "A class booking always includes pool admission.",
              "A day ticket removes the adult-accompaniment rule for young children."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Choose the best heading for the whole text.",
            "answers": [
              "Different access rules for different facilities"
            ],
            "evidence": "The heading covers both the purpose and the qualification in the whole account.",
            "explanation": "The pool, café and classes have different admission conditions. A sports ticket is not needed for the café, a class does not automatically include swimming, and day tickets do not remove the child-supervision rule.",
            "options": [
              "Different access rules for different facilities",
              "A sports ticket as a requirement for every visitor",
              "Pool access included with every class booking",
              "Day tickets as an exemption from child supervision"
            ],
            "id": "q3"
          },
          {
            "id": "q4",
            "prompt": "Which numbered room on the plan can be used without a sports ticket?",
            "options": [
              "1",
              "2",
              "3"
            ],
            "answers": [
              "1"
            ],
            "evidence": "The café is open to the public without a sports ticket; the plan labels the café as room 1.",
            "explanation": "The notice gives the access rule and the diagram supplies the room label."
          }
        ],
        "seconds": 720,
        "id": "band4-writing-complex-comparisons-stage-3",
        "visual": {
          "src": "/media/courses/sports-plan.svg",
          "alt": "Sports centre plan with north at top. Café in the north-west room marked 1, pool in the centre room marked 2, classes in the east room marked 3, entrance on the south side.",
          "description": "Original plan. Use the accompanying notice to label the facility that is open to the public without a sports ticket."
        },
        "contentVersion": 3
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-vocab-awl4",
  "lessonId": "band4-vocab-awl4",
  "type": "course-activity",
  "prompt": "Vocabulary: AWL Sublists 4-5 — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Vocabulary: precise claims and natural collocations",
    "learn": "Choose vocabulary by meaning, strength and register. A result may indicate a pattern without proving a cause; a workplace concern may request clarification without making a formal complaint. Retrieve useful collocations such as raise a concern and draw a conclusion, then check whether they preserve the evidence. This focused module is not a verified Academic Word List sublist inventory.",
    "worked": {
      "example": "The pilot indicates a possible benefit. Replacing indicates with proves would remove uncertainty that the evidence has not resolved.",
      "reasoning": "An accurate familiar verb is more useful than an impressive-sounding overstatement. Match the strength of the word to the support available."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Vocabulary: AWL Sublists 4-5",
        "instructions": "Choose the intended communication action or evidence strength before retrieving the expression. A natural collocation still needs a justified claim. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Precise word choice\n\nA workplace report may say that a trial indicates a possible improvement. Replacing indicates with proves changes the strength of the claim. A sophisticated vocabulary choice is useful only when it preserves meaning. Writers should prefer a familiar accurate word to a rare one that exaggerates the evidence.",
        "questions": [
          {
            "prompt": "Which replacement overstates the claim?",
            "answers": [
              "proves"
            ],
            "evidence": "Proves is stronger than indicates a possible improvement.",
            "explanation": "The source supports this answer: Proves is stronger than indicates a possible improvement.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What makes a vocabulary substitution effective in this report?",
            "answers": [
              "Lexical precision matters more than rarity."
            ],
            "evidence": "A workplace report may say that a trial indicates a possible improvement. Replacing indicates with proves changes the strength of the claim. A sophisticated vocabulary choice is useful only when it preserves meaning. Writers should prefer a familiar accurate word to a rare one that exaggerates the evidence.",
            "explanation": "An appropriate ordinary word can preserve meaning better than a rare replacement. Lexical strength and collocation must match what the evidence permits.",
            "options": [
              "Proves preserves the uncertainty conveyed by indicates.",
              "Rare words improve a report even when they overstate its evidence.",
              "Lexical precision matters more than rarity.",
              "Possible can be removed without changing the strength of the claim."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-vocab-awl4-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Vocabulary: AWL Sublists 4-5",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "Training that transfers to work\n\nA retailer introduced short customer-service workshops after staff reported uncertainty about handling unusual requests. The sessions used examples drawn from the shop rather than a list of memorised phrases. Participants discussed what the customer needed, which rules applied and when a supervisor should be involved.\n\nAn initial survey found that staff felt more confident. The training team welcomed this response but recognised that confidence did not establish better performance. Supervisors therefore observed a sample of interactions and recorded whether staff identified the issue, explained options clearly and followed the relevant procedure.\n\nSome employees improved quickly, while others needed practice with specific situations. The team used these differences to plan follow-up sessions rather than ranking staff from a single observation. It also revised a rule that had caused confusion even among experienced employees.\n\nThe account suggests that effective training connects explanation, realistic practice and feedback. It does not claim that one workshop can solve every service problem. Some difficulties arise from unclear procedures or inadequate staffing, and asking employees to speak more confidently would not address those causes.",
        "questions": [
          {
            "prompt": "What did supervisors observe?",
            "answers": [
              "interactions"
            ],
            "evidence": "Supervisors observed a sample of interactions.",
            "explanation": "The source supports this answer: Supervisors observed a sample of interactions.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should the retailer evaluate its workshops?",
            "answers": [
              "Training evaluation should examine actual performance and the surrounding system."
            ],
            "evidence": "The account suggests that effective training connects explanation, realistic practice and feedback. It does not claim that one workshop can solve every service problem. Some difficulties arise from unclear procedures or inadequate staffing, and asking employees to speak more confidently would not address those causes.",
            "explanation": "Training attendance is not the same as changed performance. Evaluation also needs the surrounding system and opportunity to use the learning, rather than assuming a course alone causes every outcome.",
            "options": [
              "A confidence survey alone establishes better service performance.",
              "Training evaluation should examine actual performance and the surrounding system.",
              "A single observed interaction is enough to rank staff permanently.",
              "More confident phrasing will solve unclear procedures and staffing shortages."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q5",
            "prompt": "Complete with one noun: Supervisors gathered ___ from observed interactions, rather than relying only on confidence ratings.",
            "answers": [
              "evidence",
              "data",
              "information"
            ],
            "explanation": "Observed interactions supply evidence; confidence alone is not performance.",
            "evidence": "Observed interactions supply evidence; confidence alone is not performance.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q6",
            "prompt": "Complete the collocation: Staff should ___ a concern if a procedure is unclear.",
            "answers": [
              "raise",
              "express",
              "voice"
            ],
            "explanation": "Raise, express and voice a concern all mean draw attention to a possible problem.",
            "evidence": "Raise, express and voice a concern all mean draw attention to a possible problem.",
            "punctuation": "terminal",
            "maxWords": 1
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-awl4-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-5de3bb41"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Vocabulary: AWL Sublists 4-5",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "A natural collocation\n\nThe phrase raise a concern means bring a possible problem to someone’s attention. It does not necessarily mean make a formal complaint. In a workplace message, the surrounding purpose and requested action determine the tone. A precise reading avoids turning every expression of concern into a dispute.",
        "questions": [
          {
            "prompt": "What does raise a concern draw attention to?",
            "answers": [
              "possible problem"
            ],
            "evidence": "It brings a possible problem to someone’s attention.",
            "explanation": "The source supports this answer: It brings a possible problem to someone’s attention.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What does raise a concern mean in this workplace context?",
            "answers": [
              "Meaning depends on context and communicative purpose."
            ],
            "evidence": "The phrase raise a concern means bring a possible problem to someone’s attention. It does not necessarily mean make a formal complaint. In a workplace message, the surrounding purpose and requested action determine the tone. A precise reading avoids turning every expression of concern into a dispute.",
            "explanation": "The same expression can perform a request, concern or stronger complaint in context. Choose meaning and communicative force before replacing words for variety.",
            "options": [
              "Meaning depends on context and communicative purpose.",
              "It necessarily initiates a formal dispute.",
              "It confirms that a complaint has already been upheld.",
              "Its tone can be judged without the surrounding request or purpose."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Use the verb from the passage: To ___ a concern is to bring a possible problem to someone’s attention.",
            "answers": [
              "raise"
            ],
            "explanation": "The passage defines raise a concern; it does not equate every concern with a formal complaint.",
            "evidence": "The passage defines raise a concern; it does not equate every concern with a formal complaint.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q4",
            "prompt": "Choose the phrase that preserves uncertainty in a summary.",
            "answers": [
              "The trial suggests a possible benefit."
            ],
            "explanation": "Suggests a possible benefit preserves the limited claim; proves and guarantees overstate it.",
            "evidence": "Suggests a possible benefit preserves the limited claim; proves and guarantees overstate it.",
            "punctuation": "terminal",
            "options": [
              "The trial proves a lasting benefit.",
              "The trial suggests a possible benefit.",
              "The trial guarantees better performance.",
              "The trial rules out every alternative."
            ]
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-awl4-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-40eb1d98"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-vocab-science",
  "lessonId": "band4-vocab-science",
  "type": "course-activity",
  "prompt": "Vocabulary: Topic-Specific — Science & Research — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Vocabulary: Topic-Specific — Science & Research",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Vocabulary: Topic-Specific — Science & Research",
        "instructions": "Identify hypothesis, method, finding and interpretation as separate roles. Match vocabulary to the actual measured outcome rather than outside research assumptions. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Research in a public report\n\nA report states that an intervention was associated with fewer absences. It also notes that staffing and reporting procedures changed during the same period. The association is worth investigating, but the report does not identify a single proven cause. Removing that qualification would make the summary less accurate.",
        "questions": [
          {
            "prompt": "What other procedure changed?",
            "answers": [
              "reporting"
            ],
            "evidence": "Reporting procedures changed during the period.",
            "explanation": "The source supports this answer: Reporting procedures changed during the period.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What scientific qualification must a summary preserve?",
            "answers": [
              "The reported association does not establish one cause."
            ],
            "evidence": "A report states that an intervention was associated with fewer absences. It also notes that staffing and reporting procedures changed during the same period. The association is worth investigating, but the report does not identify a single proven cause. Removing that qualification would make the summary less accurate.",
            "explanation": "The reported variables occur together, but the source does not isolate one cause. A causal claim would need evidence addressing the other explanations.",
            "options": [
              "Fewer absences establish that the intervention was the single cause.",
              "Staffing changes can be ignored when reporting the association.",
              "A qualified association is the same as proof that no improvement occurred.",
              "The reported association does not establish one cause."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-vocab-science-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Vocabulary: Topic-Specific — Science & Research",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "Why a pilot can be informative without being decisive\n\nA local employer tested a quieter break room after staff requested somewhere away from the main canteen. The room was used regularly, and several workers reported feeling more rested. The pilot therefore showed demand for a different kind of space.\n\nIt did not establish that the room reduced sick leave. Absence figures changed during the trial, but shift patterns and staffing levels also changed. A small number of cases could strongly affect the total. The evaluation separated the direct evidence of use from the more uncertain claim about health outcomes.\n\nThe employer decided to retain the room while collecting longer-term feedback. This was a practical decision based on a modest cost and a clearly expressed need. It did not require pretending that every possible benefit had already been proved.\n\nThe writer argues that evidence should match the scale of a decision. A low-cost reversible change may be reasonable on limited evidence, while a large permanent investment requires more. The important point is to describe the basis of the decision honestly and remain willing to adjust it.",
        "questions": [
          {
            "prompt": "Which uncertain outcome did the pilot not establish?",
            "answers": [
              "reduced sick leave"
            ],
            "evidence": "It did not establish that the room reduced sick leave.",
            "explanation": "The source supports this answer: It did not establish that the room reduced sick leave.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How does the writer relate evidence to the break-room decision?",
            "answers": [
              "Evidence requirements should match the decision, while claims remain honest."
            ],
            "evidence": "The writer argues that evidence should match the scale of a decision. A low-cost reversible change may be reasonable on limited evidence, while a large permanent investment requires more. The important point is to describe the basis of the decision honestly and remain willing to adjust it.",
            "explanation": "Evidence needs to fit the decision and the consequence of error. A practical choice can use limited evidence honestly without turning that evidence into a universal proof.",
            "options": [
              "Regular room use proves that sick leave fell because of the room.",
              "Limited evidence can never justify a reversible low-cost change.",
              "Retaining the room requires every possible health benefit to be proved.",
              "Evidence requirements should match the decision, while claims remain honest."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete with a word meaning unable to settle a question: The sick-leave evidence remains ___.",
            "answers": [
              "inconclusive",
              "uncertain"
            ],
            "explanation": "Other changes and a small number of cases prevent a decisive conclusion.",
            "evidence": "Other changes and a small number of cases prevent a decisive conclusion.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q4",
            "prompt": "Choose the accurate research verb: Regular use ___ demand for the room, but does not prove a health benefit.",
            "answers": [
              "indicates",
              "suggests",
              "shows",
              "demonstrates"
            ],
            "explanation": "Actual use supports a demand claim; it does not establish reduced sick leave.",
            "evidence": "Actual use supports a demand claim; it does not establish reduced sick leave.",
            "punctuation": "terminal",
            "maxWords": 1
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-science-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-2470d0d"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Vocabulary: Topic-Specific — Science & Research",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "A notice about a product trial\n\nThe centre is testing a new cleaning product in two rooms. Staff should report irritation or equipment damage immediately. The trial does not mean the product has been approved for every surface. Continue using the existing product elsewhere until updated instructions are issued.",
        "questions": [
          {
            "prompt": "Where should the existing product continue to be used?",
            "answers": [
              "elsewhere"
            ],
            "evidence": "Use the existing product elsewhere.",
            "explanation": "The source supports this answer: Use the existing product elsewhere.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What does the cleaning-product trial authorise?",
            "answers": [
              "A limited trial does not authorise unrestricted use."
            ],
            "evidence": "The centre is testing a new cleaning product in two rooms. Staff should report irritation or equipment damage immediately. The trial does not mean the product has been approved for every surface. Continue using the existing product elsewhere until updated instructions are issued.",
            "explanation": "A bounded trial establishes only the tested circumstances. Its result cannot remove the stated restrictions or authorise every untested use.",
            "options": [
              "A limited trial does not authorise unrestricted use.",
              "Use on every surface once either trial room has been cleaned.",
              "Replacement of the existing product throughout the centre.",
              "Delaying reports of irritation until the trial has ended."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete with one noun: Permission for every surface would require wider ___, not merely a two-room trial.",
            "answers": [
              "testing",
              "evaluation",
              "assessment",
              "approval"
            ],
            "explanation": "A limited trial provides restricted evidence and permission.",
            "evidence": "A limited trial provides restricted evidence and permission.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q4",
            "prompt": "Which replacement for testing preserves the purpose of the notice?",
            "answers": [
              "evaluating"
            ],
            "explanation": "Evaluating keeps the idea of examining suitability; approving would falsely imply a final decision.",
            "evidence": "Evaluating keeps the idea of examining suitability; approving would falsely imply a final decision.",
            "punctuation": "terminal",
            "options": [
              "approving",
              "guaranteeing",
              "evaluating",
              "certifying"
            ]
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-science-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-12ee281e"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-vocab-globalization",
  "lessonId": "band4-vocab-globalization",
  "type": "course-activity",
  "prompt": "Vocabulary: Topic-Specific — Globalization — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Vocabulary: Topic-Specific — Globalization",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: Vocabulary: Topic-Specific — Globalization",
        "instructions": "Separate purchase price, added costs and total cost. Locate the exact cost or condition requested before judging the broader trade argument. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Local and international trade\n\nInternational suppliers can widen choice, but a low purchase price does not capture every cost. Delivery reliability, repair access and environmental effects also matter. A sensible comparison considers the whole arrangement rather than treating either local or imported goods as automatically preferable.",
        "questions": [
          {
            "prompt": "What access should buyers consider besides delivery?",
            "answers": [
              "repair access"
            ],
            "evidence": "Repair access is mentioned.",
            "explanation": "The source supports this answer: Repair access is mentioned.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What makes a trade comparison sensible?",
            "answers": [
              "Trade choices require a broader comparison than purchase price alone."
            ],
            "evidence": "International suppliers can widen choice, but a low purchase price does not capture every cost. Delivery reliability, repair access and environmental effects also matter. A sensible comparison considers the whole arrangement rather than treating either local or imported goods as automatically preferable.",
            "explanation": "Purchase price is only one part of the arrangement. Delivery, repair and environmental effects remain relevant, so neither local nor imported goods are automatically preferable.",
            "options": [
              "Choosing the lowest purchase price without considering delivery.",
              "Trade choices require a broader comparison than purchase price alone.",
              "Treating imported goods as preferable simply because choice is wider.",
              "Assuming local goods have no repair or environmental costs."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-vocab-globalization-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: Vocabulary: Topic-Specific — Globalization",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "A town connected to distant markets\n\nWhen a small food producer began selling online, orders arrived from places the owner had never visited. The wider market allowed the business to grow, but it also changed the work. Packaging, delivery enquiries and returns took time that had previously been spent making products.\n\nThe owner first assumed that more orders would always improve profitability. After reviewing costs, she found that a few distant deliveries generated little income once breakages and staff time were included. She limited delivery to areas where reliable services were available and explained the restriction clearly to customers.\n\nThis decision was not a rejection of wider trade. It was an attempt to make growth sustainable for a small team. Local sales remained important because customers could collect purchases and discuss products directly. Online orders offered a different benefit by smoothing demand beyond the busiest market days.\n\nThe writer sees the example as a reminder that global connections create both opportunities and responsibilities. The useful question is not whether a business is local or international, but whether its arrangements support the people doing the work and deliver what customers are promised.",
        "questions": [
          {
            "prompt": "What caused additional costs on distant deliveries?",
            "answers": [
              "breakages",
              "staff time"
            ],
            "evidence": "The source explicitly includes both breakages and staff time among the costs of distant deliveries.",
            "explanation": "Either breakages or staff time names a source-supported additional cost. The question does not specify only damaged goods. More orders alone do not establish profit once those costs are included.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What does the producer's delivery restriction show?",
            "answers": [
              "Wider markets are useful when growth is matched by reliable, sustainable arrangements."
            ],
            "evidence": "The writer sees the example as a reminder that global connections create both opportunities and responsibilities. The useful question is not whether a business is local or international, but whether its arrangements support the people doing the work and deliver what customers are promised.",
            "explanation": "The producer retains wider trade but limits routes where breakages and staff time make growth hard to sustain. A restriction can protect reliable promises without rejecting all online sales.",
            "options": [
              "The owner rejected wider trade and returned entirely to local sales.",
              "More orders are profitable regardless of breakages and staff time.",
              "Wider markets are useful when growth is matched by reliable, sustainable arrangements.",
              "Removing local collection is necessary for sustainable online growth."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete with one noun meaning earnings after costs: More orders did not necessarily increase ___.",
            "answers": [
              "profit",
              "profitability",
              "profits"
            ],
            "explanation": "Breakages and staff time reduced the financial gain from distant deliveries.",
            "evidence": "Breakages and staff time reduced the financial gain from distant deliveries.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q4",
            "prompt": "Complete with a natural verb: The producer must ___ customer expectations by explaining delivery limits.",
            "answers": [
              "manage"
            ],
            "explanation": "Manage expectations means make clear what customers can realistically expect.",
            "evidence": "Manage expectations means make clear what customers can realistically expect.",
            "punctuation": "terminal",
            "maxWords": 1
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-globalization-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-15fb5cb1"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: Vocabulary: Topic-Specific — Globalization",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "A balanced tourism policy\n\nVisitors can support a town’s shops and cultural activities, but residents still need affordable housing and reliable everyday services. I would favour policies that spread visits across the year and protect essential access. Simply increasing visitor totals would not establish that the town as a whole had benefited.",
        "questions": [
          {
            "prompt": "What should remain affordable?",
            "answers": [
              "housing"
            ],
            "evidence": "Residents need affordable housing.",
            "explanation": "The source supports this answer: Residents need affordable housing.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "How should tourism benefits be evaluated?",
            "answers": [
              "Tourism should be judged by its wider effects rather than visitor totals alone."
            ],
            "evidence": "Visitors can support a town’s shops and cultural activities, but residents still need affordable housing and reliable everyday services. I would favour policies that spread visits across the year and protect essential access. Simply increasing visitor totals would not establish that the town as a whole had benefited.",
            "explanation": "Visitor numbers omit housing and everyday-service effects on residents. Supporting visits through the year remains conditional on essential local access, rather than an unlimited growth target.",
            "options": [
              "A larger visitor total establishes a benefit to every resident.",
              "Tourism should be judged by its wider effects rather than visitor totals alone.",
              "Tourism income removes the need to protect housing and everyday services.",
              "Spreading visits over the year is intended to eliminate tourism."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "id": "q3",
            "prompt": "Complete with one noun: Visitor totals alone do not measure the policy’s wider ___ on residents.",
            "answers": [
              "impact",
              "effect",
              "effects",
              "consequences"
            ],
            "explanation": "Housing and everyday services are effects beyond a visitor count.",
            "evidence": "Housing and everyday services are effects beyond a visitor count.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q4",
            "prompt": "Which phrase makes a balanced recommendation rather than an unlimited growth target?",
            "answers": [
              "Protect essential services while supporting year-round visits."
            ],
            "explanation": "The passage supports tourism subject to residents’ needs.",
            "evidence": "The passage supports tourism subject to residents’ needs.",
            "punctuation": "terminal",
            "options": [
              "Maximise visitor numbers regardless of housing costs.",
              "Replace everyday services with seasonal attractions.",
              "Restrict all visitors to the busiest season.",
              "Protect essential services while supporting year-round visits."
            ]
          }
        ],
        "seconds": 720,
        "id": "band4-vocab-globalization-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-d6dddb2"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-mock-toefl-reading",
  "lessonId": "band4-mock-toefl-reading",
  "type": "course-activity",
  "prompt": "General Training Reading: mixed evidence checkpoint — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "General Training Reading: mixed evidence checkpoint",
    "learn": "General Training Reading uses everyday texts, workplace documents and a longer general-interest passage. Read conditions, exceptions, purpose and the writer’s degree of certainty. Do not import Academic Task 1 reporting or retired TOEFL formats into this course. These original local sets are shorter than a full 40-question paper. Use the source to justify each answer and distinguish missing information from contradiction.",
    "worked": {
      "example": "A permission that applies after training does not apply before training.",
      "reasoning": "Restrictions and sequence are part of the meaning, even when the notice contains a broad positive phrase."
    },
    "tasks": [
      {
        "kind": "reading",
        "title": "Guided evidence reading: General Training reading",
        "instructions": "Choose a method for the current question: factual detail, practical condition or qualified summary. Use an empty source/evidence note, then reduce the notes for the next source. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "An everyday reading checkpoint\n\nThe neighbourhood tool library lends items for seven days. Members may renew a loan once if nobody else has reserved the item. Power tools require an induction; hand tools do not. A deposit is returned after staff check the item. These conditions make borrowing practical, but membership alone does not guarantee access to every tool immediately.",
        "questions": [
          {
            "prompt": "How many renewals are allowed?",
            "answers": [
              "once"
            ],
            "evidence": "Members may renew once.",
            "explanation": "The source supports this answer: Members may renew once.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What should a new tool-library member understand?",
            "answers": [
              "Borrowing depends on availability and equipment-specific conditions."
            ],
            "evidence": "The neighbourhood tool library lends items for seven days. Members may renew a loan once if nobody else has reserved the item. Power tools require an induction; hand tools do not. A deposit is returned after staff check the item. These conditions make borrowing practical, but membership alone does not guarantee access to every tool immediately.",
            "explanation": "Availability and equipment-specific conditions govern borrowing. General membership or an attractive item description does not establish permission to use every tool.",
            "options": [
              "Membership guarantees immediate use of every power tool.",
              "A renewal is automatic even when another person has reserved the item.",
              "Borrowing depends on availability and equipment-specific conditions.",
              "The deposit is returned before staff inspect the item."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 420,
        "id": "band4-mock-toefl-reading-stage-1",
        "contentVersion": 3
      },
      {
        "kind": "reading",
        "title": "Independent passage: General Training reading",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "The return of a neighbourhood workshop\n\nThe workshop on Milton Road began as a place where residents could borrow tools. Its organisers soon discovered that access to equipment was only one part of the need. Some members did not know which tool suited a task, while others were confident using it but uncertain about safety checks.\n\nThe group introduced short demonstrations and a system allowing beginners to work beside experienced volunteers. This slowed some sessions, yet it made the workshop more welcoming. Members were encouraged to explain what they were trying to achieve before choosing equipment, which sometimes revealed that a simpler method would be safer.\n\nAs attendance grew, the organisers faced pressure to open more often. They resisted an immediate expansion because a few volunteers were already carrying most of the responsibility. A survey asked members which additional session would be most useful and whether they could contribute time. The resulting rota added one evening without requiring the same people to supervise every week.\n\nThe workshop also kept a record of repairs that could not be completed. These failures helped identify missing skills and unavailable parts. They were not removed from the annual report simply to make the project appear more successful.\n\nThe writer argues that a community service develops through careful attention to limits as well as enthusiasm. The workshop’s value lies in shared knowledge and practical access, but maintaining that value requires training, realistic staffing and honest reporting. A larger programme would not necessarily be a better one if it exhausted the people keeping it open.\n\nAn additional debate concerned membership fees. Some volunteers argued that a higher fee would provide stable income and reduce the need to apply for small grants. Others worried that the people most likely to benefit from borrowing equipment might be the least able to pay. The group introduced a standard fee with a confidential reduced-rate option, while continuing to seek support for training. This did not remove the financial uncertainty, but it made the trade-off visible.\n\nThe organisers were also careful about the language of independence. Their aim was not to suggest that every resident should become an expert or that asking for professional help represented failure. Some repairs require specialist knowledge, and knowing when to stop can be as valuable as learning a new technique. A notice beside the workbench explained which jobs the volunteers could support and which should be referred elsewhere.\n\nLooking ahead, the group plans to review who uses the workshop as well as how often it opens. If attendance grows mainly among already confident members, a larger timetable may not improve access for beginners. The next evaluation will therefore include short conversations with people who joined once and did not return. Their experience could reveal barriers that regular users no longer notice. Expansion remains possible, but it will follow evidence about need and capacity rather than become a measure of success in itself.",
        "questions": [
          {
            "prompt": "What did the survey help establish?",
            "answers": [
              "additional session"
            ],
            "evidence": "Which additional session would be most useful.",
            "explanation": "The source supports this answer: Which additional session would be most useful.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What principle guides the neighbourhood workshop's growth?",
            "answers": [
              "Community services need realistic support and honest evaluation as they grow."
            ],
            "evidence": "Looking ahead, the group plans to review who uses the workshop as well as how often it opens. If attendance grows mainly among already confident members, a larger timetable may not improve access for beginners. The next evaluation will therefore include short conversations with people who joined once and did not return. Their experience could reveal barriers that regular users no longer notice. Expansion remains possible, but it will follow evidence about need and capacity rather than become a measure of success in itself.",
            "explanation": "Growth requires capacity, appropriate support and evidence of need. Fee design, staff referral and consultation of non-users answer different barriers; a larger activity count alone cannot establish sustainable success.",
            "options": [
              "Opening more often is sufficient evidence that access has improved.",
              "Recording unsuccessful repairs undermines an honest annual report.",
              "Higher attendance justifies placing all supervision on the same volunteers.",
              "Community services need realistic support and honest evaluation as they grow."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          },
          {
            "prompt": "Why was a reduced-rate membership introduced?",
            "answers": [
              "To balance income with affordability"
            ],
            "evidence": "Higher fees could exclude those most likely to benefit.",
            "explanation": "Evidence and reasoning: Higher fees could exclude those most likely to benefit.",
            "options": [
              "To remove all membership income",
              "To balance income with affordability",
              "To make grants illegal",
              "To discourage beginners"
            ],
            "id": "q3"
          },
          {
            "prompt": "What does independence mean in the workshop’s approach?",
            "answers": [
              "Knowing both how to act and when to seek specialist help"
            ],
            "evidence": "Knowing when to stop can be as valuable as a new technique.",
            "explanation": "Evidence and reasoning: Knowing when to stop can be as valuable as a new technique.",
            "options": [
              "Never asking for help",
              "Knowing both how to act and when to seek specialist help",
              "Completing every repair regardless of risk",
              "Replacing every professional service"
            ],
            "id": "q4"
          },
          {
            "prompt": "Why consult people who attended once and did not return?",
            "answers": [
              "They may reveal barriers regular users overlook"
            ],
            "evidence": "Their experience could reveal barriers regular users no longer notice.",
            "explanation": "Evidence and reasoning: Their experience could reveal barriers regular users no longer notice.",
            "options": [
              "They can guarantee future funding",
              "They may reveal barriers regular users overlook",
              "They all dislike every tool",
              "Their opinions should replace every measurement"
            ],
            "id": "q5"
          },
          {
            "prompt": "Which statement best summarises the approach to expansion?",
            "answers": [
              "Expand when evidence shows both need and capacity"
            ],
            "evidence": "Expansion follows evidence about need and capacity.",
            "explanation": "Evidence and reasoning: Expansion follows evidence about need and capacity.",
            "options": [
              "Expand whenever a larger room is advertised",
              "Expand when evidence shows both need and capacity",
              "Never change the timetable again",
              "Use size alone as the success measure"
            ],
            "id": "q6"
          }
        ],
        "seconds": 720,
        "id": "band4-mock-toefl-reading-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-99ea5c08"
      },
      {
        "kind": "reading",
        "title": "Transfer assessment: General Training reading",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "A workplace checkpoint\n\nEmployees attending external training must agree learning goals with their manager beforehand. After the course, they submit a short account of what they learned and one possible application. The account is not a demand to show an immediate financial return. It helps the organisation decide whether the training meets its purpose and what support may be needed next.",
        "questions": [
          {
            "prompt": "What must be agreed before training?",
            "answers": [
              "learning goals"
            ],
            "evidence": "Agree learning goals beforehand.",
            "explanation": "The source supports this answer: Agree learning goals beforehand.",
            "maxWords": 3,
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "What is the purpose of the post-training account?",
            "answers": [
              "Training review should connect learning with purpose rather than assume an immediate return."
            ],
            "evidence": "Employees attending external training must agree learning goals with their manager beforehand. After the course, they submit a short account of what they learned and one possible application. The account is not a demand to show an immediate financial return. It helps the organisation decide whether the training meets its purpose and what support may be needed next.",
            "explanation": "Training review needs a connection between learning, intended use and subsequent evidence. Attendance or an immediate financial return alone does not settle its value.",
            "options": [
              "Training review should connect learning with purpose rather than assume an immediate return.",
              "To prove an immediate financial return from every course.",
              "To replace the learning goals agreed before attendance.",
              "To certify that no further support will be necessary."
            ],
            "id": "q2",
            "reviewId": "EC-03"
          }
        ],
        "seconds": 720,
        "id": "band4-mock-toefl-reading-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-c5223dee"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-sophisticated",
  "lessonId": "band4-writing-sophisticated",
  "type": "course-activity",
  "prompt": "General Training Task 1: formal, semi-formal and informal letters — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "General Training Task 1: formal, semi-formal and informal letters",
    "learn": "General Training Task 1 requires a letter of at least 150 words responding to three content points. Choose tone from the relationship with the recipient and the purpose, rather than treating formality as a list of rare phrases. Make the reason for writing clear, develop each point and request an actionable response where needed. There is no need to write postal addresses at the top.",
    "worked": {
      "example": "Formal: Could you arrange an inspection? Informal: Let me know when you arrive.",
      "reasoning": "Both are direct and appropriate to their relationships. A formal letter need not sound hostile or excessively elaborate."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided formal letter",
        "instructions": "Your rented flat has no heating. Write to the property agency: explain the problem, describe its effect, and request action. First identify the three points, then write at least 150 words. Use a suitable opening and closing.",
        "model": "Dear Sir or Madam,\n\nI am writing about the heating in the flat I rent at 18 Willow Street. The system stopped working on Monday evening, and the problem has continued despite my attempts to reset the thermostat according to the instructions provided.\n\nThe flat is particularly cold in the morning, which makes it difficult to work from home. I am also concerned that the problem may worsen if it is left unchecked. I have not attempted any repair myself because the equipment should be examined by a qualified engineer.\n\nCould you arrange an inspection as soon as possible and confirm the expected visit time? I am available before ten on Thursday or throughout Friday. If an earlier appointment is possible, please contact me so that I can make arrangements. I would also appreciate advice about a safe temporary heating option while the system is unavailable.\n\nPlease let me know what action will be taken and when I can expect an update.\n\nYours faithfully,\nMaya Karim",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I develop heating fault, effect and requested action in a complete formal letter.",
          "Development: I make the practical consequence and proposed visit usable by the agency.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check courteous request, availability and confirmation rather than threaten."
        ],
        "analysis": "Review this response against its own demand: Develop heating fault, effect and requested action in a complete formal letter. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the practical consequence and proposed visit usable by the agency; a weaker one only names the topic or repeats a judgement. For your revision, check courteous request, availability and confirmation rather than threaten. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band4-writing-sophisticated-stage-1",
        "compatibleWithSignature": "v1-6a3358fb"
      },
      {
        "kind": "writing",
        "title": "Independent semi-formal letter",
        "instructions": "You want to change working hours temporarily to attend training. Write to your manager: explain why, propose an arrangement, and offer a way to protect work coverage. Write at least 150 words.",
        "model": "Dear Ms Patel,\n\nI am writing to ask whether I could change my working hours for the next four weeks. A training course I have been offered begins at four on Tuesdays, and completing it would help me use the new booking system more confidently.\n\nI would like to start an hour earlier on Tuesdays and finish at half past three. My total weekly hours would remain unchanged. I have checked the rota, and the reception desk is usually covered by two colleagues during the final half-hour of my shift. However, I would confirm this arrangement with them before making any change.\n\nI understand that customer service must remain the priority. If a busy week makes the early finish impractical, I could use annual leave for that afternoon or discuss another solution with you.\n\nCould we meet briefly this week to consider the request? I can bring the course timetable and a proposed rota so that we can check the practical details together.\n\nKind regards,\nSam Lee",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I explain temporary training need, schedule and work coverage.",
          "Development: I make the proposed exchange workable while leaving approval to the manager.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that the temporary dates and return to normal hours are clear."
        ],
        "analysis": "Review this response against its own demand: Explain temporary training need, schedule and work coverage. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the proposed exchange workable while leaving approval to the manager; a weaker one only names the topic or repeats a judgement. For your revision, check that the temporary dates and return to normal hours are clear. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band4-writing-sophisticated-stage-2",
        "compatibleWithSignature": "v1-cb30de4d"
      },
      {
        "kind": "writing",
        "title": "Assessment informal letter",
        "instructions": "A friend is visiting you. Write a letter suggesting an activity, explaining what to bring, and asking for arrival details. Write at least 150 words.",
        "model": "Dear Lina,\n\nIt was lovely to hear that you are coming to stay next month. I am really looking forward to showing you around, and I thought I would suggest a plan for your first weekend.\n\nOn Saturday we could take the short train journey to the coast. There is a path above the beach with beautiful views, and it is not too demanding. If the weather is poor, we can visit the small museum nearby instead. You mentioned enjoying local food, so I have also found a café that serves dishes made with fish from the harbour.\n\nBring a waterproof jacket and comfortable shoes, since the weather can change quickly. You will not need formal clothes unless you want to go somewhere special in the evening.\n\nLet me know what time your train arrives and whether there is anything you would particularly like to do. I can meet you at the station, so there is no need to arrange a taxi.\n\nBest wishes,\nMaya",
        "minWords": 150,
        "seconds": 1200,
        "rubric": [
          "Content: I suggest an activity, preparation and arrival details in a complete friendly letter.",
          "Development: I connect the recommendation to the friend and develop practical detail.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I keep a natural tone without omitting one of the three points."
        ],
        "analysis": "Review this response against its own demand: Suggest an activity, preparation and arrival details in a complete friendly letter. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect the recommendation to the friend and develop practical detail; a weaker one only names the topic or repeats a judgement. For your revision, keep a natural tone without omitting one of the three points. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band4-writing-sophisticated-stage-3",
        "compatibleWithSignature": "v1-977cf2a2"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-complex-ideas",
  "lessonId": "band4-writing-complex-ideas",
  "type": "course-activity",
  "prompt": "General Training Task 2: developing a complex position — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "General Training Task 2: developing a complex position",
    "learn": "A nuanced argument answers the question clearly while recognising relevant conditions. Complexity comes from explaining relationships, not from avoiding a position. Discuss who is affected, how a benefit or cost arises and when an argument may not apply. Task 2 requires at least 250 words and contributes twice as much as Task 1 to the Writing result.",
    "worked": {
      "example": "Employers should fund training required for current duties, while personal career changes may call for shared or individual funding.",
      "reasoning": "The distinction supplies a reasoned position rather than a vague claim that both sides are equally correct."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided position paragraph",
        "instructions": "Write 60–90 words distinguishing training required for a current job from training for a different career. Explain why the distinction matters.",
        "model": "Training required for a current job should normally be supported by the employer, because the organisation decides which equipment and procedures workers must use. A course intended mainly for a different career has a less direct connection with that responsibility. This does not mean employees should receive no help with wider development, but it suggests that funding decisions should consider the purpose and expected benefit rather than applying one rule to every course.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I distinguish current-role training from a career change.",
          "Development: I explain why responsibility and benefit may justify different funding.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I state what judgement follows from the distinction."
        ],
        "analysis": "Review this response against its own demand: Distinguish current-role training from a career change. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain why responsibility and benefit may justify different funding; a weaker one only names the topic or repeats a judgement. For your revision, state what judgement follows from the distinction. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band4-writing-complex-ideas-stage-1",
        "compatibleWithSignature": "v1-2788e8f1"
      },
      {
        "kind": "writing",
        "title": "Independent full Task 2",
        "instructions": "Some people believe employers should provide all work-related training. Others think employees should manage their own development. Discuss both views and give your opinion. Write at least 250 words.",
        "model": "Some people argue that employers should provide training whenever workers need new skills, while others believe employees should take responsibility for their own development. I think responsibility should be shared, with the balance depending on who benefits and whether the training is required for the job.\n\nEmployers should normally provide instruction that workers need to perform their current duties safely and effectively. If a company introduces new equipment, it controls both the decision and the working conditions. Expecting employees to learn alone could lead to inconsistent practice and avoidable mistakes. Paid training time also makes participation possible for workers who have caring responsibilities or limited resources outside work.\n\nEmployees nevertheless have a role in identifying their learning needs and using opportunities actively. A course will achieve little if participants do not practise or ask about difficulties. Workers may also choose to develop skills for a different career, and it would be unreasonable to expect their present employer to fund every personal ambition. In those cases, public education or individual study may be more appropriate.\n\nA practical arrangement would begin with a discussion of the skill required, the expected benefit and the support needed. The employer could provide time and essential resources, while the employee agrees on a realistic learning plan and applies the new skill. Progress should be reviewed through actual work rather than attendance alone.\n\nIn conclusion, neither complete employer responsibility nor complete individual responsibility is convincing. Training linked directly to current work should be supported by the organisation, while employees should participate thoughtfully and take initiative. Clear agreements are more useful than broad claims that one side must bear every cost.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I discuss employer and employee responsibility and give my opinion.",
          "Development: I use a clear distinction to organise both views fairly.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I replace unresolved both-sides language with a sustained judgement."
        ],
        "analysis": "Review this response against its own demand: Discuss employer and employee responsibility and give my opinion. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will use a clear distinction to organise both views fairly; a weaker one only names the topic or repeats a judgement. For your revision, replace unresolved both-sides language with a sustained judgement. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band4-writing-complex-ideas-stage-2",
        "compatibleWithSignature": "v1-ebd13b01"
      },
      {
        "kind": "writing",
        "title": "Assessment: fresh argument",
        "instructions": "Write 100–140 words explaining whether a local council should fund a community workshop. Develop a benefit, a condition and a limitation.",
        "model": "A council could reasonably support a community workshop if it gives residents access to skills and equipment they cannot easily obtain elsewhere. Learning to repair ordinary objects may save money and create opportunities for people to help neighbours. However, the benefit depends on safe supervision and a sustainable staffing plan. A room full of donated tools would not be useful if no one could explain how to use them. I would favour a limited trial in an existing building, with clear training requirements and published costs. This would allow the council to assess participation before committing to a larger project.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I judge workshop funding through benefit, condition and limit.",
          "Development: I explain a public benefit and the resources needed to realise it.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I make the final condition sharpen rather than erase the position."
        ],
        "analysis": "Review this response against its own demand: Judge workshop funding through benefit, condition and limit. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will explain a public benefit and the resources needed to realise it; a weaker one only names the topic or repeats a judgement. For your revision, make the final condition sharpen rather than erase the position. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 140,
        "id": "band4-writing-complex-ideas-stage-3",
        "compatibleWithSignature": "v1-58c7764a"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-lexical-resource",
  "lessonId": "band4-writing-lexical-resource",
  "type": "course-activity",
  "prompt": "Lexical precision and natural register — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Lexical precision and natural register",
    "learn": "Lexical resource concerns range and precision, including collocation, spelling and appropriacy. Rare words do not automatically improve a response. “Have a belief” is valid English in suitable contexts; it must not be marked universally wrong. Prefer a precise expression that fits the audience over an impressive-looking substitution.",
    "worked": {
      "example": "The policy may reduce delays is more precise than the policy will eradicate every inconvenience.",
      "reasoning": "The second version overstates both certainty and effect."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: Lexical precision and natural register",
        "instructions": "Keep possibility, evidence strength and collocation separate. Explain the intended claim before ordering the supplied words or selecting a lexical form. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: may / plan / The / access / improve Keep the beginning “The plan” and the final word “access.” fixed.",
            "answers": [
              "The plan may improve access."
            ],
            "evidence": "May marks a possibility rather than a guarantee.",
            "explanation": "The source supports this answer: May marks a possibility rather than a guarantee.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: not / conclusion / that / does / The / support / evidence Keep the beginning “The evidence” and the final word “conclusion.” fixed.",
            "answers": [
              "The evidence does not support that conclusion."
            ],
            "evidence": "Evidence supports a conclusion; the negative preserves the limit.",
            "explanation": "The source supports this answer: Evidence supports a conclusion; the negative preserves the limit.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: to / address / need / the / main / We / concern Keep the beginning “We need” and the final word “concern.” fixed.",
            "answers": [
              "We need to address the main concern."
            ],
            "evidence": "Address a concern is a natural collocation.",
            "explanation": "The source supports this answer: Address a concern is a natural collocation.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-writing-lexical-resource-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: Lexical precision and natural register",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: provides / The / survey / information / useful Keep the beginning “The survey” and the final word “information.” fixed.",
            "answers": [
              "The survey provides useful information."
            ],
            "evidence": "Information is uncountable.",
            "explanation": "The source supports this answer: Information is uncountable.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: question / proposal / The / practical / raises / a Keep the beginning “The proposal” and the final word “question.” fixed.",
            "answers": [
              "The proposal raises a practical question."
            ],
            "evidence": "Raise a question is the appropriate collocation.",
            "explanation": "The source supports this answer: Raise a question is the appropriate collocation.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: an / The / important / service / need / meets Keep the beginning “The service” and the final word “need.” fixed.",
            "answers": [
              "The service meets an important need."
            ],
            "evidence": "Meet a need is natural.",
            "explanation": "The source supports this answer: Meet a need is natural.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: resources / depends / on / decision / available / The Keep the beginning “The decision” and the final word “resources.” fixed.",
            "answers": [
              "The decision depends on available resources."
            ],
            "evidence": "Depend on is the correct pattern.",
            "explanation": "The source supports this answer: Depend on is the correct pattern.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: costs / distinguishes / benefits / from / The / report Keep the beginning “The report” and the final word “costs.” fixed.",
            "answers": [
              "The report distinguishes benefits from costs."
            ],
            "evidence": "Distinguish A from B clarifies the contrast.",
            "explanation": "The source supports this answer: Distinguish A from B clarifies the contrast.",
            "id": "q5",
            "punctuation": "terminal"
          },
          {
            "id": "q6",
            "prompt": "Complete the collocation with one verb: The report does not ___ a distinction between access and availability.",
            "answers": [
              "draw",
              "make"
            ],
            "explanation": "Draw a distinction and make a distinction are both natural; do a distinction is not.",
            "evidence": "Draw a distinction and make a distinction are both natural; do a distinction is not.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q7",
            "prompt": "Complete with one adjective meaning not final because the full study is unfinished: These are ___ findings.",
            "answers": [
              "preliminary",
              "initial",
              "provisional",
              "tentative"
            ],
            "explanation": "Preliminary, initial, provisional and tentative can mark the not-final status in this context. Empirical means based on observation and does not by itself mean unfinished; definitive or proven would overstate the finding.",
            "evidence": "An unfinished study calls for a not-final adjective such as preliminary, initial, provisional or tentative.",
            "punctuation": "terminal",
            "maxWords": 1
          }
        ],
        "seconds": 600,
        "id": "band4-writing-lexical-resource-stage-2",
        "contentVersion": 3
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: Lexical precision and natural register",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper. Also complete the contextual vocabulary questions: select or retrieve language that preserves the precise claim. More than one natural word is accepted where stated by the feedback.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: make / a / could / The / difference / change Keep the beginning “The change” and the final word “difference.” fixed.",
            "answers": [
              "The change could make a difference."
            ],
            "evidence": "Make a difference means have an effect.",
            "explanation": "The source supports this answer: Make a difference means have an effect.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: a / findings / explanation / possible / The / suggest Keep the beginning “The findings” and the final word “explanation.” fixed.",
            "answers": [
              "The findings suggest a possible explanation."
            ],
            "evidence": "Suggest avoids overstating proof.",
            "explanation": "The source supports this answer: Suggest avoids overstating proof.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: wider / consider / We / should / the / consequences Keep the beginning “We should” and the final word “consequences.” fixed.",
            "answers": [
              "We should consider the wider consequences."
            ],
            "evidence": "Consider the consequences is precise and natural.",
            "explanation": "The source supports this answer: Consider the consequences is precise and natural.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "id": "q6",
            "prompt": "Supply a natural noun: We must take the cost of maintenance into ___.",
            "answers": [
              "account",
              "consideration"
            ],
            "explanation": "Take into account and take into consideration mean include a factor when making a decision.",
            "evidence": "Take into account and take into consideration mean include a factor when making a decision.",
            "punctuation": "terminal",
            "maxWords": 1
          },
          {
            "id": "q7",
            "prompt": "Complete with one verb meaning make less severe, without promising elimination: Better insulation may ___ the impact of temperature changes.",
            "answers": [
              "reduce",
              "mitigate",
              "lessen",
              "limit",
              "moderate"
            ],
            "explanation": "The modal may and the verb reduce or mitigate retain the limited claim.",
            "evidence": "The modal may and the verb reduce or mitigate retain the limited claim.",
            "punctuation": "terminal",
            "maxWords": 1
          }
        ],
        "seconds": 600,
        "id": "band4-writing-lexical-resource-stage-3",
        "contentVersion": 2
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-grammatical-range",
  "lessonId": "band4-writing-grammatical-range",
  "type": "course-activity",
  "prompt": "Grammatical range with control — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Grammatical range with control",
    "learn": "A range of sentence structures can help express complex meaning, but accuracy and relevance matter. There is no official quota requiring a fixed number of conditionals or relative clauses. Use a structure when it communicates the relationship you need, and check that punctuation and reference remain clear.",
    "worked": {
      "example": "Although the trial was short, it revealed a problem that deserves further study.",
      "reasoning": "The concession and relative clause each serve a meaning; they are not inserted to meet a quota."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: Grammatical range with control",
        "instructions": "Build each main clause before adding a reason, concession, condition or relative clause. Check that every finite verb has its intended subject. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: short, / the / it / trial / Although / was / useful / was Keep the beginning “Although the” and the final word “useful.” fixed.",
            "answers": [
              "Although the trial was short, it was useful."
            ],
            "evidence": "Although marks concession.",
            "explanation": "The source supports this answer: Although marks concession.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: staff / the / centre / understand / procedure / The / who / needs Keep the beginning “The centre” and the final word “procedure.” fixed.",
            "answers": [
              "The centre needs staff who understand the procedure."
            ],
            "evidence": "Who introduces a defining relative clause.",
            "explanation": "The source supports this answer: Who introduces a defining relative clause.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: extend / we / will / demand / increases, / the / hours / If Keep the beginning “If demand” and the final word “hours.” fixed.",
            "answers": [
              "If demand increases, we will extend the hours."
            ],
            "evidence": "A real condition links demand to a possible response.",
            "explanation": "The source supports this answer: A real condition links demand to a possible response.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-writing-grammatical-range-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: Grammatical range with control",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: service / The / is / it / helpful / because / reduces / travel Keep the beginning “The service” and the final word “travel.” fixed.",
            "answers": [
              "The service is helpful because it reduces travel."
            ],
            "evidence": "Because gives the reason.",
            "explanation": "The source supports this answer: Because gives the reason.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: is / The / was / room, / which / available / repaired, / recently / now Keep the beginning “The room,” and the final word “available.” fixed.",
            "answers": [
              "The room, which was recently repaired, is now available."
            ],
            "evidence": "The non-defining clause is separated by commas.",
            "explanation": "The source supports this answer: The non-defining clause is separated by commas.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: prefer / While / need / personal / others / some / access, / users / support / online Keep the beginning “While some” and the final word “support.” fixed.",
            "answers": [
              "While some users prefer online access, others need personal support."
            ],
            "evidence": "While contrasts different needs.",
            "explanation": "The source supports this answer: While contrasts different needs.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: work / The / will / how / scheme / the / should / explain / council Keep the beginning “The council” and the final word “work.” fixed.",
            "answers": [
              "The council should explain how the scheme will work."
            ],
            "evidence": "The embedded clause uses statement order.",
            "explanation": "The source supports this answer: The embedded clause uses statement order.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: evidence / sample / would / stronger / provide / A / larger Keep the beginning “A larger” and the final word “evidence.” fixed.",
            "answers": [
              "A larger sample would provide stronger evidence."
            ],
            "evidence": "Would presents a hypothetical benefit.",
            "explanation": "The source supports this answer: Would presents a hypothetical benefit.",
            "id": "q5",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-writing-grammatical-range-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: Grammatical range with control",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: is / secured / funding / continue / if / The / project / can Keep the beginning “The project” and the final word “secured.” fixed.",
            "answers": [
              "The project can continue if funding is secured."
            ],
            "evidence": "The if-clause sets a condition.",
            "explanation": "The source supports this answer: The if-clause sets a condition.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: failed / why / report / explains / first / The / plan / the Keep the beginning “The report” and the final word “failed.” fixed.",
            "answers": [
              "The report explains why the first plan failed."
            ],
            "evidence": "Why introduces an explanatory embedded clause.",
            "explanation": "The source supports this answer: Why introduces an explanatory embedded clause.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: costs / The / always / least / is / best / option / that / not Keep the beginning “The option” and the final word “best.” fixed.",
            "answers": [
              "The option that costs least is not always best."
            ],
            "evidence": "The relative clause identifies the option.",
            "explanation": "The source supports this answer: The relative clause identifies the option.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-writing-grammatical-range-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-grammar-inversion",
  "lessonId": "band4-grammar-inversion",
  "type": "course-activity",
  "prompt": "Inversion and cleft sentences without forced complexity — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Inversion and cleft sentences without forced complexity",
    "learn": "Negative inversion and cleft sentences can create emphasis, but they are optional language resources rather than requirements for a particular IELTS band. Use them only when they suit the meaning. After “Hardly” in a past sequence, past perfect commonly establishes the first event. Avoid replacing a natural sentence with an awkward construction solely to appear advanced.",
    "worked": {
      "example": "Hardly had I entered when the alarm sounded. It was the lack of notice that caused the difficulty.",
      "reasoning": "Had I entered gives the earlier past event. The cleft focuses attention on the actual cause."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: Inversion and cleft sentences without forced complexity",
        "instructions": "Start from the ordinary clause. Locate an existing auxiliary or supply do-support, then move only the elements required by the fronted frame. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: when / had / the / I / Hardly / arrived / began / meeting Keep the beginning “Hardly had” and the final word “began.” fixed.",
            "answers": [
              "Hardly had I arrived when the meeting began."
            ],
            "evidence": "Hardly + past perfect inversion establishes the earlier event.",
            "explanation": "The source supports this answer: Hardly + past perfect inversion establishes the earlier event.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: we / problem / the / did / Only / understand / then Keep the beginning “Only then” and the final word “problem.” fixed.",
            "answers": [
              "Only then did we understand the problem."
            ],
            "evidence": "Only then triggers auxiliary inversion.",
            "explanation": "The source supports this answer: Only then triggers auxiliary inversion.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: caused / timing / that / was / the / the / difficulty / It Keep the beginning “It was” and the final word “difficulty.” fixed.",
            "answers": [
              "It was the timing that caused the difficulty."
            ],
            "evidence": "The cleft focuses on timing.",
            "explanation": "The source supports this answer: The cleft focuses on timing.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-inversion-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: Inversion and cleft sentences without forced complexity",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: did / reduce / Not / costs, / improved / plan / only / the / also / access / it / but Keep the beginning “Not only” and the final word “access.” fixed.",
            "answers": [
              "Not only did the plan reduce costs, but it also improved access."
            ],
            "evidence": "Not only triggers inversion in the first clause.",
            "explanation": "The source supports this answer: Not only triggers inversion in the first clause.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: instructions / have / Rarely / clear / such / we / received Keep the beginning “Rarely have” and the final word “instructions.” fixed.",
            "answers": [
              "Rarely have we received such clear instructions."
            ],
            "evidence": "Rarely triggers auxiliary–subject inversion.",
            "explanation": "The source supports this answer: Rarely triggers auxiliary–subject inversion.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: lack / It / the / concerns / is / that / support / us / of Keep the beginning “It is” and the final word “us.” fixed.",
            "answers": [
              "It is the lack of support that concerns us."
            ],
            "evidence": "The cleft identifies the concern.",
            "explanation": "The source supports this answer: The cleft identifies the concern.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: Never / the / team / before / problem / this / faced / had Keep the beginning “Never had” and the final word “before.” fixed.",
            "answers": [
              "Never had the team faced this problem before."
            ],
            "evidence": "Past perfect inversion follows never.",
            "explanation": "The source supports this answer: Past perfect inversion follows never.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / policy / the / did / change / council / after / its / Only / review Keep the beginning “Only after” and the final word “policy.” fixed.",
            "answers": [
              "Only after the review did the council change its policy."
            ],
            "evidence": "Only after introduces the restrictive adverbial.",
            "explanation": "The source supports this answer: Only after introduces the restrictive adverbial.",
            "id": "q5",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-inversion-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: Inversion and cleft sentences without forced complexity",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: when / the / opened / had / doors / stopped / Hardly / train / the Keep the beginning “Hardly had” and the final word “opened.” fixed.",
            "answers": [
              "Hardly had the train stopped when the doors opened."
            ],
            "evidence": "The first event uses past perfect inversion.",
            "explanation": "The source supports this answer: The first event uses past perfect inversion.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: page / they / later / did / the / Only / missing / discover Keep the beginning “Only later” and the final word “page.” fixed.",
            "answers": [
              "Only later did they discover the missing page."
            ],
            "evidence": "Only later triggers did + subject + base verb.",
            "explanation": "The source supports this answer: Only later triggers did + subject + base verb.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: clear / It / users / explanation / that / needed / was / a / the Keep the beginning “It was” and the final word “needed.” fixed.",
            "answers": [
              "It was a clear explanation that the users needed."
            ],
            "evidence": "The cleft focuses on the requested support.",
            "explanation": "The source supports this answer: The cleft focuses on the requested support.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-inversion-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-grammar-participles",
  "lessonId": "band4-grammar-participles",
  "type": "course-activity",
  "prompt": "Participle clauses and unambiguous subjects — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Participle clauses and unambiguous subjects",
    "learn": "A participle clause normally shares its understood subject with the main clause. Check who performs the action before using a shortened form. “Walking to work, the rain started” wrongly suggests that the rain was walking. A full subordinate clause is often clearer when subjects differ. Complex syntax should reduce repetition without creating ambiguity.",
    "worked": {
      "example": "Having checked the figures, the researcher revised the report.",
      "reasoning": "The researcher performed both actions, so the understood subject is clear."
    },
    "tasks": [
      {
        "kind": "language",
        "title": "Guided sentence building: Participle clauses and unambiguous subjects",
        "instructions": "Name the actor of both actions before reducing a clause. Retain the full clause if reducing it would attach the action to the wrong subject. Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / researcher / checked / figures, / the / the / Having / report / revised Keep the beginning “Having checked” and the final word “report.” fixed.",
            "answers": [
              "Having checked the figures, the researcher revised the report."
            ],
            "evidence": "The researcher checked and revised.",
            "explanation": "The source supports this answer: The researcher checked and revised.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: volunteers / repair / the / the / Working / completed / together, Keep the beginning “Working together,” and the final word “repair.” fixed.",
            "answers": [
              "Working together, the volunteers completed the repair."
            ],
            "evidence": "Volunteers perform both actions.",
            "explanation": "The source supports this answer: Volunteers perform both actions.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: started, / walking / I / was / to / rain / work / the / When Keep the beginning “When the” and the final word “work.” fixed.",
            "answers": [
              "When the rain started, I was walking to work."
            ],
            "evidence": "Different subjects require a full clause here.",
            "explanation": "The source supports this answer: Different subjects require a full clause here.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-participles-stage-1",
        "contentVersion": 2
      },
      {
        "kind": "language",
        "title": "Independent sentence building: Participle clauses and unambiguous subjects",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / use / Having / completed / could / staff / training, / equipment / the Keep the beginning “Having completed” and the final word “equipment.” fixed.",
            "answers": [
              "Having completed the training, staff could use the equipment."
            ],
            "evidence": "Staff completed training and gained permission.",
            "explanation": "The source supports this answer: Staff completed training and gained permission.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / for / Designed / each / course / explains / beginners, / step Keep the beginning “Designed for” and the final word “step.” fixed.",
            "answers": [
              "Designed for beginners, the course explains each step."
            ],
            "evidence": "The course was designed for beginners.",
            "explanation": "The source supports this answer: The course was designed for beginners.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: visitors / Waiting / the / read / outside, / notice / the Keep the beginning “Waiting outside,” and the final word “notice.” fixed.",
            "answers": [
              "Waiting outside, the visitors read the notice."
            ],
            "evidence": "The visitors were waiting and reading.",
            "explanation": "The source supports this answer: The visitors were waiting and reading.",
            "id": "q3",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: opening / Because / the / late, / missed / we / bus / was / the Keep the beginning “Because the” and the final word “opening.” fixed.",
            "answers": [
              "Because the bus was late, we missed the opening."
            ],
            "evidence": "A full clause keeps the different subjects clear.",
            "explanation": "The source supports this answer: A full clause keeps the different subjects clear.",
            "id": "q4",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: advice / the / changed / reviewing / its / committee / the / After / evidence, Keep the beginning “After reviewing” and the final word “advice.” fixed.",
            "answers": [
              "After reviewing the evidence, the committee changed its advice."
            ],
            "evidence": "The committee reviews and changes advice.",
            "explanation": "The source supports this answer: The committee reviews and changes advice.",
            "id": "q5",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-participles-stage-2"
      },
      {
        "kind": "language",
        "title": "Transfer sentence assessment: Participle clauses and unambiguous subjects",
        "instructions": "Read the complete source and answer each question. Use only the evidence given. These are original lesson tasks, not a complete examination paper.",
        "source": "Use every supplied word once. Type the complete sentence or question. Read the context in each explanation after submission. Sentence punctuation is part of these local editing tasks.",
        "questions": [
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: the / document / closed / copy, / I / Having / saved / a Keep the beginning “Having saved” and the final word “document.” fixed.",
            "answers": [
              "Having saved a copy, I closed the document."
            ],
            "evidence": "I performed both actions.",
            "explanation": "The source supports this answer: I performed both actions.",
            "id": "q1",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: requires / centre / flood / river, / the / protection / Built / beside / the Keep the beginning “Built beside” and the final word “protection.” fixed.",
            "answers": [
              "Built beside the river, the centre requires flood protection."
            ],
            "evidence": "The centre was built beside the river.",
            "explanation": "The source supports this answer: The centre was built beside the river.",
            "id": "q2",
            "punctuation": "terminal"
          },
          {
            "prompt": "Arrange these words into the intended sentence or question, including final punctuation: failed / was / While / I / the / speaking, / connection Keep the beginning “While I” and the final word “failed.” fixed.",
            "answers": [
              "While I was speaking, the connection failed."
            ],
            "evidence": "The connection is not the speaker, so use a full clause.",
            "explanation": "The source supports this answer: The connection is not the speaker, so use a full clause.",
            "id": "q3",
            "punctuation": "terminal"
          }
        ],
        "seconds": 600,
        "id": "band4-grammar-participles-stage-3"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-writing-band8-essay",
  "lessonId": "band4-writing-band8-essay",
  "type": "course-activity",
  "prompt": "General Training Task 2: full model and critical comparison — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "General Training Task 2: full model and critical comparison",
    "learn": "A complete essay needs a clear response, developed reasoning and a conclusion consistent with the body. Compare your own draft with a model by identifying how it answers the question, not by copying phrases. The model is original teaching material and has not received an official band. A target band is a learning goal rather than a guarantee.",
    "worked": {
      "example": "A paragraph about a festival should explain who benefits and under which conditions, rather than merely call it exciting.",
      "reasoning": "Specific reasoning gives the reader something to evaluate."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided argument analysis",
        "instructions": "Write 60–90 words explaining why repeated local activities might support social connections more effectively than one large event. Include a limitation.",
        "model": "Repeated activities give people time to recognise one another and develop trust. A weekly repair group, for example, allows neighbours to exchange practical help over several months rather than meet only once. However, regular meetings can exclude people whose schedules vary, so organisers should consider different times and ways to participate. The benefit comes from meaningful repeated contact, not simply from counting how many sessions appear on a calendar.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I explain how repeated contact can support connections and acknowledge a limit.",
          "Development: I make the causal bridge visible rather than call small events better.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I avoid claiming every participant will become friends."
        ],
        "analysis": "Review this response against its own demand: Explain how repeated contact can support connections and acknowledge a limit. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will make the causal bridge visible rather than call small events better; a weaker one only names the topic or repeats a judgement. For your revision, avoid claiming every participant will become friends. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band4-writing-band8-essay-stage-1",
        "compatibleWithSignature": "v1-247685c"
      },
      {
        "kind": "writing",
        "title": "Independent full essay",
        "instructions": "Some people think local councils should spend more on large cultural events. Others prefer regular neighbourhood activities. Discuss both views and give your opinion. Write at least 250 words.",
        "model": "Some towns spend large sums on major cultural events, while smaller neighbourhood activities receive less attention. I believe both can have value, but local authorities should give priority to activities that residents can use regularly and that remain affordable to maintain.\n\nA large festival can attract visitors and create opportunities for local businesses. It may also bring residents together around a shared experience. These benefits are strongest when local people can participate rather than simply watch an event designed mainly for tourists. However, a brief increase in visitor numbers does not establish a lasting improvement in community life.\n\nRegular neighbourhood activities offer a different advantage. A weekly repair group, reading club or accessible sports session creates repeated contact between people who might otherwise remain strangers. This can build trust gradually and provide practical support. Such activities may be less visible than a major festival, yet their value should not be judged only by publicity or attendance on one day.\n\nFunding decisions should therefore consider access, continuity and realistic staffing. A programme that depends on a few exhausted volunteers may not survive even if its initial event is popular. The council could support modest activities in existing buildings and review participation before expanding them. Larger events could still receive funding when their wider benefits are clearly explained and essential local services are protected.\n\nIn conclusion, a balanced cultural programme need not reject major occasions. Nevertheless, regular opportunities for residents to learn, meet and participate should form its foundation. Public money is more likely to create lasting value when success is defined through meaningful access and sustainable activity rather than a single impressive crowd.",
        "minWords": 250,
        "seconds": 2400,
        "rubric": [
          "Content: I discuss large events and regular activities with a funding judgement.",
          "Development: I compare relevant benefits and costs before choosing a priority.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I check that each example supports the actual funding decision."
        ],
        "analysis": "Review this response against its own demand: Discuss large events and regular activities with a funding judgement. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will compare relevant benefits and costs before choosing a priority; a weaker one only names the topic or repeats a judgement. For your revision, check that each example supports the actual funding decision. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "id": "band4-writing-band8-essay-stage-2",
        "compatibleWithSignature": "v1-62ba0e38"
      },
      {
        "kind": "writing",
        "title": "Assessment: fresh paragraph comparison",
        "instructions": "Write 100–140 words evaluating whether a town should provide free training for volunteers. Explain a benefit, a cost and a condition for success.",
        "model": "Free training can make volunteering more accessible by removing a cost that might discourage capable people. It can also improve safety and help volunteers understand when they should ask for professional support. However, training uses staff time and resources, so a town should connect it with roles that have a clear purpose. A short course without opportunities to apply the learning may achieve little. I would support a programme that combines instruction, supervised practice and follow-up feedback. Its success should be assessed through the quality of the work and the support volunteers receive, rather than the number of certificates issued.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I evaluate free volunteer training with benefit, cost and condition.",
          "Development: I show how the training could improve readiness and what it requires.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I retain the condition for success in the final judgement."
        ],
        "analysis": "Review this response against its own demand: Evaluate free volunteer training with benefit, cost and condition. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will show how the training could improve readiness and what it requires; a weaker one only names the topic or repeats a judgement. For your revision, retain the condition for success in the final judgement. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 140,
        "id": "band4-writing-band8-essay-stage-3",
        "compatibleWithSignature": "v1-d733e4c4"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-speaking-storytelling",
  "lessonId": "band4-speaking-storytelling",
  "type": "course-activity",
  "prompt": "Part 2: coherent storytelling — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Part 2: coherent storytelling",
    "learn": "Use relevant detail and natural language to communicate a connected answer. IELTS Speaking criteria are fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. The model is a possible response, not a script to memorise or an examiner-rated performance. Record, replay and identify a specific change before retrying.",
    "worked": {
      "example": "When our meeting room was locked, I first checked whether reception had a spare key. It did not, so I asked the group to wait in the café while I contacted the organiser. We moved to another room, and I learned to confirm access before an event.",
      "reasoning": "The response stays relevant and connects ideas clearly. Stress and phrasing should make meaning easier to follow rather than display complexity."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided rehearsal",
        "instructions": "Describe a small problem you solved. Use a clear beginning, turning point and outcome.",
        "model": "When our meeting room was locked, I first checked whether reception had a spare key. It did not, so I asked the group to wait in the café while I contacted the organiser. We moved to another room, and I learned to confirm access before an event.",
        "rubric": [
          "Relevance: I give a problem, turning point and observable outcome.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to give a problem, turning point and observable outcome. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "audio": {
          "src": "/media/courses/course-audio-089.wav",
          "transcript": "When our meeting room was locked, I first checked whether reception had a spare key. It did not, so I asked the group to wait in the café while I contacted the organiser. We moved to another room, and I learned to confirm access before an event.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band4-speaking-storytelling-stage-1",
        "compatibleWithSignature": "v1-7f001a51"
      },
      {
        "kind": "speaking",
        "title": "Independent spoken response",
        "instructions": "Describe a time you helped someone learn a skill. Say who the person was, what they wanted to learn, what you did and how you felt. Prepare for one minute, then speak for up to two minutes.",
        "model": "I helped a colleague, Leila, learn a new booking system at the community centre where we worked. She already knew how to welcome visitors and organise activities, but the software had changed and she was worried about making a reservation that nobody could find later.\n\nWe chose a quiet afternoon and used a practice account, so there was no risk of changing a real booking. I first asked her to create one reservation for a small meeting room. Rather than show every feature, I explained the three decisions she needed immediately: the date, the number of people and whether equipment was required. She entered the details while I watched.\n\nWhen the confirmation appeared, it showed the following week instead of the intended date. I was tempted to correct it myself, but I asked her to compare the confirmation with her notes. She found the mistake and worked out which calendar control had caused it. We then changed the date and checked the confirmation again.\n\nBefore finishing, we practised a cancellation and wrote a short checklist in her own words. The next day she handled a visitor's request independently and only asked me to confirm one equipment option. I felt pleased because she had gained confidence through understanding the process, not through memorising where I clicked. Helping her also improved my own explanations. I learned that allowing someone time to notice and correct a small mistake can be more useful than giving a quick demonstration of everything.\n\nA week later I asked which part still felt confusing. Leila said she could make ordinary bookings but wanted more practice with equipment requests. We arranged another short session rather than repeat the whole introduction. That follow-up mattered because her remaining question was specific, and it showed me that useful teaching continues after the first successful attempt.",
        "rubric": [
          "Relevance: I develop how another person learned, including my help and its result.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 120,
        "analysis": "Use the actual recording to develop how another person learned, including my help and its result. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "preparationSeconds": 60,
        "id": "band4-speaking-storytelling-stage-2",
        "contentVersion": 2,
        "modelAudio": {
          "src": "/media/courses/recovery-band4-speaking-storytelling-long-turn.wav",
          "label": "Original synthetic long-turn demonstration · Samantha · paced EnglishCamp model."
        },
        "compatibleWithSignature": "v2-3ce4daa0"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Describe a different occasion when you learned from a mistake. Explain the situation, the mistake and the change you made afterwards.",
        "model": "I once arrived at the wrong entrance for a course because I relied on an old email. The organiser helped me find the room, but I missed the introduction. Since then I check the latest practical information the evening before an event. It is a small habit that prevents unnecessary stress.",
        "rubric": [
          "Relevance: I explain a different mistake and the change made afterwards.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to explain a different mistake and the change made afterwards. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced. There is no official spoken-word minimum; develop the requested content within the task’s stated speaking time.",
        "id": "band4-speaking-storytelling-stage-3",
        "compatibleWithSignature": "v1-a9e06b3f"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-speaking-abstract-topics",
  "lessonId": "band4-speaking-abstract-topics",
  "type": "course-activity",
  "prompt": "Part 3: abstract questions with concrete support — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Part 3: abstract questions with concrete support",
    "learn": "Use relevant detail and natural language to communicate a connected answer. IELTS Speaking criteria are fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. The model is a possible response, not a script to memorise or an examiner-rated performance. Record, replay and identify a specific change before retrying.",
    "worked": {
      "example": "People may resist change because the immediate disruption is clearer than the promised benefit. A new work system can require time and expose mistakes before it becomes useful. However, resistance is not always irrational; users may notice a practical problem that planners have overlooked.",
      "reasoning": "The response stays relevant and connects ideas clearly. Stress and phrasing should make meaning easier to follow rather than display complexity."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided rehearsal",
        "instructions": "Why do people sometimes resist changes that could benefit them? Give one reason and a qualification.",
        "model": "People may resist change because the immediate disruption is clearer than the promised benefit. A new work system can require time and expose mistakes before it becomes useful. However, resistance is not always irrational; users may notice a practical problem that planners have overlooked.",
        "rubric": [
          "Relevance: I explain one resistance mechanism and a genuine qualification.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to explain one resistance mechanism and a genuine qualification. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "audio": {
          "src": "/media/courses/course-audio-090.wav",
          "transcript": "People may resist change because the immediate disruption is clearer than the promised benefit. A new work system can require time and expose mistakes before it becomes useful. However, resistance is not always irrational; users may notice a practical problem that planners have overlooked.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band4-speaking-abstract-topics-stage-1",
        "compatibleWithSignature": "v1-b9fcae07"
      },
      {
        "kind": "speaking",
        "title": "Independent spoken response",
        "instructions": "How should organisations decide when to preserve a tradition and when to change it? Develop a reasoned view with an example and a counterpoint.",
        "model": "An organisation should ask what purpose the tradition serves and whether it still meets that purpose fairly. A regular community meal may remain valuable because it brings people together, but the timing or food choices might need to change as the neighbourhood changes. Preserving the social purpose can matter more than repeating every detail. At the same time, changes should be discussed with participants rather than imposed simply to appear modern.",
        "rubric": [
          "Relevance: I state a tradition/change principle, example and counterpoint.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to state a tradition/change principle, example and counterpoint. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-speaking-abstract-topics-stage-2",
        "compatibleWithSignature": "v1-49cdd751"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Is equal treatment always the same as fair treatment? Explain using a practical example, then acknowledge a difficulty.",
        "model": "Not necessarily. Giving everyone the same printed instructions may appear equal, but someone with a visual impairment may need another format to access the same information. Fairness can require different support. The difficulty is deciding what is genuinely needed without making assumptions about a person, so consultation and clear criteria are important.",
        "rubric": [
          "Relevance: I distinguish equal and fair treatment through a practical example and difficulty.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to distinguish equal and fair treatment through a practical example and difficulty. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-speaking-abstract-topics-stage-3",
        "compatibleWithSignature": "v1-68c9fc62"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-speaking-pronunciation",
  "lessonId": "band4-speaking-pronunciation",
  "type": "course-activity",
  "prompt": "Pronunciation: intelligibility, stress and phrasing — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Pronunciation: intelligibility, stress and phrasing",
    "learn": "Use relevant detail and natural language to communicate a connected answer. IELTS Speaking criteria are fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. Word stress can distinguish related forms: PHOtograph, phoTOGraphy and photoGRAPHic. Intelligibility matters more than imitation of a particular accent. The model is a possible response, not a script to memorise or an examiner-rated performance. Record, replay and identify a specific change before retrying.",
    "worked": {
      "example": "The appointment is on Thursday, not Tuesday. Please bring the signed form, but you do not need to bring a photograph.",
      "reasoning": "The response stays relevant and connects ideas clearly. Stress and phrasing should make meaning easier to follow rather than display complexity."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided rehearsal",
        "instructions": "Listen to the model, then record the same message with clear meaning groups. Do not imitate an accent you cannot control naturally.",
        "model": "The appointment is on Thursday, not Tuesday. Please bring the signed form, but you do not need to bring a photograph.",
        "rubric": [
          "Relevance: I retain the model’s practical details while using intelligible meaning groups.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to retain the model’s practical details while using intelligible meaning groups. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "audio": {
          "src": "/media/courses/course-audio-091.wav",
          "transcript": "The appointment is on Thursday, not Tuesday. Please bring the signed form, but you do not need to bring a photograph.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band4-speaking-pronunciation-stage-1",
        "compatibleWithSignature": "v1-8de01fd0"
      },
      {
        "kind": "speaking",
        "title": "Independent spoken response",
        "instructions": "Explain a change to an appointment: the day is now Friday, the location is unchanged, and the listener must bring identification. Use stress to make the changed detail clear.",
        "model": "The appointment is now on Friday. The location is still the same, so you should use the usual entrance. Please bring identification when you collect the documents. You do not need to complete another form, because your original application remains valid.",
        "rubric": [
          "Relevance: I make Friday the changed detail while keeping the unchanged location and identification requirement.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to make Friday the changed detail while keeping the unchanged location and identification requirement. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-speaking-pronunciation-stage-2",
        "compatibleWithSignature": "v1-f5f9e3e5"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Record a new message explaining that a workshop is suitable for beginners, equipment is supplied, and booking is still required. Replay it and identify one unclear word or rushed phrase.",
        "model": "The workshop is suitable for complete beginners, and all equipment is supplied. You still need to book a place in advance because the room is small. If you have a question about access, contact the organiser before making the reservation.",
        "rubric": [
          "Relevance: I preserve beginner suitability, supplied equipment and required booking as distinct facts.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to preserve beginner suitability, supplied equipment and required booking as distinct facts. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-speaking-pronunciation-stage-3",
        "compatibleWithSignature": "v1-ebff3494"
      }
    ]
  },
  "xpReward": 20
},
  {
  "id": "activity-band4-vocab-idioms",
  "lessonId": "band4-vocab-idioms",
  "type": "course-activity",
  "prompt": "Natural vocabulary and idioms in spoken answers — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "Natural vocabulary and idioms in spoken answers",
    "learn": "Use relevant detail and natural language to communicate a connected answer. IELTS Speaking criteria are fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. The model is a possible response, not a script to memorise or an examiner-rated performance. Record, replay and identify a specific change before retrying.",
    "worked": {
      "example": "I took time to compare the courses because the cheapest option did not include practical sessions. In the end I chose the one with more supervised practice. It cost more, but it matched the skill I actually wanted to learn.",
      "reasoning": "The response stays relevant and connects ideas clearly. Stress and phrasing should make meaning easier to follow rather than display complexity."
    },
    "tasks": [
      {
        "kind": "speaking",
        "title": "Guided rehearsal",
        "instructions": "Explain a decision that required careful thought. Use ordinary precise language; an idiom is optional.",
        "model": "I took time to compare the courses because the cheapest option did not include practical sessions. In the end I chose the one with more supervised practice. It cost more, but it matched the skill I actually wanted to learn.",
        "rubric": [
          "Relevance: I explain the decision and reasoning; use an idiom only if it fits.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to explain the decision and reasoning; use an idiom only if it fits. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "audio": {
          "src": "/media/courses/course-audio-092.wav",
          "transcript": "I took time to compare the courses because the cheapest option did not include practical sessions. In the end I chose the one with more supervised practice. It cost more, but it matched the skill I actually wanted to learn.",
          "label": "Original synthetic speech · Samantha · model/stimulus audio."
        },
        "id": "band4-vocab-idioms-stage-1",
        "compatibleWithSignature": "v1-b28bc706"
      },
      {
        "kind": "speaking",
        "title": "Independent spoken response",
        "instructions": "Describe a habit that helps you manage work or study. Explain why it helps and when it is less effective. Avoid inserting memorised idioms that do not fit.",
        "model": "I write a short plan before starting a complicated task. It helps me separate the main goal from small details and notice what information is missing. The habit is less useful when I spend too long planning instead of beginning, so I limit it to a few minutes and revise the plan as I work.",
        "rubric": [
          "Relevance: I develop the work/study habit’s benefit and a situation where it helps less.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to develop the work/study habit’s benefit and a situation where it helps less. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-vocab-idioms-stage-2",
        "compatibleWithSignature": "v1-238928ae"
      },
      {
        "kind": "speaking",
        "title": "Transfer assessment",
        "instructions": "Discuss whether people should always follow advice from someone more experienced. Give a qualified answer and a specific example.",
        "model": "Experience can make advice valuable, but the situation still matters. A colleague’s method may work well with one system and poorly with a newer version. I would ask why the advice works and test whether the same conditions apply. That respects the person’s experience without treating it as a rule that cannot be questioned.",
        "rubric": [
          "Relevance: I give a qualified experienced-advice judgement with a specific example.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to give a qualified experienced-advice judgement with a specific example. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-vocab-idioms-stage-3",
        "compatibleWithSignature": "v1-e581600c"
      }
    ]
  },
  "xpReward": 20
},
  {
    "id": "activity-band4-exam-day-strategies",
    "lessonId": "band4-exam-day-strategies",
    "type": "course-activity",
    "prompt": "Exam-day planning and realistic practice — guided practice, independent response and transfer assessment",
    "data": {
      "exam": "IELTS General Training",
      "objective": "Exam-day planning and realistic practice",
      "learn": "Separate practical readiness from language performance. Use your own test-provider booking instructions to confirm identification, venue, delivery mode and arrival requirements. Mark unknown details for verification rather than inventing rules. Plan travel, a backup route and a realistic final-day routine. This logistical plan is not evidence of an IELTS band; the next module reviews language-learning evidence across four skills.",
      "worked": {
        "example": "My booking says to arrive at a specified time. I will confirm the venue entrance, check the journey beforehand and keep the provider’s contact details available. If transport fails, I will follow the provider’s instructions rather than assume a late arrival will be accepted.",
        "reasoning": "The plan separates a verified requirement, an action and a contingency. Local advice cannot replace the instructions for a particular booking."
      },
      "tasks": [
        {
          "kind": "writing",
          "title": "Guided logistics check",
          "instructions": "Write 60–90 words distinguishing two details confirmed in your booking instructions from two details you still need to check. If you have no booking, use a clearly labelled hypothetical checklist. Do not invent identification or arrival rules.",
          "model": "I have not booked a test yet, so this is a hypothetical checklist rather than a statement of test-provider rules. I would first confirm the exact venue and the identification document required for my booking. I would also check the stated arrival time and whether the Speaking appointment is separate. Until I receive those instructions, I should not assume that another candidate’s arrangements apply to me.",
          "minWords": 60,
          "seconds": 600,
          "rubric": [
            "I distinguish confirmed instructions from assumptions.",
            "I identify a reliable source for details still to verify.",
            "My actions and contingency are specific and feasible.",
            "My wording is clear and does not invent test-provider rules."
          ],
          "analysis": "Check that the plan distinguishes verified instructions, personal choices, unknown details and contingencies. This is logistics self-review, not assessment of examination readiness.",
          "maxWords": 90,
          "id": "band4-exam-day-strategies-stage-1",
          "contentVersion": 2
        },
        {
          "kind": "writing",
          "title": "Independent final-day plan",
          "instructions": "Write 100–140 words planning the day before and the morning of your test. Include the source of requirements, a travel contingency, and a realistic preparation limit. Separate confirmed information from details still to verify.",
          "model": "The day before my test, I would read the latest booking instructions and check the venue entrance against a map. I would prepare the identification specified by the provider and keep the booking details available. I would check the route and identify another way to travel if the usual service were disrupted. The departure time would depend on the required arrival time, which I still need to confirm. I would finish heavy practice early enough to rest, rather than attempt to learn a new essay script late at night. In the morning, I would check for messages from the provider and follow its instructions if a practical problem arose.",
          "minWords": 100,
          "seconds": 600,
          "rubric": [
            "I distinguish confirmed instructions from assumptions.",
            "I identify a reliable source for details still to verify.",
            "My actions and contingency are specific and feasible.",
            "My wording is clear and does not invent test-provider rules."
          ],
          "analysis": "Check that the plan distinguishes verified instructions, personal choices, unknown details and contingencies. This is logistics self-review, not assessment of examination readiness.",
          "maxWords": 140,
          "id": "band4-exam-day-strategies-stage-2",
          "contentVersion": 2
        },
        {
          "kind": "speaking",
          "title": "Assessment: explain a contingency",
          "instructions": "Explain how you would handle a transport disruption on test day. Distinguish your own backup plan from the test provider’s rules; identify one detail you must verify.",
          "model": "I would first check whether my planned alternative route could still reach the venue in time. I would keep the provider’s contact information available and follow its instructions if arrival became uncertain. I would not assume that sending a message automatically permits late entry. Before test day, I need to verify the required arrival time and the procedure for reporting a serious disruption.",
          "rubric": [
            "Fluency and coherence: my ideas form a relevant, connected answer with useful development.",
            "Lexical resource: I used natural, precise language and clarified meaning when needed.",
            "Grammatical range and accuracy: I listened for tense, agreement and sentence control.",
            "Pronunciation: I replayed the response and checked intelligibility, stress and meaningful pauses."
          ],
          "seconds": 90,
          "analysis": "Check that the plan distinguishes verified instructions, personal choices, unknown details and contingencies. This is logistics self-review, not assessment of examination readiness.",
          "id": "band4-exam-day-strategies-stage-3",
          "contentVersion": 2
        }
      ]
    },
    "xpReward": 20
  },
  {
  "id": "activity-band4-review",
  "lessonId": "band4-review",
  "type": "course-activity",
  "prompt": "General Training review: evidence and next steps — guided practice, independent response and transfer assessment",
  "data": {
    "exam": "IELTS General Training",
    "objective": "General Training review: evidence and next steps",
    "learn": "Review evidence from Listening, Reading, General Training Writing and Speaking separately. Use a completed task and a fresh response where possible; repeat success on a familiar item may reflect memory. Explain the error, the evidence that corrected it and the next activity. Local checked-answer results and self-review records are different kinds of evidence. Ask for qualified feedback when writing quality, pronunciation or an external score matters.",
    "worked": {
      "example": "Listening: I chose the first suggested time rather than the final agreement. Reading: I overlooked an exception. These are different evidence-tracking problems; I will test each on an unfamiliar source.",
      "reasoning": "A four-skill review uses concrete evidence and targeted follow-up, while keeping self-review and official assessment separate."
    },
    "tasks": [
      {
        "kind": "writing",
        "title": "Guided evidence review",
        "instructions": "For general training review: evidence and next steps, write 60–90 words identifying one concrete difficulty from a previous activity and a relevant follow-up. Avoid assigning yourself a band.",
        "model": "In the letter task, I explained the problem but left the requested action unclear. A reader would know why I was unhappy without knowing what response I needed. I will revise the final paragraph to ask for an inspection and state when I am available. In a fresh letter, I will check whether every content point is developed and whether the recipient can act on the request without asking for missing details.",
        "minWords": 60,
        "seconds": 600,
        "rubric": [
          "Content: I identify one actual difficulty and relevant follow-up.",
          "Development: I connect the response evidence to a teachable target.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I avoid an unsupported band or global claim about ability."
        ],
        "analysis": "Review this response against its own demand: Identify one actual difficulty and relevant follow-up. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will connect the response evidence to a teachable target; a weaker one only names the topic or repeats a judgement. For your revision, avoid an unsupported band or global claim about ability. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 90,
        "id": "band4-review-stage-1",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-7a1e66bb"
      },
      {
        "kind": "writing",
        "title": "Independent preparation plan",
        "instructions": "Write 100–160 words making a four-skill evidence review. For Listening, Reading, Writing and Speaking, identify a task, a specific observed difficulty and a next action. Mark any skill not yet practised as unassessed. Distinguish checked answers from self-review and state how a fresh task or external feedback will test improvement.",
        "model": "In Listening, I confused a suggested time with the final arrangement; I will explain the contrast in a new conversation before checking its transcript. In Reading, I missed an exception in a workplace notice, so I will underline conditions in a fresh text and justify each answer. My letter addressed the problem but did not request a clear action. I will revise that paragraph, then write to a different recipient without the model. Speaking remains unassessed because I have not recorded a full long turn. I will prepare notes, record a response and ask a teacher for feedback on intelligibility. The checked-answer results show which local items I answered correctly; the writing and speaking plans do not establish a band. I will compare new evidence after these activities rather than rely on course completion alone.",
        "minWords": 100,
        "seconds": 600,
        "rubric": [
          "Content: I review all four skills or mark missing evidence unassessed.",
          "Development: I give a task, observed difficulty and next action for each practised skill.",
          "Organisation and language: I checked clear references, complete sentences, agreement and wording suitable for this reader and purpose.",
          "Revision: I specify how a fresh response or external review will test improvement."
        ],
        "analysis": "Review this planning response against its own demand: Review all four skills or mark missing evidence unassessed. In the model, locate the step that helps the reader follow the reasoning or act on the message. A stronger response will give a task, observed difficulty and next action for each practised skill; a weaker one only names the topic or repeats a judgement. For your revision, specify how a fresh response or external review will test improvement. Compare the actual sentence or paragraph before and after the change. These are qualitative self-review prompts, not automatic marking or an examiner-rated score.",
        "maxWords": 160,
        "id": "band4-review-stage-2",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-72d84e09"
      },
      {
        "kind": "speaking",
        "title": "Assessment reflection",
        "instructions": "Explain which skill currently has the weakest evidence in your four-skill review. Refer to a concrete task or an unassessed skill, propose a fresh follow-up and identify what requires human feedback.",
        "model": "My weakest evidence is in Speaking because checklist completion does not show whether another person understands my long turn. I can listen for obvious pauses and missing ideas, but a teacher may notice problems I overlook. I will record a new response on an unfamiliar topic, compare its development with my first attempt and request feedback on intelligibility. I will record that feedback separately from the platform’s completion credit.",
        "rubric": [
          "Relevance: I identify the weakest evidence in my four-skill review, a concrete fresh follow-up and what needs human feedback.",
          "Development: I connected each reason or example to the requested answer rather than repeat a vague evaluation.",
          "Delivery: I replayed actual speech for recoverable key words, endings and meaningful phrase boundaries; a written plan leaves delivery unassessed.",
          "Revision: I selected one specific unclear, missing or repetitive part, repaired it and tried a fresh response."
        ],
        "seconds": 90,
        "analysis": "Use the actual recording to identify the weakest evidence in my four-skill review, a concrete fresh follow-up and what needs human feedback. A stronger answer makes the requested relationship clear; a weaker one may be fluent but omit the reason, change the time reference or tell an unrelated story. Locate one such difference in your own response and revise that part. Compare the supplied model for its decisions rather than memorise it. Brief model extracts illustrate organisation and do not set a required speech length. Recheck delivery on a fresh prompt. This is qualitative self-review; no automatic pronunciation, fluency or examiner score is produced.",
        "id": "band4-review-stage-3",
        "contentVersion": 2,
        "compatibleWithSignature": "v2-50657cdc"
      }
    ]
  },
  "xpReward": 20
}
] satisfies (Omit<Exercise, "data"> & { data: CourseActivityData })[];
