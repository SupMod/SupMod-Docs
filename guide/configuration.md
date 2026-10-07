# Configuration

## In game: /sm settings {#in-game-sm-settings}

`/sm settings` (permission `supmod.admin.settings`) opens the configuration menu. Each category groups the options of one module:

| Category | What you change there |
|---|---|
| Modules | switch every module on or off |
| General | language, time zone, date format, menu colours and [sounds](#menu-sounds), [staff hub](/features/staff-hub), new player badge, data retention |
| Reports, Punishments | reports options, punishment settings and default reasons, [warning acknowledgment](/features/punishments#warning-acknowledgment) |
| Chat, Anti-spam | mentions, emojis, word filter, chat history, new player delay, anti-spam rules |
| Staff, Alerts | staff mode, vanish, freeze, staff chat, command spy, alt and x-ray alerts, [item search](/features/item-search) and suspicious amounts |
| Economy, Statistics | coins, bounties, /stats |
| Server, Worlds | health alerts, lag tools, restarts, world settings |
| MOTD & tab, Sidebar, Join | the switches and main options of `display.yml` (MOTD lines, tab frames, name formats, boss bar messages and join message formats are edited in the file) |
| Zones, Holograms, Announcements, Rewards, Templates | open their own editors |
| Discord, Security | webhook, events, connection throttle, [drop log](/features/drop-log), [join verification, lockdown, accounts per IP](/features/verification) |
| Players | game mode, inventory edition, watch alerts, AFK |
| Tickets & appeals | tickets and appeals options |
| Statistics | Minecraft statistics copy, daily statistics |
| Network | synchronisation between servers |
| Community | [ignore, staff list, polls](/features/community) |

Click an option to change it: switches toggle at once, numbers and texts are typed in the chat, lists open a list editor. The change is saved in the file and applied immediately.

::: info Console commands need a special permission
Options that run console commands (reward commands, first join kit, zone commands, commands before a restart) need `supmod.admin.commands`, which is **not** part of `supmod.admin`. A console command gives full control of the server: give it only to people you trust completely.
:::

## Menu sounds {#menu-sounds}

Every SupMod menu plays a sound when you click a button that does something, and an error sound when a click is refused for lack of permission. Set them in `/sm settings` › **General**, or in `config.yml`:

```yaml
gui:
  sounds:
    enabled: true
    volume: 0.4
    pitch: 1.2                  # pitch of the click sound (0.5 - 2)
    click: "ui.button.click"    # click on a button
    open: ""                    # opening of a menu from a command ("" = no sound), e.g. "item.book.page_turn"
    error: "entity.villager.no" # click refused (missing permission)
```

A sound is a Minecraft key (`ui.button.click`, works on every version) or a Bukkit name (`UI_BUTTON_CLICK`); `""` = no sound. `enabled: false` mutes every menu.

`gui.sounds` replaces `gui.click-sound` and `gui.sound-volume` of 2.3: your values are moved automatically at the update (an empty `click-sound` gives `enabled: false`).

## In the files {#in-the-files}

All the files are in `plugins/SupMod/`. After editing a file, type `/sm reload` (or click **Reload** in `/sm settings`).

- [`config.yml`](/reference/config-files#config-yml): every module.
- [`punishments.yml`](/reference/config-files#punishments-yml): templates and punishment settings.
- [`display.yml`](/reference/config-files#display-yml): MOTD, tab, sidebar, boss bars, join messages.
- [`rewards.yml`](/reference/config-files#rewards-yml), [`announcements.yml`](/reference/config-files#announcements-yml), [`zones.yml`](/reference/config-files#zones-yml), [`holograms.yml`](/reference/config-files#holograms-yml), [`emojis.yml`](/reference/config-files#emojis-yml).

The [Configuration files](/reference/config-files) page shows every default file with its comments.

::: tip Your values are never overwritten
When SupMod is updated, the new options are added to your files with their default value; the options you changed are kept. The lists you manage yourself (report reasons, filtered words, zones...) are never filled again with the default entries.
:::

## Colours, durations and placeholders {#colours-durations-and-placeholders}

| | |
|---|---|
| Colours | `&a`, `&l`... and hex colours `&#RRGGBB` |
| Durations | `30s`, `10m`, `2h`, `7d`, `2w`, `1mo`, `1y`, combinable (`1d12h`), `perm` for permanent |
| Time zone | `timezone` in config.yml (`Europe/Paris`...): dates, scheduled tasks, restarts and daily rewards use it |
| Placeholders | see [Placeholders](/reference/placeholders) |

## Data retention {#data-retention}

Logs are cleaned once a day. In `config.yml` › `storage`:

| Option | Default | What is deleted after X days |
|---|---|---|
| `log-retention-days` | 90 | chat filter, kills, drops, connections and sessions (so also the name and IP history) |
| `chat-history-retention-days` | 30 | chat and command history |
| `staff-log-retention-days` | 180 | staff actions, inventory edition log, alerts |
| `transactions-retention-days` | 180 | `/coins history` |

`0` keeps everything. Reports, punishments, tickets, appeals and player statistics are never deleted.
