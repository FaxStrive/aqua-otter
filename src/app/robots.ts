import type { MetadataRoute } from "next";

// Explicitly Allow: / for every major AI crawler. Default catch-all (*)
// is also allowed. Explicit rules survive future tightening of the
// catch-all and signal intent to AI auditors and crawler-rule scanners.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "CCBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: "https://www.myaquaotter.com/sitemap.xml",
    host: "https://www.myaquaotter.com",
  };
}
