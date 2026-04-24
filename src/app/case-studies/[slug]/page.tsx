import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";
import { getCaseStudy, CASE_STUDIES } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Aqua Otter Case Study`,
    description: cs.subtitle,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  return <CaseStudyClient cs={cs} />;
}
