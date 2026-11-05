import { Children, cloneElement, Fragment, isValidElement, type ReactNode } from "react";
import { SectionBack } from "./SectionBack";
import { PageBanner } from "@/components/ui/PageBanner";
import { PracticeBanner } from "@/components/ui/PracticeBanner";

/** Put return navigation after the page heading, including headings inside layout wrappers. */
export function PageWrapper({ children, className = "", back }: { children: ReactNode; className?: string; back?: ReactNode | false }) {
  let placed = false;
  const returnControl = back === undefined ? <SectionBack /> : back;
  function withReturn(nodes: ReactNode): ReactNode {
    return Children.map(nodes, child => {
      if (placed || !isValidElement<{ children?: ReactNode }>(child)) return child;
      if (child.type === PageBanner || child.type === PracticeBanner) {
        placed = true;
        return <Fragment>{child}{returnControl}</Fragment>;
      }
      return child.props.children && typeof child.props.children !== "function" ? cloneElement(child, undefined, withReturn(child.props.children)) : child;
    });
  }
  const content = withReturn(children);
  return <div className={`learning-page camp-page-stack ${className}`}>{!placed && returnControl}{content}</div>;
}
