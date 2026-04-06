import type { Metadata } from "next";
import FreeWaterTestClient from "./FreeWaterTestClient";

export const metadata: Metadata = {
  title: "Free In-Home Water Test | Aqua Otter Water Systems",
  description:
    "Schedule a free in-home water test with Aqua Otter. We test for hardness, iron, sulfur, pH, TDS, bacteria, nitrates, and chlorine — results in minutes.",
};

export default function FreeWaterTestPage() {
  return <FreeWaterTestClient />;
}
