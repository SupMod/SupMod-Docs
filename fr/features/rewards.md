# Récompenses

Deux types de récompenses font revenir les joueurs : les **paliers de temps de jeu** (10 heures, 50 heures...) et une **récompense quotidienne** avec une série. Les joueurs les voient avec `/rewards` (et `/daily` pour la récompense quotidienne). Tout se trouve dans `rewards.yml` et se modifie en jeu avec `/rewards admin` (permission `supmod.rewards.admin`).

## Paliers de temps de jeu {#play-time-milestones}

```yaml
playtime:
  enabled: true
  auto-claim: true          # false : le joueur est invité à ouvrir /rewards et à cliquer
  milestones:
    10h:
      time: 10h
      name: "&e10 hours of play"
      icon: IRON_INGOT
      coins: 500
      commands: []
      broadcast: true
    50h:
      time: 50h
      name: "&650 hours of play"
      icon: GOLD_INGOT
      coins: 2500
      commands:
        - "give %player% diamond 3"
      broadcast: true
```

Chaque palier donne des coins et / ou des commandes console (`%player%` = le pseudo), une seule fois par joueur. Le temps de jeu ne compte pas le temps [AFK](/fr/features/afk) : une ferme AFK ne rapporte donc rien.

## Récompense quotidienne {#daily-reward}

```yaml
daily:
  enabled: true
  auto-claim: false         # true : donnée à la première connexion du jour
  loop: true                # après le dernier jour, on recommence au jour 1
  days:
    1:
      coins: 50
    2:
      coins: 75
    # ...
    7:
      coins: 500
      icon: NETHER_STAR
      commands:
        - "give %player% diamond 1"
```

Récupérer la récompense quotidienne plusieurs jours de suite augmente la **série** (avec `auto-claim: false`, le joueur doit la récupérer chaque jour avec `/daily` ou `/rewards` : se connecter ne suffit pas) ; manquer un jour fait recommencer au jour 1. Le jour change à minuit dans le fuseau horaire de `timezone`. Une récompense est donnée une seule fois par jour, même avec [plusieurs serveurs](/fr/guide/network) sur une seule base de données.

La série s'affiche avec `%supmod_streak%` et a son propre [classement](/fr/features/statistics#leaderboards).

## En jeu {#in-game}

- `/rewards` affiche les paliers (atteints, récupérés, temps restant) et les jours de la série ; cliquez pour récupérer.
- `/rewards admin` : ajouter, modifier ou supprimer des paliers et des jours (coins, icône, commandes, annonce).
- `/rewards reload` : recharger `rewards.yml`.

::: info Commandes console
Modifier les commandes d'une récompense en jeu demande `supmod.admin.commands`. Les pseudos qui pourraient ajouter des arguments à une commande (pseudos Bedrock avec des espaces...) sont refusés.
:::

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.rewards` | `/rewards`, `/daily` et recevoir les récompenses (tout le monde) |
| `supmod.rewards.admin` | modifier les récompenses |
