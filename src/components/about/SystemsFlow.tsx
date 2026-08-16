import Image from "next/image";
import { BrandMark, hasBrandMark } from "../BrandMark";
import { aboutPage, connections, type Tool } from "@/content/site";

/* The hero diagram: the systems a business runs, feeding one layer, which
   gives back insights, decisions and actions.

   The geometry is the thing to understand before changing anything here. The
   connector lines are drawn in an SVG that spaces its endpoints evenly across
   the full width — line i ends at (i + 0.5) / n. So the tiles have to sit on
   that same grid or the lines point at nothing. An earlier version centred the
   tiles in a flex row at their natural widths, and the outer output tiles
   ended up 24% of the figure away from their own connectors: only the middle
   one ever joined up. Both rows are equal-column grids now, which is what
   makes the endpoints land on the tiles by construction rather than by luck.

   Keep it that way. If a row stops being an n-column grid, its lines stop
   connecting, and it is the kind of wrong that looks fine in a screenshot.

   Below lg the whole thing stacks: eight columns cannot hold a logo each on a
   phone, so the fan becomes a vertical flow with one line down the middle.

   Nothing is still. A signal fires from each system in turn, its connector
   warms as it travels, the middle beats on arrival, and the outputs light once
   the round is through. Movement carries the flow rather than glow, which the
   brief bans. */

const ALL_TOOLS: readonly Tool[] = [...connections.rowA, ...connections.rowB];

function findTool(name: string): Tool | undefined {
  return ALL_TOOLS.find((tool) => tool.name === name);
}

/** The brand's own mark, or nothing if the set has no mark for it. */
function Mark({ tool }: { tool: Tool }) {
  if (tool.file) {
    return (
      <Image
        src={tool.file}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
    );
  }
  if (hasBrandMark(tool.icon)) {
    return (
      <span style={{ color: tool.brandColor }} className="flex">
        <BrandMark slug={tool.icon as string} className="size-5" />
      </span>
    );
  }
  return null;
}

/* On the wide diagram the tile is the mark alone: eight names will not fit
   across one row, and a row of logos is what a visitor scans for anyway. The
   name is still there for a screen reader, and appears under the tile on
   hover. */
function LogoTile({ tool, index }: { tool: Tool; index: number }) {
  return (
    <span
      style={{ ["--i" as string]: index }}
      className="group relative flex justify-self-center"
    >
      <span className="flow-tile flex size-14 items-center justify-center rounded-default border border-ash/45">
        <Mark tool={tool} />
      </span>
      <span className="sr-only">{tool.name}</span>
      <span
        aria-hidden="true"
        className="type-mono pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-ash opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {tool.name}
      </span>
    </span>
  );
}

/** One band of converging hairlines, endpoints on the n-column grid. */
function Converge({
  from,
  reverse = false,
  delayOffset = 0,
}: {
  from: number;
  reverse?: boolean;
  delayOffset?: number;
}) {
  const xs = Array.from({ length: from }, (_, i) => ((i + 0.5) / from) * 100);
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-14 w-full"
    >
      {xs.map((x, index) => (
        <line
          key={x}
          x1={reverse ? 50 : x}
          y1="0"
          x2={reverse ? x : 50}
          y2="40"
          className="flow-line"
          style={{ ["--i" as string]: index + delayOffset }}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* The full wordmark in bone, on the client's instruction — it replaced the N
   glyph, which was too small and too dim to hold the middle of the diagram.
   Set as type rather than as brand/noema-wordmark-light.png, since that PNG is
   generated from this same Poppins file: drawing it keeps it sharp at any size
   and takes ember from the palette.

   Being wider does not disturb the connectors: they converge on the middle of
   the row, and this sits centred in it. */
function CoreMark({ label }: { label: string }) {
  return (
    <span className="flow-core flex items-center rounded-default border border-ember bg-void px-7 py-4">
      <span className="type-display-s text-bone">
        {label}
        <span className="text-ember">.</span>
      </span>
    </span>
  );
}

/* `--arrive` is when this card's connector pulse lands, in seconds into the
   diagram's 8s round. The output connectors carry --i of 9, 10 and 11 and fire
   at --i * 0.4s, and the pulse takes about 1.1s to cross, so the three land at
   roughly 4.7s, 5.1s and 5.5s. The rotator swaps its line on that beat. */
function OutputCard({
  label,
  lines,
  index,
}: {
  label: string;
  lines: readonly string[];
  index: number;
}) {
  const arrive = 4.7 + index * 0.4;
  return (
    <span
      style={{ ["--i" as string]: index + 9 }}
      className="flow-tile flex h-full flex-col rounded-default border border-ember/50 bg-carbon p-5"
    >
      <span className="type-mono text-ember">{label}</span>

      {/* The three share one grid cell, so the card is as tall as the longest
          line and holds still while they swap. */}
      <span className="rotator mt-4" style={{ ["--arrive" as string]: arrive }}>
        {lines.map((line, n) => (
          <span
            key={line}
            style={{ ["--n" as string]: n }}
            className="text-step-2 leading-[1.5] text-bone"
          >
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}

export function SystemsFlow() {
  const { sources, centre, outputs, diagramLabel, diagramCaption } =
    aboutPage.hero;
  const tools = sources
    .map(findTool)
    .filter((tool): tool is Tool => tool !== undefined);

  return (
    <figure>
      {/* Wide: the fan. Both rows are equal-column grids so the connector
          endpoints land on the tiles. */}
      <div className="hidden lg:block">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${tools.length}, minmax(0, 1fr))`,
          }}
        >
          {tools.map((tool, index) => (
            <LogoTile key={tool.name} tool={tool} index={index} />
          ))}
        </div>

        <Converge from={tools.length} />

        <div className="flex justify-center">
          <CoreMark label={centre} />
        </div>

        <Converge from={outputs.length} reverse delayOffset={9} />

        <div
          className="grid items-stretch gap-3"
          style={{
            gridTemplateColumns: `repeat(${outputs.length}, minmax(0, 1fr))`,
          }}
        >
          {outputs.map((output, index) => (
            <OutputCard
              key={output.label}
              label={output.label}
              lines={output.lines}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Narrow: the same story as a vertical flow. Names are shown here,
          since there is room down the page even when there is none across
          it. */}
      <div className="lg:hidden">
        <div className="flex flex-wrap justify-center gap-2">
          {tools.map((tool, index) => (
            <span
              key={tool.name}
              style={{ ["--i" as string]: index }}
              className="flow-tile type-mono flex h-10 shrink-0 items-center gap-2.5 rounded-default border border-ash/45 px-3 text-ash"
            >
              <Mark tool={tool} />
              {tool.name}
            </span>
          ))}
        </div>

        <span aria-hidden="true" className="mx-auto my-5 block h-10 w-px bg-ash/45" />

        <div className="flex justify-center">
          <CoreMark label={centre} />
        </div>

        <span aria-hidden="true" className="mx-auto my-5 block h-10 w-px bg-ash/45" />

        <div className="grid gap-3">
          {outputs.map((output, index) => (
            <OutputCard
              key={output.label}
              label={output.label}
              lines={output.lines}
              index={index}
            />
          ))}
        </div>
      </div>

      <figcaption className="type-mono mt-10 text-center text-ash">
        {diagramCaption}
        <span className="sr-only">{` ${diagramLabel}`}</span>
      </figcaption>
    </figure>
  );
}
