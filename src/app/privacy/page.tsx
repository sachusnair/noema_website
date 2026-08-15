import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.privacy.title} — ${site.name}`,
  description: site.description,
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={legal.privacy.title}
      intro={legal.privacy.intro}
      sections={legal.privacy.sections}
    />
  );
}
