"use client";

import * as React from "react";
import { Button } from "./shadcn/button";
import { Card } from "./shadcn/card";
import { cn } from "@/lib/utils";
import type { PracticeScene } from "@/components/brand/PracticeIllustration";
import { LearningArt } from "@/components/brand/LearningArt";
export const PracticeArtContext = React.createContext<PracticeScene | null>(null);

/** Shared shadcn surfaces for the existing drills. DOM, events and exercise order stay intact. */
export const PracticeCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    // Standalone decorative art used to reserve a blank row above every question.
    // Keep meaningful inline and action icons in their original controls.
    const content = React.Children.toArray(children).filter(child => !(React.isValidElement(child) && child.type === LearningArt));
    return <Card ref={ref} className={cn("practice-card", className)} {...props}>
      {content}
    </Card>;
  },
);
PracticeCard.displayName = "PracticeCard";

export const PracticeButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="unstyled" size="unstyled"
      className={cn("practice-button min-h-11 disabled:opacity-100", className)} {...props} />
  ),
);
PracticeButton.displayName = "PracticeButton";
