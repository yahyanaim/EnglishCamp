"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";

type Phoneme = { ipa: string; name: string; example: string; desc: string; type: "vowel" | "consonant" };
type MinimalPair = { a: string; b: string; ipaA: string; ipaB: string };

const PHONEMES: Phoneme[] = [
  { ipa: "iː", name: "Long E", example: "see", desc: "Tense high front vowel", type: "vowel" },
  { ipa: "ɪ", name: "Short I", example: "sit", desc: "Lax high front vowel", type: "vowel" },
  { ipa: "eɪ", name: "Long A", example: "day", desc: "Diphthong: e → ɪ glide", type: "vowel" },
  { ipa: "ɛ", name: "Short E", example: "bed", desc: "Lax mid front vowel", type: "vowel" },
  { ipa: "æ", name: "Short A", example: "cat", desc: "Lax low front vowel", type: "vowel" },
  { ipa: "ɑː", name: "Long A (broad)", example: "father", desc: "Tense low back vowel", type: "vowel" },
  { ipa: "ɒ", name: "Short O", example: "hot", desc: "Lax low back vowel (BrE)", type: "vowel" },
  { ipa: "ɔː", name: "Aw sound", example: "saw", desc: "Tense mid back vowel", type: "vowel" },
  { ipa: "oʊ", name: "Long O", example: "go", desc: "Diphthong: o → ʊ glide", type: "vowel" },
  { ipa: "ʊ", name: "Short OO", example: "put", desc: "Lax high back vowel", type: "vowel" },
  { ipa: "uː", name: "Long OO", example: "food", desc: "Tense high back vowel", type: "vowel" },
  { ipa: "ʌ", name: "Upside-down V", example: "cup", desc: "Lax mid central vowel", type: "vowel" },
  { ipa: "ɝː", name: "R-colored ER", example: "bird", desc: "Rhotic mid central vowel", type: "vowel" },
  { ipa: "ə", name: "Schwa", example: "about", desc: "Mid central reduced vowel", type: "vowel" },
  { ipa: "aɪ", name: "Long I", example: "fly", desc: "Diphthong: a → ɪ glide", type: "vowel" },
  { ipa: "aʊ", name: "Ow sound", example: "now", desc: "Diphthong: a → ʊ glide", type: "vowel" },
  { ipa: "ɔɪ", name: "Oy sound", example: "boy", desc: "Diphthong: ɔ → ɪ glide", type: "vowel" },
  { ipa: "ɪər", name: "Ear sound", example: "near", desc: "R-colored iə diphthong", type: "vowel" },
  { ipa: "eər", name: "Air sound", example: "hair", desc: "R-colored eə diphthong", type: "vowel" },
  { ipa: "ʊər", name: "Oor sound", example: "sure", desc: "R-colored ʊə diphthong", type: "vowel" },
  { ipa: "p", name: "Voiceless P", example: "pat", desc: "Bilabial plosive", type: "consonant" },
  { ipa: "b", name: "Voiced B", example: "bat", desc: "Bilabial plosive", type: "consonant" },
  { ipa: "t", name: "Voiceless T", example: "top", desc: "Alveolar plosive", type: "consonant" },
  { ipa: "d", name: "Voiced D", example: "dog", desc: "Alveolar plosive", type: "consonant" },
  { ipa: "k", name: "Voiceless K", example: "cat", desc: "Velar plosive", type: "consonant" },
  { ipa: "ɡ", name: "Voiced G", example: "go", desc: "Velar plosive", type: "consonant" },
  { ipa: "tʃ", name: "Voiceless CH", example: "church", desc: "Palato-alveolar affricate", type: "consonant" },
  { ipa: "dʒ", name: "Voiced J", example: "judge", desc: "Palato-alveolar affricate", type: "consonant" },
  { ipa: "f", name: "Voiceless F", example: "fun", desc: "Labiodental fricative", type: "consonant" },
  { ipa: "v", name: "Voiced V", example: "van", desc: "Labiodental fricative", type: "consonant" },
  { ipa: "θ", name: "Voiceless TH", example: "thin", desc: "Dental fricative", type: "consonant" },
  { ipa: "ð", name: "Voiced TH", example: "then", desc: "Dental fricative", type: "consonant" },
  { ipa: "s", name: "Voiceless S", example: "sun", desc: "Alveolar fricative", type: "consonant" },
  { ipa: "z", name: "Voiced Z", example: "zoo", desc: "Alveolar fricative", type: "consonant" },
  { ipa: "ʃ", name: "Voiceless SH", example: "ship", desc: "Palato-alveolar fricative", type: "consonant" },
  { ipa: "ʒ", name: "Voiced ZH", example: "vision", desc: "Palato-alveolar fricative", type: "consonant" },
  { ipa: "h", name: "Voiceless H", example: "hat", desc: "Glottal fricative", type: "consonant" },
  { ipa: "m", name: "M sound", example: "man", desc: "Bilabial nasal", type: "consonant" },
  { ipa: "n", name: "N sound", example: "no", desc: "Alveolar nasal", type: "consonant" },
  { ipa: "ŋ", name: "NG sound", example: "sing", desc: "Velar nasal", type: "consonant" },
  { ipa: "l", name: "L sound", example: "light", desc: "Alveolar lateral approximant", type: "consonant" },
  { ipa: "r", name: "R sound", example: "red", desc: "Post-alveolar approximant", type: "consonant" },
  { ipa: "w", name: "W sound", example: "we", desc: "Labio-velar approximant", type: "consonant" },
  { ipa: "j", name: "Y sound", example: "yes", desc: "Palatal approximant", type: "consonant" },
];

