import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ModelControls, Stage3D } from "@/components/Stage3D";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Faq } from "@/components/site/Faq";
import { Marquee } from "@/components/site/Marquee";
import { Nav } from "@/components/site/Nav";
import {
  useDragRotate,
  useReveal,
  useSmoothScroll,
  useStageScroll,
  useVariant,
} from "@/hooks/use-stage";
import { setVariant, VARIANTS } from "@/lib/stage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurea Parfums — Dubai Niche Fragrance Atelier" },
      {
        name: "description",
        content:
          "Aurea Parfums composes oud, Taif rose and desert musk extraits in Dubai. Explore the collection in interactive 3D and order worldwide.",
      },
      { property: "og:title", content: "Aurea Parfums — Dubai Niche Fragrance Atelier" },
      {
        property: "og:description",
        content:
          "Niche extraits hand-composed in Dubai. Explore each flacon in interactive 3D before you order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NOTE_PYRAMID = [
  {
    tier: "Top",
    detail: "Saffron thread, bergamot zest, pink pepper",
    time: "0–20 min",
  },
  {
    tier: "Heart",
    detail: "Taif rose absolute, Cambodian oud, jasmine sambac",
    time: "20 min – 4 h",
  },
  {
    tier: "Base",
    detail: "Smoked amber, cashmeran, Mysore sandalwood",
    time: "4 h – 12 h",
  },
];

const TESTIMONIALS = [
  {
    name: "Layla Al Maktoum",
    role: "Collector, Dubai",
    quote:
      "The oud is dense but never heavy — it holds through a whole evening in Downtown without shouting.",
  },
  {
    name: "Ines Ferrand",
    role: "Perfume critic, Paris",
    quote:
      "A genuinely Gulf composition with French restraint. The Taif rose is the finest I have smelled this year.",
  },
  {
    name: "Omar Rahman",
    role: "Founder, Marasi Group",
    quote:
      "I gift Aurea to every visiting partner. The flacon alone starts the conversation.",
  },
];

