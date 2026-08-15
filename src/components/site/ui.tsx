import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useCountUp, useMagnetic, useTilt } from "@/hooks/use-anim";
import { STATS, TESTIMONIALS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="reveal mt-5 font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl"
      >
        {title} {accent && <span className="signal-text">{accent}</span>}
      </h2>
      {copy && (
        <p data-reveal className="reveal mt-5 text-muted-foreground">
          {copy}
        </p>
      )}
    </div>
  );
}

export function MagneticLink({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  const ref = useMagnetic<HTMLDivElement>(0.16);
  return (
    <div ref={ref} className="inline-block transition-transform duration-300">
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={to as any}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-mono text-[0.65rem] tracking-[0.24em] uppercase transition-colors duration-300",
          variant === "solid"
            ? "bg-primary text-primary-foreground"
            : "border border-border text-foreground hover:border-primary hover:text-primary",
        )}
      >
        {children}
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </div>
  );
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div data-reveal className="reveal border-t border-border pt-5">
      <p className="font-display text-4xl sm:text-5xl">
        <span ref={ref}>{current}</span>
        <span className="signal-text">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function StatGrid() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useTilt<HTMLDivElement>(6);
  return (
    <div
      ref={ref}
      data-reveal
      className="reveal sweep-card glass-panel rounded-2xl p-7"
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      <div className="relative z-10 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-primary">
            {project.category}
          </p>
          <h3 className="mt-3 font-display text-3xl">{project.client}</h3>
        </div>
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground">
          {project.year}
        </span>
      </div>
      <p className="relative z-10 mt-4 text-sm text-muted-foreground">
        {project.summary}
      </p>
      <div className="relative z-10 mt-7 flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs text-primary">{project.result}</span>
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
          {project.region}
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-8">
      {TESTIMONIALS.map((item, i) => (
        <figure
          key={item.name}
          data-reveal
          className="reveal glass-panel w-[82vw] shrink-0 snap-center rounded-2xl p-8 sm:w-[420px]"
          style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
        >
          <span className="font-display text-5xl leading-none text-primary">“</span>
          <blockquote className="mt-3 font-display text-xl leading-snug">
            {item.quote}
          </blockquote>
          <figcaption className="mt-6 border-t border-border pt-4">
            <p className="text-sm">{item.name}</p>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
              {item.role}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden px-4 pt-40 pb-20 sm:px-8">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
          <span className="reveal block" data-reveal>
            {title}
          </span>
          {accent && (
            <span
              className="reveal signal-text block"
              data-reveal
              style={{ transitionDelay: "0.12s" }}
            >
              {accent}
            </span>
          )}
        </h1>
        <div className="hairline mt-10 w-full max-w-md" />
        <p
          data-reveal
          className="reveal mt-6 max-w-xl text-muted-foreground"
          style={{ transitionDelay: "0.18s" }}
        >
          {copy}
        </p>
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="glass-panel relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl float-slow" />
        <p className="eyebrow relative" data-reveal>
          Next step
        </p>
        <h2
          data-reveal
          className="reveal relative mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.03] sm:text-6xl"
        >
          Let's build the growth engine your <span className="signal-text">category</span>{" "}
          hasn't seen yet.
        </h2>
        <p
          data-reveal
          className="reveal relative mx-auto mt-5 max-w-xl text-muted-foreground"
        >
          Tell us where you want to be in four quarters. We'll come back with the
          strategy, the numbers and the team.
        </p>
        <div
          data-reveal
          className="reveal relative mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticLink to="/contact">Book an intro call</MagneticLink>
          <MagneticLink to="/our-work" variant="ghost">
            See the work
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
