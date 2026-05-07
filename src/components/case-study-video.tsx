"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  src: string;
  poster?: string;
  alt?: string;
}

/**
 * Auto-playing hero video for case studies.
 * Browsers require `muted` for autoplay to work without a user gesture, so
 * the video starts silent and offers a small glass toggle to unmute. The
 * toggle is keyboard- and screen-reader accessible.
 */
export function CaseStudyVideo({ src, poster, alt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        aria-label={alt}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="glass absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-fg/85 transition-colors duration-300 hover:text-accent"
      >
        {muted ? (
          <VolumeX size={16} strokeWidth={1.75} />
        ) : (
          <Volume2 size={16} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
