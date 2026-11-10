"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll without React state.
 *
 * Elements are rendered visible (so the page works without JS and never
 * flashes). After hydration, anything that is *below* the fold is marked
 * `hidden`, then flipped to `in` once it scrolls into view. The CSS for both
 * states lives in globals.css, keyed by the attribute name passed in.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  attribute: "data-reveal" | "data-split",
  threshold = 0.15,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Already on screen at load: leave it alone (no hide/show flicker).
    const { top, bottom } = element.getBoundingClientRect();
    if (top < window.innerHeight * 0.9 && bottom > 0) return;

    element.setAttribute(attribute, "hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.setAttribute(attribute, "in");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [attribute, threshold]);

  return ref;
}
