import { BookDemoButton } from "./BookDemoButton";
import { BriefCard } from "./BriefCard";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { WaitlistForm } from "./WaitlistForm";
import { hero, railTimes, waitlist } from "@/content/site";

export function Hero() {
  return (
    <RailSection id="top" time={railTimes.hero} className="pt-14 pb-24 lg:pt-24 lg:pb-32">
      <div className="grid-12 items-start gap-y-14">
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

          <Reveal index={4}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="type-mono text-ash">{waitlist.or}</span>
              <BookDemoButton label={hero.primaryCta} />
              <a
                href={hero.secondaryHref}
                className="text-step-2 text-ember underline underline-offset-4 decoration-ember/40 transition-colors duration-200 hover:decoration-ember"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>

        {/* The card is the first thing the eye should land on after the
            headline, so it is given its own column rather than sitting under
            the copy on desktop. */}
        <div className="col-span-12 lg:col-span-6 lg:pl-6">
          <BriefCard animate />
        </div>
      </div>
    </RailSection>
  );
}
