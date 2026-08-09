import { BrandMark, hasBrandMark } from "./BrandMark";
import { ConnectorConsole } from "./ConnectorConsole";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { connections, connectorConsole, type Tool } from "@/content/site";

/* Mark in the brand's colour, wordmark in the page palette. Keeping the text
   neutral stops fourteen coloured wordmarks from turning the row into a
   ransom note, while the marks still read as the real logos. */
function Tile({ tool }: { tool: Tool }) {
  return (
    <span className="mx-1.5 flex shrink-0 items-center gap-2.5 rounded-default border border-ash/45 px-5 py-3.5 text-ash transition-colors duration-200 hover:border-bone hover:text-bone">
      {hasBrandMark(tool.icon) ? (
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

      <Reveal index={5}>
        <h3 className="type-display-s mt-20 max-w-[18ch]">{connections.h2}</h3>
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
    </RailSection>
  );
}
