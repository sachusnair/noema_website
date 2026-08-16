import { aboutPage } from "@/content/site";

/* The hero diagram: eight systems feeding one layer, which produces insights,
   decisions and actions.

   Built from the page's own parts — bordered tiles, hairlines, one accent —
   rather than the glowing connectors the brief asked for, because glow is on
   the banned list. The flow is shown by a dash travelling along each line
   instead, which reads as movement without lighting anything up.

   The connector bands are SVG stretched with preserveAspectRatio="none". The
   lines are straight, so distorting them horizontally costs nothing and the
   whole thing stays fluid at any width without measuring anything.

   The tiles wrap on a narrow screen, which turns the fan into a vertical flow
   on their own. Nothing is hidden at any size. */

function Tile({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`type-mono flex h-10 shrink-0 items-center rounded-default border px-4 ${
        accent ? "border-ember/50 text-bone" : "border-ash/45 text-ash"
      }`}
    >
      {label}
    </span>
  );
}

/** One band of converging hairlines. `from` is how many lines enter the top. */
function Converge({ from, reverse = false }: { from: number; reverse?: boolean }) {
  // Evenly spaced along the top, all meeting the middle at the bottom.
  const xs = Array.from({ length: from }, (_, i) => ((i + 0.5) / from) * 100);
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-10 w-full"
    >
      {xs.map((x) => (
        <line
          key={x}
          x1={reverse ? 50 : x}
          y1="0"
          x2={reverse ? x : 50}
          y2="40"
          className="flow-line"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function SystemsFlow() {
  const { sources, centre, outputs, diagramLabel } = aboutPage.hero;

  return (
    <figure className="mt-0">
      <div className="flex flex-wrap justify-center gap-2">
        {sources.map((source) => (
          <Tile key={source} label={source} />
        ))}
      </div>

      <Converge from={sources.length} />

      <div className="flex justify-center">
        <span className="type-mono flex h-12 items-center rounded-default border border-ember px-6 text-bone">
          {centre}
        </span>
      </div>

      <Converge from={outputs.length} reverse />

      <div className="flex flex-wrap justify-center gap-2">
        {outputs.map((output) => (
          <Tile key={output} label={output} accent />
        ))}
      </div>

      <figcaption className="sr-only">{diagramLabel}</figcaption>
    </figure>
  );
}
