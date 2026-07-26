import type { site as siteData } from "@/lib/site-config";

type SiteInfo = Pick<typeof siteData, "name" | "url" | "email" | "phone" | "description">;

/**
 * Builds the LocalBusiness JSON-LD payload conditionally.
 *
 * Rules (see docs/production-readiness-audit.md, section 3):
 * - Never inject a phone number that is not configured.
 * - Never inject an email address that is not configured.
 * - Never inject placeholder strings ("Téléphone à venir", "Courriel à confirmer", etc.)
 *   into structured data — those are acceptable in visible UI copy, never in JSON-LD.
 *
 * Kept as a pure function (no React) specifically so it can be unit tested
 * without rendering the layout.
 */
export function buildLocalBusinessSchema(site: SiteInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saint-Louis-de-Gonzague",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: ["Montérégie", "Québec"],
    description: site.description,
    sameAs: [],
  };
}

const PLACEHOLDER_PATTERNS = [/à venir/i, /à confirmer/i, /tbd/i, /todo/i, /placeholder/i, /lorem ipsum/i];

/**
 * Guards against placeholder strings leaking into structured data.
 * Used by both the layout and the test suite.
 */
export function containsPlaceholderValue(schema: Record<string, unknown>): boolean {
  return Object.values(schema).some((value) => {
    if (typeof value === "string") {
      return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));
    }
    if (value && typeof value === "object") {
      return containsPlaceholderValue(value as Record<string, unknown>);
    }
    return false;
  });
}
