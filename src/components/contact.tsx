"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container">
        <SectionHeading
          align="center"
          title="Hello."
          description="Open to design engineering roles, research collaborations, and the occasional weekend experiment."
        />

        <div
          data-reveal="up"
          className="mt-14 flex flex-col items-center gap-8"
        >
          <Link
            href={`mailto:${site.email}`}
            className="group relative inline-block"
          >
            <motion.span
              whileHover={reduce ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="block break-all text-[clamp(1.4rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-fg/95 transition-colors duration-300 group-hover:text-accent"
            >
              {site.email}
            </motion.span>
            <span
              aria-hidden
              className="block h-px w-full origin-left scale-x-0 bg-accent/60 transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
            />
          </Link>

          <div className="flex items-center gap-5 label text-fg-muted">
            <Link
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
              aria-label="LinkedIn"
            >
              <LinkedInIcon
                size={14}
                className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
              />
              LinkedIn
            </Link>
            <span className="h-3 w-px bg-fg/15" aria-hidden />
            <Link
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              CV ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
