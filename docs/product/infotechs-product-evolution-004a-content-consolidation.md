# INFOTECHS-PRODUCT-EVOLUTION-004A — Consolidation des contenus

## 1. Baseline

```text
BRANCHE : master
SHA : cf8e95745a541c9beffe98931864434fceba9813
WORKING TREE INITIAL : PROPRE
COMMIT : AUCUN
```

## 2. Cartographie avant consolidation

| Identifiant | Fichier source | Utilisateurs | Public | État | Doublon | Action |
|---|---|---|---|---|---|---|
| `services` | `src/lib/data.ts` | tests hérités, helpers morts | non | hérité | `serviceOfferings` | supprimé |
| `serviceOfferings` | `src/lib/service-offerings.ts` | pages, routes, sitemap, footer | oui | actif | ancien `services` | conservé comme canonique |
| `projects` | `src/lib/data.ts` | accueil, composant mort, tests hérités | partiellement | hérité | `portfolioProjects` | supprimé et accueil migré |
| `portfolioProjects` | `src/lib/project-portfolio.ts` | Réalisations, routes, sitemap | oui | actif | ancien `projects` | conservé comme canonique |
| `resources` | `src/lib/data.ts` | test hérité uniquement | non | hérité | aucun contenu public | supprimé |
| `projectCategories` | `src/lib/data.ts` | `ProjectFilter` non monté | non | hérité | catégories du portfolio | supprimé |
| `ServiceCard` | `src/components/service-card.tsx` | aucun import | non | hérité | `ServiceIndexCard` | fichier supprimé |
| `ProjectFilter` | `src/components/project-filter.tsx` | aucun import | non | hérité | page Réalisations actuelle | fichier supprimé |
| `site`, `navItems` | `src/lib/data.ts` | layout, header, footer, SEO, pages légales | oui | actif mais mélangé | configuration globale | migré vers `site-config.ts` |
| technologies | constante dans `src/app/page.tsx` | accueil | oui | actif | aucune source typée | migré vers `siteConfig` |
| `processSteps`, `whyUs` | `src/lib/data.ts` | accueil | oui | actif | aucun | conservé dans un fichier éditorial réduit |
| helpers `getService`, `getProject` | `src/lib/utils.ts` | aucun import | non | hérité | helpers canoniques existants | supprimés |

## 3. Doublons trouvés

Deux catalogues de services et deux catalogues de réalisations coexistaient. L'ancien catalogue comportait neuf services, des prix, des délais, des résultats et une taxonomie sans route publique correspondante. L'accueil utilisait les trois premiers anciens projets, tandis que les pages Réalisations, les routes et le sitemap utilisaient `portfolioProjects`.

La configuration globale, la navigation et les technologies publiées étaient également dispersées entre `data.ts`, le composant d'accueil et plusieurs consommateurs SEO.

## 4. Modèle canonique retenu

### Services

`src/lib/service-offerings.ts` est l'unique catalogue public. `ServiceOffering` possède désormais :

- un statut `published | draft` ;
- une liste explicite de technologies ;
- les champs éditoriaux, SEO, relations et routes déjà utilisés ;
- aucun prix ni délai non validé.

Les trois entrées actuelles sont `published`. Aucun nouveau service n'a été ajouté.

### Portfolio

`src/lib/project-portfolio.ts` est l'unique catalogue de réalisations. Le statut est réduit aux deux états autorisés par le modèle actuel : `concept | client`. Les six entrées actuelles restent explicitement `concept`, sans technologies ni résultats commerciaux inventés.

L'accueil, la page Réalisations, les fiches, les métadonnées, les routes et le sitemap dépendent désormais de cette même collection.

### Configuration globale

`src/lib/site-config.ts` centralise et type :

- identité, URL, description et mots-clés ;
- contact avec `email`, `phone`, `address`, `region`, `businessHours` ;
- navigation ;
- CTA principal ;
- technologies publiées.

Les champs `address` et `businessHours` sont préparés mais non renseignés. Les nouvelles coordonnées décidées pour 004B ne sont donc pas publiées dans ce lot.

Cette structure est compatible avec une future couche de localisation ou un adaptateur CMS sans implémenter l'un ou l'autre.

## 5. Migrations réalisées

- Accueil relié à `portfolioProjects`.
- Configuration, navigation et métadonnées reliées à `site-config.ts`.
- Schema.org typé depuis la configuration canonique.
- URL absolue dérivée de `siteConfig.url`.
- Services enrichis de statuts et technologies explicites.
- Statuts du portfolio limités à `concept | client`.
- Tests du header et footer migrés vers la nouvelle configuration.

## 6. Données et fichiers supprimés

