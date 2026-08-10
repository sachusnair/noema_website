import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: contact.sub,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <PageShell eyebrow={contact.eyebrow} title={contact.h1} sub={contact.sub}>
      <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal index={1}>
          <div className="flex flex-col gap-8 border-t border-ash/30 pt-6 lg:border-t-0 lg:border-l lg:border-ash/30 lg:pt-0 lg:pl-12">
            <div>
              <h2 className="type-mono text-ash">{contact.emailLabel}</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-step-3 underline decoration-ash underline-offset-4 transition-colors duration-200 hover:text-ember"
              >
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="type-mono text-ash">{contact.locationLabel}</h2>
              <p className="mt-2 text-step-3">{site.location}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
