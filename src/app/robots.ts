import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API endpoints and QR redirects are not pages.
      disallow: ["/api/", "/r/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
