# INFOTECHS-QA-001 — Recette transversale du MVP public

> Audit et tests uniquement. Aucun fichier applicatif, test ou manifeste n’a été modifié. Les réponses Contact de succès et d’échec ont été simulées localement; aucun message réel n’a été envoyé.

## 1. Baseline

- SHA initial : `6196d65132dd6cf26ba1bb300216c67c828793a7`
- Branche : `master`
- Working tree initial : propre
- Gate : PASS

## 2. Environnement

- Windows, fuseau America/Toronto
- Node.js `v22.17.1`
- npm `11.5.2`
- Next.js `16.2.9`
- Chrome `150.0.7871.186`
- axe-core `4.12.1`
- Lighthouse `12.8.2`
- Firefox Playwright `141.0`
- WebKit Playwright `26.0` — émulation WebKit, pas Safari réel

## 3. Outils

Next production server, PowerShell HTTP, Vitest, TypeScript, ESLint, axe CLI, Lighthouse CLI et Playwright isolé dans le répertoire temporaire Windows. Les outils temporaires n’ont modifié ni `package.json` ni `package-lock.json`.

## 4. Commandes principales

```text
npm ci
npx tsc --noEmit
npm run lint
npm test
npm run build
npx @axe-core/cli ...
npx lighthouse ... --only-categories=performance,accessibility,best-practices,seo
npm audit --json
```

Le premier `npm ci` a rencontré un verrou Windows sur SWC détenu par un serveur Next résiduel du lot précédent. Après arrêt explicite de ce processus local, la relance unique a réussi. Aucun contournement applicatif n’a été effectué.

## 5. Résultats techniques

- Installation propre : PASS — 534 paquets; manifestes inchangés.
- Type-check : PASS.
- Lint : PASS.
- Tests : PASS — 144/144 dans 25 fichiers.
- Build : PASS — 22/22 pages générées.
- Dépendances : cinq vulnérabilités élevées signalées; aucune correction automatique exécutée.

## 6. Routes

Toutes les routes attendues répondent sans redirection inattendue :

```text
/                                           200
/services                                   200
/services/creation-sites-web                200
/services/automatisation-ia                 200
/services/applications-web-sur-mesure       200
/realisations                               200
/realisations/site-web-garage-local         200
/realisations/plateforme-reservation        200
/realisations/application-gestion-interne   200
/realisations/automatisation-administrative 200
/realisations/tableau-bord-pme              200
/realisations/application-mobile-service-local 200
/a-propos                                   200
/contact                                    200
/confidentialite                            200
/mentions-legales                           200
/ressources                                 404
/fondations                                 404
/route-inconnue-qa                          404 personnalisée
/sitemap.xml                                200
/robots.txt                                 200
/api/contact GET                            405 attendu
```

Vingt-deux destinations internes uniques ont été extraites du HTML public et testées : aucun lien cassé. Ancres, breadcrumbs et navigation publique pointent vers des destinations existantes.

## 7. Axe

Axe 4.12.1 a été exécuté sur Accueil, Services, Réalisations, À propos, Contact, Confidentialité, Mentions légales et 404 :

- violations critiques : 0;
- violations sérieuses : 0;
- violations modérées : 0;
- violations mineures : 0.

Export : `docs/qa/exports/axe/axe-results-1784949862559.json`. Axe ne couvre qu’une partie des défauts possibles; les contrôles manuels et fonctionnels restent nécessaires.

## 8. Clavier

Recette représentative et tests existants :

- focus du bouton menu visible : PASS;
- ouverture native par `Enter` : PASS, `aria-expanded=true`;
- focus transféré au premier lien « Accueil » : PASS;
- fermeture par `Escape` : PASS;
- restitution au bouton « Ouvrir le menu » : PASS;
- onglets : ArrowLeft du premier vers « Sur mesure » et `Home` vers « Web & applications » : PASS;
- liens, CTA, formulaire, select et checkbox : accessibles au clavier dans les parcours testés;
- cinq erreurs de formulaire sont annoncées par `role=alert`;
- succès par `role=status`, erreur par `role=alert`;
- aucun piège observé.

Capture du focus et menu ouvert disponibles. Les tests unitaires couvrent aussi Space, Home/End et les boucles d’onglets.

## 9. Lecteur d’écran

