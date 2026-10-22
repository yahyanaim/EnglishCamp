"use client";
import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
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
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Pronunciation Guide</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Master English sounds with IPA, examples, and audio</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PRONUNCIATION_GUIDE.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-lg)] text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:ring-brand-200"
              }`}
            >
              {s.title}
            </button>
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
    </PageWrapper>
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
          <code className="text-lg font-bold text-[var(--color-primary-dark)] font-mono">/{sound.symbol}/</code>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">{sound.audioDescription}</p>
          <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{sound.arabic}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--color-text-disabled)]">{sound.example}</span>
        <button
          onClick={() => onSpeak(sound.example.split(",")[0].trim())}
          className="text-[var(--color-text-disabled)] hover:text-[var(--color-primary)] transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
