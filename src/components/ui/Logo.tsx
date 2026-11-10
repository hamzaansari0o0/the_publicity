import Image from "next/image";
import { cn } from "@/lib/cn";

/** The square brand emblem (arrow + bars + pixel trail). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt=""
      width={512}
      height={512}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

type LogoProps = {
  size?: "md" | "lg" | "xl";
  /**
   * Put the logo on a white rounded plate. Required on dark backgrounds,
   * because the logo's lettering is charcoal.
   */
  plate?: boolean;
  priority?: boolean;
  className?: string;
};

const HEIGHTS = {
  md: "h-11 sm:h-12",
  lg: "h-14",
  xl: "h-16 sm:h-20",
} as const;

/** The agency's real logo (horizontal lockup, transparent background). */
export function Logo({ size = "md", plate = false, priority, className }: LogoProps) {
  const image = (
    <Image
      src="/images/logo.png"
      alt="The Publicity - Marketing Agency"
      width={1494}
      height={325}
      priority={priority}
      sizes="(min-width: 640px) 240px, 200px"
      className={cn("w-auto max-w-full", HEIGHTS[size])}
    />
  );

  if (!plate) return <span className={cn("inline-flex", className)}>{image}</span>;

  return (
    <span
      className={cn(
        "inline-flex rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25",
        className,
      )}
    >
      {image}
    </span>
  );
}
