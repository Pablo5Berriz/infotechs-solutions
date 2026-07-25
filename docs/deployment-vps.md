# Guide de déploiement — VPS / Proxmox

**Statut**: Guide de référence pour l'exécution future. **Aucun déploiement réel n'a eu lieu.** Ne pas citer ce document comme preuve d'une mise en production.

Basé sur la décision d'architecture: `docs/architecture-decision-hosting.md`.

## 1. Prérequis sur le VPS/VM Proxmox cible

- OS Linux (Debian/Ubuntu recommandé, cohérent avec le reste de la stack).
- Node.js 22.x (version testée dans cet audit — voir `production-readiness-audit.md` section 1.1). Utiliser exactement la même version majeure que la CI pour éviter les divergences de comportement natif (SWC, etc.).
- Traefik déjà déployé ou à déployer (conteneur ou binaire), avec un resolver ACME configuré pour Let's Encrypt.
- Accès DNS pour pointer le (sous-)domaine vers le VPS, ou vers Cloudflare si Cloudflare est en frontal.

## 2. Construction et démarrage — règle non négociable

**Ne jamais copier `node_modules` depuis un poste de développement Windows vers le VPS.** Cet audit a démontré concrètement pourquoi: un `node_modules` installé sous Windows contient des binaires natifs `win32-x64-msvc` qui provoquent soit un blocage indéfini (résolution ESLint), soit un `Bus error` immédiat au build sous Linux (voir `production-readiness-audit.md` section 1.2). Le correctif a été de faire un `npm install`/`npm ci` **natif sur Linux** — c'est exactement la procédure à suivre sur le VPS.

```bash
git clone <dépôt> infotechs-solutions
cd infotechs-solutions
npm ci                      # jamais `npm install` en production — utiliser le lockfile exact
npm run build                # next build — nécessite le runtime Node, pas un export statique
npm run start -- -p 3000     # next start, processus persistant
```

## 3. Variables d'environnement de production

À définir dans un fichier `.env.production.local` **non versionné** (déjà exclu par `.gitignore`, vérifié dans l'audit section 12), avec permissions restrictives (`chmod 600`):

```
NEXT_PUBLIC_SITE_URL=https://infotechssolutions.ca
NEXT_PUBLIC_CONTACT_EMAIL=            # laisser vide tant que non confirmé — voir audit section 3
NEXT_PUBLIC_CONTACT_PHONE=            # idem
# RESEND_API_KEY=                     # à activer seulement après décision de conformité — voir privacy-data-flow.md
# CONTACT_FORM_FROM=
# CONTACT_FORM_TO=
```

Ne jamais committer ce fichier. Ne jamais l'afficher dans une capture d'écran ou un README.

## 4. Processus et redémarrage

Recommandation: **systemd** (plus simple à opérer pour une équipe d'une personne qu'un orchestrateur de conteneurs complet, et cohérent avec un usage direct de Proxmox/VM plutôt que Kubernetes).

```ini
# /etc/systemd/system/infotechs-web.service
[Unit]
Description=Infotechs Solutions - Next.js
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/infotechs-solutions
EnvironmentFile=/opt/infotechs-solutions/.env.production.local
ExecStart=/usr/bin/npm run start -- -p 3000
Restart=on-failure
RestartSec=5
User=infotechs
Group=infotechs

[Install]
WantedBy=multi-user.target
```

Alternative documentée: PM2, si une gestion multi-process ou un dashboard local est préféré. Pas de préférence forte — systemd suffit pour un seul process Node.

## 5. Reverse proxy Traefik (esquisse)

```yaml
# docker-compose.yml (si Traefik est conteneurisé) — labels sur le service applicatif
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.infotechs.rule=Host(`infotechssolutions.ca`)"
  - "traefik.http.routers.infotechs.entrypoints=websecure"
  - "traefik.http.routers.infotechs.tls.certresolver=letsencrypt"
  - "traefik.http.services.infotechs.loadbalancer.server.port=3000"
```

Si l'app tourne directement sur le VPS via systemd (pas conteneurisée), Traefik route vers `http://127.0.0.1:3000` via un provider de fichier statique plutôt que le provider Docker.

## 6. Checklist de premier déploiement

- [ ] Mise à jour de sécurité Next.js appliquée et testée (voir `production-readiness-audit.md` section 1.3 — 16.2.11 minimum)
- [ ] `npm ci && npm run lint && npm run test && npm run build` verts sur le VPS lui-même, pas seulement en CI
- [ ] Variables d'environnement de production définies, fichier non versionné, permissions 600
- [ ] Traefik configuré, certificat TLS émis et vérifié (`curl -I https://...`)
- [ ] Service systemd actif, `systemctl status infotechs-web` sain, redémarrage testé manuellement une fois
- [ ] Uptime Kuma pointé sur le domaine public (voir `operations-runbook.md`)
- [ ] Lighthouse/axe exécutés sur l'URL de production réelle, pas seulement en local

## 7. Ce que ce document ne couvre pas

La revue juridique, l'audit de performance/accessibilité chiffré, et l'activation d'une intégration de collecte de données réelle sont des préalables documentés ailleurs (`privacy-data-flow.md`, `accessibility-audit.md`, `performance-audit.md`) et doivent être complétés **avant** d'exécuter la checklist ci-dessus en production, pas après.
