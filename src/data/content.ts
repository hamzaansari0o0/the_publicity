import type { ArtKind } from "@/components/art/types";
import { services } from "@/data/services";

/** Main navigation (used by the menu panel and the footer). */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Concept Samples", href: "/#samples" },
  { label: "Contact Us", href: "/contact" },
] as const;

/** Home page: "what we do" numbers. Sourced from the project brief. */
export const stats = [
  { value: "4", suffix: "", label: "Core services under one roof" },
  { value: "1", suffix: "", label: "QR code on every printed item" },
  { value: "3", suffix: "km", label: "Example flyer radius around your shop" },
  { value: "100", suffix: "%", label: "Trackable print campaigns" },
] as const;

/** Concept samples shown as stacked cards. These are design concepts, not client work. */
export const samples: {
  title: string;
  text: string;
  format: string;
  industry: string;
  art: ArtKind;
  href: string;
}[] = [
  {
    title: "Café Promo Flyer",
    text: "A bold A5 flyer concept with a one-tap WhatsApp ordering QR code.",
    format: "Flyer",
    industry: "Cafés",
    art: "flyer",
    href: "/services/flyers",
  },
  {
    title: "Real Estate Newsletter",
    text: "A clean printed newsletter concept for new listings, with a QR code to the agent's website.",
    format: "Newsletter",
    industry: "Real estate",
    art: "newsletter",
    href: "/services/newsletters",
  },
  {
    title: "Retail Sale Flex",
    text: "A high-visibility flex banner concept for a sale event, with a QR code that works from the pavement.",
    format: "Flex banner",
    industry: "Retail",
    art: "flex",
    href: "/services/flex-standees",
  },
];

/** Who we serve. */
export const audiences: {
  name: string;
  tag: string;
  text: string;
  art: ArtKind;
}[] = [
  {
    name: "Cafés",
    tag: "More footfall",
    text: "Menu flyers, event newsletters and WhatsApp-ordering QR codes for the streets around you.",
    art: "cafe",
  },
  {
    name: "Real Estate",
    tag: "More leads",
    text: "Listing newsletters and area flyers that send interested buyers straight to your WhatsApp.",
    art: "home",
  },
  {
    name: "Retail Shops",
    tag: "More sales",
    text: "Flex, standees and promo flyers that turn passers-by into customers - and count them.",
    art: "bag",
  },
];

/** The 'Phygital' model (Physical + Digital). Sourced from the project brief. */
export const pillars = [
  {
    title: "Local Brand Awareness",
    text: "Physical marketing builds real-world trust and high visibility in your local area.",
    icon: "pin",
  },
  {
    title: "Integrated Tracking",
    text: "Custom QR codes on every printed item take people straight to your WhatsApp, website or social channels.",
    icon: "qr",
  },
  {
    title: "Trackable Leads",
    text: "See exactly how many people interacted with your print ads online - physical marketing, finally measurable.",
    icon: "chart",
  },
] as const;

/** How we work (About page). Sourced from the project action plan. */
export const workSteps = [
  {
    title: "Local Vendor Network",
    text: "We build strong partnerships with local wholesale printers and focus on good management and quality - so you get dependable print without the overhead.",
    tags: ["Wholesale printers", "Quality control", "Reliable delivery"],
  },
  {
    title: "Design & Print Standards",
    text: "Modern, attractive designs for newsletters and flyers that stand out from normal local prints.",
    tags: ["Newsletters", "Flyers", "Modern layouts"],
  },
  {
    title: "Smart QR Integration",
    text: "A scannable QR code on every printed item connects it to digital platforms like WhatsApp, your website or social media.",
    tags: ["WhatsApp", "Websites", "Social media"],
  },
  {
    title: "Targeted Local Visibility",
    text: "We focus on cafés, real estate agents and retail shops that want highly targeted visibility in their own area.",
    tags: ["Cafés", "Real estate", "Retail shops"],
  },
] as const;
