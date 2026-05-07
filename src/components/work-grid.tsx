"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project, ProjectTag } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectTag;
const FILTERS: Filter[] = ["All", "Coding", "HCI", "Design"];

interface Props {
  projects: Project[];
  /** When true, render the filter pill row above the grid. */
  withFilter?: boolean;
}

export function WorkGrid({ projects, withFilter = false }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter, projects]
  );

  return (
    <div>
      {withFilter ? (
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="glass mb-10 inline-flex items-center gap-1 rounded-pill p-1"
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative inline-flex items-center rounded-pill px-3.5 py-1.5 label-sm transition-colors duration-300",
                  active ? "text-fg" : "text-fg-muted hover:text-fg/85"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-pill bg-fg/[0.07] ring-1 ring-fg/[0.12]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        data-stagger="0.14"
        data-stagger-variant="fly"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              data-stagger-item
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
