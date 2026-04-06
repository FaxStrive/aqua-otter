import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aqua Otter Water Systems",
  description:
    "Get answers to common questions about water testing, no-salt treatment, installation, pricing, service areas, and more from Aqua Otter Water Systems.",
};

export default function FAQPage() {
  return <FAQClient />;
}
