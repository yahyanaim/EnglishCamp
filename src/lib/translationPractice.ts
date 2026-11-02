export type TranslationDirection = "ar" | "en";
export type TranslationEntry = { id: string; english: string; arabic: string; topic: string; groupId?: string; speaker?: string };

export function shuffleTranslations<T>(values: readonly T[], random = Math.random): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function validTranslation(entry: TranslationEntry): boolean {
  return !!entry.english.trim() && /[A-Za-z]/.test(entry.english) && !/[\u0600-\u06ff]/.test(entry.english) && /[\u0600-\u06ff]/.test(entry.arabic);
}

/** The direction names identify the source language. Both sides come from one authored pair. */
export function translationQuestion(entry: TranslationEntry, pool: readonly TranslationEntry[], direction: TranslationDirection, random = Math.random) {
  const sourceKey = direction === "ar" ? "arabic" : "english";
  const answerKey = direction === "ar" ? "english" : "arabic";
  const prompt = entry[sourceKey];
  const answer = entry[answerKey];
  // Equivalent translations of the same prompt must never be offered as wrong answers.
  const accepted = new Set(pool.filter(item => item[sourceKey] === prompt).map(item => item[answerKey]));
  accepted.add(answer);
  const distractors = Array.from(new Set(pool.map(item => item[answerKey]).filter(text => text.trim() && !accepted.has(text))));
  return { prompt, answer, accepted: Array.from(accepted), options: shuffleTranslations([answer, ...shuffleTranslations(distractors, random).slice(0, 3)], random) };
}

export function translationSession(pool: readonly TranslationEntry[], direction: TranslationDirection, random = Math.random) {
  const sourceKey = direction === "ar" ? "arabic" : "english";
  const seen = new Set<string>();
  return shuffleTranslations(pool.filter(validTranslation), random).filter(item => {
    if (seen.has(item[sourceKey])) return false;
    seen.add(item[sourceKey]); return true;
  }).slice(0, 10);
}
