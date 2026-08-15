import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

// Required by `output: "export"`: the route has to be emitted at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.iso || undefined,
    priority: 0.5,
    changeFrequency: "yearly" as const,
  }));

  return [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/about`, priority: 0.8, changeFrequency: "monthly" },
    /* Pricing is parked; add it back here when src/app/_pricing is renamed. */
    { url: `${site.url}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site.url}/blog`, priority: 0.6, changeFrequency: "weekly" },
    ...posts,
    { url: `${site.url}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${site.url}/terms`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${site.url}/security`, priority: 0.2, changeFrequency: "yearly" },
  ];
}
