"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomFlashcards } from "@/store/useCustomFlashcards";
import { useVocabulary } from "@/store/useVocabulary";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { Plus, Trash2, Upload, RefreshCw } from "lucide-react";

export default function CustomFlashcardsPage() {
  const { cards, addCard, removeCard, getAll, importFromVocab } = useCustomFlashcards();
  const [de, setDe] = useState("");
  const [en, setEn] = useState("");
  const [category, setCategory] = useState("custom");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function handleAdd() {
    if (!de.trim() || !en.trim()) return;
    addCard({ de: de.trim(), en: en.trim(), category });
    setDe("");
    setEn("");
    setShowForm(false);
  }

  const cardList = getAll();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Custom Flashcards</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Create your own flashcards from vocabulary</p>
        </div>
        <div className="flex gap-2">
          <button onClick={importFromVocab}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border-default)] px-3 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-alt)] transition-all">
            <Upload className="w-3.5 h-3.5" /> From Vocab
          </button>
          <button onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-3 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            <Plus className="w-3.5 h-3.5" /> New
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" value={de} onChange={(e) => setDe(e.target.value)} placeholder="English word"
                className="px-3 py-2 text-sm bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
              <input type="text" value={en} onChange={(e) => setEn(e.target.value)} placeholder="English translation"
                className="px-3 py-2 text-sm bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category"
                className="px-3 py-2 text-sm bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
            </div>
            <button onClick={handleAdd} disabled={!de.trim() || !en.trim()}
              className="mt-3 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50">
              Add Card
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardList.length === 0 && (
          <div className="col-span-full text-center py-12 text-[var(--color-text-disabled)]">
            <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No custom flashcards yet</p>
            <p className="text-xs mt-1">Add cards or import from your vocabulary bank</p>
          </div>
        )}
        {cardList.map((card) => {
          const isFlipped = flipped === card.id;
          return (
            <motion.div key={card.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border-2 border-[var(--color-border-default)] overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <div onClick={() => setFlipped(isFlipped ? null : card.id)} className="cursor-pointer min-h-[140px] flex flex-col items-center justify-center p-6 relative">
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <span className="text-xs text-[var(--color-text-disabled)] mb-2 block">{card.category}</span>
                      <span className="text-xl font-bold text-[var(--color-text-primary)]">{card.de}</span>
                    </motion.div>
                  ) : (
                    <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <span className="text-lg font-semibold text-[var(--color-success)]">{card.en}</span>
                      {card.example && <p className="text-xs text-[var(--color-text-disabled)] mt-1">{card.example}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface-alt)] border-t border-[var(--color-border-default)]">
                <SpeakerButton text={card.de} />
                <button onClick={() => removeCard(card.id)} className="text-[var(--color-text-disabled)] hover:text-[var(--color-error)] transition-colors p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
