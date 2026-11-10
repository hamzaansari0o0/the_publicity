"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="container-x text-center">
        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none">
          Something went wrong
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-fg/75">
          An unexpected error occurred. Please try again - if it keeps
          happening, contact us and we&apos;ll sort it out.
        </p>
        <div className="mt-9">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </section>
  );
}
