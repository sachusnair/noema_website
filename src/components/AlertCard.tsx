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
      <div className="flex items-center justify-between gap-4 border-b border-ash/30 px-5 py-3">
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

      <div className="px-5 py-4">
        {/* Two columns from 640px up. Stacked, this ran tall enough to fall
            past the fold on a short laptop; side by side the tallest column
            sets the height instead of the sum of everything. */}
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <h2
              id={headingId}
              className="max-w-[30ch] text-step-4 leading-[1.25] font-medium"
            >
              {alertCopy.headline}
            </h2>

            <p className="mt-3 max-w-[42ch] text-step-2 leading-[1.5] text-bone/80">
              {alertCopy.detail}
            </p>

            <div className="mt-4 border-t border-ash/30 pt-3">
              <p className="type-mono text-ash">{alertCopy.waitLabel}</p>
              <ul className="mt-2 flex flex-col gap-1.5">
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
          </div>

          <div className="flex flex-col">
            {/* The part that makes the point: it has already acted. */}
            <div className="rounded-default border border-ember/40 px-4 py-3">
              <p className="type-mono text-ember">{alertCopy.actionLabel}</p>
              <p className="mt-1.5 text-step-2 leading-[1.5] text-bone">
                {alertCopy.action}
              </p>
              <p className="type-mono mt-2 text-ash">{alertCopy.ready}</p>
            </div>

            {/* Wraps rather than running side by side at any cost. The two
                labels together are wider than this column, and holding them on
                one row pushed the dialog into a horizontal scrollbar. */}
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={onDismiss}
                className="magnetic cursor-pointer rounded-default bg-ember px-5 py-2.5 text-step-2 font-medium whitespace-nowrap text-void transition-colors duration-200 hover:bg-ember-hover"
              >
                {alertCopy.primary}
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="cursor-pointer rounded-default border border-ash px-5 py-2.5 text-step-2 whitespace-nowrap transition-colors duration-200 hover:border-bone"
              >
                {alertCopy.secondary}
              </button>
            </div>

            <p className="mt-4 text-step-1 text-ash">{alertCopy.footnote}</p>
          </div>
        </div>
      </div>
    </>
  );
}
