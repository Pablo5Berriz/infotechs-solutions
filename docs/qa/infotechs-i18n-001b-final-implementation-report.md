# INFOTECHS-I18N-001B — FINAL IMPLEMENTATION REPORT

**Statut : BLOCKED. Rapport d’arrêt, pas une certification de fin de lot.**

Le build compile, mais son exécution en production locale révèle une boucle de redirection sur plusieurs URL anglaises. La section 22 de la directive PM impose un « STOP immédiat et rapport BLOCKED » en cas de « régression majeure d’une route publique ». L’implémentation a donc été arrêtée. Aucun correctif supplémentaire du routage n’a été tenté après ce constat. Seules les preuves, la classification et ce rapport ont été finalisés.

## 1. Baseline

HEAD vérifié : `7be38f40577960cc8b171a2928c2bfe2dc292333`, branche `master`, inchangé. Next.js 16.3.4, React 19.2.4, next-intl 4.14.6. Aucun commit, push ou déploiement.

Baseline sécurité acceptée par le PM : 0 CRITICAL, 0 HIGH, 2 MODERATE Vitest, audit production à 0. Le lockfile de cette baseline reste byte-identique au début de la reprise. Aucun changement de dépendances pendant la reprise.

Sauvegarde de reprise : `C:/Users/paulq/AppData/Local/Temp/infotechs-i18n-resume-TqZQ72`, avec fichiers initiaux, `initial-hashes.json` et état Git initial. La sauvegarde sécurité antérieure reste distincte.

## 2. État initial repris

Messages FR/EN partiels, configuration next-intl, routage et middleware déjà présents. Les routes App Router étaient encore françaises et non préfixées. Le contenu légal anglais manquait. Le travail existant valide a été conservé. Les messages, composants, données, Contact et routes ont ensuite été adaptés progressivement.

## 3. Architecture i18n finale à l’arrêt

Routes publiques sous `src/app/[locale]`, API conservée hors locale. Dix domaines de messages par langue. Identités techniques de services et réalisations stables, contenu traduit et tables de slugs séparées. Helpers de liens, de contenu et de metadata partagés. Cette architecture est implémentée mais **non validée en production**, compte tenu du blocage.

## 4. Configuration next-intl

`routing.ts` déclare FR/EN, FR par défaut et préfixe obligatoire. `request.ts` charge les dix domaines JSON et valide la locale provenant de `next/root-params` ou d’un override explicite. Le provider client reçoit les domaines nécessaires aux interactions. Les alternates automatiques du proxy sont désactivés au profit des alternates explicites qui connaissent les slugs d’entité.

## 5. Décision middleware → proxy et preuves

La documentation installée et les types ont été consultés avant la migration. `src/proxy.ts` exporte une fonction par défaut utilisant `next-intl/middleware`. Le matcher exclut API, `_next`, assets, sitemap et robots ; les chemins FR/EN inconnus restent traités pour la 404 localisée.

Les 42 tests de fondations sont passés avant le retrait de `src/middleware.ts`. Le build reconnaît `Proxy (Middleware)`. Toutefois, ces preuves étaient insuffisantes : le comportement des réécritures en production échoue. La cause exacte n’est pas confirmée. Ne pas conclure que toute la combinaison Next.js/next-intl est incompatible sans diagnostic.

La documentation installée mentionnait `unstable_doesProxyMatch`, tandis que le package exposait `unstable_doesMiddlewareMatch`, utilisé dans les tests.

## 6. Stratégie de locale

Racine : préférence `NEXT_LOCALE`, puis `Accept-Language`, puis FR. Redirection prévue 307. Une locale explicite prime sur la préférence. Cookie d’un an, `SameSite=Lax`, chemin `/`, `Secure` en HTTPS. Les tests unitaires des cinq cas de négociation et des locales explicites passent ; la campagne HTTP complète a été interrompue.

## 7. Stratégie de routes

