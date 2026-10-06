# Updating

## From any 2.x version {#from-any-2-x-version}

1. Download the new jar from [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Stop the server, replace the old jar, start the server.

The new options, messages and database tables are added automatically. Your values, your messages and your lists are kept. The console tells you when options were added to `config.yml`.

### From 2.2 to 2.3 {#from-2-2-to-2-3}

- Nothing to do. The new modules (tickets, appeals, AFK, statistics) are on by default; the network sync is off.
- If you edited the language files, add `%code%` to `punish.screen.ban` and `punish.screen.tempban` to show the [appeal code](/features/appeals) on the ban screen.
- If another plugin already uses `/gm`, `/gmc`... (EssentialsX), use `/supmod:gm` or remove the commands of one of the plugins in `commands.yml` of the server.
- The Discord events `punishment`, `staff-chat`, `alert` and `bounty` are now really sent when they are enabled (they were ignored before).

### From 2.1 to 2.2 {#from-2-1-to-2-2}

`display.yml`, `zones.yml` and `holograms.yml` are created. The ground items cleanup and the sidebar stay off until you enable them.

### From 2.0 to 2.1 {#from-2-0-to-2-1}

`punishments.yml`, `rewards.yml` and `announcements.yml` are created with ready-to-use content.

## From 1.x {#from-1-x}

SupMod 2 is a complete rewrite. The update is automatic:

- the old `config.yml` is converted to the new layout; a copy is kept as `config-1.x-backup.yml`;
- the data of 1.x (players, play time, kills, reports, chat words, drops, coins) is imported once into the new tables. The old tables are not deleted.

What changed for you:

| SupMod 1.x | SupMod 2 |
|---|---|
| `/supmod menu player` | `/sm players`, `/sm profile <player>` |
| `/supmod menu admin report` | `/sm reports` |
| `/supmod menu drop ...` | `/sm drops ...` |
| `/supmod spec_teleport true` | `/sm spectp on` |
| `/supmod webhook player_join_server on` | `/sm webhook join on` |
| `moderation_chat:` in config.yml | `chat.filter.words` |
| `emojy.yml` | `emojis.yml` |
| `auto_rule.txt` | `auto_rules.txt` (rename it yourself: only the `auto_rule` options of `config.yml` are converted) |
| `%supmod_count_kill%`, `%supmod_time_played%`... | `%supmod_kills%`, `%supmod_playtime%`...: see [Placeholders](/reference/placeholders#from-1-x) |
| report permission `supmod.player` | `supmod.report` (everyone) |

::: warning Check your placeholders
The placeholders of 1.x were renamed. A scoreboard or tab plugin that still uses the old names shows them as raw text: update them with the table of the [Placeholders](/reference/placeholders#from-1-x) page.
:::
