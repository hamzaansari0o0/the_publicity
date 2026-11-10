import type { Device } from "@/lib/models";

const BOT =
  /bot|crawl|spider|slurp|preview|headless|curl|wget|facebookexternalhit|whatsapp|telegram|twitterbot|linkedin|slack|discord/i;
const TABLET = /ipad|tablet|playbook|silk|android(?!.*mobile)/i;
const MOBILE = /mobi|iphone|ipod|android|blackberry|opera mini|iemobile/i;

/** Rough device class from a User-Agent string (good enough for QR stats). */
export function detectDevice(userAgent: string | null | undefined): Device {
  if (!userAgent) return "unknown";
  if (BOT.test(userAgent)) return "bot";
  if (TABLET.test(userAgent)) return "tablet";
  if (MOBILE.test(userAgent)) return "mobile";
  return "desktop";
}
