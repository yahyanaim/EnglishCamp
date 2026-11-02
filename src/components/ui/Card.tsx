import { cn } from "@/lib/utils";
import { Card as StyledCard } from "./shadcn/card";

interface Props {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
  delay?: number;
}

export function Card({ children, className, hover }: Props) {
  return <StyledCard className={cn("camp-panel min-w-0 p-5 transition-[transform,box-shadow] duration-150", hover && "cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)]", className)}>{children}</StyledCard>;
}
