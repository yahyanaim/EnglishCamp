"use client";
import { useEffect, useState } from "react";
import { useProgress } from "@/store/useProgress";
import { useAchievements } from "@/store/useAchievements";
import { getLevelInfo } from "@/lib/xp";
import { isRestoringLearner } from "@/lib/learnerStores";
import { useSessionProfile } from "./SessionProvider";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/shadcn/button";
import { LearningArt } from "@/components/brand/LearningArt";

export function LevelCelebration() {
  const { profile, ready } = useSessionProfile();
  const [earned, setEarned] = useState<{ level: number; xp: number } | null>(null);
  useEffect(() => {
    setEarned(null);
    if (!ready) return;
    return useProgress.subscribe((next, previous) => {
      if (isRestoringLearner() || next.xp <= previous.xp) return;
      useAchievements.getState().checkAndUnlock();
      const level = getLevelInfo(next.xp).level;
      if (level > getLevelInfo(previous.xp).level) setEarned({ level, xp: next.xp });
    });
  }, [profile?.number, ready]);
  return <Modal open={!!earned} onClose={() => setEarned(null)} title={profile ? `Congratulations, ${profile.name}!` : "Congratulations!"}>
    {earned && <div className="camp-level-celebration"><LearningArt name="trophy" size={52}/><p>You reached</p><strong>Learning level {earned.level}</strong><span>{earned.xp.toLocaleString()} XP earned</span><p>Your practice is adding up. Keep taking one small step at a time.</p><Button onClick={() => setEarned(null)}>Keep learning</Button></div>}
  </Modal>;
}
