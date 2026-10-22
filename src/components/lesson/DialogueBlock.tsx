import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

interface Props { title: string; lines: { speaker: string; en: string; tr: string }[] }

const SPEAKER_COLORS: Record<string, { bg: string; badge: string }> = {};
function getSpeakerStyle(speaker: string, index: number) {
  if (!SPEAKER_COLORS[speaker]) {
    const colors = [
      { bg: "var(--color-primary-subtle)", badge: "var(--color-primary)" },
      { bg: "var(--color-success-bg)", badge: "var(--color-success)" },
      { bg: "var(--color-warning-bg)", badge: "var(--color-warning)" },
      { bg: "#F3E8FF", badge: "#9B59B6" },
      { bg: "var(--color-error-bg)", badge: "var(--color-error)" },
      { bg: "var(--color-info-bg)", badge: "var(--color-info)" },
    ];
    SPEAKER_COLORS[speaker] = colors[index % colors.length];
  }
  return SPEAKER_COLORS[speaker];
}

export function DialogueBlock({ title, lines }: Props) {
  return (
    <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-primary)] overflow-hidden bg-[var(--color-surface)]" style={{ boxShadow: "0 3px 0 var(--color-primary)" }}>
      <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ backgroundColor: "var(--color-primary)" }}>
        <MessageSquare className="w-4 h-4 text-white" />
        <span className="font-display font-extrabold text-white text-sm">{title}</span>
      </div>
      <div className="divide-y divide-[var(--color-border-default)]">
        {lines.map((line, i) => {
          const style = getSpeakerStyle(line.speaker, i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="px-5 py-4 border-l-4 transition-colors hover:bg-[var(--color-surface-alt)]"
              style={{ borderLeftColor: style.badge }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-display font-extrabold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-[var(--radius-pill)] text-white" style={{ backgroundColor: style.badge }}>
                  {line.speaker}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <p className="font-body text-sm font-medium leading-relaxed text-[var(--color-text-primary)] flex-1">{line.en}</p>
                <SpeakerButton text={line.en} />
              </div>
              {line.tr && line.tr !== line.en && (
                <p className="font-body text-xs italic mt-1 text-[var(--color-text-secondary)]">→ {line.tr}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
