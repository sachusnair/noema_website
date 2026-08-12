import {
  siAsana,
  siGoogle,
  siHubspot,
  siInstagram,
  siQuickbooks,
  siSage,
  siShopify,
  siStripe,
  siWhatsapp,
  siX,
  siXero,
  siYoutube,
} from "simple-icons";

/* Official brand marks from simple-icons, which is CC0-1.0 on the icon files.
   The trademarks themselves remain the property of their owners.

   Imported one by one rather than as a namespace, so the other 3,444 icons are
   tree-shaken out of the bundle instead of shipping to every visitor.

   Dext, GoCardless, Outlook, Slack and Monday are not in the set, in some cases
   because the brand asked to be removed from it. Those render as a wordmark
   instead: see the fallback in each consumer. */
const PATHS: Record<string, string> = {
  xero: siXero.path,
  sage: siSage.path,
  quickbooks: siQuickbooks.path,
  stripe: siStripe.path,
  google: siGoogle.path,
  whatsapp: siWhatsapp.path,
  hubspot: siHubspot.path,
  asana: siAsana.path,
  shopify: siShopify.path,
  x: siX.path,
  youtube: siYoutube.path,
  instagram: siInstagram.path,
};

export function hasBrandMark(slug?: string) {
  return Boolean(slug && PATHS[slug]);
}

/** The raw 24x24 path, for callers drawing inside an existing SVG. Nesting an
 *  <svg> inside another one does not size reliably, so those callers place the
 *  path themselves with a transform. */
export function brandPath(slug: string) {
  return PATHS[slug];
}

/** Draws in the current text colour, so the caller decides whether the mark
 *  carries the brand colour or the surrounding palette. */
export function BrandMark({
  slug,
  className = "size-5",
}: {
  slug: string;
  className?: string;
}) {
  const path = PATHS[slug];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} fill-current`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
