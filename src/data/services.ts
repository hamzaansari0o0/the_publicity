import type { ArtKind } from "@/components/art/types";

export type Service = {
  slug: string;
  title: string;
  /** One-line summary (also used on cards and in meta descriptions). */
  summary: string;
  /** Opening paragraph on the service page. */
  lead: string;
  art: ArtKind;
  art2: ArtKind;
  /** How the title is split into big/small words in the home-page list. */
  display: { big: string; small: string; smallFirst?: boolean };
  tags: string[];
  overview: string[];
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
};

const sharedSteps = (printStep: string, distributeStep: string) => [
  {
    title: "Brief",
    text: "Tell us about your business, your area and the result you want.",
  },
  {
    title: "Design",
    text: "We create a modern layout with a custom QR code built in, and share a proof for approval.",
  },
  {
    title: "Print",
    text: printStep,
  },
  {
    title: "Distribute & track",
    text: distributeStep,
  },
];

export const services: Service[] = [
  {
    slug: "newsletters",
    title: "Newsletters",
    summary:
      "Printed updates for brand news, promotions and customer engagement.",
    lead: "A newsletter puts your brand's story into your customers' hands. We design and print newsletters that carry your news, offers and updates - with a QR code that connects every reader to your WhatsApp, website or social pages.",
    art: "newsletter",
    art2: "qr",
    display: { big: "Newsletters", small: "Brand news &\npromotions" },
    tags: ["Brand news", "Promotions", "Customer engagement"],
    overview: [
      "Whether you are a café launching a new menu, a real estate agent sharing fresh listings or a retail shop announcing a sale, a printed newsletter gives your message room to breathe - something a social post or a single flyer cannot do.",
      "We handle the whole job: layout and design, printing through our network of local wholesale printers, and a trackable QR code on the page so you can see how many readers took the next step online.",
    ],
    benefits: [
      {
        title: "Brand news, in hand",
        text: "Share announcements, promotions and stories in a format customers can keep and come back to.",
      },
      {
        title: "Customer engagement",
        text: "Keep regulars informed and give new customers a reason to visit or get in touch.",
      },
      {
        title: "Modern, standout design",
        text: "Fresh, professional layouts that look different from ordinary local prints.",
      },
      {
        title: "Measurable by design",
        text: "A custom QR code on every issue shows how many people interact with it online.",
      },
    ],
    steps: sharedSteps(
      "Your newsletter is printed through our trusted local wholesale printers with quality checks.",
      "Hand out or place your issues where your customers are, then watch QR scans come in.",
    ),
  },
  {
    slug: "flyers",
    title: "Pamphlets & Flyers",
    summary:
      "Fast, local distribution in specific areas - for example, within a 3km radius of your shop.",
    lead: "Flyers are the quickest way to reach the people who live and work around your business. We design eye-catching pamphlets, print them locally and help you target the exact areas that matter - each with its own QR code so you know what works.",
    art: "flyer",
    art2: "qr",
    display: { big: "Flyers", small: "Hyper-local\npamphlets", smallFirst: true },
    tags: ["Local distribution", "Area targeting", "QR tracking"],
    overview: [
      "Mass-distributing flyers across a whole city wastes money. We focus on specific areas - for example, a 3km radius around your shop - so your message lands with people who can actually walk through your door.",
      "Every flyer carries a custom QR code that opens your WhatsApp, website or social page. Use a different code for each area and you will see exactly which neighbourhoods respond.",
    ],
    benefits: [
      {
        title: "Hyper-local reach",
        text: "Target the streets, offices and neighbourhoods around your business instead of the whole city.",
      },
      {
        title: "Fast to roll out",
        text: "Quick local distribution so your offer reaches customers while it is still fresh.",
      },
      {
        title: "Designs that stand out",
        text: "Modern, attractive flyers that do not look like every other local print.",
      },
      {
        title: "Trackable leads",
        text: "Scans per area show how many people interacted with your flyer online.",
      },
    ],
    steps: sharedSteps(
      "Flyers are printed in the quantity you need through our local wholesale printer network.",
      "We help plan distribution zones, and each zone's QR code shows you which areas respond.",
    ),
  },
  {
    slug: "flex-standees",
    title: "Flex & Standees",
    summary:
      "Large visual displays for retail shops, promotions and local events.",
    lead: "When you need to be seen from across the street, go big. We design and produce flex banners and standees that make shop fronts, promotions and events impossible to miss - with a QR code passers-by can scan on the spot.",
    art: "flex",
    art2: "standee",
    display: { big: "Flex &", small: "Standee\ndisplays" },
    tags: ["Retail shops", "Promotions", "Local events"],
    overview: [
      "Flex banners are built for the street: large, bold and visible from a distance. Standees sit inside or at the entrance of a shop, stall or event and are easy to move wherever footfall is highest.",
      "We design for distance - a short headline, strong contrast and a QR code big enough to scan - and manage production with our local print partners so quality stays consistent.",
    ],
    benefits: [
      {
        title: "High visibility",
        text: "Large visual displays that catch attention from the street and across a shop floor.",
      },
      {
        title: "Made for shops & events",
        text: "Ideal for retail promotions, launches, sales and local events.",
      },
      {
        title: "Scannable from the street",
        text: "A properly sized QR code lets passers-by reach your WhatsApp or website in seconds.",
      },
      {
        title: "Easy to refresh",
        text: "Swap in a new design for every promotion and keep your display current.",
      },
    ],
    steps: sharedSteps(
      "Your flex or standee is produced through our trusted local print partners.",
      "Place it where footfall is highest and track QR scans to see how much attention it earns.",
    ),
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    summary:
      "Managing social media accounts and running digital ads to support your physical marketing.",
    lead: "Print gets you noticed in the real world; social media keeps the conversation going. We manage your accounts and run digital ads that support your physical campaigns - so everyone who scans a QR code lands somewhere worth visiting.",
    art: "social",
    art2: "qr",
    display: { big: "Marketing", small: "Social media", smallFirst: true },
    tags: ["Account management", "Digital ads", "Print + digital"],
    overview: [
      "Most local brands hire one business for print and another for social media - and neither knows what the other is doing. With The Publicity, both live under one roof, so your posts, ads and printed materials tell the same story.",
      "QR codes on your print link straight to your social pages, WhatsApp or website. We manage the accounts those scans land on and run digital ads that support your physical marketing.",
    ],
    benefits: [
      {
        title: "Print + digital, together",
        text: "One team, one message across your flyers, flex, newsletters and social pages.",
      },
      {
        title: "Account management",
        text: "We look after your social media accounts so they stay active and on-brand.",
      },
      {
        title: "Digital ads",
        text: "Run ads that support your physical marketing and reach people beyond the street.",
      },
      {
        title: "Closing the loop",
        text: "QR scans from print land on channels we manage - so interest turns into conversations.",
      },
    ],
    steps: sharedSteps(
      "Printed materials carry QR codes that point to the social pages and WhatsApp chats we manage.",
      "We keep your accounts active and run ads, while scan data shows how print and digital work together.",
    ),
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAdjacentServices(slug: string) {
  const index = services.findIndex((service) => service.slug === slug);
  return {
    prev: services[(index - 1 + services.length) % services.length],
    next: services[(index + 1) % services.length],
  };
}
