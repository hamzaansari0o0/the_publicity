import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/icons";

type Variant = "primary" | "light" | "dark";

/**
 * primary - brand red-to-gold gradient (white label)
 * light   - white pill, works on dark sections and on tinted cards
 * dark    - subtle pill that adapts to the section theme
 */
const VARIANTS: Record<Variant, { root: string; dot: string }> = {
  primary: {
    root: "bg-brand-button text-white hover:brightness-110",
    dot: "bg-white text-brand-600",
  },
  light: {
    root: "bg-white text-ink shadow-sm ring-1 ring-ink/10 hover:bg-mint",
    dot: "bg-brand-gradient text-white",
  },
  dark: {
    root: "bg-fg/10 text-fg hover:bg-fg/15",
    dot: "bg-brand-gradient text-white",
  },
};

function buttonClass(variant: Variant, className?: string) {
  return cn(
    "group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 font-heading text-[15px] font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant].root,
    className,
  );
}

function ButtonContent({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  return (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
          VARIANTS[variant].dot,
        )}
      >
        <ArrowRight className="size-4" strokeWidth={2.4} />
      </span>
    </>
  );
}

type ButtonLinkProps = {
  variant?: Variant;
} & ComponentProps<typeof Link>;

/** Pill link with the circular arrow - the template's main call-to-action. */
export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link {...rest} className={buttonClass(variant, className)}>
      <ButtonContent variant={variant}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} type={type} className={buttonClass(variant, className)}>
      <ButtonContent variant={variant}>{children}</ButtonContent>
    </button>
  );
}
