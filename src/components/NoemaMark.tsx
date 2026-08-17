/* The N mark: a bone N with the ember full stop beside it, the same pairing as
   the "Noema." wordmark in the nav.

   The geometry lives here as numbers rather than only as a path string, because
   the /brand downloader redraws it on a canvas to export a PNG at any size.
   Rasterising the SVG instead would mean loading it as an image and would taint
   the canvas on some browsers.

   src/app/icon.svg carries the same coordinates. Next only accepts the favicon
   as a static file, so it cannot import from here. Change both together. */

/** Design grid. Every coordinate below is in these units. */
export const MARK_VIEWBOX = 32;

/** The N, as an outline traced clockwise from its top-left corner. */
export const MARK_N: readonly (readonly [number, number])[] = [
  [4.3, 7],
  [9.06, 7],
  [17.8, 20.5],
  [17.8, 7],
  [21.2, 7],
  [21.2, 25],
  [16.44, 25],
  [7.7, 11.5],
  [7.7, 25],
  [4.3, 25],
];

/** The full stop, sitting on the N's baseline. */
export const MARK_DOT = { cx: 25.35, cy: 22.65, r: 2.35 } as const;

/** The same outline as an SVG path, for anything drawing rather than filling. */
export const MARK_N_PATH =
  "M4.3 7H9.06L17.8 20.5V7H21.2V25H16.44L7.7 11.5V25H4.3Z";

export function NoemaMark({
  className = "size-8",
  background = true,
}: {
  className?: string;
  /* Off for a transparent mark, which needs a dark surface behind it to read.
     The bone N vanishes on white. */
  background?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX} ${MARK_VIEWBOX}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {background ? (
        <rect
          width={MARK_VIEWBOX}
          height={MARK_VIEWBOX}
          className="fill-void"
        />
      ) : null}
      <path d={MARK_N_PATH} className="fill-bone" />
      <circle
        cx={MARK_DOT.cx}
        cy={MARK_DOT.cy}
        r={MARK_DOT.r}
        className="fill-ember"
      />
    </svg>
  );
}
