"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
};

/** Fades + lifts its children in when they scroll into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRevealOnScroll<HTMLDivElement>("data-reveal");
  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
