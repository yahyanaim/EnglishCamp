"use client";
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrandMark } from '@/components/brand/BrandMark';
import { LearningArt } from '@/components/brand/LearningArt';
import type { Encouragement } from '@/lib/encouragement';
import type { Achievement } from '@/store/useAchievements';
import { NumberSeal } from './NumberSeal';
import { Button } from './shadcn/button';

export function EncouragementPanel({ level, quote, onAnother, onContinue, achievement, levelUp = false, next = false }: {
  level: number; quote: Encouragement; onAnother: () => void; onContinue: () => void;
  achievement?: Achievement; levelUp?: boolean; next?: boolean;
}) {
  const reduced = useReducedMotion();
  const awardArt = achievement && { streak: 'spark', xp: 'trophy', exercises: 'book', vocab: 'book', quiz: 'cap', errors: 'review', special: 'flag' }[achievement.category];
  return <div className="camp-encouragement-panel">
    <div className="camp-celebration-scene" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--piece': i } as React.CSSProperties}/>)}
      <motion.div className="camp-celebration-mascot" initial={reduced ? false : { y: 16, scale: .88, rotate: -7 }} animate={{ y: 0, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 13 }}><BrandMark size={96}/></motion.div>
      {achievement && <span className="camp-celebration-award"><LearningArt name={awardArt} size={28}/></span>}
    </div>
    <div className="camp-celebration-heading">
      <span className="camp-celebration-kicker">{achievement ? 'New badge unlocked' : levelUp ? 'A new milestone' : 'One step at a time'}</span>
      {achievement && <><h3>{achievement.title}</h3><p>{achievement.description}</p></>}
      <span className="camp-celebration-level"><NumberSeal value={level} label={`Learning level ${level}`}/>{levelUp ? 'You reached level' : 'Learning level'} {level}</span>
    </div>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div className="camp-celebration-message" key={quote.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .16 }}>
        <blockquote aria-live="polite">{quote.text}</blockquote><p>{quote.action}</p>
      </motion.div>
    </AnimatePresence>
    <div className="camp-celebration-actions"><Button variant="outline" onClick={onAnother}>Another thought</Button><Button onClick={onContinue}>{next ? 'Next badge' : 'Keep learning'}</Button></div>
  </div>;
}
