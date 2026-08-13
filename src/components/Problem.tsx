import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { problem } from "@/content/site";

/* No rail mark and no eyebrow on this section: the heading leads on its own. */
export function Problem() {
  return (
    <RailSection id="problem" className="py-24 lg:py-32">
      <Reveal>
        <h2 className="type-display-m max-w-[16ch]">{problem.h2}</h2>
      </Reveal>

      {/* One paragraph rather than the two columns and question row that were
          here: the heading now makes a claim, so the body backs it up in a
          single read instead of describing a problem. */}
      <Reveal index={1}>
        <p className="mt-8 max-w-[62ch] text-step-4 leading-[1.5] text-bone/80">
          {problem.body}
        </p>
      </Reveal>
    </RailSection>
  );
}
