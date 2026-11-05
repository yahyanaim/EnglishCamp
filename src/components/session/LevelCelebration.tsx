"use client";
import { useEffect, useState } from 'react';
import { useAchievements, ACHIEVEMENTS } from '@/store/useAchievements';
import { subscribeLearningCelebrations, type LearningCelebration } from '@/lib/celebrations';
import { chooseEncouragement, type Encouragement } from '@/lib/encouragement';
import { useSessionProfile } from './SessionProvider';
import { Modal } from '@/components/ui/Modal';
import { EncouragementPanel } from '@/components/ui/EncouragementPanel';

type QueuedCelebration = LearningCelebration & { quote: Encouragement };
export function LevelCelebration() {
  const { profile, ready } = useSessionProfile();
  const [queue, setQueue] = useState<QueuedCelebration[]>([]);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    setQueue([]);
    if (!ready) return;
    return subscribeLearningCelebrations(events => {
      const earned = events.map(event => ({ ...event, quote: chooseEncouragement(event.level) }));
      setQueue(current => [...current, ...earned.filter(event => !current.some(item => item.id === event.id))]);
    });
  }, [profile?.number, ready]);
  useEffect(() => {
    // Let sign-in, placement and manual encouragement dialogs finish first.
    const update = () => setBlocked(!!document.querySelector('[role="dialog"][data-state="open"]:not(.camp-automatic-celebration)'));
    update(); const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-state'] });
    return () => observer.disconnect();
  }, []);
  const active = queue[0], achievement = ACHIEVEMENTS.find(item => item.id === active?.achievementId);
  function close() {
    if (active?.achievementId) useAchievements.getState().dismissNew(active.achievementId);
    setQueue(current => current.slice(1));
  }
  return <Modal open={!!active && !blocked} onClose={close} title={profile ? `Congratulations, ${profile.name}!` : 'Congratulations!'} className="camp-celebration-modal camp-automatic-celebration">
    {active && <EncouragementPanel key={active.id} level={active.level} achievement={achievement} levelUp={active.levelUp} quote={active.quote} next={queue.length > 1} onContinue={close} onAnother={() => setQueue(current => current.map((item, i) => i === 0 ? { ...item, quote: chooseEncouragement(item.level, item.quote.id) } : item))}/>}
  </Modal>;
}
