import Image from "next/image";
import { BrandMark, hasBrandMark } from "../BrandMark";
import { aboutPage, connections, type Tool } from "@/content/site";

/* The hero diagram: eight systems feeding one layer, which produces insights,
   decisions and actions.

   The sources are the real brand marks rather than category words, looked up
   in the connections rows so the artwork lives in one place. "Email, Finance,
   CRM" told a visitor nothing they could not guess; Outlook and Xero tell them
   the thing they actually want to know, which is whether their stack is on the
   list.

   Nothing here is still. A signal fires from each system in turn, its
   connector warms as the signal travels, the middle answers, and the three
   outputs light in sequence once the round is through. One pass takes eight
   seconds, which is slow enough to read as deliberate rather than busy.

   Built from bordered tiles, hairlines and one accent — not the glowing
   connectors the brief asked for, since glow is on the banned list. Movement
   carries the flow instead of light.

   The connector bands are SVG stretched with preserveAspectRatio="none". The
   lines are straight, so distorting them horizontally costs nothing and the
   whole thing stays fluid at any width without measuring anything. */

const ALL_TOOLS: readonly Tool[] = [...connections.rowA, ...connections.rowB];

function findTool(name: string): Tool | undefined {
  return ALL_TOOLS.find((tool) => tool.name === name);
}

function SourceTile({ tool, index }: { tool: Tool; index: number }) {
  return (
    <span
      style={{ ["--i" as string]: index }}
      className="flow-tile type-mono flex h-10 shrink-0 items-center gap-2.5 rounded-default border border-ash/45 px-4 text-ash"
    >
      {tool.file ? (
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
      {tool.name}
    </span>
  );
}

/** One band of converging hairlines. `from` is how many lines enter the top. */
function Converge({
  from,
  reverse = false,
  delayOffset = 0,
}: {
  from: number;
  reverse?: boolean;
  delayOffset?: number;
}) {
  // Evenly spaced along the top, all meeting the middle at the bottom.
  const xs = Array.from({ length: from }, (_, i) => ((i + 0.5) / from) * 100);
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-12 w-full"
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

export function SystemsFlow() {
  const { sources, centre, outputs, diagramLabel } = aboutPage.hero;
  const tools = sources
    .map(findTool)
    .filter((tool): tool is Tool => tool !== undefined);

  return (
    <figure>
      <div className="flex flex-wrap justify-center gap-2">
        {tools.map((tool, index) => (
          <SourceTile key={tool.name} tool={tool} index={index} />
        ))}
      </div>

      <Converge from={tools.length} />

      <div className="flex justify-center">
        <span className="flow-core type-mono flex h-12 items-center rounded-default border border-ember px-6 text-bone">
          {centre}
        </span>
      </div>

      <Converge from={outputs.length} reverse delayOffset={9} />

      <div className="flex flex-wrap justify-center gap-2">
        {outputs.map((output, index) => (
          <span
            key={output}
            style={{ ["--i" as string]: index + 9 }}
            className="flow-tile type-mono flex h-10 shrink-0 items-center rounded-default border border-ember/50 px-4 text-bone"
          >
            {output}
          </span>
        ))}
      </div>

      <figcaption className="sr-only">{diagramLabel}</figcaption>
    </figure>
  );
}
