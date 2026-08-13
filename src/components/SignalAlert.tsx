"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { alert as alertCopy } from "@/content/site";

/* The product name in the heading is a live control. A signal travels in from
   off-screen, lands on the word, and the word goes live with a marker. Press
   it and the alert Noema raised opens.

   It is the page demonstrating the claim in the heading rather than restating
   it: something happened, Noema caught it, and it is already handled.

   The figures in the dialog are illustrative. It carried a line saying so;
   that was removed on request. Pre-launch status is still stated in the FAQ,
   the trust section and the about page.

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
        {/* A counter badge, the one notification convention everybody already
            reads. The ping ripple runs a few times to catch the eye, then
            stops rather than pulsing forever. */}
          <span className="signal-badge" aria-hidden="true">
            <span className="signal-ping" />
            <span className="signal-count">1</span>
          </span>
          <span className="sr-only">
            {", "}
            {alertCopy.live}
            {". "}
            {alertCopy.trigger}
          </span>
        </button>
        {rest}
      </h2>

      {/* Says in words what the badge only hints at. The badge alone was too
          quiet for someone who has never seen this page before. */}
      <p
        data-phase={phase}
        className="signal-hint type-mono mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-ash"
      >
        <span>{alertCopy.hint}</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="type-mono cursor-pointer text-ember underline decoration-ember/40 underline-offset-4 transition-colors duration-200 hover:decoration-ember"
        >
          {alertCopy.hintCta} &rarr;
        </button>
      </p>

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
            <div className="flex items-center justify-between gap-4 border-b border-ash/30 px-6 py-4">
              <span className="type-mono flex items-center gap-2.5 text-ember">
                {/* A drawn marker rather than an emoji, which the palette and
                    the rest of the page hold to. */}
                <span className="alert-dot" aria-hidden="true" />
                {alertCopy.badge}
              </span>
              <button
                type="button"
                onClick={close}
                className="type-mono cursor-pointer text-ash transition-colors duration-200 hover:text-bone"
              >
                {alertCopy.close}
              </button>
            </div>

            <div className="px-6 py-6">
              <h2
                id="alert-headline"
                className="type-display-s max-w-[24ch] leading-[1.15]"
              >
                {alertCopy.headline}
              </h2>

              <p className="mt-5 max-w-[54ch] text-step-2 leading-[1.6] text-bone/80">
                {alertCopy.detail}
              </p>

              <div className="mt-7 border-t border-ash/30 pt-5">
                <p className="type-mono text-ash">{alertCopy.waitLabel}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {alertCopy.impact.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="type-mono shrink-0 pt-1 text-ember" aria-hidden="true">
                        /
                      </span>
                      <span className="text-step-2 text-bone">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The part that makes the point: it has already acted. */}
              <div className="mt-7 rounded-default border border-ember/40 px-5 py-4">
                <p className="type-mono text-ember">{alertCopy.actionLabel}</p>
                <p className="mt-2 text-step-2 leading-[1.6] text-bone">
                  {alertCopy.action}
                </p>
                <p className="type-mono mt-3 text-ash">{alertCopy.ready}</p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={close}
                  className="magnetic cursor-pointer rounded-default bg-ember px-6 py-3.5 text-step-2 font-medium text-void transition-colors duration-200 hover:bg-ember-hover"
                >
                  {alertCopy.primary}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="cursor-pointer rounded-default border border-ash px-6 py-3.5 text-step-2 transition-colors duration-200 hover:border-bone"
                >
                  {alertCopy.secondary}
                </button>
              </div>

              <p className="mt-6 max-w-[54ch] text-step-1 text-ash">
                {alertCopy.footnote}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
