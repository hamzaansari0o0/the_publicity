import type { NextRequest } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/data/site";
import { clientIp, json } from "@/lib/http";
import { getCollections, isDbConfigured } from "@/lib/mongodb";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators";

const MAX_BODY_CHARS = 10_000;
const WINDOW_MS = 10 * 60 * 1000;
/** Raw requests per client (typos and validation errors included). */
const MAX_REQUESTS_PER_WINDOW = 30;
/** Valid messages actually stored per client. */
const MAX_MESSAGES_PER_WINDOW = 5;

function tooManyRequests(retryAfter: number) {
  return json(
    {
      ok: false,
      error:
        "Too many messages from this device. Please try again in a few minutes.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

/** Is the request coming from our own website? (basic CSRF defence) */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, server-to-server)
  try {
    const originHost = new URL(origin).host;
    const allowed = new Set(
      [
        request.headers.get("host"),
        request.headers.get("x-forwarded-host"),
        new URL(siteConfig.url).host,
      ].filter(Boolean),
    );
    return allowed.has(originHost);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, error: "Unsupported content type." },
      { status: 415 },
    );
  }

  if (!isSameOrigin(request)) {
    return json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const ip = clientIp(request);
  const burst = rateLimit(`contact-any:${ip}`, MAX_REQUESTS_PER_WINDOW, WINDOW_MS);
  if (!burst.ok) return tooManyRequests(burst.retryAfter);

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return json({ ok: false, error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: bots fill every field. Pretend success, store nothing.
  if (data.website) return json({ ok: true });

  // Strict limit on messages that would actually be stored.
  const sent = rateLimit(`contact:${ip}`, MAX_MESSAGES_PER_WINDOW, WINDOW_MS);
  if (!sent.ok) return tooManyRequests(sent.retryAfter);

  if (!isDbConfigured()) {
    console.error(
      "[contact] MONGODB_URI is not set - a message could not be saved. See .env.example.",
    );
    return json(
      {
        ok: false,
        error:
          "Our contact form is not connected yet. Please reach us by email or WhatsApp instead.",
      },
      { status: 503 },
    );
  }

  try {
    const { inquiries } = await getCollections();
    await inquiries.insertOne({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || undefined,
      businessType: data.businessType || undefined,
      service: data.service || undefined,
      message: data.message,
      status: "new",
      source: "website",
      createdAt: new Date(),
    });
    return json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] could not save inquiry:", error);
    return json(
      {
        ok: false,
        error: "Something went wrong on our side. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
