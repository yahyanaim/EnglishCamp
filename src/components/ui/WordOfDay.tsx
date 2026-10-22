"use client";
import { useState, useEffect } from "react";
import { useVocabulary } from "@/store/useVocabulary";
import { SpeakerButton } from "./SpeakerButton";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
const WORD_BANK = [
  { de: "comprehensive", en: "complete; including all or nearly all elements", ar: "شامل / متكامل" },
  { de: "resilient", en: "able to withstand or recover quickly from difficulty", ar: "مرن / صامد" },
  { de: "subtle", en: "delicate or precise; difficult to notice at first", ar: "دقيق / خفي" },
  { de: "ubiquitous", en: "present, appearing, or found everywhere", ar: "واسع الانتشار / موجود في كل مكان" },
  { de: "ambiguous", en: "open to more than one interpretation; unclear", ar: "غامض / ملتبس" },
  { de: "pragmatic", en: "dealing with problems sensibly and realistically", ar: "عملي / واقعي" },
  { de: "innovative", en: "introducing new ideas; advanced and original", ar: "مبتكر / إبداعي" },
  { de: "coherent", en: "logical, consistent, and easily understood", ar: "متماسك / منطقي" },
  { de: "diligent", en: "showing careful attention and constant effort", ar: "مجتهد / مثابر" },
  { de: "eloquent", en: "fluent and persuasive in speaking or writing", ar: "بليغ / فصيح" },
  { de: "feasible", en: "possible to achieve easily or conveniently", ar: "قابل للتطبيق / مجدٍ" },
  { de: "meticulous", en: "showing great attention to detail; very precise", ar: "دقيق للغاية / شديد الحرص" },
  { de: "versatile", en: "adaptable to many different functions or activities", ar: "متعدد الاستخدامات / مرن" },
  { de: "scrutinize", en: "examine or inspect closely and thoroughly", ar: "يدقق / يفحص بعناية" },
  { de: "advocate", en: "to publicly support or recommend a cause or policy", ar: "يؤيد / يدافع عن" },
  { de: "inevitable", en: "certain to happen; unavoidable", ar: "حتمي / لا مفر منه" },
  { de: "substantial", en: "of considerable importance, size, or worth", ar: "جوهري / كبير" },
  { de: "elaborate", en: "involving many carefully arranged parts or details", ar: "مفصل / متقن" },
  { de: "concur", en: "to agree with someone or share the same opinion", ar: "يتفق / يوافق" },
  { de: "reluctant", en: "unwilling and hesitant; disinclined", ar: "متردد / غير راغب" },
  { de: "perseverance", en: "persistence in doing something despite difficulties", ar: "مثابرة / إصرار" },
  { de: "lucid", en: "expressed clearly; easy to understand", ar: "واضح / جلي" },
  { de: "profound", en: "very great or intense; having deep meaning", ar: "عميق / بالغ الأثر" },
  { de: "discreet", en: "careful in speech or actions to avoid offense", ar: "كتوم / حذر" },
  { de: "tentative", en: "not certain or fixed; provisional", ar: "مبدئي / تجريبي" },
  { de: "spontaneous", en: "occurring naturally without external impulse or plan", ar: "عفوي / تلقائي" },
  { de: "consensus", en: "a general agreement among a group of people", ar: "إجماع / توافق الآراء" },
  { de: "mitigate", en: "to make something less severe, serious, or painful", ar: "يخفف / يلطف" },
  { de: "candid", en: "truthful and straightforward; frank", ar: "صريح / صادق" },
  { de: "impartial", en: "treating all rivals equally; fair and unbiased", ar: "نزيه / محايد" },
];

export function WordOfDay() {
  const { addWord } = useVocabulary();
  const [word, setWord] = useState<{ de: string; en: string; ar?: string } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setWord(WORD_BANK[dayOfYear % WORD_BANK.length]);
  }, []);

  function handleAdd() {
    if (!word) return;
    addWord(word.de, word.en, "word-of-day");
    setAdded(true);
  }

  if (!word) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: "var(--color-info)" }} />
          <span className="font-body font-semibold text-[10px] uppercase tracking-wider" style={{ color: "var(--color-info-dark)" }}>
            Word of the Day
          </span>
        </div>
        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="font-body text-xs font-semibold inline-flex items-center gap-0.5 transition-all duration-150"
            style={{ color: "var(--color-info-dark)" }}
          >
            Reveal <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-display font-extrabold" style={{ fontSize: "18px", color: "var(--color-text-primary)" }}>{word.de}</span>
        <SpeakerButton text={word.de} />
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2"
        >
          <p className="font-body text-sm italic" style={{ color: "var(--color-text-secondary)" }}>{word.en}</p>
          {word.ar && <p className="font-body text-sm mt-0.5" style={{ color: "var(--color-text-disabled)" }}>{word.ar}</p>}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAdd}
              disabled={added}
              className="font-body text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] border-2 transition-all duration-150"
              style={{
                backgroundColor: added ? "var(--color-success-bg)" : "var(--color-primary-subtle)",
                color: added ? "var(--color-success-dark)" : "var(--color-primary-dark)",
                borderColor: added ? "var(--color-success)" : "var(--color-primary)",
              }}
            >
              {added ? "Saved ✓" : "+ Save to Vocabulary"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
