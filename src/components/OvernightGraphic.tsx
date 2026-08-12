"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { brandPath } from "./BrandMark";
import { overnightGraphic, site } from "@/content/site";

/* The hero visual: the systems a business runs, orbiting a single core that
   produces one brief.

   Built as flat vector rather than the glossy isometric render it is modelled
   on. A saturated blue 3D object would fight the one-accent rule the rest of
   the page holds to, so this is drawn in the site's palette with each brand
   mark in its own colour.

   The ring turns clockwise. Each tile counter-rotates by exactly the same
   amount, so the logos stay upright rather than tumbling as they go round. */

const CX = 200;
const CY = 170;
/** Orbit radius. */
const R = 126;
const TILE_W = 54;
const TILE_H = 54;
const CORE_R = 42;

/* Every system here has a real mark available under a licence we can use.
   Outlook and Slack are deliberately absent: neither has a mark in
   simple-icons, both having been removed at the brand's request, and a text
   tile among five logos would read as a mistake. */
const NODES = [
  { icon: "xero", label: "Xero", color: "#13B5EA" },
  { icon: "quickbooks", label: "QuickBooks", color: "#2CA01C" },
  { icon: "google", label: "Google Workspace", color: "#4285F4" },
  { icon: "stripe", label: "Stripe", color: "#635BFF" },
  { icon: "asana", label: "Asana", color: "#F06A6A" },
  { icon: "hubspot", label: "HubSpot", color: "#FF7A59" },
];

export function OvernightGraphic() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tick = useRef(0);

  useEffect(() => {
    if (reduced) return;
    // One system sends at a time, so the sequence can be followed rather than
    // six things pulsing at once.
    const id = window.setInterval(() => {
      tick.current += 1;
      setActive(tick.current % NODES.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 400 340"
        className="w-full"
        role="img"
        aria-label={overnightGraphic.alt}
      >
        <defs>
          {/* A flat radial behind the core. Not a glow: it lifts the centre
              without becoming a blurred colour wash. */}
          <radialGradient id="core-fill">
            <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit guide, so the ring reads as a path rather than six loose
            tiles that happen to be moving. */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.16"
          strokeWidth="1"
        />

        <g
          className={reduced ? undefined : "orbit-spin"}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {NODES.map((node, index) => {
            const angle = (360 / NODES.length) * index;
            const isActive = !reduced && index === active;
            /* Local origin is the tile; after the translate the core lies at
               +R on this axis, so the spoke runs down from the tile's inner
               edge to the core's rim. */
            const wireStart = TILE_H / 2;
            const wireEnd = R - CORE_R;

            return (
              // Placed on the ring: rotate about the core, then step outward.
              <g
                key={node.label}
                transform={`rotate(${angle} ${CX} ${CY}) translate(${CX} ${CY - R})`}
              >
                {/* Spoke, drawn before the counter-rotation so it stays
                    radial as the ring turns. */}
                <line
                  x1="0"
                  y1={wireStart}
                  x2="0"
                  y2={wireEnd}
                  stroke="var(--color-ash)"
                  strokeOpacity={isActive ? 0.8 : 0.28}
                  strokeWidth="1"
                  className="transition-[stroke-opacity] duration-500"
                />
                {isActive ? (
                  <line
                    x1="0"
                    y1={wireStart}
                    x2="0"
                    y2={wireEnd}
                    stroke="var(--color-ember)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="orbit-pulse"
                  />
                ) : null}

                {/* Undo the placement rotation, then cancel the ring's turn,
                    so the tile is upright at every moment. */}
                <g transform={`rotate(${-angle})`}>
                  <g className={reduced ? undefined : "orbit-counter"}>
                    <rect
                      x={-TILE_W / 2}
                      y={-TILE_H / 2}
                      width={TILE_W}
                      height={TILE_H}
                      rx="4"
                      fill="var(--color-carbon)"
                      stroke={
                        isActive ? "var(--color-ember)" : "var(--color-ash)"
                      }
                      strokeOpacity={isActive ? 1 : 0.4}
                      className="transition-all duration-500"
                    />
                    {/* The 24-unit path, scaled to 22 and centred by hand.
                        A nested <svg> was tried and did not size reliably
                        inside the parent's coordinate system. */}
                    <g
                      transform={`translate(-11 -11) scale(${22 / 24})`}
                      opacity={isActive ? 1 : 0.75}
                    >
                      <path d={brandPath(node.icon)} fill={node.color} />
                    </g>
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        <circle cx={CX} cy={CY} r="64" fill="url(#core-fill)" />
        <circle
          cx={CX}
          cy={CY}
          r={CORE_R}
          fill="var(--color-carbon)"
          stroke="var(--color-ember)"
          strokeWidth="1"
        />
        <circle
          cx={CX}
          cy={CY}
          r={CORE_R - 9}
          fill="none"
          stroke="var(--color-ember)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 5"
          className={reduced ? undefined : "orbit-ring"}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* The wordmark itself at the centre, matching the one in the nav:
            Poppins with the full stop in ember. */}
        <text
          x={CX}
          y={CY + 6}
          textAnchor="middle"
          fill="var(--color-bone)"
          className="graphic-wordmark"
        >
          {site.name}
          <tspan fill="var(--color-ember)">.</tspan>
        </text>
      </svg>

      <figcaption className="type-mono mt-4 text-center text-ash">
        {overnightGraphic.caption}
      </figcaption>
    </figure>
  );
}
