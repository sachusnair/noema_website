import { alert as alertCopy } from "@/content/site";

/* The body of the alert Noema raised. Shared by the notification that drops in
   at the top of the page and by the dialog behind the product name, so the two
   can never drift apart. */
export function AlertCard({
  onDismiss,
  headingId,
}: {
  onDismiss: () => void;
  headingId: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-ash/30 px-5 py-3.5">
        <span className="type-mono flex items-center gap-2.5 text-ember">
          {/* A drawn marker rather than an emoji, which the palette and the
              rest of the page hold to. */}
          <span className="alert-dot" aria-hidden="true" />
          {alertCopy.badge}
        </span>
        <button
          type="button"
          onClick={onDismiss}
          className="type-mono cursor-pointer text-ash transition-colors duration-200 hover:text-bone"
        >
          {alertCopy.close}
        </button>
      </div>

      <div className="px-5 py-5">
        <h2 id={headingId} className="type-display-s max-w-[24ch] leading-[1.15]">
          {alertCopy.headline}
        </h2>

        <p className="mt-4 max-w-[54ch] text-step-2 leading-[1.6] text-bone/80">
          {alertCopy.detail}
        </p>

        <div className="mt-6 border-t border-ash/30 pt-4">
          <p className="type-mono text-ash">{alertCopy.waitLabel}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {alertCopy.impact.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="type-mono shrink-0 pt-1 text-ember"
                  aria-hidden="true"
                >
                  /
                </span>
                <span className="text-step-2 text-bone">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The part that makes the point: it has already acted. */}
        <div className="mt-6 rounded-default border border-ember/40 px-4 py-3.5">
          <p className="type-mono text-ember">{alertCopy.actionLabel}</p>
          <p className="mt-2 text-step-2 leading-[1.6] text-bone">
            {alertCopy.action}
          </p>
          <p className="type-mono mt-3 text-ash">{alertCopy.ready}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onDismiss}
            className="magnetic cursor-pointer rounded-default bg-ember px-5 py-3 text-step-2 font-medium text-void transition-colors duration-200 hover:bg-ember-hover"
          >
            {alertCopy.primary}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="cursor-pointer rounded-default border border-ash px-5 py-3 text-step-2 transition-colors duration-200 hover:border-bone"
          >
            {alertCopy.secondary}
          </button>
        </div>

        <p className="mt-5 max-w-[54ch] text-step-1 text-ash">
          {alertCopy.footnote}
        </p>
      </div>
    </>
  );
}
