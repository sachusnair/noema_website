import { BrandMark, hasBrandMark } from "./BrandMark";
import { LinkedInMark } from "./LinkedInMark";
import { socials } from "@/content/site";

/* Marks are drawn in their own brand colours, on the client's instruction.
   The reasoning for the palette version they replaced is recorded beside the
   colours in site.ts.

   Hover moves the border rather than the mark: a logo that changes colour on
   hover is no longer that company's logo. */
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
            /* The one mark simple-icons does not carry. It used to be a
               typographic "in" badge in the site's own face; it is the real
               glyph now. */
            <LinkedInMark />
          );

          return (
            <li key={item.name}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${TILE} transition-colors duration-200 hover:border-ember`}
                  style={{ color: item.brandColor }}
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
                  className={`${TILE} opacity-60`}
                  style={{ color: item.brandColor }}
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
