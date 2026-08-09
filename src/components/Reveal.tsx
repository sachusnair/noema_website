"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Index within a group. Each step adds the 60ms stagger. */
  index?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * The only scroll behaviour on the page: 16px rise, opacity 0 to 1, 400ms,
 * fired once. Reduced motion skips straight to the resolved state, and with
 * JavaScript off the noscript rule in layout.tsx does the same, which is why
 * every instance carries data-reveal.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();

  // A plain element, not a motion one. Swapping the element type forces React
  // to remount, which discards the opacity:0 that framer-motion wrote into the
  // server HTML instead of leaving it to be animated away.
  if (reduced) {
    return createElement(as, { "data-reveal": true, className }, children);
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
    >
      {children}
    </MotionTag>
  );
}
