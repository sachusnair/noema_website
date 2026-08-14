import { SensorSurface } from "./Sensor";
import { stepThree } from "@/content/site";

/* Step three, demonstrated: an email that arrived, and the reply Noema wrote
   for it, with its own edits left visible.

   Struck text is what it cut, ember text is what it added from the systems it
   reads. Showing the working is the point: an operator will not approve a
   draft they cannot audit. Marked up with del and mark so the distinction
   survives without colour. */
export function DraftPanel() {
  return (
    <SensorSurface
      className="rounded-default border border-ash/45 bg-carbon"
      radius={320}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ash/40 px-5 py-3">
        <span className="type-mono text-ash">{stepThree.channel}</span>
        <span className="type-mono flex items-center gap-2 text-ember">
          <span className="alert-dot" aria-hidden="true" />
          {stepThree.status}
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="type-mono text-ash">
          {stepThree.fromLabel} · {stepThree.from}
        </p>
        <p className="mt-3 max-w-[62ch] rounded-default border border-ash/30 px-4 py-3 text-step-2 leading-[1.55] text-bone/80">
          {stepThree.incoming}
        </p>

        <div className="mt-6 rounded-default border border-ember/50 px-4 py-4">
          <p className="type-mono text-ember">{stepThree.draftLabel}</p>

          <p className="mt-3 max-w-[62ch] text-step-2 leading-[1.7]">
            {stepThree.draft.map((part) => {
              if (part.kind === "cut") {
                return (
                  <del
                    key={part.text}
                    className="text-ash decoration-ash/70"
                  >
                    {part.text}
                  </del>
                );
              }
              if (part.kind === "added") {
                return (
                  <mark
                    key={part.text}
                    className="bg-ember/15 text-ember decoration-ember/40 underline underline-offset-4"
                  >
                    {part.text}
                  </mark>
                );
              }
              return (
                <span key={part.text} className="text-bone">
                  {part.text}
                </span>
              );
            })}
          </p>

          <p className="type-mono mt-4 text-ash">{stepThree.ready}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-default bg-ember px-5 py-2.5 text-step-2 font-medium whitespace-nowrap text-void">
            {stepThree.primary}
          </span>
          <span className="rounded-default border border-ash px-5 py-2.5 text-step-2 whitespace-nowrap text-bone">
            {stepThree.secondary}
          </span>
          <span className="text-step-1 text-ash">{stepThree.footnote}</span>
        </div>
      </div>
    </SensorSurface>
  );
}
