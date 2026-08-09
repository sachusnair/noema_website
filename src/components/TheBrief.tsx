import { BriefCard } from "./BriefCard";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { railTimes, theBrief } from "@/content/site";

export function TheBrief() {
  return (
    <RailSection id="the-brief" time={railTimes.theBrief} className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{theBrief.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{theBrief.h2}</h2>
      </Reveal>

      {/* Capped short of the full column: a brief that reads as one page has to
          look like a page, not a full-width table. */}
      <Reveal index={2} className="mt-12 max-w-[820px]">
        <BriefCard rows={5} expandable />
      </Reveal>

      <Reveal index={3}>
        <p className="mt-8 max-w-[58ch] text-step-3 text-bone/80">
          {theBrief.support}
        </p>
      </Reveal>
    </RailSection>
  );
}