function Home() {
  useStageScroll();
  useDragRotate();
  useReveal();
  useSmoothScroll();
  const { index, variant } = useVariant();
  const [cart, setCart] = useState(0);

  return (
    <div
      id="top"
      className="relative"
      style={{ ["--accent-oklch" as string]: variant.accent }}
    >
      <div className="curtain pointer-events-none fixed inset-0 z-50 bg-background" />
      <Stage3D />
      <ModelControls />
      <Nav count={cart} />

      {/* HERO — pinned bottle occluding an oversized headline */}
      <section
        data-stage
        data-x="0"
        data-y="0.15"
        data-scale="1"
        data-roty="0"
        data-rotx="0"
        data-rotate-zone
        className="pointer-events-auto relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 sm:px-8"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <p className="eyebrow">Dubai · Est. 2019 · Extrait de Parfum</p>
          <h1 className="mt-6 font-display text-[19vw] leading-[0.82] tracking-tight uppercase sm:text-[15vw]">
            <SplitHeadline text="Aurea" className="block" charClassName="text-primary" delay={0.9} />
            <SplitHeadline
              text="Parfums"
              className="block text-foreground/90"
              delay={1.2}
            />
          </h1>
          <div className="hairline mx-auto mt-10 w-64" />
          <p className="reveal mt-6 font-mono text-[0.7rem] tracking-[0.35em] uppercase sm:text-xs" data-reveal>
            Oud · Taif Rose · Desert Musk
          </p>
        </div>
        <div className="relative z-30 mx-auto mt-auto grid w-full max-w-6xl gap-4 pb-10 sm:grid-cols-3">
          {[
            ["Hand-composed", "12 raw materials, no filler"],
            ["Drag the flacon", "Spin it with your cursor"],
            ["Worldwide", "Dispatched from Al Quoz"],
          ].map(([title, copy], i) => (
            <div
              key={title}
              data-reveal
              className="reveal glass-panel rounded-xl px-5 py-4 text-left"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <p className="font-display text-lg">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee
        items={["Extrait de Parfum", "Al Quoz Atelier", "Taif Rose", "Cambodian Oud", "Since 2019"]}
      />

      {/* NOTES — pyramid with the bottle held to one side */}
      <section
        id="notes"
        data-stage
        data-x="2.1"
        data-y="0"
        data-scale="0.92"
        data-roty="1.1"
        data-rotx="0.08"
        className="relative min-h-screen px-4 py-28 sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow" data-reveal>
              The Pyramid
            </p>
            <h2
              data-reveal
              className="reveal mt-5 font-display text-5xl leading-[0.95] sm:text-6xl"
            >
              A scent built in <span className="gold-text">three movements</span>
            </h2>
            <p data-reveal className="reveal mt-5 max-w-md text-muted-foreground">
              Each Aurea extrait is constructed as an arc rather than an accord — an
              opening that flashes, a heart that settles into the skin, and a base that
              lingers long after the room has emptied.
            </p>
            <div className="mt-10 space-y-5">
              {NOTE_PYRAMID.map((note, i) => (
                <div
                  key={note.tier}
                  data-reveal
                  className="reveal flex items-start gap-5 border-t border-border pt-5"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <div>
                    <p className="font-display text-2xl">{note.tier}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{note.detail}</p>
                    <p className="mt-1 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
                      {note.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* VARIANTS — selecting a fragrance morphs the liquid + page accent */}
      <section
        data-stage
        data-x="-2"
        data-y="0"
        data-scale="0.95"
        data-roty="-0.9"
        data-rotx="0"
        className="relative min-h-screen px-4 py-28 sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div>
            <p className="eyebrow" data-reveal>
              Three Compositions
            </p>
            <h2 data-reveal className="reveal mt-5 font-display text-5xl sm:text-6xl">
              Choose your <span className="gold-text">signature</span>
            </h2>
            <p data-reveal className="reveal mt-4 text-muted-foreground">
              Select a composition — the flacon, its light and the whole page shift to
              match the juice.
            </p>
            <div className="mt-10 space-y-3">
              {VARIANTS.map((item, i) => {
                const active = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVariant(i)}
                    className="reveal group flex w-full items-center justify-between gap-6 rounded-xl border px-5 py-5 text-left transition-all duration-500"
                    data-reveal
                    style={{
                      borderColor: active
                        ? "oklch(var(--accent-oklch) / 60%)"
                        : "var(--color-border)",
                      background: active
                        ? "oklch(var(--accent-oklch) / 8%)"
                        : "transparent",
                      boxShadow: active ? "var(--glow-accent)" : "none",
                      transitionDelay: `${i * 0.1}s`,
                    }}
                    aria-pressed={active}
                  >
                    <span>
                      <span className="font-display text-2xl">{item.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {item.notes}
                      </span>
                    </span>
                    <span className="font-mono text-sm text-primary">
                      AED {item.price}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setCart((c) => c + 1)}
              className="mt-8 w-full rounded-full bg-primary px-8 py-4 font-mono text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              Add {variant.name} · AED {variant.price}
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTION — horizontal scroll carousel */}
      <section id="collection" className="relative py-28">
        <div className="mx-auto mb-12 max-w-6xl px-4 sm:px-8">
          <p className="eyebrow" data-reveal>
            The Collection
          </p>
          <h2 data-reveal className="reveal mt-5 font-display text-5xl sm:text-6xl">
            Flacons in <span className="gold-text">gold leaf</span>
          </h2>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-8">
          {[...VARIANTS, ...VARIANTS].map((item, i) => (
            <article
              key={`${item.id}-${i}`}
              data-reveal
              className="reveal glass-panel w-[78vw] shrink-0 snap-center rounded-2xl p-7 sm:w-[380px]"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              <div
                className="h-52 rounded-xl"
                style={{
                  background: `radial-gradient(60% 60% at 50% 40%, ${item.glow}55, transparent 70%)`,
                }}
              />
              <p className="mt-6 font-display text-3xl">{item.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-sm text-primary">AED {item.price}</span>
                <button
                  type="button"
                  onClick={() => setCart((c) => c + 1)}
                  className="rounded-full border border-border px-5 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ATELIER — drag to rotate */}
      <section
        id="atelier"
        data-stage
        data-x="-1.9"
        data-y="-0.1"
        data-scale="1.05"
        data-roty="-2.2"
        data-rotx="-0.05"
        data-rotate-zone
        className="pointer-events-auto relative min-h-screen px-4 py-28 sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div>
            <p className="eyebrow" data-reveal>
              The Atelier
            </p>
            <h2 data-reveal className="reveal mt-5 font-display text-5xl sm:text-6xl">
              Cut, filled and <span className="gold-text">sealed by hand</span>
            </h2>
            <p data-reveal className="reveal mt-5 text-muted-foreground">
              Our flacons are blown in Murano glass, gilded in Dubai and filled in
              batches of two hundred. Drag anywhere on this section to turn the bottle
              and read the engraving.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {[
                ["200", "Bottles per batch"],
                ["30%", "Oil concentration"],
                ["12", "Raw materials"],
                ["48h", "Engraving time"],
              ].map(([value, label], i) => (
                <div
                  key={label}
                  data-reveal
                  className="reveal border-t border-border pt-4"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <dt className="font-display text-4xl gold-text">{value}</dt>
                  <dd className="mt-1 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" className="relative px-4 py-28 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow" data-reveal>
            Voices
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <figure
                key={item.name}
                data-reveal
                className="reveal glass-panel rounded-2xl p-7"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <blockquote className="font-display text-xl leading-snug">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                  {item.name} — {item.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section
        data-stage
        data-x="0"
        data-y="-0.4"
        data-scale="0.75"
        data-roty="-3"
        data-rotx="0.1"
        className="relative px-4 py-28 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow" data-reveal>
            Questions
          </p>
          <h2 data-reveal className="reveal mt-5 mb-12 font-display text-5xl sm:text-6xl">
            Before you <span className="gold-text">order</span>
          </h2>
          <Faq />
        </div>
      </section>

      <footer className="relative border-t border-border px-4 py-20 text-center sm:px-8">
        <p data-reveal className="reveal font-display text-6xl uppercase sm:text-8xl">
          <span className="shimmer-text">Wear the night</span>
        </p>
        <a
          href="#collection"
          className="mt-10 inline-block rounded-full bg-primary px-10 py-4 font-mono text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
        >
          Shop the collection
        </a>
        <p className="mt-14 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">
          Aurea Parfums · Al Quoz, Dubai · © 2026
        </p>
      </footer>
    </div>
  );
}
