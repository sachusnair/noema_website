"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { LinkedInMark } from "./LinkedInMark";
import { blog } from "@/content/site";

/* Share controls for a post.
 *
 * The three networks are ordinary links to each service's own share URL, so
 * they work with JavaScript off and open in a new tab. Only "copy link" needs
 * script, and it is a button rather than a link because it does not navigate.
 *
 * Instagram and YouTube are missing on purpose: neither accepts a shared URL
 * from the web. A tile that looked like the others and silently did nothing
 * would be worse than its absence.
 *
 * Marks carry their brand colours, matching the footer. */
export function ShareRow({ url, title }: { url: string; title: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [state]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      name: blog.share.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      colour: "#0A66C2",
      mark: <LinkedInMark />,
    },
    {
      name: blog.share.x,
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      colour: "#EDEDEA",
      mark: <BrandMark slug="x" className="size-4" />,
    },
    {
      name: blog.share.whatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      colour: "#25D366",
      mark: <BrandMark slug="whatsapp" className="size-4" />,
    },
  ];

  const tile =
    "flex size-10 items-center justify-center rounded-default border border-ash/50 transition-colors duration-200 hover:border-ember";

  const label =
    state === "copied"
      ? blog.share.copied
      : state === "failed"
        ? blog.share.copyFailed
        : blog.share.copy;

  /* The async clipboard API is the right one, but it is refused often enough
     to need a fallback: an embedded browser, an in-app webview, or a page the
     browser does not consider focused all reject it. The old selection-based
     copy still works in those places, so it is tried second, and the button
     says so plainly if both refuse rather than pretending it worked. */
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
      return;
    } catch {
      // Fall through to the older method below.
    }

    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    field.remove();

    setState(copied ? "copied" : "failed");
  }

  return (
    <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-ash/30 pt-8">
      <p className="type-mono text-ash">{blog.share.label}</p>

      <ul className="flex flex-wrap items-center gap-3">
        {targets.map((target) => (
          <li key={target.name}>
            <a
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className={tile}
              style={{ color: target.colour }}
            >
              {target.mark}
              <span className="sr-only">{target.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={copy}
        className="type-mono cursor-pointer rounded-default border border-ash/50 px-4 py-3 text-ash transition-colors duration-200 hover:border-ember hover:text-ember"
      >
        {label}
      </button>

      {/* Announced rather than only shown, so the outcome is not invisible to
          a screen reader. */}
      <span aria-live="polite" className="sr-only">
        {state === "idle" ? "" : label}
      </span>
    </div>
  );
}
