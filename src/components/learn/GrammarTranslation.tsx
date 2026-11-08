"use client";
import { Children, cloneElement, isValidElement, useState, type ReactNode, type ReactElement } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ArabicText } from '@/components/ui/ArabicText';
import { GRAMMAR_PARAGRAPH_TRANSLATIONS, grammarTranslationKey } from '@/data/grammar-paragraph-translations';

/** The English paragraph keeps its layout; its translation opens outside clipped accordions. */
export function GrammarTranslation({ children, translation }: { children: ReactNode; translation: string }) {
 const [open,setOpen]=useState(false);
 return <Tooltip.Provider delayDuration={180}><Tooltip.Root open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger asChild><span className="camp-grammar-translation-trigger" tabIndex={0} onClick={event=>{event.preventDefault();setOpen(true);}} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpen(value=>!value);}}}>{children}</span></Tooltip.Trigger>
  <Tooltip.Portal><Tooltip.Content side="bottom" align="start" sideOffset={8} collisionPadding={16} className="camp-grammar-translation-tooltip"><ArabicText text={translation}/><Tooltip.Arrow className="camp-grammar-translation-arrow"/></Tooltip.Content></Tooltip.Portal>
 </Tooltip.Root></Tooltip.Provider>;
}

export function grammarParagraphText(node: ReactNode): string {
 if(typeof node==='string'||typeof node==='number')return String(node);
 if(!isValidElement(node))return Children.toArray(node).map(grammarParagraphText).join('');
 const element=node as ReactElement<{en?:string;children?:ReactNode}>;
 if(element.props.en!==undefined)return element.props.en;
 if(element.type==='br')return ' ';
 return Children.toArray(element.props.children).map(grammarParagraphText).join('');
}

export function translatedGrammarParagraphs(node: ReactNode): ReactNode {
 return Children.map(node,child=>{
  if(!isValidElement(child))return child;
  const element=child as ReactElement<{children?:ReactNode;className?:string}>;
  const translation=GRAMMAR_PARAGRAPH_TRANSLATIONS[grammarTranslationKey(grammarParagraphText(element))];
  if(translation&&(element.type==='p'||element.props.className?.includes('camp-grammar-note')))
   return cloneElement(element,undefined,<GrammarTranslation translation={translation}>{element.props.children}</GrammarTranslation>);
  return element.props.children?cloneElement(element,undefined,translatedGrammarParagraphs(element.props.children)):element;
 });
}
