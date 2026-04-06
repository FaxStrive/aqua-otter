import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Aqua Otter Water Systems",
  description:
    "Schedule your FREE water test today. Call, text, or fill out our form. Serving Indiana, Michigan, Ohio, Kentucky, and Tennessee.",
};

export default function ContactPage() {
  return <ContactClient />;
}
