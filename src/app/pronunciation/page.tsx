"use client";
import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { VocabularyPage } from "@/components/layout/VocabularyPage";
import { speak } from "@/lib/audio";
import { PRONUNCIATION_GUIDE, type PronunciationSound } from "@/data/pronunciation";
import { Volume2 } from "lucide-react";

export default function PronunciationPage() {
  const [activeSection, setActiveSection] = useState<string>(PRONUNCIATION_GUIDE[0]?.id ?? "");

  const section = PRONUNCIATION_GUIDE.find((s) => s.id === activeSection);

  const handleSpeak = (text: string) => {
    speak(text, "en-US");
  };

  return (
    <VocabularyPage title="Pronunciation guide" description="Listen, compare sounds and practise clear speech.">
      <div className="space-y-6">


        <div className="camp-vocab-tabs">
          {PRONUNCIATION_GUIDE.map((s) => (
            <Button variant="unstyled" size="unstyled"
              key={s.id}
              aria-pressed={activeSection === s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-lg)] text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-sm"
                  : "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:ring-brand-200"
              }`}
            >
              {s.title}
            </Button>
          ))}
        </div>

        {section && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-[var(--color-text-secondary)]">{section.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.sounds.map((sound) => (
                <SoundCard key={sound.symbol} sound={sound} onSpeak={handleSpeak} />
              ))}
            </div>
          </div>
        )}
      </div>
    </VocabularyPage>
  );
}

function SoundCard({
  sound,
  onSpeak,
}: {
  sound: PronunciationSound;
  onSpeak: (text: string) => void;
}) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 shadow-sm ring-1 ring-[var(--color-border-default)]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <code className="text-lg font-bold text-[var(--color-text-link)] font-mono">/{sound.symbol}/</code>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">{sound.audioDescription}</p>
          <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar" dir="rtl">{sound.arabic}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--color-text-secondary)]">{sound.example}</span>
        <Button variant="unstyled" size="unstyled"
          aria-label={`Listen to ${sound.example.split(",")[0].trim()}`} onClick={() => onSpeak(sound.example.split(",")[0].trim())}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
