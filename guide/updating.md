# Updating

## From any 2.x version {#from-any-2-x-version}

1. Download the new jar from [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Stop the server, replace the old jar, start the server.

The new options, messages and database tables are added automatically. Your values, your messages and your lists are kept. The console tells you when options were added to `config.yml`.

### From 2.3 to 2.4 {#from-2-3-to-2-4}

- Nothing to do. The new tables (`sm_drop_watch`, `sm_verified`, `sm_ignores`) and columns are created at the first start.
- **Drop log**: the players of `drop-log.players` (config.yml) are moved to the database as permanent watches, and the key is removed. The drop log is now on by default for new installations (your `drop-log.enabled` value is kept); in the default `WATCHLIST` mode, only the watched players are logged. Watching players, `on` / `off` and the mode now need `supmod.admin.drops.watch` (included in `supmod.admin`). See [Drop log](/features/drop-log).
- **Menu sounds**: `gui.click-sound` and `gui.sound-volume` are moved to the new `gui.sounds` section automatically. See [Menu sounds](/guide/configuration#menu-sounds).
- **Join verification** is off by default: enable it in `/sm settings` › **Security** if bots join your server. The **automatic lockdown** is on (8 new accounts in 30 seconds): if many real new players can arrive at once (event, video), raise `security.anti-raid.auto-lockdown.new-accounts` or set it to 0. See [Join verification and anti-raid](/features/verification).
- **Warnings** must now be acknowledged by the player (`punishments.warn-acknowledge.enabled`); warnings given before the update are never asked. See [Warning acknowledgment](/features/punishments#warning-acknowledgment).
- `/sm` opens the [staff hub](/features/staff-hub) for the staff (`gui.hub.enabled: false` to keep the help).
- `/staff` is no longer an alias of `/staffmode`: it shows the [staff online](/features/community#staff-list). Use `/staffmode` or `/mod`.
- **Command conflicts**: EssentialsX (or another plugin) may already have `/ignore`, `/unignore` or `/staff`. If the other plugin answers, use `/supmod:ignore`, `/supmod:unignore`, `/supmod:staff`, or remove the commands of one of the plugins in `commands.yml` of the server.
- New player permissions given to everyone: `supmod.ignore`, `supmod.stafflist`, `supmod.poll.vote`. The new staff permissions are in `supmod.staff` and `supmod.admin` (see [Permissions and ranks](/guide/permissions)).

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