Les chemins publics anglais sont traduits ; les dossiers internes restent communs. Les anciennes URL non préfixées ont des redirections permanentes 308 vers FR, conservées depuis le travail initial. Les slugs de détail sont vérifiés dans leur locale. Les chemins inconnus utilisent un catch-all localisé.

**Blocage vérifié :**

| URL locale de production | Réponse | Location |
| --- | --- | --- |
| `/en/portfolio` | 307 | `/en/portfolio` |
| `/en/about` | 307 | `/en/about` |
| `/en/legal-notice` | 307 | `/en/legal-notice` |

Chaque résultat est reproduit deux fois successivement dans [blocker-runtime.json](i18n-001b/blocker-runtime.json). Le contrôle général s’est arrêté au premier échec `/en/portfolio`. Aucun résultat global PASS n’est attribué.

## 8. Matrice complète des routes FR/EN prévues

Cette matrice décrit les destinations implémentées. Elle ne certifie pas leur fonctionnement.

| FR | EN |
| --- | --- |
| `/fr` | `/en` |
| `/fr/services` | `/en/services` |
| `/fr/services/creation-sites-web` | `/en/services/website-creation` |
| `/fr/services/automatisation-ia` | `/en/services/ai-automation` |
| `/fr/services/applications-web-sur-mesure` | `/en/services/custom-web-applications` |
| `/fr/services/audit-et-cadrage` | `/en/services/audit-and-planning` |
| `/fr/realisations` | `/en/portfolio` |
| `/fr/realisations/site-web-garage-local` | `/en/portfolio/local-garage-website` |
| `/fr/realisations/plateforme-reservation` | `/en/portfolio/booking-platform` |
| `/fr/realisations/application-gestion-interne` | `/en/portfolio/internal-management-application` |
| `/fr/realisations/automatisation-administrative` | `/en/portfolio/administrative-automation` |
| `/fr/realisations/tableau-bord-pme` | `/en/portfolio/business-dashboard` |
| `/fr/realisations/application-mobile-service-local` | `/en/portfolio/mobile-experience` |
| `/fr/a-propos` | `/en/about` |
| `/fr/contact` | `/en/contact` |
| `/fr/mentions-legales` | `/en/legal-notice` |
| `/fr/confidentialite` | `/en/privacy` |
| 404 sous `/fr/...` | 404 sous `/en/...` |

Endpoints techniques : `/api/contact`, `/robots.txt`, `/sitemap.xml`, sans préfixe. Le build contient aussi la 404 interne du framework.

## 9. Sélecteur de langue

Liens FR/EN, noms accessibles, langue active indiquée, cibles tactiles et focus visible. Conversion des 17 pages dans les deux sens testée. Query string et fragment conservés au clic. Présent dans l’en-tête desktop et le menu mobile. Les interactions réelles, la préférence après changement et les changements de langue depuis toutes les pages profondes restent à valider. Le sélecteur ne peut pas être déclaré fonctionnel de bout en bout tant que certaines destinations bouclent.

## 10. Navigation

Header, footer, CTA, breadcrumbs et liens de contenu utilisent les chemins localisés. L’accueil EN a été ouvert dans le navigateur de production locale : son arbre accessible montre les liens anglais attendus. La campagne complète et la navigation mobile n’ont pas été exécutées après l’arrêt.

## 11. Contact

Labels, besoins, validation, états réseau/succès/erreur et consentement sont localisés. Le payload inclut explicitement `locale` et un type technique stable parmi `web`, `automation`, `custom`, `audit`, `other`. Le texte libre n’est pas utilisé pour deviner la langue. Le courriel inclut la locale et le type technique, avec sujet et libellés localisés.

Les tests de succès EN, d’erreurs EN, de locale invalide et d’erreur avant parsing passent avec fournisseur simulé. Aucun courriel réel envoyé. Le formulaire réel dans les deux langues et ses états responsive restent à valider.

## 12. Protection API

Endpoint inchangé `/api/contact`. Rate limit, identité client, taille maximale, validation stricte, honeypot, configuration du fournisseur, timeout, idempotence et journalisation conservés. Le matcher exclut l’API dans les tests. Les tests API passent dans la dernière suite. Le contrôle HTTP final GET/POST du build n’a pas été atteint par la campagne interrompue : gate runtime non certifié.

