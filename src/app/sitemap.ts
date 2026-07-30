import type { MetadataRoute } from "next";

const siteUrl = "https://skills-agency.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/` }];
}
