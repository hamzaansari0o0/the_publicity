import Image from "next/image";
import { PixelTrail } from "@/components/art/PixelTrail";
import { ButtonLink } from "@/components/ui/Button";
import { Check, Mail, Phone, QrIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig, whatsappLink } from "@/data/site";

const highlights = [
  "Print Media & Distribution",
  "Custom QR-Based Tracking",
  "Social Media Management",
];

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-page">
      <div className="animate-drift absolute -right-[12%] -top-[22%] h-[85%] w-[62%] rounded-full bg-[radial-gradient(closest-side,rgba(201,151,28,.30),rgba(155,28,36,.10)_62%,transparent)] blur-3xl" />
      <div
        className="animate-drift absolute -bottom-[30%] -left-[14%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(155,28,36,.16),transparent)] blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
      {/* faint dot grid, fading out downwards */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(38,38,38,.10)_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
    </div>
  );
}

export function Hero() {
  const whatsapp = whatsappLink("Hi The Publicity! I'd like to know more about your services.");

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div className="container-x flex min-h-[100svh] flex-col pb-10 pt-28 md:pt-32">
        <div className="grid flex-1 items-center gap-14 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* copy */}
          <div>
            <p className="animate-rise inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-ink shadow-sm">
              <span aria-hidden="true" className="size-2 rounded-full bg-brand-gradient" />
              Lahore&apos;s Phygital marketing agency
            </p>

            <h1
              className="animate-rise mt-6 text-[clamp(3rem,6.4vw,6.4rem)] font-extrabold leading-[0.9] tracking-tight"
              style={{ animationDelay: "100ms" }}
            >
              <span className="block">
                Your <span className="text-brand-gradient">Phygital</span>
              </span>
              <span className="block">Marketing</span>
              <span className="block">Partner</span>
            </h1>

            <p
              className="animate-rise mt-7 max-w-xl text-xl font-semibold leading-snug md:text-2xl"
              style={{ animationDelay: "200ms" }}
            >
              Bridging <span className="text-accent">Physical Print</span> &amp;
              Digital Social Media
            </p>

            <ul
              className="animate-rise mt-7 space-y-3"
              style={{ animationDelay: "280ms" }}
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-lg font-semibold md:text-xl"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-white"
                  >
                    <Check className="size-4" strokeWidth={2.8} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "360ms" }}
            >
              <ButtonLink href="/contact">Start a campaign</ButtonLink>
              {whatsapp ? (
                <ButtonLink
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark"
                >
                  WhatsApp us
                </ButtonLink>
              ) : null}
            </div>

            <div
              className="animate-rise mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold"
              style={{ animationDelay: "440ms" }}
            >
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <Phone className="size-[18px] text-accent" />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.emailHref}
                className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-accent"
              >
                <Mail className="size-[18px] text-accent" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* visual: portrait + flyers + phone from the agency's cover artwork */}
          <div
            className="animate-rise relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0"
            style={{ animationDelay: "200ms" }}
          >
            <PixelTrail className="absolute -left-12 bottom-24 hidden w-44 sm:block" />

            <div className="relative aspect-[1142/1290] overflow-hidden rounded-[2rem] border border-line bg-white shadow-2xl shadow-ink/20">
              <Image
                src="/images/hero-visual.jpg"
                alt="Your Phygital marketing partner: printed flyers and a phone scanning a QR code"
                fill
                priority
                sizes="(min-width: 1024px) 540px, 92vw"
                className="object-cover"
              />
            </div>

            {/* Hidden on phones; tablet and up: hangs off the left edge of the photo. */}
            <div className="animate-float absolute -left-10 top-[22%] hidden w-[168px] rounded-2xl bg-white p-4 text-center shadow-xl shadow-ink/15 ring-1 ring-ink/5 sm:block">
              <QrIcon className="mx-auto size-6 text-accent" />
              <p className="mt-1.5 font-heading text-5xl font-extrabold leading-none text-ink">
                100<span className="text-2xl font-light text-ink/60">%</span>
              </p>
              <p className="mt-1.5 font-heading text-sm font-bold uppercase leading-tight text-ink/80">
                Trackable
                <br />
                print ads
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SectionLabel number="01" label="What we do" />
          <div className="mt-7 grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div>
              <p className="font-heading text-sm font-bold uppercase">Follow us:</p>
              <SocialLinks className="mt-3" />
            </div>
            <p className="max-w-[640px] text-muted md:justify-self-end">
              We combine print media with social media marketing: newsletters,
              flyers, flex and standees with QR codes that lead straight to your
              WhatsApp or website, so you can finally see what your physical
              marketing delivers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
