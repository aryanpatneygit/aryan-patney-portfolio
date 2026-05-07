"use client";

import { useEffect, useRef, useState } from "react";

const SCENE_URL =
  "https://prod.spline.design/m6nr9LSGTGDtdqk0/scene.splinecode";

type SplineApp = {
  dispose?: () => void;
  load: (url: string) => Promise<void>;
  setBackgroundColor?: (color: string) => void;
};

export function HeroSpline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Respect reduced-motion preferences — skip the WebGL load entirely
    // on devices / users who'd rather opt out of intensive animation.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    let app: SplineApp | null = null;

    const sizeCanvas = () => {
      if (!canvasRef.current || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvasRef.current.width = w * dpr;
      canvasRef.current.height = h * dpr;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
    };

    const ro = new ResizeObserver(() => sizeCanvas());

    const init = async () => {
      // wait for layout
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      if (cancelled) return;
      sizeCanvas();
      ro.observe(wrap);

      try {
        const mod = await import("@splinetool/runtime");
        if (cancelled) return;
        const Application = mod.Application as unknown as new (
          c: HTMLCanvasElement
        ) => SplineApp;
        const instance = new Application(canvas);
        await instance.load(SCENE_URL);
        if (cancelled) {
          instance.dispose?.();
          return;
        }
        // Force the scene background to transparent so the page glow
        // shows through the robot's surroundings.
        try {
          instance.setBackgroundColor?.("rgba(0,0,0,0)");
        } catch {
          /* noop */
        }
        app = instance;
        sizeCanvas();
        setStatus("ready");
      } catch (err) {
        console.error("[Spline] failed to load", err);
        if (!cancelled) setStatus("error");
      }
    };

    void init();

    return () => {
      cancelled = true;
      ro.disconnect();
      try {
        app?.dispose?.();
      } catch {
        /* noop */
      }
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        aria-label="Interactive 3D robot"
      />
      {status === "loading" ? <SplineFallback /> : null}
      {status === "error" ? <SplineFallback subdued /> : null}
    </div>
  );
}

function SplineFallback({ subdued = false }: { subdued?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-16">
      <div
        aria-hidden
        className={`relative aspect-square h-[40%] max-h-[360px] ${
          subdued ? "" : "glow-breathe"
        }`}
      >
        <div
          className="absolute inset-0 rounded-full border border-fg/[0.08]"
          style={{ borderStyle: "dashed" }}
        />
        <div
          className="absolute inset-[20%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgb(181 155 255 / 0.35), transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>
    </div>
  );
}
