import Image from "next/image";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { founder } from "@/content/site";

/* Full bleed carbon, hairlined top and bottom so it separates from the void
   page without needing a second colour. This is the only place the founder's
   own background is used, and it is the only credibility asset the site has
   while pre-launch, so it is not repeated anywhere else.

   Portrait and profile link are optional: with both unset the block renders as
   a plain note, which is what it was before they existed. */
export function FounderNote() {
  const { portrait, linkedIn } = founder;

  return (
    <div className="border-y border-ash/25 bg-carbon text-bone">
      <RailSection id="founder" className="py-24 lg:py-32">
        <Reveal>
          <p className="type-mono text-ember">{founder.eyebrow}</p>
        </Reveal>

        <div
          className={
            portrait
              ? "mt-10 flex flex-col gap-10 md:flex-row md:items-start md:gap-14"
              : ""
          }
        >
          {portrait ? (
            <Reveal index={1} className="shrink-0">
              {/* next/image with images.unoptimized set for the static export,
                  so this emits a plain tag with no runtime optimiser. Width and
                  height are explicit, so the circle reserves its space and the
                  page does not shift when the file loads. */}
              {/* The circle is the container so the zoom happens inside it.
                  The face sits high and left of centre in the source, so the
                  image is scaled up and nudged down and right to bring it to
                  the middle of the frame. */}
              <div className="size-[220px] overflow-hidden rounded-full border border-ash/40 lg:size-[260px]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  priority
                  className="size-full origin-center scale-[1.22] translate-x-[4%] translate-y-[9%] object-cover"
                />
              </div>
            </Reveal>
          ) : null}

          <div className="min-w-0">
            <Reveal index={2}>
              <h3 className="type-display-s">{founder.name}</h3>
              <p className="type-mono mt-2 text-ash">{founder.role}</p>
            </Reveal>

            {/* The opening line carries the weight; the rest drops to reading
                size, because six paragraphs at display scale is a wall. */}
            <Reveal index={3}>
              <p className="mt-8 max-w-[52ch] text-step-4 leading-[1.4]">
                {founder.lead}
              </p>
            </Reveal>

            {founder.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} index={index + 4}>
                <p className="mt-5 max-w-[62ch] text-step-3 leading-[1.6] text-bone/85">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal index={9}>
              <p className="type-mono mt-12 max-w-[62ch] border-t border-ash/30 pt-6 text-ash">
                {founder.signature}
              </p>
            </Reveal>

            {linkedIn ? (
              <Reveal index={10}>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-default border border-ash px-6 py-3.5 text-step-2 font-medium transition-colors duration-200 hover:border-ember hover:text-ember"
                >
                  {founder.linkedInLabel}
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </Reveal>
            ) : null}
          </div>
        </div>
      </RailSection>
    </div>
  );
}
