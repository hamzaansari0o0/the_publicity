import Link from "next/link";
import { PrintArt } from "@/components/art/PrintArt";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

/** Staggered left offsets (desktop) to echo the template's scattered list. */
const indents = ["md:pl-[16%]", "md:pl-[30%]", "md:pl-[8%]", "md:pl-[26%]"];

export function ServicesList() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionLabel number="04" label="Services" />

        <div className="mt-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <SplitText
            text="Print & digital solutions crafted to grow local brands"
            className="max-w-[820px] text-[clamp(2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02]"
          />
          <ButtonLink href="/services" className="shrink-0">
            View all services
          </ButtonLink>
        </div>

        <ul className="mt-14 divide-y divide-fg/10 border-y border-fg/10 md:mt-20">
          {services.map((service, index) => {
            const small = (
              <span className="whitespace-pre-line font-heading text-xs font-semibold uppercase leading-snug text-fg/45 transition-colors group-hover:text-accent sm:text-sm">
                {service.display.small}
              </span>
            );
            const big = (
              <span className="font-heading text-[clamp(2.75rem,8vw,7.25rem)] font-extrabold uppercase leading-[0.95] text-fg/25 transition-colors duration-300 group-hover:text-fg">
                {service.display.big}
              </span>
            );

            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={service.title}
                  className={cn(
                    "group flex flex-wrap items-center gap-x-5 gap-y-3 py-7 md:py-9",
                    indents[index % indents.length],
                  )}
                >
                  {service.display.smallFirst ? small : null}
                  {big}
                  {service.display.smallFirst ? null : small}
                  <span
                    aria-hidden="true"
                    className="h-[68px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-fg/10 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 md:h-[86px] md:w-[150px]"
                  >
                    <PrintArt kind={service.art} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
