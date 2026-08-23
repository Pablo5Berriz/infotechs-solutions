# Infotechs Solutions

Site web officiel de la startup informatique Infotechs Solutions, basé à Saint-Louis-de-Gonzague en Montérégie.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Lucide React

## Gouvernance du dépôt

Branche principale : `master`.

Les contributions et workflows CI ciblent `master`.

## Lancement local

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

Copier `.env.example` vers `.env.local` pour configurer les coordonnées publiques ou les futures intégrations.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Structure

- `src/app` contient les pages, routes dynamiques, sitemap et robots.
- `src/components` contient la navigation, le footer, les cartes, animations et formulaire.
- `src/lib/data.ts` centralise les services, projets, ressources, FAQ, témoignages et informations SEO.
- `public/images` contient les assets visuels du site.

## Pages livrées

- Accueil
- Services
- Détail service
- Réalisations filtrables
- Détail projet
- À propos
- Contact avec formulaire validé côté client
- Ressources
- Mentions légales / confidentialité
- Politique de confidentialité séparée

## SEO et performance

La première version inclut:

- Métadonnées Next.js
- Open Graph
- JSON-LD `LocalBusiness`
- `sitemap.xml`
- `robots.txt`
- URLs propres
- Structure Hn propre
- Contenu SEO en français pour PME, Montérégie et Québec
- Image hero locale optimisée par Next/Image

## Connexions futures prévues

- Envoi du formulaire via Resend ou stockage dans Supabase.
- CMS pour ressources, projets et services: Sanity, Strapi ou Supabase.
- Plausible ou Google Analytics.
- Assistant IA ou espace client.
- Version anglaise via architecture multilingue Next.js.

## Formulaire

La V1 ne transmet pas encore les demandes. Le formulaire valide les champs côté client et une route `POST /api/contact` prépare la validation serveur.

Variables prévues:

- `RESEND_API_KEY`
- `CONTACT_FORM_FROM`
- `CONTACT_FORM_TO`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_CONTACT_TABLE`

Tant qu'aucun fournisseur n'est configuré, la route retourne `501` avec un message explicite.

## Audit npm

Ne pas exécuter `npm audit fix --force`. Le correctif actuellement proposé force un changement cassant de Next.js. Surveiller les versions stables de Next.js et mettre à jour dès qu'un correctif stable règle la vulnérabilité PostCSS.
