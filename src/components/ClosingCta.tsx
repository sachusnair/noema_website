import { BookDemoButton } from "./BookDemoButton";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { closing } from "@/content/site";

export function ClosingCta() {
  return (
    <RailSection id="closing" className="pt-24 pb-28 lg:pt-32 lg:pb-36">
      <Reveal>
        <h2 className="type-display-l max-w-[14ch]">{closing.h2}</h2>
      </Reveal>

      <Reveal index={1}>
        <p className="mt-7 max-w-[52ch] text-step-3 text-bone/80">{closing.sub}</p>
      </Reveal>

      <Reveal index={2}>
        <div className="mt-10">
          <BookDemoButton label={closing.cta} />
        </div>
      </Reveal>
    </RailSection>
  );
}
