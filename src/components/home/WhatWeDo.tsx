import type { CSSProperties } from "react";
import { PrintArt } from "@/components/art/PrintArt";
import type { ArtKind } from "@/components/art/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { stats } from "@/data/content";
import { cn } from "@/lib/cn";

const floaters: {
  kind: ArtKind;
  className: string;
  tilt: string;
  duration: string;
}[] = [
  {
    kind: "flyer",
    className: "left-0 top-2 h-[150px] w-[190px]",
    tilt: "-3deg",
    duration: "8s",
  },
  {
    kind: "social",
    className: "right-0 top-0 h-[176px] w-[150px]",
    tilt: "3deg",
    duration: "10s",
  },
  {
    kind: "standee",
    className: "bottom-2 left-0 h-[176px] w-[150px]",
    tilt: "2deg",
    duration: "9s",
  },
  {
    kind: "newsletter",
    className: "bottom-0 right-6 h-[150px] w-[200px]",
    tilt: "-2deg",
    duration: "11s",
  },
];

export function WhatWeDo() {
  return (
    <section
      data-theme="dark"
      className="relative isolate overflow-hidden bg-page py-24 text-fg md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[12%] top-[20%] h-[70%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(0,166,81,.20),transparent)] blur-3xl" />
        <div className="absolute -right-[12%] bottom-[-10%] h-[70%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(0,135,68,.22),transparent)] blur-3xl" />
      </div>
      <div className="container-x">
        <SectionLabel number="02" label="Who we are" />

        <SplitText
          text="A hybrid marketing agency crafting print & digital campaigns you can actually measure"
          className="mx-auto mt-14 max-w-[1020px] text-center text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02]"
        />

        <Reveal className="relative mx-auto mt-16 max-w-[1120px]">
          {/* floating tiles (desktop) */}
          {floaters.map((item) => (
            <div
              key={item.kind}
              aria-hidden="true"
              className={cn(
                "animate-float absolute hidden overflow-hidden rounded-2xl border border-fg/10 lg:block",
                item.className,
              )}
              style={
                {
                  "--tilt": item.tilt,
                  animationDuration: item.duration,
                } as CSSProperties
              }
            >
              <PrintArt kind={item.kind} />
            </div>
          ))}

          <dl className="mx-auto grid max-w-[720px] grid-cols-2">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "px-4 py-9 sm:px-8 md:px-10 md:py-12",
                  index % 2 === 0 && "border-r border-fg/10",
                  index < 2 && "border-b border-fg/10",
                )}
              >
                <dt className="text-sm text-fg/70 md:text-base">
                  {stat.label}
                </dt>
                <dd className="mt-3 font-heading text-[clamp(3.5rem,8vw,6.25rem)] font-extrabold leading-none">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="ml-1 text-[0.5em] font-light text-fg/80">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {/* floating tiles (mobile / tablet) */}
          <div aria-hidden="true" className="mt-10 grid grid-cols-4 gap-3 lg:hidden">
            {floaters.map((item) => (
              <div
                key={item.kind}
                className="aspect-[3/4] overflow-hidden rounded-xl border border-fg/10"
              >
                <PrintArt kind={item.kind} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
