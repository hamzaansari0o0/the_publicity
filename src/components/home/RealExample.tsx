import { ArrowUpRight, QrIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/**
 * A real, independently reported example of measuring physical advertising with
 * QR codes. It is an INDUSTRY example (not a The Publicity client) and says so.
 * Figures are quoted from the source below - do not edit them without re-checking it.
 */
const SOURCE = {
  label: "Marketing Dive, 9 May 2024",
  href: "https://www.marketingdive.com/news/coca-cola-innocent-drinks-first-party-data-qr-code-ad/715542/",
};

const stats = [
  { value: "25,000+", label: "consumer form submissions" },
  { value: "5,000%", label: "above the campaign's expectations" },
  { value: "65%", label: "engagement rate" },
];

const facts = [
  { term: "Brand", detail: "Innocent Drinks (Coca-Cola)" },
  { term: "Where", detail: "QR codes on digital billboards in London Underground stations" },
  { term: "Reported", detail: "May 2024" },
];

export function RealExample() {
  return (
    <section id="real-example" className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <QrIcon className="size-4" />
              Real-world example
            </span>

            <SplitText
              text="Proof that every scan can be counted"
              className="mt-6 text-[clamp(2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02]"
            />

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/80">
              Innocent Drinks, a Coca-Cola brand, put QR codes on advertising
              screens across the London Underground. Scanning led to a
              sustainability microsite and an offer, and every response was
              measured, so the brand knew exactly what its ads delivered.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg/80">
              That is the idea behind every QR code we place on your print: each
              scan is counted, so physical marketing stops being a guess.
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-x-6">
              {facts.map((fact) => (
                <div key={fact.term} className="contents">
                  <dt className="font-heading text-sm font-bold uppercase tracking-wide text-accent">
                    {fact.term}
                  </dt>
                  <dd className="text-fg/80">{fact.detail}</dd>
                </div>
              ))}
            </dl>

            <a
              href={SOURCE.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-fg underline decoration-brand decoration-2 underline-offset-8 transition-colors hover:text-accent"
            >
              Read the source: {SOURCE.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <ul className="space-y-4">
              {stats.map((stat, index) => (
                <li key={stat.label}>
                  <Reveal delay={index * 110}>
                    <div className="flex items-center gap-6 rounded-3xl border border-line bg-page p-6 shadow-lg shadow-ink/5 transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl hover:shadow-ink/10 md:p-8">
                      <p className="text-brand-gradient font-heading text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-none">
                        {stat.value}
                      </p>
                      <p className="text-base font-semibold leading-snug text-fg/80 md:text-lg">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              Figures as reported by {SOURCE.label}. This is an industry example
              from a large brand, shown to illustrate what trackable QR codes
              make possible. It is not a The Publicity client result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