## 13. SEO et metadata

Titres, descriptions, canonical, alternates FR-CA/EN-CA/x-default et Open Graph sont localisés. Les pages de détail utilisent leurs contenus localisés. La 404 prévoit noindex et aucune canonical. Les assertions de metadata passent, mais les destinations EN en boucle rendent le gate SEO global invalide. Une révision complète du HTML servi reste requise après correction autorisée.

## 14. Sitemap et robots

Sitemap de 34 URL uniques avec alternates réciproques, vérifié par test. `robots.ts` est byte-identique au début de la reprise. Aucun réglage Cloudflare, Nginx ou DNS, aucun retrait du NOINDEX temporaire d’infrastructure. La routabilité de toutes les entrées du sitemap n’est pas validée.

## 15. Accessibilité

`html lang` est localisé ; le sélecteur expose ses libellés et son état actif. Les comportements existants du menu, Échap et restitution du focus sont conservés. Contrôles statiques partiels seulement. Navigation clavier, ordre du focus et focus visible effectif restent à vérifier dans le navigateur. Aucun PASS accessibilité global.

## 16. Responsive

Campagne 390/768/1280/1440 interrompue avant exécution. Aucun résultat de non-chevauchement, wrapping ou absence d’overflow ne peut être certifié. Aucune capture responsive finale. L’onglet temporaire et le serveur de production local ont été fermés après collecte des preuves du blocage.

## 17. Tests ajoutés ou modifiés

Les 189 tests initiaux ont été conservés et adaptés aux routes préfixées, aux messages, aux metadata et au nouveau payload Contact. Ajout de 84 cas, portant le total à 273 : 42 fondations, 39 interface publique, 3 API EN. Le helper de rendu utilise le vrai `NextIntlClientProvider`. Vitest est inchangé en version ; seule l’intégration inline de next-intl a été ajoutée à sa configuration.

Les tests ne prouvaient pas les réécritures du serveur de production. Le script [check-runtime.mjs](i18n-001b/check-runtime.mjs) a justement révélé le défaut que les tests unitaires ne détectaient pas.

## 18. Lint

`npm run lint` via le CLI npm installé : code 0, aucune erreur, après correction de l’écriture du cookie dans le gestionnaire du sélecteur. Aucun changement applicatif depuis ce contrôle. Le lanceur npm habituel étant défaillant, invocation utilisée : `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run lint`.

## 19. Suite complète

Dernière exécution : **271 PASS, 2 FAIL, total 273**. Preuve : [tests-last-run.json](i18n-001b/tests-last-run.json).

Les deux échecs concernent une assertion du nouveau test header FR/EN qui supposait un ordre particulier des attributs HTML. L’assertion a été corrigée avant la découverte du blocage runtime, mais la suite n’a pas été relancée après l’arrêt. Le résultat courant complet reste donc non confirmé ; aucun PASS final n’est revendiqué. Les 189 cas initiaux passent dans cette dernière exécution.

## 20. Build

`npm run build` : code 0. Next.js 16.3.4, compilation réussie, TypeScript réussi, génération **40/40**, proxy reconnu. Build exécuté avec accès aux polices Google prévues par le projet. Les anciens avertissements réseau du serveur de développement ne sont pas présentés comme des échecs du build final.

Le build a été démarré avec `next start --port 3012 --hostname 127.0.0.1`. Son succès de compilation ne garantit pas le fonctionnement du routage : la boucle 307 a été observée sur cette exécution de production locale.

## 21. npm audit

Dernier audit disponible : baseline SECURITY-CORRECTIVE-002 acceptée, 0 CRITICAL, 0 HIGH, 2 MODERATE. Preuve existante : [audit-full.json](security-corrective-002/audit-full.json). Lockfile inchangé par rapport au début de la reprise, avec browserslist 4.29.0 et js-yaml 4.3.2. Aucun nouvel audit distant final effectué après le STOP. Les chiffres du bloc de statut désignent ce dernier audit connu, pas un nouvel audit daté de ce rapport.

