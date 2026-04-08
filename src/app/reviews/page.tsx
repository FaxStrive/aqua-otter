import type { Metadata } from "next";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Customer Reviews | Aqua Otter Water Systems",
  description:
    "See what homeowners say about Aqua Otter Water Systems. 5-star reviews for water softener, reverse osmosis, and well water treatment installations across Southern Michigan.",
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
