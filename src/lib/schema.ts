import { services, type Service } from "@/data/services";
import { siteConfig } from "@/data/site";
import type { Post } from "@/data/posts";

/**
 * schema.org builders. Only facts the owner has supplied are used: no street
 * address, rating, price or opening hours is invented. When a real address is
 * added, extend `organizationSchema` (and consider `LocalBusiness` details).
 */

const abs = (path: string) => `${siteConfig.url}${path}`;

export const organizationId = abs("/#organization");
export const websiteId = abs("/#website");

const city = { "@type": "City", name: siteConfig.city } as const;

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": abs(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": organizationId },
    areaServed: city,
  };
}

/** Sitewide graph: the business, the website and the four services it offers. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: siteConfig.name,
        description: siteConfig.description,
        url: abs("/"),
        logo: abs("/images/logo.png"),
        image: abs("/opengraph-image.jpg"),
        telephone: siteConfig.phone.replace(/[^\d+]/g, ""),
        email: siteConfig.email,
        sameAs: siteConfig.socials
          .filter((social) => social.key !== "whatsapp")
          .map((social) => social.href),
        areaServed: city,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressCountry: "PK",
        },
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: abs(`/services/${service.slug}`),
            description: service.summary,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: abs("/"),
        name: siteConfig.name,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function servicePageSchema(service: Service) {
  return { "@context": "https://schema.org", ...serviceSchema(service) };
}

export function blogPostingSchema(post: Post) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [abs("/opengraph-image.jpg")],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: abs("/"),
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: abs("/images/logo.png") },
    },
  };
}