## 22. npm audit --omit=dev

Dernier résultat disponible : 0 vulnérabilité, [audit-production.json](security-corrective-002/audit-production.json). Même réserve : baseline préservée, pas de nouvelle interrogation finale du registre après le STOP.

## 23. Fichiers exacts modifiés

Inventaire par chemin, état et SHA-256 avant/après : [file-inventory.json](i18n-001b/file-inventory.json). Il compare la reprise à sa sauvegarde initiale, plutôt qu’à HEAD seul. Il distingue les anciens chemins retirés de leurs nouveaux emplacements sous `[locale]`.

Les preuves ajoutées à cet inventaire sont : le présent rapport, `i18n-001b/file-inventory.json`, `status-initial.txt`, `status-final.txt`, `tests-last-run.json`, `blocker-runtime.json`. Le script runtime y est inclus. `git diff --check` : code 0. La revue finale exhaustive du contenu de chaque diff n’est pas certifiée, puisque le STOP est intervenu avant cette étape.

## 24. Classification du worktree

| Groupe | Contenu | Traitement |
| --- | --- | --- |
| A. Bruit préexistant | AGENTS.md, suppression design-tokens.md, rapports design/QA, Claude outputs, gouvernance, release et preuves historiques | Préservé ; comparaison des empreintes et de l’absence du fichier déjà supprimé |
| B. SECURITY-CORRECTIVE-002 | Partie sécurité du lockfile, rapport et preuves sécurité | Préservé ; lockfile et preuves inchangés |
| C. Ancien I18N-001B | package.json, next.config.ts, ajout next-intl au lockfile, messages et src/i18n initiaux, middleware | package/config/lock inchangés pendant cette reprise ; messages/helpers poursuivis et middleware remplacé |
| D. I18N-001B-RESUME | Messages complétés, données/composants localisés, migration app, proxy, Contact, SEO, tests et présent rapport | Travail non commité et actuellement bloqué |

Le lockfile comporte historiquement B et C : un futur commit devra s’appuyer sur leurs preuves distinctes. Un `git add .` ne permettrait pas de respecter la séparation des lots. Aucun staging effectué.

## 25. Findings restants

1. **Bloquant :** boucles 307 sur au moins trois URL EN du build de production local. Cause exacte non confirmée.
2. **Validation incomplète :** suite à relancer après adaptation de deux assertions ; campagne runtime, responsive, clavier, navigation mobile, 404 et audit final à terminer après reprise autorisée.
3. **Éditorial :** traduction juridique EN à faire relire par un humain compétent avant publication. Ce lot ne certifie aucune conformité juridique.
4. **Sécurité préexistante acceptée :** deux MODERATE Vitest. Aucune migration de toolchain autorisée ou effectuée.

## 26. Retour arrière

Aucun rollback exécuté. La sauvegarde de reprise et ses empreintes permettent de préparer un retour arrière ciblé si le PM le demande. Ne pas restaurer globalement HEAD : cela mélangerait sécurité, ancien travail i18n et bruit historique. Vérifier les modifications concurrentes avant toute copie. Ne pas utiliser reset/restore/clean/stash. Le travail actuel reste disponible pour diagnostic.

## 27. Recommandation

**Ne pas commiter.** Soumettre ce blocage au PM et attendre une directive autorisant le diagnostic et la correction ciblés des réécritures EN en production. Après cette correction : reprendre la matrice HTTP complète, les contrôles navigateur aux quatre largeurs, les tests et audits finaux, puis la revue de diff. Ni reprise UX, ni évolution sécurité/toolchain à fusionner dans ce lot.

Dans le statut ci-dessous, NO/FAIL signifie « gate non validé » lorsque la campagne a été interrompue, et non une panne démontrée de chaque fonctionnalité. Les nombres de vulnérabilités sont ceux de la baseline acceptée décrite en sections 21 et 22. Le nombre 271 correspond aux tests réussis de la dernière suite, laquelle comprend aussi deux échecs.

