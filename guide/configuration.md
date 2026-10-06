# Configuration

## In game: /sm settings {#in-game-sm-settings}

`/sm settings` (permission `supmod.admin.settings`) opens the configuration menu. Each category groups the options of one module:

| Category | What you change there |
|---|---|
| Modules | switch every module on or off |
| General | language, time zone, date format, menu colours and sound, data retention |
| Reports, Punishments | reports options, punishment settings and default reasons |
| Chat, Anti-spam | mentions, emojis, word filter, chat history, anti-spam rules |
| Staff, Alerts | staff mode, vanish, freeze, staff chat, command spy, alt and x-ray alerts |
| Economy, Statistics | coins, bounties, /stats |
| Server, Worlds | health alerts, lag tools, restarts, world settings |
| MOTD & tab, Sidebar, Join | the switches and main options of `display.yml` (MOTD lines, tab frames, name formats, boss bar messages and join message formats are edited in the file) |
| Zones, Holograms, Announcements, Rewards, Templates | open their own editors |
| Discord, Security | webhook, events, connection throttle |
| Players | game mode, inventory edition, watch alerts, AFK |
| Tickets & appeals | tickets and appeals options |
| Statistics | Minecraft statistics copy, daily statistics |
| Network | synchronisation between servers |

Click an option to change it: switches toggle at once, numbers and texts are typed in the chat, lists open a list editor. The change is saved in the file and applied immediately.

::: info Console commands need a special permission
Options that run console commands (reward commands, first join kit, zone commands, commands before a restart) need `supmod.admin.commands`, which is **not** part of `supmod.admin`. A console command gives full control of the server: give it only to people you trust completely.
:::

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
