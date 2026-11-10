import Link from "next/link";
import { Suspense } from "react";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { footerLinks } from "@/data/content";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer
      data-theme="dark"
      className="relative isolate mt-auto overflow-hidden bg-page text-fg"
    >
      {/* green glow, same family as the hero */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[-25%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(0,166,81,.30),transparent)] blur-3xl" />
        <div className="absolute -bottom-[40%] right-[5%] h-[100%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(0,135,68,.30),transparent)] blur-3xl" />
      </div>

      <div className="container-x grid lg:grid-cols-[1.3fr_1fr]">
        <div className="py-16 lg:border-r lg:border-line lg:py-20 lg:pr-14">
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-fg/80">
            Let&apos;s talk <span className="text-accent">–</span>
          </p>
          <p className="mt-3 font-heading text-[clamp(3.5rem,9vw,8rem)] font-extrabold uppercase leading-[0.88]">
            The
            <br />
            <span className="text-brand-gradient">Publicity</span>
          </p>

          <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="font-heading text-sm font-semibold uppercase text-fg/60">
                Location
              </p>
              <p className="mt-2 font-heading text-xl font-bold uppercase leading-snug md:text-2xl">
                {siteConfig.address}
              </p>
              <p className="mt-3 text-sm text-muted">{siteConfig.domain}</p>
            </div>
            <div>
              <p className="font-heading text-sm font-semibold uppercase text-fg/60">
                Contact us
              </p>
              <a
                href={siteConfig.phoneHref}
                className="mt-2 block font-heading text-xl font-bold uppercase leading-snug transition-colors hover:text-accent md:text-2xl"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.emailHref}
                className="block break-all font-heading text-xl font-bold leading-snug transition-colors hover:text-accent md:text-2xl"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pb-14 lg:py-20 lg:pl-14">
          <h2 className="font-heading text-[clamp(2.5rem,4vw,3.75rem)] font-extrabold uppercase">
            Quick Links
          </h2>
          <ul className="mt-7 flex max-w-[460px] flex-wrap gap-x-7 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-heading text-2xl font-bold uppercase text-fg/50 transition-colors hover:text-accent md:text-[1.7rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 lg:mt-16">
            <Link href="/" aria-label={`${siteConfig.name} - home`} className="inline-block">
              <Logo size="xl" plate />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 text-sm text-fg/60">
          <p>
            © <Suspense fallback="2026"><CurrentYear /></Suspense>{" "}
            <Link href="/" className="text-accent">
              {siteConfig.name}.
            </Link>{" "}
            All Rights Reserved.
          </p>
          <SocialLinks size="sm" />
        </div>
      </div>
    </footer>
  );
}
