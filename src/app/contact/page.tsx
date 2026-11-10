import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageBanner } from "@/components/layout/PageBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell The Publicity about your business and the area you want to reach. We'll show you how print and digital marketing can work together.",
  alternates: { canonical: "/contact" },
};

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 rounded-3xl border border-fg/10 bg-surface p-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-xl font-extrabold leading-none">{title}</h3>
        <div className="mt-2.5 space-y-1 text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const whatsapp = whatsappLink(
    "Hi The Publicity! I'd like to know more about your services.",
  );

  return (
    <>
      <PageBanner
        title="Contact Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      >
        <p>
          Tell us about your business and the area you want to reach. We&apos;ll
          get back to you with ideas for combining print and digital.
        </p>
      </PageBanner>

      <section className="pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <h2 className="mb-8 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1]">
              Send us a message
            </h2>
            <ContactForm />
          </div>

          <aside className="space-y-5 lg:pt-[5.5rem]">
            <InfoCard icon={<MapPin className="size-6" />} title="Address">
              <p>{siteConfig.address}</p>
            </InfoCard>

            <InfoCard icon={<Phone className="size-6" />} title="Phone">
              <p>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-fg"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </InfoCard>

            <InfoCard icon={<Mail className="size-6" />} title="Email">
              <p className="break-all">
                <a
                  href={siteConfig.emailHref}
                  className="transition-colors hover:text-fg"
                >
                  {siteConfig.email}
                </a>
              </p>
            </InfoCard>

            {siteConfig.hours ? (
              <InfoCard icon={<Clock className="size-6" />} title="Opening hours">
                <p>{siteConfig.hours}</p>
              </InfoCard>
            ) : null}

            <div className="rounded-3xl border border-fg/10 bg-surface p-6">
              <h3 className="text-xl font-extrabold leading-none">
                Follow us
              </h3>
              <SocialLinks className="mt-4" />
              {whatsapp ? (
                <div className="mt-6">
                  <ButtonLink
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                  >
                    Chat on WhatsApp
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
