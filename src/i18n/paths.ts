import { routing, type AppLocale } from './routing';
import { serviceSlugs, projectSlugs } from './slugs';

export function isLocale(value: unknown): value is AppLocale {
  return value === 'fr' || value === 'en';
}

/** Translate an internal or public URL using the same routing/entity tables. */
export function localizedPath(href: string, target: AppLocale): string {
  if (!href.startsWith('/') || href.startsWith('//') || /^\/api(?:\/|$)/.test(href)) return href;
  const suffixAt = href.search(/[?#]/);
  const suffix = suffixAt < 0 ? '' : href.slice(suffixAt);
  let path = suffixAt < 0 ? href : href.slice(0, suffixAt);
  path = path.replace(/^\/(fr|en)(?=\/|$)/, '') || '/';
  for (const [internal, translated] of Object.entries(routing.pathnames)) {
    if (internal.includes('[slug]')) continue;
    const paths = typeof translated === 'string' ? {fr: translated, en: translated} : translated;
    if (path === internal || path === paths.fr || path === paths.en) {
      return `/${target}${paths[target] === '/' ? '' : paths[target]}${suffix}`;
    }
  }
  for (const [internal, slugs] of [['/services/[slug]', serviceSlugs], ['/realisations/[slug]', projectSlugs]] as const) {
    const translated = routing.pathnames[internal];
    const paths = typeof translated === 'string' ? {fr: translated, en: translated} : translated;
    for (const entity of Object.values(slugs)) {
      if ([paths.fr.replace('[slug]', entity.fr), paths.en.replace('[slug]', entity.en), internal.replace('[slug]', entity.fr), internal.replace('[slug]', entity.en)].includes(path)) {
        return `/${target}${paths[target].replace('[slug]', entity[target])}${suffix}`;
      }
    }
  }
  // Unknown paths retain their suffix for the localized 404 experience.
  return `/${target}${path}${suffix}`;
}

export function switchLocalePath(href: string, target: AppLocale) {
  return localizedPath(href, target);
}

/**
 * Reconnaissance déterministe des routes publiques HTML valides (FR/EN),
 * calculée depuis les mêmes tables que localizedPath (routing.pathnames +
 * serviceSlugs/projectSlugs) — aucune liste divergente.
 * Utilisé par le garde-fou 404 de src/proxy.ts (INFOTECHS-I18N-001B-R2-FINAL).
 */
export function isKnownPath(locale: AppLocale, path: string): boolean {
  if (path === '/') return true;
  for (const [internal, translated] of Object.entries(routing.pathnames)) {
    if (internal.includes('[slug]')) continue;
    const paths = typeof translated === 'string' ? {fr: translated, en: translated} : translated;
    if (path === paths[locale]) return true;
  }
  for (const [internal, slugs] of [['/services/[slug]', serviceSlugs], ['/realisations/[slug]', projectSlugs]] as const) {
    const translated = routing.pathnames[internal];
    const paths = typeof translated === 'string' ? {fr: translated, en: translated} : translated;
    for (const entity of Object.values(slugs)) {
      if (path === paths[locale].replace('[slug]', entity[locale])) return true;
    }
  }
  return false;
}

export const publicPaths = [
  '/', '/services', '/realisations', '/a-propos', '/contact', '/mentions-legales', '/confidentialite',
  ...Object.values(serviceSlugs).map(s => `/services/${s.fr}`),
  ...Object.values(projectSlugs).map(s => `/realisations/${s.fr}`),
];
