"use client";

import { useId, useRef, useState } from "react";
import { contact, integrations, site } from "@/content/site";

/* Posts to a form service over fetch, so the page stays a static export with
   no backend of our own. The endpoint is public by design: it only accepts
   submissions, and the service holds the inbox.

   With the variable unset the form is not rendered at all and the page falls
   back to the email address, rather than showing inputs that quietly discard
   what a visitor types. */
const ENDPOINT = integrations.formEndpoint;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const FIELD_CLASS =
  "mt-2 w-full rounded-default border border-ash/50 bg-carbon px-4 py-3 text-step-2 text-bone transition-colors duration-200 placeholder:text-ash hover:border-ash focus:border-ember";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const baseId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);

  if (!ENDPOINT) {
    return (
      <p className="max-w-[52ch] rounded-default border border-ash/40 p-6 text-step-2 text-ash">
        {contact.form.error}
      </p>
    );
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Validated here as well as by the browser, so the messages match the rest
    // of the page instead of relying on native bubbles.
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = contact.form.required;
    if (!email) next.email = contact.form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = contact.form.invalidEmail;
    if (!message) next.message = contact.form.required;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
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
    // Move attention to the outcome, which is the only thing that changed.
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const describe = (field: keyof Errors) =>
    errors[field] ? `${baseId}-${field}-error` : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[52ch]">
      {/* Honeypot. Real people never see it, so anything filling it in is a
          bot and the submission is dropped by the service. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor={`${baseId}-company-url`}>Do not fill this in</label>
        <input
          id={`${baseId}-company-url`}
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor={`${baseId}-name`} className="text-step-2">
            {contact.form.name.label}
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={FIELD_CLASS}
          />
          {errors.name ? (
            <p id={`${baseId}-name-error`} className="type-mono mt-2 text-ember">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${baseId}-email`} className="text-step-2">
            {contact.form.email.label}
          </label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={FIELD_CLASS}
          />
          {errors.email ? (
            <p
              id={`${baseId}-email-error`}
              className="type-mono mt-2 text-ember"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${baseId}-company`} className="text-step-2">
            {contact.form.company.label}
          </label>
          <input
            id={`${baseId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-message`} className="text-step-2">
            {contact.form.message.label}
          </label>
          <textarea
            id={`${baseId}-message`}
            name="message"
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe("message")}
            className={`${FIELD_CLASS} resize-y`}
          />
          {errors.message ? (
            <p
              id={`${baseId}-message-error`}
              className="type-mono mt-2 text-ember"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="magnetic w-full cursor-pointer rounded-default bg-ember px-7 py-3.5 text-step-2 font-medium text-void transition-colors duration-200 hover:bg-ember-hover disabled:opacity-60"
          >
            {status === "sending" ? contact.form.sending : contact.form.submit}
          </button>
        </div>
      </div>

      {/* One live region for both outcomes, so a screen reader hears the
          result without the form being re-announced. */}
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={`mt-6 text-step-2 ${
          status === "error" ? "text-ember" : "text-ash"
        }`}
      >
        {status === "sent" ? contact.form.success : null}
        {status === "error" ? contact.form.error : null}
      </p>

      <noscript>
        <p className="mt-4 text-step-2 text-ash">
          This form needs JavaScript. Email {site.email} instead.
        </p>
      </noscript>
    </form>
  );
}
