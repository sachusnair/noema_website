"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AlertCard } from "./AlertCard";
import { alert as alertCopy } from "@/content/site";

/* The notification Noema raised, dropping in under the nav a couple of seconds
   after the page settles.

   It opens on hover rather than on click: moving the pointer near it is enough.
   Pointer, keyboard and touch are all covered, because hover alone would leave
   the card unreachable on a phone and to anyone tabbing:

   - Pointer: entering opens it, leaving closes it after a short grace period
     so crossing a gap does not snap it shut mid-read
   - Keyboard: focus opens it, blur outside closes it, Escape closes it
   - Touch: there is no hover, so a tap opens it and pins it until dismissed */

const APPEAR_AFTER = 2600;
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

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), APPEAR_AFTER);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

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
      className="notification-root fixed top-[5.25rem] right-4 z-40 flex justify-end sm:right-6"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
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
          className="notification-card w-[min(92vw,26rem)] overflow-hidden rounded-default border border-ember/60 bg-carbon shadow-[0_1px_2px_rgba(8,23,46,0.06)]"
        >
          <AlertCard onDismiss={dismiss} headingId={headingId} />
        </div>
      ) : (
        <button
          type="button"
          // Tap has no hover, so it opens and pins until dismissed.
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
          <span className="flex flex-col">
            <span className="text-step-2 text-bone">{alertCopy.toastTitle}</span>
            <span className="type-mono text-ash">{alertCopy.toastHint}</span>
          </span>
        </button>
      )}
    </div>
  );
}
