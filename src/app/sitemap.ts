import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { SERVICE_SLUGS } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { LIBRARY_ARTICLES } from "@/lib/library-articles";

const BASE = "https://www.myaquaotter.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/how-it-works",
    "/contact",
    "/get-started",
    "/reviews",
    "/gallery",
    "/service-areas",
    "/financing",
    "/warranty",
    "/faq",
    "/privacy",
    "/terms",
    "/learn",
    "/learn/what-we-filter",
    "/glossary",
    "/case-studies",
    "/systems/water-softener",
    "/systems/filtration",
    "/systems/reverse-osmosis",
    "/systems/well-water",
    "/systems/uv-purification",
    "/systems/no-salt",
  ].map(p => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const cityPaths = SERVICE_AREAS.map(a => ({
    url: `${BASE}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityServicePaths = SERVICE_AREAS.flatMap(a =>
    SERVICE_SLUGS.map(s => ({
      url: `${BASE}/service-areas/${a.slug}/${s}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  const caseStudyPaths = CASE_STUDIES.map(c => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const libraryPaths = LIBRARY_ARTICLES.map(a => ({
    url: `${BASE}/learn/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPaths, ...cityPaths, ...cityServicePaths, ...caseStudyPaths, ...libraryPaths];
}