const MINIMAL_PAIRS: MinimalPair[] = [
  { a: "ship", b: "sheep", ipaA: "ʃɪp", ipaB: "ʃiːp" },
  { a: "bit", b: "beat", ipaA: "bɪt", ipaB: "biːt" },
  { a: "live", b: "leave", ipaA: "lɪv", ipaB: "liːv" },
  { a: "can", b: "can't", ipaA: "kæn", ipaB: "kɑːnt" },
  { a: "think", b: "sink", ipaA: "θɪŋk", ipaB: "sɪŋk" },
  { a: "full", b: "fool", ipaA: "fʊl", ipaB: "fuːl" },
  { a: "bed", b: "bad", ipaA: "bɛd", ipaB: "bæd" },
  { a: "cat", b: "cut", ipaA: "kæt", ipaB: "kʌt" },
];

const VOICED_PAIRS: { vless: string; vlessIpa: string; voiced: string; voicedIpa: string; vlessEx: string; voicedEx: string }[] = [
  { vless: "p", vlessIpa: "p", voiced: "b", voicedIpa: "b", vlessEx: "pat → /pæt/", voicedEx: "bat → /bæt/" },
  { vless: "t", vlessIpa: "t", voiced: "d", voicedIpa: "d", vlessEx: "top → /tɒp/", voicedEx: "dog → /dɒɡ/" },
  { vless: "k", vlessIpa: "k", voiced: "g", voicedIpa: "ɡ", vlessEx: "cat → /kæt/", voicedEx: "go → /ɡoʊ/" },
  { vless: "f", vlessIpa: "f", voiced: "v", voicedIpa: "v", vlessEx: "fan → /fæn/", voicedEx: "van → /væn/" },
  { vless: "s", vlessIpa: "s", voiced: "z", voicedIpa: "z", vlessEx: "sip → /sɪp/", voicedEx: "zip → /zɪp/" },
  { vless: "ʃ", vlessIpa: "ʃ", voiced: "ʒ", voicedIpa: "ʒ", vlessEx: "ship → /ʃɪp/", voicedEx: "measure → /ˈmɛʒər/" },
  { vless: "tʃ", vlessIpa: "tʃ", voiced: "dʒ", voicedIpa: "dʒ", vlessEx: "choke → /tʃoʊk/", voicedEx: "joke → /dʒoʊk/" },
  { vless: "θ", vlessIpa: "θ", voiced: "ð", voicedIpa: "ð", vlessEx: "thin → /θɪn/", voicedEx: "then → /ðɛn/" },
];

const VOWEL_GROUPS = {
  short: [
    { ipa: "ɪ", example: "sit", asIn: "i in sit" },
    { ipa: "ɛ", example: "bed", asIn: "e in bed" },
    { ipa: "æ", example: "cat", asIn: "a in cat" },
    { ipa: "ɒ", example: "hot", asIn: "o in hot (BrE)" },
    { ipa: "ʊ", example: "put", asIn: "oo in put" },
    { ipa: "ʌ", example: "cup", asIn: "u in cup" },
  ],
  long: [
    { ipa: "iː", example: "see", asIn: "ee in see" },
    { ipa: "uː", example: "food", asIn: "oo in food" },
    { ipa: "ɑː", example: "father", asIn: "a in father" },
    { ipa: "ɔː", example: "saw", asIn: "aw in saw" },
    { ipa: "ɝː", example: "bird", asIn: "ir in bird" },
  ],
  diphthongs: [
    { ipa: "eɪ", example: "day", asIn: "ay in day" },
    { ipa: "aɪ", example: "fly", asIn: "y in fly" },
    { ipa: "aʊ", example: "now", asIn: "ow in now" },
    { ipa: "ɔɪ", example: "boy", asIn: "oy in boy" },
    { ipa: "oʊ", example: "go", asIn: "o in go" },
    { ipa: "ɪər", example: "near", asIn: "ear in near" },
    { ipa: "eər", example: "hair", asIn: "air in hair" },
    { ipa: "ʊər", example: "sure", asIn: "oor in sure" },
  ],
};

