"use client";

import type { CSSProperties } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { cn } from "@/lib/cn";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Heading whose letters rise into place one by one when scrolled into view
 * (the signature effect of the reference template). Screen readers get the
 * plain text; the animated letters are hidden from them.
 */
export function SplitText({ text, as = "h2", className }: SplitTextProps) {
  const ref = useRevealOnScroll<HTMLHeadingElement>("data-split", 0.35);
  const Tag = as;

  // Index of each word's first letter, so the stagger runs across the whole heading.
  const rawWords = text.split(" ");
  const words = rawWords.map((word, index) => ({
    word,
    start: rawWords
      .slice(0, index)
      .reduce((total, previous) => total + previous.length, 0),
  }));

  return (
    <Tag ref={ref} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, start }, wordIndex) => (
          <span key={`${word}-${start}`}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="split-char"
                  style={{ "--i": start + charIndex } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
