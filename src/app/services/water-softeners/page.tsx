import type { Metadata } from "next";
import WaterSoftenersClient from "./WaterSoftenersClient";

export const metadata: Metadata = {
  title: "Water Softener Systems | Aqua Otter Water Systems",
  description:
    "Professional water softener installation in Southern Michigan. Ion-exchange systems that eliminate hard water scale, protect your plumbing, and extend appliance life.",
};

export default function WaterSoftenersPage() {
  return <WaterSoftenersClient />;
}
