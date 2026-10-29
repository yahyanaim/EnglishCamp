import type { TeachingDiagram } from "./types";
import { foundationDiagrams } from "./foundation";
import { academicDiagrams } from "./academic";
import { toeflDiagrams } from "./toefl";
import { generalDiagrams } from "./general";

/** One illustration per lesson; each is placed beside its matching explanation. */
export const teachingDiagrams: Record<string, TeachingDiagram> = {
  ...foundationDiagrams,
  ...academicDiagrams,
  ...toeflDiagrams,
  ...generalDiagrams,
  "band1-toefl-intro": {
    kind: "word-family",
    title: "One word family, four sentence jobs",
    introduction: "Follow each branch from SUCCESS to a related form. The label names its grammatical job; the example shows where it fits.",
    placement: { relation: "before", heading: "Name the role before constructing a form" },
    takeaway: "A shared family does not make the forms interchangeable. Sentence structure selects the role; spelling and meaning complete the choice.",
    source: { title: "British Council: word formation", url: "https://learnenglishteens.britishcouncil.org/exams/grammar-vocabulary-exams/word-formation" },
  },
  "band1-ielts-vs-toefl": {
    kind: "tense-timeline",
    title: "A finished amount or time spent on an activity?",
    introduction: "Compare two possible painting situations. A completed amount and an activity’s duration give us different information.",
    placement: { relation: "after", heading: "Add duration only after the basic relationship is secure" },
    takeaway: "Two doors establishes a finished amount. Since nine describes duration. The second timeline illustrates continuing activity; the continuous form can also describe an activity that has just stopped. It does not establish how many doors are finished.",
    source: { title: "Cambridge: present perfect continuous", url: "https://dictionary.cambridge.org/grammar/british-grammar/present-perfect-continuous" },
  },
  "band1-grammar-articles": {
    kind: "article-decision",
    title: "Choose an article through meaning",
    introduction: "A simplified route for ordinary common nouns when choosing a/an, the or no article. Start with what your reader can identify.",
    placement: { relation: "before", heading: "A connected worked account" },
    takeaway: "A/an follows the next spoken sound: a university, an hour. This tree covers common patterns, not every article use. A noun phrase may instead have another determiner, such as my, this or some; names and fixed expressions need their own checks.",
    source: { title: "British Council: articles", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/articles-a-an-the" },
  },
};
