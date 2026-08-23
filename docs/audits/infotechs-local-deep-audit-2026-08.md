# Audit local complet - Infotechs Solutions

Date: 2026-08-23
Auditeur: Codex local
Perimetre: depot local `C:\Users\paulq\Downloads\Projets\Infotechs Solutions`
Mode: lecture seule du code, commandes d'audit, aucune correction, aucun commit, aucun deploy.

## 1. Executive summary

Le depot local est bien sur la baseline attendue: branche `master`, SHA `4da508095e79b9a851972f2db26f2deea6b00637`, remote `https://github.com/Pablo5Berriz/infotechs-solutions.git`, working tree initial propre.

Le projet est nettement plus avance que la V1 initiale: contenu separe, formulaire connecte a une route API serveur, validation Zod partagee, honeypot, rate limiting, headers de securite, CI, tests Vitest, pages legales, rapports QA et documentation d'exploitation. Les validations locales demandeees passent: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`.

Le principal blocage production actuel est la securite des dependances. `npm audit` et `npm audit --omit=dev` signalent des vulnerabilites high, dont Next.js via PostCSS et sharp en production. La CI existe, mais elle cible `main` alors que la branche officielle locale et distante visible est `master`. Conclusion: CI active sur `master`: NO.

Verdict production: NO GO. Le site est proche d'une release candidate technique, mais la production reste bloquee par l'audit npm, la CI non declenchee sur `master`, l'absence de recette Resend reelle, l'absence de health endpoint, le rate limiting memoire non distribue, et des incoherences documentaires.

## 2. Baseline

Commandes exigees:

| Commande | Resultat |
|---|---|
| `git rev-parse HEAD` | `4da508095e79b9a851972f2db26f2deea6b00637` |
| `git branch --show-current` | `master` |
| `git remote -v` | `origin https://github.com/Pablo5Berriz/infotechs-solutions.git` fetch et push |
| `git status --short` | sortie vide |
| `git branch -vv` | `* master 4da5080 [origin/master] docs(product): define maintenance operating model` |

Baseline conforme. Audit poursuivi.

## 3. Git state

`git status`: propre, branche a jour avec `origin/master`.
Historique recent: 16 commits visibles depuis `Initial commit from Create Next App` jusqu'a `docs(product): define maintenance operating model`.
Branches visibles: `master`, `origin/master`. Aucune branche locale ou distante `main` ni `claude/infotechs-technical-audit-ge1gpe` n'est visible dans ce clone.

Le `.gitignore` couvre correctement `node_modules`, `.next`, `out`, `.env*` avec exception pour `.env.example`, `coverage`, `*.tsbuildinfo`, screenshots locaux et artefacts de design temporaires. `git ls-files` ne montre pas `node_modules`, `.next`, `out`, `.env.local` ni `tsconfig.tsbuildinfo` suivis par Git.

Risques Git:

| Priorite | Constat | Preuve | Impact |
|---|---|---|---|
| P1 | CI cible `main`, branche reelle `master` | `.github/workflows/ci.yml` declenche push/PR sur `main`; `git branch -a` ne montre que `master` | HEAD actuel non couvert par CI GitHub |
| P2 | Branches historiques demandees absentes du clone | `git branch -a` ne liste pas `claude/...` | Impossible d'auditer leur divergence locale |
| P3 | Fichiers de captures et rapports lourds versionnes dans `docs` | inventaire `docs/design/screens`, `docs/qa/exports`, `docs/contact/screens` | Depot plus lourd, maintenance documentaire plus couteuse |

## 4. Repository structure

Inventaire principal:

- `src/app`: App Router, pages, API contact, sitemap, robots, tests.
- `src/components`: header, footer, formulaire, experiences interactives, badges, reveal, tests.
- `src/lib`: configuration site, contenus services/projets/about, schema.org, contact schema, delivery, rate limit, identity, tests.
- `.github/workflows/ci.yml`: workflow CI.
- `docs`: nombreux rapports QA, securite, produit, legal, design, operations.
- `public/images`: `hero-technology-workspace.png`, `Infotechs.png`.
- Config: `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.env.example`.

Routes reelles d'apres le build:

