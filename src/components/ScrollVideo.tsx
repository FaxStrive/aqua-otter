"use client";

import { useRef, useEffect } from "react";

interface ScrollVideoProps {
  src: string;
  className?: string;
  threshold?: number;
}

/**
 * ScrollVideo — plays when scrolled into view, pauses when out.
 */
export default function ScrollVideo({ src, className = "", threshold = 0.3 }: ScrollVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
