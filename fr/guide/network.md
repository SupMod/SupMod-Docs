# Plusieurs serveurs

Des serveurs derrière un proxy (BungeeCord, Velocity) peuvent partager une seule base de données MySQL. SupMod les garde alors synchronisés **uniquement par la base de données** : aucun plugin sur le proxy, aucun port à ouvrir, aucun service externe.

## Ce qui est partagé {#what-is-shared}

| Partagé par la base de données elle-même | Envoyé aux autres serveurs en quelques secondes |
|---|---|
| Fiches joueur, temps de jeu, historique des sanctions | Un ban, kick, mute ou avertissement : appliqué là où se trouve le joueur |
| Signalements, tickets, appels et leurs réponses | La levée d'un mute ou d'un ban |
| Notes du staff, tags, statistiques | Le chat staff |
| Bans : vérifiés à chaque connexion, sur chaque serveur | Alertes du staff : nouveaux signalements, tickets, appels, x-ray, doubles comptes, joueurs surveillés |

Les messages venant d'un autre serveur affichent son nom : <span class="mc">[survival] Ticket #12 de Steve : ...</span>

## Mise en place {#set-it-up}

Sur **chaque** serveur :

1. Utilisez MySQL avec la même base de données : voir [Base de données](/fr/guide/storage).
2. Dans `config.yml` :

```yaml
network:
  enabled: true
  # Un nom différent sur chaque serveur
  server-name: "survival"
  poll-seconds: 2
  retention-hours: 24
  sync:
    punishments: true
    staff-chat: true
    alerts: true
```

3. Redémarrez.

Vérifiez avec `/sm network` : la commande affiche le nom du serveur, le nombre d'événements envoyés et reçus, et la dernière lecture.

::: warning Donnez un nom à chaque serveur
Le nom est affiché dans les alertes et les tickets. Si deux serveurs gardent le nom par défaut `server`, la console vous prévient.
:::

## Fonctionnement {#how-it-works}

Chaque serveur écrit ses événements dans la table `sm_sync_events` et lit les événements des autres toutes les `poll-seconds` secondes (une petite requête sur un index). La base de données reste la référence : un événement sur une sanction ne contient que son numéro, et chaque serveur lit lui-même la sanction. Les événements sont supprimés après `retention-hours`.

Le format des événements est documenté sur la page [Base de données et panel web](/fr/reference/database#sync-events) : un panel web peut aussi publier des événements.

## Limites {#limits}

- Le vanish, le freeze et le mode staff restent sur le serveur où ils ont été utilisés.
- Les statistiques Minecraft (`/sm mcstats`) viennent des fichiers du monde de chaque serveur : sur un réseau, elles montrent le dernier serveur où le joueur a joué.
- Chaque serveur garde son propre `config.yml` : copiez-le si les serveurs doivent se comporter de la même façon.
