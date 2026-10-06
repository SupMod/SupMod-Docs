# Maintenance et redémarrages

## Maintenance {#maintenance}

`/sm maintenance on [delay] [reason]` (permission `supmod.maintenance`) ferme le serveur :

```text
/sm maintenance on 5m Update of the plugins
```

1. Un compte à rebours s'affiche dans le chat et dans une barre de boss (ici 5 minutes ; sans délai, la maintenance commence tout de suite).
2. Les joueurs qui ne peuvent pas rester sont kick avec la raison.
3. Jusqu'à `/sm maintenance off`, seuls ces joueurs peuvent se connecter : les opérateurs, `supmod.maintenance.bypass` et la whitelist de maintenance.
4. La liste des serveurs affiche le MOTD de maintenance de `display.yml` (`motd.maintenance`).

| Commande | |
|---|---|
| `/sm maintenance` | état de la maintenance |
| `/sm maintenance off` | rouvrir le serveur |
| `/sm maintenance cancel` | annuler le compte à rebours |
| `/sm maintenance add <player>` / `remove <player>` | whitelist de la maintenance (builders, testeurs...) |
| `/sm maintenance list` | la whitelist |

La maintenance reste active après un redémarrage. Elle est annoncée sur [Discord](/fr/features/discord) quand l'événement `alert` est activé.

## Redémarrages programmés {#scheduled-restarts}

```yaml
restart:
  enabled: false
  times: ["04:00"]          # fuseau horaire de "timezone"
  days: []                  # MONDAY ... SUNDAY, vide = tous les jours
  warnings: [900, 600, 300, 120, 60, 30, 10, 5, 4, 3, 2, 1]
  method: SHUTDOWN          # ou RESTART (restart-script de spigot.yml)
  commands-before:
    - "save-all"
  bossbar: true
  title: true
```

Avant le redémarrage, les joueurs voient un compte à rebours dans le chat et dans une barre de boss à chaque valeur de `warnings` (en secondes), et en titre pendant les 10 dernières secondes. Les `commands-before` sont exécutées, puis le serveur s'arrête.

`SHUTDOWN` arrête simplement le serveur : votre hébergeur ou votre script de démarrage le relance. `RESTART` utilise le `restart-script` de `spigot.yml`.

| Commande (permission `supmod.restart`) | |
|---|---|
| `/sm restart 10m` | redémarrage dans 10 minutes |
| `/sm restart now` | redémarrage immédiat (avec les commandes d'avant) |
| `/sm restart cancel` | annuler le compte à rebours |
| `/sm restart status` | prochain redémarrage programmé |

::: info Info
Modifier `commands-before` en jeu demande `supmod.admin.commands`.
:::

## Messages en barre de boss {#boss-bar-messages}

`/sm bossbar <seconds> [color] <text>` (permission `supmod.bossbar.admin`) affiche un message à tout le monde dans une barre de boss :

```text
/sm bossbar 30 RED &cEvent in the arena in 5 minutes!
```

Couleurs : `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE`. Les barres de boss en rotation se règlent dans [`display.yml`](/fr/features/display#boss-bars).
