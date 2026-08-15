import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  CTABand,
  PageHero,
  ProjectCard,
  SectionHeading,
  StatGrid,
} from "@/components/site/ui";
import { CATEGORIES, PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Case Studies & Results" },
      {
        name: "description",
        content:
          "Campaign case studies across FMCG, hospitality, retail and technology — with the outcomes each programme delivered.",
      },
      { property: "og:title", content: "Our Work — Case Studies & Results" },
      {
        property: "og:description",
        content:
          "Filterable case studies across FMCG, hospitality, retail and technology, with measured outcomes.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://glb-fragrance-magic.lovable.app/our-work",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/our-work" },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div>
      <PageHero
        eyebrow="Case studies"
        title="The work, and"
        accent="what it returned"
        copy="Every engagement below is measured against a business number, not an impression count. Filter by discipline to see the closest fit to your brief."
      />

      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`shrink-0 rounded-full border px-5 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                  active === cat
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <StatGrid />
      </section>

      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Sectors"
            title="Where we have"
            accent="deep experience"
            copy="FMCG, hospitality, real estate, retail, healthcare, education, technology and D2C — across GCC, UK, US and India."
          />
        </div>
      </section>

      <CTABand />
    </div>
  );
}
