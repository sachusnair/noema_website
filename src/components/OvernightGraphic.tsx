"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { overnightGraphic } from "@/content/site";

/* The hero visual: the systems a business runs, feeding a single core
   overnight.

   Built as flat vector rather than the glossy isometric render it is modelled
   on. A saturated blue 3D object would fight the one-accent rule the rest of
   the page holds to, so this is drawn in ember and ash on void: same idea,
   this site's language.

   Pure SVG and CSS. The only script is a timer advancing which source is
   currently sending, so the sequence reads as one source at a time rather than
   six things blinking at once. */

/* Two columns of three, feeding a core between them. A ring was tried first
   and read as a clock face, with wires crossing each other on the way in.
   Straight columns and simple elbows are easier to follow and hold up at the
   size this sits at in the hero. */
const CX = 200;
const CY = 150;
const COLUMN_X = 52;
const ROW_Y = [58, 150, 242];
/** Where a wire stops, short of the core so it does not run underneath it. */
const CORE_GAP = 44;
/** Half the tile width, so wires leave the edge rather than the centre. */
const TILE_W = 74;
const TILE_H = 26;

const NODES = [
  { side: "left" as const, row: 0, label: "XERO" },
  { side: "left" as const, row: 1, label: "OUTLOOK" },
  { side: "left" as const, row: 2, label: "GOOGLE" },
  { side: "right" as const, row: 0, label: "SLACK" },
  { side: "right" as const, row: 1, label: "ASANA" },
  { side: "right" as const, row: 2, label: "STRIPE" },
];

function nodePosition(node: (typeof NODES)[number]) {
  return {
    x: node.side === "left" ? COLUMN_X : 400 - COLUMN_X,
    y: ROW_Y[node.row],
  };
}

/** Out of the tile edge, along to the midpoint, then a single turn into the
 *  core. Middle-row wires run straight in with no turn at all. */
function wirePath(node: (typeof NODES)[number]) {
  const { x, y } = nodePosition(node);
  const isLeft = node.side === "left";
  const start = x + (isLeft ? TILE_W / 2 : -TILE_W / 2);
  const stop = CX + (isLeft ? -CORE_GAP : CORE_GAP);
  if (node.row === 1) return `M ${start} ${y} H ${stop}`;
  const turn = isLeft ? CX - 96 : CX + 96;
  return `M ${start} ${y} H ${turn} V ${CY} H ${stop}`;
}

export function OvernightGraphic() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;
    // One source sends at a time. Slow enough to follow, not so slow it stalls.
    const id = window.setInterval(() => {
      frame.current += 1;
      setActive(frame.current % NODES.length);
    }, 1100);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 400 300"
        className="w-full"
        role="img"
        aria-label={overnightGraphic.alt}
      >
        <defs>
          {/* Core fill. A flat radial, not a glow: it lifts the centre without
              becoming the blurred wash the brief rules out. */}
          <radialGradient id="core-fill">
            <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {NODES.map((node, index) => {
          const path = wirePath(node);
          const isActive = !reduced && index === active;
          return (
            <g key={node.label}>
              <path
                d={path}
                fill="none"
                stroke="var(--color-ash)"
                strokeOpacity={isActive ? 0.85 : 0.32}
                strokeWidth="1"
                className="transition-[stroke-opacity] duration-500"
              />
              {/* The pulse: a dash travelling the wire toward the core. Drawn
                  only for the source currently sending. */}
              {isActive ? (
                <path
                  d={path}
                  fill="none"
                  stroke="var(--color-ember)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="graphic-pulse"
                />
              ) : null}
            </g>
          );
        })}

        {NODES.map((node, index) => {
          const { x, y } = nodePosition(node);
          const isActive = !reduced && index === active;
          return (
            <g key={`${node.label}-tile`}>
              <rect
                x={x - TILE_W / 2}
                y={y - TILE_H / 2}
                width={TILE_W}
                height={TILE_H}
                rx="4"
                fill="var(--color-carbon)"
                stroke={isActive ? "var(--color-ember)" : "var(--color-ash)"}
                strokeOpacity={isActive ? 1 : 0.45}
                className="transition-all duration-500"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={isActive ? "var(--color-ember)" : "var(--color-ash)"}
                className="graphic-label transition-colors duration-500"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r="60" fill="url(#core-fill)" />
        <circle
          cx={CX}
          cy={CY}
          r="38"
          fill="var(--color-carbon)"
          stroke="var(--color-ember)"
          strokeWidth="1"
        />
        {/* Concentric ring, stepping in as the night goes on. */}
        <circle
          cx={CX}
          cy={CY}
          r="30"
          fill="none"
          stroke="var(--color-ember)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 5"
          className={reduced ? "" : "graphic-ring"}
        />
        <text
          x={CX}
          y={CY - 2}
          textAnchor="middle"
          fill="var(--color-bone)"
          className="graphic-core-time"
        >
          {overnightGraphic.coreTime}
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill="var(--color-ash)"
          className="graphic-label"
        >
          {overnightGraphic.coreLabel}
        </text>
      </svg>

      <figcaption className="type-mono mt-4 text-center text-ash">
        {overnightGraphic.caption}
      </figcaption>
    </figure>
  );
}
