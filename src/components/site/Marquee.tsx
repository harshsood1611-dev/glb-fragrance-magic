export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-5">
      <div className="marquee-track gap-14">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shimmer-text font-display text-2xl whitespace-nowrap sm:text-3xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
