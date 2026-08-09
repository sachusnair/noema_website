import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { connections } from "@/content/site";

function Tile({ name }: { name: string }) {
  return (
    <span className="type-mono mx-1.5 flex shrink-0 items-center rounded-default border border-ash/45 px-5 py-3.5 text-ash transition-colors duration-200 hover:border-bone hover:text-bone">
      {name}
    </span>
  );
}

function Row({
  names,
  direction,
  duration,
}: {
  names: readonly string[];
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
          {names.map((name) => (
            <Tile key={name} name={name} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {names.map((name) => (
            <Tile key={name} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Connections() {
  return (
    <RailSection id="connections" className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{connections.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[18ch]">{connections.h2}</h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-7 max-w-[56ch] text-step-3 text-bone/80">
          {connections.sub}
        </p>
      </Reveal>

      {/* Names are set in the utility font inside bordered tiles rather than
          using official brand logo files. That sidesteps trademark use and
          holds the palette, which a wall of brand colours would break. */}
      <div className="mt-14 flex flex-col gap-3">
        <Row names={connections.rowA} direction="left" duration="52s" />
        <Row names={connections.rowB} direction="right" duration="64s" />
      </div>

      <Reveal index={3}>
        <p className="mt-8 text-step-2 text-ash">{connections.honesty}</p>
      </Reveal>
    </RailSection>
  );
}
