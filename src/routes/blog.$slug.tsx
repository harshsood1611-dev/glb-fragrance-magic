import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CTABand, MagneticLink } from "@/components/site/ui";
import { POSTS } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const url = `https://glb-fragrance-magic.lovable.app/blog/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} — Snapping Turtles` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Snapping Turtles" },
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostDetail,
});

function PostNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-4xl">That article isn't here</h1>
      <MagneticLink to="/blog">Back to insights</MagneticLink>
    </div>
  );
}

function PostDetail() {
  const { post } = Route.useLoaderData();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-40 pb-14 sm:px-8">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-32 left-[-10%] size-[32rem] rounded-full bg-primary/12 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="eyebrow">
            {post.category} · {post.date} · {post.readTime} read
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl">
            {post.title}
          </h1>
          <p data-reveal className="reveal mt-6 text-lg text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
      </section>

      <article className="px-4 pb-20 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {post.body.map((para, i) => (
            <p
              key={i}
              data-reveal
              className="reveal text-base leading-relaxed text-muted-foreground"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {para}
            </p>
          ))}
        </div>
      </article>

      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((other, i) => (
              <Link
                key={other.slug}
                to="/blog/$slug"
                params={{ slug: other.slug }}
                data-reveal
                className="reveal sweep-card glass-panel group rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <p className="relative z-10 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-primary">
                  {other.category}
                </p>
                <h3 className="relative z-10 mt-4 font-display text-xl leading-snug">
                  {other.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
