"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useProgress } from "@/store/useProgress";
import { activityDays,localDay } from "@/lib/learningActivity";
export function ActivityChart() {
 const state=useProgress(), activity=activityDays(state);
 const days=Array.from({length:28},(_,i)=>{const day=new Date();day.setDate(day.getDate()-(27-i));return localDay(day);});
 const max=Math.max(1,...days.map(day=>activity[day]?.count??0)),active=days.filter(day=>activity[day]).length;
 return <section className="camp-activity-chart" aria-label="Learning activity over 28 days"><header><LearningArt name="calendar" size={20}/><h3>Activity (28 days)</h3><span>{active} active {active===1?'day':'days'}</span></header><div className="camp-activity-bars">{days.map(day=>{const item=activity[day],label=`${day}: ${item?.count ? `${item.count} recorded ${item.count===1?"activity":"activities"}` : item?.legacy ? 'Activity recorded; older details unavailable' : 'No recorded activity'}`;return <div key={day} className="camp-activity-day" tabIndex={0} aria-label={label} title={label}><span data-active={!!item} style={{height:item ? `${Math.max(12,(item.count/max)*68)}px` : '3px'}}/><span className="camp-activity-tooltip">{label}</span></div>;})}</div><footer><span>{days[0]}</span><span>Today</span></footer><p>Lessons, quizzes, exercises and flashcard reviews. Older saved active days are retained when detailed history is unavailable.</p></section>;
}
