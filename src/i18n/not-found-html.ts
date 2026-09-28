import type { AppLocale } from './routing';
import type { Theme } from '../lib/theme';
import frErrors from '../../messages/fr/errors.json';
import enErrors from '../../messages/en/errors.json';

// Garde-fou SSR pour les URL publiques inconnues (INFOTECHS-I18N-001B-R2-FINAL).
// Contourne le chemin defectueux de rendu notFound() de Next 16.3.x (shell
// __next_error__ initial, cf. vercel/next.js#97000) en renvoyant directement
// un document 404 HTML complet, valide sans JavaScript, depuis src/proxy.ts.
//
// SECURITE : tout le contenu provient de constantes applicatives controlees
// (messages/*/errors.json). Aucune donnee de requete (pathname, query,
// headers) n'est interpolee dans le HTML.
//
// PRESENTATION (INFOTECHS-404-PRESENTATION-001) : CSS inline uniquement,
// sans dependance au bundle Next.js (ce garde doit rester independant de
// l'hydratation React). Les tokens couleur ci-dessous sont une duplication
// volontaire, sanctionnee par ce lot, du sous-ensemble "Graphite & Electric
// Violet" de src/app/globals.css (lot INFOTECHS-DESIGN-PALETTE-003A) requis
// par cette page autonome. Toute derive de ces valeurs par rapport a
// globals.css doit etre signalee au rapport 003A.
//
// THEMING (INFOTECHS-THEME-001) : ce garde ne peut pas dependre de la
// cascade CSS partagee de globals.css (contrainte d'independance vis-a-vis
// du bundle applicatif). Duplication volontaire, ici sous forme de deux
// jeux de constantes hexadecimales (LIGHT/DARK), de la meme direction que
// globals.css. Le theme est lu depuis le cookie "theme" par src/proxy.ts et
// transmis en parametre ; a defaut de cookie, LIGHT (regle produit section 3).

const PALETTES: Record<Theme, {
  colorScheme: string; bodyBg: string; bodyGlow: string; fg: string;
  cardBg: string; cardBorder: string; eyebrow: string; muted: string;
  focus: string; btnSecondaryBorder: string;
}> = {
  light: {
    colorScheme: 'light', bodyBg: '#faf9fc',
    bodyGlow: 'radial-gradient(circle at 50% 0%,rgba(101,40,255,0.10),rgba(250,249,252,0) 60%)',
    fg: '#1a1720', cardBg: '#ffffff', cardBorder: '#e1dcec', eyebrow: '#5211e6',
    muted: '#5c5668', focus: '#6528ff', btnSecondaryBorder: '#8f88a0',
  },
  dark: {
    colorScheme: 'dark', bodyBg: '#121316',
    bodyGlow: 'radial-gradient(circle at 50% 0%,rgba(101,40,255,0.22),rgba(18,19,22,0) 60%)',
    fg: '#f4f1ea', cardBg: '#1c1e22', cardBorder: '#2a2d33', eyebrow: '#b6a3ff',
    muted: '#9b9690', focus: '#9575ff', btnSecondaryBorder: '#2a2d33',
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderNotFoundHtml(locale: AppLocale, theme: Theme = 'light'): Response {
  const errors = locale === 'en' ? enErrors : frErrors;
  const m = errors.notFound;
  const htmlLang = locale === 'fr' ? 'fr-CA' : 'en-CA';
  const homeHref = `/${locale}`;
  const contactHref = `/${locale}/contact`;
  const p = PALETTES[theme];

  const title = escapeHtml(m.title.absolute);
  const description = escapeHtml(m.description);
  const eyebrow = escapeHtml(m.eyebrow);
  const heading = escapeHtml(m.heading);
  const text = escapeHtml(m.text);
  const homeLabel = escapeHtml(m.home);
  const contactLabel = escapeHtml(m.contact);

  const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<style>
  :root{color-scheme:${p.colorScheme};}
  *{box-sizing:border-box;}
  body{
    margin:0;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:32px 24px;
    background:${p.bodyBg};
    background-image:${p.bodyGlow};
    color:${p.fg};
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  main{
    width:100%;
    max-width:560px;
    text-align:center;
  }
  .brand{
    display:inline-block;
    margin:0 0 40px;
    font-size:15px;
    font-weight:600;
    letter-spacing:0.02em;
    color:${p.fg};
    text-decoration:none;
    border-radius:6px;
  }
  .card{
    position:relative;
    padding:48px 32px;
    border:1px solid ${p.cardBorder};
    border-radius:10px;
    background:${p.cardBg};
    box-shadow:0 0 24px rgba(101,40,255,0.12);
    overflow:hidden;
  }
  .card::before{
    content:"";
    position:absolute;
    top:-60px;
    right:-60px;
    width:180px;
    height:180px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(101,40,255,0.35),rgba(101,40,255,0) 70%);
    pointer-events:none;
  }
  .eyebrow{
    position:relative;
    margin:0 0 16px;
    font-size:13px;
    font-weight:700;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:${p.eyebrow};
  }
  h1{
    position:relative;
    margin:0 0 16px;
    font-size:clamp(24px,5vw,32px);
    line-height:1.25;
    font-weight:700;
    color:${p.fg};
  }
  p.text{
    position:relative;
    margin:0 0 32px;
    font-size:16px;
    line-height:1.6;
    color:${p.muted};
  }
  .actions{
    position:relative;
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    justify-content:center;
  }
  .btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:44px;
    padding:12px 24px;
    border-radius:6px;
    font-size:15px;
    font-weight:600;
    text-decoration:none;
    line-height:1.2;
  }
  .btn-primary{
    background:#6528ff;
    color:#f4f1ea;
    border:1px solid #6528ff;
  }
  .btn-secondary{
    background:transparent;
    color:${p.fg};
    border:1px solid ${p.btnSecondaryBorder};
  }
  a:focus-visible,
  .btn:focus-visible{
    outline:2px solid ${p.focus};
    outline-offset:2px;
  }
  @media (prefers-reduced-motion:no-preference){
    .btn{transition:opacity .15s ease;}
  }
</style>
</head>
<body>
<main>
<a class="brand" href="${homeHref}">Infotechs Solutions</a>
<div class="card">
<p class="eyebrow">${eyebrow}</p>
<h1>${heading}</h1>
<p class="text">${text}</p>
<div class="actions">
<a class="btn btn-primary" href="${homeHref}">${homeLabel}</a>
<a class="btn btn-secondary" href="${contactHref}">${contactLabel}</a>
</div>
</div>
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
