import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { PhygitalModel } from "@/components/home/PhygitalModel";
import { PromiseBanner } from "@/components/home/PromiseBanner";
import { PageBanner } from "@/components/layout/PageBanner";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Publicity is a modern hybrid marketing agency in Lahore, combining physical print media with digital social media marketing as an all-in-one growth partner for local businesses.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "One-stop growth partner",
    text: "Normally, local brands have to hire different agencies for different tasks. We provide both physical and digital solutions under one roof.",
  },
  {
    title: "Who we help",
    text: "Local business owners who want more customers in specific areas and need a strong brand presence.",
  },
  {
    title: "Our core value",
    text: "Reliable physical visibility paired with digital tracking.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      >
        <p>
          A modern hybrid marketing agency based in Lahore, built to be the
          all-in-one growth partner for local businesses.
        </p>
      </PageBanner>

      <section className="relative pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="container-x">
          <SectionLabel number="01" label="Who we are" />

          <SplitText
            text="We combine physical print media with digital social media marketing"
            className="mt-14 max-w-[1000px] text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02]"
          />

          <Reveal className="mt-14">
            <figure className="overflow-hidden rounded-[28px] border border-line shadow-2xl shadow-ink/15">
              <Image
                src="/images/cover.jpg"
                alt="The Publicity - Your Phygital Marketing Partner: print media and distribution, custom QR-based tracking and social media management. Call +92 323 27 27 100 or visit www.publicity.com.pk"
                width={2752}
                height={1536}
                sizes="(min-width: 1360px) 1296px, 94vw"
                className="h-auto w-full"
              />
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 100} className="h-full">
                <article className="h-full rounded-3xl border border-fg/10 bg-surface p-7">
                  <p className="font-heading text-sm font-bold uppercase text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl font-extrabold leading-[1.02]">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-muted">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-10 border-t border-fg/10 pt-16 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-fg/50">
                The problem
              </p>
              <p className="mt-4 text-xl leading-relaxed text-fg/85 md:text-2xl md:leading-relaxed">
                In the market, businesses usually go to a printer for physical
                ads and a digital agency for social media. These two channels
                are not connected, which makes it hard to see the real results
                of physical marketing.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-accent">
                Our solution
              </p>
              <p className="mt-4 text-xl leading-relaxed text-fg/85 md:text-2xl md:leading-relaxed">
                We offer a complete &lsquo;Phygital&rsquo; (Physical + Digital)
                model. Print builds real-world trust and visibility, while a
                custom QR code on every item connects it to your digital
                channels and makes the results measurable.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhygitalModel number="02" />
      <HowWeWork number="03" />
      <PromiseBanner />
      <CtaBand />
    </>
  );
}
