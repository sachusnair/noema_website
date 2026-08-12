"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { brandPath } from "./BrandMark";
import { overnightGraphic, site } from "@/content/site";

/* The hero visual: two rings turning around the Noema wordmark.

   Inner ring, clockwise: the business systems Noema reads.
   Outer ring, anticlockwise: the model and tooling layer it runs on. The two
   turn opposite ways so the layers stay legible as separate things rather
   than looking locked together.

   Every tile counter-rotates by exactly its own ring's amount, so the logos
   stay upright the whole way round. Flat vector in the site's palette, each
   mark in its own brand colour. */

const CX = 240;
const CY = 240;
const R_INNER = 122;
const R_OUTER = 198;
const TILE_INNER = 52;
const TILE_OUTER = 44;
const CORE_R = 44;

type Node = {
  icon: string;
  label: string;
  /** Brand colour. Marks whose own colour is black are drawn in bone instead:
   *  pure black is invisible on this background, and both of those brands
   *  publish a light version for dark surfaces. */
  color: string;
};

/** A brand with no licensed mark in simple-icons. `file` points at an official
 *  asset placed in /public by hand; until one is there the name is set in type
 *  rather than approximated. */
type FileNode = { label: string; text: true; file?: string };

/* Business systems. Every one has a mark available under a licence we can
   use. Outlook and Slack are absent because neither does. */
const INNER: Node[] = [
  { icon: "xero", label: "Xero", color: "#13B5EA" },
  { icon: "quickbooks", label: "QuickBooks", color: "#2CA01C" },
  { icon: "google", label: "Google Workspace", color: "#4285F4" },
  { icon: "stripe", label: "Stripe", color: "#635BFF" },
  { icon: "asana", label: "Asana", color: "#F06A6A" },
  { icon: "hubspot", label: "HubSpot", color: "#FF7A59" },
];

/* Model and tooling layer. ChatGPT is a wordmark because OpenAI has no mark in
   simple-icons, having asked to be removed from the set, so there is no
   licensed version to draw and guessing at one would be worse than the name. */
const OUTER: (Node | FileNode)[] = [
  { icon: "mcp", label: "Model Context Protocol", color: "var(--color-bone)" },
  { icon: "claude", label: "Claude", color: "#D97757" },
  /* Drop the official SVG into /public and set file to its path, for example
     file: "/chatgpt.svg", and the tile switches from type to the mark. */
  { label: "CHATGPT", text: true },
  { icon: "cursor", label: "Cursor", color: "var(--color-bone)" },
  { icon: "n8n", label: "n8n", color: "#EA4B71" },
  { icon: "gemini", label: "Google Gemini", color: "#8E75B2" },
];

/* One pulse per spoke, alternating direction around the ring: neighbours run
   opposite ways, so both readings are visible at once. Inbound is Noema
   reading a system, outbound is Noema acting on it.

   The phase flips each cycle, so every line breathes in and then out rather
   than being permanently one way. */
