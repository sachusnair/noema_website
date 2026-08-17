# Brand assets

Generated from the site's own sources, so they cannot drift from what the site
renders. Regenerate rather than edit by hand.

| File | Use |
| --- | --- |
| `noema-wordmark-light.png` | Wordmark for dark backgrounds. Transparent. |
| `noema-wordmark-dark.png` | Wordmark for light backgrounds. Transparent. |
| `noema-wordmark-on-void.png` | Wordmark on the site background, for anywhere transparency is not supported. |
| `noema-icon.png` | The N mark, 512px, transparent. Avatars, favicons, app icons. |
| `noema-icon-on-void.png` | The N mark on the site background. |

The wordmark is Poppins Bold, the same file `next/font` self-hosts, with the
full stop in ember `#FF5A1F`. Light is bone `#EDEDEA`, dark is ink `#08172E`,
and the background where solid is void `#0A0A0B`.

The N mark is a bone N with the ember full stop beside it, the same pairing as
the wordmark. It is drawn from the same coordinates as `src/app/icon.svg`.

**Do not re-export the two icon files by hand.** The site serves its own
generator at `/brand`: pick a size from 16 to 1024, pick void or transparent,
and it draws the mark on a canvas from the geometry in
`src/components/NoemaMark.tsx` and hands back a PNG. The two files above are
that page's 512px output. The page is noindexed and is in neither the nav nor
the sitemap, so it is reachable only by typing the URL.

The transparent mark needs a dark surface behind it. The N is bone, so it
disappears on white.

Poppins is licensed under the SIL Open Font License, so it may be embedded in
artwork like this.
