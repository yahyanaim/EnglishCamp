import type { PlacementLevel } from '@/data/placement/questions';
/** A decorative level seal. Its label describes a study level, not a verification claim. */
export function LevelBadge({level}:{level:PlacementLevel}){
 const points=Array.from({length:48},(_,i)=>{const r=i%2?43:48,a=i*Math.PI/24-Math.PI/2;return `${50+Math.cos(a)*r},${50+Math.sin(a)*r}`;}).join(' ');
 return <span className="camp-level-badge" role="img" aria-label={`Study level ${level}`}><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points={points} fill="var(--camp-purple-soft)" stroke="var(--camp-purple)" strokeWidth="1.8"/><circle cx="50" cy="50" r="34" fill="var(--color-surface)" stroke="var(--camp-purple)" strokeWidth="1.5"/></svg><strong>{level}</strong></span>;
}
