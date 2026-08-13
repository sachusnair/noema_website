import Link from "next/link";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { adapts } from "@/content/site";

/* Question and answer, both in ember. This is the one place on the page where
   the accent carries type rather than marking an action, which is what makes
   the answer land. */
export function Adapts() {
  return (
    <RailSection id="adapts" className="py-24 lg:py-32">
      <Reveal>
        <h2 className="type-display-m max-w-[18ch] text-ember">
          {adapts.question}
        </h2>
      </Reveal>

      <Reveal index={1}>
        <p className="mt-8 max-w-[62ch] text-step-4 leading-[1.5] text-bone/80">
          <strong className="font-medium text-ember">{adapts.answer}</strong>{" "}
          {adapts.body}
        </p>
      </Reveal>

      <Reveal index={2}>
        <Link
          href={adapts.ctaHref}
          className="mt-8 inline-flex items-center gap-2 text-step-3 text-ember underline decoration-ember/40 underline-offset-4 transition-colors duration-200 hover:decoration-ember"
        >
          {adapts.ctaLabel}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </Reveal>
    </RailSection>
  );
}
