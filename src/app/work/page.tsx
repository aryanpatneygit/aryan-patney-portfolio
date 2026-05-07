import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work — Aryan Patney",
  description:
    "Selected projects spanning design engineering, HCI research, and product design.",
};

export default function WorkPage() {
  return (
    <section className="relative pb-32 pt-32 md:pt-40">
      <div className="container">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 label text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5"
          />
          Back home
        </Link>

        <SectionHeading
          title="All work."
          description="Projects across code, research, and design — filter by lens."
        />

        <div className="mt-12">
          <WorkGrid projects={projects} withFilter />
        </div>
      </div>
    </section>
  );
}
