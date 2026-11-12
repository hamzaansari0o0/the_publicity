import Link from "next/link";
import { Check, QrCode, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import {
  sharedPackages,
  type PackageIconName,
  type SharedPackage,
} from "@/data/packages";
import { cn } from "@/lib/cn";

const ICONS: Record<PackageIconName, LucideIcon> = {
  qr: QrCode,
  zap: Zap,
  sparkles: Sparkles,
};

/** Gold glow used on badges, featured card and the solid CTA. */
const GLOW = "shadow-[0_0_15px_rgba(201,151,28,0.35)]";

function PackageCard({ pkg }: { pkg: SharedPackage }) {
  const Icon = ICONS[pkg.icon];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border bg-fg/[0.04] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 md:p-8",
        pkg.featured
          ? `border-brand/70 ${GLOW} hover:shadow-[0_0_28px_rgba(201,151,28,0.45)] lg:-my-3 lg:py-11`
          : "border-line hover:border-brand/60 hover:shadow-[0_0_15px_rgba(201,151,28,0.25)]",
      )}
    >
      {pkg.badge ? (
        <span
          className={cn(
            "absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-button px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider text-white",
            GLOW,
          )}
        >
          <Zap className="size-3.5" aria-hidden="true" />
          {pkg.badge}
        </span>
      ) : null}

      <header>
        <span className="grid size-12 place-items-center rounded-xl bg-brand/15 text-accent transition-colors duration-300 group-hover:bg-brand/25">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {pkg.label ? (
          <p className="mt-5 font-heading text-xs font-bold uppercase tracking-wider text-accent">
            {pkg.label}
          </p>
        ) : null}
        <h3 className="mt-2 text-[1.75rem] font-extrabold leading-[1.02]">
          {pkg.name}
        </h3>
        <p className="mt-3 text-muted">{pkg.tagline}</p>
      </header>

      <ul className="mt-7 flex-1 space-y-3.5 border-t border-line pt-7">
        {pkg.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-3 text-fg/90">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white"
            >
              <Check className="size-3" strokeWidth={3.2} />
            </span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Link
        href={pkg.cta.href}
        className={cn(
          "mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center font-heading text-[15px] font-bold uppercase tracking-wide transition duration-300",
          pkg.ctaStyle === "solid"
            ? `bg-brand-button text-white ${GLOW} hover:brightness-110 hover:shadow-[0_0_24px_rgba(201,151,28,0.55)]`
            : "border border-fg/25 bg-fg/[0.06] text-fg backdrop-blur-md hover:border-brand hover:bg-brand/15",
        )}
      >
        {pkg.cta.label}
      </Link>
    </article>
  );
}

/** "Shared Multi-Brand Pamphlet" ad slots - three package cards on a dark charcoal band. */
export function SharedPackagesSection() {
  return (
    <section
      id="shared-packages"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-page py-24 text-fg md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[5%] h-[60%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(201,151,28,.20),transparent)] blur-3xl" />
        <div className="absolute -right-[10%] bottom-[-5%] h-[60%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(155,28,36,.24),transparent)] blur-3xl" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.18em] text-accent",
              GLOW,
            )}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Shared Media Ad Slots
          </span>

          <SplitText
            text="Promote Your Business at 1/4th of the Printing Cost"
            className="mt-6 text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02]"
          />

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Multiple local non-competing brands share one high-quality pamphlet.
            You get dedicated ad space + your own custom trackable QR code.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {sharedPackages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 110} className="h-full pt-3">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
