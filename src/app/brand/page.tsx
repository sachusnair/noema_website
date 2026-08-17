import type { Metadata } from "next";
import { BrandDownloader } from "@/components/BrandDownloader";
import { PageShell } from "@/components/PageShell";
import { brand, site } from "@/content/site";

/* A tool, not a page for visitors: kept out of the nav, out of the footer and
   out of sitemap.ts, and told not to be indexed. It is still reachable by
   anyone who types the URL, which is the point. */
export const metadata: Metadata = {
  title: `Brand — ${site.name}`,
  description: brand.sub,
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return (
    <PageShell eyebrow={brand.eyebrow} title={brand.h1} sub={brand.sub}>
      <BrandDownloader />
    </PageShell>
  );
}