INFOTECHS-I18N-001B
STATUS: BLOCKED

FR FUNCTIONAL: NO
EN FUNCTIONAL: NO
LANGUAGE SWITCHER: FAIL
DEEP ROUTES: FAIL
CONTACT: FAIL
API CONTACT: FAIL
SEO I18N: FAIL
RESPONSIVE: FAIL
ACCESSIBILITY: FAIL

LINT: PASS
TESTS: 271 PASS / 2 FAIL
BUILD: PASS

CRITICAL: 0
HIGH: 0
MODERATE: 2
PRODUCTION AUDIT: 0

I18N FUNCTIONAL GATE: FAIL

COMMIT RECOMMENDED: NO

COMMIT: NOT AUTHORIZED
PUSH: NOT AUTHORIZED
DEPLOY: NOT AUTHORIZED
PRODUCTION: NO GO

# INFOTECHS-I18N-001B-R1 — 307 LOOP CORRECTIVE

Cette section remplace les conclusions courantes de la tentative précédente, conservée ci-dessus comme historique. **R1 reste BLOCKED : la cause des boucles est isolée, mais la reprise HTTP rencontre un défaut structurel sur les 404.** Arrêt selon la section 22 de R1. Aucun correctif applicatif de 404 entrepris après cet arrêt.

## R1.1. État initial

HEAD `7be38f40577960cc8b171a2928c2bfe2dc292333`, branche `master`. État Git contrôlé avant modification. Sauvegarde complète des fichiers non ignorés : `C:/Users/paulq/AppData/Local/Temp/infotechs-i18n-r1-kzOI12`. Les traductions, tests et sources applicatives de la reprise précédente sont conservés.

## R1.2. Reproduction

Deux processus du **même build**, sans modification applicative :

- port 3012, `next start --hostname 127.0.0.1` : les trois routes signalées répondent 307 vers elles-mêmes ; `/en/privacy` est également affectée ; `/en/services` répond 200 ;
- port 3013, `next start --hostname localhost` : toutes ces routes répondent 200.

Les deux campagnes utilisent des requêtes `redirect: manual`. Preuve comparative, identifiant du build et matrice : [runtime-evidence.json](i18n-001b/r1/runtime-evidence.json). Les deux processus ont été arrêtés après collecte.

## R1.3. Cause exacte

Le défaut observé dépend du **hostname de lancement de Next**, pas seulement du hostname tapé dans le navigateur. Appeler `localhost:3012` ne corrige pas un serveur lancé avec `--hostname 127.0.0.1`.

Chaîne identifiée dans les packages réellement installés :

1. `next/dist/server/lib/router-utils/resolve-routes.js` construit `initUrl` à partir de `opts.hostname`, donc de `127.0.0.1` pour le lancement initial.
2. `next/dist/server/web/next-url.js`, fonction `parseURL`, normalise les adresses loopback en `localhost`. `NextRequest` expose par défaut cette URL normalisée.
3. Sur `/en/about`, next-intl détecte EN et reconnaît correctement le pathname externe `/about`. Il produit une réécriture vers l’interne `/en/a-propos` sur l’origine normalisée `http://localhost:3012`.
4. `next/dist/shared/lib/router/utils/relativize-url.js` compare strictement `relative.origin === baseURL.origin`. `localhost:3012` diffère de `127.0.0.1:3012` : la réécriture reste absolue.
5. `resolve-routes.js` prend alors sa branche `if (parsedUrl.protocol)`. `router-server.js` transmet cette réécriture par `proxyRequest` comme une requête externe, alors qu’elle retourne sur le même serveur.
6. next-intl reçoit cette fois `/en/a-propos`. Dans son middleware, `matchesPathname(localeTemplate, unprefixedExternalPathname)` compare `/about` à `/a-propos` et retourne faux. Sa branche de canonicalisation redirige vers `/en/about`. Cette condition est correcte pour un accès externe direct au chemin interne, mais ce second passage provient ici d’une réécriture mal classée.
7. Le navigateur initial reçoit donc `307 Location: /en/about`, identique à sa demande.

