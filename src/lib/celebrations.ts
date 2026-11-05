import { getLevelInfo } from './xp';
import { ACHIEVEMENTS, useAchievements } from '@/store/useAchievements';
import { useProgress } from '@/store/useProgress';
import { useVocabulary } from '@/store/useVocabulary';
import { useErrors } from '@/store/useErrors';
import { isRestoringLearner } from './learnerStores';

export type LearningCelebration = { id: string; achievementId?: string; level: number; levelUp: boolean };
/** Only fresh transitions produce celebrations; persisted badges remain untouched. */
export function learningCelebrations(previousXP: number, nextXP: number, badgeIds: readonly string[]): LearningCelebration[] {
  const level = getLevelInfo(nextXP).level, levelUp = nextXP > previousXP && level > getLevelInfo(previousXP).level;
  const badges = Array.from(new Set(badgeIds)).filter(id => ACHIEVEMENTS.some(badge => badge.id === id));
  if (badges.length) return badges.map((id, index) => ({ id: `badge:${id}`, achievementId: id, level, levelUp: levelUp && index === 0 }));
  return levelUp ? [{ id: `level:${level}`, level, levelUp: true }] : [];
}

/** Observe the active learner only; subscribing or restoring never replays old awards. */
export function subscribeLearningCelebrations(onEarned: (events: LearningCelebration[]) => void) {
  let previousXP = useProgress.getState().xp, timer: ReturnType<typeof setTimeout> | undefined, flushing = false;
  const pendingBadges = new Set<string>();
  function schedule() {
    if (isRestoringLearner()) { previousXP = useProgress.getState().xp; return; }
    if (timer === undefined && !flushing) timer = setTimeout(flush, 0);
  }
  function flush() {
    timer = undefined;
    if (isRestoringLearner()) { previousXP = useProgress.getState().xp; pendingBadges.clear(); return; }
    flushing = true;
    const xp = useProgress.getState().xp;
    useAchievements.getState().checkAndUnlock().forEach(id => pendingBadges.add(id));
    const events = learningCelebrations(previousXP, xp, Array.from(pendingBadges));
    previousXP = xp; pendingBadges.clear(); flushing = false;
    if (events.length) onEarned(events);
  }
  const unsubscribers = [useProgress.subscribe(schedule), useVocabulary.subscribe(schedule), useErrors.subscribe(schedule),
    useAchievements.subscribe((next, previous) => {
      if (isRestoringLearner()) return;
      Object.keys(next.unlocked).filter(id => !previous.unlocked[id]).forEach(id => pendingBadges.add(id));
      if (pendingBadges.size) schedule();
    })];
  return () => { unsubscribers.forEach(unsubscribe => unsubscribe()); if (timer !== undefined) clearTimeout(timer); };
}
