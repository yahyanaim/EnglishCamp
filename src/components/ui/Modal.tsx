"use client";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "./shadcn/dialog";
import { Button } from "./shadcn/button";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <DialogTitle
            className={
              title
                ? "font-display text-xl font-bold text-[var(--color-text-primary)]"
                : "sr-only"
            }
          >
            {title || "Dialog"}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-9 w-9 shrink-0 text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-text-primary)]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}
