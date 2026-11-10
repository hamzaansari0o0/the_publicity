"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

/**
 * Live proof of the core idea: a real, scannable QR code that points at
 * `/r/demo`. The route counts the scan in MongoDB and forwards the visitor,
 * and this card shows the running total.
 */
export function QrDemo() {
  const [qr, setQr] = useState<string | null>(null);
  const [scans, setScans] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const target = `${window.location.origin}/r/demo`;

    QRCode.toDataURL(target, {
      margin: 1,
      width: 260,
      color: { dark: "#02090F", light: "#FFFFFF" },
    })
      .then((dataUrl) => {
        if (!cancelled) setQr(dataUrl);
      })
      .catch(() => {});

    fetch("/api/qr/demo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { scans?: number | null } | null) => {
        if (!cancelled && typeof data?.scans === "number") setScans(data.scans);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-brand/40 bg-brand/[0.07] p-7 sm:flex-row sm:items-center">
      <div className="grid size-36 shrink-0 place-items-center rounded-2xl bg-white p-2 sm:size-40">
        {qr ? (
          // eslint-disable-next-line @next/next/no-img-element -- generated data URL, nothing to optimise
          <img
            src={qr}
            alt="Demo QR code - scan it with your phone camera"
            width={260}
            height={260}
            className="size-full"
          />
        ) : (
          <span className="size-full animate-pulse rounded-lg bg-ink/10" />
        )}
      </div>
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-accent">
          Try it yourself
        </p>
        <h3 className="mt-2 text-2xl font-extrabold leading-[1.02]">
          Scan this QR with your phone
        </h3>
        <p className="mt-3 text-sm text-muted">
          We count the scan, then send you on to our contact options. That&apos;s
          exactly what your customers&apos; print ads will do for you.
        </p>
        {scans !== null ? (
          <p className="mt-4 text-sm text-fg/80">
            <span className="font-heading text-xl font-extrabold text-fg">
              {scans}
            </span>{" "}
            {scans === 1 ? "scan" : "scans"} so far
          </p>
        ) : null}
      </div>
    </div>
  );
}
