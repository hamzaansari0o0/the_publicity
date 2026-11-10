import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { workSteps } from "@/data/content";

/** Numbered rows describing how The Publicity delivers (from the project action plan). */
export function HowWeWork({ number = "04" }: { number?: string }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionLabel number={number} label="How we work" />

        <SplitText
          text="How we deliver print that performs"
          className="mt-14 max-w-[820px] text-[clamp(2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02]"
        />

        <ol className="mt-14 divide-y divide-fg/10 border-y border-fg/10">
          {workSteps.map((step, index) => (
            <li
              key={step.title}
              className="group grid gap-5 py-9 md:grid-cols-[90px_1.1fr_1fr] md:items-center md:gap-10 md:py-12"
            >
              <span className="font-heading text-3xl font-extrabold text-fg/30 transition-colors group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-none transition-transform duration-300 group-hover:translate-x-1">
                {step.title}
              </h3>
              <div>
                <p className="text-muted">{step.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-fg/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-fg/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
