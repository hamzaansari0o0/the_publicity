/**
 * Central place for everything business-specific that shows up on the site.
 * Contact details and social links come from `.env` (see `.env.example`), so
 * they can be changed without touching any component.
 */

const fromEnv = (value: string | undefined, fallback: string) =>
  value?.trim() || fallback;

const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
  /\D/g,
  "",
);
// Public business contact details (also printed on the agency's cover banner).
// `.env` can override them without touching the code.
const phone = fromEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE, "+92 323 27 27 100");
const email = fromEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "sendtome2003@gmail.com");

const hasRealPhone = phone.replace(/\D/g, "").length >= 10;
const hasRealEmail = !email.toLowerCase().endsWith("@example.com");

/** wa.me link with an optional pre-filled message, or null if no number is set. */
export function whatsappLink(message?: string): string | null {
  if (!whatsappDigits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsappDigits}${text}`;
}

/** "#" means "not configured" - those are filtered out of `siteConfig.socials`. */
const socialCandidates = [
  {
    key: "facebook",
    label: "Facebook",
    href: fromEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL, "#"),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: fromEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL, "#"),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: fromEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL, "#"),
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: whatsappLink() ?? "#",
  },
] as const;

export const siteConfig = {
  name: "The Publicity",
  tagline: "Your Phygital marketing partner",
  description:
    "The Publicity is Lahore's Phygital marketing agency: print media and distribution, custom QR-based tracking and social media management - bridging physical print and digital social media so local brands can see the real results of their marketing.",
  url: fromEnv(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  /** Public domain shown on the agency's marketing material. */
  domain: "www.publicity.com.pk",
  city: "Lahore",
  country: "Pakistan",
  address: fromEnv(process.env.NEXT_PUBLIC_ADDRESS, "Lahore, Pakistan"),
  email,
  /** Falls back to the contact page until a real email is configured. */
  emailHref: hasRealEmail ? `mailto:${email}` : "/contact",
  phone,
  phoneHref: hasRealPhone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "/contact",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS?.trim() || null,
  hasWhatsapp: Boolean(whatsappDigits),
  /** Only networks with a URL in `.env` are shown, so there are never dead icons. */
  socials: socialCandidates.filter((social) => social.href !== "#"),
} as const;

export type SocialKey = (typeof socialCandidates)[number]["key"];
