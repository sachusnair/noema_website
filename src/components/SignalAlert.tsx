"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AlertCard } from "./AlertCard";
import { alert as alertCopy } from "@/content/site";

/* The product name in the heading is a live control. A signal travels in from
   off-screen, lands on the word, and the word goes live with a marker. Press
   it and the alert Noema raised opens.

   It is the page demonstrating the claim in the heading rather than restating
   it: something happened, Noema caught it, and it is already handled.

   The figures in the dialog are illustrative. It carried a line saying so;
   that was removed on request. Pre-launch status is still stated on the about
   page and in the connections section.

   Under prefers-reduced-motion the arrival is skipped and the word is simply
   live from the start, so the control is never hidden behind an animation. */

type Phase = "idle" | "arriving" | "live";

export function SignalAlert({
  lead,
  rest,
}: {
  lead: string;
  rest: string;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [open, setOpen] = useState(false);
  const wordRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Fires once, when the heading is actually on screen, so the arrival is not
  // spent above the fold before anyone has scrolled to it.
  useEffect(() => {
    if (reduced) {
      setPhase("live");
      return;
    }
    const node = wordRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase("arriving");
        window.setTimeout(() => setPhase("live"), 1400);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  // Escape closes, focus is trapped while open, and it returns to the word on
  // close, so the dialog is fully keyboard operable.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    wordRef.current?.focus();
  };

  return (
    <>
      <h2 className="type-display-m max-w-[16ch]">
        <button
          ref={wordRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-phase={phase}
          className="signal-word cursor-pointer"
        >
          <span className="signal-label">{lead}</span>
          <span className="sr-only">
            {", "}
            {alertCopy.live}
            {". "}
            {alertCopy.trigger}
          </span>
        </button>
        {rest}
      </h2>


      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
          {/* Backdrop. A plain wash, not a blur: the page bans frosted panels
              and a blur here would read as one. */}
          <button
            type="button"
            aria-label={alertCopy.close}
            onClick={close}
            className="absolute inset-0 cursor-default bg-void/80"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-headline"
            className="relative max-h-[90svh] w-full max-w-[38rem] overflow-y-auto rounded-default border border-ember/60 bg-carbon"
          >
            <AlertCard onDismiss={close} headingId="alert-headline" />
          </div>
        </div>
      ) : null}
    </>
  );
}
