import type { Metadata } from "next";
import MaintenanceClient from "./MaintenanceClient";

export const metadata: Metadata = {
  title: "System Maintenance & Service | Aqua Otter Water Systems",
  description:
    "Keep your water treatment system running at peak performance. Aqua Otter offers valve cleanings, filter replacements, checkups, and re-testing across Southern Michigan.",
};

export default function MaintenancePage() {
  return <MaintenanceClient />;
}