Aucun lecteur d’écran utilisateur (NVDA, JAWS ou Narrator configuré pour recette) n’était disponible dans l’environnement automatisé. La structure accessible a été évaluée par axe, DOM sémantique, rôles, noms accessibles, états ARIA et annonces live. H1 unique vérifié sur 119 rendus.

Classification : **IMPORTANT** — limite documentée; une passe humaine avec lecteur d’écran reste requise avant production.

## 10. Reduced motion

Le contexte Chrome a formellement confirmé `matchMedia('(prefers-reduced-motion: reduce)').matches === true` et zéro animation active. Cependant, le hero de l’accueil reste invisible sous le header : la capture montre uniquement le fond et le menu, et 19 éléments demeurent masqués (`opacity: 0`, `display: none` ou `visibility: hidden`; certains correspondent à des variantes/panneaux légitimement inactifs, mais le hero visible est bien absent).

Classification : **BLOQUANT QA** — le chemin reduced motion rend du contenu principal invisible. Un lot correctif séparé est requis; aucun correctif n’a été appliqué.

Preuve : `docs/qa/screens/reduced-motion-home.png`.

## 11. Responsive

Matrice automatisée : 17 routes × 7 largeurs (320, 360, 390, 768, 1024, 1280, 1440), soit 119 rendus.

- scroll horizontal : 0 occurrence;
- H1 absent ou multiple : 0 occurrence;
- titres tronqués observés : 0;
- 404, pages juridiques longues, formulaire, listes et CTA : lisibles dans les captures représentatives;
- menu mobile : PASS.

Export détaillé : `docs/qa/exports/responsive-summary.json`.

## 12. Cross-browser

L’accueil a été chargé et capturé à 1280 × 900 dans Chrome, Edge, Firefox et WebKit. Aucun écart structurel majeur, débordement ou contenu manquant n’est visible dans ces quatre rendus normaux.

Classification : **IMPORTANT** — il s’agit d’un smoke test représentatif, pas d’une campagne manuelle exhaustive de toutes les interactions dans chaque moteur. WebKit ne remplace pas Safari réel.

## 13. Lighthouse

Seize rapports valides ont été produits pour huit routes en desktop et mobile. Lighthouse refuse volontairement d’auditer une réponse HTTP 404 comme page chargée; la 404 est couverte par HTTP, axe, SEO, responsive et captures, sans altération de son statut attendu.

| Route | Performance mobile / desktop | Accessibilité | Bonnes pratiques | SEO | LCP mobile | CLS | TBT mobile |
|---|---:|---:|---:|---:|---:|---:|---:|
| Accueil | 92 / 99 | 100 | 100 | 100 | 3.4 s | 0 | 40 ms |
| Services | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 50 ms |
| Fiche Service | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 50 ms |
| Réalisations | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 50 ms |
| Fiche Réalisation | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 30 ms |
| Contact | 95 / 100 | 100 | 100 | 100 | 3.0 s | 0 | 30 ms |
| Confidentialité | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 50 ms |
| Mentions légales | 96 / 100 | 100 | 100 | 100 | 2.8 s | 0 | 60 ms |

Minimums : Performance 92, Accessibilité 100, Bonnes pratiques 100, SEO 100. Toutes les cibles sont atteintes. Poids transféré observé : environ 429–457 KiB selon la route. FCP mobile : 0.8–0.9 s.

Classification de la 404 Lighthouse : **HORS PÉRIMÈTRE** — limitation du runner face au statut attendu, non défaut du site.

## 14. SEO

Les routes vérifiées possèdent title, description, Open Graph, langue française, H1 unique et canonical absolu. La 404 possède title/description/Open Graph, aucun canonical, et deux directives robots compatibles (`noindex` puis `noindex, follow`).

- sitemap : exactement sept routes statiques principales, trois Services et six Réalisations;
- Ressources et Fondations absentes;
- robots.txt publie le sitemap canonique;
- 404 : noindex;
- marque cohérente.

Classification : **MINEUR** — deux balises robots redondantes sont rendues sur la 404, sans contradiction fonctionnelle.

## 15. Contact

### Interface

