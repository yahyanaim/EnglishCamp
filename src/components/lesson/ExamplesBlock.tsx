import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

interface Props { items: { en: string; tr: string; ar?: string }[] }

export function ExamplesBlock({ items }: Props) {
  return (
    <div className="space-y-2.5 my-3">
      {items.map((item, i) => {
        const hasDistinctTr = Boolean(item.tr && item.tr.trim() !== item.en.trim());
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] hover:border-[var(--color-primary)] transition-all duration-200"
            style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            whileHover={{ boxShadow: "0 3px 0 var(--color-primary)" }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <SpeakerButton text={item.en} className="flex-shrink-0" />
              <span className="font-semibold text-base leading-relaxed text-[var(--color-text-primary)]">
                {item.en}
              </span>
            </div>

            {hasDistinctTr && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <ArrowRight className="w-4 h-4 text-[var(--color-text-disabled)] flex-shrink-0" />
                <span>{item.tr}</span>
              </div>
            )}

            {item.ar && (
              <div className="text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md self-start sm:self-auto" dir="rtl">
                {item.ar}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
