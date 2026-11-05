import type { HTMLAttributes } from "react";

/** RTL reading order, with Latin grammar terms isolated from surrounding Arabic. */
export function ArabicText({ text, className = "", ...props }: { text: string } & HTMLAttributes<HTMLParagraphElement>) {
  const parts = text.split(/([A-Za-z][A-Za-z0-9/'’+.…-]*(?:[ \t]+[A-Za-z0-9/'’+.…-]+)*)/g);
  return <p {...props} lang="ar" dir="rtl" className={`camp-arabic-support ${className}`}>{parts.map((part, index) => /^[A-Za-z]/.test(part) ? <bdi dir="ltr" key={index}>{part}</bdi> : part)}</p>;
}
