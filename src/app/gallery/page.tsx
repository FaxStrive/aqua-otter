import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Aqua Otter Water Systems",
  description:
    "Browse our gallery of water treatment installations and products. See real results from Aqua Otter Water Systems across 5 states.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
