import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Aqua Otter Water Systems",
  description:
    "Explore Aqua Otter&apos;s complete water treatment services — free water testing, well water treatment, no-salt hard water, softeners, reverse osmosis, whole house filtration, and maintenance in Southern Indiana.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
