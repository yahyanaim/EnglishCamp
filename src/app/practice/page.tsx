"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { NounGenderTrainer } from "@/components/learn/NounGenderTrainer";
import { ConjugationTrainer } from "@/components/learn/ConjugationTrainer";
import { SentenceBuilder } from "@/components/learn/SentenceBuilder";
import { NumbersTrainer } from "@/components/learn/NumbersTrainer";
import { PluralTrainer } from "@/components/learn/PluralTrainer";
import { PossessivesTrainer } from "@/components/learn/PossessivesTrainer";
import { SeparableVerbsTrainer } from "@/components/learn/SeparableVerbsTrainer";
import { PrepositionsTrainer } from "@/components/learn/PrepositionsTrainer";
import { CaseTrainer } from "@/components/learn/CaseTrainer";
import { AdjectiveEndingsTrainer } from "@/components/learn/AdjectiveEndingsTrainer";
import { ModalVerbsTrainer } from "@/components/learn/ModalVerbsTrainer";
import { NegationTrainer } from "@/components/learn/NegationTrainer";
import { TwoWayPrepositionsTrainer } from "@/components/learn/TwoWayPrepositionsTrainer";
import { WordOrderTrainer } from "@/components/learn/WordOrderTrainer";
import { ComparativeTrainer } from "@/components/learn/ComparativeTrainer";
import { DialogueCompletionTrainer } from "@/components/learn/DialogueCompletionTrainer";
import { ReflexiveVerbsTrainer } from "@/components/learn/ReflexiveVerbsTrainer";
import { Hangman } from "@/components/learn/Hangman";
import { ImperativeTrainer } from "@/components/learn/ImperativeTrainer";
import { PassiveVoiceTrainer } from "@/components/learn/PassiveVoiceTrainer";
import { CoordinatingConjunctionsTrainer } from "@/components/learn/CoordinatingConjunctionsTrainer";
import { GenitiveTrainer } from "@/components/learn/GenitiveTrainer";
import { DaCompoundsTrainer } from "@/components/learn/DaCompoundsTrainer";
import { MemoryMatchGame } from "@/components/learn/MemoryMatchGame";
import { WordSearch } from "@/components/learn/WordSearch";
import { CrosswordPuzzle } from "@/components/learn/CrosswordPuzzle";
import { Dictation } from "@/components/learn/Dictation";
import { RelativeClausesTrainer } from "@/components/learn/RelativeClausesTrainer";
import { KonjunktivIITrainer } from "@/components/learn/KonjunktivIITrainer";
import { PrefixVerbsTrainer } from "@/components/learn/PrefixVerbsTrainer";
import { InfinitivMitZuTrainer } from "@/components/learn/InfinitivMitZuTrainer";
import { WeakNounsTrainer } from "@/components/learn/WeakNounsTrainer";
import { EnglishContractionsTrainer } from "@/components/learn/PrepositionalContractionsTrainer";
import { ModalParticlesTrainer } from "@/components/learn/ModalParticlesTrainer";
import { FutureTenseTrainer } from "@/components/learn/FutureTenseTrainer";
import { FragewörterTrainer } from "@/components/learn/FragewörterTrainer";
import { CompoundNounTrainer } from "@/components/learn/CompoundNounTrainer";
import { DoubleInfinitiveTrainer } from "@/components/learn/DoubleInfinitiveTrainer";
import { FalseFriendsTrainer } from "@/components/learn/FalseFriendsTrainer";
import { FlashcardRace } from "@/components/learn/FlashcardRace";
import { ClozeTextTrainer } from "@/components/learn/ClozeTextTrainer";
import { CollocationTrainer } from "@/components/learn/CollocationTrainer";
import { ErrorReview } from "@/components/learn/ErrorReview";
import { GrammarReference } from "@/components/learn/GrammarReference";
import { IdiomsTrainer } from "@/components/learn/IdiomsTrainer";
import { ReadingComprehension } from "@/components/learn/ReadingComprehension";
import { SpellingTrainer } from "@/components/learn/SpellingTrainer";
import { SynonymTrainer } from "@/components/learn/SynonymTrainer";
import { TimedChallenge } from "@/components/learn/TimedChallenge";
import { VerbExplorer } from "@/components/learn/VerbExplorer";
import { SpeedMatch } from "@/components/learn/SpeedMatch";
import { WordScramble } from "@/components/learn/Buchstabensalat";
import { Sprint } from "@/components/learn/Sprint";
import { ConnectorsChallenge } from "@/components/learn/KonjunktionenChallenge";
import { TensesQuiz } from "@/components/learn/TensesQuiz";
import { BriefeSchreiben } from "@/components/learn/BriefeSchreiben";
import { LandeskundeQuiz } from "@/components/learn/LandeskundeQuiz";
import { ArtikelMeister } from "@/components/learn/ArtikelMeister";
import { RedemittelPraxis } from "@/components/learn/RedemittelPraxis";
import { SatzUebersetzer } from "@/components/learn/SatzUebersetzer";
import { TopicVocabulary } from "@/components/learn/ThemenVokabeln";
import { RedewendungenUebersetzer } from "@/components/learn/RewendungenUebersetzer";
import { KollokationenUebersetzer } from "@/components/learn/KollokationenUebersetzer";
import { DialogeUebersetzer } from "@/components/learn/DialogeUebersetzer";
import { ModalpartikelUebersetzer } from "@/components/learn/ModalpartikelUebersetzer";
import { NVVUebersetzer } from "@/components/learn/NVVUebersetzer";
import { VerbPrepUebersetzer } from "@/components/learn/VerbPrepUebersetzer";
import { DaKompositaUebersetzer } from "@/components/learn/DaKompositaUebersetzer";
import { SatzmusterUebersetzer } from "@/components/learn/SatzmusterUebersetzer";
import { WordPairQuiz } from "@/components/learn/WortpaareQuiz";
import { VergleicheUebersetzer } from "@/components/learn/VergleicheUebersetzer";
import { FalseFriendsUebersetzer } from "@/components/learn/FalseFriendsUebersetzer";
import { FragenUebersetzer } from "@/components/learn/FragenUebersetzer";
import { PraeteritumUebersetzer } from "@/components/learn/PraeteritumUebersetzer";
import { WordFormationTrainer } from "@/components/learn/WordFormationTrainer";
import { NarrativePastTrainer } from "@/components/learn/NarrativePastTrainer";
import { SubordinateClausesTrainer } from "@/components/learn/SubordinateClausesTrainer";
import { QuestionFormationTrainer } from "@/components/learn/QuestionFormationTrainer";
import { Proofreading } from "@/components/learn/Korrekturlesen";
import { VerbPuzzle } from "@/components/learn/VerbPuzzle";
import { IdiomMatch } from "@/components/learn/IdiomMatch";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";

