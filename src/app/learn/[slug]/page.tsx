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
  return <LibraryArticleClient article={article} />;
}
