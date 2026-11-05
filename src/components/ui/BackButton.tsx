"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "./shadcn/button";

type BackButtonProps = { href?: string; onClick?: () => void; children?: ReactNode; title?: string; disabled?: boolean; className?: string };

/** One control for section navigation and returning from a local detail view. */
export function BackButton({ href, onClick, children = "Back", title, disabled, className = "" }: BackButtonProps) {
  const content = <><ArrowLeft size={16} aria-hidden="true"/><span>{children}</span></>;
  if (href) return <Button asChild variant="outline" className={`camp-back-button ${className}`}><Link prefetch={false} href={href} title={title}>{content}</Link></Button>;
  return <Button type="button" variant="outline" className={`camp-back-button ${className}`} onClick={onClick} title={title} disabled={disabled} data-local-back>{content}</Button>;
}
