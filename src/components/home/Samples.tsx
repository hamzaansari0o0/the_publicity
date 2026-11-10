import { PrintArt } from "@/components/art/PrintArt";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { samples } from "@/data/content";

/**
 * Stacked concept cards. Each card is `position: sticky` with a slightly
 * lower offset, so the next one slides over the previous (no JS needed).
 * These are design concepts - not client work.
 */
export function Samples() {
  return (
    <section id="samples" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionLabel number="03" label="Concept samples 2026" />
        <h2 className="sr-only">Latest concept samples</h2>

        <p
          aria-hidden="true"
          className="mt-12 font-heading text-[clamp(3.25rem,13vw,5rem)] font-extrabold uppercase leading-[0.9] lg:hidden"
        >
          Latest
          <br />
          Concepts
        </p>

        <div className="relative mt-10 lg:mt-16 lg:grid lg:grid-cols-[1fr_minmax(0,860px)_1fr] lg:gap-8">
          <div aria-hidden="true" className="hidden lg:block">
            <p className="sticky top-[42vh] font-heading text-[clamp(2rem,3.6vw,3.4rem)] font-extrabold uppercase leading-none">
              Latest
            </p>
          </div>

          <div className="pb-8">
            {samples.map((sample, index) => (
              <article
                key={sample.title}
                className="sticky mb-10 last:mb-0"
                style={{ top: `calc(6.5rem + ${index * 1.5}rem)` }}
              >
                <div className="grid overflow-hidden rounded-[28px] border border-line bg-surface shadow-xl shadow-ink/10 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
                    <PrintArt
                      kind={sample.art}
                      label={`${sample.title} concept artwork`}
                    />
                  </div>
                  <div className="flex flex-col p-6 md:p-9">
                    <h3 className="text-[clamp(1.9rem,3vw,2.4rem)] font-extrabold leading-[0.98]">
                      {sample.title}
                    </h3>
                    <p className="mt-4 text-muted">{sample.text}</p>

                    <dl className="mt-auto space-y-2 pt-8 text-sm">
                      <div className="flex gap-3">
                        <dt className="text-fg/50">Type:</dt>
                        <dd className="font-heading font-bold uppercase">
                          Concept
                        </dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="text-fg/50">Format:</dt>
                        <dd className="font-heading font-bold uppercase">
                          {sample.format}
                        </dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="text-fg/50">Industry:</dt>
                        <dd className="font-heading font-bold uppercase">
                          {sample.industry}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <ButtonLink href={sample.href} variant="dark">
                        View service
                      </ButtonLink>
                      <span
                        aria-hidden="true"
                        className="font-heading text-3xl font-extrabold"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div aria-hidden="true" className="hidden text-right lg:block">
            <p className="sticky top-[42vh] font-heading text-[clamp(2rem,3.6vw,3.4rem)] font-extrabold uppercase leading-none">
              Concepts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
