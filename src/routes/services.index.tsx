import { createFileRoute, Link } from "@tanstack/react-router";

import { CTABand, PageHero, SectionHeading } from "@/components/site/ui";
import { FAQS, SERVICES } from "@/lib/content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Digital Marketing, SEO, Film & Web" },
      {
        name: "description",
        content:
          "Digital marketing, SEO, social, influencer, video production, web development, e-commerce, brand design and CRM — delivered by one senior team.",
      },
      { property: "og:title", content: "Services — Digital Marketing, SEO, Film & Web" },
      {
        property: "og:description",
        content:
          "Nine capabilities under one roof: strategy, performance media, production and engineering.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://glb-fragrance-magic.lovable.app/services",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/services" },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div>
      <PageHero
        eyebrow="Capabilities"
        title="Everything you need"
        accent="to grow, in one team"
        copy="Pick a single capability or run the full stack. Either way you get senior people, transparent measurement and work that holds up in any market."
      />

      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              data-reveal
              className="reveal sweep-card glass-panel group flex flex-col rounded-2xl p-7"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              <span className="relative z-10 font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="relative z-10 mt-5 font-display text-3xl">
                {service.title}
              </h2>
              <p className="relative z-10 mt-3 flex-1 text-sm text-muted-foreground">
                {service.short}
              </p>
              <p className="relative z-10 mt-6 border-t border-border pt-5 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground transition-colors group-hover:text-primary">
                {service.metric}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Questions"
            title="Working with us,"
            accent="explained"
          />
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                data-reveal
                className="reveal group py-6"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-xl marker:content-none">
                  {faq.q}
                  <span className="font-mono text-primary transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
