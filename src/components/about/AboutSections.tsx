import Link from "next/link";
import { Reveal } from "../Reveal";
import { SystemsFlow } from "./SystemsFlow";
import { about, aboutPage } from "@/content/site";

/* The About page's sections, in the order the brief lays them out. They live
   in one file because they are one narrative and are never used anywhere else;
   splitting them across twelve files would only make the story harder to read.

   Every section is the same shape: a shell, generous vertical padding, an
   eyebrow, a heading, and then whatever the section is actually for. The
   rhythm is what makes the page feel deliberate — not the animations. */

const PRIMARY =
  "inline-flex items-center rounded-default bg-ember px-5 py-3 text-step-2 font-medium whitespace-nowrap text-void transition-colors duration-200 hover:bg-ember-hover";
const SECONDARY =
  "inline-flex items-center rounded-default border border-ash px-5 py-3 text-step-2 whitespace-nowrap transition-colors duration-200 hover:border-bone";

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-mono text-ember">{children}</p>;
}

/* ---------------------------------------------------------------- 1. Hero */

/* No buttons here, on the client's instruction. The page carries its calls to
   action at the end, where someone has read the argument, and the nav's "Book
   a demo" is on screen the whole way down regardless. */
export function AboutHero() {
  const { eyebrow, h1, sub } = aboutPage.hero;
  return (
    <Section className="pt-28 lg:pt-36">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal index={1}>
        <h1 className="type-display-l mt-6">{h1}</h1>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-8 max-w-[72ch] text-step-4 leading-[1.5] text-bone/80">
          {sub}
        </p>
      </Reveal>

      <Reveal index={3} className="mt-20">
        <SystemsFlow />
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------- 2. Problem */

export function AboutProblem() {
  const { h2, body, cards, statement } = aboutPage.problem;
  return (
    <Section className="bg-carbon">
      <Reveal>
        <h2 className="type-display-m max-w-[24ch]">{h2}</h2>
      </Reveal>

      <div className="mt-8 max-w-[72ch] space-y-4">
        {body.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 20)} index={index + 1}>
            <p className="text-step-3 leading-[1.6] text-bone/80">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal key={card.title} index={index + 3}>
            <div className="about-card h-full rounded-default border border-ash/40 p-7">
              <p className="type-mono text-ash">{card.title}</p>
              <p className="mt-4 text-step-3 leading-[1.5] text-bone">
                {card.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal index={6}>
        <p className="type-display-s mt-14 max-w-[30ch] border-t border-ash/30 pt-8">
          {statement}
        </p>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------------------------------------- 3. Why */

export function AboutWhy() {
  const { eyebrow, question, body, timeline, timelineLabel } = aboutPage.why;
  return (
    <Section>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal index={1}>
          <p className="type-display-s max-w-[22ch]">{question}</p>
        </Reveal>

        <div className="space-y-5">
          {body.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 20)} index={index + 2}>
              <p className="text-step-3 leading-[1.6] text-bone/80">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* The build loop, as a rail with a mark at each stage — the same line
          that runs down the home page, turned on its side. */}
      <Reveal index={4}>
        <ol
          aria-label={timelineLabel}
          className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-ash/30 pt-8"
        >
          {timeline.map((stage, index) => (
            <li key={stage} className="flex items-center gap-4">
              <span className="type-mono text-ash">
                <span className="text-ember">{`0${index + 1}`}</span> {stage}
              </span>
              {index < timeline.length - 1 ? (
                <span aria-hidden="true" className="h-px w-8 bg-ash/45" />
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

/* --------------------------------------------------------------- 4. Model */

export function AboutModel() {
  const { eyebrow, h2, centre, cards } = aboutPage.model;
  return (
    <Section className="bg-carbon">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{h2}</h2>
      </Reveal>

      <Reveal index={2}>
        <div className="mt-12 flex justify-center">
          <span className="type-mono flex h-12 items-center rounded-default border border-ember px-6 text-bone">
            {centre}
          </span>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <Reveal key={card.step} index={index + 3}>
            <div className="about-card h-full rounded-default border border-ash/40 bg-void p-8">
              <p className="type-mono text-ember">{card.step}</p>
              <h3 className="type-display-s mt-4">{card.title}</h3>
              <p className="mt-3 text-step-3 text-bone">{card.lead}</p>
              <p className="mt-3 text-step-2 leading-[1.6] text-bone/75">
                {card.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ 5. Contrast */

function Steps({
  title,
  steps,
  strong,
}: {
  title: string;
  steps: readonly string[];
  strong: boolean;
}) {
  return (
    <div
      /* Not h-full. The two columns hold three steps and five, and stretching
         the short one to match left a panel of empty black under it. Letting
         each end where its content ends is also the comparison's whole
         point. */
      className={`rounded-default border p-8 ${
        strong ? "border-ember/60 bg-carbon" : "border-ash/35"
      }`}
    >
      <p className={`type-mono ${strong ? "text-ember" : "text-ash"}`}>{title}</p>
      <ol className="mt-6 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step}>
            <span
              className={`block rounded-default border px-4 py-3 text-step-2 ${
                strong
                  ? "border-ash/45 text-bone"
                  : "border-ash/25 text-bone/60"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={`mx-auto mt-3 block h-3 w-px ${
                  strong ? "bg-ember/70" : "bg-ash/35"
                }`}
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AboutContrast() {
  const { h2, statement, body, left, right } = aboutPage.contrast;
  return (
    <Section>
      <Reveal>
        <h2 className="type-display-m max-w-[22ch]">{h2}</h2>
      </Reveal>

      <Reveal index={1}>
        <p className="type-display-s mt-8 max-w-[26ch] text-ember">{statement}</p>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-8 max-w-[72ch] text-step-3 leading-[1.6] text-bone/80">
          {body}
        </p>
      </Reveal>

      <div className="mt-14 grid items-start gap-4 lg:grid-cols-2">
        <Reveal index={3}>
          <Steps title={left.title} steps={left.steps} strong={false} />
        </Reveal>
        <Reveal index={4}>
          <Steps title={right.title} steps={right.steps} strong />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- 6. Work */

export function AboutWork() {
  const { eyebrow, h2, cards } = aboutPage.work;
  return (
    <Section className="bg-carbon">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[24ch]">{h2}</h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <Reveal key={card.title} index={index + 2}>
            <div className="about-card h-full rounded-default border border-ash/40 bg-void p-8">
              <h3 className="type-mono text-ash">{card.title}</h3>
              <p className="mt-4 text-step-3 leading-[1.55] text-bone">
                {card.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- 7. Founder */

export function AboutFounderStory() {
  const { eyebrow, h2, lead, body, cta } = aboutPage.founder;
  return (
    <Section id="founder">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal index={1}>
            <h2 className="type-display-m max-w-[20ch]">{h2}</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="type-display-s mt-6 text-ember">{lead}</p>
          </Reveal>
        </div>

        <div>
          <div className="space-y-5">
            {body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 20)} index={index + 3}>
                <p className="text-step-3 leading-[1.6] text-bone/80">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal index={6}>
            <Link href={cta.href} className={`${SECONDARY} mt-8`}>
              {cta.label}
              <span aria-hidden="true" className="ml-2">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- 8. Quote */

export function AboutQuote() {
  const { text, attribution } = aboutPage.quote;
  return (
    <Section className="bg-carbon">
      <Reveal>
        <figure>
          {/* The mark is drawn large and set in ember rather than dropped in
              as a glyph beside the text, so it reads as part of the layout. */}
          <span
            aria-hidden="true"
            className="type-display-l block leading-none text-ember"
          >
            &ldquo;
          </span>
          <blockquote className="type-display-s mt-2 max-w-[34ch] leading-[1.3]">
            {text}
          </blockquote>
          <figcaption className="type-mono mt-8 text-ash">
            {attribution}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------- 9. Principles */

export function AboutPrinciples() {
  const { eyebrow, h2, cards } = aboutPage.principles;
  return (
    <Section>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{h2}</h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-default border border-ash/35 bg-ash/35 md:grid-cols-2">
        {cards.map((card) => (
          <div key={card.step} className="bg-void p-8 lg:p-10">
            <p className="type-mono text-ember">{card.step}</p>
            <h3 className="type-display-s mt-5 max-w-[20ch]">{card.title}</h3>
            <p className="mt-3 max-w-[36ch] text-step-2 leading-[1.6] text-bone/75">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- 10. Vision */

export function AboutVision() {
  const { eyebrow, h2, body, statement } = aboutPage.vision;
  return (
    <section className="relative overflow-hidden bg-carbon py-24 lg:py-36">
      <span aria-hidden="true" className="vision-field" />
      <div className="shell relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal index={1}>
          <h2 className="type-display-l mt-6 max-w-[18ch]">{h2}</h2>
        </Reveal>

        <div className="mt-10 max-w-[62ch] space-y-5">
          {body.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 20)} index={index + 2}>
              <p className="text-step-4 leading-[1.5] text-bone/80">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal index={5}>
          <p className="type-display-m mt-14 text-ember">{statement}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 11. One line */

export function AboutOneLine() {
  const { eyebrow, statement } = aboutPage.oneLine;
  return (
    <Section className="py-28 lg:py-40">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal index={1}>
        <p className="type-display-m mt-8 max-w-[26ch]">{statement}</p>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- 12. Close */

export function AboutClose() {
  const { h2, second, sub, primary, secondary } = aboutPage.close;
  return (
    <Section className="bg-carbon">
      <Reveal>
        <h2 className="type-display-m max-w-[22ch]">{h2}</h2>
      </Reveal>

      <Reveal index={1}>
        <p className="type-display-m mt-2 max-w-[22ch] text-ember">{second}</p>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-8 max-w-[62ch] text-step-3 leading-[1.6] text-bone/80">
          {sub}
        </p>
      </Reveal>

      <Reveal index={3}>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={primary.href} className={PRIMARY}>
            {primary.label}
          </Link>
          <Link href={secondary.href} className={SECONDARY}>
            {secondary.label}
          </Link>
        </div>
      </Reveal>

      {/* Required pre-launch line. It belongs at the end of the page, where
          someone who has just read twelve sections of ambition meets the
          current state of things. Do not remove or soften it. */}
      <Reveal index={4}>
        <p className="mt-14 border-t border-ash/30 pt-6 text-step-2 text-ash">
          {about.honesty}
        </p>
      </Reveal>
    </Section>
  );
}
