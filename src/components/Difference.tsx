import { BookDemoButton } from "./BookDemoButton";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { difference } from "@/content/site";

/* One morning lived twice, side by side.

   The conclusion sits beside the heading rather than under the columns: the
   claim and its payoff read together at the top, and the two mornings below
   are the evidence. Stacked, the section ran to 1374px, so the payoff was two
   screens from the promise.

   The columns are deliberately unequal in weight. Before is ash, crossed, and
   carries no times, so it reads as undifferentiated slog. After is bordered in
   ember and timestamped, so the same hours read as a sequence with somebody
   else doing the work. */
export function Difference() {
  return (
    <RailSection id="difference" className="py-16 lg:py-20">
      <div className="grid-12 items-start gap-y-10">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <p className="type-mono text-ash">{difference.eyebrow}</p>
          </Reveal>

          <Reveal index={1}>
            <h2 className="type-display-s mt-4 max-w-[20ch]">{difference.h2}</h2>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:border-l lg:border-ash/30 lg:pl-10">
          {/* No eyebrow on this column: the heading opposite already labels
              the section, and a second one beside it read as a subheading for
              something that is really the answer to the first. */}
          <Reveal index={3}>
            <p className="type-display-s max-w-[24ch]">
              {difference.closing[0]}{" "}
              <span className="text-ember">{difference.closing[1]}</span>
            </p>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="text-step-2 text-bone/80">
                {difference.ctaQuestion}
              </p>
              <BookDemoButton label={difference.ctaLabel} />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal index={5}>
          <div className="flex h-full flex-col rounded-default border border-ash/40 p-5 lg:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ash/30 pb-3">
              <h3 className="type-mono text-ash">{difference.before.label}</h3>
              <span className="type-mono text-ash">
                {difference.before.meta}
              </span>
            </div>

            <ul className="mt-4 flex flex-col gap-2.5">
              {difference.before.items.map((item) => (
                <li key={item.slice(0, 28)} className="flex gap-3">
                  {/* A typographic cross, not an icon font or an emoji. */}
                  <span
                    className="shrink-0 pt-0.5 text-step-1 text-ash"
                    aria-hidden="true"
                  >
                    &times;
                  </span>
                  <span className="text-step-1 leading-[1.5] text-ash">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal index={6}>
          <div className="flex h-full flex-col rounded-default border border-ember/50 bg-carbon p-5 lg:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ash/30 pb-3">
              <h3 className="type-mono text-ember">{difference.after.label}</h3>
              <span className="type-mono flex items-center gap-2 text-ember">
                <span className="alert-dot" aria-hidden="true" />
                {difference.after.meta}
              </span>
            </div>

            <ul className="mt-4 flex flex-col gap-2.5">
              {difference.after.items.map((item) => (
                <li key={item.time} className="flex gap-3">
                  <span
                    className="shrink-0 pt-0.5 text-step-1 text-ember"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    <span className="type-mono mr-2 text-ember">
                      {item.time}
                    </span>
                    <span className="text-step-1 leading-[1.5] text-bone">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </RailSection>
  );
}
