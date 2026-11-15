export const adminNavigation = [
  {id:'dashboard',label:'Dashboard',group:'Overview',icon:'table',description:'Registrations, learning activity and admissions in one workspace.'},
  {id:'analytics',label:'Analytics',group:'Overview',icon:'pattern',description:'Explore recorded course engagement, practice stages and quiz performance.'},
  {id:'learners',label:'Learners',group:'Learners',icon:'chat',description:'Find online profiles, review recorded progress and manage access.'},
  {id:'courses',label:'Courses',group:'Learning',icon:'book',description:'Inspect the source-controlled curriculum and published learning resources.'},
  {id:'achievements',label:'Achievements',group:'Learning',icon:'trophy',description:'Understand earned badges and recorded awards across the platform.'},
  {id:'invitations',label:'Invitations',group:'Operations',icon:'document',description:'Welcome learners at a pace your platform can support.'},
  {id:'infrastructure',label:'Infrastructure',group:'Operations',icon:'review',description:'Check the database, configured services and available request counters.'},
  {id:'settings',label:'Settings',group:'Operations',icon:'plan',description:'Review protected platform settings and existing service guardrails.'},
] as const;
export const adminGroups = ['Overview','Learners','Learning','Operations'];
