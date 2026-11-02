"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeBanner as PageBanner } from "@/components/ui/PracticeBanner";
import dynamic from "next/dynamic";
import { useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
const NounGenderTrainer = dynamic(() => import("@/components/learn/NounGenderTrainer").then(module => module.NounGenderTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ConjugationTrainer = dynamic(() => import("@/components/learn/ConjugationTrainer").then(module => module.ConjugationTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SentenceBuilder = dynamic(() => import("@/components/learn/SentenceBuilder").then(module => module.SentenceBuilder), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const NumbersTrainer = dynamic(() => import("@/components/learn/NumbersTrainer").then(module => module.NumbersTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PluralTrainer = dynamic(() => import("@/components/learn/PluralTrainer").then(module => module.PluralTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PossessivesTrainer = dynamic(() => import("@/components/learn/PossessivesTrainer").then(module => module.PossessivesTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SeparableVerbsTrainer = dynamic(() => import("@/components/learn/SeparableVerbsTrainer").then(module => module.SeparableVerbsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PrepositionsTrainer = dynamic(() => import("@/components/learn/PrepositionsTrainer").then(module => module.PrepositionsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const CaseTrainer = dynamic(() => import("@/components/learn/CaseTrainer").then(module => module.CaseTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const AdjectiveEndingsTrainer = dynamic(() => import("@/components/learn/AdjectiveEndingsTrainer").then(module => module.AdjectiveEndingsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ModalVerbsTrainer = dynamic(() => import("@/components/learn/ModalVerbsTrainer").then(module => module.ModalVerbsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const NegationTrainer = dynamic(() => import("@/components/learn/NegationTrainer").then(module => module.NegationTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const TwoWayPrepositionsTrainer = dynamic(() => import("@/components/learn/TwoWayPrepositionsTrainer").then(module => module.TwoWayPrepositionsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WordOrderTrainer = dynamic(() => import("@/components/learn/WordOrderTrainer").then(module => module.WordOrderTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ComparativeTrainer = dynamic(() => import("@/components/learn/ComparativeTrainer").then(module => module.ComparativeTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const DialogueCompletionTrainer = dynamic(() => import("@/components/learn/DialogueCompletionTrainer").then(module => module.DialogueCompletionTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ReflexiveVerbsTrainer = dynamic(() => import("@/components/learn/ReflexiveVerbsTrainer").then(module => module.ReflexiveVerbsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const Hangman = dynamic(() => import("@/components/learn/Hangman").then(module => module.Hangman), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ImperativeTrainer = dynamic(() => import("@/components/learn/ImperativeTrainer").then(module => module.ImperativeTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PassiveVoiceTrainer = dynamic(() => import("@/components/learn/PassiveVoiceTrainer").then(module => module.PassiveVoiceTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const CoordinatingConjunctionsTrainer = dynamic(() => import("@/components/learn/CoordinatingConjunctionsTrainer").then(module => module.CoordinatingConjunctionsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const GenitiveTrainer = dynamic(() => import("@/components/learn/GenitiveTrainer").then(module => module.GenitiveTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const DaCompoundsTrainer = dynamic(() => import("@/components/learn/DaCompoundsTrainer").then(module => module.DaCompoundsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const MemoryMatchGame = dynamic(() => import("@/components/learn/MemoryMatchGame").then(module => module.MemoryMatchGame), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WordSearch = dynamic(() => import("@/components/learn/WordSearch").then(module => module.WordSearch), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const CrosswordPuzzle = dynamic(() => import("@/components/learn/CrosswordPuzzle").then(module => module.CrosswordPuzzle), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const Dictation = dynamic(() => import("@/components/learn/Dictation").then(module => module.Dictation), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const RelativeClausesTrainer = dynamic(() => import("@/components/learn/RelativeClausesTrainer").then(module => module.RelativeClausesTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const KonjunktivIITrainer = dynamic(() => import("@/components/learn/KonjunktivIITrainer").then(module => module.KonjunktivIITrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PrefixVerbsTrainer = dynamic(() => import("@/components/learn/PrefixVerbsTrainer").then(module => module.PrefixVerbsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const InfinitivMitZuTrainer = dynamic(() => import("@/components/learn/InfinitivMitZuTrainer").then(module => module.InfinitivMitZuTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WeakNounsTrainer = dynamic(() => import("@/components/learn/WeakNounsTrainer").then(module => module.WeakNounsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const EnglishContractionsTrainer = dynamic(() => import("@/components/learn/PrepositionalContractionsTrainer").then(module => module.EnglishContractionsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ModalParticlesTrainer = dynamic(() => import("@/components/learn/ModalParticlesTrainer").then(module => module.ModalParticlesTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FutureTenseTrainer = dynamic(() => import("@/components/learn/FutureTenseTrainer").then(module => module.FutureTenseTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FragewörterTrainer = dynamic(() => import("@/components/learn/FragewörterTrainer").then(module => module.FragewörterTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const CompoundNounTrainer = dynamic(() => import("@/components/learn/CompoundNounTrainer").then(module => module.CompoundNounTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const DoubleInfinitiveTrainer = dynamic(() => import("@/components/learn/DoubleInfinitiveTrainer").then(module => module.DoubleInfinitiveTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FalseFriendsTrainer = dynamic(() => import("@/components/learn/FalseFriendsTrainer").then(module => module.FalseFriendsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FlashcardRace = dynamic(() => import("@/components/learn/FlashcardRace").then(module => module.FlashcardRace), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ClozeTextTrainer = dynamic(() => import("@/components/learn/ClozeTextTrainer").then(module => module.ClozeTextTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const CollocationTrainer = dynamic(() => import("@/components/learn/CollocationTrainer").then(module => module.CollocationTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ErrorReview = dynamic(() => import("@/components/learn/ErrorReview").then(module => module.ErrorReview), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const GrammarReference = dynamic(() => import("@/components/learn/GrammarReference").then(module => module.GrammarReference), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const IdiomsTrainer = dynamic(() => import("@/components/learn/IdiomsTrainer").then(module => module.IdiomsTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ReadingComprehension = dynamic(() => import("@/components/learn/ReadingComprehension").then(module => module.ReadingComprehension), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SpellingTrainer = dynamic(() => import("@/components/learn/SpellingTrainer").then(module => module.SpellingTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SynonymTrainer = dynamic(() => import("@/components/learn/SynonymTrainer").then(module => module.SynonymTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const TimedChallenge = dynamic(() => import("@/components/learn/TimedChallenge").then(module => module.TimedChallenge), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const VerbExplorer = dynamic(() => import("@/components/learn/VerbExplorer").then(module => module.VerbExplorer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SpeedMatch = dynamic(() => import("@/components/learn/SpeedMatch").then(module => module.SpeedMatch), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WordScramble = dynamic(() => import("@/components/learn/Buchstabensalat").then(module => module.WordScramble), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const Sprint = dynamic(() => import("@/components/learn/Sprint").then(module => module.Sprint), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ConnectorsChallenge = dynamic(() => import("@/components/learn/KonjunktionenChallenge").then(module => module.ConnectorsChallenge), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const TensesQuiz = dynamic(() => import("@/components/learn/TensesQuiz").then(module => module.TensesQuiz), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const BriefeSchreiben = dynamic(() => import("@/components/learn/BriefeSchreiben").then(module => module.BriefeSchreiben), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const LandeskundeQuiz = dynamic(() => import("@/components/learn/LandeskundeQuiz").then(module => module.LandeskundeQuiz), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ArtikelMeister = dynamic(() => import("@/components/learn/ArtikelMeister").then(module => module.ArtikelMeister), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const RedemittelPraxis = dynamic(() => import("@/components/learn/RedemittelPraxis").then(module => module.RedemittelPraxis), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SatzUebersetzer = dynamic(() => import("@/components/learn/SatzUebersetzer").then(module => module.SatzUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const TopicVocabulary = dynamic(() => import("@/components/learn/ThemenVokabeln").then(module => module.TopicVocabulary), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const RedewendungenUebersetzer = dynamic(() => import("@/components/learn/RewendungenUebersetzer").then(module => module.RedewendungenUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const KollokationenUebersetzer = dynamic(() => import("@/components/learn/KollokationenUebersetzer").then(module => module.KollokationenUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const DialogeUebersetzer = dynamic(() => import("@/components/learn/DialogeUebersetzer").then(module => module.DialogeUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const ModalpartikelUebersetzer = dynamic(() => import("@/components/learn/ModalpartikelUebersetzer").then(module => module.ModalpartikelUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const NVVUebersetzer = dynamic(() => import("@/components/learn/NVVUebersetzer").then(module => module.NVVUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const VerbPrepUebersetzer = dynamic(() => import("@/components/learn/VerbPrepUebersetzer").then(module => module.VerbPrepUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const DaKompositaUebersetzer = dynamic(() => import("@/components/learn/DaKompositaUebersetzer").then(module => module.DaKompositaUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SatzmusterUebersetzer = dynamic(() => import("@/components/learn/SatzmusterUebersetzer").then(module => module.SatzmusterUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WordPairQuiz = dynamic(() => import("@/components/learn/WortpaareQuiz").then(module => module.WordPairQuiz), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const VergleicheUebersetzer = dynamic(() => import("@/components/learn/VergleicheUebersetzer").then(module => module.VergleicheUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FalseFriendsUebersetzer = dynamic(() => import("@/components/learn/FalseFriendsUebersetzer").then(module => module.FalseFriendsUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const FragenUebersetzer = dynamic(() => import("@/components/learn/FragenUebersetzer").then(module => module.FragenUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const PraeteritumUebersetzer = dynamic(() => import("@/components/learn/PraeteritumUebersetzer").then(module => module.PraeteritumUebersetzer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const WordFormationTrainer = dynamic(() => import("@/components/learn/WordFormationTrainer").then(module => module.WordFormationTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const NarrativePastTrainer = dynamic(() => import("@/components/learn/NarrativePastTrainer").then(module => module.NarrativePastTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const SubordinateClausesTrainer = dynamic(() => import("@/components/learn/SubordinateClausesTrainer").then(module => module.SubordinateClausesTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const QuestionFormationTrainer = dynamic(() => import("@/components/learn/QuestionFormationTrainer").then(module => module.QuestionFormationTrainer), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const Proofreading = dynamic(() => import("@/components/learn/Korrekturlesen").then(module => module.Proofreading), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const VerbPuzzle = dynamic(() => import("@/components/learn/VerbPuzzle").then(module => module.VerbPuzzle), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
const IdiomMatch = dynamic(() => import("@/components/learn/IdiomMatch").then(module => module.IdiomMatch), { ssr: false, loading: () => <div className="camp-loading" role="status">Loading practice…</div> });
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
      { id: "wortpaare-quiz", label: "Word Pairs Quiz", desc: "Choose between commonly confused words (affect/effect, their/there)", icon: "🔀" },
      { id: "vergleiche-ubersetzer", label: "Comparisons Practice", desc: "Translate comparison sentences", icon: "⚖️" },
      { id: "false-friends-ubersetzer", label: "False Friends Practice", desc: "Words that look similar but differ in meaning", icon: "⚠️" },
      { id: "fragen-ubersetzer", label: "Questions Practice", desc: "Translate questions between English and Arabic", icon: "❓" },
      { id: "praeteritum-ubersetzer", label: "Narrative Past Practice", desc: "Practice past tense storytelling sentences", icon: "⏰" },
      { id: "idiom-match", label: "Idiom Match", desc: "Match idioms to their meanings", icon: "💬" },
    ],
  },
];

const TRAINER_COMPONENTS: Record<TrainerId, ComponentType> = {
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
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTrainer(null)}
            className="camp-secondary inline-flex shrink-0 min-h-11 items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] bg-[var(--color-surface)] transition-all duration-150 hover:border-[var(--color-border-strong)] active:translate-y-0.5"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Practice Hub
          </button>
          {cat && (
            <span className="basis-full sm:basis-auto min-w-0 font-body text-sm text-[var(--color-text-secondary)]">
              / <LearningArt name={cat.icon} size={18} /> {cat.label}
            </span>
          )}
        </div>
        <PracticeFrame illustration="none" topic={activeTrainer} layout={activeTrainer === "grammar-reference" || activeTrainer === "verb-explorer" ? "reference" : ["speed-match", "memory-match", "word-search", "crossword", "verb-puzzle", "idiom-match"].includes(activeTrainer) ? "matching" : activeTrainer === "briefe" ? "writing" : "quiz"}><Component /></PracticeFrame>
      </PageWrapper>
    );
  }

  const totalTrainers = CATEGORIES.reduce((sum, c) => sum + c.trainers.length, 0);

  return (
    <PageWrapper>
      <motion.div variants={container} initial={false} animate="show" className="camp-section-stack space-y-6">
        {/* Header */}
        <PageBanner>
          <div className="flex items-center gap-3 mb-1">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]">
              <LearningArt name="Brain" className="w-4.5 h-4.5 text-white" />
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
            <span className="inline-flex items-center gap-1 font-display font-extrabold text-[10px] px-2.5 py-1 rounded-[var(--radius-pill)] border-[1.5px] text-[var(--color-text-warning)] bg-[var(--color-warning-bg)] border-[var(--color-warning)]">
              <LearningArt name="Sparkles" size={12} className="w-3 h-3 text-[var(--color-text-warning)]" />
              {CATEGORIES.length} categories
            </span>
          </div>
        </PageBanner>

        {/* Categories */}
        {CATEGORIES.map((cat, ci) => (
          <motion.section key={cat.id} variants={itemAnim}>
            <h2 className="font-display font-extrabold text-[var(--color-text-primary)] mb-3" style={{ fontSize: "17px", letterSpacing: "0.2px" }}>
              {cat.label}
            </h2>
            <div className="camp-trainer-grid">
              {cat.trainers.map((trainer) => (
                <motion.button
                  key={trainer.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTrainer(trainer.id)}
                  className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)] transition-all duration-200 hover:border-[var(--color-border-strong)]"
                  style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
                >
                  <div className="flex items-start gap-3">
                    <LearningArt name={trainer.icon} size={24} className=" shrink-0" />
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
