import { cn } from "@/lib/utils";

interface Props {
  /** Single-word section title, e.g. "Work.", "About.". */
  title: React.ReactNode;
  /** Optional supporting line below the title. */
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <h2
        data-reveal="up"
        className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1] tracking-[-0.04em] text-fg"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-reveal="up"
          data-reveal-delay="0.05"
          className="max-w-[58ch] text-sm text-fg-muted text-pretty md:text-base"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
