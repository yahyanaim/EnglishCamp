import type { EssentialTopic,EssentialWord } from './essential-vocabulary';
const source={title:'Cambridge Grammar: countries, nationalities and languages',href:'https://dictionary.cambridge.org/us/grammar/british-grammar/countries-nationalities-and-languages'};
// Country names and nationality adjectives are different word families; examples are original.
export const COUNTRY_FAMILIES=[
 ['Morocco','المغرب','Moroccan','مغربي / مغربية','MA'],['Algeria','الجزائر','Algerian','جزائري / جزائرية','DZ'],['Tunisia','تونس','Tunisian','تونسي / تونسية','TN'],['Egypt','مصر','Egyptian','مصري / مصرية','EG'],
 ['Saudi Arabia','السعودية','Saudi','سعودي / سعودية','SA'],['the United Arab Emirates','الإمارات العربية المتحدة','Emirati','إماراتي / إماراتية','AE'],['the United Kingdom','المملكة المتحدة','British','بريطاني / بريطانية','GB'],['the United States','الولايات المتحدة','American','أمريكي / أمريكية','US'],
 ['France','فرنسا','French','فرنسي / فرنسية','FR'],['Spain','إسبانيا','Spanish','إسباني / إسبانية','ES'],['Germany','ألمانيا','German','ألماني / ألمانية','DE'],['Italy','إيطاليا','Italian','إيطالي / إيطالية','IT'],
 ['Canada','كندا','Canadian','كندي / كندية','CA'],['Japan','اليابان','Japanese','ياباني / يابانية','JP'],['China','الصين','Chinese','صيني / صينية','CN'],['India','الهند','Indian','هندي / هندية','IN'],
 ['Brazil','البرازيل','Brazilian','برازيلي / برازيلية','BR'],['Turkey','تركيا','Turkish','تركي / تركية','TR'],['Australia','أستراليا','Australian','أسترالي / أسترالية','AU'],['Portugal','البرتغال','Portuguese','برتغالي / برتغالية','PT']
] as const;
const w=(en:string,ar:string,example:string,value:string):EssentialWord=>({en,ar,example,art:'geography',value});
export const GEOGRAPHY_TOPICS:EssentialTopic[]=[
 {id:'countries',title:'Countries',intro:'Use from + country to describe origin. Country names begin with a capital letter. A few names include the, such as the United Kingdom and the United States.',source,words:COUNTRY_FAMILIES.map(([country,arabic,,,code])=>w(country,arabic,`My friend is from ${country}.`,code))},
 {id:'nationalities',title:'Nationalities',intro:'A nationality adjective describes a person or something connected with a country: from Morocco, Moroccan. It begins with a capital letter. It does not identify every language a person speaks.',source,words:COUNTRY_FAMILIES.map(([, ,nationality,arabic,code])=>w(nationality,arabic,`My classmate is ${nationality}.`,code))},
 {id:'languages',title:'Languages',intro:'Use speak + language without the: I speak Arabic. Language names begin with capital letters. A country can have several languages, and a language can be spoken in many countries.',source,words:[
  w('Arabic','العربية','I speak Arabic with my family.','AR'),w('English','الإنجليزية','We practise English after class.','EN'),w('French','الفرنسية','My friend is learning French.','FR'),w('Spanish','الإسبانية','Do you speak Spanish?','ES'),w('German','الألمانية','She reads a short message in German.','DE'),w('Italian','الإيطالية','He is studying Italian this year.','IT'),
  w('Portuguese','البرتغالية','Our new classmate speaks Portuguese.','PT'),w('Turkish','التركية','I know a few phrases in Turkish.','TR'),w('Japanese','اليابانية','She writes her name in Japanese.','JA'),w('Mandarin Chinese','الصينية المندرينية','He is learning Mandarin Chinese.','ZH'),w('Hindi','الهندية','My colleague can speak Hindi.','HI'),w('Amazigh','الأمازيغية','Some of my relatives speak Amazigh.','AMZ')
 ]}
];
export const SEASONAL_WORDS:EssentialWord[]=[
 {en:'season',ar:'فصل من فصول السنة',example:'Which season do you like best?',art:'season-spring'},
 {en:'rainy season',ar:'موسم الأمطار',example:'We carry an umbrella during the rainy season.',art:'season-rain'},
 {en:'dry season',ar:'موسم الجفاف',example:'There is little rain during the dry season.',art:'season-dry'},
 {en:'blossom',ar:'أزهار الأشجار',example:'The tree is covered in blossom.',art:'season-spring'},
 {en:'summer holiday',ar:'عطلة صيفية',example:'We visit our family during the summer holiday.',art:'season-summer'},
 {en:'fallen leaves',ar:'أوراق متساقطة',example:'There are fallen leaves on the path.',art:'season-autumn'},
 {en:'frost',ar:'صقيع',example:'There is frost on the grass this morning.',art:'season-winter'},
 {en:'temperature',ar:'درجة الحرارة',example:'The temperature is lower at night.',art:'season-temperature'}
];
