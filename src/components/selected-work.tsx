import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "@/components/work-grid";

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Work."
            description="A selection below, the full archive lives on the work page."
            className="md:max-w-[58ch]"
          />
          <ViewAllCTA className="hidden md:inline-flex" />
        </div>

        <div className="mt-12">
          <WorkGrid projects={featuredProjects} />
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <ViewAllCTA className="md:hidden" />
          <ViewAllCTA className="hidden md:inline-flex" prominent />
        </div>
      </div>
    </section>
  );
}

/**
 * The "View all work" call-to-action.
 *
 * Two visual modes:
 *  • default  , used at the top-right of the section header
 *  • prominent, used below the grid; bigger, accent-bordered, violet
 *                glow on hover. The bigger one is what the user actually
 *                completes their scroll on, so it earns the weight.
 */
function ViewAllCTA({
  className = "",
  prominent = false,
}: {
  className?: string;
  prominent?: boolean;
}) {
  // Always-on base classes, `inline-flex` keeps the pill on one line and
  // `whitespace-nowrap` is the belt-and-braces guard against narrow mobile
  // viewports breaking "View all work" + arrow onto two lines.
  const base =
    "group inline-flex items-center gap-2 whitespace-nowrap rounded-pill backdrop-blur-md transition-all duration-300 ease-out-expo";

  const variant = prominent
    ? "border border-accent/45 bg-accent/[0.08] px-7 py-3.5 text-base font-semibold text-fg hover:-translate-y-0.5 hover:border-accent/80 hover:bg-accent/[0.16] hover:shadow-accent-glow"
    : "border border-fg/15 bg-fg/[0.03] px-4 py-2 text-sm text-fg/85 hover:-translate-y-0.5 hover:border-accent/35 hover:text-fg";

  return (
    <Link href="/work" className={`${base} ${variant} ${className}`.trim()}>
      View all work
      <ArrowRight
        size={prominent ? 16 : 14}
        strokeWidth={1.75}
        className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
      />
    </Link>
  );
}
