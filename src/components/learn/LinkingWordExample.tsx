import type { Konnektor } from '@/data/konnektoren';
import { linkingWordExplanation } from '@/data/linking-word-explanations';
import { ArabicText } from '@/components/ui/ArabicText';

export function LinkingWordExample({ word }: { word: Konnektor }) {
 const explanation = linkingWordExplanation(word);
 return <section className="camp-grammar-panel camp-linking-example" aria-label="Example">
  <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Example</h3>
  <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{word.exampleEn}</p>
  {word.exampleAr && <ArabicText text={word.exampleAr} className="text-sm text-[var(--color-text-secondary)] mt-3" />}
  {explanation && <div className="camp-linking-word-explanation">
   <h4 lang="ar" dir="rtl">معنى أداة الربط واستخدامها</h4>
   <ArabicText text={explanation} className="text-sm text-[var(--color-text-secondary)]" />
  </div>}
 </section>;
}
