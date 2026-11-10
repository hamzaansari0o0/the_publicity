import { PrintArt } from "@/components/art/PrintArt";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { audiences } from "@/data/content";

/** "Who we serve" - the template's team-card layout, repurposed for target clients. */
export function Audience() {
  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionLabel number="05" label="Who we serve" />

        <div className="mt-14 md:flex md:justify-end">
          <SplitText
            text="Built for local businesses that want more customers"
            className="max-w-[760px] text-[clamp(2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02] md:text-right"
          />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <Reveal key={audience.name} delay={index * 120}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line text-white shadow-lg shadow-ink/10">
                <PrintArt
                  kind={audience.art}
                  label={`${audience.name} illustration`}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <p className="max-w-[16ch] text-sm leading-snug text-white/90">
                    {audience.text}
                  </p>
                  <div className="flex shrink-0 items-end gap-2">
                    <span className="[writing-mode:vertical-rl] rotate-180 rounded-md bg-brand-button px-1.5 py-3 font-heading text-xs font-bold uppercase tracking-wide">
                      {audience.tag}
                    </span>
                    <h3 className="[writing-mode:vertical-rl] rotate-180 text-4xl font-extrabold leading-none">
                      {audience.name}
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={audiences.length * 120}>
            <div className="flex h-full min-h-[300px] flex-col justify-between rounded-3xl border border-line bg-page p-7 shadow-lg shadow-ink/5">
              <p className="font-heading text-3xl font-extrabold uppercase leading-[1.02]">
                Running something else?
              </p>
              <div>
                <p className="text-muted">
                  If you want more customers in a specific area, we can help.
                  Tell us about your business.
                </p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <ButtonLink href="/contact" variant="light">
                    Get a quote
                  </ButtonLink>
                  <ButtonLink href="/services" variant="dark">
                    See services
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
