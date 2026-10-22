"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open:     boolean;
  onClose:  () => void;
  title?:   string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-[var(--color-surface-overlay)]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative bg-[var(--color-surface)] rounded-[var(--radius-xl)] p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-[var(--shadow-5)]"
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>}
              <button onClick={onClose} className="p-1 rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-50)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
