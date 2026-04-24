export default function Marquee() {
  const items = [
    "Lifetime Warranty Available",
    "Free In-Home Water Test",
    "500+ Families Served",
    "Licensed & Insured",
    "Same-Week Installation",
    "Indiana & Michigan",
    "No Guesswork — Just Science",
    "City & Well Water Specialists",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y py-3.5"
      style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.12)" }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, #F0F8FF, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, #F0F8FF, transparent)" }} />

      <div className="flex marquee-track whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-5">
            <span
              className="text-xs font-medium tracking-[0.13em] uppercase"
              style={{ color: "rgba(12,31,46,0.45)" }}
            >
              {item}
            </span>
            <span
              className="inline-block w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#12BDFB", opacity: 0.45 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
