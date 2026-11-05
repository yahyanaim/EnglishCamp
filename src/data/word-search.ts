export type WordSearchSet={words:string[];translations:Record<string,string>;rewardIds:Record<string,string>};
/** English targets retain the original concept IDs so existing rewards are not reset. */
const set=(rows:[string,string,string][]):WordSearchSet=>({words:rows.map(r=>r[0]),translations:Object.fromEntries(rows.map(r=>[r[0],r[1]])),rewardIds:Object.fromEntries(rows.map(r=>[r[0],r[2]]))});
export const WORD_SEARCH_SETS:WordSearchSet[]=[
 set([['HOUSE','منزل','HAUS'],['BOOK','كتاب','BUCH'],['TABLE','طاولة','TISCH'],['SCHOOL','مدرسة','SCHULE'],['GARDEN','حديقة','GARTEN']]),
 set([['WATER','ماء','WASSER'],['FLOWER','زهرة','BLUME'],['WINDOW','نافذة','FENSTER'],['DOOR','باب','TUR'],['CHAIR','كرسي','STUHL']]),
 set([['APPLE','تفاحة','APFEL'],['BREAD','خبز','BROT'],['MILK','حليب','MILCH'],['CAT','قطة','KATZE'],['DOG','كلب','HUND']]),
 set([['SUN','شمس','SONNE'],['MOON','قمر','MOND'],['STARS','نجوم','STERNE'],['CLOUD','سحابة','WOLKE'],['RAIN','مطر','REGEN']]),
 set([['TREE','شجرة','BAUM'],['LEAF','ورقة شجر','BLATT'],['ROOT','جذر','WURZEL'],['BRANCH','غصن','AST'],['TRUNK','جذع','STAMM']]),
 set([['JOY','فرح','FREUDE'],['HAPPINESS','سعادة','GLUCK'],['LOVE','حب','LIEBE'],['SORROW','حزن','TRAUER'],['FEAR','خوف','ANGST']]),
];
