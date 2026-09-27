import type { site as siteData } from "@/lib/site-config";

type SiteInfo = Pick<typeof siteData, "name" | "url" | "email" | "phone" | "description" | "contact">;

/**
 * Builds the LocalBusiness JSON-LD payload conditionally.
 *
 * Rules (see docs/production-readiness-audit.md, section 3):
 * - Publish only the normalized phone and structured address from site-config.
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
    telephone: site.contact.phone.schema,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.streetAddress,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.regionCode,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.countryCode,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.contact.businessHours.schemaDays,
      opens: site.contact.businessHours.opens,
      closes: site.contact.businessHours.closes,
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
