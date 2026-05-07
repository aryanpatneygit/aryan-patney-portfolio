"use client";

import { useEffect, useRef } from "react";

interface BlobProps {
  position: { top?: string; right?: string; bottom?: string; left?: string };
  size: string;
  color: string;
  delay?: string;
  blur?: number;
  glowMin?: number;
  glowMax?: number;
  /** Adds a per-blob drift class for organic motion. */
  drift?: "a" | "b" | "c";
}

function Blob({
  position,
  size,
  color,
  delay = "0s",
  blur = 110,
  glowMin = 0.65,
  glowMax = 1,
  drift,
}: BlobProps) {
  const driftClass = drift ? `glow-drift-${drift}` : "";
  return (
    <div
      className={`glow-breathe ${driftClass} absolute rounded-full`}
      style={{
        ...position,
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 78%)`,
        filter: `blur(${blur}px)`,
        animationDelay: delay,
        // @ts-expect-error CSS custom properties for keyframe vars
        "--glow-min": glowMin,
        "--glow-max": glowMax,
      }}
    />
  );
}

/**
 * The radial-glow background. Five fixed blurred blobs in violet / blue /
 * pink / teal that breathe + drift, plus a mouse-reactive central halo
 * that follows the cursor with damped lag for a subtle parallax.
 */
export function RadialGlow() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const halo = haloRef.current;
    if (!halo) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      // Map cursor position into a -1..1 range from viewport center
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      // Damped follow — translate up to ~5% of viewport based on cursor
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      halo.style.transform = `translate3d(${currentX * 5}vw, ${currentY * 5}vh, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Violet — top-left, hero anchor */}
      <Blob
        position={{ top: "-25%", left: "-20%" }}
        size="120vh"
        color="rgb(167 139 250 / 0.42)"
        glowMin={0.7}
        glowMax={1}
        drift="a"
      />
      {/* Blue — upper right */}
      <Blob
        position={{ top: "-12%", right: "-22%" }}
        size="105vh"
        color="rgb(96 165 250 / 0.36)"
        delay="-5s"
        glowMin={0.55}
        glowMax={0.95}
        drift="b"
      />
      {/* Pink — bottom-left */}
      <Blob
        position={{ bottom: "-25%", left: "-10%" }}
        size="95vh"
        color="rgb(244 114 182 / 0.28)"
        delay="-9s"
        glowMin={0.55}
        glowMax={0.85}
        drift="c"
      />
      {/* Teal — bottom-right */}
      <Blob
        position={{ bottom: "-22%", right: "-12%" }}
        size="85vh"
        color="rgb(45 212 191 / 0.26)"
        delay="-13s"
        blur={100}
        glowMin={0.5}
        glowMax={0.8}
        drift="a"
      />

      {/* Central violet halo — follows the cursor with damping. */}
      <div
        ref={haloRef}
        className="absolute inset-0 will-change-transform"
        style={{ contain: "layout paint" }}
      >
        <div
          className="glow-breathe absolute rounded-full"
          style={{
            top: "30%",
            left: "30%",
            width: "60vh",
            height: "60vh",
            background:
              "radial-gradient(closest-side, rgb(181 155 255 / 0.22), transparent 78%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* Fine noise grain */}
      <div className="noise absolute inset-0" />
    </div>
  );
}
