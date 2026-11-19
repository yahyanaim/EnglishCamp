import { VOCABULARY_BANK } from "@/data/vocabulary-5000";
const normalize=(word:string)=>word.normalize("NFKC").toLowerCase().replace(/[’‘]/g,"'").replace(/^[^a-z]+|[^a-z]+$/g,"");
const common:Record<string,string>={the:"أداة التعريف",a:"أداة نكرة",an:"أداة نكرة",and:"و",or:"أو",but:"لكن",in:"في",on:"على",at:"عند",to:"إلى",from:"من",with:"مع",without:"بدون",between:"بين",near:"قرب",before:"قبل",after:"بعد",during:"أثناء",people:"الناس",small:"صغير",empty:"خالٍ",land:"أرض",two:"اثنان",street:"شارع",walked:"مشى",every:"كلّ",day:"يوم",nobody:"لا أحد",there:"هناك",spring:"الربيع",wooden:"خشبي",box:"صندوق",wall:"جدار",tomatoes:"طماطم",week:"أسبوع",another:"آخر",bag:"حقيبة",change:"تغيير",garden:"حديقة",water:"ماء",books:"كتب",library:"مكتبة",was:"كان",were:"كانوا",is:"يكون",are:"يكونون",he:"هو",she:"هي",they:"هم",we:"نحن",it:"هو أو هي لغير العاقل",you:"أنت",i:"أنا",this:"هذا",that:"ذلك",their:"الخاصّ بهم",his:"الخاصّ به",her:"الخاصّ بها",not:"ليس",more:"أكثر",some:"بعض",first:"الأول",new:"جديد",old:"قديم",help:"مساعدة",home:"منزل",school:"مدرسة",work:"عمل",time:"وقت",much:"كثير",only:"فقط",learn:"يتعلّم",learning:"تعلّم",read:"يقرأ",reading:"قراءة",my:"الخاصّ بي",our:"الخاصّ بنا",me:"أنا (مفعول به)",us:"نحن (مفعول به)",have:"يملك",has:"يملك",go:"يذهب",eat:"يأكل",drink:"يشرب",buy:"يشتري",like:"يحبّ",today:"اليوم",morning:"صباح",afternoon:"بعد الظهر",dinner:"عشاء",lunch:"غداء",class:"صفّ دراسي",sister:"أخت",brothers:"إخوة",mother:"أمّ",family:"عائلة",families:"عائلات",big:"كبير",many:"كثير",sweet:"حلو",happy:"سعيد",tired:"متعب",too:"أيضًا",also:"أيضًا",then:"ثمّ",because:"لأنّ",bread:"خبز",cheese:"جبن",fish:"سمك",rice:"أرز",apple:"تفاحة",oranges:"برتقال",onions:"بصل",cakes:"كعك",name:"اسم",live:"يعيش",takes:"يستغرق",minutes:"دقائق",hour:"ساعة",early:"باكرًا",sleep:"ينام",talk:"يتحدّث",music:"موسيقى",drawing:"رسم",blue:"أزرق",green:"أخضر"};
type Entry={word:string;ar:string;def?:string};
/** Small, local inflection guesses keep lookups offline and free of per-word API calls. */
function candidates(key:string){
 const out=[key];
 if(key.endsWith("'s"))out.push(key.slice(0,-2));
 if(key.endsWith("ies"))out.push(key.slice(0,-3)+"y");
 if(key.endsWith("es"))out.push(key.slice(0,-2));
 if(key.endsWith("s"))out.push(key.slice(0,-1));
 if(key.endsWith("ied"))out.push(key.slice(0,-3)+"y");
 if(key.endsWith("ed")){out.push(key.slice(0,-2),key.slice(0,-1));if(/(.)\1ed$/.test(key))out.push(key.slice(0,-3));}
 if(key.endsWith("ing")){out.push(key.slice(0,-3),key.slice(0,-3)+"e");if(/(.)\1ing$/.test(key))out.push(key.slice(0,-4));}
 if(key.endsWith("ly"))out.push(key.slice(0,-2));
 return Array.from(new Set(out.filter(Boolean)));
}
export type WordDetails={word:string;meaning:string;definition:string;example:string;category:string;translationKind:"word"|"none"};
/**
 * Word-level help for an English passage. The full passage is never translated:
 * when no word meaning is known locally, the learner gets the English sentence and an honest note.
 */
export function lookupWord(word:string,lesson:{paragraphs:string[];glossary:Entry[];category:string},paragraph:number):WordDetails{
 const key=normalize(word),text=lesson.paragraphs[paragraph]??lesson.paragraphs[0]??"";
 let meaning="",definition="";
 for(const form of candidates(key)){
  const selected=lesson.glossary.find(v=>normalize(v.word)===form),entry=VOCABULARY_BANK.find(v=>normalize(v.w)===form);
  meaning=selected?.ar||entry?.a||common[form]||"";definition=selected?.def||entry?.d||"";
  if(meaning)break;
 }
 const sentences=text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)??[text];
 const example=(sentences.find(sentence=>sentence.split(/\s+/).some(token=>normalize(token)===key))??"").trim();
 return {word:word.replace(/^[^a-z]+|[^a-z']+$/gi,""),meaning,definition,example,category:lesson.category,translationKind:meaning?"word":"none"};
}