type TrainerId =
  | "noun-gender" | "conjugation" | "sentence-builder" | "numbers" | "plural"
  | "possessives" | "separable-verbs" | "prepositions" | "case" | "adjective-endings"
  | "modal-verbs" | "negation" | "two-way-prepositions" | "word-order"
  | "comparative" | "dialogue" | "reflexive-verbs" | "hangman"
  | "imperative" | "passive-voice" | "conjunctions" | "genitive" | "da-compounds"
  | "memory-match" | "word-search" | "crossword" | "dictation"
  | "relative-clauses" | "konjunktiv2" | "prefix-verbs" | "infinitiv-mit-zu"
  | "weak-nouns" | "prep-contractions" | "modal-particles" | "future-tense"
  | "frageworter" | "compound-nouns" | "double-infinitive" | "false-friends"
  | "flashcard-race" | "cloze-text" | "collocations" | "error-review"
  | "grammar-reference" | "idioms" | "reading" | "spelling" | "synonyms"
  | "timed-challenge" | "verb-explorer" | "word-formation"
  | "narrative-past" | "sub-clauses" | "question-formation" | "speed-match"
  | "buchstabensalat" | "sprint" | "konjunktionen" | "tenses" | "briefe"
  | "landeskunde" | "artikel" | "redemittel" | "satz-ubersetzer" | "themen-vokabeln" | "idiom-ubersetzer" | "kollo-ubersetzer" | "dialog-ubersetzer" | "modal-ubersetzer"
  | "nvv-ubersetzer" | "verbprep-ubersetzer" | "dakomp-ubersetzer"
  | "satzmuster-ubersetzer" | "wortpaare-quiz" | "vergleiche-ubersetzer" | "false-friends-ubersetzer" | "fragen-ubersetzer" | "praeteritum-ubersetzer"
  | "korrektur" | "verb-puzzle" | "idiom-match";

