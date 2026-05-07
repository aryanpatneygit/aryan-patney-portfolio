"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  label?: string;
  /** Render a smaller, square variant suited to inline placement (e.g. About section). */
  compact?: boolean;
}

/**
 * Stand-in for the Spline 3D scene. Renders an animated wireframe sphere
 * so the layout breathes even before the real scene is wired in.
 */
export function SplinePlaceholder({ label, compact = false }: Props) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square h-full max-h-full"
          style={{ width: "auto" }}
        >
          {/* Animated rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              animate={
                reduce
                  ? undefined
                  : {
                      rotate: [0, 360],
                    }
              }
              transition={{
                duration: 28 + i * 14,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full border border-fg/[0.06]"
              style={{
                transform: `scale(${1 - i * 0.18}) rotate(${i * 25}deg)`,
                borderStyle: i === 1 ? "dashed" : "solid",
                borderColor:
                  i === 0 ? "rgb(232 177 74 / 0.18)" : "rgb(244 241 234 / 0.06)",
              }}
            />
          ))}
          {/* Inner orb */}
          <motion.div
            aria-hidden
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-[18%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgb(232 177 74 / 0.25), rgb(232 177 74 / 0.05) 55%, transparent 75%)",
              filter: "blur(8px)",
            }}
          />
          {/* Subtle dot grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-50 mix-blend-soft-light"
            style={{
              backgroundImage:
                "radial-gradient(rgb(244 241 234 / 0.18) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 40%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
      {label && !compact ? (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 label-sm text-fg-subtle">
          {label}
        </div>
      ) : null}
    </div>
  );
}
