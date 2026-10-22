export function calculateStreak(lastActiveDate: string | null, currentStreak: number): {
  newStreak: number;
  isNewDay:  boolean;
} {
  const today     = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (!lastActiveDate)             return { newStreak: 1, isNewDay: true  };
  if (lastActiveDate === today)    return { newStreak: currentStreak, isNewDay: false };
  if (lastActiveDate === yesterday) return { newStreak: currentStreak + 1, isNewDay: true };
  return { newStreak: 1, isNewDay: true };
}