function Spoke({
  from,
  to,
  inbound,
  reduced,
  dashed,
}: {
  from: number;
  to: number;
  inbound: boolean;
  reduced: boolean;
  dashed?: boolean;
}) {
  const length = to - from;
  return (
    <>
      <line
        x1="0"
        y1={from}
        x2="0"
        y2={to}
        stroke="var(--color-ash)"
        strokeOpacity={dashed ? 0.38 : 0.28}
        strokeWidth="1"
        strokeDasharray={dashed ? "2 5" : undefined}
      />
      {reduced ? null : (
        <line
          x1="0"
          y1={from}
          x2="0"
          y2={to}
          // Ember reads in, bone reads out. Bone is already the body colour,
          // so the second direction costs no new accent.
          stroke={inbound ? "var(--color-ember)" : "var(--color-bone)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className={inbound ? "orbit-pulse-in" : "orbit-pulse-out"}
          style={{ ["--len" as string]: `${length}px` }}
        />
      )}
    </>
  );
}

export function OvernightGraphic() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const tick = useRef(0);

  useEffect(() => {
    if (reduced) return;
    // Matches the pulse duration, so a line reverses only once its current
    // pulse has finished travelling.
    const id = window.setInterval(() => {
      tick.current += 1;
      setPhase(tick.current % 2);
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 480 480"
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

        {/* Orbit guides, so each ring reads as a path rather than loose tiles
            that happen to be moving. */}
        <circle
          cx={CX}
          cy={CY}
          r={R_INNER}
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <circle
          cx={CX}
          cy={CY}
          r={R_OUTER}
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Outer ring, anticlockwise. Offset half a step so its tiles sit in
            the gaps of the inner ring rather than shadowing them. */}
        <g
          className={reduced ? undefined : "orbit-spin-outer"}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {OUTER.map((node, index) => {
            const angle = (360 / OUTER.length) * index + 360 / (OUTER.length * 2);
            return (
              <g
                key={node.label}
                transform={`rotate(${angle} ${CX} ${CY}) translate(${CX} ${CY - R_OUTER})`}
              >
                {/* Dashed, so this layer sits behind the inner ring's solid
                    lines. Inner tiles are painted after, so they occlude
                    these where they cross, which gives the rings depth. */}
                <Spoke
                  from={TILE_OUTER / 2}
                  to={R_OUTER - CORE_R}
                  inbound={(index + phase) % 2 === 0}
                  reduced={Boolean(reduced)}
                  dashed
                />
                <g transform={`rotate(${-angle})`}>
                  <g className={reduced ? undefined : "orbit-counter-outer"}>
                    <rect
                      x={-TILE_OUTER / 2}
                      y={-TILE_OUTER / 2}
                      width={TILE_OUTER}
                      height={TILE_OUTER}
                      rx="4"
                      fill="var(--color-void)"
                      stroke="var(--color-ash)"
                      strokeOpacity="0.35"
                    />
                    {"text" in node && node.file ? (
                      /* An official asset from /public. <image> takes explicit
                         width and height, so unlike a nested <svg> it sizes
                         predictably inside the parent's coordinate system. */
                      <image
                        href={node.file}
                        x="-9"
                        y="-9"
                        width="18"
                        height="18"
                      />
                    ) : "text" in node ? (
                      <text
                        y="3"
                        textAnchor="middle"
                        fill="var(--color-ash)"
                        className="graphic-label"
                      >
                        {node.label}
                      </text>
                    ) : (
                      <g
                        transform={`translate(-9 -9) scale(${18 / 24})`}
                        opacity="0.85"
                      >
                        <path d={brandPath(node.icon)} fill={node.color} />
                      </g>
                    )}
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        {/* Inner ring, clockwise. */}
        <g
          className={reduced ? undefined : "orbit-spin"}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {INNER.map((node, index) => {
            const angle = (360 / INNER.length) * index;
            /* Local origin is the tile; after the translate the core lies at
               +R on this axis, so the spoke runs down from the tile's inner
               edge to the core's rim. */
            const inbound = (index + phase) % 2 === 0;

            return (
              <g
                key={node.label}
                transform={`rotate(${angle} ${CX} ${CY}) translate(${CX} ${CY - R_INNER})`}
              >
                <Spoke
                  from={TILE_INNER / 2}
                  to={R_INNER - CORE_R}
                  inbound={inbound}
                  reduced={Boolean(reduced)}
                />

                {/* Undo the placement rotation, then cancel the ring's turn,
                    so the tile is upright at every moment. */}
                <g transform={`rotate(${-angle})`}>
                  <g className={reduced ? undefined : "orbit-counter"}>
                    <rect
                      x={-TILE_INNER / 2}
                      y={-TILE_INNER / 2}
                      width={TILE_INNER}
                      height={TILE_INNER}
                      rx="4"
                      fill="var(--color-carbon)"
                      /* Border follows the direction currently on this spoke,
                         so a tile reads as sending or receiving. */
                      stroke={
                        inbound ? "var(--color-ember)" : "var(--color-ash)"
                      }
                      strokeOpacity={inbound ? 0.9 : 0.45}
                      className="transition-all duration-700"
                    />
                    {/* The 24-unit path, scaled and centred by hand. A nested
                        <svg> was tried and rendered at the parent's scale. */}
                    <g transform={`translate(-11 -11) scale(${22 / 24})`}>
                      <path d={brandPath(node.icon)} fill={node.color} />
                    </g>
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        <circle cx={CX} cy={CY} r="66" fill="url(#core-fill)" />
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
