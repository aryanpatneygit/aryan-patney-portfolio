"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const REVEAL_THRESHOLD = 0.92;

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ----- Smooth scroll via Lenis -----
    const lenis = prefersReduced
      ? null
      : new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.4,
        });

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // ----- Section reveals + staggers -----
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const alreadyVisible =
          rect.top < window.innerHeight * REVEAL_THRESHOLD &&
          rect.bottom > 0;

        if (alreadyVisible) return;

        const direction = el.dataset.reveal ?? "up";
        const fromVars: gsap.TweenVars = { opacity: 0 };
        if (!prefersReduced) {
          if (direction === "up") fromVars.y = 36;
          if (direction === "left") fromVars.x = -52;
          if (direction === "right") fromVars.x = 52;
          if (direction === "scale") {
            fromVars.scale = 0.92;
            fromVars.y = 24;
          }
        }

        gsap.fromTo(
          el,
          fromVars,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: prefersReduced ? 0.25 : 1.05,
            ease: "expo.out",
            delay: parseFloat(el.dataset.revealDelay ?? "0"),
            scrollTrigger: {
              trigger: el,
              start: `top ${REVEAL_THRESHOLD * 100}%`,
              once: true,
            },
          }
        );
      });

      const groups = gsap.utils.toArray<HTMLElement>("[data-stagger]");
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (!items.length) return;

        const rect = group.getBoundingClientRect();
        const alreadyVisible =
          rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
        if (alreadyVisible) return;

        // "Fly in" — bigger y offset, slight per-item rotation, longer
        // duration with expo ease, alternating x for a gentle parallax.
        const variant = group.dataset.staggerVariant ?? "default";
        const flyIn = variant === "fly";

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: prefersReduced ? 0 : flyIn ? 96 : 32,
            scale: prefersReduced ? 1 : flyIn ? 0.9 : 0.96,
            rotate: prefersReduced || !flyIn ? 0 : (i: number) => (i % 2 === 0 ? -2 : 2),
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: prefersReduced ? 0.25 : flyIn ? 1.2 : 0.95,
            ease: "expo.out",
            stagger: parseFloat(group.dataset.stagger ?? "0.08"),
            scrollTrigger: {
              trigger: group,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
