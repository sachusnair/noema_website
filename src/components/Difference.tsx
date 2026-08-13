import { BookDemoButton } from "./BookDemoButton";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { difference } from "@/content/site";

/* One morning lived twice, side by side.

   The two columns are deliberately unequal in weight. Before is set in ash
   with crossed marks and no times, so it reads as undifferentiated slog. After
   is bordered in ember and timestamped, so the same hours read as a sequence
   with somebody else doing the work. */
export function Difference() {
  return (
    <RailSection id="difference" className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{difference.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[20ch]">{difference.h2}</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal index={2}>
          <div className="flex h-full flex-col rounded-default border border-ash/40 p-6 lg:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ash/30 pb-4">
              <h3 className="type-mono text-ash">{difference.before.label}</h3>
              <span className="type-mono text-ash">
                {difference.before.meta}
              </span>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {difference.before.items.map((item) => (
                <li key={item.slice(0, 28)} className="flex gap-3.5">
                  {/* A typographic cross, not an icon font or an emoji. */}
                  <span
                    className="shrink-0 pt-0.5 text-step-2 text-ash"
                    aria-hidden="true"
                  >
                    &times;
                  </span>
                  <span className="text-step-2 leading-[1.55] text-ash">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal index={3}>
          <div className="flex h-full flex-col rounded-default border border-ember/50 bg-carbon p-6 lg:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ash/30 pb-4">
              <h3 className="type-mono text-ember">{difference.after.label}</h3>
              <span className="type-mono flex items-center gap-2 text-ember">
                <span className="alert-dot" aria-hidden="true" />
                {difference.after.meta}
              </span>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {difference.after.items.map((item) => (
                <li key={item.time} className="flex gap-3.5">
                  <span
                    className="shrink-0 pt-0.5 text-step-2 text-ember"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    <span className="type-mono mr-2 text-ember">
                      {item.time}
                    </span>
                    <span className="text-step-2 leading-[1.55] text-bone">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 border-t border-ash/30 pt-8">
        <Reveal index={4}>
          <p className="type-mono text-ash">{difference.closingLabel}</p>
        </Reveal>

        <Reveal index={5}>
          <p className="type-display-s mt-5 max-w-[22ch]">
            {difference.closing[0]}{" "}
            <span className="text-ember">{difference.closing[1]}</span>
          </p>
        </Reveal>

        <Reveal index={6}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="text-step-3 text-bone/80">
              {difference.ctaQuestion}
            </p>
            <BookDemoButton label={difference.ctaLabel} />
          </div>
        </Reveal>
      </div>
    </RailSection>
  );
}
