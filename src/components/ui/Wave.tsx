// Reusable SVG wave divider — place between sections to replace boring horizontal cuts

type WaveVariant = "gentle" | "sharp" | "double" | "splash";

export default function Wave({
  from,
  to,
  variant = "gentle",
  flip = false,
  height = 80,
}: {
  from: string;
  to: string;
  variant?: WaveVariant;
  flip?: boolean;
  height?: number;
}) {
  const paths: Record<WaveVariant, string> = {
    gentle: `M0,${height/2} C360,${height} 1080,0 1440,${height/2} L1440,${height} L0,${height} Z`,
    sharp:  `M0,${height*0.7} C480,0 960,${height} 1440,${height*0.3} L1440,${height} L0,${height} Z`,
    double: `M0,${height*0.5} C240,${height} 480,0 720,${height*0.5} C960,${height} 1200,0 1440,${height*0.5} L1440,${height} L0,${height} Z`,
    splash: `M0,${height*0.6} Q180,0 360,${height*0.4} Q540,${height} 720,${height*0.3} Q900,0 1080,${height*0.5} Q1260,${height} 1440,${height*0.4} L1440,${height} L0,${height} Z`,
  };

  return (
    <div style={{ lineHeight: 0, backgroundColor: from }}>
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height,
          display: "block",
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={paths[variant]} fill={to} />
      </svg>
    </div>
  );
}
