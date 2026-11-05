"use client";
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageBanner } from '@/components/ui/PageBanner';
import { StudyTimetable } from '@/components/placement/StudyTimetable';
import { LearningArt } from '@/components/brand/LearningArt';
import { useProgress } from '@/store/useProgress';
import { useGoals } from '@/store/useGoals';
import { useVocabulary } from '@/store/useVocabulary';
import { levels } from '@/data/content';
export default function StudyPlanPage(){
 const {lessons,getLevel}=useProgress(),{weeklyXpGoal,xpThisWeek,weeklyLessonGoal,lessonsThisWeek,getProgress}=useGoals(),{getAll}=useVocabulary();
 const {level}=getLevel(),{xpPct,lessonPct}=getProgress(),words=getAll();const completed=Object.values(lessons).filter(l=>l.completed).length,total=levels.reduce((sum,l)=>sum+l.lessons.length,0);
 return <PageWrapper><PageBanner><h1>My Study Plan</h1><p>A starting point, a timetable and your next lessons.</p></PageBanner><StudyTimetable/>
 <section className="camp-plan-activity"><h2 className="camp-placement-activity-heading">Your learning activity</h2><p className="camp-placement-fine">XP tracks practice activity. Your English starting level comes from the optional placement check.</p><div className="camp-plan-statistics">{[['XP learning level',String(level)],['Lessons completed',`${completed} / ${total}`],['Vocabulary collected',`${words.length} words`]].map(([label,value])=><div className="camp-placement-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
 <div className="camp-plan-goals">{[{title:'Weekly XP goal',pct:xpPct,text:`${xpThisWeek} / ${weeklyXpGoal} XP this week`},{title:'Weekly lesson goal',pct:lessonPct,text:`${lessonsThisWeek} / ${weeklyLessonGoal} lessons this week`}].map(goal=><div className="camp-placement-card" key={goal.title}><strong>{goal.title}</strong><progress aria-label={goal.title} value={goal.pct} max={100}/><p>{goal.text}</p></div>)}</div><div className="camp-plan-shortcuts"><Link href="/weak-areas"><LearningArt name="Target" size={18}/>Review my mistakes →</Link><Link href="/stats"><LearningArt name="BarChart3" size={18}/>View all my progress →</Link></div></section>
 </PageWrapper>;
}
