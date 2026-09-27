import type { AppLocale } from './routing';
import frErrors from '../../messages/fr/errors.json';
import enErrors from '../../messages/en/errors.json';
import frNav from '../../messages/fr/navigation.json';
import enNav from '../../messages/en/navigation.json';

// Garde-fou SSR pour les URL publiques inconnues (INFOTECHS-I18N-001B-R2-FINAL).
// Contourne le chemin defectueux de rendu notFound() de Next 16.3.x (shell
// __next_error__ initial, cf. vercel/next.js#97000) en renvoyant directement
// un document 404 HTML complet, valide sans JavaScript, depuis src/proxy.ts.
//
// SECURITE : tout le contenu provient de constantes applicatives controlees
// (messages/*/errors.json, messages/*/navigation.json). Aucune donnee de
// requete (pathname, query, headers) n'est interpolee dans le HTML.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderNotFoundHtml(locale: AppLocale): Response {
  const errors = locale === 'en' ? enErrors : frErrors;
  const nav = locale === 'en' ? enNav : frNav;
  const m = errors.notFound;
  const htmlLang = locale === 'fr' ? 'fr-CA' : 'en-CA';
  const homeHref = `/${locale}`;
  const contactHref = `/${locale}/contact`;

  const title = escapeHtml(m.title.absolute);
  const description = escapeHtml(m.description);
  const eyebrow = escapeHtml(m.eyebrow);
  const heading = escapeHtml(m.heading);
  const text = escapeHtml(m.text);
  const homeLabel = escapeHtml(m.home);
  const contactLabel = escapeHtml(nav.items.contact);

  const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
</head>
<body>
<main>
<p>${eyebrow}</p>
<h1>${heading}</h1>
<p>${text}</p>
<p><a href="${homeHref}">${homeLabel}</a></p>
<p><a href="${contactHref}">${contactLabel}</a></p>
</main>
</body>
</html>
`;

  return new Response(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
