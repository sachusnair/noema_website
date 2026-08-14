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
        // Tiles fade out at both ends so the loop has no visible seam.
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {/* The list is rendered twice so the translation can loop at -50%.
            The duplicate is hidden from assistive technology. */}
        <div className="flex">
          {tools.map((tool) => (
            <Tile key={tool.name} tool={tool} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {tools.map((tool) => (
            <Tile key={tool.name} tool={tool} />
          ))}
        </div>
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
        <h2 className="type-display-s mt-6 max-w-[26ch]">{h2}</h2>
      </Reveal>

      <Reveal index={index + 2}>
        <p className="mt-6 max-w-[62ch] text-step-3 leading-[1.6] text-bone/80">
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
        <h2 className="type-display-m mt-6 max-w-[20ch]">
          {connectorConsole.h2}
        </h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-7 max-w-[56ch] text-step-3 text-bone/80">
          {connectorConsole.sub}
        </p>
      </Reveal>

      <Reveal index={3} className="mt-12 max-w-[820px]">
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
        <Reveal index={3} className="mt-12 max-w-[820px]">
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
        <Reveal index={3} className="mt-12 max-w-[820px]">
          <DraftPanel />
        </Reveal>
      </div>

      <Reveal index={5}>
        <h3 className="type-display-s mt-24 border-t border-ash/30 pt-16 max-w-[18ch]">
          {connections.h2}
        </h3>
      </Reveal>

      <Reveal index={6}>
        <p className="mt-5 max-w-[56ch] text-step-2 text-bone/80">
          {connections.sub}
        </p>
      </Reveal>

      {/* Names are set in the utility font inside bordered tiles rather than
          using official brand logo files. That sidesteps trademark use and
          holds the palette, which a wall of brand colours would break. */}
      <div className="mt-10 flex flex-col gap-3">
        <Row tools={connections.rowA} direction="left" duration="52s" />
        <Row tools={connections.rowB} direction="right" duration="64s" />
      </div>

      <Reveal index={7}>
        <p className="mt-8 text-step-2 text-ash">{connections.honesty}</p>
      </Reveal>

      {/* The model layer, labelled separately. These are not systems a customer
          runs, so putting them in the rows above would make the heading claim
          something untrue. */}
      <Reveal index={8}>
        <p className="type-mono mt-16 text-ash">{connections.builtOnLabel}</p>
      </Reveal>

      <div className="mt-5">
        <Row tools={connections.rowC} direction="left" duration="46s" />
      </div>
    </RailSection>
  );
}
