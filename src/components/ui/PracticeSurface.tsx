"use client";

import * as React from "react";
import { Button } from "./shadcn/button";
import { Card } from "./shadcn/card";
import { cn } from "@/lib/utils";
import type { PracticeScene } from "@/components/brand/PracticeIllustration";
import { LearningArt } from "@/components/brand/LearningArt";
const sceneIcons: Record<PracticeScene,string> = {quiz:"book",culture:"globe",phrases:"chat",translation:"globe",matching:"compare",writing:"note",listening:"headphones",reading:"book",timed:"clock"};
export const PracticeArtContext = React.createContext<PracticeScene | null>(null);

/** Shared shadcn surfaces for the existing drills. DOM, events and exercise order stay intact. */
export const PracticeCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const scene = React.useContext(PracticeArtContext);
    const originalArt = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === LearningArt) as React.ReactElement<{ name?: string }> | undefined;
    return <Card ref={ref} className={cn("practice-card", className)} {...props}>
      {scene && <div className="camp-practice-card-icon"><LearningArt name={originalArt?.props.name || sceneIcons[scene]} size={30} /></div>}
      {children}
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
