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
            description="Four pieces below — the full archive lives on the work page."
            className="md:max-w-[58ch]"
          />
          <Link
            href="/work"
            className="group hidden shrink-0 items-center gap-2 self-start rounded-pill border border-fg/15 bg-fg/[0.03] px-4 py-2 text-sm text-fg/85 backdrop-blur-md transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/35 hover:text-fg md:inline-flex"
          >
            View all work
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12">
          <WorkGrid projects={featuredProjects} />
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-pill border border-fg/15 bg-fg/[0.03] px-5 py-2.5 text-sm text-fg/85 backdrop-blur-md transition-all duration-300 ease-out-expo hover:border-accent/35 hover:text-fg"
          >
            View all work
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
