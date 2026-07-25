# Runbook d'exploitation

**Statut**: Procédure de référence. **Aucun élément listé ici n'est actuellement actif** — rien n'a été configuré ou vérifié en production dans le cadre de cet audit, car aucune production n'existe encore.

## 1. Health check

Le code actuel ne définit **aucune route de santé dédiée** (`/api/health` n'existe pas — vérifié: seule route API présente est `/api/contact`). Recommandation avant de configurer Uptime Kuma sérieusement: ajouter une route minimale `app/api/health/route.ts` retournant `{ ok: true }` avec un code 200, pour distinguer un site fonctionnel d'une simple page statique qui pourrait rester en cache même si le runtime Node est tombé. **Non ajouté dans ce lot** (nouvelle route = nouvelle fonctionnalité, hors périmètre d'un lot d'audit — voir directive PM, préambule).

En attendant, un health check basique sur `GET /` (code 200 attendu) est suffisant pour un premier monitoring, avec la limite qu'une page statique en cache Traefik/Cloudflare pourrait masquer un runtime Node arrêté.

## 2. Uptime Kuma

À configurer une fois le VPS déployé (voir `deployment-vps.md`):
- Moniteur HTTP(s) sur `https://infotechssolutions.ca/`, intervalle recommandé 60 s.
- Alertes à configurer vers un canal que le fondateur consulte réellement (courriel, ou autre déjà en place).
- Une fois `/api/health` ajouté, ajouter un second moniteur dédié pour distinguer panne applicative de panne réseau/DNS.

## 3. Logs applicatifs

`next start` écrit sur stdout/stderr. Sous systemd, ces flux sont automatiquement captés par `journald`:

```bash
journalctl -u infotechs-web -f          # suivre en direct
journalctl -u infotechs-web --since "1 hour ago"
```

**Rotation**: `journald` gère nativement la rotation par taille/durée (configuration système par défaut, à vérifier avec `journalctl --disk-usage` périodiquement). Aucune configuration applicative supplémentaire n'est requise tant que le volume de logs reste faible (site à faible trafic dans cette phase).

**Point d'attention pour plus tard**: si une intégration Resend/Supabase est activée (voir `privacy-data-flow.md`), s'assurer que les logs de la route `/api/contact` ne journalisent jamais le contenu brut des soumissions (nom, courriel, message) en clair dans des logs à rétention longue, pour limiter l'exposition en cas de fuite de logs.

## 4. Procédure de redémarrage

```bash
sudo systemctl restart infotechs-web
sudo systemctl status infotechs-web     # vérifier "active (running)" et l'absence d'erreur récente
curl -I https://infotechssolutions.ca/  # vérifier 200 après redémarrage
```

Redémarrage automatique déjà couvert par `Restart=on-failure` dans l'unit systemd (`deployment-vps.md` section 4) — un crash isolé se rétablit sans intervention humaine.

## 5. Procédure de mise à jour

```bash
cd /opt/infotechs-solutions
git fetch origin
git checkout main
git pull
npm ci                     # jamais `npm install` en production
npm run lint && npm run test && npm run build   # échouer ici = ne pas redémarrer le service
sudo systemctl restart infotechs-web
curl -I https://infotechssolutions.ca/
```

Si `lint`, `test` ou `build` échoue, **ne pas redémarrer le service** — l'ancien build reste actif tant que `.next/` n'a pas été écrasé par un build raté. Corriger et recommencer, ou passer à la procédure de rollback.

## 6. Procédure de rollback

```bash
cd /opt/infotechs-solutions
git log --oneline -5              # identifier le dernier commit sain
git checkout <sha-précédent>
npm ci
npm run build
sudo systemctl restart infotechs-web
curl -I https://infotechssolutions.ca/
```

**Prérequis pour que ceci fonctionne**: un historique git propre avec des commits atomiques et testés. Rappel de l'audit (`production-readiness-audit.md` section 1.1 et 17.7): **le dépôt actuel n'a aucun commit correspondant à l'état actuel du produit.** Tant que ce point n'est pas corrigé (commit explicite après revue de ce lot), la procédure de rollback ci-dessus n'a rien de fiable vers quoi revenir.

## 7. Sauvegarde des configurations

À sauvegarder hors du VPS (dépôt privé séparé, ou gestionnaire de secrets):
- `.env.production.local`
- Configuration Traefik (labels ou fichiers dynamiques)
- Unit systemd si modifiée manuellement sur le serveur

Le code applicatif n'a pas besoin de sauvegarde séparée — il vit dans git. Aucune base de données n'existe encore dans cette V1 (aucune intégration Supabase active — voir `privacy-data-flow.md`), donc aucune sauvegarde de données n'est applicable pour l'instant.

## 8. Ce qui manque avant que ce runbook soit opérationnel

- Route `/api/health` (recommandée, non implémentée).
- VPS provisionné et Traefik configuré (voir `deployment-vps.md`).
- Uptime Kuma installé et pointé.
- Premier commit git représentant l'état réel du produit, pour que le rollback ait un sens.
