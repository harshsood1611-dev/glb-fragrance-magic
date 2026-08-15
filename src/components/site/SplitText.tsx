import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Per-character blur-in entrance for headlines. */
export function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.035,
}: Props) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className={cn("char-in", charClassName)}
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
