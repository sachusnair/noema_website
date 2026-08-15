import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.terms.title} — ${site.name}`,
  description: site.description,
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      title={legal.terms.title}
      intro={legal.terms.intro}
      sections={legal.terms.sections}
    />
  );
}
