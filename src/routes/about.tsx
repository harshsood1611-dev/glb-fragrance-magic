import { createFileRoute } from "@tanstack/react-router";

import { Marquee } from "@/components/site/Marquee";
import {
  CTABand,
  PageHero,
  SectionHeading,
  StatGrid,
  Testimonials,
} from "@/components/site/ui";
import { AGENCY, PROCESS, TEAM, VALUES } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Snapping Turtles — Global Growth Studio" },
      {
        name: "description",
        content:
          "Meet Snapping Turtles: a senior team of strategists, creatives and engineers running growth programmes from New York, London, Dubai and Noida.",
      },
      { property: "og:title", content: "About Snapping Turtles — Global Growth Studio" },
      {
        property: "og:description",
        content:
          "A senior team of strategists, creatives and engineers building brands that travel across markets.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glb-fragrance-magic.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/about" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About the studio"
        title="We grow brands"
        accent="across borders"
        copy="Snapping Turtles started as a small production crew and became a full-service growth studio. Today we run strategy, media, film and engineering for brands in twelve markets."
      />

      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built for the"
              accent="international market"
            />
            <div className="mt-8 space-y-5 text-muted-foreground">
              <p data-reveal className="reveal">
                We began with a simple conviction: most marketing fails not because
                of bad ideas, but because strategy, creative and media are owned by
                three different companies who never talk.
              </p>
              <p data-reveal className="reveal">
                So we built one studio that holds all three. A brief that starts as
                market research ends as a shipped campaign, measured against revenue,
                without a single handoff losing intent along the way.
              </p>
              <p data-reveal className="reveal">
                Today that team works from {AGENCY.studios.join(", ")} — which means
                your campaigns keep moving through every time zone, and local nuance
                is handled by people who actually live in the market.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                data-reveal
                className="reveal sweep-card glass-panel rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <h3 className="relative z-10 font-display text-2xl">{value.title}</h3>
                <p className="relative z-10 mt-3 text-sm text-muted-foreground">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <StatGrid />
      </section>

      <Marquee
        items={["Strategy", "Performance", "Film", "Design", "Engineering", "SEO"]}
      />

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The method"
            title="A process you can"
            accent="hold us to"
          />
          <div className="mt-14 space-y-0">
            {PROCESS.map((phase, i) => (
              <div
                key={phase.step}
                data-reveal
                className="reveal group grid gap-3 border-t border-border py-8 sm:grid-cols-[6rem_14rem_1fr]"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="font-mono text-xs text-primary">{phase.step}</span>
                <h3 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground">{phase.copy}</p>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The people" title="Senior by" accent="default" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                data-reveal
                className="reveal sweep-card glass-panel rounded-2xl p-7"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              >
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-border font-display text-lg">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <p className="relative z-10 mt-6 font-display text-2xl">
                  {member.name}
                </p>
                <p className="relative z-10 mt-1 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-8">
          <SectionHeading eyebrow="Voices" title="Client" accent="perspective" />
        </div>
        <Testimonials />
      </section>

      <CTABand />
    </div>
  );
}
