import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CTABand, MagneticLink, SectionHeading } from "@/components/site/ui";
import { SplitText } from "@/components/site/SplitText";
import { PROCESS, SERVICES } from "@/lib/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    const url = `https://glb-fragrance-magic.lovable.app/services/${params.slug}`;
    return {
      meta: [
        { title: `${service.title} — Snapping Turtles` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.title} — Snapping Turtles` },
        { property: "og:description", content: service.short },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-4xl">We don't offer that one</h1>
      <p className="text-muted-foreground">Browse the full capability list instead.</p>
      <MagneticLink to="/services">All services</MagneticLink>
    </div>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-40 pb-16 sm:px-8">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] size-[34rem] rounded-full bg-primary/12 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">Service</p>
          <h1 className="mt-6 font-display text-[12vw] leading-[0.88] uppercase sm:text-[7vw]">
            <SplitText text={service.title} className="signal-text block" />
          </h1>
          <p data-reveal className="reveal mt-8 max-w-2xl text-lg text-muted-foreground">
            {service.intro}
          </p>
          <p
            data-reveal
            className="reveal mt-8 inline-block rounded-full border border-primary/40 px-5 py-2 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-primary"
          >
            {service.metric}
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            {service.body.map((para, i) => (
              <p
                key={i}
                data-reveal
                className="reveal text-base leading-relaxed text-muted-foreground"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {para}
              </p>
            ))}
          </div>
          <aside
            data-reveal
            className="reveal glass-panel h-fit rounded-2xl p-7"
          >
            <p className="eyebrow">What you get</p>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticLink to="/contact">Start a project</MagneticLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Delivery" title="How this" accent="gets built" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((phase, i) => (
              <div
                key={phase.step}
                data-reveal
                className="reveal sweep-card glass-panel rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <p className="font-mono text-xs text-primary">{phase.step}</p>
                <h3 className="relative z-10 mt-4 font-display text-xl">
                  {phase.title}
                </h3>
                <p className="relative z-10 mt-3 text-sm text-muted-foreground">
                  {phase.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pairs well with" title="Other" accent="capabilities" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => (
              <Link
                key={other.slug}
                to="/services/$slug"
                params={{ slug: other.slug }}
                data-reveal
                className="reveal sweep-card glass-panel group rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <h3 className="relative z-10 font-display text-2xl">{other.title}</h3>
                <p className="relative z-10 mt-3 text-sm text-muted-foreground">
                  {other.short}
                </p>
                <span className="relative z-10 mt-5 block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground transition-colors group-hover:text-primary">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
