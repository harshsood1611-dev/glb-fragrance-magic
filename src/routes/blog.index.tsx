import { createFileRoute, Link } from "@tanstack/react-router";

import { CTABand, PageHero } from "@/components/site/ui";
import { POSTS } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Marketing, SEO & Creative Thinking" },
      {
        name: "description",
        content:
          "Essays and playbooks on performance marketing, AI search, creative testing and international brand growth.",
      },
      { property: "og:title", content: "Insights — Marketing, SEO & Creative Thinking" },
      {
        property: "og:description",
        content:
          "Playbooks on performance marketing, AI search, creative testing and international growth.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glb-fragrance-magic.lovable.app/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://glb-fragrance-magic.lovable.app/blog" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Notes from"
        accent="the studio floor"
        copy="What we're learning across markets — written by the people running the accounts, not a content farm."
      />

      {featured && (
        <section className="px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              data-reveal
              className="reveal clip-reveal sweep-card glass-panel group grid overflow-hidden rounded-3xl lg:grid-cols-2"
            >
              <div className="relative min-h-[16rem]">
                <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_40%_35%,oklch(0.84_0.19_145/22%),transparent_72%)] transition-transform duration-[900ms] group-hover:scale-110" />
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
              </div>
              <div className="relative z-10 p-8 sm:p-12">
                <p className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-primary">
                  Featured · {featured.category}
                </p>
                <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-8 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                  {featured.date} · {featured.readTime} read
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              data-reveal
              className="reveal sweep-card glass-panel group flex flex-col rounded-2xl p-7"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              <p className="relative z-10 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-primary">
                {post.category}
              </p>
              <h2 className="relative z-10 mt-5 font-display text-2xl leading-snug transition-transform duration-500 group-hover:-translate-y-0.5">
                {post.title}
              </h2>
              <p className="relative z-10 mt-4 flex-1 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="relative z-10 mt-6 border-t border-border pt-5 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                {post.date} · {post.readTime}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </div>
  );
}
