import { SensorSurface } from "./Sensor";
import { stepTwo } from "@/content/site";

/* Step two, demonstrated: two systems stating different numbers for the same
   order, and the one answer Noema settles on.

   The two claims are shown as equals rather than one being flagged wrong, so
   the resolution below is doing visible work. */
export function ReconcilePanel() {
  return (
    <SensorSurface
      className="rounded-default border border-ash/45 bg-carbon"
      radius={320}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ash/40 px-5 py-3">
        <span className="type-mono text-ember">{stepTwo.panelLabel}</span>
        <span className="type-mono text-ash">{stepTwo.conflictLabel}</span>
      </div>

      <div className="px-5 py-6">
        {/* The disagreement. Side by side on desktop so the two figures sit
            level and the gap between them is the point. */}
        <div className="grid gap-4 sm:grid-cols-2">
          {stepTwo.claims.map((claim) => (
            <div
              key={claim.source}
              className="rounded-default border border-ash/40 px-4 py-4"
            >
              <p className="type-mono text-ash">{claim.source}</p>
              <p className="mt-3 text-step-5 leading-none">{claim.value}</p>
              <p className="mt-3 text-step-1 leading-[1.5] text-ash">
                {claim.line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-default border border-ember/50 px-4 py-4">
          <p className="type-mono text-ember">{stepTwo.resolvedLabel}</p>
          <p className="mt-2 max-w-[62ch] text-step-2 leading-[1.55] text-bone">
            {stepTwo.resolution}
          </p>
        </div>
      </div>
    </SensorSurface>
  );
}
