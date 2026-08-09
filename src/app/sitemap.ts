import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Required by `output: "export"`: the route has to be emitted at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${site.url}/terms`, priority: 0.2, changeFrequency: "yearly" },
  ];
}
