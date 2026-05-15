import type { MetadataRoute } from "next";

const BASE = "https://www.myaquaotter.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/gallery",
    "/reviews",
    "/savings-calculator",
    "/service-areas",
    "/services",
    "/services/free-water-test",
    "/services/maintenance",
    "/services/no-salt-hard-water",
    "/services/reverse-osmosis",
    "/services/water-softeners",
    "/services/well-water-treatment",
    "/services/whole-house-filtration",
    "/privacy",
    "/terms",
  ];

  const statePaths = [
    "/indiana",
    "/michigan",
    "/ohio",
    "/kentucky",
    "/tennessee",
    "/north-carolina",
  ];

  return [...staticPaths, ...statePaths].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1.0 : statePaths.includes(p) ? 0.8 : 0.6,
  }));
}
