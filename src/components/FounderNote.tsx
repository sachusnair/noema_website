import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { founder } from "@/content/site";

/* Full bleed carbon, hairlined top and bottom so it separates from the void
   page without needing a second colour. This is the only place the founder's
   own background is used, and it is the only credibility asset the site has
   while pre-launch, so it is not repeated anywhere else. No portrait. */
export function FounderNote() {
  return (
    <div className="border-y border-ash/25 bg-carbon text-bone">
      <RailSection id="founder" className="py-24 lg:py-32">
        <Reveal>
          <p className="type-mono text-ember">{founder.eyebrow}</p>
        </Reveal>

        {founder.body.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} index={index + 1}>
            <p className="mt-8 max-w-[62ch] text-step-4 leading-[1.5]">
              {paragraph}
            </p>
          </Reveal>
        ))}

        <Reveal index={3}>
          <p className="type-mono mt-12 max-w-[62ch] border-t border-ash/30 pt-6 text-ash">
            {founder.signature}
          </p>
        </Reveal>
      </RailSection>
    </div>
  );
}
