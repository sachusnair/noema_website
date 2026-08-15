import Image from "next/image";
import { BrandMark, hasBrandMark } from "./BrandMark";
import { ConnectorConsole } from "./ConnectorConsole";
import { DraftPanel } from "./DraftPanel";
import { ReconcilePanel } from "./ReconcilePanel";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import {
  connections,
  connectorConsole,
  stepThree,
  stepTwo,
  type Tool,
} from "@/content/site";

/* Mark in the brand's colour, wordmark in the page palette. Keeping the text
   neutral stops fourteen coloured wordmarks from turning the row into a
   ransom note, while the marks still read as the real logos. */
function Tile({ tool }: { tool: Tool }) {
  return (
    <span className="mx-1.5 flex shrink-0 items-center gap-2.5 rounded-default border border-ash/45 px-5 py-3.5 text-ash transition-colors duration-200 hover:border-bone hover:text-bone">
      {tool.file ? (
        /* An official asset for a brand with no mark in simple-icons. Sized
           explicitly so it reserves its space and cannot shift the row. */
        <Image
          src={tool.file}
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0"
        />
      ) : hasBrandMark(tool.icon) ? (
        <span style={{ color: tool.brandColor }} className="flex">
          <BrandMark slug={tool.icon as string} className="size-4" />
        </span>
      ) : null}
      <span className="type-mono">{tool.name}</span>
    </span>
  );
}

/* min() so the ramp is 240px on a wide row but only a quarter of a narrow
   one, where a fixed 240px would swallow the middle. */
const MASK =
  "linear-gradient(to right, transparent, black min(240px, 25%), black calc(100% - min(240px, 25%)), transparent)";

function Row({
  tools,
  direction,
  duration,
}: {
  tools: readonly Tool[];
  direction: "left" | "right";
  duration: string;
}) {
  return (
    <div
      className="marquee overflow-hidden"
      style={{
        /* Tiles fade out at both ends so the loop has no visible seam. The
           ramp has to be wider than a tile, or a tile straddling the edge is
           still solid where the container cuts it and reads as a broken box
           rather than one on its way out. The widest tile is about 230px, so
           the ramp is 240px, easing off on a narrow screen where that would
           be most of the row. */
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {/* Four copies, and the translation loops at -50%, so one cycle is two
            copies. Two is what it takes: a single copy of the shorter rows is
            narrower than the content column, and the loop then carried a band
            of empty page across the row. Anything above half the column width
            per copy is safe. Only the first copy is exposed to assistive
            technology. */}
        {[0, 1, 2, 3].map((copy) => (
          <div className="flex" key={copy} aria-hidden={copy === 0 ? undefined : true}>
            {tools.map((tool) => (
              <Tile key={tool.name} tool={tool} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepHeading({
  step,
  eyebrow,
  h2,
  sub,
  index,
}: {
  step: string;
  eyebrow: string;
  h2: string;
  sub: string;
  index: number;
}) {
  return (
    <>
      <Reveal index={index}>
        <div className="flex items-baseline gap-5">
          <span
            className="type-display-m text-ember/35 tabular-nums"
            aria-hidden="true"
          >
            {step}
          </span>
          <p className="type-mono text-ash">{eyebrow}</p>
        </div>
      </Reveal>

      <Reveal index={index + 1}>
        <h2 className="type-display-m mt-6">{h2}</h2>
      </Reveal>

      <Reveal index={index + 2}>
        <p className="mt-6 max-w-[72ch] text-step-3 leading-[1.6] text-bone/80">
          {sub}
        </p>
      </Reveal>
    </>
  );
}

export function Connections() {
  return (
    <RailSection id="connections" className="py-24 lg:py-32">
      {/* The step number is set large and hollow beside the heading so the
          section reads as the first thing that happens, not as a feature. */}
      <Reveal>
        <div className="flex items-baseline gap-5">
          <span
            className="type-display-m text-ember/35 tabular-nums"
            aria-hidden="true"
          >
            {connectorConsole.step}
          </span>
          <p className="type-mono text-ash">{connectorConsole.eyebrow}</p>
        </div>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{connectorConsole.h2}</h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-7 max-w-[72ch] text-step-3 text-bone/80">
          {connectorConsole.sub}
        </p>
      </Reveal>

      <Reveal index={3} className="mt-12">
        <ConnectorConsole />
      </Reveal>

      <Reveal index={4}>
        <p className="mt-6 text-step-2 text-ash">{connectorConsole.honesty}</p>
      </Reveal>

      {/* Steps two and three, same shape as the first. */}
      <div className="mt-24 border-t border-ash/30 pt-16">
        <StepHeading
          step={stepTwo.step}
          eyebrow={stepTwo.eyebrow}
          h2={stepTwo.h2}
          sub={stepTwo.sub}
          index={0}
        />
        <Reveal index={3} className="mt-12">
          <ReconcilePanel />
        </Reveal>
        <Reveal index={4}>
          <p className="mt-6 text-step-2 text-ash">{stepTwo.honesty}</p>
        </Reveal>
      </div>

      <div className="mt-24 border-t border-ash/30 pt-16">
        <StepHeading
          step={stepThree.step}
          eyebrow={stepThree.eyebrow}
          h2={stepThree.h2}
          sub={stepThree.sub}
          index={0}
        />
        <Reveal index={3} className="mt-12">
          <DraftPanel />
        </Reveal>
      </div>

      <Reveal index={5}>
        <h3 className="type-display-s mt-24 border-t border-ash/30 pt-16">
          {connections.h2}
        </h3>
      </Reveal>

      <Reveal index={6}>
        <p className="mt-5 max-w-[72ch] text-step-2 text-bone/80">
          {connections.sub}
        </p>
      </Reveal>

      {/* Each tile pairs the brand's own mark with its name set in the utility
          font. Colouring the mark but not the name holds the palette, which a
          row of fourteen coloured wordmarks would break. */}
      {/* Durations differ because the rows do. The loop runs to -50% of the
          track, so a row travels its own two-copy cycle in whatever time it is
          given, and equal durations read as unequal speed: the middle row is
          the longest and visibly outran the other two. Each duration below is
          that row's cycle divided by a shared 27px per second, so all three
          move at one pace. Re-measure the cycle if a row's tools change. */}
      {/* Three rows on one stack. The third used to sit apart under a "Built
          on" label because it is the model layer rather than systems a
          customer runs; that label was dropped on the client's instruction, so
          the row now reads as part of the same claim as the two above it. */}
      <div className="mt-10 flex flex-col gap-3">
        {/* 1378px cycle */}
        <Row tools={connections.rowA} direction="left" duration="51s" />
        {/* 2470px cycle */}
        <Row tools={connections.rowB} direction="right" duration="91s" />
        {/* 1792px cycle */}
        <Row tools={connections.rowC} direction="left" duration="66s" />
      </div>
    </RailSection>
  );
}
