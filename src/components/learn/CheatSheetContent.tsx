import type { CheatSection } from "@/data/grammar-cheat-sheet";
import { GRAMMAR_ARABIC } from "@/data/grammar-cheat-sheet-ar";

export const cheatDisplayText = (text: string) => text.replace(/\s*—\s*/g, ": ");

export function CheatSheetContent({ section, showArabic }: { section: CheatSection; showArabic: boolean }) {
  const arabic = GRAMMAR_ARABIC[section.id];
  return <div className="camp-cheat-body">
    {section.content.map((item, i) => {
      const translation = arabic.content[i];
      return <article key={item.title} className="camp-cheat-item">
        <h3>{cheatDisplayText(item.title)}</h3>
        {showArabic && <h4 className="camp-cheat-ar-title font-arabic" lang="ar" dir="rtl">{cheatDisplayText(translation.title)}</h4>}
        <p>{cheatDisplayText(item.formation)}</p>
        {showArabic && <p className="camp-cheat-ar font-arabic" lang="ar" dir="rtl">{cheatDisplayText(translation.formation)}</p>}
        <ul className="camp-cheat-examples">{item.examples.map((example, j) => <li key={j}>
          {cheatDisplayText(example.en)}
          {showArabic && <small className="font-arabic" lang="ar" dir="rtl">{cheatDisplayText(translation.examples[j])}</small>}
        </li>)}</ul>
        {item.notes && <ul className="camp-cheat-notes">{item.notes.map((note, j) => <li key={note}>
          {cheatDisplayText(note)}
          {showArabic && <p className="camp-cheat-ar font-arabic" lang="ar" dir="rtl">{cheatDisplayText(translation.notes![j])}</p>}
        </li>)}</ul>}
      </article>;
    })}
  </div>;
}
