"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookDemoButton } from "./BookDemoButton";
import { nav, site } from "@/content/site";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`type-display-s ${className}`}>
      {site.name}
      <span className="text-ember">.</span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // A section of the site counts as current for its own sub-routes, so a blog
  // post still marks Blog as the active tab.
  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // The overlay must close when a link navigates within the app, otherwise it
  // stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes, focus returns to the trigger, and focus is trapped in the
  // panel while it is open so the overlay is fully keyboard operable.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
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
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // Solid void rather than a translucent blur: the page background is void
    // anyway, and a frosted bar would read as glassmorphism.
    <header
      className={`sticky top-0 z-50 bg-void transition-colors duration-200 ${
        scrolled ? "border-b border-ash" : "border-b border-transparent"
      }`}
    >
      <div className="shell">
        <div className="flex h-18 items-center justify-between gap-6">
          {/* The wordmark is the route home from every page. */}
          <Link href="/" className="shrink-0" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={`text-step-2 transition-colors duration-200 hover:text-ember ${
                  isCurrent(link.href) ? "text-ember" : "text-bone/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <BookDemoButton label={nav.cta} className="py-2.5 text-step-1" />
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="type-mono text-ash lg:hidden"
          >
            {nav.menuOpen}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-void lg:hidden"
        >
          <div className="shell">
            <div className="flex h-18 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="type-mono text-ash"
              >
                {nav.menuClose}
              </button>
            </div>
          </div>

          <div className="shell flex flex-1 flex-col justify-center gap-8 pb-24">
            <nav aria-label="Primary" className="flex flex-col gap-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`type-display-s ${pathname === "/" ? "text-ember" : ""}`}
              >
                {nav.home}
              </Link>
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={`type-display-s ${
                    isCurrent(link.href) ? "text-ember" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <BookDemoButton label={nav.cta} className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
