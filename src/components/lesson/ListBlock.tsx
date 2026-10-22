import { motion } from "framer-motion";
import { Circle } from "lucide-react";

interface Props { items: string[] }

export function ListBlock({ items }: Props) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className="flex items-start gap-3 font-body text-sm leading-relaxed text-[var(--color-text-primary)] p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <Circle className="w-2 h-2 mt-2 flex-shrink-0" style={{ color: "var(--color-primary)", fill: "var(--color-primary)" }} />
          <span className="flex-1">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
