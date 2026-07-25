# Registre des assets

**But**: aucune image ou fichier binaire ne doit rester avec une provenance inconnue avant publication. Ce registre reflète l'état réel trouvé — les champs « origine/licence » marqués **INCONNU** sont des lacunes réelles, pas des valeurs par défaut acceptables.

| Chemin | Type | Dimensions | Poids | Format | Usage | Alt text | Origine | Licence | Statut |
|---|---|---|---|---|---|---|---|---|---|
| `public/images/hero-technology-workspace.png` | Image (hero) | 1717×916 | 1,38 Mio (1 444 158 o) | PNG 8-bit RGB | Hero de la page d'accueil + OpenGraph/Twitter card | « Interfaces numériques modernes pour PME » (présent, descriptif) | **INCONNU** — aucune métadonnée EXIF/sidecar trouvée | **INCONNU** | **À CONFIRMER par le fondateur avant publication.** Probable génération IA ou banque d'images vu le nom de fichier et le style — à vérifier, car l'usage commercial de certaines banques ou générateurs a des conditions de licence spécifiques (attribution, exclusion d'usage commercial, etc.) |
| `public/file.svg` | Icône | — | ~1 Ko | SVG | **Aucune référence trouvée dans le code source** (`src/`) | — | Gabarit par défaut `create-next-app` (Vercel) | MIT (licence du gabarit Next.js) | Inutilisé — candidat à suppression |
| `public/globe.svg` | Icône | — | ~1 Ko | SVG | Aucune référence trouvée | — | Gabarit par défaut `create-next-app` | MIT | Inutilisé — candidat à suppression |
| `public/next.svg` | Icône | — | ~1 Ko | SVG | Aucune référence trouvée | — | Gabarit par défaut `create-next-app` | MIT | Inutilisé — candidat à suppression |
| `public/vercel.svg` | Icône | — | ~1 Ko | SVG | Aucune référence trouvée | — | Gabarit par défaut `create-next-app` | MIT | Inutilisé — candidat à suppression. Publier le logo Vercel sur un site qui n'utilise pas Vercel comme hébergeur (décision retenue: VPS/Proxmox) est incohérent avec le positionnement du site |
| `public/window.svg` | Icône | — | ~1 Ko | SVG | Aucune référence trouvée | — | Gabarit par défaut `create-next-app` | MIT | Inutilisé — candidat à suppression |
| `src/app/favicon.ico` | Favicon | — | — | ICO | Favicon du site | N/A (favicon) | **INCONNU** — probablement généré par `create-next-app`, non vérifié pixel par pixel | Probable MIT (gabarit) si jamais personnalisé | À confirmer si c'est le favicon définitif de marque ou un reliquat de gabarit |
| `screenshots/*.png` (4 fichiers) | Captures d'écran de développement | — | — | PNG | Aucun usage applicatif — semble être des captures de vérification manuelle laissées dans le dépôt | N/A | Générées par le développeur pendant le travail | N/A | **Ne devraient pas être dans le dépôt applicatif.** Recommandation: déplacer vers un espace de documentation interne (ex. wiki, Google Drive) ou un dossier explicitement exclu du build, pas dans la racine du repo à côté du code source |

## Constats

1. **Un seul asset visuel réel est utilisé en production**: le hero PNG. Sa provenance est inconnue — c'est le point bloquant principal de ce registre.
2. **5 icônes SVG du gabarit par défaut ne sont référencées nulle part** dans `src/` (vérifié par recherche de leur nom de fichier dans le code source) — poids négligeable individuellement, mais nettoyage recommandé pour éviter la confusion et légèrement réduire le contenu du dossier `public/`.
3. **Le dossier `screenshots/` ne devrait pas cohabiter avec le code applicatif** — ce n'est ni un asset servi au public, ni un artefact de build ; c'est du contenu de travail qui pollue le dépôt.

## Action requise avant GO

- Confirmer l'origine et la licence de `hero-technology-workspace.png` auprès du fondateur.
- Décider du sort des 5 SVG inutilisés et du dossier `screenshots/` (suppression recommandée, décision non exécutée dans ce lot — suppression de fichiers est un changement destructif qui doit être une décision explicite, pas une action automatique de l'agent).
