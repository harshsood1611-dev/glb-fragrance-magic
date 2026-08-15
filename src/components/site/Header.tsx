import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AGENCY } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/our-work" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-7",
          scrolled ? "glass-panel" : "border border-transparent",
        )}
      >
        <Link
          to="/"
          className="font-display text-base font-medium tracking-[0.22em] uppercase"
          onClick={() => setOpen(false)}
        >
          Snapping<span className="signal-text">Turtles</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105 sm:inline-block"
          >
            Start a project
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-panel mx-auto mt-3 max-w-7xl rounded-3xl p-6 lg:hidden">
          <ul className="space-y-4">
            {[...NAV, { label: "Contact", to: "/contact" as const }].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground">
            {AGENCY.studios.join(" · ")}
          </p>
        </div>
      )}
    </header>
  );
}
