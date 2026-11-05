import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { validAccent } from "@/lib/accentPalette";

interface Settings {
  accentColor: string;
  setAccentColor: (color: string) => void;
  theme:        "dark" | "light" | "system";
  dailyGoal:    number;
  soundEnabled: boolean;
  language:     "en" | "fr" | "ar";

  setTheme:     (t: Settings["theme"]) => void;
  setDailyGoal: (n: number) => void;
  toggleSound:  () => void;
  setLanguage:  (l: Settings["language"]) => void;
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      accentColor: "#7E22CE",
      setAccentColor: (accentColor) => { if(validAccent(accentColor)) set({accentColor}); },
      theme:        "dark",
      dailyGoal:    3,
      soundEnabled: true,
      language:     "fr",
      setTheme:     (theme) => set({ theme }),
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      toggleSound:  () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      setLanguage:  (language) => set({ language }),
    }),
    {
      name:    "englishcamp-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