const STRESS_RULES: { noun: string; verb: string }[] = [
  { noun: "REcord /ˈrekɔːd/", verb: "reCORD /rɪˈkɔːd/" },
  { noun: "PREsent /ˈprɛzənt/", verb: "preSENT /prɪˈzɛnt/" },
  { noun: "CONduct /ˈkɒndʌkt/", verb: "conDUCT /kənˈdʌkt/" },
  { noun: "PERmit /ˈpɜːmɪt/", verb: "perMIT /pəˈmɪt/" },
  { noun: "PROduce /ˈprɒdjuːs/", verb: "proDUCE /prəˈdjuːs/" },
  { noun: "CONtest /ˈkɒntɛst/", verb: "conTEST /kənˈtɛst/" },
  { noun: "IMport /ˈɪmpɔːt/", verb: "imPORT /ɪmˈpɔːt/" },
  { noun: "OBject /ˈɒbdʒɛkt/", verb: "obJECT /əbˈdʒɛkt/" },
];

const INTONATION: { type: string; example: string; pattern: string; meaning: string }[] = [
  { type: "Rising ↗", example: "Are you coming?", pattern: "↗ at the end", meaning: "Yes/no questions, uncertainty" },
  { type: "Falling ↘", example: "Where is it?", pattern: "↘ at the end", meaning: "Wh- questions, statements" },
  { type: "Rising ↗", example: "Really?", pattern: "↗ ↗", meaning: "Surprise, disbelief, echo question" },
  { type: "Falling ↘", example: "I don't think so.", pattern: "↘ slowly", meaning: "Certainty, finality" },
  { type: "Rise-fall ↗↘", example: "Oh, I see.", pattern: "↗ then ↘", meaning: "Surprise then realisation" },
  { type: "Fall-rise ↘↗", example: "Maybe...", pattern: "↘ then ↗", meaning: "Hesitation, politeness" },
];

const BRITISH_VS_AMERICAN: { word: string; british: string; american: string }[] = [
  { word: "dance", british: "/dɑːns/", american: "/dæns/" },
  { word: "bath", british: "/bɑːθ/", american: "/bæθ/" },
  { word: "hot", british: "/hɒt/", american: "/hɑːt/" },
  { word: "car", british: "/kɑː/", american: "/kɑːr/" },
  { word: "better", british: "/ˈbɛtə/", american: "/ˈbɛtər/" },
  { word: "schedule", british: "/ˈʃɛdjuːl/", american: "/ˈskɛdʒuːl/" },
  { word: "tomato", british: "/təˈmɑːtoʊ/", american: "/təˈmeɪtoʊ/" },
  { word: "water", british: "/ˈwɔːtə/", american: "/ˈwɔːtər/" },
  { word: "news", british: "/njuːz/", american: "/nuːz/" },
  { word: "either", british: "/ˈaɪðə/", american: "/ˈiːðər/" },
  { word: "herb", british: "/hɜːb/", american: "/ɜːrb/" },
  { word: "leisure", british: "/ˈlɛʒə/", american: "/ˈliːʒər/" },
];

