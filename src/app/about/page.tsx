import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Aqua Otter Water Systems",
  description:
    "Family-owned water treatment experts serving 5 states. Specializing in no-salt water treatment, well water solutions, and free water testing with honest, test-based recommendations.",
};

export default function AboutPage() {
  return <AboutClient />;
}
