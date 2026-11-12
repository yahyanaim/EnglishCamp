export const COACH_CONSENT='englishcamp-gemini-chat-v1';
export const COACH_LEVELS=['A1','A2','B1','B2','C1'] as const;
export const COACH_SITUATIONS=[
 {id:'cafe',title:'At a café',opening:'You are ordering a drink. What would you like?',role:'a café barista taking a drink and snack order'},
 {id:'travel',title:'Travel & directions',opening:'You have just arrived in a new city. Where would you like to go?',role:'a helpful person giving travel directions'},
 {id:'shopping',title:'Shopping',opening:'You are looking for something in a shop. How can I help?',role:'a shop assistant helping choose an item and discussing prices'},
 {id:'work',title:'At work',opening:'A new colleague joins your team. How would you introduce yourself?',role:'a friendly new colleague arranging everyday work'},
 {id:'study',title:'Study & university',opening:'We are planning a study session. What are you studying?',role:'a fellow adult student discussing study plans'},
 {id:'friends',title:'Meeting friends',opening:'We are making plans for the weekend. What would you like to do?',role:'a friend planning an everyday activity'},
 {id:'appointments',title:'Making appointments',opening:'You would like to book an appointment. What day works for you?',role:'a receptionist arranging a routine appointment without requesting personal details'},
 {id:'home',title:'Everyday life',opening:'Tell me about something you enjoy doing in your free time.',role:'a friendly conversation partner discussing hobbies and everyday routines'},
] as const;
export type CoachTurn={role:'user'|'assistant';text:string};
export type CoachFeedback={reply:string;correction:string|null;natural:string|null;transcript:string|null};
export function validCoachFeedback(value:unknown):value is CoachFeedback{
 const v=value as CoachFeedback;return !!v&&typeof v.reply==='string'&&v.reply.trim().length>0&&v.reply.length<=1600&&['correction','natural','transcript'].every(k=>{const t=v[k as keyof CoachFeedback];return t===null||typeof t==='string'&&t.length<=2000;});
}