Même chaîne pour les autres sections traduites :

| Demande externe | Locale | Premier pathname | Réécriture interne | Second pathname traité comme externe | Location finale |
| --- | --- | --- | --- | --- | --- |
| `/en/portfolio` | en | `/en/portfolio` | `/en/realisations` | `/en/realisations` | `/en/portfolio` |
| `/en/about` | en | `/en/about` | `/en/a-propos` | `/en/a-propos` | `/en/about` |
| `/en/legal-notice` | en | `/en/legal-notice` | `/en/mentions-legales` | `/en/mentions-legales` | `/en/legal-notice` |
| `/en/services` | en | `/en/services` | Aucune nécessaire | Aucun second passage | Aucune, 200 |

Les réponses 307 du premier lancement contiennent simultanément `x-middleware-rewrite` vers le chemin interne sur localhost et `Location` vers le chemin public. Le lancement avec une origine cohérente rend la réécriture relative et supprime ce second passage.

**Conclusion :** l’hypothèse interne/externe est confirmée au second passage, mais son déclencheur est la comparaison d’origines dans le serveur Next 16.3.4 du banc local. Aucun défaut du mapping de slugs n’est démontré. Les trois pages n’ont aucune condition spéciale ajoutée.

## R1.4. Fichiers impliqués

Application inspectée : `src/proxy.ts`, `src/i18n/{routing,request,paths,slugs,navigation}.ts`, `src/components/localized-link.tsx`, routes App Router et `next.config.ts`. Aucune redirection applicative supplémentaire trouvée. `proxy.ts` reste seul ; aucun middleware réintroduit.

Packages inspectés : fichiers Next mentionnés ci-dessus et `next-intl/dist/esm/development/middleware/middleware.js`. Aucun fichier de dépendance modifié. Documentation installée consultée : `next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.

## R1.5. Correctif appliqué

Correction du banc local : lancement avec `--hostname localhost`, et origine du script alignée sur `http://localhost:3012`, configurable via `I18N_QA_ORIGIN`. Pour la comparaison R1, l’origine utilisée est `http://localhost:3013`.

Fichier modifié : `docs/qa/i18n-001b/check-runtime.mjs`. Aucun changement à proxy.ts, next.config.ts, aux chemins ni aux dépendances. Aucun réglage de confiance des en-têtes ajouté.

## R1.6. Caractère minimal et limite

L’expérience comparative prouve que le code applicatif actuel peut servir les 34 URL canoniques avec le même build. Modifier la canonicalisation ou neutraliser des 307 masquerait donc le second passage. La correction porte sur le lancement du banc qui déclenche ce passage.

**Limite explicite :** le lancement numérique `--hostname 127.0.0.1` reste défaillant avec ce framework. R1 ne prétend pas corriger Next.js ni certifier tous les hostnames de déploiement. Aucune infrastructure modifiée. Le lancement réel de préproduction devra être vérifié séparément ; il ne faut pas transposer automatiquement le PASS local à la production.

## R1.7. Test anti-régression généralisé

Le script HTTP vérifie toutes les URL du sitemap avec `redirect: manual`, interdit explicitement une `Location` égale à l’URL courante, puis exige 200. Il contrôle désormais aussi le 200 final des redirections legacy, sans suivi automatique. Il couvre ainsi les trois pages signalées, leurs équivalents FR et l’ensemble des 34 pages canoniques.

Ce test est exécuté sur un vrai `next start`, contrairement aux seuls tests de conversion des chemins. Aucun nouveau cas Vitest ajouté avant l’arrêt structurel. Le script échoue actuellement sur la première 404 sans `html lang`, et ne masque pas cet échec.

## R1.8. Lint

Pas de nouvelle exécution après l’arrêt. Dernier résultat connu : PASS du lot parent. Sources applicatives inchangées pendant R1.

## R1.9. Tests

