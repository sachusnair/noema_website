import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.security.title} — ${site.name}`,
  description: site.description,
  alternates: { canonical: `${site.url}/security` },
};

export default function SecurityPage() {
  return (
    <LegalPage
      title={legal.security.title}
      intro={legal.security.intro}
      sections={legal.security.sections}
    />
  );
}
