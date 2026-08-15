import { Link } from "@tanstack/react-router";
import { AGENCY, SERVICES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border px-4 pt-20 pb-10 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl">
            Snapping<span className="signal-text">Turtles</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {AGENCY.tagline}. Strategy, creative and engineering under one roof —
            operating across {AGENCY.studios.length} studios.
          </p>
          <div className="mt-8 space-y-1 font-mono text-xs text-muted-foreground">
            <p>{AGENCY.email}</p>
            <p>{AGENCY.phone}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {AGENCY.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline font-mono text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { label: "About us", to: "/about" as const },
              { label: "Our work", to: "/our-work" as const },
              { label: "Portfolio", to: "/portfolio" as const },
              { label: "Blog", to: "/blog" as const },
              { label: "Contact", to: "/contact" as const },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[0.62rem] leading-relaxed tracking-[0.2em] uppercase text-muted-foreground">
            {AGENCY.studios.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-border pt-6 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Snapping Turtles. All rights reserved.</p>
        <p>Digital marketing · Production · Engineering</p>
      </div>
    </footer>
  );
}