const CATEGORIES: { id: string; label: string; trainers: { id: TrainerId; label: string; desc: string; icon: string }[] }[] = [
  {
    id: "grammar",
    label: "Grammar Trainers",
    trainers: [
      { id: "noun-gender", label: "Articles (A / An)", desc: "Practice indefinite articles (a, an) for 40+ nouns", icon: "🔤" },
      { id: "conjugation", label: "Verb Conjugation", desc: "Conjugate verbs across all persons and tenses", icon: "📝" },
      { id: "case", label: "Noun & Pronoun Forms", desc: "Countable, uncountable, subject, and object forms", icon: "🔤" },
      { id: "adjective-endings", label: "Adjective Forms", desc: "Comparative, superlative, -ed vs -ing adjectives", icon: "✨" },
      { id: "comparative", label: "Comparatives", desc: "Comparative and superlative forms practice", icon: "📊" },
      { id: "genitive", label: "Possessives ('s / of)", desc: "Possessive constructions and of-phrases in English", icon: "🔷" },
      { id: "passive-voice", label: "Passive Voice", desc: "Active to Passive sentence transformations", icon: "🔄" },
      { id: "imperative", label: "Imperative", desc: "Commands, requests, and instructions", icon: "📢" },
      { id: "relative-clauses", label: "Relative Clauses", desc: "who, which, that, whose — defining and non-defining", icon: "🔗" },
      { id: "konjunktiv2", label: "Conditionals", desc: "Zero, First, Second, and Third conditionals (would, could)", icon: "🔮" },
      { id: "prefix-verbs", label: "Prefix Verbs", desc: "Common verb prefixes and their meanings", icon: "🏷️" },
      { id: "infinitiv-mit-zu", label: "Infinitives & Gerunds", desc: "to-infinitive, bare infinitive, and gerund vs. infinitive", icon: "🎯" },
      { id: "weak-nouns", label: "Irregular Plurals", desc: "Nouns that change form in plural (man/men, tooth/teeth)", icon: "🧊" },
      { id: "future-tense", label: "Future Tense", desc: "will, going to, and present continuous for future", icon: "🔮" },
      { id: "double-infinitive", label: "Modal Perfects", desc: "Perfect constructions with modal verbs (should have done)", icon: "2️⃣" },
      { id: "grammar-reference", label: "Grammar Reference", desc: "Browse all English grammar rules and explanations", icon: "📖" },
      { id: "verb-explorer", label: "Verb Explorer", desc: "Full conjugation tables for any English verb", icon: "🔍" },
      { id: "narrative-past", label: "Narrative Past", desc: "Simple Past & Past Perfect for storytelling", icon: "📖" },
      { id: "verb-puzzle", label: "Verb Puzzle", desc: "Fill in conjugation tables for all tenses", icon: "🧩" },
    ],
  },
  {
    id: "vocab",
    label: "Vocabulary Trainers",
    trainers: [
      { id: "numbers", label: "Numbers", desc: "Practice numbers 1–99", icon: "🔢" },
      { id: "plural", label: "Plural Forms", desc: "Regular and irregular plural patterns", icon: "👥" },
      { id: "possessives", label: "Possessives", desc: "my, your, his, her, its, our, their", icon: "👤" },
      { id: "separable-verbs", label: "Phrasal Verbs", desc: "Verb + particle combinations", icon: "🔀" },
      { id: "reflexive-verbs", label: "Reflexive Verbs", desc: "myself, yourself, himself, etc.", icon: "🔁" },
      { id: "da-compounds", label: "Pronominal Adverbs", desc: "thereof, thereto, thereby, etc.", icon: "🔗" },
      { id: "compound-nouns", label: "Compound Nouns", desc: "Build compound words from two nouns", icon: "🏗️" },
      { id: "false-friends", label: "False Friends", desc: "Words that look similar but differ in meaning", icon: "⚠️" },
      { id: "collocations", label: "Collocations", desc: "Common verb-noun pairings", icon: "🔗" },
      { id: "idioms", label: "Idioms", desc: "Common English idioms and their meanings", icon: "💬" },
      { id: "synonyms", label: "Synonyms", desc: "Find the right synonym for each word", icon: "📝" },
      { id: "word-formation", label: "Word Formation", desc: "Build words with prefixes and suffixes", icon: "🏗️" },
      { id: "spelling", label: "Spelling", desc: "Common spelling rules and patterns", icon: "✏️" },
    ],
  },
  {
    id: "sentences",
    label: "Sentence Structure",
    trainers: [
      { id: "sentence-builder", label: "Sentence Builder", desc: "Arrange words into correct sentences", icon: "🧩" },
      { id: "word-order", label: "Word Order", desc: "SVO, questions, and adverb placement", icon: "📐" },
      { id: "negation", label: "Negation", desc: "not, never, no, none, neither", icon: "🚫" },
      { id: "modal-verbs", label: "Modal Verbs", desc: "can, must, may, should, will, would", icon: "🎯" },
      { id: "conjunctions", label: "Conjunctions", desc: "and, but, or, so, because, although", icon: "🔌" },
      { id: "frageworter", label: "Question Words", desc: "who, what, where, when, why, how", icon: "❓" },
      { id: "sub-clauses", label: "Subordinate Clauses", desc: "because, when, if, although + clause structure", icon: "🔗" },
      { id: "question-formation", label: "Question Formation", desc: "Yes/no, wh-questions, tag questions, indirect", icon: "❓" },
    ],
  },
  {
    id: "prepositions",
    label: "Prepositions",
    trainers: [
      { id: "prepositions", label: "Prepositions", desc: "Prepositions of time, place, and direction (in, on, at, to)", icon: "📍" },
      { id: "two-way-prepositions", label: "Direction vs Location", desc: "in/at vs into/to prepositions in English", icon: "↔️" },
      { id: "prep-contractions", label: "Contractions", desc: "Common contractions (don't, can't, it's, etc.)", icon: "🔗" },
    ],
  },
  {
    id: "games",
    label: "Games & Listening",
    trainers: [
      { id: "hangman", label: "Hangman", desc: "Guess the word letter by letter", icon: "🎮" },
      { id: "memory-match", label: "Memory Match", desc: "Flip cards and match words", icon: "🃏" },
      { id: "dialogue", label: "Dialogue Practice", desc: "Complete everyday conversations", icon: "💬" },
      { id: "word-search", label: "Word Search", desc: "Find hidden words in a grid", icon: "🔍" },
      { id: "crossword", label: "Crossword Puzzle", desc: "Fill in crossword clues", icon: "🟦" },
      { id: "dictation", label: "Dictation", desc: "Listen and type what you hear", icon: "🎧" },
      { id: "flashcard-race", label: "Flashcard Race", desc: "60-second timed flashcard challenge", icon: "⏱️" },
      { id: "modal-particles", label: "Discourse Markers", desc: "just, even, actually, though, then (pragmatic markers)", icon: "💬" },
      { id: "cloze-text", label: "Cloze Text", desc: "Fill in the blanks in reading passages", icon: "📝" },
      { id: "reading", label: "Reading Comprehension", desc: "Read passages and answer questions", icon: "📖" },
      { id: "timed-challenge", label: "Timed Challenge", desc: "Race the clock with mixed exercises", icon: "⏱️" },
      { id: "error-review", label: "Error Review", desc: "Review your past mistakes", icon: "🔄" },
      { id: "speed-match", label: "Speed Match", desc: "Match words to definitions as fast as you can", icon: "⚡" },
      { id: "buchstabensalat", label: "Word Scramble", desc: "Unscramble words as fast as you can", icon: "🔀" },
      { id: "sprint", label: "Sprint", desc: "60-second rapid-fire vocabulary quiz", icon: "⚡" },
    ],
  },
  {
    id: "writing",
    label: "Writing & Exam Prep",
    trainers: [
      { id: "konjunktionen", label: "Conjunctions", desc: "Choose the right linking word for B2 sentences", icon: "🔗" },
      { id: "tenses", label: "Tenses Quiz", desc: "Identify the tense of English sentences", icon: "⏰" },
      { id: "briefe", label: "Letter Writing", desc: "Practice formal & informal letters", icon: "📝" },
      { id: "korrektur", label: "Proofreading", desc: "Find and fix errors in sentences", icon: "✏️" },
      { id: "landeskunde", label: "Culture Quiz", desc: "Test your knowledge about English-speaking countries", icon: "🌍" },
      { id: "redemittel", label: "Phrases Practice", desc: "Match useful phrases to situations", icon: "💬" },
    ],
  },
  {
    id: "speed",
    label: "Speed Games",
    trainers: [
      { id: "artikel", label: "Article Master", desc: "a/an/the speed challenge", icon: "🎯" },
      { id: "satz-ubersetzer", label: "Sentence Translator", desc: "Translate sentences between English and Arabic", icon: "🔄" },
      { id: "themen-vokabeln", label: "Topic Vocab", desc: "Topic vocabulary with translation practice", icon: "📖" },
      { id: "idiom-ubersetzer", label: "Idioms Translator", desc: "Match idioms to their meanings", icon: "💬" },
      { id: "kollo-ubersetzer", label: "Collocations Practice", desc: "Match collocations to their translations", icon: "🔗" },
      { id: "dialog-ubersetzer", label: "Dialogue Translator", desc: "Translate dialogue lines", icon: "💭" },
      { id: "modal-ubersetzer", label: "Discourse Markers Practice", desc: "Practice English discourse markers and conversational phrases", icon: "🗣️" },
      { id: "nvv-ubersetzer", label: "Verb-Noun Collocations", desc: "Match verb-noun combinations (make a choice, take a break)", icon: "📑" },
      { id: "verbprep-ubersetzer", label: "Verbs+Preps Practice", desc: "Translate verbs with prepositions", icon: "🔄" },
      { id: "dakomp-ubersetzer", label: "Compound Adverbs Practice", desc: "Practice formal compound adverbs (thereof, whereby)", icon: "🔗" },
      { id: "satzmuster-ubersetzer", label: "Patterns Practice", desc: "Translate sentence pattern examples", icon: "📐" },
      { id: "wortpaare-quiz", label: "Word Pairs Quiz", desc: "Choose the right word (since/for, if/when)", icon: "🔀" },
      { id: "vergleiche-ubersetzer", label: "Comparisons Practice", desc: "Translate comparison sentences", icon: "⚖️" },
      { id: "false-friends-ubersetzer", label: "False Friends Practice", desc: "Words that look similar but differ in meaning", icon: "⚠️" },
      { id: "fragen-ubersetzer", label: "Questions Practice", desc: "Translate questions between English and Arabic", icon: "❓" },
      { id: "praeteritum-ubersetzer", label: "Narrative Past Practice", desc: "Practice past tense storytelling sentences", icon: "⏰" },
      { id: "idiom-match", label: "Idiom Match", desc: "Match idioms to their meanings", icon: "💬" },
    ],
  },
];

