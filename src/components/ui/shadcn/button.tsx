// Adapted from shadcn/ui (MIT); see README.md and LICENSE.md in this directory.
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm font-body font-medium transition-[background-color,border-color,box-shadow,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--camp-purple)] text-white hover:bg-[var(--camp-purple-hover)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-1)] hover:brightness-105",
        outline:
          "border border-input bg-background text-[var(--camp-control-ink)] hover:bg-[var(--camp-purple-soft)]",
        secondary: "bg-[var(--camp-purple-soft)] text-[var(--camp-control-ink)] hover:bg-[var(--camp-purple-soft)]",
        ghost: "text-[var(--color-text-secondary)] hover:bg-[var(--camp-purple-soft)] hover:text-[var(--camp-control-ink)]",
        link: "text-[var(--camp-control-ink)] underline-offset-4 hover:underline",
        unstyled: "",
      },
      size: {
        default: "min-h-10 px-4 py-2",
        sm: "min-h-9 px-3 py-1.5 text-xs",
        lg: "min-h-11 px-6 py-2.5",
        icon: "h-10 w-10",
        unstyled: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-variant={variant ?? "default"}
        data-size={size ?? "default"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
