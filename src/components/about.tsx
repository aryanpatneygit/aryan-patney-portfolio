"use client";

import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading title="About." />

          <div className="mt-8 space-y-5">
            {site.about.body.map((para, i) => (
              <p
                key={i}
                data-reveal="left"
                data-reveal-delay={`${0.05 + i * 0.08}`}
                className="max-w-[58ch] text-base text-fg/85 text-pretty md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>

          <div
            data-stagger="0.05"
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Disciplines"
          >
            {site.about.chips.map((chip) => (
              <span
                key={chip}
                data-stagger-item
                className="glass rounded-pill px-3 py-1.5 label-sm text-fg-muted"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill border border-fg/15 bg-fg/[0.03] px-5 py-2.5 text-sm font-medium text-fg backdrop-blur-md transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-fg/[0.06] hover:shadow-accent-glow"
            >
              <ArrowDownToLine
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
              />
              Download CV
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-5 lg:items-center">
          <div
            data-reveal="scale"
            className="glass relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl"
            aria-label="Photograph of Aryan Patney"
          >
            {site.photo ? (
              <PixelatedCanvas
                src={site.photo}
                width={520}
                height={650}
                cellSize={4}
                dotScale={0.85}
                shape="square"
                backgroundColor="rgb(9, 8, 14)"
                tintColor="#B59BFF" /* site accent */
                tintStrength={0.12}
                dropoutStrength={0.32}
                interactive
                distortionStrength={3}
                distortionRadius={70}
                distortionMode="swirl"
                followSpeed={0.18}
                jitterStrength={3}
                jitterSpeed={3}
                fadeOnLeave
                fadeSpeed={0.1}
                responsive
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgb(40 36 56 / 0.6), rgb(20 18 28 / 0.6))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(rgb(240 240 248 / 0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 35%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="accent-em text-6xl">AP</div>
          <div className="mt-3 label-sm text-fg-subtle">
            Photograph goes here
          </div>
        </div>
      </div>
    </div>
  );
}
