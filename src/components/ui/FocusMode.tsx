"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
const FocusContext = createContext<{ focused: boolean; toggle: () => void }>({ focused: false, toggle: () => {} });

export function useFocusMode() {
  return useContext(FocusContext);
}

export function FocusProvider({ children }: { children: ReactNode }) {
  const [focused, setFocused] = useState(false);
  return (
    <FocusContext.Provider value={{ focused, toggle: () => setFocused((f) => !f) }}>
      {children}
    </FocusContext.Provider>
  );
}

export function FocusToggle() {
  const { focused, toggle } = useFocusMode();
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[var(--radius-md)] border transition-all ${
        focused
          ? "bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)]"
      }`}
      title={focused ? "Exit focus mode" : "Enter focus mode"}
    >
      {focused ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      {focused ? "Exit Focus" : "Focus Mode"}
    </button>
  );
}
