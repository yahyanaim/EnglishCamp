import { useSettings } from "@/store/useSettings";

export type Translatable = { en: string; ar?: string };

export function useAppTranslation() {
  const language = useSettings((s) => s.language);

  const t = (item: Translatable): string => {
    if (language === "ar" && item.ar) return item.ar;
    return item.en;
  };

  return { t, language };
}
