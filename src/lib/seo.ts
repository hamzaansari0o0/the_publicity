import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/**
 * Next.js merges metadata *shallowly*: a page that sets `openGraph` or
 * `twitter` replaces the layout's whole block (title, url, image, ...). So
 * every page builds its complete metadata through this helper instead of
 * relying on inheritance.
 */

/** Home page `<title>` (also the layout's fallback for pages without their own). */
export const defaultTitle = `${siteConfig.name} | Phygital Marketing Agency in ${siteConfig.city}`;

/** Home page meta description. */
export const homeDescription =
  "The Publicity is a Lahore marketing agency combining print (newsletters, flyers, flex, standees) with social media and a trackable QR code on every printed item.";

const shareImageAlt =
  "The Publicity - Your Phygital Marketing Partner, bridging physical print and digital social media";

const openGraphImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: shareImageAlt,
};

const twitterImage = {
  url: "/twitter-image.jpg",
  width: 1200,
  height: 630,
  alt: shareImageAlt,
};

type PageMetadataOptions = {
  /**
   * Page title. The site name is appended by the layout's title template, so
   * keep it to ~44 characters to stay under 60 in total.
   */
  title?: string;
  /** Full title with no suffix (home page only). Overrides `title`. */
  absoluteTitle?: string;
  /** Meta description, roughly 120-160 characters. */
  description: string;
  /** Site-relative path, e.g. `/services/flyers`. Used for canonical and og:url. */
  path: string;
  /** Article details for blog posts. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    section?: string;
  };
};

export function buildMetadata({
  title,
  absoluteTitle,
  description,
  path,
  article,
}: PageMetadataOptions): Metadata {
  const shareTitle = absoluteTitle ?? `${title} | ${siteConfig.name}`;

  const shared = {
    siteName: siteConfig.name,
    locale: "en_PK",
    title: shareTitle,
    description,
    url: path,
    images: [openGraphImage],
  };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          section: article.section,
          authors: [siteConfig.name],
        }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [twitterImage],
    },
  };
}
