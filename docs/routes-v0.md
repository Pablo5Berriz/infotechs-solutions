# Infotechs Solutions — Inventaire des routes V0

Référence complémentaire à `docs/product-v0.md`. Aucune route n'est
implémentée dans ce lot ; ce document sert de contrat pour un futur lot
d'implémentation.

| Route | FR | EN (futur) | Objectif | Audience | CTA principal | SEO cible | V0 |
|---|---|---|---|---|---|---|---|
| `/` | Accueil | Home | Faire comprendre l'offre en quelques secondes, orienter vers le bon pilier ou vers le contact | Tous personas | CTA primaire — Parler de votre projet | « solutions numériques PME [zone] » | OBLIGATOIRE |
| `/services` | Services | Services | Présenter les 3 piliers (présence, outils métier, exploitation) | Persona A/B/C selon section | CTA primaire | « services numériques PME », déclinaisons par pilier en H2 | OBLIGATOIRE |
| `/realisations` | Réalisations | Work | Démontrer une capacité réelle via un ou des cas documentés | Persona A/B | CTA secondaire → Contact | « réalisations / portfolio Infotechs Solutions » — contenu conditionnel, voir DEC-V0-002 | OBLIGATOIRE (structure) — contenu publié conditionnel |
| `/a-propos` | À propos | About | Qui fournit le service, où, pour qui, comment | Persona A/C (réassurance) | CTA secondaire | « à propos Infotechs Solutions » | OBLIGATOIRE |
| `/contact` | Contact | Contact | Convertir le prospect (formulaire + coordonnées) | Tous personas | Formulaire (voir contrat §17 product-v0.md) | « contact Infotechs Solutions » | OBLIGATOIRE |
| `/confidentialite` | Politique de confidentialité | Privacy Policy | Conformité Loi 25, transparence sur les données collectées | — (page légale) | aucun | non indexé prioritairement | OBLIGATOIRE avant activation du formulaire |
| `/mentions-legales` | Mentions légales | Legal Notice | Identification légale de l'entreprise | — (page légale) | aucun | non indexé prioritairement | OBLIGATOIRE avant mise en ligne publique |

## Routes explicitement écartées ou reportées de la V0

| Route candidate | Statut | Raison |
|---|---|---|
| `/services/presence-numerique`, `/services/outils-metier`, `/services/exploitation` | REPORTÉ (V0.1) | Voir §13 product-v0.md — option A retenue pour la V0 |
| Pages géographiques (`/services/monteregie`, etc.) | NON RECOMMANDÉ | Voir §21 product-v0.md — pas de contenu réel justifiant ces pages |
| `/blog` | HORS V0 | Voir §24 product-v0.md |
| `/rendez-vous` | REPORTÉ (V0.1) | Le contact simple suffit en V0 |
| `/espace-client`, `/dashboard` | HORS V0 | Aucune authentification introduite sans besoin validé |
| `/en/...` (bilingue) | REPORTÉ | Architecture recommandée (préfixe `/fr`/`/en`) mais non implémentée — voir §22 product-v0.md |

## Total de routes V0 obligatoires

5 routes fonctionnelles (`/`, `/services`, `/realisations`, `/a-propos`,
`/contact`) + 2 routes légales (`/confidentialite`,
`/mentions-legales`) = **7 routes**, conforme à l'exigence de rester
compact (§15 de la directive INFOTECHS-PRODUCT-IA-001).
