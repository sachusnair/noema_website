import { Reveal } from "./Reveal";
import { SensorSurface } from "./Sensor";
import { RailSection } from "./TimeRail";
import { notAChatbot, railTimes } from "@/content/site";

export function NotAChatbot() {
  return (
    <RailSection
      id="not-a-chatbot"
      time={railTimes.notAChatbot}
      className="py-24 lg:py-32"
    >
      <Reveal>
        <p className="type-mono text-ash">{notAChatbot.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6 max-w-[20ch]">{notAChatbot.h2}</h2>
      </Reveal>

      {/* No ticks, no crosses. The difference is carried by weight and colour:
          the left column recedes into ash on the page, the right sits in bone on
          a raised carbon card. */}
      <div className="grid-12 mt-14 gap-y-10">
        <Reveal index={2} className="col-span-12 md:col-span-6">
          <SensorSurface className="h-full rounded-default border border-ash/40 px-7 py-8">
            <h3 className="type-mono text-ash">{notAChatbot.left.title}</h3>
            <ul className="mt-6 space-y-3">
              {notAChatbot.left.points.map((point) => (
                <li key={point} className="text-step-3 text-ash">
                  {point}
                </li>
              ))}
            </ul>
          </SensorSurface>
        </Reveal>

        <Reveal index={3} className="col-span-12 md:col-span-6">
          <SensorSurface className="h-full rounded-default border border-ash/40 bg-carbon px-7 py-8 shadow-fine">
            <h3 className="type-mono text-ember">{notAChatbot.right.title}</h3>
            <ul className="mt-6 space-y-3">
              {notAChatbot.right.points.map((point) => (
                <li key={point} className="text-step-3 font-medium text-bone">
                  {point}
                </li>
              ))}
            </ul>
          </SensorSurface>
        </Reveal>
      </div>
    </RailSection>
  );
}
