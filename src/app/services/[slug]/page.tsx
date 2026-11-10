import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintArt } from "@/components/art/PrintArt";
import { CtaBand } from "@/components/home/CtaBand";
import { PageBanner } from "@/components/layout/PageBanner";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getAdjacentServices, getService, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { prev, next } = getAdjacentServices(service.slug);

  return (
    <>
      <PageBanner
        title={service.title}
        size="lg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <p>{service.lead}</p>
      </PageBanner>

      {/* two feature visuals */}
      <section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {[service.art, service.art2].map((kind, index) => (
            <Reveal key={`${kind}-${index}`} delay={index * 120}>
              <div className="aspect-[4/3] overflow-hidden rounded-[28px] border border-fg/10">
                <PrintArt
                  kind={kind}
                  label={`${service.title} illustration ${index + 1}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* overview */}
      <section className="py-12 md:py-20">
        <div className="container-x">
          <SectionLabel number="01" label="Services overview" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1]">
                Services overview
              </h2>
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
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-fg/80">
              {service.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* benefits */}
      <section className="py-12 md:py-20">
        <div className="container-x">
          <SectionLabel number="02" label="Benefits you'll get" />
          <h2 className="mt-12 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1]">
            Benefits you&apos;ll get
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 90} className="h-full">
                <article className="h-full rounded-3xl border border-fg/10 bg-surface p-7">
                  <p className="font-heading text-4xl font-extrabold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-2xl font-extrabold leading-[1.02]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-muted">{benefit.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="py-12 md:py-20">
        <div className="container-x">
          <SectionLabel number="03" label="How it works" />
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="mb-5 grid size-12 place-items-center rounded-full bg-brand-gradient font-heading text-lg font-extrabold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="text-2xl font-extrabold leading-none">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QR callout */}
      <section className="py-12 md:py-20">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[28px] border border-brand/40 bg-brand/[0.07] md:grid-cols-[320px_1fr]">
            <div className="aspect-[4/3] md:aspect-auto md:min-h-[300px]">
              <PrintArt kind="qr" label="QR code scanning illustration" />
            </div>
            <div className="flex flex-col items-start justify-center gap-5 p-7 md:p-12">
              <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1]">
                Every order comes with a trackable QR code
              </h2>
              <p className="max-w-xl text-muted">
                Scans take people straight to your WhatsApp, website or social
                pages - and we count them, so you can see exactly how your print
                performs.
              </p>
              <ButtonLink href="/contact">Get a quote</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* prev / next */}
      <section className="pb-24 md:pb-32">
        <nav
          aria-label="More services"
          className="container-x grid gap-5 sm:grid-cols-2"
        >
          {[
            { label: "Previous service", service: prev, align: "items-start" },
            { label: "Next service", service: next, align: "items-end text-right" },
          ].map(({ label, service: target, align }) => (
            <Link
              key={label}
              href={`/services/${target.slug}`}
              className={`group flex flex-col gap-2 rounded-3xl border border-fg/10 bg-surface p-7 transition-colors hover:border-brand/60 ${align}`}
            >
              <span className="text-sm text-fg/50">{label}</span>
              <span className="flex items-center gap-3 font-heading text-2xl font-extrabold uppercase leading-none">
                {target.title}
                <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <CtaBand />
    </>
  );
}
