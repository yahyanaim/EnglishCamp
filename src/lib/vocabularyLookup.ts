import { VOCABULARY_BANK } from "@/data/vocabulary-5000";
import type { ReadingArticle } from "@/data/reading-articles";
const normalize=(word:string)=>word.normalize("NFKC").toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,"");
const common:Record<string,string>={the:"أداة التعريف",a:"أداة نكرة",an:"أداة نكرة",and:"و",or:"أو",but:"لكن",in:"في",on:"على",at:"عند",to:"إلى",from:"من",with:"مع",without:"بدون",between:"بين",near:"قرب",before:"قبل",after:"بعد",during:"أثناء",people:"الناس",small:"صغير",empty:"خالٍ",land:"أرض",two:"اثنان",street:"شارع",walked:"مشى",every:"كلّ",day:"يوم",nobody:"لا أحد",there:"هناك",spring:"الربيع",wooden:"خشبي",box:"صندوق",wall:"جدار",tomatoes:"طماطم",week:"أسبوع",another:"آخر",bag:"حقيبة",change:"تغيير",garden:"حديقة",water:"ماء",books:"كتب",library:"مكتبة",was:"كان",were:"كانوا",is:"يكون",are:"يكونون",he:"هو",she:"هي",they:"هم",we:"نحن",it:"هو أو هي لغير العاقل",you:"أنت",i:"أنا",this:"هذا",that:"ذلك",their:"الخاصّ بهم",his:"الخاصّ به",her:"الخاصّ بها",not:"ليس",more:"أكثر",some:"بعض",first:"الأول",new:"جديد",old:"قديم",help:"مساعدة",home:"منزل",school:"مدرسة",work:"عمل",time:"وقت",much:"كثير",only:"فقط",learn:"يتعلّم",learning:"تعلّم",read:"يقرأ",reading:"قراءة"};
export function readingWordDetails(word:string,article:ReadingArticle,paragraph:number){
 const key=normalize(word),part=article.paragraphs[paragraph]??article.paragraphs[0];
 const selected=article.vocabulary.find(v=>normalize(v.word)===key),entry=VOCABULARY_BANK.find(v=>normalize(v.w)===key);
 const meaning=selected?.ar||entry?.a||common[key];
 const sentences=part.en.match(/[^.!?]+[.!?]+|[^.!?]+$/g)??[part.en];
 const example=(sentences.find(sentence=>sentence.split(/\s+/).some(token=>normalize(token)===key))??part.en).trim();
 return {word:word.replace(/^[^a-z]+|[^a-z']+$/gi,""),meaning:meaning||part.ar,example,definition:selected?.def||entry?.d||"",category:article.category,translationKind:meaning?'word' as const:'context' as const};
}
