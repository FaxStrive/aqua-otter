import type { Metadata } from "next";
import SavingsCalculatorClient from "./SavingsCalculatorClient";

export const metadata: Metadata = {
  title: "Bottled Water Savings Calculator | Aqua Otter Water Systems",
  description:
    "Calculate how much you spend on bottled water and see how much you could save with a whole house water filtration system from Aqua Otter.",
};

export default function SavingsCalculatorPage() {
  return <SavingsCalculatorClient />;
}
