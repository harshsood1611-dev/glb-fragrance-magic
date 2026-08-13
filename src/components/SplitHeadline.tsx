type SplitHeadlineProps = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Splits a headline into characters and staggers each one in with a blur reveal. */
export function SplitHeadline({
  text,
  className,
  charClassName = "",
  delay = 0,
  stagger = 0.035,
}: SplitHeadlineProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          className={`char-in ${charClassName}`}
          style={{ animationDelay: `${delay + index * stagger}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
