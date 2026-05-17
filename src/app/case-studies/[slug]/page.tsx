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

  // Article + Person JSON-LD. Larry Foster is the founding author.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.subtitle,
    author: {
      "@type": "Person",
      "@id": "https://www.myaquaotter.com/#larry",
      name: "Larry Foster",
      jobTitle: "Founder",
      worksFor: { "@id": "https://www.myaquaotter.com/#organization" },
    },
    publisher: { "@id": "https://www.myaquaotter.com/#organization" },
    mainEntityOfPage: `https://www.myaquaotter.com/case-studies/${cs.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CaseStudyClient cs={cs} />
    </>
  );
}
