export const adminNavigation = [
  {id:'dashboard',label:'Dashboard',group:'Overview',icon:'dashboard',description:'Registrations, learning activity and admissions in one workspace.'},
  {id:'analytics',label:'Analytics',group:'Overview',icon:'analytics',description:'Explore recorded course engagement, practice stages and quiz performance.'},
  {id:'learners',label:'Learners',group:'Learners',icon:'users',description:'Find online profiles, review recorded progress and manage access.'},
  {id:'achievements',label:'Achievements',group:'Learning',icon:'trophy',description:'Understand earned badges and recorded awards across the platform.'},
  {id:'invitations',label:'Invitations',group:'Operations',icon:'ticket',description:'Welcome learners at a pace your platform can support.'},
  {id:'infrastructure',label:'Infrastructure',group:'Operations',icon:'server',description:'Check the database, configured services and available request counters.'},
  {id:'security',label:'Security',group:'Security',icon:'shield',description:'Review access protections, response counters and administrator sessions.'},
  {id:'settings',label:'Settings',group:'Security',icon:'settings',description:'Manage your administrator profile, admissions and workspace preferences.'},
] as const;
export const adminGroups = ['Overview','Learners','Learning','Operations','Security'];