- validation des cinq champs requis : PASS;
- champs facultatifs : PASS;
- message minimum et formats invalides : PASS via interface/tests;
- désactivation pendant chargement : PASS, capture;
- succès simulé et reset : PASS;
- erreur simulée et nouvelle tentative possible : PASS;
- valeur « Test QA » conservée après erreur : PASS;
- annonces accessibles : PASS;
- consentement et politique accessibles : PASS.

### Limite

Le double clic est bloqué par l’état `isSubmitting`/désactivation et couvert par les tests; aucun envoi réel n’a été effectué.

## 16. API

Résultats HTTP locaux réels :

```text
JSON invalide                  400
payload incomplet              400
champ inconnu                  400
courriel invalide              400
consentement absent            400
corps trop volumineux          413
rate limit, sixième tentative  429 + Retry-After: 600
configuration absente          503
honeypot                       202 silencieux, aucun fournisseur
fournisseur simulé en erreur   502
fournisseur simulé en succès   202
```

Le 202 honeypot est un succès anti-spam simulé, pas une preuve de livraison. Le 202 fournisseur provient d’un serveur local contrôlé et n’est pas une recette Resend réelle.

## 17. Sécurité observable

- secrets Contact présents uniquement dans le module serveur : PASS;
- recherche des noms de variables et valeurs QA dans `.next/static` : zéro résultat;
- champs supplémentaires rejetés par schéma strict : PASS;
- limite de corps : PASS;
- détails Resend absents des réponses publiques : PASS;
- sujet dérivé d’un enum et adresses issues de configuration serveur validée : PASS;
- journaux observés : référence, raison ou identifiant fournisseur; pas de contenu du message ni clé API;
- en-têtes `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` et `X-Frame-Options` absents sur le serveur Next local.

Classification : **BLOQUANT PRODUCTION** — définir et valider la politique d’en-têtes au niveau application ou plateforme avant mise en ligne; HSTS dépendra du déploiement HTTPS réel.

## 18. Contenu public

Recherche dans le HTML des routes publiques : aucune occurrence de « Courriel à confirmer », « Téléphone à venir », Supabase, Plausible, Google Analytics, téléversement, Ressources, Fondations, prix/délais historiques ou résultats simulés présentés comme réels.

Résultat : PASS.

## 19. Vulnérabilités

`npm audit --json` retourne cinq vulnérabilités élevées :

- Next.js 16.2.9, plusieurs avis dont contournement proxy/middleware, DoS et SSRF selon les fonctions utilisées;
- PostCSS transitif;
- Sharp transitif;
- `brace-expansion` transitif;
- `js-yaml` transitif.

Une mise à jour Next.js 16.2.11 est annoncée comme correction disponible pour une partie de la chaîne. Aucune mise à jour ni `npm audit fix` n’a été exécuté.

Classification : **BLOQUANT PRODUCTION** — traitement dans `INFOTECHS-SECURITY-001` ou acceptation formelle documentée après analyse d’exposition.

## 20. Captures et exports

Vingt-neuf captures PNG sont présentes dans `docs/qa/screens/`, incluant : pages principales desktop/mobile, fiches, Contact, pages juridiques, 404, quatre moteurs, menu ouvert, focus, reduced motion, erreurs de validation et états chargement/succès/erreur.

Exports : axe, 16 rapports Lighthouse valides, résumé responsive et résumé interactions.

Inspection visuelle représentative : la direction graphite/cuivre, les espacements et le responsive normal sont cohérents. Le défaut reduced motion est visible et classifié.

## 21. Constats classifiés

1. **BLOQUANT QA** — le hero de l’accueil devient invisible avec `prefers-reduced-motion: reduce`.
2. **BLOQUANT PRODUCTION** — cinq vulnérabilités élevées héritées.
3. **BLOQUANT PRODUCTION** — en-têtes de sécurité absents dans la réponse locale; stratégie application/plateforme non arrêtée.
4. **BLOQUANT PRODUCTION** — recette Resend réelle, domaine/SPF/DKIM/destinataire/reply-to/logs non validés.
5. **BLOQUANT PRODUCTION** — confiance dans `x-forwarded-for`/`x-real-ip` non validée avec le reverse proxy cible.
6. **BLOQUANT PRODUCTION** — validation juridique humaine et éléments signalés par LEGAL-001 encore ouverts.
7. **IMPORTANT** — aucune recette avec lecteur d’écran réel disponible.
8. **IMPORTANT** — cross-browser limité à un smoke visuel représentatif; Safari réel absent.
9. **MINEUR** — balises robots redondantes sur la 404.
10. **HORS PÉRIMÈTRE** — Lighthouse ne calcule pas de score sur une réponse 404 attendue.

