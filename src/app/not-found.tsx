import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      data-theme="dark"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-page pt-24 text-fg"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[-20%] h-[100%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(201,151,28,.32),transparent)] blur-3xl" />
        <div className="absolute -bottom-[30%] right-[-10%] h-[100%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(155,28,36,.40),transparent)] blur-3xl" />
      </div>
      <div className="container-x text-center">
        <p className="font-heading text-[clamp(8rem,28vw,22rem)] font-extrabold leading-[0.8] text-accent">
          404
        </p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-fg/75">
          The page you scanned for has moved or never existed. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-9">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
