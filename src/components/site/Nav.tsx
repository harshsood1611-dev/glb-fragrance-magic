const links = [
  { label: "Collection", href: "#collection" },
  { label: "Notes", href: "#notes" },
  { label: "Atelier", href: "#atelier" },
  { label: "Voices", href: "#voices" },
];

export function Nav({ count }: { count: number }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8">
      <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 sm:px-8">
        <a href="#top" className="font-display text-xl tracking-[0.35em] uppercase">
          <span className="gold-text">Aurea</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#collection"
          className="rounded-full bg-primary px-5 py-2 font-mono text-[0.65rem] tracking-[0.25em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
        >
          Cart · {count}
        </a>
      </nav>
    </header>
  );
}