export default function PhonicsPage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-text-primary)] mb-1">English Phonics &amp; Pronunciation</h1>
        <p className="text-[var(--color-text-secondary)]">Master the 44 sounds of English with IPA symbols, minimal pairs, and stress patterns</p>
      </div>

      <section className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-200">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-3 border-l-4 border-[var(--color-primary)] pl-3">The 44 English Phonemes</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">English has <strong>24 consonant</strong> and <strong>20 vowel</strong> phonemes — shown here with their IPA symbols.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {PHONEMES.map((p, i) => (
            <motion.div
              key={p.ipa}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-md)] px-3 py-2.5 border border-[var(--color-border-default)] text-center group hover:border-[var(--color-primary)] transition-all"
            >
              <span className="font-display text-xl font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-link)] transition-colors">{p.ipa}</span>
              <p className="text-xs font-medium text-[var(--color-text-link)]">{p.name}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">{p.example}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">Vowels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4">
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-2">Short Vowels</h3>
            <div className="space-y-1.5">
              {VOWEL_GROUPS.short.map((v) => (
                <div key={v.ipa} className="flex items-center gap-2 text-sm">
                  <span className="font-display font-bold text-lg text-[var(--color-text-link)] w-8">{v.ipa}</span>
                  <span className="text-[var(--color-text-primary)]">{v.example}</span>
                  <span className="text-[var(--color-text-secondary)] text-xs">({v.asIn})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4">
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-2">Long Vowels</h3>
            <div className="space-y-1.5">
              {VOWEL_GROUPS.long.map((v) => (
                <div key={v.ipa} className="flex items-center gap-2 text-sm">
                  <span className="font-display font-bold text-lg text-[var(--color-text-link)] w-8">{v.ipa}</span>
                  <span className="text-[var(--color-text-primary)]">{v.example}</span>
                  <span className="text-[var(--color-text-secondary)] text-xs">({v.asIn})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4">
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-2">Diphthongs</h3>
            <div className="space-y-1.5">
              {VOWEL_GROUPS.diphthongs.map((v) => (
                <div key={v.ipa} className="flex items-center gap-2 text-sm">
                  <span className="font-display font-bold text-lg text-[var(--color-text-link)] w-10">{v.ipa}</span>
                  <span className="text-[var(--color-text-primary)]">{v.example}</span>
                  <span className="text-[var(--color-text-secondary)] text-xs">({v.asIn})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">Consonants — Voiced vs Unvoiced Pairs</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Feel the vibration in your throat for voiced sounds. Hold your larynx to check.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {VOICED_PAIRS.map((pair) => (
            <div key={pair.vless} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-center">
                  <div className="font-display font-extrabold text-2xl text-red-600">{pair.vless}</div>
                  <span className="text-[10px] text-red-500 font-mono">unvoiced</span>
                </div>
                <span className="text-[var(--color-text-secondary)] text-lg">⇄</span>
                <div className="text-center">
                  <div className="font-display font-extrabold text-2xl text-blue-600">{pair.voiced}</div>
                  <span className="text-[10px] text-blue-500 font-mono">voiced</span>
                </div>
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] text-center space-y-0.5">
                <p>{pair.vlessEx}</p>
                <p>{pair.voicedEx}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">Minimal Pairs Trainer</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Words that differ by only one sound. Great for ear training.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {MINIMAL_PAIRS.map((mp) => (
            <div key={mp.a} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)] text-center group hover:border-[var(--color-primary)] transition-all">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div>
                  <div className="font-display font-bold text-lg text-[var(--color-text-primary)]">{mp.a}</div>
                  <div className="font-mono text-xs text-[var(--color-text-secondary)]">/{mp.ipaA}/</div>
                </div>
                <LearningArt name="↔" size={24} className="text-[var(--color-text-secondary)]" />
                <div>
                  <div className="font-display font-bold text-lg text-[var(--color-text-link)]">{mp.b}</div>
                  <div className="font-mono text-xs text-[var(--color-text-secondary)]">/{mp.ipaB}/</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">Word Stress Rules</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Two-syllable words: <strong>nouns</strong> stress the first syllable, <strong>verbs</strong> stress the second.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {STRESS_RULES.map((s) => (
            <div key={s.noun} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-3 border border-[var(--color-border-default)] text-sm">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-[var(--color-text-primary)] font-mono text-xs">{s.noun}</span>
                <span className="text-[var(--color-text-secondary)]">⇄</span>
                <span className="text-[var(--color-text-link)] font-mono text-xs">{s.verb}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">Sentence Rhythm &amp; Intonation</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Rising and falling pitch patterns change meaning in English.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INTONATION.map((item, i) => (
            <div key={i} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-[var(--color-text-link)]">{item.type}</span>
              </div>
              <p className="font-display font-bold text-[var(--color-text-primary)]">{item.example}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{item.pattern} — {item.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-8 ring-1 ring-brand-100 border border-[var(--color-border-default)]">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-primary)] pl-3">British vs American Pronunciation</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Key differences in vowel quality, rhoticity, and consonant sounds.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {BRITISH_VS_AMERICAN.map((item) => (
            <div key={item.word} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-md)] px-3 py-2.5 border border-[var(--color-border-default)] text-sm flex items-center gap-2">
              <span className="font-display font-bold text-[var(--color-text-primary)] w-14">{item.word}</span>
              <span className="font-mono text-xs text-blue-600">{item.british}</span>
              <span className="text-[var(--color-text-secondary)]">|</span>
              <span className="font-mono text-xs text-red-600">{item.american}</span>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
