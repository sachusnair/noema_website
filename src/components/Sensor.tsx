"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/* The page should feel like an instrument that notices you rather than a
   poster. Three pointer- and scroll-reactive behaviours do that work, all of
   them cheap (transform, opacity and two custom properties) and all of them
   switched off under prefers-reduced-motion or on a coarse pointer, where
   there is no cursor to react to. */

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * Lights the edge of a bordered surface nearest the cursor in ember.
 * The border itself is painted with a gradient masked to the 1px frame, so
 * nothing blurs or glows: the panel simply registers where you are.
 */
export function SensorSurface({
  children,
  className = "",
  radius = 220,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  return (
    <div
      ref={ref}
      className={`sensor ${className}`}
      style={{ ["--sensor-radius" as string]: `${radius}px` }}
      onPointerMove={
        active
          ? (event) => {
              const node = ref.current;
              if (!node) return;
              const box = node.getBoundingClientRect();
              node.style.setProperty("--sx", `${event.clientX - box.left}px`);
              node.style.setProperty("--sy", `${event.clientY - box.top}px`);
              node.dataset.sensing = "true";
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              delete ref.current?.dataset.sensing;
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/**
 * The read head on the time rail. A short ember segment pinned partway down
 * the viewport, so as you scroll it travels the length of each section's rail
 * line and parks at the boundary. It is the overnight run advancing, which is
 * what the rail is measuring in the first place.
 *
 * Position comes from CSS sticky rather than a scroll listener, so it stays
 * exactly in step with the scroll and costs nothing per frame.
 */
export function RailHead() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="rail-head-track" aria-hidden="true">
      <span className="rail-head" />
    </div>
  );
}

/**
 * Pulls a control a few pixels toward the cursor as it approaches. Small
 * enough that it reads as responsiveness rather than a trick, and it never
 * moves far enough to make the target harder to hit.
 *
 * Returned as props to spread onto the control itself rather than a wrapper,
 * so the button keeps its own box and its own classes.
 */
export function useMagnetic<T extends HTMLElement>(strength = 6) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  if (!active) return { ref, className: "" };

  return {
    ref,
    className: "magnetic",
    onPointerMove: (event: { clientX: number; clientY: number }) => {
      const node = ref.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
      const dy = (event.clientY - (box.top + box.height / 2)) / box.height;
      node.style.transform = `translate3d(${dx * strength * 2}px, ${dy * strength * 2}px, 0)`;
    },
    onPointerLeave: () => {
      if (ref.current) ref.current.style.transform = "";
    },
  };
}

/**
 * Marks the nav link whose section is currently on screen. Uses an observer
 * rather than a scroll handler so it does no work while the page is still.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onScreen.length) setActive(onScreen[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