## 22. Réserves

- Aucun envoi Resend réel autorisé ou réalisé.
- Le rate limiter en mémoire ne partage pas ses compteurs entre instances et fait confiance aux en-têtes réseau.
- Lighthouse est une mesure de laboratoire locale, pas des données terrain.
- Axe ne remplace pas une recette humaine.
- Les captures de succès/erreur Contact utilisent des réponses interceptées ou un fournisseur local simulé.

## 23. Recommandation finale

```text
BASELINE : PASS
TYPE-CHECK : PASS
LINT : PASS
TESTS : PASS — 144/144
BUILD : PASS — 22/22
ROUTES : PASS
AXE : PASS — 0 VIOLATION
CLAVIER : PASS SUR PARCOURS REPRÉSENTATIFS
LECTEUR D’ÉCRAN : LIMITE DOCUMENTÉE
REDUCED MOTION : FAIL — BLOQUANT QA
RESPONSIVE : PASS — 119/119 SANS DÉBORDEMENT
CROSS-BROWSER : PASS PARTIEL — LIMITE DOCUMENTÉE
LIGHTHOUSE : PASS SUR 16 RAPPORTS VALIDES
SEO : PASS AVEC 1 CONSTAT MINEUR
CONTACT : PASS SIMULÉ
SÉCURITÉ : AUDITÉE — BLOQUANTS PRODUCTION
RAPPORT : COMPLET

RECOMMANDATION : NO GO CLÔTURE QA
ACTION : OUVRIR INFOTECHS-QA-001-R1 POUR REDUCED MOTION
PRODUCTION : NO GO
```

## 24. État Git final

Seuls le présent rapport, les captures et les exports d’audit sont autorisés dans l’unique commit documentaire `docs(qa): complete MVP transversal review`. Le SHA final et la preuve de working tree propre sont consignés dans le retour d’exécution, car un commit ne peut contenir son propre SHA.

## 25. R1 — Correction reduced motion

### 25.1 Diagnostic

Le défaut reproduit lors de QA-001 provenait du composant `Reveal` de l’accueil. En mode normal, Framer Motion applique un état initial `opacity: 0` et une translation verticale, puis révèle le contenu à son entrée dans le viewport. La branche conditionnelle basée sur `useReducedMotion()` supprimait cette animation lorsque la préférence était déjà connue, mais ne constituait pas une garantie suffisante pendant l’hydratation et l’observation du viewport. La règle CSS globale réduisait les durées sans rétablir explicitement l’état final visible.

### 25.2 Cause racine

La combinaison de l’état initial animé, du cycle d’hydratation et du déclenchement `whileInView` pouvait laisser un bloc essentiel à `opacity: 0` avec une transformation résiduelle. `prefers-reduced-motion: reduce` neutralisait le temps de transition, mais pas cet état initial. Le contenu pouvait donc rester invisible alors que le mouvement était effectivement réduit.

### 25.3 Correction

Tous les rendus de `Reveal`, animés ou non, portent désormais la classe stable `reveal-content`. Dans `@media (prefers-reduced-motion: reduce)`, cette classe force l’état final accessible : `opacity: 1 !important` et `transform: none !important`. La branche React réduite reste un `div` non animé. Le comportement normal conserve l’animation progressive existante.

### 25.4 Fichiers modifiés ou créés

- `src/components/reveal.tsx` — classe stable commune aux deux branches;
- `src/app/globals.css` — garde CSS reduced motion vers l’état final visible;
- `src/components/__tests__/reveal.test.tsx` — quatre tests ciblés;
- `docs/qa/screens/r1/` — quatre captures comparatives;
- `docs/qa/exports/r1/axe/` — résultat axe Home;
- `docs/qa/exports/r1/lighthouse/` — rapports Lighthouse Home mobile et desktop;
- `docs/qa/infotechs-qa-001-report.md` — présent closeout R1.

Aucune dépendance, configuration de messagerie, page métier ou autre composant public n’a été modifié.

### 25.5 Tests automatisés

