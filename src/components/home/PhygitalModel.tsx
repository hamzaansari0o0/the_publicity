import type { ReactNode } from "react";
import { QrDemo } from "@/components/home/QrDemo";
import { ChartIcon, MapPin, QrIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { pillars } from "@/data/content";

const icons: Record<(typeof pillars)[number]["icon"], ReactNode> = {
  pin: <MapPin className="size-6" />,
  qr: <QrIcon className="size-6" />,
  chart: <ChartIcon className="size-6" />,
};

/** Explains the 'Phygital' model - the template's reviews grid, repurposed. */
export function PhygitalModel({ number = "07" }: { number?: string }) {
  return (
    <section
      id="phygital"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-page py-24 text-fg md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-[10%] top-0 -z-10 h-[70%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(201,151,28,.20),transparent)] blur-3xl"
      />
      <div className="container-x">
        <SectionLabel number={number} label="The Phygital model" />

        <SplitText
          text="Physical + digital = results you can see"
          className="mt-14 max-w-[900px] text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02]"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[190px_1fr]">
          {/* gradient rating-style card */}
          <Reveal className="h-full">
            <div className="grain relative flex h-full min-h-[150px] items-center justify-center overflow-hidden rounded-3xl bg-brand-gradient p-6">
              <p className="text-center font-heading text-[2rem] font-extrabold uppercase text-white leading-[0.95] lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[2.6rem]">
                Physical + Digital = Phygital
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 100}>
                <article className="h-full rounded-3xl border border-fg/10 bg-surface p-6 md:p-7">
                  <header className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-accent">
                      {icons[pillar.icon]}
                    </span>
                    <div>
                      <h3 className="text-2xl font-extrabold leading-none">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-fg/50">
                        Step {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </header>
                  <p className="mt-6 rounded-2xl bg-fg/[0.04] p-5 leading-relaxed text-fg/80">
                    {pillar.text}
                  </p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={pillars.length * 100}>
              <QrDemo />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