const TRAINER_COMPONENTS: Record<TrainerId, () => JSX.Element | null> = {
  "noun-gender": NounGenderTrainer,
  "conjugation": ConjugationTrainer,
  "sentence-builder": SentenceBuilder,
  "numbers": NumbersTrainer,
  "plural": PluralTrainer,
  "possessives": PossessivesTrainer,
  "separable-verbs": SeparableVerbsTrainer,
  "prepositions": PrepositionsTrainer,
  "case": CaseTrainer,
  "adjective-endings": AdjectiveEndingsTrainer,
  "modal-verbs": ModalVerbsTrainer,
  "negation": NegationTrainer,
  "two-way-prepositions": TwoWayPrepositionsTrainer,
  "word-order": WordOrderTrainer,
  "comparative": ComparativeTrainer,
  "dialogue": DialogueCompletionTrainer,
  "reflexive-verbs": ReflexiveVerbsTrainer,
  "hangman": Hangman,
  "imperative": ImperativeTrainer,
  "passive-voice": PassiveVoiceTrainer,
  "conjunctions": CoordinatingConjunctionsTrainer,
  "genitive": GenitiveTrainer,
  "da-compounds": DaCompoundsTrainer,
  "memory-match": MemoryMatchGame,
  "word-search": WordSearch,
  "crossword": CrosswordPuzzle,
  "dictation": Dictation,
  "relative-clauses": RelativeClausesTrainer,
  "konjunktiv2": KonjunktivIITrainer,
  "prefix-verbs": PrefixVerbsTrainer,
  "infinitiv-mit-zu": InfinitivMitZuTrainer,
  "weak-nouns": WeakNounsTrainer,
  "prep-contractions": EnglishContractionsTrainer,
  "modal-particles": ModalParticlesTrainer,
  "future-tense": FutureTenseTrainer,
  "frageworter": FragewörterTrainer,
  "compound-nouns": CompoundNounTrainer,
  "double-infinitive": DoubleInfinitiveTrainer,
  "false-friends": FalseFriendsTrainer,
  "flashcard-race": FlashcardRace,
  "cloze-text": ClozeTextTrainer,
  "collocations": CollocationTrainer,
  "error-review": ErrorReview,
  "grammar-reference": GrammarReference,
  "idioms": IdiomsTrainer,
  "reading": ReadingComprehension,
  "spelling": SpellingTrainer,
  "synonyms": SynonymTrainer,
  "timed-challenge": TimedChallenge,
  "verb-explorer": VerbExplorer,
  "word-formation": WordFormationTrainer,
  "narrative-past": NarrativePastTrainer,
  "sub-clauses": SubordinateClausesTrainer,
  "question-formation": QuestionFormationTrainer,
  "speed-match": SpeedMatch,
  "buchstabensalat": WordScramble,
  "sprint": Sprint,
  "konjunktionen": ConnectorsChallenge,
  "tenses": TensesQuiz,
  "briefe": BriefeSchreiben,
  "landeskunde": LandeskundeQuiz,
  "artikel": ArtikelMeister,
  "redemittel": RedemittelPraxis,
  "satz-ubersetzer": SatzUebersetzer,
  "themen-vokabeln": TopicVocabulary,
  "idiom-ubersetzer": RedewendungenUebersetzer,
  "kollo-ubersetzer": KollokationenUebersetzer,
  "dialog-ubersetzer": DialogeUebersetzer,
  "modal-ubersetzer": ModalpartikelUebersetzer,
  "nvv-ubersetzer": NVVUebersetzer,
  "verbprep-ubersetzer": VerbPrepUebersetzer,
  "dakomp-ubersetzer": DaKompositaUebersetzer,
  "satzmuster-ubersetzer": SatzmusterUebersetzer,
  "wortpaare-quiz": WordPairQuiz,
  "vergleiche-ubersetzer": VergleicheUebersetzer,
  "false-friends-ubersetzer": FalseFriendsUebersetzer,
  "fragen-ubersetzer": FragenUebersetzer,
  "praeteritum-ubersetzer": PraeteritumUebersetzer,
  "korrektur": Proofreading,
  "verb-puzzle": VerbPuzzle,
  "idiom-match": IdiomMatch,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
};