Dernière suite Vitest connue : 271 PASS / 2 FAIL. Les deux assertions avaient été adaptées avant R1, mais aucune nouvelle suite complète n’est revendiquée. Le script HTTP R1 passe les URL canoniques, legacy et négociation, puis échoue sur la 404 FR. L’arrêt interdit de poursuivre artificiellement les validations suivantes.

## R1.10. Build

Même build de production que le lot parent, compilation et TypeScript PASS, 40/40 pages générées. Son identifiant est enregistré dans la preuve comparative. Aucun fichier applicatif modifié : pas de nouveau build exécuté après l’arrêt. Ce PASS est historique et ne certifie pas les 404 runtime.

## R1.11. Audits sécurité

Aucun nouvel audit registre après l’arrêt. Dernière baseline acceptée : 0 HIGH, 0 CRITICAL, 2 MODERATE Vitest ; production 0. Lockfile byte-identique au début de R1. Browserslist 4.29.0, js-yaml 4.3.2 et Vitest préservés. Preuve : [preservation.json](i18n-001b/r1/preservation.json).

## R1.12. Matrice HTTP

**34/34 URL canoniques : HTTP 200, zéro Location**, sur le serveur lancé avec localhost. Les 34 chemins exacts, langues et canonicals sont enregistrés dans runtime-evidence.json. Cette partie est PASS ; les 404 sont un gate distinct et échouent.

## R1.13. Redirections legacy

Les 16 anciennes URL non racines présentes dans la table publique passent les assertions : source sans `/fr` → 308 → équivalent `/fr/...` → 200 en requête manuelle. Chaque destination est vérifiée directement, sans chaîne automatique. La racine négociée n’est pas une redirection legacy.

## R1.14. Négociation de locale

Les cinq cas du script passent : fr-CA → FR ; en-CA → EN ; cookie FR avec en → FR ; cookie EN avec fr → EN ; absence de préférence → FR. Statut racine 307. Les nouvelles vérifications HTTP des URL explicites avec préférences contradictoires restent à reprendre ; seuls les tests unitaires antérieurs les couvrent actuellement. Gate R1 complet non validé.

## R1.15. Routes profondes

Les quatre services et les six réalisations dans chaque langue sont inclus dans les 34 URL en 200. Contrôles navigateur de refresh, transitions et conservation du contexte non repris après l’arrêt.

## R1.16. Sélecteur de langue

Aucun changement. Helpers, conservation des query strings et fragments conservés. Les contrôles interactifs FR ↔ EN, desktop et mobile, restent non exécutés dans R1.

## R1.17. Metadata

Pour les 34 URL, le script a passé les assertions title, description, H1, html lang, canonical correspondant au chemin et og:locale. Le défaut est ensuite rencontré sur le document HTML des 404. Le gate SEO incluant les pages d’erreur n’est pas PASS.

## R1.18. Sitemap et hreflang

34 URL extraites du sitemap ; chacune servie en 200. Pour chaque page, trois alternates et leurs destinations présentes dans le sitemap ont été contrôlés. La réciprocité est couverte par le test unitaire existant, mais une nouvelle preuve HTTP complète de réciprocité exacte reste à finaliser. Robots et NOINDEX d’infrastructure inchangés.

## R1.19. Nouveau blocage 404

Six URL examinées : `/fr/missing-i18n`, `/en/missing-i18n`, `/fr/missing.txt`, `/en/missing.txt`, `/fr/services/missing-service`, `/en/services/missing-service`.

Résultat commun : HTTP 404, noindex présent, aucune canonical, mais document initial `<html id="__next_error__">` **sans attribut lang**, titre générique `Infotechs Solutions` et aucun H1 rendu dans le HTML initial. Les textes FR/EN sont présents dans les données React sérialisées ; cela ne constitue pas une preuve de rendu correct après hydratation. Aucune conclusion « page blanche dans le navigateur » n’est formulée.

