"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { aboutPage } from "@/content/site";

/* The four principles, one at a time, advancing every three seconds and
   steppable by the arrows.

   Built on a native scroll-snap track rather than a transform, for one
   reason: with JavaScript off, a transform leaves three of the four
   principles parked off-screen and unreachable, while a scroll container can
   still be swiped or scrolled. The arrows are inert without script, but
   nothing the client wrote is lost.

   The arrows and the frame's border were removed on the client's instruction,
   so the dots below are the only manual control. They are real buttons and
   still reach every slide.

   Two restraints on the auto-advance, because a carousel that moves while you
   are reading it is the most reliably irritating thing on a web page: it stops
   while a pointer is over it or focus is inside it, and it does not run at all
   under prefers-reduced-motion, where the dots are the only way through. WCAG
   2.2.2 asks for a way to pause anything that moves for more than five
   seconds; hover and focus are that. */

const INTERVAL = 3000;

export function PrinciplesCarousel() {
  const { cards, goTo } = aboutPage.principles;
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // The track is the source of truth for position, so a swipe that the arrows
  // did not cause still updates the dots.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    if (width === 0) return;
    setIndex(Math.round(track.scrollLeft / width));
  }, []);

  /* Absolute move, for the dots. */
  const show = useCallback(
    (to: number) => {
      const track = trackRef.current;
      if (!track) return;
      const wrapped = (to + cards.length) % cards.length;
      track.scrollTo({
        left: wrapped * track.clientWidth,
        behavior: reduced ? "auto" : "smooth",
      });
      setIndex(wrapped);
    },
    [cards.length, reduced],
  );

  useEffect(() => {
    if (reduced || held) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.clientWidth;
      const current = width === 0 ? 0 : Math.round(track.scrollLeft / width);
      track.scrollTo({
        left: ((current + 1) % cards.length) * width,
        behavior: "smooth",
      });
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [cards.length, held, reduced]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
      aria-roledescription="carousel"
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {cards.map((card, n) => (
          <div
            key={card.step}
            role="group"
            aria-roledescription="slide"
            aria-label={`${n + 1} of ${cards.length}`}
            className="w-full shrink-0 snap-center px-2 py-10 lg:py-14"
          >
            {/* No measure cap on the heading: the frame lost its border and
                its arrows, so the type is what fills the width now. */}
            <div className="text-center">
              <p className="type-mono text-ember">{card.step}</p>
              <h3 className="type-display-l mt-6">{card.title}</h3>
              <p className="mx-auto mt-6 max-w-[60ch] text-step-4 leading-[1.5] text-bone/75">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {cards.map((card, n) => (
          <button
            key={card.step}
            type="button"
            aria-label={`${goTo} ${n + 1}`}
            aria-current={n === index}
            onClick={() => show(n)}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
              n === index ? "w-8 bg-ember" : "w-4 bg-ash/45 hover:bg-ash"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
