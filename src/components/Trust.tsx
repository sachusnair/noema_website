import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { trust } from "@/content/site";

export function Trust() {
  return (
    <RailSection id="trust" className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{trust.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{trust.h2}</h2>
      </Reveal>

      {/* Each line is a commitment we are making, not a certification we hold.
          No badges, because none have been earned yet. */}
      <ul className="mt-14 grid grid-cols-1 gap-px border border-ash/40 bg-ash/40 md:grid-cols-2">
        {trust.commitments.map((commitment, index) => (
          <Reveal as="li" key={commitment} index={index} className="bg-void">
            <span className="block px-6 py-7 text-step-3 font-medium text-bone">
              {commitment}
            </span>
          </Reveal>
        ))}
      </ul>

      <Reveal index={4}>
        <p className="mt-8 max-w-[62ch] text-step-2 text-ash">
          {trust.honesty}
        </p>
      </Reveal>
    </RailSection>
  );
}
