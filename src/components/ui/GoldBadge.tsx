"use client";

interface GoldBadgeProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
}

export default function GoldBadge({ text, className = "", size = "sm" }: GoldBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-light)] text-[var(--color-accent)] ${
        size === "sm" ? "text-[11px] px-2.5 py-0.5" : "text-xs px-3 py-1"
      } ${className}`}
    >
      {text}
    </span>
  );
}