Quatre tests ont été ajoutés : rendu réduit visible sans opacité ni translation initiale, conservation de l’animation normale, conservation des classes appelantes et présence de la garde CSS. Résultat consolidé : **148/148 tests réussis dans 26 fichiers**.

### 25.6 Validation technique

```text
npx tsc --noEmit : PASS
npm run lint      : PASS
npm run test      : PASS — 148/148
npm run build     : PASS — 22/22 routes
```

### 25.7 Validation reduced motion

Chrome a été exécuté avec l’émulation navigateur native `reducedMotion: reduce`, aux largeurs 390 et 1280 px.

```text
Reveal immédiatement visible                 PASS — 16/16, 0 masqué
Hero, paragraphe, CTA et diagramme visibles  PASS
Transition des onglets instantanée           PASS — panneau actif opacity 1, 0 animation active
Ligne du processus entièrement affichée      PASS — scale final, aucune transformation résiduelle
Translation des cartes neutralisée           PASS — transform none
Aucun contenu invisible                      PASS
Aucun layout shift perceptible               PASS — inspection des captures
Aucun scroll horizontal                      PASS
```

Contrôle transversal en mode réduit : accueil, Services, Réalisations, À propos et Contact répondent 200 avec leur `h1` visible; la route inconnue répond 404 avec sa page dédiée visible. Aucun débordement horizontal n’a été mesuré.

Le mode `no-preference` a également été contrôlé à 390 et 1280 px. Après déclenchement des reveals, 16/16 blocs atteignent `opacity: 1` et `transform: none`; l’animation progressive normale est donc conservée.

### 25.8 Axe Home

`axe-core 4.12.1` dans Chrome headless : **PASS — 0 violation**. L’export JSON est conservé dans `docs/qa/exports/r1/axe/`.

### 25.9 Clavier et responsive Home

À 390 px et en mode réduit : ouverture du menu avec `Enter`, focus transféré sur le premier lien, fermeture avec `Escape` et restitution du focus au bouton — **PASS**. Les vues 390 et 1280 px ne présentent aucun débordement. Le contenu, les CTA, les onglets, le processus et le footer restent lisibles.

### 25.10 Lighthouse Home

| Profil | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---:|---:|---:|---:|
| Mobile | 91 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

Les deux rapports JSON sont conservés dans `docs/qa/exports/r1/lighthouse/`.

### 25.11 Cross-browser

Smoke test Home à 390 px, en `no-preference` et `reduce` : Chrome, Firefox et WebKit répondent 200, affichent le `h1` et ne présentent aucun débordement. En mode réduit, les trois moteurs mesurent zéro `Reveal` masqué. Safari réel demeure hors environnement Windows; WebKit constitue la couverture moteur disponible.

### 25.12 Captures R1

- `docs/qa/screens/r1/home-reduced-motion-390.png`;
- `docs/qa/screens/r1/home-reduced-motion-1280.png`;
- `docs/qa/screens/r1/home-normal-motion-390.png`;
- `docs/qa/screens/r1/home-normal-motion-1280.png`.

Inspection visuelle : **PASS**. Les captures réduites montrent l’intégralité des sections sans contenu absent; les captures normales stabilisées confirment l’absence de régression de composition.

### 25.13 Anomalies restantes

Le blocage reduced motion de QA-001 est clos. Les constats de production déjà documentés restent inchangés : vulnérabilités héritées, stratégie d’en-têtes de sécurité, recette Resend réelle, confiance dans les en-têtes proxy/rate limiting et validation juridique humaine. Aucun de ces constats n’est corrigé ou reclassé par R1.

### 25.14 Recommandation mise à jour

```text
CORRECTION REDUCED MOTION : PASS
TYPE-CHECK : PASS
LINT : PASS
TESTS : PASS — 148/148
BUILD : PASS — 22/22
AXE HOME : PASS — 0 VIOLATION
CLAVIER HOME : PASS
RESPONSIVE HOME : PASS
LIGHTHOUSE HOME : PASS
CROSS-BROWSER : PASS AVEC LIMITE SAFARI RÉEL DOCUMENTÉE
CAPTURES : PASS — 4/4

RECOMMANDATION : GO CLÔTURE INFOTECHS-QA-001-R1
QA TRANSVERSALE : GO SOUS LES RÉSERVES DÉJÀ DOCUMENTÉES
PRODUCTION : NO GO
```
