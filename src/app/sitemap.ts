import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://waadimedia.com";
  const staticRoutes = [
    "",
    "about",
    "services",
    "services/web-development",
    "services/software-development",
    "services/ai-automation",
    "services/social-media-management",
    "services/brand-management",
    "anantnag-kashmir",
    "portfolio",
    "contact",
    "blog",
  ];

  const blogRoutes = getAllBlogSlugs().map((slug) => `blog/${slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes];

  return allRoutes.map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "portfolio" || path === "blog" || path.startsWith("blog/")
        ? "weekly"
        : "monthly",
    priority:
      path === ""
        ? 1.0
        : path.startsWith("services/")
        ? 0.9
        : path.startsWith("blog/")
        ? 0.85
        : 0.7,
  }));
}
