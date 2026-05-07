"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";
import { HeroSpline } from "@/components/hero-spline";

const FADE_UP = (delay: number, reduce: boolean | null) =>
  reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, delay },
      }
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      };

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const splineWrapRef = useRef<HTMLDivElement>(null);

  /**
   * Forward pointer movement from anywhere in the hero into the Spline
   * canvas. Spline's runtime listens to `pointermove` (not `mousemove`),
   * so we synthesise pointer events on the canvas using the original
   * viewport coords. That lets the robot's eyes track the cursor across
   * the WHOLE hero — including over the text column on the left.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap = splineWrapRef.current;
    if (!section || !wrap) return;

    const onMove = (e: PointerEvent) => {
      const canvas = wrap.querySelector("canvas");
      if (!canvas) return;
      // Don't double-fire if the event is already on the canvas
      if (canvas.contains(e.target as Node)) return;
      try {
        canvas.dispatchEvent(
          new PointerEvent("pointermove", {
            clientX: e.clientX,
            clientY: e.clientY,
            pointerType: "mouse",
            bubbles: false,
            cancelable: false,
          })
        );
      } catch {
        // Older browsers without PointerEvent constructor — fall through
      }
    };

    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Spline canvas — desktop only.
          Hidden on mobile entirely: the runtime is heavy, mobile devices
          struggle, and the text-only mobile layout reads better. The
          `hidden lg:block` keeps the DOM out of the mobile tree, and
          HeroSpline also bails its init below the lg breakpoint as a
          belt-and-braces guard. */}
      <div
        ref={splineWrapRef}
        className="z-0 hidden lg:absolute lg:inset-y-0 lg:right-[-14%] lg:left-[40%] lg:block xl:left-[44%] xl:right-[-12%]"
      >
        <HeroSpline />
      </div>

      {/* Text column — vertically centered in the hero, horizontally centered
          within its own container so it doesn't feel hard-pinned to the left
          edge. Sits in the left ~38% on desktop, full-width above the robot
          on mobile. */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pt-24 text-center sm:px-8 sm:pt-28 lg:items-start lg:pt-0 lg:text-left">
        <div className="flex w-full max-w-[44rem] flex-col items-center text-center lg:max-w-[44rem] lg:items-start lg:text-left">
          {/* Status pill */}
          <motion.div {...FADE_UP(0.05, reduce ?? null)}>
            <Pill>
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
              </span>
              <span className="pill-text text-fg/75">
                <span className="text-fg/90">{site.title}</span>
                <span className="px-1.5 text-fg/40">·</span>
                <span>Available</span>
              </span>
              <span className="h-3 w-px bg-fg/15" aria-hidden />
              <Link
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-fg-muted transition-colors hover:text-accent"
              >
                <LinkedInIcon size={12} />
              </Link>
            </Pill>
          </motion.div>

          {/* Headline — two-tier hierarchy:
              • intro line (smaller, lighter): "Hi, I'm Aryan Patney."
              • statement (huge, extrabold): "I build sh*t that just works." */}
          <motion.h1
            {...FADE_UP(0.18, reduce ?? null)}
            className="mt-7 w-full text-balance"
          >
            <span className="block text-[clamp(1.6rem,2.7vw,2.5rem)] font-medium text-fg/85">
              {site.hero.greeting} <em className="font-semibold">{site.hero.name}</em>
            </span>
            <span className="mt-3 block text-[clamp(3rem,6.4vw,5.75rem)] font-extrabold leading-[0.98] text-fg">
              {site.hero.line} <em>{site.hero.emWord}</em>
              {site.hero.rest ? (
                <>
                  {" "}
                  <span className="text-fg/85">{site.hero.rest}</span>
                </>
              ) : null}
            </span>
          </motion.h1>

          {/* Discipline pill */}
          <motion.div {...FADE_UP(0.4, reduce ?? null)} className="mt-7">
            <DisciplinePill items={["Design", "Code", "HCI"]} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...FADE_UP(0.55, reduce ?? null)}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTAPrimary href="#work">Selected work</CTAPrimary>
            <CTAGhost href="#contact">Get in touch</CTAGhost>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass inline-flex items-center gap-2.5 rounded-pill px-3.5 py-1.5">
      {children}
    </div>
  );
}

/**
 * The discipline pill is intentionally larger + more present than the status
 * pill — it's the substantive claim about *what* I do, not chrome.
 */
function DisciplinePill({ items }: { items: string[] }) {
  return (
    <div className="glass inline-flex items-center gap-3 rounded-pill px-5 py-2.5">
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-3">
          <span className="text-[0.95rem] font-semibold leading-none tracking-tight text-fg">
            {item}
          </span>
          {i < items.length - 1 ? (
            <span
              aria-hidden
              className="text-[0.95rem] font-semibold leading-none text-accent"
            >
              ×
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function CTAPrimary({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-pill border border-fg/15 bg-fg/[0.04] px-5 py-2.5 text-sm font-semibold text-fg backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-fg/[0.08]"
      >
        {children}
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

function CTAGhost({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <span>{children}</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </Link>
    </motion.div>
  );
}
