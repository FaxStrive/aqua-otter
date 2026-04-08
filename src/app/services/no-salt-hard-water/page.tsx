import type { Metadata } from "next";
import NoSaltClient from "./NoSaltClient";

export const metadata: Metadata = {
  title: "No-Salt Hard Water Treatment | Aqua Otter Water Systems",
  description:
    "Eco-friendly no-salt hard water treatment in Southern Michigan. No salt bags, no brine, no wasted water — just naturally conditioned water for your whole home.",
};

export default function NoSaltHardWaterPage() {
  return <NoSaltClient />;
}
