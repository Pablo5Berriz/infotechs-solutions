# ADR — Architecture d'hébergement de production

**Statut**: Décision documentée, **non exécutée** (aucun déploiement réel effectué).
**Contexte source**: `docs/production-readiness-audit.md`, sections 1.4 et 2.

## Contexte

Le build de production (`npm run build`, preuve dans l'audit) confirme:
- `next.config.ts` ne définit pas `output: "export"`.
- La route `app/api/contact/route.ts` compile en route dynamique (`ƒ`), c'est-à-dire un endpoint évalué à la requête, pas au build.
- 27 routes sur 29 sont statiques/SSG et pourraient en théorie être servies par un simple CDN — mais la présence d'une seule route serveur suffit à exclure un hébergement 100 % statique sans modification du code (suppression de la route API).

Deux options existaient donc réellement, pas plus:

| Option | Faisable sans changement de code? | Conséquence |
|---|---|---|
| A. Hébergement statique pur (CDN, pas de runtime) | Non | `/api/contact` ne fonctionnerait jamais, même une fois une intégration Resend/Supabase activée |
| B. Runtime Node persistant (VPS, container, PaaS Node) | Oui | Aucune modification de code requise |

Il n'y a donc pas d'ambiguïté à trancher entre plusieurs architectures "toutes définitives" — le code lui-même impose l'option B tant que `/api/contact` existe.

## Décision retenue

```
Next.js hybride (SSG + route API serveur)
Hébergement: VPS / Proxmox (auto-hébergé)
Reverse proxy: Traefik
HTTPS: Let's Encrypt via Traefik (resolver ACME)
Cloudflare en frontal si déjà utilisé pour le DNS/CDN existant du domaine
Monitoring: Uptime Kuma
Logs: stdout du conteneur/process → agrégation future via Grafana Loki si la stack existe déjà
```

## Raisons

1. **Contrainte technique dure**: la route API impose un runtime Node vivant. Un export statique casserait silencieusement le formulaire de contact au moment de son activation (Resend/Supabase), un bug difficile à repérer en revue si l'hébergement est décidé après coup.
2. **Alignement avec la stack existante** de l'utilisateur (Proxmox mentionné explicitement dans les préférences de travail) — cohérence opérationnelle, pas de nouvel outil à apprendre.
3. **Coût et contrôle**: un VPS/Proxmox auto-hébergé évite le lock-in d'un PaaS et permet un contrôle total des logs, sauvegardes et secrets — aligné avec les préférences de sécurité et maintenabilité à long terme.
4. **Traefik** gère automatiquement le renouvellement TLS et le routage par domaine, réduisant la surface de configuration manuelle nginx.

## Alternative rejetée (documentée, pas exécutée en parallèle)

**Vercel / PaaS Node managé**: plus simple à mettre en place, gère nativement le mode hybride Next.js, mais introduit une dépendance à un fournisseur tiers pour l'hébergement d'un site dont l'objectif d'affaires est justement de vendre des solutions auto-hébergées/maîtrisées à des PME — incohérence de positionnement, en plus d'un coût récurrent externe. Rejetée, mais reste une option de repli si l'exploitation VPS s'avère trop lourde pour l'équipe (1 personne).

## Conséquences opérationnelles (détail: `docs/deployment-vps.md`, `docs/operations-runbook.md`)

- **Mode de build**: `npm ci && npm run build` sur la cible Linux — jamais de copie de `node_modules` depuis un poste Windows (cause du bus error rencontré pendant cet audit, voir `production-readiness-audit.md` section 1.2).
- **Mode de démarrage**: `npm run start` (`next start`), processus Node persistant, pas de fonctions serverless.
- **Port interne**: 3000 par défaut (configurable via `-p`), exposé uniquement à Traefik, jamais directement à Internet.
- **Reverse proxy**: Traefik termine TLS, route vers le conteneur/process Next.js.
- **HTTPS**: certificat Let's Encrypt automatique via Traefik, renouvellement automatique.
- **Redémarrages**: géré par systemd (unit `Restart=on-failure`) ou par le orchestrateur de conteneurs si le déploiement est conteneurisé — décision à prendre dans `deployment-vps.md`.
- **Sauvegardes**: fichiers de configuration (`.env` de production, config Traefik, docker-compose le cas échéant) sauvegardés hors du VPS — le code applicatif n'a pas besoin de sauvegarde séparée puisqu'il vit dans git.
- **Monitoring**: Uptime Kuma interroge un health check HTTP (`GET /` suffit tant qu'aucune route de santé dédiée n'existe — voir recommandation dans `operations-runbook.md` d'ajouter `/api/health`).

## Ce qui n'est PAS fait

Aucun VPS n'a été provisionné, aucun déploiement réel n'a eu lieu dans le cadre de cet audit. Ce document est une décision d'architecture, pas une preuve de déploiement. Le statut GO/NO GO global reste NO GO tant qu'un déploiement réel avec monitoring actif n'existe pas (voir `production-readiness-audit.md`, section 18).
