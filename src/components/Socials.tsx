import { BrandMark, hasBrandMark } from "./BrandMark";
import { socials } from "@/content/site";

/* Marks are drawn in the page palette rather than brand colours. Four saturated
   logos in the footer would pull attention to the least important thing on the
   page, and several of them are near-black, which would disappear on carbon
   anyway. They warm to ember on hover.

   Accounts without a URL are skipped, so the row never shows a link that goes
   nowhere. */
export function Socials() {
  const items = socials.items.filter((item) => item.href);
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="type-mono text-ash">{socials.title}</h2>
      <ul className="mt-4 flex items-center gap-3">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-default border border-ash/50 text-ash transition-colors duration-200 hover:border-ember hover:text-ember"
            >
              {hasBrandMark(item.icon) ? (
                <BrandMark slug={item.icon as string} className="size-4" />
              ) : (
                /* LinkedIn has no licensed mark available, so this is a
                   typographic badge in the site's own face rather than an
                   approximation of their logo. */
                <span className="type-mono text-step-1" aria-hidden="true">
                  {item.badge}
                </span>
              )}
              <span className="sr-only">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
