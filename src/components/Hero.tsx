import { OvernightGraphic } from "./OvernightGraphic";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { WaitlistForm } from "./WaitlistForm";
import { hero } from "@/content/site";

/* No timestamp on the hero. The rail still runs down the page, but the mark sat
   level with the eyebrow and read as a stray number beside the headline. The
   overnight cycle is picked up from the next section down. */
export function Hero() {
  return (
    <RailSection id="top" fill className="pt-14 pb-24 lg:py-16">
      {/* items-center rather than items-start: the graphic is taller than the
          text column, and aligning to the top left the copy stranded high. */}
      <div className="grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <p className="type-mono text-ash">{hero.eyebrow}</p>
          </Reveal>

          <Reveal index={1}>
            <h1 className="type-display-l mt-6 max-w-[13ch] text-balance">
              {hero.h1}
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-7 max-w-[46ch] text-step-3 text-bone/80">{hero.sub}</p>
          </Reveal>

          {/* Email first, demo second. Joining the list costs one field, so it
              is the lower-commitment ask and leads; the demo stays available
              for anyone ready to talk now. */}
          <Reveal index={3}>
            <div className="mt-9">
              <WaitlistForm />
            </div>
          </Reveal>

        </div>

        {/* The graphic replaces the brief card here. The card itself still
            carries the product in section 4, where it has room for five rows
            and the evidence trail. */}
        {/* Capped so the graphic sits level with the text column rather than
            running past it and unbalancing the row. */}
        <div className="col-span-12 lg:col-span-6 lg:pl-6">
          <div className="mx-auto w-full max-w-[30rem]">
            <OvernightGraphic />
          </div>
        </div>
      </div>
    </RailSection>
  );
}