Les six réponses HTML sont conservées dans `docs/qa/i18n-001b/r1/404-*.html`. Le défaut `html lang` suffit à faire échouer le critère explicite R1 §14. Cause exacte de cette enveloppe non investiguée au-delà du constat, conformément au STOP §22 sur problème structurel i18n persistant.

## R1.20. Contact simulé

Aucun email réel, aucune requête valide envoyée à un fournisseur. La campagne s’est arrêtée avant les contrôles API du script. Les mocks du lot parent restent conservés ; pas de nouveau PASS R1 attribué.

## R1.21. Accessibilité

Gate non validé. Le `html lang` manquant des 404 est un défaut confirmé. Clavier, focus, aria-current, menu, erreurs et reduced motion restent à reprendre après autorisation ciblée.

## R1.22. Responsive 390

Non exécuté : prérequis runtime complet non satisfait.

## R1.23. Responsive 768

Non exécuté : prérequis runtime complet non satisfait.

## R1.24. Responsive 1280

Non exécuté : prérequis runtime complet non satisfait.

## R1.25. Responsive 1440

Non exécuté : prérequis runtime complet non satisfait. Aucun navigateur ouvert dans R1.

## R1.26. Diff catégorisé

A. Bruit historique : inchangé, y compris la suppression préexistante de design-tokens.md.

B. SECURITY-CORRECTIVE-002 : lockfile et preuves inchangés.

C. I18N-001B avant R1 : toutes les sources, traductions et tests conservés byte pour byte depuis la sauvegarde R1. L’ancien rapport et les preuves de blocage sont conservés comme historique.

D. Nouveau R1 : modification de `docs/qa/i18n-001b/check-runtime.mjs`, ajout de cette section au rapport, et dossier `docs/qa/i18n-001b/r1/` contenant comparaison runtime, six réponses HTML 404, préservation et état Git. Aucun staging, commit ou changement applicatif.

La comparaison des empreintes avant mise à jour du rapport ne détecte que le script runtime parmi les fichiers préexistants modifiés. Le rapport et les nouvelles preuves sont explicitement ajoutés à cette liste dans la présente section.

## R1.27. Findings résiduels et décision attendue

- Cause des boucles locale isolée : différence d’origine loopback dans Next 16.3.4. Lancement cohérent validé sur les 34 URL, lancement numérique toujours défaillant et documenté.
- Nouveau blocker : document initial des 404 sans langue ; correction non entreprise après le STOP.
- Gates complets tests/audits/browser non terminés ; ne pas les présenter comme PASS.
- Traduction juridique EN toujours à relire humainement avant publication.
- Deux MODERATE Vitest acceptées dans la baseline, aucun élargissement du lot.

Recommandation : **ne pas commiter**. Le PM doit autoriser une reprise ciblée du rendu des 404 localisées, puis la fin de la QA. Aucun besoin démontré de recommencer l’i18n ou de changer les mappings de routes.

Dans le bloc suivant, FAIL inclut les gates non validés, pas seulement les pannes confirmées. Les PASS lint/build sont les derniers résultats historiques, pas de nouvelles exécutions R1. Le PASS des boucles s’applique au lancement local corrigé documenté ; il ne couvre pas le lancement numérique défaillant.

INFOTECHS-I18N-001B-R1
STATUS: BLOCKED

307 LOOPS: PASS
LINT: PASS
TESTS: 271 PASS / 2 FAIL
BUILD: PASS
AUDIT FULL: BASELINE 0 CRITICAL / 0 HIGH / 2 MODERATE; NOT RERUN
AUDIT PROD: BASELINE 0; NOT RERUN
HTTP FR/EN MATRIX: PASS
LEGACY REDIRECTS: PASS
LOCALE NEGOTIATION: FAIL
CONTACT MOCKED: FAIL
SEO I18N: FAIL
ACCESSIBILITY: FAIL
RESPONSIVE 390/768/1280/1440: FAIL
SECURITY BASELINE PRESERVED: YES

COMMIT: NOT CREATED
PUSH: NOT PERFORMED
DEPLOYMENT: NOT PERFORMED
PRODUCTION: NO GO
