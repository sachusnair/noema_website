"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AlertCard } from "./AlertCard";
import { alert as alertCopy } from "@/content/site";

/* The notification Noema raised, appearing just above the heading a couple of
   seconds after the section comes into view.

   It opens on hover rather than on click: moving the pointer near it is enough.
   Pointer, keyboard and touch are all covered, because hover alone would leave
   the card unreachable on a phone and to anyone tabbing:

   - Pointer: entering opens it, leaving closes it after a short grace period
     so crossing a gap does not snap it shut mid-read
   - Keyboard: focus opens it, blur outside closes it, Escape closes it
   - Touch: the hover handlers are not attached at all. Phones synthesise
     mouseenter and mouseleave from taps and from scrolls that begin on an
     element, which opened the card and shut it again on its own, so the pill
     appeared to vanish a second after arriving. A tap opens and pins it. */

const APPEAR_AFTER = 1800;
const CLOSE_GRACE = 260;

export function NotificationToast() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const [maxHeight, setMaxHeight] = useState<number>();
  const [canHover, setCanHover] = useState(false);

  /* Only a device with a real pointer gets the hover behaviour. Checked at
     runtime rather than by breakpoint, because a small window on a laptop
     still has a mouse and a large tablet still does not. */
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Held until the section is actually on screen, so the arrival is not spent
  // above the fold before anyone has scrolled down to it.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    let timer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setVisible(true), APPEAR_AFTER);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /* The card is anchored to the pill, so how much room it has depends on where
     the pill currently sits. A CSS cap cannot know that: on a 720px-high
     laptop the card ran 96px past the fold even with one set. Measured on open
     and on resize instead, so it can never extend below the viewport. */
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const top = rootRef.current?.getBoundingClientRect().top ?? 0;
      setMaxHeight(Math.max(240, window.innerHeight - top - 24));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  // Escape closes whether it was opened by pointer, focus or tap.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setPinned(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (dismissed) return null;

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeSoon = () => {
    if (pinned) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_GRACE);
  };

  const dismiss = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(false);
    setPinned(false);
    setDismissed(true);
  };

  return (
    <div
      ref={rootRef}
      data-visible={visible}
      data-reduced={reduced ? "true" : undefined}
      className="notification-root relative z-30 mb-5 inline-block"
      onMouseEnter={canHover ? openNow : undefined}
      onMouseLeave={canHover ? closeSoon : undefined}
      onFocus={openNow}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          closeSoon();
        }
      }}
    >
      {open ? (
        <div
          role="dialog"
          aria-labelledby={headingId}
          /* Overlaid rather than inline: expanding in flow would shove the
             heading down the page every time a pointer crossed it. */
          style={{ maxHeight }}
          className="notification-card absolute top-0 left-0 w-[min(92vw,46rem)] overflow-y-auto rounded-default border border-ember/60 bg-carbon shadow-[0_1px_2px_rgba(8,23,46,0.06)]"
        >
          <AlertCard onDismiss={dismiss} headingId={headingId} />
        </div>
      ) : (
        <button
          type="button"
          // Without hover this is the only way in, so it pins until dismissed.
          onClick={() => {
            setPinned(true);
            openNow();
          }}
          className="notification-pill flex cursor-pointer items-center gap-3 rounded-default border border-ember/60 bg-carbon py-2.5 pr-4 pl-3 text-left transition-colors duration-200 hover:border-ember"
        >
          <span className="notification-count" aria-hidden="true">
            <span className="notification-ping" />
            <span className="notification-number">1</span>
          </span>
          <span className="text-step-2 text-bone">{alertCopy.toastTitle}</span>
        </button>
      )}
    </div>
  );
}
