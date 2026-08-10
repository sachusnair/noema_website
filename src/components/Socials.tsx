import { BrandMark, hasBrandMark } from "./BrandMark";
import { socials } from "@/content/site";

/* Marks are drawn in the page palette rather than brand colours. Four saturated
   logos in the footer would pull attention to the least important thing on the
   page, and several of them are near-black, which would disappear on carbon
   anyway. They warm to ember on hover.

   Accounts without a URL are skipped, so the row never shows a link that goes
   nowhere. */
const TILE =
  "flex size-10 items-center justify-center rounded-default border border-ash/50";

export function Socials() {
  return (
    <div>
      <h2 className="type-mono text-ash">{socials.title}</h2>
      <ul className="mt-4 flex flex-wrap items-center gap-3">
        {socials.items.map((item) => {
          const mark = hasBrandMark(item.icon) ? (
            <BrandMark slug={item.icon as string} className="size-4" />
          ) : (
            /* LinkedIn has no licensed mark available, so this is a
               typographic badge in the site's own face rather than an
               approximation of their logo. */
            <span className="type-mono text-step-1" aria-hidden="true">
              {item.badge}
            </span>
          );

          return (
            <li key={item.name}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${TILE} text-ash transition-colors duration-200 hover:border-ember hover:text-ember`}
                >
                  {mark}
                  <span className="sr-only">{item.name}</span>
                </a>
              ) : (
                /* No URL yet, so the tile is shown but is not a link and is
                   not focusable. A link to nowhere is worse than an inert
                   mark: it looks working and fails on click. It is dimmed and
                   has no hover state, so it does not invite one either.
                   Adding the href in site.ts turns it into a link. */
                <span
                  className={`${TILE} text-ash/45`}
                  title={`${item.name} — link coming soon`}
                >
                  {mark}
                  <span className="sr-only">
                    {item.name}, not linked yet
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
