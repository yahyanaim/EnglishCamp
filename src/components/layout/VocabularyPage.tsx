import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { PageWrapper } from './PageWrapper';
import { PageBanner } from '@/components/ui/PageBanner';
import { BackButton } from '@/components/ui/BackButton';

/** Reference pages share their heading, return control and content rhythm. */
export function VocabularyPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  let localBack: ReactNode;
  function content(nodes: ReactNode): ReactNode {
    return Children.map(nodes, child => {
      if (!isValidElement<{ children?: ReactNode }>(child)) return child;
      if (!localBack && child.type === BackButton) { localBack = child; return null; }
      return child.props.children && typeof child.props.children !== 'function'
        ? cloneElement(child, undefined, content(child.props.children)) : child;
    });
  }
  const body = content(children);
  return <PageWrapper className="camp-vocab-speaking-page" back={localBack ? <nav className="camp-page-back" aria-label="Return navigation">{localBack}</nav> : undefined}>
    <PageBanner><h1>{title}</h1><p>{description}</p></PageBanner>
    <div className="camp-vocab-speaking-content">{body}</div>
  </PageWrapper>;
}
