/* PARKED PAGE — rename this folder from _pricing to pricing to switch it on.
 *
 * Next ignores folders beginning with an underscore, so the page is complete
 * but not routed. Taken off the site on request while pre-launch.
 *
 * To restore:
 *
 *     git mv src/app/_pricing src/app/pricing
 *
 * then put Pricing back into nav.links and the footer Pages column in
 * src/content/site.ts, and back into src/app/sitemap.ts. The copy itself is
 * still in site.ts under `pricing`, untouched.
 */
import type { Metadata } from "next";
import { BookDemoButton } from "@/components/BookDemoButton";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { pricing, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Pricing — ${site.name}`,
  description: pricing.sub,
  alternates: { canonical: `${site.url}/pricing` },
};

export default function PricingPage() {
  return (
    <PageShell eyebrow={pricing.eyebrow} title={pricing.h1} sub={pricing.sub}>
      {/* Two cards rather than the five of a usage-priced product: there are
          only two honest states to describe, now and at launch. */}
      <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-2">
        {pricing.tiers.map((tier, index) => (
          <Reveal key={tier.name} index={index}>
            <div
              className={`flex h-full flex-col rounded-default border p-8 ${
                tier.featured
                  ? "border-ember bg-carbon"
                  : "border-ash/40 bg-transparent"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="type-display-s">{tier.name}</h2>
                {tier.featured ? (
                  <span className="type-mono shrink-0 rounded-default border border-ember px-2.5 py-1 text-ember">
                    {tier.note}
                  </span>
                ) : null}
              </div>

              {/* The price slot holds a sentence, not a number, because no
                  number has been set. It keeps the shape of a pricing card
                  without implying a figure. */}
              <p className="mt-6 text-step-5 leading-[1.2]">{tier.price}</p>
              {!tier.featured ? (
                <p className="type-mono mt-2 text-ash">{tier.note}</p>
              ) : null}

              <ul className="mt-8 flex flex-col gap-3 border-t border-ash/30 pt-6">
                {tier.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      className="type-mono shrink-0 pt-1 text-ember"
                      aria-hidden="true"
                    >
                      /
                    </span>
                    <span className="text-step-2 text-bone/85">{point}</span>
                  </li>
                ))}
              </ul>

              {tier.featured ? (
                <div className="mt-8 pt-2">
                  <BookDemoButton label={pricing.ctaLabel} className="w-full" />
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 max-w-[62ch] text-step-2 text-ash">
          {pricing.honesty}
        </p>
      </Reveal>

      <section className="mt-20 lg:mt-24">
        <Reveal>
          <h2 className="type-display-s border-t border-ash/30 pt-6">
            {pricing.faqTitle}
          </h2>
        </Reveal>
        <dl className="mt-8 flex flex-col gap-8">
          {pricing.faq.map((item, index) => (
            <Reveal key={item.q} index={index}>
              <dt className="text-step-3 font-medium">{item.q}</dt>
              <dd className="mt-2 max-w-[62ch] text-step-2 leading-[1.6] text-bone/80">
                {item.a}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
