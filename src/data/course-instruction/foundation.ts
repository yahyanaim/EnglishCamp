import { foundationLessons } from "./foundation-lessons";
import type { InstructionChapter } from "./types";
export const foundationInstruction: Record<string, InstructionChapter> = {
  ...foundationLessons,
  "band1-toefl-intro": {
  "mode": "replace",
  "outcomes": [
    "Identify the word class and meaning required by a gap.",
    "Build and check a word-family form, including number, negative meaning and spelling.",
    "Explain a choice using both sentence structure and context."
  ],
  "prerequisite": "A clause normally contains a subject and a finite verb: The volunteers work. A noun names a person, thing or idea; an adjective describes a noun; an adverb often modifies a verb or adjective. If these labels are unfamiliar, use the examples below before attempting the timed activity.",
  "sections": [
    {
      "title": "1. Find the job before choosing the word",
      "paragraphs": [
        "Word formation changes a base word so it can do a particular grammatical job. In ‘The organisers explained the change’, explained is a verb. In ‘Their explanation was clear’, explanation is the subject noun. In ‘They gave a clear explanation’, clear is an adjective inside the noun phrase. In ‘They explained it clearly’, clearly tells us how they explained it. Related forms are not interchangeable just because their meanings belong to the same family.",
        "Read beyond the gap. An article such as a often begins a noun phrase, but the next word is not necessarily a noun: ‘a detailed explanation’ contains an adjective before its noun head. A linking verb such as seem can take an adjective complement: ‘The task seems manageable.’ A normal action verb may be modified by an adverb: ‘They worked efficiently.’ Identify the whole pattern rather than treating the nearest word as an automatic rule."
      ],
      "table": {
        "headers": [
          "Sentence frame",
          "Required role",
          "Reason"
        ],
        "rows": [
          [
            "The ___ was useful. (EXPLAIN)",
            "explanation: noun",
            "The phrase is the subject of was."
          ],
          [
            "a ___ guide (HELP)",
            "helpful: adjective",
            "It describes the noun guide."
          ],
          [
            "She answered ___. (POLITE)",
            "politely: adverb",
            "It describes how she answered."
          ],
          [
            "They ___ the results. (ANALYSIS)",
            "analyse / analyze: verb",
            "The subject needs a finite predicate."
          ]
        ]
      }
    },
    {
      "title": "Name the role before constructing a form",
      "paragraphs": [
        "Use a role-only rehearsal: “The ___ helped the group”; “a ___ explanation”; “explained it ___”. Do not invent words yet. The first gap heads the subject noun phrase, the second modifies explanation, and the third modifies explained. Label them noun / adjective / adverb. This keeps a spelling difficulty separate from a role difficulty.",
        "Now use CARE in two frames: “a ___ driver” and “The driver turned ___”. Complete the first as careful; leave the second until you can say which action the missing word modifies."
      ],
      "check": {
        "prompt": "Complete the second CARE frame and repair “The driver was carefully.”",
        "answer": "Carefully modifies turned. “The driver was careful” uses an adjective after linking was. “Was carefully turning” would be possible with an additional action verb, but that is a different sentence frame."
      }
    },
    {
      "title": "2. Build a family, then check spelling",
      "paragraphs": [
        "Suffixes can suggest a word class: -tion and -ment commonly form nouns, -able often forms adjectives, and -ly often forms adverbs. These are useful patterns, not permission to attach any suffix to any word. Maintain becomes maintenance, not maintainment; decide becomes decision, not decidement. Learn a family through complete sentences so that spelling and use stay connected.",
        "Some changes alter more than the ending. Happy becomes happiness, with y changing to i. Possible becomes possibility. Final silent e may disappear before a suffix: create → creation. Other forms retain it, so check the actual word rather than applying one universal spelling rule. An adjective ending in -ly, such as friendly, is not automatically an adverb. ‘In a friendly way’ is often clearer than inventing a form."
      ],
      "check": {
        "prompt": "The tutor gave a detailed ___ of the method. (EXPLAIN) Which role is needed, and why?",
        "answer": "Explanation. Detailed is already an adjective; the noun phrase a detailed explanation needs a noun head. Explain would leave the phrase without that noun, and explanatory would require a further noun."
      }
    },
    {
      "title": "3. Let meaning and number finish the decision",
      "paragraphs": [
        "Grammar can narrow the possibilities without deciding the meaning. ‘The instructions were ___’ could require helpful or unhelpful. Read the consequence: if users completed the task easily because of the instructions, helpful fits; if they were left confused, unhelpful may fit. Negative prefixes include un-, in-, im-, il- and ir-, but they belong to particular words: impossible and unreliable are established forms. Do not invent inpossible.",
        "Check number after finding the noun. ‘Several ___ attended’ needs a plural countable person-noun, such as participants, whereas ‘Their participation increased’ names the activity and normally stays uncountable. The final -s is part of the answer when the sentence requires it. Conversely, information and advice normally remain uncountable in these contexts; a plural quantity does not license informations or advices."
      ]
    },
    {
      "title": "Withdraw the role labels",
      "paragraphs": [
        "Source: “The path was poorly marked, so several walkers lost their way. The signs were ___ (HELP). After receiving three written ___ (COMPLAIN), the owner replaced them.” First find the consequence, then the number cue. Do not automatically choose a positive adjective because a root seems positive.",
        "For the first gap, help → helpful → unhelpful: were needs a description, and lost their way supplies the negative meaning. For the second, build a noun from complain and check the quantity three before writing the full answer."
      ],
      "check": {
        "prompt": "Complete the complaints gap. Why are complain and complaint insufficient here?",
        "answer": "Complaints. Complain is a verb; complaint is one countable instance. Three requires the plural noun. Other contexts can use singular complaint, so the -s follows the quantity rather than the root alone."
      }
    },
    {
      "title": "4. Work through a complete contextual example",
      "paragraphs": [
        "Source: ‘A neighbourhood centre introduced evening classes. The first timetable was confusing, so the team asked an experienced teacher to revise it. Her ___ (SUGGEST) made the programme more ___ (ACCESS), and staff explained the changes ___ (CLEAR).’ Begin by reading the situation: the revision improves access rather than creates a new problem.",
        "Step one: Her introduces a noun phrase, and made needs its subject. Suggestions is a natural plural here; suggestion would also be grammatical if only one proposal were intended, so a tightly controlled exercise would need an additional number cue. Step two: more can modify an adjective, and the programme is being described: accessible. Step three: explained is already the finite verb; clearly describes how the explanation was delivered. Reread all three choices in the connected account to check that both grammar and meaning survive.",
        "This example also shows why good answer review matters. A gap should not reject a defensible singular merely because its author imagined several ideas. In the checked activity, read explicit number cues such as all, several and each. Feedback explains the authored form; where a reasonable alternative seems possible, compare it with the full context before deciding what to revise."
      ]
    },
    {
      "title": "5. Diagnose an error instead of memorising the key",
      "paragraphs": [
        "Incorrect: ‘The instructions were clearly.’ Improved: ‘The instructions were clear.’ Were links the subject to a description; there is no action for clearly to modify. Incorrect: ‘The organiser spoke clear.’ Improved: ‘The organiser spoke clearly.’ Here spoke is the action and the adverb describes its delivery. The same family needs different forms because the sentence roles differ.",
        "For your own vocabulary record, store a base, two useful forms and one sentence for each, rather than a translation alone. After a wrong response, label the cause: role, meaning, number or spelling. Then write a new sentence using the corrected form. Being able to explain why a form fits a new sentence is stronger evidence of learning than recognising the same answer again."
      ],
      "check": {
        "prompt": "Revise: ‘The new design improved accessible. Several visitor welcomed it.’",
        "answer": "The new design improved accessibility. Several visitors welcomed it. Improved needs an object noun here, and several requires a plural countable noun. ‘The design became accessible’ would use the adjective, but would express a different grammatical relationship."
      }
    },
    {
      "title": "Test whether the form can be used independently",
      "paragraphs": [
        "After the museum task, write one new sentence with an adjective and another with its related adverb, without looking at a base-word prompt. Revisit them after the next module and explain the jobs. Producing a form from a supplied root demonstrates a narrower skill than choosing the expression yourself.",
        "Keep a correction record with one cause: role, polarity, number or spelling. Replace one noun in the original sentence and see whether the corrected form still fits; if the grammatical frame changes, explain the new choice."
      ]
    }
  ],
  "application": "In Guided Practice, use the community-garden context to identify roles before supplying forms. In Independent Practice, apply the same procedure to the museum context without looking back at the examples. The volunteer-survey assessment changes the source again. For each error, explain the role, meaning, number or spelling decision before revising; the three stages practise transfer rather than memorising this chapter’s words."
}
};
