# Announcements and rules

## Automatic announcements {#automatic-announcements}

Messages sent in the chat every few minutes, with clickable links. They are in `announcements.yml` and can be managed in game with `/sm announce` (permission `supmod.announce.admin`).

```yaml
enabled: true
interval-seconds: 300
random: false              # false = in the order of the file
min-players: 1             # no announcement under this number of players
sound: "block.note_block.pling"
header: "&8&m                                                  "
footer: "&8&m                                                  "
messages:
  rules:
    enabled: true
    lines:
      - "&d&lRULES &7» &fRead the rules with [&d&n/rules](cmd:/rules|&7Click to read the rules)&f."
  discord:
    enabled: true
    lines:
      - "&9&lDISCORD &7» &fJoin us: [&9&ndiscord.gg/example](url:https://discord.gg/example|&7Open the invite)&f!"
```

### Clickable parts {#clickable-parts}

| Syntax | When clicked |
|---|---|
| `[text](url:https://example.com\|hover)` | opens the link |
| `[text](cmd:/rewards\|hover)` | runs the command |
| `[text](suggest:/report \|hover)` | writes the command in the chat bar |
| `[text](copy:play.example.com\|hover)` | copies the text |

The part after `|` is the text shown on hover (optional). `%online%` is replaced by the number of online players.

| Command | |
|---|---|
| `/sm announce` | the list (menu): switch an announcement on or off, send it now |
| `/sm announce send <id>` | send an announcement now |
| `/sm announce on` / `off` | all the announcements |
| `/sm announce reload` | reload the file |

Players with `supmod.announce.bypass` do not receive them.

## Rules on join {#rules-on-join}

`auto_rules.txt` is sent to each player a few seconds after he joins:

```text
&d&m                                              
&fWelcome &d%player%&f! Please respect the rules:
&7- &fNo cheating, no duplication glitches
&7- &fNo insults, no spam, no advertising
&7- &fNo griefing or stealing
&fUse &d/report &fto report a player to the staff.
&8%online% player(s) online - %full_date%
&d&m                                              
```

Placeholders: `%player%`, `%online%`, `%world%`, `%gamemode%`, `%full_date%`, `%date%`, `%time%`, and PlaceholderAPI placeholders.

```yaml
auto-rules:
  enabled: true
  delay-seconds: 5
  first-join-only: false
```

## Scheduled commands {#scheduled-commands}

Console commands run every day at a given time (time zone of `timezone`), optionally only some days:

```yaml
tasks:
  - time: "12:00"
    commands:
      - "say &6Hello everyone, it's time to eat!"
  - time: "21:00"
    days: [SATURDAY, SUNDAY]
    commands:
      - "weather clear"
```

`/sm tasks` lists them (permission `supmod.tasks.list`).

## Broadcast {#broadcast}

`/broadcast <message>` (alias `/br`, permission `supmod.broadcast`): a message to the whole server with the prefix `broadcast.prefix`.
