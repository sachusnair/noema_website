import Link from "next/link";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-carbon text-bone">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="type-display-s">
              {site.name}
              <span className="text-ember">.</span>
            </span>
            <p className="mt-2 text-step-2 text-bone/75">{footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 lg:items-end">
            <a
              href={`mailto:${footer.email}`}
              className="text-step-2 underline underline-offset-4 decoration-ash transition-colors duration-200 hover:text-ash"
            >
              {footer.email}
            </a>
            <span className="text-step-2 text-bone/75">{footer.location}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ash/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="type-mono text-ash">{footer.copyright}</span>
          <nav aria-label="Legal" className="flex gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-mono text-ash transition-colors duration-200 hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
