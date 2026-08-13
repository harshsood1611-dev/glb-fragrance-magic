import { useState } from "react";

const items = [
  {
    q: "Where do you ship from?",
    a: "Every order is composed and dispatched from our Al Quoz atelier in Dubai, with same-day courier inside the UAE and 2–4 day express across the GCC.",
  },
  {
    q: "Are the fragrances alcohol-free?",
    a: "Our extrait line is a pure oil concentration, alcohol-free and layered for the Gulf climate. The eau de parfum line uses a light alcohol carrier for projection.",
  },
  {
    q: "Can I have the bottle engraved?",
    a: "Yes. Arabic or Latin engraving is complimentary on all 100 ml flacons and is hand-finished in gold leaf within 48 hours.",
  },
  {
    q: "Do you offer discovery sets?",
    a: "A three-vial discovery set is included with every first order, and its value is credited against your next full bottle.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} data-reveal className="reveal py-5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-xl sm:text-2xl">{item.q}</span>
              <span
                className="text-primary transition-transform duration-500"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-700 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="overflow-hidden pt-3 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
