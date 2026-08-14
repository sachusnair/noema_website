import type { Metadata } from "next";
import { FounderNote } from "@/components/FounderNote";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: about.intro,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <PageShell eyebrow={about.eyebrow} title={about.h1} sub={about.intro}>
      <div className="mt-20 flex flex-col gap-16 lg:mt-24 lg:gap-20">
        {about.sections.map((section, index) => (
          <section key={section.title}>
            <Reveal index={index}>
              {/* Hairline above each block, so the page has structure without
                  needing cards or boxes. */}
              <h2 className="type-display-s border-t border-ash/30 pt-6">
                {section.title}
              </h2>
            </Reveal>
            <div className="mt-6 flex flex-col gap-5">
              {section.body.map((paragraph, bodyIndex) => (
                <Reveal key={paragraph.slice(0, 24)} index={bodyIndex + 1}>
                  <p className="max-w-[62ch] text-step-3 leading-[1.6] text-bone/85">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Reveal>
        <p className="mt-16 max-w-[62ch] border-t border-ash/30 pt-6 text-step-2 text-ash">
          {about.honesty}
        </p>
      </Reveal>

      {/* The founder note closes this page rather than interrupting the home
          page. It is the only place the founder's background is used, and it
          belongs with the story of the company rather than beside the product
          pitch. Pulled full bleed out of the shell's padding so it keeps the
          edge to edge block it was designed as. */}
      <div className="mt-24 -mx-[var(--spacing-page)] lg:-mx-[var(--spacing-gutter)]">
        <FounderNote />
      </div>
    </PageShell>
  );
}
