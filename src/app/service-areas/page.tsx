import type { Metadata } from "next";
import ServiceAreasClient from "./ServiceAreasClient";

export const metadata: Metadata = {
  title: "Service Areas | Aqua Otter Water Systems",
  description:
    "Aqua Otter Water Systems proudly serves Indiana, Michigan, Ohio, Kentucky, and Tennessee. Find your city and schedule a free water test today.",
};

export default function ServiceAreasPage() {
  return <ServiceAreasClient />;
}
