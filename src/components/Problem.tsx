import Link from "next/link";
import { Reveal } from "./Reveal";
import { SignalAlert } from "./SignalAlert";
import { RailSection } from "./TimeRail";
import { adapts, problem } from "@/content/site";

/* The claim and the objection it provokes, in one section rather than two.
   Split across a scroll break they left a 256px gap and used 60% of the
   available width; side by side they read as statement then reassurance and
   land on a single screen.

   No rail mark and no eyebrow: the heading leads on its own. */
export function Problem() {
  return (
    <RailSection id="problem" className="py-24 lg:py-32">
      <div className="grid-12 gap-y-16">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <SignalAlert lead={problem.h2Lead} rest={problem.h2Rest} />
          </Reveal>

          <Reveal index={1}>
            <p className="mt-8 max-w-[46ch] text-step-3 leading-[1.6] text-bone/80">
              {problem.body}
            </p>
          </Reveal>
        </div>

        {/* Hairline divider on desktop only, where the two sit side by side.
            Stacked on mobile they are separated by the gap instead. */}
        <div
          id="adapts"
          className="col-span-12 lg:col-span-6 lg:border-l lg:border-ash/30 lg:pl-12"
        >
          <Reveal index={2}>
            <h2 className="type-display-s max-w-[18ch] text-ember">
              {adapts.question}
            </h2>
          </Reveal>

          <Reveal index={3}>
            <p className="mt-6 max-w-[46ch] text-step-3 leading-[1.6] text-bone/80">
              <strong className="font-medium text-ember">
                {adapts.answer}
              </strong>{" "}
              {adapts.body}
            </p>
          </Reveal>

          <Reveal index={4}>
            <Link
              href={adapts.ctaHref}
              className="mt-7 inline-flex items-center gap-2 text-step-2 text-ember underline decoration-ember/40 underline-offset-4 transition-colors duration-200 hover:decoration-ember"
            >
              {adapts.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </RailSection>
  );
}
