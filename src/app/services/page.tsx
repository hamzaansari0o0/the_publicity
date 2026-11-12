import type { Metadata } from "next";
import Link from "next/link";
import { PrintArt } from "@/components/art/PrintArt";
import { CtaBand } from "@/components/home/CtaBand";
import { PageBanner } from "@/components/layout/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Print & Social Media Marketing Services",
  description:
    "Newsletters, flyers, flex and standees, and social media marketing for local businesses - with a trackable QR code on every printed item.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <p>
          Four ways to put your brand in front of local customers - each one
          with a trackable QR code, so you can see what works.
        </p>
      </PageBanner>

      <section className="pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="container-x space-y-6">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article className="group grid overflow-hidden rounded-[28px] border border-fg/10 bg-surface md:grid-cols-2">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[380px]",
                    index % 2 === 1 && "md:order-2",
                  )}
                >
                  <PrintArt
                    kind={service.art}
                    label={`${service.title} illustration`}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-7 md:p-12">
                  <p className="font-heading text-sm font-bold uppercase tracking-wide text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold leading-[0.95]">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-5 text-lg text-fg/80">{service.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-fg/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-fg/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <ButtonLink
                      href={`/services/${service.slug}`}
                      variant="dark"
                    >
                      Learn more
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
