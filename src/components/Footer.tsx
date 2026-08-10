import Link from "next/link";
import { BookDemoButton } from "./BookDemoButton";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-carbon text-bone">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:max-w-[34ch]">
            <span className="type-display-s">
              {site.name}
              <span className="text-ember">.</span>
            </span>
            <p className="mt-2 text-step-2 text-bone/75">{footer.tagline}</p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${footer.email}`}
                className="text-step-2 underline decoration-ash underline-offset-4 transition-colors duration-200 hover:text-ash"
              >
                {footer.email}
              </a>
              <span className="text-step-2 text-bone/75">{footer.location}</span>
            </div>

            <BookDemoButton
              label={footer.ctaLabel}
              className="mt-8 py-2.5 text-step-1"
            />
          </div>

          {/* Columns rather than a single row: the link list is long enough now
              that a row would wrap into an unreadable line. */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="type-mono text-ash">{column.title}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-step-2 text-bone/80 transition-colors duration-200 hover:text-ember"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-step-2 text-bone/80 transition-colors duration-200 hover:text-ember"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ash/40 pt-6">
          <span className="type-mono text-ash">{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
