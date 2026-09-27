import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {isLocale, isKnownPath} from './i18n/paths';
import {renderNotFoundHtml} from './i18n/not-found-html';

const intlMiddleware = (request: NextRequest) =>
  createMiddleware({...routing, localeCookie:{...(typeof routing.localeCookie==='object'?routing.localeCookie:{}), secure:request.nextUrl.protocol==='https:'}})(request);

// Next.js 16 accepts a single default function; next-intl returns NextResponse.
export default function proxy(request: NextRequest) {
  // Garde-fou 404 (INFOTECHS-I18N-001B-R2-FINAL) : pour une URL de page HTML
  // deja prefixee /fr/... ou /en/... qui ne correspond a aucune route
  // publique connue, on renvoie directement un document 404 HTML localise
  // complet, sans passer par le rendu Next defectueux (cf. vercel/next.js#97000).
  // Les routes valides et tout le reste (API, _next, assets) sont inchanges.
  if (request.method === 'GET' || request.method === 'HEAD') {
    const {pathname} = request.nextUrl;
    const match = pathname.match(/^\/(fr|en)(\/.*)?$/);
    if (match) {
      const locale = match[1];
      const rest = match[2] ?? '/';
      if (isLocale(locale) && !isKnownPath(locale, rest)) {
        const response = renderNotFoundHtml(locale);
        if (request.method === 'HEAD') {
          return new Response(null, {status: response.status, headers: response.headers});
        }
        return response;
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)', '/(fr|en)/:path*'],
};
