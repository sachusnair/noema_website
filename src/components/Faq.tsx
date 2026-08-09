"use client";

import { useId, useState } from "react";
import { Reveal } from "./Reveal";
import { RailSection } from "./TimeRail";
import { faq } from "@/content/site";

/* A 1px plus that rotates to a minus. Built from two rules rather than an icon
   font or an emoji, so it inherits colour and stays at hairline weight. */
function Plus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative mt-2 block size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
    >
      <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
      <span className="absolute top-0 left-1/2 h-4 w-px bg-current" />
    </span>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <RailSection id="faq" className="py-24 lg:py-32">
      <Reveal>
        <p className="type-mono text-ash">{faq.eyebrow}</p>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-display-m mt-6">{faq.h2}</h2>
      </Reveal>

      <div className="mt-12 max-w-[820px] border-t border-ash/40">
        {faq.items.map((item, index) => {
          const isOpen = open === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div key={item.q} className="border-b border-ash/40">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  // One open at a time: opening a question closes the last.
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left text-step-4 font-medium text-bone transition-colors duration-200 hover:text-ember"
                >
                  <span>{item.q}</span>
                  <Plus open={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <p className="max-w-[62ch] pb-7 text-step-2 text-bone/80">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </RailSection>
  );
}
