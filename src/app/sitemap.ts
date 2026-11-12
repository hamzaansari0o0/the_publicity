import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = new Date(
    `${posts.map((post) => post.updated ?? post.date).sort().at(-1)}T00:00:00Z`,
  );
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), priority: 1 },
    { url: url("/about"), priority: 0.8 },
    { url: url("/services"), priority: 0.9 },
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      priority: 0.8,
    })),
    { url: url("/blog"), lastModified: latestPostDate, priority: 0.7 },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
      priority: 0.6,
    })),
    { url: url("/contact"), priority: 0.8 },
  ];
}
