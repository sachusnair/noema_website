import type { ReactNode } from "react";
import { RailHead } from "./Sensor";

type RailSectionProps = {
  id?: string;
  /** Position in the overnight cycle. Omitted below section 5, where the rail
   *  continues as a line but has no new boundary to mark. */
  time?: string;
  /** Makes the section claim the viewport below the nav and centre its
   *  content, so the first screen is deliberate rather than ending in dead
   *  space. Only from 1024px up: on a phone the content sets the height. */
  fill?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Every page section is wrapped in this so the rail is structural rather than
 * an overlay. Each section contributes one segment of the line; because the
 * sections are contiguous the segments read as a single rule down the page.
 */
export function RailSection({
  id,
  time,
  fill = false,
  children,
  className = "",
}: RailSectionProps) {
  return (
    <section
      id={id}
      className={`${className} ${
        fill ? "lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:items-center" : ""
      }`}
    >
      {/* w-full so the shell keeps its own width rules when the section
          becomes a flex container to centre it vertically. */}
      <div className="shell w-full">
        <div className="rail">
          <RailHead />
          {time ? (
            <span className="type-mono rail-mark" aria-hidden="true">
              {time}
            </span>
          ) : null}
          <div className="rail-body">{children}</div>
        </div>
      </div>
    </section>
  );
}
