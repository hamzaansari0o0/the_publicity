import type { ArtKind } from "@/components/art/types";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  category: string;
  /** ISO date (yyyy-mm-dd). */
  date: string;
  readTime: string;
  excerpt: string;
  art: ArtKind;
  blocks: PostBlock[];
};

/**
 * Sample articles - edit, replace or delete freely.
 * (Later this can move to MongoDB without changing the page components.)
 */
export const posts: Post[] = [
  {
    slug: "why-every-flyer-needs-a-qr-code",
    title: "Why Every Flyer Needs a QR Code",
    category: "Tracking",
    date: "2026-10-28",
    readTime: "4 min read",
    excerpt:
      "Print builds local trust - but without a way to measure it, you are guessing. Here is how a simple QR code changes that.",
    art: "qr",
    blocks: [
      {
        type: "p",
        text: "Print has one big advantage over most digital ads: it puts your brand physically in front of people in your neighbourhood. It also has one big weakness - traditionally, you never find out what happened next. Did anyone act on that flyer? Which area worked? Which design?",
      },
      { type: "h2", text: "A QR code closes the loop" },
      {
        type: "p",
        text: "A custom QR code on a flyer, newsletter or flex banner takes anyone who scans it straight to a destination you choose: your WhatsApp chat, your website, a menu, a listing or your social page. Every scan can be counted, so physical marketing stops being a guess.",
      },
      { type: "h2", text: "Three ways to use QR codes well" },
      {
        type: "ul",
        items: [
          "Use one QR code per placement or area. If each distribution area has its own code, you can compare which locations bring more people online.",
          "Send people somewhere useful. A one-tap WhatsApp chat with a pre-filled message makes it easy to start a conversation.",
          "Make it scannable. Give the code enough size and some empty space around it, and test it on a few different phones before you print.",
        ],
      },
      { type: "h2", text: "Keep the offer clear" },
      {
        type: "p",
        text: "A QR code is a door, not the reason to walk through it. Pair it with a clear offer or reason to scan - a discount, a menu, a free consultation - and say what will happen when people do.",
      },
    ],
  },
  {
    slug: "plan-a-hyper-local-flyer-drop",
    title: "How to Plan a Hyper-Local Flyer Drop Around Your Shop",
    category: "Flyers",
    date: "2026-10-21",
    readTime: "5 min read",
    excerpt:
      "Flyers work best when they are targeted. Here is a simple way to choose your area, your message and your measure of success.",
    art: "flyer",
    blocks: [
      {
        type: "p",
        text: "Handing out flyers across a whole city wastes money. Customers rarely travel far for everyday purchases, which is why a tight radius around your shop - say 3km - is often the smartest place to start.",
      },
      { type: "h2", text: "1. Draw your radius" },
      {
        type: "p",
        text: "Mark your shop on a map and draw a circle around it. Inside that circle, list the places where your ideal customers live, work or pass by: apartment blocks, offices, markets, schools.",
      },
      { type: "h2", text: "2. Split it into zones" },
      {
        type: "p",
        text: "Divide the circle into three or four zones. Print the same flyer for each zone, but give every zone its own QR code. After a week you will see which zones sent the most people to your WhatsApp or website.",
      },
      { type: "h2", text: "3. Make one clear offer" },
      {
        type: "p",
        text: "A flyer is read in seconds. Lead with one offer, one benefit and one action. Put the QR code where the eye finishes - usually the bottom right - and tell people what scanning does.",
      },
      { type: "h2", text: "4. Review and repeat" },
      {
        type: "p",
        text: "Compare the zones, keep what worked and adjust the rest. The second drop is almost always better than the first, because you are now working with real numbers.",
      },
    ],
  },
  {
    slug: "flex-banner-or-standee",
    title: "Flex Banner or Standee? Choosing the Right Display for Your Shop",
    category: "Print Tips",
    date: "2026-10-14",
    readTime: "4 min read",
    excerpt:
      "Both grab attention - but they shine in different places. Here is how to pick the right one.",
    art: "flex",
    blocks: [
      {
        type: "p",
        text: "Flex banners and standees are the two workhorses of retail display. They look similar from far away, but each suits a different job.",
      },
      { type: "h2", text: "Flex banners: built for the street" },
      {
        type: "p",
        text: "Large, bold and visible from a distance, flex banners suit shop fronts, sale announcements and local events. Keep the message short - a passer-by gives you a couple of seconds.",
      },
      { type: "h2", text: "Standees: built for the entrance" },
      {
        type: "p",
        text: "Standees sit inside or at the entrance of a shop, event stall or office. They are easy to move, so you can change the message with each promotion or place the display where footfall is highest.",
      },
      { type: "h2", text: "Design tips for both" },
      {
        type: "ul",
        items: [
          "One message per display: headline, offer, action.",
          "Strong contrast between text and background so it reads from a distance.",
          "Make the QR code large - as a rule of thumb, people can scan from roughly ten times the code's width away.",
          "Keep important content away from the edges, where hems or frames can cover it.",
        ],
      },
      {
        type: "p",
        text: "Not sure which fits your shop? Tell us about it and we will recommend one.",
      },
    ],
  },
  {
    slug: "printed-newsletters-for-local-brands",
    title: "Printed Newsletters: Keeping Local Customers in the Loop",
    category: "Newsletters",
    date: "2026-10-07",
    readTime: "4 min read",
    excerpt:
      "From café menus to new listings, a printed newsletter gives local brands room to tell a bigger story.",
    art: "newsletter",
    blocks: [
      {
        type: "p",
        text: "A single post disappears from a feed in hours. A printed newsletter can sit on a counter, a desk or a fridge door - and keep your brand in view long after it was handed over.",
      },
      { type: "h2", text: "What goes in a local newsletter?" },
      {
        type: "ul",
        items: [
          "Cafés: new menu items, seasonal offers and event nights.",
          "Real estate agents: fresh listings, neighbourhood updates and market tips.",
          "Retail shops: new arrivals, sale dates and loyalty offers.",
        ],
      },
      { type: "h2", text: "Keep it short and scannable" },
      {
        type: "p",
        text: "One or two pages is plenty. Use clear headings, short paragraphs and one strong image, and end with a single action for the reader to take.",
      },
      { type: "h2", text: "Add a QR code to every issue" },
      {
        type: "p",
        text: "A custom QR code links each issue to your WhatsApp, website or social page - and shows you how many readers took the next step.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    prev: posts[(index - 1 + posts.length) % posts.length],
    next: posts[(index + 1) % posts.length],
  };
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
