import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { howItWorks, railTimes } from "@/content/site";

export function HowItWorks() {
  return (
    <RailSection
      id="how-it-works"
      time={railTimes.howItWorks}
      className="py-24 lg:py-32"
    >
      <Reveal>
        <p className="type-mono text-ash">{howItWorks.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[16ch]">{howItWorks.h2}</h2>
      </Reveal>

      {/* Marked with the real times of the overnight run rather than 01/02/03,
          so the list sits on the same clock as the rail beside it. */}
      <ol className="mt-14 border-t border-ash/40">
        {howItWorks.steps.map((step, index) => (
          <Reveal as="li" key={step.time} index={index}>
            <div className="grid-12 border-b border-ash/40 py-8 gap-y-2">
              <span className="type-mono col-span-12 text-ember md:col-span-2">
                {step.time}
              </span>
              <h3 className="col-span-12 text-step-4 font-medium text-bone md:col-span-4">
                {step.title}
              </h3>
              <p className="col-span-12 max-w-[52ch] text-step-2 text-bone/80 md:col-span-6">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </RailSection>
  );
}