- `/`
- `/_not-found`
- `/a-propos`
- `/api/contact`
- `/confidentialite`
- `/contact`
- `/mentions-legales`
- `/realisations`
- `/realisations/[slug]`: 6 pages SSG
- `/robots.txt`
- `/services`
- `/services/[slug]`: 4 pages SSG
- `/sitemap.xml`

Divergence avec README: le README mentionne encore `Ressources` dans les pages livrees et des variables Supabase, alors que le build ne publie plus `/ressources` et `.env.example` ne contient plus Supabase.

## 5. Architecture

Next.js App Router: YES.
SSR: pages publiques pre-rendues; route API dynamique.
SSG: pages statiques et routes dynamiques `services/[slug]`, `realisations/[slug]` via `generateStaticParams`.
API runtime: Node requis pour `/api/contact`.
Static export: NO, pas de `output: "export"`.
Node runtime requis: YES.
Server Actions: aucune Server Action trouvee.
Middleware: absent.
Image optimization: pas d'usage `next/image` detecte dans le code lu; images locales servies comme assets.
Dynamic routes: services et realisations.

`next.config.ts` applique des headers de securite a `/(.*)` et desactive `poweredByHeader`. CSP actuelle:

- `default-src 'self'`
- `base-uri 'self'`
- `form-action 'self'`
- `frame-ancestors 'none'`
- `object-src 'none'`
- `img-src 'self' data:`
- `font-src 'self'`
- `connect-src 'self'`
- `script-src 'self' 'unsafe-inline'`
- `style-src 'self' 'unsafe-inline'`

L'application est hybride. Un hebergement statique pur casserait `/api/contact`.

## 6. Dependencies

Scripts `package.json`:

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`
- `test`: `vitest run`

Absents: `typecheck`, `test:watch`, `e2e`, `coverage`, `ci`. La CI appelle explicitement lint/test/build mais pas `npx tsc --noEmit`.

Versions principales:

- Next `16.2.12`
- React `19.2.4`
- TypeScript `^5`, installe `5.9.3`
- Tailwind `^4`, installe `4.3.0`
- Zod `^4.4.3`
- React Hook Form `^7.78.0`
- Framer Motion `^12.40.0`
- Lucide React `^1.17.0`
- Vitest `^3.2.4`, installe `3.2.7`

`npm outdated` signale plusieurs mises a jour disponibles, dont `next` latest `16.3.2`, `react` latest `19.2.8`, `framer-motion` latest `13.1.1`, `typescript` latest `7.0.2`.

Audit npm:

| Package | Direct | Portee | Severite | Exploitabilite contexte | Fix |
|---|---:|---|---|---|---|
| `next` | YES | PROD | HIGH | Exposition indirecte via runtime public App Router et pipeline Next | `16.3.2` propose hors version epinglee |
| `postcss` | NO | PROD via Next | HIGH | Faible si aucun CSS utilisateur, mais present dans chaine production | via Next `16.3.2` |
| `sharp` | NO | PROD via Next | HIGH | Faible actuellement si pas d'upload/image optimization utilisateur, mais present | via Next `16.3.2` |
| `nanoid` | NO | PROD ou transitive installee | HIGH | Probablement faible sans generateur custom expose, a verifier par arbre exact | `npm audit fix` |
| `brace-expansion` | NO | DEV principalement | HIGH | Faible, outillage glob controle par depot | `npm audit fix` |
| `js-yaml` | NO | DEV principalement | HIGH | Faible si YAML non fourni par utilisateur | `npm audit fix` |

`npm audit --omit=dev`: 4 high.
`npm audit`: 6 high.
Aucun `npm audit fix` ni `npm audit fix --force` execute.

## 7. Build and tests

Commandes exactes:

| Commande | Exit code | Resultat | Temps approx. |
|---|---:|---|---:|
| `npx tsc --noEmit` | 0 | PASS, aucune sortie | 6 s |
| `npm run lint` | 0 | PASS, aucune erreur | 43 s |
| `npm test` | 0 | PASS, 189 tests, 29 fichiers | 9 s |
| `npm run build` | 0 | PASS, 23 routes/pages generees | 25 s |

Tests:

- Test files: 29
- Tests: 189 passed
- E2E: NO
- Playwright: NO dans `package.json`
- Axe: NO dans scripts courants, mais exports historiques existent dans `docs/qa`
- Coverage: NO

Les tests couvrent surtout inspection de sources, rendu React serveur, modules de contenu, route API contact, headers et invariants. C'est utile, mais fragile pour les tests qui inspectent des chaines HTML ou des sources. Il manque une vraie couche E2E navigateur et a11y automatisee active en CI.

## 8. CI

Workflow: `.github/workflows/ci.yml`.

Declencheurs:

- `pull_request` branches `[main]`
- `push` branches `[main]`

Etapes:

- checkout
- setup Node `22`
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`

