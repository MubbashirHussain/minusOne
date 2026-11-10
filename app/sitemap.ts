import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    ...posts.map(post => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.published), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
