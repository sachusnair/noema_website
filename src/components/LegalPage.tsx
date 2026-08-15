import Link from "next/link";
import { company, legal, type LegalSection } from "@/content/site";

/* Privacy, Terms and Security are the same page with different words, so they
   share one layout. Keeping them identical is not only tidiness: a reviewer
   comparing the three notices should not have to work out whether a missing
   heading means a missing commitment. */

/** The registered entity block. Renders nothing while the facts are unknown,
 *  so the notice never carries a placeholder that reads as a real value. */
function RegisteredDetails() {
  const lines = [
    company.legalName,
    company.companyNumber
      ? `Registered in England and Wales, company number ${company.companyNumber}`
      : "",
    company.registeredAddress,
    company.icoRegistration
      ? `ICO data protection register: ${company.icoRegistration}`
      : "",
  ].filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <div className="mt-8 border-t border-ash/30 pt-6">
      {lines.map((line) => (
        <p key={line} className="text-step-2 leading-[1.6] text-ash">
          {line}
        </p>
      ))}
    </div>
  );
}

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main className="shell py-20 lg:py-28">
      <Link href="/" className="type-mono text-ash">
        {legal.back}
      </Link>

      <h1 className="type-display-m mt-10">{title}</h1>

      <p className="type-mono mt-4 text-ash">
        {legal.updatedLabel} {legal.updated}
      </p>

      <div className="mt-8 max-w-[68ch]">
        <p className="text-step-3 leading-[1.6] text-bone/80">{intro}</p>

        {sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="type-display-s">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-step-2 leading-[1.6] text-bone/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        <RegisteredDetails />
      </div>
    </main>
  );
}
