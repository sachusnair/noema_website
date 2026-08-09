import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { problem, railTimes } from "@/content/site";

export function Problem() {
  return (
    <RailSection id="problem" time={railTimes.problem} className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{problem.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[16ch]">{problem.h2}</h2>
      </Reveal>

      <div className="grid-12 mt-12 gap-y-8">
        {problem.columns.map((column, index) => (
          <Reveal
            key={column.slice(0, 24)}
            index={index + 2}
            className="col-span-12 md:col-span-6"
          >
            <p className="max-w-[52ch] text-step-3 text-bone/80">{column}</p>
          </Reveal>
        ))}
      </div>

      {/* Deliberately questions, not numbers. There is no customer data to
          quote, so the row states what the operator is trying to find out. */}
      <div className="mt-16 grid grid-cols-2 gap-px border border-ash/40 bg-ash/40 lg:grid-cols-4">
        {problem.questions.map((question, index) => (
          <Reveal key={question} index={index} className="bg-void">
            <p className="type-mono px-5 py-6 text-ash">{question}</p>
          </Reveal>
        ))}
      </div>
    </RailSection>
  );
}
