import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero } from "@/components/site/ui";
import { AGENCY, SERVICES } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a Project with Snapping Turtles" },
      {
        name: "description",
        content:
          "Tell us about your brand, market and timeline. Our team replies within one business day from New York, London, Dubai or Noida.",
      },
      { property: "og:title", content: "Contact — Start a Project with Snapping Turtles" },
      {
        property: "og:description",
        content: "Share your brief and we'll reply within one business day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glb-fragrance-magic.lovable.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/contact" },
    ],
  }),
  component: Contact,
});

const field =
  "w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Tell us what"
        accent="you're building"
        copy="Share the brief, the market and roughly where you are today. You'll hear from a senior strategist — not a sales desk — within one business day."
      />

      <section className="px-4 py-10 pb-28 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form
            data-reveal
            className="reveal glass-panel rounded-3xl p-8 sm:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow block pb-2">Name</span>
                <input required name="name" className={field} placeholder="Jane Doe" />
              </label>
              <label className="block">
                <span className="eyebrow block pb-2">Work email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className={field}
                  placeholder="jane@brand.com"
                />
              </label>
              <label className="block">
                <span className="eyebrow block pb-2">Company</span>
                <input name="company" className={field} placeholder="Brand Ltd." />
              </label>
              <label className="block">
                <span className="eyebrow block pb-2">Market</span>
                <input name="market" className={field} placeholder="UAE / UK / US" />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow block pb-2">Service needed</span>
                <select name="service" className={field} defaultValue="">
                  <option value="" disabled>
                    Select a capability
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow block pb-2">The brief</span>
                <textarea
                  required
                  name="brief"
                  rows={5}
                  className={field}
                  placeholder="Goals, timeline, budget range…"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-primary px-8 py-4 font-mono text-[0.65rem] tracking-[0.28em] uppercase text-primary-foreground transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              {sent ? "Brief received ✓" : "Send the brief"}
            </button>
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thanks — we'll come back to you within one business day.
              </p>
            )}
          </form>

          <aside className="space-y-6">
            <div data-reveal className="reveal glass-panel rounded-2xl p-7">
              <p className="eyebrow">Direct</p>
              <a
                href={`mailto:${AGENCY.email}`}
                className="mt-4 block font-display text-2xl transition-colors hover:text-primary"
              >
                {AGENCY.email}
              </a>
              <a
                href={`tel:${AGENCY.phone.replace(/[^+\d]/g, "")}`}
                className="mt-2 block font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {AGENCY.phone}
              </a>
            </div>

            <div data-reveal className="reveal glass-panel rounded-2xl p-7">
              <p className="eyebrow">Studios</p>
              <ul className="mt-4 space-y-3">
                {AGENCY.studios.map((studio) => (
                  <li
                    key={studio}
                    className="flex items-center justify-between border-b border-border pb-3 font-display text-xl last:border-0 last:pb-0"
                  >
                    {studio}
                    <span className="size-1.5 rounded-full bg-primary" />
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="reveal glass-panel rounded-2xl p-7">
              <p className="eyebrow">Follow</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {AGENCY.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
