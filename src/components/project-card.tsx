"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CometCard } from "@/components/ui/comet-card";

const hintToGradient: Record<NonNullable<Project["hint"]>, string> = {
  violet:
    "linear-gradient(135deg, rgb(167 139 250 / 0.28), rgb(80 60 140 / 0.18) 55%, rgb(20 18 28 / 0.5))",
  blue: "linear-gradient(135deg, rgb(96 165 250 / 0.28), rgb(40 60 110 / 0.18) 55%, rgb(16 20 28 / 0.5))",
  pink: "linear-gradient(135deg, rgb(244 114 182 / 0.26), rgb(120 50 90 / 0.18) 55%, rgb(24 18 24 / 0.5))",
  teal: "linear-gradient(135deg, rgb(45 212 191 / 0.26), rgb(40 90 90 / 0.18) 55%, rgb(16 22 22 / 0.5))",
  neutral:
    "linear-gradient(135deg, rgb(240 240 248 / 0.10), rgb(80 78 96 / 0.10) 55%, rgb(20 20 26 / 0.5))",
};

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  const reduce = useReducedMotion();
  const gradient = hintToGradient[project.hint ?? "neutral"];

  // Comet Card's defaults are dramatic — dial them down for a card grid.
  // No tilt at all if the user prefers reduced motion.
  const cometProps = reduce
    ? { rotateDepth: 0, translateDepth: 0 }
    : { rotateDepth: 7, translateDepth: 8 };

  return (
    <CometCard {...cometProps} className="h-full">
      <article className="group glass relative flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-500 hover:!border-fg/[0.16]">
        <Link
          href={`/work/${project.slug}`}
          aria-label={`Read more about ${project.title}`}
          className="absolute inset-0 z-20"
        />
        {/* Visual */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={1200}
              height={750}
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder gradient={gradient} index={index} />
          )}

          <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-pill border border-fg/[0.12] bg-bg/60 px-2.5 py-1 label-sm text-fg/85 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="label-sm whitespace-nowrap text-fg-muted">
              {project.year}
            </span>
          </div>

          <div className="pointer-events-none absolute right-4 bottom-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg/15 bg-bg/60 text-fg/80 backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:border-accent/50 group-hover:text-accent">
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2 px-5 py-5 md:px-6 md:py-6">
          <h3 className="text-xl font-semibold leading-tight text-fg md:text-[22px]">
            {project.title}
          </h3>
          <p className="text-sm text-fg-muted text-pretty md:text-[14.5px]">
            {project.blurb}
          </p>
        </div>

        {/* Hover ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgb(181 155 255 / 0.22)" }}
        />
      </article>
    </CometCard>
  );
}

function Placeholder({
  gradient,
  index,
}: {
  gradient: string;
  index: number;
}) {
  return (
    <div className="relative h-full w-full" style={{ background: gradient }}>
      <div className="absolute left-5 bottom-4 label-sm text-fg/55">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(rgb(240 240 248 / 0.45) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgb(8 8 12 / 0.6), transparent)",
        }}
      />
    </div>
  );
}
