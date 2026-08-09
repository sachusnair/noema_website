"use client";

import { useCallback, useState } from "react";
import { useMagnetic } from "./Sensor";
import { site } from "@/content/site";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLES = "https://assets.calendly.com/assets/external/widget.css";

/** Injected on first press, never on page load, so nothing third-party is
 *  requested until the visitor asks for the booking widget. */
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();

  if (!document.querySelector(`link[href="${CALENDLY_STYLES}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_STYLES;
    document.head.appendChild(link);
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT}"]`,
  );
  const script = existing ?? document.createElement("script");

  const ready = new Promise<void>((resolve, reject) => {
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("calendly")), {
      once: true,
    });
  });

  if (!existing) {
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }

  return ready;
}

type Variant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center rounded-default font-body font-medium text-step-2 px-6 py-3.5 transition-colors duration-200";

/* Ember is the only colour on the page that signals action, so the primary
   control is the one place it appears as a fill. Ash is never a button.
   The label sits in void rather than bone: black on orange is 8.1:1, where
   bone on orange would only reach 2.7:1. */
const variants: Record<Variant, string> = {
  primary: "bg-ember text-void hover:bg-ember-hover",
  outline: "border border-ash text-bone hover:border-ember hover:text-ember",
};

export function BookDemoButton({
  label,
  variant = "primary",
  className = "",
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const magnetic = useMagnetic<HTMLAnchorElement & HTMLButtonElement>();
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Noema demo")}`;

  const open = useCallback(async () => {
    if (!CALENDLY_URL) {
      window.location.href = mailto;
      return;
    }
    setBusy(true);
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
    } catch {
      window.location.href = mailto;
    } finally {
      setBusy(false);
    }
  }, [mailto]);

  // With the variable unset the control is a real mail link rather than a
  // button that behaves like one, so it keeps native link affordances.
  const { className: magneticClass, ...magneticProps } = magnetic;
  const classes = `${base} ${variants[variant]} ${magneticClass} ${className}`;

  if (!CALENDLY_URL) {
    return (
      <a href={mailto} className={classes} {...magneticProps}>
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      aria-busy={busy}
      className={classes}
      {...magneticProps}
    >
      {label}
    </button>
  );
}
