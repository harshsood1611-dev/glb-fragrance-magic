import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
};

export function Marquee({ items, reverse, className, separator = "✦" }: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-border py-5",
        className,
      )}
    >
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 px-8 font-display text-2xl whitespace-nowrap sm:text-3xl"
          >
            {item}
            <span className="text-primary">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
