import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/portfolio`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/design`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({
      url: `${site.url}/portfolio/${p.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
