"use client";

interface WaveDividerProps {
  variant?: "wave1" | "wave2" | "wave3" | "ripple";
  topColor?: string;
  bottomColor?: string;
  className?: string;
}

export default function WaveDivider({
  variant = "wave1",
  topColor = "#ffffff",
  bottomColor = "#f8fafb",
  className = "",
}: WaveDividerProps) {
  // Each path: wave shape drawn at bottom of viewbox.
  // topColor fills the background, bottomColor fills the wave (which becomes the next section).
  const paths = {
    wave1: "M0,40 C320,80 640,10 960,40 C1280,70 1440,20 1440,20 L1440,120 L0,120 Z",
    wave2: "M0,30 Q360,70 720,30 Q1080,0 1440,30 L1440,120 L0,120 Z",
    wave3: "M0,25 C200,60 400,5 600,35 C800,65 1000,10 1200,45 C1350,65 1440,30 1440,30 L1440,120 L0,120 Z",
    ripple: "M0,35 C160,60 320,10 480,35 C640,60 800,10 960,35 C1120,60 1280,10 1440,35 L1440,120 L0,120 Z",
  };

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${className}`}
      style={{ background: topColor, marginBottom: -1 }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[50px] sm:h-[70px] lg:h-[90px] block"
      >
        <path d={paths[variant]} fill={bottomColor} />
      </svg>
    </div>
  );
}
