"use client";

import { useId, useRef, useState } from "react";
import { integrations, waitlist } from "@/content/site";

/* Single-field email capture for the hero. Posts to the same endpoint as the
   contact form, tagged with _subject so waiting list sign-ups are separable
   from enquiries without running a second form.

   Deliberately not a link to a third-party capture page: the whole point of
   asking here is that it costs the visitor one field and no navigation. */
type Status = "idle" | "sending" | "sent" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const baseId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(waitlist.invalidEmail);
      form.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }

    setError(null);
    setStatus("sending");
    data.set("_subject", "Noema waiting list signup");
    try {
      const response = await fetch(integrations.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  // Once someone is on the list, the field is replaced rather than re-offered.
  if (status === "sent") {
    return (
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="max-w-[42ch] rounded-default border border-ember/50 px-5 py-4 text-step-2 text-bone"
      >
        {waitlist.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[42ch]">
      {/* Honeypot: invisible to people, so anything filling it is a bot. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor={`${baseId}-website`}>Do not fill this in</label>
        <input
          id={`${baseId}-website`}
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor={`${baseId}-email`} className="sr-only">
        {waitlist.label}
      </label>

      {/* Field and button share one bordered row on desktop and stack on
          narrow screens, so the pair reads as a single control either way. */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${baseId}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={waitlist.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${baseId}-error` : undefined}
          className="min-w-0 flex-1 rounded-default border border-ash/50 bg-carbon px-4 py-3.5 text-step-2 text-bone transition-colors duration-200 placeholder:text-ash hover:border-ash focus:border-ember"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="magnetic shrink-0 cursor-pointer rounded-default bg-ember px-6 py-3.5 text-step-2 font-medium text-void transition-colors duration-200 hover:bg-ember-hover disabled:opacity-60"
        >
          {status === "sending" ? waitlist.sending : waitlist.submit}
        </button>
      </div>

      {error ? (
        <p id={`${baseId}-error`} className="type-mono mt-3 text-ember">
          {error}
        </p>
      ) : null}

      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-3 text-step-2 text-ember empty:mt-0"
      >
        {status === "error" ? waitlist.error : null}
      </p>
    </form>
  );
}
