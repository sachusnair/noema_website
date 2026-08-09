import type { Metadata } from "next";
import Link from "next/link";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.privacy.title} — ${site.name}`,
  description: site.description,
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="shell py-20 lg:py-28">
      <Link href="/" className="type-mono text-ash">
        {legal.back}
      </Link>
      <h1 className="type-display-m mt-10">{legal.privacy.title}</h1>
      <div className="mt-8 max-w-[62ch] space-y-6">
        {legal.privacy.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-step-2 text-bone/80">
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
