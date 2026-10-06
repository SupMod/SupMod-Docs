# MOTD, tab, barre latérale

Tout ce que les joueurs voient autour du jeu se trouve dans `display.yml` : la liste des serveurs (MOTD), la liste tab, la barre latérale, les barres de boss et les messages de connexion. Chaque partie a un interrupteur `enabled`, et les options principales se modifient en jeu avec `/sm settings`. Les textes (lignes du MOTD, cadres du tab, formats de nom, messages des barres de boss, formats des messages de connexion) se modifient dans le fichier, puis `/sm reload`.

Les couleurs `&a`... et hexadécimales `&#RRGGBB` fonctionnent partout, avec ces placeholders :

`%player%` `%online%` (staff en vanish non compté) `%max%` `%staff_online%` `%ping%` `%tps%` `%world%` `%time%` `%date%` `%coins%` `%playtime%` `%kills%` `%deaths%` `%streak%` `%bounty%` `%maintenance%` `%afk%`, et tous les placeholders [PlaceholderAPI](/fr/reference/placeholders) quand PlaceholderAPI est installé.

Les valeurs sont lues en mémoire : un tab actualisé chaque seconde n'interroge jamais la base de données.

## MOTD {#motd}

```yaml
motd:
  enabled: true
  random: true              # un MOTD au hasard à chaque ping, ou l'un après l'autre
  list:
    - - "&d&lMY SERVER &8» &fSurvival 1.21"
      - "&7%online%/%max% players online &8- &aJoin us!"
    - - "&#ff6ec7&lMY SERVER &8» &fNew season"
      - "&eDaily rewards, bounties and events"
  maintenance:              # affiché pendant la maintenance
    - "&c&lMAINTENANCE &8» &fBack very soon"
    - "&7Follow us on Discord for the news"
  max-players: 0            # maximum affiché dans la liste (0 = le vrai)
  hide-vanished: true       # staff en vanish non compté et non listé
```

Chaque MOTD a deux lignes. Seuls `%online%` et `%max%` fonctionnent dans le MOTD.

## Tab {#tab}

```yaml
tab:
  enabled: true
  update-ticks: 20          # 20 ticks = 1 seconde ; seules les valeurs modifiées sont envoyées
  frame-ticks: 40           # vitesse de l'animation
  header-frames:
    - - ""
      - "&d&lMY SERVER"
      - "&7Welcome &f%player%"
      - ""
  footer-frames:
    - - ""
      - "&7Online: &f%online%/%max% &8| &7Ping: &f%ping% ms &8| &7TPS: &f%tps%"
      - ""
  name-format:
    enabled: true
    formats:
      admin:   { permission: "supmod.admin", format: "&c&lADMIN &f%player%", priority: 1 }
      staff:   { permission: "supmod.staff", format: "&d&lSTAFF &f%player%", priority: 2 }
      default: { permission: "", format: "&7%player%", priority: 99 }
  sort-by-priority: false
```

- Plusieurs frames forment une animation (une frame toutes les `frame-ticks`).
- `name-format` : le premier format dont le joueur a la permission est utilisé, en commençant par la plus petite `priority`.
- `sort-by-priority` trie le tab par grade. Il utilise les équipes du scoreboard : laissez-le désactivé si un autre plugin gère les équipes ou les nametags.

## Barre latérale {#sidebar}

Désactivée par défaut (`scoreboard.enabled: false`).

```yaml
scoreboard:
  enabled: false
  shown-by-default: true      # chaque joueur peut la masquer avec /sidebar
  respect-other-plugins: true # ne remplace jamais le scoreboard d'un autre plugin (mini-jeux...)
  update-ticks: 20
  frame-ticks: 40
  title-frames:
    - "&d&lMY SERVER"
  lines:                      # 15 lignes au maximum
    - "&fPlayer: &d%player%"
    - "&fCoins: &6%coins%"
    - "&fPlay time: &e%playtime%"
    - "&8"
    - "&fOnline: &a%online%"
    - "&dplay.myserver.com"
  disabled-worlds: []
```

La barre latérale ne clignote pas, et les lignes vides ou identiques sont autorisées. `/sidebar` (permission `supmod.sidebar.toggle`) l'affiche ou la masque ; le choix est mémorisé.

## Barres de boss {#boss-bars}

```yaml
bossbar:
  enabled: true
  interval-seconds: 300
  random: false
  messages:
    welcome:
      enabled: true
      text: "&d&lMY SERVER &8» &fWelcome! &7%online% players online"
      color: PINK               # PINK, BLUE, RED, GREEN, YELLOW, PURPLE, WHITE
      style: SOLID              # SOLID, SEGMENTED_6, SEGMENTED_10, SEGMENTED_12, SEGMENTED_20
      seconds: 10
```

Pour un message ponctuel : `/sm bossbar <seconds> [color] <text>` ([Maintenance et redémarrages](/fr/features/maintenance#boss-bar-messages)).

## Messages de connexion {#join-messages}

```yaml
join-messages:
  enabled: true
  formats:
    staff:
      permission: "supmod.staff"
      join: "&d&l» &d%player% &7joined the server"
      quit: "&d&l« &d%player% &7left the server"
      priority: 1
    default:
      permission: ""
      join: "&a&l+ &7%player%"
      quit: "&c&l- &7%player%"
      priority: 99
  first-join:
    enabled: true
    message: "&d&l✦ &fWelcome to &d%player% &f! &7(player #%number%)"
    sound: "ui.toast.challenge_complete"
    commands: []                # commandes console 2 s après la première connexion (%player%)
  welcome-title:
    enabled: true
    title: "&d&lWelcome back"
    subtitle: "&f%player%"
    first-title: "&d&lWelcome!"
    first-subtitle: "&7You are the player #%number%"
```

- `""` comme message : aucun message pour ce format.
- `%number%` : le numéro du joueur (le nombre de joueurs venus avant lui + 1).
- `first-join.commands` est un kit de première connexion (`give %player% bread 16`...). Le modifier en jeu demande `supmod.admin.commands`.
- Les membres du staff en vanish n'ont pas de message de connexion / déconnexion.

## Règles à la connexion {#rules-on-join}

Le fichier `auto_rules.txt` est envoyé aux joueurs `auto-rules.delay-seconds` (5) secondes après leur connexion (`config.yml` › `auto-rules` ; `first-join-only: true` pour ne l'envoyer qu'une seule fois). Voir [Annonces et règles](/fr/features/announcements#rules-on-join).
