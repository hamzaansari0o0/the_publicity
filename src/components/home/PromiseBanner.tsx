import { QR_DECORATIVE } from "@/components/art/qr-data";
import { PixelTrail } from "@/components/art/PixelTrail";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

/** Full-bleed statement banner in the red-to-gold gradient. */
export function PromiseBanner() {
  return (
    <section className="grain relative isolate flex min-h-[540px] items-center overflow-hidden py-24 md:min-h-[660px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient">
        <div className="absolute -left-[10%] top-[-30%] h-[110%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.22),transparent)] blur-3xl" />
        <div className="absolute -bottom-[40%] -right-[10%] h-[110%] w-[65%] rounded-full bg-[radial-gradient(closest-side,rgba(38,38,38,.55),transparent)] blur-3xl" />
        {/* oversized QR watermark */}
        <svg
          viewBox={`0 0 ${QR_DECORATIVE.size} ${QR_DECORATIVE.size}`}
          className="absolute -right-20 top-1/2 size-[820px] max-w-none -translate-y-1/2 text-white opacity-[0.10]"
        >
          <path d={QR_DECORATIVE.path} fill="currentColor" />
        </svg>
        <PixelTrail className="absolute bottom-10 left-6 hidden w-56 opacity-70 md:block" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-[660px]">
          <blockquote className="rounded-xl bg-white p-5 text-lg font-semibold leading-snug text-ink shadow-xl shadow-ink/20 md:p-6 md:text-[1.7rem] md:leading-[1.25]">
            Print builds trust on the street. QR codes turn that trust into
            leads you can count.
          </blockquote>
          <div className="mt-3 inline-flex items-center gap-3 rounded-xl bg-white p-2.5 pr-7 text-ink shadow-xl shadow-ink/20">
            <LogoMark className="size-12" />
            <div>
              <p className="font-heading text-xl font-extrabold uppercase leading-none">
                The Publicity
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Our promise to local brands
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
