import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Marquee } from "@/components/site/Marquee";
import { SplitText } from "@/components/site/SplitText";
import {
  CTABand,
  MagneticLink,
  ProjectCard,
  SectionHeading,
  StatGrid,
  Testimonials,
} from "@/components/site/ui";
import { useParallax, useTilt } from "@/hooks/use-anim";
import { CLIENTS, PROCESS, PROJECTS, SERVICES } from "@/lib/content";

const BottleExperience = lazy(() =>
  import("@/components/site/BottleExperience").then((module) => ({
    default: module.BottleExperience,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Snapping Turtles — Global Digital Marketing Agency" },
      {
        name: "description",
        content:
          "Snapping Turtles is a global digital marketing agency delivering strategy, performance media, creative production and web engineering for ambitious brands.",
      },
      {
        property: "og:title",
        content: "Snapping Turtles — Global Digital Marketing Agency",
      },
      {
        property: "og:description",
        content:
          "Strategy, performance media, film and engineering under one roof. 241+ projects delivered across four studios.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glb-fragrance-magic.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Snapping Turtles",
          url: "https://glb-fragrance-magic.lovable.app/",
          description:
            "Global digital marketing agency delivering strategy, performance media, creative production and web engineering.",
        }),
      },
    ],
  }),
  component: Home,
});

function ServiceRow({
  index,
  slug,
  title,
  short,
}: {
  index: number;
  slug: string;
  title: string;
  short: string;
}) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug }}
      data-reveal
      className="reveal group relative grid items-center gap-4 border-t border-border py-8 sm:grid-cols-[6rem_1fr_auto]"
      style={{ transitionDelay: `${(index % 4) * 0.06}s` }}
    >
      <span className="font-mono text-xs text-primary">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-3 sm:text-4xl">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{short}</p>
      </div>
      <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-muted-foreground transition-colors group-hover:text-primary">
        Explore →
      </span>
    </Link>
  );
}

function Home() {
  const orbRef = useParallax<HTMLDivElement>(120);
  const showreelRef = useTilt<HTMLDivElement>(5);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-36 pb-16 sm:px-8">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <div
          ref={orbRef}
          className="pointer-events-none absolute -top-20 right-[-10%] size-[42rem] rounded-full bg-primary/12 blur-[120px]"
        />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] size-[30rem] rounded-full bg-accent/12 blur-[110px] float-slow" />

        <ClientOnly
          fallback={
            <div className="pointer-events-none absolute inset-y-24 right-0 w-full sm:w-[58%] lg:w-[52%]" />
          }
        >
          <Suspense fallback={null}>
            <BottleExperience />
          </Suspense>
        </ClientOnly>

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-primary" />
              <span className="relative size-2 rounded-full bg-primary" />
            </span>
            Now taking briefs for Q4 · New York · London · Dubai · Noida
          </p>

          <h1 className="mt-8 font-display text-[16vw] leading-[0.86] tracking-tight uppercase sm:text-[12vw] lg:text-[9.5vw]">
            <SplitText text="Marketing" className="block" delay={0.15} />
            <SplitText
              text="That Compounds"
              className="block"
              charClassName="signal-text"
              delay={0.45}
            />
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <p
              data-reveal
              className="reveal max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              We're a global digital marketing studio building brands that travel —
              strategy, performance media, film and engineering, run by one senior
              team across four cities.
            </p>
            <div data-reveal className="reveal pointer-events-auto flex flex-wrap gap-4 lg:justify-end">
              <MagneticLink to="/services">Discover our services</MagneticLink>
              <MagneticLink to="/our-work" variant="ghost">
                View case studies
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT RIBBON */}
      <div className="relative">
        <p className="eyebrow px-4 pb-5 text-center sm:px-8">
          Trusted by the world's biggest brands
        </p>
        <Marquee items={CLIENTS} />
        <Marquee items={[...CLIENTS].reverse()} reverse separator="—" />
      </div>

      {/* STATS */}
      <section className="px-0 py-24">
        <StatGrid />
      </section>

      {/* SERVICES */}
      <section className="relative px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we do"
            title="Nine capabilities,"
            accent="one accountable team"
            copy="No handoffs between agencies. Strategy, creative, media and engineering sit in the same room and share the same KPI."
          />
          <div className="mt-16">
            {SERVICES.map((service, i) => (
              <ServiceRow key={service.slug} index={i} {...service} />
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <section className="relative px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            ref={showreelRef}
            data-reveal
            className="clip-reveal glass-panel relative overflow-hidden rounded-3xl"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative aspect-[16/8] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.84_0.19_145/18%),transparent_70%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center">
                <p className="eyebrow">Showreel 2026</p>
                <p className="font-display text-4xl leading-tight sm:text-6xl">
                  70+ films.
                  <br />
                  <span className="outline-text">Made in-house.</span>
                </p>
                <MagneticLink to="/portfolio" variant="ghost">
                  Watch the reel
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Our work"
              title="Real outcomes for"
              accent="real businesses"
            />
            <div data-reveal className="reveal">
              <MagneticLink to="/our-work" variant="ghost">
                All case studies
              </MagneticLink>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How we work"
            title="Five phases,"
            accent="zero guesswork"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((phase, i) => (
              <div
                key={phase.step}
                data-reveal
                className="reveal sweep-card glass-panel rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <p className="font-mono text-xs text-primary">{phase.step}</p>
                <h3 className="relative z-10 mt-4 font-display text-2xl">
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

      {/* TESTIMONIALS */}
      <section className="relative py-16">
        <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-8">
          <SectionHeading
            eyebrow="Voices"
            title="What partners"
            accent="say about us"
          />
        </div>
        <Testimonials />
      </section>

      <CTABand />
    </div>
  );
}
