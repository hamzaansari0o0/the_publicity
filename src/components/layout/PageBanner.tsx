import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type PageBannerProps = {
  title: string;
  crumbs: Crumb[];
  /** `lg` is for long titles (articles, service names). */
  size?: "xl" | "lg";
  children?: ReactNode;
};

/** Title banner used at the top of every inner page. */
export function PageBanner({
  title,
  crumbs,
  size = "xl",
  children,
}: PageBannerProps) {
  return (
    <section
      data-theme="dark"
      className="grain relative isolate overflow-hidden bg-page pb-14 pt-36 text-fg md:pb-24 md:pt-52"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[10%] -top-[40%] h-[100%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(201,151,28,.32),transparent)] blur-3xl" />
        <div className="absolute -right-[10%] top-[10%] h-[90%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(155,28,36,.40),transparent)] blur-3xl" />
        {/* decorative rings */}
        <div className="absolute -right-52 top-6 size-[560px] rounded-full border border-fg/10" />
        <div className="absolute -right-24 top-[88px] size-[400px] rounded-full border border-fg/10" />
        <div className="absolute right-4 top-[152px] size-[250px] rounded-full border border-fg/10" />
      </div>

      <div className="container-x">
        <nav aria-label="Breadcrumb" className="animate-rise">
          <ol className="flex flex-wrap items-center gap-3 font-heading text-sm font-semibold uppercase tracking-wide">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-3">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-fg/70 transition-colors hover:text-fg"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-accent">
                    {crumb.label}
                  </span>
                )}
                {index < crumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-fg/40">
                    {"//"}
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <h1
          className={
            size === "xl"
              ? "animate-rise mt-6 max-w-[16ch] text-[clamp(3.25rem,10vw,9rem)] font-extrabold leading-[0.88]"
              : "animate-rise mt-6 max-w-[20ch] text-[clamp(2.4rem,6.4vw,5.5rem)] font-extrabold leading-[0.92]"
          }
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>

        {children ? (
          <div
            className="animate-rise mt-8 max-w-2xl text-lg text-muted"
            style={{ animationDelay: "240ms" }}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