Données supprimées de `data.ts` : anciens services, anciens projets, ressources non publiées, catégories, icônes de services, prix, délais et résultats hérités. Les fragments transversaux non utilisés (`methodGuarantees`, FAQ historique et note d'évolution) ont également été retirés faute de consommateur.

Fichiers supprimés après confirmation d'absence d'import :

- `src/components/service-card.tsx` ;
- `src/components/project-filter.tsx` ;
- `src/lib/__tests__/data.test.ts`, qui testait exclusivement les collections supprimées.

Les helpers morts `getService` et `getProject` ont été retirés de `utils.ts`.

## 7. Données conservées

- `serviceOfferings` : source publique des trois services.
- `portfolioProjects` : source publique des six concepts.
- `processSteps` et `whyUs` : contenus transversaux effectivement rendus sur l'accueil.
- `about-content.ts` : contenu spécialisé de la page À propos, sans doublon métier identifié.
- Navigation, contact, SEO et technologies : déplacés dans `site-config.ts`.

## 8. Technologies vérifiées

| Technologie | Preuve dans le dépôt | Décision publique |
|---|---|---|
| Next.js | framework et build applicatif | conservée |
| React | dépendance et composants | conservée |
| TypeScript | sources et type-check | conservée |
| PostgreSQL | aucune dépendance, intégration ou projet démontré | retirée |
| Docker | aucune configuration ou preuve de projet dans le dépôt | retirée |

Les offres Web et Application peuvent référencer les technologies démontrées. Les automatisations et les concepts ne reçoivent aucune technologie non vérifiée.

## 9. Imports supprimés et recherche de résidus

La recherche demandée confirme que :

- les occurrences actives de `serviceOfferings` concernent les pages, routes, sitemap, footer et tests canoniques ;
- les occurrences actives de `portfolioProjects` concernent l'accueil, les pages, routes, sitemap et tests canoniques ;
- `resources`, `projectCategories`, `ServiceCard` et `ProjectFilter` ne subsistent que dans les assertions de non-régression ou ne subsistent plus ;
- le mot générique `services` reste naturellement présent dans les routes et textes, sans réintroduire l'ancienne collection ;
- `projects` n'est plus importé de `data.ts` ; l'alias local de l'accueil référence directement `portfolioProjects`.

## 10. Tests et validations

```text
npx tsc --noEmit : PASS
npm run lint : PASS
npm test : PASS — 181/181 dans 29 fichiers
npm run build : PASS — 22/22 routes
git diff --check : PASS
```

Dix tests de consolidation vérifient les slugs, routes, statuts, absence de prix et délais, source de l'accueil, configuration globale, absence de coordonnées anticipées et suppression des anciennes collections et composants. Les tests canoniques de services vérifient également le statut `published` et l'absence de champs commerciaux hérités.

## 11. Régressions

Aucune route n'est ajoutée ou supprimée. Le build reste à 22/22. Les textes marketing, coordonnées publiques, services, traductions, thème et dépendances restent inchangés, à l'exception du retrait des deux technologies non justifiées dans l'affichage public.

## 12. Risques résiduels

- `data.ts` reste un nom générique pour deux fragments de contenu de l'accueil ; un futur modèle éditorial pourra les déplacer sans urgence fonctionnelle.
- L'alias local `projects` de l'accueil pointe vers `portfolioProjects`; il ne constitue plus une source distincte.
- Les coordonnées décidées par le PM restent à intégrer en 004B.
- « Maintenance et évolution » reste à créer dans un lot ultérieur.
- La localisation FR/EN nécessite encore une décision de structure de routes et de champs.
- Le thème clair/sombre nécessite la consolidation des tokens.
- Le CMS reste interdit tant que les schémas éditoriaux et workflows ne sont pas approuvés.

## 13. Préparation des évolutions

FR/EN : les modèles canoniques sont isolés, ce qui permet d'ajouter ultérieurement une couche localisée sans dupliquer les routes métier.

Thème : la configuration éditoriale n'embarque aucune valeur visuelle ; les contenus resteront indépendants des tokens clair/sombre.

CMS : `siteConfig`, `ServiceOffering` et `PortfolioProject` constituent les frontières à adapter. Un CMS ne devra gérer que les champs autorisés et jamais injecter librement du HTML, CSS ou JavaScript.

## 14. Recommandation PM

```text
CONSOLIDATION 004A : GO POUR VALIDATION PM
PROCHAINE ÉTAPE RECOMMANDÉE : 004B — NAVIGATION ET COORDONNÉES
COMMIT : AUCUN AVANT AUTORISATION PM
PRODUCTION : NO GO
```
