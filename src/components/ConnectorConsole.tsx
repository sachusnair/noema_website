"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siAsana, siGoogle, siStripe, siXero } from "simple-icons";
import { SensorSurface } from "./Sensor";
import { connectorConsole } from "@/content/site";

/* Official brand marks, from simple-icons (CC0-1.0 on the icon files; the
   trademarks remain the property of their owners). Imported one by one rather
   than as a namespace so the other 3,449 icons are tree-shaken out.

   Slack, Outlook, Monday, GoCardless and Dext are not in the set, in some
   cases because the brand asked to be removed, so they keep the letter mark.
   Marks are drawn in the current text colour rather than brand colours, which
   keeps ember as the only accent on the page. */
const BRAND_PATHS: Record<string, string> = {
  xero: siXero.path,
  asana: siAsana.path,
  stripe: siStripe.path,
  google: siGoogle.path,
};

/* Step one, made operable rather than described. A row of connector chips sits
   under a console panel; selecting one shows what Noema takes from that system.
   It is a tablist, not a set of buttons, so arrow keys move between systems and
   the panel is announced as their content.

   Chips carry a two-letter mark set in the utility font. Official brand logo
   files are deliberately not used: it avoids trademark use, and a row of brand
   colours would break the one-accent rule the rest of the page holds to. */

const EASE = [0.16, 1, 0.3, 1] as const;

export function ConnectorConsole() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const baseId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  const items = connectorConsole.connectors;
  const current = items[active];

  const focusTab = (index: number) => {
    setActive(index);
    tabsRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab((active + 1) % items.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab((active - 1 + items.length) % items.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(items.length - 1);
    }
  };

  return (
    <SensorSurface
      className="rounded-default border border-ash/45 bg-carbon"
      radius={320}
    >
      {/* Console header, in the same mono register as the brief card, so the
          two read as parts of one instrument. */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ash/40 px-5 py-3">
        <span className="type-mono text-ember">
          {connectorConsole.panelLabel} {current.name.toUpperCase()}
        </span>
        <span className="type-mono text-ash">{connectorConsole.hint}</span>
      </div>

      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="min-h-[172px] px-5 py-6 sm:min-h-[150px]"
      >
        <ul className="space-y-3">
          {current.reads.map((line, index) => {
            const row = (
              <span className="flex gap-3">
                <span className="type-mono shrink-0 pt-1 text-ember" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-step-2 text-bone">{line}</span>
              </span>
            );

            // Keyed on the connector so switching systems replays the stagger
            // rather than swapping text in place.
            return (
              <li key={line}>
                {reduced ? (
                  row
                ) : (
                  <motion.span
                    key={`${current.name}-${index}`}
                    className="block"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: index * 0.06,
                      ease: EASE,
                    }}
                  >
                    {row}
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={tabsRef}
        role="tablist"
        aria-label={connectorConsole.hint}
        onKeyDown={onKeyDown}
        className="flex flex-wrap items-center gap-2 border-t border-ash/40 px-5 py-4"
      >
        {items.map((connector, index) => {
          const selected = index === active;
          return (
            <button
              key={connector.name}
              id={`${baseId}-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              title={connector.name}
              /* Marks carry each brand's own colour. Selection is therefore
                 signalled by the ring and fill rather than by the mark, so
                 ember stays the thing that means "active" on this page. */
              style={{ color: connector.brandColor }}
              className={`type-mono flex size-11 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                selected
                  ? "border-ember bg-ember/12 opacity-100"
                  : "border-ash/50 opacity-65 hover:border-bone hover:opacity-100"
              }`}
            >
              {connector.icon && BRAND_PATHS[connector.icon] ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-current"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={BRAND_PATHS[connector.icon]} />
                </svg>
              ) : (
                <span aria-hidden="true">{connector.mark}</span>
              )}
              <span className="sr-only">{connector.name}</span>
            </button>
          );
        })}
      </div>
    </SensorSurface>
  );
}
