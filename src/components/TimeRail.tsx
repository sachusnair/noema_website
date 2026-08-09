import type { ReactNode } from "react";
import { RailHead } from "./Sensor";

type RailSectionProps = {
  id?: string;
  /** Position in the overnight cycle. Omitted below section 5, where the rail
   *  continues as a line but has no new boundary to mark. */
  time?: string;
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
  children,
  className = "",
}: RailSectionProps) {
  return (
    <section id={id} className={className}>
      <div className="shell">
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
