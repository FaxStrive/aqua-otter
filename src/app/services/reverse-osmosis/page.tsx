import type { Metadata } from "next";
import ReverseOsmosisClient from "./ReverseOsmosisClient";

export const metadata: Metadata = {
  title: "Reverse Osmosis Systems | Aqua Otter Water Systems",
  description:
    "Pure drinking water with reverse osmosis filtration from Aqua Otter. 99% contaminant removal, better taste, and no more bottled water. Serving Southern Indiana.",
};

export default function ReverseOsmosisPage() {
  return <ReverseOsmosisClient />;
}
