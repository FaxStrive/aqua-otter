import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LibraryArticleClient from "./LibraryArticleClient";
import { getLibraryArticle, LIBRARY_ARTICLES } from "@/lib/library-articles";

export function generateStaticParams() {
  return LIBRARY_ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getLibraryArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Aqua Otter Library`,
    description: article.description,
  };
}

export default function LibraryArticlePage({ params }: { params: { slug: string } }) {
  const article = getLibraryArticle(params.slug);
  if (!article) notFound();

  // Article + Person JSON-LD. Larry Foster is the founding author.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      "@id": "https://www.myaquaotter.com/#larry",
      name: "Larry Foster",
      jobTitle: "Founder",
      worksFor: { "@id": "https://www.myaquaotter.com/#organization" },
    },
    publisher: { "@id": "https://www.myaquaotter.com/#organization" },
    mainEntityOfPage: `https://www.myaquaotter.com/learn/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <LibraryArticleClient article={article} />
    </>
  );
}
