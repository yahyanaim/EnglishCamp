"use client";
import type { HTMLAttributes } from "react";
import { PageBanner } from "./PageBanner";

export function PracticeBanner({children,className="",...props}:HTMLAttributes<HTMLDivElement>) {
  return <PageBanner className={`camp-practice-banner ${className}`} {...props}><div className="camp-practice-banner-copy">{children}</div></PageBanner>;
}
