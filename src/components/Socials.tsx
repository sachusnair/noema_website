import { BrandMark, hasBrandMark } from "./BrandMark";
import { socials } from "@/content/site";

/* LinkedIn's own mark, drawn as a path so it takes its colour from the tile
   like the other three rather than arriving as a blue square in a monochrome
   row. It is here rather than in BrandMark because simple-icons dropped
   LinkedIn at LinkedIn's request, so there is no slug to look up.

   Source and licence are recorded in public/logos/SOURCES.md. It is the "in"
   glyph from the official two-colour mark, lifted unchanged — not an
   approximation, which the brief rightly forbids. */
const LINKEDIN_PATH =
  "M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z";

function LinkedInMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" focusable="false" className="size-4 fill-current">
      <path d={LINKEDIN_PATH} />
    </svg>
  );
}

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
