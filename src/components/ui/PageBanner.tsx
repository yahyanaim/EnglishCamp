import * as React from "react";
import { Card } from "./shadcn/card";
import { cn } from "@/lib/utils";

export function PageBanner({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Card className={cn("camp-page-banner", className)} {...props}>
    <div className="camp-banner-copy">{children}</div>
    <svg className="camp-banner-art" viewBox="0 0 280 160" fill="none" aria-hidden="true">
      <circle cx="260" cy="80" r="115" fill="currentColor" opacity=".06" />
      <circle cx="190" cy="80" r="85" fill="currentColor" opacity=".05" />
      <path d="M170 25c0 28-8 36-36 36 28 0 36 8 36 36 0-28 8-36 36-36-28 0-36-8-36-36Z" fill="currentColor" opacity=".2" />
      <path d="M235 88c0 18-6 24-24 24 18 0 24 6 24 24 0-18 6-24 24-24-18 0-24-6-24-24Z" fill="currentColor" opacity=".15" />
      <path d="M109 9c0 14-4 18-18 18 14 0 18 4 18 18 0-14 4-18 18-18-14 0-18-4-18-18Z" fill="currentColor" opacity=".12" />
    </svg>
  </Card>;
}
