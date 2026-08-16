"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chat as chatCopy, integrations } from "@/content/site";

/* A chat panel in the bottom right, answered by Claude through the Worker in
   /worker. The key lives on the Worker, never here: this file only ever talks
   to our own endpoint.

   It renders nothing at all while `integrations.chatEndpoint` is empty, so the
   launcher cannot appear before there is something behind it. With JavaScript
   off it also renders nothing, which is correct — the contact form and the
   email address are the routes that work without script.

   No entrance animation. The page uses motion for reveals only, and a panel
   that slides in from a corner is the kind of thing the brief bans. */

type Turn = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 2000;
/* Matches the Worker's own cap. Enforced there too — this one is a courtesy
   so a visitor sees the limit rather than a rejection. */
const MAX_TURNS = 20;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const endpoint = integrations.chatEndpoint;

  const close = useCallback(() => {
    abortRef.current?.abort();
    setOpen(false);
    setBusy(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes from anywhere while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Focus the input when the panel opens, so it is usable from the keyboard
  // without hunting for it.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest text in view as it streams in.
  useEffect(() => {
    const node = transcriptRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns]);

  // A panel left open across a route change would keep a stream running.
  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(event: React.FormEvent, preset?: string) {
    event.preventDefault();
    const question = (preset ?? draft).trim();
    if (!question || busy || turns.length >= MAX_TURNS) return;

    const next: Turn[] = [...turns, { role: "user", content: question }];
    setTurns([...next, { role: "assistant", content: "" }]);
    setDraft("");
    setBusy(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Endpoint returned ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Append each chunk to the assistant turn that was seeded above, so the
      // answer builds in place rather than arriving all at once.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setTurns((current) => {
          const copy = [...current];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch (caught) {
      // An abort is the visitor closing the panel, not a failure.
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setError(
        caught instanceof TypeError ? chatCopy.offline : chatCopy.error,
      );
      // Drop the empty assistant turn so the transcript does not end on a
      // blank reply under the error.
      setTurns((current) =>
        current[current.length - 1]?.content === ""
          ? current.slice(0, -1)
          : current,
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  if (!endpoint) return null;

  return (
    <>
      {open ? null : (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="chat-launcher type-mono fixed right-5 bottom-5 z-50 flex h-12 cursor-pointer items-center gap-3 rounded-default border border-ash/45 bg-carbon px-5 text-bone transition-colors duration-200 hover:border-ember"
        >
          <span className="chat-dot" aria-hidden="true" />
          {chatCopy.launch}
        </button>
      )}

      {open ? (
        /* Not aria-modal: the page stays readable and operable behind it, so
           trapping focus here would be a lie to assistive technology. */
        <div
          role="dialog"
          aria-label={chatCopy.title}
          className="fixed right-5 bottom-5 z-50 flex h-[min(38rem,calc(100dvh-2.5rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col rounded-default border border-ash/40 bg-carbon"
        >
          <div className="flex items-center justify-between border-b border-ash/30 px-5 py-3">
            <span className="type-mono text-ash">{chatCopy.title}</span>
            <button
              type="button"
              onClick={close}
              className="type-mono cursor-pointer text-ash transition-colors duration-200 hover:text-bone"
            >
              {chatCopy.close}
            </button>
          </div>

          <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto px-5 py-4"
            aria-live="polite"
          >
            <p className="text-step-2 leading-[1.6] text-bone/80">
              {chatCopy.greeting}
            </p>

            {/* Only while the transcript is empty. Once there is a conversation
                they would be clutter, and the visitor has clearly worked out
                how to type. */}
            {turns.length === 0 ? (
              <div className="mt-5">
                <p className="type-mono text-ash">{chatCopy.promptsLabel}</p>
                <div className="mt-3 flex flex-col items-start gap-2">
                  {chatCopy.prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={(event) => send(event, prompt)}
                      className="cursor-pointer rounded-default border border-ash/45 px-3 py-2 text-left text-step-2 leading-[1.4] text-bone/80 transition-colors duration-200 hover:border-ember hover:text-bone"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {turns.map((turn, index) => (
              <div key={index} className="mt-5">
                <p className="type-mono text-ash">
                  {turn.role === "user" ? chatCopy.youLabel : chatCopy.agentLabel}
                </p>
                <p className="mt-1.5 text-step-2 leading-[1.6] whitespace-pre-wrap text-bone">
                  {turn.content}
                  {/* A drawn caret while the reply streams, rather than an
                      animated dot cluster. */}
                  {busy && index === turns.length - 1 && turn.role === "assistant"
                    ? "█"
                    : null}
                </p>
              </div>
            ))}

            {error ? (
              <p className="mt-5 text-step-2 leading-[1.6] text-ember">{error}</p>
            ) : null}
          </div>

          <form onSubmit={send} className="border-t border-ash/30 px-5 py-4">
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value.slice(0, MAX_CHARS))}
              onKeyDown={(event) => {
                // Enter sends; Shift+Enter is a newline.
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={2}
              maxLength={MAX_CHARS}
              placeholder={chatCopy.placeholder}
              aria-label={chatCopy.placeholder}
              className="w-full resize-none bg-transparent text-step-2 leading-[1.5] text-bone placeholder:text-ash focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-end">
              <button
                type="submit"
                disabled={busy || !draft.trim() || turns.length >= MAX_TURNS}
                className="cursor-pointer rounded-default bg-ember px-4 py-2 text-step-2 font-medium whitespace-nowrap text-void transition-colors duration-200 hover:bg-ember-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? chatCopy.sending : chatCopy.send}
              </button>
            </div>
          </form>

          <p className="border-t border-ash/30 px-5 py-3 text-step-1 leading-[1.5] text-ash">
            {chatCopy.note}
          </p>
        </div>
      ) : null}
    </>
  );
}
