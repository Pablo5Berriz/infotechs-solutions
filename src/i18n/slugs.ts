// Stable identities and explicit localized slugs. Relations never use translated slugs.
export const serviceSlugs = {
  "web": {
    "fr": "creation-sites-web",
    "en": "website-creation"
  },
  "automation": {
    "fr": "automatisation-ia",
    "en": "ai-automation"
  },
  "custom": {
    "fr": "applications-web-sur-mesure",
    "en": "custom-web-applications"
  },
  "audit": {
    "fr": "audit-et-cadrage",
    "en": "audit-and-planning"
  }
} as const;
export const projectSlugs = {
  "garage": {
    "fr": "site-web-garage-local",
    "en": "local-garage-website"
  },
  "reservation": {
    "fr": "plateforme-reservation",
    "en": "booking-platform"
  },
  "gestion": {
    "fr": "application-gestion-interne",
    "en": "internal-management-application"
  },
  "automation": {
    "fr": "automatisation-administrative",
    "en": "administrative-automation"
  },
  "dashboard": {
    "fr": "tableau-bord-pme",
    "en": "business-dashboard"
  },
  "mobile": {
    "fr": "application-mobile-service-local",
    "en": "mobile-experience"
  }
} as const;
