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

/** The N mark, the same path as src/app/icon.svg, taking ember from the
 *  palette rather than carrying a hex of its own. */
function CoreMark({ label }: { label: string }) {
  return (
    <span className="flow-core flex size-16 items-center justify-center rounded-default border border-ember bg-void">
      <svg viewBox="0 0 32 32" role="img" aria-label={label} className="size-8 text-ember">
        <path
          d="M9 24V8l14 16V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
}

/* Each output says what it actually produces. "Insights" on its own is a word
   every product on earth claims; the example is the part a visitor can judge.
   Marked as an example on the page, because illustrative data that reads as a
   result someone got is a different thing entirely. */
function OutputCard({
  label,
  example,
  exampleLabel,
  index,
}: {
  label: string;
  example: string;
  exampleLabel: string;
  index: number;
}) {
  return (
    <span
      style={{ ["--i" as string]: index + 9 }}
      className="flow-tile flex h-full flex-col rounded-default border border-ember/50 bg-carbon p-5"
    >
      <span className="type-mono text-ember">{label}</span>
      <span className="type-mono mt-4 text-ash">{exampleLabel}</span>
      <span className="mt-1.5 text-step-2 leading-[1.5] text-bone">
        {example}
      </span>
    </span>
  );
}

export function SystemsFlow() {
  const { sources, centre, outputs, exampleLabel, diagramLabel, diagramCaption } =
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
              example={output.example}
              exampleLabel={exampleLabel}
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
              example={output.example}
              exampleLabel={exampleLabel}
              index={index}
            />
          ))}
        </div>
      </div>

      <figcaption className="type-mono mt-12 text-center text-ash">
        {diagramCaption}
        <span className="sr-only">{` ${diagramLabel}`}</span>
      </figcaption>
    </figure>
  );
}
