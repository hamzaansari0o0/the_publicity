import type { CSSProperties } from "react";
import { PixelTrail } from "@/components/art/PixelTrail";
import { PrintArt } from "@/components/art/PrintArt";
import type { ArtKind } from "@/components/art/types";
import { ButtonLink } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/cn";

const tiles: { kind: ArtKind; className: string; tilt: string }[] = [
  {
    kind: "flyer",
    className: "h-36 w-28 sm:h-52 sm:w-40 md:h-64 md:w-48 -translate-y-3",
    tilt: "-14deg",
  },
  {
    kind: "social",
    className: "h-48 w-36 sm:h-64 sm:w-52 md:h-80 md:w-64",
    tilt: "0deg",
  },
  {
    kind: "standee",
    className: "h-36 w-28 sm:h-52 sm:w-40 md:h-64 md:w-48 translate-y-3",
    tilt: "13deg",
  },
];

/** "Let's work together" call-to-action on a dark charcoal band. */
export function CtaBand() {
  return (
    <section
      data-theme="dark"
      className="grain relative isolate overflow-hidden bg-page py-24 text-fg md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[10%] h-[90%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(0,166,81,.28),transparent)] blur-3xl" />
        <div className="absolute -right-[10%] top-[-10%] h-[90%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(0,135,68,.30),transparent)] blur-3xl" />
        <PixelTrail className="absolute bottom-8 left-4 hidden w-52 opacity-60 lg:block" />
        <PixelTrail flip className="absolute right-4 top-10 hidden w-52 opacity-60 lg:block" />
      </div>

      <div className="container-x text-center">
        <div
          aria-hidden="true"
          className="flex items-end justify-center gap-3 sm:gap-6 md:gap-10"
        >
          {tiles.map((tile) => (
            <div
              key={tile.kind}
              className={cn(
                "overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50 md:rounded-3xl",
                tile.className,
              )}
              style={{ rotate: tile.tilt } as CSSProperties}
            >
              <PrintArt kind={tile.kind} />
            </div>
          ))}
        </div>

        <SplitText
          as="h2"
          text="Let's work together"
          className="mt-14 text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95]"
        />
        <p className="mx-auto mt-6 max-w-xl text-lg text-fg/75">
          Tell us about your business and the area you want to reach. We&apos;ll
          show you how print and digital can work together.
        </p>
        <div className="mt-9">
          <ButtonLink href="/contact" variant="light">
            Contact us now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
