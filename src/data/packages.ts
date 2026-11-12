/** Typed data for the "Shared Media Ad Slots" section. */

export type PackageIconName = "qr" | "zap" | "sparkles";

export interface PackageFeature {
  text: string;
}

export interface SharedPackage {
  id: string;
  name: string;
  /** Short note next to the name, e.g. "Budget Friendly". */
  label?: string;
  tagline: string;
  icon: PackageIconName;
  /** Highlighted card with a glowing badge and solid CTA. */
  featured?: boolean;
  /** Text of the glowing badge on the featured card. */
  badge?: string;
  features: PackageFeature[];
  cta: { label: string; href: string };
  /** Visual weight of the call-to-action button. */
  ctaStyle: "outline" | "solid";
}

const COPIES = "5,000 Copies House Drops (3km Radius)";

export const sharedPackages: SharedPackage[] = [
  {
    id: "starter-grid",
    name: "Starter Grid Slot",
    label: "Budget Friendly",
    tagline: "Ideal for small local shops & new offers",
    icon: "qr",
    features: [
      { text: "1x Standard Grid Slot (3.5\" x 2\")" },
      { text: "Brand Logo + Custom Offer Visual" },
      { text: "Unique Trackable QR Code (Leads to WhatsApp)" },
      { text: COPIES },
      { text: "Scan Analytics Report" },
    ],
    cta: { label: "Reserve Starter Slot", href: "/contact" },
    ctaStyle: "outline",
  },
  {
    id: "banner",
    name: "Banner Slot",
    label: "Most Popular",
    tagline: "Half-page VIP placement for maximum attention",
    icon: "zap",
    featured: true,
    badge: "BEST VALUE",
    features: [
      { text: "1/2 Page Large Display Banner (Front/Back)" },
      { text: "Bold Headline + Product Photo Feature" },
      { text: "Custom Trackable QR Code" },
      { text: COPIES },
      { text: "Social Media Post Feature Included" },
    ],
    cta: { label: "Reserve Banner Slot", href: "/contact" },
    ctaStyle: "solid",
  },
  {
    id: "front-cover",
    name: "Featured Front Cover Slot",
    label: "Prime Placement",
    tagline: "Top header placement for maximum brand authority",
    icon: "sparkles",
    features: [
      { text: "Prime Front Top Banner Position" },
      { text: "Maximum Eyeball Guarantee" },
      { text: "Custom Trackable QR Code" },
      { text: COPIES },
      { text: "Full Digital Post + Story Shoutout" },
    ],
    cta: { label: "Get Prime Space", href: "/contact" },
    ctaStyle: "outline",
  },
];
