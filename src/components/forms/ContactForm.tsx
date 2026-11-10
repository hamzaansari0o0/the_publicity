"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { BUSINESS_TYPES, SERVICE_INTERESTS } from "@/data/forms";

type FieldErrors = Record<string, string[] | undefined>;

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; fieldErrors?: FieldErrors };

const controlClass =
  "w-full rounded-2xl border border-fg/20 bg-page px-5 py-4 text-base text-fg placeholder:text-fg/40 transition-colors focus:border-brand aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-heading text-sm font-bold uppercase tracking-wide text-fg/80"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectArrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-fg/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const id = (field: string) => `${uid}-${field}`;
  const fieldErrors = status.state === "error" ? status.fieldErrors : undefined;
  const errorFor = (field: string) => fieldErrors?.[field]?.[0];
  const aria = (field: string) => ({
    "aria-invalid": errorFor(field) ? (true as const) : undefined,
    "aria-describedby": errorFor(field) ? `${id(field)}-error` : undefined,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.ok && body?.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }
      setStatus({
        state: "error",
        message: body?.error ?? "Something went wrong. Please try again.",
        fieldErrors: body?.fieldErrors,
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-start justify-center gap-5 rounded-3xl border border-fg/10 bg-surface p-8 md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-brand-gradient text-white">
          <Check className="size-7" strokeWidth={2.6} />
        </span>
        <h2 className="text-4xl font-extrabold leading-none">Message sent!</h2>
        <p className="max-w-md text-muted">
          Thank you for reaching out. We&apos;ve received your message and will
          get back to you soon.
        </p>
        <Button variant="dark" onClick={() => setStatus({ state: "idle" })}>
          Send another
        </Button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-fg/10 bg-surface p-6 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Your name *" error={errorFor("name")}>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your name"
            className={controlClass}
            {...aria("name")}
          />
        </Field>
        <Field id={id("email")} label="Email *" error={errorFor("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className={controlClass}
            {...aria("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={id("phone")}
          label="Phone / WhatsApp"
          error={errorFor("phone")}
        >
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 ..."
            className={controlClass}
            {...aria("phone")}
          />
        </Field>
        <Field
          id={id("businessType")}
          label="Business type"
          error={errorFor("businessType")}
        >
          <div className="relative">
            <select
              id={id("businessType")}
              name="businessType"
              defaultValue=""
              className={`${controlClass} appearance-none`}
              {...aria("businessType")}
            >
              <option value="">Select one</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <SelectArrow />
          </div>
        </Field>
      </div>

      <Field
        id={id("service")}
        label="I'm interested in"
        error={errorFor("service")}
      >
        <div className="relative">
          <select
            id={id("service")}
            name="service"
            defaultValue=""
            className={`${controlClass} appearance-none`}
            {...aria("service")}
          >
            <option value="">Select a service</option>
            {SERVICE_INTERESTS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <SelectArrow />
        </div>
      </Field>

      <Field id={id("message")} label="Message *" error={errorFor("message")}>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          placeholder="Tell us about your business and the area you want to reach"
          className={`${controlClass} resize-y`}
          {...aria("message")}
        />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">
        {status.state === "error" ? (
          <p className="rounded-2xl border border-danger/30 bg-danger/10 px-5 py-4 text-sm font-medium text-danger">
            {status.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
