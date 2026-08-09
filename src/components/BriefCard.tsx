"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SensorSurface } from "./Sensor";
import { brief, briefRows, theBrief } from "@/content/site";

/* The card is the one place this page spends its boldness, so the assembly is
   choreographed rather than decorative: the source chips gather in from around
   the card first, then each decision resolves on top of them. That is the
   product in miniature, not an effect. It runs once on mount, never on scroll
   and never on loop.

   Chip start offsets are fixed per index rather than random, because a random
   start would differ between the server render and hydration. */
const SCATTER: Array<[number, number]> = [
  [-64, -38],
  [72, -30],
  [-52, 34],
  [58, 42],
  [-78, 12],
  [86, -8],
  [-30, -56],
  [40, 60],
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Today in Europe/London. Only ever called after mount, so the server render
 *  and the first client render stay identical and the card is still legible
 *  with JavaScript switched off. */
function londonStamp() {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
  })
    .format(now)
    .toUpperCase();
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  return { weekday, date };
}

function Chip({
  label,
  index,
  animate,
}: {
  label: string;
  index: number;
  animate: boolean;
}) {
  const className =
    "type-mono rounded-default border border-ash/50 bg-carbon px-2 py-1 text-ash";

  if (!animate) return <span className={className}>{label}</span>;

  const [x, y] = SCATTER[index % SCATTER.length];

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0.22, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.06, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

type BriefCardProps = {
  /** Three rows in the hero, five in section 4. */
  rows?: number;
  /** The large card lets a row open to show the trail behind the decision. */
  expandable?: boolean;
  /** Assembly runs only where the card is first met, in the hero. */
  animate?: boolean;
};

export function BriefCard({
  rows = 3,
  expandable = false,
  animate = false,
}: BriefCardProps) {
  const reduced = useReducedMotion();
  const [stamp, setStamp] = useState<{ weekday: string; date: string } | null>(
    null,
  );
  const [openRow, setOpenRow] = useState<number | null>(null);
  const baseId = useId();

  useEffect(() => setStamp(londonStamp()), []);

  const visible = briefRows.slice(0, rows);
  const running = animate && !reduced;
  let chipIndex = 0;

  return (
    <SensorSurface
      className="rounded-brief border border-ash/45 bg-carbon shadow-fine"
      radius={280}
    >
      <div data-brief>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ash/40 px-5 py-3">
        <span className="type-mono text-ember">
          {brief.timeLabel} · {stamp?.weekday ?? brief.weekdayFallback}
        </span>
        <span className="type-mono text-ash">{stamp?.date ?? ""}</span>
      </div>

      <div className="px-5 pt-5">
        <h3 className="type-display-s">{brief.title}</h3>
        {expandable ? (
          <p className="type-mono mt-2 text-ash">{theBrief.hint}</p>
        ) : null}
      </div>

      <ol className="divide-y divide-ash/25 px-5 py-4">
        {visible.map((row, index) => {
          const isOpen = openRow === index;
          const panelId = `${baseId}-evidence-${index}`;
          const chips = row.sources.map((source) => ({
            source,
            i: chipIndex++,
          }));

          const lines = (
            <div className="min-w-0 flex-1">
              <p className="text-step-2 font-medium text-bone">{row.decision}</p>
              <p className="mt-1 text-step-1 text-ash">
                {/* Set as a mono label so the reason reads as annotation on the
                    decision rather than as the start of the sentence. */}
                {/* Full ash, not a dimmed one: at 80% it drops to 3.6:1 on
                    carbon, which is below AA. */}
                <span className="type-mono mr-2 text-ash">
                  {brief.whyLabel}
                </span>
                {row.why}
              </p>
            </div>
          );

          const inner = (
            <>
              <div className="flex gap-3">
                <span
                  className="type-mono shrink-0 pt-1 text-step-1 text-ember"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {running ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.16,
                        ease: EASE,
                      }}
                    >
                      {lines}
                    </motion.div>
                  ) : (
                    lines
                  )}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <Chip
                        key={chip.source}
                        label={chip.source}
                        index={chip.i}
                        animate={running}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {expandable ? (
                <ul
                  id={panelId}
                  hidden={!isOpen}
                  className="mt-3 ml-8 border-l border-ember pl-4"
                >
                  {row.evidence.map((line) => (
                    <li
                      key={line}
                      className="type-mono py-0.5 text-ash normal-case tracking-[0.05em]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          );

          /* Hover opens the row, as specified. Focus does the same so the trail
             is reachable by keyboard, and click pins it open on touch, where
             there is no hover at all. */
          return (
            <li key={row.decision} className="py-4 first:pt-0 last:pb-0">
              {expandable ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onMouseEnter={() => setOpenRow(index)}
                  onMouseLeave={() => setOpenRow(null)}
                  onFocus={() => setOpenRow(index)}
                  onBlur={() => setOpenRow(null)}
                  onClick={() =>
                    setOpenRow((current) => (current === index ? null : index))
                  }
                  className="block w-full cursor-pointer text-left"
                >
                  {inner}
                </button>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>

      {running ? (
        <motion.div
          className="border-t border-ash/40 px-5 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
        >
          <span className="type-mono text-ash">{brief.footer}</span>
        </motion.div>
      ) : (
        <div className="border-t border-ash/40 px-5 py-3">
          <span className="type-mono text-ash">
            {expandable ? brief.footerLarge : brief.footer}
          </span>
        </div>
      )}
      </div>
    </SensorSurface>
  );
}
