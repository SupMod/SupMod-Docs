# MOTD, tab, sidebar

Everything the players see around the game is in `display.yml`: the server list (MOTD), the tab list, the sidebar, the boss bars and the join messages. Each part has an `enabled` switch, and the main options can be changed in game with `/sm settings`. The texts (MOTD lines, tab frames, name formats, boss bar messages, join message formats) are edited in the file, then `/sm reload`.

Colours `&a`... and hex `&#RRGGBB` work everywhere, with these placeholders:

`%player%` `%online%` (vanished staff not counted) `%max%` `%staff_online%` `%ping%` `%tps%` `%world%` `%time%` `%date%` `%coins%` `%playtime%` `%kills%` `%deaths%` `%streak%` `%bounty%` `%maintenance%` `%afk%`, and every [PlaceholderAPI](/reference/placeholders) placeholder when PlaceholderAPI is installed.

The values are read from memory: a tab refreshed every second never queries the database.

## MOTD {#motd}

```yaml
motd:
  enabled: true
  random: true              # a random MOTD at each ping, or one after the other
  list:
    - - "&d&lMY SERVER &8» &fSurvival 1.21"
      - "&7%online%/%max% players online &8- &aJoin us!"
    - - "&#ff6ec7&lMY SERVER &8» &fNew season"
      - "&eDaily rewards, bounties and events"
  maintenance:              # shown during the maintenance
    - "&c&lMAINTENANCE &8» &fBack very soon"
    - "&7Follow us on Discord for the news"
  max-players: 0            # maximum shown in the list (0 = the real one)
  hide-vanished: true       # vanished staff not counted and not listed
```

Each MOTD has two lines. Only `%online%` and `%max%` work in the MOTD.

## Tab {#tab}

```yaml
tab:
  enabled: true
  update-ticks: 20          # 20 ticks = 1 second; only the changed values are sent
  frame-ticks: 40           # speed of the animation
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

- Several frames make an animation (one frame every `frame-ticks`).
- `name-format`: the first format whose permission the player has is used, smallest `priority` first.
- `sort-by-priority` sorts the tab by rank. It uses scoreboard teams: leave it off if another plugin manages the teams or the nametags.

## Sidebar {#sidebar}

Off by default (`scoreboard.enabled: false`).

```yaml
scoreboard:
  enabled: false
  shown-by-default: true      # each player can hide it with /sidebar
  respect-other-plugins: true # never replaces the scoreboard of another plugin (minigames...)
  update-ticks: 20
  frame-ticks: 40
  title-frames:
    - "&d&lMY SERVER"
  lines:                      # 15 lines at most
    - "&fPlayer: &d%player%"
    - "&fCoins: &6%coins%"
    - "&fPlay time: &e%playtime%"
    - "&8"
    - "&fOnline: &a%online%"
    - "&dplay.myserver.com"
  disabled-worlds: []
```

The sidebar does not flicker, and empty or identical lines are allowed. `/sidebar` (permission `supmod.sidebar.toggle`) shows or hides it; the choice is remembered.

## Boss bars {#boss-bars}

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

For a one-time message: `/sm bossbar <seconds> [color] <text>` ([Maintenance and restarts](/features/maintenance#boss-bar-messages)).

## Join messages {#join-messages}

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
    commands: []                # console commands 2 s after the first join (%player%)
  welcome-title:
    enabled: true
    title: "&d&lWelcome back"
    subtitle: "&f%player%"
    first-title: "&d&lWelcome!"
    first-subtitle: "&7You are the player #%number%"
```

- `""` as message: no message for this format.
- `%number%`: the number of the player (how many players joined before him + 1).
- `first-join.commands` is a first join kit (`give %player% bread 16`...). Editing it in game needs `supmod.admin.commands`.
- Vanished staff members have no join / quit message.

## Rules on join {#rules-on-join}

The file `auto_rules.txt` is sent to the players `auto-rules.delay-seconds` (5) seconds after they join (`config.yml` › `auto-rules`; `first-join-only: true` to send it only once). See [Announcements and rules](/features/announcements#rules-on-join).
