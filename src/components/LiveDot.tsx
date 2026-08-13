"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* The status mark on the After column.

   It arrives ember, as though the issue is still being worked, then turns
   green and holds a slow flash once it is running. That is the same story the
   column tells: something appeared at 9:15, Noema handled it, the morning kept
   moving.

   It also settles a collision. The alert dialog uses an ember dot to mean
   "needs you"; this one used the identical mark to mean "everything is fine".
   Green is the only non-ember signal on the site and it means healthy.

   Under prefers-reduced-motion it is green from the start with no flash: the
   state is what matters, the transition is decoration. */
const TURNS_GREEN_AFTER = 1600;

export function LiveDot() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<"alert" | "live">("alert");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) {
      setState("live");
      return;
    }
    const node = ref.current;
    if (!node) return;
    let timer: number | undefined;

    // Held until the column is on screen, so the change is not spent before
    // anyone has scrolled to it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setState("live"), TURNS_GREEN_AFTER);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return <span ref={ref} className="live-dot" data-state={state} aria-hidden="true" />;
}
