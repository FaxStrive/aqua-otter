import type { Metadata } from "next";
import WellWaterClient from "./WellWaterClient";

export const metadata: Metadata = {
  title: "Well Water Treatment | Aqua Otter Water Systems",
  description:
    "Expert well water treatment in Southern Michigan. We eliminate iron, sulfur, bacteria, manganese, and more with custom filtration systems built for your well.",
};

export default function WellWaterTreatmentPage() {
  return <WellWaterClient />;
}