export default function PracticePage() {
  const [activeTrainer, setActiveTrainer] = useState<TrainerId | null>(null);

  if (activeTrainer) {
    const Component = TRAINER_COMPONENTS[activeTrainer];
    const cat = CATEGORIES.flatMap((c) => c.trainers).find((t) => t.id === activeTrainer);
    return (
      <PageWrapper>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTrainer(null)}
            className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] bg-[var(--color-surface)] transition-all duration-150 hover:border-[var(--color-border-strong)] active:translate-y-0.5"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Practice Hub
          </button>
          {cat && (
            <span className="font-body text-sm text-[var(--color-text-secondary)]">
              / {cat.icon} {cat.label}
            </span>
          )}
        </div>
        <Component />
      </PageWrapper>
    );
  }

  const totalTrainers = CATEGORIES.reduce((sum, c) => sum + c.trainers.length, 0);

  return (
    <PageWrapper>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {/* Header */}
        <motion.div variants={itemAnim}>
          <div className="flex items-center gap-3 mb-1">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]">
              <Brain className="w-4.5 h-4.5 text-white" />
            </div>
            <h1
              className="font-display font-extrabold text-[var(--color-text-primary)]"
              style={{ fontSize: "26px", letterSpacing: "0.3px" }}
            >
              Practice Hub
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="font-body text-sm text-[var(--color-text-secondary)]">
              {totalTrainers} trainers and games to practice your English
            </p>
            <span className="inline-flex items-center gap-1 font-display font-extrabold text-[10px] px-2.5 py-1 rounded-[var(--radius-pill)] border-[1.5px] text-[var(--color-warning-dark)] bg-[var(--color-warning-bg)] border-[var(--color-warning)]">
              <Sparkles className="w-3 h-3 text-[var(--color-warning)]" />
              {CATEGORIES.length} categories
            </span>
          </div>
        </motion.div>

        {/* Categories */}
        {CATEGORIES.map((cat, ci) => (
          <motion.section key={cat.id} variants={itemAnim}>
            <h2 className="font-display font-extrabold text-[var(--color-text-primary)] mb-3" style={{ fontSize: "17px", letterSpacing: "0.2px" }}>
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {cat.trainers.map((trainer) => (
                <motion.button
                  key={trainer.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTrainer(trainer.id)}
                  className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)] transition-all duration-200 hover:border-[var(--color-border-strong)]"
                  style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{trainer.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)]">{trainer.label}</h3>
                      <p className="font-body text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">{trainer.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </PageWrapper>
  );
}