Permissions: `contents: read`. Pas de deploy. Pas d'artefacts. Pas de job audit npm. Pas de typecheck explicite. Pas d'E2E. Pas de Lighthouse/axe. Cache npm present.

CI ACTIVE SUR MASTER: NO.
Le HEAD actuel sur `master` n'est pas couvert par les triggers GitHub declares.

## 9. Security

Points solides:

- Headers applicatifs configures dans `next.config.ts`: CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`.
- `X-Powered-By` desactive.
- Pas de `eval(` ni `new Function` dans le code applicatif recherche.
- Zod configure en `jitless` pour eviter le probe JIT client.
- Validation serveur stricte pour contact.
- Limite de corps `16_384` octets.
- Honeypot.
- Timeout provider `AbortSignal.timeout(10_000)`.
- Idempotency-Key Resend par reference.
- Secrets Resend lus seulement cote serveur.
- `.env.local` ignore par Git et non lu pendant cet audit.

Risques:

- `script-src 'unsafe-inline'` et `style-src 'unsafe-inline'` restent presents. Comprenable pour Next/JSON-LD/Framer Motion, mais ce n'est pas une CSP stricte.
- Pas de HSTS au niveau application. Documente comme responsabilite reverse proxy/Cloudflare.
- Rate limit en memoire, non partage entre instances, remis a zero au restart.
- Mode proxy par defaut utilise une identite unique `contact-client:untrusted-proxy`, ce qui limite tout le monde ensemble si `CONTACT_TRUSTED_PROXY_MODE` n'est pas active derriere proxy controle.
- Pas de CSRF token. Risque limite pour un endpoint JSON/form contact sans session, mais spam cross-site possible.
- Pas de CORS explicite. Par defaut acceptable si meme origine, mais a documenter si API future.
- `dangerouslySetInnerHTML` existe pour JSON-LD. Donnees controlees par `buildLocalBusinessSchema`, testees contre placeholders, risque XSS faible si seules donnees controlees sont injectees.
- `console.info/error` journalise reference, reason, providerId. Pas de payload brut observe.

## 10. Contact pipeline

Flux reel:

```text
Browser
-> src/components/contact-form.tsx
-> fetch POST /api/contact en JSON
-> src/app/api/contact/route.ts
-> readPayload avec limite 16 KiB
-> contactRateLimit(resolveContactClientIdentity(request))
-> contactSchema.safeParse(...)
-> honeypot website
-> deliverContactRequest(...)
-> Resend API https://api.resend.com/emails si configuration valide
```

Validation client: schema partage `contactSchema` via `zodResolver`.
Validation serveur: meme schema, `.strict()`.
Body size: 16 KiB.
Honeypot: champ `website`.
Rate limiting: 5 requetes par 10 minutes par identite, stockage `Map` memoire, limite 10 000 identites.
Identite client: header `x-infotechs-client-ip` uniquement si `CONTACT_TRUSTED_PROXY_MODE=trusted`, sinon fallback unique.
Trusted proxy: prepare mais depend d'une configuration proxy stricte non prouvee.
Idempotency: header Resend `contact/<reference>`.
Timeout: 10 s.
Resend: actif seulement si `RESEND_API_KEY`, `CONTACT_FORM_FROM`, `CONTACT_FORM_TO` valides.
Injection email: `from` et `to` valides, CRLF refuse; `subject` derive d'un enum.
Pieces jointes: absentes.
Stockage: aucun stockage applicatif.
Comportement sans configuration: 503 depuis route API apres validation.

Critique: README et `docs/privacy-data-flow.md` decrivent encore un ancien formulaire local non envoye ou une route 501/Supabase. Le code actuel envoie bien vers `/api/contact` et vise Resend, pas Supabase.

## 11. Content architecture

Sources canoniques actuelles:

- `src/lib/site-config.ts`: site, navigation, coordonnees, horaires, adresse, keywords.
- `src/lib/service-offerings.ts`: 4 offres publiees.
- `src/lib/project-portfolio.ts`: 6 concepts demonstratifs.
- `src/lib/about-content.ts`: principes et methodologie.
- `src/lib/data.ts`: restes editoriaux transversaux de l'accueil.

Amelioration par rapport a une grosse source unique: oui. Mais plusieurs objets restent couples a l'UI:

- `service-offerings.ts` importe `LucideIcon` et des icones Lucide. Cela complique serialization JSON, CMS, API et traduction.
- `process`, `outcomes`, `capabilities` sont des arrays simples sans IDs, ordre et statut de publication granularises.
- Pas de `draft/published` pour les projets, seulement `status: concept/client`.
- Pas de modele i18n par locale.
- Relations par IDs manuelles, sans validation runtime hors tests.

Readiness CMS: partielle. Avant CMS, extraire les icones en slugs, separer contenu pur et presentation, ajouter schemas serialisables.

## 12. Services

Nombre reel d'offres publiees: 4.

Offres:

1. `creation-sites-web`
2. `automatisation-ia`
3. `applications-web-sur-mesure`
4. `audit-et-cadrage`

Maintenance: aucune offre maintenance publiee. Des tests verifient explicitement l'absence de route Maintenance.
Prix/delais: absents des offres, ce qui reduit le risque de promesse non prouvee.
Promesses 24/7: non trouvees dans les offres.
Cybersecurite avancee: non vendue comme service publie.
Footer et sitemap: bases sur `serviceOfferings`, coherents.

Risque produit: l'offre est credible mais plus etroite que le brief initial. Ce n'est pas un bug, mais un choix commercial a assumer.

## 13. Portfolio

Nombre de projets: 6.

Tous les projets sont `status: "concept"` via helper `concept(...)`. Aucun projet client reel publie.

Classification:

| Projet | Statut |
|---|---|
| Site web pour garage local | CONCEPT |
| Plateforme de reservation | CONCEPT |
| Application de gestion interne | CONCEPT |
| Automatisation administrative | CONCEPT |
| Tableau de bord PME | CONCEPT |
| Application mobile pour service local | CONCEPT |

Les limitations sont explicites dans chaque projet: absence de client reel, absence de donnees d'usage, absence de resultats mesures. Cela reduit le risque de confusion. Aucun chiffre de performance client reel non prouve n'est trouve dans `project-portfolio.ts`.

Manque: donnees structurees de type CreativeWork/Project absentes. Aucune preuve client reelle, aucun logo, aucun cas publie.

## 14. SEO

Metadata globale: presente dans `layout.tsx`.
Canonical global: `site.url`. Pages individuelles ont besoin d'etre verifiees au cas par cas; le modele global peut produire des canonicals moins precis si non surcharge par page.
Open Graph: present globalement.
Robots: `allow /`, sitemap absolu.
Sitemap: routes statiques principales, 4 services, 6 realisations. `/ressources` et `/fondations` absentes, coherent avec tests.
JSON-LD: `LocalBusiness` avec telephone, adresse structuree, horaires, areaServed, `sameAs: []`.

Risques SEO:

- `sameAs: []` inutile.
- Choix `LocalBusiness` discutable si l'adresse et l'accessibilite publique ne sont pas juridiquement/operationnellement confirmees.
- Pas de pages ressources/blog publiees malgre README.
- Pas d'i18n reel, mais `alternates.languages` declare seulement `fr-CA` et `x-default`, pas d'anglais.
- Pas de donnees structurees pour services/projets.

## 15. Accessibility

Preuves locales actuelles:

- Tests unitaires sur header, footer, formulaire, pages.
- Exports historiques axe/Lighthouse dans `docs/qa`.
- Code: `main`, `nav`, H1 par pages, labels formulaire, `aria-invalid`, `aria-describedby`, `role=alert/status`, menu mobile avec `aria-expanded`.
- `Reveal` prend en compte reduced motion et CSS global contient des gardes.

Limites:

- Aucun script axe ou Playwright actif dans `package.json`.
- Aucun test lecteur d'ecran reel.
- Pas de declaration WCAG PASS possible sur la base de tests unitaires uniquement.
- Les exports QA existent, mais ne sont pas automatiquement rejoues par la CI.

Conclusion accessibilite: bonne base, pas encore certification.

## 16. UI/UX

Points forts:

- Direction visuelle plus distinctive que la V1 initiale: palette graphite/cuivre, typographies Hanken/Public Sans/JetBrains.
- Navigation claire, CTA unique plus sobre.
- Contact explicite et consentement visible.
- Portfolio honnete sur les concepts.
- Services limites et mieux cadres.

Risques:

- Site tres textuel, peu de preuves reelles.
- Direction "startup/architecte" credible, mais peut paraitre plus consultant solo que societe etablie.
- Pas de page ressources active. Cela reduit la profondeur SEO.
- Les rapports et captures dans `docs` sont nombreux et peuvent brouiller la maintenance.
- Peu d'assets metier reels.

## 17. i18n

I18N: PARTIEL.

Faits:

- `html lang="fr-CA"`.
- `alternates.languages` contient `fr-CA` et `x-default`.
- Pas de `next-intl`.
- Pas de routes `/fr`, `/en`.
- Pas de middleware locale.
- Pas de dictionnaires.
- Pas de language switcher.

Dette avant FR/EN: externaliser toutes les chaines, rendre les contenus serialisables, ajouter strategy de routing locale, generer metadata par locale, separer slugs par langue.

## 18. Theme

DARK: design sombre principal.
LIGHT: sections ou cartes claires limitees par tokens, mais pas theme clair complet.
SYSTEM: non.
THEME SWITCHER: absent.
PERSISTENCE: absente.

La structure CSS utilise des tokens custom (`--color-bg-*`, `--color-text-*`, cuivre). Un theme clair est possible, mais demanderait un mapping semantique plus strict et une passe visuelle complete. Actuellement, le design n'est pas pret pour un toggle theme sans refactor UX.

## 19. CMS/admin

CMS: absent.
ADMIN UI: absent.
CONTENT EDITING: par fichiers TypeScript.

Recherches: pas de `/admin`, dashboard, studio, Sanity, Strapi, Payload, Supabase CMS, auth admin, RBAC, preview, draft workflow.

Prealables CMS:

- rendre les contenus serialisables;
- remplacer les icones React par identifiants;
- definir statuts draft/published;
- modeler les relations services/projets;
- ajouter preview;
- ajouter validation de schema hors UI.

## 20. Observability

Observabilite applicative actuelle:

- Logs `console.info/error` cote API avec reference et reason/providerId.
- Pas de logger structure centralise.
- Pas de correlation ID propage cote client.
- Pas de `/api/health`.
- Pas de Sentry.
- Pas d'OpenTelemetry.
- Pas de metrics.
- Pas d'uptime configure.
- Runbook decrit Uptime Kuma futur.

Conclusion: observabilite minimale, non operationnelle.

## 21. Documentation drift

Etat documentaire:

| Document | Statut | Drift |
|---|---|---|
| `README.md` | PARTIELLEMENT OBSOLETE | mentionne `/ressources`, Supabase et route 501 alors que le code actuel utilise Resend et ne publie pas `/ressources` |
| `.env.example` | PARTIELLEMENT A JOUR | coherent avec Resend, mais plus de Supabase contrairement au README |
| `docs/privacy-data-flow.md` | OBSOLETE | affirme formulaire local sans `fetch` et API 501/Supabase; contredit le code actuel |
| `docs/production-readiness-audit.md` | PARTIELLEMENT OBSOLETE | baseline ancienne, Next 16.2.9, 21 tests; certains constats corriges, d'autres toujours utiles |
| `docs/deployment-vps.md` | PARTIELLEMENT OBSOLETE | commandes utiles, mais `git checkout main` incoherent avec branche `master` |
| `docs/operations-runbook.md` | PARTIELLEMENT OBSOLETE | idem `git checkout main`, health endpoint toujours absent |
| `docs/security/infotechs-security-001-report.md` | PARTIELLEMENT A JOUR | decrit Next 16.2.12 et risques residuels, mais chiffres tests/build anciens |
| `docs/qa/infotechs-qa-001-report.md` | HISTORIQUE | utile comme preuve historique, pas preuve reexecutee aujourd'hui |

CONTRADICTION AVEC AUDIT EXTERNE:

Je ne dispose pas du rapport PM GitHub separe dans le contexte local. Je ne peux pas confirmer ou refuter ses conclusions. En revanche, il existe des contradictions internes locales entre le code actuel et des documents d'audit plus anciens, notamment `privacy-data-flow.md` et `production-readiness-audit.md`.

## 22. Branch audit

Branches locales/distantes visibles:

- `master`
- `origin/master`

Relation: `master` pointe sur `origin/master` au meme SHA `4da5080`.
`main`: absente localement et a distance dans ce clone.
`claude/infotechs-technical-audit-ge1gpe`: absente localement et a distance dans ce clone.

Impossible de calculer divergence, fichiers uniques ou relation d'ancetre pour des branches non presentes. Recommandation: ne pas supprimer ce qui n'est pas visible depuis ce clone; verifier sur GitHub avant nettoyage distant.

## 23. Production readiness

Verdict: NO GO.

Bloqueurs actuels reels:

1. `npm audit --omit=dev` signale 4 vulnerabilites high en production/transitives.
2. CI non active sur `master`.
3. Pas de recette Resend reelle avec domaine, SPF/DKIM, destinataire, reply-to, logs.
4. Rate limiter memoire non distribue et depend d'une configuration proxy non prouvee.
5. Pas de health endpoint pour supervision runtime.
6. Documentation deploiement/runbook reference `main`, branche absente.
7. Revue juridique non prouvee pour confidentialite et donnees personnelles.

Non-bloqueurs:

- TypeScript, lint, tests, build passent.
- Working tree initial propre.
- Pas de secrets suivis visibles.
- Portfolio conceptuel clarifie.

## 24. Risk register

| ID | Priorite | Domaine | Risque | Preuve | Impact | Probabilite | Recommandation |
|---|---|---|---|---|---|---|---|
| R1 | P0 | CI | CI ne couvre pas `master` | workflow branches `[main]`, branche reelle `master` | regressions non bloquees avant merge/push | Elevee | corriger triggers vers `master` ou renommer branche avec migration controlee |
| R2 | P0 | Securite | Vulnerabilites high prod | `npm audit --omit=dev` | exposition supply chain/runtime | Moyenne | mettre a jour Next et lockfile, retester |
| R3 | P1 | Contact | Resend non recette en conditions reelles | code Resend present, aucune preuve domaine/SPF/DKIM | demandes perdues ou delivrabilite faible | Moyenne | recette staging avec domaine verifie |
| R4 | P1 | Rate limit | compteur memoire et fallback global | `contact-rate-limit`, `contact-client-identity` | DoS logique, blocage global ou contournement multi-instance | Moyenne | KV/Redis ou integration proxy verifiee |
| R5 | P1 | Ops | Pas de health endpoint | runbook le signale, aucune route | monitoring peu fiable | Moyenne | ajouter `/api/health` |
| R6 | P1 | Docs | README/privacy docs contredisent code | README, privacy-data-flow | mauvaises decisions de prod | Elevee | mise a jour documentaire atomique |
| R7 | P2 | SEO | `LocalBusiness` peut etre discutable | schema-org avec adresse/telephone | mauvaise representation locale | Moyenne | valider type schema et adresse |
| R8 | P2 | CMS | contenu couple a LucideIcon | `service-offerings.ts` | migration CMS compliquee | Elevee | decoupler contenu et presentation |
| R9 | P2 | Tests | pas d'E2E actif | package scripts | regressions UI non detectees | Moyenne | ajouter Playwright + axe en CI |
| R10 | P3 | Depot | artefacts docs lourds | inventaire docs/screens/exports | repo lourd, revue difficile | Moyenne | politique d'archivage artefacts |

## 25. Scoring

| Axe | Note | Justification |
|---|---:|---|
| Architecture | 7/10 | App Router propre, contenu separe, route API claire. Le runtime Node est assume. Le couplage contenu/UI et l'absence de health endpoint limitent la robustesse. |
| Code quality | 8/10 | TypeScript strict, lint propre, modules bien separes pour contact et contenu. Quelques fichiers contenu sont compacts et peu lisibles, notamment `project-portfolio.ts`. |
| Security | 6/10 | Headers, validation, honeypot et limites existent. Audit npm high et CSP avec unsafe-inline empechent une note plus haute. |
| Testing | 7/10 | 189 tests dans 29 fichiers. Bonne couverture invariants, mais pas d'E2E navigateur actif ni coverage. |
| CI/CD | 4/10 | Workflow minimal correct techniquement, mais cible `main` au lieu de `master`. Pas de deploy, audit, typecheck explicite, E2E. |
| UX/UI | 7/10 | UI coherente, distinctive, responsive selon preuves historiques. Manque de preuves reelles et profondeur commerciale. |
| Accessibility | 7/10 | Bons patterns ARIA et tests. Pas de test axe/lecteur d'ecran rejoue dans la CI actuelle. |
| SEO | 7/10 | Metadata, sitemap, robots, JSON-LD presents. Ressources absentes, schema local a valider, pas de donnees services/projets. |
| Content architecture | 6/10 | Sources separees mais encore couplees a React/Lucide et non pretes CMS/i18n. |
| Documentation | 5/10 | Beaucoup de documentation, mais plusieurs documents sont obsoletes ou contradictoires. |
| Operations | 4/10 | Runbook et deploiement documentes. Rien n'est actif, pas de health, monitoring absent. |
| Production readiness | 4/10 | Build/test bons, mais securite deps, CI master, Resend, ops et juridique bloquent. |
| Maintainability | 7/10 | Structure correcte et tests nombreux. Dette documentaire et contenu non serialisable a surveiller. |
| Scalability | 5/10 | Suffisant pour site PME mono-instance. Rate limit memoire et absence observabilite limitent multi-instance. |

## 26. Recommendations

### REC-01 - Corriger CI sur master

PROBLEME: CI declenche sur `main`, branche reelle `master`.
CAUSE: workflow non aligne avec gouvernance Git.
SOLUTION: changer triggers vers `master` ou migrer officiellement vers `main` avec remote et docs.
EFFORT: XS.
RISQUE DE REGRESSION: LOW.
PREREQUIS: decision nom de branche.
VALIDATION: push/PR sur branche officielle declenche CI.

### REC-02 - Traiter audit npm sans force aveugle

PROBLEME: 4 high en prod avec `--omit=dev`.
CAUSE: dependances transitives Next/sharp/PostCSS/nanoid.
SOLUTION: tester mise a jour Next stable compatible, puis `npm ci`, typecheck, lint, tests, build, smoke. Ne pas utiliser `npm audit fix --force` sans revue.
EFFORT: S.
RISQUE DE REGRESSION: MEDIUM.
PREREQUIS: branche dediee.
VALIDATION: audit reduit ou risque accepte formellement, validations vertes.

### REC-03 - Mettre a jour README et docs critiques

PROBLEME: docs contredisent code.
CAUSE: evolution rapide apres rapports historiques.
SOLUTION: README, privacy-data-flow, deployment-vps, operations-runbook alignes avec Resend, master et routes reelles.
EFFORT: S.
RISQUE DE REGRESSION: LOW.
PREREQUIS: etat cible decide.
VALIDATION: checklist docs vs code.

### REC-04 - Recette Resend reelle

PROBLEME: pipeline code existe mais delivrabilite non prouvee.
CAUSE: secrets/domaine/provider non valides localement.
SOLUTION: environnement staging, domaine verifie, test de transmission, logs sans PII brute.
EFFORT: M.
RISQUE DE REGRESSION: MEDIUM.
PREREQUIS: domaine, email destinataire, politique confidentialite validee.
VALIDATION: POST contact 202 avec email recu, reference tracee.

### REC-05 - Ajouter health endpoint

PROBLEME: monitoring runtime impossible a distinguer d'une page cachee.
CAUSE: pas de `/api/health`.
SOLUTION: route GET minimale et test.
EFFORT: XS.
RISQUE DE REGRESSION: LOW.
PREREQUIS: aucun.
VALIDATION: 200 JSON `{ ok: true }`, headers presents.

### REC-06 - Externaliser rate limiting

PROBLEME: memoire locale non distribuee.
CAUSE: `Map` process.
SOLUTION: Redis, Upstash, Cloudflare Turnstile/rate limiting, ou rate limit proxy.
EFFORT: M.
RISQUE DE REGRESSION: MEDIUM.
PREREQUIS: architecture prod choisie.
VALIDATION: tests multi-instance ou proxy.

### REC-07 - Ajouter E2E et axe en CI

PROBLEME: pas de tests navigateur actifs.
CAUSE: Vitest seulement.
SOLUTION: Playwright pour navigation, contact, mobile menu, a11y axe.
EFFORT: M.
RISQUE DE REGRESSION: MEDIUM.
PREREQUIS: CI branche corrigee.
VALIDATION: job E2E vert sur routes critiques.

### REC-08 - Decoupler contenu et icones

PROBLEME: contenu non serialisable CMS.
CAUSE: `LucideIcon` dans modeles.
SOLUTION: remplacer par `iconKey`, mapper cote UI.
EFFORT: S.
RISQUE DE REGRESSION: LOW.
PREREQUIS: schema contenu cible.
VALIDATION: tests serialization JSON.

### REC-09 - Valider schema.org local

PROBLEME: `LocalBusiness` peut surrepresenter un etablissement physique.
CAUSE: decision SEO locale non confirmee.
SOLUTION: choisir `LocalBusiness`, `ProfessionalService` ou `Organization` selon preuve adresse/service.
EFFORT: XS.
RISQUE DE REGRESSION: LOW.
PREREQUIS: decision fondateur.
VALIDATION: test schema.org et Rich Results si applicable.

### REC-10 - Politique artefacts docs

PROBLEME: nombreux screenshots/exports versionnes.
CAUSE: audits visuels stockes dans Git.
SOLUTION: definir ce qui reste versionne et ce qui va en artefact CI/release.
EFFORT: S.
RISQUE DE REGRESSION: LOW.
PREREQUIS: besoin historique.
VALIDATION: taille depot et conventions docs.

## 27. Proposed roadmap

Ordre recommande:

1. Repository hardening: corriger CI sur `master`, ajouter typecheck et audit npm en job non destructif.
2. Security dependencies: mise a jour Next/deps, retest complet, decision d'acceptation residuelle documentee.
3. Documentation sync: README, privacy-data-flow, runbook, deployment VPS alignes avec code actuel.
4. Contact production readiness: recette Resend, domaine, logs, confidentialite, test bout en bout.
5. Observability: `/api/health`, monitoring Uptime Kuma, runbook execute sur staging.
6. E2E/accessibility: Playwright + axe en CI, parcours Contact et mobile menu.
7. Content model cleanup: decoupler icones, schemas serialisables, preparation CMS/i18n.
8. Production deployment rehearsal: deploy staging VPS/Traefik, verification headers/HSTS selon domaine.
9. i18n: seulement apres modele contenu nettoye.
10. Theme: seulement si besoin produit confirme, car le design actuel est sombre par intention.
11. CMS/admin: apres i18n/content model, pas avant.
12. 004C-3A Maintenance: a traiter comme offre/operation separee apres clarification commerciale, pas comme prerequis technique au lancement.

## 28. Final verdict

PRODUCTION: NO GO.

Le code applicatif est de bonne qualite pour une preproduction locale: typecheck, lint, tests et build passent. Mais une mise en ligne professionnelle serait prematuree tant que la CI ne couvre pas `master`, que l'audit npm high n'est pas traite ou accepte formellement, que Resend n'a pas ete recette en vrai, que l'observabilite minimale n'existe pas, et que la documentation critique reste contradictoire.

Modification autorisee pendant cet audit: ce rapport uniquement.
